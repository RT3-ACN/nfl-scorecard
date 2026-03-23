# NFL Claude Code Tools — Colleague Onboarding & Sharing Guide

How to bring a colleague into the NFL Stadium Technology Scorecard Claude Code ecosystem.

---

## Architecture Overview

```
NFL/                                    ← Project root (shared via OneDrive)
├── CLAUDE.md                           ← Project brain: all rules, schema, scoring, decisions
├── working/
│   └── survey/
│       └── WIP_NFL_Survey_v0.xlsx      ← THE active working file (51Q + colleague V1 + combined)
├── reference/                          ← Stable read-only docs (methodology, definitions, VOF)
├── docs/                               ← Planning, workflow, this guide
├── deliverables/                       ← Client-facing outputs
└── .claude/                            ← Claude Code tooling layer
    ├── skills/
    │   ├── survey-review/SKILL.md      ← /survey-review
    │   ├── question-draft/SKILL.md     ← /question-draft [layer] [topic]
    │   ├── scoring-design/SKILL.md     ← /scoring-design
    │   ├── dashboard-spec/SKILL.md     ← /dashboard-spec [view]
    │   └── scorecard-report/SKILL.md  ← /scorecard-report [club]
    ├── agents/
    │   ├── survey-developer.md         ← Question methodology + drafting specialist
    │   ├── data-analyst.md             ← Scoring, Tableau, Python/Excel specialist
    │   └── knowledge-manager.md        ← Session capture, CLAUDE.md maintenance
    └── rules/
        ├── survey-work.md              ← Auto-loads when working on survey files
        └── plugin-development.md       ← Auto-loads when editing .claude/ tooling
```

---

## How Claude Code Uses This Structure

```
Colleague opens NFL/ directory in Claude Code
              │
              ▼
  Claude reads CLAUDE.md automatically
  (framework v2, question schema, scoring rules, active files)
              │
              ▼
  Colleague types a slash command or asks a question
              │
       ┌──────┴──────────────────────────────────┐
       │                                          │
       ▼                                          ▼
  Skill invoked                           Agent invoked
  (e.g. /survey-review)             (e.g. survey-developer)
       │                                          │
       ▼                                          ▼
  Structured workflow                  Specialist reasoning
  runs automatically               using project context
       │                                          │
       └──────────────┬───────────────────────────┘
                      ▼
          Output grounded in project rules:
          - Framework v2 (TI/DI/TS/AI)
          - 9-field question schema
          - Active file paths
          - Critical quality rules
          - Open decisions flagged
```

---

## What Each Tool Does

### Skills (Slash Commands)

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/survey-review` | Quality-checks questions for bias, clarity, MECE compliance, normalization | Before finalizing any question additions |
| `/question-draft [layer] [topic]` | Drafts new questions in full 9-field schema | Adding new questions to the bank |
| `/scoring-design` | Builds scoring methodology from question set | **Must run before dashboard or report work** |
| `/dashboard-spec [view]` | Generates Tableau dashboard specification | Once scoring is finalized |
| `/scorecard-report [club]` | Generates club maturity report | Requires scored data |

### Agents

| Agent | Role | Invoke By |
|-------|------|-----------|
| `survey-developer` | Question methodology, schema compliance, MECE structure | "Use the survey-developer agent to..." |
| `data-analyst` | Scoring formulas, Tableau spec, Python/Excel automation | "Use the data-analyst agent to..." |
| `knowledge-manager` | End-of-session capture, CLAUDE.md updates, backlog | "Run the knowledge-manager agent" |

### Auto-Rules (Load Silently)
- **survey-work.md** — activates whenever you're working on survey files; enforces critical rules
- **plugin-development.md** — activates whenever you're editing .claude/ tooling; prevents breaking changes

---

## Colleague Setup: Step by Step

### Step 1 — Prerequisites
- [ ] Claude Code CLI installed (`npm install -g @anthropic-ai/claude-code` or via download)
- [ ] Access to the NFL folder via OneDrive sync on your machine
- [ ] Anthropic API key (or Accenture-provisioned Claude Code access)

### Step 2 — Open the Project
```bash
# Navigate to the NFL project root
cd ~/Library/CloudStorage/OneDrive-Accenture/Documents/Accenture/NFL

# Launch Claude Code
claude
```

Claude Code will automatically detect and load `CLAUDE.md` — the entire project context
loads before your first message.

### Step 3 — Verify Context Loaded
Type this to confirm Claude has loaded the right context:
```
What framework version are we using and what are the 4 technology layers?
```

Expected answer: v2, layers TI / DI / TS / AI — physical endpoints in DI, TI = connectivity only.

### Step 4 — Read the Active Working File
```
Read the current question set in working/survey/WIP_NFL_Survey_v0.xlsx
and summarize what's in each sheet.
```

### Step 5 — Start Working
Use slash commands or ask naturally:
```
/survey-review
Review DI_03 and DI_05 for the open normalization and non-response issues.
```

---

## Shared State & Coordination

Since the NFL folder is on shared OneDrive, both colleagues work from the same file state.

```
Robert (Chicago)                    Colleague
      │                                  │
      ▼                                  ▼
Opens NFL/ in Claude Code       Opens NFL/ in Claude Code
CLAUDE.md loads automatically   CLAUDE.md loads automatically
      │                                  │
      ▼                                  ▼
Works on survey questions       Works on scoring / Tableau
      │                                  │
      └────── Both write to ─────────────┘
         WIP_NFL_Survey_v0.xlsx
         (OneDrive sync = shared truth)
```

**Coordination rules:**
- One person at a time editing `WIP_NFL_Survey_v0.xlsx` — OneDrive has no real-time co-edit for Excel
- Communicate changes via Teams before editing to avoid conflicts
- When decisions are made, tell the `knowledge-manager` agent so CLAUDE.md stays current

---

## What the Colleague Brings

Looking at the survey file, there's a "Survey Questions V1" sheet — 50 questions from the colleague's parallel build. The combined merge decision (V0 vs V1 vs merged) is an **open decision to resolve in Week 1–2** of the engagement.

To review the colleague's set:
```
/survey-review
Review the V1 question set in the "Survey Questions V1" sheet against our framework v2
rules and quality standards. Flag any issues.
```

---

## Quick Reference Card (Share with Colleague)

```
NFL Scorecard — Claude Code Quick Reference
-------------------------------------------
Open project:    cd .../Accenture/NFL && claude
Framework:       v2 · 4 layers: TI / DI / TS / AI
Active file:     working/survey/WIP_NFL_Survey_v0.xlsx
Question schema: 9 required fields (see CLAUDE.md)

Key commands:
  /survey-review              Quality check questions
  /question-draft [L] [T]     Draft new question
  /scoring-design             Build scoring methodology
  /dashboard-spec [view]      Tableau spec

Critical rules:
  - Normalize counts per 10,000 seats (never absolute)
  - "Not measured" = non-response (score 0, never option A)
  - Concessionaire note required on all F&B/POS questions
  - Physical endpoints (kiosks, displays, cameras) → DI_, not TI_
  - Scoring methodology NOT finalized — run /scoring-design first
```
