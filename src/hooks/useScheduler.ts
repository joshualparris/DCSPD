"use client";

import { useEffect, useMemo, useState } from 'react';

export type SchedulerDayKey = 'thursday' | 'friday';

export type SchedulerBlockId =
  | 'thursday-block-1'
  | 'thursday-block-2'
  | 'thursday-block-3'
  | 'friday-block-1'
  | 'friday-block-2'
  | 'friday-block-3';

export type EnergyLevel = 'low' | 'moderate' | 'high';

export type SchedulerActivityType =
  | 'orientation'
  | 'brain-dump'
  | 'video'
  | 'application'
  | 'retrieval'
  | 'flashcards'
  | 'writing'
  | 'building'
  | 'break'
  | 'log';

export type SchedulerBlockSettings = {
  id: SchedulerBlockId;
  day: SchedulerDayKey;
  label: string;
  startTime: string;
  endTime: string;
};

export type SchedulerStudyContext = {
  certificationFocus: string;
  currentTopic: string;
  remainingVideo: string;
  videoSource: string;
  flashcardSource: string;
  flashcardHref: string;
  applicationSource: string;
  applicationHref: string;
  buildingTasks: string;
  writingTasks: string;
  breakActivities: string;
};

export type SchedulerSettings = {
  blocks: SchedulerBlockSettings[];
  studyContext: SchedulerStudyContext;
};

export type SchedulerActivity = {
  id: string;
  type: SchedulerActivityType;
  label: string;
  title: string;
  detail: string;
  reason: string;
  startOffsetMinutes: number;
  endOffsetMinutes: number;
  href?: string;
  linkLabel?: string;
  mandatory?: boolean;
};

export type SchedulerRuntimeBlock = SchedulerBlockSettings & {
  startDate: Date;
  endDate: Date;
  durationMinutes: number;
};

export type SchedulerRuntimeActivity = SchedulerActivity & {
  startDate: Date;
  endDate: Date;
  durationMinutes: number;
};

export type SchedulerInterruption = {
  id: string;
  blockId: SchedulerBlockId | 'outside-block';
  startedAtIso: string;
  savedAtIso?: string;
  resumedAtIso?: string;
  lastAction: string;
  nextAction: string;
};

export type SchedulerActiveInterruption = SchedulerInterruption & {
  resumeReviewOpen?: boolean;
};

export type SchedulerBlockLog = {
  blockId: SchedulerBlockId;
  savedAtIso: string;
  workedOn: string;
  canExplain: string;
  oneGap: string;
};

export type SchedulerSessionState = {
  dateKey: string;
  energyByBlock: Partial<Record<SchedulerBlockId, EnergyLevel>>;
  interruptionsByBlock: Partial<Record<SchedulerBlockId | 'outside-block', SchedulerInterruption[]>>;
  activeInterruption?: SchedulerActiveInterruption;
  flashcardOnlyByBlock: Partial<Record<SchedulerBlockId, boolean>>;
  logsByBlock: Partial<Record<SchedulerBlockId, SchedulerBlockLog>>;
};

export type SchedulerBreakCountdown = {
  activity: SchedulerRuntimeActivity;
  mode: 'starts-soon' | 'in-break';
  countdownMs: number;
};

const MINUTE_MS = 60 * 1000;
export const SCHEDULER_SETTINGS_STORAGE_KEY = 'dcsprep_scheduler_settings_v1';
const SCHEDULER_SESSION_STORAGE_PREFIX = 'dcsprep_scheduler_session_v1_';

export const DEFAULT_SCHEDULER_SETTINGS: SchedulerSettings = {
  blocks: [
    { id: 'thursday-block-1', day: 'thursday', label: 'Thursday Block 1', startTime: '08:30', endTime: '10:55' },
    { id: 'thursday-block-2', day: 'thursday', label: 'Thursday Block 2', startTime: '11:25', endTime: '13:05' },
    { id: 'thursday-block-3', day: 'thursday', label: 'Thursday Block 3', startTime: '13:45', endTime: '16:20' },
    { id: 'friday-block-1', day: 'friday', label: 'Friday Block 1', startTime: '08:30', endTime: '11:05' },
    { id: 'friday-block-2', day: 'friday', label: 'Friday Block 2', startTime: '11:35', endTime: '13:05' },
    { id: 'friday-block-3', day: 'friday', label: 'Friday Block 3', startTime: '13:45', endTime: '16:20' }
  ],
  studyContext: {
    certificationFocus: 'CompTIA A+ Core 2 in progress',
    currentTopic: 'Section 1.6 Windows Settings',
    remainingVideo: '~10 hours of Messer content remaining',
    videoSource: 'Professor Messer on YouTube',
    flashcardSource: 'DCSPrep internal deck',
    flashcardHref: '/due-today',
    applicationSource: 'DCSPrep scenarios',
    applicationHref: '/scenarios',
    buildingTasks: 'DCSPrep app itself and new scenario/content authoring',
    writingTasks: 'Ticket templates, runbooks, PD log entries, Evidence Pack entries',
    breakActivities: 'Walk outside, water, brief outdoor exposure'
  }
};

function getLocalDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function parseTimeToMinutes(time: string) {
  const [hourPart, minutePart] = time.split(':');
  const hours = Number(hourPart);
  const minutes = Number(minutePart);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return 0;
  }

  return hours * 60 + minutes;
}

function makeDateAtMinutes(baseDate: Date, totalMinutes: number) {
  const date = new Date(baseDate);
  date.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60, 0, 0);
  return date;
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * MINUTE_MS);
}

function getDayKey(date: Date): SchedulerDayKey | null {
  if (date.getDay() === 4) return 'thursday';
  if (date.getDay() === 5) return 'friday';
  return null;
}

