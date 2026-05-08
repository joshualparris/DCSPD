export type ClassroomHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  safeCheck: string;
  likelyFaults: string[];
  evidenceToRecord: string[];
};

export type ClassroomFaultDrill = {
  id: string;
  title: string;
  symptom: string;
  correctHotspots: string[];
  modelAnswer: string;
};

export const classroomHotspots: ClassroomHotspot[] = [
  {
    id: 'teacher-laptop',
    label: 'Teacher laptop',
    x: 8,
    y: 62,
    width: 24,
    height: 18,
    safeCheck: 'Confirm the teacher is signed in, the laptop is awake, and Windows + P is set to Duplicate or Extend.',
    likelyFaults: ['Wrong display mode', 'Flat battery', 'Frozen app', 'Dock not detected'],
    evidenceToRecord: ['Laptop model', 'Display mode', 'Whether another display works']
  },
  {
    id: 'dock-adapter',
    label: 'USB-C dock / adapter',
    x: 34,
    y: 66,
    width: 18,
    height: 12,
    safeCheck: 'Check the USB-C dock, adapter, and HDMI seating before changing display settings.',
    likelyFaults: ['Loose adapter', 'Failed USB-C port', 'Wrong HDMI input', 'Power-only cable'],
    evidenceToRecord: ['Adapter type', 'Cable seated yes/no', 'Tested alternate adapter yes/no']
  },
  {
    id: 'viewboard',
    label: 'Interactive panel',
    x: 58,
    y: 18,
    width: 34,
    height: 34,
    safeCheck: 'Confirm power, source/input, touch USB, and whether the issue affects display, touch, or audio.',
    likelyFaults: ['Wrong source', 'Touch USB disconnected', 'Panel frozen', 'Calibration drift'],
    evidenceToRecord: ['Input selected', 'Touch status', 'Panel power/status light']
  },
  {
    id: 'wall-plate',
    label: 'Wall plate',
    x: 48,
    y: 52,
    width: 12,
    height: 18,
    safeCheck: 'Check HDMI/USB wall plate connections for movement, damage, or a cable pulled loose.',
    likelyFaults: ['Loose HDMI', 'Loose USB touch cable', 'Damaged wall plate', 'In-wall cabling issue'],
    evidenceToRecord: ['Cable labels', 'Physical damage', 'Whether direct laptop-to-panel works']
  },
  {
    id: 'speakers',
    label: 'Speakers',
    x: 61,
    y: 55,
    width: 24,
    height: 12,
    safeCheck: 'Check selected audio output, panel volume, app volume, and mute state.',
    likelyFaults: ['Wrong audio output', 'Muted panel', 'App muted', 'HDMI audio not negotiated'],
    evidenceToRecord: ['Selected output device', 'Panel volume', 'Whether test sound plays']
  },
  {
    id: 'access-point',
    label: 'Access point',
    x: 14,
    y: 14,
    width: 18,
    height: 14,
    safeCheck: 'Compare one device versus many and record room, time, SSID, and whether roll marking works.',
    likelyFaults: ['AP saturated', 'DHCP issue', 'RF interference', 'Single laptop Wi-Fi driver issue'],
    evidenceToRecord: ['Number of devices affected', 'SSID', 'Time pattern', 'Nearby interference clue']
  }
];

export const classroomFaultDrills: ClassroomFaultDrill[] = [
  {
    id: 'display-no-signal',
    title: 'No signal on panel',
    symptom: 'The teacher laptop is open and the panel says No Signal while a class is waiting.',
    correctHotspots: ['teacher-laptop', 'dock-adapter', 'wall-plate', 'viewboard'],
    modelAnswer:
      'Check Windows + P, adapter seating, HDMI/wall plate, and panel input before rebooting. Record scope, room, cable path, input selected, and whether a direct cable works.'
  },
  {
    id: 'touch-offset',
    title: 'Touch offset',
    symptom: 'The panel displays the laptop, but the stylus draws several centimetres away from the touch point.',
    correctHotspots: ['viewboard', 'wall-plate'],
    modelAnswer:
      'Separate display from touch. Check USB-touch cable first, then calibration. Escalate if calibration fails repeatedly or wall cabling looks damaged.'
  },
  {
    id: 'wifi-drops',
    title: 'Room Wi-Fi dropouts',
    symptom: 'A demountable classroom drops Wi-Fi every ten minutes during digital roll marking.',
    correctHotspots: ['access-point', 'teacher-laptop'],
    modelAnswer:
      'Compare one device versus many, record SSID/time/scope, check if the teacher laptop is the only affected device, and escalate with location and pattern evidence.'
  }
];
