# Academic PD Track Implementation Status

## Current Status: Phase 3.2 Implemented

The Academic PD module is now fully populated with weekly schedules for all priority subjects, robust certification mappings, canonical networking foundations, audit-driven Skill Coach upgrades, exportable certificates, local progress backup/restore, per-SILO learning support, admin import/governance tools, supervisor analytics, and integration/export scaffolds.

For the current source of truth, see `RBC/DCSPrep_Current_Roadmap.md`.

## Implemented In Phase 3.2

### Admin, Governance, Sync, Simulations, And Integration Scaffolds

- Added `/admin` as the central admin hub.
- Added `/admin/slg-import` for pasted SLG/PDF text parsing into subject code, SILOs, weekly topics, and draft Academic PD JSON.
- Added `src/lib/slgImport.ts` with tested SLG draft parsing and draft generation helpers.
- Added `/admin/content` for content governance:
  - review queue;
  - source-status flags;
  - last-reviewed and next-review dates;
  - stale/source-check action guidance;
  - browser-based subject draft export.
- Added `src/lib/contentGovernance.ts` with tested review status helpers.
- Added `/sync` and `/api/progress-sync` as a first server-side progress snapshot adapter.
- Added `/admin/integrations` for SCORM-style manifest, HRIS CSV template, and supervisor analytics CSV exports.
- Added `src/lib/integrationExports.ts` and `src/lib/supervisorAnalytics.ts`.
- Added `/supervisor` as a read-only, privacy-safe manager analytics dashboard.
- Added `/hardware` as a hardware catalogue with safe checks, common symptoms, escalation triggers, and privacy boundaries.
- Added `/simulations/classroom-desk` as a visual classroom desk/cable/display/Wi-Fi troubleshooting simulation.
- Added `/voice-to-ticket` for browser speech-to-ticket practice with typed fallback.
- Added `/kb-sync` for OurDCS-ready Markdown and HTML article export.
- Added `/mobile-qa` for PWA install/offline/mobile QA tracking.
- Added `/certifications/aplus-core-2` as a 74-lesson Professor Messer / CompTIA A+ 220-1202 Core 2 certification pathway.
- Added `src/data/aplusCore2.ts` with:
  - all four Core 2 domains;
  - 36 objectives;
  - 74 lessons;
  - direct Professor Messer video links;
  - official/read-more resources;
  - DCS IT application notes;
  - per-lesson assessment prompts and success criteria.
- Added Core 2 multiple-choice quick checks plus long-form AI grading and PD logging from the certification pathway.
- Added `certificationAssessmentAttempts` to local progress for reusable certification assessment history, including combined score, MCQ score, long-form AI score, and MCQ response breakdowns.
- Added Core 2 certification attempts to the Feedback Log and Evidence Pack evidence summaries.
- Added tests for SLG import, content governance, integration exports, supervisor analytics, hardware catalogue, and classroom simulation data.

## Implemented In Phase 3.1

### Certificates, Backup, And Academic PD Polish

- Added `/certificates` for printable/exportable badge certificates based on Skill Coach progress.
- Added certificate HTML generation with privacy-safe evidence summaries and print-to-PDF support.
- Added a Skill Coach link for exporting certificates.
- Added Settings progress backup/export/import using a versioned DCSPrep backup JSON format.
- Added progress backup parsing, validation, and normalization in `src/lib/progress.ts`.
- Added saved Academic PD final challenge checklist state per subject.
- Added per-SILO completion indicators on subject pages.
- Added subject-specific flashcards generated from SILO plain-English summaries, mastery criteria, and knowledge checks.
- Added a current roadmap document that separates completed work, open work, and intentionally skipped Level 3 roleplays.

## Implemented In Phase 2.9

### Audit-Driven DCSPrep / DCS PD Upgrade Slice

- Added `/skill-coach` as a new adaptive growth page responding to the audit and SWOT findings.
- Added `src/lib/skillCoach.ts` to generate:
  - mini Skill-IQ style readiness scores for A+ Core Support, Level 2 Support, and School IT Manager growth;
  - evidence confidence levels based on assessment, scenario, flashcard, output, roleplay, and Academic PD activity;
  - priority recommendations for diagnostics, weak-topic review, micro-learning, roleplay, hands-on labs, badges, and Academic PD grading;
  - a 20-minute micro-learning workout assembled from the highest-value next actions;
  - badge/certificate progress for learning paths, privacy-safe AI feedback, scenarios, communication roleplay, and PD evidence.
