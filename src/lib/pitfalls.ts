import type { UserProgress } from './progress';
import { weakTopicLabels } from '../data/skillDomains';

export type CommonPitfall = {
  id: string;
  type: 'concept' | 'criteria' | 'risk';
  label: string;
  frequency: number;
  description: string;
  recommendation: string;
  moduleId?: string;
};

/**
 * Aggregates common mistakes and weak topics into actionable "pitfalls".
 */
export function getCommonPitfalls(progress: UserProgress): CommonPitfall[] {
  const pitfalls: Map<string, CommonPitfall> = new Map();

  // 1. Process Weak Topic Reviews (from simple assessments)
  Object.values(progress.weakTopicReviews).forEach((review) => {
    if (review.averageScore < 70) {
      const id = `weak-topic-${review.topic}`;
      pitfalls.set(id, {
        id,
        type: 'concept',
        label: weakTopicLabels[review.topic] || review.topic,
        frequency: review.reviewCount,
        description: `Struggling with the core concepts of ${weakTopicLabels[review.topic] || review.topic}.`,
        recommendation: 'Review the diagnostic questions and flashcards for this module.',
        moduleId: review.recommendedModuleId
      });
    }
  });

  // 2. Process Certification Assessment Attempts (missing criteria and risk notes)
  progress.certificationAssessmentAttempts.forEach((attempt) => {
    if (attempt.score < 80) {
      // Process missing criteria
      attempt.missing.forEach((missed) => {
        const id = `missing-criteria-${missed.toLowerCase().replace(/\s+/g, '-')}`;
        const existing = pitfalls.get(id);
        if (existing) {
          existing.frequency += 1;
        } else {
          pitfalls.set(id, {
            id,
            type: 'criteria',
            label: missed,
            frequency: 1,
            description: `Frequently missing this specific success criterion in ${attempt.certificationTitle}.`,
            recommendation: 'Re-read the lesson and focus on the "Strengths" section of the feedback to see what was missing.',
            moduleId: attempt.lessonId
          });
        }
      });

      // Process risk notes
      attempt.riskNotes.forEach((risk) => {
        const id = `risk-note-${risk.toLowerCase().replace(/\s+/g, '-')}`;
        const existing = pitfalls.get(id);
        if (existing) {
          existing.frequency += 1;
        } else {
          pitfalls.set(id, {
            id,
            type: 'risk',
            label: risk,
            frequency: 1,
            description: `Identified risk pattern: ${risk}`,
            recommendation: 'Pay closer attention to DCS safety boundaries and escalation triggers.',
            moduleId: attempt.lessonId
          });
        }
      });
    }
  });

  // 3. Process Academic Assessment Attempts
  progress.academicAssessmentAttempts.forEach((attempt) => {
    if (attempt.score < 80) {
      attempt.missing.forEach((missed) => {
        const id = `missing-academic-${missed.toLowerCase().replace(/\s+/g, '-')}`;
        const existing = pitfalls.get(id);
        if (existing) {
          existing.frequency += 1;
        } else {
          pitfalls.set(id, {
            id,
            type: 'criteria',
            label: missed,
            frequency: 1,
            description: `Missing academic mastery criterion: ${missed}`,
            recommendation: 'Review the SILO mastery criteria for this subject.',
            moduleId: attempt.subjectId
          });
        }
      });
    }
  });

  // Sort by frequency descending and return top 5
  return Array.from(pitfalls.values())
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 5);
}
