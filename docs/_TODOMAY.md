Detailed Analysis of DCSPD App and DCSProfessionalDevelopment App
Expanding the identified improvement areas
1. Content coverage gaps
What’s missing: The existing modules in DCSPD and DCSProfessionalDevelopment cover hardware and network fundamentals but do not address several modern responsibilities for school IT support:
1.	Microsoft Intune/MDM administration – Modern schools rely on mobile‑device management (MDM) tools such as Microsoft Intune to configure, secure and manage student and staff devices. Microsoft’s Intune fundamentals learning path teaches how to manage devices and apps, configure security rules, deploy compliance policies, enrol devices and protect data[1]. Staff need practical knowledge of enrolling devices, creating compliance policies and remotely wiping lost devices. These topics are currently absent from both apps.
2.	Cybersecurity awareness and incident response – The Texas School Safety Center emphasises that K‑12 districts must understand evolving cyber threats and be prepared for the “before, during and after” of a cyber incident[2]. Their recommended training covers risk awareness, preparation and incident recovery[3]. Neither app currently covers phishing awareness, password hygiene, incident reporting, or basic incident response frameworks (e.g., NIST 800‑61).
3.	Device imaging and deployment workflows – Best‑practice articles on computer imaging recommend planning the imaging process, choosing appropriate imaging software, keeping base images generic and updated, creating reference images for different use‑cases and documenting workflows[4][5]. Modules could teach imaging tools (e.g., Windows Deployment Services) and the differences between imaging and provisioning.
4.	Cloud fundamentals – An introductory module could explain that cloud computing provides on‑demand computing resources via the internet, allowing organisations to access computing power, storage and networking without owning the infrastructure[6]. It could introduce IaaS, PaaS and SaaS models[7] and discuss public, private and hybrid clouds[8]. Understanding these concepts helps staff support SaaS platforms like Office 365 or Google Workspace.
5.	Accessibility and inclusive design – e‑learning content should be designed for users with visual, auditory, motor or cognitive impairments. Strategies include conducting accessibility audits, ensuring compliance with Web Content Accessibility Guidelines (WCAG), providing alternative text and clear colour contrast, and implementing universal design principles[9]. The apps currently have inconsistent accessibility features and could standardise them.
Why this matters: Without modules covering Intune/MDM, cybersecurity, imaging workflows and cloud services, the apps are unlikely to prepare staff for the reality of modern school IT support. By adding these topics and refreshing the content regularly, the apps can remain relevant and reduce reliance on external courses.
2. Gamified progression and badges
Gamification adds game‑mechanics such as points, badges and leaderboards to motivate learners. Training‑Central notes that combining microlearning and gamification keeps lessons short and engaging and makes progress visible[10]. Microlearning focuses on delivering a single concept in 3–10‑minute units to reduce cognitive load and improve retention[11]. Gamification layers points, badges, leaderboards and streaks onto the content to tap intrinsic motivators like achievement and competition[12]. Immediate feedback, progress bars and badges encourage adults to continue learning[13].
Expansion ideas:
•	Leaderboards and streaks: Introduce weekly or monthly leaderboards that rank participants based on points earned. Display streaks for consecutive days of study to encourage consistency.
•	Micro‑rewards: Award “micro‑rewards” (e.g., digital stickers or small points) for completing micro‑sessions, answering reflection questions, or helping peers.
•	Progress bars and milestones: Show a visual progress bar for each module; celebrate milestones (e.g., 25 %, 50 % complete) with congratulatory badges.
•	Social challenges: For modules that lend themselves to collaboration, create optional peer‑to‑peer challenges (e.g., “solve this troubleshooting scenario faster than your colleague”).
•	Personalised badges tied to real tasks: Gamification should connect to workplace tasks; for example, awarding a badge after imaging a device or deploying a new Intune compliance policy.
3. Mobile and offline access
The EdApp offline‑mode article explains that offline mode allows learners to download training to their devices and complete modules without internet connectivity; progress syncs later, enabling training “anytime and anywhere” and reducing data costs[14]. This is valuable for busy support staff who may study during commutes or while waiting for a ticket. Both apps are currently web‑only and require stable internet.
Improvements:
•	Progressive Web App (PWA) – Convert each app into a PWA so users can install it on mobile devices. Use a service worker to cache assets and course content for offline use.
•	Offline downloads – Allow users to download specific modules or scenarios to their device. Once downloaded, the app should allow completion offline and sync results on reconnection.
•	Responsive design: Ensure all UI components adapt to small screens, with large tap targets and clear typography.
•	Push notifications: Use the Notification API to remind learners when new modules are available, when a certificate is about to expire, or when a reflection activity is due. Notifications should respect do‑not‑disturb settings to avoid distraction.
4. Depth and cognitive load
Microlearning’s strength is in delivering short, focused lessons. However, complex topics require more depth. Training‑Central emphasises that microlearning reduces cognitive load by focusing on a single outcome[15], but this also limits how much content can be delivered at once. Micro sessions should not replace more comprehensive study. Additionally, the Learning Guild warns that compressing content without considering cognitive load can cause confusion and “extraneous cognitive overload”[16].
Mitigations:
•	Provide optional “deep‑dive” modules that allow learners to explore topics in greater depth (e.g., a two‑hour lab on imaging or an interactive Intune configuration simulator).
•	Use microlearning for reinforcement, not full instruction. Each micro‑module should link to resources such as videos, articles or full courses on the DCSPD portal.
•	Include short reflection questions or journalling prompts after micro‑modules to encourage consolidation of learning.
5. Context switching and cognitive load
Micro‑sessions can be convenient but may also cause cognitive load if staff attempt them during busy support periods. The Learning Guild notes that microlearning is effective when it reinforces existing knowledge or prompts reflection[16], but micro tasks inserted into hectic days may distract from critical IT support tasks.
Suggestions:
•	Schedule suggestions: Provide a scheduling tool or calendar integration that suggests when to complete a micro‑module (e.g., after lunch or during quiet periods). Encourage learners to set aside uninterrupted time, even if only five minutes.
•	Focus mode: Offer a “focus mode” that hides notifications and emphasises a single task. After a micro‑session, display a quick summary and a prompt to resume work.
•	Adaptive pacing: Detect when a user has been inactive or appears to be multitasking; offer to pause or defer the session to avoid fragmented learning.
6. Offline features and push notifications
In addition to offline module downloads, both apps could enhance usability with:
•	Background sync: Use IndexedDB or similar storage to cache user progress and sync with the server when connectivity returns.
•	Push reminders: For example, after completing an Intune module, send a notification three days later to remind the learner to practise the skill. Use analytics to ensure notifications remain helpful, not overwhelming.
7. Expanding content areas
Modern IT support domains to cover:
•	Device management and Intune: Intune modules should cover device enrolment, compliance policies and conditional access[1].
•	Cybersecurity fundamentals: Introduce modules on phishing awareness, password management, two‑factor authentication, ransomware prevention and incident reporting. Include incident response basics and reference the NIST 800‑61 framework (e.g., prepare, detect, respond, recover), reflecting the Texas School Safety Center’s emphasis on integrating cybersecurity into school emergency operations plans[2].
•	Imaging and deployment: Create step‑by‑step labs on creating reference images, updating drivers and testing deployments[5]. Use interactive scenarios where learners must choose the correct imaging method.
•	Cloud services: Explain what cloud computing is (on‑demand access to computing resources over the internet) and its service models (IaaS, PaaS, SaaS)[17]. Show how to troubleshoot issues with Office 365 or Google Workspace.
•	Accessibility & assistive tech: Teach WCAG guidelines, including how to add alt text, use high‑contrast themes, enable keyboard navigation and test with screen readers[9].
•	Communication and soft skills: Include modules on interacting with teachers and students, explaining technical issues clearly, and maintaining calm during incidents.
8. Emotional and embodied learning
Mindfulness training has been shown to reduce stress and anxiety[18], improve focus and academic performance[19], and strengthen emotional regulation[20]. Short breathing exercises and stretches can improve physical health[21] and ethical behaviour[22]. To address the user’s desire for more embodied learning, micro‑modules could integrate:
•	Mindful breathing breaks: Add a one‑minute guided breathing exercise at the start or end of each micro‑session.
•	Body‑scan prompts: Encourage learners to notice tension in their shoulders or jaw before tackling a scenario.
•	Reflection questions: Ask learners how they felt during a troubleshooting scenario and what emotions arose.
These practices help staff remain grounded and reduce the disembodied feeling often associated with screen‑based work.
9. External certifications and recognition
CompTIA A+ and ITIL certifications are globally recognised. Earning A+ certification validates hardware and software knowledge and can open career opportunities[23]. Over one million IT professionals hold A+ certification, and companies such as Dell, Intel and HP require it for service technicians[24]. Employers like Microsoft, IBM and HP prefer candidates with A+ certification and often fund the training[25]. Mapping the apps’ modules to certification objectives (e.g., CompTIA A+ hardware, networking, troubleshooting; ITIL foundations of incident and change management) would provide learners with transferable credentials and motivate participation.
Implementation ideas:
•	Clearly label modules that prepare learners for specific certification exam objectives.
•	Offer practice exams and simulated scenarios aligned to CompTIA A+ or ITIL topics.
•	Partner with certification providers to allow discounted exam vouchers or digital badges.
•	Display certification badges on the user’s profile within the platform.
10. Accessibility and security
Accessibility
The eLearning Industry article outlines a plan for successful e‑learning accessibility: conduct accessibility audits, train educators, choose an accessible LMS, create accessible course content (alt text, clear fonts, logical organisation, colour contrast), implement Universal Design for Learning principles, collaborate with accessibility experts, involve learners in providing feedback and update accessibility policies regularly[26]. Both apps should adopt these practices:
•	Accessibility audits: Integrate automated tools (e.g., axe-core) into the development pipeline to catch WCAG violations.
•	Alt text and captions: Ensure all images and videos have descriptive alt text or captions. Use large, high‑contrast fonts.
•	Keyboard navigation: Guarantee that all interactive elements can be accessed via keyboard alone and provide visible focus outlines.
•	Universal Design: Offer multiple ways to consume content (video, text, audio) and allow users to adjust font sizes and themes.
Security
Articulate’s security best‑practices article identifies eight critical features for protecting learner data: compliance with data protection regulations, strong encryption at rest and in transit, role‑based access control (RBAC), single sign‑on (SSO) and multi‑factor authentication (MFA), data residency transparency, secure APIs, encrypted backups with disaster recovery plans, and privacy controls allowing data portability and the right to be forgotten[27]. The current apps rely on simple authentication and may not meet these standards.
Enhancements:
•	Compliance: Evaluate whether hosting on Vercel meets Australian data‑privacy regulations. Consider migrating to a platform with SOC 2 or ISO 27001 certification.[28].
•	Encryption: Encrypt data at rest (e.g., using AES‑256) and enforce HTTPS with TLS 1.2/1.3 for all connections[29].
•	RBAC: Implement roles (admin, educator, learner) and restrict data access accordingly[30].
•	SSO/MFA: Integrate with Azure AD for single sign‑on and enable MFA options[31].
•	Secure APIs: Harden APIs by using OAuth tokens, rate limiting, IP whitelisting and input validation[32].
•	Backup & disaster recovery: Create encrypted backups and define recovery objectives[33].
•	User privacy: Provide options for data export, deletion and opt‑out of analytics[34].
Coding prompts for VS Code (Codex/Copilot)
Below are suggested prompts to give Copilot/Codex in VS Code. Each set corresponds to one laptop: Laptop 1 (DCSPD App) and Laptop 2 (DCSProfessionalDevelopment). The prompts assume the apps are built with modern JavaScript/TypeScript frameworks (e.g., React/Next.js) and use a backend for data storage. Adjust file names and frameworks to match the actual codebase.
Prompts for Laptop 1 (working on the DCSPD App)
1.	Add new content modules
# Create a new folder `modules/intune` and add a React component `IntuneModule.tsx` to teach Microsoft Intune fundamentals.  The module should include sections on device enrolment, compliance policies, app deployment and conditional access, using headings and bullet points based on Microsoft’s learning path[1].  Export a metadata object with title, description and completion points.

