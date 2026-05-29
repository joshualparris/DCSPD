import { describe, expect, it } from 'vitest';
import { modules } from '../data/modules';
import { scenarios } from '../data/scenarios';
import { getInitialProgressSnapshot } from '../lib/progress';
import { buildWeeklyPdPath } from '../lib/weeklyPdPath';

describe('weeklyPdPath', () => {
  it('returns a five-day blended PD plan', () => {
    const progress = getInitialProgressSnapshot(modules);
    const path = buildWeeklyPdPath(modules, scenarios, progress);

    expect(path.items.length).toBeGreaterThan(0);
    expect(path.items.length).toBeLessThanOrEqual(5);
    expect(path.totalMinutes).toBeGreaterThan(0);
    expect(path.items[0].dayLabel).toBe('Mon');
  });
});
