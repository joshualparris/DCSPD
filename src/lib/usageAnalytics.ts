import type {
  UsageActivityCategory,
  UsageAnalyticsExport,
  UsageContentType,
  UsageEvent,
  UsageEventType,
  UsageSuggestion,
  UsageSummary
} from '../types/usageAnalytics';

export const USAGE_EVENTS_STORAGE_KEY = 'dcsprep_usage_events';
export const USAGE_TRACKING_ENABLED_KEY = 'dcsprep_usage_tracking_enabled';

const MAX_EVENTS = 5000;
const RETENTION_DAYS = 180;
const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;

const eventTypes: UsageEventType[] = [
  'page_view',
  'section_view',
  'module_open',
  'module_section_view',
  'flashcard_view',
  'flashcard_answered',
  'quiz_started',
  'quiz_answered',
  'quiz_completed',
  'scenario_open',
  'scenario_step_choice',
  'scenario_completed',
  'roleplay_open',
  'roleplay_started',
  'roleplay_completed',
  'academic_subject_open',
  'support_tool_open',
  'scheduler_activity_started',
  'scheduler_activity_completed',
  'pd_log_entry_created',
  'evidence_export_created',
  'search_performed',
  'interruption_started',
  'interruption_resolved',
  'settings_import',
  'custom_content_imported'
];

const activityCategories: UsageActivityCategory[] = [
  'navigation',
  'reading',
  'video',
  'retrieval',
  'quiz',
  'flashcards',
  'scenario',
  'roleplay',
  'writing',
  'building',
  'reflection',
  'search',
  'scheduler',
  'settings',
  'evidence',
  'support-tool',
  'interruption'
];

const contentTypes: UsageContentType[] = [
  'module',
  'scenario',
  'roleplay',
  'academic-subject',
  'support-tool',
  'scheduler',
  'search',
  'settings',
  'evidence',
  'other'
];

type UsageContentItem = {
  id: string;
  title?: string;
  code?: string;
  persona?: string;
  issueTitle?: string;
};

type UsageAppData = {
  modules?: UsageContentItem[];
  scenarios?: UsageContentItem[];
  roleplays?: UsageContentItem[];
  academicSubjects?: UsageContentItem[];
};

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeGetItem(key: string) {
  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Usage analytics should never break the learning app.
  }
}

function safeRemoveItem(key: string) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Usage analytics should never break the learning app.
  }
}

function coerceString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function coerceOptionalString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.slice(0, 180) : undefined;
}

function coerceNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function makeId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `usage-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function parseTimestamp(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const time = Date.parse(value);
  return Number.isFinite(time) ? new Date(time).toISOString() : undefined;
}

function normalizeMetadata(value: unknown): UsageEvent['metadata'] | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const candidate = value as NonNullable<UsageEvent['metadata']>;
  const metadata: UsageEvent['metadata'] = {};

  if (typeof candidate.domain === 'string') metadata.domain = candidate.domain.slice(0, 120);
  if (typeof candidate.level === 'string') metadata.level = candidate.level.slice(0, 80);
  if (typeof candidate.weakTopic === 'string') metadata.weakTopic = candidate.weakTopic.slice(0, 120);
  if (candidate.source === 'built-in' || candidate.source === 'custom' || candidate.source === 'unknown') {
    metadata.source = candidate.source;
  }
  if (typeof candidate.resultCount === 'number' && Number.isFinite(candidate.resultCount)) {
    metadata.resultCount = Math.max(0, Math.round(candidate.resultCount));
  }
  if (typeof candidate.interruptionType === 'string') {
    metadata.interruptionType = candidate.interruptionType.slice(0, 80);
  }

  return Object.keys(metadata).length ? metadata : undefined;
}

function normalizeUsageEvent(value: unknown): UsageEvent | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<UsageEvent>;
  if (!eventTypes.includes(candidate.eventType as UsageEventType)) {
    return null;
  }
  if (!activityCategories.includes(candidate.activityCategory as UsageActivityCategory)) {
    return null;
  }

  const timestamp = parseTimestamp(candidate.timestamp);
  if (!timestamp) {
    return null;
  }

  const duration = coerceNumber(candidate.durationSeconds);
  const score = coerceNumber(candidate.score);
  const contentType = contentTypes.includes(candidate.contentType as UsageContentType)
    ? (candidate.contentType as UsageContentType)
    : undefined;

  return {
    id: coerceString(candidate.id, makeId()).slice(0, 120),
    timestamp,
    eventType: candidate.eventType as UsageEventType,
    route: coerceString(candidate.route, '/').slice(0, 240),
    label: coerceOptionalString(candidate.label),
    contentType,
    contentId: coerceOptionalString(candidate.contentId),
    activityCategory: candidate.activityCategory as UsageActivityCategory,
    durationSeconds:
      typeof duration === 'number' ? Math.max(0, Math.min(Math.round(duration), 12 * 60 * 60)) : undefined,
    completed: typeof candidate.completed === 'boolean' ? candidate.completed : undefined,
    score: typeof score === 'number' ? Math.max(0, Math.min(Math.round(score), 100)) : undefined,
    metadata: normalizeMetadata(candidate.metadata)
  };
}

export function cleanupUsageEvents(events: UsageEvent[], now = Date.now()) {
  return events
    .filter((event) => {
      const time = Date.parse(event.timestamp);
      return Number.isFinite(time) && now - time <= RETENTION_MS;
    })
    .sort((left, right) => Date.parse(left.timestamp) - Date.parse(right.timestamp))
    .slice(-MAX_EVENTS);
}

export function getUsageEvents(): UsageEvent[] {
  const raw = safeGetItem(USAGE_EVENTS_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return cleanupUsageEvents(parsed.map(normalizeUsageEvent).filter((event): event is UsageEvent => Boolean(event)));
  } catch {
    return [];
  }
}

export function saveUsageEvents(events: UsageEvent[]): void {
  const normalized = cleanupUsageEvents(
    events.map(normalizeUsageEvent).filter((event): event is UsageEvent => Boolean(event))
  );
  safeSetItem(USAGE_EVENTS_STORAGE_KEY, JSON.stringify(normalized));
}

export function isUsageTrackingEnabled(): boolean {
  const raw = safeGetItem(USAGE_TRACKING_ENABLED_KEY);
  return raw !== 'false';
}

export function setUsageTrackingEnabled(enabled: boolean): void {
  safeSetItem(USAGE_TRACKING_ENABLED_KEY, enabled ? 'true' : 'false');
}

export function recordUsageEvent(
  event: Omit<UsageEvent, 'id' | 'timestamp'> & { timestamp?: string }
): void {
  if (!isUsageTrackingEnabled()) {
    return;
  }

  const normalized = normalizeUsageEvent({
    ...event,
    id: makeId(),
    timestamp: event.timestamp || new Date().toISOString()
  });

  if (!normalized) {
    return;
  }

  const events = getUsageEvents();
  saveUsageEvents([...events, normalized]);
}

export function clearUsageEvents(): void {
  safeRemoveItem(USAGE_EVENTS_STORAGE_KEY);
}

export function exportUsageEvents(): string {
  const payload: UsageAnalyticsExport = {
    app: 'DCSPrep',
    type: 'usage-analytics-export',
    version: 1,
    exportedAt: new Date().toISOString(),
    events: getUsageEvents()
  };

  return JSON.stringify(payload, null, 2);
}

export function parseUsageEventsImport(
  json: string
): { ok: true; events: UsageEvent[] } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(json) as Partial<UsageAnalyticsExport>;
    if (parsed.app !== 'DCSPrep' || parsed.type !== 'usage-analytics-export' || parsed.version !== 1) {
      return { ok: false, error: 'This does not look like a DCSPrep usage analytics export.' };
    }

    if (!Array.isArray(parsed.events)) {
      return { ok: false, error: 'The usage analytics export does not contain an events array.' };
    }

    const events = parsed.events
      .map(normalizeUsageEvent)
      .filter((event): event is UsageEvent => Boolean(event));

    return { ok: true, events: cleanupUsageEvents(events) };
  } catch {
    return { ok: false, error: 'The selected usage analytics file is not valid JSON.' };
  }
}

export function importUsageEvents(json: string): void {
  const parsed = parseUsageEventsImport(json);
  if (!parsed.ok) {
    return;
  }

  saveUsageEvents(parsed.events);
}

function appDataFromUnknown(appData?: unknown): UsageAppData {
  if (!appData || typeof appData !== 'object') {
    return {};
  }

  const candidate = appData as UsageAppData;

  return {
    modules: Array.isArray(candidate.modules) ? candidate.modules : [],
    scenarios: Array.isArray(candidate.scenarios) ? candidate.scenarios : [],
    roleplays: Array.isArray(candidate.roleplays) ? candidate.roleplays : [],
    academicSubjects: Array.isArray(candidate.academicSubjects) ? candidate.academicSubjects : []
  };
}

function getDisplayTitle(item?: UsageContentItem) {
  if (!item) {
    return undefined;
  }

  return item.title || item.issueTitle || item.persona || item.code || item.id;
}

function groupByRoute(events: UsageEvent[]) {
  const groups = new Map<string, { route: string; count: number; totalSeconds: number }>();

  events.forEach((event) => {
    const existing = groups.get(event.route) || { route: event.route, count: 0, totalSeconds: 0 };
    existing.count += 1;
    existing.totalSeconds += event.durationSeconds || 0;
    groups.set(event.route, existing);
  });

  return [...groups.values()].sort((left, right) => right.totalSeconds - left.totalSeconds || right.count - left.count);
}

function groupActivityMix(events: UsageEvent[]) {
  const groups = new Map<UsageActivityCategory, { category: UsageActivityCategory; count: number; totalSeconds: number }>();

  events.forEach((event) => {
    const existing = groups.get(event.activityCategory) || {
      category: event.activityCategory,
      count: 0,
      totalSeconds: 0
    };
    existing.count += 1;
    existing.totalSeconds += event.durationSeconds || 0;
    groups.set(event.activityCategory, existing);
  });

  return [...groups.values()].sort((left, right) => right.totalSeconds - left.totalSeconds || right.count - left.count);
}

function groupModules(events: UsageEvent[], appData: UsageAppData) {
  const moduleTitles = new Map((appData.modules || []).map((module) => [module.id, getDisplayTitle(module)]));
  const groups = new Map<string, { id: string; title?: string; count: number; totalSeconds: number }>();

  events
    .filter((event) => event.contentType === 'module' && event.contentId)
    .forEach((event) => {
      const id = event.contentId as string;
      const existing = groups.get(id) || { id, title: moduleTitles.get(id), count: 0, totalSeconds: 0 };
      existing.count += 1;
      existing.totalSeconds += event.durationSeconds || 0;
      groups.set(id, existing);
    });

  return [...groups.values()].sort((left, right) => right.totalSeconds - left.totalSeconds || right.count - left.count);
}

function getLastUsedByContent(events: UsageEvent[], contentType: UsageContentType) {
  const lastUsed = new Map<string, UsageEvent>();

  events
    .filter((event) => event.contentType === contentType && event.contentId)
    .forEach((event) => {
      const id = event.contentId as string;
      const existing = lastUsed.get(id);
      if (!existing || existing.timestamp < event.timestamp) {
        lastUsed.set(id, event);
      }
    });

  return lastUsed;
}

function daysSince(timestamp?: string) {
  if (!timestamp) {
    return Infinity;
  }

  const time = Date.parse(timestamp);
  if (!Number.isFinite(time)) {
    return Infinity;
  }

  return Math.floor((Date.now() - time) / (24 * 60 * 60 * 1000));
}

function buildLeastUsedModules(events: UsageEvent[], appData: UsageAppData) {
  const moduleEvents = events.filter((event) => event.contentType === 'module' && event.contentId);
  const counts = new Map<string, number>();
  const lastUsed = getLastUsedByContent(moduleEvents, 'module');

  moduleEvents.forEach((event) => {
    counts.set(event.contentId as string, (counts.get(event.contentId as string) || 0) + 1);
  });

  return (appData.modules || [])
    .map((module) => {
      const count = counts.get(module.id) || 0;
      const last = lastUsed.get(module.id);
      const staleDays = daysSince(last?.timestamp);
      let reason = 'Opened only a little so far.';

      if (!count) {
        reason = 'Not opened yet.';
      } else if (staleDays >= 60) {
        reason = `Last used ${staleDays} days ago.`;
      } else if (staleDays >= 30) {
        reason = `Not revisited for ${staleDays} days.`;
      }

      return {
        id: module.id,
        title: getDisplayTitle(module),
        count,
        staleDays,
        reason
      };
    })
    .filter((module) => module.count === 0 || module.count <= 2 || module.staleDays >= 30)
    .sort((left, right) => left.count - right.count || right.staleDays - left.staleDays)
    .slice(0, 10)
    .map(({ id, title, reason }) => ({ id, title, reason }));
}

function makeSuggestion(input: Omit<UsageSuggestion, 'id'>): UsageSuggestion {
  return {
    id: `${input.category}-${input.contentId || input.route || input.title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    ...input
  };
}

function countEvents(events: UsageEvent[], predicate: (event: UsageEvent) => boolean) {
  return events.filter(predicate).length;
}

function getCategorySeconds(activityMix: UsageSummary['activityMix'], categories: UsageActivityCategory[]) {
  return activityMix
    .filter((entry) => categories.includes(entry.category))
    .reduce((sum, entry) => sum + entry.totalSeconds, 0);
}

function getCategoryCount(activityMix: UsageSummary['activityMix'], categories: UsageActivityCategory[]) {
  return activityMix
    .filter((entry) => categories.includes(entry.category))
    .reduce((sum, entry) => sum + entry.count, 0);
}

function buildStaleContentSuggestions(events: UsageEvent[], appData: UsageAppData): UsageSuggestion[] {
  const suggestions: UsageSuggestion[] = [];
  const lastModules = getLastUsedByContent(events, 'module');
  const lastScenarios = getLastUsedByContent(events, 'scenario');
  const lastRoleplays = getLastUsedByContent(events, 'roleplay');
  const lastAcademic = getLastUsedByContent(events, 'academic-subject');

  const staleModule = (appData.modules || [])
    .map((module) => ({ module, days: daysSince(lastModules.get(module.id)?.timestamp) }))
    .filter((entry) => entry.days >= 30 && entry.days < Infinity)
    .sort((left, right) => right.days - left.days)[0];

  if (staleModule) {
    suggestions.push(
      makeSuggestion({
        title: `Revisit ${getDisplayTitle(staleModule.module)}`,
        reason: `You have not used this module for ${staleModule.days} days, so a short review may refresh the pathway.`,
        priority: staleModule.days >= 60 ? 'high' : 'medium',
        suggestedAction: 'Open the module and complete one flashcard or one quiz question.',
        route: `/modules/${staleModule.module.id}`,
        contentId: staleModule.module.id,
        category: 'revisit'
      })
    );
  }

  const staleScenario = (appData.scenarios || [])
    .map((scenario) => ({ scenario, days: daysSince(lastScenarios.get(scenario.id)?.timestamp) }))
    .filter((entry) => entry.days >= 30 && entry.days < Infinity)
    .sort((left, right) => right.days - left.days)[0];

  if (staleScenario) {
    suggestions.push(
      makeSuggestion({
        title: 'Refresh scenario practice',
        reason: `A scenario has not been revisited for ${staleScenario.days} days. Scenario work strengthens judgement under pressure.`,
        priority: 'medium',
        suggestedAction: 'Run one scenario and finish with a concise escalation note.',
        route: '/scenarios',
        contentId: staleScenario.scenario.id,
        category: 'revisit'
      })
    );
  }

  if ((appData.roleplays || []).length && Math.min(...(appData.roleplays || []).map((item) => daysSince(lastRoleplays.get(item.id)?.timestamp))) >= 30) {
    suggestions.push(
      makeSuggestion({
        title: 'Try a short roleplay',
        reason: 'Roleplay has not been used recently, which means soft-skill practice may be underrepresented.',
        priority: 'medium',
        suggestedAction: 'Run a 10-minute teacher-support roleplay and save the feedback only if it is privacy-safe.',
        route: '/simulations/roleplay',
        category: 'revisit'
      })
    );
  }

  if ((appData.academicSubjects || []).length && Math.min(...(appData.academicSubjects || []).map((item) => daysSince(lastAcademic.get(item.id)?.timestamp))) >= 30) {
    suggestions.push(
      makeSuggestion({
        title: 'Re-open Academic PD',
        reason: 'Academic PD has not appeared in recent usage, so the RBC or SMITB bridge work may be drifting out of view.',
        priority: 'low',
        suggestedAction: 'Open one subject and log a small bridge task.',
        route: '/academic-pd',
        category: 'revisit'
      })
    );
  }

  return suggestions;
}

