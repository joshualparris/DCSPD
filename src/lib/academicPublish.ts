import type {
  AcademicAssessmentItem,
  AcademicFinalChallenge,
  AcademicLearningMode,
  AcademicPracticalTask,
  AcademicResource,
  AcademicSilo,
  AcademicSubject,
  AcademicWeeklyModule
} from '../types/academic';
import type { SlgImportDraft } from './slgImport';
import { parseSlgTextDraft } from './slgImport';

const PRIVACY_REMINDER =
  'Use synthetic or anonymised examples only. Do not include student, parent, staff, credential, network, health, wellbeing, custody, or live incident details.';

const DEFAULT_LEARNING_MODES: AcademicLearningMode[] = [
  { id: 'diagnose', label: 'Diagnose', action: 'Start with a quick recall check against the SILOs before reading notes.' },
  { id: 'learn', label: 'Learn', action: 'Read the concise concept notes and connect the idea to a DCS support pattern.' },
  { id: 'retrieve', label: 'Retrieve', action: 'Explain the idea back without notes and check against the mastery criteria.' },
  { id: 'apply', label: 'Apply', action: 'Use a fake DCS scenario to practise safe triage and documentation.' },
  { id: 'prove', label: 'Prove', action: 'Log evidence in the PD log or evidence pack using privacy-safe examples only.' }
];

export type AcademicDraftPackage = {
  subjectCode: string;
  title: string;
  sourceFileName?: string;
  sourceStatus?: AcademicSubject['sourceStatus'];
  track?: AcademicSubject['track'];
  provider?: AcademicSubject['provider'];
  level?: AcademicSubject['level'];
  stream?: AcademicSubject['stream'];
  summary?: string;
  silos: Array<{
    id: string;
    number: number;
    text: string;
    plainEnglish?: string;
    masteryCriteria?: string[];
    practicePrompts?: string[];
    quizItems?: string[];
  }>;
  weeklyModules: Array<{
    id: string;
    week: number;
    title: string;
    dateIso?: string;
    contactHours?: number;
    deliveryModes?: string[];
    overview?: string;
    dcsConnections?: string[];
    assessments?: Array<{
      title: string;
      kind?: AcademicAssessmentItem['kind'];
      minutes?: number;
      evidenceType?: AcademicPracticalTask['evidenceType'];
      prompt?: string;
      successCriteria?: string[];
    }>;
  }>;
};

export type PublishResult =
  | { ok: true; subject: AcademicSubject; replaced: boolean }
  | { ok: false; errors: string[] };

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function inferStream(code: string): AcademicSubject['stream'] {
  if (/ICB|SEC|CYB/i.test(code)) return 'cybersecurity';
  if (/CN|NET/i.test(code)) return 'networking';
  if (/PE|OOF/i.test(code)) return 'programming';
  if (/STA|DCT|DATA/i.test(code)) return 'data';
  if (/ML|AI|NLP|DL|CV|BDC/i.test(code)) return 'ai';
  if (/5006|CLOUD/i.test(code)) return 'cloud';
  if (/3PE|PROF/i.test(code)) return 'professional-practice';
  if (/IS/i.test(code)) return 'systems';
  return 'foundations';
}

function inferTrack(code: string): AcademicSubject['track'] {
  return /^CSE[45]/i.test(code) ? 'SMITB' : 'RBC';
}

export function draftPackageFromSlgImport(draft: SlgImportDraft): AcademicDraftPackage {
  return JSON.parse(
    JSON.stringify({
      subjectCode: draft.subjectCode,
      title: draft.title,
      sourceFileName: draft.sourceFileName,
      sourceStatus: draft.confidence === 'high' ? 'manual-check' : 'placeholder',
      silos: draft.silos.map((silo) => ({
        id: silo.id,
        number: silo.number,
        text: silo.text,
        plainEnglish: `Explain ${draft.subjectCode} SILO ${silo.number} in plain English and connect it to DCS IT work.`,
        masteryCriteria: ['Explains the outcome clearly', 'Applies it to a synthetic DCS support pattern'],
        practicePrompts: ['Use fake or anonymised examples only.'],
        quizItems: [`What would prove you understand SILO ${silo.number}?`]
      })),
      weeklyModules: draft.weeklyTopics.map((topic) => ({
        id: topic.id,
        week: topic.week,
        title: `Week ${topic.week}: ${topic.title}`,
        dateIso: topic.dateIso,
        contactHours: topic.contactHours,
        deliveryModes: ['Lecture', 'Lab', 'Applied DCS transfer'],
        overview: topic.title,
        dcsConnections: ['Add a privacy-safe DCS support connection before publishing.'],
        assessments: [
          {
            title: `Quick check: ${topic.title}`,
            kind: 'quick-check',
            minutes: 10,
            evidenceType: 'reflection',
            prompt: `Summarise ${topic.title} and connect it to a fake DCS support scenario.`,
            successCriteria: ['Uses plain English', 'Names a safe first check', 'Includes a privacy boundary']
          }
        ]
      }))
    })
  ) as AcademicDraftPackage;
}

