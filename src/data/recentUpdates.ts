export type RecentUpdateLink = {
  label: string;
  href: string;
  kind: 'feature' | 'workflow' | 'admin' | 'evidence' | 'source';
};

export type RecentUpdate = {
  id: string;
  dateIso: string;
  title: string;
  summary: string;
  category: 'Added' | 'Changed' | 'Verified' | 'Docs';
  impact: string;
  links: RecentUpdateLink[];
};

export const recentUpdates: RecentUpdate[] = [
  {
    id: 'quick-fix-cheat-sheets',
    dateIso: '2026-05-14',
    title: 'Printable quick-fix cheat sheets',
    summary:
      'Added Level 1-safe one-page references for ViewBoard/audio, PaperCut, Wi-Fi, login/MFA, onboarding, and website filtering.',
    category: 'Added',
    impact: 'Fast access to safe checks, escalation triggers, and ticket templates during quiet PD or scenario practice.',
    links: [
      { label: 'Open Cheat Sheets', href: '/cheat-sheets', kind: 'feature' },
      { label: 'Printer module', href: '/modules/printer-troubleshooting', kind: 'workflow' },
      { label: 'Classroom display module', href: '/modules/classroom-display-viewboard-troubleshooting', kind: 'workflow' }
    ]
  },
  {
    id: 'synthetic-ticket-csv-import',
    dateIso: '2026-05-14',
    title: 'Synthetic ticket CSV data lab',
    summary:
      'Added a privacy-safe CSV importer that summarises fake ticket rows by category, priority, channel, and recurring terms.',
    category: 'Added',
    impact: 'Turns data critical-thinking practice into an interactive workflow without importing live Jira data.',
    links: [
      { label: 'Open Ticket Data', href: '/ticket-data-import', kind: 'feature' },
      { label: 'Academic PD bridge', href: '/academic-pd/bridge', kind: 'workflow' },
      { label: 'Evidence Pack', href: '/evidence-pack', kind: 'evidence' }
    ]
  },
  {
    id: 'dashboard-ai-mentor-panel',
    dateIso: '2026-05-14',
    title: 'Dashboard AI Mentor panel',
    summary:
      'Added a prominent dashboard mentor card that surfaces the next practical PD move from the existing recommendation engine.',
    category: 'Changed',
    impact: 'The daily recommendation is now easier to see before diving into the longer recommendation queue.',
    links: [
      { label: 'Open Dashboard', href: '/', kind: 'feature' },
      { label: 'Focus support', href: '/focus', kind: 'workflow' },
      { label: 'Due Today', href: '/due-today', kind: 'workflow' }
    ]
  },
  {
    id: 'pd-scheduler-usage-insights',
    dateIso: '2026-05-08',
    title: 'PD Scheduler and Usage Insights',
    summary:
      'Added a real-time PD scheduler and local usage insights so short learning windows can be planned, interrupted, and reviewed.',
    category: 'Added',
    impact: 'Helps keep micro-learning intentional, especially when support work interrupts a planned block.',
    links: [
      { label: 'Open PD Scheduler', href: '/scheduler', kind: 'feature' },
      { label: 'Open Usage Insights', href: '/usage-insights', kind: 'feature' },
      { label: 'PD Log', href: '/pd-log', kind: 'evidence' }
    ]
  },
  {
    id: 'admin-governance-sync-tools',
    dateIso: '2026-05-08',
    title: 'Admin, governance, sync, and export tools',
    summary:
      'Added admin pages for SLG import drafts, content governance, LMS/HRIS export scaffolds, and local progress sync testing.',
    category: 'Added',
    impact: 'Keeps Academic PD content easier to review and export while staying local-first and privacy-safe.',
    links: [
      { label: 'Admin Hub', href: '/admin', kind: 'admin' },
      { label: 'SLG Import', href: '/admin/slg-import', kind: 'admin' },
      { label: 'Content Governance', href: '/admin/content', kind: 'admin' },
      { label: 'Progress Sync', href: '/sync', kind: 'admin' }
    ]
  },
  {
    id: 'mobile-offline-qa',
    dateIso: '2026-05-08',
    title: 'Mobile/offline QA checklist',
    summary:
      'Added a checklist page for testing PWA install, offline launch, cached routes, progress entry, and phone usability.',
    category: 'Added',
    impact: 'Makes the remaining real-device QA work visible instead of buried in the roadmap.',
    links: [
      { label: 'Open Mobile QA', href: '/mobile-qa', kind: 'feature' },
      { label: 'Settings backup', href: '/settings', kind: 'workflow' }
    ]
  },
  {
    id: 'verification-after-latest-slice',
    dateIso: '2026-05-14',
    title: 'Latest verification passed',
    summary:
      'Full tests and production build passed after adding cheat sheets, ticket CSV import, and the dashboard mentor panel.',
    category: 'Verified',
    impact: 'The new navigation targets are shippable in the local app build.',
    links: [
      { label: 'Recent Updates', href: '/recent-updates', kind: 'feature' },
      { label: 'Readiness', href: '/readiness', kind: 'evidence' }
    ]
  }
];

export function getRecentUpdates(limit?: number) {
  const sorted = [...recentUpdates].sort((left, right) => {
    const dateCompare = right.dateIso.localeCompare(left.dateIso);
    return dateCompare || left.title.localeCompare(right.title);
  });

  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}
