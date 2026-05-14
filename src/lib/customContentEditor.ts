import type { RoleplayScenario } from '../data/roleplayScenarios';
import type { AssessmentQuestion } from '../types/assessment';
import type { ModuleDomain, ModuleLevel, TrainingModule } from '../types/training';

export type CustomModuleEditorInput = {
  title: string;
  description: string;
  domain: ModuleDomain;
  level: ModuleLevel;
  estimatedMinutes: number;
  tagsText: string;
  objectivesText: string;
  relevanceText: string;
  sectionsText: string;
  flashcardsText: string;
  recallPrompt: string;
  scenarioTitle: string;
  scenarioPrompt: string;
  practicalOutputTitle: string;
  practicalOutputDescription: string;
};

export type CustomRoleplayEditorInput = {
  persona: string;
  archetype: string;
  issueTitle: string;
  tier: 'Level 1' | 'Level 2';
  pressure: RoleplayScenario['pressure'];
  scenario: string;
  itChallenge: string;
  initialPrompt: string;
  focusText: string;
};

export const DEFAULT_CUSTOM_MODULE_EDITOR_INPUT: CustomModuleEditorInput = {
  title: 'Custom DCS support module',
  description: 'A privacy-safe Level 1 practice module for a recurring support workflow.',
  domain: 'Operations',
  level: 'L1',
  estimatedMinutes: 15,
  tagsText: 'custom, privacy-safe, Level 1',
  objectivesText: 'Clarify the support symptom\nCapture safe evidence\nEscalate with useful notes',
  relevanceText: 'Supports repeatable DCS IT triage without copying private system data.',
  sectionsText:
    'Workflow overview | Describe the support pattern, safe first checks, and boundaries.\nEvidence to capture | Record who/where/what/impact without names, credentials, or confidential URLs.\nEscalation boundary | Name when the issue needs a senior ICT handoff.',
  flashcardsText:
    'What should the first question clarify? | Scope: one user, one device, one room, or many people.\nWhat should never be pasted into DCSPrep? | Student/staff names, passwords, internal URLs, tickets, IPs, or confidential procedures.\nWhat makes an escalation note useful? | Symptom, scope, impact, checks tried, result, and next owner.',
  recallPrompt: 'Write a privacy-safe first response for this workflow.',
  scenarioTitle: 'First-line triage practice',
  scenarioPrompt: 'A staff member reports the recurring issue during a busy school day. Ask clarifying questions, try safe checks, and prepare an escalation note.',
  practicalOutputTitle: 'Support note template',
  practicalOutputDescription: 'Create a reusable note template for this workflow using generic wording only.'
};

export const DEFAULT_CUSTOM_ROLEPLAY_EDITOR_INPUT: CustomRoleplayEditorInput = {
  persona: 'Jordan Taylor',
  archetype: 'Busy classroom teacher',
  issueTitle: 'Urgent classroom support request',
  tier: 'Level 1',
  pressure: 'Medium',
  scenario: 'A teacher needs quick help with a recurring classroom technology issue while students are waiting.',
  itChallenge: 'Acknowledge the pressure, ask scope questions, try safe first checks, and explain the escalation path without jargon.',
  initialPrompt: 'Hi Josh, sorry, but I need help now. The class is waiting and I cannot get this working.',
  focusText: 'de-escalation, scope questions, classroom impact, safe workaround'
};