# Repeat this pattern to add `CybersecurityBasicsModule.tsx` (cover phishing awareness, password hygiene and NIST 800‑61 incident response phases[2]), `ImagingBestPracticesModule.tsx` (cover imaging process planning, generic base images and documentation[5]), and `CloudFundamentalsModule.tsx` (explain cloud computing, IaaS/PaaS/SaaS and deployment models[17]).

# Update the course index (e.g., `modules/index.ts`) to include these modules so they appear in the UI.
1.	Implement gamified progression
# Add a `GamificationContext` using React Context API.  It should track user points, badges and streaks.  Provide functions to `addPoints(amount)`, `awardBadge(name)` and `incrementStreak()`.  Persist progress to `localStorage` or your database.

# Create a `Leaderboard.tsx` component that fetches the top 10 users’ points from the backend and displays their names, points and current streaks.  Style it with a table or list and call it from the dashboard.

# Modify each module component to call `addPoints` when a section is completed and `awardBadge` for major milestones (e.g., completing all Intune lessons).  Display a toast notification when a badge is awarded to provide immediate feedback[12].
1.	Add offline capability and push notifications
# Install and configure the `next-pwa` package (or equivalent) to turn the app into a Progressive Web App.  In `next.config.js`, enable service worker generation and specify caching strategies for static assets and API responses.  Ensure that modules marked as downloadable are cached for offline use.

