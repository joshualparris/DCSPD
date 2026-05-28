I'll summarize the initial QA/audit I ran, list findings, and propose next steps.

**Progress**
- **Completed:** Ran `next lint`, TypeScript check, and the test suite.  
- **In progress:** Dependency vulnerability review (`npm audit`).  
- **Next:** Decide whether I should apply dependency upgrades and deeper audits (accessibility, performance, security hardening).

**What I ran**
- `npm run lint` — no ESLint warnings/errors.
- `npx tsc --noEmit` — TypeScript checks (no errors).
- `npm test` — Vitest suite: 24 test files, 61 tests — all passed.
- `npm audit --json` — collected vulnerabilities.

Commands I ran (for your reference)
```bash
npm run lint
npx tsc --noEmit
npm test
npm audit --json
```

**Quick links**
- Scripts & deps: package.json  
- TS config: tsconfig.json  
- Known issues: KNOWN_ISSUES.md  
- PWA registration (console logs): PwaRegistration.tsx  
- AI coach API (server-side env, logging, JSON parsing): route.ts

**Findings (high level)**
- **Lint & Tests:** Clean — no lint errors and all unit tests pass.
- **TypeScript:** `strict: true` enabled; good coverage, no type errors observed.
- **Dependency vulnerabilities (from `npm audit`):** 11 total (1 critical, 4 high, 6 moderate). Notable items:
  - `vitest` — Critical advisory; fix available in `vitest@1.6.1`.
  - `next` — Multiple advisories affecting ranges <15.5.x; fix available in `next@16.2.6` (major). These advisories relate to Server Components, Image Optimizer, request deserialization — important for public deployments.
  - `eslint-config-next` / `@next/eslint-plugin-next` / `glob` — high severity; fix available via upgrading Next/ESLint config.
  - `zod` — moderate; upgrade to >=3.25.76 recommended.
  - `postcss`, `esbuild`, `vite`, `vite-node` — moderate; many fixes come via updating `vitest`/`vite` versions.
- **Server/API security:** API routes correctly use `process.env.GROQ_API_KEY` server-side (good). Several AI API routes log raw responses and include `console.log`/`console.error` for AI responses and model calls — these can expose sensitive provider output in logs; consider reducing or gating logs to debug mode.
- **Client-side logging:** PwaRegistration.tsx contains `console.log` on service worker registration success/failure. Consider switching to a controlled logger or dev-only logs.
- **OneDrive:** Repo is on OneDrive per workspace path — Known issues already mention OneDrive file-locking; recommend moving local working copy off OneDrive for builds/CI to avoid sync issues.
- **AI response handling:** route.ts implements robust parsing and JSON-extraction fallbacks — good defensive coding. However, logging raw AI text to server console could be sensitive.
- **No obvious dangerouslySetInnerHTML or direct innerHTML usage found.**
- **No client-exposed secrets found (no `NEXT_PUBLIC_` env variables discovered).**

**Recommendations — short list**
- Upgrade test/dev tooling immediately:
  - `vitest` → `1.6.1` (fixes critical RCE advisory affecting dev/test server).
- Plan a staged Next.js upgrade:
  - Consider targeting `next@16.2.6` (fixes many advisories). This is a major upgrade — do in a feature branch and run full test + manual QA.
- Upgrade other direct deps with advisories:
  - `zod` → >= `3.25.76`
  - `postcss` / `eslint-config-next` → aligned with targeted Next version (the audit suggests `eslint-config-next@16.2.6`).
- After upgrades:
  - Run `npm install`, `npm run build`, full test suite, and a manual smoke test of app flows (AI features, sync, PWA).
- Reduce log verbosity:
  - Replace `console.log`/`console.error` in server API AI routes and in PwaRegistration.tsx with a dev-only logger or guard by `process.env.NODE_ENV !== 'production'`.
- Create CI checks:
  - Add `npm run lint`, `npx tsc --noEmit`, and `npm test` to CI pipeline if not already present.
- Security hardening:
  - Review `next/image` and `remotePatterns` configuration to prevent DoS (audit flagged Image Optimizer issues).
  - Review server routes that accept arbitrary JSON or proxies (ensure rate-limiting, input validation, and sanitization where appropriate).
- Accessibility & Performance:
  - I recommend running an automated a11y sweep (axe / pa11y) and Lighthouse/perf audit on representative pages — I can run these next if you want.

**Safety notes**
- `npm audit fix --force` may introduce breaking changes (especially for `next` and major upgrades). Use a dedicated branch and test thoroughly.
- Upgrading `next` may require code changes (App Router behavior, middleware, etc.). Expect some migration work.

**Actions performed (2026-05-29)**
- Upgraded dev/test and library packages:
  - `vitest` -> 1.6.1
  - `zod` -> 3.25.76
  - `eslint` -> ^10.4.0
  - `eslint-config-next` -> 16.2.6
  - `next` -> 16.2.6
- Hardened logging:
  - Guarded client `console.log` in `src/components/shell/PwaRegistration.tsx` (dev-only)
  - Guarded server `console.log` / `console.error` in `app/api/ai/coach/route.ts` (dev-only)
- Type fixes:
  - Adjusted `normalizeTrainingModule` cast in `src/lib/customContentImport.ts` to avoid TS structural mismatch
  - Tightened `src/tests/customContentImport.test.ts` with a type guard so the test can access `training-module` fields safely
- Validation run:
  - `next lint` — no ESLint errors
  - `npx tsc --noEmit` — passed after fixes
  - `npm test` — all tests passed (64 tests)
- Performed `npm install` after upgrades (some peer-dependency warnings noted).

**Remaining issues / recommended next steps**
- `npm audit` still reports vulnerabilities (moderate/high) originating from transitive packages such as `postcss`, `esbuild`, `glob`, and some Next.js related advisories. Some fixes are semver-major and require careful migration testing.
- Recommend a staged upgrade and validation plan:
  1. Run `next build` and manually test server-rendered flows and AI routes.
  2. Address any runtime/migration issues introduced by Next 16 (App Router changes, middleware, image optimizer config).
  3. Update `postcss`/`esbuild`/`vite` toolchain as needed (may require Tailwind/PostCSS config updates).
  4. Add CI (if missing) that runs `npm run lint`, `npx tsc --noEmit`, `npm test`, and `npm audit` so we catch regressions early.
  5. Run automated accessibility (axe/pa11y) and Lighthouse audits and remediate top issues.

**Notes**
- I avoided `npm audit fix --force` because it can introduce breaking changes; upgrades were made deliberately.
- Because the project is on OneDrive, you may see file-locking or permission warnings during installs; consider moving to a local folder for heavy package operations.

If you'd like, I can now:
- 1) Create a PR branch and complete the remaining dependency/toolchain upgrades (more invasive), run `next build` and report required code changes; OR
- 2) Run automated accessibility and Lighthouse audits and produce a prioritized remediation list; OR
- 3) Add CI pipeline config (GitHub Actions) that runs lint/tsc/tests/audit on each PR.

Tell me which of 1–3 to proceed with and I will continue.