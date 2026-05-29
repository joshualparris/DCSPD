import type { TrainingModule } from '../types/training';
import type { UserProgress } from './progress';

export function getModuleCompletion(
  moduleId: string,
  progress: UserProgress | undefined,
  moduleData: TrainingModule
): number {
  const moduleProgress = progress?.modules?.[moduleId];

  const sectionTotal = moduleData.sections.length;
  const sectionsRead = moduleProgress
    ? Object.values(moduleProgress.sectionsRead).filter(Boolean).length
    : 0;
  const sectionScore = sectionTotal === 0 ? 40 : (sectionsRead / sectionTotal) * 40;

  const flashcardTotal = moduleData.flashcards.length;
  const flashcardsReviewed = moduleProgress
    ? Object.values(moduleProgress.flashcards).filter((card) => card.reviewCount > 0).length
    : 0;
  const flashcardScore = flashcardTotal === 0 ? 25 : (flashcardsReviewed / flashcardTotal) * 25;

  const quizScore =
    moduleData.quiz.length === 0
      ? 25
      : moduleProgress?.quizAttempts.length
        ? moduleProgress.quizAttempts[moduleProgress.quizAttempts.length - 1].score * 0.25
        : 0;

  const practicalTotal = moduleData.practicalOutputs.length;
  const practicalCompleted = moduleProgress
    ? Object.values(moduleProgress.practicalOutputs).filter(Boolean).length
    : 0;
  const practicalScore =
    practicalTotal === 0
      ? 10
      : (practicalCompleted / practicalTotal) * 10;

  return Number(Math.min(100, sectionScore + flashcardScore + quizScore + practicalScore).toFixed(2));
}

export function getOverallProgress(modules: TrainingModule[], progress?: UserProgress): number {
  if (!modules.length) {
    return 0;
  }

  const total = modules.reduce((accumulator, module) => {
    return accumulator + getModuleCompletion(module.id, progress, module);
  }, 0);

  return Number((total / modules.length).toFixed(2));
}
