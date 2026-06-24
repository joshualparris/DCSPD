import { describe, expect, it } from 'vitest';
import { getDefaultProgress, recordDailyActivity } from '../lib/progress';
import { addDays, getTodayDateKey } from '../lib/spacedRepetition';

describe('recordDailyActivity streak handling', () => {
  it('increments the streak when last activity was the local yesterday', () => {
    const today = getTodayDateKey();
    const base = getDefaultProgress();
    base.gamification.currentStreak = 3;
    base.gamification.bestStreak = 5;
    base.gamification.lastActivityDateIso = addDays(today, -1);

    const next = recordDailyActivity(base);

    expect(next.gamification.currentStreak).toBe(4);
    expect(next.gamification.bestStreak).toBe(5);
    expect(next.gamification.lastActivityDateIso).toBe(today);
  });

  it('resets the streak to 1 when a day was missed', () => {
    const today = getTodayDateKey();
    const base = getDefaultProgress();
    base.gamification.currentStreak = 6;
    base.gamification.lastActivityDateIso = addDays(today, -2);

    const next = recordDailyActivity(base);

    expect(next.gamification.currentStreak).toBe(1);
  });

  it('is a no-op when activity was already recorded today', () => {
    const today = getTodayDateKey();
    const base = getDefaultProgress();
    base.gamification.currentStreak = 2;
    base.gamification.lastActivityDateIso = today;

    const next = recordDailyActivity(base);

    expect(next).toBe(base);
    expect(next.gamification.currentStreak).toBe(2);
  });
});
