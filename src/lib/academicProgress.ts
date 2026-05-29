import { getAcademicWeeklyModules } from '../data/academicSubjects';
import type { AcademicSubject } from '../types/academic';
import type { AcademicAssessmentAttempt } from './progress';

export type AcademicSubjectProgress = {
  subjectId: string;
  subjectCode: string;
  completedAssessments: number;
  totalAssessments: number;
  completionPercent: number;
  completionPercentage: number; // For UI compatibility
  averageRetentionScore: number; // For UI compatibility
  totalPoints: number; // For UI compatibility
  completedWeeks: number;
  totalWeeks: number;
  averageScore: number | null;
  latestScore: number | null;
  latestAttemptIso?: string;
  completedAssessmentIds: string[];
};

function average(values: number[]) {
  if (!values.length) {
    return null;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function isAttemptForSubject(subject: AcademicSubject, attempt: AcademicAssessmentAttempt) {
  return attempt.subjectId === subject.id || attempt.subjectCode.toLowerCase() === subject.code.toLowerCase();
}

export function getAcademicSubjectProgress(
  subject: AcademicSubject,
  attempts: AcademicAssessmentAttempt[]
): AcademicSubjectProgress {
  const weeklyModules = getAcademicWeeklyModules(subject);
  const assessmentIds = weeklyModules.flatMap((module) => module.assessments.map((assessment) => assessment.id));
  const assessmentIdSet = new Set(assessmentIds);

  const latestByAssessment = new Map<string, AcademicAssessmentAttempt>();
  attempts
    .filter((attempt) => isAttemptForSubject(subject, attempt) && assessmentIdSet.has(attempt.assessmentId))
    .forEach((attempt) => {
      const existing = latestByAssessment.get(attempt.assessmentId);
      if (!existing || existing.createdAtIso < attempt.createdAtIso) {
        latestByAssessment.set(attempt.assessmentId, attempt);
      }
    });

  const completedAssessmentIds = Array.from(latestByAssessment.keys());
  const completedAssessments = completedAssessmentIds.length;
  const totalAssessments = assessmentIds.length;
  const scores = Array.from(latestByAssessment.values()).map((attempt) => attempt.score);
  const latestAttempt = Array.from(latestByAssessment.values()).sort((left, right) =>
    left.createdAtIso < right.createdAtIso ? 1 : -1
  )[0];

  const completedWeeks = weeklyModules.filter((module) =>
    module.assessments.every((assessment) => latestByAssessment.has(assessment.id))
  ).length;

  const completionPercent = totalAssessments ? Math.round((completedAssessments / totalAssessments) * 100) : 0;

  return {
    subjectId: subject.id,
    subjectCode: subject.code,
    completedAssessments,
    totalAssessments,
    completionPercent,
    completionPercentage: completionPercent,
    averageRetentionScore: average(scores) ? Math.round(average(scores)!) : 0,
    totalPoints: completedAssessments * 10, // Basic point system
    completedWeeks,
    totalWeeks: weeklyModules.length,
    averageScore: average(scores),
    latestScore: latestAttempt?.score ?? null,
    latestAttemptIso: latestAttempt?.createdAtIso,
    completedAssessmentIds
  };
}

export function getAcademicSubjectProgressList(
  subjects: AcademicSubject[],
  attempts: AcademicAssessmentAttempt[]
) {
  return subjects.map((subject) => getAcademicSubjectProgress(subject, attempts));
}
