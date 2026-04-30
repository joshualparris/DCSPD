# Jira Analysis vs DCSPrep Audit

## Purpose

This document compares the current DCSPrep app against the content and expectations captured in `_Jira analysis.txt`.

It also folds in the latest direction for the app:

- internal DCS resources may sit in Teams, OurDCS, Sentral-related staff training, or other school-controlled systems
- the app should not become a dump of internal documents
- the app should turn those real DCS workflow areas into safe professional-development practice built around questions, flashcards, short-answer retrieval, explanation, and scenarios

The source file contains four distinct inputs:

1. Real DCS ticket-volume analysis and top enquiry themes.
2. A DCS enquiry taxonomy plus self-service article pack.
3. A learning and assessment critique showing where training stayed too shallow.
4. A future-state app backlog for DCSPrep.

This audit focuses on one question:

What does the app still fail to teach deeply enough for Josh's actual DCS support context?

## Current App Snapshot

Current DCSPrep strengths:

- 10 PD modules covering foundations, ports and protocols, DNS/DHCP/gateway, printers, classroom display/ViewBoard, M365 offboarding basics, MDM/Intune/Group Policy concepts, VLANs, cloud models, and ticket notes.
- Strict assessment foundation with confidence rating, explanation, risk judgement, scoring, error log, and spaced repetition.
- 3 scenario chains:
  - no internet in classroom
  - staff offboarding and M365 access
  - ViewBoard display issue
- PD log, due review queue, readiness profiles, trainer guide, and settings/privacy reminders.

Current app limitations:

- Only 3 full scenarios.
- Strict question bank is still small and not yet ticket-volume aligned.
- No dedicated coverage for several high-frequency real DCS enquiry themes.
- No self-service article authoring or SOP-building track even though the Jira analysis strongly emphasizes deflection content.
- Networking and identity are better represented than several routine school-service themes that appear more often in the ticket data.
- The learning experience is still too content-led in places and not yet consistently retrieval-first.
- The app is not yet organized around the real internal DCS workflow sources that likely sit in Sentral support material, OurDCS, Teams, paper-based SOPs, or staff induction resources.

## Coverage Matrix

### 1. Printing and Photocopier Issues

Status: `Partial`

What exists now:

- Printer Troubleshooting module
- printer symptom flashcards
- printer assessment items

What is still shallow or missing:

- PaperCut / Follow-Me print release flow
- photocopier-specific faults and error-code handling
- staff printer vs student printer routing
- print queue path vs print release vs device fault differentiation
- consumables depth: toner, drum, fuser, pickup rollers
- printer deployment via Group Policy or other fleet tooling
- what to collect in Jira when copier servicing is needed

### 2. Classroom Tech Problems (Projectors / Boards / Sound)

Status: `Partial`

What exists now:

- Classroom Display and ViewBoard Troubleshooting module
- ViewBoard scenario
- ticket-note guidance for classroom incidents

What is still shallow or missing:

- projector-specific workflows, not just ViewBoard workflows
- Windows+P display-output practice
- HDMI works but no audio
- SMART Board / interactive board calibration flows
- USB touch-path reasoning
- speaker/output device selection on Windows
- lamp, bulb, and thermal fault recognition
- recurring room-fault tracking and escalation

### 3. Parent Portal New Account Registration

Status: `Missing`

Why it matters:

- The Jira analysis identifies this as one of the highest-volume enquiry types.
- This is a routine service-desk and communication workflow, even if some actions belong to office/admin staff.

What should be taught:

- common registration blockers
- access-key flow
- email mismatch handling
- when ICT owns the issue vs when admin owns the issue
- privacy-safe note wording for parent-facing tickets

### 4. Sentral Usage Issues

Status: `Missing`

Why it matters:

- The Jira analysis shows Sentral usage as a significant recurring category with reporting-period spikes.

What should be taught:

- markbook visibility problems
- parent access key regeneration questions
- report-generation issues
- what is configuration vs permissions vs user error
- how to triage without pretending full Sentral admin authority

### 5. Parent Portal Update Personal Details

Status: `Missing`

What should be taught:

- how detail-update requests normally flow
- what belongs to admin vs ICT vs parent self-service
- urgent exceptions such as medical or custody detail changes
- expected processing times and escalation wording

### 6. Account Login and Password Problems

Status: `Partial`

What exists now:

- identity and offboarding concepts
- ticket-quality guidance
- some security judgement assessment

What is still shallow or missing:

- forgotten-password flow
- account lockout handling
- expired-password handling
- username verification habits
- self-service password reset path
- when to wait, when to reset, when to suspect compromise
- student vs staff login differences

### 7. Access to Systems / Files / Permissions

Status: `Partial`

What exists now:

- ticket notes and escalation quality
- offboarding and identity foundations

What is still shallow or missing:

- access request completeness
- shared drive and group membership thinking
- role-based approvals
- Xero / OurDCS / shared-drive / distribution-list examples
- testing access after grant
- least-privilege reasoning
- how permissions issues differ from login issues

### 8. Wi-Fi and Internet Connectivity

Status: `Partial`

What exists now:

- DNS, DHCP, gateway, and IP module
- no-internet classroom scenario
- some VLAN and segmentation context

What is still shallow or missing:

- forgetting and rejoining Wi-Fi
- SSID selection errors
- signal-strength reasoning
- comparing another device on the same network
- iPad / BYOD onboarding cases
- internet works vs internal service access vs filter block distinctions
- mobile-device-specific connection problems

### 9. Website Blocking / Unblock Requests

Status: `Missing`

Why it matters:

- The Jira analysis shows this as a steady recurring need with process and policy implications.

What should be taught:

- what evidence to capture from a blocked page
- education-purpose justification
- approval workflow awareness
- urgency and lead-time communication
- why unblock requests differ from general internet faults

### 10. New User Account Setup

Status: `Missing` to `Partial`

What exists now:

- offboarding basics
- some identity/access concepts

What is still shallow or missing:

- onboarding request completeness
- multi-system provisioning awareness
- start date / end date / role / permissions capture
- staff vs student vs prac-teacher flows
- secure credential handoff
- day-one access verification
- where auto-provisioning should happen vs where manual tickets still occur

### 11. Internal DCS Platforms and Workflow-Specific Support

Status: `Partial`

What exists now:

- M365 identity basics
- ViewBoard and network concepts
- some printer and access coverage

What is still shallow or missing:

- OurDCS / Schoolbox workflow support
- Teams / SharePoint / OneDrive support patterns for staff
- Jamf / iPad support concepts where they matter to first-line triage
- PaperCut staff release-print workflow as a first-class topic
- Digistorm / parent-app awareness where it intersects with parent support
- multi-campus context for DCS, Preschool, and Wellington support flow
- safe use of internal training resources as source material for quiz and scenario design

Why this matters:

- the real DCS knowledge base appears to live partly in internal systems, Teams spaces, staff PD material, and school-specific processes
- if DCSPrep does not mirror those workflow areas, it will stay technically useful but operationally incomplete

## Depth Gaps Beyond the Top 10 Themes

The later sections of `_Jira analysis.txt` show a second layer of gaps: not just missing topics, but missing depth in topics that already exist.

### M365 / Entra / Intune / Offboarding

Status: `Partial but still shallow`

Missing depth:

- block sign-in first
- revoke sessions / tokens
- sign-in log checking
- MFA / authenticator cleanup
- shared mailbox and group cleanup
- managed mobile-data retire/wipe concepts
- preservation vs deprovision sequence
- explaining why Teams visibility can lag behind actual access state

### Group Policy vs MDM

Status: `Partial but still shallow`

Missing depth:

- startup vs sign-in vs background refresh
- OU placement and security filtering
- classic Group Policy use cases such as drive mapping, printer deployment, login scripts
- cloud-managed vs domain-managed fleet differences
- app protection / work profile / managed-data-container concepts

### VLANs and Firewall Rules

Status: `Partial but still shallow`

Missing depth:

- actual source-to-destination allow/block rule writing
- guest internet-only patterns
- staff-to-printer and student-to-printer access rules
- firewall / ACL thinking layered on top of VLAN segmentation
- clearer plain-English-to-network-policy translation

### Cloud Models and DaaS

Status: `Partial but still shallow`

Missing depth:

- DaaS / virtual desktop patterns for Windows-only apps from BYOD
- when DaaS is a better fit than IaaS for school access design
- risk trade-offs of VPN + local install vs hosted desktop
- cloud model decisions in school-specific support cases

## Assessment and Learning-Design Gaps

The source file explicitly criticizes earlier training for staying too low on Bloom's Taxonomy and too weak in Assessment for Learning. The current app improves that, but it has not closed the gap fully.

