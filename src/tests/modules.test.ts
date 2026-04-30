import { describe, expect, it } from 'vitest';
import { modules } from '../data/modules';

describe('module catalogue', () => {
  it('includes the expanded DCS workflow catalogue', () => {
    expect(modules.length).toBeGreaterThanOrEqual(20);

    expect(modules.map((module) => module.id)).toEqual(
      expect.arrayContaining([
        'dcs-it-support-foundations',
        'ports-and-protocols',
        'dns-dhcp-gateway-ip-basics',
        'printer-troubleshooting',
        'classroom-display-viewboard-troubleshooting',
        'm365-identity-offboarding-basics',
        'mdm-intune-group-policy-concepts',
        'vlans-network-segmentation',
        'cloud-models-saas-paas-iaas-daas',
        'ticket-notes-escalation-quality',
        'parent-portal-registration',
        'parent-portal-details-updates',
        'sentral-support',
        'ourdcs-schoolbox-support',
        'login-and-password-support',
        'permissions-and-access-requests',
        'website-filtering-and-unblock-requests',
        'new-user-onboarding',
        'teams-sharepoint-onedrive-support',
        'ipad-jamf-workflow-basics',
        'a-plus-laptop-hardware-core1',
        'a-plus-mobile-connectivity-mdm-core1',
        'a-plus-network-core1-ports-protocols-services'
      ])
    );
  });

  it('keeps modules practical and fully populated', () => {
    modules.forEach((module) => {
      expect(module.sections.length).toBeGreaterThanOrEqual(3);
      expect(module.flashcards.length).toBeGreaterThanOrEqual(8);
      expect(module.quiz.length).toBeGreaterThanOrEqual(4);
      expect(module.modulePattern.diagnosticQuestions.length).toBeGreaterThanOrEqual(2);
      expect(module.modulePattern.explainBackPrompt.prompt).toBeTruthy();
      expect(module.modulePattern.cornellPrompt.prompt).toBeTruthy();
      expect(module.modulePattern.sq3rPrompt.prompt).toBeTruthy();
      expect(module.scenarioPrompts.length).toBeGreaterThanOrEqual(1);
      expect(module.practicalOutputs.length).toBeGreaterThanOrEqual(1);
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
