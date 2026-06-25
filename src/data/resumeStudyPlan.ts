export type ResumeStudyStepId = 'read' | 'recall' | 'scenario' | 'ticket-note' | 'complete';

export type ResumeStudyStep = {
  id: ResumeStudyStepId;
  label: string;
  minutes: number;
  instruction: string;
  prompt: string;
  outputHint: string;
};

export type ResumeStudyDay = {
  day: number;
  week: string;
  topic: string;
  goal: string;
  resourceHint: string;
  steps: ResumeStudyStep[];
};

type DaySeed = {
  week: string;
  topic: string;
  goal: string;
  read: string;
  recall: string;
  scenario: string;
  ticketNote: string;
};

function buildDay(day: number, seed: DaySeed): ResumeStudyDay {
  return {
    day,
    week: seed.week,
    topic: seed.topic,
    goal: seed.goal,
    resourceHint: seed.read,
    steps: [
      {
        id: 'read',
        label: 'Read',
        minutes: 8,
        instruction: 'Open the matching resource and read only the section for this topic. Stop when the timer ends.',
        prompt: seed.read,
        outputHint: 'Write one sentence naming the main idea you just read.',
      },
      {
        id: 'recall',
        label: 'Recall',
        minutes: 5,
        instruction: 'Close or minimise the resource. Explain the concept from memory using the four-part structure.',
        prompt: seed.recall,
        outputHint: 'Use: definition → parts/categories → help desk example → why it matters.',
      },
      {
        id: 'scenario',
        label: 'Scenario',
        minutes: 10,
        instruction: 'Apply the topic to one realistic first-line support situation.',
        prompt: seed.scenario,
        outputHint: 'Answer with your first checks, what you would ask, and what you would do next.',
      },
      {
        id: 'ticket-note',
        label: 'Ticket note',
        minutes: 5,
        instruction: 'Turn the scenario into a short professional ticket note.',
        prompt: seed.ticketNote,
        outputHint: 'Use: issue reported → checks completed → result → next action/escalation.',
      },
      {
        id: 'complete',
        label: 'Mark complete',
        minutes: 2,
        instruction: 'Save the learning evidence and move to the next study block when ready.',
        prompt: `Today I studied ${seed.topic}. I practised explaining the concept, applying it to a support scenario, and writing a clear ticket note.`,
        outputHint: 'Copy this summary into PD log/evidence if useful, then mark the step complete.',
      },
    ],
  };
}

