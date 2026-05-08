import type {
  AcademicInternalLink,
  AcademicLearningMode,
  AcademicResource,
  AcademicResourceKind,
  AcademicSubject,
  AcademicWeeklyModule,
  DcsBridge
} from '../types/academic';

const privacyReminder =
  'Use synthetic or anonymised examples only. Do not include student, parent, staff, credential, network, health, wellbeing, custody, or live incident details.';

/**
 * HELPER FUNCTIONS AND CONSTANTS (Must be defined before use)
 */

function resource(
  id: string,
  title: string,
  url: string,
  kind: AcademicResourceKind,
  why: string
): AcademicResource {
  return { id, title, url, kind, why };
}

function internalLink(id: string, label: string, href: string, why: string): AcademicInternalLink {
  return { id, label, href, why };
}

const supportAutomationLinks: AcademicInternalLink[] = [
  internalLink(
    'dcs-module-ticket-quality',
    'Ticket notes and escalation quality',
    '/modules/ticket-notes-escalation-quality',
    'Use programming analysis habits to improve support-note structure and escalation evidence.'
  ),
  internalLink(
    'dcs-knowledge-base-lab',
    'Knowledge Base Lab',
    '/knowledge-base-lab',
    'Turn the weekly topic into a reusable privacy-safe knowledge article or checklist.'
  ),
  internalLink(
    'dcs-pd-log',
    'PD log',
    '/pd-log',
    'Record the completed week as professional development evidence.'
  )
];

const defaultLearningModes: AcademicLearningMode[] = [
  {
    id: 'diagnose',
    label: 'Diagnose',
    action: 'Start with a quick recall check against the SILOs before reading notes.'
  },
  {
    id: 'learn',
    label: 'Learn',
    action: 'Read the concise concept notes and connect the idea to a DCS support pattern.'
  },
  {
    id: 'retrieve',
    label: 'Retrieve',
    action: 'Answer short questions, explain the idea aloud, and review flashcard prompts.'
  },
  {
    id: 'apply',
    label: 'Apply',
    action: 'Complete one practical task using privacy-safe sample data or a simulated support case.'
  },
  {
    id: 'prove',
    label: 'Prove',
    action: 'Create a small evidence artifact and log the learning as professional development.'
  }
];

/**
 * WEEKLY MODULE DEFINITIONS
 */

const cse3peWeeklyModules: AcademicWeeklyModule[] = [
  {
    id: 'cse3pe-week-1-intro',
    week: 1,
    session: 1,
    title: 'Week 1: Intro to Professional Practice & Ethics',
    dateIso: '2025-03-03',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Define professionalism in IT and introduce the role of ethics in technical decision-making.',
    siloIds: ['cse3pe-silo1', 'cse3pe-silo5'],
    dcsConnections: [
      'Understand the ethical boundary of having "admin" access to sensitive school data.',
      'Recognise IT support as a position of trust within the DCS community.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w1-trust-reflection',
        title: 'Quick check: Position of trust',
        kind: 'quick-check',
        prompt: 'Explain why an IT technician must maintain higher privacy standards than a general staff member.',
        successCriteria: [
          'Identifies the risk of broad access',
          'Connects trust to professional responsibility',
          'Uses a respectful, professional tone'
        ],
        siloIds: ['cse3pe-silo5'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Builds foundational professional identity.'
      }
    ]
  },
  {
    id: 'cse3pe-week-2-theories',
    week: 2,
    session: 2,
    title: 'Week 2: Ethical Theories & IT Frameworks',
    dateIso: '2025-03-10',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Explore Utilitarianism, Deontology, and Virtue Ethics as tools for resolving IT dilemmas.',
    siloIds: ['cse3pe-silo1', 'cse3pe-silo2'],
    dcsConnections: [
      'Use structured ethics to decide whether to bypass a policy for "convenience".',
      'Move beyond "gut feeling" when faced with conflicting requests.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w2-theory-application',
        title: 'Applied task: Theory in practice',
        kind: 'applied-task',
        prompt: 'Analyse a request to "just give me the principal\'s password" using one ethical theory.',
        successCriteria: [
          'Correctly applies a chosen theory',
          'Identifies the conflict between speed and security',
          'Recommends a safe, policy-aligned response'
        ],
        siloIds: ['cse3pe-silo1'],
        minutes: 25,
        evidenceType: 'reflection',
        dcsApplication: 'Improves decision-making under pressure.'
      }
    ]
  },
  {
    id: 'cse3pe-week-3-privacy',
    week: 3,
    session: 3,
    title: 'Week 3: Privacy & Data Protection Law',
    dateIso: '2025-03-17',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Understand the Australian Privacy Principles (APPs) and their impact on handling student and staff data.',
    siloIds: ['cse3pe-silo3'],
    dcsConnections: [
      'Apply DCS privacy policies to ticket notes and support conversations.',
      'Recognise what constitutes "Personally Identifiable Information" (PII) in a school context.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w3-privacy-audit',
        title: 'Quick check: Ticket note privacy',
        kind: 'quick-check',
        prompt: 'Critique a simulated ticket note: "Fixed Mr Smith\'s laptop (Asset 123). He was looking at private student records again."',
        successCriteria: [
          'Identifies the unnecessary inclusion of sensitive behavior',
          'Suggests a more professional, factual alternative',
          'Explains the privacy risk of the original note'
        ],
        siloIds: ['cse3pe-silo3'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Ensures support records remain professional and legally safe.'
      }
    ]
  },
  {
    id: 'cse3pe-week-4-ip',
    week: 4,
    session: 4,
    title: 'Week 4: Intellectual Property & Digital Rights',
    dateIso: '2025-03-24',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Explore copyright, licensing, and the ethical use of software and digital content in schools.',
    siloIds: ['cse3pe-silo3'],
    dcsConnections: [
      'Understand why "just finding a serial key online" is a violation of professional ethics.',
      'Help staff understand software licensing boundaries.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w4-licensing-check',
        title: 'Applied task: Licensing clarification',
        kind: 'applied-task',
        prompt: 'Draft a polite response to a teacher who wants to install a personal copy of software on a school laptop.',
        successCriteria: [
          'Mentions licensing and security policy',
          'Avoids being overly obstructive',
          'Offers a path to legitimate request/approval'
        ],
        siloIds: ['cse3pe-silo3'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Protects the school from legal and security risks.'
      }
    ]
  },
  {
    id: 'cse3pe-week-5-employer-responsibility',
    week: 5,
    session: 5,
    title: 'Week 5: Professional Responsibility to Employers',
    dateIso: '2025-03-31',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Discuss duty of care, confidentiality, and acting within the scope of authority.',
    siloIds: ['cse3pe-silo5'],
    dcsConnections: [
      'Recognise when a support request exceeds your authority and must be escalated to Paul.',
      'Maintain confidentiality regarding internal IT systems and projects.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w5-authority-check',
        title: 'Quick check: Scope of authority',
        kind: 'quick-check',
        prompt: 'A staff member asks you to "just turn off the web filter for five minutes". Is this within your authority?',
        successCriteria: [
          'Identifies this as an escalation point',
          'Explains why (policy/security impact)',
          'Suggests the correct process for the user'
        ],
        siloIds: ['cse3pe-silo5'],
        minutes: 10,
        evidenceType: 'reflection',
        dcsApplication: 'Prevents unauthorized high-risk changes.'
      }
    ]
  },
  {
    id: 'cse3pe-week-6-client-responsibility',
    week: 6,
    session: 6,
    title: 'Week 6: Professional Responsibility to Clients & Society',
    dateIso: '2025-04-07',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Explore the broader impact of IT work on users, students, and the local community.',
    siloIds: ['cse3pe-silo5'],
    dcsConnections: [
      'Ensure that IT support is accessible and respectful to all members of the school community.',
      'Consider the safety and wellbeing of students when resolving technical issues.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w6-accessibility-check',
        title: 'Applied task: Inclusive support',
        kind: 'applied-task',
        prompt: 'Suggest two ways to make "getting IT help" easier for a staff member with low technical confidence.',
        successCriteria: [
          'Focuses on clear language and empathy',
          'Suggests specific tools (e.g., visual guides)',
          'Avoids patronising or dismissive behavior'
        ],
        siloIds: ['cse3pe-silo5'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Improves support quality and community trust.'
      }
    ]
  },
  {
    id: 'cse3pe-week-7-social-impact',
    week: 7,
    session: 7,
    title: 'Week 1: Social Impact of IT & Digital Divide',
    dateIso: '2025-04-14',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Analyse how technology can both bridge and widen gaps in education and opportunity.',
    siloIds: ['cse3pe-silo3'],
    dcsConnections: [
      'Be aware of "BYOD" equity issues where some students have better hardware than others.',
      'Support tools that work well even on limited home internet connections.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w7-equity-reflection',
        title: 'Quick check: Digital equity',
        kind: 'quick-check',
        prompt: 'How might a "Cloud-only" textbook policy affect a student with no home internet?',
        successCriteria: [
          'Identifies the barrier to learning',
          'Suggests a technical workaround (e.g., offline sync)',
          'Connects the issue to professional responsibility'
        ],
        siloIds: ['cse3pe-silo3'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Builds awareness of the human impact of IT policies.'
      }
    ]
  },
  {
    id: 'cse3pe-week-8-emerging-tech',
    week: 8,
    session: 8,
    title: 'Week 8: Emerging Technologies & Ethical Dilemmas',
    dateIso: '2025-04-28',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Discuss the ethics of AI, automation, and surveillance in a school environment.',
    siloIds: ['cse3pe-silo1', 'cse3pe-silo3'],
    dcsConnections: [
      'Understand the privacy and bias risks of using AI tools for student assessment.',
      'Maintain transparency about what data is collected by school systems.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w8-ai-ethics',
        title: 'Applied task: AI use case critique',
        kind: 'applied-task',
        prompt: 'List one ethical risk and one benefit of using AI to "summarise" student support notes.',
        successCriteria: [
          'Identifies privacy/bias as a risk',
          'Identifies efficiency/clarity as a benefit',
          'Recommends a "human-in-the-loop" safeguard'
        ],
        siloIds: ['cse3pe-silo1'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Supports responsible AI adoption in schools.'
      }
    ]
  },
  {
    id: 'cse3pe-week-9-critical-thinking',
    week: 9,
    session: 9,
    title: 'Week 9: Critical Thinking in IT Decisions',
    dateIso: '2025-05-05',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Learn to identify assumptions, evaluate evidence, and avoid cognitive biases in troubleshooting.',
    siloIds: ['cse3pe-silo4'],
    dcsConnections: [
      'Avoid "I fixed this once before so it must be the same issue" bias.',
      'Ask clarifying questions before performing high-impact actions.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w9-bias-check',
        title: 'Quick check: Troubleshooting bias',
        kind: 'quick-check',
        prompt: 'Explain "Confirmation Bias" and how it might lead a technician to the wrong fix.',
        successCriteria: [
          'Defines the bias correctly',
          'Provides a realistic support example',
          'Suggests a way to counter it (e.g., "What else could it be?")'
        ],
        siloIds: ['cse3pe-silo4'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves troubleshooting accuracy and efficiency.'
      }
    ]
  },
  {
    id: 'cse3pe-week-10-workplace-culture',
    week: 10,
    session: 10,
    title: 'Week 10: Workplace Culture & Professional Conduct',
    dateIso: '2025-05-12',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Discuss communication, conflict resolution, and maintaining professional boundaries in a school setting.',
    siloIds: ['cse3pe-silo5'],
    dcsConnections: [
      'Manage difficult support interactions with patience and professionalism.',
      'Understand the "staff vs student" boundary and how it affects IT interactions.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w10-conflict-resolution',
        title: 'Applied task: De-escalating a user',
        kind: 'applied-task',
        prompt: 'Write a response to an angry staff member whose laptop has failed just before a lesson.',
        successCriteria: [
          'Acknowledges the frustration and urgency',
          'Provides a clear, immediate workaround (e.g., loan laptop)',
          'Maintains a calm, helpful professional tone'
        ],
        siloIds: ['cse3pe-silo5'],
        minutes: 25,
        evidenceType: 'reflection',
        dcsApplication: 'Builds resilient professional relationships.'
      }
    ]
  },
  {
    id: 'cse3pe-week-11-reflective-practice',
    week: 11,
    session: 11,
    title: 'Week 11: Reflective Practice & Continuous Learning',
    dateIso: '2025-05-19',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Learn how to use reflection to improve technical skills and professional judgement over time.',
    siloIds: ['cse3pe-silo6'],
    dcsConnections: [
      'Use the DCSPrep PD Log to record and reflect on learning wins and mistakes.',
      'Set realistic goals for future technical growth.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w11-reflection-task',
        title: 'Quick check: Writing a reflection',
        kind: 'quick-check',
        prompt: 'What three questions should you ask yourself after a difficult support session to help you improve?',
        successCriteria: [
          'Focuses on what went well and what didn\'t',
          'Identifies a specific technical or soft-skill lesson',
          'Asks what to do differently next time'
        ],
        siloIds: ['cse3pe-silo6'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Turns daily work into a continuous learning cycle.'
      }
    ]
  },
  {
    id: 'cse3pe-week-12-revision',
    week: 12,
    session: 12,
    title: 'Week 12: Final Revision & Professional Portfolio',
    dateIso: '2025-05-26',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Consolidate the subject\'s ethical, legal, and social themes into a personal professional framework.',
    siloIds: ['cse3pe-silo1', 'cse3pe-silo2', 'cse3pe-silo3', 'cse3pe-silo4', 'cse3pe-silo5', 'cse3pe-silo6'],
    dcsConnections: [
      'Finalise the DCS IT professional conduct checklist.',
      'Prepare for final subject reflections.'
    ],
    internalLinks: [
      ...supportAutomationLinks,
      internalLink('dcs-evidence-pack', 'Evidence pack', '/evidence-pack', 'Export a privacy-safe summary of the completed Academic PD work.')
    ],
    resources: [],
    assessments: [
      {
        id: 'cse3pe-w12-final-reflection',
        title: 'Integrated assessment: Professional framework',
        kind: 'applied-task',
        prompt: 'Write a 400-word summary of your personal IT ethical framework and how it applies to your role at DCS.',
        successCriteria: [
          'Identifies core professional values',
          'Connects values to specific school support tasks',
          'Describes how reflection will be used in the future'
        ],
        siloIds: ['cse3pe-silo1', 'cse3pe-silo2', 'cse3pe-silo3', 'cse3pe-silo4', 'cse3pe-silo5', 'cse3pe-silo6'],
        minutes: 60,
        evidenceType: 'reflection',
        dcsApplication: 'Creates the final "Professional Practice" evidence artifact.'
      }
    ]
  }
];

const cse1isWeeklyModules: AcademicWeeklyModule[] = [
  {
    id: 'cse1is-week-1-intro',
    week: 1,
    session: 1,
    title: 'Week 1: Intro to Information Systems & Organisations',
    dateIso: '2025-03-03',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Define information systems and their strategic role in schools and businesses.',
    siloIds: ['cse1is-silo1'],
    dcsConnections: [
      'Analyse Sentral as a core school information system.',
      'Identify the components of the DCS IT environment.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w1-system-analysis',
        title: 'Quick check: System components',
        kind: 'quick-check',
        prompt: 'Identify the users, data, processes, and technology in the school\'s library system.',
        successCriteria: [
          'Correctly identifies all four components',
          'Explains how they interact',
          'Uses school-specific examples'
        ],
        siloIds: ['cse1is-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves understanding of complex school platforms.'
      }
    ]
  },
  {
    id: 'cse1is-week-2-sdlc',
    week: 2,
    session: 2,
    title: 'Week 2: The Systems Development Life Cycle (SDLC)',
    dateIso: '2025-03-10',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Explore the phases of developing and maintaining information systems.',
    siloIds: ['cse1is-silo2'],
    dcsConnections: [
      'Understand why support work mostly occurs in the "Maintenance" phase.',
      'Appreciate why planning is needed before technical implementation.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w2-sdlc-mapping',
        title: 'Applied task: Mapping support to SDLC',
        kind: 'applied-task',
        prompt: 'Where does "Fixing a broken printer" fit in the SDLC? Justify your answer.',
        successCriteria: [
          'Identifies Maintenance/Support phase',
          'Explains the role of feedback for future cycles',
          'Uses professional terminology'
        ],
        siloIds: ['cse1is-silo2'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Connects daily tasks to the broader system lifecycle.'
      }
    ]
  },
  {
    id: 'cse1is-week-3-fact-finding',
    week: 3,
    session: 3,
    title: 'Week 3: Fact Finding & Requirements Elicitation',
    dateIso: '2025-03-17',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn techniques for gathering accurate requirements from users.',
    siloIds: ['cse1is-silo3'],
    dcsConnections: [
      'Ask better questions in support tickets to get to the root cause faster.',
      'Avoid assuming what a user "needs" without verification.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w3-interview-questions',
        title: 'Quick check: Support intake questions',
        kind: 'quick-check',
        prompt: 'Write three open-ended questions for a staff member who says "the internet is slow".',
        successCriteria: [
          'Avoids leading questions',
          'Focuses on scope and symptoms',
          'Aims to reduce ambiguity'
        ],
        siloIds: ['cse1is-silo3'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Speeds up triage and reduces back-and-forth.'
      }
    ]
  },
  {
    id: 'cse1is-week-4-process-modelling',
    week: 4,
    session: 4,
    title: 'Week 4: Process Modelling with DFDs',
    dateIso: '2025-03-24',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Use Data Flow Diagrams to represent how information moves through a system.',
    siloIds: ['cse1is-silo4'],
    dcsConnections: [
      'Diagram how a support request moves from the user to the technician and back.',
      'Identify bottlenecks in support workflows.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w4-dfd-task',
        title: 'Applied task: Support DFD',
        kind: 'applied-task',
        prompt: 'Draw a Level 0 DFD for the "New Student Onboarding" process at school.',
        successCriteria: [
          'Identifies external entities (Admin, Student, IT)',
          'Shows data flows (Name, Account, Login)',
          'Includes at least one data store'
        ],
        siloIds: ['cse1is-silo4'],
        minutes: 30,
        evidenceType: 'diagram',
        dcsApplication: 'Visualises and improves school IT workflows.'
      }
    ]
  },
  {
    id: 'cse1is-week-5-context-diagrams',
    week: 5,
    session: 5,
    title: 'Week 5: Context Diagrams & System Boundaries',
    dateIso: '2025-03-31',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Define the boundary between a system and its environment.',
    siloIds: ['cse1is-silo4'],
    dcsConnections: [
      'Clarify what is "DCS IT" vs "External Vendor" support (e.g., Sentral vs local network).',
      'Manage user expectations by defining support boundaries.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w5-boundary-check',
        title: 'Quick check: System boundary',
        kind: 'quick-check',
        prompt: 'For a Parent Portal issue, list two things inside the school\'s control and two things outside.',
        successCriteria: [
          'Correctly identifies internal vs external factors',
          'Explains the impact on support escalation',
          'Maintains professional focus'
        ],
        siloIds: ['cse1is-silo4'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Reduces wasted effort on external vendor issues.'
      }
    ]
  },
  {
    id: 'cse1is-week-6-data-modelling',
    week: 6,
    session: 6,
    title: 'Week 6: Data Modelling with ER Diagrams',
    dateIso: '2025-04-07',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Represent entities and relationships in a database schema.',
    siloIds: ['cse1is-silo5'],
    dcsConnections: [
      'Understand how students, classes, and teachers are linked in Sentral.',
      'Appreciate why "one student can have many classes" matters for data integrity.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w6-er-diagram',
        title: 'Applied task: School asset ERD',
        kind: 'applied-task',
        prompt: 'Create a simple ERD for "Devices", "Rooms", and "Staff".',
        successCriteria: [
          'Identifies correct entities',
          'Shows appropriate relationships (1:1, 1:M)',
          'Avoids redundant data fields'
        ],
        siloIds: ['cse1is-silo5'],
        minutes: 25,
        evidenceType: 'diagram',
        dcsApplication: 'Improves logical thinking for asset management.'
      }
    ]
  },
  {
    id: 'cse1is-week-7-database-design',
    week: 7,
    session: 7,
    title: 'Week 7: Database Design & Normalisation',
    dateIso: '2025-04-14',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn to structure data to reduce redundancy and improve accuracy.',
    siloIds: ['cse1is-silo5'],
    dcsConnections: [
      'Understand why updating a student\'s name in one place should update it everywhere.',
      'Recognise the symptoms of messy or redundant school data.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w7-normalisation-check',
        title: 'Quick check: Data redundancy',
        kind: 'quick-check',
        prompt: 'Why is it a bad idea to store a staff member\'s phone number in every ticket they ever logged?',
        successCriteria: [
          'Identifies the "update anomaly" risk',
          'Suggests a better structure (e.g., Staff table link)',
          'Explains the benefit for data accuracy'
        ],
        siloIds: ['cse1is-silo5'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Builds appreciation for clean system architecture.'
      }
    ]
  },
  {
    id: 'cse1is-week-8-ui-critique',
    week: 8,
    session: 8,
    title: 'Week 8: UI/UX Critique & Form Design',
    dateIso: '2025-04-28',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Evaluate how interface design affects user performance and satisfaction.',
    siloIds: ['cse1is-silo1'],
    dcsConnections: [
      'Critique school portal forms to identify where users are likely to make mistakes.',
      'Improve internal documentation layout for better readability.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w8-form-critique',
        title: 'Applied task: Portal form critique',
        kind: 'applied-task',
        prompt: 'Analyse a simulated "New User Request" form. Suggest two improvements for better user clarity.',
        successCriteria: [
          'Identifies specific confusing labels or layouts',
          'Suggests practical UI fixes (e.g., help text)',
          'Explains how this reduces support volume'
        ],
        siloIds: ['cse1is-silo1'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Supports proactive user experience improvements.'
      }
    ]
  },
  {
    id: 'cse1is-week-9-change-management',
    week: 9,
    session: 9,
    title: 'Week 9: System Implementation & Change Management',
    dateIso: '2025-05-05',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Learn how to transition users to new systems safely and effectively.',
    siloIds: ['cse1is-silo2'],
    dcsConnections: [
      'Help staff adapt to new platform updates or hardware rollouts.',
      'Recognise that "training" is as important as "technical install".'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w9-change-checklist',
        title: 'Quick check: Rollout checklist',
        kind: 'quick-check',
        prompt: 'List three non-technical things that should be ready before rolling out a new printer system.',
        successCriteria: [
          'Includes staff communication/guides',
          'Includes support triage readiness',
          'Includes a feedback mechanism'
        ],
        siloIds: ['cse1is-silo2'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Ensures smoother technology transitions for staff.'
      }
    ]
  },
  {
    id: 'cse1is-week-10-governance',
    week: 10,
    session: 10,
    title: 'Week 10: IT Governance & Security Requirements',
    dateIso: '2025-05-12',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Understand how policies and requirements protect information systems.',
    siloIds: ['cse1is-silo1', 'cse1is-silo3'],
    dcsConnections: [
      'Apply school data-handling policies to everyday support tasks.',
      'Explain "Why we can\'t do that" in terms of system security requirements.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w10-policy-application',
        title: 'Applied task: Policy as a requirement',
        kind: 'applied-task',
        prompt: 'Explain to a staff member why we require a formal request for new software, rather than just installing it.',
        successCriteria: [
          'Connects the request to security/licensing requirements',
          'Maintains a professional, helpful tone',
          'Offers a clear path forward'
        ],
        siloIds: ['cse1is-silo3'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Upholds IT governance and security standards.'
      }
    ]
  },
  {
    id: 'cse1is-week-11-school-systems',
    week: 11,
    session: 11,
    title: 'Week 11: Information Systems in Schools (Case Study)',
    dateIso: '2025-05-19',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Analyse a real-world school IT system through the lens of IS components and requirements.',
    siloIds: ['cse1is-silo1', 'cse1is-silo2', 'cse1is-silo3', 'cse1is-silo4', 'cse1is-silo5'],
    dcsConnections: [
      'Apply all subject concepts to a deep dive into a DCS platform.',
      'Identify one area where a school system could be improved.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1is-w11-case-study',
        title: 'Integrated assessment: School system map',
        kind: 'applied-task',
        prompt: 'Create a one-page "System Map" for a school platform (e.g., Parent Portal) including actors, data, and one major process.',
        successCriteria: [
          'Integrates DFD or Context Diagram concepts',
          'Identifies key requirements and constraints',
          'Includes a short improvement recommendation'
        ],
        siloIds: ['cse1is-silo1', 'cse1is-silo4'],
        minutes: 45,
        evidenceType: 'diagram',
        dcsApplication: 'Consolidates subject learning into a practical DCS artifact.'
      }
    ]
  },
  {
    id: 'cse1is-week-12-revision',
    week: 12,
    session: 12,
    title: 'Week 12: Final Revision & Systems Proposal',
    dateIso: '2025-05-26',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Review core concepts and prepare to present professional system findings.',
    siloIds: ['cse1is-silo1', 'cse1is-silo2', 'cse1is-silo3', 'cse1is-silo4', 'cse1is-silo5'],
    dcsConnections: [
      'Finalise the school platform context diagram.',
      'Prepare for final subject assessments.'
    ],
    internalLinks: [
      ...supportAutomationLinks,
      internalLink('dcs-evidence-pack', 'Evidence pack', '/evidence-pack', 'Export a privacy-safe summary of the completed Academic PD work.')
    ],
    resources: [],
    assessments: [
      {
        id: 'cse1is-w12-final-reflection',
        title: 'Integrated assessment: Subject summary',
        kind: 'applied-task',
        prompt: 'Write a 300-word reflection on how systems thinking has changed your approach to IT support.',
        successCriteria: [
          'Connects IS concepts to daily troubleshooting',
          'Identifies one major growth area in requirements or modelling',
          'Describes a future application of the knowledge'
        ],
        siloIds: ['cse1is-silo1', 'cse1is-silo2', 'cse1is-silo3', 'cse1is-silo4', 'cse1is-silo5'],
        minutes: 45,
        evidenceType: 'reflection',
        dcsApplication: 'Creates final PD evidence for the subject.'
      }
    ]
  }
];

const cse2cnWeeklyModules: AcademicWeeklyModule[] = [
  {
    id: 'cse2cn-week-1-models',
    week: 1,
    session: 1,
    title: 'Week 1: Network Models (OSI & TCP/IP)',
    dateIso: '2025-03-03',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Understand the layered approach to networking and how protocols interact across the OSI and TCP/IP models.',
    siloIds: ['cse2cn-silo1', 'cse2cn-silo2'],
    dcsConnections: [
      'Use layer thinking to separate physical (cable) issues from application (portal) issues.',
      'Adopt a structured "bottom-up" or "top-down" troubleshooting approach.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w1-layer-triage',
        title: 'Quick check: Layered troubleshooting',
        kind: 'quick-check',
        prompt: 'If a user can ping 8.8.8.8 but can\'t open google.com, which layer is likely at fault?',
        successCriteria: [
          'Identifies Layer 7 (Application/DNS) as the likely cause',
          'Explains why Layer 3 (Network) is working',
          'Suggests a relevant next check'
        ],
        siloIds: ['cse2cn-silo2'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Speeds up identification of network vs service issues.'
      }
    ]
  },
  {
    id: 'cse2cn-week-2-physical',
    week: 2,
    session: 2,
    title: 'Week 2: Physical Layer & Cabling',
    dateIso: '2025-03-10',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore Ethernet, Fiber, and Wireless physical standards and their limitations.',
    siloIds: ['cse2cn-silo1'],
    dcsConnections: [
      'Identify damaged HDMI or Ethernet cables in classrooms.',
      'Understand the distance limits of school cabling.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w2-cable-check',
        title: 'Applied task: Classroom cable audit',
        kind: 'applied-task',
        prompt: 'List three symptoms of a faulty Ethernet cable and how to verify them safely.',
        successCriteria: [
          'Includes "flapping" link, slow speed, or no connection',
          'Suggests swapping with a known-good cable',
          'Mentions checking for physical pin damage'
        ],
        siloIds: ['cse2cn-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Reduces downtime from simple physical connectivity issues.'
      }
    ]
  },
  {
    id: 'cse2cn-week-3-switching',
    week: 3,
    session: 3,
    title: 'Week 3: Data Link Layer & Switching',
    dateIso: '2025-03-17',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn about MAC addresses, ARP, and how switches manage local traffic using VLANs.',
    siloIds: ['cse2cn-silo1'],
    dcsConnections: [
      'Understand why some ports are on the "Staff" VLAN and others on "Student" or "Printer".',
      'Diagnose ARP issues in small network segments.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w3-vlan-check',
        title: 'Quick check: VLAN boundaries',
        kind: 'quick-check',
        prompt: 'Why can\'t a student laptop see the Staff printer even if they are plugged into the same switch?',
        successCriteria: [
          'Identifies VLAN segmentation',
          'Explains that they are on different logical networks',
          'Suggests how to request the correct access'
        ],
        siloIds: ['cse2cn-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves understanding of network security and access.'
      }
    ]
  },
  {
    id: 'cse2cn-week-4-ip-addressing',
    week: 4,
    session: 4,
    title: 'Week 4: Network Layer & IP Addressing',
    dateIso: '2025-03-24',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Master IPv4 and IPv6 addressing, subnetting, and the role of the default gateway.',
    siloIds: ['cse2cn-silo1'],
    dcsConnections: [
      'Recognise a "169.254" APIPA address as a DHCP failure.',
      'Verify a device has the correct gateway for its subnet.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w4-ip-triage',
        title: 'Applied task: IP configuration check',
        kind: 'applied-task',
        prompt: 'A device has IP 192.168.1.50 but the gateway is 10.0.0.1. Will it reach the internet? Why?',
        successCriteria: [
          'Correctly identifies the subnet mismatch',
          'Explains that the gateway must be on the same subnet',
          'Suggests checking DHCP settings'
        ],
        siloIds: ['cse2cn-silo1'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Speeds up diagnosis of static IP or DHCP misconfigurations.'
      }
    ]
  },
  {
    id: 'cse2cn-week-5-routing',
    week: 5,
    session: 5,
    title: 'Week 5: Routing Fundamentals',
    dateIso: '2025-03-31',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore how routers choose the best path for traffic using static and dynamic routing.',
    siloIds: ['cse2cn-silo1'],
    dcsConnections: [
      'Understand how the school network connects to the ISP and external cloud services.',
      'Learn what "Traceroute" reveals about a network path.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w5-traceroute-task',
        title: 'Quick check: Reading a traceroute',
        kind: 'quick-check',
        prompt: 'If a traceroute dies at the first hop, where is the problem likely located?',
        successCriteria: [
          'Identifies the local gateway or first router',
          'Explains why it isn\'t an ISP issue yet',
          'Suggests a relevant local check'
        ],
        siloIds: ['cse2cn-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves escalation accuracy for connectivity issues.'
      }
    ]
  },
  {
    id: 'cse2cn-week-6-transport',
    week: 6,
    session: 6,
    title: 'Week 6: Transport Layer (TCP vs UDP)',
    dateIso: '2025-04-07',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Compare reliable (TCP) and fast (UDP) transport and the role of port numbers.',
    siloIds: ['cse2cn-silo1'],
    dcsConnections: [
      'Understand why web portals use TCP (reliability) while video calls use UDP (speed).',
      'Diagnose issues where specific ports are blocked by the firewall.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w6-port-check',
        title: 'Applied task: Common support ports',
        kind: 'applied-task',
        prompt: 'List the port numbers for HTTP, HTTPS, and DNS. Why does it matter for troubleshooting?',
        successCriteria: [
          'Correctly identifies 80, 443, and 53',
          'Explains that blocking these stops specific services',
          'Notes that different protocols use different ports'
        ],
        siloIds: ['cse2cn-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Builds literacy for firewall and service troubleshooting.'
      }
    ]
  },
  {
    id: 'cse2cn-week-7-app-services',
    week: 7,
    session: 7,
    title: 'Week 7: Application Layer Services (DNS & DHCP)',
    dateIso: '2025-04-14',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Deep dive into the services that make networks user-friendly: DNS, DHCP, and HTTP.',
    siloIds: ['cse2cn-silo1'],
    dcsConnections: [
      'Troubleshoot "Site not found" (DNS) and "No IP address" (DHCP) issues.',
      'Understand how school devices find local servers and printers.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w7-dhcp-flow',
        title: 'Quick check: The DHCP process',
        kind: 'quick-check',
        prompt: 'What are the four steps of the DHCP handshake? (Hint: DORA)',
        successCriteria: [
          'Lists Discover, Offer, Request, Acknowledge',
          'Explains what happens if any step fails',
          'Connects it to a device "waiting for IP"'
        ],
        siloIds: ['cse2cn-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Provides a technical basis for connectivity triage.'
      }
    ]
  },
  {
    id: 'cse2cn-week-8-network-security',
    week: 8,
    session: 8,
    title: 'Week 8: Network Security Basics',
    dateIso: '2025-04-28',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn about Access Control Lists (ACLs), Firewalls, and basic hardening techniques.',
    siloIds: ['cse2cn-silo3'],
    dcsConnections: [
      'Understand why Level 1 support should never modify firewall rules without approval.',
      'Recognise how security policies shape network access.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w8-security-boundary',
        title: 'Applied task: Safe network checks',
        kind: 'applied-task',
        prompt: 'List three network checks that are safe for Level 1, and three that must be escalated.',
        successCriteria: [
          'Safe: ipconfig, ping, traceroute, cable swap',
          'Escalate: firewall changes, VLAN reassignment, router config',
          'Explains the risk of the escalated items'
        ],
        siloIds: ['cse2cn-silo3'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Maintains network stability and security boundaries.'
      }
    ]
  },
  {
    id: 'cse2cn-week-9-wireless',
    week: 9,
    session: 9,
    title: 'Week 9: Wireless Networking (Wi-Fi)',
    dateIso: '2025-05-05',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore 802.11 standards, SSIDs, frequencies (2.4GHz vs 5GHz), and WPA3 security.',
    siloIds: ['cse2cn-silo1', 'cse2cn-silo2'],
    dcsConnections: [
      'Diagnose Wi-Fi interference and "dead spots" in classrooms.',
      'Help staff and students connect to the correct school SSIDs.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w9-wifi-interference',
        title: 'Quick check: Wi-Fi frequency',
        kind: 'quick-check',
        prompt: 'Why might a microwave in the staff room affect the 2.4GHz Wi-Fi but not the 5GHz?',
        successCriteria: [
          'Identifies frequency overlap/interference',
          'Explains that 5GHz has more non-overlapping channels',
          'Suggests moving to 5GHz where possible'
        ],
        siloIds: ['cse2cn-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Speeds up classroom Wi-Fi troubleshooting.'
      }
    ]
  },
  {
    id: 'cse2cn-week-10-wan-cloud',
    week: 10,
    session: 10,
    title: 'Week 10: WAN & Cloud Connectivity',
    dateIso: '2025-05-12',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn how sites connect over long distances using VPNs and SD-WAN.',
    siloIds: ['cse2cn-silo1'],
    dcsConnections: [
      'Understand how staff access school files from home via VPN.',
      'Recognise that "Cloud" services still rely on a healthy local network path.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w10-vpn-triage',
        title: 'Applied task: VPN support checklist',
        kind: 'applied-task',
        prompt: 'A staff member can\'t connect to the VPN from home. What is the very first thing they should check?',
        successCriteria: [
          'Checks their home internet connection',
          'Verifies they have the correct credentials/MFA',
          'Suggests a restart of the VPN client'
        ],
        siloIds: ['cse2cn-silo1'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Improves remote support for staff.'
      }
    ]
  },
  {
    id: 'cse2cn-week-11-management',
    week: 11,
    session: 11,
    title: 'Week 11: Network Management & Monitoring',
    dateIso: '2025-05-19',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore tools for monitoring network health, including SNMP and Syslog.',
    siloIds: ['cse2cn-silo1'],
    dcsConnections: [
      'Learn how to report network "slowness" with objective data (latency, packet loss).',
      'Understand how IT Managers see the status of all school switches.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w11-slowness-report',
        title: 'Quick check: Objective slowness data',
        kind: 'quick-check',
        prompt: 'Instead of saying "the internet is slow", what two metrics could you provide to be more helpful?',
        successCriteria: [
          'Suggests Ping (Latency) and SpeedTest (Throughput)',
          'Mentions Packet Loss percentage',
          'Explains why these help more than a vague complaint'
        ],
        siloIds: ['cse2cn-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves the quality of network escalation notes.'
      }
    ]
  },
  {
    id: 'cse2cn-week-12-revision',
    week: 12,
    session: 12,
    title: 'Week 12: Troubleshooting & Subject Revision',
    dateIso: '2025-05-26',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Consolidate network concepts into a unified troubleshooting framework.',
    siloIds: ['cse2cn-silo1', 'cse2cn-silo2', 'cse2cn-silo3'],
    dcsConnections: [
      'Finalise the DCS network triage flow diagram.',
      'Prepare for final networking assessments.'
    ],
    internalLinks: [
      ...supportAutomationLinks,
      internalLink('dcs-evidence-pack', 'Evidence pack', '/evidence-pack', 'Export a privacy-safe summary of the completed Academic PD work.')
    ],
    resources: [],
    assessments: [
      {
        id: 'cse2cn-w12-final-reflection',
        title: 'Integrated assessment: Networking summary',
        kind: 'applied-task',
        prompt: 'Write a 300-word reflection on how network literacy has changed your approach to support.',
        successCriteria: [
          'Connects OSI layers to specific troubleshooting cases',
          'Identifies one major growth area in network thinking',
          'Describes a future application of the knowledge'
        ],
        siloIds: ['cse2cn-silo1', 'cse2cn-silo2', 'cse2cn-silo3'],
        minutes: 45,
        evidenceType: 'reflection',
        dcsApplication: 'Creates final PD evidence for the subject.'
      }
    ]
  }
];

const sta1dctWeeklyModules: AcademicWeeklyModule[] = [
  {
    id: 'sta1dct-week-1-data-info',
    week: 1,
    session: 1,
    title: 'Week 1: Data, Information & Knowledge',
    dateIso: '2025-03-03',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Define the hierarchy of data, information, and knowledge, and why context matters for critical thinking.',
    siloIds: ['sta1dct-silo1'],
    dcsConnections: [
      'Distinguish between raw ticket logs (data) and useful support trends (information).',
      'Understand how to turn support observations into actionable knowledge.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w1-hierarchy-check',
        title: 'Quick check: Data to Knowledge',
        kind: 'quick-check',
        prompt: 'Give an example of "Data", "Information", and "Knowledge" in a classroom display support context.',
        successCriteria: [
          'Correctly categorises each level',
          'Shows a logical progression',
          'Uses a realistic school example'
        ],
        siloIds: ['sta1dct-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves clarity in reporting and documentation.'
      }
    ]
  },
  {
    id: 'sta1dct-week-2-descriptive-stats',
    week: 2,
    session: 2,
    title: 'Week 2: Descriptive Statistics (Mean, Median, Mode)',
    dateIso: '2025-03-10',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn to summarise data using measures of central tendency and spread.',
    siloIds: ['sta1dct-silo2'],
    dcsConnections: [
      'Calculate the average time to resolve a ticket while accounting for outliers.',
      'Identify "common" vs "rare" support issues using mode and frequency.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w2-average-check',
        title: 'Applied task: Average resolution time',
        kind: 'applied-task',
        prompt: 'If 9 tickets take 10 minutes and 1 takes 5 hours, what is the mean and median? Which is more useful for staff expectations?',
        successCriteria: [
          'Calculates both correctly',
          'Explains the impact of the outlier',
          'Recommends the median for typical expectations'
        ],
        siloIds: ['sta1dct-silo2'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Sets realistic support expectations without overpromising.'
      }
    ]
  },
  {
    id: 'sta1dct-week-3-visualising-data',
    week: 3,
    session: 3,
    title: 'Week 3: Visualising Data (Charts & Graphs)',
    dateIso: '2025-03-17',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Choose and critique appropriate charts to represent data honestly.',
    siloIds: ['sta1dct-silo2'],
    dcsConnections: [
      'Create clear charts for PD progress and support category counts.',
      'Spot misleading charts in IT vendor marketing or media.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w3-chart-choice',
        title: 'Quick check: Choosing a chart',
        kind: 'quick-check',
        prompt: 'Which chart is best for showing "Support tickets by category" vs "Ticket volume over time"? Why?',
        successCriteria: [
          'Recommends Bar/Pie for categories',
          'Recommends Line chart for time',
          'Explains the reasoning clearly'
        ],
        siloIds: ['sta1dct-silo2'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves the quality of internal reports and PD evidence.'
      }
    ]
  },
  {
    id: 'sta1dct-week-4-probability',
    week: 4,
    session: 4,
    title: 'Week 4: Probability Foundations',
    dateIso: '2025-03-24',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Learn the basics of probability and how it applies to real-world uncertainty.',
    siloIds: ['sta1dct-silo3'],
    dcsConnections: [
      'Estimate the likelihood of a hardware failure based on historical data.',
      'Communicate risk and uncertainty to staff without using false certainty.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w4-probability-task',
        title: 'Applied task: Risk likelihood',
        kind: 'applied-task',
        prompt: 'If 2% of new laptops have a screen defect, what is the probability that a classroom of 30 will have at least one?',
        successCriteria: [
          'Uses basic probability rules',
          'Explains why it isn\'t "zero" or "guaranteed"',
          'Discusses the support impact'
        ],
        siloIds: ['sta1dct-silo3'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Supports better planning for device rollouts.'
      }
    ]
  },
  {
    id: 'sta1dct-week-5-uncertainty',
    week: 5,
    session: 5,
    title: 'Week 5: Decision Making under Uncertainty',
    dateIso: '2025-03-31',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Use expected values and risk assessment to make better technical choices.',
    siloIds: ['sta1dct-silo3'],
    dcsConnections: [
      'Decide whether to "fix now" or "replace" based on cost and likelihood of recurrence.',
      'Prioritise security patches based on risk impact and exploit probability.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w5-decision-matrix',
        title: 'Quick check: Simple decision matrix',
        kind: 'quick-check',
        prompt: 'Create a 2x2 matrix for "Impact" vs "Likelihood" for a simulated school Wi-Fi outage.',
        successCriteria: [
          'Correctly labels the axes',
          'Places the outage in the high/high quadrant',
          'Suggests an immediate action'
        ],
        siloIds: ['sta1dct-silo3'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves triage and urgency judgement.'
      }
    ]
  },
  {
    id: 'sta1dct-week-6-misconceptions',
    week: 6,
    session: 6,
    title: 'Week 6: Common Misconceptions & Biases',
    dateIso: '2025-04-07',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Identify cognitive shortcuts that lead to poor data interpretation.',
    siloIds: ['sta1dct-silo4'],
    dcsConnections: [
      'Avoid "The Gambler\'s Fallacy" (e.g., "This printer is due for a jam").',
      'Recognise "Availability Bias" (judging overall quality by one recent bad incident).'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w6-bias-check',
        title: 'Applied task: Spotting bias in support',
        kind: 'applied-task',
        prompt: 'A staff member says "These laptops are all rubbish" after one fails. Which bias is this?',
        successCriteria: [
          'Identifies Availability or Generalisation bias',
          'Explains how to counter it with actual data',
          'Maintains a professional, evidence-based stance'
        ],
        siloIds: ['sta1dct-silo4'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Counters anecdotal complaints with factual evidence.'
      }
    ]
  },
  {
    id: 'sta1dct-week-7-correlation',
    week: 7,
    session: 7,
    title: 'Week 7: Correlation vs Causation',
    dateIso: '2025-04-14',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Understand why two things happening together doesn\'t mean one caused the other.',
    siloIds: ['sta1dct-silo4'],
    dcsConnections: [
      'Avoid assuming an update caused a hardware failure just because they happened on the same day.',
      'Investigate "third variables" (e.g., power surge) in troubleshooting.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w7-causation-check',
        title: 'Quick check: Troubleshooting logic',
        kind: 'quick-check',
        prompt: 'Give an example of two IT events that are correlated but not causal.',
        successCriteria: [
          'Provides a clear, realistic example',
          'Explains why the link is non-causal',
          'Suggests how to verify the true cause'
        ],
        siloIds: ['sta1dct-silo4'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Reduces "guessing" in complex troubleshooting.'
      }
    ]
  },
  {
    id: 'sta1dct-week-8-sampling',
    week: 8,
    session: 8,
    title: 'Week 8: Sampling & Survey Design',
    dateIso: '2025-04-28',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn to gather representative data without bias.',
    siloIds: ['sta1dct-silo1'],
    dcsConnections: [
      'Design better staff IT surveys that capture honest feedback.',
      'Understand why "asking only the people in the staff room" is a biased sample.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w8-survey-task',
        title: 'Applied task: Mini-survey design',
        kind: 'applied-task',
        prompt: 'Draft three neutral questions to ask staff about their satisfaction with classroom displays.',
        successCriteria: [
          'Avoids leading language',
          'Covers both reliability and ease of use',
          'Includes a simple scale (e.g., 1-5)'
        ],
        siloIds: ['sta1dct-silo1'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Provides high-quality feedback for service improvements.'
      }
    ]
  },
  {
    id: 'sta1dct-week-9-data-ethics',
    week: 9,
    session: 9,
    title: 'Week 9: Data Ethics & Privacy',
    dateIso: '2025-05-05',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Discuss the responsibilities of those who collect and analyse personal data.',
    siloIds: ['sta1dct-silo1'],
    dcsConnections: [
      'Ensure PD evidence and reports use synthetic data to protect real people.',
      'Understand the ethics of tracking user activity in school systems.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w9-ethics-check',
        title: 'Quick check: Data privacy boundary',
        kind: 'quick-check',
        prompt: 'Why should a "Ticket Volume" report not include the names of the staff who logged the most tickets?',
        successCriteria: [
          'Identifies the risk of "shaming" or surveillance',
          'Explains it is unnecessary for the report goal',
          'Suggests anonymised categories instead'
        ],
        siloIds: ['sta1dct-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Upholds professional ethics in reporting.'
      }
    ]
  },
  {
    id: 'sta1dct-week-10-media-critique',
    week: 10,
    session: 10,
    title: 'Week 10: Critical Thinking in the Media',
    dateIso: '2025-05-12',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Critique how data and statistics are presented in public discourse.',
    siloIds: ['sta1dct-silo1'],
    dcsConnections: [
      'Apply skepticism to IT vendor "99.99% reliability" claims.',
      'Identify missing context in tech news and reports.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w10-vendor-critique',
        title: 'Applied task: Vendor claim critique',
        kind: 'applied-task',
        prompt: 'A vendor claims their software "Reduces support tickets by 50%". What two questions should you ask them?',
        successCriteria: [
          'Asks about the baseline (50% of what?)',
          'Asks about the sample (which schools used it?)',
          'Asks about other factors (what else changed?)'
        ],
        siloIds: ['sta1dct-silo1'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Supports smarter IT procurement and evaluation.'
      }
    ]
  },
  {
    id: 'sta1dct-week-11-evidence-reporting',
    week: 11,
    session: 11,
    title: 'Week 11: Evidence-Based Support Reporting',
    dateIso: '2025-05-19',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Combine stats, visualisation, and critical thinking into a professional report.',
    siloIds: ['sta1dct-silo1', 'sta1dct-silo2', 'sta1dct-silo3', 'sta1dct-silo4'],
    dcsConnections: [
      'Produce a high-quality PD summary that proves learning outcomes with evidence.',
      'Create a "Month in Support" report using synthetic data.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w11-report-task',
        title: 'Integrated assessment: Synthetic trend report',
        kind: 'applied-task',
        prompt: 'Analyse a fake month of tickets. Show one trend, one limitation, and one recommendation.',
        successCriteria: [
          'Uses a chart and summary stats',
          'Acknowledges data gaps or uncertainty',
          'Provides a logical, evidence-based recommendation'
        ],
        siloIds: ['sta1dct-silo1', 'sta1dct-silo2'],
        minutes: 45,
        evidenceType: 'data-report',
        dcsApplication: 'Consolidates subject learning into a practical DCS artifact.'
      }
    ]
  },
  {
    id: 'sta1dct-week-12-revision',
    week: 12,
    session: 12,
    title: 'Week 12: Final Revision & Data Project',
    dateIso: '2025-05-26',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Review core concepts and finalise the evidence-based project.',
    siloIds: ['sta1dct-silo1', 'sta1dct-silo2', 'sta1dct-silo3', 'sta1dct-silo4'],
    dcsConnections: [
      'Finalise the synthetic support trend report.',
      'Prepare for final subject assessments.'
    ],
    internalLinks: [
      ...supportAutomationLinks,
      internalLink('dcs-evidence-pack', 'Evidence pack', '/evidence-pack', 'Export a privacy-safe summary of the completed Academic PD work.')
    ],
    resources: [],
    assessments: [
      {
        id: 'sta1dct-w12-final-reflection',
        title: 'Integrated assessment: Subject summary',
        kind: 'applied-task',
        prompt: 'Write a 300-word reflection on how data-based thinking has improved your professional judgement.',
        successCriteria: [
          'Connects stats/probability to daily support',
          'Identifies one major growth area in critical thinking',
          'Describes a future application of the knowledge'
        ],
        siloIds: ['sta1dct-silo1', 'sta1dct-silo2', 'sta1dct-silo3', 'sta1dct-silo4'],
        minutes: 45,
        evidenceType: 'reflection',
        dcsApplication: 'Creates final PD evidence for the subject.'
      }
    ]
  }
];

const cse1oofWeeklyModules: AcademicWeeklyModule[] = [
  {
    id: 'cse1oof-week-1-java-env',
    week: 1,
    session: 1,
    title: 'Week 1: Intro to Programming & Java Environment',
    dateIso: '2025-03-03',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Set up the Java development environment and run your first "Hello World" program.',
    siloIds: ['cse1oof-silo1'],
    dcsConnections: [
      'Understand the difference between source code and compiled bytecode.',
      'Practice disciplined environment setup, essential for technical support.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w1-env-check',
        title: 'Quick check: Java environment',
        kind: 'quick-check',
        prompt: 'What command-line tool is used to compile a Java file? What is the output file extension?',
        successCriteria: [
          'Identifies "javac"',
          'Correctly names the ".class" extension',
          'Explains the role of the JVM'
        ],
        siloIds: ['cse1oof-silo1'],
        minutes: 10,
        evidenceType: 'reflection',
        dcsApplication: 'Builds foundational technical literacy.'
      }
    ]
  },
  {
    id: 'cse1oof-week-2-data-types',
    week: 2,
    session: 2,
    title: 'Week 2: Data Types, Variables & Expressions',
    dateIso: '2025-03-10',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn about primitive types, strings, and how to perform calculations in Java.',
    siloIds: ['cse1oof-silo5'],
    dcsConnections: [
      'Represent synthetic school data (e.g., ticket counts, staff names) using appropriate types.',
      'Practice safe data handling habits.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w2-type-choice',
        title: 'Quick check: Choosing types',
        kind: 'quick-check',
        prompt: 'Which Java type would you use for a "Student ID", "Average Grade", and "Is Graduate"?',
        successCriteria: [
          'Recommends String or int for ID',
          'Recommends double or float for Grade',
          'Recommends boolean for Is Graduate'
        ],
        siloIds: ['cse1oof-silo5'],
        minutes: 10,
        evidenceType: 'reflection',
        dcsApplication: 'Improves logical modelling of school data.'
      }
    ]
  },
  {
    id: 'cse1oof-week-3-selection',
    week: 3,
    session: 3,
    title: 'Week 3: Selection (If/Else, Switch)',
    dateIso: '2025-03-17',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Control program flow using conditional statements and branching logic.',
    siloIds: ['cse1oof-silo2', 'cse1oof-silo5'],
    dcsConnections: [
      'Model support triage rules as logical branches.',
      'Identify how school platform logic might handle different user roles.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w3-triage-logic',
        title: 'Applied task: Triage logic',
        kind: 'applied-task',
        prompt: 'Write a Java snippet that prints "Urgent" if a ticket category is "Security" and "Normal" otherwise.',
        successCriteria: [
          'Uses correct if/else syntax',
          'Compares strings correctly (using .equals)',
          'Prints the expected output'
        ],
        siloIds: ['cse1oof-silo5'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Reinforces logical thinking for support automation.'
      }
    ]
  },
  {
    id: 'cse1oof-week-4-iteration',
    week: 4,
    session: 4,
    title: 'Week 4: Iteration (Loops)',
    dateIso: '2025-03-24',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Repeat actions efficiently using while and for loops.',
    siloIds: ['cse1oof-silo2', 'cse1oof-silo5'],
    dcsConnections: [
      'Process lists of synthetic assets or user records.',
      'Understand the risk of "infinite loops" in both code and support processes.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w4-loop-task',
        title: 'Quick check: Loop choices',
        kind: 'quick-check',
        prompt: 'When would you use a "for" loop over a "while" loop? Give a school-support example.',
        successCriteria: [
          'Identifies "for" for known counts (e.g., all classrooms)',
          'Identifies "while" for unknown conditions (e.g., until fixed)',
          'Explains the difference clearly'
        ],
        siloIds: ['cse1oof-silo2'],
        minutes: 10,
        evidenceType: 'reflection',
        dcsApplication: 'Builds computational thinking for batch tasks.'
      }
    ]
  },
  {
    id: 'cse1oof-week-5-arrays-strings',
    week: 5,
    session: 5,
    title: 'Week 5: Arrays & String Manipulation',
    dateIso: '2025-03-31',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Store collections of data in arrays and learn advanced string operations.',
    siloIds: ['cse1oof-silo5'],
    dcsConnections: [
      'Clean and format synthetic staff names or asset tags.',
      'Manage small lists of devices in memory.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w5-string-clean',
        title: 'Applied task: Data cleaning',
        kind: 'applied-task',
        prompt: 'How would you use Java to ensure all synthetic asset tags start with "DCS-"? (Describe the methods used).',
        successCriteria: [
          'Suggests .startsWith() or .substring()',
          'Suggests .toUpperCase() for consistency',
          'Explains why data consistency matters'
        ],
        siloIds: ['cse1oof-silo5'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Prepares for safe data-migration or reporting tasks.'
      }
    ]
  },
  {
    id: 'cse1oof-week-6-intro-objects',
    week: 6,
    session: 6,
    title: 'Week 6: Intro to Objects & Classes',
    dateIso: '2025-04-07',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Move from procedural to object-oriented thinking by defining your own classes.',
    siloIds: ['cse1oof-silo3'],
    dcsConnections: [
      'Model a "SupportTicket" as an object with properties and behaviors.',
      'Understand school platforms as collections of interacting objects.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w6-class-design',
        title: 'Applied task: Ticket class design',
        kind: 'applied-task',
        prompt: 'List three attributes (fields) and two behaviors (methods) for a "SupportTicket" class.',
        successCriteria: [
          'Attributes: id, description, status',
          'Behaviors: resolve(), updateDescription()',
          'Explains how objects represent real entities'
        ],
        siloIds: ['cse1oof-silo3'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Builds advanced domain modelling skills.'
      }
    ]
  },
  {
    id: 'cse1oof-week-7-methods',
    week: 7,
    session: 7,
    title: 'Week 7: Methods, Parameters & Return Values',
    dateIso: '2025-04-14',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Organise code into reusable methods with clear inputs and outputs.',
    siloIds: ['cse1oof-silo5'],
    dcsConnections: [
      'Create reusable "helper" methods for common support checks.',
      'Improve code readability through functional decomposition.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w7-method-refactor',
        title: 'Quick check: Method signatures',
        kind: 'quick-check',
        prompt: 'Write a method signature for a function that takes a student ID and returns their graduation status.',
        successCriteria: [
          'Uses appropriate return type (boolean)',
          'Uses descriptive parameter name',
          'Follows Java naming conventions'
        ],
        siloIds: ['cse1oof-silo5'],
        minutes: 10,
        evidenceType: 'reflection',
        dcsApplication: 'Improves code structure and maintainability.'
      }
    ]
  },
  {
    id: 'cse1oof-week-8-encapsulation',
    week: 8,
    session: 8,
    title: 'Week 8: Encapsulation & Access Modifiers',
    dateIso: '2025-04-28',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Protect object data using private fields and public getter/setter methods.',
    siloIds: ['cse1oof-silo3'],
    dcsConnections: [
      'Understand why "direct access" to sensitive data should be restricted.',
      'Reinforce privacy boundaries through technical constraints.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w8-encapsulation-check',
        title: 'Quick check: Why encapsulate?',
        kind: 'quick-check',
        prompt: 'Why is it better to use a resolve() method than to just let anyone change the status field to "Fixed"?',
        successCriteria: [
          'Identifies the need for validation (e.g., checking if tech is assigned)',
          'Explains data protection benefits',
          'Connects it to professional accountability'
        ],
        siloIds: ['cse1oof-silo3'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Connects code safety to operational safety.'
      }
    ]
  },
  {
    id: 'cse1oof-week-9-lifecycle',
    week: 9,
    session: 9,
    title: 'Week 9: Constructors & Object Lifecycle',
    dateIso: '2025-05-05',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn how objects are initialised, used, and cleared from memory.',
    siloIds: ['cse1oof-silo3'],
    dcsConnections: [
      'Ensure every new ticket or asset starts with a consistent, valid state.',
      'Understand the "Day 1" readiness requirements for new school devices.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w9-constructor-task',
        title: 'Applied task: Asset constructor',
        kind: 'applied-task',
        prompt: 'Write a Java constructor for a "Device" class that requires an asset tag and location.',
        successCriteria: [
          'Correctly initialises fields',
          'Prevents creating a device without an ID',
          'Explains the value of required initial state'
        ],
        siloIds: ['cse1oof-silo3'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Supports better asset management discipline.'
      }
    ]
  },
  {
    id: 'cse1oof-week-10-unix-basics',
    week: 10,
    session: 10,
    title: 'Week 10: Unix/Linux Command Line Basics',
    dateIso: '2025-05-12',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Navigate files, manage permissions, and run programs from the terminal.',
    siloIds: ['cse1oof-silo1'],
    dcsConnections: [
      'Build confidence with PowerShell or Linux terminals for support tasks.',
      'Understand file permissions (Read/Write/Execute) in a multi-user environment.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w10-terminal-check',
        title: 'Quick check: Terminal navigation',
        kind: 'quick-check',
        prompt: 'What commands are used to list files, change directory, and check current path?',
        successCriteria: [
          'Lists ls/dir, cd, and pwd',
          'Explains what each does',
          'Notes the difference between absolute and relative paths'
        ],
        siloIds: ['cse1oof-silo1'],
        minutes: 10,
        evidenceType: 'reflection',
        dcsApplication: 'Builds core technical support efficiency.'
      }
    ]
  },
  {
    id: 'cse1oof-week-11-testing',
    week: 11,
    session: 11,
    title: 'Week 11: Software Testing & Debugging',
    dateIso: '2025-05-19',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn to find and fix errors using a systematic, evidence-based approach.',
    siloIds: ['cse1oof-silo6'],
    dcsConnections: [
      'Test your support checklists and internal scripts before sharing them.',
      'Adopt a "trust but verify" mindset for all technical fixes.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w11-test-plan',
        title: 'Applied task: Support script test plan',
        kind: 'applied-task',
        prompt: 'Create three test cases (Normal, Edge, Invalid) for a script that validates staff usernames.',
        successCriteria: [
          'Normal: valid name works',
          'Edge: very short name works/fails as expected',
          'Invalid: numbers or special characters are caught'
        ],
        siloIds: ['cse1oof-silo6'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Improves the reliability of support tools.'
      }
    ]
  },
  {
    id: 'cse1oof-week-12-revision',
    week: 12,
    session: 12,
    title: 'Week 12: Final Revision & Integrated Project',
    dateIso: '2025-05-26',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Review all OOP concepts and complete a small integrated console application.',
    siloIds: ['cse1oof-silo1', 'cse1oof-silo2', 'cse1oof-silo3', 'cse1oof-silo4', 'cse1oof-silo5', 'cse1oof-silo6'],
    dcsConnections: [
      'Consolidate Java skills into a professional support mindset.',
      'Prepare for final Java assessments.'
    ],
    internalLinks: [
      ...supportAutomationLinks,
      internalLink('dcs-evidence-pack', 'Evidence pack', '/evidence-pack', 'Export a privacy-safe summary of the completed Academic PD work.')
    ],
    resources: [],
    assessments: [
      {
        id: 'cse1oof-w12-final-reflection',
        title: 'Integrated assessment: OOP summary',
        kind: 'applied-task',
        prompt: 'Write a 300-word reflection on how learning object-oriented programming has improved your systematic troubleshooting skills.',
        successCriteria: [
          'Connects OOP concepts (objects, methods, testing) to support tasks',
          'Identifies one major growth area in technical discipline',
          'Describes a future application of Java/OOP'
        ],
        siloIds: ['cse1oof-silo1', 'cse1oof-silo2', 'cse1oof-silo3', 'cse1oof-silo4', 'cse1oof-silo5', 'cse1oof-silo6'],
        minutes: 45,
        evidenceType: 'reflection',
        dcsApplication: 'Creates final PD evidence for the subject.'
      }
    ]
  }
];

const cse1iitWeeklyModules: AcademicWeeklyModule[] = [
  {
    id: 'cse1iit-week-1-intro',
    week: 1,
    session: 1,
    title: 'Week 1: Intro to IT & Information Systems',
    dateIso: '2025-03-03',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Define information systems and the role of IT in modern organisations, focusing on users, data, processes, and technology.',
    siloIds: ['cse1iit-silo2', 'cse1iit-silo4'],
    dcsConnections: [
      'Understand Sentral or OurDCS as information systems rather than just websites.',
      'Identify the components of a school-wide IT platform.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w1-quick-check',
        title: 'Quick check: IS components',
        kind: 'quick-check',
        prompt: 'Identify the users, data, and processes involved in a parent portal registration request.',
        successCriteria: [
          'Lists at least two user roles',
          'Identifies key data items',
          'Describes the core process'
        ],
        siloIds: ['cse1iit-silo2'],
        minutes: 10,
        evidenceType: 'reflection',
        dcsApplication: 'Improves understanding of platform support boundaries.'
      }
    ]
  },
  {
    id: 'cse1iit-week-2-hardware',
    week: 2,
    session: 2,
    title: 'Week 2: Computer Hardware & Architecture',
    dateIso: '2025-03-10',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore the CPU, memory, and internal components that process data into information.',
    siloIds: ['cse1iit-silo1'],
    dcsConnections: [
      'Diagnose performance issues by distinguishing CPU, RAM, and disk bottlenecks.',
      'Explain hardware specs to staff in plain English.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w2-applied-task',
        title: 'Applied task: device spec guide',
        kind: 'applied-task',
        prompt: 'Create a simple guide explaining what RAM and CPU do for a teacher laptop using a "kitchen" analogy.',
        successCriteria: [
          'Avoids overly technical jargon',
          'Accurately represents the hardware roles',
          'Uses a clear, helpful tone'
        ],
        siloIds: ['cse1iit-silo1'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Improves communication with non-technical staff.'
      }
    ]
  },
  {
    id: 'cse1iit-week-3-io',
    week: 3,
    session: 3,
    title: 'Week 3: Input, Output, and Storage',
    dateIso: '2025-03-17',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Analyse how peripherals connect and communicate with the system to provide user interaction and data persistence.',
    siloIds: ['cse1iit-silo1'],
    dcsConnections: [
      'Troubleshoot ViewBoard touch, audio, and display paths.',
      'Understand printer and scanner connectivity patterns.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w3-diagram-task',
        title: 'Applied task: Classroom display path',
        kind: 'applied-task',
        prompt: 'Diagram the path from a teacher laptop to a ViewBoard, including HDMI, USB-C, and USB-Touch cables.',
        successCriteria: [
          'Includes all physical cable types',
          'Identifies the role of each connection',
          'Notes common failure points'
        ],
        siloIds: ['cse1iit-silo1'],
        minutes: 30,
        evidenceType: 'diagram',
        dcsApplication: 'Provides a reusable classroom troubleshooting aid.'
      }
    ]
  },
  {
    id: 'cse1iit-week-4-os',
    week: 4,
    session: 4,
    title: 'Week 4: Operating Systems & System Software',
    dateIso: '2025-03-24',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Understand the role of the OS in managing hardware, software, files, and security.',
    siloIds: ['cse1iit-silo1', 'cse1iit-silo4'],
    dcsConnections: [
      'Differentiate between hardware faults and Windows/macOS/iOS software issues.',
      'Explain OS update and restart importance to users.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w4-triage-task',
        title: 'Applied task: OS vs Hardware triage',
        kind: 'applied-task',
        prompt: 'For a "blue screen" symptom, list three OS-level checks and three hardware-level checks.',
        successCriteria: [
          'Correctly categorises each check',
          'Explains the reasoning for each',
          'Prioritises non-destructive checks'
        ],
        siloIds: ['cse1iit-silo4'],
        minutes: 25,
        evidenceType: 'reflection',
        dcsApplication: 'Reduces unnecessary hardware repairs for software issues.'
      }
    ]
  },
  {
    id: 'cse1iit-week-5-networking',
    week: 5,
    session: 5,
    title: 'Week 5: Networking Fundamentals (LAN/WAN)',
    dateIso: '2025-03-31',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn how devices connect locally and globally using switches, routers, and protocols.',
    siloIds: ['cse1iit-silo2'],
    dcsConnections: [
      'Troubleshoot Wi-Fi vs Ethernet connectivity.',
      'Understand how the school LAN reaches the internet gateway.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w5-network-triage',
        title: 'Applied task: Wi-Fi triage checklist',
        kind: 'applied-task',
        prompt: 'Create a 5-step checklist for a student laptop that cannot connect to the school Wi-Fi.',
        successCriteria: [
          'Includes "Forget Network" and "Restart" steps',
          'Checks for 169.254 IP address',
          'Includes an escalation point'
        ],
        siloIds: ['cse1iit-silo2'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Provides a standard Level 1 network support tool.'
      }
    ]
  },
  {
    id: 'cse1iit-week-6-internet-www',
    week: 6,
    session: 6,
    title: 'Week 6: The Internet and the World Wide Web',
    dateIso: '2025-04-07',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Analyse the infrastructure of the web, including DNS, HTTP, and browser behaviour.',
    siloIds: ['cse1iit-silo2'],
    dcsConnections: [
      'Diagnose DNS resolution issues vs web application downtime.',
      'Understand how SSL/HTTPS affects site access.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w6-web-diagnostics',
        title: 'Quick check: Browser vs Network',
        kind: 'quick-check',
        prompt: 'If a site works in Incognito but not in a normal tab, what does this suggest about the cause?',
        successCriteria: [
          'Identifies cache/extensions as likely causes',
          'Explains why network/DNS is less likely',
          'Suggests a privacy-safe fix'
        ],
        siloIds: ['cse1iit-silo2'],
        minutes: 10,
        evidenceType: 'reflection',
        dcsApplication: 'Speeds up web portal troubleshooting.'
      }
    ]
  },
  {
    id: 'cse1iit-week-7-html-basics',
    week: 7,
    session: 7,
    title: 'Week 7: Web Development & HTML Basics',
    dateIso: '2025-04-14',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn the structure of the web using HTML tags, attributes, and semantic elements.',
    siloIds: ['cse1iit-silo3'],
    dcsConnections: [
      'Understand how school portal pages are structured.',
      'Build simple internal documentation pages.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w7-html-page',
        title: 'Applied task: Simple support KB page',
        kind: 'applied-task',
        prompt: 'Write a small HTML snippet for a "Printer Troubleshooting" guide using headers, lists, and a link.',
        successCriteria: [
          'Uses correct HTML syntax',
          'Includes at least three troubleshooting steps',
          'Uses semantic headers (h1, h2)'
        ],
        siloIds: ['cse1iit-silo3'],
        minutes: 30,
        evidenceType: 'reflection',
        dcsApplication: 'Builds foundational skills for internal KB maintenance.'
      }
    ]
  },
  {
    id: 'cse1iit-week-8-advanced-html',
    week: 8,
    session: 8,
    title: 'Week 8: Advanced HTML & Web Systems',
    dateIso: '2025-04-28',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore forms, tables, and how web pages interact with backend systems.',
    siloIds: ['cse1iit-silo3'],
    dcsConnections: [
      'Understand how ticket forms and portal inputs work.',
      'Diagnose form submission issues in school apps.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w8-form-analysis',
        title: 'Quick check: Form submission',
        kind: 'quick-check',
        prompt: 'Analyse a simulated "Support Request" form. What fields should be mandatory for a high-quality ticket?',
        successCriteria: [
          'Includes Name, Location, and Symptom',
          'Explains why each field is needed',
          'Avoids overly complex required fields'
        ],
        siloIds: ['cse1iit-silo3'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves support intake quality.'
      }
    ]
  },
  {
    id: 'cse1iit-week-9-databases',
    week: 9,
    session: 9,
    title: 'Week 9: Database Fundamentals & Information Systems',
    dateIso: '2025-05-05',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn how data is stored, organised, and retrieved in relational databases.',
    siloIds: ['cse1iit-silo2'],
    dcsConnections: [
      'Understand how Sentral stores student and staff records.',
      'Appreciate data integrity and the risks of manual database changes.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w9-data-model',
        title: 'Applied task: Asset register model',
        kind: 'applied-task',
        prompt: 'List five fields you would include in a "Classroom Device" database table.',
        successCriteria: [
          'Includes unique identifier (Asset Tag)',
          'Includes location and device type',
          'Ensures no private data is required in the schema'
        ],
        siloIds: ['cse1iit-silo2'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Supports better asset management habits.'
      }
    ]
  },
  {
    id: 'cse1iit-week-10-service-management',
    week: 10,
    session: 10,
    title: 'Week 10: IT Service Management & Troubleshooting',
    dateIso: '2025-05-12',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore the lifecycle of an IT service, from request to resolution and improvement.',
    siloIds: ['cse1iit-silo4'],
    dcsConnections: [
      'Adopt a structured approach to solving support tickets.',
      'Understand the importance of service level expectations.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w10-escalation-note',
        title: 'Applied task: High-quality escalation note',
        kind: 'applied-task',
        prompt: 'Write a simulated escalation note for a "Wi-Fi is slow" issue that includes scope, steps tried, and evidence.',
        successCriteria: [
          'Clearly defines the scope (one room vs whole wing)',
          'Lists specific tests (SpeedTest, different devices)',
          'Provides a clear next-action request'
        ],
        siloIds: ['cse1iit-silo4'],
        minutes: 30,
        evidenceType: 'reflection',
        dcsApplication: 'Reduces escalation bounce-back and speeds up resolution.'
      }
    ]
  },
  {
    id: 'cse1iit-week-11-security-ethics',
    week: 11,
    session: 11,
    title: 'Week 11: IT Security, Ethics & Privacy',
    dateIso: '2025-05-19',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Understand the ethical and legal responsibilities of IT professionals, focusing on privacy and data protection.',
    siloIds: ['cse1iit-silo2', 'cse1iit-silo4'],
    dcsConnections: [
      'Apply school privacy policies to support interactions.',
      'Recognise security red flags in user requests.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w11-privacy-check',
        title: 'Quick check: Privacy boundary',
        kind: 'quick-check',
        prompt: 'A staff member asks for a student\'s password to "help them login". How should you respond according to policy?',
        successCriteria: [
          'Correctly identifies the privacy risk',
          'Suggests a polite but firm policy-based refusal',
          'Offers a safe alternative (e.g., standard reset process)'
        ],
        siloIds: ['cse1iit-silo4'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Protects both the user and the technician from privacy breaches.'
      }
    ]
  },
  {
    id: 'cse1iit-week-12-revision',
    week: 12,
    session: 12,
    title: 'Week 12: Future Trends & Subject Revision',
    dateIso: '2025-05-26',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Review the core concepts of information technology and explore emerging trends like AI and cloud computing.',
    siloIds: ['cse1iit-silo1', 'cse1iit-silo2', 'cse1iit-silo3', 'cse1iit-silo4'],
    dcsConnections: [
      'Consolidate learning into a practical support toolkit.',
      'Prepare for final subject assessments.'
    ],
    internalLinks: [
      ...supportAutomationLinks,
      internalLink('dcs-evidence-pack', 'Evidence pack', '/evidence-pack', 'Export a privacy-safe summary of the completed Academic PD work.')
    ],
    resources: [],
    assessments: [
      {
        id: 'cse1iit-w12-final-reflection',
        title: 'Integrated assessment: Subject summary',
        kind: 'applied-task',
        prompt: 'Write a 300-word reflection on how this subject has improved your ability to handle Level 1 support at DCS.',
        successCriteria: [
          'Links specific subject topics to support tasks',
          'Identifies one major growth area',
          'Describes a future application of the knowledge'
        ],
        siloIds: ['cse1iit-silo1', 'cse1iit-silo2', 'cse1iit-silo3', 'cse1iit-silo4'],
        minutes: 45,
        evidenceType: 'reflection',
        dcsApplication: 'Creates final PD evidence for the subject.'
      }
    ]
  }
];

