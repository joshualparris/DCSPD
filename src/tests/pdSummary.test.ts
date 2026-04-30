import { describe, expect, it } from 'vitest';
import { generateMonthlyPdSummary, generatePdSummaryForRange } from '../lib/pdSummary';
import type { UserProgress } from '../lib/progress';

function baseProgress(): UserProgress {
  return {
    modules: {},
    assessmentAttempts: [],
    scenarioRuns: [],
    pdEntries: [],
    pdLogEntries: [],
    weakTopicReviews: {},
    focusSessions: []
  };
}

describe('pdSummary', () => {
  it('summarises a monthly range from pdEntries', () => {
    const progress = baseProgress();
    progress.pdEntries = [
      {
        id: 'pd-1',
        createdAtIso: '2026-04-01T00:00:00.000Z',
        type: 'module-study',
        title: 'Studied DNS basics',
        minutes: 20,
        moduleIds: ['dns-dhcp-gateway-ip-basics'],
        evidenceSummary: 'Reviewed DNS vs DHCP and wrote a short explanation.',
        privacyChecked: true
      },
      {
        id: 'pd-2',
        createdAtIso: '2026-04-15T00:00:00.000Z',
        type: 'scenario',
        title: 'Scenario complete',
        minutes: 15,
        scenarioIds: ['hdmi-works-no-audio'],
        evidenceSummary: 'Completed scenario practice.',
        privacyChecked: true
      }
    ];

    const summary = generateMonthlyPdSummary(progress, '2026-04');

    expect(summary.totalMinutes).toBe(35);
    expect(summary.entryCount).toBe(2);
    expect(summary.moduleCount).toBe(1);
    expect(summary.scenariosCompleted).toBe(1);
  });

  it('summarises an explicit date range', () => {
    const progress = baseProgress();
    progress.pdEntries = [
      {
        id: 'pd-1',
        createdAtIso: '2026-03-30T00:00:00.000Z',
        type: 'reflection',
        title: 'Old month',
        minutes: 5,
        evidenceSummary: 'Out of range',
        privacyChecked: true
      },
      {
        id: 'pd-2',
        createdAtIso: '2026-04-02T00:00:00.000Z',
        type: 'reflection',
        title: 'In range',
        minutes: 10,
        evidenceSummary: 'In range',
        privacyChecked: true
      }
    ];

    const summary = generatePdSummaryForRange(progress, '2026-04-01', '2026-04-30');
    expect(summary.entryCount).toBe(1);
    expect(summary.totalMinutes).toBe(10);
  });
});

