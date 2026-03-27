# NFL Stadium Technology Scorecard

> Accenture × NFL | ISOW 8, Phase 2 | $100K fixed fee | 4-club pilot → 32-club program

Stadium technology maturity assessment framework for NFL venues. Survey instrument, scoring methodology, and Tableau dashboard for benchmarking club technology capability across fan experience, operations, and innovation.

**Client:** Gary Brantley (NFL SVP & CIO) | **Accenture lead:** Jon Wakefield (Principal)

---

## Project Dashboard

The project runs a local dashboard at **http://localhost:9876** with four tabs:

| Tab | What it does |
|-----|-------------|
| **Overview** | SOW status, deliverables tracker, Gantt, contacts, open decisions |
| **Board** | Kanban — drag cards across Backlog → In Progress → In Review → Done |
| **Question Review** | Review all 51 survey questions, flag issues, add comments, save to Excel |
| **Meeting Notes** | All project meetings with tags (Internal/External, Copilot AI/Manual) + add new notes |

### Starting the Dashboard

#### With Claude Code (recommended for non-technical users)

1. Open Claude Code from the NFL project folder:
   ```
   claude .
   ```
2. Type this in the chat:
   ```
   Start the project dashboard
   ```
3. Claude will run the server and your browser opens automatically at http://localhost:9876

That's it. To stop it later, type:
```
Stop the dashboard server
```

#### Manually (technical users)

From the project root:
```bash
python3 tools/serve.py
```

The browser opens automatically. Press `Ctrl+C` in the terminal to stop.

**Requirement:** Python 3 and `openpyxl` must be installed.
```bash
pip install openpyxl
```

### Using the Dashboard

**Question Review tab:**
- Use **Focus mode** (one question at a time) when reviewing with a colleague on screen
- Use **List mode** (all questions expanded) for solo batch review
- Filter by layer (TI / DI / TS / AI) or status (Open / OK / Revise / Split / Drop)
- Click a flag button to mark a question's status
- Type in the comment box — saves automatically when you click away
- Hit **💾 Save to Excel** to write all comments back to `working/survey/WIP_NFL_Survey_v0.xlsx`

**Meeting Notes tab:**
- All meetings are stored as markdown files in `meetings/`
- Click **+ New Note** to add a manual note directly from the dashboard
- Copilot AI notes are tagged purple; Manual notes are tagged green
- External (client) meetings are tagged blue; Internal meetings are grey

---

## Where We Are

| Phase | Status |
|-------|--------|
| 1. Survey questions | 🔄 In development — 51 V0 questions, fix DI_03/DI_05/TS_01, finalize by ~Mar 31 |
| 2. Scoring methodology | ⏳ Not started — use `/scoring-design` once questions are locked |
| 3. Tableau / Power BI dashboard | ⏸ Blocked on scoring — platform TBD (Jordan reporting ~Mar 30) |
| 4. Pilot deployment (4 clubs) | ⏸ Blocked on survey + scoring |

**Pilot clubs:** Arizona Cardinals · Denver Broncos · third TBD (Bears or Buccaneers)
**Timeline:** Survey ready by Week 5 · Scoring + executive presentation by March 31

**The work right now is questions.** Fix the 3 critical issues (DI_03, DI_05, TS_01), finalize the question set with Kieran, then run `/scoring-design`.

---

## Setup (Technical / Claude Code)

### Prerequisites
- [Claude Code](https://claude.ai/claude-code) installed and licensed
- Git
- GitHub collaborator access — request from Robert
- Python 3 + `openpyxl` (`pip install openpyxl`)

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

If Claude seems confused, run `/clear` and reopen from the repo root.

---

## What Claude Can Do

| Command | When to use |
|---------|-------------|
| `/survey-review` | Review questions for quality issues — run before any pilot deployment |
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

## Meeting Notes Workflow

All project meeting notes live in `meetings/` as markdown files. The naming convention is:

```
meetings/YYYY-MM-DD-short-title.md
```

Each file has a frontmatter header that controls dashboard display:

```
---
date: 2026-03-27
type: internal        # internal or external
source: copilot       # copilot or manual
---
```

**Adding a note from the dashboard:** Meeting Notes tab → **+ New Note** button.

**Adding a note as a file:** Create a `.md` file in `meetings/` with the frontmatter above. It appears in the dashboard automatically on next load.

**Processing Copilot notes from Teams:** Use the `/copilot-notes` skill in Claude Code:
```
/copilot-notes
[paste Copilot output here]
```
Claude extracts decisions, action items, and open questions, routes shareable items to the repo and sensitive stakeholder intelligence to the private brain, then writes the note file.

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

Then commit via a branch:
```bash
git checkout -b survey/[what-changed]
git add working/ meetings/
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
├── TEAM_GUIDE.md                 ← OneDrive sync + Claude Code setup for teammates
├── plugin.json                   ← Claude Code plugin manifest
│
├── tools/
│   ├── serve.py                  ← Dashboard server (python3 tools/serve.py)
│   ├── index.html                ← Legacy tool landing page
│   ├── review.html               ← Legacy standalone question review
│   ├── kanban.html               ← Legacy standalone kanban
│   └── kanban-state.json         ← Kanban board state (auto-saved)
│
├── meetings/                     ← All project meeting notes (markdown)
│   └── YYYY-MM-DD-title.md
│
├── deliverables/
│   └── nfl-scorecard-dashboard.html  ← Main project dashboard (served at localhost:9876)
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
│   ├── skills/                   ← /survey-review, /question-draft, /scoring-design, etc.
│   └── rules/                    ← Conditional context (plugin-dev, survey-work)
│
├── working/
│   └── survey/                   ← WIP_NFL_Survey_v0.xlsx + NFL_Survey_Question_Review.md
│
├── reference/                    ← Stable docs (VOF research, tech revenue, definitions)
└── archive/                      ← Superseded files — move here, never delete
```

---

## Survey Milestones

- [x] v2 framework locked — 4 layers (TI/DI/TS/AI)
- [x] 51 Claude V0 questions drafted
- [x] Combined sheet — 103 questions (V0 + V1 side-by-side)
- [x] Question Review tool built — localhost:9876/Question Review tab
- [x] Meeting notes workflow established — 5 meetings captured
- [ ] Fix 3 critical issues: DI_03 (normalization), DI_05 (non-response), TS_01 (concessionaire)
- [ ] Final question selection — V0 vs V1 vs merged — **pending team decision**
- [ ] Run `/scoring-design` — assign templates, dimensions, weights, tier thresholds
- [ ] Scoring methodology confirmed by Jon Wakefield
- [ ] Tableau / Power BI platform decision — Jordan reporting ~Mar 30
- [ ] Pilot deployment to 4 clubs (Cardinals, Broncos, TBD)

---

## 5 Rules That Matter Most

1. **`WIP_NFL_Survey_v0.xlsx` is the only working Excel in the repo** — all other workbooks are retired
2. **Scoring methodology is not designed yet** — never apply pitch-era weights or formulas; use `/scoring-design`
3. **Physical endpoints (kiosks, displays, cameras, POS hardware) → `DI_`**, not `TI_`
4. **Absolute counts are not comparable** across 32 clubs — always normalize per 10K seats
5. **Survey is tech-focused only** — no business/marketing questions (John Noble hard requirement)

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

*Accenture/NFL client engagement. RT3-ACN org — collaborator access required to contribute.*
