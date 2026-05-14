"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  FileText,
  PauseCircle,
  Play,
  TimerReset
} from 'lucide-react';
import {
  formatSchedulerClock,
  formatSchedulerCountdown,
  type EnergyLevel,
  type SchedulerActivityType,
  type SchedulerBlockId,
  type SchedulerRuntimeActivity,
  useScheduler
} from '../../src/hooks/useScheduler';
import { getUsageEvents, summariseUsage } from '../../src/lib/usageAnalytics';
import { trackUsageInteraction } from '../../src/hooks/useUsageTracking';
import type { UsageActivityCategory, UsageEvent } from '../../src/types/usageAnalytics';

const activityStyles: Record<SchedulerActivityType, string> = {
  orientation: 'bg-slate-100 text-slate-700',
  'brain-dump': 'bg-purple-50 text-purple-700',
  video: 'bg-blue-50 text-blue-700',
  application: 'bg-emerald-50 text-emerald-700',
  retrieval: 'bg-indigo-50 text-indigo-700',
  flashcards: 'bg-cyan-50 text-cyan-700',
  writing: 'bg-amber-50 text-amber-800',
  building: 'bg-teal-50 text-teal-700',
  break: 'bg-orange-50 text-orange-700',
  log: 'bg-slate-900 text-white'
};

const energyOptions: Array<{
  value: EnergyLevel;
  label: string;
  detail: string;
}> = [
  { value: 'low', label: 'Low', detail: 'Retrieval, building, and writing only where needed.' },
  { value: 'moderate', label: 'Moderate', detail: 'Proceed, with video capped at 25 minutes.' },
  { value: 'high', label: 'High', detail: 'Proceed with the planned block schedule.' }
];

function usageCategoryForSchedulerType(type: SchedulerActivityType): UsageActivityCategory {
  if (type === 'video') return 'video';
  if (type === 'retrieval') return 'retrieval';
  if (type === 'flashcards') return 'flashcards';
  if (type === 'writing' || type === 'log') return 'writing';
  if (type === 'building') return 'building';
  if (type === 'application') return 'scenario';
  if (type === 'break') return 'scheduler';
  return 'scheduler';
}

function getSchedulerUsageHint(events: UsageEvent[]) {
  if (!events.length) {
    return {
      title: 'Start with one small block',
      reason: 'Usage Insights will become more useful after a few local events are recorded.',
      route: '/usage-insights'
    };
  }

  const summary = summariseUsage(events);
  const suggestions = [
    ...summary.learningBalanceSuggestions,
    ...summary.underusedFeatureSuggestions,
    ...summary.staleContentSuggestions
  ];
  const first = suggestions[0];

  if (first) {
    return {
      title: first.title,
      reason: first.suggestedAction,
      route: first.route || '/usage-insights'
    };
  }

  return {
    title: 'Keep the active mix',
    reason: 'Your local usage pattern has a reasonable spread. Finish this block with one written evidence note.',
    route: '/pd-log'
  };
}

