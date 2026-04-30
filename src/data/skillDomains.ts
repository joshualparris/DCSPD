import type { WeakTopicKey } from '../types/assessment';

export const weakTopicLabels: Record<WeakTopicKey, string> = {
  'ports-protocols': 'Ports and protocols',
  'dns-dhcp-gateway': 'DNS, DHCP, and gateway basics',
  'vlan-firewall-rules': 'VLAN and firewall rules',
  'network-services': 'Network services (DNS/DHCP/auth/proxy/etc.)',
  'wireless-networks': 'Wireless networks (802.11/Bluetooth/NFC/RFID)',
  'network-tools-devices': 'Network tools and devices',
  'laptop-mobile-hardware': 'Laptop and mobile hardware',
  'display-cables-connectors': 'Displays, cables, and connectors',
  'memory-storage-raid': 'Memory, storage, and RAID',
  'motherboards-cpu-power-cooling': 'Motherboards, CPU, power, and cooling',
  'printers-maintenance': 'Printers and maintenance',
  'cloud-models': 'Cloud models',
  virtualization: 'Virtualization concepts',
  'hardware-troubleshooting': 'Hardware troubleshooting',
  'network-troubleshooting': 'Network troubleshooting',
  'offboarding-sequence': 'Offboarding sequence',
  'mdm-group-policy': 'MDM and Group Policy',
  'printer-symptoms': 'Printer symptoms',
  'classroom-av': 'Classroom AV and display troubleshooting',
  'ticket-quality': 'Ticket quality',
  'security-risk-judgement': 'Security and risk judgement',
  'parent-portal-workflows': 'Parent Portal workflows',
  'sentral-support': 'Sentral support',
  'schoolbox-workflows': 'OurDCS and Schoolbox workflows',
  'login-password-support': 'Login and password support',
  'permissions-access': 'Permissions and access requests',
  'website-filtering': 'Website filtering and unblock requests',
  'onboarding-workflows': 'New user onboarding',
  'teams-sharepoint-onedrive': 'Teams, SharePoint, and OneDrive',
  'jamf-ipad-support': 'iPad and Jamf support'
};

export type ReadinessArea = {
  id: string;
  label: string;
  moduleIds: string[];
  focusTerms: string[];
  weakTopics: WeakTopicKey[];
};

