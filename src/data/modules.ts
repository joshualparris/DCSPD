import type { AssessmentQuestion, AssessmentSource } from '../types/assessment';
import type { TrainingModule } from '../types/training';

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

export const legacyModuleAliases: Record<string, string> = {
  foundations: 'dcs-it-support-foundations',
  'library-daily-routines': 'classroom-display-viewboard-troubleshooting',
  'ict-helpdesk-101': 'ticket-notes-escalation-quality'
};

export const modules: TrainingModule[] = [
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


