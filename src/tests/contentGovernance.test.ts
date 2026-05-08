import { describe, expect, it } from 'vitest';
import { getContentGovernanceRecords, getContentGovernanceSummary } from '../lib/contentGovernance';

describe('content governance', () => {
  it('builds review records for academic subjects and DCS modules', () => {
    const records = getContentGovernanceRecords('2026-05-08');
    const summary = getContentGovernanceSummary(records);

    expect(records.length).toBeGreaterThan(20);
    expect(summary.total).toBe(records.length);
    expect(records.some((record) => record.type === 'Academic subject')).toBe(true);
    expect(records.some((record) => record.type === 'DCS module')).toBe(true);
  });

  it('flags manual-check or placeholder sources for review', () => {
    const records = getContentGovernanceRecords('2026-05-08');

    expect(records.some((record) => record.status === 'needs-source-check')).toBe(true);
  });
});
