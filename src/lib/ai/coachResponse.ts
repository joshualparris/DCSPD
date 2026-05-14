import { z } from 'zod';
import type { AiCoachFeedback, AiCoachInput } from './coachTypes';
import type { RubricGrade, RubricGradeLevel } from '../../types/grading';

export const CoachResponseSchema = z.object({
  score: z.number(),
  strengths: z.array(z.string()),
  missing: z.array(z.string()),
  riskNotes: z.array(z.string()),
  betterAnswer: z.string(),
  nextPractice: z.string(),
  rubricGrade: z
    .object({
      score: z.number(),
      maxScore: z.number(),
      percentage: z.number(),
      level: z.enum(['needs-work', 'developing', 'competent', 'strong', 'excellent']),
      strengths: z.array(z.string()),
      missing: z.array(z.string()),
      privacyFlags: z.array(z.string()),
      escalationFeedback: z.array(z.string()),
      improvedExample: z.string().optional(),
      criteriaResults: z.array(
        z.object({
          criterionId: z.string(),
          label: z.string(),
          met: z.boolean(),
          pointsAwarded: z.number(),
          pointsPossible: z.number(),
          feedback: z.string()
        })
      )
    })
    .optional()
});

type CoachResponseShape = z.infer<typeof CoachResponseSchema>;
type RecordValue = Record<string, unknown>;

const VALID_LEVELS: RubricGradeLevel[] = ['needs-work', 'developing', 'competent', 'strong', 'excellent'];

function asRecord(value: unknown): RecordValue {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as RecordValue;
  }
  return {};
}

function getAny(record: RecordValue, keys: string[]): unknown {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) {
      return record[key];
    }
  }
  return undefined;
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const match = value.match(/-?\d+(?:\.\d+)?/);
    if (match) {
      const parsed = Number(match[0]);
      return Number.isFinite(parsed) ? parsed : undefined;
    }
  }

  return undefined;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalisePercentage(value: number): number {
  if (value > 0 && value <= 1) {
    return clamp(value * 100, 0, 100);
  }
  return clamp(value, 0, 100);
}

function toCleanString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return undefined;
}

function stringToList(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  const lines = trimmed
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:[-*]|\u2022|\d+[.)])\s*/, '').trim())
    .filter(Boolean);

  return lines.length > 1 ? lines : [trimmed];
}

function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => {
        if (typeof item === 'string') {
          return stringToList(item);
        }
        const record = asRecord(item);
        return [
          toCleanString(record.label),
          toCleanString(record.feedback),
          toCleanString(record.text),
          toCleanString(item)
        ].filter(Boolean) as string[];
      })
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return stringToList(value);
  }

  return [];
}

function readString(record: RecordValue, keys: string[], fallback: string): string {
  const value = getAny(record, keys);
  return toCleanString(value) ?? fallback;
}

function readList(record: RecordValue, keys: string[]): string[] {
  return toStringList(getAny(record, keys));
}

function levelFromScore(score: number): RubricGradeLevel {
  if (score >= 95) return 'excellent';
  if (score >= 85) return 'strong';
  if (score >= 70) return 'competent';
  if (score >= 50) return 'developing';
  return 'needs-work';
}

function normaliseLevel(value: unknown, score: number): RubricGradeLevel {
  const raw = toCleanString(value)?.toLowerCase().replace(/[_\s]+/g, '-');
  if (!raw) {
    return levelFromScore(score);
  }

  if (VALID_LEVELS.includes(raw as RubricGradeLevel)) {
    return raw as RubricGradeLevel;
  }

  if (raw.includes('excellent') || raw.includes('exemplar')) return 'excellent';
  if (raw.includes('strong') || raw.includes('good') || raw.includes('high')) return 'strong';
  if (raw.includes('competent') || raw.includes('satisfactory') || raw.includes('pass')) return 'competent';
  if (raw.includes('develop') || raw.includes('partial')) return 'developing';
  if (raw.includes('needs') || raw.includes('work') || raw.includes('poor') || raw.includes('revise')) return 'needs-work';

  return levelFromScore(score);
}

function criterionLabel(rawCriterion: unknown, index: number): string {
  const fallback = `Criterion ${index + 1}`;
  const text = toCleanString(rawCriterion) ?? fallback;
  const cleaned = text.replace(/^\s*(?:[-*]|\u2022|\d+[.)])\s*/, '').trim();
  const label = cleaned.split(/[:.]/)[0]?.trim();
  return label ? label.slice(0, 90) : fallback;
}

function normaliseCriteria(rawValue: unknown, input: AiCoachInput | undefined, score: number): RubricGrade['criteriaResults'] {
  const rawCriteria = Array.isArray(rawValue)
    ? rawValue
    : rawValue && typeof rawValue === 'object'
    ? Object.values(rawValue as RecordValue)
    : [];

  if (rawCriteria.length) {
    return rawCriteria.map((rawCriterion, index) => {
      const record = asRecord(rawCriterion);
      const pointsPossible = Math.max(
        1,
        toNumber(getAny(record, ['pointsPossible', 'points_possible', 'maxPoints', 'max_points'])) ?? 1
      );
      const rawAwarded =
        toNumber(getAny(record, ['pointsAwarded', 'points_awarded', 'score', 'points'])) ??
        (record.met === true ? pointsPossible : record.met === false ? 0 : (score / 100) * pointsPossible);
      const pointsAwarded = clamp(rawAwarded, 0, pointsPossible);
      const met = typeof record.met === 'boolean' ? record.met : pointsAwarded / pointsPossible >= 0.7;
      const label =
        readString(record, ['label', 'criterion', 'name', 'title'], criterionLabel(input?.rubric?.[index], index)) ||
        `Criterion ${index + 1}`;

      return {
        criterionId: readString(record, ['criterionId', 'criterion_id', 'id'], `criterion-${index + 1}`),
        label,
        met,
        pointsAwarded,
        pointsPossible,
        feedback: readString(
          record,
          ['feedback', 'comment', 'notes', 'reason'],
          met
            ? `This criterion is addressed clearly enough: ${label}.`
            : `Revise this criterion: ${label}.`
        )
      };
    });
  }

  const rubric = input?.rubric?.length ? input.rubric : ['Core response quality'];
  return rubric.map((item, index) => {
    const label = criterionLabel(item, index);
    const met = score >= 70;
    return {
      criterionId: `criterion-${index + 1}`,
      label,
      met,
      pointsAwarded: score >= 85 ? 1 : score >= 50 ? 0.5 : 0,
      pointsPossible: 1,
      feedback: met
        ? `This criterion appears mostly covered: ${label}.`
        : `Add clearer evidence for this criterion: ${label}.`
    };
  });
}

