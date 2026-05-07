import type { Scenario } from '../types/scenarios';

const defaultNoteRubric: Scenario['noteRubric'] = [
  {
    id: 'symptom',
    label: 'Symptom clarity',
    description: 'Names the exact issue rather than vague frustration.'
  },
  {
    id: 'scope',
    label: 'Scope',
    description: 'Shows who, where, or how broad the issue is.'
  },
  {
    id: 'steps',
    label: 'Steps tried',
    description: 'Records safe checks already completed.'
  },
  {
    id: 'urgency',
    label: 'Urgency and impact',
    description: 'States why this matters now without exaggeration.'
  },
  {
    id: 'privacy',
    label: 'Privacy-safe wording',
    description: 'Avoids unnecessary private detail while staying useful.'
  }
];

type ScenarioSeed = Omit<Scenario, 'jiraNotePrompt' | 'noteRubric'> & {
  jiraNotePrompt?: string;
};

function scenario(seed: ScenarioSeed): Scenario {
  return {
    ...seed,
    jiraNotePrompt:
      seed.jiraNotePrompt ||
      'Write a Jira-style escalation note with who or what is affected, exact symptom, scope, safe steps tried, impact, and a privacy-safe next action.',
    noteRubric: defaultNoteRubric
  };
}

export const scenarios: Scenario[] = [
  scenario({
    id: 'no-internet-classroom',
    title: 'No internet in classroom',
    summary: 'A teacher reports that the room has no internet and class is already underway.',
    focus: ['scope', 'safe checks', 'network language', 'escalation note'],
    estimatedMinutes: 10,
    initialReport:
      'A teacher in Room 7 says student laptops and the teacher device cannot reach class resources. The class is waiting.',
    contextBullets: [
      'Visible classroom pressure matters.',
      'Josh should not jump into risky network changes.',
      'The first priority is to clarify scope and keep the response structured.'
    ],
    steps: [
      {
        id: 'internet-step-1',
        title: 'First check',
        prompt: 'What should Josh do first?',
        choices: [
          {
            id: 'internet-1a',
            label: 'Open advanced adapter settings and start changing values',
            outcome: 'That is too deep too early and risks making the symptom less trustworthy.',
            riskNote: 'Unsafe for Level 1 without evidence.',
            correct: false
          },
          {
            id: 'internet-1b',
            label: 'Clarify whether one device or many are affected, and confirm the room and network context',
            outcome: 'Good. Scope and room context come first because they shape every next step.',
            riskNote: 'Low-risk, high-value triage.',
            correct: true
          },
          {
            id: 'internet-1c',
            label: 'Assume the whole school network is down and call it an outage',
            outcome: 'That overclaims too early from limited evidence.',
            riskNote: 'Broad assumptions create noisy escalations.',
            correct: false
          }
        ],
        recommendedChoiceId: 'internet-1b'
      },
      {
        id: 'internet-step-2',
        title: 'New information',
        newInformation:
          'The teacher says both her laptop and two student devices show the same symptom in Room 7, but a nearby staff room device is working.',
        prompt: 'What is the best next move?',
        choices: [
          {
            id: 'internet-2a',
            label: 'Compare Room 7 with another nearby space and confirm the devices are on the correct SSID',
            outcome: 'Good. That narrows whether this is room-specific or device-specific without risky change.',
            riskNote: 'Safe comparison before escalation.',
            correct: true
          },
          {
            id: 'internet-2b',
            label: 'Start deleting saved Wi-Fi profiles from every student laptop',
            outcome: 'That is too invasive for the evidence you currently have.',
            riskNote: 'High disruption, low clarity.',
            correct: false
          },
          {
            id: 'internet-2c',
            label: 'Ignore the staff room comparison because it is a different user',
            outcome: 'That loses valuable scope evidence.',
            riskNote: 'Missed diagnostic leverage.',
            correct: false
          }
        ],
        recommendedChoiceId: 'internet-2a'
      },
      {
        id: 'internet-step-3',
        title: 'Escalation moment',
        newInformation:
          'Room 7 devices are on the right SSID. A nearby device outside the room works. The class is still blocked after safe checks.',
        prompt: 'What should Josh do now?',
        choices: [
          {
            id: 'internet-3a',
            label: 'Escalate as a likely room or local network-path issue with room, scope, and checks tried',
            outcome: 'Good. Josh has enough evidence to escalate without overclaiming a root cause.',
            riskNote: 'Fast, evidence-based escalation.',
            correct: true
          },
          {
            id: 'internet-3b',
            label: 'Keep experimenting until the class loses more time',
            outcome: 'That burns class time without increasing safety or clarity.',
            riskNote: 'Poor classroom judgement.',
            correct: false
          },
          {
            id: 'internet-3c',
            label: 'Promise the teacher you can fix the access point settings yourself',
            outcome: 'That oversteps Level 1 boundaries.',
            riskNote: 'Unsafe authority claim.',
            correct: false
          }
        ],
        recommendedChoiceId: 'internet-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Clarify one device versus many and confirm room context.',
      'Confirm the correct SSID and compare with a nearby known-good device.',
      'Escalate with room, scope, and safe steps tried once the issue remains and class time is being hit.'
    ],
    escalationPoint:
      'Escalate once the symptom clearly affects multiple devices in the room and safe first checks do not restore service.',
    ticketNoteExample:
      'Room 7: teacher laptop and at least two student laptops cannot reach class resources on the correct SSID. Nearby device outside the room works. Safe comparison completed; likely room-specific network issue. Class currently impacted.',
    jiraNotePrompt:
      'Write the Jira note for a likely room-specific network issue. Include room, who is affected, SSID check, nearby comparison result, impact on class, and privacy-safe wording.',
    riskNote:
      'Do not invent network root causes or make production admin changes. Preserve the evidence and protect class time.',
    recommendedModuleIds: ['dcs-it-support-foundations', 'dns-dhcp-gateway-ip-basics']
  }),
  scenario({
    id: 'staff-offboarding-access',
    title: 'Staff offboarding and M365 access',
    summary: 'A manager says a departing staff member still appears active and wants the issue handled quickly.',
    focus: ['identity sequencing', 'authority', 'privacy', 'documentation'],
    estimatedMinutes: 10,
    initialReport:
      'A departing staff member still appears active in Teams. A manager wants it sorted quickly before the end of the day.',
    contextBullets: [
      'Identity work can affect access, privacy, and continuity.',
      'Josh should understand the sequence but not claim admin authority.',
      'The note should be exact without copying sensitive detail into personal tools.'
    ],
    steps: [
      {
        id: 'offboard-step-1',
        title: 'First response',
        prompt: 'What should Josh do first?',
        choices: [
          {
            id: 'offboard-1a',
            label: 'Clarify the requested outcome, current symptom, and who owns the authorised action',
            outcome: 'Good. Identity issues need confirmed scope and ownership before action.',
            riskNote: 'Protects authority boundaries.',
            correct: true
          },
          {
            id: 'offboard-1b',
            label: 'Start disabling groups and sessions directly because it sounds urgent',
            outcome: 'That assumes authority and risks unsafe changes.',
            riskNote: 'High access and privacy risk.',
            correct: false
          },
          {
            id: 'offboard-1c',
            label: 'Ignore it because Teams presence is never important',
            outcome: 'That dismisses a legitimate identity concern.',
            riskNote: 'Poor risk judgement.',
            correct: false
          }
        ],
        recommendedChoiceId: 'offboard-1a'
      },
      {
        id: 'offboard-step-2',
        title: 'New information',
        newInformation:
          'The manager confirms the staff member has left, but Josh cannot verify which offboarding steps have already been completed.',
        prompt: 'What next?',
        choices: [
          {
            id: 'offboard-2a',
            label: 'Document the current visible state and escalate for sequence review by the authorised owner',
            outcome: 'Good. That captures the symptom without pretending certainty or authority.',
            riskNote: 'Safe identity posture.',
            correct: true
          },
          {
            id: 'offboard-2b',
            label: 'Assume nothing was done and tell the manager the whole process failed',
            outcome: 'That is too strong a claim from incomplete information.',
            riskNote: 'Creates noise and distrust.',
            correct: false
          },
          {
            id: 'offboard-2c',
            label: "Ask for the departing staff member's password to check everything yourself",
            outcome: 'That is a security and privacy failure.',
            riskNote: 'Never request passwords.',
            correct: false
          }
        ],
        recommendedChoiceId: 'offboard-2a'
      },
      {
        id: 'offboard-step-3',
        title: 'Final response',
        newInformation:
          'The authorised owner is available to take the escalation if the note is clear and manager-safe.',
        prompt: 'What should Josh include?',
        choices: [
          {
            id: 'offboard-3a',
            label: 'Requested outcome, current service symptom, timing, urgency, and that sequence review is needed',
            outcome: 'Good. That is a clean, action-ready handoff.',
            riskNote: 'Precise and privacy-safe.',
            correct: true
          },
          {
            id: 'offboard-3b',
            label: 'Every personal detail Josh can find about the departing staff member',
            outcome: 'That overshares and adds privacy risk.',
            riskNote: 'Unnecessary sensitive detail.',
            correct: false
          },
          {
            id: 'offboard-3c',
            label: 'A vague sentence saying "Please sort the account thing"',
            outcome: 'That hides the symptom and slows the fix.',
            riskNote: 'Weak escalation quality.',
            correct: false
          }
        ],
        recommendedChoiceId: 'offboard-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Clarify the requested outcome and authorised owner.',
      'Capture the exact current visible state without assuming the whole sequence.',
      'Escalate for identity sequence review with a short privacy-safe note.'
    ],
    escalationPoint:
      'Escalate as soon as the issue moves beyond observation and documentation into identity-action territory.',
    ticketNoteExample:
      'Departure-related identity concern: manager reports former staff member still appears active in Teams. Requested outcome is confirmation of correct offboarding state. Current visible symptom captured; sequence review requested via authorised owner.',
    jiraNotePrompt:
      'Write the identity escalation note you would send here. Keep it manager-safe, sequence-aware, and free of unnecessary personal detail.',
    riskNote:
      'Do not copy sensitive personal details into the PD app or ask for credentials. Identity work must stay within authorised systems and ownership.',
    recommendedModuleIds: ['m365-identity-offboarding-basics', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'viewboard-display-issue',
    title: 'ViewBoard display issue',
    summary: 'A teacher laptop will not display during class and time pressure is rising.',
    focus: ['display chain', 'classroom pressure', 'touch versus picture', 'evidence-rich escalation'],
    estimatedMinutes: 10,
    initialReport:
      "A teacher's laptop is connected at the front of the room, but nothing appears on the ViewBoard.",
    contextBullets: [
      'Class time is being lost in public.',
      'The safest first actions are visible and reversible.',
      'Josh needs a short sequence, not a long experiment.'
    ],
    steps: [
      {
        id: 'viewboard-step-1',
        title: 'First move',
        prompt: 'What should Josh do first?',
        choices: [
          {
            id: 'viewboard-1a',
            label: 'Check power, selected input, and cable or dock seating',
            outcome: 'Good. That covers the most common visible faults first.',
            riskNote: 'Fast and reversible.',
            correct: true
          },
          {
            id: 'viewboard-1b',
            label: 'Factory reset the display before the class starts asking questions',
            outcome: 'That is far too heavy and risky for a first move.',
            riskNote: 'High-disruption action.',
            correct: false
          },
          {
            id: 'viewboard-1c',
            label: 'Assume the cable is fine and start reinstalling apps',
            outcome: 'That skips the visible chain and burns time.',
            riskNote: 'Poor sequencing.',
            correct: false
          }
        ],
        recommendedChoiceId: 'viewboard-1a'
      },
      {
        id: 'viewboard-step-2',
        title: 'New information',
        newInformation: 'The display now shows the laptop picture, but touch is still not working.',
        prompt: 'How should Josh reason about this change?',
        choices: [
          {
            id: 'viewboard-2a',
            label: 'Treat touch as a separate path and check the USB or control connection',
            outcome: 'Good. Video and touch often travel on different links.',
            riskNote: 'Symptom-based reasoning.',
            correct: true
          },
          {
            id: 'viewboard-2b',
            label: 'Start the whole process again from scratch with no symptom distinction',
            outcome: 'That ignores the valuable clue that picture is already restored.',
            riskNote: 'Wastes class time.',
            correct: false
          },
          {
            id: 'viewboard-2c',
            label: 'Tell the teacher touch is unrelated and leave immediately',
            outcome: 'That may abandon a relevant classroom function too early.',
            riskNote: 'Drops the user need without assessment.',
            correct: false
          }
        ],
        recommendedChoiceId: 'viewboard-2a'
      },
      {
        id: 'viewboard-step-3',
        title: 'Decision point',
        newInformation:
          'Touch still fails after a quick safe check, and the lesson is slipping behind schedule.',
        prompt: 'What now?',
        choices: [
          {
            id: 'viewboard-3a',
            label: 'Offer the best short fallback available and escalate with the exact symptom split',
            outcome: 'Good. Josh has protected class time and captured the right evidence.',
            riskNote: 'Strong classroom judgement.',
            correct: true
          },
          {
            id: 'viewboard-3b',
            label: 'Keep testing until the whole lesson is lost',
            outcome: "That values persistence over the teacher's actual need.",
            riskNote: 'Poor support trade-off.',
            correct: false
          },
          {
            id: 'viewboard-3c',
            label: 'Write "display broken" with no extra detail',
            outcome: 'That wastes the clue that picture works but touch does not.',
            riskNote: 'Weak note quality.',
            correct: false
          }
        ],
        recommendedChoiceId: 'viewboard-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Check the visible chain first: power, input, and cable or dock.',
      'Use symptom changes to narrow the fault path, especially picture versus touch.',
      'Once quick safe checks are exhausted, protect class time and escalate with the exact symptom split.'
    ],
    escalationPoint:
      'Escalate once the quick chain checks are exhausted and the class is continuing to lose time.',
    ticketNoteExample:
      'Room 9 ViewBoard: teacher laptop now displays correctly after input and cable check, but touch remains non-functional. Quick USB or control-path check did not restore touch. Lesson currently impacted; escalation requested.',
    jiraNotePrompt:
      'Write the escalation note for picture restored but touch still broken. Include room, symptom split, quick checks, and class impact.',
    riskNote:
      'Avoid deep configuration work in front of the class. Protect class flow and keep the escalation exact.',
    recommendedModuleIds: [
      'classroom-display-viewboard-troubleshooting',
      'ticket-notes-escalation-quality'
    ]
  }),
  scenario({
    id: 'hdmi-works-no-audio',
    title: 'HDMI works but no audio',
    summary: 'The classroom screen shows the teacher laptop perfectly, but the room still has no sound.',
    focus: ['audio path', 'Windows playback device', 'class pressure', 'clear notes'],
    estimatedMinutes: 8,
    initialReport:
      'A teacher says the HDMI cable is fine because the picture is visible, but their lesson audio will not play through the room.',
    contextBullets: [
      'Picture and audio can fail on different paths.',
      'Class time is already under pressure.',
      'The note should preserve the symptom split clearly.'
    ],
    steps: [
      {
        id: 'hdmi-audio-step-1',
        title: 'First reasoning move',
        prompt: 'What should Josh do first?',
        choices: [
          {
            id: 'hdmi-audio-1a',
            label: 'Treat it as a no-picture issue and restart the whole display chain immediately',
            outcome: 'That ignores the valuable clue that picture already works.',
            riskNote: 'Poor symptom separation.',
            correct: false
          },
          {
            id: 'hdmi-audio-1b',
            label: 'Check the playback device and room audio path because picture is already restored',
            outcome: 'Good. The picture clue narrows the fault path to audio selection or room audio routing.',
            riskNote: 'Fast, symptom-based check.',
            correct: true
          },
          {
            id: 'hdmi-audio-1c',
            label: 'Assume the network is causing the room sound failure',
            outcome: 'That jumps away from the immediate evidence.',
            riskNote: 'Noisy diagnosis.',
            correct: false
          }
        ],
        recommendedChoiceId: 'hdmi-audio-1b'
      },
      {
        id: 'hdmi-audio-step-2',
        title: 'New information',
        newInformation: 'The laptop shows multiple playback devices and the wrong one appears selected.',
        prompt: 'What is the best next move?',
        choices: [
          {
            id: 'hdmi-audio-2a',
            label: 'Switch to the room or display playback device and test briefly',
            outcome: 'Good. This is a quick, reversible check based on the actual symptom.',
            riskNote: 'Low-risk next step.',
            correct: true
          },
          {
            id: 'hdmi-audio-2b',
            label: 'Reinstall all audio drivers in front of the class',
            outcome: 'That is too heavy for the current evidence and time pressure.',
            riskNote: 'High disruption.',
            correct: false
          },
          {
            id: 'hdmi-audio-2c',
            label: 'Tell the teacher the audio path is not part of display support',
            outcome: 'That abandons a real classroom need too early.',
            riskNote: 'Poor support ownership.',
            correct: false
          }
        ],
        recommendedChoiceId: 'hdmi-audio-2a'
      },
      {
        id: 'hdmi-audio-step-3',
        title: 'Decision point',
        newInformation:
          'The quick playback-device check does not restore sound and the lesson cannot wait much longer.',
        prompt: 'What should Josh do now?',
        choices: [
          {
            id: 'hdmi-audio-3a',
            label: 'Offer a short fallback and escalate with the picture-versus-audio split clearly written',
            outcome: 'Good. The note now preserves the most useful clue for the next tech.',
            riskNote: 'Protects class time.',
            correct: true
          },
          {
            id: 'hdmi-audio-3b',
            label: 'Keep experimenting until the lesson falls apart',
            outcome: 'That values persistence over the teacher’s actual need.',
            riskNote: 'Poor judgement under time pressure.',
            correct: false
          },
          {
            id: 'hdmi-audio-3c',
            label: 'Write "HDMI not working" and move on',
            outcome: 'That loses the best evidence in the incident.',
            riskNote: 'Weak note quality.',
            correct: false
          }
        ],
        recommendedChoiceId: 'hdmi-audio-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Keep the picture-versus-audio symptom split visible.',
      'Check the playback device and room audio path first.',
      'Escalate with exact audio evidence once quick safe checks are exhausted.'
    ],
    escalationPoint: 'Escalate after the quick playback and room-audio checks fail and class time is being lost.',
    ticketNoteExample:
      'Room 4 display shows correctly from teacher laptop, but room audio still absent. Quick playback-device check performed with no restore. Lesson media currently impacted; escalation requested.',
    jiraNotePrompt:
      'Write the Jira note for picture working but no room audio. Make the audio-path clue obvious.',
    riskNote: 'Do not collapse this into a generic HDMI complaint. The audio-path clue is the whole value.',
    recommendedModuleIds: [
      'classroom-display-viewboard-troubleshooting',
      'ticket-notes-escalation-quality'
    ]
  }),
  scenario({
    id: 'student-laptop-169-254',
    title: 'Student laptop has 169.254',
    summary: 'A student laptop cannot reach class resources and shows a 169.254 address.',
    focus: ['DHCP reasoning', 'SSID checks', 'comparison', 'network note quality'],
    estimatedMinutes: 8,
    initialReport:
      'A student laptop in class cannot reach anything. The teacher says the class is starting now and the device appears to show 169.254.',
    contextBullets: [
      '169.254 is a clue, not a complete diagnosis.',
      'The right SSID and nearby comparison still matter.',
      'Avoid deep adapter changes at Level 1.'
    ],
    steps: [
      {
        id: 'apipa-step-1',
        title: 'First response',
        prompt: 'What should Josh do first?',
        choices: [
          {
            id: 'apipa-1a',
            label: 'Treat 169.254 as a clue about missing DHCP lease and confirm the network context',
            outcome: 'Good. This keeps the evidence grounded instead of magical.',
            riskNote: 'Strong first-line reasoning.',
            correct: true
          },
          {
            id: 'apipa-1b',
            label: 'Assume the gateway is definitely down for the whole school',
            outcome: 'That overclaims from one clue on one device.',
            riskNote: 'Poor scope judgement.',
            correct: false
          },
          {
            id: 'apipa-1c',
            label: 'Start rewriting the adapter configuration manually',
            outcome: 'That is too deep and risky for the current evidence.',
            riskNote: 'Unsafe Level 1 change.',
            correct: false
          }
        ],
        recommendedChoiceId: 'apipa-1a'
      },
      {
        id: 'apipa-step-2',
        title: 'New information',
        newInformation:
          'Other nearby devices on the intended SSID are working, and this laptop had recently been moved between rooms.',
        prompt: 'What is the best next judgement?',
        choices: [
          {
            id: 'apipa-2a',
            label: 'Keep the issue narrow and check whether the laptop is on the correct SSID or needs a clean reconnect',
            outcome: 'Good. The nearby working devices change the likely scope.',
            riskNote: 'Safe device-specific reasoning.',
            correct: true
          },
          {
            id: 'apipa-2b',
            label: 'Escalate the entire room as a network outage',
            outcome: 'That ignores the most useful comparison evidence.',
            riskNote: 'Noisy escalation.',
            correct: false
          },
          {
            id: 'apipa-2c',
            label: 'Tell the teacher the laptop probably needs Windows reinstalled',
            outcome: 'That is far too strong from the current symptom set.',
            riskNote: 'Wild overreach.',
            correct: false
          }
        ],
        recommendedChoiceId: 'apipa-2a'
      },
      {
        id: 'apipa-step-3',
        title: 'Escalation threshold',
        newInformation:
          'The SSID is correct, a reconnect attempt still leaves the laptop unable to obtain a normal address, and class time is still moving.',
        prompt: 'What should Josh do now?',
        choices: [
          {
            id: 'apipa-3a',
            label: 'Escalate as a device-specific network onboarding or DHCP path issue with the evidence preserved',
            outcome: 'Good. The note stays accurate and useful.',
            riskNote: 'Evidence-rich escalation.',
            correct: true
          },
          {
            id: 'apipa-3b',
            label: 'Keep guessing until the class loses more time',
            outcome: 'That does not improve the signal and hurts the classroom.',
            riskNote: 'Poor trade-off.',
            correct: false
          },
          {
            id: 'apipa-3c',
            label: 'Write only "internet not working"',
            outcome: 'That hides the strongest clue in the case.',
            riskNote: 'Weak note quality.',
            correct: false
          }
        ],
        recommendedChoiceId: 'apipa-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Treat 169.254 as a DHCP clue, not a final diagnosis.',
      'Confirm SSID and compare with nearby working devices.',
      'Escalate with device-specific evidence once quick reconnect checks fail.'
    ],
    escalationPoint:
      'Escalate when the device remains unable to obtain a valid address after safe network-context checks.',
    ticketNoteExample:
      'Student laptop in Room 6 shows 169.254 and cannot reach class resources on the intended SSID. Nearby devices in the same area are working. Reconnect attempt did not restore a normal lease. Device-specific escalation requested.',
    jiraNotePrompt:
      'Write the escalation note for this 169.254 case. Keep the DHCP clue, SSID check, and nearby comparison visible.',
    riskNote: 'Do not treat one APIPA-style clue as proof of a whole-campus outage.',
    recommendedModuleIds: ['dns-dhcp-gateway-ip-basics', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'printer-jobs-stuck-in-queue',
    title: 'Printer jobs stuck in queue',
    summary: 'Users say documents are not printing and the queue appears to be filling up.',
    focus: ['queue versus release', 'scope', 'device versus path', 'service handoff'],
    estimatedMinutes: 8,
    initialReport:
      'Several staff say their jobs are not appearing on paper. The queue looks busy, and one user mentions they expected Follow-Me release to work.',
    contextBullets: [
      'Printing can fail at the queue, release, or device layer.',
      'One user versus many users changes the likely scope.',
      'A copier or Follow-Me path may be involved.'
    ],
    steps: [
      {
        id: 'queue-step-1',
        title: 'First distinction',
        prompt: 'What should Josh clarify first?',
        choices: [
          {
            id: 'queue-1a',
            label: 'Whether the jobs are stuck before release, waiting for release, or blocked by the device itself',
            outcome: 'Good. That is the main diagnostic split in this incident.',
            riskNote: 'High-value first question.',
            correct: true
          },
          {
            id: 'queue-1b',
            label: 'Whether Windows itself should be reinstalled for every user',
            outcome: 'That is a huge leap from the current evidence.',
            riskNote: 'Unhelpful overreaction.',
            correct: false
          },
          {
            id: 'queue-1c',
            label: 'Whether the school network must be fully down',
            outcome: 'That is too broad too early.',
            riskNote: 'Poor scope control.',
            correct: false
          }
        ],
        recommendedChoiceId: 'queue-1a'
      },
      {
        id: 'queue-step-2',
        title: 'New information',
        newInformation:
          'The jobs do appear in the system, but staff report they still need to authenticate at the copier and the device also shows a warning.',
        prompt: 'What is the best next judgement?',
        choices: [
          {
            id: 'queue-2a',
            label: 'Treat this as a release or device-side incident rather than only a workstation queue problem',
            outcome: 'Good. Submission appears to work, so the failure point has shifted.',
            riskNote: 'Strong path reasoning.',
            correct: true
          },
          {
            id: 'queue-2b',
            label: 'Delete all queued jobs for every user immediately',
            outcome: 'That may destroy evidence and not solve the actual layer failing.',
            riskNote: 'Risky without clarity.',
            correct: false
          },
          {
            id: 'queue-2c',
            label: 'Ignore the copier warning because queue issues never involve the device',
            outcome: 'That throws away a valuable clue.',
            riskNote: 'Missed evidence.',
            correct: false
          }
        ],
        recommendedChoiceId: 'queue-2a'
      },
      {
        id: 'queue-step-3',
        title: 'Handoff threshold',
        newInformation:
          'The device warning remains, multiple users are affected, and teaching staff are now waiting on print release.',
        prompt: 'What should Josh do now?',
        choices: [
          {
            id: 'queue-3a',
            label: 'Escalate with the queue-versus-release-versus-device distinction clearly written',
            outcome: 'Good. The note now tells the next person where the likely failure path sits.',
            riskNote: 'Strong service-call handoff.',
            correct: true
          },
          {
            id: 'queue-3b',
            label: 'Tell users to keep trying randomly until it clears',
            outcome: 'That increases frustration and preserves nothing.',
            riskNote: 'Poor support quality.',
            correct: false
          },
          {
            id: 'queue-3c',
            label: 'Write only "printer queue stuck"',
            outcome: 'That hides the most useful evidence in the case.',
            riskNote: 'Weak escalation.',
            correct: false
          }
        ],
        recommendedChoiceId: 'queue-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Separate queue submission from release and device behaviour.',
      'Use the copier warning as a meaningful clue.',
      'Escalate with scope and failure-layer reasoning once multiple users are blocked.'
    ],
    escalationPoint:
      'Escalate once the evidence shows jobs are reaching the system but failing at release or device level for multiple users.',
    ticketNoteExample:
      'Multiple staff jobs appear in the print system but remain blocked at release/device stage. Copier shows warning and users still need authentication at the device. Multi-user impact now affecting work flow.',
    jiraNotePrompt:
      'Write the Jira note so the next tech can immediately see whether this is queue, release, or device related.',
    riskNote: 'Do not flatten the problem into one generic print complaint when the layer clues are already visible.',
    recommendedModuleIds: ['printer-troubleshooting', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'laser-printer-toner-rubs-off',
    title: 'Laser printer toner rubs off',
    summary: 'A staff member says the page prints, but the toner wipes off and copying quality is poor too.',
    focus: ['print quality clues', 'device versus queue', 'service-call evidence', 'scope'],
    estimatedMinutes: 8,
    initialReport:
      'A teacher says the printer is producing readable pages, but the toner rubs off and the photocopier output also looks poor.',
    contextBullets: [
      'This is a quality issue, not only a delivery issue.',
      'Printing and copying both matter in the note.',
      'Consumable or device path clues are valuable.'
    ],
    steps: [
      {
        id: 'toner-step-1',
        title: 'First judgement',
        prompt: 'What should Josh recognise first?',
        choices: [
          {
            id: 'toner-1a',
            label: 'The job is printing, so this points more toward device or quality path than wrong queue',
            outcome: 'Good. Paper output changes the problem category.',
            riskNote: 'Useful symptom reading.',
            correct: true
          },
          {
            id: 'toner-1b',
            label: 'This must still be only the user choosing the wrong printer',
            outcome: 'That ignores the quality symptom on paper.',
            riskNote: 'Missed clue.',
            correct: false
          },
          {
            id: 'toner-1c',
            label: 'Delete the driver because toner issues are always software',
            outcome: 'That is not supported by the symptom.',
            riskNote: 'Poor fault interpretation.',
            correct: false
          }
        ],
        recommendedChoiceId: 'toner-1a'
      },
      {
        id: 'toner-step-2',
        title: 'New information',
        newInformation:
          'The same poor result appears when copying directly at the device, not just when printing from a computer.',
        prompt: 'What does this change?',
        choices: [
          {
            id: 'toner-2a',
            label: 'It strengthens the case that this is device or consumable quality rather than user print path',
            outcome: 'Good. Copying uses the device too and confirms the scope of the quality issue.',
            riskNote: 'Strong device clue.',
            correct: true
          },
          {
            id: 'toner-2b',
            label: 'It means the network path is definitely broken',
            outcome: 'That does not fit the evidence.',
            riskNote: 'Wrong mechanism.',
            correct: false
          },
          {
            id: 'toner-2c',
            label: 'It no longer matters what the visible symptom is',
            outcome: 'The visible symptom matters even more now.',
            riskNote: 'Bad note discipline.',
            correct: false
          }
        ],
        recommendedChoiceId: 'toner-2a'
      },
      {
        id: 'toner-step-3',
        title: 'Service handoff',
        newInformation:
          'The device remains usable enough to test, but the output quality is unacceptable for staff work and the lesson prep is delayed.',
        prompt: 'What should Josh write?',
        choices: [
          {
            id: 'toner-3a',
            label: 'An escalation note naming the toner-rubs-off symptom, copy-plus-print scope, and device quality concern',
            outcome: 'Good. The note now supports servicing rather than generic queue troubleshooting.',
            riskNote: 'Strong service-call language.',
            correct: true
          },
          {
            id: 'toner-3b',
            label: 'Only "printer broken" with no symptom detail',
            outcome: 'That throws away the best evidence.',
            riskNote: 'Weak handoff.',
            correct: false
          },
          {
            id: 'toner-3c',
            label: 'No note, because the printer still sort of works',
            outcome: 'That underplays a real quality failure.',
            riskNote: 'Poor urgency judgement.',
            correct: false
          }
        ],
        recommendedChoiceId: 'toner-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Recognise that pages are printing but quality is failing.',
      'Use copy-plus-print scope to confirm a device-quality path.',
      'Escalate with exact print-quality language for servicing.'
    ],
    escalationPoint: 'Escalate once the quality issue is confirmed across both printing and copying.',
    ticketNoteExample:
      'Copier in staff area produces pages, but toner rubs off and output quality is poor on both print and direct copy. Device-quality servicing concern; staff work currently delayed.',
    jiraNotePrompt:
      'Write the service note for this print-quality fault. Keep the copy-plus-print clue and the exact symptom visible.',
    riskNote: 'Do not route a device-quality symptom like a generic queue complaint.',
    recommendedModuleIds: ['printer-troubleshooting', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'guest-wifi-segmentation-rules',
    title: 'Guest Wi-Fi segmentation rules',
    summary: 'A staff member wants guest devices to reach internal classroom gear for an event.',
    focus: ['design intent', 'allow/block thinking', 'business need', 'safe escalation'],
    estimatedMinutes: 8,
    initialReport:
      'A teacher running an event says guest devices need to reach a classroom TV and printer because the internet already works on guest Wi-Fi.',
    contextBullets: [
      'Internet access is not the same as internal-device access.',
      'The event timing may make the request urgent.',
      'Josh should capture the need, not promise a bypass.'
    ],
    steps: [
      {
        id: 'guest-step-1',
        title: 'First judgement',
        prompt: 'What is the best first response?',
        choices: [
          {
            id: 'guest-1a',
            label: 'Explain that guest internet access does not automatically include internal device access',
            outcome: 'Good. This resets the conversation to the real design question.',
            riskNote: 'Strong plain-English networking.',
            correct: true
          },
          {
            id: 'guest-1b',
            label: 'Promise that guest networks should always reach everything if the internet works',
            outcome: 'That is technically and operationally unsafe.',
            riskNote: 'False promise.',
            correct: false
          },
          {
            id: 'guest-1c',
            label: 'Tell them to plug into any random internal port',
            outcome: 'That suggests an unsafe workaround.',
            riskNote: 'Security risk.',
            correct: false
          }
        ],
        recommendedChoiceId: 'guest-1a'
      },
      {
        id: 'guest-step-2',
        title: 'New information',
        newInformation:
          'The event is tomorrow morning, and the staff member says they specifically need display and print access from guest devices.',
        prompt: 'What should Josh capture next?',
        choices: [
          {
            id: 'guest-2a',
            label: 'The exact source network, destination devices, event timing, and business need',
            outcome: 'Good. That is the minimum useful request language.',
            riskNote: 'Clear escalation input.',
            correct: true
          },
          {
            id: 'guest-2b',
            label: 'Nothing else, because networking teams should just know what to do',
            outcome: 'That leaves the request underspecified.',
            riskNote: 'Weak handoff.',
            correct: false
          },
          {
            id: 'guest-2c',
            label: 'Only the name of the teacher',
            outcome: 'That is not enough to assess the path need.',
            riskNote: 'Poor request quality.',
            correct: false
          }
        ],
        recommendedChoiceId: 'guest-2a'
      },
      {
        id: 'guest-step-3',
        title: 'Escalation boundary',
        newInformation:
          'There is no approved exception yet, and the need clearly involves guest-to-internal access.',
        prompt: 'What should Josh do now?',
        choices: [
          {
            id: 'guest-3a',
            label: 'Escalate the business requirement and timing without suggesting an unauthorised workaround',
            outcome: 'Good. Josh has captured the path request without overstepping.',
            riskNote: 'Safe segmentation posture.',
            correct: true
          },
          {
            id: 'guest-3b',
            label: 'Try to bypass the segmentation control yourself because the event is urgent',
            outcome: 'Urgency does not create authorisation.',
            riskNote: 'Unsafe boundary crossing.',
            correct: false
          },
          {
            id: 'guest-3c',
            label: 'Write only "guest Wi-Fi issue"',
            outcome: 'That hides the actual access-path request.',
            riskNote: 'Weak note quality.',
            correct: false
          }
        ],
        recommendedChoiceId: 'guest-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Separate guest internet from internal-device reachability.',
      'Capture exact source, destination, timing, and business need.',
      'Escalate the access request rather than promising a workaround.'
    ],
    escalationPoint:
      'Escalate once it is clear the request requires a deliberate guest-to-internal access decision.',
    ticketNoteExample:
      'Event request: guest Wi-Fi devices need temporary access to classroom TV and printer for tomorrow morning event. Guest internet works as designed; business need is guest-to-internal device reachability. Escalation for approved path review requested.',
    jiraNotePrompt:
      'Write the note for a guest-to-internal access request. Include source network, destination devices, timing, and business need.',
    riskNote: 'Do not confuse an access request with a random Wi-Fi fault.',
    recommendedModuleIds: ['vlans-network-segmentation', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'phishing-email-reported',
    title: 'Phishing email reported by staff',
    summary: 'A staff member reports a suspicious email and wants to know what to do next.',
    focus: ['security judgement', 'privacy boundaries', 'incident note discipline', 'safe escalation'],
    estimatedMinutes: 8,
    initialReport:
      'A staff member tells Josh they may have received a phishing email and wants help quickly.',
    contextBullets: [
      'Security concerns need urgency and restraint together.',
      'The PD app should never become a place for copied live incident detail.',
      'Josh should focus on the safe response path and note quality.'
    ],
    steps: [
      {
        id: 'phish-step-1',
        title: 'First response',
        prompt: 'What should Josh do first?',
        choices: [
          {
            id: 'phish-1a',
            label: 'Treat it as a security-sensitive incident and follow the approved reporting or escalation path',
            outcome: 'Good. The issue needs urgency without casual handling.',
            riskNote: 'Strong security posture.',
            correct: true
          },
          {
            id: 'phish-1b',
            label: 'Paste the full suspicious email into the PD app so nothing is forgotten',
            outcome: 'That creates a privacy and incident-handling problem.',
            riskNote: 'Do not move live incident detail into personal tools.',
            correct: false
          },
          {
            id: 'phish-1c',
            label: 'Ignore it until the end of the day because email is often annoying',
            outcome: 'That underplays a possible security incident.',
            riskNote: 'Poor urgency judgement.',
            correct: false
          }
        ],
        recommendedChoiceId: 'phish-1a'
      },
      {
        id: 'phish-step-2',
        title: 'New information',
        newInformation:
          'The staff member is worried they may have clicked once, but they are unsure what happened afterwards.',
        prompt: 'What should Josh capture?',
        choices: [
          {
            id: 'phish-2a',
            label: 'High-level incident facts such as possible interaction, timing, and the approved escalation path',
            outcome: 'Good. That preserves useful risk context without copying the entire incident.',
            riskNote: 'Useful and restrained.',
            correct: true
          },
          {
            id: 'phish-2b',
            label: 'Their password so you can test the account yourself',
            outcome: 'That is never appropriate.',
            riskNote: 'Severe security failure.',
            correct: false
          },
          {
            id: 'phish-2c',
            label: 'Only your personal guess that it is probably nothing',
            outcome: 'That does not preserve the risk properly.',
            riskNote: 'Weak incident judgement.',
            correct: false
          }
        ],
        recommendedChoiceId: 'phish-2a'
      },
      {
        id: 'phish-step-3',
        title: 'Documentation choice',
        newInformation:
          'Josh still wants to learn from the incident later without storing sensitive detail in the app.',
        prompt: 'What is the safer approach?',
        choices: [
          {
            id: 'phish-3a',
            label: 'Record the high-level lesson and safe escalation pattern only, not the live message detail',
            outcome: 'Good. That keeps the PD record useful without turning it into an incident archive.',
            riskNote: 'Privacy-safe learning.',
            correct: true
          },
          {
            id: 'phish-3b',
            label: 'Copy everything into the error log because it stays local',
            outcome: 'Local-only does not remove the privacy problem.',
            riskNote: 'Unsafe data handling.',
            correct: false
          },
          {
            id: 'phish-3c',
            label: 'Write no note at all because security topics cannot be learned from',
            outcome: 'You can still learn the pattern safely without storing live content.',
            riskNote: 'Missed learning opportunity.',
            correct: false
          }
        ],
        recommendedChoiceId: 'phish-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Escalate through the approved security path promptly.',
      'Capture only the high-level risk facts needed for handoff.',
      'Keep the PD app limited to the safe lesson pattern, not live incident detail.'
    ],
    escalationPoint: 'Escalate immediately once phishing or suspicious interaction is suspected.',
    ticketNoteExample:
      'Security concern reported by staff member. Possible suspicious email interaction reported today; approved escalation path engaged. High-level incident timing and concern captured separately in the authorised work system only.',
    jiraNotePrompt:
      'Write the privacy-safe operational note for this phishing concern. Do not reproduce the live email content.',
    riskNote: 'Never use the PD app as the system of record for a live security incident.',
    recommendedModuleIds: ['ticket-notes-escalation-quality', 'login-and-password-support']
  }),
  scenario({
    id: 'parent-portal-registration-problem',
    title: 'Parent Portal registration problem',
    summary: 'A parent says registration is blocked and is unsure whether the access key or email is wrong.',
    focus: ['workflow stage', 'access-key clues', 'parent communication', 'owner boundaries'],
    estimatedMinutes: 8,
    initialReport:
      'A parent contacts the school saying they cannot finish Parent Portal registration and do not know whether the key or email is the problem.',
    contextBullets: [
      'Registration stage matters more than broad frustration.',
      'Private family data should stay out of the PD app.',
      'The note should help the right owner act quickly.'
    ],
    steps: [
      {
        id: 'portal-step-1',
        title: 'First question',
        prompt: 'What should Josh clarify first?',
        choices: [
          {
            id: 'portal-1a',
            label: 'Whether this is first registration or a retry and what exact blocker is shown',
            outcome: 'Good. That clarifies the workflow stage before guesswork begins.',
            riskNote: 'High-value first split.',
            correct: true
          },
          {
            id: 'portal-1b',
            label: 'Every family detail on the account',
            outcome: 'That is more private detail than Josh needs in the PD flow.',
            riskNote: 'Privacy risk.',
            correct: false
          },
          {
            id: 'portal-1c',
            label: 'Assume the whole portal is down for all families',
            outcome: 'That overclaims far too early.',
            riskNote: 'Poor scope judgement.',
            correct: false
          }
        ],
        recommendedChoiceId: 'portal-1a'
      },
      {
        id: 'portal-step-2',
        title: 'New information',
        newInformation:
          'It appears to be a first registration attempt. The parent says the email may not match what the school expects.',
        prompt: 'What is the best next judgement?',
        choices: [
          {
            id: 'portal-2a',
            label: 'Capture the access-key stage and likely email-match clue, then route to the right owner',
            outcome: 'Good. The note now carries the most useful workflow evidence.',
            riskNote: 'Clear ownership thinking.',
            correct: true
          },
          {
            id: 'portal-2b',
            label: 'Tell the parent to keep retrying until it eventually works',
            outcome: 'That does not preserve the actual blocker.',
            riskNote: 'Poor support quality.',
            correct: false
          },
          {
            id: 'portal-2c',
            label: 'Promise that ICT can directly rewrite the family record immediately',
            outcome: 'That overstates authority.',
            riskNote: 'Unsafe promise.',
            correct: false
          }
        ],
        recommendedChoiceId: 'portal-2a'
      },
      {
        id: 'portal-step-3',
        title: 'Parent-facing handoff',
        newInformation:
          'The parent is frustrated and wants to know what will happen next.',
        prompt: 'What should Josh do?',
        choices: [
          {
            id: 'portal-3a',
            label: 'Explain the next handoff calmly, confirm the blocker has been recorded clearly, and avoid blame',
            outcome: 'Good. Clear and calm wording reduces stress and improves trust.',
            riskNote: 'Strong communication.',
            correct: true
          },
          {
            id: 'portal-3b',
            label: 'Tell the parent someone will probably fix it eventually',
            outcome: 'That is vague and unhelpful.',
            riskNote: 'Weak expectation setting.',
            correct: false
          },
          {
            id: 'portal-3c',
            label: 'Copy the family details into the PD note so nothing is missed',
            outcome: 'That is not the right place for private record content.',
            riskNote: 'Privacy failure.',
            correct: false
          }
        ],
        recommendedChoiceId: 'portal-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Clarify first registration versus retry.',
      'Capture access-key and likely email-match clues.',
      'Use calm parent-facing handoff language with clear ownership boundaries.'
    ],
    escalationPoint: 'Escalate once the workflow blocker is identified and it moves beyond safe first-line clarification.',
    ticketNoteExample:
      'Parent Portal first-registration issue. Parent reports likely email-match blocker at access-key stage. Generic error wording captured; clean handoff to workflow owner requested. Parent updated on next step.',
    jiraNotePrompt:
      'Write the parent-safe escalation note for this portal registration blocker. Keep the stage, clue, and handoff clear.',
    riskNote: 'Keep the workflow pattern, not the family’s private detail, in the PD app.',
    recommendedModuleIds: ['parent-portal-registration', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'sentral-markbook-access-key-issue',
    title: 'Sentral access-key or markbook issue',
    summary: 'A staff member reports a Sentral problem during a busy reporting period and a parent-access-key question arrives at the same time.',
    focus: ['function classification', 'timing pressure', 'workflow routing', 'good notes'],
    estimatedMinutes: 9,
    initialReport:
      'A teacher says a class markbook is missing in Sentral and reports are due today. At the same time, another enquiry mentions a Sentral parent access key.',
    contextBullets: [
      'Sentral is one platform with multiple workflows.',
      'Timing pressure can raise urgency significantly.',
      'Classification is the first-line superpower here.'
    ],
    steps: [
      {
        id: 'sentral-lab-step-1',
        title: 'First split',
        prompt: 'What should Josh recognise first?',
        choices: [
          {
            id: 'sentral-lab-1a',
            label: 'These are two different workflows: reporting or markbook visibility and parent-access-key support',
            outcome: 'Good. Classification stops the note from becoming vague and mixed up.',
            riskNote: 'Strong triage thinking.',
            correct: true
          },
          {
            id: 'sentral-lab-1b',
            label: 'They are both just general Sentral issues and need no further distinction',
            outcome: 'That makes the work much harder to route.',
            riskNote: 'Weak classification.',
            correct: false
          },
          {
            id: 'sentral-lab-1c',
            label: 'Only the parent enquiry matters because it sounds simpler',
            outcome: 'That ignores a potentially urgent teacher deadline.',
            riskNote: 'Poor urgency balance.',
            correct: false
          }
        ],
        recommendedChoiceId: 'sentral-lab-1a'
      },
      {
        id: 'sentral-lab-step-2',
        title: 'New information',
        newInformation:
          'The teacher confirms marks are due this afternoon and the issue appears to affect one class view only.',
        prompt: 'What should Josh capture next?',
        choices: [
          {
            id: 'sentral-lab-2a',
            label: 'The exact class or screen affected, the deadline, and whether anyone else sees the same issue',
            outcome: 'Good. That is the minimum evidence for a useful urgent note.',
            riskNote: 'High-value detail.',
            correct: true
          },
          {
            id: 'sentral-lab-2b',
            label: 'Only that Sentral is broken today',
            outcome: 'That does not preserve the specific staff need.',
            riskNote: 'Weak note quality.',
            correct: false
          },
          {
            id: 'sentral-lab-2c',
            label: 'No timing detail because the system owner will ask if it matters',
            outcome: 'The timing detail matters immediately.',
            riskNote: 'Missed urgency clue.',
            correct: false
          }
        ],
        recommendedChoiceId: 'sentral-lab-2a'
      },
      {
        id: 'sentral-lab-step-3',
        title: 'Escalation note',
        newInformation:
          'Josh now has one urgent teacher note and one parent-access-key style note to route.',
        prompt: 'What is the best next move?',
        choices: [
          {
            id: 'sentral-lab-3a',
            label: 'Write two clean notes that preserve each workflow separately and route them to the correct owners',
            outcome: 'Good. Separate notes protect both speed and clarity.',
            riskNote: 'Strong workflow discipline.',
            correct: true
          },
          {
            id: 'sentral-lab-3b',
            label: 'Combine both into one broad complaint about Sentral',
            outcome: 'That confuses the work and slows both tasks down.',
            riskNote: 'Poor routing.',
            correct: false
          },
          {
            id: 'sentral-lab-3c',
            label: 'Escalate only the teacher issue and forget the parent enquiry',
            outcome: 'That drops a real workflow rather than capturing it properly.',
            riskNote: 'Incomplete support.',
            correct: false
          }
        ],
        recommendedChoiceId: 'sentral-lab-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Separate markbook visibility from parent-access-key workflow immediately.',
      'Capture exact class, deadline, and scope on the urgent teacher issue.',
      'Route separate evidence-rich notes to the correct owners.'
    ],
    escalationPoint:
      'Escalate once the function and urgency are clear enough to route each workflow properly.',
    ticketNoteExample:
      'Urgent Sentral teacher issue: one class markbook view missing with marks due this afternoon; scope currently appears limited to one class view. Separate parent-access-key enquiry logged and routed as its own workflow.',
    jiraNotePrompt:
      'Write the urgent Sentral markbook note. If you mention the parent-access-key enquiry, keep it as a separate workflow line.',
    riskNote: 'Do not flatten multiple Sentral workflows into one broad complaint.',
    recommendedModuleIds: ['sentral-support', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'password-lockout-self-service-reset-failure',
    title: 'Password lockout or self-service reset failure',
    summary: 'A user says they are locked out, then later says the reset flow still feels wrong.',
    focus: ['exact sign-in state', 'self-service path', 'security suspicion', 'identity note quality'],
    estimatedMinutes: 8,
    initialReport:
      'A user says they cannot log in and believes they may be locked out. They also mention a reset attempt already failed.',
    contextBullets: [
      'Exact sign-in state matters more than the broad complaint.',
      'Reset failure can stay routine or become security-sensitive.',
      'Josh should never ask for the password.'
    ],
    steps: [
      {
        id: 'lockout-step-1',
        title: 'First classification',
        prompt: 'What should Josh do first?',
        choices: [
          {
            id: 'lockout-1a',
            label: 'Confirm the correct username and exact sign-in message before taking action',
            outcome: 'Good. Identity classification starts with the exact state.',
            riskNote: 'High-value first step.',
            correct: true
          },
          {
            id: 'lockout-1b',
            label: 'Ask for the user’s password so you can test it yourself',
            outcome: 'That is never appropriate.',
            riskNote: 'Severe identity hygiene failure.',
            correct: false
          },
          {
            id: 'lockout-1c',
            label: 'Assume it is definitely compromise and panic immediately',
            outcome: 'That skips the evidence-gathering needed even in urgent cases.',
            riskNote: 'Poor risk calibration.',
            correct: false
          }
        ],
        recommendedChoiceId: 'lockout-1a'
      },
      {
        id: 'lockout-step-2',
        title: 'New information',
        newInformation:
          'The username looks correct. The reset path was tried, but the user now says the prompts seem odd and they are unsure what changed.',
        prompt: 'How should Josh respond?',
        choices: [
          {
            id: 'lockout-2a',
            label: 'Treat the case as potentially security-sensitive now and capture the timing and odd prompts clearly',
            outcome: 'Good. The issue has shifted beyond a plain routine reset story.',
            riskNote: 'Strong judgement shift.',
            correct: true
          },
          {
            id: 'lockout-2b',
            label: 'Keep repeating random resets until something works',
            outcome: 'That may worsen confusion and ignores the risk signal.',
            riskNote: 'Weak security posture.',
            correct: false
          },
          {
            id: 'lockout-2c',
            label: 'Ignore the strange prompts because self-service always behaves strangely',
            outcome: 'That downplays a meaningful clue.',
            riskNote: 'Missed risk cue.',
            correct: false
          }
        ],
        recommendedChoiceId: 'lockout-2a'
      },
      {
        id: 'lockout-step-3',
        title: 'Escalation note',
        newInformation:
          'Josh needs to hand the issue onward without oversharing or sounding vague.',
        prompt: 'What should the note focus on?',
        choices: [
          {
            id: 'lockout-3a',
            label: 'Exact sign-in symptom, correct-username confirmation, reset attempt, odd prompt clue, and security-sensitive escalation',
            outcome: 'Good. The note now helps the next person assess both access and risk.',
            riskNote: 'Strong identity-note quality.',
            correct: true
          },
          {
            id: 'lockout-3b',
            label: 'Only "cannot log in" because the rest is too hard to explain',
            outcome: 'That strips out the most important evidence.',
            riskNote: 'Weak note quality.',
            correct: false
          },
          {
            id: 'lockout-3c',
            label: 'The user’s guessed passwords so the next person can keep trying them',
            outcome: 'That is not safe or appropriate information to log here.',
            riskNote: 'Security failure.',
            correct: false
          }
        ],
        recommendedChoiceId: 'lockout-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Confirm the account context and exact sign-in state.',
      'Recognise when failed reset flow becomes security-sensitive.',
      'Escalate with evidence-rich, password-free identity notes.'
    ],
    escalationPoint:
      'Escalate when reset failure includes suspicious prompt behaviour or the issue no longer fits a normal routine identity story.',
    ticketNoteExample:
      'Identity issue: user confirmed correct username but remains unable to sign in after reset attempt. User reports unusual prompt behaviour after self-service flow. Security-sensitive escalation requested; no passwords collected.',
    jiraNotePrompt:
      'Write the identity escalation note for this lockout-plus-reset-failure case. Keep it password-free and risk-aware.',
    riskNote: 'Do not collect or log passwords. Keep the note focused on symptoms, state, and risk clues.',
    recommendedModuleIds: ['login-and-password-support', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'new-user-onboarding-missing-system-access',
    title: 'New user onboarding with missing system access',
    summary: 'A new user can log in but still lacks the systems needed to start work today.',
    focus: ['request completeness', 'role context', 'day-one validation', 'missing-access note quality'],
    estimatedMinutes: 8,
    initialReport:
      'A new staff member has started today and can sign in, but says they still cannot access the drives, Teams, or applications they were told to use.',
    contextBullets: [
      'This is likely missing access, not total setup failure.',
      'Role context and day-one urgency both matter.',
      'The note should name exactly what is missing.'
    ],
    steps: [
      {
        id: 'onboard-step-1',
        title: 'First judgement',
        prompt: 'What should Josh recognise first?',
        choices: [
          {
            id: 'onboard-1a',
            label: 'The account exists, so the issue now looks like missing access or incomplete onboarding',
            outcome: 'Good. This narrows the workflow immediately.',
            riskNote: 'Strong onboarding reasoning.',
            correct: true
          },
          {
            id: 'onboard-1b',
            label: 'Delete the account and start from scratch because something is missing',
            outcome: 'That is far too disruptive and unsupported.',
            riskNote: 'Poor identity judgement.',
            correct: false
          },
          {
            id: 'onboard-1c',
            label: 'Assume the user is mistaken and everything is already there',
            outcome: 'That ignores a common day-one support pattern.',
            riskNote: 'Poor service posture.',
            correct: false
          }
        ],
        recommendedChoiceId: 'onboard-1a'
      },
      {
        id: 'onboard-step-2',
        title: 'New information',
        newInformation:
          'The user needs specific shared drives, a Team, and one application for today’s work. They are unsure what was originally requested for them.',
        prompt: 'What should Josh capture next?',
        choices: [
          {
            id: 'onboard-2a',
            label: 'The exact missing systems, the user’s role, and the day-one urgency',
            outcome: 'Good. This turns a vague onboarding complaint into a workable note.',
            riskNote: 'High-value completeness.',
            correct: true
          },
          {
            id: 'onboard-2b',
            label: 'Only that onboarding failed somehow',
            outcome: 'That leaves the next person guessing.',
            riskNote: 'Weak note quality.',
            correct: false
          },
          {
            id: 'onboard-2c',
            label: 'No role context because access systems should be standard for everyone',
            outcome: 'Role context is exactly what shapes the access list.',
            riskNote: 'Poor least-privilege thinking.',
            correct: false
          }
        ],
        recommendedChoiceId: 'onboard-2a'
      },
      {
        id: 'onboard-step-3',
        title: 'Escalation and validation',
        newInformation:
          'Josh can now describe what already works and what still does not.',
        prompt: 'What should he do now?',
        choices: [
          {
            id: 'onboard-3a',
            label: 'Escalate the specific missing systems while noting what already works and the day-one impact',
            outcome: 'Good. That preserves both progress and remaining gaps.',
            riskNote: 'Strong day-one validation note.',
            correct: true
          },
          {
            id: 'onboard-3b',
            label: 'Log only "new starter issue" and wait',
            outcome: 'That is not enough for a fast handoff.',
            riskNote: 'Weak escalation.',
            correct: false
          },
          {
            id: 'onboard-3c',
            label: 'Grant broad access without the right owner because the user has already started',
            outcome: 'Urgency does not remove access boundaries.',
            riskNote: 'Unsafe authorisation behaviour.',
            correct: false
          }
        ],
        recommendedChoiceId: 'onboard-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Recognise this as missing access after account creation, not total identity failure.',
      'Capture exact missing systems, role, and day-one urgency.',
      'Escalate the remaining gaps with a note that also records what already works.'
    ],
    escalationPoint:
      'Escalate once the missing systems and day-one impact are clear enough to route to the correct owner.',
    ticketNoteExample:
      'New staff member can sign in successfully but is missing shared drive, Team, and required application access for today’s role. Role and day-one impact confirmed; exact missing systems listed for onboarding follow-up.',
    jiraNotePrompt:
      'Write the onboarding escalation note for a day-one missing-access case. Include what works, what is missing, and the role impact.',
    riskNote: 'Do not confuse a live access gap with permission to grant broad unauthorised access.',
    recommendedModuleIds: ['new-user-onboarding', 'permissions-and-access-requests']
  })
];
