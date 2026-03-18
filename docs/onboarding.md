# Onboarding — Day One

Welcome to the NFL Stadium Technology Scorecard project. This gets you set up and oriented in under 30 minutes.

---

## What This Project Is

We're building a technology maturity assessment framework for NFL stadium venues:

1. **Survey instrument** — structured questions for each club's CIO or VP of Technology to assess their stadium tech capability
2. **Scoring model** — weighted rubric that converts survey responses into maturity scores (0–100) across 4 technology layers
3. **Tableau dashboard** — visualization for the NFL to benchmark all 32 clubs and identify gaps

**The engagement:** Accenture × NFL, ISOW 8, Phase 2, $100K fixed fee.
**Respondents:** Club CIOs and VPs of Technology at the 4 pilot clubs, expanding to all 32.
**End client:** Gary Brantley (NFL SVP & CIO), shared with individual club CIOs.

---

## Prerequisites

Before you start, confirm you have:

- [ ] **Claude Code** installed — [claude.ai/claude-code](https://claude.ai/claude-code)
- [ ] **Python 3.9+** — `python3 --version`
- [ ] **Git** — `git --version`
- [ ] **Collaborator access** — ask Robert to add you to `rtreiberiii-bit/nfl-scorecard` on GitHub

---

## Setup

### Step 1 — Clone the repo

```bash
git clone https://github.com/rtreiberiii-bit/nfl-scorecard.git
cd nfl-scorecard
```

### Step 2 — Install Python dependencies

```bash
pip3 install openpyxl pandas
```

These are used by the scripts in `scripts/` for reading and writing Excel workbooks programmatically.

### Step 3 — Open Claude Code from the repo root

```bash
claude .
```

**This step matters.** Claude Code must be opened from `nfl-scorecard/` — not a subdirectory — so that `CLAUDE.md` loads and Claude gets full project context.

### Step 4 — Verify Claude is oriented

Ask Claude: *"What is the active question file and how many questions does it have?"*

Expected answer:
- File: `working/survey/WIP_NFL_Survey_v0.xlsx` → sheet "NFL Claude V0"
- 51 questions across 4 layers (TI=15, DI=16, TS=10, AI=10)
- v2 framework: TI_ / DI_ / TS_ / AI_ prefixes

If Claude gives outdated answers (mentions `nfl_master-csv.txt`, 5 areas, or `ID_` prefix), run `/clear` and reopen from the repo root.

---

## The Framework You Need to Know

Everything in this project is organized around a **4-layer technology framework** (v2, locked March 2026).

| Layer | Prefix | What it covers |
|-------|--------|----------------|
| Technology Infrastructure | `TI_` | Connectivity only: Wi-Fi, DAS, 5G, fiber, cabling, uplink |
| Digital Infrastructure | `DI_` | Cloud platforms, data infrastructure, AND physical endpoint hardware (displays, kiosks, cameras, POS terminals) |
| Technology Services | `TS_` | SaaS + ops platforms: ticketing, mobile ordering, fan app, CRM, signage CMS, workforce mgmt |
| AI & Innovation | `AI_` | Intelligent capabilities: computer vision, predictive analytics, GenAI, personalization engines |

**The non-obvious rule:** Physical hardware devices (digital displays, self-service kiosks, cameras, POS terminals) live in **Digital Infrastructure (`DI_`)**, not Technology Infrastructure. `TI_` is connectivity infrastructure only.

Read [docs/framework.md](framework.md) for the full reference including answer format, scoring templates, and quality rules.

---

## Where Things Live

| What you need | Where it is |
|---------------|-------------|
| Active survey (51 questions) | `working/survey/WIP_NFL_Survey_v0.xlsx` → "NFL Claude V0" |
| Both surveys side by side | same file → "Combined Survey Questions" |
| Known issues + open decisions | `working/survey/NFL_Survey_Question_Review.md` |
| Scoring workbook | `working/scoring/NFL_Scorecard_Master_Combined_v1.2.xlsx` |
| Layer scope definitions | `reference/NFL_Technology_Areas_Definitions.md` |
| Scoring methodology | `reference/NFL_Scorecard_Methodology_v1.2.md` |
| VOF research + benchmarks | `reference/nfl_voice_of_the_fan_research.md` |
| Client deliverables | `deliverables/` |
| Claude tooling (agents, skills) | `.claude/` |

---

## Your First Work Session

**Start by running:**
```
/survey-review
```

This gives Claude's quality assessment of the current 51-question set. It tells you where we are, what's strong, and what needs fixing before the pilot.

Then read `working/survey/NFL_Survey_Question_Review.md` — it has the specific known issues, what's been tried, and the open decisions the team hasn't resolved.

---

## Open Decisions When You Join

These are unresolved as of March 2026. Context for your first conversation with the team:

1. **Final question framework** — we have our Claude V0 set (51 Qs) and a colleague's V1 set (50 Qs). The combined sheet has both. We haven't decided which wins, which to cut, or how to merge.
2. **Concessionaire scenario** — many clubs don't control their vendor technology (POS, F&B ordering, Wi-Fi in premium areas). We need a standard handling approach across all affected questions.
3. **Scoring weights** — the E/C/P/G dimension weights and layer roll-up formula are prototype only. Jon Wakefield needs to confirm before we finalize.
4. **Venue capacity** — do we ask clubs for their venue capacity in the survey (TI_11), or pull it from league data post-survey?

---

## How We Work Together

- **Pull before you start** every session: `git pull origin main`
- **Working file changes** (`working/`) — commit directly to `main`
- **Tooling changes** (`.claude/`, `CLAUDE.md`) — branch + PR, one team member reviews
- **Push when you're done** for the day

See [docs/workflow.md](workflow.md) for full conventions.

---

## Getting Help

- **Claude** — your primary resource. See [docs/claude-guide.md](claude-guide.md) for how to use it effectively on this project.
- **The backlog** — `working/survey/NFL_Survey_Question_Review.md` documents known issues and decisions
- **Robert** — for project context, stakeholder questions, scoring methodology decisions
