import type { AssessmentAttempt, WeakTopicKey } from '../types/assessment';
import type { ScenarioRun } from '../types/scenarios';
import type { TrainingModule } from '../types/training';
import type { TroubleshootingPlaybook } from '../types/playbooks';
import type { DcsAssetProfile } from '../types/assets';
import { getNextReviewDate, getTodayDateKey, type ReviewRating } from './spacedRepetition';

export type FlashcardState = 'new' | 'learning' | 'solid';

export type LeitnerBox = 1 | 2 | 3 | 4 | 5;

export type FlashcardProgress = {
  state: FlashcardState;
  leitnerBox: LeitnerBox;
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
  activeAssessment?: {
    currentIndex: number;
    attempts: AssessmentAttempt[];
    lastUpdatedIso: string;
  };
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

export type PdEntryType =
  | 'module-study'
  | 'quiz'
  | 'scenario'
  | 'flashcards'
  | 'practical-output'
  | 'focus-block'
  | 'reflection'
  | 'ai-coaching';

export type PdEntry = {
  id: string;
  createdAtIso: string;
  type: PdEntryType;
  title: string;
  minutes: number;

  moduleIds?: string[];
  scenarioIds?: string[];
  practicalOutputIds?: string[];

  weakTopicsTouched?: string[];
  weakTopicsImproved?: string[];

  evidenceSummary: string;
  reflection?: string;

  privacyChecked: boolean;
};

export type WeakTopicReview = {
  topic: WeakTopicKey;
  dueDateIso: string;
  latestAttemptId: string;
  recommendedModuleId: string;
  reviewCount: number;
  averageScore: number;
};

export type FocusMode = 'start-tiny' | 'focus-20' | 'overwhelmed';

export type FocusSession = {
  id: string;
  mode: FocusMode;
  task: string;
  minutesPlanned: number;
  startedAtIso: string;
  completedAtIso?: string;
  reflection?: string;
  microTaskId?: string;
};

export type RoleplaySentiment = 'angry' | 'neutral' | 'satisfied';

export type RoleplayExchange = {
  userMessage: string;
  botReply: string;
  coachNotes: string;
  sentiment: RoleplaySentiment;
  timestamp: string;
};

export type RoleplayFeedbackAttempt = {
  id: string;
  createdAtIso: string;
  persona: string;
  scenario: string;
  exchangeCount: number;
  exchanges: RoleplayExchange[];
  sentimentTrajectory: RoleplaySentiment[];
  averageSentiment: RoleplaySentiment;
  keyTopics: string[];
  coachNotesSummary: string;
  durationSeconds: number;
  satisfactionScore: number; // 0-100
};

export type AcademicAssessmentVerdict = 'Correct' | 'Mostly correct' | 'Partly correct' | 'Needs revision';

export type AcademicAssessmentAttempt = {
  id: string;
  createdAtIso: string;
  subjectId: string;
  subjectCode: string;
  subjectTitle: string;
  track: string;
  stream: string;
  weeklyModuleId: string;
  weeklyModuleTitle: string;
  week: number;
  assessmentId: string;
  assessmentTitle: string;
  assessmentKind: string;
  evidenceType: string;
  prompt: string;
  userAnswer: string;
  successCriteria: string[];
  siloIds: string[];
  dcsApplication: string;
  score: number;
  verdict: AcademicAssessmentVerdict;
  strengths: string[];
  missing: string[];
  riskNotes: string[];
  betterAnswer: string;
  nextPractice: string;
  redactionSummary: string;
  privacyChecked: boolean;
  pdEntryId?: string;
};

export type CertificationAssessmentAttempt = {
  id: string;
  createdAtIso: string;
  certificationId: string;
  certificationTitle: string;
  lessonId: string;
  lessonTitle: string;
  objectiveId: string;
  objectiveTitle: string;
  prompt: string;
  userAnswer: string;
  score: number;
  longFormScore?: number;
  multipleChoiceScore?: number;
  multipleChoiceResponses?: {
    questionId: string;
    selectedOptionId: string;
    correctOptionId: string;
    correct: boolean;
    explanation: string;
  }[];
  strengths: string[];
  missing: string[];
  riskNotes: string[];
  betterAnswer: string;
  nextPractice: string;
  redactionSummary: string;
  privacyChecked: boolean;
  pdEntryId?: string;
};

export type UserProgress = {
  lastOpenedModuleId?: string;
  modules: Record<string, ModuleProgress>;
  assessmentAttempts: AssessmentAttempt[];
  academicAssessmentAttempts: AcademicAssessmentAttempt[];
  certificationAssessmentAttempts: CertificationAssessmentAttempt[];
  academicFinalChallengeChecklists?: Record<string, Record<string, boolean>>;
  roleplayFeedbackAttempts: RoleplayFeedbackAttempt[];
  scenarioRuns: ScenarioRun[];
  pdEntries: PdEntry[];
  pdLogEntries: PDLogEntry[];
  weakTopicReviews: Record<string, WeakTopicReview>;
  focusSessions: FocusSession[];
  playbookAttempts?: Record<string, { completedAtIso: string; note?: string }>;
  assetInteractions?: Record<string, { lastViewedAtIso: string; count: number }>;
  streak?: {
    current: number;
    best: number;
    lastActivityDateIso: string;
  };
  dailyChallenge?: {
    lastCompletedDateIso: string;
    lastQuestionId?: string;
  };
};

const STORAGE_KEY = 'dcsprep_learning_cockpit_v4';

export function getDefaultProgress(): UserProgress {
  return {
    modules: {},
    assessmentAttempts: [],
    academicAssessmentAttempts: [],
    certificationAssessmentAttempts: [],
    academicFinalChallengeChecklists: {},
    roleplayFeedbackAttempts: [],
    scenarioRuns: [],
    pdEntries: [],
    pdLogEntries: [],
    weakTopicReviews: {},
    focusSessions: [],
    playbookAttempts: {},
    assetInteractions: {}
  };
}

function getDefaultFlashcardProgress(): FlashcardProgress {
  return {
    state: 'new',
    leitnerBox: 1,
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
        leitnerBox: 3,
        dueDateIso: getNextReviewDate('good'),
        reviewCount: 1
      };
    }

    if (value === 'learning') {
      return {
        state: 'learning',
        leitnerBox: 1,
        dueDateIso: getTodayDateKey(),
        reviewCount: 1
      };
    }

    return getDefaultFlashcardProgress();
  }

  const candidate = value as Partial<FlashcardProgress>;
  return {
    state: candidate.state === 'solid' || candidate.state === 'learning' ? candidate.state : 'new',
    leitnerBox:
      candidate.leitnerBox === 2 ||
      candidate.leitnerBox === 3 ||
      candidate.leitnerBox === 4 ||
      candidate.leitnerBox === 5
        ? candidate.leitnerBox
        : 1,
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
    academicAssessmentAttempts?: unknown;
    certificationAssessmentAttempts?: unknown;
    academicFinalChallengeChecklists?: unknown;
    roleplayFeedbackAttempts?: unknown;
    pdEntries?: unknown;
    pdLogEntries?: unknown;
  };

  const legacyPdLogEntries: PDLogEntry[] = Array.isArray(candidate.pdLogEntries)
    ? (candidate.pdLogEntries as PDLogEntry[])
    : [];

  const migratedFromLegacy: PdEntry[] = legacyPdLogEntries.map((entry) => ({
    id: entry.id,
    createdAtIso: entry.date.length === 10 ? `${entry.date}T00:00:00.000Z` : new Date().toISOString(),
    type: 'reflection',
    title: entry.topic || entry.resource || 'PD log entry',
    minutes: typeof entry.minutes === 'number' ? entry.minutes : 0,
    evidenceSummary: entry.learned || '',
    reflection: entry.nextStep || undefined,
    privacyChecked: Boolean(entry.sensitiveConfirmed)
  }));

  const normalizedPdEntries: PdEntry[] = Array.isArray(candidate.pdEntries)
    ? (candidate.pdEntries as PdEntry[])
    : migratedFromLegacy;

  return {
    lastOpenedModuleId: candidate.lastOpenedModuleId,
    modules: Object.fromEntries(
      Object.entries(candidate.modules || {}).map(([moduleId, moduleProgress]) => [
        moduleId,
        normalizeModuleProgress(moduleProgress)
      ])
    ),
    assessmentAttempts: Array.isArray(candidate.assessmentAttempts) ? candidate.assessmentAttempts : [],
    academicAssessmentAttempts: Array.isArray(candidate.academicAssessmentAttempts)
      ? (candidate.academicAssessmentAttempts as AcademicAssessmentAttempt[])
      : [],
    certificationAssessmentAttempts: Array.isArray(candidate.certificationAssessmentAttempts)
      ? (candidate.certificationAssessmentAttempts as CertificationAssessmentAttempt[])
      : [],
    academicFinalChallengeChecklists:
      candidate.academicFinalChallengeChecklists && typeof candidate.academicFinalChallengeChecklists === 'object'
        ? (candidate.academicFinalChallengeChecklists as Record<string, Record<string, boolean>>)
        : {},
    roleplayFeedbackAttempts: Array.isArray(candidate.roleplayFeedbackAttempts)
      ? (candidate.roleplayFeedbackAttempts as RoleplayFeedbackAttempt[])
      : [],
    scenarioRuns: Array.isArray(candidate.scenarioRuns) ? candidate.scenarioRuns : [],
    pdEntries: normalizedPdEntries,
    pdLogEntries: Array.isArray(candidate.pdLogEntries) ? candidate.pdLogEntries : [],
    focusSessions: Array.isArray(candidate.focusSessions) ? candidate.focusSessions : [],
    weakTopicReviews:
      candidate.weakTopicReviews && typeof candidate.weakTopicReviews === 'object'
        ? candidate.weakTopicReviews
        : {},
    streak: candidate.streak || { current: 0, best: 0, lastActivityDateIso: '' },
    dailyChallenge: candidate.dailyChallenge || { lastCompletedDateIso: '' }
  };
}