const cse1icbWeeklyModules: AcademicWeeklyModule[] = [
  {
    id: 'cse1icb-week-1-threat-landscape',
    week: 1,
    session: 1,
    title: 'Week 1: The Cyber Story & Threat Landscape',
    dateIso: '2025-03-03',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore the history of cybersecurity and the modern threat landscape, including common attack vectors.',
    siloIds: ['cse1icb-silo1'],
    dcsConnections: [
      'Recognise phishing and social engineering patterns in school emails.',
      'Understand why school IT is a target for cyber threats.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w1-phishing-check',
        title: 'Quick check: Spot the phish',
        kind: 'quick-check',
        prompt: 'List three red flags to look for in a suspicious "Password Reset" email sent to a staff member.',
        successCriteria: [
          'Identifies sender address discrepancies',
          'Notes urgent or threatening language',
          'Checks for suspicious links/hover-text'
        ],
        siloIds: ['cse1icb-silo1'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves first-line phishing detection and reporting.'
      }
    ]
  },
  {
    id: 'cse1icb-week-2-standards',
    week: 2,
    session: 2,
    title: 'Week 2: Cybersecurity Standards & Regulations',
    dateIso: '2025-03-10',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn about the CIA triad, NIST framework, and ACSC Essential Eight controls.',
    siloIds: ['cse1icb-silo1', 'cse1icb-silo3'],
    dcsConnections: [
      'Apply the CIA triad to school data (Confidentiality, Integrity, Availability).',
      'Understand the regulatory environment for school data privacy.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w2-cia-analysis',
        title: 'Applied task: CIA triad in schools',
        kind: 'applied-task',
        prompt: 'Explain how the CIA triad applies to the Sentral student database.',
        successCriteria: [
          'Defines C, I, and A correctly',
          'Provides a school-specific example for each',
          'Identifies the highest priority for this system'
        ],
        siloIds: ['cse1icb-silo1'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Builds a professional mental model for data protection.'
      }
    ]
  },
  {
    id: 'cse1icb-week-3-app-security',
    week: 3,
    session: 3,
    title: 'Week 3: Application Security',
    dateIso: '2025-03-17',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore how software is secured, focusing on input validation, secure coding, and patch management.',
    siloIds: ['cse1icb-silo4', 'cse1icb-silo5'],
    dcsConnections: [
      'Understand the importance of keeping school software and browser extensions updated.',
      'Recognise "shadow IT" risks when staff use unapproved web apps.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w3-shadow-it',
        title: 'Quick check: Shadow IT risks',
        kind: 'quick-check',
        prompt: 'A teacher wants to use a new "AI Lesson Planner" website. What two security questions should you ask before they sign up?',
        successCriteria: [
          'Asks about data storage (where is student data going?)',
          'Asks about account access (SSO vs personal password)',
          'Suggests checking with the IT Manager'
        ],
        siloIds: ['cse1icb-silo4'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Prevents accidental data breaches from unvetted apps.'
      }
    ]
  },
  {
    id: 'cse1icb-week-4-network-security',
    week: 4,
    session: 4,
    title: 'Week 4: Network Security Fundamentals',
    dateIso: '2025-03-24',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn about firewalls, VPNs, IDS/IPS, and the importance of network segmentation.',
    siloIds: ['cse1icb-silo4'],
    dcsConnections: [
      'Understand why Guest Wi-Fi is separated from the Internal network.',
      'Recognise why certain sites are blocked by the school firewall.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w4-segmentation',
        title: 'Applied task: Why segment?',
        kind: 'applied-task',
        prompt: 'Explain to a visitor why they cannot access the school printer from the Guest Wi-Fi.',
        successCriteria: [
          'Uses a clear, non-confrontational explanation',
          'Mentions "Internal vs External" boundary',
          'Offers a safe alternative (e.g., Follow-Me print portal)'
        ],
        siloIds: ['cse1icb-silo4'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Improves visitor support and security policy adherence.'
      }
    ]
  },
  {
    id: 'cse1icb-week-5-threats-risks',
    week: 5,
    session: 5,
    title: 'Week 5: Cyber Threats, Risks & Vulnerabilities',
    dateIso: '2025-03-31',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Identify common vulnerabilities (OWASP Top 10) and how they are exploited by threats.',
    siloIds: ['cse1icb-silo2', 'cse1icb-silo3'],
    dcsConnections: [
      'Understand the risk of weak passwords and credential stuffing.',
      'Recognise the danger of "shoulder surfing" in busy school offices.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w5-vulnerability-check',
        title: 'Quick check: Physical security',
        kind: 'quick-check',
        prompt: 'Name two physical security risks in a typical school classroom and a simple fix for each.',
        successCriteria: [
          'Identifies unlocked laptops or visible passwords',
          'Suggests "Win+L" or clean-desk habits',
          'Explains why these matter'
        ],
        siloIds: ['cse1icb-silo2'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Builds a holistic "security-first" culture.'
      }
    ]
  },
  {
    id: 'cse1icb-week-6-risk-management',
    week: 6,
    session: 6,
    title: 'Week 6: Risk Management & Governance',
    dateIso: '2025-04-07',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn how to assess, treat, and monitor cyber risks using quantitative and qualitative methods.',
    siloIds: ['cse1icb-silo3'],
    dcsConnections: [
      'Prioritise support tickets based on security risk.',
      'Understand why some security requests are "Accepted Risk" by management.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w6-risk-rating',
        title: 'Applied task: Triage risk rating',
        kind: 'applied-task',
        prompt: 'Rank three simulated tickets (Forgotten password, Blue screen, Suspicious login) by security risk.',
        successCriteria: [
          'Places "Suspicious login" as highest risk',
          'Justifies the ranking using Impact/Likelihood',
          'Suggests an immediate first-step for each'
        ],
        siloIds: ['cse1icb-silo3'],
        minutes: 25,
        evidenceType: 'reflection',
        dcsApplication: 'Improves daily triage judgement.'
      }
    ]
  },
  {
    id: 'cse1icb-week-7-cryptography',
    week: 7,
    session: 7,
    title: 'Week 7: Cryptography & Data Protection',
    dateIso: '2025-04-14',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore symmetric/asymmetric encryption, hashing, and digital certificates.',
    siloIds: ['cse1icb-silo5'],
    dcsConnections: [
      'Understand why browser HTTPS warnings should never be bypassed.',
      'Explain "data at rest" vs "data in transit" simply.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w7-encryption-analogy',
        title: 'Quick check: Encryption for staff',
        kind: 'quick-check',
        prompt: 'Explain what a "locked padlock" in the browser means without using the word "asymmetric".',
        successCriteria: [
          'Uses a simple analogy (e.g., a sealed envelope)',
          'Explains it protects privacy from eavesdroppers',
          'Notes it proves identity (the site is who they say they are)'
        ],
        siloIds: ['cse1icb-silo5'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Improves staff security literacy.'
      }
    ]
  },
  {
    id: 'cse1icb-week-8-iam',
    week: 8,
    session: 8,
    title: 'Week 8: Identity & Access Management',
    dateIso: '2025-04-28',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn about authentication (MFA), authorisation (RBAC), and user lifecycle management.',
    siloIds: ['cse1icb-silo5'],
    dcsConnections: [
      'Troubleshoot Microsoft Authenticator prompts.',
      'Apply "Least Privilege" when granting temporary access.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w8-mfa-triage',
        title: 'Applied task: MFA support checklist',
        kind: 'applied-task',
        prompt: 'Create a 3-step checklist for a staff member whose MFA prompt isn\'t appearing.',
        successCriteria: [
          'Checks internet connectivity first',
          'Verifies the app is open/updated',
          'Provides a safe "One-time code" fallback instruction'
        ],
        siloIds: ['cse1icb-silo5'],
        minutes: 20,
        evidenceType: 'reflection',
        dcsApplication: 'Reduces downtime for blocked staff accounts.'
      }
    ]
  },
  {
    id: 'cse1icb-week-9-data-security',
    week: 9,
    session: 9,
    title: 'Week 9: Data Security & Privacy',
    dateIso: '2025-05-05',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Explore data loss prevention (DLP), classification, and privacy impact assessments.',
    siloIds: ['cse1icb-silo5'],
    dcsConnections: [
      'Recognise sensitive student/staff data and handle it with extra care.',
      'Understand why certain files shouldn\'t be shared externally.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w9-data-handling',
        title: 'Quick check: Sensitive data handling',
        kind: 'quick-check',
        prompt: 'You find a USB drive in the staff room. What is the safest way to handle it?',
        successCriteria: [
          'Does NOT plug it into a school computer',
          'Labels it and hands it to the IT Manager',
          'Explains the "Rubber Ducky" or malware risk'
        ],
        siloIds: ['cse1icb-silo5'],
        minutes: 10,
        evidenceType: 'reflection',
        dcsApplication: 'Prevents accidental malware infection.'
      }
    ]
  },
  {
    id: 'cse1icb-week-10-secure-ops',
    week: 10,
    session: 10,
    title: 'Week 10: Secure Operations & Monitoring',
    dateIso: '2025-05-12',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Learn about logging, monitoring, and maintaining security hygiene in production.',
    siloIds: ['cse1icb-silo5'],
    dcsConnections: [
      'Understand the role of antivirus and EDR on school laptops.',
      'Learn to report unusual device behaviour as a potential security event.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w10-event-reporting',
        title: 'Applied task: Reporting an anomaly',
        kind: 'applied-task',
        prompt: 'A teacher reports their mouse "moving on its own". Write a factual, calm report for the IT Manager.',
        successCriteria: [
          'Includes time, device, and exact symptoms',
          'Avoids jumping to "Hacked!" conclusions prematurely',
          'Notes whether the device was isolated'
        ],
        siloIds: ['cse1icb-silo5'],
        minutes: 25,
        evidenceType: 'reflection',
        dcsApplication: 'Improves incident reporting quality.'
      }
    ]
  },
  {
    id: 'cse1icb-week-11-incident-response',
    week: 11,
    session: 11,
    title: 'Week 11: Incident Response & Digital Forensics',
    dateIso: '2025-05-19',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview: 'Understand the incident response lifecycle: Preparation, Detection, Containment, Eradication, Recovery, and Lessons Learned.',
    siloIds: ['cse1icb-silo4', 'cse1icb-silo5'],
    dcsConnections: [
      'Know your role during a school-wide IT incident.',
      'Understand why "Containment" (e.g., pulling the plug) is a critical Level 1 skill.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w11-containment-task',
        title: 'Quick check: First-response containment',
        kind: 'quick-check',
        prompt: 'A staff member reports a ransomware message. What is the very first thing you should do?',
        successCriteria: [
          'Disconnects from network (unplug/Wi-Fi off) immediately',
          'Does NOT restart the computer (preserves memory)',
          'Escalates to the IT Manager immediately'
        ],
        siloIds: ['cse1icb-silo4'],
        minutes: 15,
        evidenceType: 'reflection',
        dcsApplication: 'Minimises damage during a major security event.'
      }
    ]
  },
  {
    id: 'cse1icb-week-12-revision',
    week: 12,
    session: 12,
    title: 'Week 12: Future Challenges & Subject Revision',
    dateIso: '2025-05-26',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview: 'Review cybersecurity foundations and explore emerging challenges like AI-driven attacks and quantum cryptography.',
    siloIds: ['cse1icb-silo1', 'cse1icb-silo2', 'cse1icb-silo3', 'cse1icb-silo4', 'cse1icb-silo5'],
    dcsConnections: [
      'Consolidate security habits into a personal support framework.',
      'Prepare for final cybersecurity assessments.'
    ],
    internalLinks: [
      ...supportAutomationLinks,
      internalLink('dcs-evidence-pack', 'Evidence pack', '/evidence-pack', 'Export a privacy-safe summary of the completed Academic PD work.')
    ],
    resources: [],
    assessments: [
      {
        id: 'cse1icb-w12-final-reflection',
        title: 'Integrated assessment: Security mindset',
        kind: 'applied-task',
        prompt: 'Write a 300-word reflection on how this subject has changed your approach to daily support tasks at DCS.',
        successCriteria: [
          'Identifies two specific security habits adopted',
          'Explains how security and service are balanced',
          'Describes a future goal for security learning'
        ],
        siloIds: ['cse1icb-silo1', 'cse1icb-silo2', 'cse1icb-silo3', 'cse1icb-silo4', 'cse1icb-silo5'],
        minutes: 45,
        evidenceType: 'reflection',
        dcsApplication: 'Creates final PD evidence for the subject.'
      }
    ]
  }
];

