import { describe, expect, it } from 'vitest';
import { academicSubjects } from '../data/academicSubjects';
import { getAcademicSubjectProgress } from '../lib/academicProgress';
import { getDefaultProgress, saveAcademicAssessmentAttempt, type AcademicAssessmentAttempt } from '../lib/progress';

function attempt(overrides: Partial<AcademicAssessmentAttempt> = {}): AcademicAssessmentAttempt {
  return {
    id: 'attempt-1',
    createdAtIso: '2026-05-07T00:00:00.000Z',
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
    missing: ['Could connect more directly to support work'],
    riskNotes: ['Avoid private details'],
    betterAnswer: 'A stronger answer would include explicit support context.',
    nextPractice: 'Try another fake support scenario.',
    redactionSummary: 'No redactions applied.',
    privacyChecked: true,
    pdEntryId: 'pd-1',
    ...overrides
  };
}

describe('academic assessment progress', () => {
  it('stores academic assessment attempts newest first', () => {
    const progress = getDefaultProgress();
    const older = attempt({ id: 'older', createdAtIso: '2026-05-06T00:00:00.000Z', score: 70 });
    const newer = attempt({ id: 'newer', createdAtIso: '2026-05-07T00:00:00.000Z', score: 90 });

    const updated = saveAcademicAssessmentAttempt(saveAcademicAssessmentAttempt(progress, older), newer);

    expect(updated.academicAssessmentAttempts).toHaveLength(2);
    expect(updated.academicAssessmentAttempts[0].id).toBe('newer');
    expect(updated.academicAssessmentAttempts[0].score).toBe(90);
    expect(updated.academicAssessmentAttempts[1].id).toBe('older');
  });

  it('replaces an existing academic assessment attempt with the same id', () => {
    const progress = getDefaultProgress();
    const first = attempt({ score: 65, verdict: 'Partly correct' });
    const replacement = attempt({ score: 88, verdict: 'Correct', missing: [] });

    const updated = saveAcademicAssessmentAttempt(saveAcademicAssessmentAttempt(progress, first), replacement);

    expect(updated.academicAssessmentAttempts).toHaveLength(1);
    expect(updated.academicAssessmentAttempts[0].score).toBe(88);
    expect(updated.academicAssessmentAttempts[0].missing).toEqual([]);
  });

  it('calculates subject completion from unique completed assessments', () => {
    const cse1pe = academicSubjects.find((subject) => subject.code === 'CSE1PE');
    expect(cse1pe).toBeDefined();

    const attempts = [
      attempt({ id: 'first', assessmentId: 'cse1pe-w1-quick-check', score: 70 }),
      attempt({
        id: 'second',
        assessmentId: 'cse1pe-w1-quick-check',
        createdAtIso: '2026-05-08T00:00:00.000Z',
        score: 90
      }),
      attempt({ id: 'third', assessmentId: 'cse1pe-w1-flowchart-task', score: 80 })
    ];

    const progress = getAcademicSubjectProgress(cse1pe!, attempts);

    expect(progress.completedAssessments).toBe(2);
    expect(progress.totalAssessments).toBeGreaterThan(2);
    expect(progress.latestScore).toBe(90);
    expect(Math.round(progress.averageScore ?? 0)).toBe(85);
    expect(progress.completedAssessmentIds).toEqual(
      expect.arrayContaining(['cse1pe-w1-quick-check', 'cse1pe-w1-flowchart-task'])
    );
  });
});
