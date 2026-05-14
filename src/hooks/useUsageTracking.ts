"use client";

import { useEffect, useRef } from 'react';
import { recordUsageEvent } from '../lib/usageAnalytics';
import type { UsageActivityCategory, UsageEvent } from '../types/usageAnalytics';

const recentPageViews = new Map<string, number>();
const PAGE_VIEW_DEDUPE_MS = 1500;

function shouldRecordPageOpen(key: string) {
  const now = Date.now();
  const previous = recentPageViews.get(key) || 0;

  recentPageViews.set(key, now);
  return now - previous > PAGE_VIEW_DEDUPE_MS;
}

function getVisibleNow() {
  if (typeof document === 'undefined') {
    return true;
  }

  return document.visibilityState !== 'hidden';
}

export function useUsagePageView(options: {
  route: string;
  label?: string;
  contentType?: UsageEvent['contentType'];
  contentId?: string;
  activityCategory?: UsageActivityCategory;
  metadata?: UsageEvent['metadata'];
}): void {
  const {
    route,
    label,
    contentType,
    contentId,
    activityCategory = 'navigation',
    metadata
  } = options;
  const flushRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    let visibleStartedAt = getVisibleNow() ? Date.now() : null;
    let accumulatedMs = 0;
    let flushed = false;
    const key = `${route}|${contentType || ''}|${contentId || ''}`;

    if (shouldRecordPageOpen(key)) {
      recordUsageEvent({
        eventType: 'page_view',
        route,
        label,
        contentType,
        contentId,
        activityCategory: 'navigation',
        metadata
      });
    }

    function addVisibleTime() {
      if (visibleStartedAt === null) {
        return;
      }

      accumulatedMs += Math.max(0, Date.now() - visibleStartedAt);
      visibleStartedAt = null;
    }

    function flush() {
      if (flushed) {
        return;
      }

      flushed = true;
      addVisibleTime();

      const durationSeconds = Math.round(accumulatedMs / 1000);
      if (durationSeconds < 2) {
        return;
      }

      recordUsageEvent({
        eventType: 'page_view',
        route,
        label: label ? `${label} time` : 'Page time',
        contentType,
        contentId,
        activityCategory,
        durationSeconds,
        completed: true,
        metadata
      });
    }

    function handleVisibilityChange() {
      if (getVisibleNow()) {
        visibleStartedAt = Date.now();
        return;
      }

      addVisibleTime();
    }

    flushRef.current = flush;
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', flush);
    window.addEventListener('beforeunload', flush);

    return () => {
      flush();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', flush);
      window.removeEventListener('beforeunload', flush);
    };
  }, [
    activityCategory,
    contentId,
    contentType,
    label,
    metadata,
    metadata?.domain,
    metadata?.interruptionType,
    metadata?.level,
    metadata?.resultCount,
    metadata?.source,
    metadata?.weakTopic,
    route
  ]);

  useEffect(() => () => flushRef.current(), []);
}

export function trackUsageInteraction(event: Omit<UsageEvent, 'id' | 'timestamp'>): void {
  recordUsageEvent(event);
}
