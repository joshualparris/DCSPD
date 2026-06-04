# ITPrep / SupportOps Career Lab — Copilot MCQ Generation Pack

Created: 2026-05-29

This zip is designed for Copilot or another coding assistant to generate/import a hard multiple-choice question bank for Josh's IT learning app.

## Why JSON/JSONL instead of only Markdown?

Markdown is fine for human prompts, but JSONL is much easier for an app or coding assistant to process safely:
- one question per line
- easy to validate
- easy to import
- easy to diff in Git
- less formatting ambiguity than Markdown tables

This pack still includes Markdown prompts for Copilot, but the actual data target is JSONL.

## Included

### `/topics`
Parsed topic coverage targets:
- A+ Core 1 220-1201: 63 topics
- A+ Core 2 220-1202: 76 topics
- Network+ N10-009: 87 topics
- Security+ SY0-701: 121 topics

Each certification has:
- `.json` topic file
- `.csv` topic file

### `/question_bank`
A starter bank of 74 hard, varied MCQs:
- JSONL
- JSON
- CSV
- per-cert JSON files

These are ready to inspect/import and can be used as style examples for Copilot.

### `/copilot_jobs`
Prompt/job files for Copilot:
- one generation job per certification
- one combined master prompt

### `/schema`
JSON schema for validating generated questions.

## Recommended workflow

1. Give Copilot `copilot_jobs/00_COMBINED_COPILOT_PROMPT.md`.
2. Ask Copilot to read `/topics` and `/schema`.
3. Ask it to generate JSONL files into `/generated`.
4. Validate generated JSONL against `schema/mcq_question.schema.json`.
5. Import the generated JSONL into the app.
6. Use the starter bank only as seed/style guidance, not the final full bank.

## Privacy rule

All scenarios must be synthetic. Do not include real student, staff, parent, credential, ticket, client, network, or incident details.
