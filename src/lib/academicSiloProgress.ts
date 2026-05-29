import { getAcademicWeeklyModules } from '../data/academicSubjects';
import type { AcademicSubject } from '../types/academic';
import type { AcademicAssessmentAttempt } from './progress';

export type AcademicSiloFlashcard = {
  id: string;
  siloId: string;
  front: string;
  back: string;
};

export type AcademicSiloProgress = {
  siloId: string;
  id: string; // For UI compatibility
  siloNumber: number;
  label: string;
  title: string; // For UI compatibility
  completedAssessments: number;
  totalAssessments: number;
  completionPercent: number;
  completionPercentage: number; // For UI compatibility
  averageScore: number | null;
  flashcards: AcademicSiloFlashcard[];
  conceptChecklist: {
    id: string;
    label: string;
    isMastered: boolean;
  }[];
};

function average(values: number[]) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function isAttemptForSubject(subject: AcademicSubject, attempt: AcademicAssessmentAttempt) {
  return attempt.subjectId === subject.id || attempt.subjectCode.toLowerCase() === subject.code.toLowerCase();
}

export function getAcademicSubjectFlashcards(subject: AcademicSubject): AcademicSiloFlashcard[] {
  return subject.silos.flatMap((silo) => [
    {
      id: `${silo.id}-plain-english`,
      siloId: silo.id,
      front: `Explain ${subject.code} SILO ${silo.number} in plain English.`,
      back: silo.plainEnglish
    },
    ...silo.masteryCriteria.slice(0, 3).map((criterion, index) => ({
      id: `${silo.id}-mastery-${index + 1}`,
      siloId: silo.id,
      front: `What mastery evidence would prove ${subject.code} SILO ${silo.number}?`,
      back: criterion
    })),
    ...silo.quizItems.slice(0, 3).map((item, index) => ({
      id: `${silo.id}-quiz-${index + 1}`,
      siloId: silo.id,
      front: item,
      back: silo.practicePrompts[index] || silo.plainEnglish
    }))
  ]);
}

export function getAcademicSiloProgress(
  subject: AcademicSubject,
  attempts: AcademicAssessmentAttempt[]
): AcademicSiloProgress[] {
  const weeklyModules = getAcademicWeeklyModules(subject);
  const flashcards = getAcademicSubjectFlashcards(subject);
  const latestByAssessment = new Map<string, AcademicAssessmentAttempt>();

  attempts.filter((attempt) => isAttemptForSubject(subject, attempt)).forEach((attempt) => {
    const existing = latestByAssessment.get(attempt.assessmentId);
    if (!existing || existing.createdAtIso < attempt.createdAtIso) {
      latestByAssessment.set(attempt.assessmentId, attempt);
    }
  });

  return subject.silos.map((silo) => {
    const relatedAssessments = weeklyModules.flatMap((module) =>
      module.assessments.filter((assessment) => assessment.siloIds.includes(silo.id))
    );
    const relatedAssessmentIds = new Set(relatedAssessments.map((assessment) => assessment.id));
    const totalAssessments = relatedAssessments.length;
    const completedAttempts = Array.from(latestByAssessment.values()).filter((attempt) =>
      relatedAssessmentIds.has(attempt.assessmentId)
    );
    const completedAssessments = completedAttempts.length;
    const completionPercent = totalAssessments ? Math.round((completedAssessments / totalAssessments) * 100) : 0;

    return {
      siloId: silo.id,
      id: silo.id,
      siloNumber: silo.number,
      label: `SILO ${silo.number}`,
      title: silo.text || `SILO ${silo.number}`,
      completedAssessments,
      totalAssessments,
      completionPercent,
      completionPercentage: completionPercent,
      averageScore: average(completedAttempts.map((attempt) => attempt.score)),
      flashcards: flashcards.filter((card) => card.siloId === silo.id),
      conceptChecklist: silo.masteryCriteria.map((criterion, index) => ({
        id: `${silo.id}-mastery-${index}`,
        label: criterion,
        isMastered: completedAssessments > index // Simple heuristic for mastery
      }))
    };
  });
}

export function getAcademicFinalChallengeChecklist(subject: AcademicSubject) {
  return [
    {
      id: `${subject.id}-final-brief`,
      label: 'Restate the final challenge in your own words',
      detail: subject.finalChallenge.brief
    },
    {
      id: `${subject.id}-privacy-check`,
      label: 'Confirm the artifact uses only fake, synthetic, or anonymised examples',
      detail: 'No live DCS incident, student, staff, parent, credential, network, health, wellbeing, or custody detail.'
    },
    {
      id: `${subject.id}-silo-map`,
      label: 'Map the artifact to at least two SILOs',
      detail: subject.silos.slice(0, 2).map((silo) => `SILO ${silo.number}: ${silo.plainEnglish}`).join(' ')
    },
    {
      id: `${subject.id}-dcs-bridge`,
      label: 'Connect the artifact to a practical DCS support improvement',
      detail: subject.dcsBridges[0]?.explanation || subject.recommendedNextAction || 'Name the support improvement.'
    },
    {
      id: `${subject.id}-evidence-log`,
      label: 'Log the final challenge as PD evidence',
      detail: subject.finalChallenge.evidence
    }
  ];
}
