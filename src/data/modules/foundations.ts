import { mcq, shortAnswer, orderSteps, scenarioResponse, categorization, buildSections, buildFlashcards, buildScenarioPrompts, buildPracticalOutputs, createModule, enhanceModule, reviewSchedule, type LegacyTrainingModule, type ModuleEnhancement } from './helpers';

const baseFoundations: LegacyTrainingModule = {
  id: 'dcs-it-support-foundations',
  title: 'DCS IT Support Foundations',
  description:
    'A Level 1 operating approach for professional development during approved professional development periods: triage clearly, act safely, and stop immediately when live support takes priority.',
  domain: 'Foundations',
  level: 'DCS Context',
  estimatedMinutes: 18,
  tags: ['approved PD periods', 'triage', 'Level 1', 'support-first'],
  learningObjectives: [
    'Use a 60-second triage pattern before touching settings.',
    'Recognise the boundary between safe Level 1 action and escalation.',
    'Capture clean notes that help Paul or a Level 2 tech move faster.'
  ],
  dcsRelevance: [
    'Fits the stop-start rhythm of walk-ups, calls, and classroom interruptions.',
    'Keeps professional development aligned with day-to-day DCS helpdesk responsibilities.',
    'Builds safer judgement for shared school devices and visible campus support.'
  ],
  sections: [
    {
      id: 'foundations-1',
      title: 'Support first, PD second',
      bodyMarkdown: `Professional development should only take place during approved professional development periods with no active support demand.\n\nIf a ticket, walk-up, call, classroom issue, or direct instruction arrives, the professional development session stops immediately and operational support resumes. That is part of the role, not a sign of poor discipline.\n\nA sound DCS Level 1 rhythm is: identify the issue, stabilise the situation, ask the clearest next question, then either complete a safe basic fix or escalate clearly.`
    },
    {
      id: 'foundations-2',
      title: 'The 60-second triage frame',
      bodyMarkdown: `Start with: who is affected, where it is happening, what the symptom is, when it started, and whether learning can continue right now.\n\nThen ask one more question: "What changed?" A cable move, a reboot, a password reset, a trolley swap, or a room change often explains more than the first complaint does.\n\nThe aim is not to sound impressive. The aim is to shrink uncertainty without causing more risk.`
    },
    {
      id: 'foundations-3',
      title: 'Safe Level 1 boundaries',
      bodyMarkdown: `Safe first actions are usually reversible: reconnect, reseat, restart, confirm the correct account, confirm the correct room, confirm the correct printer, and compare with a known-good device.\n\nUnsafe actions are deeper changes you do not own yet: production admin changes, policy changes, account permission changes, firewall edits, or anything that could affect other users.\n\nWhen in doubt, preserve evidence and escalate rather than experimenting.`
    }
  ],
  flashcards: [
    { id: 'foundations-f1', front: 'What interrupts PD immediately at DCS?', back: 'Tickets, walk-ups, calls, classroom issues, and direct instructions.' },
    { id: 'foundations-f2', front: 'What are the five core triage prompts?', back: 'Who, where, what, when, and impact on learning.' },
    { id: 'foundations-f3', front: 'What extra question often reveals the cause fastest?', back: 'What changed?' },
    { id: 'foundations-f4', front: 'Name two safe Level 1 actions.', back: 'Reconnect, reseat, restart, confirm account, confirm room, or compare with known-good.' },
    { id: 'foundations-f5', front: 'What kind of actions should Level 1 avoid without approval?', back: 'Production admin, policy, permission, firewall, or broad-impact changes.' },
    { id: 'foundations-f6', front: 'Why do we capture scope before tinkering?', back: 'So we know whether it is one device, one room, or something wider.' },
    { id: 'foundations-f7', front: 'What does a good escalation note preserve?', back: 'Exact symptom, scope, steps tried, impact, and next concern.' },
    { id: 'foundations-f8', front: 'What is the primary goal of triage?', back: 'Reduce uncertainty safely so the next action is evidence-based and justified.' }
  ],
  quiz: [
    mcq({
      id: 'foundations-q1',
      prompt: 'A teacher says, "Room 7 has no internet." What is the best first move for Josh at Level 1?',
      domain: 'DCS support foundations',
      difficulty: 'foundation',
      explanation: 'Scope comes before guesswork.',
      modelAnswer:
        'Clarify scope and location first: which device, which room, whether staff and students are both affected, and whether learning is blocked right now. Then try the safest basic checks.',
      commonMistakes: ['Jumping straight to changing settings', 'Assuming it is only one laptop', 'Skipping impact and urgency'],
      dcsContext: 'A classroom issue can be one device, one room, or a broader network symptom.',
      reviewSchedule,
      recommendedModuleId: 'dcs-it-support-foundations',
      weakTopic: 'ticket-quality',
      options: [
        { id: 'a', label: 'Open admin tools and start changing adapter settings' },
        { id: 'b', label: 'Clarify who, where, and scope before touching anything risky' },
        { id: 'c', label: 'Tell the teacher to wait until lunch' },
        { id: 'd', label: 'Assume the Wi-Fi is down school-wide' }
      ],
      correctOptionId: 'b'
    }),
    shortAnswer({
      id: 'foundations-q2',
      prompt: 'List the minimum details you want in a clean escalation note for a blocked classroom support issue.',
      domain: 'DCS support foundations',
      difficulty: 'foundation',
      explanation: 'Escalation quality is part of the fix, not admin overhead.',
      modelAnswer:
        'Include who is affected, room/location, device or asset, exact symptom, when it started, scope, safe steps tried, impact on learning, and why you are escalating.',
      commonMistakes: ['Writing "internet broken" with no scope', 'Forgetting time or room', 'Leaving out what was already tried'],
      dcsContext: 'A short but precise note saves back-and-forth while class time is under pressure.',
      reviewSchedule,
      recommendedModuleId: 'dcs-it-support-foundations',
      weakTopic: 'ticket-quality',
      rubric: ['Identifies scope clearly', 'Names exact symptom', 'Shows safe work already attempted'],
      keywordHints: ['room', 'device', 'scope', 'steps tried']
    }),
    orderSteps({
      id: 'foundations-q3',
      prompt: 'Put this first-line response in the best order.',
      domain: 'DCS support foundations',
      difficulty: 'stretch',
      explanation: 'Sequence matters because scope should shape your checks.',
      modelAnswer:
        'Clarify scope first, try a reversible check second, compare with a known-good reference third, then escalate with evidence if the issue persists or affects learning broadly.',
      commonMistakes: ['Escalating before clarifying scope', 'Changing too much before comparing with known-good'],
      dcsContext: 'A tidy sequence keeps Josh inside safe Level 1 boundaries.',
      reviewSchedule,
      recommendedModuleId: 'dcs-it-support-foundations',
      weakTopic: 'ticket-quality',
      steps: [
        { id: 'clarify', label: 'Clarify who, where, and scope' },
        { id: 'safe-check', label: 'Try the simplest reversible check' },
        { id: 'compare', label: 'Compare with a known-good device or room' },
        { id: 'escalate', label: 'Escalate with notes if the impact remains' }
      ],
      correctOrder: ['clarify', 'safe-check', 'compare', 'escalate'],
      rubric: ['Starts with scope', 'Uses only reversible checks', 'Knows when to escalate']
    }),
    scenarioResponse({
      id: 'foundations-q4',
      prompt:
        'You are mid-PD in a quiet library window when Paul asks you to help a teacher with a display issue immediately. Explain your next action and the judgement behind it.',
      domain: 'DCS support foundations',
      difficulty: 'stretch',
      explanation: 'The mission is not to finish study. It is to support safely and professionally.',
      modelAnswer:
        'Stop the PD block immediately, switch into support mode, gather the room and symptom details, and work the display issue using a safe Level 1 flow. The judgement point is that operational support outranks personal PD every time.',
      commonMistakes: ['Trying to finish the module first', 'Treating PD as equally urgent as live support'],
      dcsContext: 'Quiet-window learning only exists while support demand is genuinely quiet.',
      reviewSchedule,
      recommendedModuleId: 'dcs-it-support-foundations',
      weakTopic: 'ticket-quality',
      rubric: ['Stops PD cleanly', 'Explains support-first priority', 'Shows safe troubleshooting posture']
    })
  ],
  scenarioPrompts: [
    {
      id: 'foundations-s1',
      title: 'Operational interruption response',
      prompt: 'Respond to a transition from personal study to live support with concise, professional communication.'
    }
  ],
  practicalOutputs: [
    {
      id: 'foundations-p1',
      title: 'Quiet-window triage card',
      description: 'Draft a one-page checklist for how Josh starts a DCS Level 1 incident without overstepping.'
    }
  ]
};

