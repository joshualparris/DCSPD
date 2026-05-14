import { describe, expect, it } from 'vitest';
import { getRecentUpdates, recentUpdates } from '../data/recentUpdates';

describe('recent updates data', () => {
  it('keeps every update navigable', () => {
    expect(recentUpdates.length).toBeGreaterThanOrEqual(5);

    recentUpdates.forEach((update) => {
      expect(update.id).toBeTruthy();
      expect(update.title).toBeTruthy();
      expect(update.summary).toBeTruthy();
      expect(update.impact).toBeTruthy();
      expect(update.links.length).toBeGreaterThan(0);
      update.links.forEach((link) => {
        expect(link.href.startsWith('/')).toBe(true);
        expect(link.label).toBeTruthy();
      });
    });
  });

  it('sorts newest updates first', () => {
    const sorted = getRecentUpdates();
    expect(sorted[0].dateIso >= sorted[sorted.length - 1].dateIso).toBe(true);
  });
});