export function recordDailyActivity(progress: UserProgress): UserProgress {
  const today = getTodayDateKey();
  const lastDate = progress.streak?.lastActivityDateIso || '';

  if (lastDate === today) {
    return progress;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split('T')[0];

  const currentStreak = progress.streak?.current || 0;
  const bestStreak = progress.streak?.best || 0;

  let nextStreak = 1;
  if (lastDate === yesterdayKey) {
    nextStreak = currentStreak + 1;
  }

  return {
    ...progress,
    streak: {
      current: nextStreak,
      best: Math.max(bestStreak, nextStreak),
      lastActivityDateIso: today
    }
  };
}

export function completeDailyChallenge(progress: UserProgress, questionId: string): UserProgress {
  const withStreak = recordDailyActivity(progress);
  return {
    ...withStreak,
    dailyChallenge: {
      lastCompletedDateIso: getTodayDateKey(),
      lastQuestionId: questionId
    }
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

export type ProgressBackup = {
  app: 'DCSPrep';
  schemaVersion: 1;
  exportedAtIso: string;
  progress: UserProgress;
};

export function createProgressBackup(progress: UserProgress, exportedAtIso = new Date().toISOString()): ProgressBackup {
  return {
    app: 'DCSPrep',
    schemaVersion: 1,
    exportedAtIso,
    progress
  };
}

export function serializeProgressBackup(progress: UserProgress) {
  return JSON.stringify(createProgressBackup(progress), null, 2);
}

export function parseProgressBackupJson(json: string): { ok: true; progress: UserProgress } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(json) as Partial<ProgressBackup>;

    if (parsed.app !== 'DCSPrep' || parsed.schemaVersion !== 1 || !parsed.progress) {
      return { ok: false, error: 'This does not look like a DCSPrep progress backup.' };
    }

    return { ok: true, progress: normalizeProgress(parsed.progress) };
  } catch {
    return { ok: false, error: 'The selected backup file is not valid JSON.' };
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

function getNextLeitnerBox(currentBox: LeitnerBox, rating: ReviewRating): LeitnerBox {
  if (rating === 'again') {
    return 1;
  }

  if (rating === 'hard') {
    return currentBox;
  }

  if (rating === 'easy') {
    return currentBox >= 4 ? 5 : ((currentBox + 2) as LeitnerBox);
  }

  return currentBox >= 5 ? 5 : ((currentBox + 1) as LeitnerBox);
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
            leitnerBox: getNextLeitnerBox(existingCard.leitnerBox, rating),
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
        quizAttempts: [...moduleProgress.quizAttempts, attempt],
        activeAssessment: undefined // Clear active assessment on completion
      }
    }
  };
}

