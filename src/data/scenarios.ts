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
    targetEnvironment: 'DCS',
    initialReport:
      'A teacher in Room 7 says student laptops and the teacher device cannot reach class resources. The class is waiting.',
    contextBullets: [
      'Visible classroom pressure matters.',
      'A technician should not jump into risky network changes.',
      'The first priority is to clarify scope and keep the response structured.'
    ],
    steps: [
      {
        id: 'internet-step-1',
        title: 'First check',
        prompt: 'What should be done first?',
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
            label: 'Tell the teacher to restart the whole room network',
            outcome: 'That is a high-impact guess without enough evidence.',
            riskNote: 'Too aggressive for Level 1.',
            correct: false
          }
        ],
        recommendedChoiceId: 'internet-2a'
      },
      {
        id: 'internet-step-3',
        title: 'Escalation decision',
        newInformation: 'Room 7 has no internet but Room 8 (same hallway) works fine. All Room 7 devices tried the correct SSID. Issue persists and class is still waiting.',
        prompt: 'What should be documented and escalated?',
        choices: [
          {
            id: 'internet-3a',
            label: 'Document the room location, affected devices, safe checks completed, and escalate to network team with evidence',
            outcome: 'Good. That provides clear context for escalation.',
            riskNote: 'Professional handoff.',
            correct: true
          },
          {
            id: 'internet-3b',
            label: 'Just tell the teacher to move the class to another room and do not escalate',
            outcome: 'That avoids fixing the underlying issue.',
            riskNote: 'Avoids root-cause investigation.',
            correct: false
          }
        ],
        recommendedChoiceId: 'internet-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Clarify scope and location.',
      'Perform safe, reversible checks.',
      'Compare with known-good references.',
      'Escalate with evidence-rich notes.'
    ],
    escalationPoint: 'Escalate if the issue affects multiple users and basic checks fail.',
    ticketNoteExample: 'Room 7 internet outage: multiple student and staff devices affected. Checked SSIDs and compared with Room 8 (working). Escalate for network investigation.',
    riskNote: 'Do not change core network settings without senior approval.',
    recommendedModuleIds: ['networking-foundations']
  }),
  scenario({
    id: 'offboarding-related-identity-concern',
    title: 'Offboarding identity concern',
    summary: 'A manager reports a former staff member still appears active in some systems.',
    focus: ['identity', 'privacy', 'escalation', 'offboarding'],
    estimatedMinutes: 12,
    targetEnvironment: 'Generic',
    initialReport: 'A former staff member is still appearing in the Teams directory and their email still seems to resolve.',
    contextBullets: [
      'Identity changes are high-risk.',
      'Privacy and data retention rules apply.',
      'Technicians must follow the authorized sequence.'
    ],
    steps: [
      {
        id: 'offboard-step-1',
        title: 'Initial verification',
        prompt: 'What is the first priority?',
        choices: [
          {
            id: 'offboard-1a',
            label: 'Verify the departure date and authorized offboarding status in the source of truth',
            outcome: 'Good. You must confirm the facts before taking action.',
            riskNote: 'Evidence-based start.',
            correct: true
          },
          {
            id: 'offboard-1b',
            label: 'Immediately delete the account to be safe',
            outcome: 'That risks data loss and violates retention policies.',
            riskNote: 'High-risk unauthorized action.',
            correct: false
          }
        ],
        recommendedChoiceId: 'offboard-1a'
      },
      {
        id: 'offboard-step-2',
        title: 'Next step',
        prompt: 'The account is confirmed as "Offboarded" but still shows in Teams. What now?',
        choices: [
          {
            id: 'offboard-2a',
            label: 'Check the M365 license state and session revocation status',
            outcome: 'Good. This identifies where the offboarding sequence might have stalled.',
            riskNote: 'Systematic check.',
            correct: true
          },
          {
            id: 'offboard-2b',
            label: 'Tell the manager it is just a cache issue and to wait a week',
            outcome: 'That ignores a potential security or sequence failure.',
            riskNote: 'Dismissive support.',
            correct: false
          }
        ],
        recommendedChoiceId: 'offboard-2a'
      },
      {
        id: 'offboard-step-3',
        title: 'Escalation',
        prompt: 'What should you include in the escalation note?',
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
            label: 'Every personal detail you can find about the departing staff member',
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
    id: 'msp-client-remote-access-failure',
    title: 'Client remote access outage',
    summary: 'A remote client site is unreachable after last-night maintenance and their morning shift is starting.',
    focus: ['remote access', 'SLA escalation', 'change verification', 'client note quality'],
    estimatedMinutes: 10,
    targetEnvironment: 'MSP',
    initialReport:
      'A client reports that their remote site appliance is offline and that staff cannot access remote servers after out-of-hours network work.',
    contextBullets: [
      'Remote client outages need evidence, scope, and change history.',
      'Avoid guessing the root cause; preserve the contract and vendor handoff.',
      'The support note should make the outage easy to hand to the next-tier owner.'
    ],
    steps: [
      {
        id: 'msp-access-step-1',
        title: 'First action',
        prompt: 'What should the technician do first?',
        choices: [
          {
            id: 'msp-access-1a',
            label: 'Confirm what changed, which client site is affected, and whether it is a remote access outage or local site fault',
            outcome: 'Good. That keeps the incident scoped and evidence-based.',
            riskNote: 'Safe triage with contract awareness.',
            correct: true
          },
          {
            id: 'msp-access-1b',
            label: 'Immediately reboot the remote appliance and tell the client it is fixed',
            outcome: 'That may hide the evidence and is too aggressive for the first step.',
            riskNote: 'High-risk action without scope.',
            correct: false
          },
          {
            id: 'msp-access-1c',
            label: 'Assume the client changed their password and update the ticket accordingly',
            outcome: 'That guesses a cause without any evidence.',
            riskNote: 'Poor root-cause assumption.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-access-1a'
      },
      {
        id: 'msp-access-step-2',
        title: 'New evidence',
        newInformation:
          'The client confirms the site was upgraded last night and the remote management agent is not responding, while local site staff still have power.',
        prompt: 'What is the best next move?',
        choices: [
          {
            id: 'msp-access-2a',
            label: 'Capture the exact service affected, the outage start time, and the last successful remote connection before escalating',
            outcome: 'Good. That makes the ticket useful for SLA review and vendor handoff.',
            riskNote: 'Evidence-rich escalation.',
            correct: true
          },
          {
            id: 'msp-access-2b',
            label: 'Tell the client to wait until the vendor support window opens',
            outcome: 'That avoids taking useful triage and does not preserve the current state.',
            riskNote: 'Poor client service.',
            correct: false
          },
          {
            id: 'msp-access-2c',
            label: 'Change the ticket priority to low because the issue is only remote access',
            outcome: 'That may violate the SLA if the client is blocked from critical systems.',
            riskNote: 'Wrong priority judgement.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-access-2a'
      },
      {
        id: 'msp-access-step-3',
        title: 'Escalation handoff',
        newInformation:
          'The client says the site is used for their morning shift and the remote management vendor support line is open now.',
        prompt: 'What should you include in the escalation note?',
        choices: [
          {
            id: 'msp-access-3a',
            label: 'Exact site, affected services, last known good state, safe checks done, and vendor bridge request details',
            outcome: 'Good. That helps the next owner act quickly and aligns with the SLA expectations.',
            riskNote: 'Strong escalation quality.',
            correct: true
          },
          {
            id: 'msp-access-3b',
            label: 'Only mention that remote access is down and leave the rest to the vendor',
            outcome: 'That does not preserve valuable diagnostic evidence.',
            riskNote: 'Weak handoff.',
            correct: false
          },
          {
            id: 'msp-access-3c',
            label: 'Promise the vendor will fix it within the SLA because they are already on the phone',
            outcome: 'That overstates the situation without confirmation.',
            riskNote: 'Risky commitment.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-access-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Verify the exact affected client site and the last successful remote connection.',
      'Capture what changed, what is still available locally, and whether the vendor is involved.',
      'Escalate with scope, service impact, and evidence that supports the SLA response.'
    ],
    escalationPoint:
      'Escalate once the remote access outage is confirmed and the client shift is beginning.',
    ticketNoteExample:
      'Remote site outage: client appliance offline after last-night maintenance. Local staff still have power, remote management agent not responding, morning shift impacted. Vendor support bridge requested; escalation for SLA-aware remediation.',
    jiraNotePrompt:
      'Write the Jira note for this remote access outage. Include the site, impact, agent state, and urgency without guessing root cause.',
    riskNote:
      'Do not infer the root cause. Preserve the evidence and keep the note SLA-aware.',
    recommendedModuleIds: ['msp-ticket-triage-escalation', 'msp-stack-rmm-psa', 'msp-foundations']
  }),
  scenario({
    id: 'viewboard-display-issue',
    title: 'ViewBoard display issue',
    summary: 'A teacher laptop will not display during class and time pressure is rising.',
    focus: ['display chain', 'classroom pressure', 'touch versus picture', 'evidence-rich escalation'],
    estimatedMinutes: 10,
    targetEnvironment: 'DCS',
    initialReport:
      "A teacher's laptop is connected at the front of the room, but nothing appears on the ViewBoard.",
    contextBullets: [
      'Class time is being lost in public.',
      'The safest first actions are visible and reversible.',
      'A technician needs a short sequence, not a long experiment.'
    ],
    steps: [
      {
        id: 'viewboard-step-1',
        title: 'First move',
        prompt: 'What should be done first?',
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
        prompt: 'How should the technician reason about this change?',
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
            outcome: 'Good. You have protected class time and captured the right evidence.',
            riskNote: 'Strong classroom judgement.',
            correct: true
          },
          {
            id: 'viewboard-3b',
            label: 'Keep testing until the whole lesson is lost',
            outcome: 'That fails to protect the educational outcome.',
            riskNote: 'Poor priority judgement.',
            correct: false
          }
        ],
        recommendedChoiceId: 'viewboard-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Check the visible physical chain (power, cables, inputs).',
      'Reason about video and touch as separate service paths.',
      'Protect learning time with fallbacks and escalate with evidence.'
    ],
    escalationPoint: 'Escalate once the visible physical chain is verified but faults persist.',
    ticketNoteExample: 'Room 12 ViewBoard: picture restored via cable reseat, but touch remains non-responsive. Teacher using mouse as fallback. Escalate for touch-link investigation.',
    riskNote: 'Do not perform factory resets or firmware changes during a live class.',
    recommendedModuleIds: ['hardware-classroom-support']
  }),
  scenario({
    id: 'dcs-library-printer-offline',
    title: 'Library printer offline',
    summary: 'Staff report the library printer is not responding and printing backup is needed.',
    focus: ['printer triage', 'device offline', 'queue state', 'alternative workflow'],
    estimatedMinutes: 8,
    targetEnvironment: 'DCS',
    initialReport: 'The library photocopy printer is showing offline and staff cannot print or copy.',
    contextBullets: [
      'The printer may be offline but the device itself might be okay.',
      'Queue state and network path are separate issues.',
      'Fallback printing is essential if repair will take time.'
    ],
    steps: [
      {
        id: 'lib-printer-step-1',
        title: 'Initial check',
        prompt: 'What should be verified first?',
        choices: [
          {
            id: 'lib-printer-1a',
            label: 'Check the printer power, tray status, and error lights at the device',
            outcome: 'Good. Physical state comes before network assumptions.',
            riskNote: 'Safe device check.',
            correct: true
          },
          {
            id: 'lib-printer-1b',
            label: 'Delete all print jobs from the queue immediately',
            outcome: 'That destroys evidence without understanding the root issue.',
            riskNote: 'Premature action.',
            correct: false
          },
          {
            id: 'lib-printer-1c',
            label: 'Assume the network is down and report a campus outage',
            outcome: 'That overclaims without checking the device or testing another printer.',
            riskNote: 'Wrong scope.',
            correct: false
          }
        ],
        recommendedChoiceId: 'lib-printer-1a'
      },
      {
        id: 'lib-printer-step-2',
        title: 'Device status',
        newInformation: 'The printer has power, no paper jam, but shows a "Network Offline" error on the display.',
        prompt: 'What next?',
        choices: [
          {
            id: 'lib-printer-2a',
            label: 'Check the IP address, ping test, and network cable or Wi-Fi status',
            outcome: 'Good. That narrows whether it is a device network path issue.',
            riskNote: 'Targeted network check.',
            correct: true
          },
          {
            id: 'lib-printer-2b',
            label: 'Reboot the printer and wait for all staff to try again',
            outcome: 'A reboot may help, but capture the network state first.',
            riskNote: 'Premature action without understanding.',
            correct: false
          }
        ],
        recommendedChoiceId: 'lib-printer-2a'
      },
      {
        id: 'lib-printer-step-3',
        title: 'Escalation and fallback',
        newInformation:
          'The printer shows a valid IP but does not respond to ping. All staff printing is currently blocked.',
        prompt: 'What should be done?',
        choices: [
          {
            id: 'lib-printer-3a',
            label: 'Escalate to the print vendor or network team with the device state, and offer an alternative printer for urgent jobs',
            outcome: 'Good. That protects workflows and provides useful escalation.',
            riskNote: 'Strong operational response.',
            correct: true
          },
          {
            id: 'lib-printer-3b',
            label: 'Tell staff to just keep waiting',
            outcome: 'That provides no fallback or escalation.',
            riskNote: 'Poor user support.',
            correct: false
          }
        ],
        recommendedChoiceId: 'lib-printer-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Verify the device power state and physical condition.',
      'Check the network connectivity of the device.',
      'Escalate with clear evidence and offer a fallback workflow.'
    ],
    escalationPoint: 'Escalate once the device network path is confirmed as unavailable.',
    ticketNoteExample: 'Library printer offline with Network Offline error. Device powered, no jam, IP visible but not responding to network tests. Likely device network module or upstream switch issue. Vendor escalation recommended. Alternative printer available in staff room.',
    riskNote: 'Distinguish device issues from network path issues before escalating.',
    recommendedModuleIds: ['printer-troubleshooting', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'dcs-student-login-failure',
    title: 'Student device login failure',
    summary: 'A student cannot log into their school laptop and is now unable to access lessons.',
    focus: ['identity scoping', 'device state', 'account checking', 'classroom impact'],
    estimatedMinutes: 8,
    targetEnvironment: 'DCS',
    initialReport: 'A Year 9 student cannot log into their laptop and a teacher has reported it to support.',
    contextBullets: [
      'Login failures can be device, account, or network issues.',
      'The student may have forgotten a password or the device may be misconfigured.',
      'Always verify the issue is not user error before escalating.'
    ],
    steps: [
      {
        id: 'login-step-1',
        title: 'Initial clarification',
        prompt: 'What is the first question to ask?',
        choices: [
          {
            id: 'login-1a',
            label: 'Clarify the exact error message or behavior (account locked, wrong password, network name prompt)',
            outcome: 'Good. The exact symptom changes the entire troubleshooting path.',
            riskNote: 'High-value first question.',
            correct: true
          },
          {
            id: 'login-1b',
            label: 'Immediately reset the password to help the student',
            outcome: 'That may not be the issue and requires authorization.',
            riskNote: 'Premature action.',
            correct: false
          },
          {
            id: 'login-1c',
            label: 'Tell the student the device is broken and bring it to IT',
            outcome: 'That overclaims without gathering evidence.',
            riskNote: 'Poor support triage.',
            correct: false
          }
        ],
        recommendedChoiceId: 'login-1a'
      },
      {
        id: 'login-step-2',
        title: 'New information',
        newInformation:
          'The student reports the laptop shows "Invalid username or password" after multiple attempts. The student says they know their password.',
        prompt: 'What is the best next move?',
        choices: [
          {
            id: 'login-2a',
            label: 'Ask whether the device is showing the correct network name and whether CAPS LOCK is on',
            outcome: 'Good. Simple checks first for user-error patterns.',
            riskNote: 'Safe Level 1 triage.',
            correct: true
          },
          {
            id: 'login-2b',
            label: 'Assume the account has been deleted and report it as a security incident',
            outcome: 'That overclaims from one credential error.',
            riskNote: 'Wrong severity.',
            correct: false
          }
        ],
        recommendedChoiceId: 'login-2a'
      },
      {
        id: 'login-step-3',
        title: 'Escalation',
        newInformation: 'The device is on the correct network, CAPS LOCK is off, and multiple attempts still fail.',
        prompt: 'What should be documented?',
        choices: [
          {
            id: 'login-3a',
            label: 'The student name, exact error message, device checked, safe attempts made, and whether this is a new device issue',
            outcome: 'Good. That gives the next tier enough evidence to investigate the account or device.',
            riskNote: 'Clear escalation note.',
            correct: true
          },
          {
            id: 'login-3b',
            label: 'Just the student name and "laptop not working"',
            outcome: 'That hides the evidence and slows resolution.',
            riskNote: 'Poor note quality.',
            correct: false
          }
        ],
        recommendedChoiceId: 'login-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Gather the exact error message and user context.',
      'Verify simple user-error patterns.',
      'Escalate with evidence for account or device investigation.'
    ],
    escalationPoint: 'Escalate once simple checks fail and the issue points to device or account state.',
    ticketNoteExample: 'Year 9 student unable to log into school laptop with "Invalid username or password" error after multiple attempts. Device on correct network, CAPS LOCK verified off. No recent changes reported. Device identity or account state may require investigation.',
    riskNote: 'Do not bypass account security checks just to help a student get back to class.',
    recommendedModuleIds: ['login-and-password-support', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'dcs-staff-missing-access',
    title: 'Staff member cannot access shared drive',
    summary: 'A new staff member reports they cannot see the departmental shared drive.',
    focus: ['group membership', 'permissions', 'onboarding', 'access verification'],
    estimatedMinutes: 10,
    targetEnvironment: 'DCS',
    initialReport: 'A new staff member in the Science department says they cannot find or access the Science shared folder.',
    contextBullets: [
      'New staff access can be delayed or assigned to the wrong groups.',
      'Staff should have received documented access expectations.',
      'Verification of group membership comes before permission changes.'
    ],
    steps: [
      {
        id: 'access-step-1',
        title: 'Initial verification',
        prompt: 'What is the first step?',
        choices: [
          {
            id: 'access-1a',
            label: 'Verify when the staff member started, which access was requested, and who approved it',
            outcome: 'Good. That establishes whether access was ever requested or approved.',
            riskNote: 'Proper evidence gathering.',
            correct: true
          },
          {
            id: 'access-1b',
            label: 'Immediately add the staff member to all department groups',
            outcome: 'That assumes access was approved and risks giving too much permission.',
            riskNote: 'Overstep without authorization.',
            correct: false
          }
        ],
        recommendedChoiceId: 'access-1a'
      },
      {
        id: 'access-step-2',
        title: 'Access status',
        newInformation:
          'The staff member started two weeks ago. Access to the Science drive was requested but may not have been processed.',
        prompt: 'What next?',
        choices: [
          {
            id: 'access-2a',
            label: 'Check whether the staff member is already in the Science group and document the current group memberships',
            outcome: 'Good. That clarifies what actually exists versus what is expected.',
            riskNote: 'Evidence-based check.',
            correct: true
          },
          {
            id: 'access-2b',
            label: 'Blame the department and tell the staff member nothing can be done today',
            outcome: 'That avoids taking responsibility for the onboarding gap.',
            riskNote: 'Poor support.',
            correct: false
          }
        ],
        recommendedChoiceId: 'access-2a'
      },
      {
        id: 'access-step-3',
        title: 'Resolution',
        newInformation: 'The staff member is NOT in the Science group, though the request was submitted weeks ago.',
        prompt: 'What should be done?',
        choices: [
          {
            id: 'access-3a',
            label: 'Verify the department head approval is on file, then add the staff member to the group with documentation',
            outcome: 'Good. That closes the gap with authorization and audit trail.',
            riskNote: 'Authorized and documented.',
            correct: true
          },
          {
            id: 'access-3b',
            label: 'Just add the staff member without checking who authorized it',
            outcome: 'That bypasses the approval process.',
            riskNote: 'Authorization gap.',
            correct: false
          }
        ],
        recommendedChoiceId: 'access-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Verify the access request and approval status.',
      'Check current group memberships.',
      'Add access only after confirming authorized approval.'
    ],
    escalationPoint: 'Escalate if the request approval is missing or disputed.',
    ticketNoteExample: 'New Science staff member requested access to Science shared drive two weeks ago. Currently not in Science group. Request has been approved by department head. Accessed granted with documentation. Staff member now able to access shared folder.',
    riskNote: 'Always verify approval before granting new staff access. Do not assume onboarding processes completed automatically.',
    recommendedModuleIds: ['new-user-onboarding', 'permissions-and-access-requests']
  }),
  scenario({
    id: 'dcs-wifi-drops-repeatedly',
    title: 'Wi-Fi drops repeatedly in one classroom',
    summary: 'A teacher reports Wi-Fi keeps disconnecting in Room 15 during lessons.',
    focus: ['Wi-Fi triage', 'signal strength', 'device versus infrastructure', 'pattern analysis'],
    estimatedMinutes: 8,
    targetEnvironment: 'DCS',
    initialReport: 'Multiple staff and students report Wi-Fi in Room 15 drops every 10-15 minutes.',
    contextBullets: [
      'Repeated drops can be a device issue, signal issue, or overcrowding.',
      'Scope matters: is it one device or all devices in the room?',
      'Workarounds may be needed while infrastructure is investigated.'
    ],
    steps: [
      {
        id: 'wifi-step-1',
        title: 'Scope check',
        prompt: 'What is the first clarification needed?',
        choices: [
          {
            id: 'wifi-1a',
            label: 'Is this affecting one device, all student devices, or all devices in the room?',
            outcome: 'Good. That immediately narrows device versus room versus infrastructure.',
            riskNote: 'Essential scope question.',
            correct: true
          },
          {
            id: 'wifi-1b',
            label: 'Assume the access point needs a reboot and do it immediately',
            outcome: 'That may fix it temporarily but hides the root cause.',
            riskNote: 'Symptomatic treatment.',
            correct: false
          }
        ],
        recommendedChoiceId: 'wifi-1a'
      },
      {
        id: 'wifi-step-2',
        title: 'Pattern',
        newInformation: 'Multiple devices from different users all drop Wi-Fi at similar times in Room 15.',
        prompt: 'What does this pattern suggest?',
        choices: [
          {
            id: 'wifi-2a',
            label: 'The issue is room or access-point specific, not device specific',
            outcome: 'Good. Multiple devices with the same pattern points to infrastructure.',
            riskNote: 'Pattern-based reasoning.',
            correct: true
          },
          {
            id: 'wifi-2b',
            label: 'All those devices must have the same configuration problem',
            outcome: 'That is unlikely across multiple users and device models.',
            riskNote: 'Unlikely cause.',
            correct: false
          }
        ],
        recommendedChoiceId: 'wifi-2a'
      },
      {
        id: 'wifi-step-3',
        title: 'Action',
        newInformation: 'Infrastructure investigation will take time but is needed.',
        prompt: 'What should be offered immediately?',
        choices: [
          {
            id: 'wifi-3a',
            label: 'Document the pattern and offer an alternative location or wired option for critical lessons until fixed',
            outcome: 'Good. That protects teaching while infrastructure is investigated.',
            riskNote: 'Operational response.',
            correct: true
          },
          {
            id: 'wifi-3b',
            label: 'Tell the teacher nothing can be done until the access point is replaced',
            outcome: 'That provides no support or workaround.',
            riskNote: 'Unhelpful.',
            correct: false
          }
        ],
        recommendedChoiceId: 'wifi-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Establish scope across multiple users and devices.',
      'Recognize patterns that point to infrastructure.',
      'Escalate for investigation while offering interim solutions.'
    ],
    escalationPoint: 'Escalate once the pattern points to room or access-point issues.',
    ticketNoteExample: 'Room 15 Wi-Fi drops reported by multiple staff and students, approximately every 10-15 minutes. Multiple devices affected from different users, suggesting room-level or AP issue, not device-specific. Wired alternative offered for critical lessons. Infrastructure investigation needed.',
    riskNote: 'Do not assume repeated drops are due to user configuration when the pattern affects many devices.',
    recommendedModuleIds: ['networking-fundamentals', 'ticket-notes-escalation-quality']
  }),
  scenario({
    id: 'msp-m365-signin-failure',
    title: 'M365 user cannot sign in',
    summary: 'A client user reports they cannot sign into Outlook or Teams at a remote office.',
    focus: ['identity triage', 'MFA', 'password', 'account state', 'client communication'],
    estimatedMinutes: 10,
    targetEnvironment: 'MSP',
    initialReport:
      'A client at Acme Corp reports that they cannot sign into Outlook or Teams and they need access urgently for a morning meeting.',
    contextBullets: [
      'M365 sign-in failures can be account, credential, MFA, or device issues.',
      'Client urgency should not override security checks.',
      'Password reset workflows must be authorized and secure.'
    ],
    steps: [
      {
        id: 'msp-signin-step-1',
        title: 'Initial clarification',
        prompt: 'What is the first thing to clarify?',
        choices: [
          {
            id: 'msp-signin-1a',
            label: 'The exact error message, which client site, which account, and whether MFA is being prompted',
            outcome: 'Good. That shapes the entire troubleshooting path.',
            riskNote: 'Essential triage questions.',
            correct: true
          },
          {
            id: 'msp-signin-1b',
            label: 'Immediately reset the password to help them regain access',
            outcome: 'That may not be the issue and requires verification.',
            riskNote: 'Premature action.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-signin-1a'
      },
      {
        id: 'msp-signin-step-2',
        title: 'Error details',
        newInformation:
          'The client reports "invalid username or password" after multiple attempts. No MFA prompt is shown.',
        prompt: 'What should be verified before password reset?',
        choices: [
          {
            id: 'msp-signin-2a',
            label: 'Whether they are using the correct email format, CAPS LOCK state, and whether another user can sign in from the same device',
            outcome: 'Good. Safe Level 1 checks that rule out user error and device state.',
            riskNote: 'Safe verification.',
            correct: true
          },
          {
            id: 'msp-signin-2b',
            label: 'Request the client send their password in chat so you can test the account',
            outcome: 'That is a security and password-handling violation.',
            riskNote: 'Security violation.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-signin-2a'
      },
      {
        id: 'msp-signin-step-3',
        title: 'Escalation or reset',
        newInformation: 'Another user can sign in successfully from the same device. The error persists for the first user.',
        prompt: 'What now?',
        choices: [
          {
            id: 'msp-signin-3a',
            label: 'Follow authorized password reset procedure and confirm via secure channel',
            outcome: 'Good. That isolates the issue to the account and enables a secure fix.',
            riskNote: 'Authorized and secure reset.',
            correct: true
          },
          {
            id: 'msp-signin-3b',
            label: 'Escalate to Microsoft without gathering evidence',
            outcome: 'That skips available Level 1 action.',
            riskNote: 'Premature escalation.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-signin-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Gather exact error message and client context.',
      'Rule out user error and device state.',
      'Execute authorized password reset or escalate for account investigation.'
    ],
    escalationPoint: 'Escalate if password reset does not restore access or account state is suspicious.',
    ticketNoteExample:
      'Acme Corp client unable to sign into Outlook/Teams from office. Error: "Invalid username or password" after multiple attempts. Another user can sign in from same device. Device and credentials verified. Password reset executed per client authorization.',
    jiraNotePrompt: 'Write the escalation note if password reset did not restore access. Include client, user, error, device state, and next action.',
    riskNote: 'Do not accept passwords in chat or email. Always use secure password reset procedures.',
    recommendedModuleIds: ['msp-ticket-triage-escalation', 'msp-client-communication-documentation']
  }),
  scenario({
    id: 'msp-mfa-loop-or-prompt-stuck',
    title: 'Repeated MFA prompts or stuck MFA loop',
    summary: 'A client user reports being stuck in an endless MFA challenge loop.',
    focus: ['MFA state', 'device trust', 'cache', 'security concern', 'escalation'],
    estimatedMinutes: 9,
    targetEnvironment: 'MSP',
    initialReport:
      'A client reports they keep getting MFA prompts even after approving them, and they are now locked out of their account.',
    contextBullets: [
      'MFA loops can indicate device compromise or M365 account security issues.',
      'Excessive MFA prompts should be treated as a security signal.',
      'Client safety and timely escalation are critical.'
    ],
    steps: [
      {
        id: 'msp-mfa-step-1',
        title: 'Security assessment',
        prompt: 'What is the first priority?',
        choices: [
          {
            id: 'msp-mfa-1a',
            label: 'Confirm the MFA prompts are from legitimate M365 (not a phishing loop) and ask if the client recognizes the requests',
            outcome: 'Good. That verifies the MFA is legitimate before proceeding.',
            riskNote: 'Security-first approach.',
            correct: true
          },
          {
            id: 'msp-mfa-1b',
            label: 'Reset the account password immediately to break the loop',
            outcome: 'That may help but misses the security signal.',
            riskNote: 'Symptomatic only.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-mfa-1a'
      },
      {
        id: 'msp-mfa-step-2',
        title: 'Triage',
        newInformation:
          'The MFA prompts are coming from legitimate Microsoft. The client confirms they recognize the device but keep hitting "Approve" and still get another prompt.',
        prompt: 'What should be checked?',
        choices: [
          {
            id: 'msp-mfa-2a',
            label: 'Whether the device cache is corrupted, whether "trust this device" is being saved, and whether this is one device or multiple devices',
            outcome: 'Good. That identifies whether this is a device issue or account state issue.',
            riskNote: 'Targeted checks.',
            correct: true
          },
          {
            id: 'msp-mfa-2b',
            label: 'Just delete all browser cookies and assume the loop will clear',
            outcome: 'That may temporarily help but risks data loss and misses root cause.',
            riskNote: 'Risky without understanding.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-mfa-2a'
      },
      {
        id: 'msp-mfa-step-3',
        title: 'Escalation',
        newInformation:
          'The loop persists even after cache clearing. This is now affecting the client morning workflow.',
        prompt: 'What should be escalated?',
        choices: [
          {
            id: 'msp-mfa-3a',
            label: 'Suspected MFA loop with client impact, device checks done, and request for M365 admin or vendor investigation',
            outcome: 'Good. That preserves evidence and gets the right team involved.',
            riskNote: 'Professional escalation.',
            correct: true
          },
          {
            id: 'msp-mfa-3b',
            label: 'Just tell the client to try again later',
            outcome: 'That provides no support or escalation.',
            riskNote: 'Unhelpful and risky.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-mfa-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Verify MFA prompts are legitimate.',
      'Check device cache and trust settings.',
      'Escalate to M365 admin with full evidence if device-level fixes do not resolve.'
    ],
    escalationPoint: 'Escalate if device-level fixes do not break the loop and client is blocked from work.',
    ticketNoteExample:
      'Acme Corp client experiencing endless MFA loop: approves prompt but new prompt appears immediately. Legitimate M365 MFA confirmed. Device cache cleared, "trust device" setting verified. Loop persists. Requesting M365 admin investigation for possible account-side state issue.',
    jiraNotePrompt: 'Write the escalation note for suspected MFA loop. Include legitimacy check, device checks, client impact, and request for investigation.',
    riskNote: 'Treat excessive MFA as a security signal. Do not dismiss as user error without verification.',
    recommendedModuleIds: ['msp-ticket-triage-escalation', 'msp-client-communication-documentation']
  }),
  scenario({
    id: 'msp-printer-offline-client',
    title: 'Client printer offline during business hours',
    summary: 'A client site reports their main office printer is offline and staff cannot print.',
    focus: ['device state', 'network path', 'queue', 'client SLA', 'fallback'],
    estimatedMinutes: 9,
    targetEnvironment: 'MSP',
    initialReport: 'TechServe Systems (client) reports their office printer shows offline and no one can print documents.',
    contextBullets: [
      'Client printer outages require fast triage and SLA awareness.',
      'Printer status can be device, network, or queue related.',
      'Fallback printing is essential for business continuity.'
    ],
    steps: [
      {
        id: 'msp-printer-step-1',
        title: 'Initial triage',
        prompt: 'What must be confirmed first given the SLA?',
        choices: [
          {
            id: 'msp-printer-1a',
            label: 'The client SLA response time, the exact printer model/location, current device status (power, error lights), and queue state',
            outcome: 'Good. SLA context shapes urgency, device state shapes solution path.',
            riskNote: 'SLA and scope awareness.',
            correct: true
          },
          {
            id: 'msp-printer-1b',
            label: 'Immediately tell the client to restart the printer',
            outcome: 'That may help but skips evidence gathering.',
            riskNote: 'Action without scope.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-printer-1a'
      },
      {
        id: 'msp-printer-step-2',
        title: 'Device check',
        newInformation:
          'Printer is powered, has paper, no error lights. Network shows "Offline" on the display panel. Queue has jobs waiting.',
        prompt: 'What is the likely issue?',
        choices: [
          {
            id: 'msp-printer-2a',
            label: 'The device cannot reach the network. Check IP, ping, and Ethernet or Wi-Fi connection.',
            outcome: 'Good. That narrows the issue to the device network path.',
            riskNote: 'Logical narrowing.',
            correct: true
          },
          {
            id: 'msp-printer-2b',
            label: 'The jobs in the queue must be corrupted, so delete them all immediately',
            outcome: 'That destroys evidence and may not be necessary.',
            riskNote: 'Premature action.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-printer-2a'
      },
      {
        id: 'msp-printer-step-3',
        title: 'Client continuity',
        newInformation: 'Printer shows a valid IP but does not respond to network tests. Repair will take 2+ hours.',
        prompt: 'What should be offered?',
        choices: [
          {
            id: 'msp-printer-3a',
            label: 'Escalate to printer vendor, document device state and network evidence, and offer an alternative printer or document distribution method',
            outcome: 'Good. That preserves business continuity while getting expert repair involved.',
            riskNote: 'Strong client support.',
            correct: true
          },
          {
            id: 'msp-printer-3b',
            label: 'Tell the client nothing can be done until Monday',
            outcome: 'That ignores SLA and client business needs.',
            riskNote: 'Poor service.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-printer-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Confirm SLA context and device location.',
      'Check device power and network connectivity.',
      'Escalate with evidence and offer interim workflow.'
    ],
    escalationPoint: 'Escalate once device network path is unavailable and client SLA requires continuity.',
    ticketNoteExample:
      'TechServe Systems office printer offline, no network connection despite valid IP. Device powered, no jam, jobs queued. Network path unavailable (ping fails). Printer vendor escalation initiated. Alternative printing arranged via networked device in conference room.',
    jiraNotePrompt: 'Write the escalation to the printer vendor. Include device model, network evidence, client SLA, and interim solution offered.',
    riskNote: 'Always provide a fallback for client business continuity. Do not leave them without printing capability.',
    recommendedModuleIds: ['msp-ticket-triage-escalation', 'msp-client-communication-documentation']
  }),
  scenario({
    id: 'msp-unifi-ap-offline',
    title: 'UniFi access point offline at client site',
    summary: 'A client site reports no Wi-Fi available at one location and staff are unable to work.',
    focus: ['network device triage', 'PoE', 'uplink', 'failover', 'client impact'],
    estimatedMinutes: 10,
    targetEnvironment: 'MSP',
    initialReport:
      'CloudPro Industries (client) reports the access point in their east wing is not broadcasting Wi-Fi and staff cannot connect.',
    contextBullets: [
      'AP failures can be power, uplink, or device failure.',
      'UniFi dashboard visibility is essential.',
      'Failover and mesh options may exist.'
    ],
    steps: [
      {
        id: 'msp-ap-step-1',
        title: 'Remote verification',
        prompt: 'What is the first remote check?',
        choices: [
          {
            id: 'msp-ap-1a',
            label: 'Log into the UniFi controller and check the AP status, event logs, and whether it shows online but broadcasting is off',
            outcome: 'Good. That shows whether the issue is device state or management visibility.',
            riskNote: 'Remote visibility first.',
            correct: true
          },
          {
            id: 'msp-ap-1b',
            label: 'Tell the client to walk over and unplug/replug the device',
            outcome: 'That may help but skips remote diagnostics.',
            riskNote: 'Premature field action.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-ap-1a'
      },
      {
        id: 'msp-ap-step-2',
        title: 'Controller status',
        newInformation: 'UniFi controller shows the AP as "Offline" with last heartbeat 30 minutes ago.',
        prompt: 'What should be checked?',
        choices: [
          {
            id: 'msp-ap-2a',
            label: 'Whether the AP has power (check PoE injector/switch), whether the uplink is connected, and whether there is a nearby AP providing mesh coverage',
            outcome: 'Good. That narrows between power, network path, and coverage issues.',
            riskNote: 'Logical narrowing.',
            correct: true
          },
          {
            id: 'msp-ap-2b',
            label: 'Just reboot the entire UniFi controller to reset everything',
            outcome: 'That may help but skips field diagnostics.',
            riskNote: 'Risky without understanding.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-ap-2a'
      },
      {
        id: 'msp-ap-step-3',
        title: 'Client support',
        newInformation: 'Field check confirms: AP is powered but PoE cable shows no lights, and the uplink switch port is powered but shows no link to the AP.',
        prompt: 'What should be communicated to the client?',
        choices: [
          {
            id: 'msp-ap-3a',
            label: 'Documented issue (power and uplink suspected), ETA for replacement cable/PoE injector, and interim coverage (mesh or nearby AP if available)',
            outcome: 'Good. That gives the client a clear status and timeline.',
            riskNote: 'Client-focused communication.',
            correct: true
          },
          {
            id: 'msp-ap-3b',
            label: 'Tell the client the AP is definitely broken and needs replacement (without evidence)',
            outcome: 'That overclaims without confirming the root cause.',
            riskNote: 'Premature conclusion.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-ap-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Check UniFi controller status and device visibility.',
      'Verify power and uplink connectivity.',
      'Communicate issue, ETA, and interim coverage.'
    ],
    escalationPoint: 'Escalate to hardware replacement if power and uplink are confirmed and device still offline.',
    ticketNoteExample:
      'CloudPro Industries east-wing AP offline. UniFi controller shows device offline, last heartbeat 30 min ago. PoE cable confirmed unpowered, uplink switch port powered but no link to AP. Suspected cable or PoE injector failure. Interim coverage available via mesh AP in adjacent office. Replacement cable ETA 2 hours.',
    jiraNotePrompt: 'Write the escalation note if power and uplink diagnostics point to hardware fault. Include device model, issue evidence, and interim solution.',
    riskNote: 'Verify power and uplink before declaring hardware failure. Many AP offline issues are cable or PoE related.',
    recommendedModuleIds: ['msp-ticket-triage-escalation', 'msp-client-communication-documentation']
  }),
  scenario({
    id: 'msp-rmm-low-disk-alert',
    title: 'RMM reports low disk space on client server',
    summary: 'An automated alert shows a client server drive is below 10% free space and may affect services.',
    focus: ['RMM alert triage', 'disk analysis', 'root cause', 'client decision', 'escalation'],
    estimatedMinutes: 10,
    targetEnvironment: 'MSP',
    initialReport:
      'The RMM dashboard shows FileServe1 at Acme Logistics has 9% free disk space and the alert is critical.',
    contextBullets: [
      'Low disk alerts can be temporary (cache buildup) or structural (growth outpacing storage).',
      'Root cause determines whether cleanup is enough or expansion is needed.',
      'Client approval is needed before adding storage costs.'
    ],
    steps: [
      {
        id: 'msp-disk-step-1',
        title: 'Alert investigation',
        prompt: 'What should be checked first in the RMM?',
        choices: [
          {
            id: 'msp-disk-1a',
            label: 'Disk usage trend (was it gradual or sudden drop?), identify largest folders/files, and check for known cache or log directories',
            outcome: 'Good. That shows whether this is temporary or structural growth.',
            riskNote: 'Evidence-based triage.',
            correct: true
          },
          {
            id: 'msp-disk-1b',
            label: 'Immediately tell the client they need to buy new storage',
            outcome: 'That may be premature before understanding root cause.',
            riskNote: 'Overreach without investigation.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-disk-1a'
      },
      {
        id: 'msp-disk-step-2',
        title: 'Root cause',
        newInformation:
          'Trend shows gradual growth over 6 months (storage growing steady, 100GB/month). Largest folder is application logs directory (250GB).',
        prompt: 'What is the likely issue?',
        choices: [
          {
            id: 'msp-disk-2a',
            label: 'Logs are filling disk. Either log rotation/archival is not configured or the application generates excess logs.',
            outcome: 'Good. That narrows the cause to a configuration or application issue.',
            riskNote: 'Root-cause identification.',
            correct: true
          },
          {
            id: 'msp-disk-2b',
            label: 'Assume malware is consuming the disk space',
            outcome: 'That is unlikely given the gradual pattern and log directory focus.',
            riskNote: 'Wrong diagnosis.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-disk-2a'
      },
      {
        id: 'msp-disk-step-3',
        title: 'Client action',
        newInformation: 'Cleanup of old logs will free 150GB. Long-term, log rotation needs configuration.',
        prompt: 'What should be proposed to the client?',
        choices: [
          {
            id: 'msp-disk-3a',
            label: 'Immediate cleanup option and permanent log-rotation fix, with costs and timeline for each',
            outcome: 'Good. That gives the client informed choice and decision authority.',
            riskNote: 'Client-focused proposal.',
            correct: true
          },
          {
            id: 'msp-disk-3b',
            label: 'Just delete the old logs without client approval',
            outcome: 'That could affect compliance or troubleshooting if logs are needed.',
            riskNote: 'Unauthorized action.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-disk-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Analyze disk trend and largest folders.',
      'Identify root cause (logs, cache, application growth).',
      'Propose immediate cleanup and permanent fix options.'
    ],
    escalationPoint: 'Escalate if cleanup is not sufficient or if application is misconfigured.',
    ticketNoteExample:
      'Acme Logistics FileServe1 at 9% free disk. Trend shows 6-month gradual growth. Root cause: log folder (250GB) filling due to missing log rotation. Immediate cleanup can free 150GB. Permanent fix requires log rotation configuration. Proposed both options to client with cost/timeline.',
    jiraNotePrompt: 'Write the technical note for log rotation configuration. Include server name, root cause, current state, and permanent fix steps.',
    riskNote: 'Always identify root cause before cleanup. Archive logs if they may be needed for compliance or troubleshooting.',
    recommendedModuleIds: ['msp-ticket-triage-escalation', 'msp-client-communication-documentation']
  }),
  scenario({
    id: 'msp-endpoint-offline-rmm',
    title: 'Workstation appears offline in RMM',
    summary: 'An RMM dashboard shows a client workstation offline and not responding to commands.',
    focus: ['RMM visibility', 'network connectivity', 'agent status', 'scope', 'user impact'],
    estimatedMinutes: 9,
    targetEnvironment: 'MSP',
    initialReport:
      'TechFlow Corp workstation WS-204 is showing offline in the RMM dashboard, and the client says it appears to be working normally.',
    contextBullets: [
      'RMM offline status can mean network loss, agent crash, or firewall block.',
      'User perception and RMM visibility may differ.',
      'Scope matters: is it one device, one user, or broader network issue?'
    ],
    steps: [
      {
        id: 'msp-endpoint-step-1',
        title: 'Verification',
        prompt: 'What is the first check?',
        choices: [
          {
            id: 'msp-endpoint-1a',
            label: 'Ask the client: Is the workstation powered on? Can they use it normally? Is it connected to the network?',
            outcome: 'Good. That clarifies whether RMM visibility loss is related to actual availability.',
            riskNote: 'User perspective first.',
            correct: true
          },
          {
            id: 'msp-endpoint-1b',
            label: 'Assume the agent crashed and immediately schedule a reboot',
            outcome: 'That may be unnecessary if the device is working fine.',
            riskNote: 'Premature action.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-endpoint-1a'
      },
      {
        id: 'msp-endpoint-step-2',
        title: 'Device state',
        newInformation: 'The workstation is powered on, user is working normally, and it is connected to the network.',
        prompt: 'What does this indicate?',
        choices: [
          {
            id: 'msp-endpoint-2a',
            label: 'The device is working but the RMM agent is not communicating. Check network connectivity to the RMM server and whether the agent is running.',
            outcome: 'Good. That narrows to RMM-specific issue rather than device outage.',
            riskNote: 'Proper scoping.',
            correct: true
          },
          {
            id: 'msp-endpoint-2b',
            label: 'The RMM dashboard must have a database error, so escalate to the RMM vendor',
            outcome: 'That may be true, but should verify network and agent first.',
            riskNote: 'Premature escalation.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-endpoint-2a'
      },
      {
        id: 'msp-endpoint-step-3',
        title: 'Root cause',
        newInformation:
          'Network connectivity to the RMM server is available. The RMM agent status shows "Not running" on the device.',
        prompt: 'What should be done?',
        choices: [
          {
            id: 'msp-endpoint-3a',
            label: 'Restart the RMM agent service on the device and confirm the device reappears in the RMM dashboard',
            outcome: 'Good. That should restore RMM visibility.',
            riskNote: 'Targeted service restart.',
            correct: true
          },
          {
            id: 'msp-endpoint-3b',
            label: 'Reimage the entire workstation',
            outcome: 'That is extreme and unnecessary for an agent restart.',
            riskNote: 'Overkill.',
            correct: false
          }
        ],
        recommendedChoiceId: 'msp-endpoint-3a'
      }
    ],
    idealTroubleshootingPath: [
      'Confirm device is actually working from user perspective.',
      'Distinguish device outage from RMM visibility loss.',
      'Check agent and network connectivity, then restart service.'
    ],
    escalationPoint: 'Escalate to RMM vendor if agent restart does not restore visibility.',
    ticketNoteExample:
      'TechFlow Corp WS-204 offline in RMM but device working normally per user. Network connectivity verified. RMM agent status shows not running on device. Restarted RMM agent service; device returned to online status in dashboard.',
    riskNote: 'Do not assume RMM visibility loss means the device is unavailable. Always verify with the user first.',
    recommendedModuleIds: ['msp-ticket-triage-escalation', 'msp-stack-rmm-psa']
  })
];