const cse1peWeeklyModules: AcademicWeeklyModule[] = [
  {
    id: 'cse1pe-week-1-algorithms-flowcharts',
    week: 1,
    session: 1,
    title: 'Week 1 - Topic 1: Algorithms and Flowcharts',
    dateIso: '2025-03-03',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab', 'Coding exercise'],
    overview:
      'Plan a solution before coding by describing inputs, outputs, processing steps, decisions, and a flowchart for a small support task.',
    siloIds: ['cse1pe-silo1', 'cse1pe-silo2'],
    dcsConnections: [
      'Convert a common Level 1 support pattern into clear decision steps.',
      'Use flowcharts to reduce guesswork before scripting or documenting a process.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w1-python-intro', 'Official Python tutorial - informal introduction', 'https://docs.python.org/3/tutorial/introduction.html', 'official-docs', 'Use this for basic Python values, expressions, and first code experiments.'),
      resource('cse1pe-w1-py4e-intro', 'Python for Everybody lessons', 'https://www.py4e.com/lessons', 'course', 'Beginner-friendly Python sequence that pairs well with the first programming weeks.'),
      resource('cse1pe-w1-cs50p', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Use the early lectures and problems for extra practice with computational thinking.')
    ],
    assessments: [
      {
        id: 'cse1pe-w1-quick-check',
        title: 'Quick check: input, process, output',
        kind: 'quick-check',
        prompt: 'Given a fake support request about a classroom display not showing, identify the inputs, outputs, decisions, and success criteria before any fix steps.',
        successCriteria: [
          'Lists at least three useful inputs',
          'Names the expected support outcome',
          'Separates diagnostic decisions from actions'
        ],
        siloIds: ['cse1pe-silo1'],
        minutes: 10,
        evidenceType: 'reflection',
        dcsApplication: 'Improves support intake quality and reduces vague troubleshooting.'
      },
      {
        id: 'cse1pe-w1-flowchart-task',
        title: 'Applied task: support checklist flowchart',
        kind: 'applied-task',
        prompt: 'Create a flowchart for a privacy-safe troubleshooting sequence, then write three test cases that would travel through different paths.',
        successCriteria: [
          'Includes start, decision, action, and end points',
          'Uses no private DCS incident details',
          'Includes at least three different test paths'
        ],
        siloIds: ['cse1pe-silo1', 'cse1pe-silo2'],
        minutes: 35,
        evidenceType: 'diagram',
        dcsApplication: 'Produces a reusable Level 1 support checklist pattern.'
      }
    ]
  },
  {
    id: 'cse1pe-week-2-statements-expressions',
    week: 2,
    session: 2,
    title: 'Week 2 - Topic 2: Statements and Expressions',
    dateIso: '2025-03-10',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab', 'Coding exercise'],
    overview:
      'Use variables, expressions, assignment, and simple output to turn a small data-processing idea into runnable Python.',
    siloIds: ['cse1pe-silo1', 'cse1pe-silo4'],
    dcsConnections: [
      'Represent fake support-ticket fields as variables.',
      'Calculate simple counts or labels without touching live data.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w2-python-intro', 'Official Python tutorial - using Python as a calculator', 'https://docs.python.org/3/tutorial/introduction.html', 'official-docs', 'Reference for expressions, strings, and first Python syntax.'),
      resource('cse1pe-w2-cs50p-variables', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Extra practice with variables, functions, and condition-free scripts.'),
      resource('cse1pe-w2-py4e-variables', 'Python for Everybody lessons', 'https://www.py4e.com/lessons', 'course', 'Good beginner exercises for expressions and variables.')
    ],
    assessments: [
      {
        id: 'cse1pe-w2-coding-exercise',
        title: 'Coding exercise: ticket field summary',
        kind: 'coding-exercise',
        prompt: 'Write a short script that stores fake ticket fields in variables and prints a clean one-line summary.',
        successCriteria: [
          'Runs without errors',
          'Uses descriptive variable names',
          'Uses only synthetic data'
        ],
        siloIds: ['cse1pe-silo1', 'cse1pe-silo4'],
        minutes: 25,
        evidenceType: 'script',
        dcsApplication: 'Builds safe habits for future support reporting scripts.'
      }
    ]
  },
  {
    id: 'cse1pe-week-3-booleans-conditionals',
    week: 3,
    session: 3,
    title: 'Week 3 - Topic 3: Booleans and Conditional Execution',
    dateIso: '2025-03-17',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab', 'Coding exercise'],
    overview:
      'Use Boolean logic and if/elif/else branches to make a program choose actions based on a condition.',
    siloIds: ['cse1pe-silo2', 'cse1pe-silo4'],
    dcsConnections: [
      'Create decision logic for triage categories.',
      'Practise clear branching before writing real support automation.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w3-python-control', 'Official Python tutorial - control flow', 'https://docs.python.org/3/tutorial/controlflow.html', 'official-docs', 'Reference for if statements and control-flow syntax.'),
      resource('cse1pe-w3-cs50p-conditionals', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Use conditionals practice for additional examples.'),
      resource('cse1pe-w3-py4e-conditional', 'Python for Everybody lessons', 'https://www.py4e.com/lessons', 'course', 'Supports beginner practice with conditionals.')
    ],
    assessments: [
      {
        id: 'cse1pe-w3-triage-rules',
        title: 'Coding exercise: triage decision rules',
        kind: 'coding-exercise',
        prompt: 'Write a script that classifies fake support requests as low, normal, or urgent from simple Boolean conditions.',
        successCriteria: [
          'Uses if/elif/else appropriately',
          'Covers at least three test examples',
          'Explains the rule in plain English'
        ],
        siloIds: ['cse1pe-silo2', 'cse1pe-silo4'],
        minutes: 30,
        evidenceType: 'script',
        dcsApplication: 'Builds disciplined decision rules for support categorisation.'
      }
    ]
  },
  {
    id: 'cse1pe-week-4-iteration',
    week: 4,
    session: 4,
    title: 'Week 4 - Topic 4: Iteration',
    dateIso: '2025-03-24',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab', 'Coding exercise'],
    overview:
      'Use loops to repeat a process across multiple items, trace loop behaviour, and avoid off-by-one or infinite-loop errors.',
    siloIds: ['cse1pe-silo2', 'cse1pe-silo4'],
    dcsConnections: [
      'Loop through synthetic ticket rows or fake device records.',
      'Practise batch checks before working with larger lists.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w4-python-for', 'Official Python tutorial - for statements and range', 'https://docs.python.org/3/tutorial/controlflow.html', 'official-docs', 'Reference for loops, range, break, and continue.'),
      resource('cse1pe-w4-py4e-loops', 'Python for Everybody lessons', 'https://www.py4e.com/lessons', 'course', 'Beginner loop exercises.'),
      resource('cse1pe-w4-cs50p-loops', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Extra loop problem practice.')
    ],
    assessments: [
      {
        id: 'cse1pe-w4-loop-counts',
        title: 'Coding exercise: count fake records',
        kind: 'coding-exercise',
        prompt: 'Loop through a list of fake support categories and count how many belong to each broad area.',
        successCriteria: [
          'Uses a loop instead of repeated manual code',
          'Prints a readable summary',
          'Includes test data in the script'
        ],
        siloIds: ['cse1pe-silo2', 'cse1pe-silo4'],
        minutes: 35,
        evidenceType: 'script',
        dcsApplication: 'Prepares for privacy-safe batch reporting and checklist validation.'
      }
    ]
  },
  {
    id: 'cse1pe-week-5-functions-objects',
    week: 5,
    session: 5,
    title: 'Week 5 - Topic 5: Functions and Objects',
    dateIso: '2025-03-31',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab', 'Coding exercise'],
    overview:
      'Break repeated logic into functions and start recognising objects as values with behaviour and attributes.',
    siloIds: ['cse1pe-silo2', 'cse1pe-silo4'],
    dcsConnections: [
      'Turn repeated support checks into named helper functions.',
      'Make code easier to read before it becomes a real tool.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w5-python-functions', 'Official Python tutorial - defining functions', 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', 'official-docs', 'Function syntax and examples.'),
      resource('cse1pe-w5-cs50p-functions', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Practice with functions and decomposition.'),
      resource('cse1pe-w5-py4e-functions', 'Python for Everybody lessons', 'https://www.py4e.com/lessons', 'course', 'Beginner function explanations and exercises.')
    ],
    assessments: [
      {
        id: 'cse1pe-w5-function-refactor',
        title: 'Applied task: refactor into functions',
        kind: 'applied-task',
        prompt: 'Take a previous fake-ticket script and move repeated logic into named functions with simple docstrings.',
        successCriteria: [
          'At least two useful functions are created',
          'Function names explain intent',
          'The script still runs with the same sample data'
        ],
        siloIds: ['cse1pe-silo2', 'cse1pe-silo4'],
        minutes: 40,
        evidenceType: 'script',
        dcsApplication: 'Improves maintainability of future internal helper scripts.'
      }
    ]
  },
  {
    id: 'cse1pe-week-6-strings-files',
    week: 6,
    session: 6,
    title: 'Week 6 - Topic 6: Strings and Files',
    dateIso: '2025-04-07',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab', 'Coding exercise'],
    overview:
      'Work with text and files so Python can read, clean, and summarise privacy-safe sample data.',
    siloIds: ['cse1pe-silo1', 'cse1pe-silo3', 'cse1pe-silo4'],
    dcsConnections: [
      'Read synthetic CSV or text exports safely.',
      'Practise cleaning fields without exposing real people or incidents.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w6-python-io', 'Official Python tutorial - input and output', 'https://docs.python.org/3/tutorial/inputoutput.html', 'official-docs', 'Reference for reading and writing files.'),
      resource('cse1pe-w6-python-strings', 'Official Python tutorial - strings', 'https://docs.python.org/3/tutorial/introduction.html#strings', 'official-docs', 'String basics and operations.'),
      resource('cse1pe-w6-py4e-files', 'Python for Everybody lessons', 'https://www.py4e.com/lessons', 'course', 'Helpful file-handling practice.')
    ],
    assessments: [
      {
        id: 'cse1pe-w6-file-summary',
        title: 'Coding exercise: read a fake CSV',
        kind: 'coding-exercise',
        prompt: 'Read a small fake CSV file and print how many rows are missing a required support category.',
        successCriteria: [
          'Reads from a file rather than hard-coded rows',
          'Handles missing or blank fields',
          'Includes a clear privacy note'
        ],
        siloIds: ['cse1pe-silo1', 'cse1pe-silo3', 'cse1pe-silo4'],
        minutes: 45,
        evidenceType: 'script',
        dcsApplication: 'Builds the core skill needed for safe support data helpers.'
      }
    ]
  },
  {
    id: 'cse1pe-week-7-data-structures',
    week: 7,
    session: 7,
    title: 'Week 7 - Topic 7: Data Structures',
    dateIso: '2025-04-14',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab', 'Coding exercise'],
    overview:
      'Use lists and dictionaries to store collections, look up values, and group records for batch processing.',
    siloIds: ['cse1pe-silo3', 'cse1pe-silo4'],
    dcsConnections: [
      'Group synthetic tickets by category or priority.',
      'Use dictionaries for lookup tables such as support area labels.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w7-python-data', 'Official Python tutorial - data structures', 'https://docs.python.org/3/tutorial/datastructures.html', 'official-docs', 'Reference for lists, dictionaries, tuples, and sets.'),
      resource('cse1pe-w7-cs50p-data', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Extra practice with lists and dictionaries.'),
      resource('cse1pe-w7-py4e-data', 'Python for Everybody lessons', 'https://www.py4e.com/lessons', 'course', 'Beginner data structure practice.')
    ],
    assessments: [
      {
        id: 'cse1pe-w7-category-counts',
        title: 'Coding exercise: dictionary category counter',
        kind: 'coding-exercise',
        prompt: 'Use a dictionary to count fake support records by category and print the top category.',
        successCriteria: [
          'Chooses a dictionary for grouped counts',
          'Explains why dictionary fits the task',
          'Includes sample data and output'
        ],
        siloIds: ['cse1pe-silo3', 'cse1pe-silo4'],
        minutes: 40,
        evidenceType: 'script',
        dcsApplication: 'Supports lightweight operational reporting with fake or anonymised data.'
      }
    ]
  },
  {
    id: 'cse1pe-week-8-software-errors',
    week: 8,
    session: 8,
    title: 'Week 8 - Topic 8: Software Errors',
    dateIso: '2025-04-28',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab', 'Coding exercise'],
    overview:
      'Identify syntax, runtime, and logic errors, then debug using evidence rather than guesswork. The programming assignment is released in this period.',
    siloIds: ['cse1pe-silo4'],
    dcsConnections: [
      'Practise calm, evidence-based diagnosis that transfers directly to IT support.',
      'Write better notes about what failed, what changed, and what was verified.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w8-python-errors', 'Official Python tutorial - errors and exceptions', 'https://docs.python.org/3/tutorial/errors.html', 'official-docs', 'Reference for reading exceptions and handling errors.'),
      resource('cse1pe-w8-cs50p-debug', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Use problem practice to build debugging stamina.'),
      resource('cse1pe-w8-py4e-debug', 'Python for Everybody lessons', 'https://www.py4e.com/lessons', 'course', 'Good beginner debugging practice.')
    ],
    assessments: [
      {
        id: 'cse1pe-w8-debug-log',
        title: 'Applied task: debugging note',
        kind: 'reflection',
        prompt: 'Break a small fake-ticket script in three different ways, then write a debugging note describing symptoms, cause, and fix.',
        successCriteria: [
          'Identifies syntax, runtime, and logic error examples',
          'Explains each fix without blaming the tool',
          'Uses a repeatable evidence format'
        ],
        siloIds: ['cse1pe-silo4'],
        minutes: 35,
        evidenceType: 'case-note',
        dcsApplication: 'Improves troubleshooting notes and escalation clarity.'
      }
    ]
  },
  {
    id: 'cse1pe-week-9-using-modules',
    week: 9,
    session: 9,
    title: 'Week 9 - Topic 9: Using Modules',
    dateIso: '2025-05-05',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview:
      'Use Python modules and standard-library imports to avoid reinventing common functionality.',
    siloIds: ['cse1pe-silo4'],
    dcsConnections: [
      'Use trusted standard modules for CSV, dates, paths, and simple reporting.',
      'Learn to read documentation before copying unknown code.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w9-python-modules', 'Official Python tutorial - modules', 'https://docs.python.org/3/tutorial/modules.html', 'official-docs', 'Reference for import, modules, and packages.'),
      resource('cse1pe-w9-python-csv', 'Python csv module documentation', 'https://docs.python.org/3/library/csv.html', 'official-docs', 'Useful standard-library module for safe fake CSV exercises.'),
      resource('cse1pe-w9-cs50p-libraries', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Additional practice with libraries and imports.')
    ],
    assessments: [
      {
        id: 'cse1pe-w9-csv-module',
        title: 'Coding exercise: use the csv module',
        kind: 'coding-exercise',
        prompt: 'Refactor the fake ticket CSV reader to use Python csv module and document why standard libraries are safer than ad hoc parsing.',
        successCriteria: [
          'Imports and uses csv correctly',
          'Keeps fake data separate from code',
          'Explains the library choice'
        ],
        siloIds: ['cse1pe-silo4'],
        minutes: 45,
        evidenceType: 'script',
        dcsApplication: 'Builds safer habits for internal helper scripts.'
      }
    ]
  },
  {
    id: 'cse1pe-week-10-structuring-documenting-code',
    week: 10,
    session: 10,
    title: 'Week 10 - Topic 10: Structuring and Documenting Code',
    dateIso: '2025-05-12',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview:
      'Organise code so another person can understand it, maintain it, and verify what it is intended to do.',
    siloIds: ['cse1pe-silo1', 'cse1pe-silo4'],
    dcsConnections: [
      'Write scripts that are readable enough to support safely later.',
      'Use comments and README notes to explain purpose, limits, and privacy boundaries.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w10-pep8', 'PEP 8 - Style Guide for Python Code', 'https://peps.python.org/pep-0008/', 'official-docs', 'Widely used Python style guidance.'),
      resource('cse1pe-w10-python-docstrings', 'Official Python tutorial - documentation strings', 'https://docs.python.org/3/tutorial/controlflow.html#documentation-strings', 'official-docs', 'Reference for useful function documentation.'),
      resource('cse1pe-w10-real-python', 'Real Python - documenting Python code', 'https://realpython.com/documenting-python-code/', 'course', 'Practical explanation of comments, docstrings, and project notes.')
    ],
    assessments: [
      {
        id: 'cse1pe-w10-code-review',
        title: 'Rubric check: script readability',
        kind: 'rubric',
        prompt: 'Review one of your previous scripts against names, structure, comments, privacy boundary, and reproducible sample data.',
        successCriteria: [
          'Function and variable names are clear',
          'Comments explain intent rather than obvious syntax',
          'README or notes explain how to run with fake data'
        ],
        siloIds: ['cse1pe-silo1', 'cse1pe-silo4'],
        minutes: 30,
        evidenceType: 'reflection',
        dcsApplication: 'Improves maintainability and handover quality.'
      }
    ]
  },
  {
    id: 'cse1pe-week-11-algorithm-design-strategies',
    week: 11,
    session: 11,
    title: 'Week 11 - Topic 11: Algorithm Design Strategies',
    dateIso: '2025-05-19',
    contactHours: 2,
    deliveryModes: ['Lecture', 'Lab'],
    overview:
      'Choose a sensible algorithmic approach, compare alternatives, and test the edge cases before finalising a solution.',
    siloIds: ['cse1pe-silo1', 'cse1pe-silo2', 'cse1pe-silo3', 'cse1pe-silo4'],
    dcsConnections: [
      'Compare support workflows before building a checklist or script.',
      'Justify why a solution is simple enough to maintain.'
    ],
    internalLinks: supportAutomationLinks,
    resources: [
      resource('cse1pe-w11-python-control', 'Official Python tutorial - control flow tools', 'https://docs.python.org/3/tutorial/controlflow.html', 'official-docs', 'Reference for composing functions, branches, and loops.'),
      resource('cse1pe-w11-python-data', 'Official Python tutorial - data structures', 'https://docs.python.org/3/tutorial/datastructures.html', 'official-docs', 'Reference for choosing simple structures.'),
      resource('cse1pe-w11-cs50p', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Use larger practice problems for design thinking.')
    ],
    assessments: [
      {
        id: 'cse1pe-w11-design-note',
        title: 'Applied task: algorithm design note',
        kind: 'applied-task',
        prompt: 'Write a one-page design note for the final fake support-data helper before coding the final version.',
        successCriteria: [
          'Identifies inputs, processing, outputs, and edge cases',
          'Explains why chosen data structures fit',
          'Lists at least five tests'
        ],
        siloIds: ['cse1pe-silo1', 'cse1pe-silo2', 'cse1pe-silo3', 'cse1pe-silo4'],
        minutes: 45,
        evidenceType: 'case-note',
        dcsApplication: 'Improves planning discipline for support automation.'
      }
    ]
  },
  {
    id: 'cse1pe-week-12-revision',
    week: 12,
    session: 12,
    title: 'Week 12 - Topic 12: Revision',
    dateIso: '2025-05-26',
    contactHours: 2,
    deliveryModes: ['Lecture'],
    overview:
      'Review the whole subject: problem analysis, control flow, data structures, files, modules, debugging, and code quality.',
    siloIds: ['cse1pe-silo1', 'cse1pe-silo2', 'cse1pe-silo3', 'cse1pe-silo4'],
    dcsConnections: [
      'Consolidate a complete privacy-safe support data helper.',
      'Prepare evidence that shows academic learning has improved practical IT support capability.'
    ],
    internalLinks: [
      ...supportAutomationLinks,
      internalLink('dcs-evidence-pack', 'Evidence pack', '/evidence-pack', 'Export a privacy-safe summary of the completed Academic PD work.')
    ],
    resources: [
      resource('cse1pe-w12-python-tutorial', 'Official Python tutorial', 'https://docs.python.org/3/tutorial/', 'official-docs', 'Use as the canonical revision index.'),
      resource('cse1pe-w12-cs50p', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Use selected problems for final practice.'),
      resource('cse1pe-w12-py4e', 'Python for Everybody lessons', 'https://www.py4e.com/lessons', 'course', 'Use topic lessons to patch weak areas.')
    ],
    assessments: [
      {
        id: 'cse1pe-w12-final-mini-assessment',
        title: 'Integrated assessment: final support-data helper',
        kind: 'applied-task',
        prompt: 'Submit a final privacy-safe support-data helper with fake input data, a clear README, test evidence, and a short reflection against all four SILOs.',
        successCriteria: [
          'Reads or defines fake support data safely',
          'Uses control flow, data structures, and functions',
          'Includes tests or sample runs',
          'Explains the DCS support value and privacy boundary'
        ],
        siloIds: ['cse1pe-silo1', 'cse1pe-silo2', 'cse1pe-silo3', 'cse1pe-silo4'],
        minutes: 60,
        evidenceType: 'script',
        dcsApplication: 'Creates the final Academic PD evidence artifact for CSE1PE.'
      }
    ]
  }
];

export const academicBridgeAreas = [
  'DCS Level 1 Support',
  'School Platforms',
  'Networking',
  'Cybersecurity',
  'Programming / Automation',
  'Data / Reporting',
  'AI / Data Science',
  'Cloud / DevOps',
  'M365 / Cloud',
  'Professional Practice'
] as const satisfies readonly DcsBridge['dcsArea'][];

export const academicSubjects: AcademicSubject[] = [
  {
    id: 'cse1iit',
    code: 'CSE1IIT',
    title: 'Inside Information Technology',
    provider: 'La Trobe',
    track: 'RBC',
    level: 'undergraduate',
    stream: 'foundations',
    yearLevel: '1',
    sourceType: 'SLG',
    sourceFileName: '2023 CSE1IIT BE SLG.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 2,
    localSources: [
      {
        id: 'cse1iit-slg',
        fileName: '2023 CSE1IIT BE SLG.pdf',
        path: 'RBC/CSE SLGs/2023 CSE1IIT BE SLG.pdf',
        status: 'canonical',
        note: 'Duplicate also exists under Year 1/Sem 1.'
      }
    ],
    summary:
      'A broad IT foundation covering computer systems, input/output devices, networks, databases, the Internet, the Web, and HTML.',
    topics: [
      {
        id: 'cse1iit-hardware',
        title: 'Computer hardware, input, output, and storage',
        dcsConnection: 'Explains device, display, printer, storage, and peripheral symptoms in classrooms and offices.'
      },
      {
        id: 'cse1iit-networks',
        title: 'LAN, WAN, Internet, and World Wide Web basics',
        dcsConnection: 'Helps separate local connectivity, web application, DNS, and account-access issues.'
      },
      {
        id: 'cse1iit-web',
        title: 'HTML and simple web systems',
        dcsConnection: 'Supports simple knowledge-base pages and better understanding of school portals.'
      }
    ],
    silos: [
      {
        id: 'cse1iit-silo1',
        number: 1,
        text: 'Analyse how a computer and its input/output devices process and deliver data or information to a user.',
        plainEnglish:
          'Trace how information moves through devices, peripherals, operating systems, storage, and displays.',
        masteryCriteria: [
          'Can explain a device path from user input to visible output',
          'Can distinguish hardware, operating system, application, and peripheral symptoms',
          'Can document a classroom device issue without guessing'
        ],
        practicePrompts: [
          'Diagram the path from teacher laptop to ViewBoard display and speakers.',
          'Explain why a working laptop screen does not prove the HDMI path is healthy.'
        ],
        quizItems: ['What is the difference between input, processing, storage, and output?', 'Name three symptoms that point to a peripheral issue rather than a web issue.']
      },
      {
        id: 'cse1iit-silo2',
        number: 2,
        text: 'Explain the digital age through advances in computers, information systems, networks, the Internet, and the Web.',
        plainEnglish:
          'Connect everyday school IT tools to the larger systems that make modern information work possible.',
        masteryCriteria: [
          'Can explain how school platforms depend on networks and web services',
          'Can separate SaaS, local device, and network problems',
          'Can explain technical ideas in plain language'
        ],
        practicePrompts: [
          'Explain Sentral or OurDCS as an information system rather than just a website.',
          'Compare a browser issue, network issue, and account issue using the same user complaint.'
        ],
        quizItems: ['Why might a web portal fail when general internet browsing still works?', 'What makes an information system more than a piece of software?']
      },
      {
        id: 'cse1iit-silo3',
        number: 3,
        text: 'Apply Internet, World Wide Web, and HTML knowledge to designing and constructing a web system.',
        plainEnglish: 'Use basic web knowledge to create simple, useful support pages and understand web workflows.',
        masteryCriteria: [
          'Can produce a simple accessible HTML reference page',
          'Can explain client/server basics',
          'Can identify where a web workflow needs clearer support instructions'
        ],
        practicePrompts: [
          'Create a small HTML quick-reference page for a common support process.',
          'Explain the difference between a link, a page, a site, and a web application.'
        ],
        quizItems: ['What does HTML structure do for a web page?', 'Why is clear page structure useful for a staff quick guide?']
      },
      {
        id: 'cse1iit-silo4',
        number: 4,
        text: 'Apply information technology knowledge to addressing or solving real-life problems.',
        plainEnglish: 'Turn general IT concepts into careful first-line troubleshooting decisions.',
        masteryCriteria: [
          'Can choose a safe first check from a vague symptom',
          'Can explain when to escalate',
          'Can produce a useful DCS support artifact'
        ],
        practicePrompts: [
          'Translate "the internet is broken" into a scoped troubleshooting question set.',
          'Write a privacy-safe support note for a simulated web portal problem.'
        ],
        quizItems: ['What details make a vague IT issue actionable?', 'Why should scope come before changing settings?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse1iit-bridge-support',
        dcsArea: 'DCS Level 1 Support',
        relevance: 'high',
        explanation: 'Provides the general mental model for hardware, web, account, and network troubleshooting.',
        relatedDcsModuleIds: ['dcs-it-support-foundations', 'ticket-notes-escalation-quality'],
        practicalOutput: 'Create a one-page DCS classroom technology path diagram.'
      },
      {
        id: 'cse1iit-bridge-platforms',
        dcsArea: 'School Platforms',
        relevance: 'medium',
        explanation: 'Helps describe Sentral, OurDCS/Schoolbox, and M365 as connected information systems.',
        relatedDcsModuleIds: ['sentral-support', 'ourdcs-schoolbox-support'],
        practicalOutput: 'Map one school platform into users, data, access, and support boundaries.'
      }
    ],
    weeklyModules: cse1iitWeeklyModules,
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse1iit-task-system-map',
        title: 'Classroom technology path diagram',
        description: 'Draw the path from staff device to display, audio, network, M365, and printer access.',
        evidenceType: 'diagram',
        privacyReminder
      }
    ],
    resources: [
      resource('cse1iit-cs50', 'CS50x', 'https://cs50.harvard.edu/x/', 'course', 'Broad CS foundation with hardware, Python, SQL, web, and problem solving.'),
      resource('cse1iit-mdn', 'MDN Learn Web Development', 'https://developer.mozilla.org/en-US/docs/Learn', 'official-docs', 'Structured web foundations for HTML, CSS, and JavaScript.'),
      resource('cse1iit-m365', 'Microsoft 365 Education service description', 'https://learn.microsoft.com/en-us/office365/servicedescriptions/office-365-platform-service-description/office-365-education', 'official-docs', 'Useful context for school cloud services and collaboration tools.')
    ],
    finalChallenge: {
      title: 'Explain a DCS classroom technology issue end to end',
      brief: 'Use a simulated display or portal issue and explain it from device, network, service, account, and user-impact angles.',
      evidence: 'One diagram plus a short escalation-quality note.'
    },
    certificationLinks: [
      {
        id: 'cse1iit-cert-a-plus',
        certification: 'CompTIA A+',
        relevance: 'high',
        explanation: 'Covers the Core 1 (220-1101) and Core 2 (220-1102) objectives for hardware, software, and troubleshooting foundations.'
      },
      {
        id: 'cse1iit-cert-it-fundamentals',
        certification: 'CompTIA IT Fundamentals+ (ITF+)',
        relevance: 'high',
        explanation: 'Directly aligns with the broad IT concepts, hardware, and software foundations covered in this subject.'
      }
    ],
    recommendedNextAction: 'Create the classroom technology path diagram as your first Academic PD artifact.'
  },
  {
    id: 'cse1pe',
    code: 'CSE1PE',
    title: 'Programming Environment',
    provider: 'La Trobe',
    track: 'RBC',
    level: 'undergraduate',
    stream: 'programming',
    yearLevel: '1',
    sourceType: 'SLG',
    sourceFileName: 'SLG-2025-CSE1PE-OL-1.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 1,
    localSources: [
      {
        id: 'cse1pe-slg-2025',
        fileName: 'SLG-2025-CSE1PE-OL-1.pdf',
        path: 'RBC/CSE SLGs/SLG-2025-CSE1PE-OL-1.pdf',
        status: 'canonical',
        note: 'Recommended canonical version because it is the newest local SLG.'
      },
      {
        id: 'cse1pe-slg-2024',
        fileName: 'SLG-2024-CSE1PE-BE-1.pdf',
        path: 'RBC/CSE SLGs/SLG-2024-CSE1PE-BE-1.pdf',
        status: 'duplicate'
      },
      {
        id: 'cse1pe-slg-2023',
        fileName: 'SLG-2023-CSE1PE-BE-1.pdf',
        path: 'RBC/CSE SLGs/SLG-2023-CSE1PE-BE-1.pdf',
        status: 'duplicate'
      }
    ],
    summary:
      'A Python-first programming foundation covering problem analysis, flowcharts, sequence, selection, iteration, data structures, files, modules, debugging, and code structure.',
    topics: [
      {
        id: 'cse1pe-algorithms',
        title: 'Algorithms and flowcharts',
        dcsConnection: 'Supports clear support checklists and repeatable troubleshooting sequences.'
      },
      {
        id: 'cse1pe-control-flow',
        title: 'Sequence, selection, and iteration',
        dcsConnection: 'Useful for scripts that validate synthetic checklists or process safe sample data.'
      },
      {
        id: 'cse1pe-data-files',
        title: 'Strings, files, lists, and dictionaries',
        dcsConnection: 'Enables privacy-safe ticket category summaries and asset-list checks.'
      },
      {
        id: 'cse1pe-debugging',
        title: 'Software errors and debugging',
        dcsConnection: 'Builds patience and evidence-based diagnosis for both code and support work.'
      }
    ],
    silos: [
      {
        id: 'cse1pe-silo1',
        number: 1,
        text: 'Analyse a data processing problem to identify both the data and high-level processing involved.',
        plainEnglish: 'Before coding, identify inputs, outputs, transformations, edge cases, and success criteria.',
        masteryCriteria: [
          'Can write an input/process/output summary before coding',
          'Can identify missing or messy data',
          'Can avoid coding before understanding the task'
        ],
        practicePrompts: [
          'Analyse a synthetic ticket CSV before writing any Python.',
          'Describe the inputs and outputs for an onboarding checklist validator.'
        ],
        quizItems: ['What should you identify before writing code?', 'Why is "just start coding" risky for support automation?']
      },
      {
        id: 'cse1pe-silo2',
        number: 2,
        text: 'Apply sequence, selection, and iteration to design computational solutions.',
        plainEnglish: 'Use ordered steps, conditionals, and loops to solve small problems reliably.',
        masteryCriteria: [
          'Can choose when to use if/else',
          'Can choose when to use a loop',
          'Can trace simple code by hand'
        ],
        practicePrompts: [
          'Write pseudocode for checking whether a support request has required fields.',
          'Trace a loop that counts synthetic tickets by category.'
        ],
        quizItems: ['When would you use a loop?', 'What is the difference between sequence and selection?']
      },
      {
        id: 'cse1pe-silo3',
        number: 3,
        text: 'Use basic data structures such as lists and dictionaries to solve batch data processing problems.',
        plainEnglish: 'Use lists for collections and dictionaries for labelled lookups or grouped counts.',
        masteryCriteria: [
          'Can choose list vs dictionary for a small task',
          'Can group records by category',
          'Can explain the data structure choice'
        ],
        practicePrompts: [
          'Use a dictionary to count synthetic requests by DCS support area.',
          'Use a list to store devices missing an asset tag in fake data.'
        ],
        quizItems: ['Why might a dictionary be better than a list for category counts?', 'What is a key-value pair?']
      },
      {
        id: 'cse1pe-silo4',
        number: 4,
        text: 'Implement executable Python code to solve computational problems.',
        plainEnglish: 'Write, run, test, and explain small Python programs.',
        masteryCriteria: [
          'Can run a script locally',
          'Can test normal and edge cases',
          'Can explain what the code does in plain English'
        ],
        practicePrompts: [
          'Write a Python script that summarises fake support-ticket categories.',
          'Add comments only where they clarify non-obvious logic.'
        ],
        quizItems: ['What is debugging?', 'Why should code used for PD avoid live DCS data?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse1pe-bridge-automation',
        dcsArea: 'Programming / Automation',
        relevance: 'high',
        explanation: 'Builds safe automation habits for helper scripts and DCSPrep improvements.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality', 'knowledge-base-lab'],
        practicalOutput: 'Write a Python script that summarises a synthetic support-ticket CSV.'
      },
      {
        id: 'cse1pe-bridge-data',
        dcsArea: 'Data / Reporting',
        relevance: 'medium',
        explanation: 'Supports basic reporting and clean thinking about ticket categories and asset lists.',
        relatedDcsModuleIds: ['new-user-onboarding', 'permissions-and-access-requests'],
        practicalOutput: 'Create an input/process/output note before scripting a fake report.'
      }
    ],
    weeklyModules: cse1peWeeklyModules,
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse1pe-task-ticket-csv',
        title: 'Synthetic ticket CSV summariser',
        description: 'Write Python that reads fake ticket rows and outputs counts by area, priority, and missing fields.',
        evidenceType: 'script',
        privacyReminder
      },
      {
        id: 'cse1pe-task-flowchart',
        title: 'Support checklist flowchart',
        description: 'Turn a common Level 1 troubleshooting pattern into a small flowchart before coding it.',
        evidenceType: 'diagram',
        privacyReminder
      }
    ],
    resources: [
      resource('cse1pe-py4e', 'Python for Everybody', 'https://www.py4e.com/lessons', 'course', 'Beginner-friendly Python lessons that match this subject well.'),
      resource('cse1pe-cs50p', 'CS50 Python', 'https://cs50.harvard.edu/python/', 'course', 'Strong programming practice with clear problem sets.'),
      resource('cse1pe-python-docs', 'Official Python tutorial', 'https://docs.python.org/3/tutorial/', 'official-docs', 'Canonical Python reference for language basics.')
    ],
    finalChallenge: {
      title: 'Build a privacy-safe support data helper',
      brief: 'Use synthetic ticket data to parse categories, identify missing fields, and print a concise summary.',
      evidence: 'Python file, sample fake CSV, screenshot/text output, and a privacy note.'
    },
    certificationLinks: [
      {
        id: 'cse1pe-cert-python',
        certification: 'Python Institute PCEP / PCAP readiness',
        relevance: 'medium',
        explanation: 'The subject builds the entry-level Python foundations those certifications expect.'
      }
    ],
    recommendedNextAction: 'Start the first vertical slice with the synthetic ticket CSV summariser.'
  },
  {
    id: 'cse1oof',
    code: 'CSE1OOF',
    title: 'Object Oriented Programming Fundamentals',
    provider: 'La Trobe',
    track: 'RBC',
    level: 'undergraduate',
    stream: 'programming',
    yearLevel: '1',
    sourceType: 'SLG',
    sourceFileName: '2020-Sem2-CSE1OOF-BE_SLG.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 7,
    localSources: [
      {
        id: 'cse1oof-slg',
        fileName: '2020-Sem2-CSE1OOF-BE_SLG.pdf',
        path: 'RBC/CSE SLGs/2020-Sem2-CSE1OOF-BE_SLG.pdf',
        status: 'canonical'
      }
    ],
    summary:
      'Java and object-oriented foundations: classes, objects, control structures, arrays, Unix/Linux basics, libraries, coding standards, and testing.',
    topics: [
      {
        id: 'cse1oof-java-env',
        title: 'Java development environment and Unix basics',
        dcsConnection: 'Builds confidence with command-line tools and disciplined development habits.'
      },
      {
        id: 'cse1oof-objects',
        title: 'Objects, classes, methods, and arrays',
        dcsConnection: 'Helps model tickets, assets, rooms, and users as structured concepts.'
      },
      {
        id: 'cse1oof-testing',
        title: 'Testing plans and coding standards',
        dcsConnection: 'Translates directly into safer support checklists and script validation.'
      }
    ],
    silos: [
      {
        id: 'cse1oof-silo1',
        number: 1,
        text: 'Use an operating system and development environment to code, debug, and execute Java programs.',
        plainEnglish: 'Set up tools, run code, read errors, and make careful fixes.',
        masteryCriteria: ['Can run Java locally', 'Can interpret simple compiler/runtime errors', 'Can document the fix path'],
        practicePrompts: ['Run a basic Java console program.', 'Explain a compiler error without panic.'],
        quizItems: ['What is the difference between compile time and run time?', 'Why does a development environment matter?']
      },
      {
        id: 'cse1oof-silo2',
        number: 2,
        text: 'Analyse a problem and construct a logical solution suitable for a computer program.',
        plainEnglish: 'Turn a messy task into structured steps and objects.',
        masteryCriteria: ['Can describe the problem boundary', 'Can choose classes or functions', 'Can write pseudocode first'],
        practicePrompts: ['Model a synthetic asset register update as a small program.', 'Write pseudocode before Java.'],
        quizItems: ['What makes a solution implementable?', 'Why should analysis precede syntax?']
      },
      {
        id: 'cse1oof-silo3',
        number: 3,
        text: 'Develop a basic understanding of objects and classes.',
        plainEnglish: 'Understand how data and behaviour can belong together in a model.',
        masteryCriteria: ['Can explain class vs object', 'Can identify fields and methods', 'Can model a ticket or room'],
        practicePrompts: ['Design a SupportTicket class.', 'Create two room objects with different properties.'],
        quizItems: ['What is a class?', 'What is an object instance?']
      },
      {
        id: 'cse1oof-silo4',
        number: 4,
        text: 'Find and use existing Java components provided in code libraries.',
        plainEnglish: 'Use trusted library components instead of reinventing everything.',
        masteryCriteria: ['Can import a standard library class', 'Can read basic documentation', 'Can explain why reuse helps'],
        practicePrompts: ['Use a Java collection for support tickets.', 'Find documentation for a standard class.'],
        quizItems: ['Why use a library?', 'What does import do in Java?']
      },
      {
        id: 'cse1oof-silo5',
        number: 5,
        text: 'Write Java code that uses control structures, classes, and arrays.',
        plainEnglish: 'Combine conditions, loops, classes, and arrays to solve small tasks.',
        masteryCriteria: ['Can write a loop', 'Can store items in an array', 'Can use a class in a console task'],
        practicePrompts: ['Loop through fake asset records.', 'Count devices by room from sample objects.'],
        quizItems: ['When would an array be useful?', 'How do control structures shape program flow?']
      },
      {
        id: 'cse1oof-silo6',
        number: 6,
        text: 'Design and execute test plans.',
        plainEnglish: 'Prove that the program works for normal, edge, and incorrect inputs.',
        masteryCriteria: ['Can define test cases', 'Can test edge cases', 'Can record expected vs actual output'],
        practicePrompts: ['Write test cases for a fake onboarding checker.', 'Test invalid input deliberately.'],
        quizItems: ['What is an edge case?', 'Why is testing part of professional practice?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse1oof-bridge-automation',
        dcsArea: 'Programming / Automation',
        relevance: 'medium',
        explanation: 'Object thinking helps model support entities and test small internal tools.',
        relatedDcsModuleIds: ['new-user-onboarding', 'permissions-and-access-requests'],
        practicalOutput: 'Model a synthetic SupportTicket or DeviceAsset class.'
      }
    ],
    weeklyModules: cse1oofWeeklyModules,
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse1oof-task-ticket-class',
        title: 'SupportTicket Java model',
        description: 'Create a tiny Java class for a synthetic ticket and write basic test cases.',
        evidenceType: 'script',
        privacyReminder
      }
    ],
    resources: [
      resource('cse1oof-helsinki', 'University of Helsinki Java Programming MOOC', 'https://java-programming.mooc.fi/', 'course', 'Excellent Java and OOP practice course.'),
      resource('cse1oof-oracle', 'Oracle Java Tutorials', 'https://docs.oracle.com/javase/tutorial/', 'official-docs', 'Official Java language and library tutorials.'),
      resource('cse1oof-progit', 'Pro Git book', 'https://git-scm.com/book/en/v2', 'book', 'Supports disciplined version control for coding tasks.')
    ],
    finalChallenge: {
      title: 'Model a small school support domain',
      brief: 'Create Java classes for synthetic tickets, devices, or rooms and test basic behaviours.',
      evidence: 'Java source, test notes, and a short explanation of class/object choices.'
    },
    recommendedNextAction: 'After CSE1PE, use this to practise object modelling and testing.'
  },
  {
    id: 'cse1is',
    code: 'CSE1IS',
    title: 'Information Systems',
    provider: 'La Trobe',
    track: 'RBC',
    level: 'undergraduate',
    stream: 'systems',
    yearLevel: '1',
    sourceType: 'SLG',
    sourceFileName: '_.CSE1IS-BE-SLG-2018-Sem-2.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 5,
    localSources: [
      {
        id: 'cse1is-slg',
        fileName: '_.CSE1IS-BE-SLG-2018-Sem-2.pdf',
        path: 'RBC/CSE SLGs/_.CSE1IS-BE-SLG-2018-Sem-2.pdf',
        status: 'canonical'
      }
    ],
    summary:
      'Systems-development foundations covering information-system models, SDLC, fact finding, DFDs, system dictionaries, ER diagrams, UI critique, implementation, and security requirements.',
    topics: [
      {
        id: 'cse1is-system-models',
        title: 'Information-system models and SDLC',
        dcsConnection: 'Supports better understanding of Sentral, OurDCS/Schoolbox, PaperCut, and M365 as systems.'
      },
      {
        id: 'cse1is-requirements',
        title: 'Fact finding and requirements',
        dcsConnection: 'Improves support intake notes and reduces back-and-forth before escalation.'
      },
      {
        id: 'cse1is-data-models',
        title: 'DFDs, system dictionaries, and ER diagrams',
        dcsConnection: 'Helps map data flows and access boundaries without exposing real records.'
      }
    ],
    silos: [
      {
        id: 'cse1is-silo1',
        number: 1,
        text: 'Use a generalised model of an information system to describe a real-life system.',
        plainEnglish: 'Identify people, processes, data, technology, and controls in a school platform.',
        masteryCriteria: ['Can identify system components', 'Can explain user roles', 'Can document support boundaries'],
        practicePrompts: ['Map a parent portal request as an information system.', 'Identify users and data in PaperCut.'],
        quizItems: ['What are the parts of an information system?', 'Why is a school portal not just a website?']
      },
      {
        id: 'cse1is-silo2',
        number: 2,
        text: 'Describe the Systems Development Life Cycle approach to developing information systems.',
        plainEnglish: 'Understand how systems are planned, analysed, designed, implemented, and maintained.',
        masteryCriteria: ['Can name SDLC stages', 'Can locate support work in maintenance', 'Can explain change risk'],
        practicePrompts: ['Place a new access-request workflow in SDLC terms.', 'Explain why production changes need process.'],
        quizItems: ['What is the SDLC?', 'Which SDLC stage does incident support usually sit within?']
      },
      {
        id: 'cse1is-silo3',
        number: 3,
        text: 'Use fact-finding techniques to elicit requirements for a simple business scenario.',
        plainEnglish: 'Ask clean questions before assuming what the user needs.',
        masteryCriteria: ['Can write interview questions', 'Can separate need from solution', 'Can capture constraints'],
        practicePrompts: ['Write five questions for a missing-access request.', 'Separate symptom, impact, and requested outcome.'],
        quizItems: ['What is fact finding?', 'Why is "I need access" incomplete as a requirement?']
      },
      {
        id: 'cse1is-silo4',
        number: 4,
        text: 'Use context diagrams, data-flow diagrams, and a system dictionary to describe requirements.',
        plainEnglish: 'Represent how information moves through a system in a readable way.',
        masteryCriteria: ['Can draw a context boundary', 'Can label data flows', 'Can define terms consistently'],
        practicePrompts: ['Draw a context diagram for a fake parent portal issue.', 'Create a mini system dictionary.'],
        quizItems: ['What is a context diagram?', 'Why define terms in a system dictionary?']
      },
      {
        id: 'cse1is-silo5',
        number: 5,
        text: 'Use entity-relationship diagrams to design a database for a simple system.',
        plainEnglish: 'Model records and relationships before building storage or reports.',
        masteryCriteria: ['Can identify entities', 'Can identify relationships', 'Can avoid real personal data in examples'],
        practicePrompts: ['Model a fake equipment loan register.', 'Identify one-to-many relationships in sample data.'],
        quizItems: ['What is an entity?', 'What is a relationship in an ER diagram?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse1is-bridge-platforms',
        dcsArea: 'School Platforms',
        relevance: 'high',
        explanation: 'Directly helps understand and support Sentral, OurDCS/Schoolbox, PaperCut, and M365 workflows.',
        relatedDcsModuleIds: ['sentral-support', 'ourdcs-schoolbox-support', 'parent-portal-registration'],
        practicalOutput: 'Create a context diagram for a parent portal support workflow.'
      },
      {
        id: 'cse1is-bridge-professional',
        dcsArea: 'Professional Practice',
        relevance: 'medium',
        explanation: 'Better requirements capture reduces risky assumptions and sloppy escalations.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality'],
        practicalOutput: 'Write a requirements note template for access requests.'
      }
    ],
    weeklyModules: cse1isWeeklyModules,
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse1is-task-context-diagram',
        title: 'School platform context diagram',
        description: 'Map one synthetic school-platform support workflow into actors, data, system boundary, and support owner.',
        evidenceType: 'diagram',
        privacyReminder
      }
    ],
    resources: [
      resource('cse1is-open-textbook', 'Information Systems for Business and Beyond', 'https://open.umn.edu/opentextbooks/textbooks/information-systems-for-business-and-beyond', 'book', 'Open information-systems textbook with systems, data, process, and ethics coverage.'),
      resource('cse1is-sds', 'Microsoft School Data Sync overview', 'https://learn.microsoft.com/en-us/schooldatasync/school-data-sync-overview', 'official-docs', 'Education-specific example of identity, roster, and platform data integration.'),
      resource('cse1is-schoolbox', 'Schoolbox Help Centre', 'https://support.schoolbox.education/hc/en-us', 'official-docs', 'Useful public support context for OurDCS/Schoolbox-style workflows.')
    ],
    finalChallenge: {
      title: 'Map a school support workflow as an information system',
      brief: 'Use a synthetic parent portal or access request and produce a context diagram plus requirements notes.',
      evidence: 'Diagram, five fact-finding questions, and a privacy-safe support summary.'
    },
    recommendedNextAction: 'Build the first school-platform context diagram after the CSE1PE programming slice.'
  },
  {
    id: 'cse1icb',
    code: 'CSE1ICB',
    title: 'Introduction to Cybersecurity',
    provider: 'La Trobe',
    track: 'RBC',
    level: 'undergraduate',
    stream: 'cybersecurity',
    yearLevel: '1',
    sourceType: 'SLG',
    sourceFileName: 'Subject-Learning-Guide-CSE1ICB-BU-BE-2023.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 3,
    localSources: [
      {
        id: 'cse1icb-slg',
        fileName: 'Subject-Learning-Guide-CSE1ICB-BU-BE-2023.pdf',
        path: 'RBC/Year 1/Sem 1/2023-CSE1ICB(BE-1) - INTRODUCTION TO CYBERSECURITY/Subject-Learning-Guide-CSE1ICB-BU-BE-2023.pdf',
        status: 'canonical'
      }
    ],
    summary:
      'Cybersecurity foundations across practices, standards, safeguarding data/systems/networks, risk management, forensics, application security, network security, web security, and cryptography.',
    topics: [
      {
        id: 'cse1icb-threats',
        title: 'Threats, risks, and secure operations',
        dcsConnection: 'Supports phishing, suspicious login, device risk, and escalation judgement.'
      },
      {
        id: 'cse1icb-identity',
        title: 'Identity, access, and data security',
        dcsConnection: 'Connects strongly to M365 account support, MFA prompts, and least privilege.'
      },
      {
        id: 'cse1icb-network-app',
        title: 'Application, network, web security, and cryptography',
        dcsConnection: 'Helps identify when an issue may be security-sensitive rather than routine support.'
      }
    ],
    silos: [
      {
        id: 'cse1icb-silo1',
        number: 1,
        text: 'Describe key emerging cybersecurity practices, regulations, and standards.',
        plainEnglish: 'Know the language and frameworks used to talk about security risk and control.',
        masteryCriteria: ['Can explain CIA triad', 'Can name common control frameworks', 'Can connect controls to school risk'],
        practicePrompts: ['Map a school support scenario to confidentiality, integrity, and availability.', 'Explain why standards matter for escalation.'],
        quizItems: ['What is the CIA triad?', 'Why are standards useful when handling security incidents?']
      },
      {
        id: 'cse1icb-silo2',
        number: 2,
        text: 'Demonstrate foundation skills in safeguarding data, systems, and networks.',
        plainEnglish: 'Apply safe first-line habits: protect accounts, data, devices, and network access.',
        masteryCriteria: ['Can identify safe Level 1 actions', 'Can avoid overstepping admin boundaries', 'Can preserve evidence'],
        practicePrompts: ['Write a safe response to a suspicious MFA prompt.', 'List reversible first checks for a suspected compromised account.'],
        quizItems: ['What should be preserved before escalation?', 'Why should Level 1 avoid broad security changes without approval?']
      },
      {
        id: 'cse1icb-silo3',
        number: 3,
        text: 'Compare approaches for cyber risk management used to address real-world problems.',
        plainEnglish: 'Weigh likelihood, impact, controls, urgency, and escalation path.',
        masteryCriteria: ['Can compare risk responses', 'Can distinguish urgent from severe', 'Can write proportional notes'],
        practicePrompts: ['Compare reset, monitor, block, and escalate for a simulated login concern.', 'Rank security risks in a synthetic support queue.'],
        quizItems: ['What is risk impact?', 'What is a proportional security response?']
      },
      {
        id: 'cse1icb-silo4',
        number: 4,
        text: 'Identify approaches to digital forensics, application security, and network security in cyberspace.',
        plainEnglish: 'Recognise when evidence, app behaviour, or network boundaries matter.',
        masteryCriteria: ['Can identify forensic evidence types', 'Can spot app-security red flags', 'Can explain network segmentation at a high level'],
        practicePrompts: ['Write what not to touch when preserving evidence.', 'Explain why guest Wi-Fi should not reach internal services.'],
        quizItems: ['What is evidence preservation?', 'Why does segmentation matter?']
      },
      {
        id: 'cse1icb-silo5',
        number: 5,
        text: 'Show understanding of data security, web security, cryptography, and possible cyber-threat solutions.',
        plainEnglish: 'Explain how data is protected and why secure web/account practices matter.',
        masteryCriteria: ['Can explain encryption plainly', 'Can describe secure web signs', 'Can choose privacy-safe wording'],
        practicePrompts: ['Explain encryption to a staff member without jargon.', 'Write a privacy-safe ticket note for a web security concern.'],
        quizItems: ['What does encryption protect?', 'Why should sensitive ticket notes be minimal and factual?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse1icb-bridge-cyber',
        dcsArea: 'Cybersecurity',
        relevance: 'high',
        explanation: 'Directly supports phishing, MFA, suspicious-login, privacy, and incident-escalation judgement.',
        relatedDcsModuleIds: ['login-and-password-support', 'ticket-notes-escalation-quality'],
        practicalOutput: 'Create a privacy-safe security escalation note template.'
      },
      {
        id: 'cse1icb-bridge-m365',
        dcsArea: 'M365 / Cloud',
        relevance: 'high',
        explanation: 'Identity and access concepts support safe account and M365 troubleshooting.',
        relatedDcsModuleIds: ['m365-identity-offboarding-basics', 'permissions-and-access-requests'],
        practicalOutput: 'Create a suspicious-login triage checklist for supervised use.'
      }
    ],
    weeklyModules: cse1icbWeeklyModules,
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse1icb-task-security-note',
        title: 'Security-sensitive escalation note',
        description: 'Write a simulated escalation note that preserves evidence, avoids sensitive detail sprawl, and names the risk clearly.',
        evidenceType: 'case-note',
        privacyReminder
      }
    ],
    resources: [
      resource('cse1icb-nist', 'NIST Cybersecurity Framework', 'https://www.nist.gov/cyberframework', 'official-docs', 'Authoritative framework for cybersecurity risk language.'),
      resource('cse1icb-essential-eight', 'ACSC Essential Eight', 'https://www.cyber.gov.au/acsc/view-all-content/essential-eight', 'official-docs', 'Australian cyber baseline controls.'),
      resource('cse1icb-cisco', 'Cisco Networking Academy Introduction to Cybersecurity', 'https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html', 'course', 'Free beginner cyber learning path.')
    ],
    finalChallenge: {
      title: 'Triage a simulated security concern',
      brief: 'Respond to a fake suspicious-login or phishing case with scope, evidence, safe first actions, and escalation wording.',
      evidence: 'Triage checklist plus a privacy-safe escalation note.'
    },
    certificationLinks: [
      {
        id: 'cse1icb-cert-security-plus',
        certification: 'CompTIA Security+',
        relevance: 'high',
        explanation: 'Covers the SY0-701 objectives for threats, attacks, vulnerabilities, and security operations.'
      },
      {
        id: 'cse1icb-cert-isc2-cc',
        certification: 'ISC2 Certified in Cybersecurity (CC)',
        relevance: 'high',
        explanation: 'The subject provides a strong conceptual foundation for the ISC2 entry-level cybersecurity certification.'
      }
    ],
    recommendedNextAction: 'Build the security-sensitive escalation note template as the second vertical slice.'
  },
  {
    id: 'sta1dct',
    code: 'STA1DCT',
    title: 'Data-Based Critical Thinking',
    provider: 'La Trobe',
    track: 'RBC',
    level: 'undergraduate',
    stream: 'data',
    yearLevel: '1',
    sourceType: 'SLG',
    sourceFileName: 'STA1DCT_BU_BE_SLG_2023_Sem1.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 6,
    localSources: [
      {
        id: 'sta1dct-slg',
        fileName: 'STA1DCT_BU_BE_SLG_2023_Sem1.pdf',
        path: 'RBC/Year 1/Sem 1/2023-STA1DCT(BE-1_BU-1) - DATA-BASED CRITICAL THINKING/STA1DCT_BU_BE_SLG_2023_Sem1.pdf',
        status: 'canonical'
      }
    ],
    summary:
      'Data reasoning for everyday evidence: useful data, summaries, graphs, probability, decision-making, and common misinterpretations.',
    topics: [
      {
        id: 'sta1dct-data',
        title: 'Gathering useful data and turning data into information',
        dcsConnection: 'Supports honest reporting from DCSPrep progress and synthetic support categories.'
      },
      {
        id: 'sta1dct-probability',
        title: 'Probability and misconceptions',
        dcsConnection: 'Builds caution around overclaiming from small numbers or memorable incidents.'
      },
      {
        id: 'sta1dct-decisions',
        title: 'From data to decision-making',
        dcsConnection: 'Improves evidence-based PD planning and service-improvement notes.'
      }
    ],
    silos: [
      {
        id: 'sta1dct-silo1',
        number: 1,
        text: 'Critique data-based conclusions reported in media and similar outlets.',
        plainEnglish: 'Ask whether the evidence actually supports the claim.',
        masteryCriteria: ['Can identify claim vs evidence', 'Can spot missing context', 'Can avoid overclaiming'],
        practicePrompts: ['Critique a fake "IT issues are up" chart.', 'Write two alternative explanations for a trend.'],
        quizItems: ['What is the difference between a claim and evidence?', 'Why can a chart be technically true but misleading?']
      },
      {
        id: 'sta1dct-silo2',
        number: 2,
        text: 'Interpret or derive simple numeric and graphical statistical summaries of data.',
        plainEnglish: 'Use averages, counts, percentages, and graphs carefully.',
        masteryCriteria: ['Can compute simple summaries', 'Can read a graph accurately', 'Can choose a useful chart'],
        practicePrompts: ['Summarise synthetic ticket categories by count and percentage.', 'Choose a chart for monthly PD minutes.'],
        quizItems: ['When is a percentage misleading?', 'What does an outlier do to a mean?']
      },
      {
        id: 'sta1dct-silo3',
        number: 3,
        text: 'Calculate probabilities in scenarios that may be used for informed decision-making.',
        plainEnglish: 'Use probability to reason about uncertainty, not to pretend certainty.',
        masteryCriteria: ['Can calculate simple probabilities', 'Can explain uncertainty', 'Can avoid false precision'],
        practicePrompts: ['Estimate simple risk from repeated synthetic device failures.', 'Explain uncertainty in a short report.'],
        quizItems: ['What is probability?', 'Why should probability not be treated as a guarantee?']
      },
      {
        id: 'sta1dct-silo4',
        number: 4,
        text: 'Identify and discuss common probability misconceptions that can lead to poor decisions.',
        plainEnglish: 'Recognise bias, small samples, correlation mistakes, and memorable-event distortions.',
        masteryCriteria: ['Can explain correlation vs causation', 'Can identify small sample risk', 'Can name a bias'],
        practicePrompts: ['Explain why one bad week does not prove a long-term trend.', 'Identify confirmation bias in a fake report.'],
        quizItems: ['What does correlation not prove?', 'How can a small sample mislead?']
      }
    ],
    dcsBridges: [
      {
        id: 'sta1dct-bridge-data',
        dcsArea: 'Data / Reporting',
        relevance: 'high',
        explanation: 'Builds honest reporting habits for PD evidence, ticket trends, and support improvement claims.',
        relatedDcsModuleIds: ['evidence-pack', 'ticket-notes-escalation-quality'],
        practicalOutput: 'Create a short privacy-safe trend report from synthetic ticket data.'
      }
    ],
    weeklyModules: sta1dctWeeklyModules,
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'sta1dct-task-trend-report',
        title: 'Synthetic support trend report',
        description: 'Use a small fake dataset to produce a chart, a cautious interpretation, and one decision recommendation.',
        evidenceType: 'data-report',
        privacyReminder
      }
    ],
    resources: [
      resource('sta1dct-openintro', 'OpenIntro Statistics', 'https://open.umn.edu/opentextbooks/textbooks/60', 'book', 'Free statistics textbook for summaries, probability, and inference basics.'),
      resource('sta1dct-khan', 'Khan Academy Statistics and Probability', 'https://www.khanacademy.org/kmap/measurement-and-data-h/md224-statistics-and-probability', 'course', 'Practice-focused probability and statistics lessons.'),
      resource('sta1dct-statquest', 'StatQuest', 'https://statquest.org/about', 'youtube-channel', 'Clear visual explanations of statistics and ML concepts.')
    ],
    finalChallenge: {
      title: 'Interpret a support trend without overclaiming',
      brief: 'Analyse a synthetic month of support categories and write a careful summary with limitations.',
      evidence: 'Chart, summary, limitations, and next data question.'
    },
    certificationLinks: [
      {
        id: 'sta1dct-cert-data-plus',
        certification: 'CompTIA Data+',
        relevance: 'medium',
        explanation: 'The subject builds the foundational data literacy, visualisation, and interpretation skills expected in Data+.'
      },
      {
        id: 'sta1dct-cert-google-data',
        certification: 'Google Data Analytics Professional Certificate',
        relevance: 'medium',
        explanation: 'Provides a strong theoretical base for the practical data analysis skills covered in the Google certificate.'
      }
    ],
    recommendedNextAction: 'Use this after the CSE1PE CSV task so code and data reasoning reinforce each other.'
  },
  {
    id: 'cse3pe',
    code: 'CSE3PE',
    title: 'Professional Environment',
    provider: 'La Trobe',
    track: 'RBC',
    level: 'undergraduate',
    stream: 'professional-practice',
    yearLevel: '3',
    sourceType: 'SLG',
    sourceFileName: 'CSE3PE SLG_2018.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 4,
    localSources: [
      {
        id: 'cse3pe-slg',
        fileName: 'CSE3PE SLG_2018.pdf',
        path: 'RBC/CSE SLGs/CSE3PE SLG_2018.pdf',
        status: 'canonical'
      }
    ],
    summary:
      'Professional IT practice, ethical theory, legal/social issues, critical thinking, professional responsibility, and reflection.',
    topics: [
      {
        id: 'cse3pe-ethics',
        title: 'Ethical theory and IT dilemmas',
        dcsConnection: 'Supports careful decisions where access, privacy, urgency, and authority collide.'
      },
      {
        id: 'cse3pe-responsibility',
        title: 'Responsibilities to employers, clients, and society',
        dcsConnection: 'Fits school IT support where children, families, staff, and policies are involved.'
      },
      {
        id: 'cse3pe-reflection',
        title: 'Reflection in professional practice',
        dcsConnection: 'Turns mistakes and uncertainty into safer future support behaviour.'
      }
    ],
    silos: [
      {
        id: 'cse3pe-silo1',
        number: 1,
        text: 'Apply ethical theory to the resolution of ethical dilemmas in IT.',
        plainEnglish: 'Use more than instinct when a support request has privacy, safety, or authority tension.',
        masteryCriteria: ['Can identify stakeholders', 'Can name competing duties', 'Can justify escalation'],
        practicePrompts: ['Analyse a simulated request for access to information.', 'Explain why "technically possible" is not enough.'],
        quizItems: ['What is an ethical dilemma?', 'Why should IT decisions consider affected people?']
      },
      {
        id: 'cse3pe-silo2',
        number: 2,
        text: 'Develop a personal ethical framework for IT practice.',
        plainEnglish: 'Define practical principles for how you will act in school IT support.',
        masteryCriteria: ['Can state principles', 'Can apply them to a scenario', 'Can revise after reflection'],
        practicePrompts: ['Draft five principles for DCS IT support behaviour.', 'Apply one principle to a simulated ticket.'],
        quizItems: ['What belongs in a personal ethical framework?', 'How does a framework help under pressure?']
      },
      {
        id: 'cse3pe-silo3',
        number: 3,
        text: 'Investigate and analyse significant contemporary social, legal, and ethical issues in IT.',
        plainEnglish: 'Understand that IT support sits inside law, policy, culture, and human impact.',
        masteryCriteria: ['Can research an issue safely', 'Can separate fact from opinion', 'Can summarise implications'],
        practicePrompts: ['Summarise a privacy issue relevant to school IT.', 'Compare convenience with confidentiality.'],
        quizItems: ['Why does privacy law matter in school IT?', 'What makes a technology issue social as well as technical?']
      },
      {
        id: 'cse3pe-silo4',
        number: 4,
        text: 'Apply critical thinking to social, legal, and ethical IT issues.',
        plainEnglish: 'Reason carefully before acting, especially when information is sensitive.',
        masteryCriteria: ['Can identify assumptions', 'Can ask for authority', 'Can choose a safe next step'],
        practicePrompts: ['Identify assumptions in a simulated urgent request.', 'Write a safe clarification question.'],
        quizItems: ['What is an assumption?', 'Why is authority important for access changes?']
      },
      {
        id: 'cse3pe-silo5',
        number: 5,
        text: 'Appreciate responsibilities of IT professionals to employers, clients, and society.',
        plainEnglish: 'Balance service, confidentiality, safety, policy, and trust.',
        masteryCriteria: ['Can describe duty to employer', 'Can describe duty to users', 'Can preserve trust'],
        practicePrompts: ['Write a support response that is helpful without revealing private information.', 'List duties in a school support context.'],
        quizItems: ['Who are the stakeholders in school IT?', 'Why is trust part of technical work?']
      },
      {
        id: 'cse3pe-silo6',
        number: 6,
        text: 'Develop an appreciation of the importance of reflection in professional practice.',
        plainEnglish: 'Review decisions and mistakes so judgement improves over time.',
        masteryCriteria: ['Can write a useful reflection', 'Can name a next behaviour', 'Can avoid confidential detail'],
        practicePrompts: ['Write a privacy-safe reflection after a simulated support mistake.', 'Name one next behaviour to practise.'],
        quizItems: ['Why reflect after support work?', 'What must not be copied into a reflection?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse3pe-bridge-practice',
        dcsArea: 'Professional Practice',
        relevance: 'high',
        explanation: 'Central to privacy, role boundaries, sensitive support conversations, and reflective PD.',
        relatedDcsModuleIds: ['ticket-notes-escalation-quality', 'dcs-it-support-foundations'],
        practicalOutput: 'Draft a DCS IT professional conduct and reflection checklist.'
      }
    ],
    weeklyModules: cse3peWeeklyModules,
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse3pe-task-ethics-memo',
        title: 'Ethical decision memo',
        description: 'Write a short memo for a simulated access/privacy dilemma using stakeholders, risk, authority, and next step.',
        evidenceType: 'case-note',
        privacyReminder
      }
    ],
    resources: [
      resource('cse3pe-acm', 'ACM Code of Ethics', 'https://www.acm.org/code-of-ethics', 'official-docs', 'Widely used professional ethics reference for computing.'),
      resource('cse3pe-oaic', 'OAIC privacy guidance', 'https://www.oaic.gov.au/_old/privacy/guidance-and-advice', 'official-docs', 'Australian privacy guidance relevant to sensitive information handling.'),
      resource('cse3pe-acs', 'ACS Code of Professional Ethics article', 'https://ia.acs.org.au/article/2024/new-acs-code-of-professional-ethics-.html', 'official-docs', 'Australian professional context for ICT ethics.')
    ],
    finalChallenge: {
      title: 'Resolve a simulated school IT ethics dilemma',
      brief: 'Analyse a difficult access/privacy request and produce a safe, professional recommendation.',
      evidence: 'Ethical decision memo plus PD reflection.'
    },
    recommendedNextAction: 'Use this subject to improve the quality and safety of Academic PD reflections.'
  },
  {
    id: 'cse2cn',
    code: 'CSE2CN',
    title: 'Computer Networks',
    provider: 'La Trobe',
    track: 'RBC',
    level: 'undergraduate',
    stream: 'networking',
    yearLevel: '2',
    sourceType: 'Study Plan',
    sourceFileName: 'Study_Plan_Guide_RBC(IBL)_2019_s2_intake.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 12,
    localSources: [
      {
        id: 'cse2cn-study-plan',
        fileName: 'Study_Plan_Guide_RBC(IBL)_2019_s2_intake.pdf',
        path: 'RBC/Study_Plan_Guide_RBC(IBL)_2019_s2_intake.pdf',
        status: 'canonical',
        note: 'Subject appears in the study plan. Weekly modules populated from standard CCNA/Network+ curricula.'
      }
    ],
    summary:
      'Computer networking foundations covering OSI/TCP-IP models, switching, routing, wireless, security, and troubleshooting.',
    topics: [
      {
        id: 'cse2cn-models',
        title: 'Network models and services',
        dcsConnection: 'Supports DNS, DHCP, IP addressing, ports, protocols, and connectivity triage.'
      },
      {
        id: 'cse2cn-topology',
        title: 'Network devices and topology',
        dcsConnection: 'Useful for understanding room, switch, wireless, and segmentation symptoms.'
      },
      {
        id: 'cse2cn-troubleshooting',
        title: 'Network troubleshooting',
        dcsConnection: 'Direct link to Wi-Fi, gateway, DNS, DHCP, and guest/internal service questions.'
      }
    ],
    silos: [
      {
        id: 'cse2cn-silo1',
        number: 1,
        text: 'Explain core network services such as DNS, DHCP, IP addressing, and routing.',
        plainEnglish: 'Understand the essential services that make a network function.',
        masteryCriteria: ['Can explain DNS', 'Can explain DHCP', 'Can separate local vs web symptoms'],
        practicePrompts: ['Explain what DNS does in a classroom issue.', 'Compare one-device vs whole-room connectivity.'],
        quizItems: ['What does DHCP provide?', 'What does DNS resolve?']
      },
      {
        id: 'cse2cn-silo2',
        number: 2,
        text: 'Use network models to reason about connectivity issues.',
        plainEnglish: 'Think in layers: physical, network, service, application, account.',
        masteryCriteria: ['Can sequence layer checks', 'Can document scope', 'Can escalate with evidence'],
        practicePrompts: ['Order checks for "Wi-Fi connected, no portal access".', 'Write a layered escalation note.'],
        quizItems: ['Why does layer thinking help?', 'What does scope mean in networking?']
      },
      {
        id: 'cse2cn-silo3',
        number: 3,
        text: 'Identify safe Level 1 network checks and escalation boundaries.',
        plainEnglish: 'Know what to check and what not to change without approval.',
        masteryCriteria: ['Can name reversible checks', 'Can avoid firewall/policy changes', 'Can preserve observations'],
        practicePrompts: ['List safe checks for a BYOD Wi-Fi issue.', 'Explain when to escalate to Paul.'],
        quizItems: ['Name two reversible network checks.', 'Why should Level 1 not change firewall rules?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse2cn-bridge-networking',
        dcsArea: 'Networking',
        relevance: 'high',
        explanation: 'Connects directly to DCSPrep networking modules and builds professional networking literacy.',
        relatedDcsModuleIds: ['dns-dhcp-gateway-ip-basics', 'ports-and-protocols', 'vlans-network-segmentation'],
        practicalOutput: 'Create a network triage flow that separates device, room, service, and account scope.'
      }
    ],
    weeklyModules: cse2cnWeeklyModules,
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse2cn-task-triage-flow',
        title: 'Network triage flow',
        description: 'Create a privacy-safe, Level 1 network triage flow while noting that the actual CSE2CN SLG is missing.',
        evidenceType: 'diagram',
        privacyReminder
      }
    ],
    resources: [
      resource('cse2cn-cisco', 'Cisco Networking Academy', 'https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html', 'course', 'Free networking and cyber foundations.'),
      resource('cse2cn-ms-intune-edu', 'Set up Microsoft Intune for Education', 'https://learn.microsoft.com/en-gb/education/windows/tutorial-school-deployment/set-up-microsoft-intune', 'official-docs', 'Education device management context that depends on network access.'),
      resource('cse2cn-computerphile', 'Computerphile', 'https://www.youtube.com/user/Computerphile', 'youtube-channel', 'Accessible conceptual computing and networking explanations.')
    ],
    finalChallenge: {
      title: 'Create a Level 1 network support flow',
      brief: 'Build a flowchart for a simulated connectivity issue, clearly marking what belongs to Level 1 and what escalates.',
      evidence: 'Flowchart and escalation-note template.'
    },
    certificationLinks: [
      {
        id: 'cse2cn-cert-network-plus',
        certification: 'CompTIA Network+',
        relevance: 'high',
        explanation: 'Directly aligns with the N10-008/009 objectives for network architecture, operations, and security.'
      },
      {
        id: 'cse2cn-cert-ccna',
        certification: 'Cisco CCNA (200-301)',
        relevance: 'high',
        explanation: 'Provides the fundamental networking knowledge required for CCNA switching, routing, and wireless domains.'
      }
    ],
    recommendedNextAction: 'Keep this as a placeholder until the CSE2CN SLG is added to the RBC folder.'
  },
  {
    id: 'cse4002',
    code: 'CSE4002',
    title: 'Artificial Intelligence Fundamentals',
    provider: 'La Trobe',
    track: 'SMITB',
    level: 'masters',
    stream: 'ai',
    yearLevel: 'Master',
    sourceType: 'SLG',
    sourceFileName: 'SLG-2025-CSE4002-BU-1.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 8,
    localSources: [
      {
        id: 'cse4002-slg-2025',
        fileName: 'SLG-2025-CSE4002-BU-1.pdf',
        path: 'RBC/CSE SLGs/SLG-2025-CSE4002-BU-1.pdf',
        status: 'canonical'
      },
      {
        id: 'cse4002-slg-2024',
        fileName: 'SLG-2024-CSE4002-BE-1.pdf',
        path: 'RBC/CSE SLGs/SLG-2024-CSE4002-BE-1.pdf',
        status: 'duplicate'
      }
    ],
    summary:
      'AI foundations including state-space search, game playing, knowledge representation, logic, automated reasoning, expert systems, and basic machine learning.',
    topics: [
      {
        id: 'cse4002-search',
        title: 'Blind and heuristic search',
        dcsConnection: 'Models troubleshooting as an evidence-guided search through possible causes.'
      },
      {
        id: 'cse4002-knowledge',
        title: 'Knowledge representation and automated reasoning',
        dcsConnection: 'Supports rule-based triage flows and explainable support guidance.'
      },
      {
        id: 'cse4002-expert-systems',
        title: 'Expert systems and responsible AI',
        dcsConnection: 'Useful for building DCSPrep support helpers with clear boundaries and escalation rules.'
      }
    ],
    silos: [
      {
        id: 'cse4002-silo1',
        number: 1,
        text: 'Devise representations for state-space search and game playing to solve practical problems.',
        plainEnglish: 'Turn a problem into states, actions, goals, and search strategies.',
        masteryCriteria: ['Can define states/actions/goals', 'Can compare blind and heuristic search', 'Can map troubleshooting paths'],
        practicePrompts: ['Model a no-display classroom problem as a search tree.', 'Write a heuristic for narrowing causes safely.'],
        quizItems: ['What is a state in state-space search?', 'What makes a heuristic useful?']
      },
      {
        id: 'cse4002-silo2',
        number: 2,
        text: 'Represent knowledge using semantic networks, scripts, frames, and logic-based mechanisms.',
        plainEnglish: 'Structure knowledge so a system or person can reason with it.',
        masteryCriteria: ['Can choose a representation', 'Can explain tradeoffs', 'Can keep rules auditable'],
        practicePrompts: ['Represent a printer troubleshooting process as rules.', 'Compare a decision tree with a semantic network.'],
        quizItems: ['What is knowledge representation?', 'Why does explainability matter in school support?']
      },
      {
        id: 'cse4002-silo3',
        number: 3,
        text: 'Construct simple expert systems to solve real-world problems.',
        plainEnglish: 'Build rule-based guidance that asks questions and recommends safe next actions.',
        masteryCriteria: ['Can write rules', 'Can avoid unsafe recommendations', 'Can include escalation criteria'],
        practicePrompts: ['Design an expert-system flow for ViewBoard no-audio issues.', 'Add escalation triggers to a rule set.'],
        quizItems: ['What is an expert system?', 'Why should support expert systems include stop conditions?']
      },
      {
        id: 'cse4002-silo4',
        number: 4,
        text: 'Analyse and design basic machine learning algorithms to model a practical case.',
        plainEnglish: 'Understand what ML can and cannot infer from data.',
        masteryCriteria: ['Can distinguish rules from ML', 'Can name training data needs', 'Can identify governance risks'],
        practicePrompts: ['Compare keyword rules with ML categorisation for fake tickets.', 'Write one reason not to use ML on sensitive school data.'],
        quizItems: ['How is ML different from a fixed rule?', 'What data risks matter in school contexts?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse4002-bridge-ai',
        dcsArea: 'AI / Data Science',
        relevance: 'high',
        explanation: 'Grounds DCSPrep AI helpers in explicit reasoning, explainability, and safe boundaries.',
        relatedDcsModuleIds: ['knowledge-base-lab', 'ticket-notes-escalation-quality'],
        practicalOutput: 'Design a rule-based Level 1 triage expert system.'
      }
    ],
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse4002-task-expert-system',
        title: 'Rule-based triage helper',
        description: 'Design a small expert-system decision table for a simulated support issue with explicit escalation triggers.',
        evidenceType: 'diagram',
        privacyReminder
      }
    ],
    resources: [
      resource('cse4002-mit-ai', 'MIT OCW Artificial Intelligence 6.034', 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/', 'course', 'Classic AI course covering search, representation, and learning.'),
      resource('cse4002-aima', 'AIMA resources and code', 'https://aima.cs.berkeley.edu/2nd-ed/index.html', 'book', 'Standard AI textbook resources and code.'),
      resource('cse4002-azure-ai', 'Azure AI Fundamentals learning path', 'https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure', 'course', 'Practical Microsoft AI platform foundations.')
    ],
    finalChallenge: {
      title: 'Design a responsible Level 1 AI triage helper',
      brief: 'Represent a common support problem as rules/search, then write limits and escalation conditions.',
      evidence: 'Decision table, explanation, and responsible-use note.'
    },
    certificationLinks: [
      {
        id: 'cse4002-cert-ai900',
        certification: 'Microsoft Azure AI Fundamentals',
        relevance: 'medium',
        explanation: 'Useful introductory certification bridge for AI concepts and Azure AI services.'
      }
    ],
    recommendedNextAction: 'Build this after the cyber slice so AI helpers inherit strong safety boundaries.'
  },
  {
    id: 'cse5006',
    code: 'CSE5006',
    title: 'Cloud-Based Web Application',
    provider: 'La Trobe',
    track: 'SMITB',
    level: 'masters',
    stream: 'cloud',
    yearLevel: 'Master',
    sourceType: 'SLG',
    sourceFileName: 'CSE5006 - SLG - 2024 - S1-BE.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 9,
    localSources: [
      {
        id: 'cse5006-slg',
        fileName: 'CSE5006 - SLG - 2024 - S1-BE.pdf',
        path: 'RBC/CSE SLGs/CSE5006 - SLG - 2024 - S1-BE.pdf',
        status: 'canonical'
      }
    ],
    summary:
      'Cloud web application subject covering Git, Docker, JavaScript, React, ORMs, REST APIs, AWS S3, containers, and CI/CD pipelines.',
    topics: [
      {
        id: 'cse5006-git-docker',
        title: 'Git, Docker, and development workflow',
        dcsConnection: 'Improves maintainability of DCSPrep and privacy-safe internal tools.'
      },
      {
        id: 'cse5006-react-api',
        title: 'React, REST APIs, and backend requirements',
        dcsConnection: 'Directly supports app features such as Academic PD pages, source catalogues, and evidence export.'
      },
      {
        id: 'cse5006-cloud-cicd',
        title: 'Cloud storage, containers, and CI/CD',
        dcsConnection: 'Builds cloud literacy while reinforcing local-first privacy boundaries.'
      }
    ],
    silos: [
      {
        id: 'cse5006-silo1',
        number: 1,
        text: 'Design and develop web applications using JavaScript.',
        plainEnglish: 'Build interactive web features with maintainable JavaScript/TypeScript thinking.',
        masteryCriteria: ['Can implement UI state', 'Can keep components focused', 'Can test user-facing behaviour'],
        practicePrompts: ['Add a small Academic PD resource panel.', 'Explain what state belongs in a component.'],
        quizItems: ['What does client-side state control?', 'Why use TypeScript for app data?']
      },
      {
        id: 'cse5006-silo2',
        number: 2,
        text: 'Design and build a stateless web server based on cloud technologies.',
        plainEnglish: 'Understand request/response design and avoid hidden server memory assumptions.',
        masteryCriteria: ['Can explain statelessness', 'Can design a simple API', 'Can separate client and server concerns'],
        practicePrompts: ['Design an API route for subject metadata.', 'Explain why local progress stays client-side.'],
        quizItems: ['What does stateless mean?', 'Why is statelessness useful for scalable apps?']
      },
      {
        id: 'cse5006-silo3',
        number: 3,
        text: 'Design and customise backend web applications based on user requirements.',
        plainEnglish: 'Turn real needs into backend endpoints, validation, and storage choices.',
        masteryCriteria: ['Can write requirements', 'Can choose validation rules', 'Can explain storage tradeoffs'],
        practicePrompts: ['Write requirements for RBC source inventory.', 'Compare JSON, database, and localStorage for DCSPrep.'],
        quizItems: ['Why gather requirements before building?', 'What makes a storage choice appropriate?']
      },
      {
        id: 'cse5006-silo4',
        number: 4,
        text: 'Use modern software engineering tools to build and deploy robust code for scalable websites.',
        plainEnglish: 'Use Git, tests, builds, containers, and deployment pipelines responsibly.',
        masteryCriteria: ['Can run tests/build', 'Can explain CI/CD', 'Can keep secrets out of code'],
        practicePrompts: ['Add a test for Academic PD data coverage.', 'Explain what should never go in a repo.'],
        quizItems: ['What is CI/CD?', 'Why are tests part of deployment quality?']
      },
      {
        id: 'cse5006-silo5',
        number: 5,
        text: 'Investigate storage technologies to determine the optimal choice for a website.',
        plainEnglish: 'Choose storage based on privacy, scale, access, cost, and reliability.',
        masteryCriteria: ['Can compare storage options', 'Can include privacy constraints', 'Can justify a choice'],
        practicePrompts: ['Compare localStorage and database storage for PD progress.', 'Write a privacy note for academic resource tracking.'],
        quizItems: ['When is localStorage enough?', 'What privacy questions should storage decisions ask?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse5006-bridge-devops',
        dcsArea: 'Cloud / DevOps',
        relevance: 'high',
        explanation: 'Improves DCSPrep itself and builds safe cloud/web application judgement.',
        relatedDcsModuleIds: ['cloud-models-saas-paas-iaas-daas', 'knowledge-base-lab'],
        practicalOutput: 'Implement a small stateless Academic PD feature in DCSPrep.'
      }
    ],
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse5006-task-dcsprep-feature',
        title: 'DCSPrep Academic PD feature',
        description: 'Implement a small feature that improves the Academic PD module, then verify it with tests/build.',
        evidenceType: 'prototype',
        privacyReminder
      }
    ],
    resources: [
      resource('cse5006-docker', 'Docker Get Started', 'https://docs.docker.com/get-started/', 'official-docs', 'Core container concepts and workflow.'),
      resource('cse5006-react', 'React Learn', 'https://react.dev/learn', 'official-docs', 'Modern React fundamentals.'),
      resource('cse5006-next', 'Next.js Docs', 'https://nextjs.org/docs', 'official-docs', 'Framework documentation for the current app.'),
      resource('cse5006-aws', 'AWS Cloud Practitioner Essentials', 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', 'course', 'Cloud concepts and AWS service literacy.')
    ],
    finalChallenge: {
      title: 'Ship one Academic PD feature safely',
      brief: 'Build a small DCSPrep feature that improves Academic PD learning, then test and document it.',
      evidence: 'Code change, test/build result, and short implementation reflection.'
    },
    recommendedNextAction: 'Use this subject whenever Academic PD needs a real app upgrade.'
  },
  {
    id: 'cse5ml',
    code: 'CSE5ML',
    title: 'Machine Learning',
    provider: 'La Trobe',
    track: 'SMITB',
    level: 'masters',
    stream: 'ai',
    yearLevel: 'Master',
    sourceType: 'SLG',
    sourceFileName: 'CSE5ML 2024 T2 SLG.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 10,
    localSources: [
      {
        id: 'cse5ml-slg',
        fileName: 'CSE5ML 2024 T2 SLG.pdf',
        path: 'RBC/CSE SLGs/CSE5ML 2024 T2 SLG.pdf',
        status: 'canonical'
      }
    ],
    summary:
      'Machine learning concepts and applications for data analytics, regression, classification, neural networks, model design, evaluation, and time-series forecasting.',
    topics: [
      {
        id: 'cse5ml-basics',
        title: 'ML basics, regression, SVMs, and unsupervised learning',
        dcsConnection: 'Builds literacy for when simple statistics end and ML begins.'
      },
      {
        id: 'cse5ml-neural',
        title: 'Neural networks, CNNs, RNNs, and LSTMs',
        dcsConnection: 'Connects to advanced AI capabilities while keeping deployment caution visible.'
      },
      {
        id: 'cse5ml-evaluation',
        title: 'Evaluation and model comparison',
        dcsConnection: 'Prevents fake confidence from model outputs in school-support contexts.'
      }
    ],
    silos: [
      {
        id: 'cse5ml-silo1',
        number: 1,
        text: 'Explain associated concepts and applications of machine-learning techniques for data analytics.',
        plainEnglish: 'Understand what ML is for, when it helps, and when it is the wrong tool.',
        masteryCriteria: ['Can distinguish ML from rules', 'Can name common task types', 'Can state data needs'],
        practicePrompts: ['Compare manual rules and ML for fake ticket categories.', 'Explain why a tiny dataset is a weak ML basis.'],
        quizItems: ['What is supervised learning?', 'Why does training data quality matter?']
      },
      {
        id: 'cse5ml-silo2',
        number: 2,
        text: 'Critically identify major components and system design in neural networks for regression and classification.',
        plainEnglish: 'Know the basic parts of a neural model and how design choices affect outcomes.',
        masteryCriteria: ['Can name inputs/outputs/loss', 'Can explain classification vs regression', 'Can spot overfit risk'],
        practicePrompts: ['Label the parts of a simple neural network.', 'Choose regression or classification for a support trend problem.'],
        quizItems: ['What is a loss function?', 'How is regression different from classification?']
      },
      {
        id: 'cse5ml-silo3',
        number: 3,
        text: 'Analyse data to design, implement, and evaluate machine-learning techniques for real-world problem solving.',
        plainEnglish: 'Move from data to model to evaluation with skepticism and evidence.',
        masteryCriteria: ['Can split data conceptually', 'Can select a metric', 'Can discuss limitations'],
        practicePrompts: ['Design an evaluation plan for a fake ticket classifier.', 'Write a limitation statement for a model.'],
        quizItems: ['Why use a test set?', 'What does accuracy hide?']
      },
      {
        id: 'cse5ml-silo4',
        number: 4,
        text: 'Implement a neural network with different learning algorithms for time-series forecasting with real-world data.',
        plainEnglish: 'Understand sequence forecasting and why real-world deployment is harder than a demo.',
        masteryCriteria: ['Can explain time series', 'Can identify leakage risk', 'Can connect forecasts to decisions cautiously'],
        practicePrompts: ['Forecast fake weekly support counts and include uncertainty.', 'Name two deployment risks for forecasting.'],
        quizItems: ['What is a time series?', 'Why can forecasting support demand be risky?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse5ml-bridge-ai',
        dcsArea: 'AI / Data Science',
        relevance: 'medium',
        explanation: 'Useful for understanding AI/ML tools, but DCS use must remain privacy-safe and supervised.',
        relatedDcsModuleIds: ['knowledge-base-lab', 'evidence-pack'],
        practicalOutput: 'Evaluate a toy classifier on synthetic support categories and write limitations.'
      }
    ],
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse5ml-task-toy-classifier',
        title: 'Synthetic support category classifier',
        description: 'Train or outline a tiny classifier using fake data, then critique the limits and governance risks.',
        evidenceType: 'data-report',
        privacyReminder
      }
    ],
    resources: [
      resource('cse5ml-sklearn', 'scikit-learn getting started', 'https://sklearn.org/stable/getting_started.html', 'official-docs', 'Practical Python ML library documentation.'),
      resource('cse5ml-google', 'Google Machine Learning Crash Course', 'https://support.google.com/machinelearningeducation/answer/7652516', 'course', 'Accessible ML concepts with exercises.'),
      resource('cse5ml-statquest', 'StatQuest', 'https://statquest.org/about', 'youtube-channel', 'Strong visual explanations for ML and statistics.')
    ],
    finalChallenge: {
      title: 'Evaluate a toy ML support classifier',
      brief: 'Use synthetic categories to design or train a tiny classifier and write a model limitations note.',
      evidence: 'Notebook/script outline, evaluation summary, and privacy/governance note.'
    },
    recommendedNextAction: 'Use only after the data critical-thinking slice is in place.'
  },
  {
    id: 'cse5nlp',
    code: 'CSE5NLP',
    title: 'Natural Language Processing',
    provider: 'La Trobe',
    track: 'SMITB',
    level: 'masters',
    stream: 'ai',
    yearLevel: 'Master',
    sourceType: 'SLG',
    sourceFileName: 'CSE5NLP 2024 T3 SLG.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 11,
    localSources: [
      {
        id: 'cse5nlp-slg',
        fileName: 'CSE5NLP 2024 T3 SLG.pdf',
        path: 'RBC/CSE SLGs/CSE5NLP 2024 T3 SLG.pdf',
        status: 'canonical'
      }
    ],
    summary:
      'NLP foundations and applications including tokenisation, morphology, word sense, POS tagging, sentence analysis, text classification, clustering, recommendation, and information retrieval.',
    topics: [
      {
        id: 'cse5nlp-basic-tasks',
        title: 'Tokenisation, tagging, and sentence analysis',
        dcsConnection: 'Helps understand what an AI text helper is actually doing to support notes.'
      },
      {
        id: 'cse5nlp-pipelines',
        title: 'NLP pipelines, corpora, and lexical resources',
        dcsConnection: 'Supports privacy-safe classification of synthetic KB/ticket text.'
      },
      {
        id: 'cse5nlp-ir',
        title: 'Text classification, clustering, recommendation, and information retrieval',
        dcsConnection: 'Useful for better KB search and topic tagging inside DCSPrep.'
      }
    ],
    silos: [
      {
        id: 'cse5nlp-silo1',
        number: 1,
        text: 'Apply NLP subtasks including tokenisation, morphology, word sense, POS tagging, and sentence structure analysis.',
        plainEnglish: 'Break text into useful pieces and understand basic linguistic signals.',
        masteryCriteria: ['Can explain tokenisation', 'Can describe tagging', 'Can identify why text is messy'],
        practicePrompts: ['Tokenise a fake ticket note.', 'Show why abbreviations confuse text processing.'],
        quizItems: ['What is tokenisation?', 'Why is natural language ambiguous?']
      },
      {
        id: 'cse5nlp-silo2',
        number: 2,
        text: 'Describe and evaluate methods and algorithms used to process textual data.',
        plainEnglish: 'Compare rule, dictionary, statistical, and neural approaches to text.',
        masteryCriteria: ['Can compare approaches', 'Can pick evaluation criteria', 'Can name failure modes'],
        practicePrompts: ['Compare keyword rules and ML for fake ticket tags.', 'Write one false-positive risk.'],
        quizItems: ['What is a false positive in text classification?', 'Why evaluate NLP results?']
      },
      {
        id: 'cse5nlp-silo3',
        number: 3,
        text: 'Devise NLP pipelines using existing libraries, corpora, and lexical resources.',
        plainEnglish: 'Design a repeatable path from raw text to useful output.',
        masteryCriteria: ['Can describe pipeline steps', 'Can identify data sources', 'Can avoid sensitive data'],
        practicePrompts: ['Design a pipeline for synthetic KB article tagging.', 'Add a privacy gate to the pipeline.'],
        quizItems: ['What is an NLP pipeline?', 'Where should privacy review happen in a pipeline?']
      },
      {
        id: 'cse5nlp-silo4',
        number: 4,
        text: 'Evaluate NLP results for real-world tasks such as categorisation, clustering, recommendation, and information retrieval.',
        plainEnglish: 'Judge whether text outputs are useful, safe, and accurate enough.',
        masteryCriteria: ['Can choose metrics', 'Can inspect examples', 'Can write limitations'],
        practicePrompts: ['Evaluate fake KB search results.', 'Write limitations for a ticket categoriser.'],
        quizItems: ['Why inspect examples manually?', 'What makes a recommendation risky?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse5nlp-bridge-ai',
        dcsArea: 'AI / Data Science',
        relevance: 'medium',
        explanation: 'Supports safer text helpers for DCSPrep, but live support text must stay out of experiments.',
        relatedDcsModuleIds: ['knowledge-base-lab', 'ticket-notes-escalation-quality'],
        practicalOutput: 'Design a synthetic ticket tagging pipeline with a privacy gate.'
      }
    ],
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse5nlp-task-tagging-pipeline',
        title: 'Synthetic KB/ticket tagging pipeline',
        description: 'Design a simple NLP pipeline for fake support text and define privacy, evaluation, and failure checks.',
        evidenceType: 'diagram',
        privacyReminder
      }
    ],
    resources: [
      resource('cse5nlp-huggingface', 'Hugging Face course', 'https://huggingface.co/course', 'course', 'Practical modern NLP and transformer learning path.'),
      resource('cse5nlp-stanford', 'Stanford CS224N', 'https://web.stanford.edu/class/cs224n/index.html', 'course', 'Deep NLP university course and references.'),
      resource('cse5nlp-azure-ai', 'Azure AI services overview', 'https://learn.microsoft.com/en-us/azure/ai-studio/concepts/what-are-ai-services', 'official-docs', 'Cloud NLP, vision, speech, and search service context.')
    ],
    finalChallenge: {
      title: 'Design a privacy-safe support text classifier',
      brief: 'Create a pipeline for synthetic support notes and evaluate how it could fail.',
      evidence: 'Pipeline diagram, sample fake inputs/outputs, evaluation rubric, and privacy warning.'
    },
    recommendedNextAction: 'Use this when improving KB search or AI coaching prompts.'
  },
  {
    id: 'cse5dl',
    code: 'CSE5DL',
    title: 'Deep Learning',
    provider: 'La Trobe',
    track: 'SMITB',
    level: 'masters',
    stream: 'ai',
    yearLevel: 'Master',
    sourceType: 'SLG',
    sourceFileName: 'SLG CSE5DL 2024 Bundoora.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 13,
    localSources: [
      {
        id: 'cse5dl-slg',
        fileName: 'SLG CSE5DL 2024 Bundoora.pdf',
        path: 'RBC/CSE SLGs/SLG CSE5DL 2024 Bundoora.pdf',
        status: 'canonical'
      }
    ],
    summary:
      'Deep learning foundations and applications across computer vision, NLP, production deployment, scarce labels, GANs, reinforcement learning, and advanced architectures.',
    topics: [
      {
        id: 'cse5dl-foundations',
        title: 'Deep-learning foundations and practical PyTorch',
        dcsConnection: 'Builds literacy around modern AI systems without pretending a demo is production-safe.'
      },
      {
        id: 'cse5dl-production',
        title: 'Deployment and maintenance strategies',
        dcsConnection: 'Supports responsible thinking before using AI in school-support tools.'
      },
      {
        id: 'cse5dl-scarce-labels',
        title: 'Scarce labels, GANs, and advanced approaches',
        dcsConnection: 'Useful as cautionary literacy for AI claims and data limitations.'
      }
    ],
    silos: [
      {
        id: 'cse5dl-silo1',
        number: 1,
        text: 'Analyse advantages and disadvantages of traditional ML versus deep learning for industry problems.',
        plainEnglish: 'Know when deep learning is powerful and when it is unnecessary, risky, or opaque.',
        masteryCriteria: ['Can compare ML and DL', 'Can identify data/compute needs', 'Can explain opacity risk'],
        practicePrompts: ['Compare a rule system, ML model, and DL model for fake ticket triage.', 'List two reasons not to use DL at DCS casually.'],
        quizItems: ['When might deep learning be overkill?', 'Why does model opacity matter?']
      },
      {
        id: 'cse5dl-silo2',
        number: 2,
        text: 'Analyse an industry problem and recommend a suitable deep-learning algorithm.',
        plainEnglish: 'Match problem type to model family and justify the choice.',
        masteryCriteria: ['Can identify problem type', 'Can recommend a model class', 'Can justify limits'],
        practicePrompts: ['Choose a model type for a synthetic image classification problem.', 'Write a no-go note for sensitive data.'],
        quizItems: ['What problem types do CNNs often suit?', 'What should a recommendation include?']
      },
      {
        id: 'cse5dl-silo3',
        number: 3,
        text: 'Produce PyTorch code to implement deep-learning algorithms for computer vision and NLP problems.',
        plainEnglish: 'Understand the shape of practical deep-learning code.',
        masteryCriteria: ['Can identify tensors/datasets/model/training loop', 'Can run a toy example', 'Can explain output cautiously'],
        practicePrompts: ['Run or outline a tiny PyTorch classifier using public/sample data.', 'Explain a training loop in plain English.'],
        quizItems: ['What is a tensor?', 'What happens in a training loop?']
      },
      {
        id: 'cse5dl-silo4',
        number: 4,
        text: 'Propose deployment and maintenance strategies for deep-learning production systems in the cloud.',
        plainEnglish: 'Treat deployment as governance, monitoring, privacy, cost, and retraining work.',
        masteryCriteria: ['Can name monitoring needs', 'Can include privacy review', 'Can propose rollback/escalation'],
        practicePrompts: ['Write a deployment checklist for a local-only AI helper.', 'Name what must be monitored after release.'],
        quizItems: ['Why is deployment more than uploading a model?', 'What is model drift?']
      },
      {
        id: 'cse5dl-silo5',
        number: 5,
        text: 'Investigate approaches where labels are scarce.',
        plainEnglish: 'Understand weak supervision, transfer learning, and careful validation when labelled data is limited.',
        masteryCriteria: ['Can explain scarce labels', 'Can name transfer learning', 'Can describe validation risk'],
        practicePrompts: ['Explain why DCS support data labels may be unreliable.', 'Describe transfer learning without using private data.'],
        quizItems: ['What are labels in ML?', 'Why are scarce labels difficult?']
      },
      {
        id: 'cse5dl-silo6',
        number: 6,
        text: 'Design the architecture of a generative adversarial network that can generate realistic data.',
        plainEnglish: 'Understand generator/discriminator ideas and why synthetic data needs caution.',
        masteryCriteria: ['Can explain generator/discriminator roles', 'Can name misuse risks', 'Can separate synthetic from safe'],
        practicePrompts: ['Explain GANs with a simple analogy.', 'Write a warning about synthetic data and privacy.'],
        quizItems: ['What are the two main parts of a GAN?', 'Why can synthetic data still be risky?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse5dl-bridge-ai',
        dcsArea: 'AI / Data Science',
        relevance: 'medium',
        explanation: 'Advanced literacy for AI systems, with strong need for governance and privacy boundaries in schools.',
        relatedDcsModuleIds: ['knowledge-base-lab', 'evidence-pack'],
        practicalOutput: 'Write a responsible deployment checklist for a local-only AI training helper.'
      }
    ],
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse5dl-task-deployment-checklist',
        title: 'Responsible AI deployment checklist',
        description: 'Create a checklist for privacy, validation, monitoring, rollback, and human oversight for a hypothetical AI helper.',
        evidenceType: 'checklist',
        privacyReminder
      }
    ],
    resources: [
      resource('cse5dl-fastai', 'fast.ai Practical Deep Learning for Coders', 'https://course.fast.ai/', 'course', 'Practical deep-learning course with PyTorch, vision, NLP, and deployment.'),
      resource('cse5dl-pytorch', 'PyTorch tutorials', 'https://pytorch.org/tutorials/', 'official-docs', 'Official PyTorch learning resources.'),
      resource('cse5dl-book', 'Deep Learning book', 'https://www.deeplearningbook.org/', 'book', 'Foundational deep-learning textbook.')
    ],
    finalChallenge: {
      title: 'Write a responsible deep-learning deployment plan',
      brief: 'Use a hypothetical non-sensitive training helper and plan data, validation, privacy, monitoring, and rollback.',
      evidence: 'Deployment checklist and risk register.'
    },
    recommendedNextAction: 'Treat this as later-stage AI literacy after AI fundamentals, ML, NLP, and CV.'
  },
  {
    id: 'cse5cv',
    code: 'CSE5CV',
    title: 'Computer Vision',
    provider: 'La Trobe',
    track: 'SMITB',
    level: 'masters',
    stream: 'ai',
    yearLevel: 'Master',
    sourceType: 'SLG',
    sourceFileName: 'SLG-2023-CSE5CV-BU-2.pdf',
    sourceStatus: 'canonical',
    implementationPriority: 14,
    localSources: [
      {
        id: 'cse5cv-slg',
        fileName: 'SLG-2023-CSE5CV-BU-2.pdf',
        path: 'RBC/CSE SLGs/SLG-2023-CSE5CV-BU-2.pdf',
        status: 'canonical'
      }
    ],
    summary:
      'Computer vision from image fundamentals through features, filtering, classification, CNNs, detection, face recognition, video, pose, synthetic images, Azure vision, and AR/VR applications.',
    topics: [
      {
        id: 'cse5cv-image-processing',
        title: 'Image features, histograms, filtering, and classification',
        dcsConnection: 'Useful for understanding visual inspection tools and image-quality problems.'
      },
      {
        id: 'cse5cv-detection',
        title: 'CNNs, detection, face recognition, video, and pose',
        dcsConnection: 'Requires strong privacy caution in any school context.'
      },
      {
        id: 'cse5cv-applications',
        title: 'Azure vision, AR/VR, multimedia, and graphics',
        dcsConnection: 'Supports advanced literacy for classroom media tools and AI services.'
      }
    ],
    silos: [
      {
        id: 'cse5cv-silo1',
        number: 1,
        text: 'Critique image-processing techniques for basic computer-vision tasks and design issues.',
        plainEnglish: 'Understand what image-processing steps do and where they fail.',
        masteryCriteria: ['Can explain filtering', 'Can critique contrast/denoising choices', 'Can name design issues'],
        practicePrompts: ['Compare two ways to improve a blurry sample image.', 'List risks of relying on poor-quality images.'],
        quizItems: ['What is image filtering?', 'Why does image quality affect recognition?']
      },
      {
        id: 'cse5cv-silo2',
        number: 2,
        text: 'Implement and analyse statistical and machine-learning models for advanced computer-vision tasks.',
        plainEnglish: 'Use models for classification/detection and evaluate whether results are trustworthy.',
        masteryCriteria: ['Can describe feature extraction', 'Can explain evaluation metrics', 'Can identify bias/privacy risks'],
        practicePrompts: ['Evaluate a toy classifier on public/sample images.', 'Write a privacy warning for vision data.'],
        quizItems: ['What is feature extraction?', 'Why can face recognition be sensitive?']
      },
      {
        id: 'cse5cv-silo3',
        number: 3,
        text: 'Design, implement, and evaluate a machine-vision model to recognise visual concepts from images.',
        plainEnglish: 'Build a small vision model using appropriate, non-sensitive image categories.',
        masteryCriteria: ['Can define labels', 'Can choose public/sample data', 'Can evaluate results'],
        practicePrompts: ['Design a cable/port image classifier using non-person sample images.', 'Write a limitations note.'],
        quizItems: ['What are labels in image classification?', 'Why avoid people images in DCS experiments?']
      },
      {
        id: 'cse5cv-silo4',
        number: 4,
        text: 'Analyse a real-world problem and investigate computer-vision approaches to provide an optimal solution.',
        plainEnglish: 'Choose whether vision is appropriate and justify safe alternatives.',
        masteryCriteria: ['Can define problem scope', 'Can compare approaches', 'Can recommend not using CV where risky'],
        practicePrompts: ['Analyse whether CV should be used for classroom support evidence.', 'Recommend non-CV alternatives for sensitive tasks.'],
        quizItems: ['When is computer vision inappropriate?', 'What should an optimal solution consider besides accuracy?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse5cv-bridge-ai',
        dcsArea: 'AI / Data Science',
        relevance: 'low',
        explanation: 'Useful advanced literacy, but school privacy makes live people/image use unsuitable for casual PD experiments.',
        relatedDcsModuleIds: ['classroom-display-viewboard-troubleshooting', 'knowledge-base-lab'],
        practicalOutput: 'Build a non-person visual troubleshooting aid for cables, ports, or display states.'
      }
    ],
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse5cv-task-vision-aid',
        title: 'Non-person visual troubleshooting aid',
        description: 'Design a small visual guide or toy classifier concept using non-sensitive cable, port, or device-state images.',
        evidenceType: 'prototype',
        privacyReminder
      }
    ],
    resources: [
      resource('cse5cv-cs231n', 'Stanford CS231n', 'https://cs231n.stanford.edu/2019/', 'course', 'Deep computer-vision course focused on visual recognition.'),
      resource('cse5cv-opencv', 'OpenCV Bootcamp', 'https://opencv.org/get-started/', 'course', 'Practical image/video processing course.'),
      resource('cse5cv-viewsonic', 'ViewSonic ViewBoard troubleshooting', 'https://manuals.viewsonic.com/ViewBoard_Troubleshooting', 'official-docs', 'Directly relevant to DCS classroom display support patterns.')
    ],
    finalChallenge: {
      title: 'Critique a computer-vision support idea',
      brief: 'Choose a non-sensitive vision use case and explain the design, limits, privacy risks, and safer alternatives.',
      evidence: 'Concept note, image/data policy note, and evaluation criteria.'
    },
    recommendedNextAction: 'Keep this advanced and privacy-cautious; use non-person examples only.'
  },
  {
    id: 'cse5bdc',
    code: 'CSE5BDC',
    title: 'Big Data Management on the Cloud',
    provider: 'La Trobe',
    track: 'SMITB',
    level: 'masters',
    stream: 'cloud',
    yearLevel: 'Master',
    sourceType: 'SLG',
    sourceFileName: 'SLG CSE5BDC.pdf',
    sourceStatus: 'manual-check',
    implementationPriority: 15,
    localSources: [
      {
        id: 'cse5bdc-slg',
        fileName: 'SLG CSE5BDC.pdf',
        path: 'RBC/CSE SLGs/SLG CSE5BDC.pdf',
        status: 'manual-check',
        note: 'The file name says CSE5BDC, while extraction reported CSE3BDC. Verify official code before treating as final.'
      }
    ],
    summary:
      'Cloud and big-data analytics: AWS, MapReduce, Hadoop, Pig, Hive, YARN, streams, graph analytics, Spark, Spark SQL, NoSQL stores, and scalable architecture.',
    topics: [
      {
        id: 'cse5bdc-cloud',
        title: 'Cloud architecture and AWS fundamentals',
        dcsConnection: 'Builds literacy for SaaS/cloud support and cloud storage discussions.'
      },
      {
        id: 'cse5bdc-hadoop',
        title: 'MapReduce, Hadoop, Hive, and YARN',
        dcsConnection: 'Mostly advanced, but sharpens data-pipeline thinking for aggregate reporting.'
      },
      {
        id: 'cse5bdc-spark',
        title: 'Spark, Spark SQL, streams, graph analytics, and NoSQL',
        dcsConnection: 'Useful for understanding scalable analytics without applying it to private school data.'
      }
    ],
    silos: [
      {
        id: 'cse5bdc-silo1',
        number: 1,
        text: 'Apply AWS knowledge to design a cloud-based solution for a given application scenario.',
        plainEnglish: 'Choose cloud services based on requirements, risk, cost, and maintainability.',
        masteryCriteria: ['Can explain cloud architecture', 'Can identify service roles', 'Can include privacy constraints'],
        practicePrompts: ['Design a privacy-safe synthetic PD analytics pipeline.', 'Compare local and cloud storage for DCSPrep.'],
        quizItems: ['Why use cloud services?', 'What privacy questions belong in cloud design?']
      },
      {
        id: 'cse5bdc-silo2',
        number: 2,
        text: 'Implement fundamental cloud-based services using AWS interfaces.',
        plainEnglish: 'Understand the shape of basic cloud service setup and operation.',
        masteryCriteria: ['Can describe S3-style storage', 'Can name access-control needs', 'Can avoid live sensitive data'],
        practicePrompts: ['Describe a fake object-storage setup for public training assets.', 'Write an access-control caution note.'],
        quizItems: ['What is object storage?', 'Why is access control central in cloud work?']
      },
      {
        id: 'cse5bdc-silo3',
        number: 3,
        text: 'Analyse the internals of the MapReduce framework.',
        plainEnglish: 'Understand split, map, shuffle, reduce, and why scale changes design.',
        masteryCriteria: ['Can explain map/reduce stages', 'Can identify parallelism', 'Can connect scale to complexity'],
        practicePrompts: ['Explain map/reduce using synthetic ticket counts.', 'Identify what can be parallelised.'],
        quizItems: ['What does map do?', 'What does reduce do?']
      },
      {
        id: 'cse5bdc-silo4',
        number: 4,
        text: 'Solve big-data analytics problems using the Hadoop ecosystem.',
        plainEnglish: 'Use big-data tools conceptually for large datasets, while knowing most DCS tasks are smaller.',
        masteryCriteria: ['Can name Hadoop ecosystem tools', 'Can avoid overengineering', 'Can choose simpler tools when suitable'],
        practicePrompts: ['Explain why spreadsheet/Python may be enough for DCSPrep data.', 'Name when big-data tools might be justified.'],
        quizItems: ['Why avoid overengineering?', 'What is Hadoop used for?']
      },
      {
        id: 'cse5bdc-silo5',
        number: 5,
        text: 'Analyse performance benefits of contrasting NoSQL stores.',
        plainEnglish: 'Compare storage models by access patterns and scale.',
        masteryCriteria: ['Can compare relational and NoSQL at a high level', 'Can identify access patterns', 'Can include governance'],
        practicePrompts: ['Compare JSON/localStorage/database for Academic PD data.', 'Write a storage decision note.'],
        quizItems: ['What is an access pattern?', 'Why does storage choice depend on queries?']
      }
    ],
    dcsBridges: [
      {
        id: 'cse5bdc-bridge-cloud',
        dcsArea: 'Cloud / DevOps',
        relevance: 'medium',
        explanation: 'Useful for advanced cloud/data literacy, but most school support reporting should stay simple and privacy-safe.',
        relatedDcsModuleIds: ['cloud-models-saas-paas-iaas-daas', 'evidence-pack'],
        practicalOutput: 'Design a privacy-safe aggregate PD analytics pipeline, not a live student/staff data pipeline.'
      }
    ],
    learningModes: defaultLearningModes,
    practicalTasks: [
      {
        id: 'cse5bdc-task-pipeline',
        title: 'Privacy-safe aggregate analytics pipeline',
        description: 'Design a cloud/big-data style pipeline for synthetic or DCSPrep-only aggregate data, then state why live data is out of scope.',
        evidenceType: 'diagram',
        privacyReminder
      }
    ],
    resources: [
      resource('cse5bdc-spark-docs', 'Apache Spark documentation', 'https://spark.apache.org/documentation', 'official-docs', 'Official Spark setup and programming guides.'),
      resource('cse5bdc-spark-quick', 'Apache Spark quick start', 'https://spark.apache.org/docs/3.5.7/quick-start.html', 'official-docs', 'Hands-on introduction to Spark concepts.'),
      resource('cse5bdc-databricks', 'Databricks free training', 'https://docs.databricks.com/aws/en/getting-started/free-training', 'course', 'Free data engineering and Spark learning resources.')
    ],
    finalChallenge: {
      title: 'Design a privacy-safe support analytics architecture',
      brief: 'Design a conceptual pipeline for aggregate, non-sensitive support learning data and justify storage/tool choices.',
      evidence: 'Architecture diagram, storage comparison, and privacy boundary note.'
    },
    recommendedNextAction: 'Verify the subject code mismatch before building detailed quizzes.'
  }
];

