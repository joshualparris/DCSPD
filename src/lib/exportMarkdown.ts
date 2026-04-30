import { weakTopicLabels } from '../data/skillDomains';
import { modules } from '../data/modules';
import type { UserProgress } from './progress';

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function buildMonthlyPdMarkdown(progress: UserProgress, date = new Date()) {
  const monthKey = getMonthKey(date);
  const entries = progress.pdLogEntries.filter((entry) => entry.date.startsWith(monthKey));
  const totalMinutes = entries.reduce((sum, entry) => sum + entry.minutes, 0);
  const modulesTouched = modules
    .filter((module) => progress.modules[module.id] && Object.values(progress.modules[module.id].sectionsRead).some(Boolean))
    .map((module) => module.title);
  const topWeakAreas = Object.values(progress.weakTopicReviews)
    .sort((left, right) => left.averageScore - right.averageScore)
    .slice(0, 3)
    .map((review) => weakTopicLabels[review.topic]);

  const nextFocus = topWeakAreas[0] || 'Ports and protocols';

  return [
    `# DCSPrep PD Summary (${monthKey})`,
    '',
    '> Keep this personal and privacy-safe. Do not include student, staff, parent, network, or credential details.',
    '',
    `- Total PD minutes: ${totalMinutes}`,
    `- Modules touched: ${modulesTouched.length ? modulesTouched.join(', ') : 'No module activity recorded yet'}`,
    `- Top weak areas: ${topWeakAreas.length ? topWeakAreas.join(', ') : 'No weak areas recorded yet'}`,
    `- Suggested next focus: ${nextFocus}`,
    '',
    '## What I learned',
    ...entries.map((entry) => `- ${entry.date}: ${entry.topic} - ${entry.learned}`),
    '',
    '## Next small steps',
    ...entries.map((entry) => `- ${entry.nextStep}`),
    ''
  ].join('\n');
}
