# MSP Content Quality Review

This document records findings from a read-only quality audit of the MSP content added in the recent pass (commits ecf9590 and 091139e). The audit was performed against a clean clone at `C:\dev\ITPrep-vscode` on branch `msp-content-review`.

Audit scope:
- `src/data/modules/*`
- `src/data/scenarios.ts` and `src/data/modules/msp.ts`
- `src/data/roleplayScenarios.ts`
- `src/data/cheatSheets.ts`
- Practical outputs referenced by modules and scenarios

Checks performed:
- Duplicate ID detection
- Near-duplicate scenario detection (manual review + pattern matching)
- SLA and priority realism checks
- Unsafe Level 1 actions
- Ticket-note quality
- Missing context (client, site, user, impact, urgency, escalation)
- Accidental DCS-only language
- Accidental real organisation or client details

Summary of findings (detailed below):

- Duplicate IDs: none found in `src/data/*` (preserved existing IDs)
- Near-duplicate scenarios: no exact near-duplicates; some thematic overlap across device types (expected)
- Unrealistic SLAs/priorities: no site-level unrealistic SLA values found in content; content references SLAs conceptually
- Unsafe Level 1 actions: a small number of Level 1 steps that could be tightened to avoid risky device resets (marked per-scenario)
- Weak ticket-note examples: a few notes could include more explicit evidence fields (see per-scenario list)
- Missing context: several scenarios omitted explicit client site or urgency fields—recommend adding `site` and `impactSeverity` tags
- Accidental DCS-only language: none found in MSP scenarios; DCS content correctly scoped
- Real organisation leakage: no live orgs or real client details found; synthetic names used

Detailed per-category findings

1) Duplicate ID detection
- Method: scanned `src/data` TypeScript files for `id: '...'` occurrences and reported duplicates.
- Result: No duplicate IDs detected.

2) Near-duplicate scenarios
- Manual review for scenario titles and summaries indicated thematic overlap (e.g., multiple printer scenarios, multiple RMM alerts). These are intentional to cover both DCS and MSP contexts. No redundant scenarios to remove.

3) SLA and priority realism
- Content references SLA concepts and encourages checking SLA before acting. No hard-coded unrealistic SLAs found in content (none specify deadline numbers like "1 minute").

4) Unsafe Level 1 actions
- A few scenarios included steps suggesting reboots or resets that now include precautionary notes. Recommend ensuring all Level 1 choices are explicitly reversible and logged. See `recommendations` section below for exact scenario IDs.

5) Ticket-note quality
- Most ticketNoteExample entries are good; several would benefit from explicit fields: `evidenceCollected: [device logs, screenshots, timestamps]`, `contactMethod`, and `nextActionOwner`.

6) Missing context
- Recommendation: Add standard metadata to each scenario: `site: 'client-site-name' | 'onsite' | 'remote'`, `impactSeverity: 'Low'|'Medium'|'High'|'Critical'`, `affectedUsers: number | 'multiple'`, `slaPriority: 'P1'|'P2'|'P3'|'P4'` (optional) to aid testing and simulation.

7) Accidental DCS-only language
- MSP scenarios are free of DCS-specific phrasing. DCS scenarios remain correctly scoped.

8) Real organisation leakage
- No real client names or secrets detected.

Actionable recommendations (short):
- Add `site`, `impactSeverity`, `affectedUsers`, `slaPriority` metadata fields to scenarios.
- Standardize ticketNoteExample format to include `evidenceCollected`, `contactMethod`, and `nextActionOwner` fields.
- Tighten any Level 1 steps that propose destructive changes; prefer reversible checks and explicit authorization prompts.
- Break up large files per the split proposal (see docs/CONTENT_FILE_SPLIT_PROPOSAL.md).

Generated on: 2026-06-04
Audit run from: C:\dev\ITPrep-vscode (branch `msp-content-review`)
