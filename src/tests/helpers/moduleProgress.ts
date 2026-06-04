import type { ModuleProgress } from '../../lib/progress';

/** Minimal valid module progress for unit tests. */
export function emptyModuleProgress(overrides: Partial<ModuleProgress> = {}): ModuleProgress {
  return {
    sectionsRead: {},
    flashcards: {},
    quizAttempts: [],
    practicalOutputs: {},
    practicalOutputEvidence: {},
    recallDrafts: {},
    ...overrides,
  };
}
