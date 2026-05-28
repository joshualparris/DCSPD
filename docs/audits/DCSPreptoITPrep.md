You’re right. What I gave you was not good enough.

The main problems were:

1. **I called it a “full QA audit”, but it wasn’t.**
   I mostly audited the repo docs and roadmap, not the live app experience. The report itself even says the live app could not be accessed, so calling it a full QA of `dcspd.vercel.app` was misleading. 

2. **I used stale audit findings as if they were current.**
   The report says lots of things are missing, but your current TODO says many of those areas are now complete: login/password, classroom display, printers, Wi-Fi, ticket notes, Teams/SharePoint/OneDrive, onboarding, M365 concepts, 10 scenarios, support outputs, PD log and evidence export are marked done.  

3. **I over-prioritised DCS admin systems.**
   The current TODO specifically says Parent Portal and Sentral should be demoted to “awareness + escalation boundary” because they are not really your main lane. My report treated them like top build priorities, which is wrong for your situation. 

4. **It didn’t answer the real strategic question sharply enough.**
   You weren’t just asking “what modules are missing?” You were asking: “How do we stop this becoming useless after I leave DCS?” I should have centred the whole answer around the pivot from **DCSPrep** to a longer-term **IT career preparation app**.

5. **The downloadable report had broken-looking citations and weird formatting.**
   It included internal citation placeholders and awkward formatting like `80 ≥ questions` and `5 ≤ minute lessons`. That makes it feel half-baked rather than useful. 

Here’s the fixed version.

# Corrected QA and Pivot Plan for DCSPrep / DCSPD

## The honest framing

DCSPrep is currently a strong learning and professional development app for school IT support, but its name and content model are too tied to Dubbo Christian School.

That becomes a problem because Josh expects to finish at DCS on 17 July 2026. After that, a DCS-specific app will gradually lose relevance unless it becomes a broader IT support career trainer.

The right move is not to delete the school support content. The right move is to make “school IT support” one mode inside a broader app.

## Main recommendation

Rename the app from **DCSPrep** to **ITPrep**.

Use the subtitle:

**ITPrep — School, MSP and Service Desk Training**

This keeps the purpose clear. It is not just for DCS. It is not just for CompTIA. It is not just for school IT. It becomes Josh’s personal IT support training cockpit.

## Do not rename DCS to “Dubbo Computer Science”

“Dubbo Computer Science” is not the best direction.

It still keeps the app tied to Dubbo. It also makes the app sound like coding or computer science education, not practical IT support. The app is about service desk work, troubleshooting, tickets, escalation, remote support, documentation and professional growth.

Better options:

* **ITPrep**
* **SupportPrep**
* **ServiceDeskPrep**
* **TechSupport Trainer**
* **IT Support Lab**

Best overall: **ITPrep**.

## New app structure

The app should have a setting called:

**Support Mode**

The options should be:

1. **School IT Support**
2. **MSP Support**
3. **General IT Foundations**

The selected mode changes the dashboard, modules, scenarios, examples, roleplays, cheat sheets and evidence summaries.

## Mode 1: School IT Support

This keeps the existing DCS value.

It should include:

* classroom display and ViewBoard support
* printers and PaperCut
* school Wi-Fi and BYOD
* M365 and Teams basics
* onboarding and missing access
* ticket notes and escalation
* website unblock requests
* school-specific awareness topics like Sentral and Parent Portal

Sentral and Parent Portal should not dominate the app. They should be awareness and escalation modules unless Josh returns to a school role where he owns those workflows.

## Mode 2: MSP Support

This is the most important new mode for Josh’s future.

It should be built around real MSP-style work:

* HaloPSA ticket triage
* 3CX phone support
* Datto RMM alerts
* remote device troubleshooting
* Microsoft 365 tenant support
* user onboarding and offboarding
* password resets and MFA
* printer and scanner issues
* UniFi Wi-Fi troubleshooting
* suspicious email triage
* IRONSCALES / Defender / SentinelOne awareness
* Augmentt / SaaS security awareness
* backup and monitoring alerts
* client communication and escalation notes

This mode should feel like working at Avance or a similar MSP.