export function getAcademicSubjectByCode(subjectCode: string) {
  return academicSubjects.find((subject) => subject.code.toLowerCase() === subjectCode.toLowerCase());
}

export function getAcademicTrackSubjects(track: AcademicSubject['track'], subjects = academicSubjects) {
  return subjects.filter((subject) => subject.track === track);
}

export function getAcademicWeeklyModules(subject: AcademicSubject): AcademicWeeklyModule[] {
  if (subject.weeklyModules?.length) {
    return subject.weeklyModules.map((module) => ({
      ...module,
      resources: module.resources.length ? module.resources : subject.resources.slice(0, 3)
    }));
  }

  return subject.topics.map((topic, index) => {
    const week = index + 1;
    const primarySilo = subject.silos[index % subject.silos.length];
    const bridge = subject.dcsBridges[index % subject.dcsBridges.length];

    return {
      id: `${subject.id}-week-${week}-${topic.id}`,
      week,
      title: `Week ${week} - Topic ${week}: ${topic.title}`,
      deliveryModes: ['Self-directed study', 'Applied DCS reflection'],
      overview: `Study ${topic.title.toLowerCase()} through the subject SILOs, then connect it to a practical DCS IT support scenario.`,
      siloIds: primarySilo ? [primarySilo.id] : [],
      dcsConnections: [topic.dcsConnection, bridge?.explanation].filter(
        (connection): connection is string => Boolean(connection)
      ),
      internalLinks: [
        internalLink(
          `${subject.id}-week-${week}-bridge`,
          'DCS bridge view',
          '/academic-pd/bridge',
          'Compare this topic with related DCS capability areas.'
        ),
        internalLink(
          `${subject.id}-week-${week}-pd-log`,
          'PD log',
          '/pd-log',
          'Record the weekly study and evidence artifact as professional development.'
        ),
        internalLink(
          `${subject.id}-week-${week}-evidence-pack`,
          'Evidence pack',
          '/evidence-pack',
          'Export a privacy-safe summary after completing the weekly artifact.'
        )
      ],
      resources: subject.resources.slice(0, 3),
      assessments: [
        {
          id: `${subject.id}-week-${week}-quick-check`,
          title: 'Weekly quick check',
          kind: 'quick-check',
          prompt: `Explain ${topic.title.toLowerCase()} in plain English and describe one privacy-safe way it could improve DCS IT support work.`,
          successCriteria: [
            'Explains the topic without jargon hiding confusion',
            'Connects the concept to a realistic DCS support pattern',
            'Names a privacy boundary or data-safety constraint'
          ],
          siloIds: primarySilo ? [primarySilo.id] : [],
          minutes: 15,
          evidenceType: 'reflection',
          dcsApplication: topic.dcsConnection
        },
        {
          id: `${subject.id}-week-${week}-applied-task`,
          title: 'Weekly applied artifact',
          kind: 'applied-task',
          prompt: `Create one small artifact for ${topic.title.toLowerCase()}: a checklist, diagram, script, report, prototype, or reflection based on synthetic information only.`,
          successCriteria: [
            'Produces a concrete artifact',
            'Uses no live student, staff, parent, credential, or incident details',
            'Links the artifact back to at least one SILO'
          ],
          siloIds: primarySilo ? [primarySilo.id] : [],
          minutes: 30,
          evidenceType: subject.practicalTasks[0]?.evidenceType ?? 'reflection',
          dcsApplication: bridge?.practicalOutput ?? topic.dcsConnection
        }
      ]
    };
  });
}

