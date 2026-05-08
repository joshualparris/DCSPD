# DCSPrep Current Feature Inventory

## Executive Summary
DCSPrep is a sophisticated, local-first professional development platform specifically designed for School IT support staff (focused on Dubbo Christian School). It combines structured learning modules, AI-powered simulations, and university-level academic tracking. The app is built with Next.js and uses a "privacy-safe" design philosophy where all user progress and custom uploads stay within the browser's `localStorage`. It features a unique "Readiness" engine that calculates technical proficiency based on a multi-factor evidence model (quizzes, flashcards, scenarios, and note quality).

---

## Route Map
The app is organized into several distinct tracks and utility sections:

| Route | Description | Data Source |
| :--- | :--- | :--- |
| `/` | **Dashboard**: Overview of progress, daily challenges, and AI mentor plans. | Dynamic Merged |
| `/focus` | **Focus Blocks**: Pomodoro-style timers with suggested "micro-tasks." | Built-in |
| `/modules` | **Modules List**: Catalogue of focused technical lessons. | Dynamic Merged |
| `/modules/[id]` | **Module Detail**: Reading content, flashcards, and quizzes. | Dynamic Merged |
| `/scenarios` | **Scenario Lab**: Branching troubleshooting simulations. | Dynamic Merged |
| `/simulations/roleplay` | **AI Roleplay**: Interactive AI chat with school-based personas. | Dynamic Merged |
| `/academic-pd` | **Academic PD**: University subject mapping (RBC/SMITB). | Dynamic Merged |
| `/readiness` | **Readiness**: Proficiency scoring across A+, L1, and Manager roles. | Dynamic (Progress) |
| `/pd-log` | **PD Log**: Formal record of learning hours and outcomes. | Local Storage |
| `/evidence-pack` | **Evidence Pack**: Exportable summaries for management review. | Local Storage |
| `/strict-quiz` | **Strict Quiz**: High-pressure assessment for weak topics. | Dynamic (Progress) |
| `/due-today` | **Spaced Repetition**: Flashcards and questions due for review. | Local Storage |
| `/search` | **Global Search**: Keyword search across all content types. | Dynamic Merged |
| `/settings` | **Settings**: Import/Export, AI health, and custom uploads. | Local Storage |
| `/supervisor` | **Supervisor**: Analytics and progress tracking for managers. | Local Storage |

---

## Feature Inventory by Section

### **Dashboard**
- **Knowledge Heatmap**: Visual grid of activity frequency.
- **Daily Challenge**: A deterministic "question of the day" to build habits.
- **AI Mentor**: Generates a personalized 7-day learning plan based on weak topics.
- **Progress Snapshot**: Quick stats on minutes studied, due cards, and labs completed.

### **Focus**
- **Timed Sessions**: Choose between "Start Tiny" (5m), "Focus 20" (20m), or "Overwhelmed" (8m).
- **Micro-Tasks**: Quick links to specific module sections (e.g., "Parent Portal recall").
- **Reflections**: Prompt to record what was achieved during the focus block.

### **Modules**
- **Multi-Tab Learning**: "Questions First" (diagnostic), "Read" (content), "Flashcards", and "Quiz."
- **Practical Outputs**: Checklists for creating real-world artifacts (e.g., "Triage Card").
- **Study Workflows**: Prompts for SQ3R, Cornell Notes, and "Explain it Back."

### **Scenario Lab**
- **Branching Decisions**: Multi-step simulations where choices affect the outcome.
- **Risk Notes**: Contextual warnings about unsafe actions (e.g., "robocopy /MIR" risks).
- **Ticket Note Grading**: Users write a Jira-style note which is scored against a rubric.

### **AI Roleplay**
- **Persona Chat**: Interactive simulations with varied "Pressure" levels (Low to Critical).
- **Contextual Feedback**: AI coaches you on empathy, technical clarity, and de-escalation.
- **Privacy Gate**: System instructions prevent AI from asking for real PII.

---

## Custom Content System
The custom content system allows for complete extensibility via JSON file uploads in the [Settings](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/app/settings/page.tsx) page.

- **Supported Types**: Training Modules, Roleplay Personas, Scenario Labs, and Academic Subjects.
- **Detection Logic**: The app uses a "heuristic detector" in `importCustomData` that looks for unique keys (e.g., `sections` for modules, `persona` for roleplays).
- **Storage**: Saved in `localStorage` under specific keys defined in [customModules.ts](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/lib/customModules.ts).
- **Merging**: Built-in data is imported from `src/data/`, then combined with `localStorage` data using `useMemo` hooks on the main listing pages.
- **Validation**: Includes an "auto-patcher" that injects missing mandatory fields (like `modulePattern`) to prevent UI crashes if the LLM generates an incomplete object.

---

## Data Models and Types

- **TrainingModule**: ([training.ts](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/types/training.ts)) Includes metadata, sections, flashcards, quiz questions, and study patterns.
- **AssessmentQuestion**: ([assessment.ts](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/types/assessment.ts)) Supports MCQ, Short Answer, Order Steps, Categorization, and Scenario Response.
- **Scenario**: ([scenarios.ts](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/types/scenarios.ts)) Defines steps, choices, outcomes, and ticket rubrics.
- **RoleplayScenario**: ([roleplayScenarios.ts](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/data/roleplayScenarios.ts)) Defines personas, archetypes, and IT challenges.
- **UserProgress**: ([progress.ts](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/lib/progress.ts)) The master object containing all attempts, feedback, and logs.

