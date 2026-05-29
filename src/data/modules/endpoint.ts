import { mcq, shortAnswer, orderSteps, scenarioResponse, categorization, buildSections, buildFlashcards, buildScenarioPrompts, buildPracticalOutputs, createModule, enhanceModule, reviewSchedule, type LegacyTrainingModule, type ModuleEnhancement } from './helpers';

const basePrinters: LegacyTrainingModule = {
  id: 'printer-troubleshooting',
  title: 'Printer Troubleshooting',
  description:
    'A symptom-to-cause mental map for queues, jams, toner, wrong printers, and safe escalation from the classroom or library desk.',
  domain: 'Endpoint Support',
  level: 'L1',
  estimatedMinutes: 18,
  tags: ['printers', 'queues', 'toner', 'library desk'],
  learningObjectives: [
    'Separate queue issues, device issues, and user-targeting mistakes.',
    'Use a clean symptom-to-cause pattern before escalating printer faults.',
    'Write printer notes that help the next tech move immediately.'
  ],
  dcsRelevance: [
    'Printers are frequent school friction points and can block class momentum fast.',
    'The library desk often becomes the first support contact for print confusion.',
    'Good symptom notes save wasted backtracking across rooms.'
  ],
  sections: [
    {
      id: 'printer-1',
      title: 'Three broad printer fault buckets',
      bodyMarkdown: `Most printer pain lands in one of three buckets: the user sent the job to the wrong place, the queue or spool path is stuck, or the device itself has a hardware or consumable issue.\n\nStart there before chasing rare causes.`
    },
    {
      id: 'printer-2',
      title: 'What the symptom is trying to tell you',
      bodyMarkdown: `No print at all often points to wrong target, queue, offline status, or a broad service path. Smudging, rubbing off, or faint output points more toward toner, drum, paper, or fuser-style issues.\n\nDifferent symptoms deserve different escalation language.`
    },
    {
      id: 'printer-3',
      title: 'Printer fixes with boundaries',
      bodyMarkdown: `Safe Level 1 work includes confirming the correct printer, checking the queue, checking paper and obvious jams, and comparing whether other users are affected.\n\nDo not improvise deep driver surgery or device-admin changes if the environment belongs to someone else.`
    }
  ],
  flashcards: [
    { id: 'printer-f1', front: 'What are the three broad printer fault buckets?', back: 'Wrong target, queue/spool path, or device/consumable fault.' },
    { id: 'printer-f2', front: 'A job never prints. What is the first check?', back: 'Confirm the correct printer and queue state.' },
    { id: 'printer-f3', front: 'What kind of symptom points toward consumables or hardware quality?', back: 'Faint print, rubbing off toner, smudging, or streaking.' },
    { id: 'printer-f4', front: 'Why does scope matter on a printer call?', back: 'It tells you whether the issue is one user, one queue, or the whole device.' },
    { id: 'printer-f5', front: 'What should a good printer escalation note include?', back: 'Printer location, exact symptom, who is affected, and steps already tried.' },
    { id: 'printer-f6', front: 'What is a safe Level 1 printer action?', back: 'Check queue, paper, jam, offline state, or wrong printer selection.' },
    { id: 'printer-f7', front: 'What should Josh avoid on a shared school printer without approval?', back: 'Deep admin changes or risky device reconfiguration.' },
    { id: 'printer-f8', front: 'Why is "printer broken" a weak note?', back: "It hides the symptom pattern and wastes the next technician's time." }
  ],
  quiz: [
    mcq({
      id: 'printer-q1',
      prompt: 'A teacher says a document printed to the wrong room. What is the most likely first explanation?',
      domain: 'Printer troubleshooting',
      difficulty: 'foundation',
      explanation: 'Start with the simple targeting mistake before bigger causes.',
      modelAnswer:
        'The document likely went to the wrong selected printer or queue. Confirm the print target before treating it as a device failure.',
      commonMistakes: ['Jumping straight to hardware failure', 'Ignoring user target selection'],
      dcsContext: 'Shared school printers create easy targeting mistakes.',
      reviewSchedule,
      recommendedModuleId: 'printer-troubleshooting',
      weakTopic: 'printer-symptoms',
      options: [
        { id: 'a', label: 'The fuser definitely failed' },
        { id: 'b', label: 'The wrong printer or queue was selected' },
        { id: 'c', label: 'DNS is always the cause' },
        { id: 'd', label: 'The user must reinstall Windows' }
      ],
      correctOptionId: 'b'
    }),
    shortAnswer({
      id: 'printer-q2',
      prompt: 'What details would make a printer escalation note genuinely useful?',
      domain: 'Printer troubleshooting',
      difficulty: 'stretch',
      explanation: 'The next tech needs symptom, scope, and evidence.',
      modelAnswer:
        'Name the printer and location, exact symptom, whether the issue affects one user or many, any queue or device message, and the safe checks already completed.',
      commonMistakes: ['Leaving out scope', 'Leaving out location', 'Not saying what was already tried'],
      dcsContext: 'Room and device detail matters in a school with many similar printers.',
      reviewSchedule,
      recommendedModuleId: 'printer-troubleshooting',
      weakTopic: 'ticket-quality',
      rubric: ['Includes location and scope', 'Names the symptom', 'Captures steps tried'],
      keywordHints: ['location', 'scope', 'queue', 'steps tried']
    }),
    orderSteps({
      id: 'printer-q3',
      prompt: 'Put this Level 1 printer flow in the best order.',
      domain: 'Printer troubleshooting',
      difficulty: 'stretch',
      explanation: 'Work from simplest and safest to most informative.',
      modelAnswer:
        'Confirm the right printer first, inspect queue and offline status second, check device basics third, then escalate if the symptom remains or affects more users.',
      commonMistakes: ['Opening with risky reconfiguration', 'Checking consumables before confirming the target'],
      dcsContext: 'Most school print issues are simpler than they first sound.',
      reviewSchedule,
      recommendedModuleId: 'printer-troubleshooting',
      weakTopic: 'printer-symptoms',
      steps: [
        { id: 'target', label: 'Confirm the correct printer was selected' },
        { id: 'queue', label: 'Check the queue and offline state' },
        { id: 'device', label: 'Check paper, jams, and visible device errors' },
        { id: 'escalate', label: 'Escalate with symptom and scope if needed' }
      ],
      correctOrder: ['target', 'queue', 'device', 'escalate'],
      rubric: ['Starts with the likely cause', 'Uses reversible checks', 'Escalates with evidence']
    }),
    scenarioResponse({
      id: 'printer-q4',
      prompt: 'A laser print rubs off the page when touched. Explain how you would describe that symptom and why it points beyond a simple wrong-printer issue.',
      domain: 'Printer troubleshooting',
      difficulty: 'challenge',
      explanation: "The symptom pattern matters more than the user's frustration language.",
      modelAnswer:
        'Describe it as a print-quality fault where toner is not bonding correctly, which points more toward consumables or hardware process issues than queue targeting. Note location, stock used, and whether the symptom appears on all jobs.',
      commonMistakes: ['Calling it a queue issue', 'Not describing the symptom precisely'],
      dcsContext: 'Precise print-quality language helps the right follow-up happen faster.',
      reviewSchedule,
      recommendedModuleId: 'printer-troubleshooting',
      weakTopic: 'printer-symptoms',
      rubric: ['Names the quality symptom', 'Separates it from queue issues', 'Captures evidence for escalation']
    })
  ],
  scenarioPrompts: [
    {
      id: 'printer-s1',
      title: 'Queue stuck or device fault?',
      prompt: 'Determine whether the problem relates to user targeting, the print path, or the printer itself.'
    }
  ],
  practicalOutputs: [
    {
      id: 'printer-p1',
      title: 'Printer symptom table',
      description: 'Build a symptom-to-cause table for common school printer issues and safe first checks.'
    }
  ]
};

