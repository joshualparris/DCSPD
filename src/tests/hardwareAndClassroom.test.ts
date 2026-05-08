import { describe, expect, it } from 'vitest';
import { hardwareCatalog } from '../data/hardwareCatalog';
import { classroomFaultDrills, classroomHotspots } from '../data/virtualClassroom';

describe('hardware catalogue and classroom simulation data', () => {
  it('keeps hardware entries useful and privacy bounded', () => {
    expect(hardwareCatalog.length).toBeGreaterThanOrEqual(5);

    hardwareCatalog.forEach((item) => {
      expect(item.safeChecks.length).toBeGreaterThanOrEqual(3);
      expect(item.commonSymptoms.length).toBeGreaterThanOrEqual(3);
      expect(item.escalationTriggers.length).toBeGreaterThanOrEqual(3);
      expect(item.privacyBoundary).toBeTruthy();
    });
  });

  it('maps each classroom drill to real hotspots', () => {
    const hotspotIds = new Set(classroomHotspots.map((hotspot) => hotspot.id));

    classroomFaultDrills.forEach((drill) => {
      expect(drill.correctHotspots.length).toBeGreaterThan(0);
      drill.correctHotspots.forEach((hotspotId) => {
        expect(hotspotIds.has(hotspotId)).toBe(true);
      });
      expect(drill.modelAnswer).toBeTruthy();
    });
  });
});