function buildUnderusedFeatureSuggestions(events: UsageEvent[]): UsageSuggestion[] {
  const suggestions: UsageSuggestion[] = [];
  const moduleOpens = countEvents(events, (event) => event.eventType === 'module_open');
  const scenarioCompletions = countEvents(events, (event) => event.eventType === 'scenario_completed');
  const roleplayCompletions = countEvents(events, (event) => event.eventType === 'roleplay_completed');
  const evidenceExports = countEvents(events, (event) => event.eventType === 'evidence_export_created');
  const pdLogs = countEvents(events, (event) => event.eventType === 'pd_log_entry_created');
  const schedulerEvents = countEvents(events, (event) => event.contentType === 'scheduler');

  if (moduleOpens >= 3 && scenarioCompletions === 0) {
    suggestions.push(
      makeSuggestion({
        title: 'Add one scenario lab',
        reason: 'You have used modules several times, but scenario completion is still low.',
        priority: 'high',
        suggestedAction: 'Try one scenario next and finish with the escalation note.',
        route: '/scenarios',
        category: 'underused-feature'
      })
    );
  }

  if (moduleOpens >= 2 && roleplayCompletions === 0) {
    suggestions.push(
      makeSuggestion({
        title: 'Use one soft-skill simulation',
        reason: 'Technical study is visible, while roleplay feedback has not been completed yet.',
        priority: 'medium',
        suggestedAction: 'Run a short busy-teacher support roleplay.',
        route: '/simulations/roleplay',
        category: 'underused-feature'
      })
    );
  }

  if (scenarioCompletions + roleplayCompletions >= 2 && evidenceExports === 0) {
    suggestions.push(
      makeSuggestion({
        title: 'Create manager-safe evidence',
        reason: 'You have practice evidence in the app, but the Evidence Pack has not been exported.',
        priority: 'medium',
        suggestedAction: 'Open Evidence Pack and copy or download a manager-safe summary.',
        route: '/evidence-pack',
        category: 'evidence'
      })
    );
  }

  if (pdLogs === 0 && events.length >= 10) {
    suggestions.push(
      makeSuggestion({
        title: 'Log one short PD note',
        reason: 'A brief PD log turns usage into evidence without storing private ticket detail.',
        priority: 'medium',
        suggestedAction: 'Write a 3-sentence PD log entry about what improved.',
        route: '/pd-log',
        category: 'evidence'
      })
    );
  }

  if (schedulerEvents === 0 && events.length >= 8) {
    suggestions.push(
      makeSuggestion({
        title: 'Try the PD Scheduler once',
        reason: 'The scheduler is not part of the current usage pattern yet.',
        priority: 'low',
        suggestedAction: 'Open the scheduler and use one block prompt as a starting point.',
        route: '/scheduler',
        category: 'scheduler'
      })
    );
  }

  return suggestions;
}