function createDefaultSessionState(dateKey: string): SchedulerSessionState {
  return {
    dateKey,
    energyByBlock: {},
    interruptionsByBlock: {},
    flashcardOnlyByBlock: {},
    logsByBlock: {}
  };
}

function isBlockId(value: unknown): value is SchedulerBlockId {
  return DEFAULT_SCHEDULER_SETTINGS.blocks.some((block) => block.id === value);
}

function normalizeBlocks(value: unknown): SchedulerBlockSettings[] {
  if (!Array.isArray(value)) {
    return DEFAULT_SCHEDULER_SETTINGS.blocks;
  }

  const byId = new Map(
    value
      .filter((block): block is SchedulerBlockSettings => {
        if (!block || typeof block !== 'object') return false;
        const candidate = block as Partial<SchedulerBlockSettings>;
        return Boolean(
          isBlockId(candidate.id) &&
            (candidate.day === 'thursday' || candidate.day === 'friday') &&
            candidate.label &&
            candidate.startTime &&
            candidate.endTime
        );
      })
      .map((block) => [block.id, block])
  );

  return DEFAULT_SCHEDULER_SETTINGS.blocks.map((defaultBlock) => {
    const stored = byId.get(defaultBlock.id);
    if (!stored) return defaultBlock;

    return {
      ...defaultBlock,
      label: String(stored.label || defaultBlock.label),
      startTime: String(stored.startTime || defaultBlock.startTime),
      endTime: String(stored.endTime || defaultBlock.endTime)
    };
  });
}

function normalizeStudyContext(value: unknown): SchedulerStudyContext {
  if (!value || typeof value !== 'object') {
    return DEFAULT_SCHEDULER_SETTINGS.studyContext;
  }

  const candidate = value as Partial<SchedulerStudyContext>;

  return {
    certificationFocus: String(candidate.certificationFocus || DEFAULT_SCHEDULER_SETTINGS.studyContext.certificationFocus),
    currentTopic: String(candidate.currentTopic || DEFAULT_SCHEDULER_SETTINGS.studyContext.currentTopic),
    remainingVideo: String(candidate.remainingVideo || DEFAULT_SCHEDULER_SETTINGS.studyContext.remainingVideo),
    videoSource: String(candidate.videoSource || DEFAULT_SCHEDULER_SETTINGS.studyContext.videoSource),
    flashcardSource: String(candidate.flashcardSource || DEFAULT_SCHEDULER_SETTINGS.studyContext.flashcardSource),
    flashcardHref: String(candidate.flashcardHref || DEFAULT_SCHEDULER_SETTINGS.studyContext.flashcardHref),
    applicationSource: String(candidate.applicationSource || DEFAULT_SCHEDULER_SETTINGS.studyContext.applicationSource),
    applicationHref: String(candidate.applicationHref || DEFAULT_SCHEDULER_SETTINGS.studyContext.applicationHref),
    buildingTasks: String(candidate.buildingTasks || DEFAULT_SCHEDULER_SETTINGS.studyContext.buildingTasks),
    writingTasks: String(candidate.writingTasks || DEFAULT_SCHEDULER_SETTINGS.studyContext.writingTasks),
    breakActivities: String(candidate.breakActivities || DEFAULT_SCHEDULER_SETTINGS.studyContext.breakActivities)
  };
}

export function normalizeSchedulerSettings(value: unknown): SchedulerSettings {
  if (!value || typeof value !== 'object') {
    return DEFAULT_SCHEDULER_SETTINGS;
  }

  const candidate = value as Partial<SchedulerSettings>;

  return {
    blocks: normalizeBlocks(candidate.blocks),
    studyContext: normalizeStudyContext(candidate.studyContext)
  };
}

export function loadSchedulerSettings(): SchedulerSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SCHEDULER_SETTINGS;
  }

  try {
    const raw = window.localStorage.getItem(SCHEDULER_SETTINGS_STORAGE_KEY);
    return raw ? normalizeSchedulerSettings(JSON.parse(raw)) : DEFAULT_SCHEDULER_SETTINGS;
  } catch (error) {
    console.error('loadSchedulerSettings error', error);
    return DEFAULT_SCHEDULER_SETTINGS;
  }
}

export function saveSchedulerSettings(settings: SchedulerSettings) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(SCHEDULER_SETTINGS_STORAGE_KEY, JSON.stringify(normalizeSchedulerSettings(settings)));
  } catch (error) {
    console.error('saveSchedulerSettings error', error);
  }
}

export function resetSchedulerSettings() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(SCHEDULER_SETTINGS_STORAGE_KEY);
  } catch (error) {
    console.error('resetSchedulerSettings error', error);
  }
}

function loadSchedulerSession(dateKey: string): SchedulerSessionState {
  if (typeof window === 'undefined') {
    return createDefaultSessionState(dateKey);
  }

  try {
    const raw = window.localStorage.getItem(`${SCHEDULER_SESSION_STORAGE_PREFIX}${dateKey}`);
    if (!raw) {
      return createDefaultSessionState(dateKey);
    }

    const parsed = JSON.parse(raw) as Partial<SchedulerSessionState>;

    return {
      dateKey,
      energyByBlock: parsed.energyByBlock || {},
      interruptionsByBlock: parsed.interruptionsByBlock || {},
      activeInterruption: parsed.activeInterruption,
      flashcardOnlyByBlock: parsed.flashcardOnlyByBlock || {},
      logsByBlock: parsed.logsByBlock || {}
    };
  } catch (error) {
    console.error('loadSchedulerSession error', error);
    return createDefaultSessionState(dateKey);
  }
}

