# DCSPrep Fix Notes

Document of notable fixes applied to the DCSPrep IT PD Learning Cockpit.

---

## v0.2.x - QA pass (2026-06-25)

### Fixed Issues

1. **Infinite render loop on `/modules`** (app-wide freeze)
   - Issue: The modules list effect depended on the memoized `modules` array, which is
     recreated every render (it depends on `progress`). Calling `setProgress` inside
     that effect changed `progress` → new `modules` reference → effect re-fired →
     endless re-render that saturated the main thread, so clicks stopped registering
     after visiting `/modules`.
   - Fix: Depend on `customModules` and build the snapshot list locally.
   - File: `app/modules/page.tsx`

2. **`/manifest.json` returned 500**
   - Issue: A static `public/manifest.json` collided with the dynamic
     `app/manifest.json/route.ts` ("conflicting public file and page file").
   - Fix: Removed the static file; the dynamic route (with shortcuts) is the single source.

3. **Daily streak reset across timezones**
   - Issue: `recordDailyActivity` computed "yesterday" with `toISOString()` (UTC) while
     `getTodayDateKey()` uses local date parts. In non-UTC timezones (the app targets
     AEST) the keys disagreed, resetting the streak to 1 on consecutive local days.
   - Fix: Derive yesterday from the local today key via `addDays(today, -1)`. Added
     `src/tests/streak.test.ts`.
   - File: `src/lib/progress.ts`

4. **`/strict-quiz` read `searchParams` synchronously**
   - Issue: Next.js 16 makes `searchParams` a Promise; sync access is unsupported.
   - Fix: Made the page `async` and `await searchParams`.
   - File: `app/strict-quiz/page.tsx`

5. **Accessibility — icon-only buttons with no name**
   - Issue: MindfulnessPause play/pause and reset buttons failed the axe `button-name`
     check (critical) on `/modules`.
   - Fix: Added `aria-label`s.
   - File: `src/components/mindfulness/MindfulnessPause.tsx`

6. **CI hardening**
   - Escaped an apostrophe failing `react/no-unescaped-entities` (daily-challenge).
   - Resolved a high-severity `vite` advisory via non-breaking `npm audit fix`.
   - Named the `postcss.config.mjs` default export (`import/no-anonymous-default-export`).

### Navigation

- Surfaced previously-unlinked routes in the sidebar: Scheduler, Skill Coach,
  Learning Paths, Progress Overview, Supervisor. Raised the expandable group
  max-height (24rem → 40rem) so the now-8-item Progress group is not clipped.
  File: `src/components/shell/navigation.ts`, `src/components/shell/Sidebar.tsx`

### Current stack (informational)

`next@16.2.6`, `react@18.2.0`, `typescript@5.2.2`, `tailwindcss@3.4.10`,
`vitest@4.1.7`, `zustand@4.4.0`, `zod@3.25.76`.
