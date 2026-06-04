# ITPrep — Technical hardening report

**Branch:** `chore/technical-hardening-ci`  
**Date:** 2026-06-04  
**Scope:** CI, smoke tests, dependency audit, logging, repo hygiene (no feature or content changes)

---

## 1. Baseline (clean `HEAD` on branch; local uncommitted WIP excluded)

| Check | Result | Notes |
|--------|--------|--------|
| `npm ci` | Pass | Node 22.13+ |
| `npm run lint` | Pass (with warnings) | 62× `react-hooks/set-state-in-effect` downgraded to **warn** for usable CI |
| `npx tsc --noEmit` | Pass on committed tree | Local WIP referencing `careerFocus` fails until merged or reverted |
| `npm test -- --run` | **28 files / 70 tests** pass | After restoring corrupted `academicSubjects.ts` |
| `npm run build` | Pass on committed tree | Same WIP caveat |
| `npm audit` | **2 moderate** | Transitive `postcss` via `next` (see §5) |

**Local blocker:** Uncommitted edits to `app/page.tsx`, `Sidebar.tsx`, `app/academic-pd/page.tsx`, etc. reference `profile.careerFocus` without a type definition — run builds from a clean tree or finish that feature branch separately.

---

## 2. Changes made

### Continuous integration (`.github/workflows/ci.yml`)

- **Job `quality`:** `npm ci` → lint → `npm run typecheck` → `npm run test:ci` → `npm audit --audit-level=high` → `npm run build`
- **Job `e2e`:** Playwright on Chromium + Pixel 5 viewport after production build
- Node **22.13.0**, npm cache, concurrency cancel, Playwright artifact upload on failure

### Scripts (`package.json`)

- `typecheck`, `test:ci`, `test:e2e`, `test:e2e:ci`
- DevDependencies: `@playwright/test`, `@axe-core/playwright`

### Browser smoke tests (`e2e/smoke.spec.ts`)

- Routes: `/`, `/modules`, `/scenarios`, `/settings`, `/evidence-pack`, `/simulations/roleplay`
- `manifest.json` and `/sw.js` availability
- Offline reload shell visibility (not a substitute for manual device PWA QA)

### Accessibility (`e2e/accessibility.spec.ts`)

- axe-core scans on `/`, `/modules`, `/settings` — fail on **serious/critical** only
- Keyboard focus smoke on dashboard
- **Low-risk fixes:** `role="main"` + `id="main-content"` on root layout `<main>`; `aria-label` on sidebar search submit (fixes axe `button-name` on critical routes)

### Logging (`src/lib/logger.ts`)

- `devLog` / `devDebug` — development only
- `logApiError` — production-safe messages (no raw prompts or AI bodies)
- AI routes updated: `coach`, `roleplay`, `note-generator`
- PWA registration already gated (unchanged)

### Secrets review

- No `NEXT_PUBLIC_*` API keys found
- `GROQ_API_KEY` / `GROQ_MODEL` remain server-only

### Repo hygiene

- Expanded `.gitignore` (`.next`, env files, Playwright output, zip archives, baseline scratch files)
- `docs/DEVELOPMENT.md` — OneDrive guidance and command reference
- `vitest.config.ts` — explicit test include path

### ESLint

- `react-hooks/set-state-in-effect` → **warn** (hydration from `localStorage` is intentional; full fix is a product refactor)

---

## 3. Remaining vulnerabilities (`npm audit`)

| Package | Severity | Path | Advisory | Why it remains |
|---------|----------|------|----------|----------------|
| `postcss` | Moderate | `next` → nested `postcss` | [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) | Bundled inside Next 16.2.6; npm suggests downgrade to Next 9 (invalid). |
| `next` | Moderate | direct | Via postcss | Requires **planned** Next patch/minor upgrade when upstream updates nested PostCSS. |

**CI policy:** `npm audit --audit-level=high` — moderate advisories do not fail the pipeline.

**Recommended follow-up:**

1. Watch Next.js 16.2.x / 16.3.x release notes for PostCSS ≥ 8.5.10 in the bundle.
2. Re-run `npm audit` after any Next bump; run full `test:ci` + `test:e2e:ci`.
3. Do **not** run `npm audit fix --force`.

Direct devDependency `postcss@^8.5.10` is already current; the nested copy under `next` is the gap.

---

## 4. Accessibility — documented for product agent

Automated axe may still report **moderate** issues (colour contrast on slate text, duplicate landmarks from sidebar + main). These need design review rather than drive-by CSS changes.

Suggested backlog:

- Ensure each page has a single visible `<h1>` after hydration loaders
- Audit dark-mode contrast tokens globally
- Add skip link to `#main-content`
- Replace `<select>`-based concept sorts with keyboard-friendly controls on mobile (existing audit item)

---

## 5. Tests executed (hardening branch)

```text
npm ci
npm run lint
npm run typecheck
npm run test:ci
npm audit --audit-level=high
npm run build
npm run test:e2e:ci   # after playwright install
```

---

## 6. Blockers / handoff

| Item | Owner |
|------|--------|
| Merge `careerFocus` / MSP WIP with `UserProfile` type updates | Feature branch |
| OneDrive → non-synced dev clone | Developer environment |
| Manual PWA offline on deployed host (SW disabled on localhost) | QA / product |
| Next.js upgrade for PostCSS advisory | Platform |

---

*This report supersedes scratch baseline files (`.baseline-*.txt`) for engineering sign-off.*
