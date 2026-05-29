import type { AssessmentQuestion } from '../../types/assessment';
import type {
  Flashcard,
  ModulePattern,
  PracticalOutput,
  ScenarioPrompt,
  Section,
  TrainingModule
} from '../../types/training';

export const reviewSchedule = 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.';

export function mcq(question: Omit<Extract<AssessmentQuestion, { type: 'mcq' }>, 'type'>): AssessmentQuestion {
  return {
    type: 'mcq',
    ...question
  };
}

export function shortAnswer(
  question: Omit<Extract<AssessmentQuestion, { type: 'short-answer' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'short-answer',
    ...question
  };
}

export function orderSteps(
  question: Omit<Extract<AssessmentQuestion, { type: 'order-steps' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'order-steps',
    ...question
  };
}

export function scenarioResponse(
  question: Omit<Extract<AssessmentQuestion, { type: 'scenario-response' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'scenario-response',
    ...question
  };
}

export function categorization(
  question: Omit<Extract<AssessmentQuestion, { type: 'categorization' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'categorization',
    ...question
  };
}

export function buildSections(
  prefix: string,
  items: Array<{
    title: string;
    bodyMarkdown: string;
    takeaway?: string;
  }>
): Section[] {
  return items.map((item, index) => ({
    id: `${prefix}-${index + 1}`,
    ...item
  }));
}

export function buildFlashcards(
  prefix: string,
  items: Array<[string, string]>
): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `${prefix}-f${index + 1}`,
    front,
    back
  }));
}

export function buildScenarioPrompts(
  prefix: string,
  items: Array<{
    title: string;
    prompt: string;
  }>
): ScenarioPrompt[] {
  return items.map((item, index) => ({
    id: `${prefix}-s${index + 1}`,
    ...item
  }));
}

export function buildPracticalOutputs(
  prefix: string,
  items: Array<{
    title: string;
    description: string;
  }>
): PracticalOutput[] {
  return items.map((item, index) => ({
    id: `${prefix}-p${index + 1}`,
    ...item
  }));
}

export function mergeUniqueStrings(base: string[], extras: string[] = []) {
  return Array.from(new Set([...base, ...extras]));
}

export type LegacyTrainingModule = Omit<TrainingModule, 'modulePattern'>;

export function buildDefaultPattern(module: LegacyTrainingModule): ModulePattern {
  return {
    diagnosticQuestions: module.quiz.slice(0, 2).map((question, index) => ({
      id: `${module.id}-diagnostic-${index + 1}`,
      prompt: question.prompt,
      expectedFocus: question.modelAnswer
    })),
    explainBackPrompt: {
      id: `${module.id}-explain-back`,
      title: 'Explain it simply',
      prompt: `Explain ${module.title} in plain English as if you were helping a new Level 1 support worker.`,
      supportText: 'Keep it simple, practical, and tied to safe DCS support behaviour.'
    },
    cornellPrompt: {
      id: `${module.id}-cornell`,
      title: 'Cornell reflection',
      prompt: `Write cue questions, summary notes, and one next-action line for ${module.title}.`,
      supportText: 'Keep the notes short enough that you could revise them during a quiet support window.'
    },
    conceptSortExercise: {
      id: `${module.id}-concept-sort`,
      title: 'Support judgement sort',
      prompt: `Sort these common support considerations into the bucket that best fits ${module.title}.`,
      cards: [
        'Visible user symptom',
        'Safe Level 1 check',
        'Escalation trigger or owner boundary',
        'Privacy or data-handling concern',
        'Useful note detail',
        'Possible self-service article angle'
      ],
      buckets: [
        { id: 'symptom', label: 'Symptom or clue' },
        { id: 'action', label: 'Safe first-line action' },
        { id: 'boundary', label: 'Boundary or escalation' }
      ],
      modelGroups: [
        'Symptom and clue items should sound like what the user sees or reports.',
        'Safe first-line actions should stay reversible and appropriate for Level 1.',
        'Boundary items should mention privacy, approvals, ownership, or escalation thresholds.'
      ]
    },
    memoryPrompt: {
      id: `${module.id}-memory`,
      title: 'Memory sheet prompt',
      prompt: `Create a one-minute memory sheet for ${module.title}: three signals, three safe checks, and one escalation trigger.`,
      mnemonicHint: module.tags.slice(0, 3).join(' / ')
    },
    sq3rPrompt: {
      id: `${module.id}-sq3r`,
      title: 'SQ3R companion',
      prompt: `Survey, question, read, recite, and review one internal DCS-safe resource related to ${module.title}.`,
      supportText: 'Convert the reading into safe prompts and summaries instead of copying internal content.'
    },
    safePromptWorkflow: {
      id: `${module.id}-safe-prompt`,
      title: 'Turn internal knowledge into safe prompts',
      goal: `Convert DCS workflow knowledge about ${module.title} into study prompts without copying private material.`,
      steps: [
        'Identify the workflow or support pattern, not the private case details.',
        'Abstract the safe symptom, decision point, and escalation boundary.',
        'Write a question, flashcard, or scenario prompt using generic language.',
        'Remove names, access keys, credentials, private notes, and copied internal text.',
        'Check that the result teaches judgement rather than exposing system detail.'
      ],
      examplePrompt: `Create three privacy-safe retrieval questions about ${module.title} that focus on symptoms, safe first actions, and escalation boundaries.`,
      privacyReminder:
        'Keep the workflow, remove the confidential specifics. Do not paste live parent, student, staff, credential, or internal system data.'
    }
  };
}

