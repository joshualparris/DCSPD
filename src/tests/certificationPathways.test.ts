import { describe, expect, it } from 'vitest';
import {
  aplusCore1Pathway,
  certificationPathwayRegistry,
  networkPlusPathway,
  securityPlusPathway
} from '../data/certificationPathways';

describe('certificationPathways', () => {
  it('builds assessable lessons for each expansion pathway', () => {
    for (const pathway of [aplusCore1Pathway, networkPlusPathway, securityPlusPathway]) {
      expect(pathway.lessons.length).toBeGreaterThanOrEqual(15);
      expect(pathway.sections.length).toBe(5);
      expect(pathway.lessons[0].assessment.multipleChoice.length).toBe(3);
    }
  });

  it('exposes registry entries for app routes', () => {
    expect(certificationPathwayRegistry['aplus-core-1'].stats.examCode).toBe('220-1201');
    expect(certificationPathwayRegistry['network-plus'].stats.examCode).toBe('N10-009');
    expect(certificationPathwayRegistry['security-plus'].stats.examCode).toBe('SY0-701');
  });
});
