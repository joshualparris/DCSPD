import { describe, expect, it } from 'vitest';
import {
  academicSubjectFromDraft,
  draftPackageFromSlgImport,
  publishAcademicDraft,
  validateAcademicDraftPackage
} from '../lib/academicPublish';
import { parseSlgTextDraft } from '../lib/slgImport';

const sampleText = `CSE9ZZ Test Subject
SILO 1 Explain test outcomes clearly.
1 03/03/2025 Week one topic (Lecture; Lab) 2
2 10/03/2025 Week two topic (Lecture; Lab) 2`;

describe('academicPublish', () => {
  it('builds a publishable subject from an SLG draft', () => {
    const draft = parseSlgTextDraft(sampleText, 'CSE9ZZ-test.pdf');
    const packageDraft = draftPackageFromSlgImport(draft);
    const result = publishAcademicDraft(packageDraft);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.subject.code).toBe('CSE9ZZ');
    expect(result.subject.silos.length).toBeGreaterThan(0);
    expect(result.subject.weeklyModules?.length).toBe(2);
    expect(result.subject.finalChallenge.title).toContain('CSE9ZZ');
  });

  it('rejects invalid draft packages', () => {
    const errors = validateAcademicDraftPackage({
      subjectCode: 'UNKNOWN',
      title: '',
      silos: [],
      weeklyModules: []
    });
    expect(errors.length).toBeGreaterThan(0);
  });

  it('maps academic subject fields for catalogue use', () => {
    const subject = academicSubjectFromDraft({
      subjectCode: 'CSE9ZZ',
      title: 'Test Subject',
      silos: [
        {
          id: 'cse9zz-silo1',
          number: 1,
          text: 'Outcome text',
          plainEnglish: 'Plain',
          masteryCriteria: ['A'],
          practicePrompts: ['B'],
          quizItems: ['C']
        }
      ],
      weeklyModules: [
        {
          id: 'cse9zz-week-1',
          week: 1,
          title: 'Week 1: Topic',
          deliveryModes: ['Lecture'],
          dcsConnections: ['DCS note'],
          assessments: [
            {
              title: 'Quick check',
              kind: 'quick-check',
              minutes: 10,
              evidenceType: 'reflection'
            }
          ]
        }
      ]
    });

    expect(subject.track).toBe('RBC');
    expect(subject.weeklyModules?.[0].assessments[0].prompt.length).toBeGreaterThan(10);
  });
});