# Create a custom hook `useOfflineDownload` that downloads a module’s JSON/MDX content and stores it in IndexedDB for offline access.  Provide UI buttons on each module page to “Download for offline use”.  When offline, load content from IndexedDB instead of the network.

# Implement push notifications using the Notification API.  Request permission from the user when they install the PWA.  When a module is due for review, call `navigator.serviceWorker.ready.then(swReg => swReg.showNotification('Time to review Intune compliance policies!'))`.  Ensure notifications are only sent at reasonable times and respect user settings.
1.	Integrate mindfulness exercises
# Create a component `MindfulnessPause.tsx` that displays a short breathing exercise or body scan using an animated SVG or simple instructions.  Provide a “Start pause” button that runs a 1‑minute timer.  At the end of each module, prompt the user to take a pause to reduce stress and improve focus[35].

# Allow users to opt out or schedule mindfulness reminders.
1.	Add external certification alignment
# For each module, add a `certificationMapping` field indicating which CompTIA A+ or ITIL objectives it covers.  Use this metadata to generate a “Certification Progress” page showing how many exam objectives the learner has completed[23].

# Create a `PracticeExam.tsx` component that pulls multiple-choice questions from a local `examQuestions.json` file.  After each quiz, display the score and suggest which modules to revisit.
1.	Improve accessibility and security
# Run an accessibility audit using `eslint-plugin-jsx-a11y` and fix errors.  Ensure all images have descriptive `alt` attributes and that interactive elements are keyboard accessible[9].

