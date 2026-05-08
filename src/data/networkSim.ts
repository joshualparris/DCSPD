export type NetworkNode = {
  id: string;
  label: string;
  type: 'router' | 'switch' | 'device' | 'server';
  ip?: string;
  vlan?: number;
  status: 'online' | 'offline' | 'restricted';
  connections: string[]; // ids of connected nodes
  x: number; // For visual positioning
  y: number;
};

export type VlanInfo = {
  id: number;
  name: string;
  subnet: string;
  purpose: string;
  gateway: string;
};

export const dcsVlans: VlanInfo[] = [
  { id: 10, name: 'Staff', subnet: '10.10.10.0/24', purpose: 'Staff laptops and devices', gateway: '10.10.10.1' },
  { id: 20, name: 'Students', subnet: '10.10.20.0/24', purpose: 'Student iPads and laptops', gateway: '10.10.20.1' },
  { id: 30, name: 'Printers', subnet: '10.10.30.0/24', purpose: 'Shared network printers', gateway: '10.10.30.1' },
  { id: 40, name: 'Management', subnet: '10.10.40.0/24', purpose: 'Switches, APs, and UPS', gateway: '10.10.40.1' },
  { id: 99, name: 'Guest', subnet: '192.168.99.0/24', purpose: 'Visitor Wi-Fi (Isolated)', gateway: '192.168.99.1' }
];

export const initialNetworkNodes: NetworkNode[] = [
  { id: 'gw', label: 'Core Gateway', type: 'router', ip: '10.10.1.1', status: 'online', connections: ['sw-core'], x: 400, y: 50 },
  { id: 'sw-core', label: 'Core Switch', type: 'switch', status: 'online', connections: ['gw', 'sw-admin', 'sw-library', 'srv-dc'], x: 400, y: 150 },
  { id: 'srv-dc', label: 'Domain Controller', type: 'server', ip: '10.10.1.10', vlan: 40, status: 'online', connections: ['sw-core'], x: 550, y: 150 },
  { id: 'sw-admin', label: 'Admin Switch', type: 'switch', status: 'online', connections: ['sw-core', 'pc-admin-1', 'prn-admin'], x: 250, y: 250 },
  { id: 'sw-library', label: 'Library Switch', type: 'switch', status: 'online', connections: ['sw-core', 'pc-lib-1', 'ap-lib'], x: 550, y: 250 },
  { id: 'pc-admin-1', label: 'Admin PC 1', type: 'device', ip: '10.10.10.50', vlan: 10, status: 'online', connections: ['sw-admin'], x: 150, y: 350 },
  { id: 'prn-admin', label: 'Admin Printer', type: 'device', ip: '10.10.30.10', vlan: 30, status: 'online', connections: ['sw-admin'], x: 300, y: 350 },
  { id: 'pc-lib-1', label: 'Library PC 1', type: 'device', ip: '10.10.20.101', vlan: 20, status: 'online', connections: ['sw-library'], x: 500, y: 350 },
  { id: 'ap-lib', label: 'Library AP', type: 'switch', ip: '10.10.40.20', vlan: 40, status: 'online', connections: ['sw-library'], x: 650, y: 350 }
];