function saveSchedulerSession(session: SchedulerSessionState) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(`${SCHEDULER_SESSION_STORAGE_PREFIX}${session.dateKey}`, JSON.stringify(session));
  } catch (error) {
    console.error('saveSchedulerSession error', error);
  }
}

function getRuntimeBlocksForDate(date: Date, blocks: SchedulerBlockSettings[]) {
  const dayKey = getDayKey(date);
  if (!dayKey) return [];

  return blocks
    .filter((block) => block.day === dayKey)
    .map((block) => {
      const startDate = makeDateAtMinutes(date, parseTimeToMinutes(block.startTime));
      const endDate = makeDateAtMinutes(date, parseTimeToMinutes(block.endTime));
      const durationMinutes = Math.round((endDate.getTime() - startDate.getTime()) / MINUTE_MS);

      return {
        ...block,
        startDate,
        endDate,
        durationMinutes
      };
    })
    .filter((block) => block.durationMinutes > 0)
    .sort((left, right) => left.startDate.getTime() - right.startDate.getTime());
}

function getActiveBlock(now: Date, blocks: SchedulerBlockSettings[]) {
  return getRuntimeBlocksForDate(now, blocks).find(
    (block) => now.getTime() >= block.startDate.getTime() && now.getTime() < block.endDate.getTime()
  );
}

function getNextBlock(now: Date, blocks: SchedulerBlockSettings[]) {
  const candidates: SchedulerRuntimeBlock[] = [];

  for (let offset = 0; offset <= 8; offset += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + offset);
    candidates.push(...getRuntimeBlocksForDate(date, blocks));
  }

  return candidates
    .filter((block) => block.startDate.getTime() > now.getTime())
    .sort((left, right) => left.startDate.getTime() - right.startDate.getTime())[0];
}

function addActivity(
  activities: SchedulerActivity[],
  input: Omit<SchedulerActivity, 'id' | 'startOffsetMinutes' | 'endOffsetMinutes'> & { minutes: number }
) {
  const startOffsetMinutes = activities.length ? activities[activities.length - 1].endOffsetMinutes : 0;
  const endOffsetMinutes = startOffsetMinutes + input.minutes;

  activities.push({
    id: `${input.type}-${startOffsetMinutes}-${endOffsetMinutes}`,
    type: input.type,
    label: input.label,
    title: input.title,
    detail: input.detail,
    reason: input.reason,
    href: input.href,
    linkLabel: input.linkLabel,
    mandatory: input.mandatory,
    startOffsetMinutes,
    endOffsetMinutes
  });
}

function buildNinetyMinutePlan(context: SchedulerStudyContext, energy: EnergyLevel) {
  const activities: SchedulerActivity[] = [];
  const videoMinutes = energy === 'moderate' ? 25 : 25;
  const primaryType: SchedulerActivityType = energy === 'low' ? 'retrieval' : 'video';

  addActivity(activities, {
    type: 'orientation',
    label: 'Orient',
    title: 'Set a 3-sentence intention',
    detail: 'Write the exact target for this block and recall three things from the previous session before opening notes.',
    reason: 'Retrieval practice primes memory and prevents vague study drift.',
    minutes: 5
  });
  addActivity(activities, {
    type: primaryType,
    label: energy === 'low' ? 'Retrieval' : 'Intake',
    // time.md: keep videos in 10-15 minute microlearning chunks so tickets do not destroy re-entry.
    title: energy === 'low' ? 'Closed-book recall on Windows Settings' : `Watch ${videoMinutes} min of ${context.videoSource} in micro-segments`,
    detail:
      energy === 'low'
        ? `Use ${context.flashcardSource} and write what you remember about ${context.currentTopic}.`
        : `${context.certificationFocus}: ${context.currentTopic}. Split this into 10-15 minute chunks and write one recall line between chunks.`,
    reason:
      energy === 'low'
        ? 'Low energy favours retrieval because it has high learning return without adding new cognitive load.'
        : 'Microlearning keeps Messer intake resumable if a ticket interrupts the block and limits cognitive load.',
    href: energy === 'low' ? context.flashcardHref : undefined,
    linkLabel: energy === 'low' ? 'Open Due Today' : undefined,
    minutes: videoMinutes
  });
  addActivity(activities, {
    type: 'application',
    label: 'Apply',
    title: 'Run a DCSPrep scenario on the same concept',
    detail: `${context.applicationSource}: convert the concept into a DCS support decision or troubleshooting note.`,
    reason: 'Application after intake consolidates schema and improves transfer to real support work.',
    href: context.applicationHref,
    linkLabel: 'Open Scenario Lab',
    minutes: 15
  });
  addActivity(activities, {
    type: 'break',
    label: 'Break',
    title: 'Mandatory midpoint movement break',
    detail: context.breakActivities,
    reason: 'For blocks of 90 minutes or more, fatigue research supports a non-optional movement reset near the midpoint.',
    mandatory: true,
    minutes: 6
  });
  addActivity(activities, {
    type: 'writing',
    label: 'Write',
    title: 'Create a short support explanation',
    detail: context.writingTasks,
    reason: 'Generation and self-explanation deepen encoding more than re-reading notes.',
    minutes: 19
  });
  addActivity(activities, {
    type: 'flashcards',
    label: 'Review',
    title: 'DCSPrep SRS flashcard review',
    detail: `Use ${context.flashcardSource} across mixed topics, not only the just-studied item.`,
    reason: 'Spaced and interleaved retrieval is the highest-return consolidation activity in a short block.',
    href: context.flashcardHref,
    linkLabel: 'Open Due Today',
    minutes: 15
  });
  addActivity(activities, {
    type: 'log',
    label: 'Log',
    title: 'Block-end PD log',
    detail: 'Capture what you worked on, what you can explain without notes, and one gap.',
    reason: 'Concise metacognitive closure reduces the illusion of knowing and prepares the next session.',
    mandatory: true,
    minutes: 5
  });

  return activities;
}

