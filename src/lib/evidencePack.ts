import { modules } from '../data/modules';
import { scenarios } from '../data/scenarios';
import { getReadinessProfile } from './readinessMath';
import type { UserProgress } from './progress';
import { generatePdSummaryForRange } from './pdSummary';

export type EvidencePackOptions = {
  startDateIso: string;
  endDateIso: string;
  includeModules: boolean;
  includeScenarios: boolean;
  includePracticalOutputs: boolean;
  includeReflections: boolean;
  includeReadiness: boolean;
};

function safeLine(text: string) {
  return text.replaceAll('\r\n', '\n').trim();
}

export function generateEvidencePackMarkdown(progress: UserProgress, options: EvidencePackOptions): string {
  const summary = generatePdSummaryForRange(progress, options.startDateIso, options.endDateIso);

  const completedScenarioRuns = progress.scenarioRuns.filter((run) => run.completed);
  const scenarioTitles = completedScenarioRuns
    .map((run) => scenarios.find((s) => s.id === run.scenarioId))
    .filter((s): s is (typeof scenarios)[number] => Boolean(s))
    .map((s) => s.title);

  const practicalOutputs = modules.flatMap((module) =>
    Object.entries(progress.modules[module.id]?.practicalOutputs || {})
      .filter(([, complete]) => complete)
      .map(([outputId]) => ({
        moduleTitle: module.title,
        outputTitle: module.practicalOutputs.find((output) => output.id === outputId)?.title || outputId
      }))
  );

  const readiness = options.includeReadiness
    ? [
        ...getReadinessProfile('aPlus', progress),
        ...getReadinessProfile('level2', progress),
        ...getReadinessProfile('schoolItManager', progress)
      ]
    : [];

  const reflections = options.includeReflections
    ? progress.pdEntries
        .filter((entry) => entry.type === 'reflection' && entry.privacyChecked)
        .slice(0, 12)
        .map((entry) => `- ${entry.createdAtIso.slice(0, 10)}: ${safeLine(entry.title)} — ${safeLine(entry.evidenceSummary)}`)
    : [];

  return [
    '# DCSPrep Professional Development Evidence Pack',
    '',
    `Period: ${summary.startDateIso} to ${summary.endDateIso}`,
    '',
    '## Privacy reminder',
    'Do not include live ticket details, student names, parent names, staff names, credentials, IP addresses, internal URLs, screenshots, device serials, or confidential DCS procedures.',
    '',
    '## Summary',
    `- Total PD time: ${summary.totalMinutes} minutes`,
    `- PD entries logged: ${summary.entryCount}`,
    `- Modules touched: ${summary.moduleCount}`,
    `- Scenarios completed: ${summary.scenariosCompleted}`,
    `- Practical outputs completed: ${practicalOutputs.length}`,
    `- Weak areas improved: ${summary.weakAreasImproved.join(', ') || 'None recorded yet'}`,
    `- Current focus areas: ${summary.currentWeakAreas.join(', ') || 'Not enough evidence yet'}`,
    '',
    ...(options.includeModules
      ? [
          '## Modules studied',
          summary.modulesTouched.length ? summary.modulesTouched.map((module) => `- ${module.title}`).join('\n') : '- None recorded in this period.',
          ''
        ]
      : []),
    ...(options.includeScenarios
      ? [
          '## Scenario practice',
          scenarioTitles.length ? scenarioTitles.map((title) => `- ${title}`).join('\n') : '- None recorded in this period.',
          ''
        ]
      : []),
    ...(options.includePracticalOutputs
      ? [
          '## Practical outputs',
          practicalOutputs.length
            ? practicalOutputs.map((item) => `- ${item.moduleTitle}: ${item.outputTitle}`).join('\n')
            : '- None recorded in this period.',
          ''
        ]
      : []),
    ...(options.includeReadiness
      ? [
          '## Readiness snapshot (indicative)',
          readiness.length
            ? readiness.map((profile) => `- ${profile.label}: ${Math.round(profile.score)}% (${profile.note})`).join('\n')
            : '- No readiness data available.',
          ''
        ]
      : []),
    ...(options.includeReflections
      ? [
          '## Reflections (privacy-checked)',
          reflections.length ? reflections.join('\n') : '- None included.',
          ''
        ]
      : []),
    '## Certificate / links (optional placeholders)',
    '- Certificate: [add link]',
    '- Course completion: [add link]',
    '- Portfolio item: [add link]',
    ''
  ].join('\n');
}

