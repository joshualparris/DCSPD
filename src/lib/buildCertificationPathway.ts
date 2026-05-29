import type {
  AplusCore2Assessment,
  AplusCore2Lesson,
  AplusCore2Objective,
  AplusCore2Section,
  AplusResource
} from '../data/aplusCore2';
import type { CertificationMetadata } from '../data/certificationExpansion';

export type CertificationPathwayConfig = {
  certificationId: string;
  certificationTitle: string;
  examCode: string;
  videoUrlSlug: string;
  courseIndexUrl: string;
  examObjectivesUrl: string;
  meta: CertificationMetadata;
  lessonTitlesByObjective?: Record<string, string[]>;
};

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function videoUrl(config: CertificationPathwayConfig, title: string) {
  return `${config.courseIndexUrl.replace(/\/$/, '')}/${slug(title)}-${config.videoUrlSlug}/`;
}

function multipleChoiceFor(
  config: CertificationPathwayConfig,
  sectionId: string,
  sectionTitle: string,
  objectiveId: string,
  objectiveTitle: string,
  title: string
) {
  const certificationLabel = `${config.certificationTitle} (${config.examCode})`;
  return [
    {
      id: `${slug(title)}-mcq-concept`,
      prompt: `For ${certificationLabel}, what is the best way to study ${title}?`,
      options: [
        { id: 'a', text: 'Memorise the term only, then skip application.' },
        {
          id: 'b',
          text: `Define the concept, connect it to ${objectiveId} ${objectiveTitle}, and practise support decisions aligned with ${sectionTitle}.`
        },
        { id: 'c', text: 'Copy private DCS operational details into your answer.' },
        { id: 'd', text: 'Skip it unless it names a school system directly.' }
      ],
      correctOptionId: 'b',
      explanation: `${title} should be learned through the ${sectionTitle} domain and translated into safe DCS support judgement.`
    },
    {
      id: `${slug(title)}-mcq-boundary`,
      prompt: `Which answer is acceptable evidence for this ${certificationLabel} ${title} assessment?`,
      options: [
        {
          id: 'a',
          text: 'A synthetic scenario with safe checks, escalation point, and a clear privacy boundary.'
        },
        {
          id: 'b',
          text: 'A copied real ticket with staff, student, or credential details.'
        },
        { id: 'c', text: 'A vague sentence with no DCS application.' },
        { id: 'd', text: 'A production change described step by step.' }
      ],
      correctOptionId: 'a',
      explanation: `Evidence for ${certificationLabel} must stay privacy-safe, synthetic, and relevant to ${title}.`
    },
    {
      id: `${slug(title)}-mcq-evidence`,
      prompt: `Before escalating a ${certificationLabel} ${title} issue, which evidence is most useful?`,
      options: [
        {
          id: 'a',
          text: 'Exact symptom, scope, system details, recent change, and safe checks already tried.'
        },
        {
          id: 'b',
          text: 'Only a desktop screenshot that may include private information.'
        },
        { id: 'c', text: 'A guess that hardware is broken without scope checks.' },
        { id: 'd', text: 'The user password for later investigation.' }
      ],
      correctOptionId: 'a',
      explanation: `Strong ${certificationLabel} notes separate symptom, scope, safe checks, and escalation without private data.`
    }
  ];
}

function assessmentFor(
  config: CertificationPathwayConfig,
  sectionTitle: string,
  objectiveId: string,
  objectiveTitle: string,
  title: string
): AplusCore2Assessment {
  const certificationLabel = `${config.certificationTitle} (${config.examCode})`;
  return {
    prompt: `Explain ${title} in plain English for ${certificationLabel}, then apply it to a fake DCS IT support scenario. Include what it means, what symptoms it affects, safe first checks, and when you would escalate.`,
    successCriteria: [
      'Explains the concept without jargon',
      'Connects to realistic DCS support patterns',
      'Names at least two safe first checks',
      'Includes a privacy or escalation boundary',
      'Uses only synthetic or anonymised examples'
    ],
    modelAnswerGuide: `${title} belongs to ${sectionTitle}, objective ${objectiveId} - ${objectiveTitle}. Define the concept for ${certificationLabel}, name support symptoms, record safe evidence, and stop before private data or owner-only changes.`,
    multipleChoice: multipleChoiceFor(config, objectiveId.split('.')[0], sectionTitle, objectiveId, objectiveTitle, title)
  };
}

