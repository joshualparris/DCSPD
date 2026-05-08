import { describe, expect, it } from 'vitest';
import { buildCertificateHtml, buildCertificateRecords } from '../lib/certificates';
import { getDefaultProgress } from '../lib/progress';
import type { SkillCoachBadge } from '../lib/skillCoach';

const earnedBadge: SkillCoachBadge = {
  id: 'path-support',
  title: 'DCS Support Path',
  description: 'Complete the support path.',
  certificateLabel: 'DCS Support Practitioner',
  status: 'earned',
  progressPercent: 100,
  evidenceLabel: '100% path completion',
  href: '/paths'
};

describe('certificate generation', () => {
  it('builds certificate records from badge evidence', () => {
    const progress = getDefaultProgress();
    const records = buildCertificateRecords([earnedBadge], progress, '2026-05-08T00:00:00.000Z');

    expect(records).toHaveLength(1);
    expect(records[0].issuedAtIso).toBe('2026-05-08T00:00:00.000Z');
    expect(records[0].evidenceSummary).toEqual(expect.arrayContaining(['100% path completion']));
  });

  it('renders printable certificate html', () => {
    const record = buildCertificateRecords([earnedBadge], getDefaultProgress(), '2026-05-08T00:00:00.000Z')[0];
    const html = buildCertificateHtml(record);

    expect(html).toContain('<!doctype html>');
    expect(html).toContain('DCS Support Practitioner');
    expect(html).toContain('Privacy-safe evidence only');
  });
});
