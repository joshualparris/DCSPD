import { describe, expect, it } from 'vitest';
import { generateEvidencePackMarkdown } from '../lib/evidencePack';
import {
  getDefaultProgress,
  type AcademicAssessmentAttempt,
  type CertificationAssessmentAttempt,
  type RoleplayFeedbackAttempt,
  type UserProgress
} from '../lib/progress';
import type { AssessmentAttempt } from '../types/assessment';

function baseProgress(): UserProgress {
  return getDefaultProgress();
}

const defaultOptions = {
  startDateIso: '2026-04-01',
  endDateIso: '2026-04-30',
  includeModules: true,
  includeScenarios: true,
  includePracticalOutputs: true,
  includeReflections: true,
  includeFeedbackEvidence: true,
  includeReadiness: false
};

function moduleAttempt(): AssessmentAttempt {
  return {
    id: 'attempt-1',
    questionId: 'q-1',
    questionType: 'short-answer',
    prompt: 'Explain what a privacy-safe escalation note should include.',
    domain: 'Ticket quality',
    weakTopic: 'ticket-quality',
    recommendedModuleId: 'ticket-notes-escalation-quality',
    source: 'strict-quiz',
    confidence: 2,
    answerSummary: 'Synthetic answer summary.',
    reasoningSummary: 'Synthetic reasoning summary.',
    judgementSummary: 'Synthetic judgement summary.',
    selfRating: {
      correctness: 2,
      reasoning: 2,
      judgement: 2
    },
    scoreBreakdown: {
      correctness: 0.8,
      reasoning: 0.8,
      judgement: 0.8,
      total: 0.8,
      autoMarked: true
    },
    feedback: {
      correctness: 'Good privacy-safe structure.',
      reasoning: 'Model answer.',
      judgement: 'Sound judgement.',
      correctedConcept: 'Add clear next owner.',
      nextReviewDateIso: '2026-04-08'
    },
    timestampIso: '2026-04-05T00:00:00.000Z',
    shouldRevisit: false,
    nextReviewDateIso: '2026-04-08'
  };
}

function academicAttempt(): AcademicAssessmentAttempt {
  return {
    id: 'academic-1',
    createdAtIso: '2026-04-06T00:00:00.000Z',
    subjectId: 'cse1pe',
    subjectCode: 'CSE1PE',
    subjectTitle: 'Programming Environment',
    track: 'RBC',
    stream: 'Programming / Automation',
    weeklyModuleId: 'cse1pe-w1',
    weeklyModuleTitle: 'Week 1 - Topic 1: Algorithms and Flowcharts',
    week: 1,
    assessmentId: 'cse1pe-w1-a1',
    assessmentTitle: 'Flowchart quick check',
    assessmentKind: 'Quick check',
    evidenceType: 'reflection',
    prompt: 'Explain input, process, output, and decisions.',
    userAnswer: 'Synthetic answer.',
    successCriteria: ['Names inputs', 'Names outputs'],
    siloIds: ['SILO1'],
    dcsApplication: 'Support checklist design.',
    score: 85,
    verdict: 'Mostly correct',
    strengths: ['Clear explanation', 'Good DCS link'],
    missing: ['More explicit success criteria'],
    riskNotes: ['Keep examples synthetic'],
    betterAnswer: 'A stronger answer names inputs, decisions, outputs, and success criteria.',
    nextPractice: 'Build a synthetic troubleshooting flowchart.',
    redactionSummary: 'No redactions applied.',
    privacyChecked: true
  };
}

function roleplayAttempt(): RoleplayFeedbackAttempt {
  return {
    id: 'roleplay-1',
    createdAtIso: '2026-04-07T00:00:00.000Z',
    persona: 'Ms. Lee (New Art Teacher)',
    scenario: 'Synthetic display support scenario.',
    exchangeCount: 3,
    exchanges: [],
    sentimentTrajectory: ['neutral', 'satisfied', 'neutral'],
    averageSentiment: 'neutral',
    keyTopics: ['empathy', 'technical'],
    coachNotesSummary: 'Good empathy and clearer next step.',
    durationSeconds: 300,
    satisfactionScore: 66
  };
}

function certificationAttempt(): CertificationAssessmentAttempt {
  return {
    id: 'cert-1',
    createdAtIso: '2026-04-08T00:00:00.000Z',
    certificationId: 'comptia-aplus-220-1202-core-2',
    certificationTitle: 'CompTIA A+ 220-1202 Core 2',
    lessonId: 'aplus-220-1202-1-1-operating-systems-overview',
    lessonTitle: 'Operating Systems Overview',
    objectiveId: '1.1',
    objectiveTitle: 'Operating Systems',
    prompt: 'Explain Operating Systems Overview in plain English.',
    userAnswer: 'Synthetic certification answer.',
    score: 88,
    longFormScore: 86,
    multipleChoiceScore: 90,
    multipleChoiceResponses: [
      {
        questionId: 'os-mcq-1',
        selectedOptionId: 'b',
        correctOptionId: 'b',
        correct: true,
        explanation: 'Synthetic MCQ explanation.'
      }
    ],
    strengths: ['Clear A+ explanation', 'Good privacy boundary'],
    missing: ['Add one more escalation trigger'],
    riskNotes: ['Keep examples synthetic'],
    betterAnswer: 'A stronger answer names the OS role, symptoms, safe checks, and escalation boundary.',
    nextPractice: 'Practise a fake classroom display support scenario.',
    redactionSummary: 'No redactions applied.',
    privacyChecked: true
  };
}

describe('evidencePack', () => {
  it('generates privacy-safe markdown with required headings', () => {
    const progress = baseProgress();
    progress.pdEntries = [
      {
        id: 'pd-1',
        createdAtIso: '2026-04-05T00:00:00.000Z',
        type: 'reflection',
        title: 'Reflection',
        minutes: 15,
        evidenceSummary: 'Kept it privacy safe.',
        privacyChecked: true
      }
    ];

    const markdown = generateEvidencePackMarkdown(progress, defaultOptions);

    expect(markdown).toContain('# DCSPrep Professional Development Evidence Pack');
    expect(markdown).toContain('## Privacy reminder');
    expect(markdown).toContain('## Summary');
    expect(markdown).toContain('## Reflections (privacy-checked)');
  });

  it('includes feedback log evidence from completed assessments and roleplay sessions', () => {
    const progress = baseProgress();
    progress.assessmentAttempts = [moduleAttempt()];
    progress.academicAssessmentAttempts = [academicAttempt()];
    progress.certificationAssessmentAttempts = [certificationAttempt()];
    progress.roleplayFeedbackAttempts = [roleplayAttempt()];

    const markdown = generateEvidencePackMarkdown(progress, defaultOptions);

    expect(markdown).toContain('- Feedback evidence items: 4');
    expect(markdown).toContain('### Module quiz and strict-quiz feedback');
    expect(markdown).toContain('Ticket quality - 80%');
    expect(markdown).toContain('### Academic PD assessment feedback');
    expect(markdown).toContain('CSE1PE Week 1 - Flowchart quick check - 85%');
    expect(markdown).toContain('### Certification assessment feedback');
    expect(markdown).toContain('CompTIA A+ 220-1202 Core 2 Objective 1.1 - Operating Systems Overview - 88%');
    expect(markdown).toContain('MCQ score: 90%');
    expect(markdown).toContain('### Roleplay coaching evidence');
    expect(markdown).toContain('Ms. Lee (New Art Teacher)');
    expect(markdown).not.toContain('Synthetic answer.');
    expect(markdown).not.toContain('Synthetic certification answer.');
  });
});
