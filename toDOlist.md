# DCSPrep Roadmap Completion toDOlist

Yes — your current TODO is good, but **not optimised for your actual lane**.

The biggest issue: it treats **Parent Portal and Sentral as Tier 1 Josh-owned learning areas**, but from what you’re saying, those are more **awareness + escalation boundary** topics, especially if Ruth Cargill mostly owns Sentral/Parent Portal. So I’d demote those. Keep enough knowledge to triage and hand off well, but don’t build the app around them.

Your app should prioritise what helps you become better at **DCS Level 1 IT support with early Level 2 growth**, not become a general admin systems expert. The DCSPrep TODO already has good principles around Level 1 safety, privacy, triage, escalation, and not copying confidential internal content. 

## 100% optimised DCSPrep TODO order

### P0 — Make the app stable first

Before adding more features:

* [ ] Fix all build/runtime errors.
* [ ] Lock package versions. Do **not** use `npm audit fix --force`.
* [ ] Move the app out of OneDrive if file locking keeps happening.
* [ ] Ensure these work:

  * `npm install`
  * `npm run dev`
  * `npm run build`
* [ ] Add a simple `FIX_NOTES.md` and `KNOWN_ISSUES.md`.

**Why this is first:** a broken learning app teaches nothing.

---

# P1 — Core DCS IT support cockpit

Build the homepage around your actual work rhythm.

* [ ] Add “Today’s quiet-window PD” dashboard.
* [ ] Add quick buttons:

  * Start tiny: 5-minute task
  * 20-minute focus block
  * Review due flashcards
  * Do one scenario step
  * Log PD
* [ ] Add reminder: “Tickets, walk-ups, calls, and Paul’s instructions come first.”
* [ ] Add “What should I study next?” based on weak areas.

**Why:** You need the app to help you use quiet work pockets well without overstepping.

---

# P2 — Question-first learning engine

This should come before adding heaps of content.

* [ ] Rebuild modules so each starts with a diagnostic question, not reading.
* [ ] Add confidence rating before answers.
* [ ] Require explanation for answers.
* [ ] Add scoring for:

  * correctness
  * reasoning
  * risk/judgement
* [ ] Add mixed question types:

  * MCQ
  * short answer
  * order-the-steps
  * scenario response
  * explain-it-simply
* [ ] Add plausible distractors only.
* [ ] Add error log.
* [ ] Add spaced repetition.

**Why:** This fixes the exact weakness we found in your CompTIA quiz process.

---

# P3 — Highest-priority Josh-lane modules

These are the modules I’d build first.

## 1. Login, Password, Lockout, MFA, and Account Basics

* username format checks
* password reset boundaries
* account locked / expired password
* MFA prompt basics
* suspicious account compromise
* when to escalate

**Very high relevance.**

## 2. Classroom Display and ViewBoard Troubleshooting

* Windows + P
* duplicate vs extend
* HDMI / USB-C / adapters
* no audio
* touch not working
* board input/source
* when to escalate room faults

**Very high relevance.**

## 3. Printer and Photocopier Troubleshooting

* stuck queues
* wrong printer selected
* PaperCut / Follow-Me print release
* toner, paper, jams
* fuser/drum/roller symptoms
* service-call handoff notes

**Very high relevance.**

## 4. Wi-Fi, DHCP, DNS, Gateway, and Basic Network Triage

* 169.254 APIPA
* DHCP vs DNS vs gateway
* SSID selection
* forget/rejoin network
* compare with another device
* one-device vs many-device issue
* what to include when escalating

**Very high relevance and one of your known growth areas.**

## 5. Ticket Notes and Escalation Quality

* who / where / device
* exact symptom
* scope
* steps tried
* urgency / impact
* next action
* privacy-safe wording

**This may be the highest-value module of all.**

## 6. Teams, SharePoint, OneDrive, and File Access Basics

* shared file access
* sync issues
* ownership/sharing basics
* “I can’t find a file”
* permission request boundaries
* escalation wording

**High relevance.**

## 7. New User Onboarding and Missing Access Checks

* staff/prac/student account readiness
* missing groups/access
* software access request completeness
* device readiness
* day-one checklist
* escalate cleanly

**High relevance, but stay within assigned tasks.**

## 8. M365 / Entra / Intune Concepts for Safe Escalation

