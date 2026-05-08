export const MODULE_GENERATION_PROMPT = `You are an expert educational content creator for IT Professionals. Your task is to generate a new training module for "DCSPrep".

The output MUST be a single JSON object.

### JSON Structure:
{
  "id": "unique-id",
  "title": "Module Title",
  "description": "Short description",
  "domain": "Foundations | Networking | Endpoint Support | Identity and Access | Cloud and Platforms | Operations",
  "level": "A+ | L1 | L2 | IT Manager | DCS Context",
  "estimatedMinutes": 20,
  "tags": ["tag1"],
  "learningObjectives": ["Objective 1"],
  "dcsRelevance": ["Relevance 1"],
  "sections": [{ "id": "s1", "title": "Title", "bodyMarkdown": "Content" }],
  "flashcards": [{ "id": "f1", "front": "Q", "back": "A" }],
  "quiz": [
    {
      "type": "mcq",
      "id": "q1",
      "prompt": "Q?",
      "options": [{ "id": "a", "label": "A" }],
      "correctOptionId": "a",
      "explanation": "Why",
      "difficulty": "foundation",
      "domain": "Topic",
      "dcsContext": "DCS info",
      "modelAnswer": "Full answer",
      "commonMistakes": ["Mistake"],
      "reviewSchedule": "Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.",
      "recommendedModuleId": "this-id",
      "weakTopic": "ticket-quality"
    }
  ],
  "modulePattern": {
    "diagnosticQuestions": [{ "id": "d1", "prompt": "Q", "expectedFocus": "F" }],
    "explainBackPrompt": { "id": "eb1", "title": "Explain", "prompt": "P", "supportText": "S" },
    "cornellPrompt": { "id": "c1", "title": "Cornell", "prompt": "P" },
    "sq3rPrompt": { "id": "s1", "title": "SQ3R", "prompt": "P" }
  },
  "scenarioPrompts": [{ "id": "sp1", "title": "Title", "prompt": "P" }],
  "practicalOutputs": [{ "id": "po1", "title": "Title", "description": "D" }]
}

### CRITICAL RULES:
1. **NO TRAILING COMMAS**: Ensure the JSON is valid.
2. **RUBRIC FORMAT**: If using "short-answer" quiz type, the "rubric" field MUST be an array of strings: \`"rubric": ["Criterion 1", "Criterion 2"]\`.
3. **MANDATORY FIELDS**: You MUST include "modulePattern", "scenarioPrompts", and "practicalOutputs" even if they have only one simple item.
4. **COMPLETE JSON**: Ensure the JSON object is closed with \`}\`.

Generate a module about: [TOPIC]`;

export const ROLEPLAY_GENERATION_PROMPT = `Generate a "RoleplayScenario" JSON object for DCSPrep:
{
  "id": "unique-id",
  "persona": "Name",
  "archetype": "Archetype",
  "issueTitle": "Issue",
  "scenario": "Background",
  "itChallenge": "Goals",
  "initialPrompt": "First words",
  "pressure": "Low | Medium | High | Critical",
  "focus": ["skill"]
}
Generate about: [TOPIC]`;

export const SCENARIO_LAB_GENERATION_PROMPT = `Generate a "Scenario" JSON object for DCSPrep:
{
  "id": "unique-id",
  "title": "Title",
  "summary": "Summary",
  "focus": ["Topic"],
  "estimatedMinutes": 15,
  "initialReport": "Report",
  "contextBullets": ["Fact"],
  "steps": [
    {
      "id": "s1", "title": "Title", "prompt": "P",
      "choices": [{ "id": "c1", "label": "L", "outcome": "O", "riskNote": "R", "correct": true }],
      "recommendedChoiceId": "c1"
    }
  ],
  "idealTroubleshootingPath": ["c1"],
  "escalationPoint": "Point",
  "ticketNoteExample": "Note",
  "jiraNotePrompt": "Prompt",
  "noteRubric": [{ "id": "r1", "label": "L", "description": "D" }],
  "riskNote": "Risk",
  "recommendedModuleIds": []
}
Generate about: [TOPIC]`;

export const ACADEMIC_GENERATION_PROMPT = `Generate an "AcademicSubject" JSON object for DCSPrep:
{
  "id": "id",
  "code": "CODE",
  "title": "Title",
  "provider": "La Trobe | RMIT | Other",
  "track": "RBC | SMITB",
  "level": "foundation | undergraduate | masters",
  "stream": "networking",
  "sourceType": "Manual",
  "sourceStatus": "canonical",
  "summary": "Summary",
  "topics": [{ "id": "t1", "title": "T", "dcsConnection": "C" }],
  "silos": [{ "id": "s1", "number": 1, "text": "T", "plainEnglish": "P", "masteryCriteria": ["C"], "practicePrompts": ["P"], "quizItems": ["Q"] }],
  "dcsBridges": [{ "id": "b1", "title": "B", "summary": "S", "dcsArea": "A", "relevance": "high", "explanation": "E", "relatedDcsModuleIds": [], "practicalOutput": "O" }],
  "learningModes": [{ "id": "m1", "title": "M", "description": "D" }],
  "practicalTasks": [{ "id": "p1", "title": "T", "description": "D", "evidenceType": "reflection", "privacyReminder": "R" }],
  "resources": [{ "id": "r1", "title": "T", "kind": "official-docs", "url": "U", "description": "D" }],
  "finalChallenge": { "id": "fc1", "title": "T", "prompt": "P", "successCriteria": ["S"], "brief": "B", "evidence": "E" }
}
Generate about: [TOPIC]`;

export const PLAYBOOK_GENERATION_PROMPT = `Generate a "TroubleshootingPlaybook" JSON object for DCSPrep:
{
  "id": "unique-id",
  "title": "Title",
  "description": "Description",
  "domain": "Domain",
  "level": "L1 | L2 | A+ | DCS Context",
  "tags": ["tag"],
  "symptoms": ["Symptom 1"],
  "firstQuestions": ["Question 1"],
  "safeChecks": [
    {
      "id": "sc1",
      "title": "Title",
      "steps": ["Step 1"],
      "tools": ["Tool"],
      "expectedEvidence": ["Evidence"]
    }
  ],
  "escalationTriggers": ["Trigger 1"],
  "doNotDo": ["Don't do X"],
  "ticketTemplate": "Draft note...",
  "relatedModuleIds": []
}
Generate about: [TOPIC]`;

export const ASSET_PROFILE_GENERATION_PROMPT = `Generate a "DcsAssetProfile" JSON object for DCSPrep:
{
  "id": "unique-id",
  "name": "Asset Name",
  "category": "device | classroom-tech | printer | network | identity | platform | application | workflow",
  "description": "Description",
  "commonSymptoms": ["Symptom 1"],
  "safeChecks": ["Check 1"],
  "usefulTools": ["Tool 1"],
  "escalationOwner": "Who to call",
  "level1Boundaries": ["Limit 1"],
  "privacyNotes": ["Privacy 1"],
  "relatedPlaybookIds": []
}
Generate about: [TOPIC]`;
