export type AplusResource = {
  title: string;
  url: string;
  kind: 'video' | 'course-index' | 'exam-objectives' | 'notes' | 'official-docs' | 'practice';
  why: string;
};

export type AplusCore2Assessment = {
  prompt: string;
  successCriteria: string[];
  modelAnswerGuide: string;
  multipleChoice: AplusMultipleChoiceQuestion[];
};

export type AplusMultipleChoiceOption = {
  id: string;
  text: string;
};

export type AplusMultipleChoiceQuestion = {
  id: string;
  prompt: string;
  options: AplusMultipleChoiceOption[];
  correctOptionId: string;
  explanation: string;
};

export type AplusCore2Lesson = {
  id: string;
  sectionId: string;
  sectionTitle: string;
  objectiveId: string;
  objectiveTitle: string;
  title: string;
  duration?: string;
  videoUrl: string;
  studyBrief: string;
  dcsApplication: string;
  readMore: AplusResource[];
  assessment: AplusCore2Assessment;
};

export type AplusCore2Objective = {
  id: string;
  title: string;
  lessons: AplusCore2Lesson[];
};

export type AplusCore2Section = {
  id: string;
  title: string;
  weight: string;
  summary: string;
  objectives: AplusCore2Objective[];
};

const PROFESSOR_MESSER_CORE2_INDEX =
  'https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/';
const PROFESSOR_MESSER_START =
  'https://www.professormesser.com/get-a-plus-core-2-certified/';
const PROFESSOR_MESSER_NOTES =
  'https://www.professormesser.com/220-1202-success-bundle/';
const PROFESSOR_MESSER_POP_QUIZZES =
  'https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-pop-quizzes/';
const COMPTIA_OBJECTIVES =
  'https://partners.comptia.org/docs/default-source/resources/comptia-a-220-1202-exam-objectives-%282-0%29.pdf';

type ObjectiveSeed = {
  id: string;
  title: string;
  lessons: string[];
};

type SectionSeed = {
  id: string;
  title: string;
  weight: string;
  summary: string;
  objectives: ObjectiveSeed[];
};

function stripDuration(titleWithDuration: string) {
  const match = titleWithDuration.match(/^(.*?)\s+\(([^)]+)\)$/);
  return {
    title: match?.[1] || titleWithDuration,
    duration: match?.[2]
  };
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function videoUrl(title: string) {
  return `https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/${slug(title)}-220-1202/`;
}

function getTopicResource(title: string, sectionId: string): AplusResource {
  const lower = title.toLowerCase();

  if (lower.includes('command line')) {
    return {
      title: 'Microsoft Learn: Windows commands',
      url: 'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands',
      kind: 'official-docs',
      why: 'Reference commands while practising safe diagnostics.'
    };
  }

  if (lower.includes('firewall')) {
    return {
      title: 'Microsoft Learn: Windows Firewall',
      url: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/',
      kind: 'official-docs',
      why: 'Read the official Windows firewall model before changing rules.'
    };
  }

  if (lower.includes('active directory')) {
    return {
      title: 'Microsoft Learn: Active Directory Domain Services overview',
      url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview',
      kind: 'official-docs',
      why: 'Build conceptual understanding for escalation notes and identity support.'
    };
  }

  if (lower.includes('macos')) {
    return {
      title: 'Apple Support: macOS User Guide',
      url: 'https://support.apple.com/guide/mac-help/welcome/mac',
      kind: 'official-docs',
      why: 'Use Apple support language when supporting staff macOS workflows.'
    };
  }

  if (lower.includes('linux')) {
    return {
      title: 'Ubuntu: Command line for beginners',
      url: 'https://ubuntu.com/tutorials/command-line-for-beginners',
      kind: 'official-docs',
      why: 'Practise Linux command ideas in a safe learning context.'
    };
  }

  if (lower.includes('sql injection') || lower.includes('cross-site')) {
    return {
      title: 'OWASP Top 10',
      url: 'https://owasp.org/www-project-top-ten/',
      kind: 'official-docs',
      why: 'Connect web attack terms to real application risk.'
    };
  }

  if (sectionId === '2') {
    return {
      title: 'ACSC Essential Eight',
      url: 'https://www.cyber.gov.au/resources-business-and-government/essential-cyber-security/essential-eight',
      kind: 'official-docs',
      why: 'Relate A+ security ideas to Australian cyber hygiene language.'
    };
  }

  if (sectionId === '3') {
    return {
      title: 'Microsoft Learn: Windows troubleshooting',
      url: 'https://learn.microsoft.com/en-us/troubleshoot/windows-client/',
      kind: 'official-docs',
      why: 'Read official troubleshooting language for Windows symptoms.'
    };
  }

  if (sectionId === '4') {
    return {
      title: 'NIST Cybersecurity Framework',
      url: 'https://www.nist.gov/cyberframework',
      kind: 'official-docs',
      why: 'Connect operational procedures to risk, documentation, and recovery practice.'
    };
  }

  return {
    title: 'Microsoft Learn: Windows documentation',
    url: 'https://learn.microsoft.com/en-us/windows/',
    kind: 'official-docs',
    why: 'Use vendor documentation to deepen the operating-system concept.'
  };
}