export type ModuleEnhancement = {
  description?: string;
  estimatedMinutes?: number;
  addTags?: string[];
  addLearningObjectives?: string[];
  addDcsRelevance?: string[];
  addSections?: Section[];
  addFlashcards?: Flashcard[];
  addQuiz?: AssessmentQuestion[];
  addScenarioPrompts?: ScenarioPrompt[];
  addPracticalOutputs?: PracticalOutput[];
};

export function enhanceModule(module: LegacyTrainingModule, enhancement?: ModuleEnhancement): TrainingModule {
  return {
    ...module,
    description: enhancement?.description ?? module.description,
    estimatedMinutes: enhancement?.estimatedMinutes ?? module.estimatedMinutes,
    tags: mergeUniqueStrings(module.tags, enhancement?.addTags),
    learningObjectives: mergeUniqueStrings(module.learningObjectives, enhancement?.addLearningObjectives),
    dcsRelevance: mergeUniqueStrings(module.dcsRelevance, enhancement?.addDcsRelevance),
    sections: [...module.sections, ...(enhancement?.addSections ?? [])],
    flashcards: [...module.flashcards, ...(enhancement?.addFlashcards ?? [])],
    quiz: [...module.quiz, ...(enhancement?.addQuiz ?? [])],
    scenarioPrompts: [...module.scenarioPrompts, ...(enhancement?.addScenarioPrompts ?? [])],
    practicalOutputs: [...module.practicalOutputs, ...(enhancement?.addPracticalOutputs ?? [])],
    modulePattern: buildDefaultPattern({
      ...module,
      description: enhancement?.description ?? module.description,
      estimatedMinutes: enhancement?.estimatedMinutes ?? module.estimatedMinutes,
      tags: mergeUniqueStrings(module.tags, enhancement?.addTags),
      learningObjectives: mergeUniqueStrings(module.learningObjectives, enhancement?.addLearningObjectives),
      dcsRelevance: mergeUniqueStrings(module.dcsRelevance, enhancement?.addDcsRelevance),
      sections: [...module.sections, ...(enhancement?.addSections ?? [])],
      flashcards: [...module.flashcards, ...(enhancement?.addFlashcards ?? [])],
      quiz: [...module.quiz, ...(enhancement?.addQuiz ?? [])],
      scenarioPrompts: [...module.scenarioPrompts, ...(enhancement?.addScenarioPrompts ?? [])],
      practicalOutputs: [...module.practicalOutputs, ...(enhancement?.addPracticalOutputs ?? [])]
    })
  };
}

export function createModule(module: LegacyTrainingModule): TrainingModule {
  return {
    ...module,
    modulePattern: buildDefaultPattern(module)
  };
}
