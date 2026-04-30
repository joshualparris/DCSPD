import type { AssessmentAttempt, WeakTopicKey } from '../types/assessment';
import type { ScenarioRun } from '../types/scenarios';
import type { TrainingModule } from '../types/training';
import { getNextReviewDate, getTodayDateKey, type ReviewRating } from './spacedRepetition';

export type FlashcardState = 'new' | 'learning' | 'solid';

export type FlashcardProgress = {
  state: FlashcardState;
  dueDateIso: string;
  lastReviewedAtIso?: string;
  lastRating?: ReviewRating;
  reviewCount: number;
};

export type ModuleQuizAttempt = {
  id: string;
  attemptAtIso: string;
  score: number;
  questionIds: string[];
};

export type ModuleProgress = {
  sectionsRead: Record<string, boolean>;
  flashcards: Record<string, FlashcardProgress>;
  quizAttempts: ModuleQuizAttempt[];
  practicalOutputs: Record<string, boolean>;
};

export type PDLogEntry = {
  id: string;
  date: string;
  minutes: number;
  resource: string;
  topic: string;
  dcsRelevance: string;
  learned: string;
  nextStep: string;
  evidenceLink?: string;
  templateId?: string;
  sensitiveConfirmed: boolean;
};

export type WeakTopicReview = {
  topic: WeakTopicKey;
  dueDateIso: string;
  latestAttemptId: string;
  recommendedModuleId: string;
  reviewCount: number;
  averageScore: number;
};

export type UserProgress = {
  lastOpenedModuleId?: string;
  modules: Record<string, ModuleProgress>;
  assessmentAttempts: AssessmentAttempt[];
  scenarioRuns: ScenarioRun[];
  pdLogEntries: PDLogEntry[];
  weakTopicReviews: Record<string, WeakTopicReview>;
};

const STORAGE_KEY = 'dcsprep_learning_cockpit_v2';

export function getDefaultProgress(): UserProgress {
  return {
    modules: {},
    assessmentAttempts: [],
    scenarioRuns: [],
    pdLogEntries: [],
    weakTopicReviews: {}
  };
}

function getDefaultFlashcardProgress(): FlashcardProgress {
  return {
    state: 'new',
    dueDateIso: getTodayDateKey(),
    reviewCount: 0
  };
}

function normalizeFlashcardProgress(value: unknown): FlashcardProgress {
  if (!value || typeof value !== 'object') {
    return getDefaultFlashcardProgress();
  }

  if (typeof value === 'string') {
    if (value === 'known') {
      return {
        state: 'solid',
        dueDateIso: getNextReviewDate('good'),
        reviewCount: 1
      };
    }

    if (value === 'learning') {
      return {
        state: 'learning',
        dueDateIso: getTodayDateKey(),
        reviewCount: 1
      };
    }

    return getDefaultFlashcardProgress();
  }

  const candidate = value as Partial<FlashcardProgress>;
  return {
    state: candidate.state === 'solid' || candidate.state === 'learning' ? candidate.state : 'new',
    dueDateIso: candidate.dueDateIso || getTodayDateKey(),
    lastReviewedAtIso: candidate.lastReviewedAtIso,
    lastRating: candidate.lastRating,
    reviewCount: typeof candidate.reviewCount === 'number' ? candidate.reviewCount : 0
  };
}

function normalizeModuleProgress(value: unknown, module?: TrainingModule): ModuleProgress {
  const base: ModuleProgress = {
    sectionsRead: Object.fromEntries((module?.sections || []).map((section) => [section.id, false])),
    flashcards: Object.fromEntries((module?.flashcards || []).map((card) => [card.id, getDefaultFlashcardProgress()])),
    quizAttempts: [],
    practicalOutputs: Object.fromEntries((module?.practicalOutputs || []).map((output) => [output.id, false]))
  };

  if (!value || typeof value !== 'object') {
    return base;
  }

  const candidate = value as Partial<ModuleProgress> & {
    flashcards?: Record<string, FlashcardProgress | 'known' | 'learning' | 'unseen'>;
  };

  const mergedSections = { ...base.sectionsRead, ...(candidate.sectionsRead || {}) };
  const mergedFlashcards = { ...base.flashcards };

  Object.entries(candidate.flashcards || {}).forEach(([id, flashcardProgress]) => {
    mergedFlashcards[id] = normalizeFlashcardProgress(flashcardProgress);
  });

  const mergedPracticalOutputs = { ...base.practicalOutputs, ...(candidate.practicalOutputs || {}) };

  return {
    sectionsRead: mergedSections,
    flashcards: mergedFlashcards,
    quizAttempts: Array.isArray(candidate.quizAttempts) ? candidate.quizAttempts : [],
    practicalOutputs: mergedPracticalOutputs
  };
}

function normalizeProgress(raw: unknown): UserProgress {
  const base = getDefaultProgress();

  if (!raw || typeof raw !== 'object') {
    return base;
  }

  const candidate = raw as Partial<UserProgress> & {
    modules?: Record<string, unknown>;
  };

  return {
    lastOpenedModuleId: candidate.lastOpenedModuleId,
    modules: Object.fromEntries(
      Object.entries(candidate.modules || {}).map(([moduleId, moduleProgress]) => [
        moduleId,
        normalizeModuleProgress(moduleProgress)
      ])
    ),
    assessmentAttempts: Array.isArray(candidate.assessmentAttempts) ? candidate.assessmentAttempts : [],
    scenarioRuns: Array.isArray(candidate.scenarioRuns) ? candidate.scenarioRuns : [],
    pdLogEntries: Array.isArray(candidate.pdLogEntries) ? candidate.pdLogEntries : [],
    weakTopicReviews:
      candidate.weakTopicReviews && typeof candidate.weakTopicReviews === 'object'
        ? candidate.weakTopicReviews
        : {}
  };
}

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultProgress();
    }

    return normalizeProgress(JSON.parse(raw));
  } catch (error) {
    console.error('getProgress error', error);
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('saveProgress error', error);
  }
}

