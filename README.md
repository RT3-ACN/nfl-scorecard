# NFL Stadium Technology Scorecard

Accenture engagement (ISOW 8, Phase 2) — stadium technology maturity assessment across NFL venues.
4-club pilot, $100K fixed fee. Survey → scoring → Tableau dashboard.

**Team:** Robert Treiber · [Colleague 1] · [Colleague 2]

---

## Setup (do this once)

### 1. Clone the repo

```bash
git clone https://github.com/[org]/nfl-scorecard.git
cd nfl-scorecard
```

### 2. Install Python dependencies (for scripts)

```bash
pip3 install openpyxl pandas
```

### 3. Point Claude Code at this directory

When you open Claude Code, navigate to the repo directory. `CLAUDE.md` loads automatically and gives Claude full project context — the framework, active files, rules, and available tools.

**Or install as a plugin** (makes skills available globally):
```bash
claude plugin install github:[org]/nfl-scorecard
```

### 4. Verify it's working

In a Claude Code session, ask: *"What's the active question set for this project?"*
Claude should answer with v2 framework details, 51 questions, and reference `working/survey/WIP_NFL_Survey_v0.xlsx`.

---

## Directory Structure

```
nfl-scorecard/
├── CLAUDE.md                    ← Claude's project context (single source of truth)
├── CONTRIBUTING.md              ← How we work together + Claude guidelines
├── plugin.json                  ← Claude Code plugin manifest
│
├── .claude/
│   ├── agents/                  ← survey-developer, data-analyst, knowledge-manager
│   ├── skills/                  ← /survey-review, /question-draft, /dashboard-spec, /scorecard-report
│   └── rules/                   ← Conditional context by directory
│
├── working/
│   ├── survey/                  ← WIP_NFL_Survey_v0.xlsx, question review backlog
│   └── scoring/                 ← NFL_Scorecard_Master_Combined_v1.2.xlsx
│
├── reference/                   ← Stable docs (methodology, definitions, VOF research)
├── scripts/                     ← Python automation
└── archive/                     ← Legacy files (nfl_master-csv.txt, old versions)
```

---

## Quick Reference

| Task | Tool |
|------|------|
| Review question quality | `/survey-review` or `@survey-developer` |
| Draft a new question | `/question-draft TI_[topic]` |
| Build a dashboard spec | `/dashboard-spec [view name]` |
| Generate club report | `/scorecard-report [Club Name]` |
| Update backlog + KG | `@knowledge-manager` |

---

## Important Rules

1. **Never modify `*_v1.2.xlsx` directly** — script changes via `scripts/recalc.py`
2. **Working file edits** → commit to `working/` with a clear message
3. **Skill/agent changes** → branch + PR (see CONTRIBUTING.md)
4. **Reference docs** → read-only; only update when source material changes
5. **Archive, don't delete** — move superseded files to `archive/`

---

## Current Status (as of 2026-03-18)

- [x] v2 framework locked (4 layers: TI/DI/TS/AI)
- [x] 51 Claude V0 questions complete
- [x] Combined survey sheet (103 questions, V0 + V1)
- [ ] Final question selection (V0 vs V1 vs merged) — **pending**
- [ ] Critical issue fixes (DI_03, DI_05, TS_01) — **in progress**
- [ ] Scoring methodology finalization — **pending Jon Wakefield**
- [ ] Tableau dashboard (Deliverable D) — **blocked on scoring**
- [ ] Pilot deployment to 4 clubs — **Phase 2**
