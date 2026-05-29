import { mcq, shortAnswer, orderSteps, scenarioResponse, categorization, buildSections, buildFlashcards, buildScenarioPrompts, buildPracticalOutputs, createModule, enhanceModule, reviewSchedule, type LegacyTrainingModule, type ModuleEnhancement } from './helpers';

const baseOffboarding: LegacyTrainingModule = {
  id: 'm365-identity-offboarding-basics',
  title: 'M365 Identity and Offboarding Basics',
  description:
    'High-level identity and offboarding thinking for DCS: what should happen, why sequencing matters, and where Level 1 must escalate.',
  domain: 'Identity and Access',
  level: 'L1',
  estimatedMinutes: 20,
  tags: ['M365', 'Entra', 'Teams', 'offboarding'],
  learningObjectives: [
    'Describe offboarding as a sequence, not a single click.',
    'Recognise why accounts can appear active in Teams after other changes.',
    'Understand which parts Josh can document versus which parts need authority.'
  ],
  dcsRelevance: [
    'Staff departure tasks carry obvious privacy and security risk.',
    'M365 lag and identity sequencing easily confuse new support staff.',
    'Good documentation protects the school and the departing staff member.'
  ],
  sections: [
    {
      id: 'offboarding-1',
      title: 'Offboarding is a sequence',
      bodyMarkdown: `Think in order, not in single actions. There may be account disablement, session sign-out, group or role cleanup, device handling, mailbox or file decisions, and communication with leaders.\n\nJosh does not need production authority to understand the logic. He needs enough understanding to document safely and escalate accurately.`
    },
    {
      id: 'offboarding-2',
      title: 'Why "still active in Teams" happens',
      bodyMarkdown: `Different Microsoft services do not always reflect changes instantly. A user can appear visible in one service while another change has already occurred.\n\nThat does not automatically mean the offboarding failed. It does mean the sequence and evidence matter.`
    },
    {
      id: 'offboarding-3',
      title: 'The Level 1 posture',
      bodyMarkdown: `Level 1 should gather the facts, confirm the business need, note the current symptom, and hand off cleanly.\n\nNever treat identity actions as casual tasks. Poor sequencing can create privacy, access, and continuity problems.`
    }
  ],
  flashcards: [
    { id: 'offboarding-f1', front: 'Why is offboarding not a single action?', back: 'Because accounts, sessions, roles, devices, and data each have different effects and timing.' },
    { id: 'offboarding-f2', front: 'What should Josh avoid during offboarding practice?', back: 'Pretending he has authority to make production identity changes.' },
    { id: 'offboarding-f3', front: 'Why might a former staff member still appear in Teams?', back: 'Service state can lag behind other identity changes.' },
    { id: 'offboarding-f4', front: "What is Josh's safe role in offboarding?", back: 'Gather facts, document clearly, and escalate to authorised staff.' },
    { id: 'offboarding-f5', front: 'Why does sequencing matter in offboarding?', back: 'The wrong order can leave access, privacy, or continuity gaps.' },
    { id: 'offboarding-f6', front: 'What kind of detail belongs in an offboarding note?', back: 'Requested change, current symptom, urgency, and any visible account state.' },
    { id: 'offboarding-f7', front: 'What is the risk of vague wording like "delete the account"?', back: 'It hides the actual business need and can cause unsafe actions.' },
    { id: 'offboarding-f8', front: 'What should a good Level 1 question ask first?', back: 'What is the requested outcome and who has approved it?' }
  ],
  quiz: [
    mcq({
      id: 'offboarding-q1',
      prompt: 'A former staff member still appears active in Teams after a departure process started. What is the safest first interpretation?',
      domain: 'M365 offboarding',
      difficulty: 'foundation',
      explanation: 'Visibility lag is possible.',
      modelAnswer:
        'It may reflect service lag or incomplete sequencing, so document the current symptom and escalate to the authorised owner rather than assuming the whole process failed.',
      commonMistakes: ['Assuming Josh should immediately delete more objects', 'Treating one service view as the whole truth'],
      dcsContext: 'Identity systems often update at different speeds.',
      reviewSchedule,
      recommendedModuleId: 'm365-identity-offboarding-basics',
      weakTopic: 'offboarding-sequence',
      options: [
        { id: 'a', label: 'It always means nothing was offboarded' },
        { id: 'b', label: 'It may be service lag or sequencing, so document and escalate' },
        { id: 'c', label: 'Josh should remove every group himself immediately' },
        { id: 'd', label: 'Ignore it because Teams never matters' }
      ],
      correctOptionId: 'b'
    }),
    shortAnswer({
      id: 'offboarding-q2',
      prompt: 'Explain why offboarding needs sequencing rather than random identity actions.',
      domain: 'M365 offboarding',
      difficulty: 'stretch',
      explanation: 'Access, continuity, and privacy depend on order.',
      modelAnswer:
        'Offboarding affects access, sessions, group membership, devices, shared ownership, and data continuity. Sequencing matters so access is removed safely without losing evidence, ownership, or operational continuity.',
      commonMistakes: ['Reducing offboarding to one account disable step', 'Ignoring continuity and data considerations'],
      dcsContext: 'School staff accounts touch teaching tools, Teams, files, and devices.',
      reviewSchedule,
      recommendedModuleId: 'm365-identity-offboarding-basics',
      weakTopic: 'offboarding-sequence',
      rubric: ['Mentions multiple moving parts', 'Explains why order matters', 'Shows security and continuity judgement'],
      keywordHints: ['access', 'sessions', 'data', 'ownership']
    }),
    orderSteps({
      id: 'offboarding-q3',
      prompt: 'Order the safest Level 1 response to a departure-related identity concern.',
      domain: 'M365 offboarding',
      difficulty: 'stretch',
      explanation: 'Fact gathering comes before action claims.',
      modelAnswer:
        'Confirm the request and approval, capture the exact current symptom, note any business urgency, then escalate to the authorised owner with clear documentation.',
      commonMistakes: ['Acting before confirming approval', 'Skipping the current-state note'],
      dcsContext: 'Identity work should be deliberate and traceable.',
      reviewSchedule,
      recommendedModuleId: 'm365-identity-offboarding-basics',
      weakTopic: 'offboarding-sequence',
      steps: [
        { id: 'confirm', label: 'Confirm the requested outcome and authority' },
        { id: 'capture', label: 'Capture the exact visible symptom or account state' },
        { id: 'urgency', label: 'Note timing or risk urgency' },
        { id: 'escalate', label: 'Escalate with the documented sequence concern' }
      ],
      correctOrder: ['confirm', 'capture', 'urgency', 'escalate'],
      rubric: ['Checks authority', 'Documents current state', 'Escalates cleanly']
    }),
    scenarioResponse({
      id: 'offboarding-q4',
      prompt: 'Write the reasoning Josh should use when asked to "just switch everything off" for a departing staff member.',
      domain: 'M365 offboarding',
      difficulty: 'challenge',
      explanation: 'The business outcome matters more than the emotional wording.',
      modelAnswer:
        'Slow the request into a clear outcome: what access must stop, what ownership or continuity must be preserved, what has been approved, and who owns the change. The safe response is to document and escalate rather than acting on a vague broad instruction.',
      commonMistakes: ['Treating a vague request as a safe task', 'Ignoring ownership and continuity'],
      dcsContext: 'Departure requests often arrive with urgency and emotion.',
      reviewSchedule,
      recommendedModuleId: 'm365-identity-offboarding-basics',
      weakTopic: 'security-risk-judgement',
      rubric: ['Clarifies the business need', 'Names the risks', 'Stays inside Level 1 authority']
    })
  ],
  scenarioPrompts: [
    {
      id: 'offboarding-s1',
      title: 'Former staff still in Teams',
      prompt: 'Write a clear note when service visibility and offboarding status appear out of sync.'
    }
  ],
  practicalOutputs: [
    {
      id: 'offboarding-p1',
      title: 'Safe offboarding checklist',
      description: 'Write a high-level checklist that explains sequence and boundaries without implying production authority.'
    }
  ]
};

