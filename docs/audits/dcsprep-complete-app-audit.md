# DCSPrep Complete App Audit

## 1. Static Repo Inventory

**Framework and App Type**
- **Framework**: [Next.js 14](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/package.json) (App Router) using TypeScript and Tailwind CSS.
- **State Management**: [Zustand](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/package.json#L24) for lightweight client-side state.
- **App Type**: A sophisticated PWA (Progressive Web App) designed for internal school IT staff training, focusing on retrieval-first learning and AI-assisted scenario practice.

**Important Routes (app/)**
- [app/modules](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/app/modules): Core educational content and question-first learning paths.
- [app/scenarios](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/app/scenarios): Troubleshooting simulations requiring scored Jira-style escalation notes.
- [app/evidence-pack](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/app/evidence-pack): Progress summary and Markdown/PDF export for management review.
- [app/focus](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/app/focus): Micro-learning and Pomodoro-style deep work tools.
- [app/knowledge-base-lab](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/app/knowledge-base-lab): Tools for converting internal DCS knowledge into safe support articles.
- [app/api/ai](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/app/api/ai): Backend routes for AI coaching, roleplay, and rubric grading.

**Important Data Files (src/data/)**
- [modules.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/data/modules.ts): The primary repository of DCS-specific and technical learning modules.
- [questions.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/data/questions.ts): A strict question bank containing 80+ items for certifications and assessments.
- [scenarios.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/data/scenarios.ts): Definitions for complex troubleshooting cases and their grading rubrics.
- [skillDomains.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/data/skillDomains.ts): Mapping of content to professional competencies.

**Important Persistence & Progress (src/lib/)**
- [progress.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/lib/progress.ts): Manages user progress, assessment results, and Leitner-style flashcard buckets.
- [readinessMath.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/lib/readinessMath.ts): Calculates competency scores based on a mix of quiz results and practical evidence.
- [syncManager.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/lib/sync/syncManager.ts): Logic for local-to-cloud synchronization and conflict resolution.
- [exportMarkdown.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/lib/exportMarkdown.ts): Logic for generating professional evidence packs.

**Test Suite (src/tests/)**
- A comprehensive collection of 20+ Vitest files including:
  - [assessmentContent.test.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/tests/assessmentContent.test.ts): Verifies the integrity and size of the question bank.
  - [modules.test.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/tests/modules.test.ts): Ensures modules follow the required retrieval-first pattern.
  - [aiSanitize.test.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/tests/aiSanitize.test.ts): Checks safety guardrails for AI interactions.

**Risk Areas**
- **Data Maintenance**: Extremely large static files (like [modules.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/data/modules.ts)) may become fragile as content grows.
- **Privacy Boundary**: Reliance on client-side storage and AI prompts requires strict vigilance to prevent accidental inclusion of sensitive DCS data.
- **Sync Complexity**: The "local-first" architecture with cloud sync scaffolding introduces potential for race conditions or data loss without robust backend verification.
- **AI Dependency**: Core grading and roleplay features are heavily dependent on external LLM availability and response quality.

**Note on Command Execution**
- Baseline technical checks (`npm install`, `npm run lint`, `npm run test`, `npm run build`) were deliberately omitted from this audit phase to ensure stability and focus on static analysis.

## 2. Feature Reachability and Product Coherence

| Area | Route / Files | Reachable? | Implementation Status | Evidence | Concerns | Suggested Fix |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Dashboard** | `app/page.tsx` | Yes | **Complete** | Direct landing page with AI recommendations and OneDrive warnings. | None | N/A |
| **Modules** | `app/modules/` | Yes | **Complete** | Comprehensive library in `src/data/modules.ts` surfaced via nav. | Data file is becoming very large and hard to maintain. | Consider splitting `modules.ts` by category. |
| **Assessments** | `src/components/assessment/` | Yes | **Complete** | Integrated into Modules and Practice Exam. | Mixed format questions (order-steps, etc.) are complex. | N/A |
| **Scenarios** | `app/scenarios/` | Yes | **Complete** | 10+ scenarios with AI rubric grading and Jira note capture. | Some rubric criteria may be subjective. | N/A |
| **Flashcards** | `src/components/flashcards/` | Yes | **Complete** | Integrated into Modules and "Due Today" view. | Spaced repetition logic is purely client-side. | N/A |
| **Due Today** | `app/due-today/` | Yes | **Complete** | Centralized view for Leitner-style reviews. | None | N/A |
| **Focus Mode** | `app/focus/` | Yes | **Complete** | Pomodoro timer with micro-task selection. | None | N/A |
| **Feedback Log** | `app/feedback-log/` | Yes | **Complete** | Persistent history of AI coaching and roleplay. | Sentiment trajectory visualization is basic. | N/A |
| **Evidence Pack** | `app/evidence-pack/` | Yes | **Complete** | Markdown export with progress summary. | "Manager-safe" toggle needs verification. | N/A |
| **A+ Core 2** | `app/certifications/aplus-core-2/` | Yes | **Complete** | 70+ lessons with AI assessments and progress tracking. | None | N/A |
| **Practice Exam** | `app/practice-exam/` | Yes | **Complete** | Full 20-question certification simulation. | None | N/A |
| **Roleplay Bot** | `app/simulations/roleplay/` | Yes | **Complete** | Interactive AI persona chat with scoring. | None | N/A |
| **Knowledge-Base Lab** | `app/knowledge-base-lab/` | Yes | **Complete** | Article authoring tool with AI coach assistance. | None | N/A |
| **Network Map** | `app/simulations/network/` | Yes | **Complete** | Interactive SVG map with ping simulation and learning hotspots. | Fixed 2026-05-14: nodes now link directly to diagnostic modules/tasks. | Keep hotspot coverage aligned with network modules. |
| **Classroom Desk** | `app/simulations/classroom-desk/` | Yes | **Complete** | Visual troubleshooting for classroom AV. | None | N/A |
| **Hardware Catalogue** | `app/hardware/` | Yes | **Complete** | Searchable reference for DCS device patterns. | None | N/A |
| **Mobile / PWA** | `app/mobile-qa/` | Yes | **Complete** | `sw.js` exists; checklist provided for manual verification. | Manual verification required for offline assets. | N/A |
| **Supervisor Dashboard** | `app/supervisor/` | Yes | **Complete** | Privacy-safe analytics and CSV export for managers. | None | N/A |
| **Admin Hub** | `app/admin/` | Yes | **Complete** | Tools for SLG import and content governance. | None | N/A |
| **Custom Content Editor** | `app/admin/custom-content/` | **Yes** | **Complete** | Admin form builds custom modules and roleplay personas, saves locally, and exports JSON. | Fixed 2026-05-14: users no longer need to hand-edit raw JSON for common custom content. | Add more editors later for scenario labs, playbooks, and asset profiles if needed. |
| **Settings** | `app/settings/` | Yes | **Complete** | Sync, notifications, backup, and AI prompt tools. | None | N/A |

### Product Coherence Insights
- **Strengths**: The app feels remarkably coherent for a local-first PWA. The "AI Mentor" on the dashboard successfully ties disparate tools (Modules, Scenarios, Focus) into a guided user journey.
- **Weaknesses**: The distinction between "Simulations" (Network Map, Classroom Desk) and "Scenarios" is slightly blurred. The "KB Lab" and "Evidence Pack" are powerful but might be missed by casual users.
- **UX Coherence**: Consistent use of rounded-2xl containers and Tailwind-based design creates a professional, "Apple-style" training environment suitable for a school setting.

## 3. Educational Design and DCS Relevance Audit

### 3.1 Retrieval-First Learning Design
The app strictly adheres to a "recall before reading" philosophy.
- **Questions First**: Every module in [modules.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/data/modules.ts) starts with diagnostic questions, explain-back prompts, and SQ3R tasks rendered via [ModuleQuestionFirst.tsx](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/components/modules/ModuleQuestionFirst.tsx).
- **Active Recall**: Flashcards and mixed-format quiz questions (MCQ, Short Answer, Order Steps, Scenario Response) are deeply integrated into the data model and learning flow.
- **Spaced Repetition**: A [Leitner-style system](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/lib/spacedRepetition.ts) is used to manage "Due Today" items, ensuring weak areas are revisited.

### 3.2 DCS Workflow Relevance
The content is highly specific to Level 1 support at Dubbo Christian School.

| DCS Workflow | Status | Evidence in Code |
| :--- | :--- | :--- |
| **Parent Portal** | **Complete** | Module `parent-portal-registration` and `parent-portal-details-updates` in [modules.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/data/modules.ts). |
| **Sentral Support** | **Complete** | Module `sentral-support` and scenario `sentral-markbook-access-key-issue`. |
| **OurDCS / Schoolbox** | **Complete** | Module `ourdcs-schoolbox-support` and KB Lab tracks. |
| **Login / Password** | **Complete** | Module `login-and-password-support` with routine vs. suspicious triage. |
| **ViewBoards** | **Complete** | Module `classroom-display-viewboard-troubleshooting` and classroom desk simulation. |
| **PaperCut / Printers** | **Complete** | Expanded `printer-troubleshooting` module with Follow-Me release logic. |
| **iPad / Jamf** | **Complete** | Module `ipad-jamf-workflow-basics` covering management-layer triage. |
| **Network Basics** | **Complete** | Module `dns-dhcp-gateway-ip-basics` with 169.254 (APIPA) symptoms. |

### 3.3 Level 1 Safety and Triage
The app consistently teaches **"Safe Level 1 Boundaries"**:
- **Triage Priority**: Emphasizes "Who, Where, What, When, Impact" before any technical changes.
- **Escalation Quality**: Scenarios require a scored Jira-style note using a rubric that penalizes unsafe admin actions and rewards clear scope.
- **Privacy Discipline**: Frequent reminders to avoid copying sensitive DCS data (student names, credentials) into the app, reinforced by [aiSanitize.test.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/tests/aiSanitize.test.ts).

### 3.4 Top 10 Educational & Relevance Improvements

| # | Issue | Severity | Area | Why it matters | Suggested Fix |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Static Prompts** | Medium | [ModuleQuestionFirst.tsx](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/components/modules/ModuleQuestionFirst.tsx) | Prompts are read-only; no "commit to answer" field. | Add a text area for "Recall Draft" that persists locally. |
| 2 | **Large Data File** | High | [modules.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/data/modules.ts) | 2500+ lines makes maintenance and linting slow. | Split into `modules/operations.ts`, `modules/networking.ts`, etc. |
| 3 | **Practical Output UI** | Low | `app/modules/` | Practical tasks are just checkboxes with no "upload" or "link" evidence. | Allow users to paste a link to a safe internal SOP draft or Jira ticket ID. |
| 4 | **Scenario Note Rigidity** | Medium | `app/scenarios/` | Deterministic rubric grading may miss nuance. | Increase reliance on AI rubric grading with better fallback messages. |
| 5 | **Concept Sort Complexity** | Low | [ModuleQuestionFirst.tsx](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/components/modules/ModuleQuestionFirst.tsx) | Select menus for sorting are clunky on mobile. | Implement a simple drag-and-drop or "Tap to Sort" UI. |
| 6 | **Missing Video Links** | Medium | [aplusCore2.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/data/aplusCore2.ts) | Many A+ lessons link to external root URLs only. | Add specific YouTube timestamps/IDs for each lesson. |
| 7 | **DCS Hardware Gaps** | Low | [hardwareCatalog.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/data/hardwareCatalog.ts) | Some newer DCS-specific laptop models may be missing. | Audit current trolley models and update the catalog. |
| 8 | **Flashcard Feedback** | Medium | [FlashcardDeck.tsx](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/components/flashcards/FlashcardDeck.tsx) | Flashcard "Good/Easy" buttons don't show the next review date. | Show "Review in 4 days" on the buttons for clarity. |
| 9 | **KB Lab Skeletons** | Low | `app/knowledge-base-lab/` | Skeleton text is static and not editable in the UI. | Turn skeletons into interactive "Fill-in-the-blanks" templates. |
| 10 | **Evidence Pack Detail** | Medium | [evidencePack.ts](file:///c%3A/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/lib/evidencePack.ts) | Manager-safe mode is quite sparse. | Add a "Competency Summary" paragraph per readiness area. |
