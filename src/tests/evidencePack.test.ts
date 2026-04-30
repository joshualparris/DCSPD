import { describe, expect, it } from 'vitest';
import { generateEvidencePackMarkdown } from '../lib/evidencePack';
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

    const markdown = generateEvidencePackMarkdown(progress, {
      startDateIso: '2026-04-01',
      endDateIso: '2026-04-30',
      includeModules: true,
      includeScenarios: true,
      includePracticalOutputs: true,
      includeReflections: true,
      includeReadiness: false
    });

    expect(markdown).toContain('# DCSPrep Professional Development Evidence Pack');
    expect(markdown).toContain('## Privacy reminder');
    expect(markdown).toContain('## Summary');
    expect(markdown).toContain('## Reflections (privacy-checked)');
  });
});