function buildLearningBalanceSuggestions(events: UsageEvent[], activityMix: UsageSummary['activityMix']): UsageSuggestion[] {
  const suggestions: UsageSuggestion[] = [];
  const totalSeconds = Math.max(1, activityMix.reduce((sum, entry) => sum + entry.totalSeconds, 0));
  const intakeSeconds = getCategorySeconds(activityMix, ['reading', 'video']);
  const retrievalSeconds = getCategorySeconds(activityMix, ['retrieval', 'quiz', 'flashcards']);
  const applicationSeconds = getCategorySeconds(activityMix, ['scenario', 'roleplay', 'writing', 'building']);
  const buildingCount = getCategoryCount(activityMix, ['building']);
  const quizRetrievalCount = getCategoryCount(activityMix, ['quiz', 'retrieval', 'flashcards']);
  const interruptionStarts = countEvents(events, (event) => event.eventType === 'interruption_started');
  const interruptionResolves = countEvents(events, (event) => event.eventType === 'interruption_resolved');

  if (intakeSeconds / totalSeconds > 0.6 && retrievalSeconds / totalSeconds < 0.15) {
    suggestions.push(
      makeSuggestion({
        title: 'Pair intake with retrieval',
        reason: 'Your current mix is intake-heavy compared with quiz, flashcard, and recall activity.',
        priority: 'high',
        suggestedAction: 'After the next reading block, do five flashcards or one quiz question.',
        route: '/due-today',
        category: 'learning-balance'
      })
    );
  }

  if (applicationSeconds === 0 && events.length >= 8) {
    suggestions.push(
      makeSuggestion({
        title: 'Add one applied output',
        reason: 'The log shows activity, but little application or writing practice yet.',
        priority: 'medium',
        suggestedAction: 'Complete one scenario, ticket note, or practical output.',
        route: '/scenarios',
        category: 'learning-balance'
      })
    );
  }

  if (buildingCount >= 3 && quizRetrievalCount === 0) {
    suggestions.push(
      makeSuggestion({
        title: 'Check the build with recall',
        reason: 'Building activity is visible, and a short retrieval check would make the learning more durable.',
        priority: 'medium',
        suggestedAction: 'Spend five minutes explaining what you built, then answer one related question.',
        route: '/strict-quiz',
        category: 'learning-balance'
      })
    );
  }

  if (interruptionStarts > interruptionResolves) {
    suggestions.push(
      makeSuggestion({
        title: 'Close the interruption loop',
        reason: 'There are more interruption starts than resolved returns in the local usage log.',
        priority: 'low',
        suggestedAction: 'Use the scheduler resume note before restarting study.',
        route: '/scheduler',
        category: 'scheduler'
      })
    );
  }

  return suggestions;
}

