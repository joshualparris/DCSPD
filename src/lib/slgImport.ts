export type SlgSiloDraft = {
  id: string;
  number: number;
  text: string;
};

export type SlgWeeklyTopicDraft = {
  id: string;
  week: number;
  dateIso?: string;
  title: string;
  contactHours?: number;
};

export type SlgImportDraft = {
  sourceFileName: string;
  subjectCode: string;
  title: string;
  silos: SlgSiloDraft[];
  weeklyTopics: SlgWeeklyTopicDraft[];
  warnings: string[];
  confidence: 'low' | 'medium' | 'high';
};

function normaliseWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function parseDate(day: string, month: string, year: string) {
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function getSubjectCode(text: string, sourceFileName: string) {
  const match = `${sourceFileName}\n${text}`.match(/\b(CSE\d[A-Z]{2,4}|STA\d[A-Z]{2,4})\b/i);
  return match?.[1]?.toUpperCase() || 'UNKNOWN';
}

function getTitle(text: string, subjectCode: string, sourceFileName: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => normaliseWhitespace(line))
    .filter(Boolean);
  const codeLine = lines.find((line) => line.toUpperCase().includes(subjectCode));
  const subjectTitleLine = lines.find((line) => /subject title|title/i.test(line));

  if (subjectTitleLine) {
    return normaliseWhitespace(subjectTitleLine.replace(/subject title|title|:/gi, ''));
  }

  if (codeLine) {
    return normaliseWhitespace(codeLine.replace(subjectCode, '').replace(/[-:]/g, ' ')) || subjectCode;
  }

  return sourceFileName.replace(/\.[^.]+$/, '').replace(subjectCode, '').replace(/[-_]/g, ' ').trim() || subjectCode;
}

function parseSilos(text: string, subjectCode: string): SlgSiloDraft[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => normaliseWhitespace(line))
    .filter(Boolean);

  const silos: SlgSiloDraft[] = [];

  lines.forEach((line) => {
    const explicit = line.match(/(?:SILO|Subject Intended Learning Outcome)\s*([0-9]+)\s*[:.)-]?\s*(.+)/i);
    const numbered = line.match(/^([1-9])\s*[:.)-]\s*(.+(?:design|develop|analyse|apply|explain|evaluate|demonstrate|identify).+)/i);
    const match = explicit || numbered;

    if (!match) return;

    const number = Number(match[1]);
    const textValue = normaliseWhitespace(match[2]);

    if (!number || textValue.length < 16 || silos.some((silo) => silo.number === number)) {
      return;
    }

    silos.push({
      id: `${subjectCode.toLowerCase()}-silo${number}`,
      number,
      text: textValue
    });
  });

  return silos.slice(0, 8);
}

function parseWeeklyTopics(text: string, subjectCode: string): SlgWeeklyTopicDraft[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => normaliseWhitespace(line))
    .filter(Boolean);

  const topics: SlgWeeklyTopicDraft[] = [];

  lines.forEach((line) => {
    const match = line.match(
      /^([1-9]|1[0-5])\s+(\d{1,2})[/-](\d{1,2})[/-](\d{4})\s+(.+?)(?:\s+\((?:Lecture|Lab|Tutorial|Workshop|Coding|Practical|Seminar).*?\))?(?:\s+([0-9](?:\.[0-9])?))?$/i
    );

    if (!match) return;

    const week = Number(match[1]);
    const rawTitle = normaliseWhitespace(match[5].replace(/\s+\d+$/, ''));
    const title = rawTitle || `Week ${week} topic`;

    topics.push({
      id: `${subjectCode.toLowerCase()}-draft-week-${week}-${slug(title)}`,
      week,
      dateIso: parseDate(match[2], match[3], match[4]),
      title,
      contactHours: match[6] ? Number(match[6]) : undefined
    });
  });

  return topics.slice(0, 15);
}

export function parseSlgTextDraft(text: string, sourceFileName = 'pasted-slg-text.txt'): SlgImportDraft {
  const subjectCode = getSubjectCode(text, sourceFileName);
  const title = getTitle(text, subjectCode, sourceFileName);
  const silos = subjectCode === 'UNKNOWN' ? [] : parseSilos(text, subjectCode);
  const weeklyTopics = subjectCode === 'UNKNOWN' ? [] : parseWeeklyTopics(text, subjectCode);
  const warnings: string[] = [];

  if (subjectCode === 'UNKNOWN') {
    warnings.push('No CSE/STA subject code was found.');
  }

  if (silos.length === 0) {
    warnings.push('No SILOs were detected. Paste the Subject Intended Learning Outcomes section if the PDF text extraction missed it.');
  }

  if (weeklyTopics.length === 0) {
    warnings.push('No week-by-week schedule rows were detected.');
  }

  if (text.length < 500) {
    warnings.push('The pasted text is short. A full SLG usually gives better import results.');
  }

  const confidence =
    warnings.length === 0 && silos.length >= 3 && weeklyTopics.length >= 8
      ? 'high'
      : subjectCode !== 'UNKNOWN' && (silos.length > 0 || weeklyTopics.length > 0)
        ? 'medium'
        : 'low';

  return {
    sourceFileName,
    subjectCode,
    title,
    silos,
    weeklyTopics,
    warnings,
    confidence
  };
}

export function buildAcademicSubjectDraftJson(draft: SlgImportDraft) {
  return JSON.stringify(
    {
      subjectCode: draft.subjectCode,
      title: draft.title,
      sourceFileName: draft.sourceFileName,
      sourceStatus: draft.confidence === 'high' ? 'manual-check' : 'placeholder',
      silos: draft.silos.map((silo) => ({
        ...silo,
        plainEnglish: `Explain ${draft.subjectCode} SILO ${silo.number} in plain English and connect it to DCS IT work.`,
        masteryCriteria: ['Explains the outcome clearly', 'Applies it to a synthetic DCS support pattern'],
        practicePrompts: ['Use fake or anonymised examples only.'],
        quizItems: [`What would prove you understand SILO ${silo.number}?`]
      })),
      weeklyModules: draft.weeklyTopics.map((topic) => ({
        ...topic,
        title: `Week ${topic.week}: ${topic.title}`,
        deliveryModes: ['Lecture', 'Lab', 'Applied DCS transfer'],
        dcsConnections: ['Add a privacy-safe DCS support connection before publishing.'],
        assessments: [
          {
            title: `Quick check: ${topic.title}`,
            kind: 'quick-check',
            minutes: 10,
            evidenceType: 'reflection'
          }
        ]
      }))
    },
    null,
    2
  );
}