export const resumeStudyPlan: ResumeStudyDay[] = [
  buildDay(1, {
    week: 'Week 1 — Help desk structure',
    topic: 'Incident vs service request',
    goal: 'Separate broken-service restoration from standard fulfilment requests.',
    read: 'Read the ITIL/service desk section on incidents and service requests, or review the DCSPrep module most closely related to service desk foundations.',
    recall: 'Define incident and service request. Give one help desk example of each. Explain why password resets are often service requests.',
    scenario: 'A staff member says their email is not working. Another staff member asks for access to a shared folder. Classify each and say what you would do first.',
    ticketNote: 'Write two ticket notes: one for the email incident, one for the shared-folder service request.',
  }),
  buildDay(2, {
    week: 'Week 1 — Help desk structure',
    topic: 'Troubleshooting method',
    goal: 'Use a consistent order: scope, physical, network/service, configuration, test.',
    read: 'Read or review a troubleshooting process section. Focus on narrowing scope before changing settings.',
    recall: 'Explain why “is it just you or everyone?” is often the best first question.',
    scenario: 'A teacher cannot print five minutes before class. Walk through your first checks in order.',
    ticketNote: 'Write a ticket note showing what you checked before escalating or fixing.',
  }),
  buildDay(3, {
    week: 'Week 1 — Help desk structure',
    topic: 'Ticket notes and escalation',
    goal: 'Write clear notes that protect continuity when someone else picks up the ticket.',
    read: 'Review ticket-note, escalation, or service desk documentation guidance in DCSPrep.',
    recall: 'List the minimum fields a good ticket note should contain.',
    scenario: 'A walk-up issue is partly fixed but needs a senior technician. What do you record before handing it over?',
    ticketNote: 'Write the escalation note with symptoms, checks, result, impact, and requested next action.',
  }),
  buildDay(4, {
    week: 'Week 1 — Help desk structure',
    topic: 'Incident vs problem vs change',
    goal: 'Tell apart restoring service, finding root cause, and controlling planned change.',
    read: 'Read the ITIL section on incident management, problem management, and change enablement.',
    recall: 'Define incident, problem, and change in one sentence each.',
    scenario: 'Several classrooms have the same display issue after an update. Classify the immediate ticket, the root-cause work, and any planned fix rollout.',
    ticketNote: 'Write a note that explains what is being restored now and what needs problem/change follow-up.',
  }),
  buildDay(5, {
    week: 'Week 2 — Networking basics',
    topic: 'IP address, gateway, and subnet',
    goal: 'Understand the basic addressing information needed for a device to communicate.',
    read: 'Review IP, gateway, subnet, and LAN basics in DCSPrep or your networking notes.',
    recall: 'Explain IP address, subnet mask, and default gateway in plain English.',
    scenario: 'A laptop has Wi-Fi connected but cannot reach internal services. What IP settings would you check?',
    ticketNote: 'Write a ticket note showing the IP configuration checks and what they suggested.',
  }),
  buildDay(6, {
    week: 'Week 2 — Networking basics',
    topic: 'DNS, caching, and TTL',
    goal: 'Recognise when name resolution is broken even though IP connectivity works.',
    read: 'Review DNS resolver settings, caching, and TTL. Focus on what changes when you can ping an IP but not resolve a name.',
    recall: 'Explain DNS, resolver, cache, and TTL using the structure: definition → parts → example → why it matters.',
    scenario: 'You can ping 8.8.8.8 but google.com does not resolve. What is the likely fault and how do you confirm it?',
    ticketNote: 'Write the ticket note with the DNS test, result, and next action.',
  }),
  buildDay(7, {
    week: 'Week 2 — Networking basics',
    topic: 'DHCP',
    goal: 'Understand how devices automatically receive network settings and what breaks when DHCP fails.',
    read: 'Review DHCP leases, scopes, reservations, and common DHCP symptoms.',
    recall: 'Explain what DHCP gives a device and why APIPA/self-assigned addresses matter.',
    scenario: 'A device has a 169.254.x.x address and no internet. What does that suggest and what do you check?',
    ticketNote: 'Write a note explaining the address observed, DHCP suspicion, and next checks.',
  }),
  buildDay(8, {
    week: 'Week 2 — Networking basics',
    topic: 'TCP vs UDP and common ports',
    goal: 'Explain reliability vs speed trade-offs and connect them to real support issues.',
    read: 'Review TCP, UDP, and common ports such as 53, 80, 443, 3389, and VoIP-related ports.',
    recall: 'Define TCP and UDP and name one real service that commonly uses each.',
    scenario: 'A VoIP call is choppy but web browsing is fine. How does UDP help explain the symptom?',
    ticketNote: 'Write a note that captures symptoms, network checks, and likely next escalation data.',
  }),
  buildDay(9, {
    week: 'Week 3 — Security basics',
    topic: 'MFA factors and account recovery',
    goal: 'Use the three-factor structure and avoid treating all second steps as equal.',
    read: 'Review MFA, authenticator apps, SMS, hardware keys, and account recovery procedures.',
    recall: 'Name the three MFA factor categories: something you know, have, and are. Give examples.',
    scenario: 'A user has a new phone and cannot approve MFA prompts. What is safe to check before resetting anything?',
    ticketNote: 'Write a privacy-safe ticket note for an MFA reset request.',
  }),
  buildDay(10, {
    week: 'Week 3 — Security basics',
    topic: 'CIA triad',
    goal: 'Map security controls to confidentiality, integrity, and availability.',
    read: 'Review the CIA triad and examples of controls for each part.',
    recall: 'Define confidentiality, integrity, and availability with one example control each.',
    scenario: 'A shared file is available to everyone, editable by anyone, and needed for class. Which CIA risks exist?',
    ticketNote: 'Write a note that separates access risk, data-change risk, and availability need.',
  }),
  buildDay(11, {
    week: 'Week 3 — Security basics',
    topic: '3-2-1 backup rule',
    goal: 'Explain backup resilience against deletion, hardware failure, site loss, and ransomware.',
    read: 'Review backup concepts, restore testing, offline/off-site copies, and retention.',
    recall: 'State the 3-2-1 rule and explain what each number protects against.',
    scenario: 'A user deleted a critical file yesterday. What do you check before promising recovery?',
    ticketNote: 'Write a restore request note with file path, time, impact, and restore constraints.',
  }),
  buildDay(12, {
    week: 'Week 3 — Security basics',
    topic: 'Phishing triage',
    goal: 'Triage suspicious emails without exposing private content or clicking unsafe links.',
    read: 'Review phishing indicators, safe reporting, headers/sender checks, and escalation rules.',
    recall: 'List five phishing indicators and the safe first actions.',
    scenario: 'A staff member forwards a suspicious invoice email. What do you check and what do you avoid?',
    ticketNote: 'Write a privacy-safe phishing triage note and escalation summary.',
  }),
  buildDay(13, {
    week: 'Week 4 — Work-readiness',
    topic: 'Printer troubleshooting',
    goal: 'Scope local vs shared printer faults and check queue/spooler/device state in order.',
    read: 'Review printer troubleshooting: device state, queue, spooler, driver, network, and permissions.',
    recall: 'Explain the printer troubleshooting order from simplest to deepest.',
    scenario: 'One user cannot print but others can. What does that tell you and what do you check next?',
    ticketNote: 'Write a printer ticket note with scope, queue/spooler status, and outcome.',
  }),
  buildDay(14, {
    week: 'Week 4 — Work-readiness',
    topic: 'Windows slowness',
    goal: 'Read Task Manager symptoms and separate CPU, memory, disk, startup, and malware/update causes.',
    read: 'Review Windows performance basics and Task Manager triage.',
    recall: 'Explain what you look at first in Task Manager and what each column can mean.',
    scenario: 'A staff laptop is painfully slow after login but improves after 10 minutes. What do you check?',
    ticketNote: 'Write a note summarising performance observations and practical next actions.',
  }),
  buildDay(15, {
    week: 'Week 4 — Work-readiness',
    topic: 'Shared drives, permissions, and groups',
    goal: 'Use groups for access rather than one-off user permissions.',
    read: 'Review shared folder permissions, security groups, distribution groups, and least privilege.',
    recall: 'Explain the difference between security groups and distribution groups.',
    scenario: 'A new staff member needs access to a department folder. How should access be granted?',
    ticketNote: 'Write the access request note with requester, approval, group/folder, and completion evidence.',
  }),
  buildDay(16, {
    week: 'Week 4 — Work-readiness',
    topic: 'Practice exam and evidence summary',
    goal: 'Pull the previous topics together into a short evidence summary and next study target.',
    read: 'Review your notes from Days 1–15 and choose the three weakest topics.',
    recall: 'Summarise what improved: structure, troubleshooting order, and ticket-note quality.',
    scenario: 'Take one mixed practice scenario: user cannot access a cloud app, MFA prompt changed, and another user is unaffected. Scope it.',
    ticketNote: 'Write a final evidence note: what you studied, what you can now explain, and what needs another pass.',
  }),
];

export const resumeStudyPlanTotalSteps = resumeStudyPlan.reduce((sum, day) => sum + day.steps.length, 0);
