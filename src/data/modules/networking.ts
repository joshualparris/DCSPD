import { mcq, shortAnswer, orderSteps, categorization, buildSections, buildFlashcards, buildScenarioPrompts, buildPracticalOutputs, createModule, enhanceModule, reviewSchedule, type LegacyTrainingModule, type ModuleEnhancement } from './helpers';

const basePortsAndProtocols: LegacyTrainingModule = {
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
};

const baseDnsDhcp: LegacyTrainingModule = {
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
};

const dnsDhcpEnhancement: ModuleEnhancement = {
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
};

const baseVlans: TrainingModule = createModule({
  id: 'vlans-network-segmentation',
  title: 'VLANs and Network Segmentation',
  description:
    'Understand why school networks are split into different virtual segments for security, performance, and privacy.',
  domain: 'Networking',
  level: 'A+',
  estimatedMinutes: 22,
  tags: ['VLANs', 'segmentation', 'security', 'broadcast domains'],
  learningObjectives: [
    'Explain why schools separate guest, staff, student, and admin traffic.',
    'Describe what happens when a device is on the wrong VLAN.',
    'Use segmentation knowledge to explain access blocks without overstepping.'
  ],
  dcsRelevance: [
    'Directly explains why guest Wi-Fi behaves differently from staff Wi-Fi.',
    'Supports better triage for printer and server access issues.',
    'Improves escalation notes for cross-network service requests.'
  ],
  sections: [
    {
      id: 'vlan-1',
      title: 'Why we segment school networks',
      bodyMarkdown:
        'VLANs (Virtual Local Area Networks) allow us to split one physical network into multiple logical ones. In a school, this is essential for security (keeping student devices away from admin servers), performance (reducing broadcast traffic), and privacy (isolating guest users).',
      takeaway: 'Segmentation is for security, performance, and privacy.'
    },
    {
      id: 'vlan-2',
      title: 'The "Wrong VLAN" symptom',
      bodyMarkdown:
        'When a device is on the wrong VLAN, it may have a valid IP address but still cannot reach the printers, servers, or dashboards it needs. This is common when a device moves between SSIDs or physical ports that are tagged differently.',
      takeaway: 'Valid IP + blocked access often points to a VLAN/segmentation issue.'
    }
  ],
  flashcards: [
    { id: 'vlan-f1', front: 'What is a VLAN?', back: 'A logical segment of a physical network.' },
    { id: 'vlan-f2', front: 'Name two reasons schools use VLANs.', back: 'Security, performance, or privacy.' },
    { id: 'vlan-f3', front: 'What is a common "Wrong VLAN" symptom?', back: 'Valid IP but blocked access to specific internal resources.' },
    { id: 'vlan-f4', front: 'Why isolate guest users on their own VLAN?', back: 'To protect internal school services and data from untrusted devices.' }
  ],
  quiz: [
    mcq({
      id: 'vlan-q1',
      prompt: 'A staff member on Guest Wi-Fi cannot reach the staff printer. What is the most likely design reason?',
      domain: 'VLAN and segmentation',
      difficulty: 'foundation',
      explanation: 'Guest networks are usually isolated from internal services.',
      modelAnswer: 'The guest VLAN is isolated from the staff printer VLAN for security.',
      commonMistakes: ['Calling it a printer failure', 'Assuming Guest Wi-Fi should have full access'],
      dcsContext: 'Guest isolation is a deliberate security choice at DCS.',
      reviewSchedule,
      recommendedModuleId: 'vlans-network-segmentation',
      weakTopic: 'vlan-firewall-rules',
      options: [
        { id: 'a', label: 'The guest VLAN is intentionally isolated' },
        { id: 'b', label: 'The printer is out of toner' },
        { id: 'c', label: 'DNS is broken for the whole school' },
        { id: 'd', label: 'The staff member has the wrong password' }
      ],
      correctOptionId: 'a'
    })
  ],
  scenarioPrompts: [
    {
      id: 'vlan-s1',
      title: 'Guest access request',
      prompt: 'Respond to a request for a guest device to access a staff-only internal resource.'
    }
  ],
  practicalOutputs: [
    {
      id: 'vlan-p1',
      title: 'VLAN mapping summary',
      description: 'Draft a short summary of which school services should be reachable from which network segments.'
    }
  ]
});

const vlanEnhancement: ModuleEnhancement = {
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
};

export const networkingModules = [
  createModule(basePortsAndProtocols),
  enhanceModule(baseDnsDhcp, dnsDhcpEnhancement),
  enhanceModule(baseVlans, vlanEnhancement)
];
