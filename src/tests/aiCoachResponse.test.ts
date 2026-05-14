import { describe, expect, it } from 'vitest';
import { normaliseCoachResponse } from '../lib/ai/coachResponse';

describe('normaliseCoachResponse', () => {
  it('accepts common Groq response variants and keeps the UI contract stable', () => {
    const result = normaliseCoachResponse(
      {
        score: '88/100',
        strengths: 'Clear triage\n- Good privacy boundary',
        gaps: ['Add escalation timing'],
        risks: 'No real names included.',
        better_answer: 'Record the symptoms, impact, attempted fix, and safe escalation path.',
        next_steps: 'Practise writing the same note in two sentences.'
      },
      {
        contextType: 'short-answer',
        userAnswer: 'I would record the issue, avoid private data, and escalate if needed.',
        modelAnswer: 'Record issue, evidence, safe action, and escalation path.',
        rubric: ['Identify the issue clearly', 'Name privacy-safe evidence']
      }
    );

    expect(result.score).toBe(88);
    expect(result.strengths).toEqual(['Clear triage', 'Good privacy boundary']);
    expect(result.missing).toEqual(['Add escalation timing']);
    expect(result.riskNotes).toEqual(['No real names included.']);
    expect(result.betterAnswer).toContain('safe escalation path');
    expect(result.nextPractice).toContain('two sentences');
    expect(result.rubricGrade?.criteriaResults).toHaveLength(2);
  });

  it('repairs malformed rubric grades from model output', () => {
    const result = normaliseCoachResponse({
      score: 75,
      strengths: ['Good first-pass diagnosis.'],
      missing: [],
      riskNotes: [],
      betterAnswer: 'Ask for the room, device, symptoms, and impact before escalating.',
      nextPractice: 'Try a physical-security ticket next.',
      rubricGrade: {
        score: '3',
        max_score: '4',
        percent: '75%',
        level: 'Good',
        privacy_flags: 'Do not include staff or student names.',
        criteria_results: [
          {
            id: 'triage',
            criterion: 'Triage detail',
            points_awarded: '1',
            points_possible: '1',
            comment: 'Enough initial triage detail.'
          }
        ]
      }
    });

    expect(result.rubricGrade?.score).toBe(3);
    expect(result.rubricGrade?.maxScore).toBe(4);
    expect(result.rubricGrade?.percentage).toBe(75);
    expect(result.rubricGrade?.level).toBe('strong');
    expect(result.rubricGrade?.privacyFlags).toEqual(['Do not include staff or student names.']);
    expect(result.rubricGrade?.criteriaResults[0]).toMatchObject({
      criterionId: 'triage',
      label: 'Triage detail',
      met: true
    });
  });

  it('returns a graceful fallback when the model omits the score', () => {
    const result = normaliseCoachResponse(
      {
        improvedAnswer: 'Use a concise note with impact, evidence, safe action, and escalation.'
      },
      {
        contextType: 'freeform',
        userAnswer: 'Please help me improve this response.'
      }
    );

    expect(result.score).toBe(50);
    expect(result.riskNotes[0]).toContain('omitted a numeric score');
    expect(result.betterAnswer).toContain('concise note');
    expect(result.nextPractice).toContain('evidence');
  });
});