* block sign-in
* revoke sessions
* sign-in logs
* MFA methods
* managed device wipe/retire concepts
* offboarding sequence

**Important for Level 2 growth, but don’t frame it as production-admin practice unless assigned.**

---

# P4 — Scenario Lab before more modules

Build scenarios that match real DCS work.

* [ ] Teacher laptop won’t display on ViewBoard.
* [ ] HDMI works but no audio.
* [ ] Student laptop has 169.254 IP.
* [ ] One classroom has Wi-Fi but no internet.
* [ ] Printer jobs stuck in queue.
* [ ] Laser printer toner rubs off.
* [ ] Staff reports phishing email.
* [ ] New staff member has missing access.
* [ ] Former staff member still appears active in Teams.
* [ ] Shared OneDrive/Teams file access problem.

Each scenario must end with a **Jira-style note**.

**Why:** This is the bridge from “knowing stuff” to “doing IT support well.”

---

# P5 — Support-quality outputs

Once scenarios exist, make the app help you create useful artefacts.

* [ ] Printer symptom-to-cause matrix
* [ ] ViewBoard quick-fix flow
* [ ] Wi-Fi triage checklist
* [ ] Login/password support checklist
* [ ] New user access checklist
* [ ] Website unblock request checklist
* [ ] Teams/SharePoint/OneDrive triage guide
* [ ] Escalation note examples
* [ ] “What system owns this issue?” decision tree

**Why:** These create visible value without demanding more permissions.

---

# P6 — Lower-priority awareness modules

These should exist, but smaller and later.

## Sentral Awareness and Escalation

Not “master Sentral.” More like:

* what Sentral is used for
* common symptoms users report
* what details to capture
* what belongs to Ruth/admin
* when to escalate
* what not to touch

## Parent Portal Awareness

Again, not deep ownership:

* parent says they can’t access portal
* access key issue
* family details update request
* what info to capture
* handoff to Ruth/admin
* privacy-safe wording

**Verdict:** Keep these as **small boundary modules**, not P0 core modules.

---

# P7 — Deeper technical growth

These are important, but after the real DCS support flow exists.

* [ ] VLANs and guest Wi-Fi segmentation
* [ ] Group Policy vs MDM
* [ ] Intune/Jamf device management concepts
* [ ] Cloud models: SaaS / PaaS / IaaS / DaaS
* [ ] Ports and protocols
* [ ] Endpoint security basics
* [ ] Scripting/automation basics

**Why:** These help your Level 2 growth, but they should not displace daily support skills.

---

# P8 — Evidence and PD export

* [ ] PD log
* [ ] monthly summary
* [ ] evidence pack
* [ ] copy-to-clipboard manager-safe summary
* [ ] link modules/scenarios/practical outputs to PD entries

**Why:** Useful, but only once the learning engine has meaningful activity to summarise.

---

# P9 — Readiness graphs

Keep them, but make them evidence-based.

* [ ] A+ readiness graph
* [ ] Level 2 readiness graph
* [ ] School IT manager readiness graph
* [ ] label unsupported domains as “estimate”
* [ ] update scores from actual performance

**Why:** Motivating, but less urgent than real learning loops.

---

## Final optimised priority list

If I reduced everything to the cleanest order:

1. **Fix app stability**
2. **Build question-first engine**
3. **Build PD cockpit / quiet-window dashboard**
4. **Build core Josh-lane modules**

   * login/password
   * ViewBoards/classroom display
   * printers/photocopiers
   * Wi-Fi/DNS/DHCP/gateway
   * ticket notes/escalation
   * Teams/SharePoint/OneDrive
5. **Build Scenario Lab with Jira-note scoring**
6. **Add Error Log + spaced repetition**
7. **Add practical support outputs**
8. **Add PD Log + Evidence Pack**
9. **Add smaller awareness modules**

   * Sentral
   * Parent Portal
10. **Add deeper Level 2/manager technical modules**
11. **Make readiness graphs evidence-based**

That is the order I’d give Codex.


This file turns [docs/dcsprep-upskilling-roadmap.md](docs/dcsprep-upskilling-roadmap.md) into the exact remaining work needed to make the roadmap complete.

Use this as the execution order.

## Completion Standard

The roadmap is complete only when:

1. Every numbered task in this file is complete.
2. Every Tier 1 DCS workflow area has question-first training content.
3. Every major workflow area has flashcards, mixed questions, scenario practice, and one practical output.
4. Scenario Lab includes the full roadmap scenario set and Jira-note scoring.
5. Review, error logging, focus modes, PD logging, knowledge-base practice, and evidence export all work together.
6. Readiness graphs are driven mainly by real evidence, not placeholder estimates.
7. No feature encourages unsafe production admin practice or storage of sensitive DCS data.

## 1. Finalize the content architecture and storage model

- [ ] Extend shared types for modules, question types, flashcards, study techniques, scenario turns, scenario note scoring, practical outputs, knowledge-base drafts, evidence-pack summaries, and internal-source metadata.
- [ ] Add a single DCS workflow taxonomy covering systems, ticket themes, ownership boundaries, support level, and escalation category.
- [ ] Add localStorage schema entries for:
  - assessment attempts
  - confidence ratings
  - self-rubric scores
  - scenario note scores
  - flashcard box state
  - due-review state
  - practical outputs
  - knowledge-base drafts
  - evidence-pack settings
- [ ] Add storage versioning and migration so existing users do not lose progress when the model expands.
- [ ] Add privacy-safe metadata fields so content can be tagged as derived from internal DCS resources without copying confidential text.
- [ ] Add helper functions for loading, saving, and validating all new progress objects.
- [ ] Add tests for schema validation, migrations, and default-state creation.

Done when:

- the data model can represent every planned roadmap feature without ad hoc fields
- local progress survives upgrades cleanly
- no feature needs a redesign because of missing data structures

## 2. Rebuild the module experience so it is question-first

- [ ] Redesign the module landing view so the first action is a short diagnostic, not passive reading.
- [ ] Standardize every module to this structure:
  - diagnostic questions
  - flashcards
  - short-answer recall
  - explain-it-simply prompt
  - concept sort or categorization activity where relevant
  - scenario step or scenario prompt
  - practical output
  - review queue
- [ ] Add a reusable module progress model that tracks completion by activity type, not only by reading or quiz completion.
- [ ] Show weak areas, due review, and next best action at the top of each module.
- [ ] Make explanation content appear after recall attempts or alongside guided reveal, so the flow stays retrieval-first.
- [ ] Update module cards and module detail pages to show:
  - due items
  - weak topics
  - estimated time
  - practical output status
- [ ] Add tests for module completion math and next-step recommendation logic.

Done when:

- every module follows one consistent question-first workflow
- the user can start learning from prompts and practice instead of reading first

## 3. Implement the study-technique layer the roadmap depends on

- [ ] Add Active Recall mode that hides answers until Josh attempts recall.
- [ ] Add Feynman prompts with a simple rubric for:
  - clarity
  - correctness
  - practical relevance
- [ ] Add explicit Leitner-style flashcard boxes or labels on top of the existing spaced-repetition system.
- [ ] Add concept-sorting exercises for symptoms, systems, ownership boundaries, and escalation decisions.
- [ ] Add mnemonic-builder prompts for ports, workflows, and system distinctions.
- [ ] Add Cornell-style guided note templates for module review and scenario debrief.
- [ ] Add SQ3R-style reading companion prompts for safely turning internal resources into questions and summaries.
- [ ] Add micro-learning task cards that fit short quiet windows.
- [ ] Add a Pomodoro-style timer tied to one learning task.
- [ ] Add end-of-session prompts:
  - What did I learn?
  - Where would this show up at DCS?
  - What is the next small step?

Done when:

- the app directly supports the learning methods named in the roadmap
- study sessions can be short, structured, and active without feeling vague

## 4. Build the missing Tier 1 DCS workflow modules

For every new module below, complete all of these sub-items:

- [ ] Write 3 to 5 short lessons.
- [ ] Add at least 10 flashcards.
- [ ] Add at least 8 mixed assessment items.
- [ ] Add at least 1 scenario prompt or embedded scenario step.
- [ ] Add at least 1 practical output.
- [ ] Add ownership-boundary notes showing what belongs to ICT, admin, leadership, or another system owner.
- [ ] Add a privacy-safe example of good ticket or escalation wording.

Required new modules:

- [ ] 4.1 `Parent Portal Registration`
- [ ] 4.2 `Parent Portal Details Updates`
- [ ] 4.3 `Sentral Support`
- [ ] 4.4 `OurDCS / Schoolbox Support`
- [ ] 4.5 `Login, Password, Lockout, MFA, and Self-Service Recovery`
- [ ] 4.6 `Permissions, Shared Drives, and Access Requests`
- [ ] 4.7 `Website Filtering and Unblock Request Triage`
- [ ] 4.8 `New User Onboarding and Missing-Access Checks`
- [ ] 4.9 `Teams, SharePoint, and OneDrive Support Basics`
- [ ] 4.10 `iPad and Jamf Workflow Basics`

Done when:

- all Tier 1 workflow areas from the roadmap exist as full modules
- each new module can teach through flashcards, questions, and practical DCS-safe application

## 5. Deepen the existing modules so they teach real DCS work better

- [ ] Expand `DCS IT Support Foundations` with:
  - multi-campus context
  - role boundaries
  - internal workflow/source awareness
  - safe escalation rules
- [ ] Expand `Printer Troubleshooting` with:
  - PaperCut / Follow-Me release
  - photocopier faults
  - queue-vs-device reasoning
  - service-call handoff details
- [ ] Expand `Classroom Display and ViewBoard Troubleshooting` with:
  - Windows+P
  - no-audio workflows
  - touch calibration
  - projector thermal and lamp faults
  - recurring room-fault capture
- [ ] Expand `DNS, DHCP, Gateway, and IP Basics` with:
  - SSID errors
  - forget/rejoin
  - compare-another-device checks
  - BYOD and iPad onboarding context
- [ ] Expand `Ports and Protocols` with:
  - troubleshooting use cases
  - school-device and service examples
  - memory aids
- [ ] Expand `M365 Identity and Offboarding Basics` with:
  - block sign-in
  - session revocation
  - sign-in logs
  - MFA cleanup
  - shared resource cleanup
  - visibility-delay explanation
- [ ] Expand `MDM, Intune, and Group Policy Concepts` with:
  - startup vs sign-in vs background refresh
  - OU placement
  - security filtering
  - printer deployment
  - work-profile and managed-data concepts
- [ ] Expand `VLANs and Network Segmentation` with:
  - guest internet-only patterns
  - source-destination rule writing
  - staff/student/printer access examples
- [ ] Expand `Cloud Models: SaaS, PaaS, IaaS, and DaaS` with:
  - school support use cases
  - DaaS vs local install trade-offs
  - BYOD application scenarios
- [ ] Expand `Ticket Notes and Escalation Quality` with:
  - stronger Jira examples
  - better scope and urgency writing
  - privacy-safe wording practice

Done when:

- the existing modules cover real DCS-style first-line work instead of staying too conceptual

## 6. Expand the strict assessment bank to roadmap level

- [ ] Raise the total strict question bank to at least 80 scored items.
- [ ] Ensure every Tier 1 module has at least 8 scored items.
- [ ] Ensure every expanded technical module has enough questions to test real application, not just definitions.
- [ ] Include all required question types:
  - MCQ
  - short answer
  - order the steps
  - scenario response
  - reflection
- [ ] Require confidence rating before every scored answer.
- [ ] Store correctness, reasoning, judgement, and next review outcome for every attempt.
- [ ] Add model answers and self-rating rubrics where auto-marking is not possible.
- [ ] Add plausible distractors only.
- [ ] Add mixed-domain drills so weak topics get revisited in different contexts.
- [ ] Add tests for scoring logic, confidence capture, and review-scheduling output.

Done when:

- the app can assess all major roadmap topics through structured practice
- the question bank is broad enough to avoid repetitive shallow review

## 7. Finish Scenario Lab properly

- [ ] Keep the current scenarios working:
  - no internet in classroom
  - staff offboarding and M365 access
  - ViewBoard display issue
- [ ] Add the 10 roadmap scenarios:
  - HDMI works but no audio
  - student laptop has 169.254 IP
  - printer jobs stuck in queue
  - laser printer toner rubs off
  - guest Wi-Fi segmentation rules
  - phishing email reported by staff
  - Parent Portal registration problem
  - Sentral markbook or access-key issue
  - password lockout or self-service reset failure
  - new user onboarding with missing system access
- [ ] Ensure every scenario has:
  - 4 to 6 turns
  - realistic reveal steps
  - an escalation point
  - an ideal troubleshooting path
  - a risk/privacy note
  - a model answer summary