# Add ARIA labels to buttons and forms.  Provide a high‑contrast theme toggle in the settings.

# Implement role‑based access control on the backend.  Define roles (`admin`, `educator`, `student`) and restrict API routes accordingly[30].

# Enable HTTPS and configure the server to use TLS 1.2/1.3.  Encrypt sensitive data at rest using AES‑256[29].  Add support for SSO/MFA using Azure AD[31].
Prompts for Laptop 2 (working on the DCSProfessionalDevelopment app)
1.	Create micro‑learning scenarios with depth
# Refactor the `ScenarioRunner` component to support a “deep dive” mode.  When the user selects this mode, load additional resources (videos, articles, labs) after the micro scenario completes.

# Add a new set of scenarios under `content/security` covering phishing awareness, incident reporting and password policies.  Each scenario should include a short story, a few decision points and reflection questions.

# Implement a “ReflectionJournal` feature that lets users record their thoughts and emotions after completing a scenario.  Save entries to IndexedDB and sync them with the server.
1.	Introduce social and collaborative gamification
# Add a `TeamChallenges` page where learners can join teams and compete in weekly challenges (e.g., “Complete three scenarios on imaging this week”).  Display team standings using a leaderboard.

# Implement a `PeerFeedback` component that allows learners to review each other’s solutions to scenarios and give constructive feedback.  Award points for helpful feedback and badge users who consistently help peers.
1.	Implement offline scenario downloads and push reminders
# Use a service worker to cache scenario JSON files and media assets so that the app works offline.  Provide a “Download scenario” button on the scenario list page.