const offboardingEnhancement: ModuleEnhancement = {
  estimatedMinutes: 24,
  addTags: ['block sign-in', 'session revocation', 'sign-in logs', 'shared mailbox cleanup'],
  addSections: buildSections('offboarding-deepen', [
    {
      title: 'Block sign-in, then reason about sessions and logs',
      bodyMarkdown:
        'The first offboarding decision is often access containment: is sign-in blocked, and are existing sessions or tokens still relevant? Josh should understand the sequence and language even when the authorised owner performs the action.',
      takeaway: 'Containment and evidence language matter before deeper cleanup detail.'
    },
    {
      title: 'Shared mailboxes, MFA, and managed mobile data',
      bodyMarkdown:
        'A departing account may leave traces in shared mailboxes, MFA devices, and managed mobile access paths. Level 1 does not improvise these changes, but a strong note can name the potential cleanup areas and whether the risk is immediate or routine.',
      takeaway: 'Good offboarding notes include the systems that may still carry access or data risk.'
    }
  ]),
  addFlashcards: buildFlashcards('offboarding-deepen', [
    ['What is often the first containment question in offboarding?', 'Has sign-in been blocked or otherwise contained by the authorised owner?'],
    ['Why might session revocation matter after sign-in is blocked?', 'Because existing sessions or tokens can linger briefly even after the main account state changes.'],
    ['What extra systems may need cleanup during offboarding?', 'Shared mailboxes, MFA methods, group memberships, and managed mobile access paths.'],
    ['Why should Josh mention sign-in logs or recent activity carefully?', 'They help frame the risk, but review belongs to the authorised owner.']
  ]),
  addQuiz: [
    orderSteps({
      id: 'offboarding-q5',
      prompt: 'Order the safer first-line reasoning for a suspected incomplete offboarding case.',
      domain: 'M365 offboarding',
      difficulty: 'challenge',
      explanation: 'Containment language and evidence should come before cleanup speculation.',
      modelAnswer:
        'Confirm the requested outcome and authority, capture the visible symptom, note whether access containment such as sign-in block or session review may matter, then escalate for authorised sequence review.',
      commonMistakes: ['Jumping straight to shared-mailbox guesses', 'Skipping the current visible state'],
      dcsContext: 'Identity risk conversations need sequencing, not panic.',
      reviewSchedule,
      recommendedModuleId: 'm365-identity-offboarding-basics',
      weakTopic: 'offboarding-sequence',
      steps: [
        { id: 'authority', label: 'Confirm the requested outcome and owner' },
        { id: 'symptom', label: 'Capture the exact current visible symptom' },
        { id: 'containment', label: 'Note whether sign-in or session containment seems relevant' },
        { id: 'escalate', label: 'Escalate for authorised sequence review' }
      ],
      correctOrder: ['authority', 'symptom', 'containment', 'escalate'],
      rubric: ['Starts with authority', 'Names containment language', 'Escalates without overclaiming']
    }),
    shortAnswer({
      id: 'offboarding-q6',
      prompt: 'Why might a strong offboarding note mention shared mailbox, MFA, or managed mobile cleanup even if Josh is not doing those tasks himself?',
      domain: 'M365 offboarding',
      difficulty: 'stretch',
      explanation: 'Good notes preserve risk and sequence context for the authorised owner.',
      modelAnswer:
        'Because those systems may still hold access or data risk. Mentioning them helps the authorised owner review the sequence fully without assuming the visible Teams symptom is the whole story.',
      commonMistakes: ['Treating the visible symptom as the entire offboarding scope', 'Assuming mentioning a risk is the same as performing the change'],
      dcsContext: 'The note should widen the right person’s awareness without widening Josh’s authority.',
      reviewSchedule,
      recommendedModuleId: 'm365-identity-offboarding-basics',
      weakTopic: 'offboarding-sequence',
      rubric: ['Names downstream systems', 'Connects to risk or sequence', 'Keeps authority boundaries clear'],
      keywordHints: ['shared mailbox', 'MFA', 'managed mobile', 'sequence']
    })
  ]
};

