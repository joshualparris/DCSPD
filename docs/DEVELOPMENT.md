# ITPrep — Safe local development

## Recommended working copy

Keep the canonical Git clone **outside OneDrive** (for example `C:\dev\ITPrep` or `~/projects/ITPrep`).

OneDrive can lock files under `.next/` during `next dev` or `next build`, which causes intermittent `EBUSY` or stale build errors. If you must keep a copy in OneDrive for backup, use it for documents only and develop from a non-synced clone.

To reduce sync conflicts when the repo must live in OneDrive:

- Exclude `.next/`, `node_modules/`, and `playwright-report/` from sync if your client allows folder exclusions.
- Stop the dev server before OneDrive performs a large sync.

## Commands

```powershell
npm ci
npm run lint
npm run typecheck
npm run test:ci
npm run build
npm run test:e2e
```

## Environment variables

| Variable | Scope | Purpose |
|----------|--------|---------|
| `GROQ_API_KEY` | Server only | AI coach, roleplay, note generator |
| `GROQ_MODEL` | Server only | Optional model override |

Do **not** prefix API keys with `NEXT_PUBLIC_`. Client bundles must not embed provider secrets.

## CI

GitHub Actions runs lint, TypeScript, Vitest, `npm audit` (high+), production build, and Playwright smoke/a11y checks on pushes and pull requests to `main`.
