import { readinessProfiles, weakTopicLabels, type ReadinessArea } from '../data/skillDomains';
import { modules } from '../data/modules';
import { scenarios } from '../data/scenarios';
import { getModuleCompletion } from './moduleMath';
import type { UserProgress } from './progress';

export type ReadinessScore = {
  id: string;
  label: string;
  score: number;
  confidence: 'low' | 'medium' | 'high';
  isEstimate: boolean;
  evidenceCount: number;
  note: string;
  weakestArea: string;
  nextAction?: {
    label: string;
    href: string;
  };
  drivers: {
    assessment: number;
    scenarios: number;
    noteQuality: number;
    flashcards: number;
    practicalOutputs: number;
    weakAreaPenalty: number;
  };
  practicalSkills: string[];
};

function average(values: number[]) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function weightedAverage(items: Array<{ value: number; weight: number; include: boolean }>) {
  const included = items.filter((item) => item.include);
  if (!included.length) {
    return 0;
  }

  const totalWeight = included.reduce((sum, item) => sum + item.weight, 0);
  return included.reduce((sum, item) => sum + item.value * item.weight, 0) / totalWeight;
}

function clampScore(score: number) {
  return Number(Math.max(0, Math.min(100, score)).toFixed(1));
}

function confidenceFromEvidence(evidenceCount: number): ReadinessScore['confidence'] {
  if (evidenceCount < 10) return 'low';
  if (evidenceCount < 25) return 'medium';
  return 'high';
}

function getWeakestArea(area: ReadinessArea, progress: UserProgress) {
  const related = Object.values(progress.weakTopicReviews)
    .filter((review) => area.weakTopics.includes(review.topic))
    .sort((a, b) => a.averageScore - b.averageScore);

  const weakest = related[0];
  if (!weakest) {
    return {
      label: weakTopicLabels[area.weakTopics[0]] ?? 'Ports and protocols',
      recommendedModuleId: area.moduleIds[0]
    };
  }

  return {
    label: weakTopicLabels[weakest.topic] ?? weakest.topic,
    recommendedModuleId: weakest.recommendedModuleId
  };
}

function flashcardRetentionForModules(progress: UserProgress, moduleIds: string[]) {
  const reviewedCards = moduleIds.flatMap((moduleId) => Object.values(progress.modules[moduleId]?.flashcards || {}));
  const evidenceCount = reviewedCards.filter((card) => card.reviewCount > 0).length;

  if (!reviewedCards.length) {
    return { score: 0, evidenceCount };
  }

  // Approximation: average Leitner box scaled to 0-100
  const avgBox = average(reviewedCards.map((card) => card.leitnerBox ?? 1));
  const score = ((avgBox - 1) / 4) * 100;
  return { score: clampScore(score), evidenceCount };
}

function getAreaScore(area: ReadinessArea, progress: UserProgress): ReadinessScore {
  const moduleScores = area.moduleIds
    .map((moduleId) => modules.find((module) => module.id === moduleId))
    .filter((module): module is (typeof modules)[number] => Boolean(module))
    .map((module) => getModuleCompletion(module.id, progress, module));

  const relatedAttempts = progress.assessmentAttempts.filter((attempt) => {
    return (
      area.weakTopics.includes(attempt.weakTopic) ||
      area.focusTerms.some((term) => attempt.domain.toLowerCase().includes(term.toLowerCase()))
    );
  });

  const relatedScenarioIds = scenarios
    .filter((scenario) => scenario.recommendedModuleIds.some((moduleId) => area.moduleIds.includes(moduleId)))
    .map((scenario) => scenario.id);
  const relatedScenarioRuns = progress.scenarioRuns.filter((run) => relatedScenarioIds.includes(run.scenarioId));
  const scenarioStepAccuracy = average(
    relatedScenarioRuns.map((run) => {
      if (!run.stepChoices.length) return 0;
      return (run.stepChoices.filter((choice) => choice.correct).length / run.stepChoices.length) * 100;
    })
  );
  const scenarioNoteQuality = average(
    relatedScenarioRuns
      .filter((run) => typeof run.noteAverage === 'number')
      .map((run) => ((run.noteAverage ?? 0) / 2) * 100)
  );

  const relatedPracticalOutputs = area.moduleIds.flatMap((moduleId) =>
    Object.values(progress.modules[moduleId]?.practicalOutputs || {}).filter(Boolean)
  ).length;
  const totalPracticalOutputs = area.moduleIds.reduce((sum, moduleId) => {
    const moduleData = modules.find((module) => module.id === moduleId);
    return sum + (moduleData?.practicalOutputs.length || 0);
  }, 0);
  const practicalAverage = totalPracticalOutputs ? (relatedPracticalOutputs / totalPracticalOutputs) * 100 : 0;

  const moduleAverage = average(moduleScores);
  const assessmentAverage = average(relatedAttempts.map((attempt) => attempt.scoreBreakdown.total * 100));
  const flashcard = flashcardRetentionForModules(progress, area.moduleIds);

  const weakTopicPenalty = (() => {
    const relatedWeak = Object.values(progress.weakTopicReviews).filter((review) => area.weakTopics.includes(review.topic));
    const low = relatedWeak.filter((review) => review.averageScore < 75);
    if (!low.length) return 0;
    // Penalty up to ~12 points depending on how far below 75 the weak topics are.
    const averageGap = average(low.map((review) => 75 - review.averageScore));
    return clampScore(Math.min(12, averageGap * 0.25));
  })();

  const evidenceCount =
    relatedAttempts.length +
    relatedScenarioRuns.length +
    relatedPracticalOutputs +
    flashcard.evidenceCount;

  const baseScore = evidenceCount
    ? weightedAverage([
        { value: moduleAverage, weight: 0.15, include: moduleScores.length > 0 },
        { value: assessmentAverage, weight: 0.35, include: relatedAttempts.length > 0 },
        { value: scenarioStepAccuracy, weight: 0.2, include: relatedScenarioRuns.length > 0 },
        { value: scenarioNoteQuality, weight: 0.15, include: relatedScenarioRuns.some((run) => typeof run.noteAverage === 'number') },
        { value: flashcard.score, weight: 0.05, include: flashcard.evidenceCount > 0 },
        { value: practicalAverage, weight: 0.1, include: totalPracticalOutputs > 0 }
      ])
    : Math.max(24, moduleAverage * 0.55);

  const score = clampScore(baseScore - weakTopicPenalty);

  const weakest = getWeakestArea(area, progress);
  const nextAction = weakest.recommendedModuleId
    ? {
        label: `Review module: ${weakest.recommendedModuleId}`,
        href: `/modules/${weakest.recommendedModuleId}`
      }
    : undefined;

  const isEstimate = evidenceCount < 10;
  const confidence = confidenceFromEvidence(evidenceCount);

  return {
    id: area.id,
    label: area.label,
    score,
    confidence,
    isEstimate,
    evidenceCount,
    note: evidenceCount
      ? `${relatedAttempts.length} assessment result${relatedAttempts.length === 1 ? '' : 's'}, ${relatedScenarioRuns.length} scenario run${relatedScenarioRuns.length === 1 ? '' : 's'}, ${flashcard.evidenceCount} flashcard set${flashcard.evidenceCount === 1 ? '' : 's'}, and ${relatedPracticalOutputs} completed practical output${relatedPracticalOutputs === 1 ? '' : 's'}`
      : 'Indicative estimate based on module coverage only'
    ,
    weakestArea: weakest.label,
    nextAction,
    drivers: {
      assessment: clampScore(assessmentAverage),
      scenarios: clampScore(scenarioStepAccuracy),
      noteQuality: clampScore(scenarioNoteQuality),
      flashcards: clampScore(flashcard.score),
      practicalOutputs: clampScore(practicalAverage),
      weakAreaPenalty: clampScore(weakTopicPenalty)
    },
    practicalSkills: (area as any).practicalSkills || []
  };
}

