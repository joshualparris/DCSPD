import type {
  AssessmentAttempt,
  AssessmentQuestion,
  AssessmentResponse,
  AssessmentSelfRating,
  SelfRatingBand
} from '../types/assessment';
import { getNextReviewDate, scoreToReviewRating } from './spacedRepetition';

function bandToWeightedScore(band: SelfRatingBand, maxWeight: number) {
  return Number(((band / 2) * maxWeight).toFixed(2));
}

function getAnswerSummary(question: AssessmentQuestion, response: AssessmentResponse) {
  if (question.type === 'mcq') {
    return question.options.find((option) => option.id === response.selectedOptionId)?.label ?? 'No answer selected';
  }

  if (question.type === 'categorization') {
    if (!response.categorizedItems || !Object.keys(response.categorizedItems).length) {
      return 'No categorization submitted';
    }

    return question.items
      .map((item) => {
        const categoryId = response.categorizedItems?.[item.id];
        const categoryLabel = question.categories.find((category) => category.id === categoryId)?.label ?? 'Unsorted';
        return `${item.label}: ${categoryLabel}`;
      })
      .join(' | ');
  }

  if (question.type === 'order-steps') {
    if (!response.orderedStepIds?.length) {
      return 'No order submitted';
    }

    return response.orderedStepIds
      .map((stepId) => question.steps.find((step) => step.id === stepId)?.label ?? stepId)
      .join(' -> ');
  }

  return response.answerText?.trim() || 'No answer provided';
}

function getAutoCorrectness(question: AssessmentQuestion, response: AssessmentResponse) {
  if (question.type === 'mcq') {
    const isCorrect = response.selectedOptionId === question.correctOptionId;
    return {
      autoMarked: true,
      score: isCorrect ? 0.3 : 0,
      feedback: isCorrect
        ? 'The choice matched the expected answer within DCS operational boundaries.'
        : 'The choice did not match the safest answer or the correct troubleshooting next step.'
    };
  }

  if (question.type === 'order-steps') {
    const order = response.orderedStepIds ?? [];
    const matches = question.correctOrder.filter((stepId, index) => order[index] === stepId).length;
    const score = question.correctOrder.length ? (matches / question.correctOrder.length) * 0.3 : 0;

    return {
      autoMarked: true,
      score: Number(score.toFixed(2)),
      feedback:
        matches === question.correctOrder.length
          ? 'The sequence matched the ideal order.'
          : 'Part of the sequence was sound, but the order requires further refinement.'
    };
  }

  if (question.type === 'categorization') {
    const categorizedItems = response.categorizedItems ?? {};
    const matches = question.items.filter((item) => categorizedItems[item.id] === item.correctCategoryId).length;
    const score = question.items.length ? (matches / question.items.length) * 0.3 : 0;

    return {
      autoMarked: true,
      score: Number(score.toFixed(2)),
      feedback:
        matches === question.items.length
          ? 'The sorting matched the model ownership or symptom categories.'
          : 'Some items landed in the right bucket, but the categorization needs tightening.'
    };
  }

  return {
    autoMarked: false,
    score: 0,
    feedback: 'Use the model answer and rubric to self-rate how close your response was.'
  };
}

export function getDefaultSelfRating(question: AssessmentQuestion): AssessmentSelfRating {
  return {
    correctness:
      question.type === 'mcq' || question.type === 'order-steps' || question.type === 'categorization' ? 2 : 1,
    reasoning: 1,
    judgement: 1
  };
}

export function createAssessmentAttempt({
  question,
  response,
  selfRating,
  source
}: {
  question: AssessmentQuestion;
  response: AssessmentResponse;
  selfRating: AssessmentSelfRating;
  source: 'strict-quiz' | 'module-quiz';
}): AssessmentAttempt {
  const auto = getAutoCorrectness(question, response);
  const correctness = auto.autoMarked
    ? auto.score
    : bandToWeightedScore(selfRating.correctness, 0.3);
  const reasoning = bandToWeightedScore(selfRating.reasoning, 0.4);
  const judgement = bandToWeightedScore(selfRating.judgement, 0.3);
  const total = Number((correctness + reasoning + judgement).toFixed(2));
  const nextReviewDateIso = getNextReviewDate(scoreToReviewRating(total));
  const shouldRevisit = total < 0.85 || (response.confidence === 3 && total < 0.7);

  return {
    id: `${source}-${question.id}-${Date.now()}`,
    questionId: question.id,
    questionType: question.type,
    prompt: question.prompt,
    domain: question.domain,
    weakTopic: question.weakTopic,
    recommendedModuleId: question.recommendedModuleId,
    source,
    confidence: response.confidence,
    answerSummary: getAnswerSummary(question, response),
    reasoningSummary: response.reasoning.trim() || 'No reasoning recorded',
    judgementSummary: response.judgement.trim() || 'No judgement note recorded',
    selfRating,
    scoreBreakdown: {
      correctness,
      reasoning,
      judgement,
      total,
      autoMarked: auto.autoMarked
    },
    feedback: {
      correctness: auto.feedback,
      reasoning:
        'Check whether your explanation named the mechanism, not just the symptom. Tight explanations travel better into real tickets.',
      judgement:
        'Check whether your answer stayed inside Level 1 boundaries, respected privacy, and knew when to escalate.',
      correctedConcept: question.modelAnswer,
      nextReviewDateIso
    },
    timestampIso: new Date().toISOString(),
    shouldRevisit,
    nextReviewDateIso
  };
}
