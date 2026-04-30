import type { WeakTopicKey } from '../types/assessment';

export const weakTopicLabels: Record<WeakTopicKey, string> = {
  'ports-protocols': 'Ports and protocols',
  'dns-dhcp-gateway': 'DNS, DHCP, and gateway basics',
  'vlan-firewall-rules': 'VLAN and firewall rules',
  'cloud-models': 'Cloud models',
  'offboarding-sequence': 'Offboarding sequence',
  'mdm-group-policy': 'MDM and Group Policy',
  'printer-symptoms': 'Printer symptoms',
  'ticket-quality': 'Ticket quality',
  'security-risk-judgement': 'Security and risk judgement'
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
    }
  ]
} satisfies Record<string, ReadinessArea[]>;
