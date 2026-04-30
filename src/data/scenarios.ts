import type { Scenario } from '../types/scenarios';

export const scenarios: Scenario[] = [
  {
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
    riskNote:
      'Do not invent network root causes or make production admin changes. Preserve the evidence and protect class time.',
    recommendedModuleIds: ['dcs-it-support-foundations', 'dns-dhcp-gateway-ip-basics']
  },
  {
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
    riskNote:
      'Do not copy sensitive personal details into the PD app or ask for credentials. Identity work must stay within authorised systems and ownership.',
    recommendedModuleIds: ['m365-identity-offboarding-basics', 'ticket-notes-escalation-quality']
  },
  {
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
        newInformation:
          'The display now shows the laptop picture, but touch is still not working.',
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
    riskNote:
      'Avoid deep configuration work in front of the class. Protect class flow and keep the escalation exact.',
    recommendedModuleIds: [
      'classroom-display-viewboard-troubleshooting',
      'ticket-notes-escalation-quality'
    ]
  }
];

