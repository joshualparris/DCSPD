"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { BarChart3, Download, RotateCcw, ShieldCheck, Trash2 } from 'lucide-react';
import { modules as baseModules } from '../../src/data/modules';
import { scenarios as baseScenarios } from '../../src/data/scenarios';
import { roleplayScenarios as baseRoleplays } from '../../src/data/roleplayScenarios';
import { academicSubjects as baseAcademicSubjects } from '../../src/data/academicSubjects';
import {
  clearUsageEvents,
  exportUsageEvents,
  getUsageEvents,
  isUsageTrackingEnabled,
  setUsageTrackingEnabled,
  summariseUsage
} from '../../src/lib/usageAnalytics';
import { getCustomAcademic, getCustomModules, getCustomRoleplays, getCustomScenarios } from '../../src/lib/customModules';
import type { UsageActivityCategory, UsageEvent, UsageSuggestion } from '../../src/types/usageAnalytics';

const keyCategories: UsageActivityCategory[] = [
  'reading',
  'retrieval',
  'quiz',
  'flashcards',
  'scenario',
  'roleplay',
  'writing',
  'building',
  'evidence',
  'scheduler',
  'support-tool'
];

const routeLabels: Record<string, string> = {
  '/': 'Dashboard',
  '/modules': 'Modules',
  '/scenarios': 'Scenario Lab',
  '/simulations/roleplay': 'Roleplay',
  '/academic-pd': 'Academic PD',
  '/due-today': 'Due Today',
  '/scheduler': 'PD Scheduler',
  '/pd-log': 'PD Log',
  '/evidence-pack': 'Evidence Pack',
  '/readiness': 'Readiness',
  '/search': 'Search',
  '/settings': 'Settings'
};