The core question should be:

“Can Josh handle a first-line MSP ticket calmly, safely, clearly and with good notes?”

## Mode 3: General IT Foundations

This mode supports long-term career growth.

It should include:

* CompTIA A+ topics
* networking basics
* DNS, DHCP, gateway, VLANs and firewall concepts
* Windows troubleshooting
* M365 basics
* endpoint security basics
* scripting and automation basics
* customer service and de-escalation
* ticket-writing quality
* evidence packs for job applications and interviews

This mode is useful regardless of employer.

## What the dashboard should do

The homepage should stop saying or implying “DCS is the whole app.”

It should become a mode-aware cockpit.

When in School IT Support mode, it shows:

* school support scenarios
* classroom tech practice
* printer and Wi-Fi triage
* school-safe escalation reminders

When in MSP Support mode, it shows:

* MSP ticket triage
* remote support practice
* M365 tenant scenarios
* Datto / Halo / UniFi / 3CX style workflows
* client communication practice

When in General IT Foundations mode, it shows:

* A+ readiness
* networking basics
* Windows support
* security fundamentals
* job-readiness evidence

## What should happen to existing DCS content?

Keep it.

Do not remove the DCS content. It is valuable because school IT support is a real future job category Josh may return to.

But tag it as:

* `mode: school`
* `context: education`
* `audience: school IT support`

Then create MSP content tagged as:

* `mode: msp`
* `context: managed services`
* `audience: service desk / field technician`

Shared content should be tagged as:

* `mode: all`

Examples of shared content:

* DNS
* DHCP
* printers
* M365
* password resets
* ticket notes
* escalation quality
* customer communication
* troubleshooting logic

## Biggest QA issue now

The app has grown from a DCS learning tool into something bigger, but the brand and information architecture have not caught up.

That means the app risks feeling obsolete as soon as Josh leaves DCS.

The fix is not just more modules.

The fix is a new product model:

**ITPrep is a multi-context IT support training app. DCS/school support is one context. MSP support is another. General IT foundations is the third.**

## Priority build order

### Phase 1: Rename and reposition

* Rename visible app brand to ITPrep.
* Keep “DCSPrep” as a legacy label only if needed.
* Update page titles, metadata, dashboard copy and README wording.
* Add a short explanation: “Choose your support context: School, MSP or General IT.”

### Phase 2: Add Support Mode setting

* Add a Support Mode selector in Settings.
* Store selected mode in localStorage.
* Make dashboard copy mode-aware.
* Filter module recommendations by mode.
* Add a visible mode badge on the dashboard.

### Phase 3: Tag existing content

Add mode tags to:

* modules
* questions
* scenarios
* cheat sheets
* readiness domains
* evidence pack items

Use:

* `school`
* `msp`
* `general`
* `all`

### Phase 4: Add MSP content

Add the first MSP modules:

1. MSP Service Desk Foundations
2. HaloPSA Ticket Triage
3. M365 User and Licence Support
4. MFA and Password Reset Workflow
5. Datto RMM Alert Triage
6. UniFi Wi-Fi First Response
7. 3CX Phone Support Basics
8. Suspicious Email and Security Triage
9. Client Communication and Escalation Notes
10. New User Setup in an MSP Context

### Phase 5: Add MSP scenarios

Add realistic MSP scenarios:

* user cannot sign in to Microsoft 365
* MFA prompt loop
* mailbox full or Outlook not syncing
* printer offline at a client site
* UniFi access point offline
* Datto alert: disk space low
* 3CX phone not registering
* suspicious email reported by client
* new staff member missing access
* client says “internet is down” but only one PC is affected

Each scenario should end with a ticket note.

### Phase 6: Make evidence packs career-useful

Evidence packs should be able to export for:

* school IT support roles
* MSP service desk roles
* general IT support roles
* CompTIA / study progress
* interview preparation

The MSP evidence pack should highlight:

* ticket triage practice
* remote support judgement
* M365 support practice
* security awareness
* documentation quality
* escalation judgement
* customer communication

## Final verdict

DCSPrep is not a dead-end app.

