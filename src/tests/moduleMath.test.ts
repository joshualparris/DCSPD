import { describe, expect, it } from 'vitest';
import { modules } from '../data/modules';
import { getModuleCompletion } from '../lib/moduleMath';
import { getDefaultProgress } from '../lib/progress';
import { getNextReviewDate } from '../lib/spacedRepetition';
import { emptyModuleProgress } from './helpers/moduleProgress';

describe('moduleMath', () => {
  const trainingModule = modules[0];

  it('returns zero when nothing is completed', () => {
    const progress = getDefaultProgress();
    progress.modules[trainingModule.id] = emptyModuleProgress({
      sectionsRead: Object.fromEntries(trainingModule.sections.map((section) => [section.id, false])),
      flashcards: Object.fromEntries(
        trainingModule.flashcards.map((flashcard) => [
          flashcard.id,
          {
            state: 'new',
            leitnerBox: 1,
            dueDateIso: getNextReviewDate('again'),
            reviewCount: 0,
          },
        ])
      ),
      quizAttempts: [],
      practicalOutputs: Object.fromEntries(
        trainingModule.practicalOutputs.map((output) => [output.id, false])
      ),
    });

    expect(getModuleCompletion(trainingModule.id, progress, trainingModule)).toBe(0);
  });

  it('scores a partially completed module', () => {
    const progress = getDefaultProgress();
    progress.modules[trainingModule.id] = emptyModuleProgress({
      sectionsRead: Object.fromEntries(
        trainingModule.sections.map((section, index) => [section.id, index === 0])
      ),
      flashcards: Object.fromEntries(
        trainingModule.flashcards.map((flashcard, index) => [
          flashcard.id,
          {
            state: index < 2 ? 'learning' : 'new',
            leitnerBox: index < 2 ? 2 : 1,
            dueDateIso: getNextReviewDate('good'),
            reviewCount: index < 2 ? 1 : 0,
          },
        ])
      ),
      quizAttempts: [
        {
          id: 'attempt-1',
          attemptAtIso: new Date().toISOString(),
          score: 80,
          questionIds: trainingModule.quiz.map((question) => question.id),
        },
      ],
      practicalOutputs: Object.fromEntries(
        trainingModule.practicalOutputs.map((output) => [output.id, true])
      ),
    });

    const completion = getModuleCompletion(trainingModule.id, progress, trainingModule);

    expect(completion).toBeGreaterThan(40);
    expect(completion).toBeLessThanOrEqual(100);
  });
});
