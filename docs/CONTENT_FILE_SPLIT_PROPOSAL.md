# Content File Split Proposal

Goal
----
Provide a maintainable file structure for content data that keeps files small, avoids merge conflicts, preserves IDs, and supports staged rollout.

Principles
----------
- Preserve all existing IDs in-place when moving content.
- Keep imports/exports stable (create barrel files where needed).
- Avoid circular dependencies by ensuring content files are pure data and reference modules by ID only.
- Separate content by domain and purpose: `DCS`, `MSP`, `Shared`, `Certification`.

Recommended structure
---------------------
```
src/data/
  modules/
    msp/
      msp-foundations.ts
      msp-stack-rmm-psa.ts
      msp-ticket-triage-escalation.ts
      index.ts (export barrel)
    dcs/
      hardware-classroom-support.ts
      networking-foundations.ts
      index.ts
    shared/
      foundations.ts
      index.ts
  scenarios/
    msp/
      msp-m365-signin-failure.ts
      msp-mfa-loop-or-prompt-stuck.ts
      ...
      index.ts
    dcs/
      dcs-library-printer-offline.ts
      ...
      index.ts
    shared/
      generic-identity-concern.ts
      index.ts
  roleplays/
    l1/
      msp-anxious-owner-internet-down.ts
      ...
      index.ts
    l2/
      l2-phishing-breach-defender-investigation.ts
      ...
  cheatSheets/
    msp/
      msp-psa-ticket-note-checklist.ts
      msp-rmm-triage-card.ts
      index.ts
    dcs/
      printer-troubleshooting.ts
      index.ts
  practicalOutputs/
    evidencePack.ts
    ticketTemplates.ts
  index.ts (top-level exports)
```

Migration strategy
------------------
1. Create new folders and barrel `index.ts` files in a feature branch.
2. Move one content file at a time (preserve original file until new file is validated).
3. Update top-level `src/data/index.ts` exports to include new barrels.
4. Run tests and type-check after each moved file.
5. Once all content is migrated, remove legacy aggregated files and update imports in app code.

Risks
-----
- IDs must be preserved exactly to avoid breaking references.
- Imports in UI or tests may point to old aggregated files—update gradually.
- Merging large moves can cause conflicts if other contributors modify the same files. Mitigate by coordinating staging windows and small, frequent commits.

Staged implementation plan
--------------------------
- Phase 1 (low risk): Create folder scaffolding and barrel files for `scenarios/msp` and `cheatSheets/msp`. Move 2-3 files and run tests.
- Phase 2: Move remaining MSP scenarios and roleplays in small batches; validate tests each step.
- Phase 3: Move DCS content into `dcs` folder and Certification content into `certification` folder.
- Phase 4: Replace top-level aggregated files with new imports, run full validation and CI.