export function parseAcademicDraftJson(json: string): { ok: true; draft: AcademicDraftPackage } | { ok: false; errors: string[] } {
  try {
    const parsed = JSON.parse(json) as AcademicDraftPackage;
    const errors = validateAcademicDraftPackage(parsed);
    if (errors.length) return { ok: false, errors };
    return { ok: true, draft: parsed };
  } catch {
    return { ok: false, errors: ['Draft JSON is not valid JSON.'] };
  }
}

export function validateAcademicDraftPackage(draft: AcademicDraftPackage): string[] {
  const errors: string[] = [];
  if (!draft.subjectCode || draft.subjectCode === 'UNKNOWN') {
    errors.push('Subject code is missing or UNKNOWN.');
  }
  if (!draft.title?.trim()) {
    errors.push('Subject title is required.');
  }
  if (!draft.silos?.length) {
    errors.push('At least one SILO is required.');
  }
  if (!draft.weeklyModules?.length) {
    errors.push('At least one weekly module is required.');
  }
  return errors;
}

export function academicSubjectFromDraft(
  draft: AcademicDraftPackage,
  options?: { publishedAtIso?: string }
): AcademicSubject {
  const code = draft.subjectCode.toUpperCase();
  const id = code.toLowerCase();
  const publishedNote = options?.publishedAtIso
    ? `Published to custom catalogue on ${options.publishedAtIso.slice(0, 10)}.`
    : 'Published from admin SLG draft.';

  const silos: AcademicSilo[] = draft.silos.map((silo) => ({
    id: silo.id || `${id}-silo${silo.number}`,
    number: silo.number,
    text: silo.text,
    plainEnglish: silo.plainEnglish || `Explain SILO ${silo.number} in plain English.`,
    masteryCriteria: silo.masteryCriteria || ['Explains the outcome clearly'],
    practicePrompts: silo.practicePrompts || ['Use synthetic examples only.'],
    quizItems: silo.quizItems || [`What proves SILO ${silo.number} understanding?`]
  }));

  const siloIds = silos.map((silo) => silo.id);

  const weeklyModules: AcademicWeeklyModule[] = draft.weeklyModules.map((week) => {
    const weekSiloIds = siloIds.slice(0, Math.min(2, siloIds.length));
    const assessments: AcademicAssessmentItem[] = (week.assessments || []).map((item, index) => ({
      id: `${week.id}-assessment-${index + 1}`,
      title: item.title,
      kind: item.kind || 'quick-check',
      prompt:
        item.prompt ||
        `Complete a privacy-safe reflection for ${week.title}. Connect the topic to DCS Level 1 support boundaries.`,
      successCriteria: item.successCriteria || [
        'Uses plain English',
        'Names safe first checks',
        'Includes escalation or privacy boundary'
      ],
      siloIds: weekSiloIds,
      minutes: item.minutes || 10,
      evidenceType: item.evidenceType || 'reflection',
      dcsApplication: 'Translate academic study into safer DCS support judgement and documentation.'
    }));

    return {
      id: week.id,
      week: week.week,
      title: week.title,
      dateIso: week.dateIso,
      contactHours: week.contactHours,
      deliveryModes: week.deliveryModes || ['Lecture', 'Lab'],
      overview: week.overview || week.title,
      siloIds: weekSiloIds,
      dcsConnections: week.dcsConnections || ['Review against current DCS workflow before treating as operational guidance.'],
      internalLinks: [
        { id: `${week.id}-pd`, label: 'PD Log', href: '/pd-log', why: 'Log weekly study time.' },
        { id: `${week.id}-evidence`, label: 'Evidence Pack', href: '/evidence-pack', why: 'Export PD evidence.' }
      ],
      resources: [] as AcademicResource[],
      assessments
    };
  });

  const learningModes = DEFAULT_LEARNING_MODES;

  const practicalTasks: AcademicPracticalTask[] = [
    {
      id: `${id}-practical-output`,
      title: `${code} Career bridge practical output`,
      description: 'Create one privacy-safe artefact that connects this subject to DCS support work.',
      evidenceType: 'reflection',
      privacyReminder: PRIVACY_REMINDER
    }
  ];

  const finalChallenge: AcademicFinalChallenge = {
    title: `${code} integrated final challenge`,
    brief: `Demonstrate mastery of ${draft.title} with a privacy-safe evidence pack entry and reflection.`,
    evidence: 'One written reflection plus a link to the PD log or evidence pack export.'
  };

  return {
    id,
    code,
    title: draft.title,
    provider: draft.provider || 'La Trobe',
    track: draft.track || inferTrack(code),
    level: draft.level || (/^CSE[45]/i.test(code) ? 'masters' : 'undergraduate'),
    stream: draft.stream || inferStream(code),
    relevance: 'medium',
    sourceType: 'SLG',
    sourceFileName: draft.sourceFileName,
    sourceStatus: draft.sourceStatus || 'manual-check',
    localSources: draft.sourceFileName
      ? [
          {
            id: `${id}-published-source`,
            fileName: draft.sourceFileName,
            status: draft.sourceStatus || 'manual-check',
            note: publishedNote
          }
        ]
      : [],
    summary:
      draft.summary ||
      `Custom-published Academic PD subject for ${code}. Review SILOs and weekly modules before operational use.`,
    topics: silos.slice(0, 4).map((silo) => ({
      id: `${silo.id}-topic`,
      title: `SILO ${silo.number}`,
      dcsConnection: silo.plainEnglish
    })),
    silos,
    dcsBridges: [
      {
        id: `${id}-bridge-support`,
        dcsArea: 'DCS Level 1 Support',
        relevance: 'medium',
        explanation: 'Connect academic outcomes to triage, documentation, and escalation quality.',
        relatedDcsModuleIds: ['dcs-it-support-foundations', 'ticket-notes-escalation-quality'],
        practicalOutput: `Review ${code} SILOs against current DCS workflow boundaries.`
      }
    ],
    weeklyModules,
    learningModes,
    practicalTasks,
    resources: [
      {
        id: `${id}-admin-note`,
        title: 'Admin publish note',
        kind: 'official-docs',
        url: '/admin/slg-import',
        why: publishedNote
      }
    ],
    finalChallenge,
    recommendedNextAction: `Open /academic-pd/subjects/${code} and complete the first weekly assessment.`,
    implementationPriority: 99
  };
}

