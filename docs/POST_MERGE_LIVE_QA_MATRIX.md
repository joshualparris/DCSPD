# Post-Merge Live QA Matrix

Use this matrix after merging to `main` to validate the deployed Vercel preview and production site.

Columns: route | action | expected result | pass/fail | notes

## School IT Support mode
- route: / (dashboard)
  - action: Launch app, ensure `Career Focus` set to `School` (or default)
  - expected: School-focused recommendations and modules visible
  - pass/fail: 
  - notes:

- route: /modules
  - action: Filter by School modules
  - expected: Only School modules appear
  - pass/fail:
  - notes:

## MSP Transition mode
- route: / (dashboard)
  - action: Switch `Career Focus` -> MSP
  - expected: MSP-focused recommendations; MSP modules prioritized
  - pass/fail:
  - notes:

- route: /scenarios
  - action: Filter by MSP scenarios; open scenario; submit ticket note
  - expected: Scenario shows rubric, steps >=3, jiraNotePrompt present
  - pass/fail:
  - notes:

## Generic IT Foundations mode
- route: / (dashboard)
  - action: Switch `Career Focus` -> Generic/Foundation
  - expected: Foundation modules prioritized
  - pass/fail:
  - notes:

## Common checks
- mode switching persistence
  - route: any
  - action: Set career focus, reload page, confirm persisted
  - expected: choice persists in stored progress
  - pass/fail:
  - notes:

- dashboard recommendations
  - action: Verify recommendations match career focus
  - expected: MSP-specific whyItMatters text when MSP selected
  - pass/fail:
  - notes:

- module/scenario/roleplay/cheats filters
  - action: Apply filters and search
  - expected: Results match filters; no DCS-only content in MSP mode
  - pass/fail:
  - notes:

- evidence pack
  - route: /evidence-pack or scenario workflow
  - action: Generate evidence pack, download
  - expected: ZIP contains only synthetic data and required logs
  - pass/fail:
  - notes:

- progress export/import
  - action: Export progress, clear state, import
  - expected: Progress restored accurately
  - pass/fail:
  - notes:

- PWA & offline shell
  - action: Install PWA, go offline, relaunch
  - expected: App shell loads; critical routes available offline
  - pass/fail:
  - notes:

- mobile layout & accessibility
  - action: Run key pages through mobile viewport and screen reader
  - expected: Layout usable and keyboard accessible
  - pass/fail:
  - notes:

- privacy and content checks
  - action: Search for real client names, creds, IPs
  - expected: No real client/DCS-sensitive data
  - pass/fail:
  - notes:

