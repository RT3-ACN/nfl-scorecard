# NFL Stadium Technology Scorecard — Team Guide

**Maintained by:** Robert Treiber III · robert.j.treiberiii@accenture.com
**Last updated:** March 24, 2026

---

## Step 0 — Sync the folder (one-time setup)

Before anything else, sync the folder to your machine. Browser access alone is not enough — Claude Code needs local files.

1. Open the OneDrive share link Robert sent you in your browser
2. Click **Sync** (top toolbar) — adds the folder to your OneDrive client
3. Wait for the sync to complete (watch the OneDrive icon in your menu bar)
4. Open **Finder** → navigate to your OneDrive folder → confirm you can see `TEAM_GUIDE.md`

> **Your local path will look something like:**
> `~/Library/CloudStorage/OneDrive-Accenture/Robert Treiber III - NFL/`
> (exact name depends on your OneDrive version — look for the folder containing `CLAUDE.md`)

---

## Step 1 — Open Claude Code in this folder (one-time setup)

**Prerequisite:** Claude Code must be installed. If you don't have it, ask Robert.

```bash
# Navigate to your local copy of this folder — adjust path to match yours
cd "~/Library/CloudStorage/OneDrive-Accenture/Robert Treiber III - NFL"

# Launch Claude Code
claude
```

**That's it.** Claude Code detects `plugin.json` and automatically loads:
- All 5 skills (`/survey-review`, `/question-draft`, `/scoring-design`, `/dashboard-spec`, `/scorecard-report`)
- All 3 agents (`survey-developer`, `data-analyst`, `knowledge-manager`)
- Full project context from `CLAUDE.md`

You now have the same Claude setup as everyone else.

---

## What you get

### Skills (slash commands)

| Command | What it does |
|---------|-------------|
| `/survey-review` | Quality check questions for bias, clarity, MECE compliance |
| `/question-draft [layer] [topic]` | Draft new questions in the correct 9-field schema |
| `/scoring-design` | Build the scoring methodology from the question set |
| `/dashboard-spec [view]` | Generate Tableau dashboard specifications |
| `/scorecard-report [club]` | Generate a club maturity report |

### Agents (specialized collaborators)

| Agent | Role |
|-------|------|
| `survey-developer` | Question methodology, drafting, schema compliance |
| `data-analyst` | Scoring calculations, Tableau specs, Python/Excel work |
| `knowledge-manager` | End-of-session capture, backlog updates, CLAUDE.md maintenance |

---

## Daily workflow

### Before you start

Make sure OneDrive has finished syncing (green checkmarks on files). Changes from teammates sync automatically — no manual pull needed.

### Before editing the Excel survey file

> Send a quick message to the team (Teams/Slack): **"Taking WIP_NFL_Survey_v0.xlsx"**

Git cannot merge Excel files. If two people edit at the same time, one version gets overwritten. The message takes 5 seconds and prevents it entirely.

**The only active survey file is:**
```
working/survey/WIP_NFL_Survey_v0.xlsx
```
All other Excel workbooks in this directory are retired or archived.

### When you're done

Save your files — OneDrive syncs them automatically. Let the team know in Teams/Slack what you changed.

---

## Directory structure

| Path | What lives here |
|------|-----------------|
| `working/survey/` | Active survey files — `WIP_NFL_Survey_v0.xlsx`, question backlog |
| `reference/` | Stable reference docs — read them, don't edit them mid-task |
| `.claude/` | Agents, skills, rules — the Claude Code tooling for this project |
| `scripts/` | Python automation (openpyxl, recalc) |
| `deliverables/` | Client-facing outputs (docs, decks) |
| `archive/` | Superseded files — legacy only |

---

## What NOT to do

- **Don't edit `.claude/` files directly** — changes to agents, skills, or `CLAUDE.md` affect everyone immediately. See `CONTRIBUTING.md` for the branch + PR workflow.
- **Don't save generated PDFs or reports** — produce them on demand, don't commit outputs to the shared folder
- **Don't touch Excel files without calling it** in Teams/Slack first

---

## Questions?

Contact: **Robert Treiber III** · robert.j.treiberiii@accenture.com