---

## Learning Mechanics

| Mechanic | Implementation | code Location |
| :--- | :--- | :--- |
| **Spaced Review** | Leitner System (5 boxes) with daily offsets (0, 1, 3, 7 days). | [spacedRepetition.ts](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/lib/spacedRepetition.ts) |
| **Weak Topic Tracking** | Aggregates low quiz scores into a "Weak Topic" registry. | [progress.ts](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/lib/progress.ts) |
| **Readiness Scoring** | Multi-factor weighted average: (Assessment * 0.4) + (Scenarios * 0.3) + (Note Quality * 0.2)... | [readinessMath.ts](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/lib/readinessMath.ts) |
| **Academic Bridging** | Connects theoretical SILOs to practical DCS "bridges." | [academicSubjects.ts](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/data/academicSubjects.ts) |
| **Active Recall** | "Explain Back" and "Cornell" prompts forced after reading. | [ModuleTabs.tsx](file:///c:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/src/components/modules/ModuleTabs.tsx) |

---

## Persistence and Local Storage
- **Primary Key**: `dcsprep_user_progress` stores the entire learning history.
- **Custom Keys**: `dcsprep_custom_modules`, `dcsprep_custom_roleplays`, etc.
- **Hydration Pattern**: Uses `useEffect` and `hasMounted` state checks across almost all pages to prevent Next.js SSR/Client mismatches.
- **Backup/Restore**: Serializes the progress object into a JSON file with an `app: 'DCSPrep'` header.

---

## UX / QA Observations
- **Polished**: The Readiness engine and the Scenario Lab's branching logic feel very robust. The "Skeleton Loading" added for custom content improves the feel.
- **Rough**: The "Supervisor" and "KB Lab" sections appear less feature-complete than the core Modules.
- **Navigation**: Sidebar navigation is consistent, but some nested routes (like `/academic-pd/subjects/[id]`) lack "Back" buttons in certain view states.
- **Labels**: "SILOs" and "Bridges" are DCS-specific terminology that might need a "New User" onboarding tooltips.
- **Responsive**: Some heavy tables in `supervisor` and `evidence-pack` likely struggle on small mobile screens.

---

## Professional Learning App Rating

| Section | Rating (1-10) | Notes |
| :--- | :--- | :--- |
| **Modules** | 8 | Better than standard LMS because of the "Questions First" pattern. |
| **Scenario Lab** | 9 | Very high impact for real-world school IT triage. |
| **AI Roleplay** | 7 | Good, but dependent on external Groq/LLM API stability. |
| **Readiness** | 9 | Unique "Evidence Driver" model is more honest than a simple % complete. |
| **Overall** | **7.5** | A high-utility internal tool bordering on a professional platform. |

---

## Biggest Learning Impact Opportunities
1. **Scenario Note Feedback**: Integrate AI to automatically score the ticket notes against the rubric in Scenario Labs.
2. **Readiness to Study Path**: Automatically generate a "Due Today" list based on the *weakest* readiness scores.
3. **Multi-Step Roleplays**: Allow Roleplay bots to "remember" state across multiple sessions for long-running incidents.
4. **Manager Evidence Export**: Add a "One-Click PDF" for the Evidence Pack for easier sharing with Paul/IT Manager.
5. **Real-time SLG Import**: Improve the `slg-import` tool to handle raw PDF uploads (currently manual/placeholder).
6. **Network Sim Integration**: Connect the `simulations/network` map to actual troubleshooting tasks.
7. **DCS-SSO Simulation**: Practice password resets and MFA troubleshooting in a fake Sentral/Azure portal.
8. **Interactive Rubrics**: Make the Scenario Lab rubrics clickable for AI feedback.
9. **Spaced Repetition Push**: Browser notifications for "Items Due Today."
10. **Offline Support**: PWA improvements to ensure custom content is cached for offline school use.

---

## Recommended Next 10 Features
1. **AI Rubric Grader**: Automated scoring for short-answer questions.
2. **Custom Content Editor**: A UI-based form to edit custom modules without touching JSON files.
3. **DCS Asset Catalog**: A searchable reference for common school hardware (ViewBoards, specific laptop models).
4. **Incident Post-Mortems**: A section for recording and reflecting on *real* school incidents (privacy-safe).
5. **Certification Goal Tracker**: Link modules to specific A+ or Microsoft exam objectives.
6. **Bulk Progress Export**: Export evidence for a specific date range (e.g., "Term 1 PD").
7. **Collaborative Content**: Allow sharing custom JSON modules via a "Community" tab.
8. **Dark Mode**: High-contrast mode for long study sessions.
9. **Voice-to-Note**: Use the browser's speech API to draft ticket notes.
10. **Interactive Network Map**: Clickable hotspots on the network diagram that link to diagnostic modules.

## Questions or Unknowns
- **AI API Keys**: Is there a shared key or is it user-provided? (Currently handled via server-side environment variables).
- **Scalability**: How large can the `UserProgress` object get in `localStorage` before performance degrades?
- **Data Integrity**: If the browser clears cache, all custom modules are lost—should we implement a "Sync to OneDrive" feature?