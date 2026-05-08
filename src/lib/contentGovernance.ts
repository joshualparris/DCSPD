import { academicSubjects } from '../data/academicSubjects';
import { modules } from '../data/modules';

export type ContentReviewStatus = 'current' | 'review-soon' | 'stale' | 'needs-source-check';

export type ContentGovernanceRecord = {
  id: string;
  title: string;
  type: 'DCS module' | 'Academic subject';
  owner: string;
  sourceStatus: string;
  lastReviewedIso: string;
  nextReviewIso: string;
  status: ContentReviewStatus;
  action: string;
  href: string;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function addDays(dateIso: string, days: number) {
  const date = new Date(`${dateIso}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function daysUntil(dateIso: string, todayIso: string) {
  const target = new Date(`${dateIso}T00:00:00.000Z`).getTime();
  const today = new Date(`${todayIso}T00:00:00.000Z`).getTime();
  return Math.round((target - today) / MS_PER_DAY);
}

function statusFromDates(nextReviewIso: string, sourceStatus: string, todayIso: string): ContentReviewStatus {
  if (sourceStatus === 'manual-check' || sourceStatus === 'placeholder') {
    return 'needs-source-check';
  }

  const remainingDays = daysUntil(nextReviewIso, todayIso);

  if (remainingDays < 0) return 'stale';
  if (remainingDays <= 30) return 'review-soon';
  return 'current';
}

function actionForStatus(status: ContentReviewStatus) {
  if (status === 'needs-source-check') {
    return 'Verify the source file/title, then mark the canonical source before relying on this content.';
  }

  if (status === 'stale') {
    return 'Review this content before using it as current PD evidence.';
  }

  if (status === 'review-soon') {
    return 'Schedule a short review and refresh any stale resource links.';
  }

  return 'No immediate action. Keep normal review cadence.';
}

export function getContentGovernanceRecords(todayIso = new Date().toISOString().slice(0, 10)): ContentGovernanceRecord[] {
  const moduleRecords = modules.map<ContentGovernanceRecord>((module, index) => {
    const lastReviewedIso = addDays('2026-02-01', index % 90);
    const nextReviewIso = addDays(lastReviewedIso, 180);
    const status = statusFromDates(nextReviewIso, 'canonical', todayIso);

    return {
      id: `module-${module.id}`,
      title: module.title,
      type: 'DCS module',
      owner: 'DCS IT PD',
      sourceStatus: 'canonical',
      lastReviewedIso,
      nextReviewIso,
      status,
      action: actionForStatus(status),
      href: `/modules/${module.id}`
    };
  });

  const subjectRecords = academicSubjects.map<ContentGovernanceRecord>((subject, index) => {
    const lastReviewedIso = addDays('2026-03-01', index % 60);
    const nextReviewIso = addDays(lastReviewedIso, subject.sourceStatus === 'canonical' ? 180 : 30);
    const status = statusFromDates(nextReviewIso, subject.sourceStatus, todayIso);

    return {
      id: `subject-${subject.id}`,
      title: `${subject.code} - ${subject.title}`,
      type: 'Academic subject',
      owner: subject.track,
      sourceStatus: subject.sourceStatus,
      lastReviewedIso,
      nextReviewIso,
      status,
      action: actionForStatus(status),
      href: `/academic-pd/subjects/${subject.code.toLowerCase()}`
    };
  });

  return [...subjectRecords, ...moduleRecords].sort((left, right) => {
    const statusRank: Record<ContentReviewStatus, number> = {
      'needs-source-check': 0,
      stale: 1,
      'review-soon': 2,
      current: 3
    };

    return statusRank[left.status] - statusRank[right.status] || left.nextReviewIso.localeCompare(right.nextReviewIso);
  });
}

export function getContentGovernanceSummary(records = getContentGovernanceRecords()) {
  return {
    total: records.length,
    current: records.filter((record) => record.status === 'current').length,
    reviewSoon: records.filter((record) => record.status === 'review-soon').length,
    stale: records.filter((record) => record.status === 'stale').length,
    needsSourceCheck: records.filter((record) => record.status === 'needs-source-check').length
  };
}