- [ ] Require a Jira-style note at the end of every scenario.
- [ ] Add note scoring against:
  - who / where / device
  - exact symptom
  - scope
  - steps tried
  - urgency / impact
  - next action
  - privacy-safe wording
- [ ] Store scenario attempts, note scores, and revisit flags in localStorage.
- [ ] Add due-review hooks so missed scenario decisions come back later.
- [ ] Add tests for scenario progression, note-scoring math, and revisit scheduling.

Done when:

- Scenario Lab is a core learning loop, not a side feature
- scenario decisions and Jira-note writing are both scored and reviewable

## 8. Upgrade Due Today, spaced repetition, and the Error Log

- [ ] Merge flashcards, missed questions, weak scenario steps, and note-writing weak points into one due-review system.
- [ ] Show due items by:
  - topic
  - system
  - difficulty
  - review type
- [ ] Add Leitner-style box visibility for flashcards.
- [ ] Keep Again / Hard / Good / Easy scheduling but map it clearly to due dates and box movement.
- [ ] Improve the Error Log so every entry shows:
  - what Josh answered
  - what was correct
  - why it matters at DCS
  - next review date
  - linked module
  - linked practice action
- [ ] Add "practise again" flows from Error Log entries into drills or scenarios.
- [ ] Add weak-area rollups across:
  - systems
  - workflows
  - judgement/risk
  - note quality
- [ ] Add tests for due-item calculation, box movement, and error-group rollups.

Done when:

- review is unified and visible
- weak points flow back into practice automatically

## 9. Build the quiet-window workflow and focus modes

- [ ] Add `Start tiny` mode.
- [ ] Add `20-minute focus block` mode.
- [ ] Add `I'm overwhelmed` mode with three simple actions.
- [ ] Add one-click quick starts from the dashboard for:
  - 10-question drill
  - scenario step
  - due flashcards
  - PD log entry
  - readiness view
- [ ] Add ticket-theme-weighted recommendations based on weak areas and due items.
- [ ] Add a single-task session view that removes extra clutter during focused practice.
- [ ] Add end-of-session reflection capture.
- [ ] Add tests for recommendation logic and task-mode routing.

Done when:

- the dashboard can guide a short quiet-window session from start to finish
- the app supports low-clutter, concrete study blocks

## 10. Build the practical-output and Knowledge Base Lab workflow

- [ ] Add practical-output templates for:
  - Parent Portal registration guide
  - Parent Portal detail-update guide
  - password-reset guide
  - Wi-Fi onboarding checklist
  - website-unblock checklist
  - onboarding request template
  - Sentral triage cheat sheet
  - OurDCS quick-reference guide
  - Teams / SharePoint / OneDrive issue triage guide
  - iPad / Jamf first-response checklist
  - printer symptom matrix
  - classroom AV quick-fix flow
- [ ] Add a `/knowledge-base-lab` route.
- [ ] Build a workflow for turning repeated ticket themes into OurDCS-ready draft articles.
- [ ] Add a rubric for article quality:
  - clear title
  - correct audience
  - step order
  - brevity
  - safety/privacy
  - likely deflection value
- [ ] Store drafts locally and allow Markdown export.
- [ ] Link module practical outputs into the Knowledge Base Lab.

Done when:

- the app helps produce useful support artifacts, not just memory practice
- repeated ticket themes can be turned into clear safe draft guides

## 11. Enhance the PD Log and add the Evidence Pack

- [ ] Keep the existing PD Log route and extend it to link entries with:
  - modules
  - scenarios
  - practical outputs
  - focus blocks
- [ ] Add quick templates for:
  - scenario practice
  - internal workflow review
  - article/SOP creation
  - reflection on a repeated ticket theme
- [ ] Improve monthly summaries with:
  - total minutes
  - modules touched
  - scenarios completed
  - outputs created
  - weak areas improved
  - current weak areas
  - suggested next focus
- [ ] Add `/evidence-pack`.
- [ ] Generate a manager-safe Markdown summary from localStorage.
- [ ] Include certificate/link placeholders without requiring external systems.
- [ ] Add copy-to-clipboard support.
- [ ] Add privacy reminders that exclude confidential ticket, student, staff, or network details.

Done when:

- Josh can log PD, review it, and export a professional summary safely

## 12. Make readiness graphs evidence-based

