
export type LearningPath = {
  id: string;
  title: string;
  description: string;
  moduleIds: string[];
  certificationLabel: string;
  icon: string;
  finalProject?: {
    title: string;
    description: string;
    deliverable: string;
  };
};

export const learningPaths: LearningPath[] = [
  {
    id: 'dcs-foundations',
    title: 'DCS Support Foundations',
    description: 'Master the core skills for Level 1 IT support at Dubbo Christian School.',
    moduleIds: [
      'dcs-it-support-foundations',
      'soft-skills-dcs-support',
      'ticket-notes-escalation-quality',
      'permissions-and-access-requests'
    ],
    certificationLabel: 'DCS Level 1 Ready',
    icon: 'shield-check',
    finalProject: {
      title: 'Support Culture Audit',
      description: 'Review your last 5 tickets and rewrite their notes to be perfectly privacy-safe and empathetic.',
      deliverable: '5 anonymized and improved escalation notes.'
    }
  },
  {
    id: 'classroom-tech-master',
    title: 'Classroom Tech Master',
    description: 'Deep dive into classroom displays, ViewBoards, and printing systems.',
    moduleIds: [
      'classroom-display-viewboard-troubleshooting',
      'printer-photocopier-troubleshooting',
      'wi-fi-dhcp-dns-gateway-basic-network-triage'
    ],
    certificationLabel: 'Classroom Technology Specialist',
    icon: 'monitor',
    finalProject: {
      title: 'Room Triage Guide',
      description: 'Create a one-page troubleshooting flowchart for a specific DCS classroom viewboard setup.',
      deliverable: 'A visual flowchart (PDF or Hand-drawn scan).'
    }
  },
  {
    id: 'security-guard',
    title: 'Security Guard',
    description: 'Focus on cybersecurity, identity management, and incident response.',
    moduleIds: [
      'login-password-lockout-mfa-account-basics',
      'm365-entra-intune-concepts-safe-escalation',
      'cyber-security-foundations'
    ],
    certificationLabel: 'DCS Security Advocate',
    icon: 'lock',
    finalProject: {
      title: 'Phishing Awareness Brief',
      description: 'Draft a short, plain-English "Security Alert" for staff about a simulated phishing theme.',
      deliverable: 'A 200-word draft email for staff distribution.'
    }
  }
];