But if it stays branded and structured around DCS, it will become emotionally and practically stale after 17 July 2026.

The best path is to turn it into **ITPrep**.

School IT Support becomes one mode.

MSP Support becomes the most important new mode.

General IT Foundations becomes the long-term career mode.

That makes the app useful at DCS, useful at Avance, useful for future IT roles, and still useful if Josh returns to school IT support later.

And here’s the implementation prompt I should have given you for Codex.

You are working in the GitHub repository `joshualparris/DCSPD`.

Goal: pivot the app from a DCS-only professional development app into a broader IT support career training app.

Rename the visible product from **DCSPrep** to **ITPrep**.

Do not delete existing DCS/school IT content. Instead, introduce a mode system so the app can switch between:

1. School IT Support
2. MSP Support
3. General IT Foundations

Important product direction:

* DCS/school support should remain available as one mode.
* MSP mode should become the most important new mode because Josh is working in MSP-style IT support.
* General IT Foundations should cover A+, networking, Windows, M365, security, scripting and ticket quality.
* Sentral and Parent Portal should be awareness/escalation topics only, not core Josh-owned modules.
* The app must remain privacy-safe and local-first. Do not introduce accounts, cloud sync, external APIs or live client data.

Implementation requirements:

1. Add a support mode setting.

Create a type:

`type SupportMode = "school" | "msp" | "general"`

Persist it in localStorage.

Add a selector in Settings:

Label: “Support Mode”

Options:

* School IT Support
* MSP Support
* General IT Foundations

2. Add mode-aware UI copy.

Update dashboard headings and helper text so they change based on selected mode.

School mode should mention classroom tech, printers, Wi-Fi, school systems and safe escalation.

MSP mode should mention tickets, remote support, Microsoft 365, RMM alerts, client communication and escalation.

General mode should mention IT foundations, A+, networking, endpoint support, M365, security and job readiness.

3. Add mode metadata to learning content.

Add optional mode tags to modules, scenarios, questions, cheat sheets and readiness domains.

Use:

* `school`
* `msp`
* `general`
* `all`

Shared technical foundations should use `all`.

DCS-specific items should use `school`.

New Avance/MSP-style items should use `msp`.

4. Filter recommendations by mode.

The user should still be able to browse all content if needed, but dashboard recommendations should prioritise the selected mode.

5. Add first MSP module set.

Create these starter MSP modules:

* MSP Service Desk Foundations
* HaloPSA Ticket Triage
* Microsoft 365 User and Licence Support
* Password Reset and MFA Workflow
* Datto RMM Alert Triage
* UniFi Wi-Fi First Response
* 3CX Phone Support Basics
* Suspicious Email and Security Triage
* Client Communication and Escalation Notes
* MSP New User Setup

Each module should include:

* diagnostic question first
* flashcards
* MCQs
* short-answer recall
* explain-it-simply prompt
* one scenario or triage decision
* one practical output/checklist

6. Add first MSP scenarios.

Create scenario chains for:

* M365 sign-in failure
* MFA prompt loop
* Outlook not syncing
* Datto RMM disk space alert
* UniFi AP offline
* 3CX phone not registering
* suspicious email reported by client
* printer offline at client site
* new staff member missing access
* “internet is down” but only one PC is affected

Each scenario must finish with a ticket note scored against:

* user/client
* device/location
* exact symptom
* scope
* steps tried
* impact/urgency
* next action
* escalation quality
* privacy-safe wording

7. Update branding safely.

Replace user-facing “DCSPrep” with “ITPrep” where appropriate.

Keep repository name unchanged unless explicitly asked.

Keep historical references in docs where needed, but mark them as legacy.

8. Update README.

Rewrite the README to describe ITPrep as:

“A local-first IT support training app for school IT, MSP support and general IT foundations.”

Mention that DCS/school IT support is now one mode, not the whole app.

9. Do not overbuild.

Do not add authentication.

Do not add cloud sync.

Do not add real client data.

Do not add API integrations.

Do not scaffold unused backend services.

10. Verify.

Run:

`npm install`
`npm run build`

Report:

* files changed
* what mode system was added
* what content was tagged
* what MSP modules/scenarios were added
* any limitations or follow-up work

Bottom line: **ITPrep with a School/MSP/General mode toggle is the right move.**
“Dubbo Computer Science” isn’t strong enough because it still sounds local and academic, not like practical IT support career prep.
Yes — that stuff should **absolutely stay**. I dropped the ball by treating it like optional “nice-to-have” learning theory.

That citation was referring to the roadmap’s learning methods:

* Active Recall / Retrieval Practice
* Feynman explain-back prompts
* Leitner-style flashcard buckets
* practice testing
* concept sorting
* mnemonics / memory aids
* Cornell-style notes
* SQ3R reading companion flows
* Pomodoro-sized focus sessions
* short micro-learning blocks for quiet windows 

The correct structure is:

## ITPrep should have 2 layers

### 1. **Mode layer**

This changes the content.

* School IT Support
* MSP Support
* General IT Foundations

### 2. **Learning engine layer**

This stays the same across every mode.

So whether you are studying ViewBoards, Datto RMM, M365, UniFi, printers, or phishing triage, the app should teach through:

* quiz first
* flashcard
* explain-it-simply
* scenario
* ticket note
* spaced review
* quick quiet-window session

## Better wording for the plan

The mode toggle answers:
**“What work context am I training for?”**

The learning engine answers:
**“How do I actually learn and retain this?”**

So no — we should not lose that stuff. It should become the **core engine of ITPrep**, not a side feature.

## Add this to the Codex prompt

Add this section:

```text
11. Preserve and strengthen the learning engine.

Do not treat Active Recall, Feynman prompts, Leitner flashcards, practice testing, concept sorting, mnemonics, Cornell notes, SQ3R and Pomodoro sessions as optional extras.

These are core ITPrep learning mechanics and must work across all modes:

- School IT Support
- MSP Support
- General IT Foundations

For every major module, include:

- diagnostic question first
- retrieval practice before explanation
- flashcards
- short-answer recall
- explain-it-simply prompt
- concept sorting where useful
- scenario or triage decision
- ticket-note or practical-output task
- spaced repetition review item
- micro-learning version suitable for a 5-minute quiet window

The selected Support Mode changes the content context, but the learning method stays consistent.

Example:

School mode:
“Teacher laptop won’t display on ViewBoard.”

MSP mode:
“Client laptop cannot connect to Microsoft 365.”

General mode:
“Explain DHCP vs DNS vs gateway.”

All three should use the same learning flow:
Question → attempt → feedback → explain-back → scenario → ticket note → spaced review.
```

That’s the missing piece: **ITPrep should not just be a content library. It should be your repeatable learning machine.**

Now I have a thorough picture of the app. Let me put together the full QA audit and strategic recommendations.Here's the full breakdown across all three tabs — QA Audit, Rebranding, and School/MSP Mode. A few things worth highlighting:

**On the QA audit:** the most pressing issues are all about hardcoded school context — Paul's name in the header disclaimer, the Thursday/Friday PD block defaults, and the fact that every roleplay persona, scenario, and module is K-12 specific. The good news is roughly half the app (A+, certs, network, KB lab, PD log, evidence pack) is already 100% career-portable and doesn't need to change at all.

**On the name:** my honest recommendation is **ITPrep** — it's clean, zero explanation needed, and works whether you're at a school, an MSP, or studying for your next cert in five years. If you want to keep the DCS initials, **"Digital Career Skills"** is the strongest reinterpretation — it's accurate and forward-looking. "Dubbo Computer Science" is a nice personal nod but undersells what the app actually does.

**On the mode toggle:** the implementation is actually simpler than it sounds. You're not rebuilding anything — you just store a single `workMode` value in localStorage, and components that have school-specific content check it and render the right version. The certification prep, hardware reference, KB lab, and all the A+ content stays identical in both modes. The School mode toggle is also a genuine selling point if you ever go back to school IT — you flip it back and the whole app recontextualises.

The "Josh" hardcoding in the Scenario Lab is also worth fixing regardless of mode — making the user's name configurable in settings is a small change with a nice polish effect.