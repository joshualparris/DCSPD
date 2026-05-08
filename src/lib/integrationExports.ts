import { modules } from '../data/modules';
import type { UserProgress } from './progress';
import { buildSupervisorCsv } from './supervisorAnalytics';

export function buildOurDcsMarkdownExport(title: string, audience: string, body: string) {
  return [
    `# ${title || 'Untitled DCS help article'}`,
    '',
    `Audience: ${audience || 'DCS staff'}`,
    '',
    '> Privacy check: this article must not include live student, staff, parent, credential, network, health, wellbeing, or incident details.',
    '',
    '## Purpose',
    '',
    body.trim() || 'Add the safe workflow explanation here.',
    '',
    '## Safe First Checks',
    '',
    '- Confirm the exact symptom and scope.',
    '- Use synthetic examples only.',
    '- Stop before owner-only systems or sensitive records.',
    '',
    '## Escalation Boundary',
    '',
    '- Escalate when access, identity, privacy, infrastructure, or safety risk is involved.',
    ''
  ].join('\n');
}

export function buildOurDcsHtmlExport(title: string, audience: string, body: string) {
  const markdown = buildOurDcsMarkdownExport(title, audience, body);
  const lines = markdown.split('\n');

  return lines
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
      if (line.startsWith('> ')) return `<blockquote>${line.slice(2)}</blockquote>`;
      if (!line.trim()) return '';
      return `<p>${line}</p>`;
    })
    .join('\n');
}

export function buildScormManifest() {
  const items = modules.slice(0, 12);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<manifest identifier="dcsprep-pd" version="1.0">',
    '  <metadata>',
    '    <schema>DCSPrep Export</schema>',
    '    <schemaversion>1.0</schemaversion>',
    '  </metadata>',
    '  <organizations default="dcsprep-org">',
    '    <organization identifier="dcsprep-org">',
    '      <title>DCSPrep Professional Development</title>',
    ...items.map((module) => `      <item identifier="item-${module.id}" identifierref="res-${module.id}"><title>${module.title}</title></item>`),
    '    </organization>',
    '  </organizations>',
    '  <resources>',
    ...items.map((module) => `    <resource identifier="res-${module.id}" type="webcontent" href="/modules/${module.id}" />`),
    '  </resources>',
    '</manifest>'
  ].join('\n');
}

export function buildHrisIdentityCsvTemplate() {
  return [
    'employee_id,preferred_first_name,last_name,role,faculty,start_date,end_date,manager_email,required_groups,notes',
    'SYNTH-001,Example,Teacher,Teacher,Science,2026-01-20,,headteacher@example.edu.au,"staff;science",Synthetic row only'
  ].join('\n');
}

export function buildIntegrationExportBundle(progress: UserProgress) {
  return {
    scormManifest: buildScormManifest(),
    hrisTemplateCsv: buildHrisIdentityCsvTemplate(),
    supervisorCsv: buildSupervisorCsv(progress)
  };
}