function dcsApplicationFor(sectionId: string, title: string) {
  const lower = title.toLowerCase();

  if (lower.includes('ticket') || lower.includes('communication') || lower.includes('professional')) {
    return 'Practise writing calm, plain-English support notes for staff and students without exposing private DCS information.';
  }

  if (lower.includes('active directory') || lower.includes('authentication') || lower.includes('password')) {
    return 'Improve account, access, MFA, and escalation judgement for school identity support.';
  }

  if (lower.includes('firewall') || lower.includes('wireless') || lower.includes('ip address') || lower.includes('network')) {
    return 'Improve Wi-Fi, APIPA, DNS/DHCP, proxy, and school network triage notes before escalating.';
  }

  if (lower.includes('malware') || lower.includes('phishing') || lower.includes('security')) {
    return 'Practise privacy-safe security triage: isolate, record symptoms, avoid blame, and escalate quickly.';
  }

  if (lower.includes('macos') || lower.includes('linux') || lower.includes('windows')) {
    return 'Build confidence supporting mixed staff devices, classroom display issues, printing, and OS-specific symptoms.';
  }

  if (sectionId === '4') {
    return 'Turn technical work into better documentation, change control, asset notes, backup awareness, and PD evidence.';
  }

  return 'Translate the certification topic into safer, clearer DCS Level 1 support and stronger escalation evidence.';
}

