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
