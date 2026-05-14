"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { trackUsageInteraction, useUsagePageView } from '../../hooks/useUsageTracking';
import type { UsageActivityCategory, UsageEvent } from '../../types/usageAnalytics';

type RouteUsageMeta = {
  route: string;
  label: string;
  contentType: UsageEvent['contentType'];
  contentId?: string;
  activityCategory: UsageActivityCategory;
};

function getRouteUsageMeta(pathname: string): RouteUsageMeta {
  if (pathname === '/') {
    return { route: '/', label: 'Dashboard', contentType: 'other', activityCategory: 'navigation' };
  }

  if (pathname.startsWith('/modules/')) {
    const moduleId = pathname.split('/')[2];
    return {
      route: pathname,
      label: 'Module detail',
      contentType: 'module',
      contentId: moduleId,
      activityCategory: 'reading'
    };
  }

  if (pathname === '/modules') {
    return { route: pathname, label: 'Modules', contentType: 'other', activityCategory: 'navigation' };
  }

  if (pathname === '/scenarios') {
    return { route: pathname, label: 'Scenario Lab', contentType: 'scenario', activityCategory: 'scenario' };
  }

  if (pathname === '/simulations/roleplay') {
    return { route: pathname, label: 'Roleplay', contentType: 'roleplay', activityCategory: 'roleplay' };
  }

  if (pathname.startsWith('/academic-pd/subjects/')) {
    const subjectCode = pathname.split('/')[3];
    return {
      route: pathname,
      label: 'Academic subject',
      contentType: 'academic-subject',
      contentId: subjectCode,
      activityCategory: 'reading'
    };
  }

  if (pathname.startsWith('/academic-pd')) {
    return { route: pathname, label: 'Academic PD', contentType: 'academic-subject', activityCategory: 'reading' };
  }

  if (pathname === '/due-today') {
    return { route: pathname, label: 'Due Today', contentType: 'other', activityCategory: 'retrieval' };
  }

  if (pathname === '/scheduler') {
    return { route: pathname, label: 'PD Scheduler', contentType: 'scheduler', activityCategory: 'scheduler' };
  }

  if (pathname === '/pd-log') {
    return { route: pathname, label: 'PD Log', contentType: 'evidence', activityCategory: 'writing' };
  }

  if (pathname === '/evidence-pack') {
    return { route: pathname, label: 'Evidence Pack', contentType: 'evidence', activityCategory: 'evidence' };
  }

  if (pathname === '/settings') {
    return { route: pathname, label: 'Settings', contentType: 'settings', activityCategory: 'settings' };
  }

  if (pathname === '/search') {
    return { route: pathname, label: 'Search', contentType: 'search', activityCategory: 'search' };
  }

  if (
    pathname === '/hardware' ||
    pathname.startsWith('/playbooks') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/simulations/network') ||
    pathname.startsWith('/simulations/classroom-desk') ||
    pathname === '/voice-to-ticket' ||
    pathname === '/error-log'
  ) {
    return { route: pathname, label: 'Support tool', contentType: 'support-tool', activityCategory: 'support-tool' };
  }

  return { route: pathname, label: pathname.replace(/^\//, '') || 'DCSPrep', contentType: 'other', activityCategory: 'navigation' };
}

export default function AppUsageTracker() {
  const pathname = usePathname() || '/';
  const meta = getRouteUsageMeta(pathname);
  const supportOpenRef = useRef<string | null>(null);

  useUsagePageView(meta);

  useEffect(() => {
    if (meta.contentType !== 'support-tool' || supportOpenRef.current === pathname) {
      return;
    }

    supportOpenRef.current = pathname;
    trackUsageInteraction({
      eventType: 'support_tool_open',
      route: pathname,
      label: meta.label,
      contentType: 'support-tool',
      contentId: pathname,
      activityCategory: 'support-tool'
    });
  }, [meta.contentType, meta.label, pathname]);

  return null;
}