function buildHundredMinutePlan(context: SchedulerStudyContext, energy: EnergyLevel) {
  const activities: SchedulerActivity[] = [];
  const videoMinutes = energy === 'high' ? 30 : 25;
  const applicationMinutes = energy === 'high' ? 15 : 20;
  const primaryType: SchedulerActivityType = energy === 'low' ? 'retrieval' : 'video';

  addActivity(activities, {
    type: 'orientation',
    label: 'Orient',
    title: 'Set intention and retrieve Block 1',
    detail: 'Write the block target, then answer three Block 1 questions from memory.',
    reason: 'Retrieval immediately after initial encoding strengthens durable recall.',
    minutes: 5
  });
  addActivity(activities, {
    type: primaryType,
    label: energy === 'low' ? 'Retrieval' : 'Intake',
    title: energy === 'low' ? 'Free recall plus flashcards' : `Watch ${videoMinutes} min of ${context.videoSource} in micro-segments`,
    detail:
      energy === 'low'
        ? `Use ${context.flashcardSource}; do not add new video if energy is low.`
        : `${context.currentTopic}. Use 10-15 minute sub-sections so the next action is always recoverable after an interruption.`,
    reason:
      energy === 'low'
        ? 'Low-energy blocks should consolidate rather than widen the learning surface.'
        : 'Short segmented intake supports just-in-time learning without crowding out application.',
    href: energy === 'low' ? context.flashcardHref : undefined,
    linkLabel: energy === 'low' ? 'Open Due Today' : undefined,
    minutes: videoMinutes
  });
  addActivity(activities, {
    type: 'application',
    label: 'Apply',
    title: 'Apply the concept in DCSPrep',
    detail: `${context.applicationSource}: scenario answer, mini-lab, or troubleshooting decision tree.`,
    reason: 'Block 2 is the best consolidation window for material introduced earlier in the day.',
    href: context.applicationHref,
    linkLabel: 'Open Scenario Lab',
    minutes: applicationMinutes
  });
  addActivity(activities, {
    type: 'break',
    label: 'Break',
    title: 'Mandatory midpoint movement break',
    detail: context.breakActivities,
    reason: 'The break sits at the midpoint so fatigue is handled before accuracy drops.',
    mandatory: true,
    minutes: 7
  });
  addActivity(activities, {
    type: 'flashcards',
    label: 'Review',
    title: 'Interleaved DCSPrep flashcards',
    detail: 'Review a different topic from the primary activity.',
    reason: 'Interleaving improves discrimination and transfer better than drilling one topic smoothly.',
    href: context.flashcardHref,
    linkLabel: 'Open Due Today',
    minutes: 20
  });
  addActivity(activities, {
    type: 'writing',
    label: 'Write',
    title: 'Runbook, ticket template, or PD evidence note',
    detail: context.writingTasks,
    reason: 'Writing turns study into a reusable professional artefact and strengthens self-explanation.',
    minutes: 18
  });
  addActivity(activities, {
    type: 'log',
    label: 'Log',
    title: 'Block-end PD log',
    detail: 'Capture the learning, explainable idea, and one gap before the block closes.',
    reason: 'Short required closure keeps evidence visible without gamification or productivity scoring.',
    mandatory: true,
    minutes: 5
  });

  return activities;
}

function buildThursdayMorningPlan(context: SchedulerStudyContext, energy: EnergyLevel) {
  const activities: SchedulerActivity[] = [];
  const firstIntakeType: SchedulerActivityType = energy === 'low' ? 'retrieval' : 'video';
  const secondIntakeType: SchedulerActivityType = energy === 'high' ? 'video' : 'retrieval';

  addActivity(activities, {
    type: 'orientation',
    label: 'Orient',
    title: 'Set intention and recall prior PD',
    detail: 'Write the block target and spend five minutes recalling the previous PD day before opening notes.',
    reason: 'Morning Block 1 is peak alertness, but starting with recall strengthens spacing from the previous session.',
    minutes: 10
  });
  addActivity(activities, {
    type: firstIntakeType,
    label: energy === 'low' ? 'Retrieval' : 'Hardest first',
    title:
      energy === 'low'
        ? 'Switch intake to retrieval practice'
        : `Watch two 15-min ${context.videoSource} micro-segments`,
    detail:
      energy === 'low'
        ? `Use ${context.flashcardSource} for ${context.currentTopic} and prior weak concepts.`
        : `${context.certificationFocus}: ${context.currentTopic}. Sketch while watching and write one recall line between segments; do not browse other sources.`,
    reason:
      energy === 'low'
        ? 'Low energy changes Block 1 intake into retrieval so the session still produces learning without overload.'
        : 'Morning priority puts new intake and abstract material in the highest-alertness window while micro-segmenting keeps it resumable.',
    href: energy === 'low' ? context.flashcardHref : undefined,
    linkLabel: energy === 'low' ? 'Open Due Today' : undefined,
    minutes: 32
  });
  addActivity(activities, {
    type: 'application',
    label: 'Apply',
    title: 'Apply the just-watched concept',
    detail: `${context.applicationSource}: build a scenario answer, support checklist, or troubleshooting path.`,
    reason: 'Application immediately after worked examples reduces shallow video familiarity.',
    href: context.applicationHref,
    linkLabel: 'Open Scenario Lab',
    minutes: 30
  });
  addActivity(activities, {
    type: 'break',
    label: 'Break',
    title: 'Mandatory midpoint movement break',
    detail: context.breakActivities,
    reason: 'The break lands within five minutes of the midpoint and is treated as part of the learning system.',
    mandatory: true,
    minutes: 8
  });
  addActivity(activities, {
    type: 'retrieval',
    label: 'Retrieve',
    title: 'Closed-book recall or flashcards',
    detail: 'Write what stuck from the first half, then test five to ten cards from mixed topics.',
    reason: 'Testing effect: retrieval after initial exposure creates stronger memory than another passive viewing pass.',
    href: context.flashcardHref,
    linkLabel: 'Open Due Today',
    minutes: 22
  });
  addActivity(activities, {
    type: secondIntakeType,
    label: secondIntakeType === 'video' ? 'Second intake' : 'Consolidate',
    title:
      secondIntakeType === 'video'
        ? `Watch one 15-20 min ${context.videoSource} segment`
        : 'Continue retrieval instead of more video',
    detail:
      secondIntakeType === 'video'
        ? 'Use this only if energy is high; stop at a clean sub-section and write the next action.'
        : 'Moderate energy caps video and uses the second half for durable recall.',
    reason:
      secondIntakeType === 'video'
        ? 'Video remains under 40% of the block so intake cannot crowd out retrieval and output.'
        : 'Moderate energy keeps video short and protects the follow-on learning work.',
    href: secondIntakeType === 'retrieval' ? context.flashcardHref : undefined,
    linkLabel: secondIntakeType === 'retrieval' ? 'Open Due Today' : undefined,
    minutes: 20
  });
  addActivity(activities, {
    type: 'writing',
    label: 'Build/write',
    title: 'Write the support artefact',
    detail: context.writingTasks,
    reason: 'Generation effect: runbooks, ticket templates, and PD entries are study, not admin.',
    minutes: 18
  });
  addActivity(activities, {
    type: 'flashcards',
    label: 'Close',
    title: 'Five-card targeted retrieval',
    detail: `Use ${context.flashcardSource} for whatever felt shaky.`,
    reason: 'A short targeted recall close identifies the next real gap.',
    href: context.flashcardHref,
    linkLabel: 'Open Due Today',
    minutes: 5
  });

  return activities;
}

