export type UsageEventType =
  | 'page_view'
  | 'section_view'
  | 'module_open'
  | 'module_section_view'
  | 'flashcard_view'
  | 'flashcard_answered'
  | 'quiz_started'
  | 'quiz_answered'
  | 'quiz_completed'
  | 'scenario_open'
  | 'scenario_step_choice'
  | 'scenario_completed'
  | 'roleplay_open'
  | 'roleplay_started'
  | 'roleplay_completed'
  | 'academic_subject_open'
  | 'support_tool_open'
  | 'scheduler_activity_started'
  | 'scheduler_activity_completed'
  | 'pd_log_entry_created'
  | 'evidence_export_created'
  | 'search_performed'
  | 'interruption_started'
  | 'interruption_resolved'
  | 'settings_import'
  | 'custom_content_imported';

export type UsageActivityCategory =
  | 'navigation'
  | 'reading'
  | 'video'
  | 'retrieval'
  | 'quiz'
  | 'flashcards'
  | 'scenario'
  | 'roleplay'
  | 'writing'
  | 'building'
  | 'reflection'
  | 'search'
  | 'scheduler'
  | 'settings'
  | 'evidence'
  | 'support-tool'
  | 'interruption';

export type UsageContentType =
  | 'module'
  | 'scenario'
  | 'roleplay'
  | 'academic-subject'
  | 'support-tool'
  | 'scheduler'
  | 'search'
  | 'settings'
  | 'evidence'
  | 'other';

export type UsageEvent = {
  id: string;
  timestamp: string;
  eventType: UsageEventType;
  route: string;
  label?: string;
  contentType?: UsageContentType;
  contentId?: string;
  activityCategory: UsageActivityCategory;
  durationSeconds?: number;
  completed?: boolean;
  score?: number;
  metadata?: {
    domain?: string;
    level?: string;
    weakTopic?: string;
    source?: 'built-in' | 'custom' | 'unknown';
    resultCount?: number;
    interruptionType?: string;
  };
};

export type UsageSuggestion = {
  id: string;
  title: string;
  reason: string;
  priority: 'low' | 'medium' | 'high';
  suggestedAction: string;
  route?: string;
  contentId?: string;
  category:
    | 'revisit'
    | 'underused-feature'
    | 'learning-balance'
    | 'avoidance-pattern'
    | 'evidence'
    | 'scheduler';
};

export type UsageSummary = {
  totalEvents: number;
  totalActiveSeconds: number;
  firstSeenAt?: string;
  lastSeenAt?: string;
  mostUsedRoutes: { route: string; count: number; totalSeconds: number }[];
  mostUsedModules: { id: string; title?: string; count: number; totalSeconds: number }[];
  leastUsedModules: { id: string; title?: string; reason: string }[];
  activityMix: { category: UsageActivityCategory; count: number; totalSeconds: number }[];
  recentActivity: UsageEvent[];
  staleContentSuggestions: UsageSuggestion[];
  underusedFeatureSuggestions: UsageSuggestion[];
  learningBalanceSuggestions: UsageSuggestion[];
};

export type UsageAnalyticsExport = {
  app: 'DCSPrep';
  type: 'usage-analytics-export';
  version: 1;
  exportedAt: string;
  events: UsageEvent[];
};
