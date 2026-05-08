import { describe, expect, it } from 'vitest';
import { getAcademicSubjectByCode, getAcademicWeeklyModules } from '../data/academicSubjects';
import {
  getAcademicFinalChallengeChecklist,
  getAcademicSiloProgress,
  getAcademicSubjectFlashcards
} from '../lib/academicSiloProgress';
import type { AcademicAssessmentAttempt } from '../lib/progress';

function attempt(overrides: Partial<AcademicAssessmentAttempt> = {}): AcademicAssessmentAttempt {
  return {
    id: 'attempt-1',
    createdAtIso: '2026-05-08T00:00:00.000Z',
    subjectId: 'cse1pe',
    subjectCode: 'CSE1PE',
    subjectTitle: 'Programming Environment',
    track: 'RBC',
    stream: 'programming',
    weeklyModuleId: 'cse1pe-week-1-algorithms-flowcharts',
    weeklyModuleTitle: 'Week 1 - Topic 1: Algorithms and Flowcharts',
    week: 1,
    assessmentId: 'cse1pe-w1-quick-check',
    assessmentTitle: 'Quick check: input, process, output',
    assessmentKind: 'quick-check',
    evidenceType: 'reflection',
    prompt: 'Identify inputs, outputs, decisions, and success criteria.',
    userAnswer: 'Synthetic answer only.',
    successCriteria: ['Lists inputs', 'Names outcome'],
    siloIds: ['cse1pe-silo1'],
    dcsApplication: 'Improves support intake quality.',
    score: 85,
    verdict: 'Correct',
    strengths: ['Explains the idea clearly'],
    missing: [],
    riskNotes: [],
    betterAnswer: 'A stronger answer would include explicit support context.',
    nextPractice: 'Try another fake support scenario.',
    redactionSummary: 'No redactions applied.',
    privacyChecked: true,
    ...overrides
  };
}

describe('academic SILO progress helpers', () => {
  it('generates flashcards from subject SILOs', () => {
    const subject = getAcademicSubjectByCode('CSE1PE');
    expect(subject).toBeDefined();

    const cards = getAcademicSubjectFlashcards(subject!);

    expect(cards.length).toBeGreaterThan(subject!.silos.length);
    expect(cards[0].front).toContain('CSE1PE');
    expect(cards[0].back).toBeTruthy();
  });

  it('calculates per-SILO completion from latest assessment attempts', () => {
    const subject = getAcademicSubjectByCode('CSE1PE');
    expect(subject).toBeDefined();

    const firstModule = getAcademicWeeklyModules(subject!)[0];
    const firstAssessment = firstModule.assessments[0];
    const progress = getAcademicSiloProgress(subject!, [
      attempt({
        assessmentId: firstAssessment.id,
        weeklyModuleId: firstModule.id,
        weeklyModuleTitle: firstModule.title,
        siloIds: firstAssessment.siloIds,
        score: 90
      })
    ]);

    const relatedSilo = progress.find((silo) => firstAssessment.siloIds.includes(silo.siloId));

    expect(relatedSilo?.completedAssessments).toBe(1);
    expect(relatedSilo?.completionPercent).toBeGreaterThan(0);
    expect(Math.round(relatedSilo?.averageScore ?? 0)).toBe(90);
  });

  it('builds a final challenge checklist for each subject', () => {
    const subject = getAcademicSubjectByCode('CSE1PE');
    expect(subject).toBeDefined();

    const checklist = getAcademicFinalChallengeChecklist(subject!);

    expect(checklist).toHaveLength(5);
    expect(checklist.map((item) => item.id)).toEqual(expect.arrayContaining(['cse1pe-final-brief']));
  });
});
