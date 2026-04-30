# DCSPrep

DCSPrep is a local-first Next.js professional development app for Josh's DCS IT support growth. It focuses on safe Level 1 learning, structured assessment, scenario practice, error review, and visible progress across real school-support themes.

The intended direction is question-first and retrieval-first:

- flashcards
- multiple-choice and short-answer practice
- scenario-based troubleshooting
- explanation and note-writing practice
- short focused study blocks

The app should stay privacy-safe while becoming more relevant to the actual DCS workflow areas supported through internal systems such as Sentral, OurDCS, Teams, and related school-owned resources.

## Current App Areas

- Professional Development Dashboard
- Modules
- Scenario Lab
- Due Today
- Structured assessment
- PD log
- Error log
- Readiness profiles
- Trainer guide
- Settings

## Current Content Coverage

Core module areas currently implemented:

- DCS IT Support Foundations
- Ports and Protocols
- DNS, DHCP, Gateway, and IP Basics
- Printer Troubleshooting
- Classroom Display and ViewBoard Troubleshooting
- M365 Identity and Offboarding Basics
- MDM, Intune, and Group Policy Concepts
- VLANs and Network Segmentation
- Cloud Models: SaaS, PaaS, IaaS, and DaaS
- Ticket Notes and Escalation Quality

## Development Commands

Install dependencies:

```powershell
npm install
```

Run the dev server:

```powershell
npm run dev
```

Run lint:

```powershell
npm run lint
```

Run production build:

```powershell
npm run build
```

## Project Structure

- `app/` - App Router routes
- `src/components/` - UI and learning components
- `src/data/modules.ts` - module content
- `src/data/questions.ts` - strict assessment bank
- `src/data/scenarios.ts` - scenario chains
- `src/lib/progress.ts` - local progress storage and hydration-safe helpers
- `src/lib/moduleMath.ts` - completion calculations
- `src/lib/readinessMath.ts` - readiness-profile calculations
- `src/types/` - shared types

## Audit and Roadmap Docs

Current audit and backlog documents:

- [`docs/jira-vs-dcsprep-audit.md`](docs/jira-vs-dcsprep-audit.md)
- [`docs/dcsprep-upskilling-roadmap.md`](docs/dcsprep-upskilling-roadmap.md)
- [`TODO.md`](TODO.md)

These documents map the app against the DCS Jira analysis, identify missing or shallow training areas, and define the next implementation priorities.

## Notes

- Progress is stored in `localStorage`.
- The app is PD-only and should remain privacy-safe.
- Do not enter live student, staff, parent, credential, network, or incident details.

## OneDrive Note

If the project stays inside OneDrive, Windows may occasionally interfere with `.next` writes during local development. If you hit dev-server file locking issues, excluding the project folder or `.next` from sync is safer than deleting build files repeatedly.