function buildFridayMorningPlan(context: SchedulerStudyContext, energy: EnergyLevel) {
  const activities: SchedulerActivity[] = [];
  const intakeType: SchedulerActivityType = energy === 'low' ? 'retrieval' : 'video';
  const intakeMinutes = energy === 'moderate' ? 25 : 28;
  const firstApplicationMinutes = energy === 'moderate' ? 38 : 35;

  addActivity(activities, {
    type: 'brain-dump',
    label: 'Brain-dump',
    title: 'Friday free recall before notes',
    detail: 'Write everything remembered from Thursday for 12 minutes. Do not open notes first.',
    reason: 'Testing effect plus overnight spacing: Friday Block 1 is the highest-leverage retrieval moment of the week.',
    mandatory: true,
    minutes: 12
  });
  addActivity(activities, {
    type: intakeType,
    label: energy === 'low' ? 'Retrieve' : 'Hardest first',
    title: energy === 'low' ? 'Low-energy retrieval on Thursday material' : `Watch ${intakeMinutes} min of ${context.videoSource} in micro-segments`,
    detail:
      energy === 'low'
        ? `Use ${context.flashcardSource} and your Thursday brain-dump gaps.`
        : `${context.certificationFocus}: ${context.currentTopic}; use the morning window for harder concepts, split into recoverable 10-15 minute chunks.`,
    reason:
      energy === 'low'
        ? 'Low energy switches Block 1 intake to retrieval while preserving Friday recall.'
        : 'Morning alertness is reserved for new or abstract material after the mandatory brain-dump.',
    href: energy === 'low' ? context.flashcardHref : undefined,
    linkLabel: energy === 'low' ? 'Open Due Today' : undefined,
    minutes: intakeMinutes
  });
  addActivity(activities, {
    type: 'application',
    label: 'Apply',
    title: 'DCSPrep scenario on Thursday/Friday themes',
    detail: `${context.applicationSource}: turn the recall gaps into a scenario answer or checklist.`,
    reason: 'Application after recall exposes what is usable, not merely familiar.',
    href: context.applicationHref,
    linkLabel: 'Open Scenario Lab',
    minutes: firstApplicationMinutes
  });
  addActivity(activities, {
    type: 'break',
    label: 'Break',
    title: 'Mandatory midpoint movement break',
    detail: context.breakActivities,
    reason: 'A 155-minute block gets a 10-minute non-dismissible break at the midpoint.',
    mandatory: true,
    minutes: 10
  });
  addActivity(activities, {
    type: 'flashcards',
    label: 'Review',
    title: 'Spaced DCSPrep flashcards',
    detail: 'Review 15-20 cards across multiple topics, including Thursday misses.',
    reason: 'Spaced, mixed retrieval turns the Thursday-to-Friday gap into a learning advantage.',
    href: context.flashcardHref,
    linkLabel: 'Open Due Today',
    minutes: 25
  });
  addActivity(activities, {
    type: 'writing',
    label: 'Write',
    title: 'Ticket, runbook, or Evidence Pack writing',
    detail: context.writingTasks,
    reason: 'Writing produces evidence and forces the concept into Josh-safe DCS language.',
    minutes: 25
  });
  addActivity(activities, {
    type: 'building',
    label: 'Build',
    title: 'Build or author DCSPrep content',
    detail: context.buildingTasks,
    reason: 'Building for a novice persona creates transfer and usable professional evidence.',
    minutes: 15
  });
  addActivity(activities, {
    type: 'log',
    label: 'Log',
    title: 'Block-end PD log',
    detail: 'Capture the learning, explainable idea, and one gap.',
    reason: 'Metacognitive closure prevents the block from ending as passive consumption.',
    mandatory: true,
    minutes: 5
  });

  return activities;
}

