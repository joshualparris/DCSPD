import { describe, expect, it } from 'vitest';
import { learningPaths } from '../data/learningPaths';
import { modules } from '../data/modules';
import { getInitialProgressSnapshot, type FlashcardProgress, type UserProgress } from '../lib/progress';
import { getSkillCoachDashboard } from '../lib/skillCoach';
import type { TrainingModule } from '../types/training';

function completedFlashcard(): FlashcardProgress {
  return {
    state: 'solid',
    leitnerBox: 5,
    dueDateIso: '2099-01-01',
    lastReviewedAtIso: '2026-01-01T00:00:00.000Z',
    lastRating: 'easy',
    reviewCount: 1
  };
}

function completeModule(progress: UserProgress, module: TrainingModule): UserProgress {
  return {
    ...progress,
    modules: {
      ...progress.modules,
      [module.id]: {
        sectionsRead: Object.fromEntries(module.sections.map((section) => [section.id, true])),
        flashcards: Object.fromEntries(module.flashcards.map((flashcard) => [flashcard.id, completedFlashcard()])),
        quizAttempts: [
          {
            id: `${module.id}-perfect`,
            attemptAtIso: '2026-01-01T00:00:00.000Z',
            score: 100,
            questionIds: module.quiz.map((question) => question.id)
          }
        ],
        practicalOutputs: Object.fromEntries(module.practicalOutputs.map((output) => [output.id, true]))
      }
    }
  };
}

describe('skill coach dashboard', () => {
  it('builds diagnostics, recommendations, badges, and labs for a new learner', () => {
    const progress = getInitialProgressSnapshot(modules);
    const dashboard = getSkillCoachDashboard(progress);

    expect(dashboard.tracks).toHaveLength(3);
    expect(dashboard.skillIq).toBeGreaterThanOrEqual(0);
    expect(dashboard.recommendations[0]?.id).toBe('baseline-diagnostic');
    expect(dashboard.recommendations.some((item) => item.href === '/simulations/roleplay')).toBe(true);
    expect(dashboard.labs.some((lab) => lab.recommended)).toBe(true);
    expect(dashboard.badges.length).toBeGreaterThan(learningPaths.length);
  });

  it('marks a learning path badge as earned when all path modules are complete', () => {
    const path = learningPaths[0];
    let progress = getInitialProgressSnapshot(modules);

    path.moduleIds.forEach((moduleId) => {
      const moduleData = modules.find((item) => item.id === moduleId);
      if (moduleData) {
        progress = completeModule(progress, moduleData);
      }
    });

    const dashboard = getSkillCoachDashboard(progress);
    const badge = dashboard.badges.find((item) => item.id === `path-${path.id}`);

    expect(badge?.status).toBe('earned');
    expect(badge?.progressPercent).toBe(100);
    expect(badge?.certificateLabel).toBe(path.certificationLabel);
  });
});
