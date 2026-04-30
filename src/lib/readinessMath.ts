import { readinessProfiles, weakTopicLabels, type ReadinessArea } from '../data/skillDomains';
import { modules } from '../data/modules';
import { getModuleCompletion } from './moduleMath';
import type { UserProgress } from './progress';

export type ReadinessScore = {
  id: string;
  label: string;
  score: number;
  evidenceCount: number;
  note: string;
};

function average(values: number[]) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
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

  const moduleAverage = average(moduleScores);
  const assessmentAverage = average(relatedAttempts.map((attempt) => attempt.scoreBreakdown.total * 100));
  const evidenceCount = relatedAttempts.length;

  const score = relatedAttempts.length
    ? Number((moduleAverage * 0.4 + assessmentAverage * 0.6).toFixed(1))
    : Number(Math.max(28, moduleAverage * 0.7).toFixed(1));

  return {
    id: area.id,
    label: area.label,
    score,
    evidenceCount,
    note: relatedAttempts.length
      ? `${relatedAttempts.length} assessment result${relatedAttempts.length === 1 ? '' : 's'} and module progress`
      : 'Indicative estimate based on module coverage only'
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
      title: 'Scenario Lab for situational practice',
      detail: 'Use a 20-minute period to work through a multi-step support incident and compare your decisions with the model answer.',
      ctaHref: '/scenarios',
      ctaLabel: 'Start scenario'
    };
  }

  return {
    title: 'Complete one focused module review',
    detail: 'Read one short lesson, review 4 flashcards, then record where the concept applies in DCS support responsibilities.',
    ctaHref: '/modules',
    ctaLabel: 'Browse modules'
  };
}
