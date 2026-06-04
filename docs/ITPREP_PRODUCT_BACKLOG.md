# ITPrep Product Backlog (issue-ready)

Organized by priority: P0 (release-blockers), P1 (post-release improvements), P2 (future work), P3 (nice-to-have).

P0 — Release blockers
---------------------
- Title: Fix CI and Vercel preview failures
  - User value: Ensure PRs show accurate build/test results and previews for reviewers.
  - Problem: Local and CI builds are failing or inconsistent; `tsc`/`vitest` not running reliably in our environment.
  - Scope: CI config, package.json scripts, Playwright/CI pipelines, Vercel integration
  - Acceptance criteria: PRs trigger green CI and Vercel preview deploys; `npx tsc --noEmit` and `vitest run` succeed in CI.
  - Files/areas: `.github/workflows/*`, `package.json`, `next.config.mjs`, `playwright` config
  - Risks: CI time cost; flaky environment differences (Windows vs Linux)
  - Dependencies: access to CI logs, Vercel project setup
  - Complexity: Large
  - Owner: Trae
  - When: Now

- Title: Preserve content IDs and verify no duplicates across content files
  - User value: Keep content stable and avoid broken references
  - Problem: Large files with many IDs increase merge conflict risk
  - Scope: Add checks in CI to detect duplicate IDs
  - Acceptance criteria: CI job fails PR with duplicate ID report
  - Files: `src/data/*`, CI scripts
  - Risks: False positives if migration in progress
  - Complexity: Medium
  - Owner: Copilot
  - When: Now

P1 — Post-release improvements
------------------------------
- Title: Career Focus / Support Mode integration hardening
  - User value: Consistent career mode persistence and recommendations
  - Problem: `careerMode` tests fail locally (progress persistence issues)
  - Scope: progress store, career focus setters, recommendations engine
  - Acceptance criteria: All `careerMode` tests pass; recommendations differ for MSP vs School
  - Files: `src/lib/progress.ts`, `src/hooks/*`, `src/tests/careerMode.test.ts`
  - Risks: Touches UI logic; coordinate with Trae
  - Complexity: Medium
  - Owner: Cursor
  - When: After CI stability

- Title: Manual phone PWA testing & fixes
  - User value: Reliable mobile experience for testers and learners
  - Problem: PWA and offline behaviours need manual verification
  - Scope: Fix manifest, service worker, and offline shell behavior
  - Acceptance criteria: Checklist in `docs/` passes on at least two device types
  - Files: `public/manifest.json`, `sw.js`, `app/*`
  - Complexity: Medium
  - Owner: Josh
  - When: After release

P2 — Future product work
------------------------
- Title: Client Office Support Lab implementation
  - User value: A practice lab for MSP-first learners
  - Problem: Spec exists but not implemented end-to-end
  - Scope: simulation backend, scoring, scenario integrations
  - Acceptance criteria: Lab available behind MSP mode; unit tests for scoring; E2E mocks for RMM
  - Files: `src/data/*`, new `labs/` feature, tests
  - Complexity: Large
  - Owner: Copilot / Trae
  - When: Later

- Title: Content file splitting (scalable structure)
  - User value: Reduce merge conflicts and improve maintainability
  - Problem: Large aggregated content files cause collisions
  - Scope: Implement `src/data/{msp,dcs,shared}` split as per proposal
  - Acceptance criteria: Tests pass after incremental moves; barrel exports work
  - Files: `src/data/*`
  - Complexity: Medium
  - Owner: Copilot
  - When: Later

P3 — Nice-to-have ideas
------------------------
- Title: Dark mode and high-contrast accessibility review
  - User value: Better accessibility and contrast
  - Problem: Visual regressions possible; not fully audited
  - Complexity: Small
  - Owner: Trae
  - When: Not yet

- Title: Dependency upgrade sweep and deprecation cleanup
  - User value: Security and maintainability
  - Problem: Outdated packages in devDependencies
  - Complexity: Medium
  - Owner: Copilot
  - When: Not yet

Top cross-cutting backlog items
-------------------------------
- Admin publishing workflow (P1): safe publish, staging and rollback
- Accessibility improvements (P1): a11y tests and fixes
- Production release notes and runbook (P0 -> P1): create stable release checklist