const foundationsEnhancement: ModuleEnhancement = {
  estimatedMinutes: 24,
  addTags: ['multi-campus', 'ownership boundaries', 'safe internal source use'],
  addLearningObjectives: [
    'Recognise when a support pattern spans DCS, Preschool, or Wellington context and should be noted clearly.',
    'Separate ICT triage from admin, leadership, and system-owner workflows.',
    'Turn internal DCS knowledge into safe prompts instead of copied notes.'
  ],
  addDcsRelevance: [
    'Helps Josh avoid treating every campus, office, and classroom workflow as identical.',
    'Builds cleaner judgement about where real DCS process knowledge often lives internally.'
  ],
  addSections: buildSections('foundations-deepen', [
    {
      title: 'Multi-campus context changes the note',
      bodyMarkdown:
        'A symptom may sound familiar but still live in a different support context across DCS, Preschool, or Wellington. Capture the campus, room, and user role early so later handoff is not built on the wrong assumption.',
      takeaway: 'Campus and role context are part of first-line triage, not optional detail.'
    },
    {
      title: 'Where workflow knowledge usually lives',
      bodyMarkdown:
        'Real DCS workflow knowledge often sits in school-owned systems such as Teams, OurDCS, Sentral training, or local SOPs. The PD app should teach the pattern, language, and boundary without becoming a copy of those sources.',
      takeaway: 'Use internal resources as source material for prompts and checklists, not as text to reproduce.'
    }
  ]),
  addFlashcards: buildFlashcards('foundations-deepen', [
    ['Why note the campus as well as the room?', 'Because the same symptom can belong to a different owner, asset set, or workflow at another campus.'],
    ['What is a safe use of internal DCS documentation in this app?', 'Abstract the workflow into prompts, flashcards, and safe scenarios without copying sensitive text.'],
    ['What boundary question often matters before promising action?', 'Who actually owns the workflow, approval, or production change?'],
    ['What should Josh capture when a process differs between offices or campuses?', 'The exact location, user role, visible symptom, and who appears to own the next step.']
  ]),
  addQuiz: [
    shortAnswer({
      id: 'foundations-q5',
      prompt: 'Why does multi-campus context matter before Josh writes an escalation note?',
      domain: 'DCS support foundations',
      difficulty: 'stretch',
      explanation: 'The same symptom can have different ownership and urgency depending on where it sits.',
      modelAnswer:
        'Multi-campus context matters because the correct owner, system path, and operational impact can differ between DCS, Preschool, and Wellington. Naming the campus and role prevents a misleading handoff.',
      commonMistakes: ['Writing the room only', 'Assuming all campuses share the same workflow owner'],
      dcsContext: 'A short note can still be wrong if it omits the support context the next person needs.',
      reviewSchedule,
      recommendedModuleId: 'dcs-it-support-foundations',
      weakTopic: 'ticket-quality',
      rubric: ['Names campus context', 'Links context to ownership or impact', 'Shows handoff value'],
      keywordHints: ['campus', 'owner', 'impact', 'handoff']
    }),
    categorization({
      id: 'foundations-q6',
      prompt: 'Sort each item into the best primary ownership bucket.',
      domain: 'DCS support foundations',
      difficulty: 'challenge',
      explanation: 'Ownership boundaries are part of safe support behaviour.',
      modelAnswer:
        'Level 1 triages and documents, admin or system owners handle workflow-specific data changes, and senior ICT handles risky production changes or unclear technical boundaries.',
      commonMistakes: ['Treating every workflow as ICT-owned', 'Ignoring admin ownership for family data changes'],
      dcsContext: 'DCS service quality improves when Josh routes work cleanly instead of overclaiming ownership.',
      reviewSchedule,
      recommendedModuleId: 'dcs-it-support-foundations',
      weakTopic: 'ticket-quality',
      categories: [
        { id: 'l1', label: 'Level 1 triage and note' },
        { id: 'admin', label: 'Admin or workflow owner' },
        { id: 'senior-ict', label: 'Senior ICT escalation' }
      ],
      items: [
        { id: 'family-change', label: 'Parent requests a family-detail amendment', correctCategoryId: 'admin' },
        { id: 'display-check', label: 'Teacher laptop shows picture but no audio in class', correctCategoryId: 'l1' },
        { id: 'firewall-rule', label: 'Guest network needs a new path to internal systems', correctCategoryId: 'senior-ict' },
        { id: 'safe-note', label: 'Capture the campus, role, symptom, and steps already tried', correctCategoryId: 'l1' }
      ],
      rubric: ['Groups ownership accurately', 'Keeps Level 1 inside safe scope', 'Recognises admin and senior ICT boundaries']
    })
  ],
  addScenarioPrompts: buildScenarioPrompts('foundations-deepen', [
    {
      title: 'Same symptom, different campus',
      prompt: 'Explain how the same issue note should change when the request comes from another campus or office workflow.'
    }
  ]),
  addPracticalOutputs: buildPracticalOutputs('foundations-deepen', [
    {
      title: 'Safe-source conversion sheet',
      description: 'Draft a checklist for turning internal workflow reading into privacy-safe prompts, flashcards, and scenarios.'
    }
  ])
};

export const foundationsModules = [
  enhanceModule(baseFoundations, foundationsEnhancement)
];