function buildAfternoonPlan(context: SchedulerStudyContext, energy: EnergyLevel) {
  const activities: SchedulerActivity[] = [];

  if (energy === 'low') {
    addActivity(activities, {
      type: 'orientation',
      label: 'Orient',
      title: 'Pick one low-energy output target',
      detail: 'Choose one DCSPrep build item, evidence note, or ticket/runbook output and keep the block narrow.',
      reason: 'Low-energy Block 3 needs a concrete output target before the work begins.',
      minutes: 10
    });
    addActivity(activities, {
      type: 'building',
      label: 'Build',
      title: 'Low-energy DCSPrep building',
      detail: context.buildingTasks,
      reason: 'Low energy switches Block 3 to building/writing only, avoiding new intake and context-heavy tasks.',
      minutes: 35
    });
    addActivity(activities, {
      type: 'writing',
      label: 'Write',
      title: 'Ticket or Evidence Pack writing',
      detail: context.writingTasks,
      reason: 'Writing is active enough to sustain engagement during the post-lunch dip without adding new content.',
      minutes: 30
    });
    addActivity(activities, {
      type: 'break',
      label: 'Break',
      title: 'Mandatory midpoint movement break',
      detail: context.breakActivities,
      reason: 'The 155-minute afternoon block still requires a 10-minute movement reset.',
      mandatory: true,
      minutes: 10
    });
    addActivity(activities, {
      type: 'building',
      label: 'Build',
      title: 'Continue practical DCSPrep authoring',
      detail: 'Build one small content improvement, scenario step, or support template.',
      reason: 'Hands-on production fits lower alertness better than passive intake.',
      minutes: 25
    });
    addActivity(activities, {
      type: 'writing',
      label: 'Write',
      title: 'Soft wind-down evidence writing',
      detail: 'Finish the artefact and prepare the next session seed.',
      reason: 'End-of-day writing benefits from recency and supports overnight consolidation.',
      minutes: 30
    });
    addActivity(activities, {
      type: 'log',
      label: 'Log',
      title: 'Evidence handoff and block-end PD log',
      detail: 'Tidy the output, then capture the learning, explainable idea, and one gap.',
      reason: 'The required log closes the loop without scores, streaks, or shame.',
      mandatory: true,
      minutes: 15
    });

    return activities;
  }

  // Post-prandial dip guard: Block 3 starts with active work, never passive video.
  addActivity(activities, {
    type: 'application',
    label: 'Apply',
    title: 'Start with a DCSPrep scenario or hands-on task',
    detail: `${context.applicationSource}: apply Windows Settings to a DCS-style support case.`,
    reason: 'The 1:45-3:15pm post-lunch dip favours active application over passive video.',
    href: context.applicationHref,
    linkLabel: 'Open Scenario Lab',
    minutes: 32
  });
  addActivity(activities, {
    type: 'building',
    label: 'Build',
    title: 'Build or author DCSPrep content',
    detail: context.buildingTasks,
    reason: 'Building sustains engagement and creates evidence without relying on new passive intake.',
    minutes: 30
  });
  addActivity(activities, {
    type: 'retrieval',
    label: 'Retrieve',
    title: 'Short closed-book recall',
    detail: 'Recall the key steps or settings path from memory before the midpoint break.',
    reason: 'A retrieval interval prevents application work from becoming untested familiarity.',
    minutes: 13
  });
  addActivity(activities, {
    type: 'break',
    label: 'Break',
    title: 'Mandatory midpoint movement break',
    detail: context.breakActivities,
    reason: 'A 155-minute block gets a 10-minute non-dismissible break at the midpoint.',
    mandatory: true,
    minutes: 10
  });
  addActivity(activities, {
    type: 'application',
    label: 'Apply',
    title: 'Second practical task or scenario variation',
    detail: 'Use a different DCS scenario, support note, or troubleshooting branch from the first half.',
    reason: 'Variation avoids back-to-back repetition and supports transfer.',
    href: context.applicationHref,
    linkLabel: 'Open Scenario Lab',
    minutes: 28
  });
  addActivity(activities, {
    type: 'writing',
    label: 'Evidence',
    title: 'Ticket, runbook, or Evidence Pack writing',
    detail: context.writingTasks,
    reason: 'After 3:00pm, output and evidence writing are preferred over new passive video.',
    minutes: 27
  });
  addActivity(activities, {
    type: 'flashcards',
    label: 'Review',
    title: 'Soft SRS flashcard review',
    detail: `Use ${context.flashcardSource}; review shaky cards from today.`,
    reason: 'End-of-day retrieval benefits from recency and sets up sleep consolidation.',
    href: context.flashcardHref,
    linkLabel: 'Open Due Today',
    minutes: 10
  });
  addActivity(activities, {
    type: 'log',
    label: 'Log',
    title: 'Block-end PD log',
    detail: 'Capture the learning, explainable idea, and one gap.',
    reason: 'The required log closes the loop without scores, streaks, or gamification.',
    mandatory: true,
    minutes: 5
  });

  return activities;
}