function sectionDecisionQuestion(sectionId: string, title: string): AplusMultipleChoiceQuestion {
  if (sectionId === '1') {
    return {
      id: `${slug(title)}-mcq-os-evidence`,
      prompt: `Which evidence would be most useful before escalating a ${title} issue?`,
      options: [
        {
          id: 'a',
          text: 'The operating system/version, exact symptom, scope, recent change, and safe checks already tried.'
        },
        {
          id: 'b',
          text: 'Only a screenshot of the desktop, even if it includes private class or student information.'
        },
        {
          id: 'c',
          text: 'A guess that the laptop is broken, without testing whether the issue affects one device or many.'
        },
        {
          id: 'd',
          text: 'The user password, so the technician can investigate later without the user present.'
        }
      ],
      correctOptionId: 'a',
      explanation:
        'Good OS support notes separate symptom, scope, system details, recent change, and safe checks. They never require private screenshots or passwords.'
    };
  }

  if (sectionId === '2') {
    return {
      id: `${slug(title)}-mcq-security-boundary`,
      prompt: `What is the safest first response when ${title} appears to involve security risk?`,
      options: [
        {
          id: 'a',
          text: 'Capture the symptom safely, avoid blame, preserve privacy, contain obvious risk if authorised, and escalate quickly.'
        },
        {
          id: 'b',
          text: 'Keep troubleshooting quietly until there is definite proof of compromise.'
        },
        {
          id: 'c',
          text: 'Ask the user to forward passwords, MFA codes, or suspicious links to your personal account.'
        },
        {
          id: 'd',
          text: 'Delete logs and suspicious messages so the device looks clean before escalation.'
        }
      ],
      correctOptionId: 'a',
      explanation:
        'Security work depends on privacy, containment, evidence, and escalation. Deleting evidence or collecting secrets makes the incident worse.'
    };
  }

  if (sectionId === '3') {
    return {
      id: `${slug(title)}-mcq-troubleshooting-method`,
      prompt: `Which troubleshooting pattern best fits ${title}?`,
      options: [
        {
          id: 'a',
          text: 'Reproduce the symptom, isolate one-device versus many-device scope, check recent change, try safe first checks, and document results.'
        },
        {
          id: 'b',
          text: 'Change multiple settings at once so something is more likely to work quickly.'
        },
        {
          id: 'c',
          text: 'Assume the user caused it and skip evidence collection.'
        },
        {
          id: 'd',
          text: 'Factory reset the device before checking backup, scope, or learning impact.'
        }
      ],
      correctOptionId: 'a',
      explanation:
        'Troubleshooting should narrow the fault with safe, reversible checks. Changing many things at once destroys useful evidence.'
    };
  }

  return {
    id: `${slug(title)}-mcq-operational-judgement`,
    prompt: `Which operational behaviour best applies ${title} in a school IT setting?`,
    options: [
      {
        id: 'a',
        text: 'Document the request, owner, approval state, risk, rollback or next step, and privacy boundary.'
      },
      {
        id: 'b',
        text: 'Make the change immediately if it seems technically simple.'
      },
      {
        id: 'c',
        text: 'Record private names, student details, and internal procedures in PD evidence for completeness.'
      },
      {
        id: 'd',
        text: 'Skip documentation if the task only takes a few minutes.'
      }
    ],
    correctOptionId: 'a',
    explanation:
      'Operational maturity is about clear documentation, ownership, approval, risk, and privacy, not just technical speed.'
  };
}

function multipleChoiceFor(sectionId: string, sectionTitle: string, objectiveId: string, objectiveTitle: string, title: string) {
  return [
    {
      id: `${slug(title)}-mcq-concept`,
      prompt: `What is the best way to study ${title} for A+ Core 2 and DCS support work?`,
      options: [
        {
          id: 'a',
          text: `Memorise the term only, then move on to the next video.`
        },
        {
          id: 'b',
          text: `Define the concept, connect it to ${objectiveId} ${objectiveTitle}, and practise how it changes real support decisions.`
        },
        {
          id: 'c',
          text: `Treat it as a DCS-specific procedure and copy private internal details into the answer.`
        },
        {
          id: 'd',
          text: `Skip it unless it directly mentions a school system by name.`
        }
      ],
      correctOptionId: 'b',
      explanation: `${title} should be learned as a concept inside ${sectionTitle}, then translated into safe DCS troubleshooting or documentation decisions.`
    },
    sectionDecisionQuestion(sectionId, title),
    {
      id: `${slug(title)}-mcq-privacy`,
      prompt: `Which answer would be acceptable evidence for this ${title} assessment?`,
      options: [
        {
          id: 'a',
          text: 'A fake classroom support scenario that names the concept, safe checks, escalation point, and privacy boundary.'
        },
        {
          id: 'b',
          text: 'A copied real ticket containing staff names, student names, room details, or private system information.'
        },
        {
          id: 'c',
          text: 'A vague sentence saying it is important, with no DCS support application.'
        },
        {
          id: 'd',
          text: 'A real password reset or security change described step by step from production.'
        }
      ],
      correctOptionId: 'a',
      explanation:
        'DCSPrep evidence should use synthetic or anonymised examples and show judgement. It should not store real tickets, credentials, or private operational data.'
    }
  ];
}

