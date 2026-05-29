# DCSPrep Current Roadmap

Updated: 2026-05-29

This is the current source of truth for what is done, what was upgraded in the latest passes, and what remains open. The app is now a local-first DCS IT professional-development platform with Academic PD, AI grading, evidence logging, roleplay coaching, skill recommendations, certificates, admin tools, simulations, exports, and backup/sync support.

## Completed Core Platform

- [x] DCS IT support modules with question-first learning.
- [x] Scenario Lab with support-note evidence.
- [x] Strict quiz, spaced repetition, weak-topic review, and readiness scoring.
- [x] PD Log, Evidence Pack, Feedback Log, and AI Coaching History.
- [x] Skill Coach with recommendations, badges, labs, and 20-minute workouts.
- [x] Roleplay Bot with Level 1 and Level 2 school IT scenarios.
- [x] PWA/offline foundation with manifest, icon, shortcuts, and route caching.
- [x] Academic PD dashboard covering RBC and SMITB subjects.
- [x] Weekly LMS-style subject blocks with integrated AI-graded assessments.
- [x] Subject progress bars based on logged assessment completion.
- [x] Evidence Pack pulls completed Feedback Log activity.

## Completed In This Upgrade

- [x] Added `/certificates` for printable/exportable badge certificates.
- [x] Added certificate HTML generation from Skill Coach badge evidence.
- [x] Added Skill Coach link to export certificates.
- [x] Added Settings progress backup export and import.
- [x] Added progress backup schema validation and normalization.
- [x] Added Academic PD per-SILO completion indicators.
- [x] Added subject-specific flashcards generated from SILOs, mastery criteria, and knowledge checks.
- [x] Added final challenge submission checklists with saved local completion state.
- [x] Updated documentation so completed items are ticked and remaining items are not overstated.
- [x] Added `/admin` as a hub for SLG import, content governance, integrations, and sync.
- [x] Added `/admin/slg-import` for pasted SLG/PDF text draft parsing into SILOs and weekly modules.
- [x] Added `/admin/content` for review queue, last-reviewed metadata, stale/source-check flags, and subject draft export.
- [x] Added `/admin/integrations` for SCORM-style manifest, HRIS template CSV, and supervisor CSV exports.
- [x] Added `/sync` plus `/api/progress-sync` as a first server-side progress snapshot adapter.
- [x] Added `/simulations/classroom-desk` for virtual classroom display/cable/Wi-Fi troubleshooting.
- [x] Added `/voice-to-ticket` for speech-to-ticket practice with typed fallback.
- [x] Added `/hardware` as a DCS hardware catalogue with safe checks and escalation triggers.
- [x] Added `/supervisor` for a read-only, privacy-safe manager analytics view.
- [x] Added `/kb-sync` for OurDCS-ready Markdown/HTML article export.
- [x] Added `/mobile-qa` for PWA install/offline/mobile QA tracking.
- [x] Added `/certifications/aplus-core-2` as a 74-lesson CompTIA A+ 220-1202 Core 2 pathway based on the Professor Messer course index.
- [x] Added per-lesson read/watch links, official resources, DCS IT application notes, and AI-graded assessment prompts.
- [x] Added multiple-choice quick checks plus long-form AI feedback to every Core 2 lesson assessment.
- [x] Added certification assessment attempt storage so Core 2 combined scores, MCQ scores, and long-form AI scores persist in DCSPrep progress and PD evidence.
- [x] Added Core 2 certification attempts to the Feedback Log and Evidence Pack evidence summaries.
- [x] Added `/cheat-sheets` for printable, privacy-safe quick-fix support sheets covering ViewBoard/audio, PaperCut, Wi-Fi, login/MFA, onboarding, and website filtering.
- [x] Added `/ticket-data-import` for synthetic ticket CSV import, category/priority/channel summaries, keyword extraction, privacy warnings, and Markdown export.
- [x] Added `/recent-updates` plus a dashboard preview so new and changed features link directly to their app routes.
- [x] Added network-map learning hotspots so topology nodes link directly to relevant diagnostic modules.
- [x] Added `/admin/custom-content` for form-based custom module and roleplay creation without hand-editing JSON.
- [x] Added `/peer-review` for Paul-style senior-tech critique of ticket notes and escalation quality.

## Still Open

- [x] Full binary PDF text extraction for SLG import, not just pasted/copied PDF text.
- [x] Direct publish workflow from admin draft JSON into the custom Academic PD catalogue (`/admin/slg-import`, localStorage rollback).
- [ ] Authenticated cloud database sync across devices with user identity, backups, and conflict handling.
- [ ] Mobile/offline QA on an actual phone install, offline launch, and route caching.
- [ ] Live OurDCS API/write integration after governance approval.
- [ ] Live LMS/HRIS integration or full SCORM package export after system/API decisions.
- [x] Quick-fix printable cheat sheets.
- [x] Add A+ Core 1 220-1201 pathway with read/watch/assess lessons (`/certifications/aplus-core-1`).
- [x] Add Network+ N10-009 and Security+ SY0-701 pathways with the same pattern.
- [x] Synthetic ticket CSV importer for data-analysis practice.
- [x] Peer review simulation for senior-tech critique.
- [x] Curated weekly PD path mixing modules, scenarios, certification, Academic PD, and evidence (`/weekly-pd-path`).
- [x] GitHub Actions CI (`lint`, `tsc`, `vitest`, `next build`).
- [ ] Social learning features, if a privacy-safe governance model is approved.
- [ ] Browser push notifications (scaffold exists; production policy still open).
- [ ] Full Professor Messer lesson-index import for Core 1 / Network+ / Security+ (current pathways use domain lesson blocks).

## Not In This Slice

- [ ] Level 3 IT Director roleplays are intentionally not added in this implementation pass, per the latest request.

## Recommended Next Order

1. Replace the local sync adapter with an authenticated cloud database provider.
2. Run mobile/offline QA on an actual phone and fix any install/cache issues.
3. Expand Core 1 / Network+ / Security+ lesson indexes to full video-level coverage like Core 2.
4. Live OurDCS and LMS/HRIS integrations after governance/API decisions.
5. Final privacy and Level 1 boundary review across all content.