function normaliseRubricGrade(
  rawValue: unknown,
  input: AiCoachInput | undefined,
  feedback: Omit<AiCoachFeedback, 'rubricGrade'>
): RubricGrade {
  const record = asRecord(rawValue);
  const rawMaxScore = toNumber(getAny(record, ['maxScore', 'max_score', 'pointsPossible', 'points_possible']));
  const maxScore = Math.max(1, rawMaxScore ?? 100);
  const rawScore = toNumber(getAny(record, ['score', 'pointsAwarded', 'points_awarded']));
  const score =
    rawScore !== undefined
      ? clamp(rawScore, 0, maxScore)
      : maxScore === 100
      ? feedback.score
      : clamp((feedback.score / 100) * maxScore, 0, maxScore);
  const rawPercentage = toNumber(getAny(record, ['percentage', 'percent']));
  const percentage = normalisePercentage(rawPercentage ?? (score / maxScore) * 100);
  const riskFlags = readList(record, ['privacyFlags', 'privacy_flags', 'privacyRisks', 'privacy_risks']);
  const escalationFeedback = readList(record, [
    'escalationFeedback',
    'escalation_feedback',
    'escalationNotes',
    'escalation_notes'
  ]);
  const improvedExample = readString(
    record,
    ['improvedExample', 'improved_example', 'betterAnswer', 'better_answer', 'sampleAnswer', 'sample_answer'],
    feedback.betterAnswer
  );

  return {
    score,
    maxScore,
    percentage,
    level: normaliseLevel(getAny(record, ['level', 'grade', 'rating']), percentage),
    strengths: readList(record, ['strengths', 'positives', 'whatWentWell', 'what_went_well']).concat(
      feedback.strengths
    ),
    missing: readList(record, ['missing', 'gaps', 'needsWork', 'needs_work', 'improvements']).concat(feedback.missing),
    privacyFlags: riskFlags.length ? riskFlags : feedback.riskNotes,
    escalationFeedback: escalationFeedback.length ? escalationFeedback : feedback.missing,
    improvedExample,
    criteriaResults: normaliseCriteria(
      getAny(record, ['criteriaResults', 'criteria_results', 'criteria', 'criterionResults', 'criterion_results']),
      input,
      percentage
    )
  };
}

export function normaliseCoachResponse(rawValue: unknown, input?: AiCoachInput): CoachResponseShape {
  const record = asRecord(rawValue);
  const rawScore = toNumber(getAny(record, ['score', 'percentage', 'percent', 'grade']));
  const scoreMissing = rawScore === undefined;
  const score = normalisePercentage(rawScore ?? 50);
  const strengths = readList(record, ['strengths', 'positives', 'whatWentWell', 'what_went_well', 'good']);
  const missing = readList(record, ['missing', 'gaps', 'needsWork', 'needs_work', 'areasForImprovement', 'improvements']);
  const rawRisks = readList(record, [
    'riskNotes',
    'risk_notes',
    'risks',
    'warnings',
    'privacyFlags',
    'privacy_flags',
    'riskFlags',
    'risk_flags'
  ]);
  const riskNotes = scoreMissing
    ? rawRisks.concat('The AI response omitted a numeric score, so the server used a neutral fallback score.')
    : rawRisks;

  const betterAnswer = readString(
    record,
    [
      'betterAnswer',
      'better_answer',
      'modelAnswer',
      'model_answer',
      'improvedAnswer',
      'improved_answer',
      'sampleAnswer',
      'sample_answer',
      'recommendedAnswer',
      'recommended_answer'
    ],
    input?.modelAnswer || 'Add a clear response that captures the issue, evidence, safe action, and escalation path.'
  );
  const nextPractice = readString(
    record,
    ['nextPractice', 'next_practice', 'nextSteps', 'next_steps', 'practice', 'next'],
    input?.weakTopic
      ? `Practise one more short response focused on ${input.weakTopic}.`
      : 'Try one more short response and include evidence, privacy boundaries, and escalation criteria.'
  );

  const feedback: Omit<AiCoachFeedback, 'rubricGrade'> = {
    score,
    strengths,
    missing,
    riskNotes,
    betterAnswer,
    nextPractice
  };
  const rawRubricGrade = getAny(record, ['rubricGrade', 'rubric_grade', 'rubricAnalysis', 'rubric_analysis']);
  const shouldIncludeRubric = Boolean(rawRubricGrade) || Boolean(input?.rubric?.length);
  const candidate: AiCoachFeedback = {
    ...feedback,
    ...(shouldIncludeRubric ? { rubricGrade: normaliseRubricGrade(rawRubricGrade, input, feedback) } : {})
  };

  return CoachResponseSchema.parse(candidate);
}