const printerEnhancement: ModuleEnhancement = {
  estimatedMinutes: 26,
  addTags: ['PaperCut', 'Follow-Me', 'photocopier', 'service handoff'],
  addSections: buildSections('printer-deepen', [
    {
      title: 'Queue, release, or device fault?',
      bodyMarkdown:
        'PaperCut and Follow-Me printing add another decision point. A job may leave the workstation queue correctly but still wait for release at the copier. Separate "did the job submit?" from "did the user release it?" from "did the device actually print?".',
      takeaway: 'A print job can fail before release, at release, or at the device.'
    },
    {
      title: 'Photocopier faults and service-call notes',
      bodyMarkdown:
        'Large devices often surface jams, low toner, transfer, fuser, or thermal-style faults differently from simple desktop printers. Level 1 should capture the device, code or message if visible, consumable status, and whether copying as well as printing is affected before handing off for service.',
      takeaway: 'Photocopier servicing needs better evidence than "printer broken".'
    }
  ]),
  addFlashcards: buildFlashcards('printer-deepen', [
    ['What extra layer does Follow-Me printing add?', 'A release step at the device after the job has already queued.'],
    ['If the job is in PaperCut but not on paper, what question matters next?', 'Was the job released successfully at the device, and did the copier show an error?'],
    ['What does toner rubbing off usually point toward?', 'A device or fuser-quality issue rather than the wrong queue.'],
    ['What should a copier service note include?', 'Device location, visible message or code, scope, consumables state, and whether copying is also affected.']
  ]),
  addQuiz: [
    mcq({
      id: 'printer-q5',
      prompt: 'A job appears in the print system, but nothing comes out until the user authenticates at the copier. Which bucket best fits the issue?',
      domain: 'Printer troubleshooting',
      difficulty: 'stretch',
      explanation: 'Queue success does not guarantee release success.',
      modelAnswer:
        'This sits in the release workflow bucket. The workstation may have submitted correctly, but the Follow-Me or release step still matters.',
      commonMistakes: ['Calling it only a queue failure', 'Jumping straight to hardware replacement'],
      dcsContext: 'PaperCut-style workflows create failure points beyond the desktop queue.',
      reviewSchedule,
      recommendedModuleId: 'printer-troubleshooting',
      weakTopic: 'printer-symptoms',
      options: [
        { id: 'a', label: 'Release or authentication workflow' },
        { id: 'b', label: 'Definitely a DNS outage' },
        { id: 'c', label: 'Purely a document-format issue every time' },
        { id: 'd', label: 'A power fault on every printer in the school' }
      ],
      correctOptionId: 'a'
    }),
    scenarioResponse({
      id: 'printer-q6',
      prompt: 'A copier prints, but toner rubs off and copying quality is poor too. Explain the best escalation note.',
      domain: 'Printer troubleshooting',
      difficulty: 'challenge',
      explanation: 'The note should separate queue success from device-quality failure.',
      modelAnswer:
        'State the device or room, note that printing and copying both show poor output quality, describe the symptom precisely such as toner rubbing off, and record any visible device messages or consumable clues. This points toward device servicing rather than the user selecting the wrong queue.',
      commonMistakes: ['Writing only "print failed"', 'Leaving out that copying also fails'],
      dcsContext: 'Service-call notes need device-quality evidence, not just user frustration.',
      reviewSchedule,
      recommendedModuleId: 'printer-troubleshooting',
      weakTopic: 'printer-symptoms',
      rubric: ['Names quality symptom', 'Mentions scope across print and copy', 'Supports service handoff']
    })
  ],
  addScenarioPrompts: buildScenarioPrompts('printer-deepen', [
    {
      title: 'PaperCut release versus hardware fault',
      prompt: 'Write how you would separate a stuck release workflow from a copier hardware problem.'
    }
  ]),
  addPracticalOutputs: buildPracticalOutputs('printer-deepen', [
    {
      title: 'Copier service-call handoff',
      description: 'Draft a privacy-safe template for a copier fault note that includes release-path clues, visible codes, and service urgency.'
    }
  ])
};

const baseViewboards: LegacyTrainingModule = {
  id: 'classroom-display-viewboard-troubleshooting',
  title: 'Classroom Display and ViewBoard Troubleshooting',
  description:
    'A classroom-safe flow for no picture, no audio, and no touch when teachers need the room back quickly.',
  domain: 'Endpoint Support',
  level: 'L1',
  estimatedMinutes: 18,
  tags: ['ViewBoard', 'display', 'HDMI', 'classroom'],
  learningObjectives: [
    'Work the display chain in a structured order: source, cable, adapter, input, touch, audio.',
    'Separate "no picture" from "no touch" and "no audio" symptoms.',
    'Know when to stop fiddling and escalate because class time is being burned.'
  ],
  dcsRelevance: [
    'One blocked classroom can create immediate pressure and visible frustration.',
    'ViewBoard issues are resolved more effectively with structured sequencing than ad hoc changes.',
    'A short display checklist can reduce disruption at the front of the room.'
  ],
  sections: [
    {
      id: 'viewboard-1',
      title: 'Think in links, not magic',
      bodyMarkdown: `A classroom display path usually has several links: the source device, a cable or dock, the display input, and sometimes a separate USB path for touch.\n\nThe symptom often tells you which link is failing if you resist random swapping.`
    },
    {
      id: 'viewboard-2',
      title: 'No picture, no audio, no touch are different problems',
      bodyMarkdown: `No picture usually points toward input, cable, dock, power, or source output. No touch often points toward the USB or control path. HDMI video with no audio can be the wrong playback device or a display-side audio path issue.\n\nUse the symptom to narrow the path.`
    },
    {
      id: 'viewboard-3',
      title: 'Class time changes the threshold',
      bodyMarkdown: `In a classroom, speed and clarity matter. Try the safest short sequence, explain what you are checking, and stop once the class is losing too much time.\n\nA tidy escalation is better than a long public experiment.`
    }
  ],
  flashcards: [
    { id: 'viewboard-f1', front: 'What is the first mental model for a ViewBoard fault?', back: 'Treat it as a chain of links: source, cable or dock, input, and control paths.' },
    { id: 'viewboard-f2', front: 'What symptom usually points to the USB path rather than video?', back: 'No touch or inking.' },
    { id: 'viewboard-f3', front: 'What does HDMI picture but no audio often suggest?', back: 'The wrong playback device or a display audio-path issue.' },
    { id: 'viewboard-f4', front: 'Why should Josh avoid a long public experiment?', back: 'Class time is being lost and the risk of confusion rises.' },
    { id: 'viewboard-f5', front: 'What is a safe first display check?', back: 'Confirm power, correct input, and cable or dock seating.' },
    { id: 'viewboard-f6', front: 'What should a display escalation note include?', back: 'Room, source device type, exact symptom, steps tried, and classroom impact.' },
    { id: 'viewboard-f7', front: 'Why separate no picture from no touch?', back: 'Because they often live on different parts of the chain.' },
    { id: 'viewboard-f8', front: 'What does a known-good cable or source help prove?', back: 'Which part of the display chain is likely failing.' }
  ],
  quiz: [
    mcq({
      id: 'viewboard-q1',
      prompt: 'The laptop is on, but nothing appears on the ViewBoard. What is the best first check?',
      domain: 'Classroom display troubleshooting',
      difficulty: 'foundation',
      explanation: 'Start with the visible links in the chain.',
      modelAnswer:
        'Check power, the selected input, and whether the cable or dock is seated correctly before going deeper.',
      commonMistakes: ['Installing software immediately', 'Changing many settings before checking the chain'],
      dcsContext: 'Classroom display issues reward fast visible checks first.',
      reviewSchedule,
      recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
      weakTopic: 'ticket-quality',
      options: [
        { id: 'a', label: 'Check input and cable or dock seating first' },
        { id: 'b', label: 'Factory reset the display' },
        { id: 'c', label: 'Delete the teacher account' },
        { id: 'd', label: 'Change school-wide audio policy' }
      ],
      correctOptionId: 'a'
    }),
    shortAnswer({
      id: 'viewboard-q2',
      prompt: 'Why is "no touch" a different troubleshooting path from "no picture"?',
      domain: 'Classroom display troubleshooting',
      difficulty: 'stretch',
      explanation: 'The control path is often separate from the display path.',
      modelAnswer:
        'No picture usually points to source, cable, power, or selected input. No touch often points to a separate USB or control path even when video is already working.',
      commonMistakes: ['Treating all display symptoms as one issue', 'Ignoring the USB or control path'],
      dcsContext: 'ViewBoards commonly split video and touch into different links.',
      reviewSchedule,
      recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
      weakTopic: 'ticket-quality',
      rubric: ['Separates video and control paths', 'Uses symptom-based reasoning', 'Shows practical value'],
      keywordHints: ['video', 'USB', 'input', 'control']
    }),
    orderSteps({
      id: 'viewboard-q3',
      prompt: 'Order the safest classroom display response when time is tight.',
      domain: 'Classroom display troubleshooting',
      difficulty: 'stretch',
      explanation: 'Short, visible checks first. Escalation before chaos.',
      modelAnswer:
        'Clarify the symptom, check the visible chain, compare with a known-good cable or source if available, then escalate with a short note if the class remains blocked.',
      commonMistakes: ['Skipping clarification', 'Staying too long without progress'],
      dcsContext: 'Class time adds urgency even when the issue feels simple.',
      reviewSchedule,
      recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
      weakTopic: 'ticket-quality',
      steps: [
        { id: 'clarify', label: 'Clarify whether the issue is picture, touch, or audio' },
        { id: 'visible', label: 'Check the visible chain: power, input, cable or dock' },
        { id: 'compare', label: 'Try a known-good cable or source if it is quick and safe' },
        { id: 'escalate', label: 'Escalate once class impact stays high' }
      ],
      correctOrder: ['clarify', 'visible', 'compare', 'escalate'],
      rubric: ['Clarifies the symptom', 'Starts with visible checks', 'Protects class time']
    }),
    scenarioResponse({
      id: 'viewboard-q4',
      prompt: 'A teacher says the display is working but there is no audio over HDMI. Describe your next reasoning steps and the risk trade-off.',
      domain: 'Classroom display troubleshooting',
      difficulty: 'challenge',
      explanation: 'The right answer separates symptom branches and protects class time.',
      modelAnswer:
        'Treat it as an audio-path issue rather than a total display failure. Check the selected playback device and the display-side audio path if that is a safe visible check. If class time is being burned, document what works, what does not, and escalate.',
      commonMistakes: ['Re-running the whole display sequence as if there is no picture', 'Spending too long in front of the class'],
      dcsContext: 'Different symptoms on the same cable path still deserve different reasoning.',
      reviewSchedule,
      recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
      weakTopic: 'ticket-quality',
      rubric: ['Separates the symptom correctly', 'Keeps the response short', 'Explains when to escalate']
    })
  ],
  scenarioPrompts: [
    {
      id: 'viewboard-s1',
      title: 'No display on a ViewBoard',
      prompt: 'Work through a front-of-class troubleshooting sequence that preserves class time and evidence.'
    }
  ],
  practicalOutputs: [
    {
      id: 'viewboard-p1',
      title: 'Classroom display quick-check flow',
      description: 'Draft a short front-of-class troubleshooting flow for picture, touch, and audio issues.'
    }
  ]
};

const viewboardEnhancement: ModuleEnhancement = {
  estimatedMinutes: 26,
  addTags: ['Windows+P', 'HDMI audio', 'projector inputs', 'thermal clues'],
  addSections: buildSections('viewboard-deepen', [
    {
      title: 'Picture path and audio path are siblings, not twins',
      bodyMarkdown:
        'HDMI picture working does not guarantee the correct playback device is selected in Windows. Use Windows+P for display mode issues, then check the playback device if the picture appears but the room still has no audio.',
      takeaway: 'Picture restored does not mean the audio path is healthy.'
    },
    {
      title: 'Projectors, interactive boards, and thermal clues',
      bodyMarkdown:
        'Some rooms still involve projector inputs, lamp warnings, or thermal shutdown behaviour rather than only flat-panel boards. Capture the room technology, selected input, temperature or lamp messages, and whether touch or SMART-style interaction is a separate failure path.',
      takeaway: 'Room technology type shapes the likely fault path and the note you write.'
    }
  ]),
  addFlashcards: buildFlashcards('viewboard-deepen', [
    ['What quick Windows shortcut often matters in display incidents?', 'Windows+P for display mode selection.'],
    ['If picture works but there is no audio, what should Josh check next?', 'The selected playback device or room audio path.'],
    ['What does a lamp or thermal warning suggest?', 'A room-specific projector hardware or heat issue rather than only the laptop source.'],
    ['Why mention the exact room technology?', 'Because ViewBoard, projector, SMART board, and room audio chains can fail differently.']
  ]),
  addQuiz: [
    mcq({
      id: 'viewboard-q5',
      prompt: 'A laptop now displays correctly, but the teacher still has no sound through the room. What is the best next check?',
      domain: 'Classroom display troubleshooting',
      difficulty: 'stretch',
      explanation: 'Audio path reasoning should follow the symptom split.',
      modelAnswer:
        'Check the Windows playback device and room audio path, because picture and audio may be travelling on related but not identical routes.',
      commonMistakes: ['Restarting the whole chain with no symptom distinction', 'Treating no audio as proof the picture fix failed'],
      dcsContext: 'Teachers often describe the whole incident as "HDMI not working" even after picture returns.',
      reviewSchedule,
      recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
      weakTopic: 'classroom-av',
      options: [
        { id: 'a', label: 'Check the playback device and audio path' },
        { id: 'b', label: 'Delete the display driver immediately' },
        { id: 'c', label: 'Assume the network is causing the sound issue' },
        { id: 'd', label: 'Ignore audio because picture is enough' }
      ],
      correctOptionId: 'a'
    }),
    scenarioResponse({
      id: 'viewboard-q6',
      prompt: 'A projector room keeps overheating and dropping image during assemblies. Explain the note Josh should escalate.',
      domain: 'Classroom display troubleshooting',
      difficulty: 'challenge',
      explanation: 'Recurring room faults need exact room and hardware-path evidence.',
      modelAnswer:
        'Capture the room, event context, device type, symptom pattern, any lamp or thermal message, steps already tried, and whether a fallback source worked. Note that the problem appears recurring so the room can be tracked properly.',
      commonMistakes: ['Logging it only as "screen cuts out"', 'Forgetting recurrence and room context'],
      dcsContext: 'Assembly and event rooms often need stronger recurrence notes than day-to-day classroom issues.',
      reviewSchedule,
      recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
      weakTopic: 'classroom-av',
      rubric: ['Names room and device type', 'Mentions thermal or recurrence clues', 'Supports room-level follow-up']
    })
  ],
  addScenarioPrompts: buildScenarioPrompts('viewboard-deepen', [
    {
      title: 'HDMI works but no audio',
      prompt: 'Explain the shortest safe check sequence for picture restored but no room sound.'
    }
  ])
};

export const endpointModules = [
  enhanceModule(basePrinters, printerEnhancement),
  enhanceModule(baseViewboards, viewboardEnhancement)
];
