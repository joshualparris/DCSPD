export type CertificationMetadata = {
  id: string;
  title: string;
  code: string;
  description: string;
  estimatedHours: number;
  provider: string;
  resourceLink: string;
  objectives: {
    id: string;
    title: string;
    weight: string;
  }[];
};

export const certificationExpansion: CertificationMetadata[] = [
  {
    id: 'aplus-core-1',
    title: 'CompTIA A+ Core 1',
    code: '220-1201',
    description: 'Hardware, mobile devices, networking, and virtualization/cloud computing.',
    estimatedHours: 40,
    provider: 'CompTIA',
    resourceLink: 'https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/',
    objectives: [
      { id: '1.0', title: 'Mobile Devices', weight: '15%' },
      { id: '2.0', title: 'Networking', weight: '20%' },
      { id: '3.0', title: 'Hardware', weight: '25%' },
      { id: '4.0', title: 'Virtualization and Cloud Computing', weight: '11%' },
      { id: '5.0', title: 'Hardware and Network Troubleshooting', weight: '29%' }
    ]
  },
  {
    id: 'network-plus',
    title: 'CompTIA Network+',
    code: 'N10-009',
    description: 'Core networking concepts, implementation, operations, security, and troubleshooting.',
    estimatedHours: 50,
    provider: 'CompTIA',
    resourceLink: 'https://www.professormesser.com/network-plus/n10-009/n10-009-video-index/',
    objectives: [
      { id: '1.0', title: 'Networking Fundamentals', weight: '24%' },
      { id: '2.0', title: 'Network Implementations', weight: '19%' },
      { id: '3.0', title: 'Network Operations', weight: '16%' },
      { id: '4.0', title: 'Network Security', weight: '19%' },
      { id: '5.0', title: 'Network Troubleshooting', weight: '22%' }
    ]
  },
  {
    id: 'security-plus',
    title: 'CompTIA Security+',
    code: 'SY0-701',
    description: 'Cybersecurity principles, threat intelligence, risk management, and incident response.',
    estimatedHours: 45,
    provider: 'CompTIA',
    resourceLink: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video-index/',
    objectives: [
      { id: '1.0', title: 'General Security Concepts', weight: '12%' },
      { id: '2.0', title: 'Threats, Vulnerabilities, and Mitigations', weight: '22%' },
      { id: '3.0', title: 'Security Architecture', weight: '18%' },
      { id: '4.0', title: 'Security Operations', weight: '28%' },
      { id: '5.0', title: 'Security Program Management and Oversight', weight: '20%' }
    ]
  }
];
