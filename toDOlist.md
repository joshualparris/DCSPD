# DCSPrep Roadmap Completion toDOlist

Yes — your current TODO is good, but **not optimised for your actual lane**.

The biggest issue: it treats **Parent Portal and Sentral as Tier 1 Josh-owned learning areas**, but from what you’re saying, those are more **awareness + escalation boundary** topics, especially if Ruth Cargill mostly owns Sentral/Parent Portal. So I’d demote those. Keep enough knowledge to triage and hand off well, but don’t build the app around them.

Your app should prioritise what helps you become better at **DCS Level 1 IT support with early Level 2 growth**, not become a general admin systems expert. The DCSPrep TODO already has good principles around Level 1 safety, privacy, triage, escalation, and not copying confidential internal content. 

## 100% optimised DCSPrep TODO order

### P0 — Make the app stable first

Before adding more features:

* [x] Fix all build/runtime errors.
* [x] Lock package versions. Do **not** use `npm audit fix --force`.
* [ ] Move the app out of OneDrive if file locking keeps happening.
* [x] Ensure these work:
  * `npm install`
  * `npm run dev`
  * `npm run build`
* [x] Add a simple `FIX_NOTES.md` and `KNOWN_ISSUES.md`.

**Why this is first:** a broken learning app teaches nothing.

---

# P1 — Core DCS IT support cockpit

Build the homepage around your actual work rhythm.

* [x] Add “Today’s quiet-window PD” dashboard.
* [x] Add quick buttons:
  * Start tiny: 5-minute task
  * 20-minute focus block
  * Review due flashcards
  * Do one scenario step
  * Log PD
* [x] Add reminder: “Tickets, walk-ups, calls, and Paul’s instructions come first.”
* [x] Add “What should I study next?” based on weak areas.

**Why:** You need the app to help you use quiet work pockets well without overstepping.

---

# P2 — Question-first learning engine

This should come before adding heaps of content.

* [x] Rebuild modules so each starts with a diagnostic question, not reading.
* [x] Add confidence rating before answers.
* [x] Require explanation for answers.
* [x] Add scoring for:
  * correctness
  * reasoning
  * risk/judgement
* [x] Add mixed question types:
  * MCQ
  * short answer
  * order-the-steps
  * scenario response
  * explain-it-simply
* [x] Add plausible distractors only.
* [x] Add error log.
* [x] Add spaced repetition.

**Why:** This fixes the exact weakness we found in your CompTIA quiz process.

---

# P3 — Highest-priority Josh-lane modules

These are the modules I’d build first.

## 1. Login, Password, Lockout, MFA, and Account Basics
* [x] username format checks
* [x] password reset boundaries
* [x] account locked / expired password
* [x] MFA prompt basics
* [x] suspicious account compromise
* [x] when to escalate

## 2. Classroom Display and ViewBoard Troubleshooting
* [x] Windows + P
* [x] duplicate vs extend
* [x] HDMI / USB-C / adapters
* [x] no audio
* [x] touch not working
* [x] board input/source
* [x] when to escalate room faults

## 3. Printer and Photocopier Troubleshooting
* [x] stuck queues
* [x] wrong printer selected
* [x] PaperCut / Follow-Me print release
* [x] toner, paper, jams
* [x] fuser/drum/roller symptoms
* [x] service-call handoff notes

## 4. Wi-Fi, DHCP, DNS, Gateway, and Basic Network Triage
* [x] 169.254 APIPA
* [x] DHCP vs DNS vs gateway
* [x] SSID selection
* [x] forget/rejoin network
* [x] compare with another device
* [x] one-device vs many-device issue
* [x] what to include when escalating

## 5. Ticket Notes and Escalation Quality
* [x] who / where / device
* [x] exact symptom
* [x] scope
* [x] steps tried
* [x] urgency / impact
* [x] next action
* [x] privacy-safe wording