export function saveActiveAssessment(
  progress: UserProgress,
  moduleId: string,
  currentIndex: number,
  attempts: AssessmentAttempt[]
): UserProgress {
  const moduleProgress = progress.modules[moduleId];
  if (!moduleProgress) return progress;

  return {
    ...progress,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...moduleProgress,
        activeAssessment: {
          currentIndex,
          attempts,
          lastUpdatedIso: new Date().toISOString()
        }
      }
    }
  };
}

export function clearActiveAssessment(progress: UserProgress, moduleId: string): UserProgress {
  const moduleProgress = progress.modules[moduleId];
  if (!moduleProgress) return progress;

  return {
    ...progress,
    modules: {
      ...progress.modules,
      [moduleId]: {
        ...moduleProgress,
        activeAssessment: undefined
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

export function addPdEntry(progress: UserProgress, entry: PdEntry): UserProgress {
  const filtered = progress.pdEntries.filter((existingEntry) => existingEntry.id !== entry.id);
  return {
    ...progress,
    pdEntries: [entry, ...filtered].sort((a, b) => (a.createdAtIso < b.createdAtIso ? 1 : -1))
  };
}

export function saveAcademicAssessmentAttempt(
  progress: UserProgress,
  attempt: AcademicAssessmentAttempt
): UserProgress {
  const filtered = progress.academicAssessmentAttempts.filter((existingAttempt) => existingAttempt.id !== attempt.id);

  return {
    ...progress,
    academicAssessmentAttempts: [attempt, ...filtered].sort((a, b) =>
      a.createdAtIso < b.createdAtIso ? 1 : -1
    )
  };
}

export function saveCertificationAssessmentAttempt(
  progress: UserProgress,
  attempt: CertificationAssessmentAttempt
): UserProgress {
  const filtered = progress.certificationAssessmentAttempts.filter((existingAttempt) => existingAttempt.id !== attempt.id);

  return {
    ...progress,
    certificationAssessmentAttempts: [attempt, ...filtered].sort((a, b) =>
      a.createdAtIso < b.createdAtIso ? 1 : -1
    )
  };
}

export function toggleAcademicFinalChallengeChecklistItem(
  progress: UserProgress,
  subjectId: string,
  itemId: string
): UserProgress {
  const subjectChecklist = progress.academicFinalChallengeChecklists?.[subjectId] || {};

  return {
    ...progress,
    academicFinalChallengeChecklists: {
      ...(progress.academicFinalChallengeChecklists || {}),
      [subjectId]: {
        ...subjectChecklist,
        [itemId]: !subjectChecklist[itemId]
      }
    }
  };
}

export function saveFocusSession(progress: UserProgress, session: FocusSession): UserProgress {
  const filtered = progress.focusSessions.filter((existingSession) => existingSession.id !== session.id);

  return {
    ...progress,
    focusSessions: [session, ...filtered].sort((a, b) => (a.startedAtIso < b.startedAtIso ? 1 : -1))
  };
}

export function saveRoleplayFeedbackAttempt(
  progress: UserProgress,
  attempt: RoleplayFeedbackAttempt
): UserProgress {
  const filtered = progress.roleplayFeedbackAttempts.filter((existing) => existing.id !== attempt.id);

  return {
    ...progress,
    roleplayFeedbackAttempts: [attempt, ...filtered].sort((a, b) =>
      a.createdAtIso < b.createdAtIso ? 1 : -1
    )
  };
}

export function calculateRoleplaySatisfactionScore(sentiments: RoleplaySentiment[]): number {
  if (sentiments.length === 0) {
    return 50;
  }

  const sentimentScores: Record<RoleplaySentiment, number> = {
    angry: 35,
    neutral: 70,
    satisfied: 95
  };
  const baseScore =
    sentiments.reduce((sum, sentiment) => sum + sentimentScores[sentiment], 0) / sentiments.length;
  const trajectoryScores = sentiments.map((sentiment) => sentimentScores[sentiment]);
  const firstScore = trajectoryScores[0] ?? baseScore;
  const finalScore = trajectoryScores[trajectoryScores.length - 1] ?? baseScore;
  const improvementBonus = Math.max(0, Math.min(8, (finalScore - firstScore) / 7.5));
  const finalTwo = sentiments.slice(-2);
  const recoveryFloor = finalTwo.includes('satisfied') ? 72 : finalTwo.every((sentiment) => sentiment !== 'angry') ? 58 : 0;

  return Math.round(Math.max(recoveryFloor, Math.min(100, baseScore + improvementBonus)));
}

export function getRoleplayFeedbackStats(attempts: RoleplayFeedbackAttempt[]) {
  if (attempts.length === 0) {
    return {
      totalSessions: 0,
      averageSatisfaction: 0,
      averageDuration: 0,
      personaBreakdown: {} as Record<string, number>,
      topTopics: [] as string[],
      sentimentTrend: 'neutral' as RoleplaySentiment
    };
  }

  const totalSessions = attempts.length;
  const averageSatisfaction = Math.round(
    attempts.reduce(
      (sum, attempt) => sum + calculateRoleplaySatisfactionScore(attempt.sentimentTrajectory),
      0
    ) / attempts.length
  );
  const averageDuration = Math.round(
    attempts.reduce((sum, a) => sum + a.durationSeconds, 0) / attempts.length
  );

  // Count personas
  const personaBreakdown: Record<string, number> = {};
  attempts.forEach((a) => {
    personaBreakdown[a.persona] = (personaBreakdown[a.persona] || 0) + 1;
  });

  // Get top topics
  const topicCounts: Record<string, number> = {};
  attempts.forEach((a) => {
    a.keyTopics.forEach((topic) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });
  const topTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic]) => topic);

  // Calculate sentiment trend
  const sentiments: RoleplaySentiment[] = attempts.flatMap((a) => a.sentimentTrajectory);
  const sentimentCounts = {
    angry: sentiments.filter((s) => s === 'angry').length,
    neutral: sentiments.filter((s) => s === 'neutral').length,
    satisfied: sentiments.filter((s) => s === 'satisfied').length
  };
  const sentimentTrend = (
    Object.entries(sentimentCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'neutral'
  ) as RoleplaySentiment;

  return {
    totalSessions,
    averageSatisfaction,
    averageDuration,
    personaBreakdown,
    topTopics,
    sentimentTrend
  };
}