- Added a visible `Skill Coach` navigation item and dashboard quick action.
- Added hands-on lab recommendations linking to:
  - Network Map;
  - Roleplay Bot;
  - Scenario Lab;
  - Knowledge Base Lab;
  - Technical Playground.
- Recalibrated roleplay satisfaction scoring so neutral progress counts as partial success instead of zero, and recovery across the conversation earns credit.
- Updated the roleplay actor prompt with explicit sentiment calibration: angry for ignored/escalated concerns, neutral for respectful partial progress, and satisfied for empathy plus clear next step.
- Extended the Evidence Pack so Feedback Log activity is included as evidence:
  - module quiz and strict-quiz feedback;
  - Academic PD graded assessment feedback;
  - roleplay coaching summaries;
  - feedback evidence counters on the Evidence Pack page.
- Expanded the Roleplay Bot with 10 additional realistic K-12 IT support personas and scenarios:
  - frozen interactive whiteboard;
  - phishing credential compromise;
  - front-office copier failure;
  - web filter block;
  - maintenance portal password recovery;
  - student iPad boot loop;
  - VIP assembly AV failure;
  - missing OneDrive/cloud file;
  - admin-rights software update loop;
  - demountable classroom Wi-Fi blackspot.
- Roleplay scenarios now include persona archetype, pressure level, coaching focus, IT challenge notes, and an opening line from the staff member.
- Added a dedicated Level 2 roleplay section for delegated systems work:
  - comprehensive M365/AD staff offboarding;
  - Sentral Parent Portal rollout and access-key triage;
  - Jamf/Intune iPad provisioning;
  - Year 12 Google Workspace/AD account archiving;
  - PaperCut print quota allocation and reporting;
  - NAPLAN Locked Down Browser deployment;
  - asset audit and e-waste secure wipe;
  - Vivi firmware fleet update;
  - Bell/PA custom schedule management;
  - M365 Defender phishing breach investigation.
- Strengthened the PWA/offline foundation:
  - added a real app icon at `public/icons/icon.svg`;
  - updated the web app manifest with shortcuts for Skill Coach, Due Today, and Academic PD;
  - upgraded the service worker to cache core PD routes and use network-first navigation with cached fallback.
- Cleaned Next metadata configuration by moving viewport/theme settings to the `viewport` export.
- Added `src/tests/skillCoach.test.ts` to protect the new diagnostic, recommendation, lab, and badge logic.

## Implemented In Phase 2.8

### Full Weekly Schedule Mapping

- Populated 12-week learning schedules for all high-priority RBC subjects:
  - **CSE1IIT** (Inside IT): Hardware, OS, Networking, Web/HTML, Databases, and Service Management.
  - **CSE1ICB** (Cybersecurity): Threat landscape, Application/Network security, Risk, Crypto, IAM, and Incident Response.
  - **CSE3PE** (Professional Environment): Ethics, Privacy law, IP, Professional responsibility, Social impact, and Reflective practice.
  - **CSE1IS** (Information Systems): SDLC, Fact-finding, DFDs, ERDs, UI critique, and Change management.
  - **STA1DCT** (Data-Based Critical Thinking): Descriptive stats, Visualisation, Probability, Biases, Correlation, and Evidence reporting.
  - **CSE1OOF** (OOP Fundamentals): Java environment, Control structures, Objects/Classes, Encapsulation, Unix basics, and Testing.
- Each week includes:
  - Topic overview and delivery modes.
  - Specific DCS connections (e.g., Sentral, ViewBoards, Wi-Fi triage).
  - Integrated quick-checks and applied tasks (diagrams, reflections, snippets).
  - Mapped SILO IDs and success criteria.

### Canonical Networking Foundations

- Upgraded **CSE2CN** (Computer Networks) from a placeholder to a canonical subject.
- Populated a robust 12-week schedule based on CCNA/Network+ standards, covering OSI/TCP-IP layers, Switching, Routing, IP addressing/Subnetting, and Wireless.
- Integrated DCS-specific networking tasks such as Wi-Fi triage, VLAN boundary checks, and objective slowness reporting.

### Enhanced Certification Links

