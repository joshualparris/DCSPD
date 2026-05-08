import { describe, expect, it } from 'vitest';
import { getDefaultProgress } from '../lib/progress';
import { buildSupervisorCsv, getSupervisorAnalytics } from '../lib/supervisorAnalytics';

describe('supervisor analytics', () => {
  it('summarises empty progress without exposing private detail', () => {
    const progress = getDefaultProgress();
    const analytics = getSupervisorAnalytics(progress);
    const csv = buildSupervisorCsv(progress);

    expect(analytics.totalPdMinutes).toBe(0);
    expect(analytics.managerNotes.length).toBeGreaterThan(0);
    expect(csv).toContain('Overall progress percent');
  });
});
