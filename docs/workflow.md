# Workflow — Day-to-Day Patterns

How the three of us work together on this repo. Git conventions, daily patterns, Excel handling, and collaboration norms.

---

## Daily Session Pattern

### Start of session

```bash
cd nfl-scorecard
git pull origin main          # always pull first
claude .                      # open Claude Code from repo root
```

Then orient Claude for the session:
```
Check the backlog and tell me the current state — what's resolved, what's still open, and what was decided last session.
```

### End of session

1. Capture decisions with Claude:
   ```
   Today we decided [X] and fixed [Y]. Update the backlog and flag if CLAUDE.md needs changes.
   ```
2. Commit your working file changes:
   ```bash
   git add working/
   git commit -m "survey: [what you did]"
   git push origin main
   ```
3. If you changed `.claude/` files: open a PR (see below).

---

## Two Types of Work — Different Git Flows

### Working files (`working/`, `reference/`, `deliverables/`)

These are the actual project outputs: survey Excel, scoring workbook, backlog, deliverable drafts.

**Flow:** Commit directly to `main`. No PR needed.

```bash
# Before you start
git pull origin main

# After meaningful progress (not every save)
git add working/survey/WIP_NFL_Survey_v0.xlsx
git add working/survey/NFL_Survey_Question_Review.md
git commit -m "survey: added 3 new DI questions on cloud data storage maturity"
git push origin main
```

**When to commit** — after meaningful progress, not every save:
- Added or revised a batch of questions
- Fixed a known backlog issue
- Made a structural decision and updated the review doc
- Updated the scoring workbook

### Claude tooling (`.claude/`, `CLAUDE.md`, `plugin.json`)

These are the agents, skills, and project context that all three team members depend on. A bad change affects every Claude session immediately.

**Flow:** Branch → change → PR → one reviewer merges.

```bash
# Start
git checkout -b dev/[yourname]-[what-youre-changing]
# e.g.: dev/alex-survey-review-concessionaire-check

# Make your changes

# Push and open PR
git push origin dev/alex-survey-review-concessionaire-check
# Open PR on GitHub, tag one teammate for review
```

---

## Commit Message Format

### For working files
```
[area]: [what changed] — [brief context if needed]
```

Examples:
```
survey: fixed DI_05 — moved "not measured" from option A to non-response handling
survey: added 4 AI layer questions on GenAI deployment and personalization maturity
scoring: updated v1.2 weights prototype to E=25/C=25/P=30/G=20 — pending Jon confirmation
backlog: closed DI_03 (normalization fix applied), added new open decision on venue capacity source
working: reconciled V0 and V1 TI questions — kept V0 set, archived V1 TI section
```

### For tooling changes
```
tooling: [what changed] — [why or what it fixes]
```

Examples:
```
tooling: updated /survey-review — added concessionaire scenario check
tooling: updated survey-developer agent — fixed stale nfl_master-csv.txt reference
tooling: CLAUDE.md — added venue capacity open decision
tooling: new /question-batch skill — drafts multiple questions at once for a sub-area
```

---

## Branch Naming

```
dev/[yourname]-[feature-or-fix]
```

Examples:
```
dev/robert-knowledge-manager-agent
dev/alex-survey-review-v2
dev/taylor-dashboard-spec-updates
```

One branch per discrete change. Don't accumulate multiple unrelated changes in one branch.

---

## Handling Excel Files

Excel binaries can't be merged by git — `.gitattributes` marks them as binary to prevent garbled conflicts.

### Preventing conflicts

**Coordinate before editing the same file.** Quick message in Teams: *"Working on WIP_NFL_Survey_v0.xlsx for the next hour."* This is the most important rule.

### If two people edited the same Excel

1. Both push their versions — git will mark the file as conflicted
2. **One person** opens both versions side-by-side
3. Manually copy the changes from one into the other
4. Commit the reconciled file:
   ```bash
   git add working/survey/WIP_NFL_Survey_v0.xlsx
   git commit -m "survey: reconciled WIP_NFL_Survey_v0.xlsx — merged Robert's DI questions + Alex's TI fixes"
   ```
5. Tell the team what was reconciled

### Never overwrite someone's Excel changes

If you're not sure what changes are in the pushed version, read it first before overwriting with your local version.

---

## Never Modify Source-of-Truth Workbooks Directly

`working/scoring/NFL_Scorecard_Master_Combined_v1.2.xlsx` is the scoring source of truth.

**Rule:** Always generate a new version with a bumped filename. Never save over v1.2.

If you need to modify it:
1. Ask the data-analyst agent to write an openpyxl script
2. The script reads v1.2, makes changes, and saves as `_v1.3.xlsx`
3. Commit the new version, archive the old one

```bash
python3 scripts/update_scoring.py   # generates _v1.3.xlsx
git add working/scoring/NFL_Scorecard_Master_Combined_v1.3.xlsx
git mv working/scoring/NFL_Scorecard_Master_Combined_v1.2.xlsx archive/
git commit -m "scoring: bumped to v1.3 — added DI layer weight prototype update"
```

---

## PR Review Guidelines

When you review a PR for `.claude/` changes:

**Check:**
- [ ] Does the skill/agent description trigger correctly? (too broad = misfires, too narrow = never triggers)
- [ ] Are file paths correct? (`working/survey/`, `reference/`, not root-level paths)
- [ ] Does it use v2 framework? (`TI_/DI_/TS_/AI_` — not `ID_` or old 5-area names)
- [ ] Would an output from this skill/agent be immediately useful?
- [ ] Is `allowed-tools` as restrictive as possible?

**Quick test:** Mentally trace a realistic prompt through the skill. Does Claude produce what you'd expect?

Approve and merge, or request changes with a specific comment. Don't leave PRs open more than 24 hours.

---

## Archive, Don't Delete

Old files, superseded versions, and legacy content go to `archive/`. Never delete project files from the repo.

```bash
git mv old-file.xlsx archive/old-file.xlsx
git commit -m "archive: moved superseded NFL_Scorecard_Master_Combined_v1.1.xlsx"
```

---

## Keeping Claude Context Current

Claude's behavior depends on `CLAUDE.md`. If it gives wrong answers, the fix is almost always in that file.

**Signs CLAUDE.md needs updating:**
- Claude references old files or paths
- Claude is confused about which layer a technology belongs to
- Claude doesn't know about a decision the team made
- Claude presents prototype scoring as finalized

When you notice this, open a PR to update CLAUDE.md. Use the knowledge-manager agent to draft the change:
```
CLAUDE.md seems outdated — [describe what's wrong]. Draft the update.
```

---

## Questions and Escalation

| Question | Ask |
|----------|-----|
| Project context, stakeholder questions | Robert |
| Survey methodology decisions | Robert or team sync |
| Scoring weight confirmation | Robert → Jon Wakefield |
| Claude Code issues | Check docs/claude-guide.md first, then Robert |
| GitHub access issues | Robert |
