# Copilot prompt — fill complete ITPrep hard MCQ bank

You are working in this repository for Josh's ITPrep / SupportOps Career Lab app.

## Task

Use the topic files in `/topics` and the schema in `/schema/mcq_question.schema.json` to generate a complete, hard, varied MCQ bank.

Certifications:
- CompTIA A+ Core 1 / 220-1201
- CompTIA A+ Core 2 / 220-1202
- CompTIA Network+ / N10-009
- CompTIA Security+ / SY0-701

## Preferred output

Create JSONL files, because they are easiest to process programmatically:
- `generated/a_plus_core_1_generated.jsonl`
- `generated/a_plus_core_2_generated.jsonl`
- `generated/network_plus_generated.jsonl`
- `generated/security_plus_generated.jsonl`

## Difficulty

Generate 3 questions per topic:
- 2 hard
- 1 expert

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


## Import note

There is already a starter bank in:
- `question_bank/starter_hard_mcq_bank.jsonl`
- `question_bank/starter_hard_mcq_bank.csv`

You can use it as a style guide, but generate new unique questions. Do not duplicate the starter bank.
