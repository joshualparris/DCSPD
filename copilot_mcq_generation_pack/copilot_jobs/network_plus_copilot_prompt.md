# Copilot MCQ generation job — CompTIA Network+ N10-009

Use this file with `../topics/network_plus_topics.json` and `../schema/mcq_question.schema.json`.

## Goal

Generate **3 hard or expert MCQs per topic** for CompTIA Network+ N10-009.

## Rules

You are generating hard, varied, scenario-based multiple-choice questions for a local-first IT career learning app.

Quality rules:
- Make questions hard but fair.
- Prefer realistic L1/L2 IT support scenarios over definition recall.
- Include plausible distractors that represent common junior-technician mistakes.
- Avoid trick questions where wording is the only difficulty.
- Include privacy-safe synthetic scenarios only.
- Do not use real student, staff, parent, credential, ticket, network, or client details.
- Include a concise explanation for why the correct answer is best and why the strongest distractor is wrong.
- Vary question styles: single best answer, choose two, next best step, command output interpretation, symptom-to-layer, escalation evidence, and security judgement.
- Do not copy source wording directly. Use the topic list as scope only.
- Mark each question with certification, exam, domain/objective, topic, difficulty, tags, and correct answer key(s).
- Output valid JSONL matching schema/mcq_question.schema.json unless explicitly asked otherwise.


## Required output

Output JSONL. One JSON object per line. Every item must match `schema/mcq_question.schema.json`.

## Topic coverage

Use every topic in `../topics/network_plus_topics.json`.

Do not skip short topics. If a topic is broad, create a scenario that tests judgement, troubleshooting, or escalation boundaries.

## Example output shape

```json
{
  "id": "N10-009-EXAMPLE-001",
  "certification": "CompTIA Network+",
  "exam": "N10-009",
  "domain": "Example domain",
  "topic": "Example topic",
  "difficulty": "hard",
  "question_type": "single_best_answer",
  "question": "A synthetic scenario question goes here.",
  "options": [
    {"key": "A", "text": "Plausible but wrong"},
    {"key": "B", "text": "Correct answer"},
    {"key": "C", "text": "Common junior mistake"},
    {"key": "D", "text": "Unsafe or irrelevant action"}
  ],
  "correct_keys": ["B"],
  "explanation": "Explain the correct answer and why the strongest distractor is wrong.",
  "tags": ["example", "scenario"],
  "privacy_note": "Synthetic training scenario only. Do not use real student, staff, parent, credential, or network details."
}
```
