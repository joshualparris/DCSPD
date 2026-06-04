# Career Focus Acceptance Criteria

The following criteria must be met to verify the ITPrep Career Focus / Support Mode pivot:

## 1. Mode Switching & UI
- [ ] Users can select between **DCS**, **MSP**, and **Generic** modes on the Settings page.
- [ ] Switching modes provides immediate visual feedback via a badge in the Sidebar.
- [ ] The Sidebar badge correctly displays "School", "MSP", or "Generic" with corresponding icons.
- [ ] Page titles and headers on the Dashboard and Module Catalogue update to reflect the active mode.

## 2. Persistence & Normalization
- [ ] Selected mode persists after a full browser refresh.
- [ ] Loading legacy progress (v1-v3) without a career focus defaults correctly to **Generic**.
- [ ] No user progress (points, streaks, module completion) is lost during the transition or normalization.

## 3. Content Filtering & Prioritization
- [ ] **School Mode**: All original DCS content (Sentral, OurDCS, ViewBoards, etc.) is visible and prioritized.
- [ ] **MSP Mode**: 
    - [ ] DCS-specific modules are hidden from the catalogue unless already started.
    - [ ] MSP-specific modules (SLA Foundations, RMM/PSA Stack) are prioritized on the Dashboard.
    - [ ] Scenarios and Roleplays are filtered to show MSP or Generic items only.
- [ ] **Generic Mode**: 
    - [ ] Only industry-standard modules (A+, Network+, etc.) are visible.
    - [ ] No environment-specific branding (DCS or MSP) appears in headers or empty states.

## 4. Professional Generalization
- [ ] Hardcoded technician names (e.g., "Josh") are replaced by the configurable "Technician Name" from Settings.
- [ ] Manager references (e.g., "Paul") are generalized to "Manager" or "Senior Technician" in scenarios and modules.
- [ ] Privacy notices use generalized language ("internal procedures", "staff/student data") instead of DCS-specific terms.

## 5. Technical Integrity
- [ ] `npm test` passes with all career mode logic tests successful.
- [ ] `npx tsc --noEmit` passes with 0 type errors related to `CareerFocus` or `targetEnvironment`.
- [ ] `npm run build` completes successfully.
- [ ] `npm run lint` passes without new errors.