function ActivityCard({
  activity,
  emphasis
}: {
  activity?: SchedulerRuntimeActivity;
  emphasis: 'now' | 'next';
}) {
  if (!activity) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm text-slate-500">No scheduled activity.</div>
      </div>
    );
  }

  const isNow = emphasis === 'now';

  return (
    <section
      className={`rounded-[2rem] border shadow-sm ${
        isNow ? 'border-slate-900 bg-slate-900 p-6 text-white' : 'border-slate-200 bg-white p-5 text-slate-900'
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
            isNow ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {isNow ? 'Now' : 'Next'}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${activityStyles[activity.type]}`}>
          {activity.label}
        </span>
        {activity.mandatory ? (
          <span className={isNow ? 'text-xs text-amber-100' : 'text-xs text-amber-700'}>Mandatory</span>
        ) : null}
      </div>

      <h2 className={`${isNow ? 'mt-5 text-3xl md:text-4xl' : 'mt-4 text-xl'} font-semibold tracking-tight`}>
        {activity.title}
      </h2>

      <div className={`mt-4 grid gap-3 text-sm ${isNow ? 'text-slate-200 sm:grid-cols-3' : 'text-slate-600 sm:grid-cols-3'}`}>
        <div>
          <div className={isNow ? 'text-slate-400' : 'text-slate-500'}>Duration</div>
          <div className="mt-1 font-semibold">{activity.durationMinutes} min</div>
        </div>
        <div>
          <div className={isNow ? 'text-slate-400' : 'text-slate-500'}>Ends</div>
          <div className="mt-1 font-semibold">{formatSchedulerClock(activity.endDate)}</div>
        </div>
        <div>
          <div className={isNow ? 'text-slate-400' : 'text-slate-500'}>Window</div>
          <div className="mt-1 font-semibold">
            {formatSchedulerClock(activity.startDate)}-{formatSchedulerClock(activity.endDate)}
          </div>
        </div>
      </div>

      <p className={`${isNow ? 'mt-5 text-base leading-7 text-slate-100' : 'mt-4 text-sm leading-6 text-slate-600'}`}>
        {activity.detail}
      </p>
      <p className={`${isNow ? 'mt-4 text-sm leading-6 text-slate-300' : 'mt-3 text-sm leading-6 text-slate-500'}`}>
        {activity.reason}
      </p>

      {activity.href ? (
        <Link
          href={activity.href}
          className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
            isNow ? 'bg-white text-slate-900' : 'border border-slate-200 bg-white text-slate-700'
          }`}
        >
          <ExternalLink size={16} />
          {activity.linkLabel || 'Open activity'}
        </Link>
      ) : null}
    </section>
  );
}

function PlanRow({ activity }: { activity: SchedulerRuntimeActivity }) {
  return (
    <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm md:grid-cols-[150px_minmax(0,1fr)]">
      <div className="text-slate-500">
        {formatSchedulerClock(activity.startDate)}-{formatSchedulerClock(activity.endDate)}
        <div className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${activityStyles[activity.type]}`}>
          {activity.label}
        </div>
      </div>
      <div>
        <div className="font-semibold text-slate-900">{activity.title}</div>
        <p className="mt-2 leading-6 text-slate-600">{activity.reason}</p>
      </div>
    </div>
  );
}

