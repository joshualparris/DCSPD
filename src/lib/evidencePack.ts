import { modules } from '../data/modules';
import { scenarios } from '../data/scenarios';
import { weakTopicLabels } from '../data/skillDomains';
import { getModuleCompletion } from './moduleMath';
import { generatePdSummaryForRange } from './pdSummary';
import { getReadinessProfile } from './readinessMath';
import { calculateRoleplaySatisfactionScore, type UserProgress } from './progress';

export type EvidencePackOptions = {
  startDateIso: string;
  endDateIso: string;
  includeModules: boolean;
  includeScenarios: boolean;
  includePracticalOutputs: boolean;
  includeReflections: boolean;
  includeFeedbackEvidence: boolean;
  includeReadiness: boolean;
  managerSafe?: boolean;
};

function safeLine(text: string) {
  return text.replaceAll('\r\n', '\n').replaceAll('\n', ' ').trim();
}

function toDateOnly(iso: string | undefined) {
  return (iso || '').slice(0, 10);
}

function orderedRange(startDateIso: string, endDateIso: string) {
  return startDateIso <= endDateIso
    ? { start: startDateIso, end: endDateIso }
    : { start: endDateIso, end: startDateIso };
}

function inRange(iso: string | undefined, startDateIso: string, endDateIso: string) {
  const dateOnly = toDateOnly(iso);
  const { start, end } = orderedRange(startDateIso, endDateIso);
  return Boolean(dateOnly) && dateOnly >= start && dateOnly <= end;
}

function joinList(items: string[]) {
  return items.length ? items.map(safeLine).join('; ') : 'None recorded.';
}

