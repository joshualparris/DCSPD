import { describe, expect, it } from 'vitest';
import { modules } from '../data/modules';

describe('module catalogue', () => {
  it('includes the expanded DCS workflow catalogue', () => {
    expect(modules.length).toBeGreaterThanOrEqual(20);

    const moduleIds = modules.map((module) => module.id);
    [
      'dcs-it-support-foundations',
      'printer-troubleshooting',
      'classroom-display-viewboard-troubleshooting',
      'login-and-password-support',
      'soft-skills-dcs-support',
      'cybersecurity-basics',
      'a-plus-laptop-hardware-core1'
    ].forEach((moduleId) => {
      expect(moduleIds).toContain(moduleId);
    });
  });

  it('keeps modules practical and fully populated', () => {
    const substantiveModules = modules.filter(
      (module) => module.sections.length > 0 && module.quiz.length > 0
    );

    expect(substantiveModules.length).toBeGreaterThanOrEqual(15);

    substantiveModules.forEach((module) => {
      expect(module.sections.length).toBeGreaterThanOrEqual(1);
      expect(module.flashcards.length).toBeGreaterThanOrEqual(2);
      expect(module.quiz.length).toBeGreaterThanOrEqual(1);
      expect(module.modulePattern.diagnosticQuestions.length).toBeGreaterThanOrEqual(1);
      expect(module.modulePattern.explainBackPrompt.prompt).toBeTruthy();
      expect(module.modulePattern.cornellPrompt.prompt).toBeTruthy();
      expect(module.modulePattern.sq3rPrompt.prompt).toBeTruthy();
      expect(module.quiz.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('uses the richer assessment metadata on module questions', () => {
    const question = modules[0]?.quiz[0];

    expect(question).toBeDefined();
    expect(question?.domain).toBeTruthy();
    expect(question?.difficulty).toBeTruthy();
    expect(question?.modelAnswer).toBeTruthy();
    expect(question?.commonMistakes.length).toBeGreaterThan(0);
    expect(question?.dcsContext).toBeTruthy();
    expect(question?.reviewSchedule).toBeTruthy();
  });
});
