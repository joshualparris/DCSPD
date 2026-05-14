import type { AssessmentQuestion, AssessmentSource } from '../types/assessment';
import type {
  Flashcard,
  ModulePattern,
  PracticalOutput,
  ScenarioPrompt,
  Section,
  TrainingModule
} from '../types/training';

const reviewSchedule = 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.';

function mcq(question: Omit<Extract<AssessmentQuestion, { type: 'mcq' }>, 'type'>): AssessmentQuestion {
  return {
    type: 'mcq',
    ...question
  };
}

function shortAnswer(
  question: Omit<Extract<AssessmentQuestion, { type: 'short-answer' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'short-answer',
    ...question
  };
}

function orderSteps(
  question: Omit<Extract<AssessmentQuestion, { type: 'order-steps' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'order-steps',
    ...question
  };
}

function scenarioResponse(
  question: Omit<Extract<AssessmentQuestion, { type: 'scenario-response' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'scenario-response',
    ...question
  };
}

function categorization(
  question: Omit<Extract<AssessmentQuestion, { type: 'categorization' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'categorization',
    ...question
  };
}

export const legacyModuleAliases: Record<string, string> = {
  foundations: 'dcs-it-support-foundations',
  'library-daily-routines': 'classroom-display-viewboard-troubleshooting',
  'ict-helpdesk-101': 'ticket-notes-escalation-quality'
};

type LegacyTrainingModule = Omit<TrainingModule, 'modulePattern'>;