### What is better now

- confidence rating before answering
- explanation and risk judgement prompts
- scenario-based practice
- error logging and spaced repetition

### What still falls short

- only 3 full scenario chains
- no final Jira-style note writing inside the scenario engine
- no rubric-based scoring for escalation notes
- strict question bank is still too small
- not enough Analyse / Evaluate / Create tasks
- not enough revisiting of weak concepts in later, mixed contexts
- readiness profiles are still only lightly evidenced in several domains

## Learning-Method Fit Gaps

The current app is better than a passive module reader, but it still does not fully match the study methods Josh explicitly wants to use.

### What the app should do more of

- ask first, explain second
- use flashcards and short quizzes as the default entry point
- require recall before showing answers
- prompt "teach it back in plain language" responses
- turn repeated DCS workflows into spaced review items
- keep sessions short and concrete

### What is not yet implemented strongly enough

- Active Recall / Retrieval Practice as the default module flow
- Feynman prompts that require simple explanation in Josh's own words
- explicit Leitner-style flashcard box or bucket logic
- concept sorting / categorization exercises
- Cornell-style guided note templates
- SQ3R support for reading internal resources safely and then converting them into questions
- mnemonic / acronym creation prompts for dense technical content
- Pomodoro-style focus blocks tied to one learning task
- mixed multiple-choice plus short-answer practice across all DCS service areas

### Why this is a real gap

- Josh already learns best through short, structured, active practice
- many DCS topics are procedural, not just conceptual
- if the app stays too reading-heavy, it will underperform compared with the actual support demands of the job

## Missing Feature Work Relative to the Backlog Inside `_Jira analysis.txt`

The source file contains explicit follow-up prompts for the app. The following major areas remain incomplete:

- Prompt 2: the learning engine is not yet expanded to 80+ seed questions across the target domains.
- Prompt 3: Scenario Lab does not yet contain 10 scenario chains or Jira-note scoring.
- Prompt 4: `/evidence-pack` does not exist yet.
- Prompt 5: no `Start tiny`, `20-minute focus block`, or `I'm overwhelmed` modes yet.
- Prompt 6: modules are still concise but not expanded to 8 mixed questions each.

## Highest-Priority Relevance Gaps

If the goal is "100 percent relevant and upskilling," these are the most important mismatches to close first.

### P0: High-frequency real DCS service themes missing or underrepresented

- Parent Portal registration
- Parent Portal details updates
- Sentral support
- login / password / lockout support
- access requests and permissions workflows
- website unblock requests
- new user onboarding
- deeper Wi-Fi onboarding and BYOD support
- deeper photocopier / PaperCut support
- deeper projector / audio / interactive-board support
- OurDCS / Schoolbox, Teams / SharePoint / OneDrive, Jamf / iPad, and parent-app workflow coverage where relevant to Level 1 support

### P0: The app is not yet question-first enough

- modules still need to be rebuilt around retrieval practice
- every DCS topic needs MCQ, flashcards, short answer, teach-back, and scenario prompts
- internal DCS workflow knowledge has not yet been systematically translated into assessment items
- study-technique support is still lighter than the intended design

### P1: Existing topics need stronger operational depth

- M365 / Entra / Intune offboarding sequence
- VLAN / firewall allow-block rules
- Group Policy timing and fleet behaviour
- DaaS vs IaaS in school scenarios
- printer root-cause discrimination

### P2: The app needs more realistic assessment and scenario coverage

- 10 scenario chains
- note-writing inside scenarios
- rubric-scored escalation notes
- larger strict question bank
- more ticket-weighted review and readiness logic

## Recommendation

The app should continue to stay PD-only, Level 1-safe, and privacy-safe.

However, to become truly DCS-relevant, it must shift from "mostly technical concept coverage" to "real school support theme coverage with safe triage, first-line troubleshooting, handoff, and documentation."

That means:

- teaching what happens often, not only what is technically interesting
- teaching when ICT owns the task vs when admin / system owner / leadership owns it
- teaching how to create self-service content and SOPs, not just how to answer quiz questions
- teaching the exact handoff and note quality needed for real Jira-style work
- using internal DCS workflow knowledge as source material without copying sensitive internal content into the app
- making questions, retrieval, flashcards, explain-back, and short scenario decisions the main learning loop
