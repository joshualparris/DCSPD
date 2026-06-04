# ITPrep: MSP Transition Roadmap

This document outlines the transition of the DCSPrep (now ITPrep) platform from a school-specific internal training tool to a professional Managed Service Provider (MSP) career lab.

## 1. Philosophical Shift: From "The School" to "The Client"

The most significant change is moving from a single-tenant mindset (DCS) to a multi-tenant mindset (MSP).

| Aspect | DCS Context (Internal IT) | MSP Context (Client Support) |
| :--- | :--- | :--- |
| **Primary Goal** | Educational continuity & school ops | Client uptime, profitability & SLAs |
| **Time Tracking** | Quiet windows vs support bursts | Billable vs non-billable time (strict) |
| **Environment** | On-site, physical presence | Remote-first, multi-tenant |
| **Knowledge** | Deep school-specific (Sentral/OurDCS) | Breadth across many client stacks |
| **Documentation** | School internal (Teams/Wiki) | Multi-tenant docs (ITGlue/Hudu/Liongard) |

## 2. Technical Roadmap

### Phase 1: Generalization & Branding (Immediate)
- [ ] Fully align app branding to **ITPrep**.
- [ ] Introduce a "Context Toggle" in Settings (School Mode vs. MSP Mode).
- [ ] Update `TrainingModule` types to support `targetEnvironment` and `mspRelevance`.

### Phase 2: MSP Foundations Module
Create a new core module for MSP entry-level technicians:
- **The MSP Lifecycle**: PSA (ConnectWise/Autotask) + RMM (Ninja/Datto) + Documentation.
- **SLA Management**: Understanding P1 vs P4 in a commercial context.
- **Remote Troubleshooting**: Mastering the art of fixing things you can't touch.
- **Client Relations**: Professionalism when the user is a paying customer, not a colleague.

### Phase 3: Multi-Tenant Stack Training
- **M365 Partner Center**: Managing many tenants safely.
- **Security Standardisation**: Implementing "The MSP Way" across diverse clients.
- **Backup & Disaster Recovery (BDR)**: Monitoring multiple backup sets (Veeam, Datto, etc.).

## 3. Career Mapping (DCS -> MSP)

| DCS Skill | MSP Equivalent |
| :--- | :--- |
| Sentral / OurDCS | ERP / Line of Business (LOB) apps |
| Classroom AV / ViewBoards | Conference Rooms / Zoom / Teams Rooms |
| Jamf (iPad focus) | Intune / Kandji / Addigy (Cross-platform MDM) |
| "Helping Paul" | Working within a Tiered Team (L2/L3 escalations) |
| On-site walk-ups | Remote support & Scheduled site visits |

## 4. Implementation Steps

1. **New Module**: `src/data/modules/msp.ts` to house the new content.
2. **Settings Update**: Add preference for "Career Focus".
3. **Dashboard Pivot**: Adjust recommendations based on the selected focus.
