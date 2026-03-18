# NFL Stadium Technology Scorecard

> Accenture × NFL | ISOW 8, Phase 2 | $100K fixed fee | 4-club pilot → 32-club program

Stadium technology maturity assessment framework for NFL venues. Survey instrument, scoring methodology, and Tableau dashboard for benchmarking club technology capability across fan experience, operations, and innovation.

---

## Team

| Name | Role |
|------|------|
| Robert Treiber | Lead / Builder |
| [Colleague 1] | Survey Development |
| [Colleague 2] | Analytics & Scoring |

**Client:** Gary Brantley (NFL SVP & CIO)
**Accenture lead:** Jon Wakefield (Principal)

---

## Quick Start

### Prerequisites
- [Claude Code](https://claude.ai/claude-code) installed and licensed
- Python 3.9+ and pip3
- Git
- GitHub access — request collaborator invite from Robert

### Setup (3 steps)

**1. Clone**
```bash
git clone https://github.com/rtreiberiii-bit/nfl-scorecard.git
cd nfl-scorecard
```

**2. Install Python dependencies**
```bash
pip3 install openpyxl pandas
```

**3. Open Claude Code from the repo root**
```bash
claude .
```

`CLAUDE.md` loads automatically. Claude now has full project context — framework, active files, quality rules, and known issues.

**Verify it's working:** Ask Claude — *"What's the active question set and what framework does this project use?"*

Expected: v2 4-layer framework (TI/DI/TS/AI), 51 questions, `working/survey/WIP_NFL_Survey_v0.xlsx`.

---

## Repository Structure

```
nfl-scorecard/
│
├── CLAUDE.md                     ← Claude's context (single source of truth — read first)
├── CONTRIBUTING.md               ← Team workflow + tooling quality standards
├── plugin.json                   ← Claude Code plugin manifest
│
├── docs/                         ← All project documentation
│   ├── onboarding.md             ← Start here on day one
│   ├── claude-guide.md           ← How to use Claude on this project
│   ├── framework.md              ← v2 4-layer framework reference
│   ├── skills-reference.md       ← Slash commands with examples
│   ├── agents-reference.md       ← When to use which agent
│   └── workflow.md               ← Git conventions + daily work patterns
│
├── .claude/
│   ├── agents/                   ← survey-developer, data-analyst, knowledge-manager
│   ├── skills/                   ← /survey-review, /question-draft, /dashboard-spec, /scorecard-report
│   └── rules/                    ← Conditional context (plugin-dev, survey-work)
│
├── working/
│   └── survey/                   ← WIP_NFL_Survey_v0.xlsx + NFL_Survey_Question_Review.md
│
├── reference/                    ← Stable docs (methodology, definitions, VOF research)
├── deliverables/                 ← Client-facing outputs (Phase 2 draft, walkaround deck)
├── scripts/                      ← Python automation (openpyxl, recalc)
└── archive/                      ← Superseded files — move here, never delete
```

---

## Current Status

| Deliverable | Status | File |
|-------------|--------|------|
| Survey instrument (C) | 🔄 In development | `working/survey/WIP_NFL_Survey_v0.xlsx` |
| Scoring framework (B) | ✅ v1.2 prototype | `reference/NFL_Scorecard_Methodology_v1.2.md` |
| Tableau dashboard (D) | ⏸ Blocked on scoring | — |
| Phase 2 draft | 🔄 In progress | `deliverables/` |

**Survey milestones:**
- [x] v2 framework locked — 4 layers (TI/DI/TS/AI)
- [x] 51 Claude V0 questions complete
- [x] Combined sheet — 103 questions (V0 + V1 side-by-side)
- [ ] Final question selection — **pending team decision**
- [ ] Fix 3 critical issues (DI_03, DI_05, TS_01)
- [ ] Scoring weights finalized — **pending Jon Wakefield**
- [ ] Pilot deployment to 4 clubs

---

## Documentation

| Doc | Read when |
|-----|-----------|
| [docs/onboarding.md](docs/onboarding.md) | Day one setup + orientation |
| [docs/claude-guide.md](docs/claude-guide.md) | Using Claude effectively on this project |
| [docs/framework.md](docs/framework.md) | v2 4-layer framework deep reference |
| [docs/skills-reference.md](docs/skills-reference.md) | All slash commands with examples |
| [docs/agents-reference.md](docs/agents-reference.md) | Which agent to use for what |
| [docs/workflow.md](docs/workflow.md) | Daily git + work patterns |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Developing + improving agents and skills |

---

## The 5 Rules That Matter Most

1. **`WIP_NFL_Survey_v0.xlsx` is the only working Excel in the repo** — all other workbooks are retired
2. **Physical endpoints (kiosks, displays, cameras, POS hardware) → `DI_`**, not `TI_`
3. **`TI_` = connectivity only** (Wi-Fi, DAS, 5G, cabling, uplink)
4. **Absolute counts are not comparable** across 32 clubs — normalize per 10K seats
5. **"Not measured" = non-response scoring 0**, never option A on a scale

---

*Private repository — Accenture/NFL client engagement. Do not share externally.*
