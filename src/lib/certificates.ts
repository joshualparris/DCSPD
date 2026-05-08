import type { SkillCoachBadge } from './skillCoach';
import type { UserProgress } from './progress';

export type CertificateRecord = {
  id: string;
  title: string;
  certificateLabel: string;
  status: SkillCoachBadge['status'];
  progressPercent: number;
  evidenceLabel: string;
  issuedAtIso: string | null;
  evidenceSummary: string[];
};

function todayIso() {
  return new Date().toISOString();
}

export function buildCertificateRecords(badges: SkillCoachBadge[], progress: UserProgress, issuedAtIso = todayIso()) {
  return badges.map<CertificateRecord>((badge) => ({
    id: badge.id,
    title: badge.title,
    certificateLabel: badge.certificateLabel,
    status: badge.status,
    progressPercent: badge.progressPercent,
    evidenceLabel: badge.evidenceLabel,
    issuedAtIso: badge.status === 'earned' ? issuedAtIso : null,
    evidenceSummary: [
      badge.evidenceLabel,
      `${progress.assessmentAttempts.length} module or strict-quiz feedback item(s)`,
      `${progress.academicAssessmentAttempts.length} Academic PD graded assessment(s)`,
      `${progress.scenarioRuns.filter((run) => run.completed).length} completed scenario run(s)`,
      `${progress.roleplayFeedbackAttempts.length} roleplay coaching session(s)`,
      `${progress.pdEntries.filter((entry) => entry.privacyChecked).length} privacy-checked PD evidence entries`
    ]
  }));
}

export function buildCertificateHtml(record: CertificateRecord) {
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8" />',
    `<title>${record.certificateLabel}</title>`,
    '<style>',
    'body{font-family:Arial,sans-serif;background:#f8fafc;color:#0f172a;margin:0;padding:48px;}',
    '.certificate{border:6px double #0f172a;background:#fff;min-height:640px;padding:56px;text-align:center;}',
    '.eyebrow{letter-spacing:.22em;text-transform:uppercase;color:#64748b;font-size:12px;font-weight:700;}',
    'h1{font-size:42px;margin:28px 0 8px;}',
    'h2{font-size:30px;margin:0;color:#1d4ed8;}',
    '.status{margin:28px auto;padding:10px 18px;border-radius:999px;background:#ecfdf5;color:#047857;display:inline-block;font-weight:700;}',
    '.evidence{margin:36px auto 0;max-width:760px;text-align:left;line-height:1.7;}',
    '.footer{margin-top:52px;color:#64748b;font-size:13px;}',
    '</style>',
    '</head>',
    '<body>',
    '<main class="certificate">',
    '<div class="eyebrow">DCSPrep Professional Development Evidence</div>',
    `<h1>${record.title}</h1>`,
    `<h2>${record.certificateLabel}</h2>`,
    `<div class="status">${record.status === 'earned' ? 'Completed' : `${Math.round(record.progressPercent)}% complete`}</div>`,
    '<section class="evidence">',
    '<strong>Evidence summary</strong>',
    '<ul>',
    ...record.evidenceSummary.map((item) => `<li>${item}</li>`),
    '</ul>',
    '</section>',
    `<div class="footer">Issued: ${record.issuedAtIso ? record.issuedAtIso.slice(0, 10) : 'Not issued yet'} | Privacy-safe evidence only. No live DCS incident data included.</div>`,
    '</main>',
    '</body>',
    '</html>'
  ].join('');
}
