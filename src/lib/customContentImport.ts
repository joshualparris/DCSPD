import type { RoleplayScenario } from '../data/roleplayScenarios';
import type { AcademicSubject } from '../types/academic';
import type { DcsAssetProfile } from '../types/assets';
import type { TroubleshootingPlaybook } from '../types/playbooks';
import type { Scenario } from '../types/scenarios';
import type { TrainingModule } from '../types/training';

export type CustomContentImportKind =
  | 'training-module'
  | 'roleplay-scenario'
  | 'scenario-lab'
  | 'academic-subject'
  | 'support-playbook'
  | 'asset-profile';

export type PreparedCustomContentImport =
  | {
      ok: true;
      kind: 'training-module';
      contentKind: 'Training module';
      displayName: string;
      contentId?: string;
      item: TrainingModule;
    }
  | {
      ok: true;
      kind: 'roleplay-scenario';
      contentKind: 'Roleplay scenario';
      displayName: string;
      contentId?: string;
      item: RoleplayScenario;
    }
  | {
      ok: true;
      kind: 'scenario-lab';
      contentKind: 'Scenario lab';
      displayName: string;
      contentId?: string;
      item: Scenario;
    }
  | {
      ok: true;
      kind: 'academic-subject';
      contentKind: 'Academic subject';
      displayName: string;
      contentId?: string;
      item: AcademicSubject;
    }
  | {
      ok: true;
      kind: 'support-playbook';
      contentKind: 'Support playbook';
      displayName: string;
      contentId?: string;
      item: TroubleshootingPlaybook;
    }
  | {
      ok: true;
      kind: 'asset-profile';
      contentKind: 'Asset profile';
      displayName: string;
      contentId?: string;
      item: DcsAssetProfile;
    }
  | {
      ok: false;
      error: string;
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasKeys(value: Record<string, unknown>, keys: string[]) {
  return keys.every((key) => key in value);
}

function getString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function getOptionalString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function normalizeQuizRubrics(quiz: unknown) {
  if (!Array.isArray(quiz)) {
    return quiz;
  }

  return quiz.map((question) => {
    if (!isRecord(question) || question.type !== 'short-answer' || !Array.isArray(question.rubric)) {
      return question;
    }

    return {
      ...question,
      rubric: question.rubric.map((rubricItem) => {
        if (!isRecord(rubricItem)) {
          return String(rubricItem);
        }

        return getString(rubricItem.criterion, getString(rubricItem.label, JSON.stringify(rubricItem)));
      })
    };
  });
}

function normalizeTrainingModule(data: Record<string, unknown>): TrainingModule {
  return {
    modulePattern: {
      diagnosticQuestions: [],
      explainBackPrompt: { id: 'eb', title: 'Explain it back', prompt: 'P' },
      cornellPrompt: { id: 'c', title: 'Cornell', prompt: 'P' },
      sq3rPrompt: { id: 's', title: 'SQ3R', prompt: 'P' }
    },
    scenarioPrompts: [],
    practicalOutputs: [],
    ...data,
    quiz: normalizeQuizRubrics(data.quiz)
  } as unknown as TrainingModule;
}

export function expandCustomContentPayload(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (isRecord(payload) && Array.isArray(payload.items)) {
    return payload.items;
  }

  return [payload];
}

export function prepareCustomContentImport(data: unknown): PreparedCustomContentImport {
  if (!isRecord(data)) {
    return { ok: false, error: 'JSON root must be an object.' };
  }

  if (hasKeys(data, ['sections', 'learningObjectives'])) {
    const item = normalizeTrainingModule(data);
    return {
      ok: true,
      kind: 'training-module',
      contentKind: 'Training module',
      contentId: getOptionalString(data.id),
      displayName: getString(data.title, 'Untitled training module'),
      item
    };
  }

  if (hasKeys(data, ['persona', 'itChallenge'])) {
    return {
      ok: true,
      kind: 'roleplay-scenario',
      contentKind: 'Roleplay scenario',
      contentId: getOptionalString(data.id),
      displayName: getString(data.persona, 'Untitled roleplay persona'),
      item: data as RoleplayScenario
    };
  }

  if (hasKeys(data, ['steps', 'initialReport'])) {
    return {
      ok: true,
      kind: 'scenario-lab',
      contentKind: 'Scenario lab',
      contentId: getOptionalString(data.id),
      displayName: getString(data.title, 'Untitled scenario lab'),
      item: data as Scenario
    };
  }

  if (hasKeys(data, ['silos', 'dcsBridges'])) {
    return {
      ok: true,
      kind: 'academic-subject',
      contentKind: 'Academic subject',
      contentId: getOptionalString(data.id),
      displayName: getString(data.title, 'Untitled academic subject'),
      item: data as AcademicSubject
    };
  }

  if (hasKeys(data, ['safeChecks', 'escalationTriggers'])) {
    return {
      ok: true,
      kind: 'support-playbook',
      contentKind: 'Support playbook',
      contentId: getOptionalString(data.id),
      displayName: getString(data.title, 'Untitled troubleshooting playbook'),
      item: data as TroubleshootingPlaybook
    };
  }

  if (hasKeys(data, ['category', 'level1Boundaries'])) {
    return {
      ok: true,
      kind: 'asset-profile',
      contentKind: 'Asset profile',
      contentId: getOptionalString(data.id),
      displayName: getString(data.name, 'Untitled asset profile'),
      item: data as DcsAssetProfile
    };
  }

  return { ok: false, error: 'Unknown JSON format. Could not detect data type.' };
}
