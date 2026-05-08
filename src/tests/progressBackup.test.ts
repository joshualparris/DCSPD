import { describe, expect, it } from 'vitest';
import {
  getDefaultProgress,
  parseProgressBackupJson,
  saveCertificationAssessmentAttempt,
  serializeProgressBackup,
  toggleAcademicFinalChallengeChecklistItem
} from '../lib/progress';

describe('progress backup and academic checklists', () => {
  it('serializes and parses a versioned progress backup', () => {
    const progress = getDefaultProgress();
    const json = serializeProgressBackup(progress);
    const parsed = parseProgressBackupJson(json);

    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.progress.modules).toEqual({});
      expect(parsed.progress.academicAssessmentAttempts).toEqual([]);
      expect(parsed.progress.academicFinalChallengeChecklists).toEqual({});
    }
  });

  it('rejects invalid backup json', () => {
    const parsed = parseProgressBackupJson('{"app":"Other"}');

    expect(parsed.ok).toBe(false);
  });

  it('toggles final challenge checklist state by subject', () => {
    const progress = getDefaultProgress();
    const first = toggleAcademicFinalChallengeChecklistItem(progress, 'cse1pe', 'cse1pe-final-brief');
    const second = toggleAcademicFinalChallengeChecklistItem(first, 'cse1pe', 'cse1pe-final-brief');

    expect(first.academicFinalChallengeChecklists?.cse1pe?.['cse1pe-final-brief']).toBe(true);
    expect(second.academicFinalChallengeChecklists?.cse1pe?.['cse1pe-final-brief']).toBe(false);
  });

  it('stores certification assessment attempts newest first', () => {
    const progress = getDefaultProgress();
    const first = saveCertificationAssessmentAttempt(progress, {
      id: 'attempt-1',
      createdAtIso: '2026-05-08T00:00:00.000Z',
      certificationId: 'comptia-aplus-220-1202-core-2',
      certificationTitle: 'CompTIA A+ 220-1202 Core 2',
      lessonId: 'lesson-1',
      lessonTitle: 'Operating Systems Overview',
      objectiveId: '1.1',
      objectiveTitle: 'Operating Systems',
      prompt: 'Explain operating systems.',
      userAnswer: 'Synthetic answer.',
      score: 80,
      longFormScore: 70,
      multipleChoiceScore: 90,
      multipleChoiceResponses: [
        {
          questionId: 'os-mcq-1',
          selectedOptionId: 'b',
          correctOptionId: 'b',
          correct: true,
          explanation: 'Synthetic explanation.'
        }
      ],
      strengths: ['Clear'],
      missing: [],
      riskNotes: [],
      betterAnswer: 'Better answer.',
      nextPractice: 'Next practice.',
      redactionSummary: 'No redactions applied.',
      privacyChecked: true
    });
    const second = saveCertificationAssessmentAttempt(first, {
      ...first.certificationAssessmentAttempts[0],
      id: 'attempt-2',
      createdAtIso: '2026-05-09T00:00:00.000Z',
      score: 92
    });

    expect(second.certificationAssessmentAttempts).toHaveLength(2);
    expect(second.certificationAssessmentAttempts[0].id).toBe('attempt-2');
    expect(second.certificationAssessmentAttempts[0].score).toBe(92);
    expect(second.certificationAssessmentAttempts[0].longFormScore).toBe(70);
    expect(second.certificationAssessmentAttempts[0].multipleChoiceScore).toBe(90);
    expect(second.certificationAssessmentAttempts[0].multipleChoiceResponses?.[0].correct).toBe(true);
  });
});