const baseMdm: LegacyTrainingModule = {
  id: 'mdm-intune-group-policy-concepts',
  title: 'MDM, Intune, and Group Policy Concepts',
  description:
    'Understand what cloud device management does, what classic policy does, and how school devices can sit across both worlds.',
  domain: 'Identity and Access',
  level: 'L2',
  estimatedMinutes: 20,
  tags: ['MDM', 'Intune', 'Group Policy', 'device management'],
  learningObjectives: [
    'Explain the difference between MDM-style management and traditional Group Policy.',
    'Map each concept to school device examples like staff laptops and iPads.',
    'Recognise why policy behaviour can differ across joined, enrolled, and unmanaged devices.'
  ],
  dcsRelevance: [
    'Clarifies why staff laptops, iPads, and shared devices behave differently.',
    'Supports safer conversations about configuration, compliance, and device ownership.',
    'Builds a bridge from endpoint support into modern management thinking.'
  ],
  sections: [
    {
      id: 'mdm-1',
      title: 'MDM versus Group Policy in plain English',
      bodyMarkdown: `Group Policy is the classic domain-driven policy approach for joined Windows environments. MDM is modern device management that can push settings, apps, and compliance through a cloud-management layer such as Intune.\n\nBoth aim to control and support devices, but they reach them differently.`
    },
    {
      id: 'mdm-2',
      title: 'Why school fleets are mixed',
      bodyMarkdown: `A school may have Windows laptops, iPads, shared classroom devices, and staff devices all under different management paths.\n\nThat is why one fix or policy idea does not automatically apply everywhere.`
    },
    {
      id: 'mdm-3',
      title: 'Level 1 value without pretending admin access',
      bodyMarkdown: `Josh does not need tenant-level control to benefit from these concepts.\n\nHe needs enough understanding to explain why a managed iPad, a staff laptop, and a domain-shaped Windows device may behave differently, and to escalate using the right language.`
    }
  ],
  flashcards: [
    { id: 'mdm-f1', front: 'What is the plain-English goal of MDM?', back: 'Manage devices, settings, apps, and compliance through a modern management layer.' },
    { id: 'mdm-f2', front: 'What is Group Policy best associated with?', back: 'Traditional domain-driven Windows policy management.' },
    { id: 'mdm-f3', front: 'Why might an iPad and a staff laptop behave differently?', back: 'They may sit under very different management models and policies.' },
    { id: 'mdm-f4', front: 'What is a key Level 1 benefit of understanding MDM and GPO?', back: 'Better diagnosis language and cleaner escalation.' },
    { id: 'mdm-f5', front: 'Does policy behavior stay identical across all device types?', back: 'No. Device ownership and management paths change the result.' },
    { id: 'mdm-f6', front: 'Why is "just change the setting" weak thinking?', back: 'Because the setting may be centrally enforced by policy or management.' },
    { id: 'mdm-f7', front: 'What kind of devices often use MDM thinking strongly?', back: 'Cloud-managed laptops, mobiles, and tablets.' },
    { id: 'mdm-f8', front: 'What should Josh avoid assuming about a device?', back: 'That he personally owns its management path or policy authority.' }
  ],
  quiz: [
    mcq({
      id: 'mdm-q1',
      prompt: 'Which statement best separates MDM from Group Policy?',
      domain: 'MDM and Group Policy',
      difficulty: 'foundation',
      explanation: 'They overlap in purpose but differ in management path.',
      modelAnswer:
        'MDM commonly manages devices through a modern cloud layer, while Group Policy is the traditional domain-driven policy approach for Windows environments.',
      commonMistakes: ['Treating them as identical', 'Assuming one fully replaces all policy models everywhere'],
      dcsContext: 'School fleets often mix both concepts.',
      reviewSchedule,
      recommendedModuleId: 'mdm-intune-group-policy-concepts',
      weakTopic: 'mdm-group-policy',
      options: [
        { id: 'a', label: 'They are exactly the same thing with different branding' },
        { id: 'b', label: 'MDM is cloud-style management; Group Policy is classic domain policy' },
        { id: 'c', label: 'Group Policy only applies to printers' },
        { id: 'd', label: 'MDM means a device has no policy at all' }
      ],
      correctOptionId: 'b'
    }),
    shortAnswer({
      id: 'mdm-q2',
      prompt: 'Why might a staff laptop and an iPad respond differently to the same configuration request?',
      domain: 'MDM and Group Policy',
      difficulty: 'stretch',
      explanation: 'Management path shapes what settings can be applied and how.',
      modelAnswer:
        'They may be different platforms under different management layers, compliance rules, and policy engines. The same request may need a different path or may not even belong to the same toolset.',
      commonMistakes: ['Assuming all devices share one control plane', 'Ignoring platform differences'],
      dcsContext: 'School fleets are often mixed and layered.',
      reviewSchedule,
      recommendedModuleId: 'mdm-intune-group-policy-concepts',
      weakTopic: 'mdm-group-policy',
      rubric: ['Names management differences', 'Mentions platform differences', 'Explains why the response path changes'],
      keywordHints: ['platform', 'policy', 'management']
    }),
    orderSteps({
      id: 'mdm-q3',
      prompt: 'Order the right thinking when a device setting "keeps changing back."',
      domain: 'MDM and Group Policy',
      difficulty: 'stretch',
      explanation: 'Central policy is a more likely explanation than user stubbornness.',
      modelAnswer:
        'Confirm the exact setting and device type, consider whether policy is enforcing the state, gather evidence of the behavior, then escalate through the correct management path.',
      commonMistakes: ['Reapplying the setting repeatedly without questioning policy', 'Ignoring device type'],
      dcsContext: 'Managed school devices often revert settings for a reason.',
      reviewSchedule,
      recommendedModuleId: 'mdm-intune-group-policy-concepts',
      weakTopic: 'mdm-group-policy',
      steps: [
        { id: 'device', label: 'Confirm the exact device type and setting' },
        { id: 'policy', label: 'Consider whether central policy is enforcing it' },
        { id: 'evidence', label: 'Gather evidence of the revert behavior' },
        { id: 'escalate', label: 'Escalate through the right management path' }
      ],
      correctOrder: ['device', 'policy', 'evidence', 'escalate'],
      rubric: ['Starts with device type', 'Considers central policy', 'Escalates correctly']
    }),
    scenarioResponse({
      id: 'mdm-q4',
      prompt: 'A user asks Josh to change a restricted setting on a school laptop because "it works on my home PC." Explain the safer response.',
      domain: 'MDM and Group Policy',
      difficulty: 'challenge',
      explanation: 'School management context matters more than what works at home.',
      modelAnswer:
        'Explain that school-managed devices use central policy for security and consistency. Home PCs are unmanaged and behave differently. Document the request and business need, then escalate through the authorised policy path.',
      commonMistakes: ['Calling the user "wrong" without explaining policy', 'Trying to bypass the restriction locally'],
      dcsContext: 'Policy boundaries protect the school network and data.',
      reviewSchedule,
      recommendedModuleId: 'mdm-intune-group-policy-concepts',
      weakTopic: 'mdm-group-policy',
      rubric: ['Explains policy purpose', 'Separates managed from unmanaged devices', 'Escalates through correct path']
    })
  ],
  scenarioPrompts: [
    {
      id: 'mdm-s1',
      title: 'Managed device setting revert',
      prompt: 'Explain why a device setting keeps reverting and how to escalate the business need safely.'
    }
  ],
  practicalOutputs: [
    {
      id: 'mdm-p1',
      title: 'Management-path summary',
      description: 'Draft a short guide explaining which common school devices sit under which management layer.'
    }
  ]
};