const baseModules: LegacyTrainingModule[] = [
  {
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
  },
  {
    id: 'ports-and-protocols',
    title: 'Ports and Protocols',
    description:
      'Remember the ports and traffic patterns that explain real school symptoms, without pretending Level 1 should edit firewall policy.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 20,
    tags: ['ports', 'protocols', 'firewall thinking', 'network basics'],
    learningObjectives: [
      'Separate a port number from a protocol and a service.',
      'Recognise common school traffic patterns such as DNS, DHCP, HTTPS, and printing.',
      'Use port knowledge to describe likely causes without making unsafe changes.'
    ],
    dcsRelevance: [
      'Helps translate vague "internet is weird" complaints into better escalations.',
      'Supports safer firewall and guest Wi-Fi conversations with clearer language.',
      'Builds confidence around Teams, printing, browsing, and classroom service symptoms.'
    ],
    sections: [
      {
        id: 'ports-1',
        title: 'Why ports matter in school support',
        bodyMarkdown: `A protocol is the communication rule. A port is the numbered doorway a service commonly listens on.\n\nYou do not need to memorise every port in existence. You do need enough fluency to recognise why web access, name resolution, print services, remote support, or blocked guest access might behave differently.`
      },
      {
        id: 'ports-2',
        title: 'The school support shortlist',
        bodyMarkdown: `Keep a practical shortlist handy: DNS 53, DHCP 67/68, HTTP 80, HTTPS 443, SMB 445, RDP 3389.\n\nThe value is not trivia. The value is being able to say, "Browsing works, but name resolution may not," or, "Guest access should not have internal device reachability."`
      },
      {
        id: 'ports-3',
        title: 'Port knowledge with Level 1 judgement',
        bodyMarkdown: `Level 1 should not be changing firewall policy in production.\n\nLevel 1 should be able to describe a clean suspicion: for example, internal print or file services may be intentionally blocked from guest Wi-Fi, or a service may depend on HTTPS even when a user just says "Teams is broken."`
      }
    ],
    flashcards: [
      { id: 'ports-f1', front: 'What does port 53 usually support?', back: 'DNS name resolution.' },
      { id: 'ports-f2', front: 'What do ports 67 and 68 point to?', back: 'DHCP lease traffic.' },
      { id: 'ports-f3', front: 'What service usually rides on 443?', back: 'HTTPS-secured web traffic.' },
      { id: 'ports-f4', front: 'Why might guest Wi-Fi fail to reach printers by design?', back: 'Segmentation or firewall policy can intentionally block internal services.' },
      { id: 'ports-f5', front: 'What is the practical difference between a protocol and a port?', back: 'The protocol is the rule set; the port is the numbered entry point commonly used.' },
      { id: 'ports-f6', front: 'Which port is commonly associated with SMB file or print sharing?', back: '445.' },
      { id: 'ports-f7', front: 'Why is port knowledge useful to Level 1 if Josh is not editing firewalls?', back: 'It sharpens diagnosis and escalation language.' },
      { id: 'ports-f8', front: 'What service is commonly associated with RDP?', back: 'Remote Desktop on 3389.' }
    ],
    quiz: [
      mcq({
        id: 'ports-q1',
        prompt: 'A web app fails while basic network connection still seems present. Which port and service language is most useful to mention?',
        domain: 'Ports and protocols',
        difficulty: 'foundation',
        explanation: 'HTTPS is a common application dependency.',
        modelAnswer:
          'Mention that the application may depend on HTTPS over port 443, so the issue may be application-specific rather than total connectivity loss.',
        commonMistakes: ['Saying "the internet is dead" with no nuance', 'Confusing DNS with HTTPS'],
        dcsContext: 'Teams, portals, and modern SaaS tools often surface as HTTPS issues to the end user.',
        reviewSchedule,
        recommendedModuleId: 'ports-and-protocols',
        weakTopic: 'ports-protocols',
        options: [
          { id: 'a', label: 'Port 443 and HTTPS' },
          { id: 'b', label: 'Port 25 and SMTP' },
          { id: 'c', label: 'Port 21 and FTP' },
          { id: 'd', label: 'Port 110 and POP3' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'ports-q2',
        prompt: 'Explain why remembering a few common ports is useful to a DCS Level 1 tech even if Josh should not change firewall rules.',
        domain: 'Ports and protocols',
        difficulty: 'stretch',
        explanation: 'Language quality improves escalation quality.',
        modelAnswer:
          'A short list of common ports helps Josh describe likely causes more precisely, separate browsing issues from name resolution or print-sharing issues, and escalate with better technical language without making risky changes.',
        commonMistakes: ['Treating ports as memorisation only', 'Assuming port knowledge automatically means admin authority'],
        dcsContext: 'The school context rewards accurate descriptions and safe boundaries.',
        reviewSchedule,
        recommendedModuleId: 'ports-and-protocols',
        weakTopic: 'ports-protocols',
        rubric: ['Connects knowledge to safer diagnosis', 'Stays inside Level 1 boundaries', 'Explains escalation value'],
        keywordHints: ['diagnosis', 'escalation', 'boundaries']
      }),
      orderSteps({
        id: 'ports-q3',
        prompt: 'Order the safest way to reason through a guest Wi-Fi printer complaint.',
        domain: 'Ports and protocols',
        difficulty: 'stretch',
        explanation: 'Segmentation logic comes before guesswork.',
        modelAnswer:
          'Confirm the device is genuinely on guest Wi-Fi, confirm the target printer is an internal service, recognise segmentation as a likely design choice, then escalate rather than trying to bypass policy.',
        commonMistakes: ['Trying random printer installs first', 'Treating guest isolation like an accident'],
        dcsContext: 'Guest access often exists to keep internal devices protected.',
        reviewSchedule,
        recommendedModuleId: 'ports-and-protocols',
        weakTopic: 'vlan-firewall-rules',
        steps: [
          { id: 'ssid', label: 'Confirm the device is actually on guest Wi-Fi' },
          { id: 'service', label: 'Confirm the printer lives on an internal service path' },
          { id: 'design', label: 'Recognise segmentation may be intentional' },
          { id: 'escalate', label: 'Escalate instead of bypassing policy' }
        ],
        correctOrder: ['ssid', 'service', 'design', 'escalate'],
        rubric: ['Confirms facts first', 'Recognises design intent', 'Avoids unsafe workarounds']
      }),
      scenarioResponse({
        id: 'ports-q4',
        prompt: 'A staff member says, "Guest Wi-Fi should reach the smart TV and printer because the internet works." Explain the safer response.',
        domain: 'Ports and protocols',
        difficulty: 'challenge',
        explanation: 'Internet access and internal service access are not the same thing.',
        modelAnswer:
          'Explain that guest internet access does not imply access to internal devices. Guest networks are often isolated by design. Confirm the SSID and target device path, then escalate the requirement instead of promising a quick workaround.',
        commonMistakes: ['Assuming working internet means all services should work', 'Offering to open access without approval'],
        dcsContext: 'School guest access should stay restricted unless deliberately approved.',
        reviewSchedule,
        recommendedModuleId: 'ports-and-protocols',
        weakTopic: 'vlan-firewall-rules',
        rubric: ['Separates internet from internal access', 'Shows design awareness', 'Avoids unauthorised changes']
      })
    ],
    scenarioPrompts: [
      {
        id: 'ports-s1',
        title: 'Guest Wi-Fi complaint',
        prompt: 'Explain why internet access does not imply access to printers or TVs on the same network.'
      }
    ],
    practicalOutputs: [
      {
        id: 'ports-p1',
        title: 'Port memory sheet',
        description: 'Build a one-page memory sheet for the small port list Josh actually needs in school support.'
      }
    ]
  },
  {
    id: 'dns-dhcp-gateway-ip-basics',
    title: 'DNS, DHCP, Gateway, and IP Basics',
    description:
      'Turn loose network language into a concrete first-line mental model for classroom internet faults and 169.254 symptoms.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 20,
    tags: ['DNS', 'DHCP', 'gateway', 'IP', '169.254'],
    learningObjectives: [
      'Explain what DNS, DHCP, and the gateway each do in plain English.',
      'Recognise the difference between address problems and name-resolution problems.',
      'Use safe checks before escalating a classroom network fault.'
    ],
    dcsRelevance: [
      'Directly supports common classroom Wi-Fi, no-internet, and login confusion reports.',
      'Helps Josh interpret APIPA and name-resolution symptoms accurately.',
      'Improves escalation notes for room outages and trolley device issues.'
    ],
    sections: [
      {
        id: 'dns-1',
        title: 'Three jobs, three failures',
        bodyMarkdown: `DHCP gives a device an address. DNS turns names into addresses. The gateway is the route out toward other networks.\n\nIf DHCP fails, the device may never join the network properly. If DNS fails, users often say "internet is down" even though raw connectivity may still exist. If the gateway path fails, the device may have an address but still cannot reach beyond the local segment.`
      },
      {
        id: 'dns-2',
        title: 'What 169.254 usually means',
        bodyMarkdown: `A 169.254 address often means the device did not get a proper DHCP lease.\n\nThat does not tell you the exact root cause by itself. It does tell you where to start thinking: connection quality, correct SSID, adapter state, or a DHCP path problem.`
      },
      {
        id: 'dns-3',
        title: 'Safe checks before escalation',
        bodyMarkdown: `Use the low-risk flow: confirm the right SSID, reconnect, compare with another nearby device, and use simple tools like ipconfig, ping, or nslookup if that fits your confidence and permissions.\n\nYour aim is not to diagnose the entire network stack alone. Your aim is to preserve a clear symptom picture.`
      }
    ],
    flashcards: [
      { id: 'dns-f1', front: 'What does DHCP do?', back: 'It leases an IP configuration to the device.' },
      { id: 'dns-f2', front: 'What does DNS do?', back: 'It resolves names to IP addresses.' },
      { id: 'dns-f3', front: 'What does the default gateway do?', back: 'It provides the route off the local network.' },
      { id: 'dns-f4', front: 'What does 169.254 usually suggest?', back: 'The device did not get a proper DHCP lease.' },
      { id: 'dns-f5', front: 'Can a DNS issue feel like "the internet is down"?', back: 'Yes. Names may fail even if some connectivity still exists.' },
      { id: 'dns-f6', front: 'What is the safest first comparison in a classroom outage?', back: 'Check another known-good device in the same room or on the same SSID.' },
      { id: 'dns-f7', front: 'Why is SSID confirmation important?', back: 'Because the wrong network can create misleading symptoms.' },
      { id: 'dns-f8', front: 'What is Josh trying to preserve before escalation?', back: 'A clear symptom picture, not a speculative guess.' }
    ],
    quiz: [
      mcq({
        id: 'dns-q1',
        prompt: 'A student laptop shows a 169.254 address. What is the best first interpretation?',
        domain: 'DNS, DHCP, gateway basics',
        difficulty: 'foundation',
        explanation: 'APIPA points to a lease problem, not usually to a name-resolution problem first.',
        modelAnswer:
          'It most likely failed to get a proper DHCP lease, so start with connection quality, correct SSID, adapter state, and local lease path thinking.',
        commonMistakes: ['Calling it a DNS failure immediately', 'Assuming the entire school network is down from one address'],
        dcsContext: 'This is a common support pattern on laptops moving between rooms or trolleys.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        options: [
          { id: 'a', label: 'The DNS server is definitely down' },
          { id: 'b', label: 'The device likely did not obtain a proper DHCP lease' },
          { id: 'c', label: 'The printer queue is stuck' },
          { id: 'd', label: 'The gateway password is wrong' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'dns-q2',
        prompt: 'Explain the difference between a DNS problem and a gateway-path problem in plain English.',
        domain: 'DNS, DHCP, gateway basics',
        difficulty: 'stretch',
        explanation: 'Good support language separates names from routing.',
        modelAnswer:
          'A DNS issue is about finding the right address for a name. A gateway-path issue is about getting traffic out beyond the local network after the address is already known.',
        commonMistakes: ['Describing both as simply "internet down"', 'Mixing gateway and DNS into one job'],
        dcsContext: 'Clear language helps Paul or a Level 2 tech know where to look next.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        rubric: ['Separates name resolution from routing', 'Uses plain English', 'Links to diagnosis value'],
        keywordHints: ['names', 'address', 'route']
      }),
      orderSteps({
        id: 'dns-q3',
        prompt: 'Order a safe first-line response for "Wi-Fi connected, but room has no internet."',
        domain: 'DNS, DHCP, gateway basics',
        difficulty: 'stretch',
        explanation: 'Scope and comparison beat random resets.',
        modelAnswer:
          'Clarify whether it is one device or many, confirm the correct network, compare with a known-good device, then gather evidence for escalation if the pattern stays broad.',
        commonMistakes: ['Resetting many settings before checking scope', 'Skipping room comparison'],
        dcsContext: 'Room-based symptoms often hinge on scope.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        steps: [
          { id: 'scope', label: 'Clarify one device or many' },
          { id: 'ssid', label: 'Confirm the correct network is selected' },
          { id: 'compare', label: 'Compare with another device in the same space' },
          { id: 'escalate', label: 'Escalate with room and symptom evidence if needed' }
        ],
        correctOrder: ['scope', 'ssid', 'compare', 'escalate'],
        rubric: ['Scope first', 'Safe checks only', 'Evidence-rich escalation']
      }),
      scenarioResponse({
        id: 'dns-q4',
        prompt: 'A trolley laptop has Wi-Fi on, but pages will not load. Describe how you would explain the likely branches of failure without overclaiming certainty.',
        domain: 'DNS, DHCP, gateway basics',
        difficulty: 'challenge',
        explanation: 'Support confidence should be honest, not inflated.',
        modelAnswer:
          'Explain that the failure could be address leasing, name resolution, or path/routing. Confirm the right SSID, check whether it received a valid address, compare with a nearby device, and escalate with the observed branch rather than guessing the root cause.',
        commonMistakes: ['Claiming a root cause too early', 'Using vague phrases like "network thing"'],
        dcsContext: 'Trolley devices can pick up stale states after moving between rooms and chargers.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        rubric: ['Names the main branches', 'Avoids false certainty', 'Uses safe checks']
      })
    ],
    scenarioPrompts: [
      {
        id: 'dns-s1',
        title: '169.254 on a student laptop',
        prompt: 'Convert an APIPA symptom into a clear escalation note.'
      }
    ],
    practicalOutputs: [
      {
        id: 'dns-p1',
        title: 'Troubleshooting decision tree',
        description: 'Write a one-page decision tree for DNS, DHCP, and gateway-style classroom internet faults.'
      }
    ]
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
          'Explain that school devices may be centrally managed by policy and compliance requirements, so a home-PC comparison does not prove the request is safe or allowed. Capture the business need and escalate through the authorised management path.',
        commonMistakes: ['Promising a quick manual workaround', 'Treating the home example as a valid permission signal'],
        dcsContext: 'School-managed devices carry different risk and compliance expectations.',
        reviewSchedule,
        recommendedModuleId: 'mdm-intune-group-policy-concepts',
        weakTopic: 'security-risk-judgement',
        rubric: ['Names management context', 'Declines unsafe workaround', 'Captures the real need']
      })
    ],
    scenarioPrompts: [
      {
        id: 'mdm-s1',
        title: 'Policy keeps changing it back',
        prompt: 'Identify when a centrally managed setting is the likely cause rather than local user error.'
      }
    ],
    practicalOutputs: [
      {
        id: 'mdm-p1',
        title: 'MDM versus Group Policy explainer',
        description: "Write a plain-English comparison for Josh's own revision notes with school device examples."
      }
    ]
  },
  {
    id: 'vlans-network-segmentation',
    title: 'VLANs and Network Segmentation',
    description:
      'Understand why a school network deliberately separates traffic and how to talk about allow or block decisions without overpromising access.',
    domain: 'Networking',
    level: 'L2',
    estimatedMinutes: 18,
    tags: ['VLAN', 'segmentation', 'guest Wi-Fi', 'allow/block'],
    learningObjectives: [
      'Describe a VLAN as a traffic-separation tool rather than an abstract exam term.',
      'Explain why guest, student, staff, and device networks may need different access.',
      'Use plain-English allow or block thinking in escalation notes.'
    ],
    dcsRelevance: [
      'Schools need safe separation between guest access and internal devices.',
      'Segmentation explains why printers, TVs, or admin services may be unreachable by design.',
      'Helps Josh avoid promising access that should stay blocked.'
    ],
    sections: [
      {
        id: 'vlan-1',
        title: 'What segmentation is trying to protect',
        bodyMarkdown: `Segmentation separates traffic so not every device can talk to every other device.\n\nIn a school, that matters for guest Wi-Fi, internal services, shared printers, staff resources, and student safety.`
      },
      {
        id: 'vlan-2',
        title: 'Allow or block in plain English',
        bodyMarkdown: `A useful habit is to explain access rules in plain English first: should this group of devices reach that group of devices, and for what reason?\n\nThat language is often clearer than trying to sound like a firewall appliance.`
      },
      {
        id: 'vlan-3',
        title: 'What Level 1 should and should not do',
        bodyMarkdown: `Level 1 can recognise when a path may be intentionally blocked, confirm the network context, and escalate with the right request.\n\nLevel 1 should not invent ad hoc bypasses around security design.`
      }
    ],
    flashcards: [
      { id: 'vlan-f1', front: 'What is a VLAN helping you achieve?', back: 'Traffic separation and control.' },
      { id: 'vlan-f2', front: 'Why might guest Wi-Fi not reach internal printers?', back: 'Because segmentation may intentionally block that path.' },
      { id: 'vlan-f3', front: 'What is a good plain-English rule statement?', back: 'This device group should or should not reach that service group, and here is why.' },
      { id: 'vlan-f4', front: 'What should Josh avoid promising on a network path?', back: 'Access that may be blocked for security reasons.' },
      { id: 'vlan-f5', front: 'Why is segmentation useful in schools?', back: 'It reduces risk and keeps different users and services appropriately separated.' },
      { id: 'vlan-f6', front: 'What is the first fact to confirm in a segmentation complaint?', back: 'Which network or SSID the device is actually using.' },
      { id: 'vlan-f7', front: 'What value does plain-English allow/block thinking add?', back: 'It makes escalation requests clearer and safer.' },
      { id: 'vlan-f8', front: 'What is a risky habit in segmentation issues?', back: 'Treating blocked access as a bug without checking design intent.' }
    ],
    quiz: [
      mcq({
        id: 'vlan-q1',
        prompt: 'A guest device cannot see an internal printer. Which explanation deserves serious weight first?',
        domain: 'VLAN and segmentation',
        difficulty: 'foundation',
        explanation: 'Blocked access may be intentional, not accidental.',
        modelAnswer:
          'Segmentation or firewall policy may be intentionally preventing guest access to internal services, so confirm the network context before treating it as a fault.',
        commonMistakes: ['Assuming all connectivity should be universal', 'Offering an immediate workaround'],
        dcsContext: 'Guest isolation is often a deliberate school control.',
        reviewSchedule,
        recommendedModuleId: 'vlans-network-segmentation',
        weakTopic: 'vlan-firewall-rules',
        options: [
          { id: 'a', label: 'The printer is probably haunted' },
          { id: 'b', label: 'Segmentation may be intentionally blocking that path' },
          { id: 'c', label: 'DHCP is always the only cause' },
          { id: 'd', label: 'The user should just connect to any nearby network' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'vlan-q2',
        prompt: 'Explain segmentation in plain English for a non-technical staff member.',
        domain: 'VLAN and segmentation',
        difficulty: 'stretch',
        explanation: 'Simple language is a professional skill.',
        modelAnswer:
          'Segmentation means not every device is allowed to talk to every other device. The network is intentionally separated so the right people and devices can reach the right services while risk stays lower.',
        commonMistakes: ['Using jargon with no meaning', 'Explaining it as only an exam term'],
        dcsContext: 'Teachers need reassurance and clarity, not networking theatre.',
        reviewSchedule,
        recommendedModuleId: 'vlans-network-segmentation',
        weakTopic: 'vlan-firewall-rules',
        rubric: ['Plain English', 'Mentions separation', 'Mentions purpose or safety'],
        keywordHints: ['separate', 'allowed', 'services', 'safer']
      }),
      orderSteps({
        id: 'vlan-q3',
        prompt: 'Order the safest response to a guest Wi-Fi access complaint.',
        domain: 'VLAN and segmentation',
        difficulty: 'stretch',
        explanation: 'Context, design intent, then escalation.',
        modelAnswer:
          'Confirm the device really is on guest Wi-Fi, confirm what internal service it is trying to reach, recognise design intent may explain the block, then escalate the business requirement rather than bypassing the control.',
        commonMistakes: ['Trying to bypass before confirming the SSID', 'Treating every block as accidental'],
        dcsContext: 'Guest and internal paths should not blur casually.',
        reviewSchedule,
        recommendedModuleId: 'vlans-network-segmentation',
        weakTopic: 'vlan-firewall-rules',
        steps: [
          { id: 'confirm-ssid', label: 'Confirm the SSID or network context' },
          { id: 'target', label: 'Confirm the internal service or device being requested' },
          { id: 'intent', label: 'Consider whether the block may be intentional' },
          { id: 'request', label: 'Escalate the access request safely' }
        ],
        correctOrder: ['confirm-ssid', 'target', 'intent', 'request'],
        rubric: ['Verifies context', 'Checks design intent', 'Escalates safely']
      }),
      scenarioResponse({
        id: 'vlan-q4',
        prompt: 'A staff member wants guest devices to reach classroom TVs for an event. What reasoning should Josh apply before promising anything?',
        domain: 'VLAN and segmentation',
        difficulty: 'challenge',
        explanation: 'Business need and design intent both matter.',
        modelAnswer:
          'Capture the event need, identify the current network path, and recognise that guest-to-internal access may be intentionally blocked. The safe move is to escalate the business requirement and timing rather than promising access or suggesting a bypass.',
        commonMistakes: ['Promising a quick network exception', 'Ignoring event urgency in the escalation note'],
        dcsContext: 'Events create real pressure, but controls still matter.',
        reviewSchedule,
        recommendedModuleId: 'vlans-network-segmentation',
        weakTopic: 'security-risk-judgement',
        rubric: ['Recognises design intent', 'Captures the need clearly', 'Avoids unauthorised changes']
      })
    ],
    scenarioPrompts: [
      {
        id: 'vlan-s1',
        title: 'Guest access versus internal devices',
        prompt: 'Convert a blocked-path complaint into a clear plain-English escalation.'
      }
    ],
    practicalOutputs: [
      {
        id: 'vlan-p1',
        title: 'Allow and block rules in plain English',
        description: 'Write a simple rule sheet explaining what should or should not talk across key school network segments.'
      }
    ]
  },
  {
    id: 'cloud-models-saas-paas-iaas-daas',
    title: 'Cloud Models: SaaS, PaaS, IaaS, and DaaS',
    description:
      'Demystify cloud labels so Josh can place real school services in the right bucket and ask better support questions.',
    domain: 'Cloud and Platforms',
    level: 'A+',
    estimatedMinutes: 16,
    tags: ['cloud', 'SaaS', 'PaaS', 'IaaS', 'DaaS'],
    learningObjectives: [
      'Separate the major cloud service models with practical examples.',
      'Explain why cloud-model language matters for support and escalation.',
      'Avoid treating every online service as the same kind of dependency.'
    ],
    dcsRelevance: [
      'M365, Teams, web portals, and device management all live in different cloud conversations.',
      'Better cloud language helps Josh translate vendor or platform issues more clearly.',
      'Supports progression toward Level 2 responsibilities and broader school IT conversations.'
    ],
    sections: [
      {
        id: 'cloud-1',
        title: 'Think in responsibility layers',
        bodyMarkdown: `SaaS gives you the application. PaaS gives you a platform to build or run on. IaaS gives you infrastructure pieces. DaaS gives you a desktop-style environment as a service.\n\nThe helpful question is: who is responsible for what layer?`
      },
      {
        id: 'cloud-2',
        title: 'Why support should care',
        bodyMarkdown: `If a tool is SaaS, Josh is often dealing with access, browser, account, service status, or local endpoint symptoms rather than server ownership.\n\nIf the issue lives lower in the stack, the responsible team and escalation path may look different.`
      },
      {
        id: 'cloud-3',
        title: 'School examples without overclaiming',
        bodyMarkdown: `Use the model to reason, not to bluff. M365 and Teams are strong SaaS examples. Hosted desktops can fit DaaS thinking. Some school systems may hide deeper IaaS or platform layers, but Josh does not need to pretend he administers them to understand the shape.`
      }
    ],
    flashcards: [
      { id: 'cloud-f1', front: 'What does SaaS usually give the customer?', back: 'A ready-to-use application or service.' },
      { id: 'cloud-f2', front: 'What is the key lens for cloud models?', back: 'Responsibility layers and who manages what.' },
      { id: 'cloud-f3', front: 'What is PaaS in simple terms?', back: 'A platform layer for building or running applications.' },
      { id: 'cloud-f4', front: 'What is IaaS in simple terms?', back: 'Infrastructure resources such as compute, storage, or networking.' },
      { id: 'cloud-f5', front: 'What does DaaS usually provide?', back: 'A desktop-style environment delivered as a service.' },
      { id: 'cloud-f6', front: 'Why is M365 usually taught as SaaS first?', back: 'Because Josh mostly consumes the application and service layer.' },
      { id: 'cloud-f7', front: 'What risk comes from calling every online issue "cloud is broken"?', back: 'It hides the real layer and weakens diagnosis.' },
      { id: 'cloud-f8', front: 'Why should Josh know cloud models if he is Level 1?', back: 'They improve support language and escalation routing.' }
    ],
    quiz: [
      mcq({
        id: 'cloud-q1',
        prompt: "Which model best fits a ready-to-use application like Teams from Josh's support perspective?",
        domain: 'Cloud models',
        difficulty: 'foundation',
        explanation: 'Teams is primarily consumed as an application service.',
        modelAnswer: "From Josh's support perspective, Teams is best approached as SaaS.",
        commonMistakes: ['Treating any online app as IaaS by default', 'Using cloud terms without linking them to responsibility'],
        dcsContext: 'The question is about support posture, not vendor marketing purity.',
        reviewSchedule,
        recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
        weakTopic: 'cloud-models',
        options: [
          { id: 'a', label: 'SaaS' },
          { id: 'b', label: 'PaaS' },
          { id: 'c', label: 'IaaS' },
          { id: 'd', label: 'Bare metal only' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'cloud-q2',
        prompt: 'Why does cloud-model language help Josh escalate better?',
        domain: 'Cloud models',
        difficulty: 'stretch',
        explanation: 'The layer often hints at the right owner and symptom language.',
        modelAnswer:
          'Cloud-model language helps Josh describe which layer seems affected, who likely owns it, and whether the problem looks like account access, browser behavior, application service health, or deeper infrastructure.',
        commonMistakes: ['Treating cloud labels as empty trivia', 'Ignoring ownership and responsibility'],
        dcsContext: 'Better layer language makes support notes more useful.',
        reviewSchedule,
        recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
        weakTopic: 'cloud-models',
        rubric: ['Mentions ownership or layer', 'Links to support value', 'Uses practical examples'],
        keywordHints: ['layer', 'ownership', 'service', 'access']
      }),
      orderSteps({
        id: 'cloud-q3',
        prompt: 'Order the best thinking path for a SaaS-style service complaint.',
        domain: 'Cloud models',
        difficulty: 'stretch',
        explanation: 'Start at the consumed layer before making premature infrastructure assumptions.',
        modelAnswer:
          'Clarify the service and user symptom, check account and browser or device basics, compare with another user or device if possible, then escalate with evidence if the service path still looks affected.',
        commonMistakes: ['Jumping to deep infrastructure assumptions first', 'Skipping comparison'],
        dcsContext: 'Most Level 1 SaaS work lives close to the user experience.',
        reviewSchedule,
        recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
        weakTopic: 'cloud-models',
        steps: [
          { id: 'clarify', label: 'Clarify the service and exact symptom' },
          { id: 'basics', label: 'Check account, browser, or device basics' },
          { id: 'compare', label: 'Compare with another user or device if possible' },
          { id: 'escalate', label: 'Escalate with service-specific evidence' }
        ],
        correctOrder: ['clarify', 'basics', 'compare', 'escalate'],
        rubric: ['Starts at the consumed layer', 'Uses simple checks', 'Escalates with evidence']
      }),
      scenarioResponse({
        id: 'cloud-q4',
        prompt: 'A user says, "The cloud is down." Explain the more appropriate response Josh should use.',
        domain: 'Cloud models',
        difficulty: 'challenge',
        explanation: 'Vague labels hide useful distinctions.',
        modelAnswer:
          'Translate the complaint into a specific service, user symptom, and scope. Ask which app or platform is affected, whether others are impacted, and whether the issue looks like access, browser, or service behavior. Use cloud-model language only to sharpen the note, not to sound clever.',
        commonMistakes: ['Repeating the vague label back', 'Pretending the label is already a diagnosis'],
        dcsContext: 'Teachers need clear clarification rather than jargon.',
        reviewSchedule,
        recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
        weakTopic: 'ticket-quality',
        rubric: ['Clarifies the service', 'Separates symptom from label', 'Shows useful support posture']
      })
    ],
    scenarioPrompts: [
      {
        id: 'cloud-s1',
        title: 'The cloud is down',
        prompt: 'Translate vague platform language into a supportable symptom note.'
      }
    ],
    practicalOutputs: [
      {
        id: 'cloud-p1',
        title: 'Cloud model memory sheet',
        description: 'Write a concise comparison of SaaS, PaaS, IaaS, and DaaS with DCS-flavoured examples.'
      }
    ]
  },
  {
    id: 'cybersecurity-basics',
    title: 'Cybersecurity Awareness and Incident Response',
    description:
      'Understand modern school cyber threats, phishing tactics, and the NIST 800-61 incident response framework.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 20,
    tags: ['phishing', 'passwords', 'NIST 800-61', 'incident response'],
    learningObjectives: [
      'Recognise common phishing tactics and social engineering signals.',
      'Explain the importance of password hygiene and MFA in a school context.',
      'Map the four phases of the NIST 800-61 incident response framework.'
    ],
    dcsRelevance: [
      'Protects student and staff data from evolving social engineering threats.',
      'Aligns with the Texas School Safety Center recommendations for K-12 districts.',
      'Builds a safer "before, during, and after" posture for school cyber incidents.'
    ],
    sections: [
      {
        id: 'cyber-1',
        title: 'Phishing and Social Engineering',
        bodyMarkdown: `Phishing is an attempt to trick users into revealing credentials or downloading malware. In schools, this often looks like fake "urgent" IT alerts, spoofed principal emails, or fraudulent invoice requests.\n\nStaff should pause before clicking links, verify the sender's actual email address (not just the display name), and report suspicious messages immediately instead of deleting them.`
      },
      {
        id: 'cyber-2',
        title: 'Password Hygiene and MFA',
        bodyMarkdown: `Strong passwords and Multi-Factor Authentication (MFA) are the first line of defense. Reusing passwords across personal and school accounts creates a significant risk.\n\nMFA adds a second layer that prevents many credential-based attacks even if a password is leaked. At DCS, MFA is a critical requirement for protecting the M365 tenant.`
      },
      {
        id: 'cyber-3',
        title: 'NIST 800-61 Incident Response',
        bodyMarkdown: `The NIST 800-61 framework defines four phases: Preparation, Detection & Analysis, Containment, Eradication & Recovery, and Post-Incident Activity.\n\nLevel 1 support focuses heavily on Detection and early Containment (e.g., isolating a device) while preserving evidence for senior ICT staff.`
      }
    ],
    flashcards: [
      { id: 'cyber-f1', front: 'What is the goal of phishing?', back: 'To trick users into revealing credentials or installing malware.' },
      { id: 'cyber-f2', front: 'What should a staff member check before clicking a link?', back: "The sender's actual email address and the target URL destination." },
      { id: 'cyber-f3', front: 'Why is MFA important?', back: 'It provides a second layer of security beyond just a password.' },
      { id: 'cyber-f4', front: 'What are the four phases of NIST 800-61?', back: 'Preparation, Detection & Analysis, Containment/Eradication/Recovery, and Post-Incident Activity.' },
      { id: 'cyber-f5', front: 'What is Josh’s primary role in a cyber incident?', back: 'Early detection, basic containment, and evidence-safe escalation.' },
      { id: 'cyber-f6', front: 'Should Josh delete a suspicious email for a user?', back: 'No. Report it through official channels to preserve the evidence for analysis.' },
      {
        id: 'cyber-f7',
        front: 'What details should be captured for a suspected compromise?',
        back: 'Time reported, symptoms, affected account/device, actions already taken, and who has been notified.'
      },
      {
        id: 'cyber-f8',
        front: 'Why isolate a potentially infected device?',
        back: 'To limit spread while preserving device state for senior ICT review.'
      }
    ],
    quiz: [
      mcq({
        id: 'cyber-q1',
        prompt: 'A staff member receives an email from the "Principal" asking for an urgent bank transfer. What is the best first step?',
        domain: 'Cybersecurity',
        difficulty: 'foundation',
        explanation: 'Business Email Compromise (BEC) often uses authority to create false urgency.',
        modelAnswer: 'Verify the sender independently and report it as a potential phishing attempt. Do not act on the request.',
        commonMistakes: ['Replying to the email', 'Assuming the Principal is really asking', 'Not verifying the sender'],
        dcsContext: 'DCS Principal will never ask for urgent bank transfers via email.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-basics',
        weakTopic: 'security-risk-judgement',
        options: [
          { id: 'a', label: 'Reply immediately to show efficiency' },
          { id: 'b', label: 'Verify the sender and report the email' },
          { id: 'c', label: 'Delete the email so no one else sees it' },
          { id: 'd', label: 'Forward it to the whole staff as a warning' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'cyber-q2',
        prompt: 'Briefly explain the "Containment" phase of incident response for a suspected infected laptop.',
        domain: 'Cybersecurity',
        difficulty: 'stretch',
        explanation: 'Containment stops the damage from spreading.',
        modelAnswer: 'Containment involves isolating the affected device from the network (Wi-Fi/Ethernet) to prevent the spread of malware or unauthorized access, while keeping the device powered on if needed for forensics.',
        commonMistakes: ['Shutting down immediately (losing memory forensics)', 'Leaving it on the Wi-Fi'],
        dcsContext: 'Containment is a critical Level 1 response step.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-basics',
        weakTopic: 'security-risk-judgement',
        rubric: ['Mentions network isolation', 'Explains purpose (preventing spread)', 'Mentions evidence preservation'],
        keywordHints: ['isolate', 'network', 'spread', 'evidence']
      }),
      mcq({
        id: 'cyber-q3',
        prompt: 'A user reports a suspicious sign-in prompt after clicking a link. Which evidence is safest to capture first?',
        domain: 'Cybersecurity',
        difficulty: 'foundation',
        explanation: 'Capture observable, privacy-safe facts before changing state or deleting evidence.',
        modelAnswer: 'Capture the time, account/device affected, prompt wording or screenshot if approved, and any actions already taken.',
        commonMistakes: ['Asking for the password', 'Deleting the email immediately', 'Resetting everything before evidence is captured'],
        dcsContext: 'DCS support notes should preserve evidence without collecting secrets.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-basics',
        weakTopic: 'security-risk-judgement',
        options: [
          { id: 'a', label: 'The user password' },
          { id: 'b', label: 'Time, affected account/device, symptoms, and actions taken' },
          { id: 'c', label: 'A forwarded copy to all staff' },
          { id: 'd', label: 'A private copy of the user mailbox' }
        ],
        correctOptionId: 'b'
      }),
      scenarioResponse({
        id: 'cyber-q4',
        prompt: 'A teacher thinks they entered their password into a fake Microsoft sign-in page. Write the first three support actions.',
        domain: 'Cybersecurity',
        difficulty: 'stretch',
        explanation: 'The first response should reduce risk, preserve evidence, and escalate quickly.',
        modelAnswer:
          'Ask the teacher to stop using the session, capture the time/link/context without collecting the password, isolate or secure affected devices if needed, and escalate urgently to senior ICT for account protection and review.',
        commonMistakes: ['Asking them to type the password again', 'Treating it as a normal forgotten password', 'Deleting the email before escalation'],
        dcsContext: 'Credential exposure can affect the wider M365 tenant, so fast escalation matters.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-basics',
        weakTopic: 'security-risk-judgement',
        rubric: ['Stops further risk', 'Preserves evidence safely', 'Escalates urgently']
      })
    ],
    scenarioPrompts: [
      {
        id: 'cyber-s1',
        title: 'Suspicious Link Clicked',
        prompt: 'A teacher admits they clicked a link in a suspicious email and entered their M365 password. Work through the first 5 minutes of response.'
      }
    ],
    practicalOutputs: [
      {
        id: 'cyber-p1',
        title: 'Cyber Incident Report Template',
        description: 'Draft a simple form Josh can use to capture the who, what, and when of a suspected security incident.'
      }
    ]
  },
  {
    id: 'device-imaging-workflows',
    title: 'Device Imaging and Deployment Workflows',
    description:
      'Learn the difference between imaging and provisioning, and how to plan a deployment workflow for school devices.',
    domain: 'Endpoint Support',
    level: 'L2',
    estimatedMinutes: 20,
    tags: ['imaging', 'WDS', 'provisioning', 'deployment'],
    learningObjectives: [
      'Distinguish between traditional heavy imaging and modern provisioning.',
      'Explain the role of Windows Deployment Services (WDS) and reference images.',
      'Document a deployment workflow for a new batch of staff laptops.'
    ],
    dcsRelevance: [
      'Reduces manual setup time for large batches of student or staff devices.',
      'Ensures consistent software baselines across the school campus.',
      'Prepares Josh for large-scale refresh projects and lab deployments.'
    ],
    sections: [
      {
        id: 'imaging-1',
        title: 'Imaging vs. Provisioning',
        bodyMarkdown: `Traditional imaging involves capturing a complete "snapshot" of a configured OS and pushing it to other devices. Modern provisioning (like Windows Autopilot) applies settings and apps to a "clean" factory OS over the air.\n\nImaging is faster for local labs with heavy software; provisioning is better for remote or mobile staff devices.`
      },
      {
        id: 'imaging-2',
        title: 'Windows Deployment Services (WDS)',
        bodyMarkdown: `WDS allows you to deploy Windows over the network using PXE boot. It typically uses a "boot image" to start the process and an "install image" containing the actual OS.\n\nKeeping base images generic and updated is a best practice to avoid driver conflicts.`
      },
      {
        id: 'imaging-3',
        title: 'Deployment Workflows',
        bodyMarkdown: `A successful deployment starts with planning: choosing the software baseline, testing drivers, creating a reference image, and documenting the post-imaging steps (like domain join or asset tagging).`
      }
    ],
    flashcards: [
      { id: 'imaging-f1', front: 'What is PXE boot used for?', back: 'To boot a device from the network for imaging/deployment.' },
      { id: 'imaging-f2', front: 'What is a "reference image"?', back: 'A template OS containing the baseline software and settings for deployment.' },
      { id: 'imaging-f3', front: 'Imaging vs Provisioning: which is "over-the-air"?', back: 'Provisioning (e.g., Autopilot).' },
      { id: 'imaging-f4', front: 'Why keep base images generic?', back: 'To reduce driver conflicts and make the image compatible with more hardware models.' },
      { id: 'imaging-f5', front: 'What should be tested before a lab image rollout?', back: 'Drivers, network boot, required apps, domain join, updates, and printing/display basics.' },
      { id: 'imaging-f6', front: 'What is a pilot device?', back: 'A small test device used to prove the deployment process before the full batch.' },
      { id: 'imaging-f7', front: 'Why record asset tags during deployment?', back: 'They link the physical device to support history, location, and ownership.' },
      { id: 'imaging-f8', front: 'When should imaging be escalated?', back: 'When boot, driver, licensing, or domain-join failures repeat across multiple devices.' }
    ],
    quiz: [
      mcq({
        id: 'imaging-q1',
        prompt: 'Which tool is most likely used for network-based OS deployment in a Windows environment?',
        domain: 'Imaging',
        difficulty: 'foundation',
        explanation: 'WDS is the standard Windows role for network deployments.',
        modelAnswer: 'WDS (Windows Deployment Services) handles network boot and image delivery.',
        commonMistakes: ['Using consumer tools like Disk Management', 'Manual USB installs for 30+ devices'],
        dcsContext: 'DCS uses network-based deployment for fleet efficiency.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-workflows',
        weakTopic: 'laptop-mobile-hardware',
        options: [
          { id: 'a', label: 'Windows Update' },
          { id: 'b', label: 'WDS (Windows Deployment Services)' },
          { id: 'c', label: 'Disk Management' },
          { id: 'd', label: 'File Explorer' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'imaging-q2',
        prompt: 'Why should a reference image be tested on more than one hardware model before a rollout?',
        domain: 'Imaging',
        difficulty: 'foundation',
        explanation: 'Different models may need different drivers, firmware settings, or post-install steps.',
        modelAnswer:
          'Testing across models helps catch driver, network, display, storage, and domain-join issues before the image is used on a full lab or staff batch.',
        commonMistakes: ['Assuming one successful device proves the whole fleet', 'Skipping driver validation'],
        dcsContext: 'DCS deployments often span mixed device models and classroom use cases.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-workflows',
        weakTopic: 'laptop-mobile-hardware',
        rubric: ['Mentions driver differences', 'Mentions pre-rollout risk reduction', 'Connects testing to fleet deployment'],
        keywordHints: ['drivers', 'models', 'test', 'rollout', 'fleet']
      }),
      orderSteps({
        id: 'imaging-q3',
        prompt: 'Put the deployment workflow in the safest order.',
        domain: 'Imaging',
        difficulty: 'foundation',
        explanation: 'A safe rollout proves the image before broad deployment.',
        modelAnswer: 'Plan requirements, build/test the image, pilot on a small device set, then deploy and document outcomes.',
        commonMistakes: ['Deploying first then testing', 'Skipping documentation'],
        dcsContext: 'A staged rollout reduces classroom disruption.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-workflows',
        weakTopic: 'laptop-mobile-hardware',
        steps: [
          { id: 'plan', label: 'Confirm requirements and device scope' },
          { id: 'build', label: 'Build and test the reference image' },
          { id: 'pilot', label: 'Pilot on a small set of devices' },
          { id: 'deploy', label: 'Deploy broadly and document exceptions' }
        ],
        correctOrder: ['plan', 'build', 'pilot', 'deploy'],
        rubric: ['Plans first', 'Tests before deployment', 'Documents exceptions']
      }),
      scenarioResponse({
        id: 'imaging-q4',
        prompt: 'A lab image works on 20 devices but fails network boot on 5. What should the support note include before escalation?',
        domain: 'Imaging',
        difficulty: 'stretch',
        explanation: 'Escalation is stronger when the pattern is clear.',
        modelAnswer:
          'List the affected asset tags/models, error messages, network port/location, whether PXE starts, steps already tried, and the working comparison devices.',
        commonMistakes: ['Only writing "imaging failed"', 'Not separating affected and working models'],
        dcsContext: 'Fleet deployment notes need enough pattern detail for senior ICT to act quickly.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-workflows',
        weakTopic: 'laptop-mobile-hardware',
        rubric: ['Captures asset/model pattern', 'Captures error and location', 'Includes attempted steps and comparisons']
      })
    ],
    scenarioPrompts: [
      {
        id: 'imaging-s1',
        title: 'Lab Refresh Planning',
        prompt: 'You need to refresh 30 PCs in the Senior Lab. Outline the steps from driver testing to final domain join.'
      }
    ],
    practicalOutputs: [
      {
        id: 'imaging-p1',
        title: 'Device Setup Checklist',
        description: 'Create a post-imaging checklist to ensure every device is named, joined, and tagged correctly.'
      }
    ]
  },
  {
    id: 'accessibility-inclusive-design',
    title: 'Accessibility and Inclusive Design',
    description:
      'Learn how to design and support e-learning and IT services that work for everyone, including those with impairments.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 15,
    tags: ['WCAG', 'accessibility', 'inclusive design', 'assistive tech'],
    learningObjectives: [
      'Explain the core principles of WCAG (Perceivable, Operable, Understandable, Robust).',
      'Identify common assistive technologies used in schools (screen readers, high contrast).',
      'Apply accessibility checks like alt-text and color contrast to digital content.'
    ],
    dcsRelevance: [
      'Ensures all students and staff can access learning materials regardless of ability.',
      'Supports the school’s legal and ethical commitment to inclusive education.',
      'Improves the usability of DCSPrep and other internal portals.'
    ],
    sections: [
      {
        id: 'access-1',
        title: 'WCAG Principles',
        bodyMarkdown: `The Web Content Accessibility Guidelines (WCAG) are built on four pillars: POUR.\n\n- **Perceivable**: Users must be able to see or hear the content.\n- **Operable**: Users must be able to navigate and interact with it (e.g., keyboard only).\n- **Understandable**: The language and UI must be clear.\n- **Robust**: It must work across different browsers and assistive tools.`
      },
      {
        id: 'access-2',
        title: 'Assistive Technologies',
        bodyMarkdown: `School IT supports many assistive tools: Screen readers (NVDA, JAWS), Screen magnifiers, High-contrast themes, and Switch access for motor impairments.\n\nUnderstanding how these tools "read" a page helps IT staff troubleshoot layout or navigation issues.`
      },
      {
        id: 'access-3',
        title: 'Practical Accessibility Checks',
        bodyMarkdown: `Level 1 checks should be simple and observable: can the page be used with a keyboard, does every important image have useful alt text, is colour contrast readable, and do links or buttons make sense out of context?\n\nWhen a barrier affects learning, document the exact page, device/browser, assistive tool, user impact, and any safe workaround before escalation.`
      }
    ],
    flashcards: [
      { id: 'access-f1', front: 'What does "POUR" stand for in accessibility?', back: 'Perceivable, Operable, Understandable, Robust.' },
      { id: 'access-f2', front: 'Why is alt-text important?', back: 'It allows screen readers to describe images to users with visual impairments.' },
      { id: 'access-f3', front: 'What is a "keyboard-only" user?', back: 'Someone who navigates without a mouse, often due to motor impairments.' },
      { id: 'access-f4', front: 'What does colour contrast support?', back: 'Readable content for users with low vision, colour blindness, or difficult screen conditions.' },
      { id: 'access-f5', front: 'Why should link text be descriptive?', back: 'Screen reader users may navigate by links alone, so "click here" gives poor context.' },
      { id: 'access-f6', front: 'What should be captured when escalating an accessibility barrier?', back: 'Page/app, device/browser, assistive tool, user impact, reproduction steps, and workaround tried.' },
      { id: 'access-f7', front: 'What is an assistive technology?', back: 'A tool that helps someone access digital content, such as a screen reader, magnifier, or switch device.' },
      { id: 'access-f8', front: 'Why test with keyboard navigation?', back: 'It reveals whether users can reach and operate controls without a mouse.' }
    ],
    quiz: [
      mcq({
        id: 'access-q1',
        prompt: 'Which WCAG principle ensures that users can navigate a site using only a keyboard?',
        domain: 'Accessibility',
        difficulty: 'foundation',
        explanation: 'Operability covers navigation and interface interaction.',
        modelAnswer: 'Operable.',
        commonMistakes: ['Confusing Operable with Perceivable'],
        dcsContext: 'Keyboard navigation is a core requirement for inclusive school tools.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-inclusive-design',
        weakTopic: 'soft-skills',
        options: [
          { id: 'a', label: 'Perceivable' },
          { id: 'b', label: 'Operable' },
          { id: 'c', label: 'Understandable' },
          { id: 'd', label: 'Robust' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'access-q2',
        prompt: 'A student cannot use an online task because the next button is only visible by colour. What should the support note include?',
        domain: 'Accessibility',
        difficulty: 'foundation',
        explanation: 'Accessibility notes should describe the barrier and impact without exposing private student information.',
        modelAnswer:
          'Record the page/app, device/browser, the visual-only cue, learning impact, any safe workaround, and escalate with a clear accessibility barrier description.',
        commonMistakes: ['Only writing "student cannot use site"', 'Including unnecessary personal details'],
        dcsContext: 'Inclusive support protects privacy while making the barrier actionable.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-inclusive-design',
        weakTopic: 'soft-skills',
        rubric: ['Names the barrier', 'Captures impact safely', 'Includes technical context and escalation'],
        keywordHints: ['barrier', 'impact', 'page', 'device', 'escalate']
      }),
      mcq({
        id: 'access-q3',
        prompt: 'Which support action best checks whether a page is operable?',
        domain: 'Accessibility',
        difficulty: 'foundation',
        explanation: 'Operable means users can navigate and interact with the interface.',
        modelAnswer: 'Try navigating and using the page with the keyboard only.',
        commonMistakes: ['Only checking whether the page looks attractive', 'Only testing on a large monitor'],
        dcsContext: 'Keyboard-only checks are a practical Level 1 accessibility test.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-inclusive-design',
        weakTopic: 'soft-skills',
        options: [
          { id: 'a', label: 'Use only the mouse and trackpad' },
          { id: 'b', label: 'Navigate the key workflow with the keyboard only' },
          { id: 'c', label: 'Lower the screen brightness' },
          { id: 'd', label: 'Change the wallpaper' }
        ],
        correctOptionId: 'b'
      }),
      scenarioResponse({
        id: 'access-q4',
        prompt: 'A teacher reports that a PDF worksheet is unreadable by a screen reader. What first-line response should Josh give?',
        domain: 'Accessibility',
        difficulty: 'stretch',
        explanation: 'The response should acknowledge impact, gather usable evidence, and escalate for remediation.',
        modelAnswer:
          'Acknowledge the learning impact, identify the PDF and affected workflow, test whether text can be selected or read, note the assistive tool/browser, offer a safe temporary alternative if available, and escalate for accessible remediation.',
        commonMistakes: ['Blaming the user tool', 'Ignoring the lesson impact', 'Sending the same inaccessible PDF again'],
        dcsContext: 'Accessible learning materials are part of reliable school IT support.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-inclusive-design',
        weakTopic: 'soft-skills',
        rubric: ['Acknowledges impact', 'Captures technical evidence', 'Escalates for accessible remediation']
      })
    ],
    scenarioPrompts: [
      {
        id: 'access-s1',
        title: 'Screen Reader Barrier',
        prompt: 'A student using a screen reader cannot complete a portal task. Gather privacy-safe evidence and prepare an escalation note.'
      }
    ],
    practicalOutputs: [
      {
        id: 'access-p1',
        title: 'Accessibility Support Checklist',
        description: 'Create a Level 1 checklist for keyboard, alt text, contrast, screen reader, and escalation evidence checks.'
      }
    ]
  },
  {
    id: 'communication-soft-skills',
    title: 'Communication and Soft Skills for IT',
    description:
      'Master the art of interacting with teachers, students, and parents during high-pressure support incidents.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 15,
    tags: ['communication', 'empathy', 'active listening', 'de-escalation'],
    learningObjectives: [
      'Practise active listening to understand the "real" problem behind user frustration.',
      'Explain technical issues in plain English without patronising the user.',
      'Maintain a calm and professional posture during classroom emergencies.'
    ],
    dcsRelevance: [
      'Reduces friction between ICT and teaching staff.',
      'Builds trust in the IT support team across the school community.',
      'Ensures that support incidents are handled with empathy and clarity.'
    ],
    sections: [
      {
        id: 'soft-1',
        title: 'The "Support Heart"',
        bodyMarkdown: `Effective IT support is 50% technical and 50% relational. When a teacher’s display fails mid-lesson, they aren't just facing a technical fault; they are facing a loss of control and time.\n\nAcknowledging the impact ("I understand this is frustrating during class") often helps more than jumping straight into settings.`
      },
      {
        id: 'soft-2',
        title: 'Translating Technical Jargon',
        bodyMarkdown: `Avoid using terms like "DHCP lease," "VLAN," or "SSID" with non-technical users unless necessary. Instead, use analogies: "The laptop is having trouble getting its digital ID," or "The Wi-Fi channel is a bit crowded right now."`
      },
      {
        id: 'soft-3',
        title: 'Closing the Loop',
        bodyMarkdown: `Good support communication ends with clarity: what was checked, what changed, what remains unresolved, who owns the next step, and when the user should expect an update.\n\nA calm close-out turns a stressful interruption into a trustworthy support experience, even when the technical fix needs escalation.`
      }
    ],
    flashcards: [
      { id: 'soft-f1', front: 'What is active listening?', back: 'Fully concentrating on, understanding, and responding to what the user is saying.' },
      { id: 'soft-f2', front: 'How should you explain a delay to a teacher?', back: 'Acknowledge the impact, state the next step, and provide a realistic timeframe.' },
      { id: 'soft-f3', front: 'What should come before technical questions in a stressful support moment?', back: 'A brief acknowledgement of the impact and pressure the user is under.' },
      { id: 'soft-f4', front: 'Why avoid jargon with non-technical users?', back: 'It can confuse or embarrass the user and hide the practical next step.' },
      { id: 'soft-f5', front: 'What is a good close-out statement?', back: 'A summary of what was checked, current status, owner, next step, and expected update.' },
      { id: 'soft-f6', front: 'What does de-escalation sound like?', back: 'Calm tone, specific next action, realistic timeframe, and no blame.' },
      { id: 'soft-f7', front: 'How should uncertainty be communicated?', back: 'Be honest about what is known, what is being checked, and when the user will hear back.' },
      { id: 'soft-f8', front: 'Why repeat the problem back to the user?', back: 'It confirms understanding and often reveals missing context before troubleshooting begins.' }
    ],
    quiz: [
      scenarioResponse({
        id: 'soft-q1',
        prompt: 'A teacher is visibly upset because their laptop won’t connect to the ViewBoard 2 minutes before a lesson. How do you open the conversation?',
        domain: 'Soft Skills',
        difficulty: 'foundation',
        explanation: 'Empathy first, then diagnostics.',
        modelAnswer: 'Acknowledge the pressure: "I can see this is stressful right before class. Let’s take a quick look at the cable and input together to see if we can get you running fast."',
        commonMistakes: ['Jumping straight to settings without talking', 'Ignoring the teacher'],
        dcsContext: 'DCS teachers value empathy as much as technical speed.',
        reviewSchedule,
        recommendedModuleId: 'communication-soft-skills',
        weakTopic: 'communication',
        rubric: ['Shows empathy', 'Calm tone', 'Focuses on immediate resolution']
      }),
      mcq({
        id: 'soft-q2',
        prompt: 'Which opening response is strongest when a teacher reports a projector failure during class?',
        domain: 'Soft Skills',
        difficulty: 'foundation',
        explanation: 'A strong response acknowledges pressure and moves quickly into a safe first check.',
        modelAnswer: 'Acknowledge the disruption and offer a quick, specific next step.',
        commonMistakes: ['Using jargon immediately', 'Sounding dismissive', 'Blaming the teacher'],
        dcsContext: 'Classroom support needs calm, practical communication under time pressure.',
        reviewSchedule,
        recommendedModuleId: 'communication-soft-skills',
        weakTopic: 'communication',
        options: [
          { id: 'a', label: 'It is probably user error; restart everything.' },
          { id: 'b', label: 'I can see this is interrupting class. I will check the input and cable first.' },
          { id: 'c', label: 'This is a DHCP issue.' },
          { id: 'd', label: 'Please log a ticket and wait.' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'soft-q3',
        prompt: 'Write a two-sentence update for a staff member when a fix will take longer than expected.',
        domain: 'Soft Skills',
        difficulty: 'foundation',
        explanation: 'Good updates are clear, accountable, and respectful of the user impact.',
        modelAnswer:
          'Thanks for your patience; I have checked the basic settings and this needs a deeper review. I have escalated it with the details we found and will update you by the agreed time.',
        commonMistakes: ['Overpromising', 'Giving no owner or timeframe', 'Using unexplained technical language'],
        dcsContext: 'Teachers need clear ownership and timing so they can plan around the issue.',
        reviewSchedule,
        recommendedModuleId: 'communication-soft-skills',
        weakTopic: 'communication',
        rubric: ['Acknowledges delay', 'States next step and owner', 'Gives a realistic update point'],
        keywordHints: ['delay', 'next step', 'owner', 'time', 'update']
      }),
      scenarioResponse({
        id: 'soft-q4',
        prompt: 'A parent is frustrated because they cannot access a school portal. How should Josh keep the conversation professional and useful?',
        domain: 'Soft Skills',
        difficulty: 'stretch',
        explanation: 'External support interactions need empathy, boundaries, and careful evidence gathering.',
        modelAnswer:
          'Acknowledge the frustration, avoid blame, confirm the exact portal and symptom, collect privacy-safe contact and device context, explain the next step, and escalate if access or identity changes are required.',
        commonMistakes: ['Discussing private account details without verification', 'Arguing about blame', 'Promising instant access changes'],
        dcsContext: 'Parent-facing support needs calm boundaries and privacy-safe escalation.',
        reviewSchedule,
        recommendedModuleId: 'communication-soft-skills',
        weakTopic: 'communication',
        rubric: ['Shows empathy', 'Maintains privacy boundaries', 'Clarifies next step']
      })
    ],
    scenarioPrompts: [
      {
        id: 'soft-s1',
        title: 'Frustrated Teacher Before Class',
        prompt: 'A teacher is anxious because a display issue may disrupt the lesson. Practise an opening response, first check, and close-out update.'
      }
    ],
    practicalOutputs: [
      {
        id: 'soft-p1',
        title: 'Support Conversation Script Bank',
        description: 'Create short scripts for opening, clarifying, delaying, escalating, and closing common school IT support conversations.'
      }
    ]
  },
  {
    id: 'ticket-notes-escalation-quality',
    title: 'Ticket Notes and Escalation Quality',
    description:
      'Build notes that are short, privacy-safe, and useful enough that the next tech can move without guesswork.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 18,
    tags: ['ticket notes', 'escalation', 'documentation', 'privacy'],
    learningObjectives: [
      'Capture who, where, device, symptom, scope, and steps tried without waffle.',
      'Keep wording privacy-safe and manager-safe.',
      'Explain urgency and impact without exaggerating the issue.'
    ],
    dcsRelevance: [
      'Good notes make practical support judgement visible and reusable.',
      'Clear escalation reduces repeat questions while protecting privacy.',
      'Documentation quality is one of the clearest bridges from Level 1 toward Level 2.'
    ],
    sections: [
      {
        id: 'ticket-1',
        title: 'What a good note actually does',
        bodyMarkdown: `A good note helps the next person act. It should answer: who or what is affected, where it is happening, what the exact symptom is, what scope is known, what has already been tried, and why the issue matters now.\n\nA note is not a diary and it is not a dramatic story.`
      },
      {
        id: 'ticket-2',
        title: 'Privacy-safe wording',
        bodyMarkdown: `Do not paste sensitive content, passwords, or private detail into a personal study app.\n\nEven in live ticketing, only include what is necessary. Describe the issue cleanly without spraying extra private data everywhere.`
      },
      {
        id: 'ticket-3',
        title: 'Impact, urgency, and honesty',
        bodyMarkdown: `Not every issue is critical, but some are urgent because learning is blocked, staff are stuck, or a security concern exists.\n\nGood support language is accurate and proportionate. It does not exaggerate, and it does not hide the real impact.`
      }
    ],
    flashcards: [
      { id: 'ticket-f1', front: 'What is the first job of a support note?', back: 'Help the next person act without guesswork.' },
      { id: 'ticket-f2', front: 'What details usually belong in a good note?', back: 'Who or what, where, exact symptom, scope, steps tried, impact, and next concern.' },
      { id: 'ticket-f3', front: 'What kind of wording should Josh avoid?', back: 'Vague, dramatic, or privacy-risk wording.' },
      { id: 'ticket-f4', front: 'Why does scope matter in a note?', back: 'It tells the next tech whether the issue is isolated or broader.' },
      { id: 'ticket-f5', front: 'How should urgency be described?', back: 'Clearly and accurately, tied to impact.' },
      { id: 'ticket-f6', front: 'What does privacy-safe wording protect?', back: 'Students, staff, families, and the school.' },
      { id: 'ticket-f7', front: 'What is better than "it is broken again"?', back: 'A specific symptom with room, device, scope, and steps tried.' },
      { id: 'ticket-f8', front: 'Why is documentation an indicator of professional capability?', back: 'It demonstrates judgement, communication quality, and process maturity.' }
    ],
    quiz: [
      mcq({
        id: 'ticket-q1',
        prompt: 'Which note is the strongest escalation summary?',
        domain: 'Ticket quality',
        difficulty: 'foundation',
        explanation: 'The strongest note preserves action-ready facts.',
        modelAnswer:
          'The best note names the room, device or service, exact symptom, scope, steps already tried, and class or business impact in a concise, evidence-based way.',
        commonMistakes: ['Choosing notes with emotion but no evidence', 'Leaving out scope and action taken'],
        dcsContext: 'A short but specific note saves class time later.',
        reviewSchedule,
        recommendedModuleId: 'ticket-notes-escalation-quality',
        weakTopic: 'ticket-quality',
        options: [
          { id: 'a', label: 'Internet broken again. Please fix ASAP.' },
          { id: 'b', label: 'Room 3 teacher laptop shows display but no audio on ViewBoard; other laptop not yet tested; class blocked for media playback.' },
          { id: 'c', label: 'Everything is weird today.' },
          { id: 'd', label: 'Someone said Teams hates them.' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'ticket-q2',
        prompt: 'What makes a note privacy-safe without becoming useless?',
        domain: 'Ticket quality',
        difficulty: 'stretch',
        explanation: 'The goal is useful minimum detail, not zero detail.',
        modelAnswer:
          'Include only the details needed to understand the issue and next action. Avoid passwords, unnecessary personal information, or copied private content, while still naming the room, symptom, and business impact clearly.',
        commonMistakes: ['Removing so much detail that the note becomes useless', 'Including sensitive content because it feels thorough'],
        dcsContext: 'The app itself is for personal PD and should stay especially clean.',
        reviewSchedule,
        recommendedModuleId: 'ticket-notes-escalation-quality',
        weakTopic: 'security-risk-judgement',
        rubric: ['Balances usefulness and privacy', 'Mentions minimum necessary detail', 'Avoids sensitive oversharing'],
        keywordHints: ['minimum necessary', 'passwords', 'private']
      }),
      orderSteps({
        id: 'ticket-q3',
        prompt: 'Order the right structure for an escalation note.',
        domain: 'Ticket quality',
        difficulty: 'stretch',
        explanation: 'Good structure improves reading speed under pressure.',
        modelAnswer:
          'Start with location and affected thing, then exact symptom and scope, then steps tried, then impact and why it is being escalated.',
        commonMistakes: ['Burying the actual symptom deep in the note', 'Putting opinions ahead of facts'],
        dcsContext: 'Busy support staff scan notes fast.',
        reviewSchedule,
        recommendedModuleId: 'ticket-notes-escalation-quality',
        weakTopic: 'ticket-quality',
        steps: [
          { id: 'location', label: 'State room or location and affected device or service' },
          { id: 'symptom', label: 'State the exact symptom and known scope' },
          { id: 'steps', label: 'List the safe steps already tried' },
          { id: 'impact', label: 'State impact, urgency, and escalation reason' }
        ],
        correctOrder: ['location', 'symptom', 'steps', 'impact'],
        rubric: ['Puts facts first', 'Shows scope and actions', 'Ends with impact and escalation reason']
      }),
      scenarioResponse({
        id: 'ticket-q4',
        prompt: 'Write the reasoning Josh should apply before logging a phishing-email concern in his personal PD app.',
        domain: 'Ticket quality',
        difficulty: 'challenge',
        explanation: 'The personal app is not the place for confidential incident details.',
        modelAnswer:
          'Do not paste the live email content, sender detail, or sensitive incident data into the personal PD app. Instead, log the learning concept at a high level, note the safe escalation pathway, and keep operational incident details in the authorised work system only.',
        commonMistakes: ['Copying real incident detail into a personal tool', 'Treating privacy risk as optional'],
        dcsContext: 'Security concerns demand both urgency and data discipline.',
        reviewSchedule,
        recommendedModuleId: 'ticket-notes-escalation-quality',
        weakTopic: 'security-risk-judgement',
        rubric: ['Protects sensitive data', 'Understands tool boundaries', 'Explains the safer alternative']
      })
    ],
    scenarioPrompts: [
      {
        id: 'ticket-s1',
        title: 'Escalation note under pressure',
        prompt: 'Write one clear note after a classroom incident without unnecessary detail or oversharing.'
      }
    ],
    practicalOutputs: [
      {
        id: 'ticket-p1',
        title: 'Excellent escalation note',
        description: 'Draft one model-quality ticket or escalation note Josh can use as a reference pattern.'
      }
    ]
  }
];

function buildSections(
  prefix: string,
  items: Array<{
    title: string;
    bodyMarkdown: string;
    takeaway?: string;
  }>
): Section[] {
  return items.map((item, index) => ({
    id: `${prefix}-${index + 1}`,
    ...item
  }));
}

function buildFlashcards(prefix: string, items: Array<[front: string, back: string]>): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `${prefix}-f${index + 1}`,
    front,
    back
  }));
}

function buildScenarioPrompts(
  prefix: string,
  items: Array<{
    title: string;
    prompt: string;
  }>
): ScenarioPrompt[] {
  return items.map((item, index) => ({
    id: `${prefix}-s${index + 1}`,
    ...item
  }));
}

function buildPracticalOutputs(
  prefix: string,
  items: Array<{
    title: string;
    description: string;
  }>
): PracticalOutput[] {
  return items.map((item, index) => ({
    id: `${prefix}-p${index + 1}`,
    ...item
  }));
}

function mergeUniqueStrings(base: string[], extras: string[] = []) {
  return Array.from(new Set([...base, ...extras]));
}

function buildDefaultPattern(module: LegacyTrainingModule): ModulePattern {
  return {
    diagnosticQuestions: module.quiz.slice(0, 2).map((question, index) => ({
      id: `${module.id}-diagnostic-${index + 1}`,
      prompt: question.prompt,
      expectedFocus: question.modelAnswer
    })),
    explainBackPrompt: {
      id: `${module.id}-explain-back`,
      title: 'Explain it simply',
      prompt: `Explain ${module.title} in plain English as if you were helping a new Level 1 support worker.`,
      supportText: 'Keep it simple, practical, and tied to safe DCS support behaviour.'
    },
    cornellPrompt: {
      id: `${module.id}-cornell`,
      title: 'Cornell reflection',
      prompt: `Write cue questions, summary notes, and one next-action line for ${module.title}.`,
      supportText: 'Keep the notes short enough that you could revise them during a quiet support window.'
    },
    conceptSortExercise: {
      id: `${module.id}-concept-sort`,
      title: 'Support judgement sort',
      prompt: `Sort these common support considerations into the bucket that best fits ${module.title}.`,
      cards: [
        'Visible user symptom',
        'Safe Level 1 check',
        'Escalation trigger or owner boundary',
        'Privacy or data-handling concern',
        'Useful note detail',
        'Possible self-service article angle'
      ],
      buckets: [
        { id: 'symptom', label: 'Symptom or clue' },
        { id: 'action', label: 'Safe first-line action' },
        { id: 'boundary', label: 'Boundary or escalation' }
      ],
      modelGroups: [
        'Symptom and clue items should sound like what the user sees or reports.',
        'Safe first-line actions should stay reversible and appropriate for Level 1.',
        'Boundary items should mention privacy, approvals, ownership, or escalation thresholds.'
      ]
    },
    memoryPrompt: {
      id: `${module.id}-memory`,
      title: 'Memory sheet prompt',
      prompt: `Create a one-minute memory sheet for ${module.title}: three signals, three safe checks, and one escalation trigger.`,
      mnemonicHint: module.tags.slice(0, 3).join(' / ')
    },
    sq3rPrompt: {
      id: `${module.id}-sq3r`,
      title: 'SQ3R companion',
      prompt: `Survey, question, read, recite, and review one internal DCS-safe resource related to ${module.title}.`,
      supportText: 'Convert the reading into safe prompts and summaries instead of copying internal content.'
    },
    safePromptWorkflow: {
      id: `${module.id}-safe-prompt`,
      title: 'Turn internal knowledge into safe prompts',
      goal: `Convert DCS workflow knowledge about ${module.title} into study prompts without copying private material.`,
      steps: [
        'Identify the workflow or support pattern, not the private case details.',
        'Abstract the safe symptom, decision point, and escalation boundary.',
        'Write a question, flashcard, or scenario prompt using generic language.',
        'Remove names, access keys, credentials, private notes, and copied internal text.',
        'Check that the result teaches judgement rather than exposing system detail.'
      ],
      examplePrompt: `Create three privacy-safe retrieval questions about ${module.title} that focus on symptoms, safe first actions, and escalation boundaries.`,
      privacyReminder:
        'Keep the workflow, remove the confidential specifics. Do not paste live parent, student, staff, credential, or internal system data.'
    }
  };
}

type ModuleEnhancement = {
  description?: string;
  estimatedMinutes?: number;
  addTags?: string[];
  addLearningObjectives?: string[];
  addDcsRelevance?: string[];
  addSections?: Section[];
  addFlashcards?: Flashcard[];
  addQuiz?: AssessmentQuestion[];
  addScenarioPrompts?: ScenarioPrompt[];
  addPracticalOutputs?: PracticalOutput[];
};

function enhanceModule(module: LegacyTrainingModule, enhancement?: ModuleEnhancement): TrainingModule {
  return {
    ...module,
    description: enhancement?.description ?? module.description,
    estimatedMinutes: enhancement?.estimatedMinutes ?? module.estimatedMinutes,
    tags: mergeUniqueStrings(module.tags, enhancement?.addTags),
    learningObjectives: mergeUniqueStrings(module.learningObjectives, enhancement?.addLearningObjectives),
    dcsRelevance: mergeUniqueStrings(module.dcsRelevance, enhancement?.addDcsRelevance),
    sections: [...module.sections, ...(enhancement?.addSections ?? [])],
    flashcards: [...module.flashcards, ...(enhancement?.addFlashcards ?? [])],
    quiz: [...module.quiz, ...(enhancement?.addQuiz ?? [])],
    scenarioPrompts: [...module.scenarioPrompts, ...(enhancement?.addScenarioPrompts ?? [])],
    practicalOutputs: [...module.practicalOutputs, ...(enhancement?.addPracticalOutputs ?? [])],
    modulePattern: buildDefaultPattern({
      ...module,
      description: enhancement?.description ?? module.description,
      estimatedMinutes: enhancement?.estimatedMinutes ?? module.estimatedMinutes,
      tags: mergeUniqueStrings(module.tags, enhancement?.addTags),
      learningObjectives: mergeUniqueStrings(module.learningObjectives, enhancement?.addLearningObjectives),
      dcsRelevance: mergeUniqueStrings(module.dcsRelevance, enhancement?.addDcsRelevance),
      sections: [...module.sections, ...(enhancement?.addSections ?? [])],
      flashcards: [...module.flashcards, ...(enhancement?.addFlashcards ?? [])],
      quiz: [...module.quiz, ...(enhancement?.addQuiz ?? [])],
      scenarioPrompts: [...module.scenarioPrompts, ...(enhancement?.addScenarioPrompts ?? [])],
      practicalOutputs: [...module.practicalOutputs, ...(enhancement?.addPracticalOutputs ?? [])]
    })
  };
}

function createModule(module: LegacyTrainingModule): TrainingModule {
  return {
    ...module,
    modulePattern: buildDefaultPattern(module)
  };
}

const moduleEnhancements: Partial<Record<LegacyTrainingModule['id'], ModuleEnhancement>> = {
  'dcs-it-support-foundations': {
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
  },
  'dns-dhcp-gateway-ip-basics': {
    estimatedMinutes: 24,
    addTags: ['SSID', 'BYOD', 'forget rejoin', 'cross-device comparison'],
    addSections: buildSections('dns-deepen', [
      {
        title: 'Wi-Fi onboarding before deeper theory',
        bodyMarkdown:
          'Many classroom and BYOD complaints still come down to the wrong SSID, poor signal, or a stale saved profile. Confirm the network name, check whether another device works nearby, and use forget-and-rejoin only after you have captured the symptom clearly.',
        takeaway: 'Confirm the network context before treating the issue like deeper infrastructure.'
      },
      {
        title: 'Cross-device comparison beats guesswork',
        bodyMarkdown:
          'If one nearby device joins and reaches resources while another cannot, the note changes from "internet down" to a device, profile, or onboarding path issue. That comparison often saves time and prevents noisy room-outage escalations.',
        takeaway: 'A known-good comparison is one of the safest high-value checks.'
      }
    ]),
    addFlashcards: buildFlashcards('dns-deepen', [
      ['Why confirm the SSID first?', 'Because the wrong network can mimic deeper internet or access faults.'],
      ['When is forget-and-rejoin appropriate?', 'After you have captured the symptom and confirmed the device should be on that network.'],
      ['What does a working nearby device help prove?', 'That the problem may be device-specific, profile-specific, or signal-specific rather than a whole-room outage.'],
      ['Why mention signal or distance in a note?', 'Because weak signal can explain intermittent joins, slow authentication, or unstable browsing.']
    ]),
    addQuiz: [
      mcq({
        id: 'dns-q5',
        prompt: 'A BYOD laptop cannot reach class sites, but a nearby staff laptop works on the expected SSID. What is the best first conclusion?',
        domain: 'DNS, DHCP, and gateway basics',
        difficulty: 'stretch',
        explanation: 'Cross-device comparison narrows scope safely.',
        modelAnswer:
          'The issue is more likely device, onboarding, profile, or signal specific than a room-wide outage. Josh should keep the note narrow and continue safe first-line checks.',
        commonMistakes: ['Escalating the whole room immediately', 'Ignoring the known-good comparison'],
        dcsContext: 'BYOD and managed devices do not always fail for the same reasons.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        options: [
          { id: 'a', label: 'The school internet is definitely down' },
          { id: 'b', label: 'The issue may be device, profile, or onboarding specific' },
          { id: 'c', label: 'The gateway must be deleted' },
          { id: 'd', label: 'Every nearby device should forget the network immediately' }
        ],
        correctOptionId: 'b'
      }),
      scenarioResponse({
        id: 'dns-q6',
        prompt: 'A student iPad keeps joining the wrong saved network. Explain the safer first-line response and the note Josh should capture.',
        domain: 'DNS, DHCP, and gateway basics',
        difficulty: 'challenge',
        explanation: 'SSID mistakes should be named before deeper network assumptions are made.',
        modelAnswer:
          'Confirm the expected SSID, note whether other devices in the same area connect successfully, and if appropriate have the user forget the wrong network and join the correct one. Capture the device type, SSID confusion, area, and result.',
        commonMistakes: ['Calling it a total outage', 'Skipping the exact network-name issue in the note'],
        dcsContext: 'Managed and BYOD devices often surface as onboarding issues first.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        rubric: ['Names SSID issue clearly', 'Uses safe comparison', 'Captures useful evidence']
      })
    ],
    addScenarioPrompts: buildScenarioPrompts('dns-deepen', [
      {
        title: 'Wrong SSID versus real outage',
        prompt: 'Write the difference between a profile mistake, weak signal, and a wider room outage.'
      }
    ])
  },
  'printer-troubleshooting': {
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
  },
  'classroom-display-viewboard-troubleshooting': {
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
  },
  'm365-identity-offboarding-basics': {
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
        commonMistakes: ['Jumping straight to mailbox cleanup guesses', 'Skipping the current visible state'],
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
        dcsContext: 'The note should widen the right personâ€™s awareness without widening Joshâ€™s authority.',
        reviewSchedule,
        recommendedModuleId: 'm365-identity-offboarding-basics',
        weakTopic: 'offboarding-sequence',
        rubric: ['Names downstream systems', 'Connects to risk or sequence', 'Keeps authority boundaries clear'],
        keywordHints: ['shared mailbox', 'MFA', 'managed mobile', 'sequence']
      })
    ]
  },
  'mdm-intune-group-policy-concepts': {
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
  },
  'vlans-network-segmentation': {
    estimatedMinutes: 22,
    addTags: ['allow-block rules', 'guest internet only', 'source destination'],
    addSections: buildSections('vlan-deepen', [
      {
        title: 'Write source-to-destination rules in plain English',
        bodyMarkdown:
          'Segmentation becomes more useful when Josh can say "guest Wi-Fi can reach the internet but not internal printers" or "staff devices can reach the staff printer VLAN but not student management interfaces". This is still support language, not permission to edit the rule.',
        takeaway: 'Plain-English allow and block rules sharpen escalation quality.'
      },
      {
        title: 'Guest internet-only is a design, not a failure',
        bodyMarkdown:
          'A guest network may work perfectly while still blocking TVs, printers, and internal dashboards. The correct question is whether the requested path is meant to exist, not whether the guest internet works.',
        takeaway: 'Internet access and internal-service access should be described separately.'
      }
    ]),
    addFlashcards: buildFlashcards('vlan-deepen', [
      ['What does a plain-English rule sound like?', 'Source network A may or may not reach destination service B, and here is why.'],
      ['Why is guest internet-only a valid design?', 'It lets guests browse while protecting internal school services.'],
      ['What should Josh capture when a path seems blocked?', 'Source network, destination service, business need, urgency, and whether the block may be intentional.'],
      ['What is a weak segmentation note?', 'One that says "internet works so the printer should too".']
    ]),
    addQuiz: [
      shortAnswer({
        id: 'vlan-q5',
        prompt: 'Write one plain-English allow/block rule for a guest internet-only design in a school.',
        domain: 'VLAN and segmentation',
        difficulty: 'challenge',
        explanation: 'The skill is translating business need into readable rule language.',
        modelAnswer:
          'Example: guest Wi-Fi devices may reach the public internet but must not reach internal printers, TVs, staff file shares, or admin systems unless a separate approved path is provided.',
        commonMistakes: ['Writing vague language like "guest should be limited"', 'Forgetting the source or destination'],
        dcsContext: 'Readable rule language helps senior ICT assess the request faster.',
        reviewSchedule,
        recommendedModuleId: 'vlans-network-segmentation',
        weakTopic: 'vlan-firewall-rules',
        rubric: ['Names source and destination', 'States allow or block clearly', 'Reflects school design intent'],
        keywordHints: ['guest', 'internet', 'internal', 'allow', 'block']
      }),
      categorization({
        id: 'vlan-q6',
        prompt: 'Sort each traffic example into the best bucket.',
        domain: 'VLAN and segmentation',
        difficulty: 'stretch',
        explanation: 'Traffic path thinking gets clearer when it is sorted explicitly.',
        modelAnswer:
          'Guest internet browsing is an intended guest path, guest-to-internal-device requests are protected internal paths, and escalation requests sit in the approved-change bucket.',
        commonMistakes: ['Treating all traffic as equivalent because it uses Wi-Fi', 'Ignoring design intent'],
        dcsContext: 'This keeps classroom event requests from being logged like random break/fix faults.',
        reviewSchedule,
        recommendedModuleId: 'vlans-network-segmentation',
        weakTopic: 'vlan-firewall-rules',
        categories: [
          { id: 'allowed', label: 'Usually allowed path' },
          { id: 'blocked', label: 'Usually blocked by design' },
          { id: 'request', label: 'Needs approved access request' }
        ],
        items: [
          { id: 'guest-web', label: 'Guest device browsing the public web', correctCategoryId: 'allowed' },
          { id: 'guest-printer', label: 'Guest device trying to reach internal staff printer', correctCategoryId: 'blocked' },
          { id: 'event-tv', label: 'Event guest device needs temporary display path to internal TV', correctCategoryId: 'request' },
          { id: 'staff-printer', label: 'Staff device sending to authorised internal printer', correctCategoryId: 'allowed' }
        ],
        rubric: ['Sorts path types accurately', 'Recognises design intent', 'Distinguishes request from fault']
      })
    ]
  },
  'cloud-models-saas-paas-iaas-daas': {
    estimatedMinutes: 20,
    addTags: ['DaaS', 'BYOD', 'hosted desktop', 'trade-offs'],
    addSections: buildSections('cloud-deepen', [
      {
        title: 'Where DaaS becomes practical in schools',
        bodyMarkdown:
          'DaaS thinking matters when users need a Windows-only or school-managed application from BYOD or mixed devices. Instead of giving every personal device direct local install complexity, a hosted desktop can centralise the app environment.',
        takeaway: 'DaaS is often about access design and supportability, not just cloud vocabulary.'
      },
      {
        title: 'Hosted desktop versus local install trade-offs',
        bodyMarkdown:
          'Local install plus VPN may feel simple until device diversity, support time, and data handling become messy. A hosted desktop can improve control and consistency, but it also depends on connectivity and a good user experience path.',
        takeaway: 'Cloud-model choices are support trade-offs, not one-word labels.'
      }
    ]),
    addFlashcards: buildFlashcards('cloud-deepen', [
      ['When might DaaS be attractive in a school?', 'When BYOD or mixed devices need controlled access to a desktop-style app environment.'],
      ['What is one benefit of hosted desktop over many local installs?', 'Consistency and centralised support.'],
      ['What is one cost of hosted desktop?', 'It relies heavily on connectivity and the user session path.'],
      ['Why compare hosted desktop with VPN plus local install?', 'Because the trade-off is about control, supportability, and user experience.']
    ]),
    addQuiz: [
      mcq({
        id: 'cloud-q5',
        prompt: 'Which option best fits a school that needs BYOD users to access a Windows-only app without managing many local installs?',
        domain: 'Cloud models',
        difficulty: 'stretch',
        explanation: 'DaaS becomes relevant when the desktop experience itself is the service.',
        modelAnswer:
          'A hosted desktop or DaaS-style approach may fit best because it centralises the application environment instead of depending on many local installations.',
        commonMistakes: ['Treating every app decision as SaaS by default', 'Ignoring the desktop-session layer'],
        dcsContext: 'The goal is access design that stays supportable for mixed devices.',
        reviewSchedule,
        recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
        weakTopic: 'cloud-models',
        options: [
          { id: 'a', label: 'DaaS or hosted desktop approach' },
          { id: 'b', label: 'Assume every BYOD device should install it locally' },
          { id: 'c', label: 'Guest Wi-Fi segmentation only' },
          { id: 'd', label: 'Delete the browser cache' }
        ],
        correctOptionId: 'a'
      }),
      scenarioResponse({
        id: 'cloud-q6',
        prompt: 'Explain the trade-off between VPN plus local install and a hosted desktop for a school-only application.',
        domain: 'Cloud models',
        difficulty: 'challenge',
        explanation: 'This is an architecture judgement question, not a terminology quiz.',
        modelAnswer:
          'VPN plus local install can reduce session dependency but increases variation across devices, local support effort, and data-handling complexity. A hosted desktop centralises control and consistency, but depends on stable connectivity and a usable remote session experience.',
        commonMistakes: ['Calling one option universally best', 'Ignoring support and device-diversity trade-offs'],
        dcsContext: 'The right answer depends on supportability as much as on technology preference.',
        reviewSchedule,
        recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
        weakTopic: 'cloud-models',
        rubric: ['Mentions both benefits and costs', 'Frames the decision as a trade-off', 'Uses school support context']
      })
    ]
  }
};

const additionalModules: TrainingModule[] = [
  createModule({
    id: 'parent-portal-registration',
    title: 'Parent Portal Registration',
    description:
      'Handle first-line Parent Portal registration issues safely: access keys, common blockers, ownership boundaries, and parent-facing communication.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 22,
    tags: ['Parent Portal', 'access key', 'registration', 'parent-facing notes'],
    learningObjectives: [
      'Separate registration blockers from account-data issues.',
      'Recognise where ICT triage ends and admin or system-owner workflow begins.',
      'Write parent-facing notes that are clear, calm, and privacy-safe.'
    ],
    dcsRelevance: [
      'Parent Portal registration is a high-frequency parent support theme.',
      'Good triage avoids bouncing families between ICT and admin without evidence.'
    ],
    sections: buildSections('parent-portal-registration', [
      {
        title: 'Start with the registration path, not assumptions',
        bodyMarkdown:
          'Confirm what the parent is trying to do: first registration, re-registration, or recovering after an old attempt. Access-key problems, email mismatches, expired expectations, and already-used registrations each need slightly different notes.',
        takeaway: 'Name the exact stage of registration before troubleshooting.'
      },
      {
        title: 'Common blockers and what Level 1 should capture',
        bodyMarkdown:
          'Capture whether the parent has the access key, whether the expected email address matches the school record, what message appears, and whether the issue affects one family only. Avoid requesting unnecessary private detail inside the PD app.',
        takeaway: 'Access key, email match, error wording, and scope are the most useful first-line clues.'
      },
      {
        title: 'Ownership boundaries and parent-facing language',
        bodyMarkdown:
          'ICT can triage the symptom and check the obvious workflow stage, but family-data corrections or workflow-owner actions may belong to admin or the authorised system owner. Parent-facing wording should explain the next step without blaming the family or overpromising timeline.',
        takeaway: 'Clear handoff language is part of the fix.'
      }
    ]),
    flashcards: buildFlashcards('parent-portal-registration', [
      ['What is the first thing to clarify in a Parent Portal issue?', 'Whether the parent is registering for the first time, retrying, or recovering an older setup attempt.'],
      ['Which two clues are especially useful in registration triage?', 'Access-key status and whether the expected email matches the school record.'],
      ['Why should Josh avoid broad family-data discussion in this app?', 'Because the app is for PD and should stay privacy-safe.'],
      ['What kind of wording helps a parent-facing handoff?', 'Calm explanation of the next step, owner, and what information is already captured.'],
      ['When might admin ownership matter in portal registration?', 'When family records, relationship details, or official contact data need correction.'],
      ['What makes a weak portal note?', 'Saying only "Parent Portal not working" with no stage, message, or blocker detail.'],
      ['Why does scope still matter in a portal issue?', 'It helps distinguish one-family data mismatch from a broader workflow or service pattern.'],
      ['What should Josh capture instead of copied screenshots with private detail?', 'The generic error wording, stage of the process, and the safe next action.']
    ]),
    quiz: [
      mcq({
        id: 'parent-portal-registration-q1',
        prompt: 'Which detail is most important to capture first in a Parent Portal registration complaint?',
        domain: 'Parent Portal registration',
        difficulty: 'foundation',
        explanation: 'The stage of the workflow shapes the next question.',
        modelAnswer:
          'Clarify whether this is first registration, a retry, or recovery from an earlier setup attempt before guessing at the cause.',
        commonMistakes: ['Jumping straight to system blame', 'Skipping the workflow stage'],
        dcsContext: 'Families often describe several different portal states as simply "it does not work".',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'parent-portal-workflows',
        options: [
          { id: 'a', label: 'The exact registration stage and current blocker' },
          { id: 'b', label: 'The family should just try a different browser first' },
          { id: 'c', label: 'Immediately regenerate everything without context' },
          { id: 'd', label: 'Assume ICT owns every family-data correction' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'parent-portal-registration-q2',
        prompt: 'What should a privacy-safe Parent Portal registration note include?',
        domain: 'Parent Portal registration',
        difficulty: 'stretch',
        explanation: 'The note should preserve workflow clues without oversharing.',
        modelAnswer:
          'Include the registration stage, whether the access key is present, whether the expected email appears to match, the generic error or blocker, steps already tried, and the next owner or handoff point.',
        commonMistakes: ['Copying excessive family detail', 'Leaving out the workflow stage'],
        dcsContext: 'Parent-facing support still needs clean operational notes behind it.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'parent-portal-workflows',
        rubric: ['Names stage and blocker', 'Stays privacy-safe', 'Shows next owner or action'],
        keywordHints: ['access key', 'email match', 'error', 'handoff']
      }),
      orderSteps({
        id: 'parent-portal-registration-q3',
        prompt: 'Order the safer first-line response to a Parent Portal registration issue.',
        domain: 'Parent Portal registration',
        difficulty: 'stretch',
        explanation: 'Triage should clarify the workflow before routing the issue.',
        modelAnswer:
          'Clarify the stage, capture the key blocker and message, check whether the issue looks like access-key flow or family-data mismatch, then hand off to the right owner with a clean note.',
        commonMistakes: ['Regenerating or escalating before the stage is clear', 'Ignoring ownership boundaries'],
        dcsContext: 'Families benefit when the first note already points to the right owner.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'parent-portal-workflows',
        steps: [
          { id: 'stage', label: 'Clarify whether this is first registration or a retry' },
          { id: 'blocker', label: 'Capture the access-key, email, and error clues' },
          { id: 'owner', label: 'Work out whether the issue looks like workflow or record ownership' },
          { id: 'handoff', label: 'Send a clean parent-safe handoff note' }
        ],
        correctOrder: ['stage', 'blocker', 'owner', 'handoff'],
        rubric: ['Clarifies stage first', 'Captures actionable clues', 'Routes cleanly']
      }),
      scenarioResponse({
        id: 'parent-portal-registration-q4',
        prompt: 'A parent says the access key is not working and they are frustrated. Explain the response Josh should give and the note he should record.',
        domain: 'Parent Portal registration',
        difficulty: 'challenge',
        explanation: 'Parent-facing calm and workflow clarity matter together.',
        modelAnswer:
          'Acknowledge the frustration, confirm whether this is first registration or a retry, capture the generic message shown, note whether the expected email and key path look correct, and explain the next handoff or check without blaming the parent. Record the workflow stage, blocker, and safe next owner.',
        commonMistakes: ['Responding defensively', 'Skipping the note because it feels like admin territory'],
        dcsContext: 'The first-line note still improves turnaround even when another owner completes the fix.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-registration',
        weakTopic: 'parent-portal-workflows',
        rubric: ['Uses calm parent-facing language', 'Captures the key blocker', 'Routes safely']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('parent-portal-registration', [
      {
        title: 'Access-key blocker',
        prompt: 'Write a short parent-safe escalation note for a registration attempt that appears blocked at the access-key stage.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('parent-portal-registration', [
      {
        title: 'Parent Portal registration quick guide',
        description: 'Draft a first-line checklist and parent-facing note pattern for registration issues.'
      }
    ])
  }),
  createModule({
    id: 'parent-portal-details-updates',
    title: 'Parent Portal Details Updates',
    description:
      'Triage family-detail update requests, urgent exceptions, and admin handoff boundaries without treating private records casually.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 18,
    tags: ['Parent Portal', 'family updates', 'admin handoff', 'urgent exceptions'],
    learningObjectives: [
      'Separate portal-access issues from family-record change requests.',
      'Recognise urgent exceptions that need careful escalation.',
      'Use privacy-safe wording around family amendments.'
    ],
    dcsRelevance: [
      'Family-detail updates are common and often sensitive.',
      'Good first-line handling reduces confusion and protects privacy.'
    ],
    sections: buildSections('parent-portal-details-updates', [
      {
        title: 'This is a records workflow first',
        bodyMarkdown:
          'Family-detail amendments often belong to an authorised records workflow rather than a pure technical fix. Start by clarifying what category of detail needs updating and whether the parent can already access the portal.',
        takeaway: 'Do not confuse access success with permission to change records directly.'
      },
      {
        title: 'Urgent exceptions need careful wording',
        bodyMarkdown:
          'Medical, emergency-contact, or custody-style changes can carry real urgency. Josh should not investigate private detail in the PD app, but he should recognise when the request needs quick handoff and carefully worded escalation.',
        takeaway: 'Urgency can be high even when the first-line action is still only triage and handoff.'
      },
      {
        title: 'Admin handoff beats vague bouncing',
        bodyMarkdown:
          'A strong note captures the requested amendment type, urgency, portal status, and who needs to continue the workflow. Parents should not be bounced between ICT and admin with no clear owner.',
        takeaway: 'Good handoff language lowers stress for families and staff.'
      }
    ]),
    flashcards: buildFlashcards('parent-portal-details-updates', [
      ['What question helps separate access from records workflow?', 'Can the parent access the portal already, or is the issue specifically the detail-change process?'],
      ['Why are some detail changes urgent?', 'Because medical, emergency, or custody-related information can affect student safety or compliance.'],
      ['What should a safe note capture instead of private detail?', 'The category of change, urgency, and next owner.'],
      ['What is a weak response to a family update request?', 'Bouncing it onward with no workflow context or urgency note.'],
      ['Why might admin ownership matter more than ICT ownership here?', 'Because the authoritative family record may sit in an administrative workflow.'],
      ['How should Josh handle emergency-style changes in the PD app?', 'Use generic language and keep live private detail out of the app.'],
      ['What is the key difference between registration and detail updates?', 'Registration is access workflow; detail updates are often records workflow.'],
      ['What should parent-facing wording sound like?', 'Clear, calm, and explicit about the next owner or step.']
    ]),
    quiz: [
      mcq({
        id: 'parent-portal-details-updates-q1',
        prompt: 'A parent can sign in but says their family detail change has not taken effect. What is the best first judgement?',
        domain: 'Parent Portal details updates',
        difficulty: 'foundation',
        explanation: 'Portal access and records workflow are different questions.',
        modelAnswer:
          'Treat it as a family-record or workflow update question first, not a simple login failure, and capture the amendment category and urgency.',
        commonMistakes: ['Resetting the problem back to login only', 'Skipping the amendment category'],
        dcsContext: 'Being able to sign in does not mean the records workflow is complete.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'parent-portal-workflows',
        options: [
          { id: 'a', label: 'It is primarily a records or workflow update issue' },
          { id: 'b', label: 'The parent must be using the wrong password' },
          { id: 'c', label: 'Delete the portal account immediately' },
          { id: 'd', label: 'Ignore urgency because they can still log in' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'parent-portal-details-updates-q2',
        prompt: 'What should Josh include in a privacy-safe note for an urgent family detail amendment request?',
        domain: 'Parent Portal details updates',
        difficulty: 'stretch',
        explanation: 'The note should preserve urgency without reproducing private records.',
        modelAnswer:
          'Capture the category of change, why it is urgent, whether the parent can access the portal, what the current blocker is, and the authorised owner or handoff path. Keep the actual private details out of the PD app.',
        commonMistakes: ['Pasting the private detail itself', 'Omitting the urgency reason'],
        dcsContext: 'The note should help the right person act without oversharing.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'parent-portal-workflows',
        rubric: ['Names category and urgency', 'Stays privacy-safe', 'Shows the handoff path'],
        keywordHints: ['category', 'urgent', 'portal access', 'owner']
      }),
      categorization({
        id: 'parent-portal-details-updates-q3',
        prompt: 'Sort each request by the best primary handling path.',
        domain: 'Parent Portal details updates',
        difficulty: 'challenge',
        explanation: 'Not every parent issue belongs to the same queue.',
        modelAnswer:
          'Login or registration blockers need portal triage, record amendments need the admin workflow, and urgent safety-sensitive changes need fast authorised handoff.',
        commonMistakes: ['Treating every request as technical only', 'Ignoring urgent exception handling'],
        dcsContext: 'This is where school workflow knowledge matters more than generic IT theory.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'parent-portal-workflows',
        categories: [
          { id: 'portal', label: 'Portal triage' },
          { id: 'records', label: 'Admin records workflow' },
          { id: 'urgent', label: 'Urgent authorised handoff' }
        ],
        items: [
          { id: 'reg', label: 'Parent cannot finish first registration', correctCategoryId: 'portal' },
          { id: 'custody', label: 'Sensitive family/custody-style change needs review', correctCategoryId: 'urgent' },
          { id: 'address', label: 'Routine contact-detail amendment request', correctCategoryId: 'records' },
          { id: 'med', label: 'Medical-contact update flagged as urgent', correctCategoryId: 'urgent' }
        ],
        rubric: ['Recognises handling paths', 'Distinguishes urgent cases', 'Keeps workflow ownership clear']
      }),
      scenarioResponse({
        id: 'parent-portal-details-updates-q4',
        prompt: 'A parent says a medical-related detail change is urgent and not visible yet. Explain Joshâ€™s first-line response.',
        domain: 'Parent Portal details updates',
        difficulty: 'challenge',
        explanation: 'Urgency and privacy should both shape the response.',
        modelAnswer:
          'Acknowledge the urgency, confirm the broad category of the update and whether portal access is working, avoid collecting unnecessary private detail in the PD app, and hand off quickly through the authorised workflow with a calm, explicit note about urgency.',
        commonMistakes: ['Treating it like a normal low-priority portal issue', 'Collecting more detail than needed in the wrong place'],
        dcsContext: 'Family trust depends on both speed and discipline.',
        reviewSchedule,
        recommendedModuleId: 'parent-portal-details-updates',
        weakTopic: 'parent-portal-workflows',
        rubric: ['Acknowledges urgency', 'Protects privacy', 'Names the handoff clearly']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('parent-portal-details-updates', [
      {
        title: 'Urgent family amendment',
        prompt: 'Write a short note that records urgency, category, and owner without exposing private details.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('parent-portal-details-updates', [
      {
        title: 'Family amendment handoff template',
        description: 'Create a first-line handoff pattern for routine versus urgent Parent Portal detail-update requests.'
      }
    ])
  }),
  createModule({
    id: 'sentral-support',
    title: 'Sentral Support',
    description:
      'Triage first-line Sentral issues around markbook visibility, parent access keys, reporting periods, and safe escalation boundaries.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 22,
    tags: ['Sentral', 'markbook', 'access keys', 'reporting periods'],
    learningObjectives: [
      'Separate visibility, permissions, workflow timing, and user-expectation issues.',
      'Recognise reporting-period pressure and safe escalation points.',
      'Write notes that help the authorised Sentral owner act quickly.'
    ],
    dcsRelevance: [
      'Sentral questions can spike around reporting periods and parent-access needs.',
      'Good triage avoids guessing at configuration or permissions.'
    ],
    sections: buildSections('sentral-support', [
      {
        title: 'Ask what is missing, not just what is broken',
        bodyMarkdown:
          'A markbook issue may be missing visibility, wrong class context, reporting-period timing, or a real permission problem. A parent-access-key issue is a different workflow again. Start with the exact function that is missing.',
        takeaway: 'Sentral issues split into distinct workflow buckets very quickly.'
      },
      {
        title: 'Reporting-period pressure changes urgency',
        bodyMarkdown:
          'When reports or marks are due, a small visibility issue can have high staff impact. Level 1 should capture timing, who is affected, and whether the issue is one user, one class, or something wider before escalating.',
        takeaway: 'Timing and scope often matter as much as the specific symptom.'
      },
      {
        title: 'Safe escalation beats fake admin confidence',
        bodyMarkdown:
          'Josh should not pretend full Sentral admin authority. The goal is to identify the function, scope, and timing clearly enough that the authorised owner can act without extra back-and-forth.',
        takeaway: 'Clean Sentral notes protect speed and trust.'
      }
    ]),
    flashcards: buildFlashcards('sentral-support', [
      ['What is the first split in Sentral triage?', 'Work out whether the issue is markbook visibility, parent-access workflow, reporting timing, or another specific function.'],
      ['Why does reporting period context matter?', 'Because a small issue can block time-sensitive staff work.'],
      ['What should a good Sentral note capture?', 'Function affected, user role, class or scope, timing, and steps already tried.'],
      ['Why should Josh avoid acting like a Sentral admin?', 'Because false authority creates risk and weaker escalation.'],
      ['What is a weak Sentral complaint note?', 'One that says only "Sentral not working".'],
      ['How can scope change the handoff?', 'One class or one user suggests a different path from a wider reporting-period issue.'],
      ['What makes parent-access-key issues distinct?', 'They are a separate workflow from classroom markbook visibility.'],
      ['What question helps with staff complaints?', 'What exact screen, class, or reporting task is missing or blocked?']
    ]),
    quiz: [
      mcq({
        id: 'sentral-support-q1',
        prompt: 'A teacher says they cannot see the markbook they need. What is the best first clarification?',
        domain: 'Sentral support',
        difficulty: 'foundation',
        explanation: 'Specific function and scope come before assumptions.',
        modelAnswer:
          'Clarify which class, screen, or reporting task is affected and whether the issue is only for this user or a wider cohort.',
        commonMistakes: ['Calling it a general outage immediately', 'Skipping the exact function that is missing'],
        dcsContext: 'Markbook complaints often need context more than instant system changes.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'sentral-support',
        options: [
          { id: 'a', label: 'Which class or reporting function is missing, and who else is affected?' },
          { id: 'b', label: 'Delete the user and recreate them straight away' },
          { id: 'c', label: 'Assume the whole system is down school-wide' },
          { id: 'd', label: 'Ignore timing even if reports are due today' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'sentral-support-q2',
        prompt: 'What should Josh capture in a Sentral note during reporting season?',
        domain: 'Sentral support',
        difficulty: 'stretch',
        explanation: 'Timing and impact are part of the support picture.',
        modelAnswer:
          'Record the exact function or screen affected, user role, class or cohort scope, reporting deadline or urgency, safe steps tried, and whether the issue seems isolated or broader.',
        commonMistakes: ['Leaving out timing', 'Failing to mention the class or scope'],
        dcsContext: 'Reporting-season pressure can turn a narrow issue into an urgent one quickly.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'sentral-support',
        rubric: ['Names function and scope', 'Captures timing or urgency', 'Shows safe steps tried'],
        keywordHints: ['class', 'function', 'deadline', 'scope']
      }),
      categorization({
        id: 'sentral-support-q3',
        prompt: 'Sort each Sentral issue by the most likely workflow bucket.',
        domain: 'Sentral support',
        difficulty: 'challenge',
        explanation: 'Different Sentral issues need different owners and questions.',
        modelAnswer:
          'Markbook visibility, parent access-key workflow, and reporting-period pressure are different support paths even if users describe them all as "Sentral".',
        commonMistakes: ['Using the same triage for every Sentral ticket', 'Ignoring parent and staff workflow differences'],
        dcsContext: 'Workflow naming makes the next action clearer for DCS support.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'sentral-support',
        categories: [
          { id: 'markbook', label: 'Markbook or class visibility' },
          { id: 'parent', label: 'Parent access-key workflow' },
          { id: 'reporting', label: 'Reporting-period urgency' }
        ],
        items: [
          { id: 'class-view', label: 'Teacher cannot see one class markbook', correctCategoryId: 'markbook' },
          { id: 'parent-key', label: 'Family asks about Sentral access key', correctCategoryId: 'parent' },
          { id: 'due-today', label: 'Staff member blocked with reports due today', correctCategoryId: 'reporting' },
          { id: 'grade-screen', label: 'Specific grading screen missing during reporting week', correctCategoryId: 'reporting' }
        ],
        rubric: ['Separates workflow types', 'Recognises urgency context', 'Supports clean routing']
      }),
      scenarioResponse({
        id: 'sentral-support-q4',
        prompt: 'A teacher says marks are due today and one class is missing from their Sentral view. Explain Joshâ€™s first-line response.',
        domain: 'Sentral support',
        difficulty: 'challenge',
        explanation: 'This combines function, scope, and timing.',
        modelAnswer:
          'Clarify the exact class and screen, confirm whether other staff are affected, note the reporting deadline, document safe checks already tried, and escalate quickly with a clear note because the timing makes the impact high.',
        commonMistakes: ['Ignoring the time pressure', 'Logging it as a vague system complaint'],
        dcsContext: 'Reporting deadlines can raise the urgency without changing Joshâ€™s authority.',
        reviewSchedule,
        recommendedModuleId: 'sentral-support',
        weakTopic: 'sentral-support',
        rubric: ['Captures the exact function', 'Mentions the deadline', 'Escalates cleanly']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('sentral-support', [
      {
        title: 'Markbook visibility under deadline',
        prompt: 'Write the shortest useful note for a reporting-period Sentral issue.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('sentral-support', [
      {
        title: 'Sentral triage cheat sheet',
        description: 'Create a first-line guide that separates markbook, parent-access, and reporting-period support paths.'
      }
    ])
  }),
  createModule({
    id: 'ourdcs-schoolbox-support',
    title: 'OurDCS / Schoolbox Support',
    description:
      'Support class pages, staff workflow issues, and portal/LMS triage boundaries for OurDCS and Schoolbox-style requests.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 20,
    tags: ['OurDCS', 'Schoolbox', 'class pages', 'workflow triage'],
    learningObjectives: [
      'Clarify whether the issue is page visibility, content workflow, permissions, or publishing expectation.',
      'Separate staff workflow support from deeper portal administration.',
      'Write clear notes for class-page and LMS-style issues.'
    ],
    dcsRelevance: [
      'Portal and LMS workflow questions are part of daily staff support reality.',
      'Class-page issues often need better classification before they can be fixed.'
    ],
    sections: buildSections('ourdcs-schoolbox-support', [
      {
        title: 'Page, content, permission, or publishing issue?',
        bodyMarkdown:
          'Staff may say "OurDCS is broken" when the real issue is one class page, one attachment, one permission path, or a publishing step they expected to happen automatically. Start by naming the specific workflow.',
        takeaway: 'Portal and LMS issues become clearer as soon as the exact page or action is named.'
      },
      {
        title: 'Staff workflow support at Level 1',
        bodyMarkdown:
          'Level 1 can help classify the issue, confirm the exact class page or workflow, and capture what the staff member expected to happen. Deeper template, configuration, or admin-path changes still belong to the authorised owner.',
        takeaway: 'Expectation versus outcome is one of the best clues in portal support.'
      },
      {
        title: 'Triage boundaries for portals and LMS tools',
        bodyMarkdown:
          'Some issues are content or workflow coaching, some are permissions, and some are real system-owner tasks. Josh adds value by sorting them well and writing clear notes rather than overpromising portal admin action.',
        takeaway: 'Good routing starts with the exact staff workflow that failed.'
      }
    ]),
    flashcards: buildFlashcards('ourdcs-schoolbox-support', [
      ['What is a helpful first split in OurDCS or Schoolbox support?', 'Work out whether the issue is visibility, content workflow, permissions, or publishing expectation.'],
      ['Why capture the exact class page or resource?', 'Because one page issue is different from a wider portal problem.'],
      ['What question helps when staff say a page is broken?', 'What did you expect to happen, and what actually happened instead?'],
      ['What should Josh avoid promising?', 'Deep portal administration or template changes he does not own.'],
      ['Why is expectation versus outcome useful?', 'It clarifies whether the problem is workflow knowledge, permissions, or system behaviour.'],
      ['What makes a weak LMS note?', 'No page, no class, and no description of the missing action.'],
      ['How can one attachment issue mislead support?', 'It can sound like the whole portal is down when the problem is only one resource path.'],
      ['What is good first-line value here?', 'Classification, scope capture, and clean staff-facing communication.']
    ]),
    quiz: [
      mcq({
        id: 'ourdcs-schoolbox-support-q1',
        prompt: 'A teacher says their class page is broken. What is the best first question?',
        domain: 'OurDCS and Schoolbox support',
        difficulty: 'foundation',
        explanation: 'The exact page and expected action matter.',
        modelAnswer:
          'Ask which class page or resource is affected and what the teacher expected to happen versus what actually happened.',
        commonMistakes: ['Treating it like an immediate whole-portal outage', 'Skipping the expected action'],
        dcsContext: 'LMS-style complaints often hide a specific workflow issue under broad language.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'schoolbox-workflows',
        options: [
          { id: 'a', label: 'Which page or resource is affected, and what did you expect to happen?' },
          { id: 'b', label: 'Rebuild the entire class page immediately' },
          { id: 'c', label: 'Assume the portal is fully down for everyone' },
          { id: 'd', label: 'Ignore whether the issue is only one attachment' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'ourdcs-schoolbox-support-q2',
        prompt: 'What should a strong LMS or class-page note include?',
        domain: 'OurDCS and Schoolbox support',
        difficulty: 'stretch',
        explanation: 'Portal notes need workflow context, not just frustration.',
        modelAnswer:
          'Include the exact page or class, the action the staff member attempted, the expected outcome, the actual result, any visible message, scope, and whether the issue appears instructional, permission-based, or system-owner territory.',
        commonMistakes: ['Leaving out the expected outcome', 'Calling everything a permission issue too early'],
        dcsContext: 'A good note can turn a vague class-page complaint into a workable task.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'schoolbox-workflows',
        rubric: ['Names page and action', 'Captures expected vs actual', 'Frames likely workflow bucket'],
        keywordHints: ['page', 'action', 'expected', 'actual', 'scope']
      }),
      categorization({
        id: 'ourdcs-schoolbox-support-q3',
        prompt: 'Sort each request into the best primary bucket.',
        domain: 'OurDCS and Schoolbox support',
        difficulty: 'challenge',
        explanation: 'Workflow, permissions, and system-owner issues need different treatment.',
        modelAnswer:
          'Some issues are content workflow coaching, some are permission access questions, and some are deeper portal-owner tasks.',
        commonMistakes: ['Using "permissions" as a catch-all', 'Skipping workflow coaching as a real support task'],
        dcsContext: 'School platforms create both technical and workflow support demands.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'schoolbox-workflows',
        categories: [
          { id: 'workflow', label: 'Staff workflow or coaching' },
          { id: 'permissions', label: 'Access or visibility question' },
          { id: 'owner', label: 'Portal owner or deeper admin path' }
        ],
        items: [
          { id: 'publish', label: 'Teacher expected new content to appear automatically after editing', correctCategoryId: 'workflow' },
          { id: 'page-view', label: 'Teacher cannot see one class area they should use', correctCategoryId: 'permissions' },
          { id: 'template', label: 'Department wants template structure changed globally', correctCategoryId: 'owner' },
          { id: 'resource', label: 'One shared resource link on a page is missing', correctCategoryId: 'workflow' }
        ],
        rubric: ['Separates workflow from access', 'Recognises deeper owner tasks', 'Improves routing judgement']
      }),
      scenarioResponse({
        id: 'ourdcs-schoolbox-support-q4',
        prompt: 'A teacher says students cannot see the class page resources they uploaded. Explain Joshâ€™s first-line response.',
        domain: 'OurDCS and Schoolbox support',
        difficulty: 'challenge',
        explanation: 'This can be workflow, visibility, or permission related.',
        modelAnswer:
          'Clarify the exact class page and resource, confirm whether the issue affects all students or a subset, capture what the teacher expected after upload, and note any visible publishing or visibility clue before escalating or routing it to the right owner.',
        commonMistakes: ['Assuming the whole portal is down', 'Skipping scope and expectation'],
        dcsContext: 'The uploaded-resource complaint is often about a specific publishing or visibility path.',
        reviewSchedule,
        recommendedModuleId: 'ourdcs-schoolbox-support',
        weakTopic: 'schoolbox-workflows',
        rubric: ['Names exact page and resource', 'Checks scope', 'Captures expected behaviour']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('ourdcs-schoolbox-support', [
      {
        title: 'Class page resources missing',
        prompt: 'Write a short LMS support note that separates page context, visibility, and expected outcome.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('ourdcs-schoolbox-support', [
      {
        title: 'OurDCS or Schoolbox quick-reference guide',
        description: 'Create a first-line cheat sheet for class-page visibility, upload expectations, and owner boundaries.'
      }
    ])
  }),
  createModule({
    id: 'login-and-password-support',
    title: 'Login and Password Support',
    description:
      'Handle username checks, lockouts, expired passwords, self-service resets, and compromise suspicion with safe first-line judgement.',
    domain: 'Identity and Access',
    level: 'L1',
    estimatedMinutes: 22,
    tags: ['password reset', 'lockout', 'expired password', 'self-service', 'compromise suspicion'],
    learningObjectives: [
      'Separate forgotten-password, lockout, expired-password, and compromise-suspicion cases.',
      'Use self-service and identity checks safely before escalating.',
      'Write notes that preserve identity risk without oversharing.'
    ],
    dcsRelevance: [
      'Login and password issues are among the most common first-line support requests.',
      'The wrong response can increase both downtime and security risk.'
    ],
    sections: buildSections('login-and-password-support', [
      {
        title: 'Not every login failure is the same',
        bodyMarkdown:
          'A user who forgot the password, a user who is locked out, and a user whose password expired may all say "I cannot log in". Separate username, timing, message wording, and whether self-service should work before acting.',
        takeaway: 'The exact login state matters more than the broad complaint.'
      },
      {
        title: 'Self-service before unsafe shortcuts',
        bodyMarkdown:
          'If the environment supports self-service reset, use that path where appropriate. Josh should never ask for the userâ€™s password and should treat repeated unexpected prompts or compromise suspicion as a higher-risk workflow.',
        takeaway: 'Safe identity support protects both uptime and trust.'
      },
      {
        title: 'Know when the issue becomes security-sensitive',
        bodyMarkdown:
          'Unexpected password changes, sign-in prompts that do not fit the situation, or repeated failures after a reset can move the issue beyond routine access help. Capture the symptom, timing, and scope cleanly, then escalate.',
        takeaway: 'Compromise suspicion changes the judgement and the wording.'
      }
    ]),
    flashcards: buildFlashcards('login-and-password-support', [
      ['Why clarify the exact login message?', 'Because forgotten password, lockout, and expiry often need different next steps.'],
      ['What should Josh never ask a user for?', 'Their current password.'],
      ['When is self-service reset especially useful?', 'When the identity workflow supports it and the issue looks routine rather than suspicious.'],
      ['What raises compromise suspicion?', 'Unexpected password-change signs, strange prompts, or failures that do not fit a normal reset story.'],
      ['Why confirm the username carefully?', 'A typo or wrong account can look like a password failure.'],
      ['What is a weak login note?', 'One that says only "cannot log in" without the message, timing, or state.'],
      ['Why does staff versus student context matter?', 'The workflow and urgency can differ depending on account type and support path.'],
      ['What should a strong identity note capture?', 'Username context, exact symptom, message wording, steps tried, and any security concern.']
    ]),
    quiz: [
      mcq({
        id: 'login-and-password-support-q1',
        prompt: 'A user says they cannot log in. What is the best first step?',
        domain: 'Login and password support',
        difficulty: 'foundation',
        explanation: 'The exact identity state should be clarified before action.',
        modelAnswer:
          'Confirm the correct username, capture the exact message or symptom, and work out whether the issue looks like forgotten password, lockout, expiry, or something more suspicious.',
        commonMistakes: ['Resetting immediately without context', 'Ignoring the username check'],
        dcsContext: 'Fast identity support still depends on correct classification.',
        reviewSchedule,
        recommendedModuleId: 'login-and-password-support',
        weakTopic: 'login-password-support',
        options: [
          { id: 'a', label: 'Clarify username, exact message, and likely login state' },
          { id: 'b', label: 'Ask them to tell you the password they last used' },
          { id: 'c', label: 'Assume the account is compromised every time' },
          { id: 'd', label: 'Ignore the message wording and go straight to escalation' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'login-and-password-support-q2',
        prompt: 'What should a good password-support note include?',
        domain: 'Login and password support',
        difficulty: 'stretch',
        explanation: 'Identity notes need evidence and restraint together.',
        modelAnswer:
          'Include the username context or account type, exact sign-in symptom or message, whether the issue looks like lockout, expiry, or reset failure, what safe steps were tried, and whether any compromise suspicion exists.',
        commonMistakes: ['Pasting unnecessary private detail', 'Leaving out the exact sign-in state'],
        dcsContext: 'A clean note helps the next person decide whether this is routine or risky.',
        reviewSchedule,
        recommendedModuleId: 'login-and-password-support',
        weakTopic: 'login-password-support',
        rubric: ['Names sign-in state', 'Records safe steps tried', 'Mentions security concern if present'],
        keywordHints: ['username', 'message', 'lockout', 'expiry', 'security']
      }),
      orderSteps({
        id: 'login-and-password-support-q3',
        prompt: 'Order the safer response to a likely routine password-reset request.',
        domain: 'Login and password support',
        difficulty: 'stretch',
        explanation: 'Routine identity work still benefits from sequence.',
        modelAnswer:
          'Confirm the correct account and symptom, use the approved self-service or standard reset path if appropriate, verify the outcome safely, then escalate if the failure persists or looks suspicious.',
        commonMistakes: ['Resetting before confirming the account', 'Skipping post-reset verification'],
        dcsContext: 'Routine access support still needs safe verification.',
        reviewSchedule,
        recommendedModuleId: 'login-and-password-support',
        weakTopic: 'login-password-support',
        steps: [
          { id: 'account', label: 'Confirm the correct username or account context' },
          { id: 'state', label: 'Clarify the exact login state or message' },
          { id: 'path', label: 'Use the approved self-service or reset path' },
          { id: 'verify', label: 'Check the result and escalate if it still looks wrong' }
        ],
        correctOrder: ['account', 'state', 'path', 'verify'],
        rubric: ['Confirms account first', 'Uses approved path', 'Verifies safely']
      }),
      scenarioResponse({
        id: 'login-and-password-support-q4',
        prompt: 'A user says the reset did not help and the prompts now feel suspicious. Explain Joshâ€™s next move.',
        domain: 'Login and password support',
        difficulty: 'challenge',
        explanation: 'The issue may have shifted from routine access help to security-sensitive handling.',
        modelAnswer:
          'Stop treating it as routine only. Capture the exact symptom, timing, and what happened after the reset, avoid collecting passwords, and escalate through the appropriate security-aware path because compromise suspicion is now part of the note.',
        commonMistakes: ['Persisting with casual resets', 'Ignoring the security concern because a reset was already tried'],
        dcsContext: 'Compromise suspicion changes the support posture immediately.',
        reviewSchedule,
        recommendedModuleId: 'login-and-password-support',
        weakTopic: 'login-password-support',
        rubric: ['Recognises risk shift', 'Avoids unsafe questions', 'Escalates with clear evidence']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('login-and-password-support', [
      {
        title: 'Lockout or suspicious reset failure',
        prompt: 'Write the note you would want another tech to see before they touch the account.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('login-and-password-support', [
      {
        title: 'Password help quick guide',
        description: 'Draft a first-line workflow for username checks, self-service reset, lockout handling, and security-sensitive escalation.'
      }
    ])
  }),
  createModule({
    id: 'permissions-and-access-requests',
    title: 'Permissions and Access Requests',
    description:
      'Triage shared-drive, software, group, and role-based access requests with clean approvals, least-privilege thinking, and safe handoff.',
    domain: 'Identity and Access',
    level: 'L1',
    estimatedMinutes: 22,
    tags: ['permissions', 'shared drives', 'software access', 'approvals', 'least privilege'],
    learningObjectives: [
      'Separate login issues from permission issues.',
      'Capture request completeness, business need, and approval context.',
      'Use least-privilege language without blocking legitimate work.'
    ],
    dcsRelevance: [
      'Access requests are common and easy to mishandle without clear approvals.',
      'Strong notes reduce rework for whoever actually grants access.'
    ],
    sections: buildSections('permissions-and-access-requests', [
      {
        title: 'Access issue or login issue?',
        bodyMarkdown:
          'A user who can sign in but cannot reach a drive, Team, or application probably has an access-path problem, not a password problem. Separate authentication success from authorisation failure before routing the request.',
        takeaway: 'Being unable to open something is not automatically a login failure.'
      },
      {
        title: 'Request completeness matters',
        bodyMarkdown:
          'The best access request notes capture who needs what, for which role or task, whether an approval exists, how urgent it is, and whether a shared drive, group, Team, or app is involved. A vague request creates slow, risky work.',
        takeaway: 'Completeness is part of security and part of service quality.'
      },
      {
        title: 'Least privilege is practical, not abstract',
        bodyMarkdown:
          'Least privilege means granting the smallest appropriate access for the actual work. Josh does not decide every approval, but he should phrase requests in a way that makes scope and justification clear.',
        takeaway: 'Clear justification helps protect both the user and the school.'
      }
    ]),
    flashcards: buildFlashcards('permissions-and-access-requests', [
      ['How do you distinguish a permission issue from a login issue?', 'The user may authenticate successfully but still be denied the drive, Team, or application they need.'],
      ['What should a strong access request include?', 'Who needs access, to what, for what role or task, approval context, urgency, and scope.'],
      ['Why is least privilege useful?', 'It gives the user the access they need without widening risk unnecessarily.'],
      ['What is a weak access request?', 'Please give them access with no role, destination, or approval context.'],
      ['Why mention whether it is a drive, Team, or software request?', 'Different systems have different owners and grant paths.'],
      ['What should Josh avoid promising?', 'That access will be granted without the right owner or approval.'],
      ['What is an important post-grant question?', 'Can the user now reach the intended resource or workflow safely?'],
      ['Why is role context useful?', 'It explains the business need and supports the least-privilege decision.']
    ]),
    quiz: [
      mcq({
        id: 'permissions-and-access-requests-q1',
        prompt: 'A staff member can sign in normally but cannot open a shared drive folder they need. What is the best first judgement?',
        domain: 'Permissions and access',
        difficulty: 'foundation',
        explanation: 'Authentication success changes the problem class.',
        modelAnswer:
          'Treat it as an access or permission issue first, then capture the exact resource, role need, and approval context.',
        commonMistakes: ['Resetting the password first', 'Ignoring the exact target resource'],
        dcsContext: 'This is a frequent school support distinction.',
        reviewSchedule,
        recommendedModuleId: 'permissions-and-access-requests',
        weakTopic: 'permissions-access',
        options: [
          { id: 'a', label: 'This is likely an access-path issue, not a pure login failure' },
          { id: 'b', label: 'Delete the account and start over' },
          { id: 'c', label: 'Assume they need full admin rights' },
          { id: 'd', label: 'Ignore approvals because they already work at the school' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'permissions-and-access-requests-q2',
        prompt: 'What should Josh capture before escalating a software or shared-drive access request?',
        domain: 'Permissions and access',
        difficulty: 'stretch',
        explanation: 'Completeness makes access requests safer and faster.',
        modelAnswer:
          'Capture who needs access, the exact resource or software, their role or task need, urgency, whether an approval exists, and whether the problem is no access at all or unexpected limited access.',
        commonMistakes: ['Leaving out business need', 'Not naming the exact resource'],
        dcsContext: 'A complete request helps the owner grant the smallest correct access faster.',
        reviewSchedule,
        recommendedModuleId: 'permissions-and-access-requests',
        weakTopic: 'permissions-access',
        rubric: ['Names resource and user', 'Includes role or task need', 'Mentions approval or urgency'],
        keywordHints: ['who', 'resource', 'role', 'approval', 'urgency']
      }),
      categorization({
        id: 'permissions-and-access-requests-q3',
        prompt: 'Sort each issue into the best bucket.',
        domain: 'Permissions and access',
        difficulty: 'challenge',
        explanation: 'Classification improves the handoff path.',
        modelAnswer:
          'Some problems are login-state issues, some are permissions requests, and some are approval-owner tasks before any grant should happen.',
        commonMistakes: ['Treating every denial as a password issue', 'Skipping approval ownership'],
        dcsContext: 'This is one of the clearest places where Level 1 triage quality matters.',
        reviewSchedule,
        recommendedModuleId: 'permissions-and-access-requests',
        weakTopic: 'permissions-access',
        categories: [
          { id: 'login', label: 'Login or identity issue' },
          { id: 'access', label: 'Permissions or access path' },
          { id: 'approval', label: 'Approval or owner decision needed' }
        ],
        items: [
          { id: 'signin', label: 'User cannot authenticate to the account at all', correctCategoryId: 'login' },
          { id: 'drive', label: 'User signs in but cannot open the requested shared drive', correctCategoryId: 'access' },
          { id: 'xero', label: 'Finance application access requested for a new role with no approval yet', correctCategoryId: 'approval' },
          { id: 'team', label: 'Teacher can access M365 but not the Team needed for their class', correctCategoryId: 'access' }
        ],
        rubric: ['Separates login from access', 'Recognises approval boundary', 'Improves routing']
      }),
      scenarioResponse({
        id: 'permissions-and-access-requests-q4',
        prompt: 'A new staff member says they can sign in but still lack the folders and software needed for today. Explain Joshâ€™s first-line response.',
        domain: 'Permissions and access',
        difficulty: 'challenge',
        explanation: 'The note should combine urgency with completeness.',
        modelAnswer:
          'Clarify the exact folders, Teams, or applications missing, capture the staff memberâ€™s role and start-day urgency, note any existing approval context, and escalate the request clearly without promising unauthorised broad access.',
        commonMistakes: ['Calling it only a login issue', 'Promising full access without approval context'],
        dcsContext: 'Day-one access issues often need fast but still disciplined handling.',
        reviewSchedule,
        recommendedModuleId: 'permissions-and-access-requests',
        weakTopic: 'permissions-access',
        rubric: ['Names exact resources', 'Captures urgency and role', 'Keeps approval boundaries clear']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('permissions-and-access-requests', [
      {
        title: 'Shared-drive access request',
        prompt: 'Write the shortest escalation note that still captures resource, role, approval context, and urgency.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('permissions-and-access-requests', [
      {
        title: 'Access request template',
        description: 'Create a reusable request pattern for shared drives, software, and role-based access grants.'
      }
    ])
  }),
  createModule({
    id: 'website-filtering-and-unblock-requests',
    title: 'Website Filtering and Unblock Requests',
    description:
      'Capture block details, education-purpose justification, workflow timing, and escalation boundaries for website filtering requests.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 18,
    tags: ['filtering', 'blocked sites', 'unblock request', 'justification'],
    learningObjectives: [
      'Separate blocked-site workflow from general internet faults.',
      'Capture the evidence needed for an unblock review.',
      'Communicate lead time and approval boundaries clearly.'
    ],
    dcsRelevance: [
      'Website filtering requests are common and process-sensitive.',
      'The right evidence prevents repeated back-and-forth on unblock requests.'
    ],
    sections: buildSections('website-filtering-and-unblock-requests', [
      {
        title: 'Blocked site is not the same as no internet',
        bodyMarkdown:
          'If browsing generally works but one site is blocked, the problem is likely a filtering workflow rather than a connectivity failure. Capture the exact URL or category, the visible block message, and the educational purpose.',
        takeaway: 'Unblock requests need evidence and justification, not just frustration.'
      },
      {
        title: 'Why justification and lead time matter',
        bodyMarkdown:
          'Some requests need review against policy, curriculum purpose, or risk. Josh should explain the next step and likely lead time honestly instead of suggesting that every block can be lifted immediately.',
        takeaway: 'Policy workflow awareness is part of good first-line service.'
      },
      {
        title: 'Evidence for the reviewing owner',
        bodyMarkdown:
          'A strong note includes the exact site or service, who needs it, what educational task is blocked, the visible message, urgency, and when the activity is due. That is far better than simply saying "Please unblock this site".',
        takeaway: 'Evidence quality shapes turnaround quality.'
      }
    ]),
    flashcards: buildFlashcards('website-filtering-and-unblock-requests', [
      ['How do you recognise a filtering request rather than a general internet failure?', 'General browsing works, but the specific site or service shows a block message or category issue.'],
      ['What evidence should a blocked-site note include?', 'Exact site, visible block wording, user group, educational purpose, and urgency.'],
      ['Why mention educational purpose?', 'Because unblock review depends on business or curriculum need, not only technical reachability.'],
      ['What is a weak unblock request?', 'This site is blocked. Please fix.'],
      ['Why should Josh avoid promising instant unblocking?', 'Because review and approval may be required.'],
      ['What timing detail often matters?', 'When the lesson, activity, or event needs the site.'],
      ['Why is the visible block message useful?', 'It distinguishes filtering from other kinds of failure.'],
      ['What should Josh capture instead of a vague complaint?', 'Who needs the site, why, when, and what exact block was seen.']
    ]),
    quiz: [
      mcq({
        id: 'website-filtering-and-unblock-requests-q1',
        prompt: 'Which clue best suggests a filtering workflow rather than a total internet fault?',
        domain: 'Website filtering and unblock requests',
        difficulty: 'foundation',
        explanation: 'The symptom pattern changes the route.',
        modelAnswer:
          'If general browsing works but one site shows a block message, that points toward filtering workflow rather than broad connectivity loss.',
        commonMistakes: ['Treating one blocked site as a total outage', 'Ignoring the exact block message'],
        dcsContext: 'This distinction matters in classrooms where time is short and policy still applies.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-and-unblock-requests',
        weakTopic: 'website-filtering',
        options: [
          { id: 'a', label: 'Other sites work, but this one shows a block message' },
          { id: 'b', label: 'The device has no power' },
          { id: 'c', label: 'The password expired yesterday' },
          { id: 'd', label: 'The class printer jammed' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'website-filtering-and-unblock-requests-q2',
        prompt: 'What should an unblock request note include?',
        domain: 'Website filtering and unblock requests',
        difficulty: 'stretch',
        explanation: 'Evidence and justification are the heart of this workflow.',
        modelAnswer:
          'Include the exact site or service, who needs it, the visible block wording, the educational purpose or task, urgency or due time, and the approval path or owner if known.',
        commonMistakes: ['Leaving out educational purpose', 'Not naming the exact site'],
        dcsContext: 'The reviewing owner needs more than a complaint to assess risk and need.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-and-unblock-requests',
        weakTopic: 'website-filtering',
        rubric: ['Names exact site', 'Explains educational need', 'Captures urgency or timing'],
        keywordHints: ['URL', 'block message', 'purpose', 'urgency']
      }),
      orderSteps({
        id: 'website-filtering-and-unblock-requests-q3',
        prompt: 'Order the safer response to a blocked-site request from a teacher.',
        domain: 'Website filtering and unblock requests',
        difficulty: 'stretch',
        explanation: 'Evidence should come before routing.',
        modelAnswer:
          'Confirm that other browsing works, capture the exact blocked site and message, record the educational purpose and timing, then route the request through the approved workflow.',
        commonMistakes: ['Sending an unblock request with no evidence', 'Treating it like a random internet fault'],
        dcsContext: 'Good unblock requests save time later in the approval chain.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-and-unblock-requests',
        weakTopic: 'website-filtering',
        steps: [
          { id: 'scope', label: 'Check whether general internet access still works' },
          { id: 'site', label: 'Capture the exact site and visible block message' },
          { id: 'purpose', label: 'Record the educational purpose and timing need' },
          { id: 'route', label: 'Send the request through the approved workflow' }
        ],
        correctOrder: ['scope', 'site', 'purpose', 'route'],
        rubric: ['Separates filtering from outage', 'Captures evidence', 'Routes appropriately']
      }),
      scenarioResponse({
        id: 'website-filtering-and-unblock-requests-q4',
        prompt: 'A teacher needs a blocked site for tomorrowâ€™s lesson. Explain Joshâ€™s note and response.',
        domain: 'Website filtering and unblock requests',
        difficulty: 'challenge',
        explanation: 'Lead time and justification both matter.',
        modelAnswer:
          'Capture the exact site, visible block message, curriculum purpose, and when the lesson needs it. Explain that the request will be routed for review rather than promising instant unblocking, and note the timing so urgency is visible to the reviewer.',
        commonMistakes: ['Promising the site will be opened immediately', 'Skipping the lesson timing'],
        dcsContext: 'Teacher trust rises when the workflow is explained clearly and honestly.',
        reviewSchedule,
        recommendedModuleId: 'website-filtering-and-unblock-requests',
        weakTopic: 'website-filtering',
        rubric: ['Captures site and message', 'Includes educational purpose', 'Communicates lead time honestly']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('website-filtering-and-unblock-requests', [
      {
        title: 'Lesson-blocked website',
        prompt: 'Write a one-paragraph unblock request note that would help the reviewer decide quickly.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('website-filtering-and-unblock-requests', [
      {
        title: 'Website unblock checklist',
        description: 'Create a first-line evidence checklist for blocked-site and unblock workflow requests.'
      }
    ])
  }),
  createModule({
    id: 'new-user-onboarding',
    title: 'New User Onboarding',
    description:
      'Support staff, student, and prac-teacher onboarding requests with completeness checks, role context, and day-one validation.',
    domain: 'Identity and Access',
    level: 'L1',
    estimatedMinutes: 22,
    tags: ['onboarding', 'new staff', 'students', 'prac teachers', 'day-one checks'],
    learningObjectives: [
      'Capture who the user is, when they start, and what systems they actually need.',
      'Separate request completeness from provisioned-access verification.',
      'Use day-one validation notes to reduce rework.'
    ],
    dcsRelevance: [
      'New-user onboarding is a repeated, high-impact support workflow.',
      'Missing access on day one affects both confidence and operations.'
    ],
    sections: buildSections('new-user-onboarding', [
      {
        title: 'Completeness before provisioning',
        bodyMarkdown:
          'A good onboarding request captures start date, role, campus, account type, approvals, and required systems. Staff, students, and prac teachers may need different sets of access, devices, and communication steps.',
        takeaway: 'Good onboarding starts with complete requests, not emergency guesswork.'
      },
      {
        title: 'Role context shapes the system list',
        bodyMarkdown:
          'Do not assume every new user needs the same systems. The right note names the role or learning context, expected drives, Teams, portals, and any special software or classroom needs.',
        takeaway: 'Role context is the difference between enough access and too much access.'
      },
      {
        title: 'Day-one validation catches gaps fast',
        bodyMarkdown:
          'Even when accounts are created, day-one checks still matter: can the user sign in, reach the expected systems, print if required, and access the right class or team context? Missing-access notes should be specific and calm.',
        takeaway: 'Onboarding quality includes validation, not only request submission.'
      }
    ]),
    flashcards: buildFlashcards('new-user-onboarding', [
      ['What belongs in a complete onboarding request?', 'Start date, role, campus, approvals, required systems, and any special access needs.'],
      ['Why does role context matter in onboarding?', 'It determines which systems and permissions are actually appropriate.'],
      ['What is a weak onboarding note?', 'New user needs setup ASAP with no role or systems listed.'],
      ['Why are prac teachers worth naming separately?', 'They may follow different timing, approval, or system-need patterns from permanent staff.'],
      ['What should day-one validation check?', 'Sign-in success and access to the systems the role actually needs.'],
      ['Why separate request completeness from missing-access follow-up?', 'Because the account may exist but still be missing key resources.'],
      ['What kind of data should stay out of the PD app?', 'Private identifiers, credentials, and copied personal details.'],
      ['What should Josh capture when onboarding is incomplete?', 'What is present, what is missing, who approved it, and what start-day impact remains.']
    ]),
    quiz: [
      mcq({
        id: 'new-user-onboarding-q1',
        prompt: 'Which detail is most important before routing a new onboarding request?',
        domain: 'New user onboarding',
        difficulty: 'foundation',
        explanation: 'Role and start context drive the rest of the workflow.',
        modelAnswer:
          'Capture the user type, role, start date, campus, and required systems before treating the request as complete enough to action.',
        commonMistakes: ['Requesting setup with no role context', 'Ignoring start date urgency'],
        dcsContext: 'Onboarding mistakes usually begin with missing context, not with the account tool.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'onboarding-workflows',
        options: [
          { id: 'a', label: 'User type, role, start date, campus, and needed systems' },
          { id: 'b', label: 'Only the personâ€™s first name' },
          { id: 'c', label: 'Assume every user needs the same access' },
          { id: 'd', label: 'Ignore whether they start today or next week' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'new-user-onboarding-q2',
        prompt: 'What should a day-one validation note include when a new user still lacks access?',
        domain: 'New user onboarding',
        difficulty: 'stretch',
        explanation: 'Missing-access notes should be exact and role-aware.',
        modelAnswer:
          'Include what the user can access already, what required systems are still missing, the role and day-one impact, and any approvals or onboarding request context already known.',
        commonMistakes: ['Writing only "user not set up"', 'Leaving out which systems are already working'],
        dcsContext: 'The next person needs to see both the gaps and the progress already made.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'onboarding-workflows',
        rubric: ['Names working and missing systems', 'Captures role impact', 'Uses request context'],
        keywordHints: ['working', 'missing', 'role', 'impact', 'context']
      }),
      categorization({
        id: 'new-user-onboarding-q3',
        prompt: 'Sort each item into the best onboarding bucket.',
        domain: 'New user onboarding',
        difficulty: 'challenge',
        explanation: 'Completeness, provisioning, and validation are separate stages.',
        modelAnswer:
          'Some items belong to request completeness, some to actual provisioning, and some to day-one validation of what the user can really use.',
        commonMistakes: ['Treating request submission as the whole workflow', 'Ignoring validation after provisioning'],
        dcsContext: 'This is how Josh avoids assuming setup is finished when the user still cannot work.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'onboarding-workflows',
        categories: [
          { id: 'request', label: 'Request completeness' },
          { id: 'provision', label: 'Provisioning action' },
          { id: 'validate', label: 'Day-one validation' }
        ],
        items: [
          { id: 'start-date', label: 'Confirm the userâ€™s start date and campus', correctCategoryId: 'request' },
          { id: 'account', label: 'Create or route account setup through the owner path', correctCategoryId: 'provision' },
          { id: 'signin', label: 'Check whether the user can sign in and reach required systems', correctCategoryId: 'validate' },
          { id: 'role', label: 'List the Teams, drives, or apps the role needs', correctCategoryId: 'request' }
        ],
        rubric: ['Separates workflow stages', 'Recognises validation as distinct', 'Improves request clarity']
      }),
      scenarioResponse({
        id: 'new-user-onboarding-q4',
        prompt: 'A prac teacher starts today and can sign in but cannot reach the class resources they were told to use. Explain Joshâ€™s first-line response.',
        domain: 'New user onboarding',
        difficulty: 'challenge',
        explanation: 'This is a role-context and day-one validation problem.',
        modelAnswer:
          'Confirm the prac teacherâ€™s expected class resources and context, capture which systems work already, identify the missing access paths, note start-day urgency, and escalate the specific missing resources rather than logging it as a generic setup failure.',
        commonMistakes: ['Calling it only a login problem', 'Not naming the class resources that are missing'],
        dcsContext: 'Day-one access notes are strongest when they list exact missing workflows.',
        reviewSchedule,
        recommendedModuleId: 'new-user-onboarding',
        weakTopic: 'onboarding-workflows',
        rubric: ['Names exact missing resources', 'Captures day-one urgency', 'Uses role context']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('new-user-onboarding', [
      {
        title: 'Missing day-one access',
        prompt: 'Write the best note for a new user who has an account but still cannot do the job they started today.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('new-user-onboarding', [
      {
        title: 'Onboarding checklist',
        description: 'Create a staff, student, and prac-teacher onboarding checklist with completeness and day-one validation steps.'
      }
    ])
  }),
  createModule({
    id: 'teams-sharepoint-onedrive-support',
    title: 'Teams, SharePoint, and OneDrive Support',
    description:
      'Support common sharing, sync, ownership, and access issues in Teams, SharePoint, and OneDrive at a Level 1-safe scope.',
    domain: 'Cloud and Platforms',
    level: 'L1',
    estimatedMinutes: 22,
    tags: ['Teams', 'SharePoint', 'OneDrive', 'sync', 'sharing', 'ownership'],
    learningObjectives: [
      'Separate sync issues, sharing issues, and ownership or permission issues.',
      'Use Level 1-safe checks before escalating cloud-collaboration complaints.',
      'Write notes that preserve the exact path and impact.'
    ],
    dcsRelevance: [
      'Teams, SharePoint, and OneDrive are everyday staff platforms.',
      'Clear path and scope notes prevent vague cloud-support escalations.'
    ],
    sections: buildSections('teams-sharepoint-onedrive-support', [
      {
        title: 'Path matters: Team, site, or personal file area?',
        bodyMarkdown:
          'A user may say "OneDrive" when the file actually lives in a Team or SharePoint site, or say "Teams" when the real problem is a sync path. Start by naming where the file or folder is meant to live.',
        takeaway: 'Platform name confusion is common and worth clarifying early.'
      },
      {
        title: 'Sync, sharing, or ownership?',
        bodyMarkdown:
          'A file can fail because sync is stalled, because sharing was done to the wrong people, or because the user lacks ownership or site access. These are different support paths even though they all feel like missing files to the user.',
        takeaway: 'The missing file complaint often hides one of three different workflows.'
      },
      {
        title: 'Level 1-safe checks and handoff',
        bodyMarkdown:
          'Safe first checks include confirming the location path, whether the issue is on one device or web and desktop both, what sharing was expected, and whether someone else in the Team can see the same content. Escalation should name the exact library, Team, or personal area involved.',
        takeaway: 'Precise path language is the most useful note improvement here.'
      }
    ]),
    flashcards: buildFlashcards('teams-sharepoint-onedrive-support', [
      ['Why clarify whether the file is in Teams, SharePoint, or OneDrive?', 'Because the storage path and owner workflow differ.'],
      ['What are the three common buckets for missing-file complaints?', 'Sync issue, sharing issue, or ownership/access issue.'],
      ['What is a safe first comparison for a sync problem?', 'Check whether the file is visible in the web version or on another device.'],
      ['Why mention the exact Team or library?', 'Because vague cloud-platform language weakens the escalation note.'],
      ['What does a sharing issue usually need?', 'Expected audience, current visibility, and how the file was shared.'],
      ['What is a weak note here?', 'Teams is broken and my files are gone.'],
      ['Why does web versus desktop comparison help?', 'It separates local sync path issues from wider access issues.'],
      ['What should Josh avoid promising?', 'That he will fix ownership or site-level settings without the right owner.']
    ]),
    quiz: [
      mcq({
        id: 'teams-sharepoint-onedrive-support-q1',
        prompt: 'A teacher says a file is missing from Teams. What is the best first clarification?',
        domain: 'Teams, SharePoint, and OneDrive',
        difficulty: 'foundation',
        explanation: 'Path clarity comes first.',
        modelAnswer:
          'Clarify whether the file lives in a Team, a SharePoint site library, or the teacherâ€™s own OneDrive, and what location they expected to open.',
        commonMistakes: ['Treating every file complaint as generic Teams failure', 'Skipping the path question'],
        dcsContext: 'Platform names get used loosely in daily school support.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'teams-sharepoint-onedrive',
        options: [
          { id: 'a', label: 'Where exactly is the file meant to live and who should see it?' },
          { id: 'b', label: 'Delete the Team and recreate it' },
          { id: 'c', label: 'Assume the user lost all their files' },
          { id: 'd', label: 'Ignore whether the web version still works' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'teams-sharepoint-onedrive-support-q2',
        prompt: 'What should Josh include in a note for a likely sync problem?',
        domain: 'Teams, SharePoint, and OneDrive',
        difficulty: 'stretch',
        explanation: 'Sync complaints benefit from location and comparison details.',
        modelAnswer:
          'Include the exact file or library path, whether the issue occurs on web, desktop, or both, what sync symptom is visible, whether another device or user sees the same content, and the current impact.',
        commonMistakes: ['Not naming the path', 'Failing to compare web versus desktop'],
        dcsContext: 'These details help distinguish local sync from wider access issues.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'teams-sharepoint-onedrive',
        rubric: ['Names path clearly', 'Captures comparison checks', 'States impact'],
        keywordHints: ['path', 'web', 'desktop', 'sync', 'impact']
      }),
      categorization({
        id: 'teams-sharepoint-onedrive-support-q3',
        prompt: 'Sort each complaint into the best primary bucket.',
        domain: 'Teams, SharePoint, and OneDrive',
        difficulty: 'challenge',
        explanation: 'Missing files can be missing for different reasons.',
        modelAnswer:
          'Web-versus-desktop mismatch points toward sync, wrong audience or link expectation points toward sharing, and site or Team access gaps point toward ownership or permissions.',
        commonMistakes: ['Using one troubleshooting path for every missing-file complaint', 'Skipping path and audience context'],
        dcsContext: 'Precise classification makes the cloud platforms much easier to support.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'teams-sharepoint-onedrive',
        categories: [
          { id: 'sync', label: 'Sync path issue' },
          { id: 'sharing', label: 'Sharing or audience issue' },
          { id: 'access', label: 'Ownership or access issue' }
        ],
        items: [
          { id: 'web-only', label: 'File appears on web but not in the local folder', correctCategoryId: 'sync' },
          { id: 'wrong-people', label: 'Teacher expected the class to see a file that only staff can open', correctCategoryId: 'sharing' },
          { id: 'team-missing', label: 'User cannot open the Team site they should belong to', correctCategoryId: 'access' },
          { id: 'onedrive-share', label: 'Personal OneDrive link was sent to the wrong audience', correctCategoryId: 'sharing' }
        ],
        rubric: ['Separates platform problem types', 'Uses path and audience clues', 'Improves routing']
      }),
      scenarioResponse({
        id: 'teams-sharepoint-onedrive-support-q4',
        prompt: 'A staff member says the shared faculty folder shows in the browser but not on their laptop. Explain Joshâ€™s first-line response.',
        domain: 'Teams, SharePoint, and OneDrive',
        difficulty: 'challenge',
        explanation: 'This likely points toward local sync rather than total access failure.',
        modelAnswer:
          'Capture the exact site or folder path, note that the browser view works, record the local sync symptom, and confirm whether the issue is isolated to one device. That frames the problem as likely sync-path related rather than a total access denial.',
        commonMistakes: ['Logging it as broad access loss', 'Ignoring the browser success clue'],
        dcsContext: 'The web-versus-laptop difference is one of the best signal-splitting clues in M365 file support.',
        reviewSchedule,
        recommendedModuleId: 'teams-sharepoint-onedrive-support',
        weakTopic: 'teams-sharepoint-onedrive',
        rubric: ['Uses path detail', 'Mentions browser-versus-laptop split', 'Captures device scope']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('teams-sharepoint-onedrive-support', [
      {
        title: 'Browser works, laptop does not',
        prompt: 'Write the best note for a file path that works on the web but not in the local sync view.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('teams-sharepoint-onedrive-support', [
      {
        title: 'Teams/SharePoint/OneDrive triage guide',
        description: 'Create a quick guide that separates sync, sharing, and access-path issues.'
      }
    ])
  }),
  createModule({
    id: 'ipad-jamf-workflow-basics',
    title: 'iPad and Jamf Workflow Basics',
    description:
      'Handle first-line iPad and Jamf-related triage with ownership boundaries, evidence capture, and Level 1-safe next steps.',
    domain: 'Endpoint Support',
    level: 'L1',
    estimatedMinutes: 20,
    tags: ['iPad', 'Jamf', 'mobile devices', 'enrolment', 'evidence capture'],
    learningObjectives: [
      'Separate device issue, app issue, enrolment clue, and policy clue at first line.',
      'Capture evidence that helps the Jamf or mobile-device owner act quickly.',
      'Recognise where Level 1 stops before risky device-management changes.'
    ],
    dcsRelevance: [
      'Mobile devices and shared iPads create recurring school support patterns.',
      'Good evidence capture matters when the actual fix lives in device management.'
    ],
    sections: buildSections('ipad-jamf-workflow-basics', [
      {
        title: 'Think in device, app, and management layers',
        bodyMarkdown:
          'An iPad complaint may belong to the physical device, the app, the account in use, or the management path. Josh adds value by separating those layers before escalating.',
        takeaway: 'Mobile support starts with layer identification, not with random settings changes.'
      },
      {
        title: 'Capture evidence the owner can use',
        bodyMarkdown:
          'Record the device type, user context, visible error, app or workflow affected, whether the issue is one device or several, and whether a restart or reconnect changed anything. These clues help the Jamf or owner path move faster.',
        takeaway: 'Evidence capture is the main Level 1 contribution in managed-device workflows.'
      },
      {
        title: 'Know the management boundary',
        bodyMarkdown:
          'Josh should not improvise enrolment resets or deep management changes without authorisation. The safe move is to preserve the symptom, note the device context, and escalate through the management owner when the issue clearly lives there.',
        takeaway: 'Management ownership is a boundary, not a failure of effort.'
      }
    ]),
    flashcards: buildFlashcards('ipad-jamf-workflow-basics', [
      ['What are the main first-line layers in an iPad support issue?', 'Device, app, account, and management layer.'],
      ['Why does scope matter on iPad issues?', 'One iPad suggests a different path from several iPads failing the same way.'],
      ['What should a good Jamf-related note include?', 'Device context, visible symptom, app or task affected, scope, and safe steps tried.'],
      ['What should Josh avoid doing casually on a managed device?', 'Deep enrolment or management changes without authorisation.'],
      ['Why is app versus device distinction useful?', 'Because the problem may be app-specific rather than whole-device.'],
      ['What is a weak mobile-device note?', 'iPad not working.'],
      ['Why capture whether restart or reconnect changed anything?', 'Because it helps separate transient issues from deeper management patterns.'],
      ['What is the safest value Josh adds in Jamf workflows?', 'Structured triage and evidence-rich escalation.']
    ]),
    quiz: [
      mcq({
        id: 'ipad-jamf-workflow-basics-q1',
        prompt: 'A single iPad cannot open the required classroom app, but nearby iPads can. What is the best first judgement?',
        domain: 'iPad and Jamf support',
        difficulty: 'foundation',
        explanation: 'Scope helps split one-device from fleet issues.',
        modelAnswer:
          'Treat it as a one-device or one-app path first, not a fleet-wide outage, and capture the exact app, device context, and visible symptom.',
        commonMistakes: ['Calling it a whole-iPad problem for every device', 'Skipping the app context'],
        dcsContext: 'Mobile-device scope is one of the quickest high-value checks.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'jamf-ipad-support',
        options: [
          { id: 'a', label: 'This likely starts as a one-device or one-app issue' },
          { id: 'b', label: 'Jamf must be down for every iPad' },
          { id: 'c', label: 'Factory reset the device immediately' },
          { id: 'd', label: 'Ignore nearby working devices' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'ipad-jamf-workflow-basics-q2',
        prompt: 'What should Josh capture before escalating an iPad or Jamf issue?',
        domain: 'iPad and Jamf support',
        difficulty: 'stretch',
        explanation: 'The management owner needs context, not only frustration.',
        modelAnswer:
          'Capture the device type or context, app or workflow affected, exact symptom, whether the issue is isolated or widespread, any visible message, and the safe checks already tried such as restart or reconnect.',
        commonMistakes: ['Leaving out scope', 'Not naming the affected app or workflow'],
        dcsContext: 'These clues help the owner decide whether the issue is app, account, or management related.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'jamf-ipad-support',
        rubric: ['Names app or workflow', 'Captures scope', 'Lists safe checks'],
        keywordHints: ['device', 'app', 'scope', 'message', 'steps tried']
      }),
      categorization({
        id: 'ipad-jamf-workflow-basics-q3',
        prompt: 'Sort each clue into the best support layer.',
        domain: 'iPad and Jamf support',
        difficulty: 'challenge',
        explanation: 'Layer thinking keeps first-line action safer.',
        modelAnswer:
          'Some clues point toward the app, some toward the device or connection, and some toward the management path.',
        commonMistakes: ['Calling everything a Jamf issue', 'Skipping the app layer entirely'],
        dcsContext: 'Managed devices get easier to support when the layer is named early.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'jamf-ipad-support',
        categories: [
          { id: 'device', label: 'Device or connection layer' },
          { id: 'app', label: 'App or user workflow layer' },
          { id: 'management', label: 'Management or enrolment layer' }
        ],
        items: [
          { id: 'wifi', label: 'Only this iPad keeps dropping Wi-Fi in one room', correctCategoryId: 'device' },
          { id: 'app-open', label: 'Specific classroom app crashes on launch', correctCategoryId: 'app' },
          { id: 'fleet-policy', label: 'Several devices show the same managed restriction unexpectedly', correctCategoryId: 'management' },
          { id: 'signin-app', label: 'The app opens but the expected class workflow cannot be completed', correctCategoryId: 'app' }
        ],
        rubric: ['Sorts by layer', 'Uses scope clues', 'Supports safer triage']
      }),
      scenarioResponse({
        id: 'ipad-jamf-workflow-basics-q4',
        prompt: 'A shared iPad cart has one device that will not complete the expected login flow after a restart. Explain Joshâ€™s first-line response.',
        domain: 'iPad and Jamf support',
        difficulty: 'challenge',
        explanation: 'This combines device context, workflow evidence, and management boundaries.',
        modelAnswer:
          'Capture the cart or shared-device context, exact login-flow point that fails, whether other iPads in the cart behave normally, and any visible message after restart. Keep the action inside safe checks, then escalate if it still looks like a managed-device path issue.',
        commonMistakes: ['Treating it as a whole-cart outage with no comparison', 'Trying deep management changes without evidence'],
        dcsContext: 'Shared carts often need exact device and workflow notes to avoid broad noisy escalations.',
        reviewSchedule,
        recommendedModuleId: 'ipad-jamf-workflow-basics',
        weakTopic: 'jamf-ipad-support',
        rubric: ['Uses comparison within the cart', 'Names exact workflow point', 'Keeps management boundaries clear']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('ipad-jamf-workflow-basics', [
      {
        title: 'Single iPad versus managed fleet issue',
        prompt: 'Write the note that separates a one-device classroom problem from a wider management pattern.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('ipad-jamf-workflow-basics', [
      {
        title: 'iPad and Jamf first-response checklist',
        description: 'Create a Level 1-safe checklist for device, app, and management-layer triage on school iPads.'
      }
    ])
  }),
  createModule({
    id: 'a-plus-laptop-hardware-core1',
    title: 'A+ Core 1: Laptop hardware',
    description:
      'Laptop components, ports, upgrades, and common hardware symptoms. Focus on parts recognition and safe, evidence-driven troubleshooting.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 30,
    tags: ['A+ 220-1201', 'laptop', 'battery', 'SSD', 'ports', 'repair'],
    learningObjectives: [
      'Identify common laptop hardware parts and their purpose.',
      'Choose a safe upgrade path (RAM/storage) based on the symptom and device constraints.',
      'Describe a Level 1-safe first response for power, battery, and overheating symptoms.'
    ],
    dcsRelevance: [
      'Maps to student and staff laptop triage without turning PD notes into ticket archives.',
      'Supports faster identification of "battery/power vs performance vs thermal" symptom patterns.'
    ],
    sections: buildSections('a-plus-laptop-hardware-core1', [
      {
        title: 'Laptop parts you must recognise',
        bodyMarkdown:
          'Laptop support is mostly evidence and constraint handling: form factor limits, integrated parts, and time pressure.\n\nCore parts: battery, AC adapter/charger, DC jack, keyboard/trackpad, display panel, webcam/mic, storage (2.5" SATA, M.2 NVMe), RAM (SO-DIMM), Wiâ€‘Fi/Bluetooth card, fans and heat sinks.\n\nA safe first check is usually: power source, charger state, visible damage, and whether the symptom is power, display, storage, or thermal.',
        takeaway: 'Classify the symptom (power/display/storage/thermal) before changing settings.'
      },
      {
        title: 'Upgrades: SSDs, RAM, and what they change',
        bodyMarkdown:
          'Storage upgrades change perceived speed and reliability. RAM upgrades mainly help multitasking and memory pressure.\n\nIf the device is sluggish:\n- Check storage health and free space first.\n- SSD vs HDD matters dramatically.\n\nIf the device freezes under load:\n- Memory pressure (RAM) is likely.\n\nAlways confirm form factor (SOâ€‘DIMM vs soldered) and interface (SATA vs NVMe) before ordering parts.',
        takeaway: 'Choose upgrades based on symptom + constraints, not guesswork.'
      },
      {
        title: 'Battery and thermal symptoms (Level 1-safe)',
        bodyMarkdown:
          'Battery symptoms: wonâ€™t charge, drains fast, shuts down under load, or runs only on AC.\n\nThermal symptoms: fan noise, throttling/slow performance, shutdowns, or very hot chassis.\n\nSafe actions: check adapter, confirm charging state, check vents/airflow, and document reproducibility. Avoid disassembly unless authorised.',
        takeaway: 'Capture evidence and escalate rather than experimenting under time pressure.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-laptop-hardware-core1', [
      ['What does an M.2 slot commonly host in modern laptops?', 'An SSD (often NVMe PCIe, sometimes SATA depending on the device).'],
      ['What kind of RAM is common in laptops?', 'SOâ€‘DIMM (or soldered LPDDR in some ultrabooks).'],
      ['What symptom often suggests thermal throttling?', 'Performance slows significantly under load and improves after cooling.'],
      ['What is a safe first step for a laptop that will not power on?', 'Confirm power source/charger state and compare with known-good if available.'],
      ['SSD vs HDD: which gives the biggest everyday speed improvement?', 'SSD.'],
      ['Name two common laptop radios.', 'Wiâ€‘Fi and Bluetooth.'],
      ['What is the DC jack?', 'The laptop power input port where the charger connects.'],
      ['Why avoid disassembly as Level 1 without approval?', 'It increases risk and may exceed role boundaries.'],
      ['What does â€œruns only on ACâ€ often point to?', 'Battery failure or power-path/battery connection issues.'],
      ['What is one evidence item to capture before escalation for power issues?', 'Exact symptom + charger/LED state + AC vs battery behaviour.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-laptop-hardware-q1',
        prompt: 'A laptop is extremely slow when launching apps and opening files, but it does not freeze. Which upgrade most directly improves this symptom on an older device?',
        domain: 'A+ Core 1 laptop hardware',
        difficulty: 'foundation',
        explanation: 'Storage speed is a dominant factor for app launch and file access.',
        modelAnswer: 'Replace an HDD with an SSD (or upgrade to a faster SSD if applicable).',
        commonMistakes: ['Assuming RAM is always the first upgrade', 'Skipping evidence about disk behaviour'],
        dcsContext: 'Many â€œslow laptopâ€ reports are storage-bound. Preserve evidence and choose the smallest safe fix.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-laptop-hardware-core1',
        weakTopic: 'laptop-mobile-hardware',
        options: [
          { id: 'a', label: 'Upgrade from HDD to SSD' },
          { id: 'b', label: 'Increase screen resolution' },
          { id: 'c', label: 'Add an external keyboard' },
          { id: 'd', label: 'Disable Wiâ€‘Fi to improve performance' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-laptop-hardware-q2',
        prompt: 'A laptop becomes slow and then suddenly shuts down during a video call. The chassis feels very hot. What is the strongest first classification?',
        domain: 'A+ Core 1 laptop hardware',
        difficulty: 'foundation',
        explanation: 'Heat + shutdown strongly suggests a thermal path issue.',
        modelAnswer: 'Thermal issue (overheating / throttling leading to shutdown).',
        commonMistakes: ['Calling it a network issue', 'Jumping to OS reinstall'],
        dcsContext: 'Classroom pressure can push devices into thermal limits. Classify the symptom before deeper work.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-laptop-hardware-core1',
        weakTopic: 'laptop-mobile-hardware',
        options: [
          { id: 'a', label: 'Thermal/overheating path issue' },
          { id: 'b', label: 'DNS resolution failure' },
          { id: 'c', label: 'Printer queue issue' },
          { id: 'd', label: 'VLAN segmentation issue' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-laptop-hardware-q3',
        prompt: 'List three laptop items you should confirm before ordering a storage upgrade.',
        domain: 'A+ Core 1 laptop hardware',
        difficulty: 'stretch',
        explanation: 'Correct parts depend on form factor and interface.',
        modelAnswer: 'Confirm interface (SATA vs NVMe), form factor (2.5" vs M.2), and device compatibility/available slots/capacity.',
        commonMistakes: ['Buying the wrong interface', 'Assuming all M.2 drives are the same'],
        dcsContext: 'Wrong parts waste time and budget; evidence-based ordering matters.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-laptop-hardware-core1',
        weakTopic: 'laptop-mobile-hardware',
        rubric: ['Names interface', 'Names form factor', 'Mentions compatibility/slots/capacity'],
        keywordHints: ['SATA', 'NVMe', 'M.2', '2.5', 'slot', 'model']
      }),
      orderSteps({
        id: 'a-plus-laptop-hardware-q4',
        prompt: 'Order the safest Level 1 response for â€œlaptop will not power on.â€',
        domain: 'A+ Core 1 laptop hardware',
        difficulty: 'stretch',
        explanation: 'Start with power evidence before deeper changes.',
        modelAnswer: 'Confirm power source, check adapter/indicator, try known-good outlet/adapter, then escalate with evidence.',
        commonMistakes: ['Disassembling immediately', 'Changing BIOS settings without power evidence'],
        dcsContext: 'The priority is safe triage and minimal disruption.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-laptop-hardware-core1',
        weakTopic: 'laptop-mobile-hardware',
        steps: [
          { id: 'source', label: 'Confirm outlet / power source is working' },
          { id: 'adapter', label: 'Check adapter/charger connection and indicators' },
          { id: 'known', label: 'Test a known-good adapter or outlet if available' },
          { id: 'escalate', label: 'Escalate with evidence if still no power' }
        ],
        correctOrder: ['source', 'adapter', 'known', 'escalate'],
        rubric: ['Power evidence first', 'Uses known-good comparison', 'Escalates instead of guessing']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-laptop-hardware-core1', [
      {
        title: 'Sluggish laptop triage note (privacy-safe)',
        prompt: 'Write the note that separates storage-bound slowness from RAM pressure and thermal throttling.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-laptop-hardware-core1', [
      {
        title: 'Laptop symptom classification cheat sheet',
        description: 'Create a one-page cheat sheet: power vs display vs storage vs thermal, with safe first checks.'
      }
    ])
  }),
  createModule({
    id: 'a-plus-mobile-connectivity-mdm-core1',
    title: 'A+ Core 1: Mobile connectivity and MDM basics',
    description:
      'Mobile connections (USB, Bluetooth, NFC, tethering/hotspots) and MDM ownership models (BYOD/COPE) with safe support boundaries.',
    domain: 'Operations',
    level: 'A+',
    estimatedMinutes: 26,
    tags: ['A+ 220-1201', 'mobile', 'USB', 'Bluetooth', 'NFC', 'tethering', 'MDM'],
    learningObjectives: [
      'Choose the right connection method for the goal (charge, data, audio, internet).',
      'Explain common mobile connectivity terms simply.',
      'Describe what MDM does and how ownership models change support boundaries.'
    ],
    dcsRelevance: [
      'Useful for staff BYOD realities and school-managed iPads without mixing real data into PD notes.',
      'Builds safer judgement around â€œwhat Level 1 can doâ€ versus â€œwhat needs an MDM ownerâ€.'
    ],
    sections: buildSections('a-plus-mobile-connectivity-mdm-core1', [
      {
        title: 'Connection methods: what theyâ€™re for',
        bodyMarkdown:
          'Mobile devices connect in multiple layers:\n- USB/USBâ€‘C/Lightning: charging + data + sometimes video/audio.\n- Bluetooth: pairing accessories and short-range data.\n- NFC: extremely short-range tap interactions.\n- Hotspot/tethering: using a phone as an internet connection.\n\nClarify the goal before choosing the connection path.',
        takeaway: 'Clarify goal first: charging, data, audio, or internet.'
      },
      {
        title: 'â€œIt wonâ€™t connectâ€ triage patterns',
        bodyMarkdown:
          'Wiâ€‘Fi/mobile: capture SSID, signal, error/symptom, and scope (one device or many).\n\nBluetooth: confirm pairing mode, remove/re-pair, and check it is not paired elsewhere.\n\nHotspot: confirm hotspot is enabled and the client is authenticating to the right SSID.',
        takeaway: 'Evidence beats guessing: SSID/scope for Wiâ€‘Fi and pairing state for Bluetooth.'
      },
      {
        title: 'MDM and ownership boundaries',
        bodyMarkdown:
          'MDM is central configuration/app/policy management.\n\nOwnership models:\n- BYOD: user-owned, limited control and high privacy sensitivity.\n- COPE: org-owned with personal enablement, more control.\n\nCapture ownership context and route to the authorised owner when management changes are required.',
        takeaway: 'Ownership model determines what changes are safe and allowed.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-mobile-connectivity-mdm-core1', [
      ['What does Bluetooth primarily provide?', 'Short-range pairing for accessories and low-power data exchange.'],
      ['What is NFC?', 'Near Field Communication: very short-range tap communication (tags/auth).'],
      ['What is tethering/hotspot?', 'Using a phone as an internet connection for another device (Wiâ€‘Fi/USB/Bluetooth).'],
      ['What is MDM?', 'Central management for device configuration, apps, and security policy.'],
      ['BYOD stands for what?', 'Bring Your Own Device (user-owned).'],
      ['COPE means what?', 'Corporate-Owned, Personally Enabled (org-owned, personal use allowed).'],
      ['First evidence question for â€œWiâ€‘Fi wonâ€™t connectâ€?', 'Which SSID, what error/symptom, and is it one device or many?'],
      ['First evidence question for Bluetooth problems?', 'Is it already paired elsewhere and is it in pairing mode/discoverable?']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-mobile-connectivity-q1',
        prompt: 'Which technology is designed for very short-range â€œtapâ€ interactions such as tags or quick auth?',
        domain: 'A+ Core 1 mobile connectivity',
        difficulty: 'foundation',
        explanation: 'NFC is intentionally short-range.',
        modelAnswer: 'NFC.',
        commonMistakes: ['Confusing Bluetooth with NFC'],
        dcsContext: 'Short-range tech matters for accessories, tags, and quick device workflows.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-mobile-connectivity-mdm-core1',
        weakTopic: 'laptop-mobile-hardware',
        options: [
          { id: 'a', label: 'NFC' },
          { id: 'b', label: 'Bluetooth' },
          { id: 'c', label: 'TCP' },
          { id: 'd', label: 'DHCP' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-mobile-connectivity-q2',
        prompt: 'Why does BYOD versus COPE matter in support decisions?',
        domain: 'A+ Core 1 MDM basics',
        difficulty: 'stretch',
        explanation: 'Ownership affects allowed changes and privacy.',
        modelAnswer:
          'Because ownership determines what the organisation is allowed to manage/change and how privacy boundaries are handled; BYOD is user-owned with limited control, COPE is organisation-owned with more managed policy and app control.',
        commonMistakes: ['Treating all devices as school-owned', 'Ignoring privacy boundaries'],
        dcsContext: 'School support must respect ownership and privacy boundaries.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-mobile-connectivity-mdm-core1',
        weakTopic: 'mdm-group-policy',
        rubric: ['Mentions ownership', 'Mentions control/policy', 'Mentions privacy/boundaries'],
        keywordHints: ['BYOD', 'COPE', 'ownership', 'policy', 'privacy']
      }),
      mcq({
        id: 'a-plus-mobile-connectivity-q3',
        prompt: 'Which option best describes tethering?',
        domain: 'A+ Core 1 mobile connectivity',
        difficulty: 'foundation',
        explanation: 'Tethering uses a mobile device to provide internet connectivity to another device.',
        modelAnswer: 'Using a phone as an internet connection for another device.',
        commonMistakes: ['Calling it VLAN', 'Confusing with Bluetooth pairing'],
        dcsContext: 'Staff may use hotspots during outages; your note should use the right term.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-mobile-connectivity-mdm-core1',
        weakTopic: 'laptop-mobile-hardware',
        options: [
          { id: 'a', label: 'Using a phone as an internet connection for another device' },
          { id: 'b', label: 'Assigning IPs automatically on a LAN' },
          { id: 'c', label: 'Encrypting a Wiâ€‘Fi network with WPA3' },
          { id: 'd', label: 'Routing traffic between two subnets' }
        ],
        correctOptionId: 'a'
      }),
      orderSteps({
        id: 'a-plus-mobile-connectivity-q4',
        prompt: 'Order the best first-line triage for â€œBluetooth headset wonâ€™t connect.â€',
        domain: 'A+ Core 1 mobile connectivity',
        difficulty: 'stretch',
        explanation: 'Pairing state and re-pair fixes are common and safe.',
        modelAnswer: 'Confirm pairing mode, remove old pairing, re-pair, then test and document symptom.',
        commonMistakes: ['Changing unrelated Wiâ€‘Fi settings', 'Skipping remove/re-pair'],
        dcsContext: 'Fast safe checks matter in classrooms.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-mobile-connectivity-mdm-core1',
        weakTopic: 'laptop-mobile-hardware',
        steps: [
          { id: 'mode', label: 'Confirm the headset is in pairing mode / discoverable' },
          { id: 'forget', label: 'Remove/forget the old pairing on the device' },
          { id: 'pair', label: 'Pair again and confirm it connects' },
          { id: 'test', label: 'Test audio and record any remaining symptom for escalation' }
        ],
        correctOrder: ['mode', 'forget', 'pair', 'test'],
        rubric: ['Starts with pairing state', 'Uses remove/re-pair', 'Ends with evidence capture']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-mobile-connectivity-mdm-core1', [
      { title: 'Hotspot in an outage', prompt: 'Write the note that captures hotspot use safely without copying private details.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-mobile-connectivity-mdm-core1', [
      { title: 'Mobile connectivity quick map', description: 'Create a quick map: USB vs Bluetooth vs NFC vs hotspot, and when each is used.' }
    ])
  }),
  createModule({
    id: 'a-plus-network-core1-ports-protocols-services',
    title: 'A+ Core 1: Networking basics (ports, protocols, services)',
    description:
      'Core networking concepts: IP/TCP/UDP, common ports, and what DNS/DHCP/services do. Designed for support notes and troubleshooting.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 34,
    tags: ['A+ 220-1201', 'TCP', 'UDP', 'ports', 'DNS', 'DHCP', 'HTTP', 'HTTPS'],
    learningObjectives: [
      'Explain IP/TCP/UDP and port numbers in plain English.',
      'Recall common ports and the service they map to.',
      'Describe DNS and DHCP symptoms and how to separate them.'
    ],
    dcsRelevance: [
      'Helps you write clearer network notes (DNS vs DHCP vs â€œinternet is downâ€).',
      'Supports better escalation quality when class time is impacted.'
    ],
    sections: buildSections('a-plus-network-core1-ports-protocols-services', [
      {
        title: 'IP, TCP, UDP (what they do)',
        bodyMarkdown:
          'IP handles addressing and routing between networks. TCP provides reliable, ordered delivery. UDP is simpler and faster but does not guarantee delivery.\n\nPorts identify the application/service endpoint on a host.\n\nSupport habit: decide which layer is failing: IP reachability, name resolution (DNS), address assignment (DHCP), or an application port.',
        takeaway: 'Layer thinking prevents vague â€œnetwork is downâ€ notes.'
      },
      {
        title: 'Common ports you should recall',
        bodyMarkdown:
          'Practical set: 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 110 POP3, 143 IMAP, 389 LDAP, 443 HTTPS, 445 SMB, 3389 RDP.',
        takeaway: 'A small set of ports covers most support conversations.'
      },
      {
        title: 'DNS vs DHCP symptom splits',
        bodyMarkdown:
          'DNS failure: names fail but IP access may still work.\n\nDHCP failure: no valid lease, possible 169.254.x.x, limited connectivity.\n\nWrite notes that separate: IP reachability vs name resolution vs authentication/proxy blocks.',
        takeaway: 'Separate DNS vs DHCP vs auth/proxy symptoms in your notes.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-network-core1-ports-protocols-services', [
      ['What does IP primarily provide?', 'Addressing and routing between networks.'],
      ['What is TCP known for?', 'Reliable, ordered delivery (connection-oriented).'],
      ['What is UDP known for?', 'Lower overhead; no delivery guarantee (connectionless).'],
      ['Port 53 is used by what?', 'DNS.'],
      ['Ports 67/68 are used by what?', 'DHCP.'],
      ['Port 443 is used by what?', 'HTTPS.'],
      ['Port 3389 is used by what?', 'RDP.'],
      ['DNS failure symptom pattern?', 'Names fail; direct IP may still work.'],
      ['DHCP failure symptom pattern?', 'No valid lease; may see 169.254.x.x (APIPA).']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-network-core1-q1',
        prompt: 'A device shows 169.254.x.x and cannot reach the network. What is the most likely failing service?',
        domain: 'A+ Core 1 networking',
        difficulty: 'foundation',
        explanation: 'APIPA often appears when DHCP lease assignment fails.',
        modelAnswer: 'DHCP (address assignment).',
        commonMistakes: ['Calling it DNS', 'Assuming whole-network outage'],
        dcsContext: 'Keep the note precise: â€œno DHCP lease / APIPA seenâ€ is better than â€œinternet down.â€',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-core1-ports-protocols-services',
        weakTopic: 'dns-dhcp-gateway',
        options: [
          { id: 'a', label: 'DHCP' },
          { id: 'b', label: 'DNS' },
          { id: 'c', label: 'SMTP' },
          { id: 'd', label: 'NFC' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-network-core1-q2',
        prompt: 'Which port is most commonly associated with HTTPS?',
        domain: 'A+ Core 1 networking',
        difficulty: 'foundation',
        explanation: 'HTTPS typically uses TCP 443.',
        modelAnswer: '443.',
        commonMistakes: ['Choosing 80', 'Mixing up with 53'],
        dcsContext: 'Port recognition helps interpret firewall rules and access notes.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-core1-ports-protocols-services',
        weakTopic: 'ports-protocols',
        options: [
          { id: 'a', label: '80' },
          { id: 'b', label: '443' },
          { id: 'c', label: '53' },
          { id: 'd', label: '3389' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'a-plus-network-core1-q3',
        prompt: 'In one or two sentences, explain the difference between DNS and DHCP.',
        domain: 'A+ Core 1 networking',
        difficulty: 'stretch',
        explanation: 'These are different services with different failure symptoms.',
        modelAnswer:
          'DNS translates names to addresses. DHCP assigns IP configuration (address/gateway/DNS) to devices. DNS failures break name lookups; DHCP failures break valid address assignment.',
        commonMistakes: ['Treating DNS and DHCP as the same service'],
        dcsContext: 'Better notes come from separating these layers.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-core1-ports-protocols-services',
        weakTopic: 'network-services',
        rubric: ['Defines DNS', 'Defines DHCP', 'Mentions symptom difference'],
        keywordHints: ['names', 'address', 'lease', 'assign']
      }),
      orderSteps({
        id: 'a-plus-network-core1-q4',
        prompt: 'Order the best troubleshooting split when â€œwebsites wonâ€™t load.â€',
        domain: 'A+ Core 1 networking',
        difficulty: 'stretch',
        explanation: 'Start with reachability, then name resolution, then app path.',
        modelAnswer: 'IP reachability, then DNS, then app/auth/proxy path, then record evidence.',
        commonMistakes: ['Jumping straight to reinstalling browsers', 'Skipping DNS checks'],
        dcsContext: 'Evidence-based splits reduce noisy escalation.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-core1-ports-protocols-services',
        weakTopic: 'network-services',
        steps: [
          { id: 'ip', label: 'Confirm IP reachability (basic connectivity)' },
          { id: 'dns', label: 'Check name resolution (DNS)' },
          { id: 'app', label: 'Check app path (HTTPS/proxy/auth) if IP and DNS look OK' },
          { id: 'note', label: 'Record the split and escalate if needed' }
        ],
        correctOrder: ['ip', 'dns', 'app', 'note'],
        rubric: ['Starts with reachability', 'Separates DNS', 'Ends with evidence capture']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-network-core1-ports-protocols-services', [
      { title: 'APIPA note', prompt: 'Write a note for a 169.254/APIPA device that stays scope-aware and escalation-ready.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-network-core1-ports-protocols-services', [
      { title: 'Common ports reference card', description: 'Create a short reference card of the ports you must recall for Core 1.' }
    ])
  }),
  createModule({
    id: 'a-plus-wireless-networks-core1',
    title: 'A+ Core 1: Wireless networks',
    description:
      'Wiâ€‘Fi basics (bands/channels expectations), Bluetooth pairing, and short-range tech like NFC/RFID. Designed for fast, evidence-based support notes.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 28,
    tags: ['A+ 220-1201', 'Wiâ€‘Fi', '2.4GHz', '5GHz', 'Bluetooth', 'NFC', 'RFID'],
    learningObjectives: [
      'Explain 2.4GHz vs 5GHz trade-offs in plain language.',
      'Capture wireless scope evidence before declaring an â€œoutageâ€.',
      'Use a safe pairing triage for Bluetooth devices.'
    ],
    dcsRelevance: [
      'Helps with room-specific wireless complaints and â€œworks elsewhereâ€ patterns.',
      'Improves note quality for classroom connectivity incidents.'
    ],
    sections: buildSections('a-plus-wireless-networks-core1', [
      {
        title: '2.4GHz vs 5GHz: expectations not myths',
        bodyMarkdown:
          '2.4GHz generally reaches further and penetrates obstacles better, but is often more congested.\n\n5GHz often provides higher throughput and less interference, but shorter range.\n\nThe support skill: set expectation based on environment (crowding, walls, distance) and capture location evidence.',
        takeaway: '2.4GHz tends toward range; 5GHz tends toward speed/less congestion.'
      },
      {
        title: 'Scope evidence for wireless issues',
        bodyMarkdown:
          'Before making claims, capture:\n- where (room/location)\n- what SSID/network\n- one device vs many\n- time pattern\n- comparison device result\n\nWireless faults can be hyper-local. Your note should preserve that scope instead of flattening it into â€œWiâ€‘Fi badâ€.',
        takeaway: 'Wireless notes must include location + scope + comparison.'
      },
      {
        title: 'Bluetooth, NFC, RFID (donâ€™t mix them)',
        bodyMarkdown:
          'Bluetooth: pairing for accessories (headsets/keyboards).\n\nNFC: extremely short-range tap interactions.\n\nRFID: identification/tracking (range and implementation vary).\n\nIf you use the wrong term, you choose the wrong troubleshooting path.',
        takeaway: 'Correct terminology prevents wasted troubleshooting.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-wireless-networks-core1', [
      ['2.4GHz Wiâ€‘Fi is often better at what?', 'Range/penetration (often more congestion).'],
      ['5GHz Wiâ€‘Fi is often better at what?', 'Higher throughput/less interference (often shorter range).'],
      ['What are the 3 most important wireless note fields?', 'Location, SSID, and scope (one device vs many).'],
      ['What is a â€œcomparison deviceâ€ check?', 'Test a known-good device in the same location on the same SSID.'],
      ['Bluetooth is mainly used for what?', 'Accessory pairing and short-range connectivity.'],
      ['NFC is mainly used for what?', 'Tap-based short-range interactions (tags/auth).'],
      ['RFID is mainly used for what?', 'Identification/tracking tags.'],
      ['First action for Bluetooth issues?', 'Confirm pairing mode/discoverable and remove/re-pair if needed.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-wireless-q1',
        prompt: 'Which Wiâ€‘Fi band is generally associated with longer range but more congestion in many environments?',
        domain: 'A+ Core 1 wireless networks',
        difficulty: 'foundation',
        explanation: '2.4GHz tends to travel further and is heavily used.',
        modelAnswer: '2.4GHz.',
        commonMistakes: ['Assuming 5GHz always has longer range'],
        dcsContext: 'Room-specific complaints often relate to range/crowding. Capture evidence before guessing.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-wireless-networks-core1',
        weakTopic: 'wireless-networks',
        options: [
          { id: 'a', label: '2.4GHz' },
          { id: 'b', label: '5GHz' },
          { id: 'c', label: 'TCP' },
          { id: 'd', label: 'NFC' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-wireless-q2',
        prompt: 'A teacher says â€œWiâ€‘Fi is bad in this room but fine elsewhere.â€ What is the strongest first evidence question?',
        domain: 'A+ Core 1 wireless networks',
        difficulty: 'foundation',
        explanation: 'Scope controls everything that follows.',
        modelAnswer: 'Check whether other devices in the same room on the same SSID have the same issue.',
        commonMistakes: ['Jumping to resets', 'Assuming the device is broken'],
        dcsContext: 'Wireless problems can be location-specific in schools.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-wireless-networks-core1',
        weakTopic: 'wireless-networks',
        options: [
          { id: 'a', label: 'Do other devices in the same room on the same SSID have the issue?' },
          { id: 'b', label: 'What is the printer model?' },
          { id: 'c', label: 'What is the userâ€™s password?' },
          { id: 'd', label: 'Which BIOS version is installed?' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-wireless-q3',
        prompt: 'Which technology is most associated with identification/tracking tags in many environments?',
        domain: 'A+ Core 1 wireless networks',
        difficulty: 'foundation',
        explanation: 'RFID is widely used for identification/tracking tags.',
        modelAnswer: 'RFID.',
        commonMistakes: ['Mixing up NFC and RFID'],
        dcsContext: 'Correct wording improves vendor/system-owner communication.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-wireless-networks-core1',
        weakTopic: 'wireless-networks',
        options: [
          { id: 'a', label: 'RFID' },
          { id: 'b', label: 'UDP' },
          { id: 'c', label: 'SSH' },
          { id: 'd', label: 'RDP' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-wireless-q4',
        prompt: 'List three evidence items you should capture before escalating a â€œWiâ€‘Fi bad in one roomâ€ report.',
        domain: 'A+ Core 1 wireless networks',
        difficulty: 'stretch',
        explanation: 'Wireless issues are often location-specific; evidence must capture that.',
        modelAnswer: 'Room/location, SSID, scope (one device vs many), and comparison device result (any three).',
        commonMistakes: ['Writing only â€œWiâ€‘Fi downâ€', 'Skipping scope'],
        dcsContext: 'Room-based evidence makes escalations actionable.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-wireless-networks-core1',
        weakTopic: 'wireless-networks',
        rubric: ['Includes location', 'Includes SSID', 'Includes scope/comparison'],
        keywordHints: ['room', 'SSID', 'scope', 'device', 'compare']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-wireless-networks-core1', [
      { title: 'Room-specific Wiâ€‘Fi note', prompt: 'Write an escalation note for a room-specific Wiâ€‘Fi issue that impacts learning.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-wireless-networks-core1', [
      { title: 'Wireless evidence checklist', description: 'Create a checklist of the evidence fields you always capture for wireless issues.' }
    ])
  }),
  createModule({
    id: 'a-plus-network-devices-tools-core1',
    title: 'A+ Core 1: Network devices and tools',
    description:
      'Routers, switches, access points, firewalls, PoE, modems/ONTs, and the common field tools you use to gather evidence.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 30,
    tags: ['A+ 220-1201', 'router', 'switch', 'AP', 'firewall', 'PoE', 'tools'],
    learningObjectives: [
      'Describe the role of common network devices.',
      'Choose a simple tool for the evidence you need (cable tester, tone generator, Wiâ€‘Fi analyser, loopback).',
      'Write a note that separates â€œdeviceâ€, â€œpathâ€, and â€œscopeâ€.'
    ],
    dcsRelevance: [
      'Useful when escalating room/network-path issues without overclaiming root cause.',
      'Improves confidence in describing infrastructure components accurately.'
    ],
    sections: buildSections('a-plus-network-devices-tools-core1', [
      {
        title: 'Devices: what they do (plain English)',
        bodyMarkdown:
          'Router: connects networks and routes traffic.\n\nSwitch: connects devices within a network.\n\nAccess point (AP): provides wireless access to a wired network.\n\nFirewall: filters traffic based on rules.\n\nModem/ONT: termination device from the provider (cable/DSL/fiber).\n\nPoE: power delivered over Ethernet (commonly used for APs/phones/cameras).',
        takeaway: 'Use device-role language in your notes (router vs switch vs AP).'
      },
      {
        title: 'Tools: match tool to evidence',
        bodyMarkdown:
          'Cable tester: verifies wiring continuity/ordering.\n\nTone generator + probe: trace a cable through a bundle/patch panel.\n\nWiâ€‘Fi analyser: shows SSIDs, channel use, signal strength.\n\nLoopback plug: test a port/NIC at a basic level.\n\nUse tools to reduce uncertainty; donâ€™t replace evidence with guesses.',
        takeaway: 'Tools are for evidence capture, not for showing off.'
      },
      {
        title: 'Structured cabling: patch panels and tracing',
        bodyMarkdown:
          'Patch panels and wall ports are part of structured cabling. A device may be fine while the path is broken (wrong patch, damaged lead, wrong port).\n\nUse a tone generator/probe to trace, and a cable tester to validate.\n\nWrite notes that describe the path: room port â†’ patch panel â†’ switch â†’ uplink, without claiming root cause.',
        takeaway: 'Path description is evidence; root cause is a separate step.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-network-devices-tools-core1', [
      ['What does a router do?', 'Routes traffic between networks.'],
      ['What does a switch do?', 'Connects devices within a network.'],
      ['What does an access point do?', 'Connects wireless clients to a wired network.'],
      ['What does a firewall do?', 'Filters traffic based on rules.'],
      ['What is PoE?', 'Power over Ethernet (power delivered via Ethernet cabling).'],
      ['What does a cable tester tell you?', 'Whether the cable is wired/continuous correctly.'],
      ['What does a tone generator help with?', 'Tracing a cable through patch panels/bundles.'],
      ['What does a Wiâ€‘Fi analyser help with?', 'SSID visibility, signal strength, channel usage.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-net-devices-q1',
        prompt: 'Which device most directly provides wireless connectivity to a wired network?',
        domain: 'A+ Core 1 network devices',
        difficulty: 'foundation',
        explanation: 'An access point bridges wireless clients to wired LAN.',
        modelAnswer: 'Access point.',
        commonMistakes: ['Choosing router when AP is the direct Wiâ€‘Fi device'],
        dcsContext: 'Room issues often relate to AP path; name it correctly in escalations.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-devices-tools-core1',
        weakTopic: 'network-tools-devices',
        options: [
          { id: 'a', label: 'Access point' },
          { id: 'b', label: 'Patch panel' },
          { id: 'c', label: 'UPS' },
          { id: 'd', label: 'CPU' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-net-devices-q2',
        prompt: 'Which tool is most appropriate to verify an Ethernet cable is wired correctly end-to-end?',
        domain: 'A+ Core 1 network tools',
        difficulty: 'foundation',
        explanation: 'Cable testers validate wiring and continuity.',
        modelAnswer: 'Cable tester.',
        commonMistakes: ['Choosing Wiâ€‘Fi analyser for a cable problem'],
        dcsContext: 'Use the simplest tool that answers the evidence question.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-devices-tools-core1',
        weakTopic: 'network-tools-devices',
        options: [
          { id: 'a', label: 'Cable tester' },
          { id: 'b', label: 'Punch-down tool' },
          { id: 'c', label: 'Wiâ€‘Fi analyser' },
          { id: 'd', label: 'Stylus' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-net-devices-q3',
        prompt: 'In one sentence each, describe router vs switch vs access point.',
        domain: 'A+ Core 1 network devices',
        difficulty: 'stretch',
        explanation: 'This checks core device-role clarity.',
        modelAnswer:
          'Router routes between networks. Switch connects devices within a network. Access point provides wireless connectivity to a wired network.',
        commonMistakes: ['Using router for everything', 'Mixing AP and switch roles'],
        dcsContext: 'Correct device-role language improves escalation notes.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-devices-tools-core1',
        weakTopic: 'network-tools-devices',
        rubric: ['Defines router', 'Defines switch', 'Defines access point'],
        keywordHints: ['between networks', 'within network', 'wireless']
      }),
      mcq({
        id: 'a-plus-net-devices-q4',
        prompt: 'A tech needs to trace which patch-panel port connects to a classroom wall socket. Which tool is most appropriate?',
        domain: 'A+ Core 1 network tools',
        difficulty: 'foundation',
        explanation: 'Tone generator/probe is used to trace cabling paths.',
        modelAnswer: 'Tone generator and probe.',
        commonMistakes: ['Choosing Wiâ€‘Fi analyser'],
        dcsContext: 'Tracing is common in schools when room ports are unclear.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-network-devices-tools-core1',
        weakTopic: 'network-tools-devices',
        options: [
          { id: 'a', label: 'Tone generator and probe' },
          { id: 'b', label: 'Stylus' },
          { id: 'c', label: 'Thermal paste' },
          { id: 'd', label: 'Display adapter' }
        ],
        correctOptionId: 'a'
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-network-devices-tools-core1', [
      { title: 'Room network escalation', prompt: 'Write a note that escalates a likely room/AP/path issue without inventing a root cause.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-network-devices-tools-core1', [
      { title: 'Network tools mini-kit', description: 'Draft a small â€œevidence kitâ€ list and what each tool proves.' }
    ])
  }),
  createModule({
    id: 'a-plus-displays-video-core1',
    title: 'A+ Core 1: Displays and video troubleshooting',
    description:
      'Display types and attributes, plus the practical â€œdisplay chainâ€ troubleshooting youâ€™ll use in classrooms.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 28,
    tags: ['A+ 220-1201', 'LCD', 'OLED', 'resolution', 'refresh rate', 'HDMI', 'DisplayPort'],
    learningObjectives: [
      'Describe key display attributes (resolution, refresh, pixel density, colour).',
      'Use a â€œdisplay chainâ€ troubleshooting approach.',
      'Separate â€œpicture worksâ€ from â€œtouch/audio/controlâ€ paths in notes.'
    ],
    dcsRelevance: [
      'Directly supports ViewBoard/HDMI/USBâ€‘C classroom incidents.',
      'Improves your ability to preserve â€œsymptom splitâ€ evidence for escalation.'
    ],
    sections: buildSections('a-plus-displays-video-core1', [
      {
        title: 'Display types and what they imply',
        bodyMarkdown:
          'Common types: LCD (with backlight), OLED, and touchscreen layers.\n\nSupport habit: focus on symptoms you can observe: no picture, wrong input, wrong mode (duplicate/extend), flicker, dead pixels, dim backlight, or touch-only failure.',
        takeaway: 'Describe observable symptoms before guessing hardware failure.'
      },
      {
        title: 'Attributes you should recall',
        bodyMarkdown:
          'Resolution = pixel dimensions.\n\nRefresh rate = how often the image updates.\n\nPixel density = clarity at a given size.\n\nColour gamut/accuracy = colour capability.\n\nThese influence the â€œbest matchâ€ monitor choice and help explain why a display â€œfeels wrongâ€ even when it works.',
        takeaway: 'Know the language: resolution vs refresh vs pixel density.'
      },
      {
        title: 'Display chain troubleshooting',
        bodyMarkdown:
          'Fast chain checks:\n- power and input/source\n- cable/adapters seated\n- correct port on both ends\n- display mode (Win+P)\n- known-good cable/adapter\n\nIf picture works but touch/audio fails, treat those as separate paths.',
        takeaway: 'Chain first. Separate picture vs touch/audio paths.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-displays-video-core1', [
      ['What is resolution?', 'The pixel dimensions of a display output (e.g., 1920Ã—1080).'],
      ['What is refresh rate?', 'How often the image updates per second (Hz).'],
      ['What does pixel density affect?', 'Perceived sharpness/clarity.'],
      ['First 2 checks for â€œno displayâ€?', 'Power/input selection, then cable/adapter seating.'],
      ['What Windows shortcut helps change display mode?', 'Windows + P.'],
      ['What does â€œpicture works but touch failsâ€ imply?', 'Touch is on a separate path (often USB/control).'],
      ['Best way to reduce uncertainty quickly in cabling?', 'Swap to a known-good cable/adapter.'],
      ['What is a â€œdisplay chainâ€?', 'Source device â†’ adapter/cable â†’ display input/source â†’ output mode.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-displays-q1',
        prompt: 'A teacher laptop picture shows on the display, but touch does not work. What is the best next reasoning step?',
        domain: 'A+ Core 1 displays',
        difficulty: 'foundation',
        explanation: 'Touch often uses a different connection than video.',
        modelAnswer: 'Treat touch as a separate path and check the USB/control connection.',
        commonMistakes: ['Restarting the whole chain with no symptom distinction'],
        dcsContext: 'Preserving symptom splits saves classroom time and improves escalation notes.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-displays-video-core1',
        weakTopic: 'display-cables-connectors',
        options: [
          { id: 'a', label: 'Treat touch as a separate path and check USB/control connection' },
          { id: 'b', label: 'Assume the network is down' },
          { id: 'c', label: 'Factory reset the display immediately' },
          { id: 'd', label: 'Delete the printer queue' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-displays-q2',
        prompt: 'Which term describes how often the image updates on a display?',
        domain: 'A+ Core 1 displays',
        difficulty: 'foundation',
        explanation: 'Refresh rate is measured in Hz.',
        modelAnswer: 'Refresh rate.',
        commonMistakes: ['Mixing refresh with resolution'],
        dcsContext: 'Using accurate terms improves hardware discussions.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-displays-video-core1',
        weakTopic: 'display-cables-connectors',
        options: [
          { id: 'a', label: 'Refresh rate' },
          { id: 'b', label: 'Resolution' },
          { id: 'c', label: 'Subnet mask' },
          { id: 'd', label: 'DHCP scope' }
        ],
        correctOptionId: 'a'
      }),
      orderSteps({
        id: 'a-plus-displays-q3',
        prompt: 'Order the fastest â€œdisplay chainâ€ checks for a no-picture classroom issue.',
        domain: 'A+ Core 1 displays',
        difficulty: 'stretch',
        explanation: 'Start with power/input, then seating, then mode, then known-good swap.',
        modelAnswer: 'Confirm input/source, reseat cable/adapter, check Win+P mode, then swap known-good.',
        commonMistakes: ['Skipping input selection', 'Jumping to deep driver reinstalls'],
        dcsContext: 'Classroom time pressure rewards fast chain checks.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-displays-video-core1',
        weakTopic: 'display-cables-connectors',
        steps: [
          { id: 'input', label: 'Confirm display power and selected input/source' },
          { id: 'seat', label: 'Reseat cable/adapter on both ends' },
          { id: 'mode', label: 'Check display mode (Windows + P)' },
          { id: 'swap', label: 'Swap to a known-good cable/adapter if still failing' }
        ],
        correctOrder: ['input', 'seat', 'mode', 'swap'],
        rubric: ['Starts with input', 'Uses seating checks', 'Uses mode check', 'Uses known-good swap']
      }),
      shortAnswer({
        id: 'a-plus-displays-q4',
        prompt: 'Name two display attributes and what they affect.',
        domain: 'A+ Core 1 displays',
        difficulty: 'stretch',
        explanation: 'Attributes help explain â€œworks but feels wrongâ€ issues.',
        modelAnswer: 'Resolution affects pixel detail; refresh rate affects smoothness; pixel density affects sharpness (any two).',
        commonMistakes: ['Mixing terms with no effect'],
        dcsContext: 'Clear language improves discussions about monitor choices and issues.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-displays-video-core1',
        weakTopic: 'display-cables-connectors',
        rubric: ['Names an attribute', 'Explains its effect', 'Names second attribute/effect'],
        keywordHints: ['resolution', 'refresh', 'pixel density', 'colour']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-displays-video-core1', [
      { title: 'No display in class', prompt: 'Write the classroom note that captures chain checks and current fallback.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-displays-video-core1', [
      { title: 'Display chain checklist', description: 'Write a 60-second checklist for â€œno displayâ€ troubleshooting that stays Level 1-safe.' }
    ])
  }),
  createModule({
    id: 'a-plus-memory-storage-raid-core1',
    title: 'A+ Core 1: Memory, storage, and RAID',
    description:
      'RAM basics, storage types (HDD/SSD/NVMe), and RAID concepts with a support-focused lens (symptoms and evidence).',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 34,
    tags: ['A+ 220-1201', 'RAM', 'DDR', 'SSD', 'NVMe', 'HDD', 'RAID'],
    learningObjectives: [
      'Explain RAM vs storage roles in plain language.',
      'Differentiate HDD, SSD, NVMe, and form factors.',
      'Recall what common RAID levels optimise for.'
    ],
    dcsRelevance: [
      'Improves â€œslow vs failing driveâ€ reasoning in device triage.',
      'Helps explain data-risk and escalation urgency when storage shows warning signs.'
    ],
    sections: buildSections('a-plus-memory-storage-raid-core1', [
      {
        title: 'RAM vs storage (what they do)',
        bodyMarkdown:
          'RAM is short-term working memory. Storage is long-term data persistence.\n\nLow RAM symptoms: heavy swapping, freezes under multitasking.\n\nStorage symptoms: slow launches, read/write errors, missing drive, corruption warnings, unusual noises (HDD).',
        takeaway: 'Classify â€œmemory pressureâ€ vs â€œstorage failureâ€ symptoms.'
      },
      {
        title: 'Storage types youâ€™ll see',
        bodyMarkdown:
          'HDD: spinning disk, slower, mechanical failure risks.\n\nSSD: faster, no moving parts.\n\nNVMe: SSD over PCIe, very fast.\n\nForm factors: 2.5" SATA, M.2.\n\nSupport habit: confirm interface + form factor before ordering parts.',
        takeaway: 'NVMe is an interface/protocol path; M.2 is a form factor.'
      },
      {
        title: 'RAID: the point of the levels',
        bodyMarkdown:
          'RAID 0: speed, no redundancy.\n\nRAID 1: mirror, redundancy.\n\nRAID 5: parity, redundancy with efficiency (needs 3+ drives).\n\nRAID 10 (1+0): mirrored stripes, performance + redundancy.\n\nRAID is not a backup. It is availability/performance design.',
        takeaway: 'RAID â‰  backup.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-memory-storage-raid-core1', [
      ['What is RAM used for?', 'Short-term working memory for active processes.'],
      ['What is storage used for?', 'Long-term data persistence (files/OS/apps).'],
      ['HDD vs SSD: key difference?', 'HDD has moving parts and is slower; SSD has no moving parts and is faster.'],
      ['What is NVMe?', 'A protocol/interface for SSDs over PCIe (very fast).'],
      ['M.2 is best described as what?', 'A form factor for internal expansion (often SSDs).'],
      ['What does RAID 0 optimise for?', 'Performance (no redundancy).'],
      ['What does RAID 1 optimise for?', 'Redundancy via mirroring.'],
      ['Is RAID a backup?', 'No. RAID is not a backup.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-storage-q1',
        prompt: 'Which RAID level provides redundancy by mirroring data across two drives?',
        domain: 'A+ Core 1 storage',
        difficulty: 'foundation',
        explanation: 'RAID 1 is mirroring.',
        modelAnswer: 'RAID 1.',
        commonMistakes: ['Choosing RAID 0'],
        dcsContext: 'Correct RAID language helps when describing server/storage systems to senior ICT.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-memory-storage-raid-core1',
        weakTopic: 'memory-storage-raid',
        options: [
          { id: 'a', label: 'RAID 0' },
          { id: 'b', label: 'RAID 1' },
          { id: 'c', label: 'RAID 5' },
          { id: 'd', label: 'RAID 6' }
        ],
        correctOptionId: 'b'
      }),
      mcq({
        id: 'a-plus-storage-q2',
        prompt: 'Which statement is most accurate?',
        domain: 'A+ Core 1 storage',
        difficulty: 'foundation',
        explanation: 'RAID improves availability/performance but does not replace backups.',
        modelAnswer: 'RAID is not a backup.',
        commonMistakes: ['Assuming RAID replaces backups'],
        dcsContext: 'This distinction matters for risk judgement and escalation notes.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-memory-storage-raid-core1',
        weakTopic: 'memory-storage-raid',
        options: [
          { id: 'a', label: 'RAID is a backup' },
          { id: 'b', label: 'RAID is not a backup' },
          { id: 'c', label: 'NVMe is a form factor' },
          { id: 'd', label: 'RAM is long-term storage' }
        ],
        correctOptionId: 'b'
      }),
      mcq({
        id: 'a-plus-storage-q3',
        prompt: 'Which RAID level optimises for performance but provides no redundancy?',
        domain: 'A+ Core 1 storage',
        difficulty: 'foundation',
        explanation: 'RAID 0 is striping only.',
        modelAnswer: 'RAID 0.',
        commonMistakes: ['Choosing RAID 1'],
        dcsContext: 'Knowing redundancy helps judge risk and escalation urgency.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-memory-storage-raid-core1',
        weakTopic: 'memory-storage-raid',
        options: [
          { id: 'a', label: 'RAID 0' },
          { id: 'b', label: 'RAID 1' },
          { id: 'c', label: 'RAID 5' },
          { id: 'd', label: 'RAID 10' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-storage-q4',
        prompt: 'Explain the difference between NVMe and M.2.',
        domain: 'A+ Core 1 storage',
        difficulty: 'stretch',
        explanation: 'One is an interface/protocol path; the other is a form factor.',
        modelAnswer: 'NVMe is a storage protocol/interface over PCIe; M.2 is a physical form factor that can host different interfaces (often NVMe SSDs).',
        commonMistakes: ['Treating NVMe and M.2 as the same thing'],
        dcsContext: 'Correct terminology avoids ordering the wrong parts.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-memory-storage-raid-core1',
        weakTopic: 'memory-storage-raid',
        rubric: ['Defines NVMe', 'Defines M.2', 'States they are different categories'],
        keywordHints: ['protocol', 'PCIe', 'form factor']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-memory-storage-raid-core1', [
      { title: 'Drive health escalation', prompt: 'Write the note that escalates a likely drive failure with evidence and urgency without panic.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-memory-storage-raid-core1', [
      { title: 'Storage symptom map', description: 'Create a map: slow vs errors vs missing drive vs corruption, and what evidence to capture.' }
    ])
  }),
  createModule({
    id: 'a-plus-motherboards-cpu-power-cooling-core1',
    title: 'A+ Core 1: Motherboards, CPU, power, and cooling',
    description:
      'Board form factors, BIOS/UEFI basics, TPM/HSM concepts, CPU features, power supplies, and cooling symptoms.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 36,
    tags: ['A+ 220-1201', 'motherboard', 'BIOS', 'UEFI', 'TPM', 'CPU', 'PSU', 'cooling'],
    learningObjectives: [
      'Describe what BIOS/UEFI does at startup.',
      'Recognise power supply and cooling symptom patterns.',
      'Explain TPM at a high level and why it matters.'
    ],
    dcsRelevance: [
      'Supports better triage language when devices fail at boot or show power/thermal symptoms.',
      'Helps you avoid risky â€œdeep BIOSâ€ changes without evidence/approval.'
    ],
    sections: buildSections('a-plus-motherboards-cpu-power-cooling-core1', [
      {
        title: 'Motherboards and form factors',
        bodyMarkdown:
          'Form factors: ATX, microâ€‘ATX, ITX.\n\nExpansion: PCIe slots.\n\nConnections: power, storage interfaces, header pins.\n\nSupport habit: capture the exact symptom before opening casesâ€”POST error, beep pattern, no display, or power cycling.',
        takeaway: 'Boot failure notes need the exact startup symptom.'
      },
      {
        title: 'BIOS/UEFI and secure hardware',
        bodyMarkdown:
          'BIOS/UEFI initialises hardware and starts the boot process. It controls boot order and basic device settings.\n\nTPM (Trusted Platform Module) supports secure key storage and device trust flows.\n\nAs Level 1: avoid experimental BIOS changes; document the symptom and escalate if itâ€™s beyond safe checks.',
        takeaway: 'BIOS changes are high-impactâ€”capture evidence first.'
      },
      {
        title: 'Power and cooling symptoms',
        bodyMarkdown:
          'Power issues: no power, power cycling, random shutdowns.\n\nCooling issues: fan noise, thermal throttling, shutdown under load.\n\nSafe first actions: check power source/cable, reduce dust/blocked airflow externally, and document reproducibility.',
        takeaway: 'Power/cooling issues are often hardware-path problems; treat them as evidence problems.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-motherboards-cpu-power-cooling-core1', [
      ['What does BIOS/UEFI do?', 'Initialises hardware and starts the boot process (controls boot settings).'],
      ['Name a common motherboard form factor.', 'ATX, microâ€‘ATX, or ITX.'],
      ['What does PCIe provide?', 'Expansion connectivity for add-in cards (GPU/NIC/etc.).'],
      ['What is a TPM?', 'A secure hardware module for storing keys and supporting device trust/security.'],
      ['What symptom suggests thermal throttling?', 'Performance slows under load and improves after cooling.'],
      ['What is a safe first step for random shutdowns?', 'Check power/airflow basics and capture when it happens (under load/heat).'],
      ['What is POST?', 'Power-On Self Test: startup checks that occur before the OS loads.'],
      ['What is one safe â€œpower evidenceâ€ item to capture?', 'LED state, adapter/PSU state, and whether it powers at all or cycles.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-board-q1',
        prompt: 'What is the primary role of BIOS/UEFI?',
        domain: 'A+ Core 1 motherboards',
        difficulty: 'foundation',
        explanation: 'BIOS/UEFI initialises hardware and begins boot.',
        modelAnswer: 'Initialise hardware and start the boot process.',
        commonMistakes: ['Calling it an operating system component'],
        dcsContext: 'Boot issues need correct language to escalate effectively.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-motherboards-cpu-power-cooling-core1',
        weakTopic: 'motherboards-cpu-power-cooling',
        options: [
          { id: 'a', label: 'Initialise hardware and start the boot process' },
          { id: 'b', label: 'Provide DNS resolution' },
          { id: 'c', label: 'Manage printer queues' },
          { id: 'd', label: 'Encrypt Wiâ€‘Fi traffic' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-board-q2',
        prompt: 'A laptop slows dramatically under load and then shuts down; the chassis is hot. What is the most likely category?',
        domain: 'A+ Core 1 power/cooling',
        difficulty: 'foundation',
        explanation: 'Heat + shutdown suggests thermal path.',
        modelAnswer: 'Thermal/cooling issue.',
        commonMistakes: ['Calling it DNS', 'Calling it VLAN'],
        dcsContext: 'Classroom pressure makes thermal issues visible; capture evidence and route appropriately.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-motherboards-cpu-power-cooling-core1',
        weakTopic: 'hardware-troubleshooting',
        options: [
          { id: 'a', label: 'Thermal/cooling issue' },
          { id: 'b', label: 'DNS issue' },
          { id: 'c', label: 'Printer maintenance issue' },
          { id: 'd', label: 'DHCP scope issue' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-board-q3',
        prompt: 'What is a TPM used for at a high level?',
        domain: 'A+ Core 1 motherboards',
        difficulty: 'stretch',
        explanation: 'TPM concepts matter for modern device security and trust.',
        modelAnswer: 'A TPM securely stores cryptographic keys and supports device trust/security features such as secure boot and authentication flows.',
        commonMistakes: ['Treating it as a storage drive'],
        dcsContext: 'Understanding TPM helps interpret modern device security language.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-motherboards-cpu-power-cooling-core1',
        weakTopic: 'motherboards-cpu-power-cooling',
        rubric: ['Mentions secure key storage', 'Mentions trust/security purpose'],
        keywordHints: ['keys', 'secure', 'trust', 'crypto']
      }),
      orderSteps({
        id: 'a-plus-board-q4',
        prompt: 'Order the safest first-line response for a desktop that will not power on.',
        domain: 'A+ Core 1 power',
        difficulty: 'stretch',
        explanation: 'Start with external power evidence and minimal-risk checks.',
        modelAnswer: 'Confirm outlet/power, check cable/switch, test known-good if possible, then escalate.',
        commonMistakes: ['Opening the case immediately', 'Replacing parts without evidence'],
        dcsContext: 'Evidence-first notes reduce downtime and rework.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-motherboards-cpu-power-cooling-core1',
        weakTopic: 'hardware-troubleshooting',
        steps: [
          { id: 'outlet', label: 'Confirm power source/outlet is working' },
          { id: 'cable', label: 'Check power cable and power switch/state' },
          { id: 'known', label: 'Try known-good cable/outlet/PSU test if available' },
          { id: 'escalate', label: 'Escalate with evidence if still no power' }
        ],
        correctOrder: ['outlet', 'cable', 'known', 'escalate'],
        rubric: ['Starts externally', 'Uses known-good comparison', 'Escalates with evidence']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-motherboards-cpu-power-cooling-core1', [
      { title: 'Boot failure note', prompt: 'Write a note for a device that fails at boot without inventing a root cause.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-motherboards-cpu-power-cooling-core1', [
      { title: 'Power/thermal triage checklist', description: 'Create a safe checklist for power and overheating symptoms.' }
    ])
  }),
  createModule({
    id: 'a-plus-printers-mfd-core1',
    title: 'A+ Core 1: Printers and multifunction devices',
    description:
      'Printer types, common maintenance items, and troubleshooting patterns that separate queue, release, and device-quality issues.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 32,
    tags: ['A+ 220-1201', 'laser', 'inkjet', 'thermal', 'impact', 'MFD', 'maintenance'],
    learningObjectives: [
      'Differentiate printer technologies (laser/inkjet/thermal/impact).',
      'Recognise maintenance/consumable symptom patterns.',
      'Write a note that preserves â€œqueue vs device quality vs releaseâ€ evidence.'
    ],
    dcsRelevance: [
      'Printing is a high-frequency school support theme; good layer notes reduce repeat work.',
      'Follow-Me/release patterns benefit from clear evidence capture.'
    ],
    sections: buildSections('a-plus-printers-mfd-core1', [
      {
        title: 'Printer types (what they mean)',
        bodyMarkdown:
          'Laser: toner + fuser; common for high volume.\n\nInkjet: ink cartridges + print heads.\n\nThermal: heat + thermal paper.\n\nImpact: dot-matrix style physical impact.\n\nTechnology informs the likely maintenance path and symptoms.',
        takeaway: 'Printer type changes the likely failure path.'
      },
      {
        title: 'Maintenance and â€œquality vs deliveryâ€',
        bodyMarkdown:
          'Delivery issues: job stuck, queue full, release/auth issues.\n\nQuality issues: faded prints, streaks, toner rub-off, smudges, misalignment.\n\nIf copying at the device is also bad, it strengthens the device-quality path rather than workstation/queue.',
        takeaway: 'Copy+print scope is a strong device-quality clue.'
      },
      {
        title: 'Troubleshooting split: queue, release, device, quality',
        bodyMarkdown:
          'A useful print note preserves the failure layer:\n- submission/queue (job leaves workstation?)\n- release/auth (Followâ€‘Me style?)\n- device output (paper path, consumables)\n- quality (streaks, rub-off, faded)\n\nLayer notes prevent endless re-triage.',
        takeaway: 'Write the failure layer in the first line of the note.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-printers-mfd-core1', [
      ['Laser printers primarily use what consumable?', 'Toner.'],
      ['What component heats toner onto the page?', 'Fuser.'],
      ['Inkjet printers primarily use what consumable?', 'Ink cartridges / print heads.'],
      ['Thermal printers require what special media?', 'Thermal paper.'],
      ['What is a strong clue for â€œdevice-qualityâ€ fault?', 'Copying directly at the device also looks bad.'],
      ['What is a strong clue for â€œqueue/releaseâ€ fault?', 'Jobs appear in system but do not release/print as expected.'],
      ['If the queue looks fine but nothing prints, what layer might be failing?', 'Release/authentication or the device itself.'],
      ['What is a weak print note?', 'â€œPrinter brokenâ€ with no layer evidence or symptom details.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-printers-q1',
        prompt: 'A printer produces pages but the toner rubs off easily. Which printer type is this most associated with?',
        domain: 'A+ Core 1 printers',
        difficulty: 'foundation',
        explanation: 'Toner rub-off implies laser printing path (fuser/toner).',
        modelAnswer: 'Laser printer.',
        commonMistakes: ['Choosing inkjet without considering toner clue'],
        dcsContext: 'Quality symptoms should be written precisely in escalation notes.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-printers-mfd-core1',
        weakTopic: 'printers-maintenance',
        options: [
          { id: 'a', label: 'Laser' },
          { id: 'b', label: 'Inkjet' },
          { id: 'c', label: 'RFID' },
          { id: 'd', label: 'NFC' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-printers-q2',
        prompt: 'A staff member reports bad print quality. The same issue happens when copying directly at the device. What does this most strongly suggest?',
        domain: 'A+ Core 1 printers',
        difficulty: 'foundation',
        explanation: 'Copy path bypasses the workstation and print queue.',
        modelAnswer: 'A device-quality/consumable path issue.',
        commonMistakes: ['Blaming drivers immediately'],
        dcsContext: 'This clue saves time and routes the issue correctly.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-printers-mfd-core1',
        weakTopic: 'printers-maintenance',
        options: [
          { id: 'a', label: 'Device-quality/consumable issue' },
          { id: 'b', label: 'DNS issue' },
          { id: 'c', label: 'Wrong VLAN' },
          { id: 'd', label: 'Browser cache issue' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-printers-q3',
        prompt: 'Thermal printers require which special media to print?',
        domain: 'A+ Core 1 printers',
        difficulty: 'foundation',
        explanation: 'Thermal printers use heat-sensitive media.',
        modelAnswer: 'Thermal paper.',
        commonMistakes: ['Choosing toner'],
        dcsContext: 'Knowing printer types improves symptom interpretation.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-printers-mfd-core1',
        weakTopic: 'printers-maintenance',
        options: [
          { id: 'a', label: 'Thermal paper' },
          { id: 'b', label: 'Toner' },
          { id: 'c', label: 'ECC RAM' },
          { id: 'd', label: 'Fiber optic cable' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-printers-q4',
        prompt: 'Give one clue that indicates a device-quality fault and one clue that indicates a queue/release fault.',
        domain: 'A+ Core 1 printers',
        difficulty: 'stretch',
        explanation: 'This reinforces layer thinking.',
        modelAnswer:
          'Device-quality clue: copying at the device is also bad / toner rub-off / streaks. Queue/release clue: jobs appear submitted but do not release/print (authentication/release stage).',
        commonMistakes: ['Listing only one layer', 'Calling every issue â€œdriverâ€'],
        dcsContext: 'Layer evidence reduces rework and improves escalations.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-printers-mfd-core1',
        weakTopic: 'printers-maintenance',
        rubric: ['Gives a device-quality clue', 'Gives a queue/release clue'],
        keywordHints: ['copy', 'quality', 'queue', 'release', 'auth']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-printers-mfd-core1', [
      { title: 'Queue vs device-quality note', prompt: 'Write a note that separates queue/release issues from device-quality issues.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-printers-mfd-core1', [
      { title: 'Printer layer checklist', description: 'Create a checklist: workstation â†’ queue â†’ release â†’ device â†’ quality, and what evidence each layer needs.' }
    ])
  }),
  createModule({
    id: 'a-plus-virtualization-cloud-core1',
    title: 'A+ Core 1: Virtualization and cloud computing',
    description:
      'Virtualization concepts (hypervisors, VMs, containers, VDI) and cloud models/characteristics (IaaS/PaaS/SaaS, elasticity, availability).',
    domain: 'Cloud and Platforms',
    level: 'A+',
    estimatedMinutes: 32,
    tags: ['A+ 220-1201', 'virtualization', 'hypervisor', 'VDI', 'containers', 'SaaS', 'IaaS', 'PaaS'],
    learningObjectives: [
      'Explain virtualization in plain language and why it is used.',
      'Differentiate IaaS, PaaS, and SaaS with school-relevant examples.',
      'Recognise VDI and container concepts at a support level.'
    ],
    dcsRelevance: [
      'Helps connect â€œcloudâ€ concepts to real school platforms and support boundaries.',
      'Supports better judgement about what can be fixed locally vs what is vendor/platform-owned.'
    ],
    sections: buildSections('a-plus-virtualization-cloud-core1', [
      {
        title: 'Virtualization: the core idea',
        bodyMarkdown:
          'Virtualization runs multiple operating environments on shared hardware.\n\nHypervisors manage virtual machines.\n\nType 1 hypervisor runs on bare metal; Type 2 runs on top of an OS.\n\nVDI delivers a desktop session from central infrastructure.\n\nContainers package apps with dependencies; they share the host OS kernel.',
        takeaway: 'VMs virtualize whole machines; containers virtualize application environments.'
      },
      {
        title: 'Cloud models: IaaS, PaaS, SaaS',
        bodyMarkdown:
          'IaaS: provider gives infrastructure; you manage OS/apps.\n\nPaaS: provider gives a platform/runtime; you manage your app.\n\nSaaS: provider gives the whole app; you manage usage and configuration.\n\nSupport habit: identify what layer you own vs what the provider owns.',
        takeaway: 'Ownership/layer thinking is the real cloud skill.'
      },
      {
        title: 'Cloud characteristics you should recall',
        bodyMarkdown:
          'Common characteristics: elasticity (scale), availability (resilience), metered usage, multi-tenancy, and remote accessibility.\n\nIn support notes, the key is not reciting buzzwords â€” it is stating what is impacted and whether the issue is local device vs platform-side.',
        takeaway: 'Write notes that separate local vs platform-side evidence.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-virtualization-cloud-core1', [
      ['What is a hypervisor?', 'Software that creates/manages virtual machines.'],
      ['Type 1 vs Type 2 hypervisor?', 'Type 1 runs on bare metal; Type 2 runs on top of an OS.'],
      ['What is VDI?', 'Virtual Desktop Infrastructure: remote hosted desktop sessions.'],
      ['VMs vs containers: key difference?', 'VMs virtualize whole machines; containers share host OS kernel and package apps.'],
      ['IaaS means what?', 'Infrastructure as a Service.'],
      ['PaaS means what?', 'Platform as a Service.'],
      ['SaaS means what?', 'Software as a Service.'],
      ['What is elasticity?', 'Ability to scale resources up/down as needed.']
    ]),
    quiz: [
      mcq({
        id: 'a-plus-cloud-q1',
        prompt: 'Which cloud model most closely describes a fully managed application where you primarily manage users and configuration?',
        domain: 'A+ Core 1 cloud',
        difficulty: 'foundation',
        explanation: 'SaaS is a fully managed application model.',
        modelAnswer: 'SaaS.',
        commonMistakes: ['Calling everything â€œcloudâ€ without identifying the model'],
        dcsContext: 'In schools, many platforms are SaaS; support notes should respect ownership boundaries.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-virtualization-cloud-core1',
        weakTopic: 'cloud-models',
        options: [
          { id: 'a', label: 'IaaS' },
          { id: 'b', label: 'PaaS' },
          { id: 'c', label: 'SaaS' },
          { id: 'd', label: 'RAID' }
        ],
        correctOptionId: 'c'
      }),
      mcq({
        id: 'a-plus-virt-q2',
        prompt: 'Which statement best describes a Type 1 hypervisor?',
        domain: 'A+ Core 1 virtualization',
        difficulty: 'foundation',
        explanation: 'Type 1 runs directly on hardware.',
        modelAnswer: 'It runs directly on the hardware (bare metal).',
        commonMistakes: ['Saying it runs on top of Windows/macOS'],
        dcsContext: 'This matters when interpreting infrastructure terminology.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-virtualization-cloud-core1',
        weakTopic: 'virtualization',
        options: [
          { id: 'a', label: 'Runs directly on the hardware (bare metal)' },
          { id: 'b', label: 'Runs only inside a browser tab' },
          { id: 'c', label: 'Is a kind of Wiâ€‘Fi standard' },
          { id: 'd', label: 'Is a printer driver' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-virt-q3',
        prompt: 'Which option best describes a container compared to a virtual machine?',
        domain: 'A+ Core 1 virtualization',
        difficulty: 'foundation',
        explanation: 'Containers share the host OS kernel and package apps with dependencies.',
        modelAnswer: 'Packages apps with dependencies while sharing the host OS kernel.',
        commonMistakes: ['Saying containers are the same as VMs'],
        dcsContext: 'This helps interpret modern platform language accurately.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-virtualization-cloud-core1',
        weakTopic: 'virtualization',
        options: [
          { id: 'a', label: 'Packages apps with dependencies while sharing the host OS kernel' },
          { id: 'b', label: 'Always requires a full guest OS for each instance' },
          { id: 'c', label: 'Is a Wiâ€‘Fi encryption method' },
          { id: 'd', label: 'Is a printer maintenance kit' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-cloud-q4',
        prompt: 'Give one example of SaaS and one example of IaaS (generic examples are fine).',
        domain: 'A+ Core 1 cloud',
        difficulty: 'stretch',
        explanation: 'Examples show model understanding.',
        modelAnswer:
          'SaaS example: a hosted email/collaboration suite. IaaS example: a provider-hosted virtual machine infrastructure you manage OS/apps on.',
        commonMistakes: ['Calling everything SaaS'],
        dcsContext: 'Support notes improve when you know which layer is provider-owned.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-virtualization-cloud-core1',
        weakTopic: 'cloud-models',
        rubric: ['Provides a SaaS example', 'Provides an IaaS example'],
        keywordHints: ['hosted app', 'virtual machine', 'infrastructure']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-virtualization-cloud-core1', [
      { title: 'Local vs SaaS issue note', prompt: 'Write a note that separates â€œdevice issueâ€ from â€œcloud platform issueâ€ without blaming.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-virtualization-cloud-core1', [
      { title: 'Cloud ownership map', description: 'Create a map of â€œwhat we manageâ€ vs â€œwhat the provider managesâ€ for SaaS/PaaS/IaaS.' }
    ])
  }),
  createModule({
    id: 'a-plus-troubleshooting-core1',
    title: 'A+ Core 1: Troubleshooting (hardware + network + printers)',
    description:
      'A support-focused troubleshooting module: classify symptoms, preserve evidence, and escalate with the right level of detail.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 35,
    tags: ['A+ 220-1201', 'troubleshooting', 'POST', 'BSoD', 'overheating', 'intermittent', 'queues'],
    learningObjectives: [
      'Use a consistent symptom â†’ scope â†’ safe checks pattern.',
      'Separate â€œquality vs deliveryâ€ for printers and â€œDNS vs DHCP vs IP reachabilityâ€ for networks.',
      'Write escalation notes that are specific and privacy-safe.'
    ],
    dcsRelevance: [
      'Aligns with classroom time pressure and the need for crisp notes.',
      'Reinforces privacy-safe evidence capture rather than copying live ticket detail.'
    ],
    sections: buildSections('a-plus-troubleshooting-core1', [
      {
        title: 'The troubleshooting rhythm',
        bodyMarkdown:
          'A repeatable rhythm:\n1) classify the symptom (power/display/storage/network/print)\n2) confirm scope (one device vs many)\n3) run the safest reversible checks\n4) record what changed\n5) escalate with evidence if unresolved\n\nYour aim is not to â€œtry everythingâ€. Your aim is to reduce uncertainty safely.',
        takeaway: 'Troubleshooting is uncertainty reduction, not random experimentation.'
      },
      {
        title: 'Network troubleshooting splits',
        bodyMarkdown:
          'Split web/connectivity into layers:\n- IP reachability\n- DNS resolution\n- authentication/proxy/app path\n\nCapture which layer fails and what comparison device shows.',
        takeaway: 'Write the layer split explicitly in the note.'
      },
      {
        title: 'Printer troubleshooting splits',
        bodyMarkdown:
          'Split printing into:\n- submission/queue\n- release/auth\n- device output/quality\n\nCopy+print scope is a powerful clue for device-quality faults.',
        takeaway: 'Queue vs release vs device-quality is the key print split.'
      }
    ]),
    flashcards: buildFlashcards('a-plus-troubleshooting-core1', [
      ['What are the first two steps in good troubleshooting?', 'Classify the symptom, then confirm scope (one vs many).'],
      ['What makes a â€œsafe first checkâ€?', 'Reversible, low-risk actions (reseat/restart/confirm settings) that preserve evidence.'],
      ['Best layer split for â€œwebsites wonâ€™t loadâ€?', 'IP reachability â†’ DNS â†’ app/auth/proxy path.'],
      ['Best split for printer problems?', 'Queue/submission â†’ release/auth â†’ device output/quality.'],
      ['Why record what changed after a check?', 'Because symptom changes narrow the failure path.'],
      ['What is a weak escalation note?', 'A vague statement with no scope, steps tried, or symptom split.'],
      ['What is a â€œcomparison checkâ€?', 'Compare with a known-good device or nearby location to control scope.'],
      ['What should you avoid in PD notes?', 'Private/confidential live ticket details, names, credentials, and sensitive identifiers.']
    ]),
    quiz: [
      orderSteps({
        id: 'a-plus-troubleshooting-q1',
        prompt: 'Order the best first-line response to an unknown â€œitâ€™s brokenâ€ report.',
        domain: 'A+ Core 1 troubleshooting',
        difficulty: 'foundation',
        explanation: 'Start with symptom/scope, then safe checks and evidence.',
        modelAnswer: 'Clarify symptom, confirm scope, do safe checks, then document and escalate if needed.',
        commonMistakes: ['Skipping scope', 'Changing deep settings immediately'],
        dcsContext: 'This protects class time and reduces rework.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-troubleshooting-core1',
        weakTopic: 'hardware-troubleshooting',
        steps: [
          { id: 'symptom', label: 'Clarify the exact symptom in plain language' },
          { id: 'scope', label: 'Confirm scope (one device or many / one room or wider)' },
          { id: 'safe', label: 'Run a safe, reversible first check based on symptom' },
          { id: 'note', label: 'Record what changed and escalate with evidence if unresolved' }
        ],
        correctOrder: ['symptom', 'scope', 'safe', 'note'],
        rubric: ['Starts with symptom', 'Includes scope', 'Uses safe checks', 'Ends with evidence capture']
      }),
      mcq({
        id: 'a-plus-troubleshooting-q2',
        prompt: 'A user says â€œthe internet is down.â€ One device works in the staff room; multiple devices fail in one classroom. What is the best scope label?',
        domain: 'A+ Core 1 troubleshooting',
        difficulty: 'foundation',
        explanation: 'Evidence suggests a location-specific issue.',
        modelAnswer: 'Room/local path issue rather than whole-site outage.',
        commonMistakes: ['Declaring a whole-school outage from one room'],
        dcsContext: 'Scope discipline prevents noisy escalation.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-troubleshooting-core1',
        weakTopic: 'network-troubleshooting',
        options: [
          { id: 'a', label: 'Room/local path issue' },
          { id: 'b', label: 'Whole-school internet outage' },
          { id: 'c', label: 'Printer driver failure' },
          { id: 'd', label: 'TPM failure' }
        ],
        correctOptionId: 'a'
      }),
      mcq({
        id: 'a-plus-troubleshooting-q3',
        prompt: 'A printer problem shows jobs submitted successfully, but nothing releases at the copier until users authenticate. Which layer is most likely involved?',
        domain: 'A+ Core 1 troubleshooting',
        difficulty: 'foundation',
        explanation: 'This is a release/auth layer clue.',
        modelAnswer: 'Release/authentication layer.',
        commonMistakes: ['Calling it a driver issue immediately'],
        dcsContext: 'Layer notes prevent repeated re-triage.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-troubleshooting-core1',
        weakTopic: 'printers-maintenance',
        options: [
          { id: 'a', label: 'Release/authentication layer' },
          { id: 'b', label: 'DNS layer' },
          { id: 'c', label: 'TPM layer' },
          { id: 'd', label: 'VGA cable layer' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'a-plus-troubleshooting-q4',
        prompt: 'Give one symptom clue for a DNS issue and one symptom clue for a DHCP issue.',
        domain: 'A+ Core 1 troubleshooting',
        difficulty: 'stretch',
        explanation: 'This checks layer-based symptom recognition.',
        modelAnswer:
          'DNS clue: names fail but IP may work. DHCP clue: device cannot get a valid lease and may show 169.254.x.x / limited connectivity.',
        commonMistakes: ['Swapping DNS/DHCP symptoms'],
        dcsContext: 'Correct symptom language improves escalations.',
        reviewSchedule,
        recommendedModuleId: 'a-plus-troubleshooting-core1',
        weakTopic: 'network-services',
        rubric: ['Provides DNS clue', 'Provides DHCP clue'],
        keywordHints: ['name', 'IP', 'lease', '169.254']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('a-plus-troubleshooting-core1', [
      { title: 'Escalation note template', prompt: 'Write a reusable escalation note template that stays privacy-safe but evidence-rich.' }
    ]),
    practicalOutputs: buildPracticalOutputs('a-plus-troubleshooting-core1', [
      { title: 'Troubleshooting split cards', description: 'Create quick cards: web (IP/DNS/app), print (queue/release/device), display (chain/symptom split).' }
    ])
  }),
  createModule({
    id: 'soft-skills-dcs-support',
    title: 'Soft Skills for DCS Support',
    description:
      'Master the empathy, communication, and de-escalation skills needed to support staff and students under pressure at DCS.',
    domain: 'Foundations',
    level: 'L1',
    estimatedMinutes: 15,
    tags: ['communication', 'empathy', 'soft-skills', 'de-escalation'],
    learningObjectives: [
      'Apply active listening to understand the teacherâ€™s actual classroom pain.',
      'Communicate technical fixes and limitations in plain English.',
      'Maintain a calm, helpful posture during high-pressure classroom outages.'
    ],
    dcsRelevance: [
      'Technical skills are only half the job; the other half is making people feel heard.',
      'Reduces the "IT vs Teachers" friction that can happen during busy periods.',
      'Ensures that Josh is seen as a supportive partner in the learning environment.'
    ],
    sections: buildSections('soft-skills-dcs-support', [
      {
        title: 'Empathy-First Support',
        bodyMarkdown:
          'When a teacher calls with a display issue, they aren\'t just reporting a technical fault; they are reporting a block to their lesson and a disruption for 30 students. Acknowledge the urgency first: "I can see this is holding up your lesson, let\'s look at the source first." This small phrase changes the interaction from a "ticket" to a partnership.',
        takeaway: 'Acknowledge the classroom pain before the technical check.'
      },
      {
        title: 'Plain English Translation',
        bodyMarkdown:
          'Avoid technical jargon that shuts down conversation. Instead of "DHCP lease failure", say "The laptop isn\'t picking up an address from the school network." Instead of "SSID mismatch", say "It\'s trying to connect to the wrong Wi-Fi." Your goal is to be understood, not to sound like an expert.',
        takeaway: 'Being understood is more important than sounding like an expert.'
      },
      {
        title: 'De-escalation and Boundaries',
        bodyMarkdown:
          'If a user is frustrated, stay calm and factual. Don\'t take it personally. If you can\'t fix it immediately, give a clear "Next Step" rather than a vague "I\'ll look into it." Example: "I can\'t get this display back in the next two minutes. I\'ll grab a loaner laptop for you and then call Paul to look at the room fault so you can keep teaching."',
        takeaway: 'Calm facts and clear workarounds beat vague promises.'
      }
    ]),
    flashcards: buildFlashcards('soft-skills-dcs-support', [
      ['What is the first step in empathetic support?', 'Acknowledge the user\'s problem and its impact on their work.'],
      ['Why should you avoid jargon in the classroom?', 'It can be confusing or alienating for staff under pressure.'],
      ['What is a "clear next step" in support?', 'A specific action you will take and a timeframe for follow-up.'],
      ['How do you handle an angry user?', 'Stay calm, listen actively, and focus on the technical resolution and workarounds.'],
      ['What should you do before explaining the technical fix?', 'Confirm you understand the user\'s immediate teaching or work impact.'],
      ['What is a good support boundary phrase?', 'I can help with the device issue, and I will escalate the access decision to the right approver.'],
      ['Why should you offer a workaround?', 'A workaround keeps learning or work moving while the root cause is investigated.'],
      ['What makes a follow-up promise useful?', 'It names the next action, owner, and approximate timeframe.']
    ]),
    quiz: [
      mcq({
        id: 'ss-q1',
        prompt: 'A teacher is visibly stressed because the printer isn\'t working for their next lesson. What is the best opening line?',
        domain: 'Soft Skills',
        difficulty: 'foundation',
        explanation: 'Empathy and acknowledgement should come before the technical check.',
        modelAnswer: 'Acknowledge the impact on their class first to build a partnership.',
        commonMistakes: ['Ignoring the teacher and touching the printer', 'Saying "It works for me"'],
        dcsContext: 'Teachers are under tight time pressure between lessons.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'communication',
        options: [
          { id: 'a', label: '"Did you send it to the right queue? Check your settings."' },
          { id: 'b', label: '"I can see this is a problem for your next lesson. Let\'s check the queue together."' },
          { id: 'c', label: '"I\'m busy right now, put a ticket in."' },
          { id: 'd', label: '"Printers are always doing this, it\'s not my fault."' }
        ],
        correctOptionId: 'b'
      }),
      scenarioResponse({
        id: 'ss-q2',
        prompt: 'You can\'t fix a classroom display issue within the 5 minutes before a lesson starts. Write your response to the teacher.',
        domain: 'Soft Skills',
        difficulty: 'stretch',
        explanation: 'Provide a workaround and a clear escalation path.',
        modelAnswer: 'Acknowledge the failure, provide a workaround (like a loaner), and explain the next technical step you will take.',
        commonMistakes: ['Staying and trying to fix it while the lesson is supposed to start', 'Leaving without saying anything'],
        dcsContext: 'Keeping the lesson moving is the priority.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'communication',
        rubric: ['Acknowledges the block', 'Provides a workaround', 'Sets a clear next step']
      }),
      mcq({
        id: 'ss-q3',
        prompt: 'A staff member says, "This system always breaks when I need it." What should you do first?',
        domain: 'Soft Skills',
        difficulty: 'foundation',
        explanation: 'Acknowledge the frustration before moving into diagnosis.',
        modelAnswer: 'Acknowledge the frustration and impact, then ask one focused diagnostic question.',
        commonMistakes: ['Defending the system', 'Blaming the user', 'Starting with jargon'],
        dcsContext: 'Support conversations often happen while staff are under time pressure.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'communication',
        options: [
          { id: 'a', label: 'Tell them the system is usually reliable.' },
          { id: 'b', label: 'Acknowledge the frustration and ask what they were trying to do.' },
          { id: 'c', label: 'Tell them to restart and walk away.' },
          { id: 'd', label: 'Explain the backend architecture.' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'ss-q4',
        prompt: 'Write a one-sentence plain-English explanation for a Wi-Fi authentication issue.',
        domain: 'Soft Skills',
        difficulty: 'foundation',
        explanation: 'Plain English helps users understand the issue without exposing unnecessary technical detail.',
        modelAnswer: 'Your device is reaching the school Wi-Fi, but it is not being accepted with the current sign-in details, so I will check the account and connection steps.',
        commonMistakes: ['Using unexplained acronyms', 'Blaming the user', 'Mentioning private network details'],
        dcsContext: 'Staff need clear next steps, not internal network jargon.',
        reviewSchedule,
        recommendedModuleId: 'soft-skills-dcs-support',
        weakTopic: 'communication',
        keywordHints: ['plain English', 'sign-in', 'next step', 'no blame'],
        rubric: ['Plain English', 'No blame', 'Clear next step']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('soft-skills-dcs-support', [
      {
        title: 'Communicating a delay',
        prompt: 'Practice telling a staff member their device needs to be sent away for repair while managing their expectations.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('soft-skills-dcs-support', [
      {
        title: 'Communication Cheat Sheet',
        description: 'Create a list of "Plain English" alternatives for 5 common technical phrases.'
      }
    ])
  }),
  createModule({
    id: 'cybersecurity-basics',
    title: 'Cybersecurity Awareness and Incident Response',
    description:
      'Understand modern school cyber threats, phishing tactics, and the NIST 800-61 incident response framework.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 20,
    tags: ['phishing', 'passwords', 'NIST 800-61', 'incident response'],
    learningObjectives: [
      'Recognise common phishing tactics and social engineering signals.',
      'Explain the importance of password hygiene and MFA in a school context.',
      'Map the four phases of the NIST 800-61 incident response framework.'
    ],
    dcsRelevance: [
      'Protects student and staff data from evolving social engineering threats.',
      'Aligns with the Texas School Safety Center recommendations for K-12 districts.',
      'Builds a safer "before, during, and after" posture for school cyber incidents.'
    ],
    sections: buildSections('cybersecurity-basics', [
      {
        title: 'Phishing and Social Engineering',
        bodyMarkdown: `Phishing is an attempt to trick users into revealing credentials or downloading malware. In schools, this often looks like fake "urgent" IT alerts, spoofed principal emails, or fraudulent invoice requests.\n\nStaff should pause before clicking links, verify the sender's actual email address (not just the display name), and report suspicious messages immediately instead of deleting them.`
      },
      {
        title: 'Password Hygiene and MFA',
        bodyMarkdown: `Strong passwords and Multi-Factor Authentication (MFA) are the first line of defense. Reusing passwords across personal and school accounts creates a significant risk.\n\nMFA adds a second layer that prevents many credential-based attacks even if a password is leaked. At DCS, MFA is a critical requirement for protecting the M365 tenant.`
      },
      {
        title: 'NIST 800-61 Incident Response',
        bodyMarkdown: `The NIST 800-61 framework defines four phases: Preparation, Detection & Analysis, Containment, Eradication & Recovery, and Post-Incident Activity.\n\nLevel 1 support focuses heavily on Detection and early Containment (e.g., isolating a device) while preserving evidence for senior ICT staff.`
      }
    ]),
    flashcards: buildFlashcards('cybersecurity-basics', [
      ['What is the goal of phishing?', 'To trick users into revealing credentials or installing malware.'],
      ['What should a staff member check before clicking a link?', "The sender's actual email address and the target URL destination."],
      ['Why is MFA important?', 'It provides a second layer of security beyond just a password.'],
      ['What are the four phases of NIST 800-61?', 'Preparation, Detection & Analysis, Containment/Eradication/Recovery, and Post-Incident Activity.'],
      ['What is Josh’s primary role in a cyber incident?', 'Early detection, basic containment, and evidence-safe escalation.'],
      ['Should Josh delete a suspicious email for a user?', 'No. Report it through official channels to preserve the evidence for analysis.'],
      ['What should Level 1 support capture for a suspected compromise?', 'Time reported, symptoms, affected device/account, actions already taken, and who has been notified.'],
      ['Why should a potentially infected device be isolated before deeper troubleshooting?', 'Isolation limits spread while preserving the device state for senior ICT review.']
    ]),
    quiz: [
      mcq({
        id: 'cyber-q1',
        prompt: 'A staff member receives an email from the "Principal" asking for an urgent bank transfer. What is the best first step?',
        domain: 'Cybersecurity',
        difficulty: 'foundation',
        explanation: 'Business Email Compromise (BEC) often uses authority to create false urgency.',
        modelAnswer: 'Verify the sender independently and report it as a potential phishing attempt. Do not act on the request.',
        commonMistakes: ['Replying to the email', 'Assuming the Principal is really asking', 'Not verifying the sender'],
        dcsContext: 'DCS Principal will never ask for urgent bank transfers via email.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-basics',
        weakTopic: 'security-risk-judgement',
        options: [
          { id: 'a', label: 'Reply immediately to show efficiency' },
          { id: 'b', label: 'Verify the sender and report the email' },
          { id: 'c', label: 'Delete the email so no one else sees it' },
          { id: 'd', label: 'Forward it to the whole staff as a warning' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'cyber-q2',
        prompt: 'Briefly explain the "Containment" phase of incident response for a suspected infected laptop.',
        domain: 'Cybersecurity',
        difficulty: 'stretch',
        explanation: 'Containment stops the damage from spreading.',
        modelAnswer: 'Containment involves isolating the affected device from the network (Wi-Fi/Ethernet) to prevent the spread of malware or unauthorized access, while keeping the device powered on if needed for forensics.',
        commonMistakes: ['Shutting down immediately (losing memory forensics)', 'Leaving it on the Wi-Fi'],
        dcsContext: 'Containment is a critical Level 1 response step.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-basics',
        weakTopic: 'security-risk-judgement',
        rubric: ['Mentions network isolation', 'Explains purpose (preventing spread)', 'Mentions evidence preservation'],
        keywordHints: ['isolate', 'network', 'spread', 'evidence']
      }),
      mcq({
        id: 'cyber-q3',
        prompt: 'Which detail is safest and most useful to capture for a suspected phishing click?',
        domain: 'Cybersecurity',
        difficulty: 'foundation',
        explanation: 'Useful evidence is factual and privacy-safe, not secret or speculative.',
        modelAnswer: 'Capture time, user-reported action, affected account/device, message/link context, and any visible warning.',
        commonMistakes: ['Asking for the password', 'Deleting evidence', 'Broadcasting the incident widely'],
        dcsContext: 'Cyber notes should help senior ICT act without exposing secrets.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-basics',
        weakTopic: 'security-risk-judgement',
        options: [
          { id: 'a', label: 'The password the user typed' },
          { id: 'b', label: 'Time, affected device/account, action taken, and message context' },
          { id: 'c', label: 'A public warning with the staff member named' },
          { id: 'd', label: 'A guess about who sent the email' }
        ],
        correctOptionId: 'b'
      }),
      scenarioResponse({
        id: 'cyber-q4',
        prompt: 'A staff member entered credentials into a suspicious form. Describe the first response and escalation note.',
        domain: 'Cybersecurity',
        difficulty: 'stretch',
        explanation: 'Credential exposure needs quick containment and evidence-safe escalation.',
        modelAnswer:
          'Tell the staff member to stop using the suspicious session, capture the time/link/context without collecting the password, secure or isolate affected devices if needed, and escalate urgently with the affected account, actions taken, and evidence location.',
        commonMistakes: ['Asking the user to repeat the password', 'Waiting until the end of the day', 'Deleting the original email'],
        dcsContext: 'A compromised account can affect M365, files, and communication across the school.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-basics',
        weakTopic: 'security-risk-judgement',
        rubric: ['Stops further risk', 'Preserves evidence safely', 'Escalates with actionable detail']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('cybersecurity-basics', [
      {
        title: 'Suspicious Link Clicked',
        prompt: 'A teacher admits they clicked a link in a suspicious email and entered their M365 password. Work through the first 5 minutes of response.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('cybersecurity-basics', [
      {
        title: 'Cyber Incident Report Template',
        description: 'Draft a simple form Josh can use to capture the who, what, and when of a suspected security incident.'
      }
    ])
  }),
  createModule({
    id: 'intune-mdm-administration',
    title: 'Microsoft Intune and MDM Administration',
    description:
      'Understand mobile-device management fundamentals: device enrolment, compliance policies, app deployment, and conditional access. Learn Level 1 triage for MDM issues and safe escalation boundaries.',
    domain: 'Endpoint Support',
    level: 'L2',
    estimatedMinutes: 25,
    tags: ['Intune', 'MDM', 'device management', 'compliance', 'conditional access'],
    learningObjectives: [
      'Explain the role of Intune in managing school devices.',
      'Recognize common device enrolment and compliance issues.',
      'Understand when to escalate MDM concerns beyond Level 1 support.',
      'Describe the purpose of compliance policies and conditional access.'
    ],
    dcsRelevance: [
      'Modern schools rely on Intune to secure and manage student and staff devices.',
      'Understanding device management reduces user friction and improves security posture.',
      'First-line triage of MDM issues helps differentiate user error from system problems.'
    ],
    sections: buildSections('intune-mdm-administration', [
      {
        title: 'What Intune does and why schools use it',
        bodyMarkdown:
          'Microsoft Intune is a cloud-based mobile-device management (MDM) solution that allows schools to manage, secure, and monitor devices. Schools use Intune to configure iPads, Windows laptops, and Android devices; enforce security policies; distribute apps; and remotely wipe lost or stolen devices. Understanding the basic flow helps first-line support set expectations and triage issues cleanly.',
        takeaway: 'Intune is the single source of device configuration and security policy for school devices.'
      },
      {
        title: 'Device enrolment and common blockers',
        bodyMarkdown:
          'Device enrolment is the process of registering a school device into Intune management. Staff and students enrol their devices by signing in with their school account and accepting the enrolment prompt. Common blockers include: wrong account used, device already enrolled to another tenant, missing Intune licences, and enrolment profile not published yet. Level 1 can ask which account they used and whether the device shows a management app after enrolment.',
        takeaway: 'Enrolment blockers often hinge on account identity and enrolment profile readiness, not device hardware.'
      },
      {
        title: 'Compliance policies and what they check',
        bodyMarkdown:
          'Intune compliance policies define rules that devices must follow: minimum OS version, encryption enabled, antivirus active, screen lock enabled. When a device fails compliance, the user may lose access to school resources (email, SharePoint, Teams) until the device is brought back into compliance. Level 1 support can check whether the device shows a compliance warning and help users understand the requirement (e.g., "Your device needs to use a PIN to stay protected").',
        takeaway: 'Compliance failures block access; helping users understand why (security, not punishment) improves buy-in.'
      },
      {
        title: 'Conditional access basics',
        bodyMarkdown:
          'Conditional access rules add extra sign-in requirements based on risk or context. Example rules: require MFA from non-managed devices, block sign-in from outside school networks, or require MFA from high-risk sign-in locations. Understanding conditional access helps Level 1 explain why a user suddenly needs extra authentication.',
        takeaway: 'Conditional access rules adapt security based on context; they are not bugs.'
      },
      {
        title: 'Safe Level 1 MDM triage and escalation',
        bodyMarkdown:
          'Safe first questions: Is the device enrolled? Is it currently compliant? When did the issue start? What account was used? Did the device recently update? From here, escalate to Level 2 or the device-management team. Do not attempt policy changes, manual compliance resets, or device unenrollment without clear guidance.',
        takeaway: 'Level 1 gathers the context; Level 2 or device management makes the changes.'
      }
    ]),
    flashcards: buildFlashcards('intune-mdm-administration', [
      ['What does Intune do for a school?', 'It manages, secures, and monitors school devices through cloud-based policies and profiles.'],
      ['What is the enrolment process in Intune?', 'A user signs in with their school account on a device and accepts the enrolment prompt to register it for management.'],
      ['What is a compliance policy?', 'A set of rules defining OS version, encryption, antivirus, PIN, and other security requirements for devices.'],
      ['What happens when a device fails compliance?', 'The user may lose access to school resources like email, SharePoint, and Teams until the device meets the policy.'],
      ['What is conditional access?', 'Rules that add extra sign-in requirements based on risk or context, like MFA from non-managed devices.'],
      ['Why would a user suddenly need MFA?', 'A conditional access rule may be triggering because of device status, sign-in location, or risk level.'],
      ['What is the difference between a device and a user sign-in?', 'Device compliance checks the device state; conditional access checks who is signing in and from where.'],
      ['When should Level 1 escalate an Intune issue?', 'After gathering device enrolment, compliance, account, and timing context, escalate to Level 2 or device management.']
    ]),
    quiz: [
      mcq({
        id: 'intune-q1',
        prompt: 'A staff member says their iPad will not access email after an update. You check and find it is enrolled in Intune but the compliance dashboard shows "Non-compliant". What should you do first?',
        domain: 'Intune and MDM',
        difficulty: 'foundation',
        explanation: 'Non-compliance is a signal; help the user understand what is needed.',
        modelAnswer: 'Explain that the device is not meeting a security requirement and help them see what the policy is asking for (e.g., screen lock, OS version).',
        commonMistakes: ['Trying to manually reset compliance', 'Assuming the update broke something'],
        dcsContext: 'Compliance issues often resolve when users understand the requirement, not the fix.',
        reviewSchedule,
        recommendedModuleId: 'intune-mdm-administration',
        weakTopic: 'mdm-group-policy',
        options: [
          { id: 'a', label: 'Tell the user to unenroll and re-enroll.' },
          { id: 'b', label: 'Help the user understand which policy requirement is not met and what it requires.' },
          { id: 'c', label: 'Immediately escalate without gathering any context.' },
          { id: 'd', label: 'Assume the device needs a factory reset.' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'intune-q2',
        prompt: 'Explain in plain English why a device that is not enrolled in Intune might have different access restrictions than an enrolled device.',
        domain: 'Intune and MDM',
        difficulty: 'stretch',
        explanation: 'Enrolment is the gateway to managed security.',
        modelAnswer:
          'An enrolled device follows school compliance and security policies managed by Intune; a non-enrolled device does not, so it may trigger conditional access rules that require extra authentication or block access altogether.',
        commonMistakes: ['Confusing device enrolment with user account creation', 'Assuming all devices are automatically enrolled'],
        dcsContext: 'Some staff may not realise their device needs enrolment; a clear explanation builds compliance.',
        reviewSchedule,
        recommendedModuleId: 'intune-mdm-administration',
        weakTopic: 'mdm-group-policy',
        rubric: ['Separates enrolled from non-enrolled', 'Links enrolment to policy', 'Plain English'],
        keywordHints: ['enrolled', 'policy', 'conditional access', 'security']
      }),
      orderSteps({
        id: 'intune-q3',
        prompt: 'Order the steps for safe Level 1 triage of an Intune device issue.',
        domain: 'Intune and MDM',
        difficulty: 'stretch',
        explanation: 'Gather context before escalating.',
        modelAnswer: 'Ask what account they used, confirm whether the device is enrolled, check compliance status, ask when the issue started, then escalate to the device-management team with those details.',
        commonMistakes: ['Trying to fix policy settings', 'Escalating without context'],
        dcsContext: 'Good first-line notes save Level 2 time.',
        reviewSchedule,
        recommendedModuleId: 'intune-mdm-administration',
        weakTopic: 'mdm-group-policy',
        steps: [
          { id: 'account', label: 'Ask which account they used to sign in' },
          { id: 'enrolled', label: 'Confirm the device is enrolled in Intune' },
          { id: 'compliance', label: 'Check whether the device shows compliant or non-compliant' },
          { id: 'timing', label: 'Ask when the issue started and what changed' },
          { id: 'escalate', label: 'Escalate to the device-management team with all context' }
        ],
        correctOrder: ['account', 'enrolled', 'compliance', 'timing', 'escalate'],
        rubric: ['Account identity first', 'Enrolment status second', 'Compliance check third']
      }),
      scenarioResponse({
        id: 'intune-q4',
        prompt: 'A teacher says their Windows laptop suddenly requires MFA when signing into Teams, but it never has before. What is a likely explanation, and how would you explain it to them?',
        domain: 'Intune and MDM',
        difficulty: 'challenge',
        explanation: 'Conditional access rules can change without user awareness.',
        modelAnswer:
          'A conditional access policy may have been updated to require MFA in certain situations (e.g., for non-compliant devices or from outside school). Explain that this is a security improvement, help them set up MFA, and escalate if they have device compliance warnings.',
        commonMistakes: ['Claiming it is a bug', 'Bypassing the MFA requirement'],
        dcsContext: 'Security policy changes can confuse users; clear communication helps adoption.',
        reviewSchedule,
        recommendedModuleId: 'intune-mdm-administration',
        weakTopic: 'mdm-group-policy',
        rubric: ['Acknowledges conditional access', 'Frames as security improvement', 'Offers clear next steps']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('intune-mdm-administration', [
      {
        title: 'Device enrolment blocker',
        prompt: 'A new staff member says their personal iPad will not enrol in Intune. Capture the triage questions and write an escalation note.'
      },
      {
        title: 'Compliance policy confusion',
        prompt: 'A student says they suddenly cannot access Teams because their Chromebook is "not compliant". Explain the issue and help them understand the path forward.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('intune-mdm-administration', [
      {
        title: 'Device Enrolment Checklist',
        description: 'Create a checklist of 5-7 questions to ask when troubleshooting device enrolment issues.'
      },
      {
        title: 'Compliance Policy Plain-English Guide',
        description: 'Write a one-page guide explaining 3-4 common compliance requirements in language a staff member would understand.'
      }
    ])
  }),
  createModule({
    id: 'cybersecurity-awareness-security-risk-judgement',
    title: 'Cybersecurity Awareness and Incident Response',
    description:
      'Understand phishing, password hygiene, two-factor authentication, ransomware basics, and the NIST 800-61 incident response framework. Learn how to recognize threats and report incidents safely.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 28,
    tags: ['phishing', 'incident response', 'ransomware', 'MFA', 'NIST 800-61', 'security'],
    learningObjectives: [
      'Recognize phishing and social engineering tactics.',
      'Explain why password hygiene and MFA matter.',
      'Understand the four phases of incident response: Prepare, Detect, Respond, Recover.',
      'Know when and how to report a suspected incident.'
    ],
    dcsRelevance: [
      'Schools are increasingly targeted by ransomware and phishing attacks.',
      'First-line staff are often the first to notice suspicious activity.',
      'Understanding incident response phases helps staff follow the right escalation path.'
    ],
    sections: buildSections('cybersecurity-awareness-security-risk-judgement', [
      {
        title: 'Phishing and social engineering tactics',
        bodyMarkdown:
          'Phishing is an attempt to trick users into revealing credentials or downloading malware by pretending to be a trusted sender. Common tactics: urgent emails claiming account lockout, fake login pages, requests to "verify" payment info, and attachments with malicious names. Staff should pause before clicking links or downloading attachments and verify the sender independently. Report suspicious emails to the ICT team rather than opening or forwarding them.',
        takeaway: 'Pause, verify independently, and report rather than click.'
      },
      {
        title: 'Password hygiene and the case for MFA',
        bodyMarkdown:
          'Strong passwords (12+ characters, mixed case, numbers, symbols) are harder to guess, but even strong passwords can be stolen. Two-factor authentication (MFA) adds a second factorâ€”usually a code from an authenticator app or phoneâ€”that an attacker cannot easily bypass. MFA is the single most effective way to prevent account takeover. Schools should encourage staff to use MFA everywhere.',
        takeaway: 'Strong password + MFA is the gold standard; MFA alone is better than a strong password alone.'
      },
      {
        title: 'Ransomware basics and early warning signs',
        bodyMarkdown:
          'Ransomware is malware that encrypts files and demands payment for the decryption key. Warning signs: unexpected slow performance, files renamed with unusual extensions, inability to open files, and ransom notes on the desktop. If a user suspects ransomware, they should immediately disconnect the device from the network, power it off, and escalate to ICT. Do not pay the ransom; escalate to Paul or a senior tech.',
        takeaway: 'Disconnect, power off, escalateâ€”do not attempt to fix it yourself.'
      },
      {
        title: 'NIST 800-61: Prepare, Detect, Respond, Recover',
        bodyMarkdown:
          'The NIST Cybersecurity Framework breaks incident response into four phases. Prepare: have a plan, train staff, and test systems. Detect: monitor for suspicious activity and encourage staff to report. Respond: contain the incident, gather evidence, and communicate clearly. Recover: restore systems, learn lessons, and improve. Level 1 support plays a role in all phases: during prepare, raise awareness; during detect, report unusual activity; during respond, follow instructions and preserve evidence; during recover, help restore services.',
        takeaway: 'You are part of the incident response team; your role is awareness, reporting, and following guidance.'
      },
      {
        title: 'How to report a suspected incident safely',
        bodyMarkdown:
          'If you suspect a phishing email, malware, ransomware, or account compromise: do not open suspicious files, do not click links or reply to the sender, do not panic or share details in public chat. Instead: forward the suspicious email to the ICT team, power off the device if malware is suspected, and report the issue via email with a clear subject line (e.g., "Suspected phishing email" or "Suspicious device behavior"). The more specific your report, the faster the team can respond.',
        takeaway: 'Report early with detail; do not assume it is a false alarm.'
      }
    ]),
    flashcards: buildFlashcards('cybersecurity-awareness-security-risk-judgement', [
      ['What is phishing?', 'An attempt to trick users into revealing credentials or downloading malware by pretending to be a trusted sender.'],
      ['What should you do if you receive a suspicious email?', 'Do not click links or open attachments. Report it to the ICT team instead.'],
      ['Why is MFA important?', 'It adds a second verification step that an attacker cannot easily bypass, even if they have your password.'],
      ['What are early warning signs of ransomware?', 'Unexpected slow performance, files renamed with unusual extensions, inability to open files, and ransom notes.'],
      ['What should you do if you suspect ransomware?', 'Disconnect the device from the network, power it off, and escalate to ICT immediately.'],
      ['What are the four NIST incident response phases?', 'Prepare, Detect, Respond, Recover.'],
      ['What is your role during the "Detect" phase of incident response?', 'Monitor for unusual activity and report suspicious behavior to the ICT team.'],
      ['What should you preserve if you suspect a compromise?', 'Evidence: screenshots, timestamps, error messages, and a timeline of what happened.']
    ]),
    quiz: [
      mcq({
        id: 'cyber-q1',
        prompt: 'You receive an email from "Microsoft Support" asking you to click a link to "verify your account." What should you do?',
        domain: 'Cybersecurity',
        difficulty: 'foundation',
        explanation: 'Legitimate companies never ask for credentials via email.',
        modelAnswer: 'Do not click the link. Forward the email to the ICT team and delete it.',
        commonMistakes: ['Clicking to "just check"', 'Replying to ask if it is real'],
        dcsContext: 'Phishing is a top threat to schools.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-awareness-security-risk-judgement',
        weakTopic: 'security-risk-judgement',
        options: [
          { id: 'a', label: 'Click the link to verify your account.' },
          { id: 'b', label: 'Reply to ask if the email is legitimate.' },
          { id: 'c', label: 'Forward the email to the ICT team and do not click.' },
          { id: 'd', label: 'Share it in the staff group chat to warn others.' }
        ],
        correctOptionId: 'c'
      }),
      shortAnswer({
        id: 'cyber-q2',
        prompt: 'Explain why MFA is more secure than a strong password alone, in plain English.',
        domain: 'Cybersecurity',
        difficulty: 'stretch',
        explanation: 'MFA defends against credential theft.',
        modelAnswer:
          'A strong password is harder to guess, but if it is stolen (e.g., from a data breach), an attacker can still use it. MFA adds a second factor that only you can provide at that moment, so even if your password is stolen, the attacker still cannot get in without that second factor.',
        commonMistakes: ['Treating MFA as optional', 'Thinking a strong password alone is enough'],
        dcsContext: 'Credential theft is a major attack vector.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-awareness-security-risk-judgement',
        weakTopic: 'security-risk-judgement',
        rubric: ['Separates password from MFA', 'Addresses credential theft', 'Clear language'],
        keywordHints: ['stolen', 'second factor', 'only you', 'even if']
      }),
      orderSteps({
        id: 'cyber-q3',
        prompt: 'Order the correct steps if you suspect ransomware on your device.',
        domain: 'Cybersecurity',
        difficulty: 'stretch',
        explanation: 'Immediate containment is critical.',
        modelAnswer: 'Stop using the device immediately, disconnect it from the network, power it off, then contact ICT.',
        commonMistakes: ['Trying to fix it yourself', 'Continuing to use the device', 'Powering off before disconnecting'],
        dcsContext: 'Ransomware spreads; isolation is the priority.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-awareness-security-risk-judgement',
        weakTopic: 'security-risk-judgement',
        steps: [
          { id: 'stop', label: 'Stop using the device immediately' },
          { id: 'disconnect', label: 'Disconnect the device from the network (Wi-Fi and Ethernet)' },
          { id: 'power', label: 'Power off the device' },
          { id: 'escalate', label: 'Contact ICT and provide details of what you observed' }
        ],
        correctOrder: ['stop', 'disconnect', 'power', 'escalate'],
        rubric: ['Stops use first', 'Disconnects before power-off', 'Escalates immediately']
      }),
      scenarioResponse({
        id: 'cyber-q4',
        prompt: 'A staff member comes to you and says, "My computer is running really slowly and I see strange file names with .enc extensions. What do I do?" Explain your response and what you would tell them.',
        domain: 'Cybersecurity',
        difficulty: 'challenge',
        explanation: 'Ransomware indicators require immediate action.',
        modelAnswer:
          'These are classic ransomware signs. Tell them to stop using the device, disconnect it from the network immediately, power it off, and come find you or call ICT. Do not touch any files or try to fix it. Escalate with detail about what you observed.',
        commonMistakes: ['Trying to open files to check', 'Continuing to use the device', 'Delaying escalation'],
        dcsContext: 'Rapid response limits damage.',
        reviewSchedule,
        recommendedModuleId: 'cybersecurity-awareness-security-risk-judgement',
        weakTopic: 'security-risk-judgement',
        rubric: ['Recognizes ransomware signs', 'Gives clear containment steps', 'Escalates immediately']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('cybersecurity-awareness-security-risk-judgement', [
      {
        title: 'Phishing email report',
        prompt: 'A staff member forwards you a suspicious email claiming to be from the "school finance team" asking to verify payment details. Write the report you would send to the ICT team.'
      },
      {
        title: 'Ransomware discovery',
        prompt: 'You walk past a classroom and notice a device displaying a ransom note. Describe the steps you would take and how you would communicate with the teacher.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('cybersecurity-awareness-security-risk-judgement', [
      {
        title: 'Phishing Email Indicators Checklist',
        description: 'Create a visual checklist of 7-10 signs that an email might be phishing.'
      },
      {
        title: 'Incident Reporting Template',
        description: 'Design a simple form or template for staff to report suspected security incidents with all key fields (what, when, who, device, evidence).'
      }
    ])
  }),
  createModule({
    id: 'device-imaging-deployment',
    title: 'Device Imaging and Deployment Workflows',
    description:
      'Learn device imaging fundamentals: planning, base images, reference image creation, deployment methods, and when to use imaging vs. provisioning. Understand the role of imaging in school device fleet management.',
    domain: 'Endpoint Support',
    level: 'L2',
    estimatedMinutes: 26,
    tags: ['imaging', 'deployment', 'Windows Deployment Services', 'provisioning', 'device fleet'],
    learningObjectives: [
      'Understand why schools use device imaging.',
      'Explain the difference between a base image and a reference image.',
      'Describe when imaging is appropriate vs. when provisioning is better.',
      'Recognize common imaging failures and safe escalation points.'
    ],
    dcsRelevance: [
      'Device imaging is a foundational IT operation that enables bulk device deployment.',
      'Understanding imaging helps support staff assist with device onboarding and troubleshoot deployment issues.',
      'Schools with efficient imaging workflows deploy updates faster and more safely.'
    ],
    sections: buildSections('device-imaging-deployment', [
      {
        title: 'What is device imaging and why schools use it',
        bodyMarkdown:
          'Device imaging is the process of creating a standardized copy of a configured device and deploying that copy to many devices. Instead of manually configuring 50 Windows laptops, a school creates one "base image" with all required software, settings, and configurations, then deploys it to all 50 devices at once. This saves time, reduces errors, and ensures consistency. Imaging is used for initial device setup and for bulk updates.',
        takeaway: 'Imaging is about speed, consistency, and scalability.'
      },
      {
        title: 'Base image vs. reference image vs. golden image',
        bodyMarkdown:
          'A base image is a clean Windows or macOS install with no custom settings or applications. A reference image is a base image plus all required applications, settings, patches, and configurations. A golden image is a validated reference image that is used for production deployment. The workflow: start with base (clean OS), add software and settings (create reference), test it thoroughly (validate), then use it for deployment (golden).',
        takeaway: 'Keep the base generic; all school-specific work goes into the reference image.'
      },
      {
        title: 'Deployment methods: imaging vs. provisioning',
        bodyMarkdown:
          'Imaging deploys a full image to a device, erasing its current state. Provisioning uses a script or automation to configure a device without completely replacing it. Imaging is faster for initial setup; provisioning is gentler for devices that already have user data. Windows Deployment Services (WDS) is a common imaging tool; Intune or other MDM tools can handle provisioning. Level 1 support should understand which method is being used for each fleet.',
        takeaway: 'Imaging is for blank devices; provisioning is for updates or devices with data.'
      },
      {
        title: 'Safe imaging workflow and testing',
        bodyMarkdown:
          'A safe workflow: build the reference image, test it on a sample device thoroughly (all applications, network shares, printers, device management), document the testing results, then deploy to the wider fleet. Never image a device without a backup of user data. If imaging fails (device does not boot, driver issues, application conflicts), the device can usually be reimaged, but testing beforehand catches most issues.',
        takeaway: 'Test thoroughly before deployment; preserve user data before imaging.'
      },
      {
        title: 'Common imaging issues and safe escalation',
        bodyMarkdown:
          'Common failures: network connectivity during imaging (device disconnects), driver incompatibilities (wrong hardware model for the image), application conflicts (software fails to install or activate), and boot failures (device will not start after imaging). Level 1 support should capture: which device, which image name, at what stage it failed, and any error codes. Do not attempt to fix imaging failures yourself; escalate to the imaging or device management team with these details.',
        takeaway: 'Document the failure clearly; the team can then troubleshoot from there.'
      }
    ]),
    flashcards: buildFlashcards('device-imaging-deployment', [
      ['What is device imaging?', 'The process of creating a standardized copy of a configured device and deploying it to many devices.'],
      ['What is a base image?', 'A clean Windows or macOS install with no custom settings or applications.'],
      ['What is a reference image?', 'A base image plus all required applications, settings, patches, and configurations for the school.'],
      ['What is a golden image?', 'A validated reference image that is tested and approved for production deployment.'],
      ['What is the difference between imaging and provisioning?', 'Imaging replaces the entire device; provisioning configures a device without completely replacing it.'],
      ['When should you use imaging vs. provisioning?', 'Use imaging for blank devices; use provisioning for updates or devices with existing data.'],
      ['What is Windows Deployment Services (WDS)?', 'A Windows Server role that enables network-based imaging and deployment of operating systems.'],
      ['What should you do before reimaging a device with user data?', 'Preserve or back up the user data first, then image the device.']
    ]),
    quiz: [
      mcq({
        id: 'imaging-q1',
        prompt: 'A school needs to deploy Windows to 30 new laptops. What is the most efficient approach?',
        domain: 'Device Imaging',
        difficulty: 'foundation',
        explanation: 'Imaging is faster than manual setup.',
        modelAnswer: 'Create a reference image with all required software and settings, test it on a sample device, then deploy it to all 30 laptops at once using imaging.',
        commonMistakes: ['Manually configuring each device', 'Skipping the testing phase'],
        dcsContext: 'Bulk deployment is a core IT operation in schools.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment',
        weakTopic: 'hardware-troubleshooting',
        options: [
          { id: 'a', label: 'Manually set up each of the 30 laptops individually.' },
          { id: 'b', label: 'Create a reference image, test it on one sample device, then deploy to all 30.' },
          { id: 'c', label: 'Ask the vendor to pre-load the image.' },
          { id: 'd', label: 'Image the first 10, then manually configure the rest.' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'imaging-q2',
        prompt: 'Explain the difference between a base image and a reference image in plain English.',
        domain: 'Device Imaging',
        difficulty: 'stretch',
        explanation: 'The base is bare; the reference is ready.',
        modelAnswer:
          'A base image is a clean, minimal Windows or macOS install. A reference image is that base plus all the applications, settings, and configurations a school device needs. Schools deploy the reference image, not the bare base image.',
        commonMistakes: ['Treating them as the same', 'Deploying a base image to users'],
        dcsContext: 'Understanding the difference helps you support imaging operations.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment',
        weakTopic: 'hardware-troubleshooting',
        rubric: ['Defines base clearly', 'Defines reference clearly', 'Explains why the distinction matters'],
        keywordHints: ['clean', 'minimal', 'applications', 'settings', 'ready to deploy']
      }),
      orderSteps({
        id: 'imaging-q3',
        prompt: 'Order the correct steps for a safe device imaging deployment.',
        domain: 'Device Imaging',
        difficulty: 'stretch',
        explanation: 'Testing prevents failures at scale.',
        modelAnswer: 'Build the reference image, test it on a sample device (verify all software and drivers), document the results, then deploy to the wider fleet.',
        commonMistakes: ['Skipping testing', 'Deploying without documenting changes'],
        dcsContext: 'A tested deployment prevents widespread failures.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment',
        weakTopic: 'hardware-troubleshooting',
        steps: [
          { id: 'build', label: 'Build the reference image with required software and settings' },
          { id: 'test', label: 'Test the reference image on a sample device' },
          { id: 'verify', label: 'Verify all applications, network shares, and drivers work' },
          { id: 'document', label: 'Document the image content and test results' },
          { id: 'deploy', label: 'Deploy the golden image to the wider fleet' }
        ],
        correctOrder: ['build', 'test', 'verify', 'document', 'deploy'],
        rubric: ['Tests before deployment', 'Documents thoroughly', 'Deploys to fleet only after validation']
      }),
      scenarioResponse({
        id: 'imaging-q4',
        prompt: 'A device fails to boot after imaging. Describe what information you would gather and how you would report the failure to the imaging team.',
        domain: 'Device Imaging',
        difficulty: 'challenge',
        explanation: 'Good troubleshooting data saves the team time.',
        modelAnswer:
          'Capture: the device name/asset tag, the image name and version, at what stage it failed (during imaging or at first boot), any error codes or messages, which hardware model it is, and whether other devices from the same batch succeeded or failed. Report all of this with a clear subject line (e.g., "Boot failure after imaging").',
        commonMistakes: ['Attempting to fix it without gathering details', 'Blaming the image without evidence'],
        dcsContext: 'Imaging failures are often hardware- or network-specific; details narrow down the cause.',
        reviewSchedule,
        recommendedModuleId: 'device-imaging-deployment',
        weakTopic: 'hardware-troubleshooting',
        rubric: ['Gathers device details', 'Notes image version and stage', 'Captures error codes', 'Clear escalation note']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('device-imaging-deployment', [
      {
        title: 'Reference image testing',
        prompt: 'You have a new reference image to test. Write a testing checklist that validates the image is ready for production deployment.'
      },
      {
        title: 'Imaging failure',
        prompt: 'Five devices from a batch of 50 fail to boot after imaging. Describe how you would investigate and what you would report to the imaging team.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('device-imaging-deployment', [
      {
        title: 'Imaging Checklist',
        description: 'Create a step-by-step checklist for preparing a device for imaging and validating the image deployment.'
      },
      {
        title: 'Image Change Log Template',
        description: 'Design a template for documenting image versions, contents, changes, and test results.'
      }
    ])
  }),
  createModule({
    id: 'cloud-fundamentals',
    title: 'Cloud Fundamentals',
    description:
      'Understand cloud computing basics: what the cloud is, cloud service models (IaaS, PaaS, SaaS), deployment models (public, private, hybrid), and how to troubleshoot cloud service issues at Level 1.',
    domain: 'Cloud and Platforms',
    level: 'L1',
    estimatedMinutes: 22,
    tags: ['cloud', 'SaaS', 'PaaS', 'IaaS', 'Office 365', 'Azure'],
    learningObjectives: [
      'Define cloud computing and its benefits.',
      'Distinguish between IaaS, PaaS, and SaaS.',
      'Understand public, private, and hybrid cloud models.',
      'Troubleshoot common cloud service issues safely.'
    ],
    dcsRelevance: [
      'Schools increasingly rely on cloud services like Office 365, Google Workspace, and Intune.',
      'Understanding cloud models helps staff use services correctly and troubleshoot issues.',
      'Cloud services shift some IT operations but require new support skills.'
    ],
    sections: buildSections('cloud-fundamentals', [
      {
        title: 'What is cloud computing?',
        bodyMarkdown:
          'Cloud computing is on-demand access to computing resourcesâ€”servers, storage, databases, softwareâ€”delivered over the internet. Instead of owning servers and storage, schools "rent" these resources from providers like Microsoft, Google, or Amazon. Benefits: reduced upfront cost, automatic updates and patches, access from anywhere, and scalability. The trade-off: reliance on internet connectivity and the provider\'s security and availability.',
        takeaway: 'Cloud = rented computing power delivered over the internet.'
      },
      {
        title: 'Three cloud service models: IaaS, PaaS, SaaS',
        bodyMarkdown:
          'Infrastructure as a Service (IaaS): the provider manages servers and storage; you configure the operating system and applications. Example: Azure Virtual Machines. Platform as a Service (PaaS): the provider manages infrastructure and tools; you write applications. Example: Azure App Service. Software as a Service (SaaS): the provider manages everything; you use the application via a browser. Example: Office 365, Google Workspace. Think: IaaS is "rent the hardware", PaaS is "rent the platform", SaaS is "rent the application".',
        takeaway: 'IaaS = infrastructure, PaaS = platform, SaaS = software.'
      },
      {
        title: 'Cloud deployment models: public, private, hybrid',
        bodyMarkdown:
          'Public cloud: the provider\'s infrastructure is shared by many organizations. Lower cost but less control. Example: Microsoft Office 365. Private cloud: dedicated infrastructure for one organization. Higher cost but more control. Example: on-premises Intune or SharePoint. Hybrid cloud: combination of public and private, with integration between them. Example: local file servers plus cloud Office 365. Schools often use hybrid: some services in the cloud, some on-premises.',
        takeaway: 'Public = shared and cheaper, Private = dedicated and controlled, Hybrid = both.'
      },
      {
        title: 'Common cloud service blockers at Level 1',
        bodyMarkdown:
          'Common issues: no internet connection (cannot access cloud services at all), account access problems (user cannot sign in), data sync issues (files not appearing across devices), and service outages (the provider\'s service is down). Level 1 triage: confirm the internet connection is working, confirm the user can sign in, check whether other users are experiencing the same issue, then check the provider\'s status page. Escalate if the issue is on the provider\'s side or requires account/permission changes.',
        takeaway: 'Internet, authentication, sync, and availability are the main failure points.'
      },
      {
        title: 'Safe Level 1 cloud troubleshooting',
        bodyMarkdown:
          'Do not attempt to change cloud settings, permissions, or configurations without guidance. Instead: confirm internet connectivity, verify the user can authenticate, check for service outages, compare with other users to establish scope, and escalate with this context. Cloud service troubleshooting often requires Level 2 or vendor support because settings and data are managed in the cloud, not on the local device.',
        takeaway: 'Cloud issues often need cloud-side investigation; gather context and escalate.'
      }
    ]),
    flashcards: buildFlashcards('cloud-fundamentals', [
      ['What is cloud computing?', 'On-demand access to computing resources (servers, storage, software) delivered over the internet.'],
      ['What does IaaS stand for?', 'Infrastructure as a Serviceâ€”the provider manages servers and storage; you manage the operating system and applications.'],
      ['What does PaaS stand for?', 'Platform as a Serviceâ€”the provider manages infrastructure and tools; you write applications.'],
      ['What does SaaS stand for?', 'Software as a Serviceâ€”the provider manages everything; you use the application via a browser.'],
      ['What is an example of SaaS?', 'Office 365, Google Workspace, Teams, SharePoint Online.'],
      ['What is public cloud?', 'Shared infrastructure managed by a provider and used by many organizations.'],
      ['What is private cloud?', 'Dedicated infrastructure for one organization, with more control but higher cost.'],
      ['What is the difference between public and hybrid cloud?', 'Public is entirely cloud-based; hybrid combines on-premises and cloud services with integration between them.']
    ]),
    quiz: [
      mcq({
        id: 'cloud-q1',
        prompt: 'A staff member cannot access their Office 365 email from home. The internet connection is working. What should you check next?',
        domain: 'Cloud Fundamentals',
        difficulty: 'foundation',
        explanation: 'Authentication is the gateway to cloud services.',
        modelAnswer: 'Confirm they can sign in to the Office 365 portal with their credentials. If sign-in fails, the issue is authentication; if it succeeds, the issue may be browser, cache, or client setup.',
        commonMistakes: ['Assuming it is internet connectivity', 'Trying to change cloud settings without guidance'],
        dcsContext: 'Office 365 is a SaaSâ€”sign-in is the key.',
        reviewSchedule,
        recommendedModuleId: 'cloud-fundamentals',
        weakTopic: 'cloud-models',
        options: [
          { id: 'a', label: 'Verify they can sign in to the Office 365 portal with their username and password.' },
          { id: 'b', label: 'Tell them to restart their computer and try again.' },
          { id: 'c', label: 'Assume their account is disabled.' },
          { id: 'd', label: 'Try to reset their cloud permissions.' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'cloud-q2',
        prompt: 'Explain the difference between IaaS and SaaS in a way a teacher would understand.',
        domain: 'Cloud Fundamentals',
        difficulty: 'stretch',
        explanation: 'IaaS is the building, SaaS is the finished house.',
        modelAnswer:
          'IaaS is like renting a server from the cloud; you still have to set it up and configure it yourself. SaaS is like using Office 365 or Teamsâ€”the whole application is ready to use; you just sign in. With SaaS, the provider handles all the setup, updates, and maintenance.',
        commonMistakes: ['Conflating IaaS and SaaS', 'Confusing them with on-premises services'],
        dcsContext: 'Schools mostly use SaaS; understanding the difference helps with support conversations.',
        reviewSchedule,
        recommendedModuleId: 'cloud-fundamentals',
        weakTopic: 'cloud-models',
        rubric: ['Uses analogies', 'Separates "build it yourself" from "use it as-is"', 'Mentions updates and maintenance'],
        keywordHints: ['rent the server', 'ready to use', 'updates', 'maintenance']
      }),
      orderSteps({
        id: 'cloud-q3',
        prompt: 'Order the safe first-line troubleshooting steps for a cloud service access issue.',
        domain: 'Cloud Fundamentals',
        difficulty: 'stretch',
        explanation: 'Diagnose before escalating.',
        modelAnswer: 'Confirm internet is working, verify the user can sign in, check whether others are affected, check the provider\'s status page, then escalate with context.',
        commonMistakes: ['Jumping to escalation without checking basics', 'Assuming outage without verification'],
        dcsContext: 'Good triage prevents unnecessary escalations.',
        reviewSchedule,
        recommendedModuleId: 'cloud-fundamentals',
        weakTopic: 'cloud-models',
        steps: [
          { id: 'internet', label: 'Confirm internet connectivity is working' },
          { id: 'signin', label: 'Verify the user can sign in with their credentials' },
          { id: 'scope', label: 'Ask whether other users can access the service' },
          { id: 'status', label: 'Check the provider\'s status page for outages' },
          { id: 'escalate', label: 'Escalate with context about what you\'ve checked' }
        ],
        correctOrder: ['internet', 'signin', 'scope', 'status', 'escalate'],
        rubric: ['Checks internet first', 'Verifies authentication', 'Determines scope', 'Checks status before claiming outage']
      }),
      scenarioResponse({
        id: 'cloud-q4',
        prompt: 'A teacher says, "I uploaded a document to OneDrive this morning, but it is not appearing on my laptop." The internet is working. Describe your response and how you would troubleshoot this.',
        domain: 'Cloud Fundamentals',
        difficulty: 'challenge',
        explanation: 'Sync issues require patience and context gathering.',
        modelAnswer:
          'Explain that OneDrive syncs files from the cloud to the device when you sign in. Verify they are signed in on the laptop, check whether the file appears on the web (office.com), wait a few minutes for sync, check whether the sync client shows any errors, then escalate if the file is in the cloud but not syncing locally.',
        commonMistakes: ['Assuming the file is lost', 'Attempting to manually sync without understanding'],
        dcsContext: 'Cloud sync is a common source of confusion.',
        reviewSchedule,
        recommendedModuleId: 'cloud-fundamentals',
        weakTopic: 'cloud-models',
        rubric: ['Explains sync behavior', 'Checks web access', 'Allows time for sync', 'Escalates with context']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('cloud-fundamentals', [
      {
        title: 'Office 365 sign-in issue',
        prompt: 'A new staff member cannot sign in to their email on their home computer, but another staff member using the same Wi-Fi can. Describe how you would troubleshoot and escalate.'
      },
      {
        title: 'Cloud sync delay',
        prompt: 'A teacher says files uploaded to Teams are not appearing on their device. Write an explanation and troubleshooting steps you would provide.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('cloud-fundamentals', [
      {
        title: 'Cloud Service Troubleshooting Flowchart',
        description: 'Create a decision tree for troubleshooting cloud service access issues, covering internet, authentication, scope, and status checks.'
      },
      {
        title: 'Office 365 / Cloud Service Quick Reference',
        description: 'Design a one-page quick-reference guide for the main cloud services the school uses (Outlook, Teams, SharePoint, OneDrive), including their purpose and common issues.'
      }
    ])
  })
];

export const modules: TrainingModule[] = [
  ...baseModules.map((module) => enhanceModule(module, moduleEnhancements[module.id])),
  ...additionalModules,
  createModule({
    id: 'accessibility-assistive-technology',
    title: 'Accessibility and Assistive Technology',
    description:
      'Learn Web Content Accessibility Guidelines (WCAG) fundamentals, assistive technology, and how to support users with visual, auditory, motor, or cognitive disabilities. Understand legal requirements and inclusive design principles.',
    domain: 'Endpoint Support',
    level: 'L1',
    estimatedMinutes: 24,
    tags: ['accessibility', 'WCAG', 'assistive tech', 'screen readers', 'inclusive design'],
    learningObjectives: [
      'Understand WCAG 2.1 accessibility standards and their purpose.',
      'Recognize common assistive technologies and their use cases.',
      'Support users with disabilities safely and respectfully.',
      'Identify accessibility barriers and know how to report them.'
    ],
    dcsRelevance: [
      'Schools have a legal obligation to provide accessible technology and services.',
      'Many students and staff have disabilities; supporting them is part of inclusive education.',
      'Accessible design benefits everyone, not just users with disabilities.'
    ],
    sections: buildSections('accessibility-assistive-technology', [
      {
        title: 'WCAG 2.1 and accessibility standards',
        bodyMarkdown:
          'The Web Content Accessibility Guidelines (WCAG) are international standards for accessible web and digital content. WCAG 2.1 has three levels: A (minimum), AA (standard), and AAA (enhanced). Schools should aim for AA compliance. The guidelines cover four principles: Perceivable (content can be sensed), Operable (users can navigate), Understandable (content is clear), and Robust (works with assistive tech). Examples: images need alt text (Perceivable), buttons need keyboard access (Operable), language is clear (Understandable), and code is valid (Robust).',
        takeaway: 'WCAG AA is the standard; all four principles matter.'
      },
      {
        title: 'Common assistive technologies',
        bodyMarkdown:
          'Screen readers: software that reads text aloud for blind users (NVDA, JAWS, iOS VoiceOver). Magnifiers: enlarge text for low-vision users. Speech-to-text: users speak to control devices (Windows Narrator, iOS Voice Control). Captions: text of audio for deaf or hard-of-hearing users. Switch access: allows users with limited mobility to control devices. Predictive text: helps users with dyslexia or motor disabilities. High-contrast themes: help users with low vision. Level 1 support should be familiar with these and know when to suggest them to users.',
        takeaway: 'Assistive tech is available; know what is available and how to enable it.'
      },
      {
        title: 'Supporting users with disabilities',
        bodyMarkdown:
          'Listen and ask: if a user says they have a disability or need accommodation, listen without judgment and ask what would help. Provide options: multiple ways to do the same task (keyboard, mouse, touch). Use plain language: avoid jargon and keep sentences short. Test with users: involve users with disabilities in designing and testing solutions. Avoid assumptions: do not assume all users experience technology the same way. Level 1 support can enable high-contrast themes, activate screen readers, provide captions, and connect users with accessibility resources.',
        takeaway: 'Listen, ask, and provide options.'
      },
      {
        title: 'Accessibility barriers and how to report them',
        bodyMarkdown:
          'Common barriers: no alt text on images, keyboard navigation not working, no captions on videos, poor colour contrast, inaccessible forms, confusing navigation, and missing ARIA labels. If you encounter an accessibility barrier: document what the barrier is, which device or service is affected, which user cannot complete the task, and what assistive technology they were using. Report it to the development or operations team so it can be fixed.',
        takeaway: 'Document barriers clearly; they can usually be fixed.'
      },
      {
        title: 'Legal and ethical responsibility',
        bodyMarkdown:
          'Schools have a legal obligation under disability discrimination laws to provide equal access to digital services. Beyond legal obligation, accessibility is about respect and inclusion. Students and staff with disabilities should be able to use school technology just as easily as anyone else. Making technology accessible is not "special treatment"; it is basic fairness and smart design that helps everyone.',
        takeaway: 'Accessibility is a legal requirement and a human responsibility.'
      }
    ]),
    flashcards: buildFlashcards('accessibility-assistive-technology', [
      ['What is WCAG?', 'Web Content Accessibility Guidelinesâ€”international standards for accessible web and digital content.'],
      ['What does WCAG AA mean?', 'The standard level of accessibility compliance that schools should aim for.'],
      ['What are the four WCAG principles?', 'Perceivable (content can be sensed), Operable (navigable), Understandable (clear), Robust (works with assistive tech).'],
      ['What is a screen reader?', 'Software that reads text aloud for blind or low-vision users (examples: NVDA, JAWS, VoiceOver).'],
      ['What is alt text?', 'Text description of an image that screen readers read aloud and appears if the image does not load.'],
      ['Why are captions important?', 'Captions provide the text of audio for deaf or hard-of-hearing users.'],
      ['What is high-contrast theme?', 'A visual setting that increases the contrast between text and background, helpful for low-vision users.'],
      ['What should you do if a user says they need accessibility support?', 'Listen without judgment, ask what would help, and provide options or connect them with resources.']
    ]),
    quiz: [
      mcq({
        id: 'a11y-q1',
        prompt: 'A student using a screen reader cannot access a form on the school website. The form buttons have no labels. What is the accessibility barrier?',
        domain: 'Accessibility',
        difficulty: 'foundation',
        explanation: 'Screen readers need text labels to read buttons aloud.',
        modelAnswer: 'The buttons are missing ARIA labels or text descriptions, so the screen reader cannot tell the user what each button does. This violates WCAG Operable principle.',
        commonMistakes: ['Assuming the student should "just use a mouse"', 'Blaming the user instead of the design'],
        dcsContext: 'Many students rely on screen readers; unlabeled buttons are a major barrier.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-assistive-technology',
        weakTopic: 'communication',
        options: [
          { id: 'a', label: 'The student should just use a mouse instead of a screen reader.' },
          { id: 'b', label: 'The buttons are missing text labels or ARIA descriptions; the screen reader cannot identify them.' },
          { id: 'c', label: 'Screen readers do not support forms; the student needs different software.' },
          { id: 'd', label: 'The school should disable the form for screen reader users.' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'a11y-q2',
        prompt: 'Explain the difference between alt text and a caption, and when each is used.',
        domain: 'Accessibility',
        difficulty: 'stretch',
        explanation: 'Alt text is for images; captions are for audio or video.',
        modelAnswer:
          'Alt text is a text description of an image that screen readers read aloud. Captions are the text of audio or video content for deaf or hard-of-hearing users. Use alt text on every image; use captions on every video or audio recording.',
        commonMistakes: ['Using alt text for video', 'Forgetting captions', 'Writing unhelpful alt text like "image"'],
        dcsContext: 'Both are required for WCAG AA compliance.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-assistive-technology',
        weakTopic: 'communication',
        rubric: ['Distinguishes alt text and captions', 'Explains use cases', 'Mentions WCAG compliance'],
        keywordHints: ['image', 'audio', 'screen reader', 'deaf', 'description']
      }),
      orderSteps({
        id: 'a11y-q3',
        prompt: 'Order the steps for making a simple document more accessible.',
        domain: 'Accessibility',
        difficulty: 'stretch',
        explanation: 'Perceivable and Understandable matter for documents.',
        modelAnswer: 'Use clear heading hierarchy, ensure high colour contrast, add alt text to images, use plain language, test with a screen reader, then ask a user with a disability for feedback.',
        commonMistakes: ['Skipping colour contrast', 'Not testing with assistive tech'],
        dcsContext: 'Many documents are not accessible; these steps fix most issues.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-assistive-technology',
        weakTopic: 'communication',
        steps: [
          { id: 'headings', label: 'Use clear heading hierarchy (Heading 1, 2, 3)' },
          { id: 'contrast', label: 'Ensure text and background have high colour contrast' },
          { id: 'alt', label: 'Add alt text to all images' },
          { id: 'language', label: 'Use plain language and short sentences' },
          { id: 'test', label: 'Test with a screen reader' },
          { id: 'feedback', label: 'Ask a user with a disability for feedback' }
        ],
        correctOrder: ['headings', 'contrast', 'alt', 'language', 'test', 'feedback'],
        rubric: ['Addresses Perceivable and Understandable', 'Tests with assistive tech', 'Seeks user feedback']
      }),
      scenarioResponse({
        id: 'a11y-q4',
        prompt: 'A teacher shows you a video on the school website but tells you it has no captions. A deaf student in their class cannot access the lesson. Explain what is missing and how you would report it.',
        domain: 'Accessibility',
        difficulty: 'challenge',
        explanation: 'Captions are legally required and ethically essential.',
        modelAnswer:
          'The video is missing captions, which is a WCAG Perceivable barrier. This violates accessibility standards and may violate disability law. Report it to the content team with the video link, note that it lacks captions, and escalate that a student cannot access the lesson without them. Captions should be added before the next class.',
        commonMistakes: ['Telling the student to find another video', 'Delaying the report'],
        dcsContext: 'Videos without captions lock deaf students out of learning.',
        reviewSchedule,
        recommendedModuleId: 'accessibility-assistive-technology',
        weakTopic: 'communication',
        rubric: ['Identifies missing captions', 'Frames as legal and ethical issue', 'Escalates for urgent fix']
      })
    ],
    scenarioPrompts: buildScenarioPrompts('accessibility-assistive-technology', [
      {
        title: 'Supporting a screen reader user',
        prompt: 'A student using a screen reader needs help accessing an online learning platform. Describe how you would support them and what you would look for in terms of accessibility.'
      },
      {
        title: 'Reporting an accessibility barrier',
        prompt: 'You find that a school form is not keyboard navigable. Write a report explaining the barrier and how it affects users.'
      }
    ]),
    practicalOutputs: buildPracticalOutputs('accessibility-assistive-technology', [
      {
        title: 'Accessibility Audit Checklist',
        description: 'Create a checklist for auditing a simple webpage or document for WCAG AA compliance (headings, alt text, contrast, captions, keyboard navigation).'
      },
      {
        title: 'Assistive Technology Quick Reference',
        description: 'Design a one-page guide listing common assistive technologies available in Windows and macOS, with instructions for enabling them.'
      }
    ])
  })
];

export function getModuleById(moduleId: string) {
  const resolvedId = legacyModuleAliases[moduleId] || moduleId;
  return modules.find((module) => module.id === resolvedId);
}

export function getModuleQuestions(moduleId: string, source: AssessmentSource = 'module-quiz') {
  const moduleData = getModuleById(moduleId);

  if (!moduleData) {
    return [];
  }

  return moduleData.quiz.map((question) => ({
    ...question,
    recommendedModuleId: question.recommendedModuleId,
    reviewSchedule: question.reviewSchedule,
    source
  }));
}

export default modules;
