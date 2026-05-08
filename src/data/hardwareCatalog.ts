export type HardwareCatalogItem = {
  id: string;
  name: string;
  category: 'display' | 'endpoint' | 'printing' | 'network' | 'av' | 'mobile' | 'power';
  summary: string;
  safeChecks: string[];
  commonSymptoms: string[];
  escalationTriggers: string[];
  dcsUse: string;
  privacyBoundary: string;
};

export const hardwareCatalog: HardwareCatalogItem[] = [
  {
    id: 'interactive-viewboard',
    name: 'Interactive ViewBoard / classroom panel',
    category: 'display',
    summary: 'Classroom display used for teaching, touch interaction, sound, and screen sharing.',
    safeChecks: ['Confirm power and input source', 'Check HDMI/USB-C display cable', 'Check USB touch cable', 'Try Windows + P duplicate mode'],
    commonSymptoms: ['No signal', 'Touch offset from stylus', 'Sound from laptop not panel', 'Frozen display mid-lesson'],
    escalationTriggers: ['Panel will not power on', 'Cracked screen', 'Repeated touch calibration failure', 'Wall cabling fault suspected'],
    dcsUse: 'High-frequency classroom continuity support.',
    privacyBoundary: 'Do not photograph class lists, student work, or visible wellbeing information on the display.'
  },
  {
    id: 'vivi-box',
    name: 'Vivi screen-casting box',
    category: 'av',
    summary: 'Wireless classroom casting appliance used for teacher and student display workflows.',
    safeChecks: ['Confirm display input', 'Check Vivi power/status light', 'Confirm the device is on the right network', 'Restart the app before rebooting hardware'],
    commonSymptoms: ['Teacher cannot find room', 'Casting drops out', 'Audio delay', 'Device offline after firmware update'],
    escalationTriggers: ['Fleet firmware failure', 'Device cannot re-adopt', 'Firewall rule suspected', 'Multiple rooms affected'],
    dcsUse: 'Supports teaching flow when wired display is inconvenient.',
    privacyBoundary: 'Do not capture or store screen-cast content from real classes.'
  },
  {
    id: 'papercut-mfd',
    name: 'PaperCut managed photocopier / MFD',
    category: 'printing',
    summary: 'Shared print, scan, copy, quota, and release workflow device.',
    safeChecks: ['Check paper tray and jam path', 'Confirm Follow-Me release queue', 'Confirm printer is online', 'Compare one user versus many users'],
    commonSymptoms: ['Jobs stuck', 'Wrong tray', 'Error code', 'Stapling failure', 'Colour budget exhausted'],
    escalationTriggers: ['Service error code persists', 'Fuser/drum/roller issue', 'Finance or quota dispute', 'Multiple departments blocked'],
    dcsUse: 'Front office, faculty, and classroom worksheet continuity.',
    privacyBoundary: 'Do not open or inspect confidential print jobs unless explicitly authorised.'
  },
  {
    id: 'staff-laptop',
    name: 'Staff Windows laptop',
    category: 'endpoint',
    summary: 'Managed endpoint for staff teaching, admin work, M365, printing, and classroom display.',
    safeChecks: ['Check power/charging', 'Restart after saving work', 'Confirm Wi-Fi and sign-in state', 'Check display mode before changing drivers'],
    commonSymptoms: ['Slow startup', 'No Wi-Fi', 'BitLocker or sign-in prompt', 'Dock/display not detected'],
    escalationTriggers: ['Data loss risk', 'BitLocker recovery loop', 'Suspected malware', 'Hardware damage', 'Admin rights required'],
    dcsUse: 'Core staff productivity and teaching device.',
    privacyBoundary: 'Never browse personal files, emails, student records, or saved passwords.'
  },
  {
    id: 'student-ipad-cart',
    name: 'Student iPad cart',
    category: 'mobile',
    summary: 'Managed iPad fleet used for classroom learning, accessibility, testing, and apps.',
    safeChecks: ['Check charge level', 'Try force restart', 'Confirm Wi-Fi profile', 'Check app deployment status', 'Swap to a loaner if learning is blocked'],
    commonSymptoms: ['Boot loop', 'App missing', 'Wi-Fi not joined', 'MDM profile missing', 'Cracked screen'],
    escalationTriggers: ['Student accessibility impact', 'Lost/stolen device', 'MDM enrollment failure', 'Data recovery needed'],
    dcsUse: 'Supports learning access and shared classroom device programs.',
    privacyBoundary: 'Do not inspect student content beyond the support task required.'
  },
  {
    id: 'wireless-access-point',
    name: 'Wireless access point',
    category: 'network',
    summary: 'Ceiling or wall-mounted wireless infrastructure serving classrooms and common areas.',
    safeChecks: ['Compare one device versus many', 'Check room/location scope', 'Record time and SSID', 'Avoid moving infrastructure hardware'],
    commonSymptoms: ['Blackspot', 'Drops every few minutes', 'Slow roll marking', 'Students connected but no internet'],
    escalationTriggers: ['Many devices affected', 'AP offline', 'VLAN/DHCP suspicion', 'Physical cabling issue', 'Safety access needed'],
    dcsUse: 'Critical for rolls, learning platforms, shared devices, and staff mobility.',
    privacyBoundary: 'Do not expose internal network identifiers or diagrams in PD evidence.'
  }
];

export const hardwareCategories = Array.from(new Set(hardwareCatalog.map((item) => item.category)));