- [ ] Keep the readiness routes and charts, but reduce unsupported guesswork.
- [ ] Rework scoring so readiness uses:
  - assessment performance
  - scenario completion
  - scenario note quality
  - flashcard retention
  - practical outputs completed
  - repeated weak areas
- [ ] Label any domain that lacks enough evidence as an estimate.
- [ ] Adjust weighting so the graphs reflect DCS-relevant performance more than generic theory.
- [ ] Add tests for readiness math and domain weighting.

Done when:

- the charts feel useful without pretending to be more precise than the data supports

## 13. Build the internal-resource companion workflow

- [ ] Add a content-author workflow for safely converting internal DCS knowledge into app content.
- [ ] Create a source-intake template that captures:
  - source area
  - system
  - workflow theme
  - privacy review status
  - safe concepts to teach
  - risky details to exclude
- [ ] Create a repeatable transformation checklist:
  - extract workflow steps
  - extract common errors
  - extract escalation boundaries
  - write flashcards
  - write questions
  - write scenario
  - write practical output
- [ ] Add author notes or internal docs for using Teams posts, Sentral training, OurDCS guides, and local SOPs as source material without copying them verbatim.
- [ ] Link this workflow from repo docs so future content work stays aligned.

Done when:

- the app can keep growing from real DCS workflow knowledge without creating privacy or confidentiality problems

## 14. Finish testing, documentation, and release-readiness

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run the test suite and add missing tests for:
  - storage migrations
  - scoring
  - spaced repetition
  - scenario note scoring
  - readiness math
  - module completion math
- [ ] Verify all routes work on desktop and mobile:
  - `/`
  - `/modules`
  - `/strict-quiz`
  - `/due-today`
  - `/scenarios`
  - `/pd-log`
  - `/error-log`
  - `/readiness`
  - `/trainer-guide`
  - `/settings`
  - `/knowledge-base-lab`
  - `/evidence-pack`
- [ ] Verify that old routes and existing saved progress still work after migrations.
- [ ] Review all visible copy for professionalism and clarity.
- [ ] Review all generated content for privacy safety and Level 1 boundaries.
- [ ] Update `README.md`, `TODO.md`, and roadmap/audit docs so they match the final shipped behavior.

Done when:

- the app builds cleanly
- core logic is tested
- the roadmap, docs, and shipped app all match each other

# DCSPrep TODO

## P0: Real DCS Ticket Relevance

- [ ] Add `Parent Portal Registration` module with access-key flow, common blockers, escalation boundaries, and parent-facing note examples.
- [ ] Add `Parent Portal Details Updates` module covering family amendment requests, urgent exceptions, and admin handoff.
- [ ] Add `Sentral Support` module covering markbook visibility, parent access keys, reporting-period issues, and safe escalation.
- [ ] Add `OurDCS / Schoolbox Support` module covering class pages, staff workflow issues, and portal/LMS triage boundaries.
- [ ] Add `Login and Password Support` module covering username checks, lockouts, expired passwords, self-service reset, and compromise suspicion.
- [ ] Add `Permissions and Access Requests` module covering shared drives, software access, approvals, role context, and least privilege.
- [ ] Add `Website Filtering and Unblock Requests` module covering capture of block details, justification, lead time, and workflow.
- [ ] Add `New User Onboarding` module covering staff, student, and prac-teacher request completeness and day-one validation.
- [ ] Add `Teams, SharePoint, and OneDrive Support` module covering common access, sync, sharing, and ownership issues at Level 1 scope.
- [ ] Add `iPad and Jamf Workflow Basics` module covering first-line triage, ownership boundaries, and evidence capture.

## P0: Deepen Existing High-Frequency Themes

- [ ] Expand `Printer Troubleshooting` with PaperCut / Follow-Me release, photocopier faults, queue-vs-device reasoning, and service-call handoff.
- [ ] Expand `Classroom Display and ViewBoard Troubleshooting` with projector inputs, Windows+P, audio-path faults, SMART/touch calibration, and lamp/thermal issues.
- [ ] Expand `DNS, DHCP, Gateway, and IP Basics` with Wi-Fi onboarding, SSID mistakes, signal checks, forget/rejoin, and cross-device comparison.
- [ ] Expand `DCS IT Support Foundations` with multi-campus context, role boundaries, and where DCS workflow knowledge usually lives internally.

