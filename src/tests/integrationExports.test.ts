import { describe, expect, it } from 'vitest';
import {
  buildHrisIdentityCsvTemplate,
  buildOurDcsHtmlExport,
  buildOurDcsMarkdownExport,
  buildScormManifest
} from '../lib/integrationExports';

describe('integration export helpers', () => {
  it('builds privacy-safe OurDCS markdown and html', () => {
    const markdown = buildOurDcsMarkdownExport('Display checks', 'DCS staff', 'Confirm the safe first checks.');
    const html = buildOurDcsHtmlExport('Display checks', 'DCS staff', 'Confirm the safe first checks.');

    expect(markdown).toContain('Privacy check');
    expect(markdown).toContain('Escalation Boundary');
    expect(html).toContain('<h1>Display checks</h1>');
  });

  it('builds LMS and HRIS export scaffolds', () => {
    expect(buildScormManifest()).toContain('<manifest');
    expect(buildScormManifest()).toContain('DCSPrep Professional Development');
    expect(buildHrisIdentityCsvTemplate()).toContain('employee_id,preferred_first_name');
  });
});