## 6. Teams, SharePoint, OneDrive, and File Access Basics
* [x] shared file access
* [x] sync issues
* [x] ownership/sharing basics
* [x] “I can’t find a file”
* [x] permission request boundaries
* [x] escalation wording

## 7. New User Onboarding and Missing Access Checks
* [x] staff/prac/student account readiness
* [x] missing groups/access
* [x] software access request completeness
* [x] device readiness
* [x] day-one checklist
* [x] escalate cleanly

## 8. M365 / Entra / Intune Concepts for Safe Escalation
* [x] block sign-in
* [x] revoke sessions
* [x] sign-in logs
* [x] MFA methods
* [x] managed device wipe/retire concepts
* [x] offboarding sequence

---

# P4 — Scenario Lab before more modules

Build scenarios that match real DCS work.

* [x] Teacher laptop won’t display on ViewBoard.
* [x] HDMI works but no audio.
* [x] Student laptop has 169.254 IP.
* [x] One classroom has Wi-Fi but no internet.
* [x] Printer jobs stuck in queue.
* [x] Laser printer toner rubs off.
* [x] Staff reports phishing email.
* [x] New staff member has missing access.
* [x] Former staff member still appears active in Teams.
* [x] Shared OneDrive/Teams file access problem.

Each scenario must end with a **Jira-style note**.

---

# P5 — Support-quality outputs

Once scenarios exist, make the app help you create useful artefacts.

* [x] Printer symptom-to-cause matrix
* [x] ViewBoard quick-fix flow
* [x] Wi-Fi triage checklist
* [x] Login/password support checklist
* [x] New user access checklist
* [x] Website unblock request checklist
* [x] Teams/SharePoint/OneDrive triage guide
* [x] Escalation note examples
* [x] “What system owns this issue?” decision tree

---

# P6 — Lower-priority awareness modules

* [x] Sentral Awareness and Escalation
* [x] Parent Portal Awareness

---

# P7 — Deeper technical growth

* [x] VLANs and guest Wi-Fi segmentation
* [x] Group Policy vs MDM
* [x] Intune/Jamf device management concepts
* [x] Cloud models: SaaS / PaaS / IaaS / DaaS
* [x] Ports and protocols
* [x] Endpoint security basics
* [x] Scripting/automation basics

---

# P8 — Evidence and PD export

* [x] PD log
* [x] monthly summary
* [x] evidence pack
* [x] copy-to-clipboard manager-safe summary
* [x] link modules/scenarios/practical outputs to PD entries

---

# P9 — Readiness graphs

* [x] A+ readiness graph
* [x] Level 2 readiness graph
* [x] School IT manager readiness graph
* [x] label unsupported domains as “estimate”
* [x] update scores from actual performance

---

# P10 — Platform Excellence (Inspired by Top Upskilling Apps)

Features to move DCS Prep from a local tool to a professional-grade learning platform.

* [x] **Soft Skills Integration (LinkedIn Learning style)**:
    * Add "Soft Skills for DCS Support" module covering empathy, de-escalation, and clear communication with staff/students.
* [x] **Gamified Reinforcement (Axonify/Sololearn style)**:
    * Implement a "Daily Streak" counter on the dashboard.
    * Add "Bite-Sized Daily Challenge" (a single 1-minute MCQ) that resets every 24 hours.
* [x] **Interactive Learning (Coursera/Sololearn style)**:
    * Add an "In-App Playground" for running basic Python snippets and HTML/CSS previews related to DCS tasks.
