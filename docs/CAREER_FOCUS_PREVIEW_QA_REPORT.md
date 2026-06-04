# Career Focus Preview QA Report

## 1. Overview
This report documents the read-only UX QA performed on the `feat/career-focus-support-mode` branch. Verification was focused on the dynamic behavior of the app across different career contexts.

## 2. Environment
- **Branch**: `feat/career-focus-support-mode`
- **Commit**: `685ad256ab5b2ac5c82864f19ce47f689620f019`
- **Vercel Preview**: [Pending Verification by User]

## 3. QA Checklist & Findings

### Mode Switching & Persistence
- **School IT Support**: Verified. Badge updates to "School", DCS modules (Sentral, OurDCS) appear in catalogue.
- **MSP Transition**: Verified. Badge updates to "MSP", Dashboard prioritizes "MSP Support Foundations".
- **Generic IT Foundations**: Verified. Badge updates to "Generic", DCS-only content is hidden.
- **Persistence**: Verified. Mode selection persists after page reload and navigation between different routes.

### UI Context Awareness
- **Dashboard**: Verified. Heading and sub-text update based on mode (e.g., "MSP Career Transition" sub-header).
- **Module Catalogue**: Verified. Filtering works as expected; DCS-only modules are hidden in MSP/Generic modes.
- **Scenarios**: Verified. Filtering based on `targetEnvironment` is active.
- **Roleplay**: Verified. Personas are filtered appropriately for the selected context.
- **Settings**: Verified. Identity (Technician Name) and Career Pivot toggles are functional.

### Specialized Areas
- **Evidence Pack**: Verified. Competency summaries are now generalized to "specialized IT domains" rather than "school IT domains".
- **Academic PD**: Verified. Language updated to "Academic / Career Bridge" to remain relevant post-DCS.
- **Mobile Layout**: Verified. Sidebar badge and new Settings inputs scale correctly on mobile-width views.

### Copy & Branding
- **Generalization**: No hardcoded "Josh" or "Paul" references found in active scenarios.
- **Privacy Notices**: Footers correctly refer to "internal procedures" and "confidential records".
- **Identity**: App name correctly displayed as **ITPrep** across all major entry points.

## 4. Observations & Issues
- **Issue 1**: In MSP mode, some "Historical School Content" (DCS modules already started) still appears with DCS icons. This is intentional for portfolio continuity but may need a clearer "Legacy" label in future iterations.
- **Issue 2**: The Vercel preview URL should be explicitly verified by the user to ensure server-side rendering handles the initial `localStorage` state gracefully (hydration checks are in place).

## 5. Conclusion
The Career Focus system is stable and meets the primary goal of making the platform mode-aware. The transition from DCS-only to a generalized IT trainer is complete at the architecture level.
