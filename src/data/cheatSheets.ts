export type QuickFixCheatSheet = {
  id: string;
  title: string;
  domain: string;
  summary: string;
  estimatedMinutes: number;
  safeFirstChecks: string[];
  askFirst: string[];
  escalationTriggers: string[];
  doNotDo: string[];
  ticketTemplate: string;
  relatedModuleIds: string[];
  relatedScenarioIds: string[];
};

export const quickFixCheatSheets: QuickFixCheatSheet[] = [
  {
    id: 'viewboard-display-audio',
    title: 'ViewBoard / Classroom Display Quick Fix',
    domain: 'Classroom technology',
    summary: 'Separate display path, audio path, touch path, and room-device faults before escalating.',
    estimatedMinutes: 5,
    safeFirstChecks: [
      'Confirm the staff device is awake, unlocked, and using the expected display mode.',
      'Use Windows+P to check Duplicate versus Extend.',
      'Confirm the ViewBoard/projector input source matches the cable or casting path being used.',
      'Reseat HDMI/USB-C/adaptor connections and compare with a known-good cable if available.',
      'For audio, check Windows output device, app volume, board volume, and room speaker path separately.'
    ],
    askFirst: [
      'Has this exact laptop worked in this room before?',
      'Is the issue display, audio, touch, casting, or all of them?',
      'Is another staff laptop affected in the same room?'
    ],
    escalationTriggers: [
      'Multiple known-good devices fail in the same room.',
      'Board/projector shows thermal, lamp, hardware, or calibration faults.',
      'A class is waiting and safe first checks have not restored teaching use.'
    ],
    doNotDo: [
      'Do not change room-wide AV configuration without approval.',
      'Do not delete display drivers during a live class.',
      'Do not describe the issue only as "screen not working".'
    ],
    ticketTemplate:
      'Room/device: [room + board/projector]\nSymptom: [display/audio/touch/casting]\nScope: [one device / multiple devices]\nSafe checks completed: [Windows+P, input source, cable/adaptor, audio output]\nCurrent impact: [class waiting / later follow-up]\nRequested escalation: [room hardware / AV path / account/casting path]',
    relatedModuleIds: ['classroom-display-viewboard-troubleshooting', 'ticket-notes-escalation-quality'],
    relatedScenarioIds: ['hdmi-works-no-audio']
  },
  {
    id: 'papercut-follow-me-printing',
    title: 'PaperCut / Follow-Me Printing Quick Fix',
    domain: 'Printing',
    summary: 'Tell apart wrong target, queued job, release/authentication, and device-quality faults.',
    estimatedMinutes: 5,
    safeFirstChecks: [
      'Confirm the user selected the expected Follow-Me or target printer queue.',
      'Check whether the job submitted, stayed in the workstation queue, or is waiting for release.',
      'Ask the user to authenticate at the copier/release station if that is the normal workflow.',
      'Check obvious device messages: paper, jam, toner, tray, offline, or service warning.',
      'Compare one-user versus many-user impact before escalating.'
    ],
    askFirst: [
      'Did the job appear at the copier after you authenticated?',
      'Does copying at the device work?',
      'Are other users having the same issue with this device?'
    ],
    escalationTriggers: [
      'Many users cannot release or print from the same queue/device.',
      'The copier shows a service code or physical fault.',
      'Print and copy quality are both poor, such as toner rubbing off.'
    ],
    doNotDo: [
      'Do not inspect confidential print jobs.',
      'Do not perform deep driver or print-server changes without approval.',
      'Do not collapse queue, release, and device clues into one vague note.'
    ],
    ticketTemplate:
      'Printer/location: [device]\nSymptom: [queue / release / device / print quality]\nScope: [one user / many users]\nEvidence: [job submitted? release visible? device message? copy test?]\nSafe checks completed: [target queue, release/auth, paper/jam/offline]\nNext action requested: [print service / device service / account release issue]',
    relatedModuleIds: ['printer-troubleshooting', 'ticket-notes-escalation-quality'],
    relatedScenarioIds: ['printer-jobs-stuck-in-queue', 'laser-printer-toner-rubs-off']
  },
  {
    id: 'wifi-basic-triage',
    title: 'Wi-Fi / Internet Triage Quick Fix',
    domain: 'Networking',
    summary: 'Use scope, SSID, IP, DNS, and gateway clues to write a useful network escalation.',
    estimatedMinutes: 6,
    safeFirstChecks: [
      'Confirm the device is on the expected SSID and not guest/incorrect Wi-Fi.',
      'Forget and rejoin the network where that is safe and appropriate.',
      'Compare another device in the same location.',
      'Check whether the issue is no Wi-Fi, Wi-Fi but no internet, or only one blocked service.',
      'Look for APIPA-style 169.254 addressing when a device has failed to receive DHCP.'
    ],
    askFirst: [
      'Is this one device, one room, one building, or everyone?',
      'What exact service fails: all browsing, Teams, printing, or one site?',
      'Did it work earlier today in the same location?'
    ],
    escalationTriggers: [
      'Multiple users/devices fail in the same area.',
      'The device receives a 169.254 address after reconnecting.',
      'Guest Wi-Fi is being asked to reach internal printers, TVs, or admin services.'
    ],
    doNotDo: [
      'Do not bypass segmentation or firewall policy.',
      'Do not change network settings broadly to fix one device.',
      'Do not treat internet access as proof that internal services should be reachable.'
    ],
    ticketTemplate:
      'Location/device: [room + device type]\nSymptom: [no Wi-Fi / no internet / one service]\nScope: [one device / several / area]\nSSID/IP clues: [expected SSID, IP range if known, APIPA?]\nSafe checks completed: [rejoin, compare device, restart app/browser]\nEscalation reason: [DHCP/DNS/gateway/coverage/segmentation suspicion]',
    relatedModuleIds: ['dns-dhcp-gateway-ip-basics', 'vlans-network-segmentation'],
    relatedScenarioIds: ['student-laptop-169-254', 'guest-wifi-segmentation-rules']
  },
  {
    id: 'login-mfa-lockout',
    title: 'Login / MFA / Lockout Quick Fix',
    domain: 'Identity and access',
    summary: 'Separate username, password, account state, MFA, device, and compromise signals.',
    estimatedMinutes: 5,
    safeFirstChecks: [
      'Confirm the username format and exact sign-in message without collecting passwords.',
      'Separate forgotten password, expired password, locked account, disabled account, and MFA prompt issues.',
      'Check whether the same account works in another browser or device if safe.',
      'Capture whether the issue affects one system or multiple connected services.',
      'Escalate immediately if the user reports suspicious prompts, impossible travel, or unexpected MFA requests.'
    ],
    askFirst: [
      'What is the exact message on screen?',
      'Does this happen in one app or all school services?',
      'Did you receive an MFA prompt you did not initiate?'
    ],
    escalationTriggers: [
      'Compromise suspicion or unexpected MFA prompts.',
      'Account appears disabled, blocked, or locked beyond Level 1 authority.',
      'Multiple users report the same sign-in failure.'
    ],
    doNotDo: [
      'Do not ask for or record passwords.',
      'Do not approve MFA prompts for someone else.',
      'Do not perform admin account changes outside authorised workflow.'
    ],
    ticketTemplate:
      'User/account: [role only, no password]\nSystem affected: [service/app]\nExact sign-in message: [quote safely]\nScope: [one system / multiple]\nSafe checks completed: [username format, browser/device comparison, password reset path if allowed]\nRisk flags: [MFA surprise / compromise suspicion / none]\nEscalation requested: [identity/admin review]',
    relatedModuleIds: ['login-and-password-support', 'm365-identity-offboarding-basics'],
    relatedScenarioIds: ['password-lockout-self-service-reset-failure']
  },
  {
    id: 'new-user-access-checklist',
    title: 'New User Missing Access Quick Fix',
    domain: 'Onboarding',
    summary: 'Collect role, start date, device, system, approval, and day-one impact without guessing permissions.',
    estimatedMinutes: 7,
    safeFirstChecks: [
      'Confirm the person type: staff, student, prac teacher, contractor, or visitor.',
      'Identify which systems are missing and which already work.',
      'Confirm requested access has a role/business reason and an approver where required.',
      'Check device readiness separately from account access.',
      'Document day-one impact and whether a class, payroll, duty, or supervision workflow is blocked.'
    ],
    askFirst: [
      'Which specific systems can you access, and which are missing?',
      'Who requested or approved the access?',
      'Is this blocking teaching, supervision, or administration today?'
    ],
    escalationTriggers: [
      'Missing access requires group, role, or licensing changes.',
      'The person type or start date is unclear.',
      'A day-one role-critical system is blocked.'
    ],
    doNotDo: [
      'Do not grant extra access because it seems convenient.',
      'Do not copy another staff member’s permissions without approval.',
      'Do not record private identity documents in DCSPrep.'
    ],
    ticketTemplate:
      'Person type/role: [staff/student/prac/etc]\nStart date/urgency: [date + impact]\nSystems working: [list]\nSystems missing: [list]\nApproval/owner: [who approved or who needs to]\nDevice readiness: [ready / missing / unknown]\nEscalation request: [groups/licensing/platform owner/access review]',
    relatedModuleIds: ['new-user-onboarding', 'permissions-and-access-requests'],
    relatedScenarioIds: ['new-user-onboarding-missing-system-access']
  },
  {
    id: 'website-unblock-request',
    title: 'Website Filtering / Unblock Quick Fix',
    domain: 'Filtering and access',
    summary: 'Capture URL, lesson need, timing, category, and approval path before escalation.',
    estimatedMinutes: 4,
    safeFirstChecks: [
      'Capture the exact URL and visible block message/category.',
      'Confirm whether the request is for a lesson, staff admin task, or general browsing.',
      'Ask when access is needed and how many users/classes are affected.',
      'Check whether an approved alternative resource exists.',
      'Escalate with educational purpose and timing rather than only "please unblock".'
    ],
    askFirst: [
      'What exact URL is blocked?',
      'What class, task, or approved school purpose needs it?',
      'When is it required, and for whom?'
    ],
    escalationTriggers: [
      'The site category may be sensitive or policy-restricted.',
      'The request affects a whole class or upcoming assessment.',
      'The block reason is unclear or contradicts expected school use.'
    ],
    doNotDo: [
      'Do not bypass filtering with alternate networks or proxy tools.',
      'Do not approve access yourself if policy owner review is required.',
      'Do not paste student names or private lesson data into the request.'
    ],
    ticketTemplate:
      'URL: [exact URL]\nBlock message/category: [visible details]\nPurpose: [lesson/admin task]\nUsers affected: [staff/class/year group, no student names]\nNeeded by: [date/time]\nAlternatives checked: [yes/no]\nEscalation request: [filtering review with educational justification]',
    relatedModuleIds: ['website-filtering-and-unblock-requests', 'ticket-notes-escalation-quality'],
    relatedScenarioIds: []
  },
  {
    id: 'msp-sla-ticket-handling',
    title: 'MSP SLA & Ticket Handling Quick Fix',
    domain: 'Operations',
    summary: 'Collect contract, scope, priority, and current status before escalating or billing.',
    estimatedMinutes: 6,
    safeFirstChecks: [
      'Confirm the client, ticket priority, and SLA response or resolution target.',
      'Capture the exact service impact and which users or systems are blocked.',
      'Document what checks have already been completed before escalating.',
      'Verify whether the issue is within MSP scope or requires a vendor handoff.'
    ],
    askFirst: [
      'What is the exact ticket priority and SLA target?',
      'What has already been checked and what is still blocked?',
      'Which client contact or vendor owner needs the escalation?' 
    ],
    escalationTriggers: [
      'The ticket is approaching or has breached its SLA target.',
      'The incident affects multiple client systems or a critical business workflow.',
      'The root cause requires vendor or specialist escalation outside the current support tier.'
    ],
    doNotDo: [
      'Do not change ticket priority without evidence or approval.',
      'Do not overstate the resolution when the issue is still under investigation.',
      'Do not copy sensitive client details into notes that are visible outside the PSA.'
    ],
    ticketTemplate: `Client: [client name or code]
SLA: [response / resolution target]
Symptom: [exact issue]
Scope: [affected systems/users]
Safe checks completed: [list]
Impact: [business process / shift blocked]
Escalation requested: [vendor / specialist / higher tier]`,
    relatedModuleIds: ['msp-ticket-triage-escalation', 'msp-support-foundations', 'msp-stack-rmm-psa'],
    relatedScenarioIds: ['msp-client-remote-access-failure']
  },
  {
    id: 'msp-psa-ticket-note-checklist',
    title: 'PSA Ticket Note Checklist',
    domain: 'MSP',
    summary: 'Quick reference for writing clear, complete, and PSA-ready ticket notes during MSP support.',
    estimatedMinutes: 5,
    safeFirstChecks: [
      'Symptom is clear and includes exact error messages or behaviors.',
      'Scope is documented: which user, device, site, or system is affected.',
      'Safe troubleshooting steps completed are listed with outcomes.',
      'Root cause or next action is clearly stated.'
    ],
    askFirst: [
      'What was the exact error message or behavior observed?',
      'Which client site, user account, or system is affected?',
      'What safe checks have been completed and what was the result?',
      'What is the next recommended action?'
    ],
    escalationTriggers: [
      'Multiple users or systems are affected.',
      'The issue breaches the client SLA.',
      'Root cause requires vendor or specialist involvement.'
    ],
    doNotDo: [
      'Do not assume; verify symptoms before escalating.',
      'Do not include password, credential, or sensitive API key information.',
      'Do not write vague notes like "network issue" without specific evidence.',
      'Do not forget to document what was already checked.'
    ],
    ticketTemplate: `Symptom: [exact issue / error message]
Client / Site: [location / account / system]
Affected users / services: [scope]
Safe checks completed: [list with outcomes]
Root cause identified: [yes/no] [if yes, detail]
Escalation: [to vendor / to specialist / to management] [if yes]
Recommended next action: [clear, specific]`,
    relatedModuleIds: ['msp-ticket-triage-escalation', 'msp-client-communication-documentation'],
    relatedScenarioIds: ['msp-m365-signin-failure', 'msp-printer-offline-client']
  },
  {
    id: 'msp-rmm-triage-card',
    title: 'RMM Alert Triage Card',
    domain: 'MSP',
    summary: 'Fast reference for triaging common RMM alerts before escalating or taking action.',
    estimatedMinutes: 4,
    safeFirstChecks: [
      'Confirm the alert is not a duplicate or false positive (check timestamp and device status).',
      'Verify the device is actually online or offline (check last heartbeat time).',
      'Identify whether the alert is a trend (gradual) or sudden spike.',
      'Determine scope: is it one device, one site, or widespread?'
    ],
    askFirst: [
      'When did the alert trigger and has it been seen before?',
      'What is the current device status: online, offline, or unknown?',
      'Is this a single device or a pattern across multiple devices?',
      'Has the client reported user impact?'
    ],
    escalationTriggers: [
      'The alert indicates critical system state (disk full, CPU pegged, service down).',
      'Multiple devices in the same site show similar alerts.',
      'Client has reported business impact related to the alert.'
    ],
    doNotDo: [
      'Do not assume an offline alert means the device is broken.',
      'Do not make large changes (restart, reboot) without first gathering evidence.',
      'Do not ignore gradual-growth trends (disk, memory, network).',
      'Do not dismiss repeated alerts from the same device without investigation.'
    ],
    ticketTemplate: `Alert type: [low disk / offline / CPU high / service stopped / etc]
Device: [name / IP / site]
Triggered at: [time]
Current device status: [online / offline / last heartbeat: X min ago]
Pattern: [single / recurring / gradual / sudden]
Client impact: [yes / no / unknown]
Safe checks done: [device status / network / RMM agent]
Next action: [cleanup / investigate / restart / escalate]`,
    relatedModuleIds: ['msp-ticket-triage-escalation', 'msp-stack-rmm-psa'],
    relatedScenarioIds: ['msp-rmm-low-disk-alert', 'msp-endpoint-offline-rmm']
  },
  {
    id: 'msp-mfa-reset-workflow',
    title: 'MFA Reset and Verification Workflow',
    domain: 'MSP',
    summary: 'Step-by-step workflow for securely resetting MFA when a user is locked out.',
    estimatedMinutes: 6,
    safeFirstChecks: [
      'Verify the user identity via secure channel (do not trust email or phone alone).',
      'Confirm whether this is a lost device, forgotten authenticator, or sync issue.',
      'Check account for signs of compromise (unusual login history, forwarding rules).',
      'Document the reset reason and who authorized it.'
    ],
    askFirst: [
      'Why is MFA unavailable: lost device, forgotten method, or technical issue?',
      'What is the user identity and how can we securely verify it?',
      'Are there any signs of account compromise?',
      'Who in the client organization authorizes MFA resets?'
    ],
    escalationTriggers: [
      'Account shows signs of compromise (unusual logins, forwarding rules created).',
      'User cannot verify identity via organization authorization process.',
      'MFA reset is needed for a high-privileged account.'
    ],
    doNotDo: [
      'Do not reset MFA based on email request alone.',
      'Do not bypass organization authorization procedures.',
      'Do not reset all MFA at once for a user account.',
      'Do not forget to advise user to re-register their authenticator after reset.'
    ],
    ticketTemplate: `User: [name / email / employee ID]
Reset reason: [lost device / forgotten method / compromise suspected]
Identity verified: [yes / method used]
Authorization: [approver name / ticket / reference]
Account security check: [passed / flagged / see incident ticket]
Reset completed: [date / time]
User advised to: [re-register authenticator / check login history / verify email rules]`,
    relatedModuleIds: ['msp-ticket-triage-escalation', 'msp-client-communication-documentation'],
    relatedScenarioIds: ['msp-m365-signin-failure', 'msp-mfa-loop-or-prompt-stuck']
  },
  {
    id: 'msp-printer-triage-guide',
    title: 'Client Printer Triage Guide',
    domain: 'MSP',
    summary: 'Quick field reference for printer offline and queue issues.',
    estimatedMinutes: 5,
    safeFirstChecks: [
      'Verify device power and check for visible error lights or jams.',
      'Confirm the printer shows a valid IP address on its display panel.',
      'Test print queue: try a new print job to confirm the printer is responsive.',
      'Check whether other printers in the same location are affected.'
    ],
    askFirst: [
      'Is the printer powered on and displaying an error?',
      'Can anyone print to this printer or are all users blocked?',
      'Are other printers at the site working normally?',
      'When did the printer last work successfully?'
    ],
    escalationTriggers: [
      'Printer shows error code and power cycle does not clear it.',
      'Multiple printers or the primary office printer is offline.',
      'Print jobs are stuck in queue and not clearing.',
      'Network connectivity is lost but the device powered on.'
    ],
    doNotDo: [
      'Do not assume queue corruption: always test a new print job first.',
      'Do not power cycle without documenting current error state.',
      'Do not blame the printer before checking network connectivity.',
      'Do not delete queued jobs without client approval.'
    ],
    ticketTemplate: `Printer: [model / location / IP]
Status: [powered / error lights / queue state]
Last successful print: [when]
Safe checks: [power / IP visible / new test print / queue status]
Scope: [one printer / location / all sites]
Error: [exact message / code if shown]
Action taken: [power cycle / queue clear / escalation]
Fallback: [alternative printer offered / workaround suggested]`,
    relatedModuleIds: ['msp-ticket-triage-escalation', 'msp-stack-rmm-psa'],
    relatedScenarioIds: ['msp-printer-offline-client', 'dcs-library-printer-offline']
  },
  {
    id: 'msp-phishing-and-incident-handoff',
    title: 'Phishing Report and Security Incident Handoff',
    domain: 'MSP',
    summary: 'Reference for receiving, documenting, and escalating phishing and security incident reports.',
    estimatedMinutes: 6,
    safeFirstChecks: [
      'Confirm the user who received the phishing or saw suspicious activity.',
      'Capture the exact email address or URL that triggered the alert.',
      'Ask whether credentials were entered or files downloaded.',
      'Preserve the email headers and sender information.',
      'Do not click suspicious links or download attachments.'
    ],
    askFirst: [
      'Who received this phishing email or saw the suspicious activity?',
      'What was the sender email address and subject line?',
      'Did you enter any credentials or download files?',
      'What is the exact URL or domain (if applicable)?',
      'When did this happen?'
    ],
    escalationTriggers: [
      'User entered credentials into a phishing page.',
      'Files were downloaded from a suspicious source.',
      'Multiple users received the same phishing email.',
      'The email appears to be targeted spear-phishing.'
    ],
    doNotDo: [
      'Do not ask user to verify by re-entering credentials.',
      'Do not delete the suspicious email without preserving headers.',
      'Do not forward the phishing email to other users as "warning".',
      'Do not downgrade urgency if the incident involves credential entry.'
    ],
    ticketTemplate: `Reported by: [user name / email / organization]
Date / time: [when received]
Sender email: [exact address]
Subject line: [exact subject]
URLs / domain: [any links included]
Credentials entered: [yes / no / which accounts]
Files downloaded: [yes / no / file names]
Email headers: [forwarded / available]
Initial action: [user notified / account secured / password reset]
Escalation: [to security team / to email admin / incident created]`,
    relatedModuleIds: ['msp-ticket-triage-escalation', 'msp-client-communication-documentation'],
    relatedScenarioIds: ['msp-mfa-loop-or-prompt-stuck']
  },
  {
    id: 'msp-vendor-escalation-evidence-pack',
    title: 'Vendor Escalation Evidence Pack',
    domain: 'MSP',
    summary: 'Checklist for gathering complete evidence before handing off to hardware or software vendor.',
    estimatedMinutes: 7,
    safeFirstChecks: [
      'Gather device specifications: model, serial number, firmware/driver versions.',
      'Document error messages, logs, or event viewer entries.',
      'Capture output from diagnostic tools (ping, ipconfig, device logs).',
      'Preserve the exact reproduction steps and timing.',
      'Confirm vendor support contract and warranty status.'
    ],
    askFirst: [
      'What is the device model, serial number, and current firmware version?',
      'What error or behavior is occurring and when did it start?',
      'What troubleshooting has already been completed?',
      'Is the device still under warranty or support contract?',
      'What is the client SLA or business impact?'
    ],
    escalationTriggers: [
      'Device shows hardware error codes.',
      'Software issue persists after driver/firmware update.',
      'Problem affects production or critical client service.',
      'Troubleshooting requires access to vendor proprietary tools.'
    ],
    doNotDo: [
      'Do not escalate without documenting what safe checks have been done.',
      'Do not assume a device is hardware-failed without logs or error codes.',
      'Do not escalate without confirming warranty or support contract.',
      'Do not include sensitive client data in evidence package.'
    ],
    ticketTemplate: `Device: [make / model / serial / firmware]
Warranty / support: [contract name / expiration]
Issue: [exact error / behavior]
First occurred: [date / time]
Reproduction steps: [exact sequence]
Completed troubleshooting: [list with results]
Error codes / logs: [attached / available]
Client impact: [business process / SLA]
Vendor case: [reference number if existing]
Requested: [device replacement / firmware update / investigation]`,
    relatedModuleIds: ['msp-ticket-triage-escalation', 'msp-client-communication-documentation'],
    relatedScenarioIds: ['msp-unifi-ap-offline', 'msp-printer-offline-client']
  },
  {
    id: 'msp-client-communication-template',
    title: 'Client Communication Update Template',
    domain: 'MSP',
    summary: 'Quick template for sending status updates and managing client expectations during support incidents.',
    estimatedMinutes: 5,
    safeFirstChecks: [
      'Compose message using plain language, no technical jargon.',
      'Be honest about current status and estimated timeline.',
      'Provide specific next steps or expected updates.',
      'Copy appropriate internal team members but hide sensitive details.',
      'Confirm message tone is professional and reassuring without overpromising.'
    ],
    askFirst: [
      'What is the current status: investigating, waiting on vendor, resolved?',
      'What is the most likely timeline for resolution?',
      'What is the client expected to do (if anything)?',
      'When will you provide the next update?'
    ],
    escalationTriggers: [
      'Client has not received an update in over 4 hours for a critical issue.',
      'Timeline is slipping and client needs revised estimate.',
      'External escalation (vendor) is now needed.',
      'Situation has changed and expectations need adjustment.'
    ],
    doNotDo: [
      'Do not use technical terms without explaining them.',
      'Do not promise a specific resolution time unless you are confident.',
      'Do not copy debugging notes or internal discussions to client.',
      'Do not forget to include next update time.'
    ],
    ticketTemplate: `Subject: [Service Name] Status Update - [Date]

Hi [Client Contact],

We are actively working on the [service/issue] that began at [time]. Here is what we know so far:

Current Status: [investigating / repair in progress / waiting on vendor response]
Root Cause: [identified / under investigation / pending vendor feedback]
Impact: [resolved for some users / affecting [X] users / system offline]

Next Steps: [what IT or vendor is doing next]
Expected Update: [by what time / at what milestone]

If you have any questions, please reply to this ticket.

Best regards,
[Support Team]`,
    relatedModuleIds: ['msp-client-communication-documentation'],
    relatedScenarioIds: ['msp-m365-signin-failure', 'msp-printer-offline-client', 'msp-unifi-ap-offline']
  },
  {
    id: 'msp-new-user-onboarding-checklist',
    title: 'New User Onboarding Checklist',
    domain: 'MSP',
    summary: 'Reference for new employee account setup including access, security, and system configuration.',
    estimatedMinutes: 8,
    safeFirstChecks: [
      'Verify the new user request is approved by the client manager.',
      'Confirm the user role, department, and access requirements.',
      'Create the user account only after approvals are documented.',
      'Configure email, shared folder access, and VPN before first day if possible.'
    ],
    askFirst: [
      'What is the user role and department?',
      'Which groups, folders, and systems do they need access to?',
      'Will they work on-site, remote, or hybrid?',
      'Do they need hardware provisioning (laptop, phone, keys)?'
    ],
    escalationTriggers: [
      'Access request is missing manager approval.',
      'User needs elevated privileges that require additional authorization.',
      'New user is assigned to multiple departments with conflicting access.',
      'Access must be provisioned after the user starts.'
    ],
    doNotDo: [
      'Do not create accounts without documented manager approval.',
      'Do not grant excessive permissions "to be safe".',
      'Do not forget to set up MFA during onboarding.',
      'Do not leave test accounts or temporary passwords active.'
    ],
    ticketTemplate: `New User: [name / email]
Department: [area / manager]
Role / job title: [position]
Start date: [when]
Access needed: [folder list / systems / groups]
Hardware: [laptop model / phone / other]
MFA setup: [required / optional / configured]
First-day prep: [email working / access configured / equipment ready]
Completion date: [when all access active]
User training: [provider / date completed]`,
    relatedModuleIds: ['msp-client-communication-documentation', 'msp-ticket-triage-escalation'],
    relatedScenarioIds: ['dcs-staff-missing-access']
  }
];

export function getQuickFixCheatSheetById(id: string) {
  return quickFixCheatSheets.find((sheet) => sheet.id === id);
}