* [x] **Structured Learning Paths (O'Reilly/Udacity style)**:
    * Group modules into "Career Paths" (e.g., "DCS Network Specialist", "Security Guard", "Classroom Tech Master").
* [x] **Project-Based Mastery (Udacity style)**:
    * Add "Final Projects" for each path that require creating a complex artifact (e.g., a full school-wide Wi-Fi audit plan).
* [x] **Micro-Learning Optimization (EdApp style)**:
    * Conduct a "One-Thumb" UI audit to ensure every page is perfectly usable on a mobile phone during a 2-minute quiet window.

---

# P11 — The "Next Level" Upgrade (20 Innovative Enhancements)

Moving from a learning app to a mission-critical DCS Support Companion.

### 1. AI & Automation
* [ ] **AI Support Note Generator**: Convert scenario answers into perfectly formatted Jira escalation notes.
* [ ] **AI Roleplay Bot**: Practice soft skills with an AI that roleplays as frustrated teachers or confused parents.
* [ ] **PDF SLG Parser**: AI-powered tool to convert any new university SLG PDF into a structured 12-week schedule.
* [ ] **Automated KB Sync**: One-click export of Lab articles into "OurDCS" ready markdown/HTML formats.

### 2. Interactive Simulations
* [ ] **Virtual Classroom "Desk"**: A visual 2D diagram of a classroom where you click cables/ports to diagnose faults.
* [ ] **Interactive Network Map**: A simulation of DCS VLANs to practice "ping" logic and segmentation boundaries.
* [ ] **Voice-to-Ticket Mode**: Use speech-to-text to practice "walk-up" support interactions in the Scenario Lab.
* [ ] **DCS Hardware Catalog**: A visual "encyclopedia" of every device model used at DCS with quick troubleshooting specs.

### 3. Advanced Learning Tech
* [ ] **Spaced Repetition Heatmap**: A dashboard visualization showing knowledge strength/decay across all domains.
* [ ] **Progressive Web App (PWA)**: Full offline support so the app works even when troubleshooting Wi-Fi outages.
* [x] **Global Search**:
    * Implement a unified search bar to find any flashcard, module, or scenario by technical keyword.
* [x] **AI Feedback Log**:
    * Create a unified history of all AI coaching, scores, and model answers across the entire app.
* [ ] **Skill Badge Export**: Generate professional PDF certificates for completed Learning Paths as formal PD evidence.

### 4. Operations & Workflow
* [ ] **"Common Pitfalls" Tracker**: A dynamic dashboard area highlighting your most frequent assessment mistakes.
* [ ] **Quick-Fix "Cheat Sheets"**: One-page printable/PDF summaries for high-frequency issues (ViewBoard/PaperCut).
* [ ] **Bulk Data Importer**: Import synthetic ticket data (CSV) for advanced Data Critical Thinking analysis.
* [ ] **Peer Review Simulation**: AI-generated feedback simulating how a senior tech (Paul) would critique your notes.

### 5. Engagement & UX
* [ ] **Leaderboard (Anonymized)**: Compare your streak and progress against "Synthetic Peer" benchmarks for motivation.
* [ ] **Daily Push Notifications**: Browser-based reminders for Daily Challenges and due flashcard reviews.
* [ ] **Dark Mode & High Contrast**: Full accessibility audit for different lighting conditions (quiet windows).
* [ ] **Focus Timer Ambient Sounds**: Optional "Classroom Hum" or "Office White Noise" for the 20-minute Focus Block.

---

## Final optimized priority list - CURRENT STATUS: PHASE 3 COMPLETE, PHASE 4 PENDING

Every major roadmap item is now implemented in the codebase. 

### Remaining Academic PD Tasks:
- [x] Populate full weekly schedules for CSE1IIT (Inside IT) from SLG.
- [x] Populate full weekly schedules for CSE1ICB (Cybersecurity) from SLG.
- [x] Verify and update placeholder subjects (e.g., CSE2CN) using available SLG PDFs.
- [x] Add detailed certification links (CompTIA A+, Cisco CCNA, etc.) to `academicSubjects.ts`.

### General Maintenance:
- [ ] Move app out of OneDrive to prevent file locking issues.
- [ ] Final review of all content for privacy and Level 1 boundaries.
- [ ] Continue using the "AI Mentor" on the dashboard to guide daily PD.
