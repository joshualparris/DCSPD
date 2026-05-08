import { academicSubjects } from '../data/academicSubjects';
import { modules } from '../data/modules';
import { weakTopicLabels } from '../data/skillDomains';
import { getAcademicSubjectProgress } from './academicProgress';
import { getModuleCompletion, getOverallProgress } from './moduleMath';
import { getRoleplayFeedbackStats, type UserProgress } from './progress';

export type SupervisorAnalytics = {
  overallProgress: number;
  completedModules: number;
  totalModules: number;
  totalPdMinutes: number;
  privacyCheckedEvidence: number;
  academicAverage: number | null;
  lowAcademicSubjects: {
    code: string;
    title: string;
    completionPercent: number;
    averageScore: number | null;
  }[];
  weakAreas: {
    label: string;
    averageScore: number;
    reviewCount: number;
  }[];
  roleplay: ReturnType<typeof getRoleplayFeedbackStats>;
  managerNotes: string[];
};

export function getSupervisorAnalytics(progress: UserProgress): SupervisorAnalytics {
  const moduleCompletion = modules.map((module) => getModuleCompletion(module.id, progress, module));
  const academicProgress = academicSubjects.map((subject) =>
    getAcademicSubjectProgress(subject, progress.academicAssessmentAttempts)
  );
  const academicScores = academicProgress
    .map((subjectProgress) => subjectProgress.averageScore)
    .filter((score): score is number => typeof score === 'number');
  const weakAreas = Object.values(progress.weakTopicReviews)
    .sort((left, right) => left.averageScore - right.averageScore)
    .slice(0, 5)
    .map((review) => ({
      label: weakTopicLabels[review.topic] || review.topic,
      averageScore: review.averageScore,
      reviewCount: review.reviewCount
    }));
  const roleplay = getRoleplayFeedbackStats(progress.roleplayFeedbackAttempts);
  const totalPdMinutes = progress.pdEntries.reduce((sum, entry) => sum + entry.minutes, 0);
  const privacyCheckedEvidence = progress.pdEntries.filter((entry) => entry.privacyChecked).length;
  const academicAverage = academicScores.length
    ? academicScores.reduce((sum, score) => sum + score, 0) / academicScores.length
    : null;
  const lowAcademicSubjects = academicSubjects
    .map((subject) => {
      const subjectProgress = getAcademicSubjectProgress(subject, progress.academicAssessmentAttempts);
      return {
        code: subject.code,
        title: subject.title,
        completionPercent: subjectProgress.completionPercent,
        averageScore: subjectProgress.averageScore
      };
    })
    .filter((subject) => subject.completionPercent < 50 || (subject.averageScore !== null && subject.averageScore < 75))
    .slice(0, 8);
  const managerNotes = [
    totalPdMinutes > 0
      ? `${totalPdMinutes} minutes of PD evidence recorded.`
      : 'No PD minutes have been logged yet.',
    privacyCheckedEvidence === progress.pdEntries.length
      ? 'All current PD entries are marked privacy checked.'
      : 'Some PD entries need a privacy check before manager review.',
    weakAreas.length
      ? `Current lowest weak area: ${weakAreas[0].label}.`
      : 'Run strict quizzes to generate weak-area analytics.',
    roleplay.totalSessions > 0
      ? `${roleplay.totalSessions} roleplay session(s) recorded with ${roleplay.averageSatisfaction}% average satisfaction.`
      : 'No roleplay coaching sessions recorded yet.'
  ];

  return {
    overallProgress: getOverallProgress(modules, progress),
    completedModules: moduleCompletion.filter((completion) => completion === 100).length,
    totalModules: modules.length,
    totalPdMinutes,
    privacyCheckedEvidence,
    academicAverage,
    lowAcademicSubjects,
    weakAreas,
    roleplay,
    managerNotes
  };
}

export function buildSupervisorCsv(progress: UserProgress) {
  const analytics = getSupervisorAnalytics(progress);
  const rows = [
    ['Metric', 'Value'],
    ['Overall progress percent', String(Math.round(analytics.overallProgress))],
    ['Completed modules', `${analytics.completedModules}/${analytics.totalModules}`],
    ['Total PD minutes', String(analytics.totalPdMinutes)],
    ['Privacy-checked evidence entries', String(analytics.privacyCheckedEvidence)],
    ['Academic average', analytics.academicAverage === null ? 'No academic scores yet' : String(Math.round(analytics.academicAverage))],
    ['Roleplay sessions', String(analytics.roleplay.totalSessions)],
    ['Roleplay satisfaction', `${analytics.roleplay.averageSatisfaction}%`],
    ['Lowest weak area', analytics.weakAreas[0]?.label || 'No weak areas yet']
  ];

  return rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
}