export function publishAcademicDraft(
  draft: AcademicDraftPackage,
  publishedAtIso = new Date().toISOString()
): PublishResult {
  const errors = validateAcademicDraftPackage(draft);
  if (errors.length) return { ok: false, errors };

  const subject = academicSubjectFromDraft(draft, { publishedAtIso });
  return { ok: true, subject, replaced: false };
}

export function publishAcademicDraftFromText(
  text: string,
  sourceFileName: string
): PublishResult {
  const slgDraft = parseSlgTextDraft(text, sourceFileName);
  const packageDraft = draftPackageFromSlgImport(slgDraft);
  return publishAcademicDraft(packageDraft);
}

export function publishAcademicDraftFromJson(json: string): PublishResult {
  const parsed = parseAcademicDraftJson(json);
  if (!parsed.ok) return { ok: false, errors: parsed.errors };
  return publishAcademicDraft(parsed.draft);
}

export function getPublishedAcademicBackupEntry(subject: AcademicSubject) {
  return {
    publishedAtIso: new Date().toISOString(),
    subjectCode: subject.code,
    subject
  };
}

export function listPublishableWarnings(draft: AcademicDraftPackage) {
  const warnings: string[] = [];
  if (draft.sourceStatus === 'placeholder') {
    warnings.push('Source status is placeholder — review SILOs and weekly content before relying on it.');
  }
  if (draft.weeklyModules.some((week) => !week.assessments?.length)) {
    warnings.push('Some weekly modules have no assessments.');
  }
  return warnings;
}