function buildFlashcardOnlyPlan(block: SchedulerRuntimeBlock, context: SchedulerStudyContext) {
  const activities: SchedulerActivity[] = [];
  const breakMinutes = block.durationMinutes >= 150 ? 10 : block.durationMinutes >= 100 ? 7 : 6;
  const breakStart = Math.max(0, Math.round(block.durationMinutes / 2 - breakMinutes / 2));
  const logMinutes = 5;
  const firstReviewMinutes = breakStart;
  const secondReviewMinutes = Math.max(0, block.durationMinutes - firstReviewMinutes - breakMinutes - logMinutes);

  if (firstReviewMinutes > 0) {
    addActivity(activities, {
      type: 'flashcards',
      label: 'Review',
      title: 'Flashcard-only recovery mode',
      detail: `Use ${context.flashcardSource}. Keep the work short, concrete, and retrieval-only.`,
      reason: 'After an interruption with little time left, retrieval has low setup cost and strong learning value.',
      href: context.flashcardHref,
      linkLabel: 'Open Due Today',
      minutes: firstReviewMinutes
    });
  }

  addActivity(activities, {
    type: 'break',
    label: 'Break',
    title: 'Mandatory midpoint movement break',
    detail: context.breakActivities,
    reason: 'Even recovery mode preserves the non-dismissible movement reset.',
    mandatory: true,
    minutes: breakMinutes
  });

  if (secondReviewMinutes > 0) {
    addActivity(activities, {
      type: 'flashcards',
      label: 'Review',
      title: 'Continue flashcard-only recovery mode',
      detail: 'Use small sets and stop at the log prompt.',
      reason: 'Flashcards are the safest useful mode when interruption leaves a short window.',
      href: context.flashcardHref,
      linkLabel: 'Open Due Today',
      minutes: secondReviewMinutes
    });
  }

  addActivity(activities, {
    type: 'log',
    label: 'Log',
    title: 'Block-end PD log',
    detail: 'Capture the learning, explainable idea, and one gap.',
    reason: 'The log turns a fragmented block into usable evidence without pretending it was ideal.',
    mandatory: true,
    minutes: logMinutes
  });

  return activities;
}

function buildBlockPlan(block: SchedulerRuntimeBlock, context: SchedulerStudyContext, energy: EnergyLevel, flashcardOnly: boolean) {
  if (flashcardOnly) {
    return buildFlashcardOnlyPlan(block, context);
  }

  if (block.id === 'thursday-block-1') {
    return buildThursdayMorningPlan(context, energy);
  }

  if (block.id === 'friday-block-1') {
    return buildFridayMorningPlan(context, energy);
  }

  if (block.id === 'thursday-block-3' || block.id === 'friday-block-3') {
    return buildAfternoonPlan(context, energy);
  }

  if (block.durationMinutes <= 90) {
    return buildNinetyMinutePlan(context, energy);
  }

  return buildHundredMinutePlan(context, energy);
}

function toRuntimeActivities(block: SchedulerRuntimeBlock, activities: SchedulerActivity[]) {
  return activities.map((activity) => ({
    ...activity,
    startDate: addMinutes(block.startDate, activity.startOffsetMinutes),
    endDate: addMinutes(block.startDate, activity.endOffsetMinutes),
    durationMinutes: activity.endOffsetMinutes - activity.startOffsetMinutes
  }));
}

function getPendingLogBlock(now: Date, blocks: SchedulerBlockSettings[], session: SchedulerSessionState, activeBlock?: SchedulerRuntimeBlock) {
  if (activeBlock) {
    return undefined;
  }

  return getRuntimeBlocksForDate(now, blocks).find(
    (block) => now.getTime() >= block.endDate.getTime() && !session.logsByBlock[block.id]
  );
}

export function formatSchedulerCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function formatSchedulerClock(date: Date, includeSeconds = false) {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined
  });
}