function lessonFromTitle(
  config: CertificationPathwayConfig,
  section: { id: string; title: string; weight: string },
  objective: { id: string; title: string },
  title: string,
  index: number
): AplusCore2Lesson {
  const lessonSlug = slug(title);
  const id = `${config.certificationId}-${objective.id.replace('.', '-')}-${lessonSlug}-${index + 1}`;

  return {
    id,
    sectionId: section.id,
    sectionTitle: section.title,
    objectiveId: objective.id,
    objectiveTitle: objective.title,
    title,
    studyBrief: [
      `Study ${title} as part of ${config.certificationTitle} domain ${section.title}.`,
      'Focus on exam objective language, safe DCS support application, and escalation boundaries.',
      'After reading, explain it to a non-technical staff member and draft one clean note.'
    ].join(' '),
    dcsApplication: `Translate ${title} into safer DCS Level 1 triage, documentation, and escalation for ${config.examCode} topics.`,
    videoUrl: videoUrl(config, title),
    readMore: [
      {
        title: `Course index: ${title}`,
        url: videoUrl(config, title),
        kind: 'video',
        why: 'Open the linked Professor Messer or official course material for this topic.'
      },
      {
        title: `${config.certificationTitle} course index`,
        url: config.courseIndexUrl,
        kind: 'course-index',
        why: 'Return to the full certification video sequence.'
      },
      {
        title: `${config.examCode} exam objectives`,
        url: config.examObjectivesUrl,
        kind: 'exam-objectives',
        why: 'Verify scope against the official objectives.'
      }
    ],
    assessment: assessmentFor(config, section.title, objective.id, objective.title, title)
  };
}

function defaultLessonTitles(objectiveTitle: string) {
  return [
    `Introduction to ${objectiveTitle}`,
    `Applying ${objectiveTitle} in practice`,
    `Review and assessment: ${objectiveTitle}`
  ];
}

export function buildCertificationPathway(config: CertificationPathwayConfig) {
  const sections: AplusCore2Section[] = config.meta.objectives.map((objective, sectionIndex) => {
    const sectionId = String(sectionIndex + 1);
    const titles =
      config.lessonTitlesByObjective?.[objective.id] || defaultLessonTitles(objective.title);

    const lessons = titles.map((title, index) =>
      lessonFromTitle(
        config,
        { id: sectionId, title: objective.title, weight: objective.weight },
        objective,
        title,
        index
      )
    );

    return {
      id: sectionId,
      title: objective.title,
      weight: objective.weight,
      summary: objective.title,
      objectives: [
        {
          id: objective.id,
          title: objective.title,
          lessons
        } satisfies AplusCore2Objective
      ]
    };
  });

  const lessons = sections.flatMap((section) => section.objectives.flatMap((objective) => objective.lessons));

  const coreResources: AplusResource[] = [
    {
      title: `${config.meta.title} video course index`,
      url: config.courseIndexUrl,
      kind: 'course-index',
      why: 'Primary free video sequence for this certification.'
    },
    {
      title: `${config.examCode} exam objectives`,
      url: config.examObjectivesUrl,
      kind: 'exam-objectives',
      why: 'Official objective list for scope checks.'
    },
    {
      title: config.meta.provider,
      url: config.meta.resourceLink,
      kind: 'official-docs',
      why: 'Provider overview and exam information.'
    }
  ];

  const stats = {
    lessonCount: lessons.length,
    sectionCount: sections.length,
    objectiveCount: sections.length,
    totalRunTime: `~${config.meta.estimatedHours}h estimated`,
    examCode: config.examCode
  };

  return { sections, lessons, coreResources, stats };
}
