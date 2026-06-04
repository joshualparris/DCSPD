import { mcq, shortAnswer, buildSections, buildFlashcards, buildScenarioPrompts, buildPracticalOutputs, createModule, reviewSchedule } from './helpers';

export const mspModules = [
  createModule({
    id: 'msp-foundations',
    title: 'MSP Support Foundations',
    description: 'Transitioning from internal IT to Managed Services. Focus on billable time, multi-tenancy, and client SLAs.',
    domain: 'Foundations',
    level: 'L1',
    targetEnvironment: 'MSP',
    estimatedMinutes: 20,
    tags: ['MSP', 'SLA', 'billable time', 'multi-tenancy'],
    learningObjectives: [
      'Understand the difference between internal IT and MSP business models.',
      'Explain the importance of accurate time tracking and billable work.',
      'Recognise Service Level Agreements (SLAs) and their impact on ticket priority.'
    ],
    dcsRelevance: [
      'Builds on the "support-first" mindset but adds commercial accountability.'
    ],
    mspRelevance: [
      'Foundational knowledge for any MSP technician.',
      'Connects technical work to business value and client satisfaction.'
    ],
    sections: buildSections('msp-foundations', [
      {
        title: 'The MSP Business Model',
        bodyMarkdown: 'Unlike internal IT, an MSP sells technical expertise and uptime as a service. Every hour spent must be accounted for, either as billable to a client or as part of a managed service contract.',
        takeaway: 'Your time is the product.'
      },
      {
        title: 'SLAs: The Client Promise',
        bodyMarkdown: 'A Service Level Agreement (SLA) defines the expected response and resolution times for different ticket priorities. Missing an SLA can have financial or legal consequences for the MSP.',
        takeaway: 'Priorities are defined by contracts, not just feelings.'
      },
      {
        title: 'Billable Work and Time Entries',
        bodyMarkdown: 'MSP work is not just about fixing issues; it is also about accurately describing what was done and why. That enables consistent billing and prevents disputes.',
        takeaway: 'Write the work once, then bill it once.'
      }
    ]),
    flashcards: buildFlashcards('msp-foundations', [
      ['What is the primary product of an MSP?', 'Technical expertise and managed uptime (Time).'],
      ['What does SLA stand for?', 'Service Level Agreement.'],
      ['Why is time tracking critical in an MSP?', 'To ensure accurate billing and prove value to clients.']
    ]),
    quiz: [
      mcq({
        id: 'msp-f-q1',
        prompt: 'Which of the following best describes "Multi-tenancy" in an MSP context?',
        domain: 'Foundations',
        difficulty: 'foundation',
        explanation: 'Multi-tenancy is the core of MSP operations.',
        modelAnswer: 'Managing multiple separate client environments (tenants) using shared tools and staff.',
        commonMistakes: ['Thinking it means one client with many offices'],
        reviewSchedule,
        recommendedModuleId: 'msp-foundations',
        weakTopic: 'msp-business',
        options: [
          { id: 'a', label: 'Managing many users in one school' },
          { id: 'b', label: 'Managing many separate clients using the same support team' },
          { id: 'c', label: 'Renting out office space to other IT companies' },
          { id: 'd', label: 'Having multiple internet connections for one building' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'msp-f-q2',
        prompt: 'Why is "What changed?" still the most important question in an MSP environment?',
        domain: 'Foundations',
        difficulty: 'foundation',
        explanation: 'The triage pattern remains the same, even if the client changes.',
        modelAnswer: 'Because most issues are caused by recent changes to the environment, and identifying the change leads directly to the cause, saving billable time.',
        reviewSchedule,
        recommendedModuleId: 'msp-foundations',
        weakTopic: 'triage',
        rubric: ['Links change to cause', 'Mentions efficiency or time saving'],
        keywordHints: ['change', 'cause', 'time', 'efficiency']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('msp-foundations', [
      {
        title: 'SLA awareness prompt',
        prompt: 'Explain why response time matters to an MSP client and how it affects future service delivery.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('msp-foundations', [
      {
        title: 'SLA action plan',
        description: 'Draft a short plan for how you would honour SLA response and resolution commitments for a new MSP client.'
      }
    ])
  }),
  createModule({
    id: 'msp-stack-rmm-psa',
    title: 'The MSP Stack: RMM & PSA',
    description: 'Introduction to the core tools used to manage multiple clients efficiently.',
    domain: 'Operations',
    level: 'L1',
    targetEnvironment: 'MSP',
    estimatedMinutes: 25,
    tags: ['RMM', 'PSA', 'automation', 'monitoring'],
    learningObjectives: [
      'Define RMM (Remote Monitoring and Management) and its core functions.',
      'Define PSA (Professional Services Automation) and how it handles tickets and billing.',
      'Explain how documentation tools (ITGlue, Hudu) differ from internal wikis.'
    ],
    dcsRelevance: [
      'Replaces school-specific tools with industry-standard management platforms.'
    ],
    mspRelevance: [
      'Essential for remote support and automated maintenance across hundreds of devices.'
    ],
    sections: buildSections('msp-stack', [
      {
        title: 'RMM: Your Eyes and Hands',
        bodyMarkdown: 'RMM tools (like NinjaOne, Datto RMM, or Kaseya) allow you to monitor health, deploy patches, and remote into machines across all clients from a single dashboard.',
        takeaway: 'RMM = Remote Management.'
      },
      {
        title: 'PSA: The Business Engine',
        bodyMarkdown: 'PSA tools (like ConnectWise Manage or Autotask) handle the ticketing, time entries, and client billing. It is where you "live" your work day.',
        takeaway: 'PSA = Ticketing & Billing.'
      },
      {
        title: 'Documentation and Playbooks',
        bodyMarkdown: 'A managed service needs shared knowledge repositories across clients. Good documentation reduces repeated work and helps handoffs stay smooth.',
        takeaway: 'Document once, reuse across clients.'
      }
    ]),
    flashcards: buildFlashcards('msp-stack', [
      ['What does RMM stand for?', 'Remote Monitoring and Management.'],
      ['What does PSA stand for?', 'Professional Services Automation.'],
      ['Name a common RMM tool.', 'NinjaOne, Datto RMM, Kaseya, Syncro.']
    ]),
    quiz: [
      mcq({
        id: 'msp-stack-q1',
        prompt: 'Which system is mainly used for tracking ticket status, time, and billing in an MSP?',
        domain: 'Operations',
        difficulty: 'foundation',
        explanation: 'PSA is the ticketing and billing hub in MSP workflows.',
        modelAnswer: 'PSA (Professional Services Automation).',
        commonMistakes: ['Confusing RMM with ticketing or billing tools'],
        reviewSchedule,
        recommendedModuleId: 'msp-stack-rmm-psa',
        weakTopic: 'tool-discipline',
        options: [
          { id: 'a', label: 'RMM' },
          { id: 'b', label: 'PSA' },
          { id: 'c', label: 'ITSM' },
          { id: 'd', label: 'LDAP' }
        ],
        correctOptionId: 'b'
      })
    ],
    scenarioPrompts: buildScenarioPrompts('msp-stack-rmm-psa', [
      {
        title: 'RMM versus PSA decision prompt',
        prompt: 'Describe when you should use RMM automation and when you should update PSA ticket notes instead.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('msp-stack-rmm-psa', [
      {
        title: 'RMM/PSA checklist',
        description: 'List three checks you would perform in RMM and three entries you would make in PSA after a client alert.'
      }
    ])
  }),
  createModule({
    id: 'msp-ticket-triage-escalation',
    title: 'MSP Ticket Triage & Escalation',
    description: 'Triage client tickets with contract-aware scope, evidence, and correct escalation routing.',
    domain: 'Operations',
    level: 'L1',
    targetEnvironment: 'MSP',
    estimatedMinutes: 22,
    tags: ['ticket triage', 'escalation', 'SLA', 'client communication'],
    learningObjectives: [
      'Identify ticket priority and SLA consequences in MSP support.',
      'Capture scope and safe checks clearly for handoff.',
      'Choose the right escalation owner or vendor path for a managed service issue.'
    ],
    dcsRelevance: [
      'Translates DCS ticket discipline to multi-client escalation workflows.'
    ],
    mspRelevance: [
      'Helps MSP technicians preserve evidence and stay within contract boundaries.'
    ],
    sections: buildSections('msp-ticket-triage', [
      {
        title: 'Ticket Priority and SLA',
        bodyMarkdown: 'A ticket priority is often defined by the customer contract and the impact to the client business. Always check the SLA before deciding how quickly to respond or escalate.',
        takeaway: 'Priority comes from the contract and user impact.'
      },
      {
        title: 'Evidence in the Ticket',
        bodyMarkdown: 'Write down exactly what you saw, who is affected, what you tried, and what changed. That keeps the handoff useful and avoids repeated work.',
        takeaway: 'Good evidence saves billable hours.'
      },
      {
        title: 'Escalation Ownership',
        bodyMarkdown: 'Never escalate to a vague team. Name the correct owner, vendor, or specialist based on the service affected and the client contract.',
        takeaway: 'Escalate to the right owner on the first pass.'
      }
    ]),
    flashcards: buildFlashcards('msp-ticket-triage', [
      ['What should you capture first in a client ticket?', 'Exact scope, affected services, and recent changes.'],
      ['What makes a ticket escalation useful?', 'Clear evidence, exact scope, and the correct owner.'],
      ['Why are SLAs important?', 'They define response and resolution expectations for the client and provider.']
    ]),
    quiz: [
      mcq({
        id: 'msp-ticket-q1',
        prompt: 'What is the most important information to include when escalating an MSP ticket?',
        domain: 'Operations',
        difficulty: 'foundation',
        explanation: 'Escalations must preserve the true scope and the evidence that supports it.',
        modelAnswer: 'Who is affected, what failed, what checks were done, and what the impact is.',
        commonMistakes: ['Only saying the ticket is urgent without context'],
        reviewSchedule,
        recommendedModuleId: 'msp-ticket-triage-escalation',
        weakTopic: 'escalation-quality',
        options: [
          { id: 'a', label: 'The exact fault, scope, checks tried, and impact.' },
          { id: 'b', label: 'A guess at the root cause and next steps.' },
          { id: 'c', label: 'Only the client name and ticket number.' },
          { id: 'd', label: 'A long history of a similar incident from last year.' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'msp-ticket-q2',
        prompt: 'How should you describe an MSP ticket when the client is already on a response-time SLA?',
        domain: 'Operations',
        difficulty: 'foundation',
        explanation: 'SLA-aware descriptions keep the next owner focused on urgency and contract terms.',
        modelAnswer: 'State the current symptom, the client-facing impact, the SLA target, and the checks already completed.',
        reviewSchedule,
        recommendedModuleId: 'msp-ticket-triage-escalation',
        weakTopic: 'sla-awareness',
        rubric: ['Mentions symptom and impact', 'Mentions SLA/priority', 'Mentions checks done'],
        keywordHints: ['impact', 'SLA', 'check', 'priority']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('msp-ticket-triage', [
      {
        title: 'Ticket escalation prompt',
        prompt: 'Write a note for an MSP escalation that needs to preserve scope, evidence, and SLA urgency without speculating on root cause.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('msp-ticket-triage', [
      {
        title: 'Ticket handoff summary',
        description: 'Draft a concise summary that explains the exact issue, impact, safe checks, and the correct escalation owner.'
      }
    ])
  }),
  createModule({
    id: 'msp-client-communication-documentation',
    title: 'MSP Client Communication and Documentation',
    description: 'Keep clients informed and documents useful by writing clear updates, preserving privacy, and aligning with service expectations.',
    domain: 'Operations',
    level: 'L1',
    targetEnvironment: 'MSP',
    estimatedMinutes: 18,
    tags: ['client communication', 'documentation', 'updates', 'privacy'],
    learningObjectives: [
      'Write client-facing updates that are clear, confident, and not overly technical.',
      'Document work so it supports future handoffs and billing reviews.',
      'Protect client privacy while preserving essential case detail.'
    ],
    dcsRelevance: [
      'Uses the same clear note habits as school support but for external clients.'
    ],
    mspRelevance: [
      'Great communication keeps clients trusting an MSP and reduces repeat issues.'
    ],
    sections: buildSections('msp-client-communication', [
      {
        title: 'Client-Friendly Language',
        bodyMarkdown: 'Choose plain, respectful language and avoid jargon unless the client explicitly wants technical detail. The goal is confidence and clarity.',
        takeaway: 'Clients want simple, useful updates.'
      },
      {
        title: 'Useful Documentation',
        bodyMarkdown: 'Document the problem, the steps taken, and the next action clearly so the next technician can continue without confusion.',
        takeaway: 'Good docs are a service asset.'
      },
      {
        title: 'Privacy and Client Boundaries',
        bodyMarkdown: 'Keep client identifiers and internal vendor details out of shared notes unless the contract explicitly allows them.',
        takeaway: 'Protect privacy by default.'
      }
    ]),
    flashcards: buildFlashcards('msp-client-communication', [
      ['What should client updates focus on?', 'Impact, progress, and next steps.'],
      ['Why avoid jargon in client notes?', 'It reduces confusion and builds trust.'],
      ['What makes documentation reusable?', 'Clear problem statement, exact steps, and the current status.']
    ]),
    quiz: [
      shortAnswer({
        id: 'msp-client-q1',
        prompt: 'What are the three most useful things to include in a client-facing status update?',
        domain: 'Operations',
        difficulty: 'foundation',
        explanation: 'Client updates should be short, concrete, and growth-oriented.',
        modelAnswer: 'The current problem, what has been done, and what will happen next.',
        reviewSchedule,
        recommendedModuleId: 'msp-client-communication-documentation',
        weakTopic: 'communication',
        rubric: ['Mentions problem', 'Mentions work done', 'Mentions next step'],
        keywordHints: ['current', 'done', 'next']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('msp-client-communication', [
      {
        title: 'Client update prompt',
        prompt: 'Write a brief client update for a ticket that is still under investigation but needs status reassurance.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('msp-client-communication', [
      {
        title: 'Client status note',
        description: 'Create a short status note for a client that explains the current issue, what is being checked, and the next expected update.'
      }
    ])
  })
];
