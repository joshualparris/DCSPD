import { RubricGrade, GradingInput, RubricGradeLevel, CriterionResult } from '../types/grading';

const PRIVACY_SENSITIVE_KEYWORDS = [
  'password', 'credential', 'secret', 'ssn', 'tax id', 
  'medical', 'health', 'student name', 'parent name'
];

const TECHNICAL_KEYWORDS = {
  symptom: ['error', 'broken', 'failed', 'issue', 'not working', 'symptom'],
  scope: ['one user', 'one device', 'everyone', 'all', 'classroom', 'room', 'trolley'],
  evidence: ['logs', 'checked', 'hostname', 'ipconfig', 'ping', 'gpresult', 'systeminfo'],
  action: ['restarted', 'fixed', 'checked', 'replaced', 'reconnected', 'gpupdate'],
  escalation: ['escalate', 'level 2', 'paul', 'it manager', 'ticket'],
  professional: ['regards', 'thank', 'please', 'confirmed', 'verified']
};

export function gradeRubric(input: GradingInput): RubricGrade {
  const { text, rubric, keywordHints = [] } = input;
  const lowerText = text.toLowerCase();
  
  const results: CriterionResult[] = [];
  let totalScore = 0;
  let maxScore = 0;

  // Process Rubric
  const normalizedRubric = Array.isArray(rubric) 
    ? rubric.map((r, i) => typeof r === 'string' ? { id: `r-${i}`, label: r, description: r } : r)
    : [];

  normalizedRubric.forEach((criterion) => {
    const isMet = checkCriterion(lowerText, criterion.label, keywordHints);
    const points = isMet ? 1 : 0;
    
    results.push({
      criterionId: criterion.id,
      label: criterion.label,
      met: isMet,
      pointsAwarded: points,
      pointsPossible: 1,
      feedback: isMet ? 'Criterion addressed.' : `Missing address for: ${criterion.label}`
    });
    
    totalScore += points;
    maxScore += 1;
  });

  // Calculate stats
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  const level: RubricGradeLevel = 
    percentage >= 90 ? 'excellent' :
    percentage >= 75 ? 'strong' :
    percentage >= 60 ? 'competent' :
    percentage >= 40 ? 'developing' : 'needs-work';

  // Privacy Check
  const privacyFlags = PRIVACY_SENSITIVE_KEYWORDS.filter(word => lowerText.includes(word));
  
  // Escalation Feedback
  const escalationFeedback: string[] = [];
  if (!TECHNICAL_KEYWORDS.escalation.some(word => lowerText.includes(word))) {
    escalationFeedback.push('Consider explicitly mentioning escalation triggers if the issue persists.');
  }

  return {
    score: totalScore,
    maxScore,
    percentage,
    level,
    strengths: results.filter(r => r.met).map(r => r.label),
    missing: results.filter(r => !r.met).map(r => r.label),
    privacyFlags,
    escalationFeedback,
    criteriaResults: results
  };
}

function checkCriterion(text: string, label: string, hints: string[]): boolean {
  const words = [...hints, label.toLowerCase()];
  // Simple check: if any of the keyword hints or label words appear in the text
  return words.some(word => text.includes(word.toLowerCase()));
}