- Added detailed certification mappings to subjects:
  - **CompTIA A+** and **ITF+** linked to CSE1IIT.
  - **CompTIA Network+** and **Cisco CCNA** linked to CSE2CN.
  - **CompTIA Security+** and **ISC2 CC** linked to CSE1ICB.
  - **CompTIA Data+** and **Google Data Analytics** linked to STA1DCT.
  - **Python Institute PCEP/PCAP** linked to CSE1PE.
  - **Oracle Java SE Programmer** linked to CSE1OOF.
  - **Microsoft Azure AI Fundamentals (AI-900)** linked to CSE4002.
  - **AWS Certified Cloud Practitioner** linked to CSE5006/CSE5BDC.

## Implemented In Phase 2.7

### Weekly LMS Module Boxes

- Added a weekly module data model to `src/types/academic.ts`.
- Added week/topic blocks to subject pages, including:
  - topic overview;
  - delivery modes;
  - mapped SILO IDs;
  - DCS application notes;
  - internal DCSPrep links;
  - external learning resources;
  - integrated assessment items;
  - one-click PD logging for each weekly assessment.
- Added a fallback generator so every subject shows weekly learning blocks, even before every SLG schedule is manually extracted.

### CSE1PE SLG Schedule Mapping

- Mapped the 2025 CSE1PE SLG learning schedule into 12 weekly module boxes:
  1. Algorithms and Flowcharts
  2. Statements and Expressions
  3. Booleans and Conditional Execution
  4. Iteration
  5. Functions and Objects
  6. Strings and Files
  7. Data Structures
  8. Software Errors
  9. Using Modules
  10. Structuring and Documenting Code
  11. Algorithm Design Strategies
  12. Revision
- Added weekly coding exercises, applied tasks, quick checks, rubric checks, and final integrated assessment prompts.
- Added DCSPrep links to PD logging, evidence pack, knowledge-base work, and relevant DCS support modules.
- Added external learning resources for weekly Python topics, including official Python documentation, Python for Everybody, CS50 Python, PEP 8, and CSV module documentation.

### Test Coverage

- Extended `src/tests/academicSubjects.test.ts` so every subject must expose usable weekly modules and assessments.
- Added a specific test to confirm CSE1PE has all 12 mapped weeks and integrated assessments.

## Implemented In Phase 2.6

### Realtime AI Assessment Grading

- Added `src/components/academic/AcademicAssessmentGrader.tsx`.
- Every weekly assessment card now includes:
  - a typed answer/evidence box;
  - automatic LLM grading after enough text is entered;
  - correctness verdicts: correct, mostly correct, partly correct, or needs revision;
  - score out of 100;
  - strengths;
  - missing criteria;
  - risk/privacy notes;
  - a better-answer guide;
  - next practice advice;
  - PD logging that can include the AI score.
- The grader uses the existing privacy-sanitised `/api/ai/coach` route.
- The AI grading prompt now maps scores to clear assessment verdicts and asks the model to name missing success criteria directly.

## Implemented In Phase 2.7

### Assessment Feedback Database And Review Page

- Added `academicAssessmentAttempts` to the existing DCSPrep local progress store.
- Logged weekly Academic PD assessments now save:
  - subject, week, module, assessment, SILO, and DCS application metadata;
  - the typed answer/evidence description;
  - AI score and verdict;
  - strengths;
  - missing criteria;
  - privacy/risk notes;
  - better-answer guide;
  - next-practice recommendation;
  - related PD entry ID.
- Added `/academic-pd/feedback` as the Academic PD feedback review page.
- The feedback page shows:
  - average score;
  - number of logged assessments;
  - number below mastery;
  - most common missing criteria;
  - recurring risk notes;
  - weakest attempts;
  - subject-level averages;
  - skill-stream averages;
  - full feedback history.
- Added links from the Academic PD dashboard and subject pages to the feedback review page.

## Implemented In Phase 2.8

### Subject Completion Progress Bars

- Added reusable Academic PD progress helpers in `src/lib/academicProgress.ts`.
- Each subject now calculates completion from unique logged assessment IDs, so repeat attempts improve score history without double-counting content completion.
- The Academic PD dashboard now shows an individual progress bar on every subject card.
- Subject detail pages now show:
  - overall subject completion percentage;
  - completed assessments versus total assessments;
  - fully completed weekly modules versus total weekly modules;
  - average score;
  - per-week completion counts;
  - completed/not-logged status on each assessment card.