function formatDuration(seconds: number) {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function formatDate(value?: string) {
  if (!value) {
    return 'No data yet';
  }

  return new Date(value).toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function routeLabel(route: string) {
  if (routeLabels[route]) {
    return routeLabels[route];
  }

  if (route.startsWith('/modules/')) return 'Module detail';
  if (route.startsWith('/academic-pd/subjects/')) return 'Academic subject';
  return route.replace(/^\//, '') || 'Dashboard';
}

function getMostActiveTime(events: UsageEvent[]) {
  const buckets = new Map<string, number>();

  events.forEach((event) => {
    const date = new Date(event.timestamp);
    if (!Number.isFinite(date.getTime())) {
      return;
    }

    const hour = date.getHours();
    const bucket =
      hour < 6
        ? 'overnight'
        : hour < 12
          ? 'morning'
          : hour < 15
            ? 'early afternoon'
            : hour < 18
              ? 'late afternoon'
              : 'evening';
    buckets.set(bucket, (buckets.get(bucket) || 0) + 1);
  });

  return [...buckets.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] || 'No data yet';
}

function getContentTypeCounts(events: UsageEvent[]) {
  const counts = new Map<string, number>();

  events.forEach((event) => {
    const key = event.contentType || 'other';
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  return [...counts.entries()].sort((left, right) => right[1] - left[1]);
}

function getLeastUsedLearningMode(events: UsageEvent[]) {
  const counts = new Map<UsageActivityCategory, number>();
  keyCategories.forEach((category) => counts.set(category, 0));
  events.forEach((event) => {
    if (counts.has(event.activityCategory)) {
      counts.set(event.activityCategory, (counts.get(event.activityCategory) || 0) + 1);
    }
  });

  return [...counts.entries()].sort((left, right) => left[1] - right[1])[0]?.[0] || 'No data yet';
}

function buildPerspectiveAnalyses(events: UsageEvent[]) {
  const summary = summariseUsage(events);
  const categoryCount = (categories: UsageActivityCategory[]) =>
    summary.activityMix
      .filter((entry) => categories.includes(entry.category))
      .reduce((sum, entry) => sum + entry.count, 0);
  const intake = categoryCount(['reading', 'video']);
  const retrieval = categoryCount(['retrieval', 'quiz', 'flashcards']);
  const application = categoryCount(['scenario', 'roleplay', 'writing', 'building']);
  const evidence = categoryCount(['evidence']);
  const scenarios = events.filter((event) => event.eventType === 'scenario_completed').length;
  const roleplays = events.filter((event) => event.eventType === 'roleplay_completed').length;

  return [
    {
      title: 'Learning scientist',
      text:
        intake > retrieval + application
          ? 'Your usage leans toward intake. A useful next move would be a short retrieval or production task after reading.'
          : 'Your usage has some active practice in it. Keep pairing intake with recall, quizzes, scenarios, or written explanation.'
    },
    {
      title: 'Level 2 IT mentor',
      text:
        scenarios === 0
          ? 'Scenario practice is light. One escalation-note scenario would strengthen Level 1 judgement and handoff quality.'
          : 'Scenario work is visible. Keep using it to practise scope, safe checks, risk language, and escalation boundaries.'
    },
    {
      title: 'School IT manager',
      text:
        evidence === 0
          ? 'Evidence logging is low. A short manager-safe summary would make your growth easier to review without exposing private details.'
          : 'Evidence activity is present. Keep summaries short, practical, and free of operationally sensitive details.'
    },
    {
      title: 'CompTIA exam coach',
      text:
        retrieval === 0
          ? 'Core knowledge should be paired with quizzes or flashcards within 24-48 hours where possible.'
          : 'Retrieval practice is appearing in the mix. Keep weak-topic review and module quizzes close to new study.'
    },
    {
      title: 'Productivity / ADHD-friendly coach',
      text:
        application > retrieval && retrieval === 0
          ? 'You return to doing and building. Keep that strength, then add one tiny check-for-understanding before moving on.'
          : 'The pattern can stay lightweight: one clear action, one small output, one low-friction re-entry note after interruptions.'
    },
    {
      title: 'Privacy and safeguarding reviewer',
      text:
        roleplays > 0 || scenarios > 0
          ? 'Good: usage analytics records metadata only. Keep full ticket notes, roleplay chat, and private text out of analytics.'
          : 'Good: the analytics layer is metadata-only and local. Keep it that way unless you deliberately add an export or sync workflow later.'
    }
  ];
}

function SuggestionList({ title, suggestions }: { title: string; suggestions: UsageSuggestion[] }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-5 space-y-3">
        {suggestions.length ? (
          suggestions.map((suggestion) => (
            <div key={suggestion.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold text-slate-900">{suggestion.title}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {suggestion.priority}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{suggestion.reason}</p>
              <p className="mt-2 text-sm font-medium text-slate-800">{suggestion.suggestedAction}</p>
              {suggestion.route ? (
                <Link href={suggestion.route} className="mt-3 inline-flex text-sm font-medium text-blue-700">
                  Open next action
                </Link>
              ) : null}
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            No specific suggestion yet. Use a few modules, scenarios, quizzes, or evidence tools and this section will
            become more useful.
          </div>
        )}
      </div>
    </section>
  );
}

export default function UsageInsightsPage() {
  const [events, setEvents] = useState<UsageEvent[]>([]);
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [customData, setCustomData] = useState({
    modules: [] as typeof baseModules,
    scenarios: [] as typeof baseScenarios,
    roleplays: [] as typeof baseRoleplays,
    academicSubjects: [] as typeof baseAcademicSubjects
  });

  useEffect(() => {
    setEvents(getUsageEvents());
    setTrackingEnabled(isUsageTrackingEnabled());
    setCustomData({
      modules: getCustomModules(),
      scenarios: getCustomScenarios(),
      roleplays: getCustomRoleplays(),
      academicSubjects: getCustomAcademic()
    });
  }, []);

  const appData = useMemo(
    () => ({
      modules: [...baseModules, ...customData.modules],
      scenarios: [...baseScenarios, ...customData.scenarios],
      roleplays: [...baseRoleplays, ...customData.roleplays],
      academicSubjects: [...baseAcademicSubjects, ...customData.academicSubjects]
    }),
    [customData]
  );

  const summary = useMemo(() => summariseUsage(events, appData), [appData, events]);
  const contentTypeCounts = useMemo(() => getContentTypeCounts(events), [events]);
  const perspectiveAnalyses = useMemo(() => buildPerspectiveAnalyses(events), [events]);
  const allSuggestions = [
    ...summary.learningBalanceSuggestions,
    ...summary.underusedFeatureSuggestions,
    ...summary.staleContentSuggestions
  ];

  const openedModules = new Set(events.filter((event) => event.contentType === 'module' && event.contentId).map((event) => event.contentId));
  const attemptedScenarios = new Set(
    events.filter((event) => event.contentType === 'scenario' && event.contentId).map((event) => event.contentId)
  );
  const usedRoleplays = new Set(
    events.filter((event) => event.contentType === 'roleplay' && event.contentId).map((event) => event.contentId)
  );
  const touchedAcademic = new Set(
    events.filter((event) => event.contentType === 'academic-subject' && event.contentId).map((event) => event.contentId)
  );
  const evidenceOutputs = events.filter((event) => event.eventType === 'evidence_export_created').length;
  const rareRoutes = Object.keys(routeLabels).filter((route) => events.filter((event) => event.route === route).length <= 1);

  function downloadUsageAnalytics() {
    const json = exportUsageEvents();
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dcsprep-usage-analytics-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function clearAnalytics() {
    if (!window.confirm('Clear local usage analytics events? Learning progress will not be deleted.')) {
      return;
    }

    clearUsageEvents();
    setEvents([]);
  }

  function toggleTracking() {
    const next = !trackingEnabled;
    setUsageTrackingEnabled(next);
    setTrackingEnabled(next);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <BarChart3 size={18} />
              Usage Insights
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Usage Insights</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Local-only learning analytics for DCSPrep. No data leaves this browser.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadUsageAnalytics}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              <Download size={16} />
              Export JSON
            </button>
            <button
              type="button"
              onClick={clearAnalytics}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white"
            >
              <Trash2 size={16} />
              Clear
            </button>
            <button
              type="button"
              onClick={toggleTracking}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                trackingEnabled ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
              }`}
            >
              <RotateCcw size={16} />
              {trackingEnabled ? 'Disable tracking' : 'Enable tracking'}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 text-emerald-700" size={22} />
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Privacy</div>
            <p className="mt-3 text-sm leading-7 text-emerald-950">
              Usage analytics are stored locally only. The log tracks app interaction metadata and does not track full
              ticket notes, reflections, roleplay messages, or private typed content. You can clear or export it here or
              from Settings.
            </p>
            {!trackingEnabled ? (
              <p className="mt-3 rounded-2xl bg-white p-3 text-sm font-medium text-emerald-900">
                Tracking is currently disabled. Existing events remain until cleared.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total active time', formatDuration(summary.totalActiveSeconds)],
          ['Events tracked', summary.totalEvents],
          ['First usage date', formatDate(summary.firstSeenAt)],
          ['Most active time', getMostActiveTime(events)],
          ['Most used section', summary.mostUsedRoutes[0] ? routeLabel(summary.mostUsedRoutes[0].route) : 'No data yet'],
          ['Least used mode', getLeastUsedLearningMode(events)],
          ['Modules opened', openedModules.size],
          ['Scenarios attempted', attemptedScenarios.size],
          ['Evidence outputs', evidenceOutputs],
          ['Roleplays used', usedRoleplays.size],
          ['Academic subjects touched', touchedAcademic.size],
          ['Tracking status', trackingEnabled ? 'Enabled' : 'Disabled']
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Activity mix</h2>
        <div className="mt-5 space-y-3">
          {keyCategories.map((category) => {
            const entry = summary.activityMix.find((item) => item.category === category);
            const seconds = entry?.totalSeconds || 0;
            const percent = summary.totalActiveSeconds ? Math.round((seconds / summary.totalActiveSeconds) * 100) : 0;

            return (
              <div key={category} className="grid gap-2 rounded-2xl bg-slate-50 p-4 text-sm md:grid-cols-[150px_minmax(0,1fr)_100px] md:items-center">
                <div className="font-semibold capitalize text-slate-900">{category}</div>
                <div className="h-3 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-slate-900" style={{ width: `${Math.min(100, percent)}%` }} />
                </div>
                <div className="text-slate-600">{entry?.count || 0} events</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Most used modules</h2>
          <div className="mt-5 space-y-3">
            {summary.mostUsedModules.length ? (
              summary.mostUsedModules.slice(0, 6).map((module) => (
                <div key={module.id} className="rounded-2xl bg-slate-50 p-4 text-sm">
                  <div className="font-semibold text-slate-900">{module.title || module.id}</div>
                  <div className="mt-1 text-slate-600">
                    {module.count} events | {formatDuration(module.totalSeconds)}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">No module usage recorded yet.</div>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Most used routes</h2>
          <div className="mt-5 space-y-3">
            {summary.mostUsedRoutes.slice(0, 6).map((route) => (
              <div key={route.route} className="rounded-2xl bg-slate-50 p-4 text-sm">
                <div className="font-semibold text-slate-900">{routeLabel(route.route)}</div>
                <div className="mt-1 text-slate-600">
                  {route.count} events | {formatDuration(route.totalSeconds)}
                </div>
              </div>
            ))}
            {!summary.mostUsedRoutes.length ? (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">No route usage recorded yet.</div>
            ) : null}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Most used content types</h2>
          <div className="mt-5 space-y-3">
            {contentTypeCounts.length ? (
              contentTypeCounts.slice(0, 6).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm">
                  <span className="font-semibold text-slate-900">{type}</span>
                  <span className="text-slate-600">{count}</span>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">No content-type usage recorded yet.</div>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Underused</h2>
        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Modules never or rarely opened</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              {summary.leastUsedModules.slice(0, 8).map((module) => (
                <div key={module.id}>
                  {module.title || module.id}: {module.reason}
                </div>
              ))}
              {!summary.leastUsedModules.length ? <div>No obvious underused modules yet.</div> : null}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Scenarios never attempted</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              {appData.scenarios
                .filter((scenario) => !attemptedScenarios.has(scenario.id))
                .slice(0, 6)
                .map((scenario) => (
                  <div key={scenario.id}>{scenario.title}</div>
                ))}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Roleplay personas never used</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              {appData.roleplays
                .filter((roleplay) => !usedRoleplays.has(roleplay.id))
                .slice(0, 6)
                .map((roleplay) => (
                  <div key={roleplay.id}>{roleplay.persona}: {roleplay.issueTitle}</div>
                ))}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Academic subjects not touched</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              {appData.academicSubjects
                .filter((subject) => !touchedAcademic.has(subject.id) && !touchedAcademic.has(subject.code.toLowerCase()))
                .slice(0, 6)
                .map((subject) => (
                  <div key={subject.id}>{subject.code}: {subject.title}</div>
                ))}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Rarely used app sections</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              {rareRoutes.slice(0, 8).map((route) => (
                <div key={route}>{routeLabel(route)}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SuggestionList title="Suggestions" suggestions={allSuggestions.slice(0, 8)} />

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Analyse my use from different perspectives</h2>
        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {perspectiveAnalyses.map((perspective) => (
            <div key={perspective.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">{perspective.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{perspective.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