function assessmentFor(sectionId: string, sectionTitle: string, objectiveId: string, objectiveTitle: string, title: string): AplusCore2Assessment {
  return {
    prompt: `Explain ${title} in plain English, then apply it to a fake DCS IT support scenario. Include: what the concept means, what symptoms or decisions it affects, what safe first checks you would do, and when you would escalate.`,
    successCriteria: [
      'Explains the concept without hiding behind jargon',
      'Connects the concept to a realistic DCS support pattern',
      'Names at least two safe first checks or decision points',
      'Includes a privacy or escalation boundary',
      'Uses only fake, synthetic, or anonymised examples'
    ],
    modelAnswerGuide: `${title} belongs to ${sectionTitle}, objective ${objectiveId} - ${objectiveTitle}. A strong answer defines the concept, names the support symptoms it changes, records safe evidence, and stops before private data or owner-only changes.`,
    multipleChoice: multipleChoiceFor(sectionId, sectionTitle, objectiveId, objectiveTitle, title)
  };
}

function studyBriefFor(sectionTitle: string, objectiveTitle: string, title: string) {
  return [
    `Read/watch this topic as part of ${sectionTitle}: ${objectiveTitle}.`,
    `Focus on what ${title} means, where it appears in support work, what evidence proves the symptom, and what you should avoid changing without approval.`,
    'After reading, practise explaining it to a non-technical staff member and writing one clean escalation note.'
  ].join(' ');
}

function lessonFromSeed(section: SectionSeed, objective: ObjectiveSeed, titleWithDuration: string): AplusCore2Lesson {
  const parsed = stripDuration(titleWithDuration);
  const id = `aplus-220-1202-${objective.id.replace('.', '-')}-${slug(parsed.title)}`;

  return {
    id,
    sectionId: section.id,
    sectionTitle: section.title,
    objectiveId: objective.id,
    objectiveTitle: objective.title,
    title: parsed.title,
    duration: parsed.duration,
    videoUrl: videoUrl(parsed.title),
    studyBrief: studyBriefFor(section.title, objective.title, parsed.title),
    dcsApplication: dcsApplicationFor(section.id, parsed.title),
    readMore: [
      {
        title: `Professor Messer: ${parsed.title}`,
        url: videoUrl(parsed.title),
        kind: 'video',
        why: 'Primary free video lesson for this Core 2 topic.'
      },
      {
        title: 'Professor Messer A+ 220-1202 course index',
        url: PROFESSOR_MESSER_CORE2_INDEX,
        kind: 'course-index',
        why: 'Return to the full Core 2 video sequence.'
      },
      {
        title: 'CompTIA A+ 220-1202 exam objectives',
        url: COMPTIA_OBJECTIVES,
        kind: 'exam-objectives',
        why: 'Check the official objective wording and exam scope.'
      },
      getTopicResource(parsed.title, section.id),
      {
        title: 'Professor Messer A+ Core 2 pop quizzes',
        url: PROFESSOR_MESSER_POP_QUIZZES,
        kind: 'practice',
        why: 'Use extra retrieval practice after DCSPrep assessment.'
      }
    ],
    assessment: assessmentFor(section.id, section.title, objective.id, objective.title, parsed.title)
  };
}