export function useScheduler() {
  const [now, setNow] = useState(() => new Date());
  const [settings, setSettings] = useState<SchedulerSettings>(DEFAULT_SCHEDULER_SETTINGS);
  const [sessionState, setSessionState] = useState<SchedulerSessionState>(() =>
    createDefaultSessionState(getLocalDateKey(new Date()))
  );
  const [hydratedDateKey, setHydratedDateKey] = useState<string | null>(null);

  const dateKey = getLocalDateKey(now);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setSettings(loadSchedulerSettings());
    setSessionState(loadSchedulerSession(dateKey));
    setHydratedDateKey(dateKey);
  }, [dateKey]);

  useEffect(() => {
    if (hydratedDateKey !== sessionState.dateKey) {
      return;
    }

    saveSchedulerSession(sessionState);
  }, [hydratedDateKey, sessionState]);

  const activeBlock = useMemo(() => getActiveBlock(now, settings.blocks), [now, settings.blocks]);
  const nextBlock = useMemo(() => getNextBlock(now, settings.blocks), [now, settings.blocks]);
  const energyLevel = activeBlock ? sessionState.energyByBlock[activeBlock.id] : undefined;
  const effectiveEnergy: EnergyLevel = energyLevel || 'high';
  const flashcardOnly = activeBlock ? Boolean(sessionState.flashcardOnlyByBlock[activeBlock.id]) : false;

  const plan = useMemo(() => {
    if (!activeBlock) {
      return [];
    }

    return toRuntimeActivities(
      activeBlock,
      buildBlockPlan(activeBlock, settings.studyContext, effectiveEnergy, flashcardOnly)
    );
  }, [activeBlock, effectiveEnergy, flashcardOnly, settings.studyContext]);

  const currentActivity = useMemo(
    () =>
      plan.find((activity) => now.getTime() >= activity.startDate.getTime() && now.getTime() < activity.endDate.getTime()),
    [now, plan]
  );
  const nextActivity = useMemo(
    () => plan.find((activity) => activity.startDate.getTime() > now.getTime()),
    [now, plan]
  );
  const remainingActivities = useMemo(
    () => plan.filter((activity) => activity.endDate.getTime() > now.getTime()),
    [now, plan]
  );
  const pendingLogBlock = useMemo(
    () => getPendingLogBlock(now, settings.blocks, sessionState, activeBlock),
    [activeBlock, now, sessionState, settings.blocks]
  );

  const breakCountdown = useMemo<SchedulerBreakCountdown | undefined>(() => {
    const breakActivity = plan.find((activity) => activity.type === 'break');
    if (!breakActivity) {
      return undefined;
    }

    const nowTime = now.getTime();
    const startsInMs = breakActivity.startDate.getTime() - nowTime;
    const endsInMs = breakActivity.endDate.getTime() - nowTime;

    if (startsInMs > 0 && startsInMs <= 5 * MINUTE_MS) {
      return {
        activity: breakActivity,
        mode: 'starts-soon',
        countdownMs: startsInMs
      };
    }

    if (startsInMs <= 0 && endsInMs > 0) {
      return {
        activity: breakActivity,
        mode: 'in-break',
        countdownMs: endsInMs
      };
    }

    return undefined;
  }, [now, plan]);

  const elapsedBlockMinutes = activeBlock
    ? Math.max(0, Math.floor((now.getTime() - activeBlock.startDate.getTime()) / MINUTE_MS))
    : 0;

  const shouldShowEnergySelector =
    Boolean(activeBlock) &&
    elapsedBlockMinutes <= 15 &&
    !energyLevel &&
    !sessionState.activeInterruption &&
    !pendingLogBlock;

  function setEnergy(level: EnergyLevel) {
    if (!activeBlock) return;

    setSessionState((current) => ({
      ...current,
      energyByBlock: {
        ...current.energyByBlock,
        [activeBlock.id]: level
      }
    }));
  }

  function startInterruption() {
    const fallbackBlockId: SchedulerBlockId | 'outside-block' = activeBlock?.id || 'outside-block';
    const note: SchedulerActiveInterruption = {
      id: `interrupt-${Date.now()}`,
      blockId: fallbackBlockId,
      startedAtIso: new Date().toISOString(),
      lastAction: currentActivity?.title || 'No active PD block.',
      nextAction: currentActivity?.detail || (nextBlock ? `Start ${nextBlock.label}.` : 'Wait for the next PD block.')
    };

    setSessionState((current) => ({
      ...current,
      activeInterruption: note
    }));
  }

  function updateInterruptionNote(fields: { lastAction?: string; nextAction?: string }) {
    setSessionState((current) => {
      if (!current.activeInterruption) {
        return current;
      }

      return {
        ...current,
        activeInterruption: {
          ...current.activeInterruption,
          lastAction: fields.lastAction ?? current.activeInterruption.lastAction,
          nextAction: fields.nextAction ?? current.activeInterruption.nextAction,
          savedAtIso: new Date().toISOString()
        }
      };
    });
  }

  function requestResume() {
    setSessionState((current) => {
      if (!current.activeInterruption) {
        return current;
      }

      return {
        ...current,
        activeInterruption: {
          ...current.activeInterruption,
          resumeReviewOpen: true
        }
      };
    });
  }

  function finishResume() {
    setSessionState((current) => {
      if (!current.activeInterruption) {
        return current;
      }

      const interruption = {
        ...current.activeInterruption,
        resumedAtIso: new Date().toISOString(),
        resumeReviewOpen: undefined
      };
      const existing = current.interruptionsByBlock[interruption.blockId] || [];
      const remainingMinutes = activeBlock
        ? Math.max(0, Math.floor((activeBlock.endDate.getTime() - now.getTime()) / MINUTE_MS))
        : 0;
      const shouldForceFlashcards =
        Boolean(activeBlock) &&
        (remainingMinutes < 30 || existing.length >= 1);

      return {
        ...current,
        activeInterruption: undefined,
        interruptionsByBlock: {
          ...current.interruptionsByBlock,
          [interruption.blockId]: [...existing, interruption]
        },
        // Gloria Mark / ADHD re-entry rule: short remaining windows switch to low-setup retrieval only.
        flashcardOnlyByBlock:
          shouldForceFlashcards && activeBlock
            ? {
                ...current.flashcardOnlyByBlock,
                [activeBlock.id]: true
              }
            : current.flashcardOnlyByBlock
      };
    });
  }

  function saveBlockLog(blockId: SchedulerBlockId, log: Omit<SchedulerBlockLog, 'blockId' | 'savedAtIso'>) {
    const savedLog: SchedulerBlockLog = {
      blockId,
      savedAtIso: new Date().toISOString(),
      workedOn: log.workedOn.trim().slice(0, 140),
      canExplain: log.canExplain.trim().slice(0, 140),
      oneGap: log.oneGap.trim().slice(0, 140)
    };

    if (!savedLog.workedOn || !savedLog.canExplain || !savedLog.oneGap) {
      return;
    }

    setSessionState((current) => ({
      ...current,
      logsByBlock: {
        ...current.logsByBlock,
        [blockId]: savedLog
      }
    }));
  }

  const currentActivityRemainingMs = currentActivity
    ? Math.max(0, currentActivity.endDate.getTime() - now.getTime())
    : 0;
  const activeBlockRemainingMs = activeBlock ? Math.max(0, activeBlock.endDate.getTime() - now.getTime()) : 0;
  const nextBlockCountdownMs = nextBlock ? Math.max(0, nextBlock.startDate.getTime() - now.getTime()) : 0;

  return {
    now,
    dateKey,
    settings,
    sessionState,
    activeBlock,
    nextBlock,
    pendingLogBlock,
    energyLevel,
    effectiveEnergy,
    shouldShowEnergySelector,
    flashcardOnly,
    plan,
    currentActivity,
    nextActivity,
    remainingActivities,
    breakCountdown,
    currentActivityRemainingMs,
    activeBlockRemainingMs,
    nextBlockCountdownMs,
    setEnergy,
    startInterruption,
    updateInterruptionNote,
    requestResume,
    finishResume,
    saveBlockLog
  };
}
