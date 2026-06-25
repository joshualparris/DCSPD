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
        instruction: 'Read this short explanation in the app. Do not leave the app. Answer the sentence task at the end.',
        prompt: seed.read,
        outputHint: 'Answer the sentence task at the end using your own words.',
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
    read: `An incident is when something is broken, degraded, or not working as expected. The goal is to restore normal service as quickly as possible.

Examples:
- A teacher cannot connect to Wi-Fi.
- A classroom printer is not printing.
- A student laptop will not boot.
- Email is down or not sending.

A service request is when nothing is broken, but the user needs something standard to be provided, changed, or set up.

Examples:
- Please reset my password.
- Please give me access to a shared drive.
- Please install approved software.
- Please set up a new device or account.

Main idea:
Incidents restore something broken. Service requests fulfil something standard.

Now write one sentence in your own words:
"An incident is ______, while a service request is ______."`,
    recall: 'Define incident and service request. Give one help desk example of each. Explain why password resets are often service requests.',
    scenario: 'A staff member says their email is not working. Another staff member asks for access to a shared folder. Classify each and say what you would do first.',
    ticketNote: 'Write two ticket notes: one for the email incident, one for the shared-folder service request.',
  }),
  buildDay(2, {
    week: 'Week 1 — Help desk structure',
    topic: 'Troubleshooting method',
    goal: 'Use a consistent order: scope, physical, network/service, configuration, test.',
    read: `Troubleshooting should start by defining the scope before changing anything. First ask whether the issue affects one user, one device, one application, or the whole room. Then check physical items, then network and services, then configuration, and finally test the result.

Examples:
- A teacher cannot print: check power, cables, printer queue, then driver/settings.
- A laptop has no Wi-Fi: check airplane mode, cable, wireless signal, then network settings.
- A password reset request is usually a service request, not a broken service.
- A “page unavailable” error may be a network or DNS issue.

Main idea:
Start with scope, then physical, network/service, configuration, test.

Now write one sentence in your own words:
"The best first troubleshooting step is ______ because ______."`,
    recall: 'Explain why “is it just you or everyone?” is often the best first question.',
    scenario: 'A teacher cannot print five minutes before class. Walk through your first checks in order.',
    ticketNote: 'Write a ticket note showing what you checked before escalating or fixing.',
  }),
  buildDay(3, {
    week: 'Week 1 — Help desk structure',
    topic: 'Ticket notes and escalation',
    goal: 'Write clear notes that protect continuity when someone else picks up the ticket.',
    read: `Good ticket notes let the next technician pick up the issue without guessing. Include what was reported, what you checked, what you found, what you fixed or could not fix, and the next action or escalation request.

Examples:
- 'User cannot print from Room 12, printer is online, paper loaded, queue cleared, still fails with error E0003.'
- 'Student laptop boot loop, BIOS checked, disk appears healthy, escalate to tier 2 for hardware test.'
- 'Teacher email not sending, Outlook was offline, reconnected account, monitor for 10 minutes.'
- 'Shared folder access denied, group membership checked, missing AD group, request admin approval.'

Main idea:
Clear notes save time and reduce repeated work.

Now write one sentence in your own words:
'A good ticket note should include ______.'`,
    recall: 'List the minimum fields a good ticket note should contain.',
    scenario: 'A walk-up issue is partly fixed but needs a senior technician. What do you record before handing it over?',
    ticketNote: 'Write the escalation note with symptoms, checks, result, impact, and requested next action.',
  }),
  buildDay(4, {
    week: 'Week 1 — Help desk structure',
    topic: 'Incident vs problem vs change',
    goal: 'Tell apart restoring service, finding root cause, and controlling planned change.',
    read: `Incident management restores service quickly. Problem management finds the root cause after one or more incidents. Change enablement controls planned updates so fixes do not cause more incidents.

Examples:
- Incident: Wi-Fi is down for a classroom.
- Problem: Investigate why the Wi-Fi controller keeps failing.
- Change: Schedule firmware upgrades for the wireless controller.
- Incident: A printer is offline. Problem: Replace failing printer hardware. Change: Deploy a new printer configuration.

Main idea:
Incident = restore now. Problem = investigate cause. Change = manage planned updates.

Now write one sentence in your own words:
'An incident is ______, a problem is ______, and a change is ______.'`,
    recall: 'Define incident, problem, and change in one sentence each.',
    scenario: 'Several classrooms have the same display issue after an update. Classify the immediate ticket, the root-cause work, and any planned fix rollout.',
    ticketNote: 'Write a note that explains what is being restored now and what needs problem/change follow-up.',
  }),
  buildDay(5, {
    week: 'Week 2 — Networking basics',
    topic: 'IP address, gateway, and subnet',
    goal: 'Understand the basic addressing information needed for a device to communicate.',
    read: `Devices use IP addresses to identify themselves on a network. The subnet mask defines which devices are on the same local network, and the default gateway is the router used to reach other networks.

Examples:
- 192.168.1.45 with mask 255.255.255.0 means it is on the 192.168.1.x subnet.
- If the gateway is 192.168.1.1, anything outside 192.168.1.x goes through that router.
- A laptop with 169.254.x.x means it did not get a DHCP address.
- A device on the wrong subnet cannot talk to the intended server.

Main idea:
IP = address, subnet = local group, gateway = router out.

Now write one sentence in your own words:
'An IP address is ______, the subnet mask is ______, and the gateway is ______.'`,
    recall: 'Explain IP address, subnet mask, and default gateway in plain English.',
    scenario: 'A laptop has Wi-Fi connected but cannot reach internal services. What IP settings would you check?',
    ticketNote: 'Write a ticket note showing the IP configuration checks and what they suggested.',
  }),
  buildDay(6, {
    week: 'Week 2 — Networking basics',
    topic: 'DNS, caching, and TTL',
    goal: 'Recognise when name resolution is broken even though IP connectivity works.',
    read: `DNS converts names like google.com into IP addresses that devices can use. The resolver remembers answers in a cache for a limited time (TTL), so DNS changes may not show up right away.

Examples:
- 'nslookup google.com' returns an IP address.
- 'ping 8.8.8.8' works but 'ping google.com' fails.
- A stale cache can keep returning an old address.
- TTL tells servers how long to keep the DNS answer before rechecking.

Main idea:
DNS turns names into addresses and caching can delay updates.

Now write one sentence in your own words:
'DNS is ______, caching means ______, and TTL means ______.'`,
    recall: 'Explain DNS, resolver, cache, and TTL using the structure: definition → parts → example → why it matters.',
    scenario: 'You can ping 8.8.8.8 but google.com does not resolve. What is the likely fault and how do you confirm it?',
    ticketNote: 'Write the ticket note with the DNS test, result, and next action.',
  }),
  buildDay(7, {
    week: 'Week 2 — Networking basics',
    topic: 'DHCP',
    goal: 'Understand how devices automatically receive network settings and what breaks when DHCP fails.',
    read: `DHCP gives devices their IP settings automatically, including address, subnet mask, gateway, and DNS. When DHCP fails, devices may get a self-assigned address and lose network access.

Examples:
- Getting 192.168.1.55 means DHCP worked.
- Getting 169.254.x.x means DHCP failed.
- A reserved DHCP address means the same device gets the same IP every time.
- A full DHCP scope means no new device can get an address.

Main idea:
DHCP automatically provides network settings; failure causes lost connectivity.

Now write one sentence in your own words:
'DHCP is ______, and if it fails the device ______.'`,
    recall: 'Explain what DHCP gives a device and why APIPA/self-assigned addresses matter.',
    scenario: 'A device has a 169.254.x.x address and no internet. What does that suggest and what do you check?',
    ticketNote: 'Write a note explaining the address observed, DHCP suspicion, and next checks.',
  }),
  buildDay(8, {
    week: 'Week 2 — Networking basics',
    topic: 'TCP vs UDP and common ports',
    goal: 'Explain reliability vs speed trade-offs and connect them to real support issues.',
    read: `TCP is a reliable connection that checks every packet and resends if needed. UDP is faster and does not retry, so it is used for voice, video, and other real-time traffic.

Examples:
- Web browsing uses TCP on port 80/443.
- VoIP calls use UDP for low delay.
- DNS queries often use UDP on port 53.
- Remote desktop uses TCP on port 3389.

Main idea:
TCP is reliable and slower; UDP is fast and less reliable.

Now write one sentence in your own words:
'TCP is ______, while UDP is ______.'`,
    recall: 'Define TCP and UDP and name one real service that commonly uses each.',
    scenario: 'A VoIP call is choppy but web browsing is fine. How does UDP help explain the symptom?',
    ticketNote: 'Write a note that captures symptoms, network checks, and likely next escalation data.',
  }),
  buildDay(9, {
    week: 'Week 3 — Security basics',
    topic: 'MFA factors and account recovery',
    goal: 'Use the three-factor structure and avoid treating all second steps as equal.',
    read: `MFA uses something you know, something you have, and something you are. Account recovery should preserve security by asking for safe proof without exposing private data.

Examples:
- Password is something you know.
- Authenticator apps or security keys are something you have.
- Fingerprint or face scan is something you are.
- A new phone may require recovery codes or trusted admin reset.

Main idea:
MFA combines multiple factor types and recovery should be handled safely.

Now write one sentence in your own words:
'MFA works by ______ and recovery should ______.'`,
    recall: 'Name the three MFA factor categories: something you know, have, and are. Give examples.',
    scenario: 'A user has a new phone and cannot approve MFA prompts. What is safe to check before resetting anything?',
    ticketNote: 'Write a privacy-safe ticket note for an MFA reset request.',
  }),
  buildDay(10, {
    week: 'Week 3 — Security basics',
    topic: 'CIA triad',
    goal: 'Map security controls to confidentiality, integrity, and availability.',
    read: `Security has three goals: confidentiality, integrity, and availability. Confidentiality protects data from unauthorized access, integrity keeps data accurate, and availability keeps services running.

Examples:
- Confidentiality: limit access to a student record.
- Integrity: ensure a grade file is not altered incorrectly.
- Availability: keep Wi-Fi and email working.
- Ransomware threatens both integrity and availability.

Main idea:
Confidentiality, integrity, and availability cover data protection, correctness, and uptime.

Now write one sentence in your own words:
'Confidentiality is ______, integrity is ______, and availability is ______.'`,
    recall: 'Define confidentiality, integrity, and availability with one example control each.',
    scenario: 'A shared file is available to everyone, editable by anyone, and needed for class. Which CIA risks exist?',
    ticketNote: 'Write a note that separates access risk, data-change risk, and availability need.',
  }),
  buildDay(11, {
    week: 'Week 3 — Security basics',
    topic: '3-2-1 backup rule',
    goal: 'Explain backup resilience against deletion, hardware failure, site loss, and ransomware.',
    read: `Good backups use three copies, on two different media, with one copy off-site or offline. This protects against hardware failure, deletion, and site loss.

Examples:
- Primary file on the server, one copy on NAS, one copy in cloud storage.
- A local backup plus an off-site tape.
- If a drive dies, the second copy still exists.
- If ransomware encrypts the network, the offline copy helps restore.

Main idea:
3-2-1 means extra, diverse, and separated backups for safety.

Now write one sentence in your own words:
'The 3-2-1 backup rule means ______.'`,
    recall: 'State the 3-2-1 rule and explain what each number protects against.',
    scenario: 'A user deleted a critical file yesterday. What do you check before promising recovery?',
    ticketNote: 'Write a restore request note with file path, time, impact, and restore constraints.',
  }),
  buildDay(12, {
    week: 'Week 3 — Security basics',
    topic: 'Phishing triage',
    goal: 'Triage suspicious emails without exposing private content or clicking unsafe links.',
    read: `Phishing emails try to trick users into giving credentials, clicking malicious links, or opening unsafe attachments. Safe triage checks the sender, subject, links, and attachments without clicking or sharing private content.

Examples:
- A message claiming urgency from a bank.
- An unknown attachment asking to enable macros.
- A spoofed email from IT asking for login details.
- A suspicious invoice from a new supplier.

Main idea:
Check suspicious email details carefully and avoid clicking anything unsafe.

Now write one sentence in your own words:
'When triaging phishing, you should ______.'`,
    recall: 'List five phishing indicators and the safe first actions.',
    scenario: 'A staff member forwards a suspicious invoice email. What do you check and what do you avoid?',
    ticketNote: 'Write a privacy-safe phishing triage note and escalation summary.',
  }),
  buildDay(13, {
    week: 'Week 4 — Work-readiness',
    topic: 'Printer troubleshooting',
    goal: 'Scope local vs shared printer faults and check queue/spooler/device state in order.',
    read: `Printer issues can come from the local computer, the printer itself, the print queue, or the network. Start with the simplest checks and only change settings after confirming the problem.

Examples:
- The printer is out of paper or has a jam.
- The printer driver is missing or wrong.
- The print queue has a stuck job.
- The printer is offline on the network.

Main idea:
Scope printer faults before changing anything.

Now write one sentence in your own words:
'To troubleshoot a printer, first ______ and then ______.'`,
    recall: 'Explain the printer troubleshooting order from simplest to deepest.',
    scenario: 'One user cannot print but others can. What does that tell you and what do you check next?',
    ticketNote: 'Write a printer ticket note with scope, queue/spooler status, and outcome.',
  }),
  buildDay(14, {
    week: 'Week 4 — Work-readiness',
    topic: 'Windows slowness',
    goal: 'Read Task Manager symptoms and separate CPU, memory, disk, startup, and malware/update causes.',
    read: `Windows slowness can be caused by startup programs, CPU or memory pressure, disk activity, or updates running in the background. Task Manager shows what is using resources right now.

Examples:
- Many browser tabs open and RAM is near full.
- A background update is installing.
- Disk usage is at 100% while antivirus scans.
- A startup program is misbehaving after login.

Main idea:
Use Task Manager to find the biggest resource users and fix the top cause first.

Now write one sentence in your own words:
'Windows is slow because ______.'`,
    recall: 'Explain what you look at first in Task Manager and what each column can mean.',
    scenario: 'A staff laptop is painfully slow after login but improves after 10 minutes. What do you check?',
    ticketNote: 'Write a note summarising performance observations and practical next actions.',
  }),
  buildDay(15, {
    week: 'Week 4 — Work-readiness',
    topic: 'Shared drives, permissions, and groups',
    goal: 'Use groups for access rather than one-off user permissions.',
    read: `Shared access should use groups, not individual permissions, to keep permissions easier to manage and audit. Security groups give many people the same access without editing each user individually.

Examples:
- Granting a department folder to a teachers group.
- Using an IT staff group for admin tools.
- A distribution group is for email lists, not secure file access.
- One-off user permissions can become hard to maintain.

Main idea:
Use security groups for access, not individual user entries.

Now write one sentence in your own words:
'A security group is ______ and it is better than ______.'`,
    recall: 'Explain the difference between security groups and distribution groups.',
    scenario: 'A new staff member needs access to a department folder. How should access be granted?',
    ticketNote: 'Write the access request note with requester, approval, group/folder, and completion evidence.',
  }),
  buildDay(16, {
    week: 'Week 4 — Work-readiness',
    topic: 'Practice exam and evidence summary',
    goal: 'Pull the previous topics together into a short evidence summary and next study target.',
    read: `Review the core support topics from this plan and choose the three topics you want to strengthen. A strong summary shows what you learned and what still needs practice.

Examples:
- I can now distinguish incidents from service requests clearly.
- I used a troubleshooting order: scope, physical, network, configuration, test.
- I write ticket notes that include checks, result, and next action.
- I will revisit DNS, MFA, or printer troubleshooting as needed.

Main idea:
Summarise your progress clearly and choose the next focus.

Now write one sentence in your own words:
'I studied ______, I can explain ______, and I still want to improve ______.'`,
    recall: 'Summarise what improved: structure, troubleshooting order, and ticket-note quality.',
    scenario: 'Take one mixed practice scenario: user cannot access a cloud app, MFA prompt changed, and another user is unaffected. Scope it.',
    ticketNote: 'Write a final evidence note: what you studied, what you can now explain, and what needs another pass.',
  }),
];

export const resumeStudyPlanTotalSteps = resumeStudyPlan.reduce((sum, day) => sum + day.steps.length, 0);
