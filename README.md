# NFL Stadium Technology Scorecard

> Accenture × NFL | ISOW 8, Phase 2 | $100K fixed fee | 4-club pilot → 32-club program

Stadium technology maturity assessment framework for NFL venues. Survey instrument, scoring methodology, and Tableau dashboard for benchmarking club technology capability across fan experience, operations, and innovation.

**Client:** Gary Brantley (NFL SVP & CIO) | **Accenture lead:** Jon Wakefield (Principal)

---

## Where We Are

| Phase | Status |
|-------|--------|
| 1. Survey questions | 🔄 In development — 51 V0 questions, final selection pending |
| 2. Scoring methodology | ⏳ Not started — use `/scoring-design` once questions are finalized |
| 3. Tableau dashboard | ⏸ Blocked on scoring |
| 4. Pilot deployment (4 clubs) | ⏸ Blocked on survey + scoring |

**The work right now is questions.** Fix the 3 critical issues (DI_03, DI_05, TS_01), finalize the question set, then run `/scoring-design`.

---

## Setup

### Prerequisites
- [Claude Code](https://claude.ai/claude-code) installed and licensed
- Git
- GitHub collaborator access — request from Robert

### 3 steps

**1. Clone**
```bash
git clone https://github.com/RT3-ACN/nfl-scorecard.git
cd nfl-scorecard
```

**2. Install the pre-push hook (one-time)**
```bash
git config core.hooksPath .githooks
```
This blocks accidental direct pushes to `main`. See [CONTRIBUTING.md](CONTRIBUTING.md) for the branch workflow.

**3. Open Claude Code from the repo root**
```bash
claude .
```

**4. Verify Claude has context**

Ask: *"What's the current state of the project — active question set, known issues, and what phase are we in?"*

Expected: v2 4-layer framework (TI/DI/TS/AI), 51 questions in `working/survey/WIP_NFL_Survey_v0.xlsx`, 3 known critical issues, scoring not yet designed.

If Claude seems confused about the framework or references old files, run `/clear` and reopen from the repo root.

---

## What Claude Can Do

These are the slash commands. Run them by typing the command in Claude Code.

| Command | When to use |
|---------|-------------|
| `/survey-review` | Review questions for quality issues — run this before any pilot deployment |
| `/survey-review — focus on [layer]` | Review a specific layer (TI / DI / TS / AI) |
| `/question-draft [layer] — [topic]` | Draft a new question in the correct 9-field schema |
| `/scoring-design` | **Start here for scoring** — builds methodology from the question set |
| `/dashboard-spec [view name]` | Design Tableau dashboard views (structure only until scoring is finalized) |
| `/scorecard-report [Club Name]` | Generate a club maturity report (requires scored survey data) |

**The right sequence:** questions → `/scoring-design` → `/dashboard-spec` → `/scorecard-report`

Claude also routes to specialized agents automatically:
- **`survey-developer`** — question methodology, schema compliance, MECE coverage
- **`data-analyst`** — scoring calculations, Tableau specs, Python/Excel work
- **`knowledge-manager`** — end-of-session capture, backlog, CLAUDE.md updates

---

## First Session Pattern

Start every session by orienting Claude:
```
Check the backlog and tell me: what are the 3 critical issues, what's been
decided, and what are the open decisions?
```

Do your work. End every session by capturing decisions:
```
We decided [X] today. Update the backlog and tell me if CLAUDE.md needs changing.
```

Then commit and push via a branch:
```bash
git checkout -b survey/[what-changed]
git add working/
git commit -m "survey: [what changed]"
git push -u origin survey/[what-changed]
gh pr create
```

---

## Repository Structure

```
nfl-scorecard/
│
├── CLAUDE.md                     ← Claude's context (loads automatically — read it)
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
│   ├── skills/                   ← /survey-review, /question-draft, /scoring-design,
│   │                                /dashboard-spec, /scorecard-report
│   └── rules/                    ← Conditional context (plugin-dev, survey-work)
│
├── working/
│   └── survey/                   ← WIP_NFL_Survey_v0.xlsx + NFL_Survey_Question_Review.md
│
├── reference/                    ← Stable docs (VOF research, tech revenue, definitions)
├── deliverables/                 ← Client-facing outputs (Phase 2 draft, walkaround deck)
└── archive/                      ← Superseded files — move here, never delete
```

---

## Survey Milestones

- [x] v2 framework locked — 4 layers (TI/DI/TS/AI)
- [x] 51 Claude V0 questions drafted
- [x] Combined sheet — 103 questions (V0 + V1 side-by-side)
- [ ] Fix 3 critical issues: DI_03 (normalization), DI_05 (non-response), TS_01 (concessionaire)
- [ ] Final question selection — V0 vs V1 vs merged — **pending team decision**
- [ ] Run `/scoring-design` — assign templates, dimensions, weights, tier thresholds
- [ ] Scoring methodology confirmed by Jon Wakefield
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
| [CONTRIBUTING.md](CONTRIBUTING.md) | Improving agents, skills, and tooling |

---

## 5 Rules That Matter Most

1. **`WIP_NFL_Survey_v0.xlsx` is the only working Excel in the repo** — all other workbooks are retired
2. **Scoring methodology is not designed yet** — never apply pitch-era weights or formulas; use `/scoring-design`
3. **Physical endpoints (kiosks, displays, cameras, POS hardware) → `DI_`**, not `TI_`
4. **Absolute counts are not comparable** across 32 clubs — always normalize per 10K seats
5. **"Not measured" = non-response scoring 0**, never option A on a scale

---

*Private repository — Accenture/NFL client engagement. Do not share externally.*