export function resetProgress() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('resetProgress error', error);
  }
}

export function ensureModuleProgress(progress: UserProgress, module: TrainingModule): UserProgress {
  return {
    ...progress,
    modules: {
      ...progress.modules,
      [module.id]: normalizeModuleProgress(progress.modules[module.id], module)
    }
  };
}

export function ensureModulesProgress(progress: UserProgress, modules: TrainingModule[]): UserProgress {
  return modules.reduce<UserProgress>((current, module) => ensureModuleProgress(current, module), progress);
}

export function getInitialProgressSnapshot(modules?: TrainingModule[]): UserProgress {
  return modules ? ensureModulesProgress(getDefaultProgress(), modules) : getDefaultProgress();
}

export function getStoredProgressSnapshot(modules?: TrainingModule[]): UserProgress {
  return modules ? ensureModulesProgress(getProgress(), modules) : getProgress();
}

export function markSectionRead(progress: UserProgress, moduleId: string, sectionId: string): UserProgress {
  const moduleProgress = progress.modules[moduleId];

  return {
    ...progress,
    lastOpenedModuleId: moduleId,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...moduleProgress,
        sectionsRead: {
          ...moduleProgress.sectionsRead,
          [sectionId]: true
        }
      }
    }
  };
}

export function togglePracticalOutput(
  progress: UserProgress,
  moduleId: string,
  outputId: string
): UserProgress {
  const moduleProgress = progress.modules[moduleId];

  return {
    ...progress,
    lastOpenedModuleId: moduleId,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...moduleProgress,
        practicalOutputs: {
          ...moduleProgress.practicalOutputs,
          [outputId]: !moduleProgress.practicalOutputs[outputId]
        }
      }
    }
  };
}

function getFlashcardStateFromRating(rating: ReviewRating): FlashcardState {
  if (rating === 'easy' || rating === 'good') {
    return 'solid';
  }

  return 'learning';
}

export function recordFlashcardReview(
  progress: UserProgress,
  moduleId: string,
  flashcardId: string,
  rating: ReviewRating
): UserProgress {
  const moduleProgress = progress.modules[moduleId];
  const existingCard = moduleProgress.flashcards[flashcardId] || getDefaultFlashcardProgress();

  return {
    ...progress,
    lastOpenedModuleId: moduleId,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...moduleProgress,
        flashcards: {
          ...moduleProgress.flashcards,
          [flashcardId]: {
            state: getFlashcardStateFromRating(rating),
            dueDateIso: getNextReviewDate(rating),
            lastReviewedAtIso: new Date().toISOString(),
            lastRating: rating,
            reviewCount: existingCard.reviewCount + 1
          }
        }
      }
    }
  };
}

export function recordModuleQuizAttempt(
  progress: UserProgress,
  moduleId: string,
  attempt: ModuleQuizAttempt
): UserProgress {
  const moduleProgress = progress.modules[moduleId];

  return {
    ...progress,
    lastOpenedModuleId: moduleId,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...moduleProgress,
        quizAttempts: [...moduleProgress.quizAttempts, attempt]
      }
    }
  };
}

export function recordAssessmentAttempt(progress: UserProgress, attempt: AssessmentAttempt): UserProgress {
  const existingTopic = progress.weakTopicReviews[attempt.weakTopic];
  const nextReview: WeakTopicReview = existingTopic
    ? {
        ...existingTopic,
        dueDateIso: attempt.nextReviewDateIso,
        latestAttemptId: attempt.id,
        recommendedModuleId: attempt.recommendedModuleId,
        reviewCount: existingTopic.reviewCount + 1,
        averageScore: Number(
          (
            (existingTopic.averageScore * existingTopic.reviewCount + attempt.scoreBreakdown.total * 100) /
            (existingTopic.reviewCount + 1)
          ).toFixed(1)
        )
      }
    : {
        topic: attempt.weakTopic,
        dueDateIso: attempt.nextReviewDateIso,
        latestAttemptId: attempt.id,
        recommendedModuleId: attempt.recommendedModuleId,
        reviewCount: 1,
        averageScore: Number((attempt.scoreBreakdown.total * 100).toFixed(1))
      };

  return {
    ...progress,
    assessmentAttempts: [attempt, ...progress.assessmentAttempts],
    weakTopicReviews: {
      ...progress.weakTopicReviews,
      [attempt.weakTopic]: nextReview
    }
  };
}

export function saveScenarioRun(progress: UserProgress, run: ScenarioRun): UserProgress {
  const withoutExisting = progress.scenarioRuns.filter((existingRun) => existingRun.id !== run.id);

  return {
    ...progress,
    scenarioRuns: [run, ...withoutExisting]
  };
}

export function savePdLogEntry(progress: UserProgress, entry: PDLogEntry): UserProgress {
  const filtered = progress.pdLogEntries.filter((existingEntry) => existingEntry.id !== entry.id);

  return {
    ...progress,
    pdLogEntries: [entry, ...filtered].sort((a, b) => (a.date < b.date ? 1 : -1))
  };
}
