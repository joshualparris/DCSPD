# ITPrep — Release checklist

**Release candidate branch:** `integration/release-candidate` (create after Trae merge)  
**Infrastructure branch:** `chore/technical-hardening-ci` @ `091139e` (includes `ac79fe7`)  
**Target production:** Vercel — `main` branch  
**Date:** _______________  
**Sign-off:** Josh _______________

---

## Pre-release gates

Complete every item. Mark **Pass / Fail / N/A** and add notes for any failure.

### 1. Lint

```powershell
npm run lint
```

| Status | Notes |
|--------|-------|
| ☐ Pass ☐ Fail | Zero **errors** required. Warnings (`react-hooks/set-state-in-effect`) acceptable per hardening policy. |

---

### 2. Typecheck

```powershell
npm run typecheck
```

| Status | Notes |
|--------|-------|
| ☐ Pass ☐ Fail | Must pass with Trae `careerFocus` types merged — no `@ts-ignore` shortcuts. |

---

### 3. Unit tests

```powershell
npm run test:ci
```

| Status | Notes |
|--------|-------|
| ☐ Pass ☐ Fail | Expect ≥28 test files. Confirm `careerMode.test.ts`, `moduleMath.test.ts`, scenario tests green. |

---

### 4. Production build

```powershell
npm run build
```

| Status | Notes |
|--------|-------|
| ☐ Pass ☐ Fail | No TypeScript or Next.js build errors. Check for missing module imports after merge. |

---

### 5. Dependency audit

```powershell
npm audit --audit-level=high
```

| Status | Notes |
|--------|-------|
| ☐ Pass ☐ Fail | Moderate PostCSS advisory via Next is **expected** — document if present. No high/critical unmitigated. |

---

### 6. Playwright (local)

```powershell
npx playwright install chromium
npm run test:e2e:ci
```

| Status | Notes |
|--------|-------|
| ☐ Pass ☐ Fail | 12+ tests: smoke routes, manifest/SW, offline shell, axe a11y on `/`, `/modules`, `/settings`. |

**Routes exercised:**

- `/`, `/modules`, `/scenarios`, `/settings`, `/evidence-pack`, `/simulations/roleplay`

---

### 7. GitHub Actions

Push branch and confirm workflow **CI** completes:

| Job | Status | Notes |
|-----|--------|-------|
| ☐ quality (lint, typecheck, test, audit, build) | ☐ Pass ☐ Fail | |
| ☐ e2e (Playwright) | ☐ Pass ☐ Fail | Download artifact if e2e fails. |

PR URL: _______________________________________________

---

### 8. Vercel preview deployment

| Check | Status | Notes |
|-------|--------|-------|
| Preview URL generated for PR | ☐ Yes ☐ No | |
| Preview builds without error | ☐ Pass ☐ Fail | |
| Preview loads `/` dashboard | ☐ Pass ☐ Fail | |
| Preview loads `/modules` including MSP module | ☐ Pass ☐ Fail | |
| Preview loads `/scenarios` | ☐ Pass ☐ Fail | |
| Preview loads `/cheat-sheets` | ☐ Pass ☐ Fail | |
| Preview loads `/simulations/roleplay` | ☐ Pass ☐ Fail | |
| Preview `/settings` — Career Focus + Support Mode | ☐ Pass ☐ Fail | |

Preview URL: _______________________________________________

---

### 9. Production deployment

**Only after all above pass and PR merged to `main`.**

| Check | Status | Notes |
|-------|--------|-------|
| Vercel production deploy triggered | ☐ Yes ☐ No | |
| Production build succeeded | ☐ Pass ☐ Fail | |
| Production URL loads | ☐ Pass ☐ Fail | |
| `GROQ_API_KEY` set in Vercel (server) | ☐ Verified | No `NEXT_PUBLIC_` secrets. |

Production URL: _______________________________________________

---

### 10. Live app QA (browser)

Tester: _______________  Date: _______________

| Area | Check | Pass |
|------|-------|------|
| Dashboard | Welcome / training cockpit loads; Career Focus visible if configured | ☐ |
| Modules | Foundations, Networking, **MSP** module open and complete a section | ☐ |
| Scenarios | Run `no-internet-classroom` — 3 steps, correct escalation path | ☐ |
| Roleplay | At least one new MSP persona loads and responds | ☐ |
| Cheat sheets | New practical sheets render | ☐ |
| Settings | Save Career Focus + Support Mode; reload — values persist | ☐ |
| Evidence pack | Export / view still works | ☐ |
| AI coach | Coach route returns (with valid API key) — no raw errors in UI | ☐ |
| Dark mode | Toggle if enabled — no layout break | ☐ |
| Mobile width | Resize to ~390px — nav usable | ☐ |

---

### 11. Manual phone PWA test (Josh)

Device: _______________  OS/browser: _______________

| Step | Pass |
|------|------|
| Open production URL in mobile browser | ☐ |
| Add to Home Screen / Install PWA | ☐ |
| Launch from home screen icon — app shell loads | ☐ |
| Navigate Modules → Scenarios offline **after** prior online visit (cached shell) | ☐ |
| Confirm `manifest.json` name/icons correct | ☐ |
| Confirm no console errors on cold start | ☐ |

**Note:** Service worker registration is disabled on `localhost`. Full offline cache behaviour must be tested on **deployed** host.

---

## Release decision

| Decision | ☐ Go ☐ No-go |
|----------|-------------|
| Merged to `main` commit | |
| Production deploy verified | |
| Rollback owner if needed | Josh |

### If No-go

1. Do not promote production.  
2. Follow rollback in `docs/ITPREP_INTEGRATION_PLAN.md` §8.  
3. Log issue in `docs/FIX_NOTES.md`.

---

## Quick command block (copy-paste)

```powershell
cd C:\dev\ITPrep-cursor
npm ci
npm run lint
npm run typecheck
npm run test:ci
npm audit --audit-level=high
npm run build
npm run test:e2e:ci
```

---

*Prepared alongside `docs/ITPREP_INTEGRATION_PLAN.md` — 2026-06-04*
