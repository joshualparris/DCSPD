export const navigationGroups = [
  {
    label: 'Today',
    items: [
      { href: '/', label: 'Dashboard' },
      { href: '/due-today', label: 'Due Today' },
      { href: '/focus', label: 'Focus' },
      { href: '/daily-challenge', label: 'Daily Challenge' }
    ]
  },
  {
    label: 'Learn',
    items: [
      { href: '/modules', label: 'Modules' },
      { href: '/certifications/aplus-core-1', label: 'A+ Core 1' },
      { href: '/certifications/aplus-core-2', label: 'A+ Core 2' },
      { href: '/certifications/network-plus', label: 'Network+' },
      { href: '/certifications/security-plus', label: 'Security+' }
    ]
  },
  {
    label: 'Practise',
    items: [
      { href: '/scenarios', label: 'Scenario Lab' },
      { href: '/strict-quiz', label: 'Strict Quiz' },
      { href: '/practice-exam', label: 'Practice Exam' },
      { href: '/simulations/roleplay', label: 'Roleplay Bot' },
      { href: '/voice-to-ticket', label: 'Voice-to-Ticket' },
      { href: '/peer-review', label: 'Peer Review' }
    ]
  },
  {
    label: 'Tools',
    items: [
      { href: '/cheat-sheets', label: 'Cheat Sheets' },
      { href: '/hardware', label: 'Hardware' },
      { href: '/simulations/network', label: 'Network Map' },
      { href: '/simulations/classroom-desk', label: 'Classroom Desk' },
      { href: '/ticket-data-import', label: 'Ticket Data' },
      { href: '/knowledge-base-lab', label: 'KB Lab' }
    ]
  },
  {
    label: 'Progress',
    items: [
      { href: '/readiness', label: 'Readiness' },
      { href: '/feedback-log', label: 'Feedback Log' },
      { href: '/error-log', label: 'Error Log' },
      { href: '/certificates', label: 'Certificates' },
      { href: '/evidence-pack', label: 'Evidence Pack' },
      { href: '/usage-insights', label: 'Usage Insights' },
      { href: '/badges', label: 'Badge Cabinet' }
    ]
  },
  {
    label: 'Admin',
    items: [
      { href: '/settings', label: 'Settings' },
      { href: '/sync', label: 'Sync' },
      { href: '/admin', label: 'Admin Hub' },
      { href: '/trainer-guide', label: 'Trainer Guide' },
      { href: '/mobile-qa', label: 'Mobile QA' }
    ]
  }
];

export const mobileNavigationItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/due-today', label: 'Due Today' },
  { href: '/focus', label: 'Focus' },
  { href: '/daily-challenge', label: 'Daily Challenge' },
  { href: '/modules', label: 'Modules' },
  { href: '/scenarios', label: 'Scenario Lab' },
  { href: '/practice-exam', label: 'Practice Exam' },
  { href: '/settings', label: 'Settings' }
];

export const navigationItems = navigationGroups.flatMap((group) => group.items);
