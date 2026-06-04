# ITPrep MSP Pivot — Release Notes (Draft)

Overview
--------
This draft summarises the upcoming MSP-focused content and governance changes. It is a draft and not a declaration of production deployment.

What's included (high level)
- Transition framing: DCSPrep → ITPrep (clarifies multiple career focuses)
- Modes: School IT Support mode, MSP Transition mode, Generic IT Foundations mode
- Expanded MSP content: modules, scenarios, roleplays, cheat-sheets
- CI improvements: Playwright smoke tests and security hardening
- Safer logging and repo hygiene changes

Known limitations
- Manual phone PWA testing remains required (see `docs/MANUAL_PHONE_PWA_TEST_CHECKLIST.md`)
- Some lint warnings in UI remain (react-hooks warnings); these are being triaged and will be fixed separately
- Career Mode logic requires careful integration testing (progress persistence)

Release guidance
- Do not treat this draft as proof of deployment. Merge and deploy only after CI and Vercel preview are green.
- Ensure content privacy checklist is run before any release (see `docs/FINAL_CONTENT_PRIVACY_REVIEW_CHECKLIST.md`).

Acknowledgements
- Content additions preserved commit hashes: `ecf9590`, `091139e`

