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
  }
];

export function getQuickFixCheatSheetById(id: string) {
  return quickFixCheatSheets.find((sheet) => sheet.id === id);
}