export function createSlug(value: string, fallback = 'custom-content') {
  const slug = value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);

  return slug || fallback;
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitCsv(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitPair(line: string, fallbackRight: string): [string, string] {
  const [left, ...rest] = line.split('|').map((part) => part.trim());
  return [left || 'Untitled', rest.join(' | ') || fallbackRight];
}

export function buildCustomTrainingModule(input: CustomModuleEditorInput): TrainingModule {
  const id = `custom-${createSlug(input.title, 'training-module')}`;
  const objectives = splitLines(input.objectivesText);
  const relevance = splitLines(input.relevanceText);
  const tags = splitCsv(input.tagsText);
  const sections = splitLines(input.sectionsText).map((line, index) => {
    const [title, body] = splitPair(line, 'Add privacy-safe workflow detail.');
    return {
      id: `${id}-section-${index + 1}`,
      title,
      bodyMarkdown: body
    };
  });
  const flashcards = splitLines(input.flashcardsText).map((line, index) => {
    const [front, back] = splitPair(line, 'Add the answer.');
    return {
      id: `${id}-flashcard-${index + 1}`,
      front,
      back
    };
  });
  const recallPrompt = input.recallPrompt.trim() || 'Write a privacy-safe first response for this workflow.';
  const quiz: AssessmentQuestion[] = [
    {
      id: `${id}-q1`,
      type: 'short-answer',
      prompt: recallPrompt,
      domain: input.domain,
      difficulty: 'foundation',
      explanation: 'Custom module recall prompt.',
      modelAnswer:
        'Clarify the symptom and scope, capture privacy-safe evidence, try reversible first checks, and escalate with impact and actions tried.',
      commonMistakes: ['Collecting private details', 'Skipping scope', 'Escalating without evidence'],
      dcsContext: 'Custom DCSPrep content must stay generic and privacy-safe.',
      reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
      recommendedModuleId: id,
      weakTopic: 'ticket-quality',
      rubric: ['Clarifies scope', 'Captures safe evidence', 'Names escalation boundary'],
      keywordHints: ['scope', 'evidence', 'impact', 'escalate']
    }
  ];

  return {
    id,
    title: input.title.trim() || 'Custom DCS support module',
    description: input.description.trim() || 'A privacy-safe custom support module.',
    domain: input.domain,
    level: input.level,
    estimatedMinutes: Math.max(5, Math.min(120, Math.round(input.estimatedMinutes || 15))),
    tags: tags.length ? tags : ['custom'],
    learningObjectives: objectives.length ? objectives : ['Practise safe first-line support.'],
    dcsRelevance: relevance.length ? relevance : ['Supports DCS IT practice without copying private details.'],
    sections: sections.length ? sections : DEFAULT_CUSTOM_MODULE_EDITOR_INPUT.sectionsText.split(/\r?\n/).map((line, index) => {
      const [title, body] = splitPair(line, 'Add privacy-safe workflow detail.');
      return { id: `${id}-section-${index + 1}`, title, bodyMarkdown: body };
    }),
    flashcards: flashcards.length ? flashcards : DEFAULT_CUSTOM_MODULE_EDITOR_INPUT.flashcardsText.split(/\r?\n/).map((line, index) => {
      const [front, back] = splitPair(line, 'Add the answer.');
      return { id: `${id}-flashcard-${index + 1}`, front, back };
    }),
    quiz,
    modulePattern: {
      diagnosticQuestions: [
        {
          id: `${id}-diagnostic-1`,
          prompt: 'What is the first safe thing to clarify?',
          expectedFocus: 'Scope, impact, and whether this is one user/device or a broader pattern.'
        },
        {
          id: `${id}-diagnostic-2`,
          prompt: 'What information should stay out of the app?',
          expectedFocus: 'Names, credentials, internal URLs, confidential procedures, and live ticket details.'
        }
      ],
      explainBackPrompt: {
        id: `${id}-explain-back`,
        title: 'Explain it simply',
        prompt: `Explain ${input.title || 'this custom workflow'} to a non-technical staff member in three plain sentences.`
      },
      cornellPrompt: {
        id: `${id}-cornell`,
        title: 'Cornell reflection',
        prompt: 'Write cues, notes, and a short summary for this custom workflow.'
      },
      sq3rPrompt: {
        id: `${id}-sq3r`,
        title: 'SQ3R companion',
        prompt: 'Survey, question, read, recite, and review any approved internal source without copying it.'
      },
      safePromptWorkflow: {
        id: `${id}-safe-prompt`,
        title: 'Privacy-safe source conversion',
        goal: 'Turn internal workflow knowledge into generic practice material.',
        steps: [
          'Identify the generic workflow pattern.',
          'Remove private people, system, ticket, and credential details.',
          'Write prompts around symptoms, decisions, and escalation boundaries.',
          'Check the result teaches judgement rather than exposing procedure.'
        ],
        examplePrompt: 'Create three Level 1-safe questions for this workflow using generic school IT wording.',
        privacyReminder: 'Do not paste live DCS data, names, tickets, credentials, internal URLs, or confidential procedures.'
      }
    },
    scenarioPrompts: [
      {
        id: `${id}-scenario-1`,
        title: input.scenarioTitle.trim() || 'First-line triage practice',
        prompt: input.scenarioPrompt.trim() || DEFAULT_CUSTOM_MODULE_EDITOR_INPUT.scenarioPrompt
      }
    ],
    practicalOutputs: [
      {
        id: `${id}-output-1`,
        title: input.practicalOutputTitle.trim() || 'Support note template',
        description: input.practicalOutputDescription.trim() || DEFAULT_CUSTOM_MODULE_EDITOR_INPUT.practicalOutputDescription
      }
    ]
  };
}

export function buildCustomRoleplay(input: CustomRoleplayEditorInput): RoleplayScenario {
  const id = `custom-roleplay-${createSlug(`${input.persona}-${input.issueTitle}`, 'support-roleplay')}`;
  const focus = splitCsv(input.focusText);

  return {
    id,
    tier: input.tier,
    persona: input.persona.trim() || 'Custom persona',
    archetype: input.archetype.trim() || 'School community member',
    issueTitle: input.issueTitle.trim() || 'Custom support roleplay',
    scenario: input.scenario.trim() || DEFAULT_CUSTOM_ROLEPLAY_EDITOR_INPUT.scenario,
    itChallenge: input.itChallenge.trim() || DEFAULT_CUSTOM_ROLEPLAY_EDITOR_INPUT.itChallenge,
    initialPrompt: input.initialPrompt.trim() || DEFAULT_CUSTOM_ROLEPLAY_EDITOR_INPUT.initialPrompt,
    pressure: input.pressure,
    focus: focus.length ? focus : ['communication', 'triage', 'safe escalation']
  };
}
