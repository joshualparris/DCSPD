# DCSPrep Fix Notes

Document of fixes applied to the DCSPrep IT PD Learning Cockpit.

---

## v0.2.0 - IT PD Cockpit (2026-04-30)

### Fixed Issues

1. **Spaced Repetition Module Conflict**
   - Issue: Original `spacedRepetition.ts` had different exports than new IT PD code needed
   - Fix: Added new PD-prefixed functions alongside original functions
   - Files: `src/lib/spacedRepetition.ts`

2. **Import Path Errors**
   - Issue: Dashboard importing `getDueCount` but file exported `getPDDueCount`
   - Fix: Updated imports to use new PD-prefixed function names
   - Files: `app/page.tsx`, `app/due-today/page.tsx`

3. **Build Warning - next.config.mjs**
   - Issue: `experimental.appDir` is deprecated in Next.js 14.2+
   - Status: Warning only, doesn't affect functionality
   - Fix: Can be removed in future update (not critical)

### Package Versions (Locked)

```json
{
  "next": "14.2.35",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.275.0",
  "zustand": "^4.4.0",
  "zod": "^3.21.4",
  "typescript": "^5.2.2",
  "tailwindcss": "^3.4.10",
  "vitest": "^1.3.0"
}
```

---

## v0.1.0 - Original DCSPrep

### Original Fixes
- (Document any fixes from original app here)