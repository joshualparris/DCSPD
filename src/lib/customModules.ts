import type { TrainingModule } from '../types/training';
import type { RoleplayScenario } from '../data/roleplayScenarios';
import type { Scenario } from '../types/scenarios';
import type { AcademicSubject } from '../types/academic';
import type { TroubleshootingPlaybook } from '../types/playbooks';
import type { DcsAssetProfile } from '../types/assets';

const KEYS = {
  MODULES: 'dcsprep_custom_modules',
  ROLEPLAYS: 'dcsprep_custom_roleplays',
  SCENARIOS: 'dcsprep_custom_scenarios',
  ACADEMIC: 'dcsprep_custom_academic',
  PLAYBOOKS: 'dcsprep_custom_playbooks',
  ASSETS: 'dcsprep_custom_assets'
};

// Generic helper for localStorage
function getCustomData<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as T[];
  } catch (e) {
    console.error(`Failed to parse custom data for ${key}`, e);
    return [];
  }
}

function saveCustomData<T extends { id: string }>(key: string, item: T) {
  if (typeof window === 'undefined') return;
  const items = getCustomData<T>(key);
  const index = items.findIndex((i) => i.id === item.id);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.push(item);
  }
  localStorage.setItem(key, JSON.stringify(items));
}

// Modules
export const getCustomModules = () => getCustomData<TrainingModule>(KEYS.MODULES);
export const saveCustomModule = (m: TrainingModule) => saveCustomData(KEYS.MODULES, m);
export const clearCustomModules = () => localStorage.removeItem(KEYS.MODULES);

// Roleplays
export const getCustomRoleplays = () => getCustomData<RoleplayScenario>(KEYS.ROLEPLAYS);
export const saveCustomRoleplay = (r: RoleplayScenario) => saveCustomData(KEYS.ROLEPLAYS, r);
export const clearCustomRoleplays = () => localStorage.removeItem(KEYS.ROLEPLAYS);

// Scenario Labs
export const getCustomScenarios = () => getCustomData<Scenario>(KEYS.SCENARIOS);
export const saveCustomScenario = (s: Scenario) => saveCustomData(KEYS.SCENARIOS, s);
export const clearCustomScenarios = () => localStorage.removeItem(KEYS.SCENARIOS);

// Academic Subjects
export const getCustomAcademic = () => getCustomData<AcademicSubject>(KEYS.ACADEMIC);
export const saveCustomAcademic = (a: AcademicSubject) => saveCustomData(KEYS.ACADEMIC, a);
export const clearCustomAcademic = () => localStorage.removeItem(KEYS.ACADEMIC);

// Playbooks
export const getCustomPlaybooks = () => getCustomData<TroubleshootingPlaybook>(KEYS.PLAYBOOKS);
export const saveCustomPlaybook = (p: TroubleshootingPlaybook) => saveCustomData(KEYS.PLAYBOOKS, p);
export const clearCustomPlaybooks = () => localStorage.removeItem(KEYS.PLAYBOOKS);

// Assets
export const getCustomAssets = () => getCustomData<DcsAssetProfile>(KEYS.ASSETS);
export const saveCustomAsset = (a: DcsAssetProfile) => saveCustomData(KEYS.ASSETS, a);
export const clearCustomAssets = () => localStorage.removeItem(KEYS.ASSETS);

export function clearAllCustomData() {
  if (typeof window === 'undefined') return;
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}
