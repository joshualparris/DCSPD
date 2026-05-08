import { describe, expect, it } from 'vitest';
import { roleplayScenarios } from '../data/roleplayScenarios';

describe('roleplay scenarios', () => {
  it('includes a broad K-12 support roleplay catalogue', () => {
    expect(roleplayScenarios.length).toBeGreaterThanOrEqual(23);

    const scenarioIds = roleplayScenarios.map((scenario) => scenario.id);
    expect(new Set(scenarioIds).size).toBe(roleplayScenarios.length);

    expect(scenarioIds).toEqual(
      expect.arrayContaining([
        'frozen-interactive-whiteboard',
        'rogue-phishing-click',
        'front-office-printing-disaster',
        'visual-arts-web-filter-block',
        'maintenance-portal-password',
        'student-ipad-boot-loop',
        'vip-assembly-av-fail',
        'missing-cloud-file-panic',
        'athletics-software-admin-loop',
        'demountable-wifi-blackspot'
      ])
    );
  });

  it('gives every scenario enough roleplay metadata for coaching', () => {
    roleplayScenarios.forEach((scenario) => {
      expect(scenario.persona).toBeTruthy();
      expect(scenario.archetype).toBeTruthy();
      expect(scenario.issueTitle).toBeTruthy();
      expect(scenario.scenario.length).toBeGreaterThan(60);
      expect(scenario.itChallenge.length).toBeGreaterThan(60);
      expect(scenario.initialPrompt.length).toBeGreaterThan(30);
      expect(scenario.focus.length).toBeGreaterThanOrEqual(3);
      expect(['Low', 'Medium', 'High', 'Critical']).toContain(scenario.pressure);
    });
  });

  it('includes a dedicated Level 2 delegated systems scenario section', () => {
    const level2Scenarios = roleplayScenarios.filter((scenario) => scenario.tier === 'Level 2');
    const level2Ids = level2Scenarios.map((scenario) => scenario.id);

    expect(level2Scenarios).toHaveLength(10);
    expect(level2Ids).toEqual(
      expect.arrayContaining([
        'l2-staff-offboarding-m365-ad',
        'l2-sentral-parent-portal-rollout',
        'l2-ipad-jamf-intune-provisioning',
        'l2-year12-account-archiving',
        'l2-papercut-print-quota-allocation',
        'l2-naplan-locked-browser-deployment',
        'l2-asset-ewaste-secure-wipe',
        'l2-vivi-firmware-fleet-update',
        'l2-bell-pa-custom-schedule',
        'l2-phishing-breach-defender-investigation'
      ])
    );

    level2Scenarios.forEach((scenario) => {
      expect(scenario.managerDelegation?.length).toBeGreaterThan(60);
      expect(scenario.workflow?.length).toBeGreaterThan(80);
      expect(scenario.challenge?.length).toBeGreaterThan(70);
      expect(scenario.focus.length).toBeGreaterThanOrEqual(5);
    });
  });
});
