export type DcsAssetCategory =
  | 'device'
  | 'classroom-tech'
  | 'printer'
  | 'network'
  | 'identity'
  | 'platform'
  | 'application'
  | 'workflow';

export type DcsAssetProfile = {
  id: string;
  name: string;
  category: DcsAssetCategory;
  description: string;
  commonSymptoms: string[];
  safeChecks: string[];
  usefulTools: string[];
  escalationOwner?: string;
  level1Boundaries: string[];
  privacyNotes: string[];
  relatedPlaybookIds?: string[];
  relatedModuleIds?: string[];
  relatedScenarioIds?: string[];
};
