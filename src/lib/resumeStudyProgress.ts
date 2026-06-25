import { resumeStudyPlan, resumeStudyPlanTotalSteps } from '../data/resumeStudyPlan';

export const RESUME_STUDY_STORAGE_KEY = 'dcsprep_resume_study_progress_v1';

export type ResumeStudyProgress = {
  currentDayIndex: number;
  currentStepIndex: number;
  completedStepKeys: string[];
  notesByStepKey: Record<string, string>;
  startedAtIso: string;
  updatedAtIso: string;
  completedAtIso?: string;
};

export function getResumeStudyStepKey(dayIndex: number, stepIndex: number) {
  return `day-${dayIndex + 1}-step-${stepIndex + 1}`;
}

function clampNumber(value: unknown, min: number, max: number, fallback: number) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, value));
}

export function getDefaultResumeStudyProgress(): ResumeStudyProgress {
  const now = new Date().toISOString();
  return {
    currentDayIndex: 0,
    currentStepIndex: 0,
    completedStepKeys: [],
    notesByStepKey: {},
    startedAtIso: now,
    updatedAtIso: now,
  };
}

function normalizeResumeStudyProgress(value: unknown): ResumeStudyProgress {
  const fallback = getDefaultResumeStudyProgress();
  if (!value || typeof value !== 'object') {
    return fallback;
  }

  const candidate = value as Partial<ResumeStudyProgress>;
  const dayIndex = clampNumber(candidate.currentDayIndex, 0, resumeStudyPlan.length - 1, 0);
  const day = resumeStudyPlan[dayIndex] || resumeStudyPlan[0];
  const stepIndex = clampNumber(candidate.currentStepIndex, 0, day.steps.length - 1, 0);

  return {
    currentDayIndex: dayIndex,
    currentStepIndex: stepIndex,
    completedStepKeys: Array.isArray(candidate.completedStepKeys)
      ? Array.from(new Set(candidate.completedStepKeys.filter((key) => typeof key === 'string')))
      : [],
    notesByStepKey:
      candidate.notesByStepKey && typeof candidate.notesByStepKey === 'object'
        ? Object.fromEntries(
            Object.entries(candidate.notesByStepKey).filter(
              ([key, note]) => typeof key === 'string' && typeof note === 'string'
            )
          )
        : {},
    startedAtIso: typeof candidate.startedAtIso === 'string' ? candidate.startedAtIso : fallback.startedAtIso,
    updatedAtIso: typeof candidate.updatedAtIso === 'string' ? candidate.updatedAtIso : fallback.updatedAtIso,
    completedAtIso: typeof candidate.completedAtIso === 'string' ? candidate.completedAtIso : undefined,
  };
}

export function getResumeStudyProgress(): ResumeStudyProgress {
  if (typeof window === 'undefined') {
    return getDefaultResumeStudyProgress();
  }

  try {
    const raw = window.localStorage.getItem(RESUME_STUDY_STORAGE_KEY);
    if (!raw) {
      return getDefaultResumeStudyProgress();
    }
    return normalizeResumeStudyProgress(JSON.parse(raw));
  } catch {
    return getDefaultResumeStudyProgress();
  }
}

export function saveResumeStudyProgress(progress: ResumeStudyProgress): ResumeStudyProgress {
  const normalized = normalizeResumeStudyProgress({
    ...progress,
    updatedAtIso: new Date().toISOString(),
  });

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(RESUME_STUDY_STORAGE_KEY, JSON.stringify(normalized));
  }

  return normalized;
}

export function markCurrentStudyStepComplete(progress: ResumeStudyProgress): ResumeStudyProgress {
  const key = getResumeStudyStepKey(progress.currentDayIndex, progress.currentStepIndex);
  const completed = new Set(progress.completedStepKeys);
  completed.add(key);
  return saveResumeStudyProgress({
    ...progress,
    completedStepKeys: Array.from(completed),
  });
}

export function updateCurrentStudyNote(progress: ResumeStudyProgress, note: string): ResumeStudyProgress {
  const key = getResumeStudyStepKey(progress.currentDayIndex, progress.currentStepIndex);
  return saveResumeStudyProgress({
    ...progress,
    notesByStepKey: {
      ...progress.notesByStepKey,
      [key]: note,
    },
  });
}

export function advanceResumeStudy(progress: ResumeStudyProgress): ResumeStudyProgress {
  const completedProgress = markCurrentStudyStepComplete(progress);
  const currentDay = resumeStudyPlan[completedProgress.currentDayIndex];

  if (completedProgress.currentStepIndex < currentDay.steps.length - 1) {
    return saveResumeStudyProgress({
      ...completedProgress,
      currentStepIndex: completedProgress.currentStepIndex + 1,
      completedAtIso: undefined,
    });
  }

  if (completedProgress.currentDayIndex < resumeStudyPlan.length - 1) {
    return saveResumeStudyProgress({
      ...completedProgress,
      currentDayIndex: completedProgress.currentDayIndex + 1,
      currentStepIndex: 0,
      completedAtIso: undefined,
    });
  }

  return saveResumeStudyProgress({
    ...completedProgress,
    completedAtIso: new Date().toISOString(),
  });
}

export function resetResumeStudyProgress(): ResumeStudyProgress {
  const next = getDefaultResumeStudyProgress();
  return saveResumeStudyProgress(next);
}

export function getResumeStudyCompletionPercent(progress: ResumeStudyProgress) {
  if (!resumeStudyPlanTotalSteps) {
    return 0;
  }
  return Math.round((progress.completedStepKeys.length / resumeStudyPlanTotalSteps) * 100);
}
