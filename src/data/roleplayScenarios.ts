export type RoleplayScenario = {
  id: string;
  tier?: 'Level 1' | 'Level 2';
  persona: string;
  archetype: string;
  issueTitle: string;
  scenario: string;
  itChallenge: string;
  managerDelegation?: string;
  workflow?: string;
  challenge?: string;
  initialPrompt: string;
  pressure: 'Low' | 'Medium' | 'High' | 'Critical';
  focus: string[];
};

export const roleplayScenarios: RoleplayScenario[] = [
  {
    id: 'frozen-interactive-whiteboard',
    persona: 'Chloe Harrison',
    archetype: 'The Mother Hen',
    issueTitle: 'Frozen Interactive Whiteboard Mid-Lesson',
    scenario:
      'Right in the middle of a Kindergarten phonics lesson, the interactive panel has frozen and the touch sensors are miscalibrated, drawing several inches away from the stylus. Thirty young students are rapidly losing focus.',
    itChallenge:
      'Triage a panicked teacher who needs the lesson rescued now. Check HDMI and USB-touch cabling, consider a hard reset, recalibrate the board, and give a classroom-safe workaround if the fix will take longer than a minute.',
    initialPrompt:
      'Josh, I need help now. The board is frozen, the pen is drawing nowhere near where I touch, and my Kindy class is about to unravel.',
    pressure: 'Critical',
    focus: ['classroom AV', 'de-escalation', 'fast workaround', 'plain English']
  },
  {
    id: 'rogue-phishing-click',
    persona: 'Dr. Arthur Pendelton',
    archetype: 'The Eccentric Niche-Master',
    issueTitle: 'Rogue Phishing Click',
    scenario:
      'Arthur received an email promising a fully funded grant for lab equipment and entered his Department of Education credentials. His account now appears to be sending spam to the whole school directory.',
    itChallenge:
      'Contain the incident quickly: lock or escalate account access, force password reset through authorised channels, check the device for malware indicators, and explain the security risk firmly without shaming him.',
    initialPrompt:
      'I may have done something rather silly. It was a grant link, you see, and now people are saying I have emailed them nonsense. Can we keep this quiet?',
    pressure: 'Critical',
    focus: ['cybersecurity', 'account containment', 'privacy', 'firm empathy']
  },
  {
    id: 'front-office-printing-disaster',
    persona: 'Sue Jenkins',
    archetype: 'The Unsung Gatekeeper',
    issueTitle: 'High-Stakes Printing Disaster',
    scenario:
      'It is the day before semester reports go home. The main front-office photocopier is showing Error 0x0045 and will not print, scan, or staple.',
    itChallenge:
      'Support a highly stressed executive admin while checking whether the issue is a jam, tray/loading problem, spooler/network issue, IP conflict, or vendor-service fault. Give a fallback print pathway if the copier cannot be restored fast.',
    initialPrompt:
      'I do not have time for this today. Reports are due, the copier says Error 0x0045, and nothing is printing, scanning, or stapling.',
    pressure: 'Critical',
    focus: ['printer triage', 'business impact', 'fallback plan', 'calm communication']
  },
  {
    id: 'visual-arts-web-filter-block',
    persona: 'Ziggy Carmichael',
    archetype: 'The Creative Free Spirit',
    issueTitle: 'Department Web Filter Block',
    scenario:
      'Ziggy is trying to show Year 12 Visual Arts a documentary on an obscure contemporary artist, but the school proxy filter has blocked the site as Suspicious/Uncategorized.',
    itChallenge:
      'Balance educational need and policy. Verify the URL safely, check category and risk, gather class/time impact, escalate or apply approved temporary access where permitted, and avoid bypassing safeguarding processes.',
    initialPrompt:
      'The filter has blocked the exact documentary I need for Year 12. It is not dodgy, it is art. I have about thirty minutes of class left.',
    pressure: 'High',
    focus: ['web filtering', 'policy boundaries', 'educational urgency', 'safe escalation']
  },
  {
    id: 'maintenance-portal-password',
    persona: 'Gary "Gazza" Walsh',
    archetype: 'The Pragmatic Guardian',
    issueTitle: 'Lost Password of Antiquity',
    scenario:
      'The school has moved maintenance and WHS hazard requests into an online system. Gazza has not logged in since setup and has forgotten his password, security questions, and possibly his username.',
    itChallenge:
      'Use patient identity verification, walk a non-technical staff member through account recovery, help create a secure but usable sign-in pattern, and show only the first task in the portal so he is not overwhelmed.',
    initialPrompt:
      'Mate, I am beaten before I start. This hazard thing wants a password, a username, and questions I do not remember ever making.',
    pressure: 'Medium',
    focus: ['password support', 'identity verification', 'non-technical coaching', 'patience']
  },
  {
    id: 'student-ipad-boot-loop',
    persona: 'Priya Sharma',
    archetype: 'The Quiet Empath',
    issueTitle: 'Dead Student BYOD or School-Issued Device',
    scenario:
      'Priya is advocating for a high-needs student whose school-issued iPad is stuck in a boot loop after being dropped. The student relies on it for communication and learning access.',
    itChallenge:
      'Prioritise continuity of learning. Check backup and device-management options, avoid exposing student details, arrange a loaner if repair/reset will take time, and communicate compassionately about what can and cannot be recovered.',
    initialPrompt:
      'I am worried about one of my students. Their iPad keeps flashing the logo and restarting, and they really depend on it to communicate.',
    pressure: 'High',
    focus: ['device triage', 'accessibility impact', 'loaner device', 'privacy']
  },
  {
    id: 'vip-assembly-av-fail',
    persona: 'Eleanor Vance',
    archetype: 'The Diplomat',
    issueTitle: 'VIP Assembly Audio-Visual Fail',
    scenario:
      'The school is hosting a special assembly with the local Mayor and parents attending. Five minutes before start, the hall projector will not detect the guest speaker laptop and the wireless microphone is feeding back.',
    itChallenge:
      'Troubleshoot in public under pressure. Check adapter/display mismatch, switch to a school device or spare adapter, reduce microphone feedback, coordinate with the presenter, and communicate a clear recovery plan while many people are waiting.',
    initialPrompt:
      'Josh, I am sorry, but we need you in the hall immediately. The Mayor is here, the laptop will not project, and the microphone is squealing.',
    pressure: 'Critical',
    focus: ['assembly AV', 'public pressure', 'fallback device', 'executive communication']
  },
  {
    id: 'missing-cloud-file-panic',
    persona: 'Mark Davies',
    archetype: 'The Enforcer',
    issueTitle: 'Missing Cloud File Panic',
    scenario:
      'Mark spent three hours writing a confidential suspension report. He thought it saved to OneDrive, cannot find it, and is convinced the system deleted it.',
    itChallenge:
      'Use calm digital forensics without exposing report content. Check recent files, local paths, OneDrive sync status, recycle bin/version history, and likely misfiled folders while keeping confidential document details out of the PD app.',
    initialPrompt:
      'The system has deleted my report. I saved it. I know I saved it. I need that file back now.',
    pressure: 'High',
    focus: ['OneDrive', 'file recovery', 'confidential data', 'calm authority']
  },
  {
    id: 'athletics-software-admin-loop',
    persona: 'Trent "Macca" MacAllister',
    archetype: 'The Energetic Motivator',
    issueTitle: 'Admin-Rights Software Update Loop',
    scenario:
      'Trent is trying to run athletics carnival software to enter race times. The software demands an urgent update, and the update requires administrator credentials that teachers do not have.',
    itChallenge:
      'Handle privilege management safely. Confirm software source, protect the local database file, run the update through authorised admin process or deployment tooling, and avoid sharing admin credentials or bypassing policy.',
    initialPrompt:
      'Legend, I need this carnival software running before the races start. It wants an admin password and I am staring at a queue of results.',
    pressure: 'High',
    focus: ['admin rights', 'software update', 'data safety', 'time pressure']
  },
  {
    id: 'demountable-wifi-blackspot',
    persona: 'Casey Miller',
    archetype: 'The Casual Teacher',
    issueTitle: 'Phantom Network Blackspot',
    scenario:
      'A casual teacher in Demountable Classroom 4 keeps dropping off Wi-Fi every ten minutes, interrupting digital roll marking and access to the lesson plan in Google Classroom or Canvas.',
    itChallenge:
      'Separate device fault from infrastructure. Check whether others are affected, signal band, WAP saturation, device adapter symptoms, location/interference patterns, and provide a workable short-term connection plan.',
    initialPrompt:
      'Sorry, I am casual today and I keep losing Wi-Fi in Demountable 4. I cannot mark the roll properly and the lesson plan keeps disappearing.',
    pressure: 'Medium',
    focus: ['Wi-Fi triage', 'scope questions', 'infrastructure vs device', 'temporary workaround']
  },
  {
    id: 'angry-teacher-display',
    persona: 'Mrs. Higgins',
    archetype: 'Maths Teacher',
    issueTitle: 'Missing HDMI Cable',
    scenario:
      'The HDMI cable is missing from Room 12, and her lesson started two minutes ago. She is frustrated and blames IT for always losing things.',
    itChallenge:
      'Acknowledge the classroom impact, find an immediate display workaround, replace or locate the cable, and avoid getting defensive.',
    initialPrompt:
      'I cannot believe this. I have 30 students waiting and the cable is gone. What am I supposed to do?',
    pressure: 'High',
    focus: ['display support', 'de-escalation', 'quick workaround', 'ownership']
  },
  {
    id: 'confused-parent-portal',
    persona: 'Mr. Thompson',
    archetype: 'Parent',
    issueTitle: 'Parent Portal Deadline',
    scenario:
      'A parent cannot log into the Parent Portal and is worried he will miss the excursion permission deadline. He is stressed but polite.',
    itChallenge:
      'Confirm identity safely, avoid sharing private account detail, guide simple recovery steps, and give a clear escalation path if the deadline is at risk.',
    initialPrompt:
      'Hello, I am sorry to bother you, but I cannot get into the portal and the deadline is tonight. Can you help?',
    pressure: 'Medium',
    focus: ['parent portal', 'identity safety', 'deadline pressure', 'plain English']
  },
  {
    id: 'new-staff-access',
    persona: 'Ms. Lee',
    archetype: 'New Art Teacher',
    issueTitle: 'Shared Drive Access Gap',
    scenario:
      'It is her first day and she does not have access to the Art department shared drive. She is overwhelmed by all the new systems.',
    itChallenge:
      'Reassure the new staff member, confirm expected access, check group membership or approval path, and explain the next step without making her feel at fault.',
    initialPrompt:
      'Hi, I was told I could find the curriculum files on the shared drive, but I do not see anything. Am I doing something wrong?',
    pressure: 'Medium',
    focus: ['new staff support', 'access request', 'reassurance', 'clear next step']
  },
  {
    id: 'l2-staff-offboarding-m365-ad',
    tier: 'Level 2',
    persona: 'Paul Matthews',
    archetype: 'IT Manager Delegating Systems Work',
    issueTitle: 'Comprehensive Staff Offboarding',
    scenario:
      'A Science faculty staff member finished last Friday and the manager wants the offboarding completed by end of day across Microsoft 365 and Active Directory. The Head Teacher of Science is also pushing for immediate access to the departed staff member email.',
    managerDelegation:
      'Hey, Sarah from the Science faculty finished up last Friday. I need you to go into M365 and AD to process her offboarding completely by the end of the day.',
    workflow:
      'Reset the user password, revoke sign-in sessions, convert the mailbox to a shared mailbox, delegate access to the Head Teacher of Science, preserve or back up OneDrive according to policy, and remove A3/A5 licensing only after access and retention requirements are safe.',
    challenge:
      'Remember the correct order of operations so data is not accidentally deleted, and manage the Head Teacher request for immediate email access without bypassing approval or retention rules.',
    itChallenge:
      'Explain your proposed sequence, identify the approval and data-retention checks, and communicate what can be done immediately versus what needs authorisation.',
    initialPrompt:
      'I need this done today. Before you touch the account, talk me through your offboarding order and how you will handle the Head Teacher wanting immediate mailbox access.',
    pressure: 'High',
    focus: ['M365', 'Active Directory', 'offboarding order', 'mailbox delegation', 'data retention']
  },
  {
    id: 'l2-sentral-parent-portal-rollout',
    tier: 'Level 2',
    persona: 'Paul Matthews',
    archetype: 'IT Manager Delegating Parent Platform Work',
    issueTitle: 'Sentral Parent Portal Rollout and Support Triage',
    scenario:
      'One hundred and fifty new Kindergarten parents are trying to access the Sentral Parent Portal this week. Many are confused, and the manager wants access keys generated and a one-page guide created.',
    managerDelegation:
      'We have 150 new Kindergarten parents trying to access the Sentral Parent Portal this week. Half of them are confused. I want you to take charge of generating their Family Access Keys and creating a one-page PDF guide on how to link their accounts.',
    workflow:
      'Navigate Sentral, match parents to the correct student profiles, generate secure Family Access Keys, record what was issued, and write clear non-jargon parent documentation.',
    challenge:
      'A parent phones with children across different households. You must verify identity and custody/access boundaries so the correct custodial parent receives only the correct access key.',
    itChallenge:
      'Demonstrate safe parent identity verification, avoid exposing student/family details, and turn the workflow into a clear parent-facing guide.',
    initialPrompt:
      'Before you start generating keys, tell me how you will avoid giving the wrong parent access to the wrong student record.',
    pressure: 'High',
    focus: ['Sentral', 'Parent Portal', 'access keys', 'custody boundaries', 'documentation']
  },
  {
    id: 'l2-ipad-jamf-intune-provisioning',
    tier: 'Level 2',
    persona: 'Paul Matthews',
    archetype: 'IT Manager Delegating Device Fleet Work',
    issueTitle: 'Mass Device Provisioning',
    scenario:
      'Thirty new iPads for the Year 4 cart have arrived and need to be enrolled, restricted, named, connected to Wi-Fi, and loaded with required apps.',
    managerDelegation:
      'The delivery of 30 new iPads for the Year 4 cart just arrived. I need you to unbox them, get them enrolled into Jamf, apply the Primary Student restriction payload, and push the NAPLAN and Mathletics apps to them.',
    workflow:
      'Use Apple School Manager and MDM to automate setup, name devices sequentially such as IPAD-Y4-CART1-01, assign the correct Wi-Fi profile, apply the restriction payload, and verify silent app deployment.',
    challenge:
      'One or two iPads fail to pick up the Wi-Fi profile during automated enrollment, forcing log review and a manual profile push.',
    itChallenge:
      'Explain how you would verify enrollment success, identify failed devices, and avoid turning a one-device issue into fleet-wide manual work.',
    initialPrompt:
      'I want these ready for Year 4 quickly, but not messily. How are you going to name, enrol, restrict, and verify all 30 devices?',
    pressure: 'High',
    focus: ['Jamf', 'Intune', 'Apple School Manager', 'MDM logs', 'fleet provisioning']
  },
  {
    id: 'l2-year12-account-archiving',
    tier: 'Level 2',
    persona: 'Paul Matthews',
    archetype: 'IT Manager Delegating Directory Governance',
    issueTitle: 'End-of-Year Account Archiving',
    scenario:
      'Year 12 has graduated and directory cleanup needs to happen across Google Workspace and AD while preserving data for retention requirements.',
    managerDelegation:
      'The Year 12s have officially graduated. It is time to clean up the directory. Move their accounts to the Alumni OU, suspend their Google Workspace access, and set an auto-reply on their emails.',
    workflow:
      'Run bulk operations in Active Directory or Google Admin, move accounts to the Alumni OU, suspend access, remove school-resource access, set auto-replies where required, and preserve data in an archived state for the retention period.',
    challenge:
      'A graduated student urgently asks for 24-hour access because their university application portfolio is only in school Google Drive.',
    itChallenge:
      'Balance compassion, data retention, and policy. Identify who can approve temporary access and what audit trail is needed.',
    initialPrompt:
      'Walk me through the Year 12 archiving process, especially what you would do if a graduate asks for urgent temporary Drive access.',
    pressure: 'High',
    focus: ['Google Workspace', 'Active Directory', 'OU management', 'retention', 'temporary access']
  },
  {
    id: 'l2-papercut-print-quota-allocation',
    tier: 'Level 2',
    persona: 'Paul Matthews',
    archetype: 'IT Manager Delegating Print Governance',
    issueTitle: 'Print Server and Quota Allocation',
    scenario:
      'Semester 2 is starting. Student print balances need resetting and high school students need fresh credit, while the English faculty is already complaining their budget is exhausted.',
    managerDelegation:
      'It is the start of Semester 2. I need you to go into PaperCut, clear the student print balances from last term, and allocate the new $20 credit to all high school students. Also, the English faculty is complaining their budget is tapped out.',
    workflow:
      'Navigate PaperCut, perform a bulk balance update, pull faculty printing reports, identify colour and volume patterns, and support default print rules such as black-and-white duplex.',
    challenge:
      'Explain usage data to a senior teacher without blaming individuals, then help configure Follow-Me printing defaults that reduce unnecessary colour printing.',
    itChallenge:
      'Show how you would verify the bulk update, produce a useful report, and communicate print data professionally.',
    initialPrompt:
      'I need PaperCut cleaned up for Semester 2. How will you reset balances, allocate credit, and handle the English budget complaint with evidence?',
    pressure: 'Medium',
    focus: ['PaperCut', 'print quotas', 'reporting', 'Follow-Me printing', 'teacher communication']
  },
  {
    id: 'l2-naplan-locked-browser-deployment',
    tier: 'Level 2',
    persona: 'Paul Matthews',
    archetype: 'IT Manager Delegating Testing Readiness',
    issueTitle: 'NAPLAN Locked Down Browser Deployment',
    scenario:
      'NAPLAN is three weeks away and the latest locked down browser must be deployed to Windows devices in Computer Labs 1, 2, and 3 with an installation report by Friday.',
    managerDelegation:
      'NAPLAN is in three weeks. I need you to package the latest version of the NAP Locked Down Browser and deploy it via SCCM or Intune to all Windows devices in Computer Labs 1, 2, and 3. I need a report confirming installation by Friday.',
    workflow:
      'Download the MSI, create a deployment package, target the correct device groups, monitor success and failure rates, and produce a report of compliant and failed machines.',
    challenge:
      'Five machines in Lab 2 fail because of pending Windows Updates or full drives, requiring physical remediation and a forced software sync.',
    itChallenge:
      'Prioritise test readiness, distinguish deployment failure types, and produce a credible installation-compliance report.',
    initialPrompt:
      'NAPLAN cannot be a surprise failure. Tell me how you will package, target, monitor, and remediate this deployment.',
    pressure: 'Critical',
    focus: ['Intune', 'SCCM', 'NAPLAN', 'deployment reporting', 'lab remediation']
  },
  {
    id: 'l2-asset-ewaste-secure-wipe',
    tier: 'Level 2',
    persona: 'Paul Matthews',
    archetype: 'IT Manager Delegating Asset Governance',
    issueTitle: 'Fleet Audit and E-Waste Prep',
    scenario:
      'The library storeroom contains old staff laptops from the 2021 refresh that need asset-register updates and secure data wiping before e-waste.',
    managerDelegation:
      'That storeroom in the back of the library is full of old staff laptops from the 2021 fleet refresh. We need to prep them for e-waste. Go through, scan their serials out of our asset register, and securely wipe the drives.',
    workflow:
      'Cross-reference devices against Snipe-IT or the asset register, mark status as Decommissioned, wipe drives securely or remove drives according to policy, and record the chain of custody.',
    challenge:
      'Three laptops in the e-waste pile are still marked Assigned to Active Staff, meaning the asset register may be wrong and needs investigation before disposal.',
    itChallenge:
      'Do not wipe first and ask later. Explain how you would quarantine mismatched assets, verify assignments, and preserve data-safety evidence.',
    initialPrompt:
      'Before anything leaves the school, I need confidence that the asset register and data wiping are right. What is your process?',
    pressure: 'High',
    focus: ['asset management', 'Snipe-IT', 'secure wipe', 'chain of custody', 'data safety']
  },
  {
    id: 'l2-vivi-firmware-fleet-update',
    tier: 'Level 2',
    persona: 'Paul Matthews',
    archetype: 'IT Manager Delegating AV Fleet Management',
    issueTitle: 'Vivi Firmware Updates and Fleet Management',
    scenario:
      'Teachers report Vivi screen-casting boxes dropping out. The vendor released a major firmware patch that needs to be scheduled across 80 devices overnight.',
    managerDelegation:
      'Half the teachers are complaining their Vivi screen-casting boxes are dropping out. The vendor just released a major firmware patch. I need you to schedule an over-the-air update for all 80 boxes for 2:00 AM on Saturday.',
    workflow:
      'Use the Vivi or digital signage dashboard, group devices, read release notes, confirm firewall compatibility, schedule the update and reboot, and check devices after the maintenance window.',
    challenge:
      'On Monday morning, three TAS block boxes fail to come back online and must be factory reset and re-adopted into the fleet.',
    itChallenge:
      'Plan a safe maintenance window, prepare rollback or onsite recovery steps, and explain how you will confirm successful update coverage.',
    initialPrompt:
      'The firmware patch might fix the dropouts, but I do not want Monday chaos. What is your update and recovery plan?',
    pressure: 'High',
    focus: ['Vivi', 'firmware', 'maintenance window', 'fleet status', 're-adoption']
  },
  {
    id: 'l2-bell-pa-custom-schedule',
    tier: 'Level 2',
    persona: 'Paul Matthews',
    archetype: 'IT Manager Delegating Critical School Systems',
    issueTitle: 'School Bell and PA System Interface',
    scenario:
      'A modified timetable is needed for Athletics Carnival week. The IP-based Bell/PA system needs a custom schedule, then bells disabled for the rest of the day.',
    managerDelegation:
      'We have a modified timetable next week for the Athletics Carnival. I need you to log into the IP-based Bell/PA system and create a new custom schedule so the bells ring at the shortened period times, and then disable the bells entirely for the rest of the day.',
    workflow:
      'Access the Bell/PA web interface, interpret the Deputy Principal timetable, map times to the correct zones and tones, test safely, and document the normal schedule restoration point.',
    challenge:
      'During testing, the evacuation tone is accidentally selected instead of the period-end tone, requiring quick override and mute without causing school-wide panic.',
    itChallenge:
      'Show how you would test a critical audible system safely, avoid the wrong tone, and prepare a rollback before changes go live.',
    initialPrompt:
      'This bell schedule affects the whole school. How are you going to test it without accidentally triggering the wrong tone?',
    pressure: 'Critical',
    focus: ['Bell system', 'PA zones', 'change control', 'testing safety', 'rollback']
  },
  {
    id: 'l2-phishing-breach-defender-investigation',
    tier: 'Level 2',
    persona: 'Paul Matthews',
    archetype: 'IT Manager Delegating Security Incident Response',
    issueTitle: 'Investigating a Phishing Breach',
    scenario:
      'A staff member entered Microsoft 365 credentials into a phishing page. The manager wants audit log evidence, suspicious IPs, and mailbox forwarding rules checked in M365 Defender.',
    managerDelegation:
      'We just had a report that a staff member fell for a phishing email and put in their M365 credentials. I need you to run an audit log search in M365 Defender, find out exactly what IP addresses logged into their account, and see if any inbox forwarding rules were created.',
    workflow:
      'Search sign-in and audit logs, check risky IP addresses, review mailbox rules and external forwarding, identify accessed services, document findings, and preserve evidence for escalation.',
    challenge:
      'The compromised account is the School Admin Manager, meaning sensitive financial data may be exposed and the incident must escalate from routine cleanup to urgent management-level response.',
    itChallenge:
      'Think like a junior security analyst: contain first, gather evidence carefully, avoid sharing sensitive details in the PD app, and escalate with a concise risk summary.',
    initialPrompt:
      'This might be serious. Talk me through containment, log review, mailbox-rule checks, and what changes if the account belongs to the SAM.',
    pressure: 'Critical',
    focus: ['M365 Defender', 'audit logs', 'mailbox rules', 'incident response', 'escalation']
  }
];