const mdmEnhancement: ModuleEnhancement = {
  estimatedMinutes: 24,
  addTags: ['startup', 'sign-in', 'background refresh', 'OU placement', 'drive mapping'],
  addSections: buildSections('mdm-deepen', [
    {
      title: 'Group Policy timing changes the symptom',
      bodyMarkdown:
        'Some settings land at startup, some at sign-in, and some during background refresh. If a drive mapping or printer deployment appears late or disappears after a reboot, timing may matter as much as the policy itself.',
      takeaway: 'Policy timing is part of diagnosis, not just admin trivia.'
    },
    {
      title: 'OU placement, security filtering, and classic school deployments',
      bodyMarkdown:
        'Drive mapping, printer deployment, and login-script behaviour often depend on where the device or user sits and what filtering applies. Level 1 should capture the expected outcome, device context, and repeatability rather than guessing at the policy object.',
      takeaway: 'Note the target, timing, and repeatability before escalating policy behaviour.'
    }
  ]),
  addFlashcards: buildFlashcards('mdm-deepen', [
    ['Why does startup versus sign-in timing matter?', 'Because a missing setting may simply not have hit the device at the expected phase yet.'],
    ['What is OU placement shorthand for in support language?', 'Where the user or device sits for policy targeting purposes.'],
    ['Name two classic Group Policy style outcomes.', 'Drive mapping and printer deployment.'],
    ['What should a Level 1 note capture on policy issues?', 'Expected result, device or user context, timing, and repeatability.']
  ]),
  addQuiz: [
    mcq({
      id: 'mdm-q5',
      prompt: 'A shared drive mapping appears after sign-in but not immediately at startup. Which idea should Josh consider before escalating it as random failure?',
      domain: 'MDM and Group Policy',
      difficulty: 'stretch',
      explanation: 'Policy timing shapes user experience.',
      modelAnswer:
        'Consider whether the mapping depends on sign-in context or later policy refresh rather than assuming the whole policy path is broken.',
      commonMistakes: ['Calling timing behaviour random', 'Ignoring whether the symptom happens before or after sign-in'],
      dcsContext: 'Classroom pressure can hide the fact that timing itself is the clue.',
      reviewSchedule,
      recommendedModuleId: 'mdm-intune-group-policy-concepts',
      weakTopic: 'mdm-group-policy',
      options: [
        { id: 'a', label: 'Policy timing and sign-in context may matter' },
        { id: 'b', label: 'Drive mappings can only be DNS issues' },
        { id: 'c', label: 'The user should disable every policy locally' },
        { id: 'd', label: 'OU placement can never affect mappings' }
      ],
      correctOptionId: 'a'
    }),
    scenarioResponse({
      id: 'mdm-q6',
      prompt: 'A printer deployed by policy appears for staff in one area but not another. Explain the strongest Level 1 escalation note.',
      domain: 'MDM and Group Policy',
      difficulty: 'challenge',
      explanation: 'The note should preserve targeting clues without pretending to know the policy internals.',
      modelAnswer:
        'Capture the user role, device type, campus or area, whether sign-in or reboot changes the outcome, and whether similar staff in another location receive the printer. That frames OU, filtering, or targeting review without guessing at the actual policy object.',
      commonMistakes: ['Writing only "printer missing"', 'Pretending certainty about the exact policy object'],
      dcsContext: 'Support value comes from the targeting clues, not from bluffing policy ownership.',
      reviewSchedule,
      recommendedModuleId: 'mdm-intune-group-policy-concepts',
      weakTopic: 'mdm-group-policy',
      rubric: ['Captures targeting context', 'Mentions timing or repeatability', 'Avoids false admin certainty']
    })
  ]
};

export const identityModules = [
  enhanceModule(baseOffboarding, offboardingEnhancement),
  enhanceModule(baseMdm, mdmEnhancement)
];
