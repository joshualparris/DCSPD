import type { TrainingModule } from '../types/training';
import type { AssessmentSource } from '../types/assessment';
import { foundationsModules } from './modules/foundations';
import { networkingModules } from './modules/networking';
import { endpointModules } from './modules/endpoint';
import { identityModules } from './modules/identity';
import { cloudModules } from './modules/cloud';
import { operationsModules } from './modules/operations';
import { aplusModules } from './modules/aplus';
import { accessibilityModules } from './modules/accessibility';

export const legacyModuleAliases: Record<string, string> = {
  foundations: 'dcs-it-support-foundations',
  'library-daily-routines': 'classroom-display-viewboard-troubleshooting',
  'ict-helpdesk-101': 'ticket-notes-escalation-quality'
};

// We use a function to avoid static initialization order issues
export function getAllBaseModules(): TrainingModule[] {
  return [
    ...foundationsModules,
    ...networkingModules,
    ...endpointModules,
    ...identityModules,
    ...cloudModules,
    ...operationsModules,
    ...aplusModules,
    ...accessibilityModules
  ];
}

export const modules = getAllBaseModules();

export function getModuleById(moduleId: string) {
  if (!moduleId) return undefined;
  const resolvedId = legacyModuleAliases[moduleId] || moduleId;
  return getAllBaseModules().find((module) => module.id === resolvedId);
}

// Helper for SSR and fast lookup of basic module info
export function getBaseModuleById(moduleId: string) {
  return getModuleById(moduleId);
}

export function getModuleQuestions(moduleId: string, source: AssessmentSource = 'module-quiz') {
  const moduleData = getModuleById(moduleId);

  if (!moduleData) {
    return [];
  }

  return moduleData.quiz.map((question) => ({
    ...question,
    recommendedModuleId: question.recommendedModuleId,
    reviewSchedule: question.reviewSchedule,
    source
  }));
}

export default modules;
