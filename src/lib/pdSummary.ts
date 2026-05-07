import { modules } from '../data/modules';
import { scenarios } from '../data/scenarios';
import { weakTopicLabels } from '../data/skillDomains';
import type { UserProgress, PdEntry } from './progress';

function clampIsoDate(isoDate: string) {
  // We expect YYYY-MM-DD. If invalid, return today's key-like date.
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return isoDate;
  }
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function toDateOnly(iso: string) {
  return iso.slice(0, 10);
}

function inRange(dateOnly: string, startInclusive: string, endInclusive: string) {
  return dateOnly >= startInclusive && dateOnly <= endInclusive;
}

function countItems(items: string[]) {
  const counts: Record<string, number> = {};
  for (const item of items) {
    if (!item) continue;
    counts[item] = (counts[item] ?? 0) + 1;
  }
  return counts;
}

function topKey(counts: Record<string, number>) {
  let best: { key: string; count: number } | null = null;
  for (const [key, count] of Object.entries(counts)) {
    if (!best || count > best.count) {
      best = { key, count };
    }
  }
  return best?.key ?? null;
}

export function getPdEntriesForRange(progress: UserProgress, startDateIso: string, endDateIso: string): PdEntry[] {
  const start = clampIsoDate(startDateIso);
  const end = clampIsoDate(endDateIso);
  const startFinal = start <= end ? start : end;
  const endFinal = start <= end ? end : start;

  return progress.pdEntries.filter((entry) => {
    const dateOnly = toDateOnly(entry.createdAtIso);
    return inRange(dateOnly, startFinal, endFinal);
  });
}

export function generateMonthlyPdSummary(progress: UserProgress, monthIso: string) {
  const monthKey = /^\d{4}-\d{2}$/.test(monthIso) ? monthIso : new Date().toISOString().slice(0, 7);
  const entries = progress.pdEntries.filter((entry) => entry.createdAtIso.startsWith(monthKey));
  return generatePdSummaryFromEntries(progress, entries, `${monthKey}-01`, `${monthKey}-31`);
}

function labelWeakTopics(keys: string[]) {
  return keys.map((key) => weakTopicLabels[key as keyof typeof weakTopicLabels] ?? key);
}

export function generatePdSummaryForRange(progress: UserProgress, startDateIso: string, endDateIso: string) {
  const entries = getPdEntriesForRange(progress, startDateIso, endDateIso);
  return generatePdSummaryFromEntries(progress, entries, startDateIso, endDateIso);
}

function generatePdSummaryFromEntries(progress: UserProgress, entries: PdEntry[], startDateIso: string, endDateIso: string) {
  const totalMinutes = entries.reduce((sum, entry) => sum + (typeof entry.minutes === 'number' ? entry.minutes : 0), 0);

  const moduleIds = new Set(entries.flatMap((entry) => entry.moduleIds ?? []));
  const scenarioIds = new Set(entries.flatMap((entry) => entry.scenarioIds ?? []));
  const practicalOutputIds = new Set(entries.flatMap((entry) => entry.practicalOutputIds ?? []));

  const modulesTouched = [...moduleIds]
    .map((id) => modules.find((m) => m.id === id))
    .filter((m): m is (typeof modules)[number] => Boolean(m))
    .map((m) => ({ id: m.id, title: m.title }));

  const scenarioSummaries = [...scenarioIds]
    .map((id) => scenarios.find((s) => s.id === id))
    .filter((s): s is (typeof scenarios)[number] => Boolean(s))
    .map((s) => ({ id: s.id, title: s.title }));

  const outputs = [...practicalOutputIds].map((id) => ({ id, title: id }));

  const weakTouchedCounts = countItems(entries.flatMap((entry) => entry.weakTopicsTouched ?? []));
  const weakImprovedCounts = countItems(entries.flatMap((entry) => entry.weakTopicsImproved ?? []));

  const currentWeakAreas = Object.values(progress.weakTopicReviews)
    .sort((a, b) => a.averageScore - b.averageScore)
    .slice(0, 3)
    .map((review) => review.topic);

  const suggestedNextFocusKey =
    topKey(weakTouchedCounts) ??
    currentWeakAreas[0] ??
    'ports-protocols';

  return {
    startDateIso: clampIsoDate(startDateIso),
    endDateIso: clampIsoDate(endDateIso),
    entryCount: entries.length,
    totalMinutes,
    moduleCount: modulesTouched.length,
    scenariosCompleted: entries.filter((entry) => entry.type === 'scenario').length,
    outputsCreated:
      practicalOutputIds.size +
      entries.filter((entry) => entry.type === 'practical-output' && !(entry.practicalOutputIds?.length)).length,
    modulesTouched,
    scenarioSummaries,
    outputs,
    weakTopicsTouched: weakTouchedCounts,
    weakTopicsImproved: weakImprovedCounts,
    weakAreasImproved: labelWeakTopics(Object.keys(weakImprovedCounts)),
    currentWeakAreas: labelWeakTopics(currentWeakAreas),
    suggestedNextFocus: weakTopicLabels[suggestedNextFocusKey as keyof typeof weakTopicLabels] ?? suggestedNextFocusKey
  };
}
