# Career Focus System Handoff

## 1. Overview
The **Career Focus / Support Mode** system transitions ITPrep from a DCS-specific tool into a context-aware career laboratory. It allows users to toggle between different IT support environments, which dynamically filters and prioritizes training content.

## 2. Canonical CareerFocus Type
The `CareerFocus` type is defined in [progress.ts](file:///c:/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/lib/progress.ts):
```typescript
export type CareerFocus = 'DCS' | 'MSP' | 'Generic';
```
- **DCS**: School IT Support mode. Focuses on Sentral, OurDCS, ViewBoards, and classroom workflows.
- **MSP**: MSP Transition mode. Focuses on billable time, SLAs, RMM/PSA stacks, and multi-tenant management.
- **Generic**: General IT Foundations mode. Focuses on industry-standard A+, Network+, and Security+ concepts without environment-specific branding.

## 3. Storage and Normalization
- **Storage**: The selection is stored within the `UserProfile` in the main `UserProgress` object, persisted in `localStorage` under the key `dcsprep_learning_cockpit_v4`.
- **Normalization**: Older progress objects (v1-v3) are automatically normalized in the `normalizeProgress` function in [progress.ts](file:///c:/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/lib/progress.ts). If no `careerFocus` is found, it defaults to `'Generic'`.

## 4. Filtering Logic
- **Module Catalogue**: Managed in [app/modules/page.tsx](file:///c:/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/app/modules/page.tsx). It filters out DCS-only modules when in MSP or Generic mode unless the user has already started them.
- **Dashboard Recommendations**: Managed in [studyPath.ts](file:///c:/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/lib/studyPath.ts). It assigns higher priority to modules matching the current `targetEnvironment`.
- **Scenario and Roleplay**: Filtered in their respective page components ([app/scenarios/page.tsx](file:///c:/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/app/scenarios/page.tsx) and [app/simulations/roleplay/page.tsx](file:///c:/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/app/simulations/roleplay/page.tsx)) based on the `targetEnvironment` field.

## 5. Mode Badge
The [Sidebar](file:///c:/Users/joshua.parris/OneDrive%20-%20Dubbo%20Christian%20School/Documents/DCSPrepApp/src/components/shell/Sidebar.tsx) includes a reactive badge that displays the current mode. It uses a `useEffect` hook to synchronize with `localStorage` changes, ensuring the UI updates immediately when the user switches modes in Settings.

## 6. Critical Preservation Requirements
- **targetEnvironment Support**: Every `TrainingModule`, `Scenario`, and `RoleplayScenario` MUST include a `targetEnvironment` field. This is the primary key for filtering.
- **Privacy Awareness**: Safety notices and footers must remain generalized. Do not revert to DCS-only privacy language.
- **Identity Config**: The user's name must be pulled from `progress.profile.name` rather than being hardcoded.
- **Backwards Compatibility**: Any changes to the `UserProgress` schema MUST be handled in `normalizeProgress` to avoid data loss for existing users.
