# DCSPrep Known Issues

Current known issues and limitations.

---

## v0.2.x - IT PD Cockpit (Next.js 16)

### Non-Critical Issues

1. **npm Audit — 2 moderate advisories remain**
   - Description: `postcss <8.5.10` is pulled in transitively via `next`. The only
     automated fix is `npm audit fix --force`, which downgrades Next.js to 9.x — a
     breaking change. Left in place deliberately.
   - Impact: None for this app's usage. `npm audit --audit-level=high` passes (CI gate).
   - Resolution: Wait for a Next.js patch that bumps the bundled postcss. Do NOT run
     `npm audit fix --force`.

2. **Lint warnings: `react-hooks/set-state-in-effect` (~54)**
   - Description: Pages read browser-only localStorage in a mount effect
     (`useEffect(() => setProgress(getStoredProgressSnapshot()), [])`). The lint rule
     flags every `setState` inside an effect.
   - Impact: None — this is the intentional SSR-safe hydration pattern; deps are `[]`
     so they run once. CI does not fail on warnings.
   - Note: Keep the rule on. A genuine variant of this pattern (an effect that
     depended on a value it also set) caused a real infinite-render loop on `/modules`
     that this rule helped surface. See FIX_NOTES.md.

3. **OneDrive File Locking**
   - Description: Running the app from a OneDrive-synced folder may cause file locking.
   - Resolution: Use a local drive for development/production.

### Known Limitations

1. **localStorage only** — all progress, PD log, and spaced-repetition data live in the
   browser. Clearing site data resets progress. Mitigation: Settings → Export regularly.
2. **No authentication** — personal PD tool; anyone with the URL can access. Keep all
   entries privacy-safe (no real student/staff/credential/network data).
3. **Estimate-based readiness** — readiness profiles start at 0% until assessment data
   exists; early scores are informal estimates.
