# Documentation Audit & Consolidation Plan

Scope
-----
Audit of all files in `docs/` in the clean clone at `C:\dev\ITPrep-vscode` (branch `msp-content-review`).

Inventory (top-level files and folders)
--------------------------------------
- `audit.md`
- `audits/` (folder)
- `CLIENT_OFFICE_SUPPORT_LAB_SPEC.md`
- `CONTENT_FILE_SPLIT_PROPOSAL.md`
- `dcsprep-upskilling-roadmap.md`
- `DEVELOPMENT.md`
- `Dubbo Christian School Library & ICT – Comprehensive Dossier.docx` / `.pdf`
- `FINAL_CONTENT_PRIVACY_REVIEW_CHECKLIST.md`
- `FIX_NOTES.md`
- `jira-vs-dcsprep-audit.md`
- `KNOWN_ISSUES.md`
- `MANUAL_PHONE_PWA_TEST_CHECKLIST.md`
- `MSP_CONTENT_QUALITY_REVIEW.md`
- `POST_MERGE_LIVE_QA_MATRIX.md`
- `PROJECT-AUDIT-SUMMARY.md`
- `TECHNICAL_HARDENING_REPORT.md`
- `TODO.md`, `_TODOMAY.md`, `_todotrae.md`
- `Upgrade ideas/` and other folders

Notes on content found
----------------------
- DCS-specific content: multiple files reference "DCSPrep" or "Dubbo Christian School" (e.g. `dcsprep-upskilling-roadmap.md`, the DOCX/PDF dossiers). These are school-specific artefacts and should be archived to an `archive/` area or kept in `docs/dcs/` if they must remain.
- Audit overlap: `audit.md`, `PROJECT-AUDIT-SUMMARY.md`, `TECHNICAL_HARDENING_REPORT.md`, `FIX_NOTES.md` and `KNOWN_ISSUES.md` contain overlapping audit and remediation notes — several recommendations conflict or are duplicated.
- TODOs: `TODO.md`, `_TODOMAY.md`, `_todotrae.md` and `Upgrade ideas/` contain distributed task lists that would be better consolidated.
- Governance vs specs: `DEVELOPMENT.md` and `CONTENT_FILE_SPLIT_PROPOSAL.md` are product/engineering facing; `MSP_CONTENT_QUALITY_REVIEW.md` and `CLIENT_OFFICE_SUPPORT_LAB_SPEC.md` are content/specs. Keep them separate but linked.

Stale or conflicting content
---------------------------
- `jira-vs-dcsprep-audit.md` and `dcsprep-upskilling-roadmap.md` contain older audit findings that pre-date the current MSP pass; mark as "superseded" and reference the newer `MSP_CONTENT_QUALITY_REVIEW.md` and `PROJECT-AUDIT-SUMMARY.md`.
- `FIX_NOTES.md` contains ad-hoc notes that overlap with `KNOWN_ISSUES.md`; recommend merging into a single living `KNOWN_ISSUES.md` with dated entries.

Recommendations: canonical sources of truth
------------------------------------------
- Canonical docs (recommended):
  - Governance: `docs/governance/RELEASE_NOTES.md` (drafts and final)
  - Product backlog & roadmap: `docs/roadmap/PRODUCT_BACKLOG.md` (this work)
  - Specs: `docs/specs/CLIENT_OFFICE_SUPPORT_LAB_SPEC.md`, `docs/specs/CONTENT_FILE_SPLIT_PROPOSAL.md`
  - Content quality: `docs/content/MSP_CONTENT_QUALITY_REVIEW.md`, `docs/content/FINAL_CONTENT_PRIVACY_REVIEW_CHECKLIST.md`
  - QA: `docs/qa/POST_MERGE_LIVE_QA_MATRIX.md`, `docs/qa/MANUAL_PHONE_PWA_TEST_CHECKLIST.md`
  - Audits & hardening: `docs/audits/TECHNICAL_HARDENING_REPORT.md` and `docs/audits/PROJECT-AUDIT-SUMMARY.md`

Recommended archival / merging
------------------------------
- Archive (move, mark superseded):
  - `dcsprep-upskilling-roadmap.md` → `docs/archive/dcsprep-upskilling-roadmap.md`
  - `Dubbo Christian School Library & ICT – Comprehensive Dossier.*` → `docs/dcs/` (if needed) or archive
  - `_TODOMAY.md`, `_todotrae.md` → merge into `TODO.md` or archive
- Merge proposals:
  - Merge `FIX_NOTES.md` into `KNOWN_ISSUES.md` (single living known-issues file, with sections per subsystem).
  - Consolidate audit outputs: combine `audit.md`, `PROJECT-AUDIT-SUMMARY.md`, and `TECHNICAL_HARDENING_REPORT.md` into `docs/audits/PROJECT-AUDIT-SUMMARY.md` with dated sub-sections. Keep originals as archived copies.

Naming conventions
------------------
- Lowercase, hyphen-separated for filenames: `kebab-case` (e.g., `client-office-support-lab-spec.md`).
- Group by purpose: `specs/`, `content/`, `qa/`, `audits/`, `governance/`, `dcs/`, `archive/`, `roadmap/`.
- Prefix drafts or superseded files with `superseded-YYYYMMDD-` or move to `archive/`.

Suggested folder structure
--------------------------
```
docs/
  specs/
    client-office-support-lab-spec.md
    content-file-split-proposal.md
  content/
    msp-content-quality-review.md
    final-content-privacy-review-checklist.md
  qa/
    post-merge-live-qa-matrix.md
    manual-phone-pwa-test-checklist.md
  audits/
    project-audit-summary.md
    technical-hardening-report.md
  governance/
    product-backlog.md
    release-notes/
  dcs/
    dcsprep-upskilling-roadmap.md
    Dubbo-...docx/pdf
  archive/
    superseded-*.md
```

Migration strategy (non-destructive)
------------------------------------
1. Create new folders and canonical stub files as above in a feature branch (no deletions).
2. Move or copy content into canonical locations incrementally (one merge at a time). Preserve original files until migration verified.
3. Deprecate old files by adding a single-line header: "SUPSERSEDED: moved to docs/<path> on YYYY-MM-DD".
4. After stakeholders review, remove archived files in a coordinated repo-cleanup PR.

Missing documentation
---------------------
- A single `docs/roadmap/PRODUCT_BACKLOG.md` (created in this task).
- Clear `docs/governance/CONTRIBUTING_DOCS.md` describing how to update content, ID conventions, and release workflow.
- Release checklist for content publishes and a publishing runbook for admins.

Minimal next actions (recommended)
----------------------------------
- Create `docs/roadmap/PRODUCT_BACKLOG.md` (this task will add it).  (P0: high value)
- Create `docs/governance/CONTRIBUTING_DOCS.md` describing content format and ID rules. (P1)
- Consolidate `FIX_NOTES.md` into `KNOWN_ISSUES.md` and mark the source files as archived (P2).