const sectionSeeds: SectionSeed[] = [
  {
    id: '1',
    title: 'Operating Systems',
    weight: '28%',
    summary: 'Windows, macOS, Linux, filesystems, OS tools, networking, applications, and cloud productivity.',
    objectives: [
      {
        id: '1.1',
        title: 'Operating Systems',
        lessons: ['Operating Systems Overview (12:59)', 'File Systems (5:51)']
      },
      {
        id: '1.2',
        title: 'Installing Operating Systems',
        lessons: ['Installing Operating Systems (16:50)', 'Upgrading Windows (8:34)']
      },
      {
        id: '1.3',
        title: 'Microsoft Windows',
        lessons: ['An Overview of Windows (9:09)', 'Windows Features (8:54)']
      },
      {
        id: '1.4',
        title: 'The Windows OS',
        lessons: ['Task Manager (4:52)', 'The Microsoft Management Console (15:22)', 'Additional Windows Tools (12:25)']
      },
      {
        id: '1.5',
        title: 'The Windows Command Line',
        lessons: ['Windows Command Line Tools (31:07)', 'The Windows Network Command Line (18:24)']
      },
      {
        id: '1.6',
        title: 'Windows Settings',
        lessons: ['The Windows Control Panel (23:09)', 'Windows Settings (6:34)']
      },
      {
        id: '1.7',
        title: 'Windows Networking',
        lessons: [
          'Windows Network Technologies (8:37)',
          'Configuring Windows Firewall (6:32)',
          'Windows IP Address Configuration (6:45)',
          'Windows Network Connections (13:08)'
        ]
      },
      {
        id: '1.8',
        title: 'macOS',
        lessons: ['macOS Overview (11:24)', 'macOS System Preferences (6:36)', 'macOS Features (11:17)']
      },
      {
        id: '1.9',
        title: 'Linux',
        lessons: ['Linux (11:11)', 'Linux Commands Part 1', 'Linux Commands Part 2']
      },
      {
        id: '1.10',
        title: 'Installing Applications',
        lessons: ['Installing Applications (16:27)']
      },
      {
        id: '1.11',
        title: 'Cloud Productivity',
        lessons: ['Cloud Productivity Tools (5:47)']
      }
    ]
  },
  {
    id: '2',
    title: 'Security',
    weight: '28%',
    summary: 'Physical, logical, Windows, wireless, malware, social engineering, data, browser, and SOHO security.',
    objectives: [
      {
        id: '2.1',
        title: 'Security Measures',
        lessons: ['Physical Security (10:06)', 'Physical Access Security (8:37)', 'Logical Security (10:38)', 'Authentication and Access (12:05)']
      },
      {
        id: '2.2',
        title: 'Windows Security',
        lessons: ['Defender Antivirus (5:01)', 'Windows Firewall (5:20)', 'Windows Security Settings (13:44)', 'Active Directory (27:40)']
      },
      {
        id: '2.3',
        title: 'Wireless Security',
        lessons: ['Wireless Encryption (6:19)', 'Authentication Methods (7:58)']
      },
      {
        id: '2.4',
        title: 'Malware',
        lessons: ['Malware (17:23)', 'Anti-malware Tools (12:45)']
      },
      {
        id: '2.5',
        title: 'Social Engineering',
        lessons: [
          'Social Engineering (13:37)',
          'Denial of Service (4:52)',
          'On-Path Attacks (7:02)',
          'Zero-Day Attacks (3:18)',
          'Password Attacks (10:23)',
          'Insider Threats (2:30)',
          'SQL Injection Attacks (6:18)',
          'Cross-site Scripting (7:54)',
          'Business Email Compromise (5:59)',
          'Supply Chain Attacks (8:04)',
          'Security Vulnerabilities (8:47)'
        ]
      },
      {
        id: '2.6',
        title: 'Malware Removal',
        lessons: ['Removing Malware (11:30)']
      },
      {
        id: '2.7',
        title: 'Security Best Practices',
        lessons: ['Security Best Practices (15:15)']
      },
      {
        id: '2.8',
        title: 'Mobile Device Security',
        lessons: ['Mobile Device Security (10:28)']
      },
      {
        id: '2.9',
        title: 'Data Destruction',
        lessons: ['Data Destruction (6:04)']
      },
      {
        id: '2.10',
        title: 'SOHO Networks',
        lessons: ['Securing a SOHO Network (15:03)']
      },
      {
        id: '2.11',
        title: 'Browser Security',
        lessons: ['Browser Security (18:56)']
      }
    ]
  },
  {
    id: '3',
    title: 'Software Troubleshooting',
    weight: '23%',
    summary: 'Windows, mobile device, mobile security, and general desktop security troubleshooting.',
    objectives: [
      {
        id: '3.1',
        title: 'Troubleshooting Windows',
        lessons: ['Troubleshooting Windows (17:30)']
      },
      {
        id: '3.2',
        title: 'Troubleshooting Mobile Devices',
        lessons: ['Troubleshooting Mobile Devices (11:30)']
      },
      {
        id: '3.3',
        title: 'Troubleshooting Mobile Device Security',
        lessons: ['Troubleshooting Mobile Device Security (12:16)']
      },
      {
        id: '3.4',
        title: 'Troubleshooting Security',
        lessons: ['Troubleshooting Security Issues (10:16)']
      }
    ]
  },
  {
    id: '4',
    title: 'Operational Procedures',
    weight: '21%',
    summary: 'Documentation, support systems, change, backup, safety, privacy, communication, scripting, remote access, and AI.',
    objectives: [
      {
        id: '4.1',
        title: 'Documentation and Support Systems',
        lessons: ['Ticketing Systems (13:48)', 'Asset Management (4:51)', 'Document Types (7:29)']
      },
      {
        id: '4.2',
        title: 'Change Management',
        lessons: ['Change Management (21:42)']
      },
      {
        id: '4.3',
        title: 'Backup and Recovery',
        lessons: ['Managing Backups (15:01)']
      },
      {
        id: '4.4',
        title: 'Safety',
        lessons: ['Managing Electrostatic Discharge (5:28)', 'Safety Procedures (4:45)']
      },
      {
        id: '4.5',
        title: 'Environmental Impacts',
        lessons: ['Environmental Impacts (6:28)']
      },
      {
        id: '4.6',
        title: 'Privacy and Policies',
        lessons: ['Incident Response (6:43)', 'Privacy, Licensing, and Policies (10:54)']
      },
      {
        id: '4.7',
        title: 'Communication and Professionalism',
        lessons: ['Professionalism (4:47)', 'Communication (7:00)']
      },
      {
        id: '4.8',
        title: 'Scripting',
        lessons: ['Scripting Languages (6:00)', 'Scripting Use Cases (8:28)']
      },
      {
        id: '4.9',
        title: 'Remote Access',
        lessons: ['Remote Access (12:49)']
      },
      {
        id: '4.10',
        title: 'Artificial Intelligence',
        lessons: ['Managing AI (10:38)']
      }
    ]
  }
];