## P0: Retrieval-First Learning Design

- [ ] Rework module structure so each topic starts with questions before explanatory reading.
- [ ] Define a standard module pattern: diagnostic questions, flashcards, short-answer retrieval, explain-it-simply prompt, scenario, and practical output.
- [ ] Make flashcards and practice questions the primary way to learn DCS workflow areas that come from internal resources.
- [ ] Add explicit support for converting internal DCS workflow knowledge into safe app prompts without copying sensitive documents into the repo.

## P1: Stronger Scenario Lab

- [ ] Add scenario: HDMI works but no audio.
- [ ] Add scenario: student laptop has 169.254 IP.
- [ ] Add scenario: printer jobs stuck in queue.
- [ ] Add scenario: laser printer toner rubs off.
- [ ] Add scenario: guest Wi-Fi segmentation rules.
- [ ] Add scenario: phishing email reported by staff.
- [ ] Add scenario: Parent Portal registration problem.
- [ ] Add scenario: Sentral access-key or markbook issue.
- [ ] Add scenario: password lockout or self-service reset failure.
- [ ] Add scenario: new user onboarding with missing system access.
- [ ] Require a Jira-style escalation note at the end of every scenario.
- [ ] Score scenario notes with a rubric for symptom clarity, scope, steps tried, urgency, and privacy-safe wording.

## P1: Stronger Assessment Engine

- [ ] Expand the strict question bank to 80+ questions with plausible distractors.
- [ ] Weight new questions toward the actual top DCS enquiry themes, not just networking concepts.
- [ ] Add more Analyse / Evaluate / Create style questions.
- [ ] Add more free-response and order-the-steps items for access requests, onboarding, Sentral, and password support.
- [ ] Revisit weak topics later in mixed contexts instead of only re-asking same-topic items.
- [ ] Add Feynman-style explain-back prompts to every major module area.
- [ ] Add concept-sorting exercises for systems, symptoms, and ownership boundaries.
- [ ] Add mnemonic and memory-sheet prompts for ports, processes, and platform distinctions.
- [ ] Add guided Cornell-style reflection prompts at the end of study blocks.
- [ ] Add SQ3R-style support for turning internal readings into questions and summaries.

## P1: Deeper Technical Judgement

- [ ] Deepen M365 / Entra / Intune content with sign-in blocking, session revocation, sign-in logs, MFA, shared mailbox cleanup, and managed mobile retire/wipe concepts.
- [ ] Deepen Group Policy content with startup, sign-in, background refresh, OU placement, security filtering, drive mapping, and printer deployment.
- [ ] Deepen VLAN content with source-destination allow/block rule writing and guest-internet-only designs.
- [ ] Deepen cloud content with DaaS / hosted-desktop school scenarios and BYOD trade-off reasoning.

## P2: Support-Quality Outputs

- [ ] Add practical output templates for Parent Portal, Sentral, login help, Wi-Fi onboarding, unblock requests, and onboarding checklists.
- [ ] Add a self-service article authoring workflow so repeated ticket themes can become OurDCS-ready content.
- [ ] Add a knowledge-base or SOP practice route for writing support articles, not just notes.

## P2: Remaining Backlog From `_Jira analysis.txt`

- [ ] Add `/evidence-pack`.
- [ ] Add `Start tiny`.
- [ ] Add `20-minute focus block`.
- [ ] Add `I'm overwhelmed` mode.
- [ ] Add end-of-session reflection prompts.
- [ ] Improve readiness scoring so more domains are based on real evidence rather than light estimates.
- [ ] Add explicit Leitner-style flashcard buckets or box labels on top of the current spaced repetition flow.
- [ ] Add a Pomodoro-style study timer tied to one clear task.
- [ ] Add micro-learning task cards sized for short quiet windows, with one question set or one workflow at a time.

## Guardrails

- [ ] Keep all new training Level 1-safe and privacy-safe.
- [ ] Teach real DCS workflow, but do not simulate unsafe production changes as if Josh is authorized to perform them.
- [ ] Prefer triage, first-line troubleshooting, evidence capture, communication, and escalation quality over fake-admin practice.
- [ ] Do not copy confidential internal DCS procedures, credentials, student details, staff details, or private system data into app content.
- [ ] Use internal DCS documents, Teams posts, and school-owned resources as source material for practice design, not as content to reproduce verbatim.
