# Client Office Support Lab - Specification

Purpose
-------
Create a realistic MSP-mode simulation lab inside ITPrep that exercises first-line support for common small-office client issues. The lab is a scored, scenario-driven interactive simulation used for assessment and practice by learners transitioning to MSP roles.

User flow
---------
1. Learner selects `Career Focus: MSP` (UI unchanged).
2. In MSP Mode, the `Client Office Support Lab` appears as a dedicated module with a step-based mission:
   - Briefing: client profile, SLA basics, site layout
   - Reproduce: safe checks, scope identification
   - Triage: multi-step decisions (M365, printer, network, 3CX, RMM, phishing)
   - Evidence: gather screenshots, logs, and ticket notes
   - Escalate: prepare vendor evidence pack
   - Debrief: scored feedback and suggested learning modules

Synthetic client environment
----------------------------
- Client: `Acme Local` (synthetic)
- Site: `Acme Local - Unit 3` (office layout with 20 users)
- Network: UniFi controller with 3 APs, managed switches
- Services: M365 tenant (synthetic), on-prem file server, 3CX instance, network printer
- RMM: simulated alerts (disk, offline agent, high CPU)

Lab incidents to include
-----------------------
- Workstation issue: slow login and app crashes (evidence: event logs, process dump)
- M365 sign-in issue: invalid credentials, MFA prompt loop, and account lockout risk
- Printer issue: prints queue stalled and device shows network offline
- UniFi Wi-Fi issue: one AP offline, affected devices in eastern wing
- 3CX phone registration issue: SIP registration failed after power event
- RMM alert: low disk on file server and service degradation
- Suspicious email report: user clicked a link; credentials may be compromised
- Backup alert: nightly backup job failed with disk space error
- Onboarding request: add new user to groups with appropriate access
- Vendor escalation package: gather logs, configs, firmware, and screenshots for vendor

Scoring
-------
- Score categories (weighted):
  - Scope & triage correctness (30%)
  - Evidence quality (25%)
  - Communication & client updates (20%)
  - Appropriate escalation (15%)
  - Time and workflow (10%)

Ticket-note requirements
------------------------
A ticket must include:
- `Symptom` (exact error text)
- `Scope` (users/devices/sites affected)
- `Safe checks` performed (with timestamps)
- `Evidence collected` (logs, screenshots, RMM snapshots)
- `Impact` (business process affected)
- `Recommended next action` (escalation or fix)
- `Owner` (who will perform next action)

Accessibility
-------------
- All interactive prompts must be keyboard-navigable and screen-reader friendly.
- Provide text alternatives for any images or screenshots required for evidence.

Mobile layout
-------------
- The lab should render in the app's responsive UI: single-column experience for mobile with collapsible steps, and a persistent "Add to ticket" button.

Tests required
--------------
- Unit tests for scenario generation and scoring logic.
- End-to-end tests verifying flow in MSP mode (mocked RMM and M365 responses).
- Accessibility snapshot tests (a11y checks for key views).

MSP-only visibility
-------------------
- The lab and its modules should only appear when `Career Focus` is `MSP`.
- Ensure training content and simulated client data are not visible in DCS or Certification modes.

