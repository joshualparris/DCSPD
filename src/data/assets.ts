import type { DcsAssetProfile } from '../types/assets';

export const dcsAssets: DcsAssetProfile[] = [
  {
    id: 'viewboard-ifp50',
    name: 'ViewSonic ViewBoard IFP50-5 Series',
    category: 'classroom-tech',
    description: 'Standard 4K Interactive Display used in most DCS classrooms. Built-in Android OS with PC input slot.',
    commonSymptoms: [
      'No signal on HDMI 1',
      'Touch not responding',
      'Audio coming from laptop, not board',
      'Frozen on splash screen'
    ],
    safeChecks: [
      'Confirm Windows+P is set to "Duplicate" or "Extend"',
      'Check HDMI and USB-Touch cables are both connected',
      'Cycle power using the physical rocker switch underneath',
      'Verify the input source matches the physical port'
    ],
    usefulTools: ['HDMI Tester', 'USB-A to USB-B Touch Cable', 'Remote Control'],
    escalationOwner: 'Level 2 / AV Lead',
    level1Boundaries: [
      'Do not attempt firmware updates',
      'Do not open the back panel',
      'Do not factory reset without approval'
    ],
    privacyNotes: ['Clear browser history if using built-in Android browser'],
    relatedModuleIds: ['classroom-display-viewboard-troubleshooting'],
    relatedScenarioIds: ['viewboard-display-issue']
  },
  {
    id: 'mfd-toshiba-eb-5518',
    name: 'Toshiba e-STUDIO 5518A',
    category: 'printer',
    description: 'High-volume Multi-Function Device (MFD) used in Staff Rooms and Library.',
    commonSymptoms: [
      'Paper jam in fuser area',
      'Toner streaks on scans',
      'PaperCut login not responding',
      'Wrong paper size error'
    ],
    safeChecks: [
      'Clear visible paper jams from marked green handles',
      'Wipe scanner glass with lint-free cloth',
      'Verify PaperCut service status on the console',
      'Check if the print queue is held for authorization'
    ],
    usefulTools: ['Microfiber Cloth', 'PaperCut Admin Portal'],
    escalationOwner: 'Printer Service Provider (External)',
    level1Boundaries: [
      'Do not replace fuser units',
      'Do not clear internal developer spills',
      'Call for service if error code starts with "C"'
    ],
    privacyNotes: ['Ensure "Secure Print" is used for sensitive documents'],
    relatedModuleIds: ['printer-troubleshooting'],
    relatedScenarioIds: ['printer-jobs-stuck-in-queue']
  },
  {
    id: 'byod-laptop-standard',
    name: 'DCS Standard BYOD (Windows)',
    category: 'device',
    description: 'The typical student or staff personal device used on the DCS network.',
    commonSymptoms: [
      'Wi-Fi connection drops',
      'Cannot reach Sentral',
      'OneDrive sync errors',
      'Teams notification lag'
    ],
    safeChecks: [
      'Confirm device is on "DCS-Internal" SSID',
      'Verify time and date settings (MFA requirement)',
      'Run "gpupdate /force" if on-site',
      'Check for pending Windows Updates'
    ],
    usefulTools: ['Self-Service Portal', 'Company Portal (Intune)'],
    level1Boundaries: [
      'Do not perform hardware repairs on personal devices',
      'Do not bypass school filtering',
      'Do not reinstall OS without owner consent'
    ],
    privacyNotes: ['Always log out of school accounts before returning device'],
    relatedModuleIds: ['dns-dhcp-gateway-ip-basics', 'm365-identity-offboarding-basics']
  }
];
