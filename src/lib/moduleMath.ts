import type { TrainingModule } from '../types/training';
import type { UserProgress } from './progress';

export function getModuleCompletion(
  moduleId: string,
  progress: UserProgress | undefined,
  moduleData: TrainingModule
): number {
  const moduleProgress = progress?.modules?.[moduleId];

  const sectionTotal = moduleData.sections.length || 1;
  const sectionsRead = moduleProgress
    ? Object.values(moduleProgress.sectionsRead).filter(Boolean).length
    : 0;
  const sectionScore = (sectionsRead / sectionTotal) * 40;

  const flashcardTotal = moduleData.flashcards.length || 1;
  const flashcardsReviewed = moduleProgress
    ? Object.values(moduleProgress.flashcards).filter((card) => card.reviewCount > 0).length
    : 0;
  const flashcardScore = (flashcardsReviewed / flashcardTotal) * 25;

  const quizScore = moduleProgress?.quizAttempts.length
    ? moduleProgress.quizAttempts[moduleProgress.quizAttempts.length - 1].score * 0.25
    : 0;

  const practicalTotal = moduleData.practicalOutputs.length || 1;
  const practicalCompleted = moduleProgress
    ? Object.values(moduleProgress.practicalOutputs).filter(Boolean).length
    : 0;
  const practicalScore = (practicalCompleted / practicalTotal) * 10;

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