export function getAcademicSourceSummary(subjects = academicSubjects) {
  return subjects.reduce(
    (summary, subject) => {
      summary[subject.sourceStatus] += 1;
      return summary;
    },
    {
      canonical: 0,
      duplicate: 0,
      'manual-check': 0,
      placeholder: 0
    } as Record<AcademicSubject['sourceStatus'], number>
  );
}

export function getAcademicCatalogueStats(subjects = academicSubjects) {
  const silos = subjects.reduce((sum, subject) => sum + subject.silos.length, 0);
  const practicalTasks = subjects.reduce((sum, subject) => sum + subject.practicalTasks.length, 0);
  const resources = subjects.reduce((sum, subject) => sum + subject.resources.length, 0);
  const weeklyModules = subjects.reduce((sum, subject) => sum + getAcademicWeeklyModules(subject).length, 0);
  const weeklyAssessments = subjects.reduce(
    (sum, subject) => sum + getAcademicWeeklyModules(subject).reduce((total, module) => total + module.assessments.length, 0),
    0
  );
  const highRelevanceBridges = subjects.reduce(
    (sum, subject) => sum + subject.dcsBridges.filter((bridge) => bridge.relevance === 'high').length,
    0
  );

  return {
    subjects: subjects.length,
    silos,
    practicalTasks,
    resources,
    weeklyModules,
    weeklyAssessments,
    highRelevanceBridges
  };
}

export function getRecommendedAcademicBuildPath(limit = 4, subjects = academicSubjects) {
  return subjects
    .filter((subject) => typeof subject.implementationPriority === 'number')
    .sort((left, right) => (left.implementationPriority ?? 999) - (right.implementationPriority ?? 999))
    .slice(0, limit);
}