# Implement push notifications via the service worker to remind users of scheduled scenarios or to encourage completion of in‑progress ones.  Use tags to group notifications and avoid duplicates.
1.	Expand content and integrate certifications
# Add modules on cloud computing fundamentals (definition, service models and deployment models)[17], imaging workflows[5] and Intune administration[1].  Link each micro‑scenario to relevant certification objectives (CompTIA A+, ITIL) and display this mapping on the scenario details page.

# Create a `CertificationDashboard` component that shows overall progress towards CompTIA A+ and ITIL certification, using the certification mapping metadata.  Include links to take full practice exams.
1.	Mindfulness and embodied learning integration
# Add a `WellbeingWidget` to the scenario pages.  This widget should offer short mindfulness exercises (e.g., breathing, stretching) before or after scenarios[36].  Use React state to track whether the exercise was completed and award a small badge for participation.

# Provide tips for maintaining calm during high‑pressure scenarios, encouraging users to pause, breathe and notice their body sensations.
1.	Accessibility and security enhancements
# Perform an accessibility audit and fix issues: ensure proper semantic HTML, alt text, ARIA roles and keyboard navigability[9].  Provide a dark mode and adjustable font size to accommodate visual needs.

# Secure backend APIs with token‑based authentication and implement RBAC for administrators, trainers and learners[30].  Encrypt sensitive user data and enforce HTTPS.  Add MFA support via OTP or authenticator apps[31].

# Document a disaster recovery plan and enable automated encrypted backups for user progress and journal entries[33].
Final considerations
Both the DCSPD App and DCSProfessionalDevelopment App provide a solid foundation for micro‑learning, but they need to evolve to cover emerging technologies, strengthen gamification, enable offline/mobile access, deepen learning and support emotional wellbeing. By incorporating the research‑driven recommendations above and using the suggested VS Code prompts, you can systematically enhance each platform. These improvements will ensure that your professional‑development tools stay relevant to modern school IT support, promote engagement and well‑being, and align with industry certifications.
________________________________________
[1] Microsoft Intune fundamentals - Training | Microsoft Learn
https://learn.microsoft.com/en-us/training/paths/endpoint-manager-fundamentals/
[2] [3] Cybersecurity Toolkit | Texas School Safety Center
https://txssc.txstate.edu/tools/cybersecurity-toolkit/2-trainings
[4] [5] Computer imaging best practices | SmartDeploy
https://www.smartdeploy.com/blog/computer-imaging-best-practices/
[6] [7] [8] [17] Cloud Computing 101: Understanding the Basics and Benefits
https://openmetal.io/resources/blog/what-is-cloud-computing/
[9] [26] Accessibility In Institutions Through eLearning Implementation
https://elearningindustry.com/comprehensive-guide-on-strategically-implementing-elearning-accessibility-in-institutions
[10] [11] [12] [13] [15] Microlearning And Gamification: Benefits, Tips, Examples – Training Central
https://www.training-central.net/2026/04/09/microlearning-and-gamification/
[14] Offline Mode | SC Training (formerly EdApp) Microlearning LMS | SC Training (formerly EdApp): A Mobile LMS
https://training.safetyculture.com/offline-mode/
[16] Designing Microlearning That Works: Applying Cognitive Load Theory in Practice - Learning Guild
https://www.learningguild.com/articles/designing-microlearning-that-works-applying-cognitive-load-theory-in-practice
[18] [19] [20] [21] [22] [35] [36] The Benefits of Mindfulness to Students: based on science | NorthBridge College
https://nbbtcollege.ca/blog/the-science-backed-benefits-of-mindfulness
[23] [24] [25] CompTIA A+ Benefits: Boost IT Career QuickStart Guide
https://www.quickstart.com/blog/cloud-computing/6-advantages-of-comptia-a-certification/
[27] [28] [29] [30] [31] [32] [33] [34] 8 E-Learning Platform Security Best Practices: How to Protect Learner Data | Articulate
https://www.articulate.com/blog/8-e-learning-platform-security-best-practices-how-to-protect-learner-data/