function EnergySelector({ onSelect }: { onSelect: (level: EnergyLevel) => void }) {
  return (
    <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-5 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Energy check</div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {energyOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className="rounded-3xl border border-blue-100 bg-white p-4 text-left shadow-sm transition hover:border-blue-300"
          >
            <div className="text-lg font-semibold text-slate-900">{option.label}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{option.detail}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function InterruptionOverlay({
  interruption,
  onChange,
  onResume
}: {
  interruption: {
    lastAction: string;
    nextAction: string;
  };
  onChange: (fields: { lastAction?: string; nextAction?: string }) => void;
  onResume: () => void;
}) {
  const canResume = interruption.lastAction.trim().length > 0 && interruption.nextAction.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6">
      <section className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <PauseCircle className="text-amber-600" size={24} />
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Interruption</div>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Save the re-entry note</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="text-sm font-medium text-slate-700">
            Last action
            <input
              value={interruption.lastAction}
              maxLength={140}
              onChange={(event) => onChange({ lastAction: event.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Next action
            <input
              value={interruption.nextAction}
              maxLength={140}
              onChange={(event) => onChange({ nextAction: event.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
            />
          </label>
        </div>

        <button
          type="button"
          disabled={!canResume}
          onClick={onResume}
          className={`mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white ${
            canResume ? 'bg-slate-900' : 'bg-slate-400'
          }`}
        >
          <Play size={16} />
          Resume
        </button>
      </section>
    </div>
  );
}

function ResumeOverlay({
  lastAction,
  nextAction,
  onRestart
}: {
  lastAction: string;
  nextAction: string;
  onRestart: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 px-4 py-6 text-white">
      <section className="w-full max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Re-entry note</div>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight">Restart from the saved state</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white/10 p-5">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-300">Last action</div>
            <p className="mt-3 text-xl leading-8">{lastAction}</p>
          </div>
          <div className="rounded-[2rem] bg-white/10 p-5">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-300">Next action</div>
            <p className="mt-3 text-xl leading-8">{nextAction}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900"
        >
          <Play size={16} />
          Restart scheduler
        </button>
      </section>
    </div>
  );
}

function BlockLogPrompt({
  blockId,
  blockLabel,
  onSave
}: {
  blockId: SchedulerBlockId;
  blockLabel: string;
  onSave: (
    blockId: SchedulerBlockId,
    log: {
      workedOn: string;
      canExplain: string;
      oneGap: string;
    }
  ) => void;
}) {
  const [workedOn, setWorkedOn] = useState('');
  const [canExplain, setCanExplain] = useState('');
  const [oneGap, setOneGap] = useState('');

  useEffect(() => {
    setWorkedOn('');
    setCanExplain('');
    setOneGap('');
  }, [blockId]);

  const canSave = workedOn.trim().length > 0 && canExplain.trim().length > 0 && oneGap.trim().length > 0;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/95 px-4 py-6 backdrop-blur">
      <section className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <FileText className="text-slate-700" size={24} />
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Block close</div>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">{blockLabel} PD log</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          {[
            {
              label: 'What I worked on',
              value: workedOn,
              setter: setWorkedOn
            },
            {
              label: 'What I can explain without notes',
              value: canExplain,
              setter: setCanExplain
            },
            {
              label: 'One gap',
              value: oneGap,
              setter: setOneGap
            }
          ].map((field) => (
            <label key={field.label} className="text-sm font-medium text-slate-700">
              {field.label}
              <textarea
                value={field.value}
                maxLength={140}
                onChange={(event) => field.setter(event.target.value)}
                className="mt-2 min-h-20 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-900"
              />
              <span className="mt-1 block text-xs text-slate-500">{field.value.length}/140</span>
            </label>
          ))}
        </div>

        <button
          type="button"
          disabled={!canSave}
          onClick={() => onSave(blockId, { workedOn, canExplain, oneGap })}
          className={`mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white ${
            canSave ? 'bg-slate-900' : 'bg-slate-400'
          }`}
        >
          <FileText size={16} />
          Save block log
        </button>
      </section>
    </div>
  );
}

export default function SchedulerPage() {
  const scheduler = useScheduler();
  const [planOpen, setPlanOpen] = useState(false);
  const [usageEvents, setUsageEvents] = useState<UsageEvent[]>([]);
  const activeInterruption = scheduler.sessionState.activeInterruption;
  const usageHint = useMemo(() => getSchedulerUsageHint(usageEvents), [usageEvents]);
  const currentSchedulerActivity = scheduler.currentActivity;
  const activeBlockLabel = scheduler.activeBlock?.label;

  useEffect(() => {
    setUsageEvents(getUsageEvents());
  }, []);

  useEffect(() => {
    const activity = currentSchedulerActivity;
    if (!activity) {
      return;
    }

    const startedAt = Date.now();
    trackUsageInteraction({
      eventType: 'scheduler_activity_started',
      route: '/scheduler',
      label: activity.title,
      contentType: 'scheduler',
      contentId: activity.id,
      activityCategory: usageCategoryForSchedulerType(activity.type),
      metadata: {
        level: activeBlockLabel
      }
    });

    return () => {
      trackUsageInteraction({
        eventType: 'scheduler_activity_completed',
        route: '/scheduler',
        label: activity.title,
        contentType: 'scheduler',
        contentId: activity.id,
        activityCategory: usageCategoryForSchedulerType(activity.type),
        durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
        completed: true,
        metadata: {
          level: activeBlockLabel
        }
      });
    };
  }, [activeBlockLabel, currentSchedulerActivity]);

  return (
    <div className="space-y-6 pb-24">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">PD Scheduler</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Real-time professional development block
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Current focus: {scheduler.settings.studyContext.certificationFocus}, {scheduler.settings.studyContext.currentTopic}.
            </p>
          </div>
          <div className="rounded-[2rem] bg-slate-900 px-5 py-4 text-white">
            <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
              <Clock size={16} />
              Live clock
            </div>
            <div className="mt-2 text-3xl font-semibold tabular-nums">
              {formatSchedulerClock(scheduler.now, true)}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Current block</div>
          <div className="mt-2 text-xl font-semibold text-slate-900">
            {scheduler.activeBlock ? scheduler.activeBlock.label : 'No active PD block'}
          </div>
          {scheduler.activeBlock ? (
            <div className="mt-2 text-sm text-slate-600">
              {formatSchedulerClock(scheduler.activeBlock.startDate)}-{formatSchedulerClock(scheduler.activeBlock.endDate)}
            </div>
          ) : null}
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Block countdown</div>
          <div className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">
            {scheduler.activeBlock
              ? formatSchedulerCountdown(scheduler.activeBlockRemainingMs)
              : formatSchedulerCountdown(scheduler.nextBlockCountdownMs)}
          </div>
          <div className="mt-2 text-sm text-slate-600">
            {scheduler.activeBlock ? 'Remaining in block' : scheduler.nextBlock ? `Until ${scheduler.nextBlock.label}` : 'Waiting'}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Energy</div>
          <div className="mt-2 text-xl font-semibold capitalize text-slate-900">{scheduler.energyLevel || 'Default high'}</div>
          <div className="mt-2 text-sm text-slate-600">
            {scheduler.flashcardOnly ? 'Flashcard-only recovery mode is active.' : 'Schedule uses the selected block energy.'}
          </div>
        </div>
      </section>

      {scheduler.pendingLogBlock ? (
        <BlockLogPrompt
          blockId={scheduler.pendingLogBlock.id}
          blockLabel={scheduler.pendingLogBlock.label}
          onSave={(blockId, log) => {
            trackUsageInteraction({
              eventType: 'scheduler_activity_completed',
              route: '/scheduler',
              label: `${scheduler.pendingLogBlock?.label || blockId} block log`,
              contentType: 'scheduler',
              contentId: blockId,
              activityCategory: 'writing',
              completed: true,
              metadata: {
                level: scheduler.pendingLogBlock?.label
              }
            });
            scheduler.saveBlockLog(blockId, log);
          }}
        />
      ) : null}

      {activeInterruption?.resumeReviewOpen ? (
        <ResumeOverlay
          lastAction={activeInterruption.lastAction}
          nextAction={activeInterruption.nextAction}
          onRestart={() => {
            trackUsageInteraction({
              eventType: 'interruption_resolved',
              route: '/scheduler',
              label: 'Scheduler interruption resolved',
              contentType: 'scheduler',
              activityCategory: 'interruption',
              completed: true,
              metadata: {
                interruptionType: activeInterruption.blockId
              }
            });
            scheduler.finishResume();
          }}
        />
      ) : activeInterruption ? (
        <InterruptionOverlay
          interruption={activeInterruption}
          onChange={scheduler.updateInterruptionNote}
          onResume={scheduler.requestResume}
        />
      ) : null}

      {scheduler.shouldShowEnergySelector ? (
        <EnergySelector
          onSelect={(level) => {
            trackUsageInteraction({
              eventType: 'scheduler_activity_started',
              route: '/scheduler',
              label: `Energy check: ${level}`,
              contentType: 'scheduler',
              activityCategory: 'scheduler',
              metadata: {
                level
              }
            });
            scheduler.setEnergy(level);
          }}
        />
      ) : null}

      {scheduler.breakCountdown ? (
        <section className="rounded-[2rem] border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
                <TimerReset size={16} />
                Midpoint break
              </div>
              <p className="mt-2 text-sm leading-6 text-orange-900">
                {scheduler.breakCountdown.mode === 'in-break'
                  ? 'Break is active now. This countdown cannot be skipped.'
                  : 'Movement break starts soon. Finish the current thought and stand up.'}
              </p>
            </div>
            <div className="text-4xl font-semibold tabular-nums text-orange-900">
              {formatSchedulerCountdown(scheduler.breakCountdown.countdownMs)}
            </div>
          </div>
        </section>
      ) : null}

      {scheduler.flashcardOnly ? (
        <section className="rounded-[2rem] border border-cyan-200 bg-cyan-50 p-5 text-sm leading-6 text-cyan-900 shadow-sm">
          Flashcard-only recovery mode is active for this block because interruption left a short or fragmented window.
        </section>
      ) : null}

      {scheduler.activeBlock ? (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <ActivityCard activity={scheduler.currentActivity} emphasis="now" />
            <ActivityCard activity={scheduler.nextActivity} emphasis="next" />

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <button
                type="button"
                onClick={() => setPlanOpen((current) => !current)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Remaining block plan</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {scheduler.remainingActivities.length} remaining item{scheduler.remainingActivities.length === 1 ? '' : 's'}.
                  </p>
                </div>
                <span className="rounded-full border border-slate-200 bg-white p-2 text-slate-600">
                  {planOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {planOpen ? (
                <div className="mt-5 space-y-3">
                  {scheduler.remainingActivities.map((activity) => (
                    <PlanRow key={activity.id} activity={activity} />
                  ))}
                </div>
              ) : null}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Based on your usage</div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">{usageHint.title}</h2>
              <p className="mt-3 text-sm leading-6 text-blue-950">{usageHint.reason}</p>
              <Link
                href={usageHint.route}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-800"
              >
                <ExternalLink size={16} />
                Open next action
              </Link>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Study context</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-700">
                <div>
                  <div className="text-slate-500">Video source</div>
                  <div className="mt-1 font-semibold text-slate-900">{scheduler.settings.studyContext.videoSource}</div>
                </div>
                <div>
                  <div className="text-slate-500">Remaining video</div>
                  <div className="mt-1 font-semibold text-slate-900">{scheduler.settings.studyContext.remainingVideo}</div>
                </div>
                <div>
                  <div className="text-slate-500">Break actions</div>
                  <div className="mt-1 font-semibold text-slate-900">{scheduler.settings.studyContext.breakActivities}</div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={scheduler.settings.studyContext.flashcardHref}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  <ExternalLink size={16} />
                  Due Today
                </Link>
                <Link
                  href={scheduler.settings.studyContext.applicationHref}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  <ExternalLink size={16} />
                  Scenario Lab
                </Link>
              </div>
            </section>

            <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 text-amber-700" size={20} />
                <p className="text-sm leading-6 text-amber-900">
                  Tickets, walk-ups, calls, and Paul&apos;s instructions still take priority. Use interruption mode before
                  stepping away.
                </p>
              </div>
            </section>
          </aside>
        </section>
      ) : (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">No active PD block</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {scheduler.nextBlock ? `${scheduler.nextBlock.label} starts at ${formatSchedulerClock(scheduler.nextBlock.startDate)}` : 'No upcoming block found'}
          </h2>
          {scheduler.nextBlock ? (
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Countdown: {formatSchedulerCountdown(scheduler.nextBlockCountdownMs)}
            </p>
          ) : null}
        </section>
      )}

      <button
        type="button"
        onClick={() => {
          trackUsageInteraction({
            eventType: 'interruption_started',
            route: '/scheduler',
            label: scheduler.currentActivity?.title || 'Scheduler interruption',
            contentType: 'scheduler',
            activityCategory: 'interruption',
            metadata: {
              interruptionType: scheduler.currentActivity?.type || 'outside-block'
            }
          });
          scheduler.startInterruption();
        }}
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg"
      >
        <PauseCircle size={18} />
        Interruption
      </button>
    </div>
  );
}
