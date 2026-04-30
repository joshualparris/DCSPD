import { describe, expect, it } from 'vitest';
import { modules } from '../data/modules';
import { getModuleCompletion } from '../lib/moduleMath';
import type { UserProgress } from '../lib/progress';
import { getNextReviewDate } from '../lib/spacedRepetition';

describe('moduleMath', () => {
  const trainingModule = modules[0];

  it('returns zero when nothing is completed', () => {
    const progress: UserProgress = {
      modules: {
        [trainingModule.id]: {
          sectionsRead: Object.fromEntries(trainingModule.sections.map((section) => [section.id, false])),
          flashcards: Object.fromEntries(
            trainingModule.flashcards.map((flashcard) => [
              flashcard.id,
              {
                state: 'new',
                dueDateIso: getNextReviewDate('again'),
                reviewCount: 0
              }
            ])
          ),
          quizAttempts: [],
          practicalOutputs: Object.fromEntries(
            trainingModule.practicalOutputs.map((output) => [output.id, false])
          )
        }
      },
      assessmentAttempts: [],
      scenarioRuns: [],
      pdLogEntries: [],
      weakTopicReviews: {}
    };

    expect(getModuleCompletion(trainingModule.id, progress, trainingModule)).toBe(0);
  });

  it('scores a partially completed module', () => {
    const progress: UserProgress = {
      modules: {
        [trainingModule.id]: {
          sectionsRead: Object.fromEntries(
            trainingModule.sections.map((section, index) => [section.id, index === 0])
          ),
          flashcards: Object.fromEntries(
            trainingModule.flashcards.map((flashcard, index) => [
              flashcard.id,
              {
                state: index < 2 ? 'learning' : 'new',
                dueDateIso: getNextReviewDate('good'),
                reviewCount: index < 2 ? 1 : 0
              }
            ])
          ),
          quizAttempts: [
            {
              id: 'attempt-1',
              attemptAtIso: new Date().toISOString(),
              score: 80,
              questionIds: trainingModule.quiz.map((question) => question.id)
            }
          ],
          practicalOutputs: Object.fromEntries(
            trainingModule.practicalOutputs.map((output) => [output.id, true])
          )
        }
      },
      assessmentAttempts: [],
      scenarioRuns: [],
      pdLogEntries: [],
      weakTopicReviews: {}
    };

    const completion = getModuleCompletion(trainingModule.id, progress, trainingModule);

    expect(completion).toBeGreaterThan(40);
    expect(completion).toBeLessThanOrEqual(100);
  });
});
