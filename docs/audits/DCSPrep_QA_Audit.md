# DCSPrep — QA Audit & Strategic Rebranding Report

**App:** https://dcspd.vercel.app/
**Audited:** May 2026
**Context:** Transitioning out of DCS on 17 July 2026. Goal is to make the app relevant for a long-term IT career — including MSP work at Avance — while retaining the ability to toggle back to school IT support mode if needed.

---

## Summary

| Category | Count |
|---|---|
| Issues to fix | 6 |
| Minor improvements | 4 |
| Pages checked | 22 |
| Strategic flags | 3 |
| Portable pages (no changes needed) | ~13 |

---

## Part 1 — QA Audit

### High Priority Issues

#### 1. "Paul's instructions take priority" hardcoded in the header

Every page displays the disclaimer:

> *"Use this application only during approved professional development periods. Tickets, walk-ups, calls, and Paul's instructions take priority over professional development."*

This is a specific name tied to your current manager at DCS. Post-July it will be confusing or irrelevant to anyone reading it. Should either:
- Become generic: *"your manager's instructions take priority"*
- Be controlled by the School/MSP mode toggle (see Part 3)

---

#### 2. PD Scheduler hardcoded to Thursday/Friday blocks

The Settings page confirms: *"The defaults match the Thursday/Friday PD block structure and current A+ Core 2 focus."*

This is DCS-specific school timetabling. MSP and field IT work doesn't operate on a PD block structure. Fix:
- Make all defaults user-configurable with no DCS-specific preset
- In MSP mode, replace with free-form daily/weekly block scheduling

---

#### 3. Modules — school-only content with no broader path

The following modules are entirely K-12 specific and won't be useful in an MSP context:

- Parent Portal Registration
- Parent Portal Details Updates
- Sentral Support
- OurDCS / Schoolbox Support
- Soft Skills for DCS Support
- DCS IT Support Foundations

These should either be hidden in MSP mode or supplemented with MSP equivalents such as client onboarding, SLA management, multi-tenant support, and RMM basics.

---

#### 4. Roleplay Bot — all 23 scenarios are K-12 school personas

Every roleplay scenario is school-specific:

- Level 1 personas: teachers, parents, office staff (Chloe Harrison, Dr. Arthur Pendelton, Mrs. Higgins, etc.)
- Level 2 scenarios: all reference Paul Matthews as IT Manager and involve school systems (NAPLAN, Sentral, Jamf, school bell systems, PaperCut)

In MSP mode, these personas should shift to SMB clients, helpdesk callers, account managers, and multi-client environments. "Paul Matthews" as the delegating manager should be replaceable with a generic IT manager persona or a configurable name.

---

#### 5. Classroom Desk simulation is permanently school-framed

The virtual classroom desk simulation covers classroom cable, ViewBoard, and AV troubleshooting only. It has no MSP equivalent and will be irrelevant post-July.

Fix: either rename and reframe as a generic "worksite simulation" or add a second simulation in MSP mode — e.g. a client office desk, server room walkthrough, or remote session environment.

---

#### 6. Scenario Lab — all 13 scenarios are school IT contexts

Current scenarios include:

- No internet in classroom
- ViewBoard display issue
- Sentral access-key or markbook issue
- Parent Portal registration problem
- NAPLAN Locked Down Browser deployment
- School bell and PA system interface

None of these would be encountered in an MSP or Avance context. Mode-switching should surface MSP scenarios instead (see Part 3 for suggested MSP scenarios).

---

### Minor Improvements

#### 1. Meta description still says "DCS IT"

The page meta description reads: *"A local-first DCS IT professional development dashboard."*

Should update to match the new app name and be mode-neutral.

---

#### 2. Academic PD track uses "DCS bridge" framing throughout

The academic PD section frames every subject's value as its bridge to "DCS support." Post-July, this should shift to "IT career bridge" or a similar neutral label.

---

#### 3. Privacy notice mentions DCS-specific data categories

The footer on every page reads: *"Do not enter real DCS, student, staff, parent, credential, or network details."*

In MSP mode this should read: *"Do not enter real client, staff, or network credential details."*

---

#### 4. "Josh" hardcoded as the user in Scenario Lab

Scenario Lab refers to "Josh" throughout (e.g. *"Josh should not jump into risky network changes"*). The user's name should be configurable in Settings and pulled from that setting wherever it appears.

---

### What Works Well and Carries Over (No Changes Needed)

These pages and features are already career-portable and require no modification:

- A+ Core 2 content
- Practice Exam
- Network Map
- KB Lab
- Cheat Sheets
- Evidence Pack
- PD Log
- Voice-to-Ticket
- Hardware reference
- Error Log
- Readiness
- Certificates
- Academic PD track (content is portable; framing needs minor wording updates)
- Skill Coach
- Focus
- Strict Quiz

---

## Part 2 — Rebranding

### The case for renaming

"DCSPrep" ties the app permanently to one school and one role. As of 17 July 2026, the name will need explaining to anyone who sees it — including future employers, interviewers, or yourself in three years. A rebrand to something career-neutral makes the app usable and shareable well beyond DCS.

---

### Name options

#### Recommended: ITPrep