export function generateEvidencePackMarkdown(progress: UserProgress, options: EvidencePackOptions): string {
  const summary = generatePdSummaryForRange(progress, options.startDateIso, options.endDateIso);
  const includeFeedbackEvidence = options.includeFeedbackEvidence ?? true;

  const completedScenarioRuns = progress.scenarioRuns.filter(
    (run) => run.completed && inRange(run.completedAtIso || run.startedAtIso, options.startDateIso, options.endDateIso)
  );
  const scenarioTitles = completedScenarioRuns
    .map((run) => scenarios.find((s) => s.id === run.scenarioId))
    .filter((s): s is (typeof scenarios)[number] => Boolean(s))
    .map((s) => s.title);

  const modulesWithActivity = modules
    .map((module) => {
      const moduleProgress = progress.modules[module.id];
      if (!moduleProgress) return null;

      const sectionsRead = Object.values(moduleProgress.sectionsRead || {}).filter(Boolean).length;
      const flashcardsReviewed = Object.values(moduleProgress.flashcards || {}).filter((card) => card.reviewCount > 0).length;
      const quizAttempts = moduleProgress.quizAttempts || [];
      const practicalCompleted = Object.values(moduleProgress.practicalOutputs || {}).filter(Boolean).length;
      const hasActivity = sectionsRead > 0 || flashcardsReviewed > 0 || quizAttempts.length > 0 || practicalCompleted > 0;

      if (!hasActivity) return null;

      return {
        module,
        completion: Math.round(getModuleCompletion(module.id, progress, module)),
        sectionsRead,
        sectionTotal: module.sections.length,
        flashcardsReviewed,
        flashcardTotal: module.flashcards.length,
        quizAttempts: quizAttempts.length,
        latestQuizScore: quizAttempts.length ? Math.round(quizAttempts[quizAttempts.length - 1].score) : null,
        practicalCompleted,
        practicalTotal: module.practicalOutputs.length
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((left, right) => right.completion - left.completion);

  const practicalOutputs = modules.flatMap((module) =>
    Object.entries(progress.modules[module.id]?.practicalOutputs || {})
      .filter(([, complete]) => complete)
      .map(([outputId]) => ({
        moduleTitle: module.title,
        outputTitle: module.practicalOutputs.find((output) => output.id === outputId)?.title || outputId
      }))
  );

  const standardFeedback = progress.assessmentAttempts
    .filter((attempt) => inRange(attempt.timestampIso, options.startDateIso, options.endDateIso))
    .slice(0, 20);
  const academicFeedback = progress.academicAssessmentAttempts
    .filter((attempt) => inRange(attempt.createdAtIso, options.startDateIso, options.endDateIso))
    .slice(0, 20);
  const certificationFeedback = progress.certificationAssessmentAttempts
    .filter((attempt) => inRange(attempt.createdAtIso, options.startDateIso, options.endDateIso))
    .slice(0, 20);
  const roleplayFeedback = progress.roleplayFeedbackAttempts
    .filter((attempt) => inRange(attempt.createdAtIso, options.startDateIso, options.endDateIso))
    .slice(0, 12);
  const feedbackEvidenceCount =
    standardFeedback.length + academicFeedback.length + certificationFeedback.length + roleplayFeedback.length;

  const readiness = options.includeReadiness
    ? [
        ...getReadinessProfile('aPlus', progress),
        ...getReadinessProfile('level2', progress),
        ...getReadinessProfile('schoolItManager', progress)
      ]
    : [];

  const reflections = options.includeReflections
    ? progress.pdEntries
        .filter(
          (entry) =>
            entry.type === 'reflection' &&
            entry.privacyChecked &&
            inRange(entry.createdAtIso, options.startDateIso, options.endDateIso)
        )
        .slice(0, 12)
        .map((entry) => `- ${entry.createdAtIso.slice(0, 10)}: ${safeLine(entry.title)} - ${safeLine(entry.evidenceSummary)}`)
    : [];

  return [
    `# DCSPrep Professional Development ${options.managerSafe ? 'Executive Summary' : 'Evidence Pack'}`,
    '',
    `Period: ${summary.startDateIso} to ${summary.endDateIso}`,
    '',
    ...(options.managerSafe
      ? [
          '## Executive Overview',
          `During this period, technical development focused on **${summary.currentWeakAreas.slice(0, 3).join(', ') || 'foundational IT support'}**.`,
          `Total professional development time recorded: **${summary.totalMinutes} minutes**.`,
          '',
          '### Core Competencies Demonstrated',
          `- **Troubleshooting**: Completed ${completedScenarioRuns.length} multi-step technical simulations.`,
          `- **Knowledge Base**: Active engagement with ${modulesWithActivity.length || summary.moduleCount} specialized school IT modules.`,
          `- **Documentation**: Generated ${practicalOutputs.length} practical support outputs and evidence-rich ticket notes.`,
          `- **Readiness**: Current proficiency tracking shows strongest alignment in **${readiness.sort((a, b) => b.score - a.score)[0]?.label || 'core support'}** domains.`,
          ''
        ]
      : [
          '## Privacy reminder',
          'Do not include live ticket details, student names, parent names, staff names, credentials, IP addresses, internal URLs, screenshots, device serials, or confidential DCS procedures.',
          '',
          '## Summary',
          `- Total PD time: ${summary.totalMinutes} minutes`,
          `- PD entries logged: ${summary.entryCount}`,
          `- Modules touched: ${modulesWithActivity.length || summary.moduleCount}`,
          `- Scenarios completed: ${completedScenarioRuns.length}`,
          `- Practical outputs completed: ${practicalOutputs.length}`,
          `- Feedback evidence items: ${includeFeedbackEvidence ? feedbackEvidenceCount : 0}`,
          `- Module quiz feedback items: ${includeFeedbackEvidence ? standardFeedback.length : 0}`,
          `- Academic PD graded assessments: ${includeFeedbackEvidence ? academicFeedback.length : 0}`,
          `- Certification graded assessments: ${includeFeedbackEvidence ? certificationFeedback.length : 0}`,
          `- Roleplay sessions reviewed: ${includeFeedbackEvidence ? roleplayFeedback.length : 0}`,
          `- Weak areas improved: ${summary.weakAreasImproved.join(', ') || 'None recorded yet'}`,
          `- Current focus areas: ${summary.currentWeakAreas.join(', ') || 'Not enough evidence yet'}`,
          ''
        ]),
    ...(options.includeModules
      ? [
          '## Modules studied',
          modulesWithActivity.length
            ? modulesWithActivity
                .map((item) =>
                  `- ${item.module.title}: ${item.completion}% complete; sections ${item.sectionsRead}/${item.sectionTotal}; flashcards ${item.flashcardsReviewed}/${item.flashcardTotal}; quizzes ${item.quizAttempts}${item.latestQuizScore === null ? '' : ` (latest ${item.latestQuizScore}%)`}; outputs ${item.practicalCompleted}/${item.practicalTotal}`
                )
                .join('\n')
            : summary.modulesTouched.length
              ? summary.modulesTouched.map((module) => `- ${module.title}`).join('\n')
              : '- None recorded in this period.',
          ''
        ]
      : []),
    ...(options.includeScenarios
      ? [
          '## Scenario practice',
          scenarioTitles.length ? scenarioTitles.map((title) => `- ${title}`).join('\n') : '- None recorded in this period.',
          ''
        ]
      : []),
    ...(options.includePracticalOutputs
      ? [
          '## Practical outputs',
          practicalOutputs.length
            ? practicalOutputs.map((item) => `- ${item.moduleTitle}: ${item.outputTitle}`).join('\n')
            : '- None recorded in this period.',
          ''
        ]
      : []),
    ...(includeFeedbackEvidence
      ? [
          '## Feedback evidence from completed work',
          '',
          '### Module quiz and strict-quiz feedback',
          standardFeedback.length
            ? standardFeedback
                .map((attempt) => {
                  const score = Math.round(attempt.scoreBreakdown.total * 100);
                  const weakTopic = weakTopicLabels[attempt.weakTopic] ?? attempt.weakTopic;
                  return [
                    `- ${attempt.timestampIso.slice(0, 10)}: ${safeLine(attempt.domain)} - ${score}%`,
                    `  - Topic: ${weakTopic}`,
                    `  - Prompt: ${safeLine(attempt.prompt)}`,
                    `  - Feedback: ${safeLine(attempt.feedback.correctness)}`,
                    `  - Next review: ${attempt.nextReviewDateIso}`
                  ].join('\n');
                })
                .join('\n')
            : '- None recorded in this period.',
          '',
          '### Academic PD assessment feedback',
          academicFeedback.length
            ? academicFeedback
                .map((attempt) =>
                  [
                    `- ${attempt.createdAtIso.slice(0, 10)}: ${attempt.subjectCode} Week ${attempt.week} - ${safeLine(attempt.assessmentTitle)} - ${Math.round(attempt.score)}% (${attempt.verdict})`,
                    `  - Strengths: ${joinList(attempt.strengths.slice(0, 3))}`,
                    `  - Gaps: ${joinList(attempt.missing.slice(0, 3))}`,
                    `  - Risk notes: ${joinList(attempt.riskNotes.slice(0, 2))}`,
                    `  - Next practice: ${safeLine(attempt.nextPractice || 'None recorded.')}`
                  ].join('\n')
                )
                .join('\n')
            : '- None recorded in this period.',
          '',
          '### Certification assessment feedback',
          certificationFeedback.length
            ? certificationFeedback
                .map((attempt) =>
                  [
                    `- ${attempt.createdAtIso.slice(0, 10)}: ${safeLine(attempt.certificationTitle)} Objective ${attempt.objectiveId} - ${safeLine(attempt.lessonTitle)} - ${Math.round(attempt.score)}%`,
                    `  - MCQ score: ${typeof attempt.multipleChoiceScore === 'number' ? `${Math.round(attempt.multipleChoiceScore)}%` : 'Not recorded.'}`,
                    `  - Long-form AI score: ${typeof attempt.longFormScore === 'number' ? `${Math.round(attempt.longFormScore)}%` : 'Not recorded.'}`,
                    `  - Strengths: ${joinList(attempt.strengths.slice(0, 3))}`,
                    `  - Gaps: ${joinList(attempt.missing.slice(0, 3))}`,
                    `  - Risk notes: ${joinList(attempt.riskNotes.slice(0, 2))}`,
                    `  - Next practice: ${safeLine(attempt.nextPractice || 'None recorded.')}`
                  ].join('\n')
                )
                .join('\n')
            : '- None recorded in this period.',
          '',
          '### Roleplay coaching evidence',
          roleplayFeedback.length
            ? roleplayFeedback
                .map((attempt) =>
                  [
                    `- ${attempt.createdAtIso.slice(0, 10)}: ${safeLine(attempt.persona)} - ${calculateRoleplaySatisfactionScore(attempt.sentimentTrajectory)}% satisfaction`,
                    `  - Exchanges: ${attempt.exchangeCount}`,
                    `  - Topics: ${attempt.keyTopics.join(', ') || 'None tagged.'}`,
                    `  - Coach notes summary: ${safeLine(attempt.coachNotesSummary || 'No specific coaching notes captured.')}`
                  ].join('\n')
                )
                .join('\n')
            : '- None recorded in this period.',
          ''
        ]
      : []),
    ...(options.includeReadiness
      ? [
          '## Readiness snapshot (indicative)',
          readiness.length
            ? readiness.map((profile) => `- ${profile.label}: ${Math.round(profile.score)}% (${profile.note})`).join('\n')
            : '- No readiness data available.',
          ''
        ]
      : []),
    ...(options.includeReflections
      ? [
          '## Reflections (privacy-checked)',
          reflections.length ? reflections.join('\n') : '- None included.',
          ''
        ]
      : []),
    '## Certificate / links (optional placeholders)',
    '- Certificate: [add link]',
    '- Course completion: [add link]',
    '- Portfolio item: [add link]',
    ''
  ].join('\n');
}
