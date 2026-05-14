import { describe, expect, it } from 'vitest';
import {
  buildCustomRoleplay,
  buildCustomTrainingModule,
  DEFAULT_CUSTOM_MODULE_EDITOR_INPUT,
  DEFAULT_CUSTOM_ROLEPLAY_EDITOR_INPUT
} from '../lib/customContentEditor';
import { initialNetworkNodes, networkLearningHotspots } from '../data/networkSim';

describe('custom content editor builders', () => {
  it('builds a usable custom training module from form fields', () => {
    const draftModule = buildCustomTrainingModule({
      ...DEFAULT_CUSTOM_MODULE_EDITOR_INPUT,
      title: 'PaperCut Release Queue Practice',
      domain: 'Endpoint Support',
      sectionsText: 'Release queue | Check PaperCut release state before reinstalling printers.',
      flashcardsText: 'What comes before reinstalling a printer? | Check queue, release, and scope.'
    });

    expect(draftModule.id).toBe('custom-papercut-release-queue-practice');
    expect(draftModule.domain).toBe('Endpoint Support');
    expect(draftModule.sections[0].title).toBe('Release queue');
    expect(draftModule.flashcards[0].front).toContain('reinstalling');
    expect(draftModule.quiz[0].type).toBe('short-answer');
    expect(draftModule.modulePattern.safePromptWorkflow?.privacyReminder).toContain('Do not paste live DCS data');
    expect(draftModule.scenarioPrompts).toHaveLength(1);
    expect(draftModule.practicalOutputs).toHaveLength(1);
  });

  it('builds a roleplay persona with stable focus tags', () => {
    const roleplay = buildCustomRoleplay({
      ...DEFAULT_CUSTOM_ROLEPLAY_EDITOR_INPUT,
      persona: 'Morgan Lee',
      issueTitle: 'Library Wi-Fi Dropout',
      pressure: 'High',
      focusText: 'Wi-Fi, de-escalation, scope'
    });

    expect(roleplay.id).toBe('custom-roleplay-morgan-lee-library-wi-fi-dropout');
    expect(roleplay.pressure).toBe('High');
    expect(roleplay.focus).toEqual(['Wi-Fi', 'de-escalation', 'scope']);
  });
});

describe('network learning hotspots', () => {
  it('links each network map node to a learning task', () => {
    const nodeIds = initialNetworkNodes.map((node) => node.id);
    const hotspotNodeIds = networkLearningHotspots.map((hotspot) => hotspot.nodeId);

    expect(new Set(hotspotNodeIds).size).toBe(hotspotNodeIds.length);
    expect(hotspotNodeIds.sort()).toEqual(nodeIds.sort());
    networkLearningHotspots.forEach((hotspot) => {
      expect(hotspot.href).toBe(`/modules/${hotspot.moduleId}`);
      expect(hotspot.label).toBeTruthy();
      expect(hotspot.task.length).toBeGreaterThan(20);
    });
  });
});