📋 Outstanding To-Do Items
P0 (Stability) - 1 Remaining
 Move the app out of OneDrive if file locking keeps happening
Impact: File locking issues during npm run dev and builds can occur
Status: Not done yet, but workaround exists (exclude .next from sync)
All Other P0-P7 Items - COMPLETED ✓
Everything else in the optimized roadmap is marked complete, including:

P0: Build stability, lock package versions, ensure build/dev/test work
P1: Core DCS IT cockpit, question-first learning engine, highest-priority modules (8 domains)
P2: Strongest scenario lab (10+ scenarios), strengthened assessment engine, deeper technical judgement
P3: Support-quality outputs, practical templates, knowledge-base authoring
⚠️ Known Issues & Limitations
Non-Critical Issues
next.config.mjs warning - resolved; `next.config.mjs` no longer uses the deprecated appDir setting
npm audit warnings - 9 vulnerabilities (5 moderate, 4 high) - do NOT run npm audit fix --force
OneDrive file locking - running from OneDrive may cause build conflicts
Known Limitations
localStorage only - No persistent database; data resets if browser cache cleared
No authentication - App is designed for personal PD use (anyone with URL can access)
Estimate-based readiness - Starts at 0% until real assessment data is collected
🎯 What's Been Completed
Content Coverage (✓ All Done)
10 major modules covering DCS workflow (login/password, printer, classroom tech, permissions, access, onboarding, Teams/SharePoint, Parent Portal, Sentral, iPad/Jamf)
80+ question bank with plausible distractors
10+ real-world scenarios with Jira-style escalation notes
Retrieval-first design: diagnostic questions → flashcards → scenarios → practical outputs
Features Implemented (✓ All Done)
Dashboard with quiet-window PD recommendations
Focus blocks (tiny, 20-min, overwhelmed modes)
Spaced repetition with Leitner-style flashcard buckets
Scenario lab with transcript capture & coach feedback persistence
A+ Core 2 CompTIA pathway (74 lessons with assessment)
Evidence pack with Markdown export
Knowledge-base authoring workflow
Roleplay feedback tracking with transcript persistence
Readiness profiles based on real evidence (assessments, scenarios, outputs)
📊 Remaining Backlog Context
From Jira Ticket Analysis
The _Jira analysis.txt identifies Top 10 recurring enquiry themes that could be addressed via self-service:

Printing/Photocopier Issues (5.9% of tickets) - Module exists ✓
Classroom Tech Problems (5.6%) - Module exists ✓
Parent Portal Registration (5.1%) - Module exists ✓
Sentral Usage Issues (4.1%) - Module exists ✓
Parent Portal Details Updates (3.6%) - Module exists ✓
Login/Password (3.0%) - Module exists ✓
Access Permissions (2.7%) - Module exists ✓
Wi-Fi Connectivity (0.9%) - Module exists ✓
Website Filtering (1.3%) - Module exists ✓
New User Onboarding (0.8%) - Module exists ✓
Estimate: 20-30% of DCS tickets (~300-450/year) could be deflected with self-service content. All 10 core modules are already implemented in the app.

