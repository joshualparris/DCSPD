# DCSPrep Upskilling Roadmap

DCSPrep should not primarily be a CompTIA A+ study app.
It should be a DCS Level 1 → early Level 2 support simulator, using A+ concepts only where they directly help real DCS tickets.

The most relevant focus areas
Tier 1 — Build these first

These should be the app’s core modules:

Login / password / lockout / MFA / self-service recovery
Parent Portal registration, access keys, family-detail updates
Sentral first-line support
OurDCS / Schoolbox support
Permissions / shared drives / Teams / SharePoint / OneDrive
Printers, photocopiers, PaperCut / Follow-Me printing
Classroom AV / ViewBoards / Windows+P / HDMI audio / touch
Wi-Fi / BYOD / iPad / Jamf first-response
Website filtering and unblock request triage
New user onboarding and missing-access checks

That list is more DCS-relevant than broad generic topics like “motherboard form factors” or “cloud theory” unless those topics are attached to a real school support scenario.

Tier 2 — The learning engine

This is where your roadmap is especially strong. The app should be built around:

diagnostic question first
flashcards
short-answer recall
Feynman “explain this simply”
concept sorting
multi-step scenarios
Jira note writing
spaced repetition
error log
PD log
20-minute quiet-window sessions

This matches how you actually learn: active, concrete, scenario-based, and tied to real work.

Tier 3 — Technical foundations to keep

These still matter, but as supporting knowledge:

DNS / DHCP / gateway / IP basics
ports and protocols
VLANs and firewall rules
MDM vs Group Policy
M365 / Entra / Intune offboarding
SaaS / PaaS / IaaS / DaaS
printer symptom diagnosis
safe escalation and change boundaries

These should be taught through DCS scenarios, not abstract lessons.

Example:

Bad module:
“Learn all about VLANs.”

Good module:
“Guest Wi-Fi must reach the internet but not staff laptops, printers, or admin systems. Write the allow/block rules.”

Tier 4 — Support-quality outputs

This is a very good addition. DCSPrep should help you produce things like:

Parent Portal quick guide
password reset guide
printer symptom matrix
ViewBoard quick-fix flow
onboarding checklist
website unblock checklist
Sentral triage cheat sheet
OurDCS quick-reference guide
iPad/Jamf first-response checklist

That turns learning into visible value without overstepping Paul’s Level 1 boundary.

What I would slightly change

I’d reduce the emphasis on readiness graphs for now. Keep them, but don’t make them central yet. They are motivating, but they can become fake precision unless backed by real assessment data.

The app should first collect evidence through:

scenarios completed
weak areas repeated
Jira-note quality
flashcard retention
practical outputs created
module confidence ratings

Then the graphs become more accurate.

Best next build order

Give Codex this order:

Fix app stability first
Create question-first module engine
Add DCS ticket-theme modules
Add Scenario Lab
Add Jira note scoring
Add Error Log + Spaced Repetition
Add PD Log
Add Knowledge Base Lab
Add Evidence Pack
Only then improve readiness graphs
My honest verdict

Yes — this roadmap is highly relevant.

It is better than a generic A+ roadmap because it aims at the real job:

Can Josh respond to common DCS support issues calmly, safely, accurately, and with good handoff notes?

That should be the north star for DCSPrep.

## Goal

Align DCSPrep with:

- the actual DCS support-ticket mix described in `_Jira analysis.txt`
- Josh's current Level 1 to early Level 2 development path
- the app backlog already described inside the source document
- the reality that some DCS-specific source material lives in internal systems such as Teams, OurDCS, Sentral-related staff training, and school-owned SOPs
- a question-first learning model built around active recall, flashcards, practice testing, and short structured sessions

## Phase 0: Set the Learning Design Direction

### Make the app question-first

Rebuild module expectations so each topic starts with retrieval, not reading.

Target pattern for every module:

- short diagnostic questions first
- flashcards for core terms and sequences
- multiple-choice plus short-answer retrieval
- a Feynman-style "explain this simply" prompt
- one concept-sorting or categorization activity where useful
- one scenario or triage sequence
- one practical output or checklist
- short follow-up review via spaced repetition

### Add support for the study methods Josh actually wants

Build first-class support for:

- Active Recall / Retrieval Practice
- Feynman explain-back prompts
- Leitner-style flashcard review buckets
- practice testing
- concept sorting
- mnemonics / memory aids
- Cornell-style structured note prompts
- SQ3R-style reading companion flows for internal resources
- Pomodoro-sized focus sessions
- short micro-learning blocks that can fit quiet windows without losing structure

### Use internal resources safely

Treat internal DCS materials as source inputs for:

- question writing
- flashcard generation
- scenario design
- SOP and checklist practice

Do not turn the app into a storage place for private internal documentation. The app should abstract and teach the workflows, language, judgement, and triage patterns without copying sensitive details.

## Phase 1: Close the Highest-Relevance Content Gaps

### Add missing high-volume DCS service themes

Add new modules for:

- Parent Portal registration and access-key support
- Parent Portal family-detail updates
- Sentral support and common operational issues
- OurDCS / Schoolbox support and common staff workflow issues
- login, password reset, lockout, and self-service recovery
- permissions, drive access, software access, and approval workflows
- website filtering and unblock requests
- new user onboarding and day-one access readiness
- Teams, SharePoint, and OneDrive support basics
- iPad and Jamf-supported device workflow basics where relevant to Level 1 support

### Deepen existing operational modules

Expand existing modules to include:

- Printer Troubleshooting:
  - PaperCut / Follow-Me print release
  - photocopier error codes
  - queue vs release vs device fault discrimination
  - consumables and common hardware-fault patterns
  - service-call handoff details
- Classroom Display and ViewBoard Troubleshooting:
  - Windows+P
  - no audio
  - touch calibration
  - projector lamp / thermal issues
  - recurring room-fault documentation
- DNS, DHCP, Gateway, and IP Basics:
  - SSID selection
  - forget/rejoin
  - compare with another device
  - iPad/BYOD onboarding basics
- DCS IT Support Foundations:
  - multi-campus awareness across DCS, Preschool, and Wellington
  - when work belongs to ICT, admin, teaching staff, or leadership
  - where internal source material usually lives and how to use it safely for PD

## Phase 2: Make Assessment Match Real Work

### Expand the question bank

Target:

- 80+ strict questions
- plausible distractors only
- distribution weighted toward the real DCS service-desk themes
- enough coverage that every major DCS workflow area has flashcards, MCQ, short-answer, and scenario-linked items

Priority domains:

- password/login/reset/lockout
- permissions/access requests
- Parent Portal
- Sentral
- OurDCS / Schoolbox
- Teams / SharePoint / OneDrive
- printers/photocopiers
- classroom AV
- Wi-Fi/BYOD
- Jamf / iPad workflow awareness
- M365/Entra/Intune offboarding
- VLAN/firewall rules
- Group Policy vs MDM

### Raise Bloom's level

Increase the share of tasks that require:

- Analyse
- Evaluate
- Create

That means more:

- free response
- note writing
- allow/block rule writing
- triage sequencing
- escalation judgement
- self-rating against a rubric
- explain-it-simply responses
- concept sorting and workflow classification
- "what system owns this issue?" decision practice

## Phase 3: Finish Scenario Lab Properly

### Expand to 10 scenario chains

Add scenario chains for:

- HDMI works but no audio
- student laptop has 169.254
- printer jobs stuck in queue
- laser printer toner rubs off
- guest Wi-Fi segmentation rules
- phishing email reported by staff
- Parent Portal registration problem
- Sentral markbook / access-key issue
- password lockout / self-service reset failure
- new user onboarding with missing system access

### Add Jira-style note practice

Each completed scenario should require a note scored on:

- who / where / device
- exact symptom
- scope
- steps tried
- impact / urgency
- next action / escalation
- privacy-safe wording

## Phase 4: Add Support-Quality Outputs

### Build self-service and SOP outputs

Because the Jira analysis emphasizes deflection and self-service, DCSPrep should teach Josh to produce support assets, not just recall facts.

Add practical outputs such as:

- Parent Portal registration guide
- Parent Portal detail-update guide
- password-reset quick guide
- Wi-Fi onboarding checklist
- website-unblock request checklist
- onboarding request template
- Sentral quick-triage cheat sheet
- OurDCS / Schoolbox quick-reference guide
- Teams / SharePoint / OneDrive issue triage guide
- iPad / Jamf first-response checklist
- printer symptom-to-cause matrix
- classroom AV quick-fix flow

### Add article-authoring support

Potential future route:

- `/knowledge-base-lab`

Purpose:

- practice turning repeated ticket themes into OurDCS-ready help articles
- learn what makes a support article deflective, safe, and clear

## Phase 5: Complete the Remaining App Backlog

### Still missing from the source document backlog

- `/evidence-pack`
- `Start tiny`
- `20-minute focus block`
- `I'm overwhelmed` mode
- session-end reflection prompts
- ticket-theme-weighted dashboard recommendations
- more evidence-based readiness scoring

## Phase 6: Internal Resource Companion Layer

### Build a safe bridge from internal docs to PD practice

Add a simple workflow for turning internal DCS knowledge into app content:

1. identify a recurring support workflow from Teams, OurDCS, Sentral training, or local SOPs
2. extract the safe concepts, steps, and decisions
3. write flashcards
4. write MCQ and short-answer items
5. write one scenario
6. write one SOP or checklist output

This keeps the app current without requiring sensitive internal content to be copied into the repo.

## Implementation Notes

### Recommended file areas

- `src/data/modules.ts`
- `src/data/questions.ts`
- `src/data/scenarios.ts`
- `src/data/skillDomains.ts`
- `src/lib/readinessMath.ts`
- `app/scenarios/page.tsx`
- new routes for evidence pack or knowledge-base practice if implemented

### Build principle

For every new topic, ask:

- Is this common in DCS tickets?
- Is this safe for Level 1 PD?
- Does this teach triage, explanation, handoff, and documentation?
- Does this improve real support behaviour, not just quiz performance?
- Can this be taught primarily through questions, recall, flashcards, and short structured practice instead of long passive reading?
