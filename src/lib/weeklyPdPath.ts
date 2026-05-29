import type { StudyRecommendation } from '../types/studyPath';
import type { UserProgress } from './progress';
import { getDueFlashcards } from './spacedRepetition';
import type { TrainingModule } from '../types/training';
import type { Scenario } from '../types/scenarios';

export type WeeklyPdPathItem = StudyRecommendation & {
  dayLabel: string;
  category: 'module' | 'scenario' | 'certification' | 'academic' | 'evidence' | 'review';
};

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;

export function buildWeeklyPdPath(
  modules: TrainingModule[],
  scenarios: Scenario[],
  progress: UserProgress | undefined
): { items: WeeklyPdPathItem[]; totalMinutes: number; summary: string } {
  if (!progress) {
    return {
      items: [],
      totalMinutes: 0,
      summary: 'Load progress to generate a weekly PD path.'
    };
  }

  const candidates: Omit<WeeklyPdPathItem, 'dayLabel'>[] = [];

  const dueCount = getDueFlashcards(modules, progress).length;
  if (dueCount > 0) {
    candidates.push({
      id: 'weekly-flashcards',
      title: 'Spaced repetition review',
      reason: `${dueCount} flashcards are due — best as a short Monday reset.`,
      priority: 'high',
      estimatedMinutes: Math.min(20, Math.ceil(dueCount * 0.5)),
      actionType: 'review-flashcards',
      route: '/due-today',
      category: 'review'
    });
  }

  const weakTopic = Object.entries(progress.weakTopicReviews || {}).find(([, stats]) => stats.averageScore < 65);
  if (weakTopic) {
    const [topic, stats] = weakTopic;
    const moduleMatch = modules.find((module) => module.id.includes(topic) || module.title.toLowerCase().includes(topic));
    candidates.push({
      id: 'weekly-weak-module',
      title: moduleMatch ? `Module: ${moduleMatch.title}` : `Weak topic: ${topic}`,
      reason: `Average ${Math.round(stats.averageScore)}% — schedule focused repair practice.`,
      priority: 'critical',
      estimatedMinutes: 20,
      actionType: 'complete-module',
      targetId: moduleMatch?.id,
      route: moduleMatch ? `/modules/${moduleMatch.id}` : '/readiness',
      category: 'module'
    });
  } else if (modules[0]) {
    candidates.push({
      id: 'weekly-module',
      title: `Module: ${modules[0].title}`,
      reason: 'Question-first module study during a quiet window.',
      priority: 'medium',
      estimatedMinutes: 20,
      actionType: 'complete-module',
      targetId: modules[0].id,
      route: `/modules/${modules[0].id}`,
      category: 'module'
    });
  }

  const unattemptedScenario = scenarios.find(
    (scenario) => !progress.scenarioRuns.some((run) => run.scenarioId === scenario.id)
  );
  if (unattemptedScenario) {
    candidates.push({
      id: 'weekly-scenario',
      title: `Scenario: ${unattemptedScenario.title}`,
      reason: 'Practice ticket-note quality with a Jira-style escalation ending.',
      priority: 'high',
      estimatedMinutes: 25,
      actionType: 'scenario-lab',
      targetId: unattemptedScenario.id,
      route: '/scenarios',
      category: 'scenario'
    });
  }

  candidates.push({
    id: 'weekly-cert',
    title: 'Certification lesson block',
    reason: 'One assessable certification lesson with MCQ + long-form AI feedback.',
    priority: 'medium',
    estimatedMinutes: 25,
    actionType: 'attempt-quiz',
    route: '/certifications/aplus-core-2',
    category: 'certification'
  });

  candidates.push({
    id: 'weekly-academic',
    title: 'Academic PD weekly assessment',
    reason: 'Log one graded Academic PD attempt for university + work bridge evidence.',
    priority: 'medium',
    estimatedMinutes: 20,
    actionType: 'academic-bridge',
    route: '/academic-pd',
    category: 'academic'
  });

  candidates.push({
    id: 'weekly-evidence',
    title: 'Evidence pack review',
    reason: 'Export or review PD evidence before the week ends.',
    priority: 'low',
    estimatedMinutes: 10,
    actionType: 'practical-output',
    route: '/evidence-pack',
    category: 'evidence'
  });

  const picked = candidates.slice(0, DAY_LABELS.length);
  const items: WeeklyPdPathItem[] = picked.map((item, index) => ({
    ...item,
    dayLabel: DAY_LABELS[index]
  }));

  const totalMinutes = items.reduce((sum, item) => sum + item.estimatedMinutes, 0);

  return {
    items,
    totalMinutes,
    summary: `A ${totalMinutes}-minute blend of modules, scenarios, certification study, Academic PD, and evidence — sized for quiet-window PD.`
  };
}