🔄 Summary of What Remains
Item	Status	Priority
Move app out of OneDrive	Not Started	P0 (Stability)
Remove next.config.mjs warning	Done	Low
Add persistent database	Not Started	Future Enhancement
Add real authentication	Not Started	Future Enhancement
Content additions	Blocked until above done	None - content complete
Essentially: The app is feature-complete and content-complete for its current scope. The only pending P0 item is the OneDrive infrastructure move.

I checked the Markdown/text docs, TODOs, roadmap files, known issues, inline TODO-style markers, routes, and current code. The short version: the core app is mostly built. What is left is mostly hardening, integrations, polish, and future expansion, not the main learning platform.

Use [RBC/DCSPrep_Current_Roadmap.md](<C:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/RBC/DCSPrep_Current_Roadmap.md:51>) as the current source of truth. Some older docs are stale and still list items that are now implemented.

**Still Left**
- Full binary PDF SLG extraction. Current SLG import only handles pasted/copied text.
- Direct admin publishing from draft JSON into `academicSubjects.ts` or a safer source catalogue.
- Authenticated cloud database sync with user identity, conflict handling, and backups. Current `/sync` is only a local server snapshot.
- Real phone PWA/offline QA, then fix any install/cache/mobile issues found.
- Live OurDCS integration, and live LMS/HRIS or full SCORM export after governance/API decisions.
- [x] Quick-fix printable cheat sheets for common issues like ViewBoard, PaperCut, Wi-Fi, login support. Implemented 2026-05-14 via `/cheat-sheets`, `src/data/cheatSheets.ts`, and `src/tests/cheatSheetsAndTicketImport.test.ts`.
- Certification expansions: A+ Core 1 220-1201, Network+ N10-009, Security+ SY0-701.
- [x] Synthetic ticket CSV importer for data-analysis practice. Implemented 2026-05-14 via `/ticket-data-import`, `src/lib/ticketCsvImport.ts`, and `src/tests/cheatSheetsAndTicketImport.test.ts`.
- Peer review / senior-tech critique simulation.
- Optional social learning, leaderboard, push notifications, audio summaries, dark mode/high contrast, ambient sounds.
- Final privacy and Level 1 boundary review across all content.
- User testing with IT staff, content review, deployment/training.
- Move the project out of OneDrive if file locking keeps recurring.

**Docs That Need Cleanup**
- [x] [README.md](<C:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/README.md:83>) linked to `TODO.md`, but the actual files are `docs/TODO.md` and `toDOlist.md`. Fixed 2026-05-14.
- [x] [docs/dcsprep-upskilling-roadmap.md](<C:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/docs/dcsprep-upskilling-roadmap.md:326>) listed backlog items like `/evidence-pack`, Start Tiny, and focus modes that are already implemented. Fixed 2026-05-14.
- [x] [RBC/Academic_PD_Implementation_Status.md](<C:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/RBC/Academic_PD_Implementation_Status.md:327>) still had unchecked admin/import/governance items that newer docs and code show as mostly done. Fixed 2026-05-14.
- [x] [KNOWN_ISSUES.md](<C:/Users/joshua.parris/OneDrive - Dubbo Christian School/Documents/DCSPrepApp/KNOWN_ISSUES.md:9>) still mentioned the old `experimental.appDir` warning, but `next.config.mjs` no longer has that setting. Fixed 2026-05-14.

**Health Check**
- `npm test -- --run`: passed, 21 test files / 53 tests after adding cheat sheets and synthetic ticket import coverage.
- `npm run build`: passed, 54 static pages generated after clearing stale generated `.next` cache.
- `npm audit --json`: still reports 9 vulnerabilities, 5 moderate and 4 high. Fixes require semver-major upgrades, so this should be handled deliberately, not with `npm audit fix --force`.

Bottom line: next best implementation order is PDF extraction, direct admin publishing, real cloud sync, real mobile/offline QA, then certification-path expansion. Quick-fix cheat sheets and synthetic ticket CSV import are now complete.