export const aplusCore2Sections: AplusCore2Section[] = sectionSeeds.map((section) => ({
  id: section.id,
  title: section.title,
  weight: section.weight,
  summary: section.summary,
  objectives: section.objectives.map((objective) => ({
    id: objective.id,
    title: objective.title,
    lessons: objective.lessons.map((lesson) => lessonFromSeed(section, objective, lesson))
  }))
}));

export const aplusCore2Lessons = aplusCore2Sections.flatMap((section) =>
  section.objectives.flatMap((objective) => objective.lessons)
);

export const aplusCore2CoreResources: AplusResource[] = [
  {
    title: 'Professor Messer: Start A+ Core 2 here',
    url: PROFESSOR_MESSER_START,
    kind: 'course-index',
    why: 'Overview of the free and paid Core 2 study resources.'
  },
  {
    title: 'Professor Messer: 220-1202 free video course',
    url: PROFESSOR_MESSER_CORE2_INDEX,
    kind: 'course-index',
    why: 'Primary source for the 74-video free Core 2 course.'
  },
  {
    title: 'CompTIA A+ 220-1202 exam objectives',
    url: COMPTIA_OBJECTIVES,
    kind: 'exam-objectives',
    why: 'Official objective list for checking scope.'
  },
  {
    title: 'Professor Messer 220-1202 course notes',
    url: PROFESSOR_MESSER_NOTES,
    kind: 'notes',
    why: 'Optional notes bundle for consolidated revision.'
  }
];

export const aplusCore2Stats = {
  lessonCount: aplusCore2Lessons.length,
  sectionCount: aplusCore2Sections.length,
  objectiveCount: aplusCore2Sections.reduce((sum, section) => sum + section.objectives.length, 0),
  totalRunTime: '13h 41m',
  examCode: '220-1202'
};