- Clean, instantly understood, no acronym to explain
- Works for school IT, MSP, certification prep, and general IT career development
- Scales with your whole career regardless of employer or role
- Neutral enough to show on a portfolio or LinkedIn without context

---

#### Keep DCS — redefine the acronym

If you want to preserve the initials for personal continuity, the following expansions work:

| Acronym | Meaning | Notes |
|---|---|---|
| **DCS** | Digital Career Skills | Broadest and most career-neutral — recommended if keeping the letters |
| **DCS** | Desktop, Cloud & Systems | Accurately describes the tech domains covered |
| **DCS** | Develop, Certify, Support | Describes the actual PD workflow |
| **DCS** | Dubbo Computer Science | Geographic and personal, but undersells the IT support scope |

---

#### Other options considered

**CareerPrep IT** — explicitly forward-looking, works for interviews and portfolio, slightly generic.

**TechBench** — feels hands-on and practical, not school-specific, but less clear it's a PD and training tool.

---

### Verdict on "Dubbo Computer Science"

It works as a personal nod to where you started, and the DCS initials are preserved — but "Computer Science" undersells the app. You're doing IT support, MSP work, and helpdesk practice, not academic CS. "Digital Career Skills" using the same DCS initials is more accurate and career-forward.

If you want to keep a geographic connection, **ITPrep** with a subtitle like *"Built in Dubbo, for IT careers everywhere"* is the cleanest option.

---

## Part 3 — School/MSP Mode Toggle

### Concept

A single toggle in Settings that switches the app between two contexts:

- **School IT mode** — current behaviour, optimised for K-12 school support
- **MSP / Field IT mode** — recontextualised for managed services, Avance, and multi-client IT work

The toggle should be visible at all times — a small badge or label in the sidebar or header so you always know which mode you're in. One click to switch; change is immediate.

---

### What changes per mode

| Feature | School IT mode | MSP / Field IT mode |
|---|---|---|
| Scenarios | ViewBoard, Sentral, NAPLAN, Parent Portal | New client onboarding, RMM triage, SLA breach, phishing at client site |
| Roleplay personas | Teachers, parents, Paul Matthews | SMB clients, account managers, generic IT manager |
| Simulation | Classroom Desk (AV / ViewBoard) | Client site / remote session simulation |
| Modules | Parent Portal, Sentral, OurDCS, DCS Foundations | Client onboarding, multi-tenant M365, SLA management, RMM basics |
| Header disclaimer | "Paul's instructions take priority" | "Client tickets and manager tasks take priority" |
| Privacy notice | Student, staff, parent data | Client, credentials, network data |
| Scheduler defaults | Thursday/Friday PD blocks | Free-form daily blocks |

### What stays the same in both modes

Everything below is career-universal and does not need to change:

- A+ Core 2 content and Practice Exam
- Network Map
- KB Lab and KB Sync
- Cheat Sheets
- Evidence Pack
- PD Log and Certificates
- Hardware reference
- Error Log
- Academic PD track
- Voice-to-Ticket
- Skill Coach and Focus
- Readiness
- Strict Quiz

---

### Implementation approach

The simplest path requires no new routes or pages:

1. Store a single key in localStorage alongside existing settings: `workMode: 'school' | 'msp'`
2. Any component with school-specific copy reads this key and renders the appropriate version
3. Pages with no school-specific content ignore it entirely
4. The mode toggle in Settings sets this key; the change is immediate and persists across sessions
5. The current mode is shown as a small persistent badge in the sidebar or nav header

No separate routing, no duplicate pages — just conditional rendering within existing components.

---

### Suggested MSP scenarios to build first

Once mode switching is in place, the following MSP scenarios would give immediate value for Avance and general MSP work:

1. New SMB client onboarding — first day access, account setup, expectations
2. RMM alert triage — offline device, unresponsive endpoint
3. SLA breach conversation with a client — de-escalation and accountability
4. Multi-site VPN connectivity fault — scoping and escalation
5. Phishing incident at a client site — containment, communication, reporting
6. Microsoft 365 tenant migration — planning and client communication
7. Escalation to vendor support — when and how to hand off
8. Monthly report / client review — presenting outcomes and recommendations

---

## Appendix — Pages audited

| Page | School-specific? | Action needed |
|---|---|---|
| Dashboard | Partially (disclaimer) | Update header disclaimer |
| Skill Coach | No | None |
| Focus | No | None |
| PD Scheduler | Yes | Make mode-aware |
| Modules | Yes | Mode-aware, add MSP modules |
| A+ Core 2 | No | None |
| Practice Exam | No | None |
| Scenario Lab | Yes | Add MSP scenarios, mode toggle |
| Network Map | No | None |
| Classroom Desk | Yes | Rename/replace in MSP mode |
| Roleplay Bot | Yes | Add MSP personas, mode toggle |
| Voice-to-Ticket | No | None |
| Hardware | No | None |
| Cheat Sheets | No | None |
| Feedback Log | No | None |
| Strict Quiz | No | None |
| PD Log | No | None |
| Certificates | No | None |
| Academic PD | Partially (framing) | Update "DCS bridge" wording |
| Evidence Pack | No | None |
| KB Lab | No | None |
| Settings | Partially | Add mode toggle, remove DCS defaults |

---

*Report generated May 2026. App audited at https://dcspd.vercel.app/*