export const readinessProfiles = {
  aPlus: [
    {
      id: 'hardware',
      label: 'Hardware',
      moduleIds: ['printer-troubleshooting', 'classroom-display-viewboard-troubleshooting'],
      focusTerms: ['Printer', 'ViewBoard', 'device'],
      weakTopics: ['printer-symptoms']
    },
    {
      id: 'windows-tools',
      label: 'Windows tools',
      moduleIds: ['dcs-it-support-foundations', 'ticket-notes-escalation-quality'],
      focusTerms: ['Windows', 'troubleshooting'],
      weakTopics: ['ticket-quality']
    },
    {
      id: 'command-line',
      label: 'Command line',
      moduleIds: ['dns-dhcp-gateway-ip-basics'],
      focusTerms: ['ipconfig', 'ping', 'nslookup'],
      weakTopics: ['dns-dhcp-gateway']
    },
    {
      id: 'security-basics',
      label: 'Security basics',
      moduleIds: ['m365-identity-offboarding-basics', 'ticket-notes-escalation-quality'],
      focusTerms: ['security', 'phishing', 'privacy'],
      weakTopics: ['security-risk-judgement']
    },
    {
      id: 'networking-concepts',
      label: 'Networking concepts',
      moduleIds: ['ports-and-protocols', 'dns-dhcp-gateway-ip-basics', 'vlans-network-segmentation'],
      focusTerms: ['network', 'VLAN', 'protocol'],
      weakTopics: ['ports-protocols', 'dns-dhcp-gateway', 'vlan-firewall-rules']
    },
    {
      id: 'ports-protocols',
      label: 'Ports and protocols',
      moduleIds: ['ports-and-protocols'],
      focusTerms: ['port', 'protocol'],
      weakTopics: ['ports-protocols']
    },
    {
      id: 'printers',
      label: 'Printers and peripherals',
      moduleIds: ['printer-troubleshooting'],
      focusTerms: ['printer'],
      weakTopics: ['printer-symptoms']
    },
    {
      id: 'mobile-cloud',
      label: 'Mobile, cloud, and virtualisation',
      moduleIds: ['cloud-models-saas-paas-iaas-daas', 'mdm-intune-group-policy-concepts'],
      focusTerms: ['cloud', 'Intune', 'mobile'],
      weakTopics: ['cloud-models', 'mdm-group-policy']
    },
    {
      id: 'professional-judgement',
      label: 'Professional judgement',
      moduleIds: ['ticket-notes-escalation-quality', 'm365-identity-offboarding-basics'],
      focusTerms: ['risk', 'escalation', 'safe'],
      weakTopics: ['ticket-quality', 'security-risk-judgement']
    },
    {
      id: 'troubleshooting-instinct',
      label: 'Troubleshooting judgement',
      moduleIds: ['dcs-it-support-foundations', 'classroom-display-viewboard-troubleshooting'],
      focusTerms: ['first check', 'triage'],
      weakTopics: ['ticket-quality']
    },
    {
      id: 'school-service-workflows',
      label: 'School service workflows',
      moduleIds: [
        'parent-portal-registration',
        'sentral-support',
        'login-and-password-support',
        'new-user-onboarding'
      ],
      focusTerms: ['portal', 'Sentral', 'login', 'onboarding'],
      weakTopics: [
        'parent-portal-workflows',
        'sentral-support',
        'login-password-support',
        'onboarding-workflows'
      ]
    }
  ],
  level2: [
    {
      id: 'triage',
      label: 'Ticket triage and escalation',
      moduleIds: ['ticket-notes-escalation-quality', 'dcs-it-support-foundations'],
      focusTerms: ['triage', 'escalation'],
      weakTopics: ['ticket-quality']
    },
    {
      id: 'endpoint',
      label: 'Windows endpoint support',
      moduleIds: ['printer-troubleshooting', 'classroom-display-viewboard-troubleshooting'],
      focusTerms: ['endpoint', 'device'],
      weakTopics: ['printer-symptoms']
    },
    {
      id: 'm365',
      label: 'M365 and Google Workspace',
      moduleIds: ['m365-identity-offboarding-basics'],
      focusTerms: ['M365', 'Teams', 'identity'],
      weakTopics: ['offboarding-sequence']
    },
    {
      id: 'network',
      label: 'Network troubleshooting',
      moduleIds: ['ports-and-protocols', 'dns-dhcp-gateway-ip-basics', 'vlans-network-segmentation'],
      focusTerms: ['network', 'DNS', 'DHCP', 'VLAN'],
      weakTopics: ['ports-protocols', 'dns-dhcp-gateway', 'vlan-firewall-rules']
    },
    {
      id: 'identity',
      label: 'Identity and access basics',
      moduleIds: ['m365-identity-offboarding-basics', 'mdm-intune-group-policy-concepts'],
      focusTerms: ['identity', 'Entra', 'access'],
      weakTopics: ['offboarding-sequence', 'mdm-group-policy']
    },
    {
      id: 'security',
      label: 'Security response basics',
      moduleIds: ['ticket-notes-escalation-quality', 'm365-identity-offboarding-basics'],
      focusTerms: ['phishing', 'risk', 'security'],
      weakTopics: ['security-risk-judgement']
    },
    {
      id: 'remote-support',
      label: 'Remote support and user comms',
      moduleIds: ['dcs-it-support-foundations'],
      focusTerms: ['support', 'teacher', 'student'],
      weakTopics: ['ticket-quality']
    },
    {
      id: 'documentation',
      label: 'Documentation and process improvement',
      moduleIds: ['ticket-notes-escalation-quality'],
      focusTerms: ['documentation', 'note'],
      weakTopics: ['ticket-quality']
    },
    {
      id: 'automation',
      label: 'Scripting and automation',
      moduleIds: ['ticket-notes-escalation-quality'],
      focusTerms: ['automation', 'repeatable'],
      weakTopics: ['ticket-quality']
    },
    {
      id: 'deep-protocols',
      label: 'Deep protocol and port fluency',
      moduleIds: ['ports-and-protocols', 'vlans-network-segmentation'],
      focusTerms: ['port', 'protocol', 'allow'],
      weakTopics: ['ports-protocols', 'vlan-firewall-rules']
    },
    {
      id: 'school-platforms',
      label: 'School platforms and workflow support',
      moduleIds: [
        'parent-portal-registration',
        'parent-portal-details-updates',
        'sentral-support',
        'ourdcs-schoolbox-support',
        'teams-sharepoint-onedrive-support'
      ],
      focusTerms: ['portal', 'Sentral', 'Schoolbox', 'SharePoint', 'OneDrive'],
      weakTopics: [
        'parent-portal-workflows',
        'sentral-support',
        'schoolbox-workflows',
        'teams-sharepoint-onedrive'
      ]
    },
    {
      id: 'access-onboarding',
      label: 'Access, password, and onboarding workflows',
      moduleIds: [
        'login-and-password-support',
        'permissions-and-access-requests',
        'new-user-onboarding',
        'ipad-jamf-workflow-basics'
      ],
      focusTerms: ['access', 'password', 'onboarding', 'Jamf'],
      weakTopics: [
        'login-password-support',
        'permissions-access',
        'onboarding-workflows',
        'jamf-ipad-support'
      ]
    }
  ],
  schoolItManager: [
    {
      id: 'technical-breadth',
      label: 'Technical breadth',
      moduleIds: [
        'dcs-it-support-foundations',
        'ports-and-protocols',
        'dns-dhcp-gateway-ip-basics',
        'printer-troubleshooting',
        'classroom-display-viewboard-troubleshooting',
        'm365-identity-offboarding-basics',
        'mdm-intune-group-policy-concepts',
        'vlans-network-segmentation',
        'cloud-models-saas-paas-iaas-daas',
        'ticket-notes-escalation-quality'
      ],
      focusTerms: ['broad'],
      weakTopics: [
        'ports-protocols',
        'dns-dhcp-gateway',
        'vlan-firewall-rules',
        'cloud-models',
        'offboarding-sequence',
        'mdm-group-policy',
        'printer-symptoms',
        'ticket-quality',
        'security-risk-judgement'
      ]
    },
    {
      id: 'endpoint-fleet',
      label: 'Endpoint fleet',
      moduleIds: ['printer-troubleshooting', 'mdm-intune-group-policy-concepts'],
      focusTerms: ['fleet', 'devices'],
      weakTopics: ['mdm-group-policy', 'printer-symptoms']
    },
    {
      id: 'platforms',
      label: 'M365 and Google Workspace',
      moduleIds: ['m365-identity-offboarding-basics', 'cloud-models-saas-paas-iaas-daas'],
      focusTerms: ['tenant', 'platform'],
      weakTopics: ['offboarding-sequence', 'cloud-models']
    },
    {
      id: 'infrastructure',
      label: 'Networking and infrastructure',
      moduleIds: ['ports-and-protocols', 'dns-dhcp-gateway-ip-basics', 'vlans-network-segmentation'],
      focusTerms: ['network', 'segmentation'],
      weakTopics: ['ports-protocols', 'dns-dhcp-gateway', 'vlan-firewall-rules']
    },
    {
      id: 'cybersecurity',
      label: 'Cybersecurity and risk',
      moduleIds: ['m365-identity-offboarding-basics', 'ticket-notes-escalation-quality'],
      focusTerms: ['risk', 'security'],
      weakTopics: ['security-risk-judgement']
    },
    {
      id: 'identity-compliance',
      label: 'Identity, access, and compliance',
      moduleIds: ['m365-identity-offboarding-basics', 'mdm-intune-group-policy-concepts'],
      focusTerms: ['identity', 'compliance'],
      weakTopics: ['offboarding-sequence', 'mdm-group-policy']
    },
    {
      id: 'documentation-systems',
      label: 'Documentation and process systems',
      moduleIds: ['ticket-notes-escalation-quality'],
      focusTerms: ['process', 'documentation'],
      weakTopics: ['ticket-quality']
    },
    {
      id: 'change-support',
      label: 'Staff training and change support',
      moduleIds: ['dcs-it-support-foundations', 'ticket-notes-escalation-quality'],
      focusTerms: ['training', 'change'],
      weakTopics: ['ticket-quality']
    },
    {
      id: 'school-fit',
      label: 'School systems and EdTech fit',
      moduleIds: ['classroom-display-viewboard-troubleshooting', 'mdm-intune-group-policy-concepts'],
      focusTerms: ['classroom', 'edtech'],
      weakTopics: ['mdm-group-policy']
    },
    {
      id: 'roadmapping',
      label: 'Strategic IT roadmapping',
      moduleIds: ['cloud-models-saas-paas-iaas-daas', 'vlans-network-segmentation'],
      focusTerms: ['roadmap', 'future'],
      weakTopics: ['cloud-models', 'vlan-firewall-rules']
    },
    {
      id: 'school-service-design',
      label: 'School service design and self-service',
      moduleIds: [
        'parent-portal-registration',
        'parent-portal-details-updates',
        'sentral-support',
        'website-filtering-and-unblock-requests',
        'new-user-onboarding',
        'teams-sharepoint-onedrive-support'
      ],
      focusTerms: ['parent', 'workflow', 'self-service', 'filtering', 'onboarding'],
      weakTopics: [
        'parent-portal-workflows',
        'sentral-support',
        'website-filtering',
        'onboarding-workflows',
        'teams-sharepoint-onedrive'
      ]
    }
  ]
} satisfies Record<string, ReadinessArea[]>;