export function getReadinessProfile(
  track: 'aPlus' | 'level2' | 'schoolItManager',
  progress: UserProgress
) {
  return readinessProfiles[track].map((area) => getAreaScore(area, progress));
}

export function getWeakTopicSummary(progress: UserProgress) {
  return Object.values(progress.weakTopicReviews)
    .map((review) => ({
      ...review,
      label: weakTopicLabels[review.topic]
    }))
    .sort((left, right) => left.averageScore - right.averageScore);
}

export function getCurrentWeakFocus(progress: UserProgress) {
  const weakestTopic = getWeakTopicSummary(progress)[0];
  if (weakestTopic) {
    return weakestTopic.label;
  }

  return 'Ports and protocols';
}

export function getDashboardRecommendation(progress: UserProgress) {
  const dueAssessments = progress.assessmentAttempts.filter((attempt) => attempt.shouldRevisit).length;
  const dueWeakTopics = getWeakTopicSummary(progress).filter((topic) => topic.averageScore < 75).length;
  const completedScenarios = progress.scenarioRuns.filter((run) => run.completed).length;
  const focusSessions = progress.focusSessions.length;

  // Dynamic Study Path logic: prioritize weakest readiness areas
  const allProfiles = [
    ...getReadinessProfile('aPlus', progress),
    ...getReadinessProfile('level2', progress),
    ...getReadinessProfile('schoolItManager', progress)
  ];
  const weakestProfile = allProfiles.sort((a, b) => a.score - b.score)[0];

  if (focusSessions === 0) {
    return {
      title: 'Start one tiny focus session',
      detail: 'Pick one micro-task, run a short timer, and finish with a reflection so the app starts collecting real evidence instead of light estimates.',
      ctaHref: '/focus',
      ctaLabel: 'Open focus support'
    };
  }

  // If we have a very weak area (below 40%), prioritize it heavily
  if (weakestProfile && weakestProfile.score < 40 && weakestProfile.nextAction) {
    return {
      title: `Improve your ${weakestProfile.label} readiness`,
      detail: `Your readiness in ${weakestProfile.label} is currently ${Math.round(weakestProfile.score)}%. Focus on ${weakestProfile.weakestArea} to build stronger evidence.`,
      ctaHref: weakestProfile.nextAction.href,
      ctaLabel: weakestProfile.nextAction.label
    };
  }

  if (dueAssessments > 0) {
    return {
      title: 'Complete a 10-question assessment',
      detail: 'Spend 12 minutes on priority questions, 5 minutes reviewing the corrected concepts, and 3 minutes recording the main takeaway.',
      ctaHref: '/strict-quiz',
      ctaLabel: 'Start 10-question assessment'
    };
  }

  if (dueWeakTopics > 0) {
    return {
      title: 'Review one priority concept',
      detail: 'Open the Due Today queue, complete one weak-topic review, then finish with a short ticket-note reflection.',
      ctaHref: '/due-today',
      ctaLabel: 'Review due work'
    };
  }

  if (completedScenarios < 3) {
    return {
      title: 'Run one 20-minute focus block',
      detail: 'Use the focus page to choose one scenario, run the timer, and finish with a Jira-style reflection or escalation note.',
      ctaHref: '/focus',
      ctaLabel: 'Start focus block'
    };
  }

  return {
    title: 'Complete one focused module review',
    detail: 'Read one short lesson, review 4 flashcards, then record where the concept applies in DCS support responsibilities.',
    ctaHref: '/modules',
    ctaLabel: 'Browse modules'
  };
}