- Logging an assessment updates the visible progress immediately.

## Implemented In Phase 2

### Academic Data Model

- Expanded `src/types/academic.ts` with track, provider, level, stream, source status, local source evidence, topic maps, learning modes, practical tasks, resource links, and final challenges.
- Added mastery criteria to each SILO so the subject pages can show what "I understand this" should look like in practice.
- Expanded DCS bridge areas to include school platforms, AI/data science, cloud/devops, and professional practice.

### Subject Catalogue

- Expanded `src/data/academicSubjects.ts` from 6 starter subjects to 15 mapped subjects.
- Covered both RBC and SMITB tracks:
  - RBC: CSE1IIT, CSE1PE, CSE1OOF, CSE1IS, CSE1ICB, STA1DCT, CSE3PE, CSE2CN.
  - SMITB: CSE4002, CSE5006, CSE5ML, CSE5NLP, CSE5DL, CSE5CV, CSE5BDC.
- Added local source references for the available SLG and study plan files in the RBC folder.
- Marked subjects by source health:
  - `canonical` for directly mapped SLG sources.
  - `manual-check` for items that need naming or source verification.
  - `placeholder` where only study-plan level coverage exists.
- Added resources for each subject, including official documentation, courses, videos, YouTube channels, PDFs, tools, and reference material.

### Academic PD Dashboard

- Upgraded `app/academic-pd/page.tsx` with:
  - subject, SILO, task, resource, and bridge statistics;
  - recommended implementation order;
  - source health summary;
  - richer RBC and SMITB subject cards;
  - direct links into subject pages and the DCS bridge view.

### Subject Detail Pages

- Rebuilt `app/academic-pd/subjects/[subjectCode]/page.tsx` with:
  - local source coverage;
  - concept-to-DCS topic mapping;
  - diagnose, learn, retrieve, apply, prove study cycle;
  - expandable SILO cards;
  - mastery criteria, practice prompts, and knowledge checks;
  - DCS bridge cards with related DCSPrep module IDs;
  - practical tasks and privacy reminders;
  - external learning resources;
  - final challenge evidence prompt;
  - one-click PD logging for subject study and practical output work.

### DCS Bridge View

- Rebuilt `app/academic-pd/bridge/page.tsx` with:
  - filtering by track and relevance;
  - grouped capability areas;
  - high-level statistics;
  - related DCSPrep module chips;
  - practical outputs and final challenge links for each bridge item.

### PD Log Integration

- Added an Academic PD study template to `app/pd-log/page.tsx`.
- Updated `src/lib/pdSummary.ts` so practical output IDs contribute to the output count in generated PD summaries.

### Tests

- Added `src/tests/academicSubjects.test.ts` to protect catalogue depth and source coverage.
- The test checks subject coverage, RBC/SMITB track inclusion, SILO quality, learning modes, practical tasks, resources, final challenges, source paths, and bridge/source health statistics.

## Source Health Notes

- CSE2CN has been upgraded to a canonical networking foundations subject.
- CSE5BDC is marked manual-check because the local source naming should be verified against the official subject code/title.
- Duplicate source variants are retained where useful so the module can show the best current source while preserving source history.

## Recommended Phase 3+ Backlog

1. [x] Add per-SILO completion state and progress indicators.
2. [x] Add subject-specific flashcards generated from the SILO knowledge checks.
3. [x] Add a practical output submission checklist for each final challenge.
4. [ ] Add a curated "DCS IT weekly PD path" that mixes Academic PD, DCSPrep modules, scenarios, and evidence outputs.
5. [x] Add admin/edit tooling so new SLGs can be imported or reviewed without editing TypeScript manually.
6. [x] Add content governance metadata with last-reviewed dates and stale-content warnings.
7. [x] Add a PDF SLG parser/import draft tool for new SLGs. Current implementation supports pasted/copied PDF text; full binary PDF extraction remains tracked in `RBC/DCSPrep_Current_Roadmap.md`.

## Implementation Principle

This module should stay anchored to practical DCS IT work: no private operational details, no copying large copyrighted SLG sections, and no generic LMS bloat. The goal is a useful academic-to-work bridge that helps turn university study into better support, clearer documentation, safer systems thinking, and stronger professional judgement.
