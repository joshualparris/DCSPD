# DCSPD QA Audit - 2026-05-29

## Scope

Audited the local DCSPrep/DCSPD Next.js app in:

`C:\Users\joshua.parris\OneDrive - Dubbo Christian School\Documents\DCSPrepApp`

Primary requested fix: allow multiple generated JSON custom-content files to be uploaded from `/settings`.

## Verification Run

| Check | Result |
| --- | --- |
| `npm run lint` | Passed, no ESLint warnings or errors |
| `npm test -- --run` | Passed, 25 test files and 64 tests |
| `npm run build` | Passed, 58 routes generated |
| `npm audit --audit-level=moderate` | Failed due dependency advisories |
| Local route check | `http://localhost:3000/settings` returned 200 OK |

## Implemented Fix

The Settings custom-content importer now supports selecting multiple JSON files at once.

Files changed for this feature:

- `app/settings/page.tsx`
- `src/lib/customContentImport.ts`
- `src/tests/customContentImport.test.ts`

Behavior:

- The generated JSON input now uses the `multiple` file attribute.
- Each selected file is parsed independently.
- Valid files continue importing even if another selected file is invalid.
- The status message reports successful imports and failed items.
- The importer also supports a generated JSON payload shaped as `{ "items": [...] }`.
- Existing generated module normalization was preserved, including default module-pattern fields and short-answer rubric object cleanup.

## Findings

### High Priority

1. Dependency audit still has security advisories.
   - Current audit reports 10 vulnerabilities: 6 moderate and 4 high.
   - Major clusters: Next.js 14.2.35, PostCSS, Vitest/Vite/esbuild, ESLint Next tooling, brace-expansion.
   - Avoid `npm audit fix --force` on main because it wants major upgrades such as Next 16 and Vitest 4.

2. Public deployment still needs a staged framework upgrade plan.
   - The app builds cleanly locally, but Next.js has multiple advisories in the installed range.
   - Recommended path: create a branch for Next/React/tooling upgrades, run full test/build, then smoke test AI routes, settings imports, PWA, sync, modules, and assessment pages.

3. The repo is still inside OneDrive.
   - Builds and tests pass, but there were transient dependency/build failures during parallel verification.
   - This matches the existing OneDrive file-locking warning and should be treated as real operational risk.

### Medium Priority

4. User-visible mojibake exists in learning content.
   - `src/data/modules.ts` contains misencoded apostrophes, arrows, dashes, quotes, and Wi-Fi text in many newer content entries.
   - This does not break builds, but it makes the app feel less polished.

5. Several runtime areas still rely on broad `any` casts.
   - Examples include scenario grading, AI route request history, PDF extraction, homepage question options, and settings import normalization.
   - Current behavior works, but stronger schemas would make generated-content imports safer.

6. Console logging has been reduced in current dirty worktree changes outside this importer.
   - `app/api/ai/coach/route.ts` and `src/components/shell/PwaRegistration.tsx` already contain local changes that gate or reduce logging.
   - Keep those changes if the goal is safer production logs.

### Low Priority

7. Root dev logs and generated artifacts accumulate.
   - `.next-dev-*.log` files are present in the repo root.
   - They are useful for local debugging but add clutter.

8. The app is still local-storage first.
   - This is consistent with the personal PD/privacy model.
   - If DCSPD becomes multi-device or public-user facing, authentication, sync ownership, backup UX, and data-retention boundaries need a proper product pass.

## Recommended Next Work

1. Deploy the multi-file settings importer to Vercel after reviewing the full working tree.
2. Clean the misencoded text in `src/data/modules.ts`.
3. Run a staged dependency upgrade branch:
   - First safe patch/minor upgrades where possible.
   - Then a separate Next major upgrade.
4. Add a browser smoke test for `/settings` custom-content import so future regressions are caught beyond unit tests.
5. Move the active working copy out of OneDrive for heavy development.
