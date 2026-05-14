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
    id: 'network-hotspots-custom-content-editor',
    dateIso: '2026-05-14',
    title: 'Network hotspots and custom content editor',
    summary:
      'Linked the network topology nodes to relevant diagnostic modules and added a form-based editor for custom modules and roleplay personas.',
    category: 'Added',
    impact: 'Makes simulations more navigable and lets custom DCSPrep content be created without hand-writing JSON.',
    links: [
      { label: 'Network Map', href: '/simulations/network', kind: 'feature' },
      { label: 'Custom Content Editor', href: '/admin/custom-content', kind: 'admin' },
      { label: 'Admin Hub', href: '/admin', kind: 'admin' }
    ]
  },
  {
    id: 'senior-tech-peer-review',
    dateIso: '2026-05-14',
    title: 'Senior-tech peer review simulation',
    summary:
      'Added a Paul-style ticket-note review workflow that critiques scope, evidence, privacy, escalation quality, and handover value.',
    category: 'Added',
    impact: 'Gives ticket writing a realistic senior-tech review loop without using real tickets or private operational details.',
    links: [
      { label: 'Peer Review', href: '/peer-review', kind: 'workflow' },
      { label: 'Feedback Log', href: '/feedback-log', kind: 'evidence' }
    ]
  },
  {
    id: 'production-readiness-and-growth',
    dateIso: '2026-05-14',
    title: 'Production Readiness & Advanced Growth',
    summary:
      'Major update adding AI Rubric Grading, Practice Exam Engine, Voice-to-Ticket dictation, Global Dark Mode, and Cloud Sync adapters.',
    category: 'Added',
    impact: 'Transitions the app from a learning tool to a professional-grade, AI-enhanced productivity platform.',
    links: [
      { label: 'Practice Exam', href: '/practice-exam', kind: 'feature' },
      { label: 'Asset Catalog', href: '/assets', kind: 'feature' },
      { label: 'Cloud Sync', href: '/sync', kind: 'admin' },
      { label: 'Evidence Pack', href: '/evidence-pack', kind: 'evidence' }
    ]
  },
  {
    id: 'ai-coach-evolution',
    dateIso: '2026-05-14',
    title: 'AI Coach Evolution',
    summary:
      'Implemented detailed rubric analysis for ticket notes and assessments. Added voice dictation support for drafting professional Jira notes.',
    category: 'Changed',
    impact: 'Provides deeper, more objective feedback on soft skills and documentation quality.',
    links: [
      { label: 'Scenario Lab', href: '/scenarios', kind: 'workflow' },
      { label: 'Assessment Center', href: '/modules', kind: 'workflow' }
    ]
  },
  {
    id: 'infrastructure-and-pwa-hardening',
    dateIso: '2026-05-14',
    title: 'Infrastructure & PWA Hardening',
    summary:
      'Added IndexedDB offline storage for modules, Push Notifications for study reminders, and OneDrive environment detection.',
    category: 'Added',
    impact: 'Improves app stability and ensures learning can continue without an internet connection.',
    links: [
      { label: 'Settings', href: '/settings', kind: 'feature' },
      { label: 'Migration Guide', href: '/migration-guide', kind: 'source' }
    ]
  },
  {
    id: 'mid-assessment-persistence',
    dateIso: '2026-05-14',
    title: 'Mid-assessment persistence',
    summary:
      'Added state saving for module quizzes. You can now leave an assessment midway and resume exactly where you left off.',
    category: 'Added',
    impact: 'Reduces frustration when support tasks interrupt learning; progress is never lost.',
    links: [
      { label: 'Open Modules', href: '/modules', kind: 'feature' }
    ]
  },
  {
    id: 'new-learning-modules-may',
    dateIso: '2026-05-14',
    title: 'Modern IT Support modules',
    summary:
      'Added 4 new modules: Cybersecurity Awareness, Device Imaging, Accessibility/Inclusive Design, and Soft Skills.',
    category: 'Added',
    impact: 'Expands coverage into critical domains for modern school IT environments.',
    links: [
      { label: 'Cybersecurity module', href: '/modules/cybersecurity-basics', kind: 'workflow' },
      { label: 'Imaging module', href: '/modules/device-imaging-workflows', kind: 'workflow' }
    ]
  },
  {
    id: 'mindfulness-and-gamification',
    dateIso: '2026-05-14',
    title: 'Mindfulness and Gamification',
    summary:
      'Added a Mindfulness Pause component, weekly Leaderboard, and sidebar stats for points and streaks.',
    category: 'Added',
    impact: 'Improves focus and motivation during PD sessions with interactive rewards and breathing exercises.',
    links: [
      { label: 'Open Dashboard', href: '/', kind: 'feature' },
      { label: 'Modules Page', href: '/modules', kind: 'workflow' }
    ]
  },
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