export function getUsageSuggestions(events: UsageEvent[], appData?: unknown): UsageSuggestion[] {
  const normalizedEvents = cleanupUsageEvents(events);
  const normalizedAppData = appDataFromUnknown(appData);
  const activityMix = groupActivityMix(normalizedEvents);

  return [
    ...buildStaleContentSuggestions(normalizedEvents, normalizedAppData),
    ...buildUnderusedFeatureSuggestions(normalizedEvents),
    ...buildLearningBalanceSuggestions(normalizedEvents, activityMix)
  ];
}

export function summariseUsage(events: UsageEvent[], appData?: unknown): UsageSummary {
  const normalizedEvents = cleanupUsageEvents(events);
  const normalizedAppData = appDataFromUnknown(appData);
  const sortedEvents = [...normalizedEvents].sort((left, right) => Date.parse(left.timestamp) - Date.parse(right.timestamp));
  const activityMix = groupActivityMix(sortedEvents);

  return {
    totalEvents: sortedEvents.length,
    totalActiveSeconds: sortedEvents.reduce((sum, event) => sum + (event.durationSeconds || 0), 0),
    firstSeenAt: sortedEvents[0]?.timestamp,
    lastSeenAt: sortedEvents[sortedEvents.length - 1]?.timestamp,
    mostUsedRoutes: groupByRoute(sortedEvents).slice(0, 10),
    mostUsedModules: groupModules(sortedEvents, normalizedAppData).slice(0, 10),
    leastUsedModules: buildLeastUsedModules(sortedEvents, normalizedAppData),
    activityMix,
    recentActivity: [...sortedEvents].reverse().slice(0, 25),
    staleContentSuggestions: buildStaleContentSuggestions(sortedEvents, normalizedAppData),
    underusedFeatureSuggestions: buildUnderusedFeatureSuggestions(sortedEvents),
    learningBalanceSuggestions: buildLearningBalanceSuggestions(sortedEvents, activityMix)
  };
}
