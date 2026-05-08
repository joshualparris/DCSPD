import { TrainingModule } from '../types/training';
import { Scenario } from '../types/scenarios';
import { UserProgress } from './progress';
import { StudyRecommendation, StudyQueue } from '../types/studyPath';
import { getModuleCompletion } from './moduleMath';
import { getDueFlashcards } from './spacedRepetition';

export function generateStudyPath(
  modules: TrainingModule[],
  scenarios: Scenario[],
  progress: UserProgress | undefined
): StudyQueue {
  const recommendations: StudyRecommendation[] = [];
  
  if (!progress) {
    return {
      recommendations: [],
      totalMinutes: 0,
      whyItMatters: 'Start your training to see recommendations.'
    };
  }

  // 1. Check Due Flashcards (High Priority)
  const dueFlashcards = getDueFlashcards(modules, progress);
  if (dueFlashcards.length > 0) {
    recommendations.push({
      id: 'due-flashcards',
      title: `Review ${dueFlashcards.length} due flashcards`,
      reason: 'Spaced repetition helps move technical knowledge into long-term memory.',
      priority: 'high',
      estimatedMinutes: Math.ceil(dueFlashcards.length * 0.5),
      actionType: 'review-flashcards',
      route: '/due-today'
    });
  }

  // 2. Check Weak Topics from Progress
  if (progress.weakTopicTracking) {
    Object.entries(progress.weakTopicTracking).forEach(([topic, stats]) => {
      if (stats.score < 60) {
        const relatedModule = modules.find(m => m.tags.includes(topic) || m.domain.toLowerCase().includes(topic.toLowerCase()));
        if (relatedModule) {
          recommendations.push({
            id: `weak-topic-${topic}`,
            title: `Repair ${topic} knowledge`,
            reason: `Your performance in ${topic} is below target (${stats.score.toFixed(0)}%).`,
            priority: 'critical',
            estimatedMinutes: relatedModule.estimatedMinutes,
            actionType: 'complete-module',
            targetId: relatedModule.id,
            weakTopic: topic,
            route: `/modules/${relatedModule.id}`
          });
        }
      }
    });
  }

  // 3. Check Incomplete Modules
  modules.forEach(m => {
    const completion = getModuleCompletion(m.id, progress, m);
    if (completion > 0 && completion < 90) {
      recommendations.push({
        id: `incomplete-${m.id}`,
        title: `Finish ${m.title}`,
        reason: `You are ${completion}% through this module. Complete the remaining sections or quiz.`,
        priority: 'medium',
        estimatedMinutes: Math.ceil(m.estimatedMinutes * (1 - completion / 100)),
        actionType: 'complete-module',
        targetId: m.id,
        route: `/modules/${m.id}`
      });
    }
  });

  // 4. Check Unattempted Scenarios
  scenarios.forEach(s => {
    const attempts = progress.scenarioAttempts?.[s.id] || [];
    if (attempts.length === 0) {
      recommendations.push({
        id: `new-scenario-${s.id}`,
        title: `Attempt Lab: ${s.title}`,
        reason: 'Practical labs build real-world troubleshooting confidence.',
        priority: 'medium',
        estimatedMinutes: s.estimatedMinutes,
        actionType: 'scenario-lab',
        targetId: s.id,
        route: `/scenarios`
      });
    }
  });

  // Sort by priority and limit
  const priorityMap = { critical: 0, high: 1, medium: 2, low: 3 };
  const sorted = recommendations.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
  
  const top3 = sorted.slice(0, 3);
  const totalMinutes = top3.reduce((sum, r) => sum + r.estimatedMinutes, 0);

  return {
    recommendations: top3,
    totalMinutes,
    whyItMatters: 'These actions target your weakest areas first to build a robust school IT skillset.'
  };
}
