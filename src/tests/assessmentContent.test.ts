import { describe, expect, it } from 'vitest';
import { strictQuestionBank } from '../data/questions';
import { scenarios } from '../data/scenarios';

describe('assessment content coverage', () => {
  it('keeps the strict bank above the 80-question target with mixed formats', () => {
    expect(strictQuestionBank.length).toBeGreaterThanOrEqual(80);
    expect(strictQuestionBank.some((question) => question.type === 'short-answer')).toBe(true);
    expect(strictQuestionBank.some((question) => question.type === 'order-steps')).toBe(true);
    expect(strictQuestionBank.some((question) => question.type === 'scenario-response')).toBe(true);
    expect(strictQuestionBank.some((question) => question.type === 'categorization')).toBe(true);
  });

  it('provides a scored Jira-note workflow for every scenario', () => {
    expect(scenarios.length).toBeGreaterThanOrEqual(13);

    scenarios.forEach((scenario) => {
      expect(scenario.steps.length).toBeGreaterThanOrEqual(3);
      expect(scenario.jiraNotePrompt).toBeTruthy();
      expect(scenario.noteRubric.length).toBeGreaterThanOrEqual(5);
    });
  });
});
