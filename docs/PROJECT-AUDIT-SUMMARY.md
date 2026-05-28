# Project Audit — DCSPrep Evidence Sheet

## Project Identity

- **Project name:** DCS Prep (repo name DCSPD)
- **Exact path:** `C:\Users\joshua.parris\OneDrive - Dubbo Christian School\Documents\DCSPrepApp`
- **Purpose:** Next.js professional development app for DCS IT support training, scenario practice, assessment, and progress tracking
- **Source of truth?** Yes
- **Classification:** Active source repo, portfolio/training use only
- **Risk level:** Medium (OneDrive file-locking risk, zip duplicates, dev logs in root)
- **Professional value:** 7/10 — Good training/portfolio app, but not aligned with current Avance MSP focus

---

## Git Status

- **Is it a Git repo?** Yes
- **Branch:** main
- **Remote:** `origin https://github.com/joshualparris/DCSPD.git`
- **Latest commit:** `1ab2a89 (HEAD -> main, origin/main, origin/HEAD) Finish remaining app polish items`
- **Git status:** **clean** ✓
- **Modified files:** 0
- **Untracked files:** 0
- **Deleted files:** 0

---

## Stack

- **Framework:** Next.js 14.2.35
- **UI:** React 18.2.0, Tailwind CSS 3.4.10, Lucide React
- **State management:** Zustand 4.4.0
- **Validation:** Zod 3.21.4
- **PDF support:** pdf.js-dist
- **Package manager:** npm
- **Testing:** Vitest

---

## Repository Risks

| Risk | Evidence | Severity |
|------|----------|----------|
| OneDrive location | Project on OneDrive; KNOWN_ISSUES.md warns of file-locking risk | Medium |
| Zip duplicates | `DCSPrepApp.zip`, `DCSPrepApp (2).zip` in parent Documents folder | Low |
| Dev logs in root | `.next-dev-*.log` files in root directory | Low |
| Build artifacts | `DCSPDTimeManagement.zip` (696 KB) in root | Low |

---

## Security Hygiene

- **.env or .env.local:** `.env.local` present (not read; secret protection)
- **.npmrc or credentials:** Not found
- **Assessment:** ✓ Environment variables isolated in .env.local

---

## First Safe Actions

1. **Confirm git is clean**
   ```bash
   git status
   ```
   (Should return no changes)

2. **Document as portfolio/training app**
   - Update README to clarify this is a training tool
   - Note that primary focus is now MSP work at Avance, not DCS systems

3. **Plan to archive duplicates**
   - Move `DCSPrepApp.zip` and `DCSPrepApp (2).zip` from parent Documents folder to external archive
   - Delete `.next-dev-*.log` files
   - **Do not delete yet** — plan only

---

## Recommendation

**DCSPrep is technically healthy but should be treated as a secondary portfolio/training project.**

Your primary professional focus is now Avance Professional Development (MSP/IT support learning). Keep DCSPrep maintained but do not allocate significant development time until Avance work is stable.

See the full audit in JoshHub docs for context on all 7 local projects.
