export type SafeCheck = {
  id: string;
  title: string;
  steps: string[];
  tools?: string[];
  expectedEvidence?: string[];
};

export type TroubleshootingPlaybook = {
  id: string;
  title: string;
  description: string;
  domain: string;
  level: 'L1' | 'L2' | 'A+' | 'DCS Context';
  tags: string[];
  symptoms: string[];
  firstQuestions: string[];
  safeChecks: SafeCheck[];
  escalationTriggers: string[];
  doNotDo: string[];
  ticketTemplate: string;
  relatedModuleIds?: string[];
  relatedScenarioIds?: string[];
  relatedRoleplayIds?: string[];
};
