# Claude Guide — Using Claude Effectively on This Project

**This document is for both human team members and Claude instances.**

Claude: when loaded as context, use this to understand how you should behave on NFL project sessions — what tools to use, when to use them, what to avoid, and how to handle common tasks.

---

## What Claude Knows From CLAUDE.md

When opened from the repo root, Claude automatically loads `CLAUDE.md` and knows:

- The v2 4-layer framework (TI/DI/TS/AI prefixes, layer scope rules, v2 decisions)
- Active file location: `working/survey/WIP_NFL_Survey_v0.xlsx` (the only working Excel in the repo)
- Question quality rules (normalization, non-response handling, concessionaire scenario)
- The 3 known critical issues (DI_03, DI_05, TS_01)
- Open decisions the team hasn't finalized
- Available skills and agents

**Claude should know all of this without you explaining it.** If it seems confused about the framework or references old files, run `/clear` and reopen from the repo root.

---

## Available Tools

### Slash Commands (Skills)

| Command | What it does | Best for |
|---------|-------------|----------|
| `/survey-review` | Reviews questions for bias, clarity, MECE compliance, scoring template fit, structural traps | Before deploying any questions; after adding a new batch |
| `/survey-review [layer]` | Reviews specific layer | `"/survey-review TI layer"` |
| `/question-draft [layer] [topic]` | Drafts one complete question in the 9-field schema | When you need a new question done right the first time |
| `/dashboard-spec [view name]` | Generates Tableau dashboard spec with calculated fields + wireframe | Designing or documenting dashboard views |
| `/scorecard-report [Club Name]` | Generates club maturity assessment report | After survey data is collected and scored |

**Invoke skills by typing the command.** Claude will read the relevant files and produce structured output.

### Agents

Agents are specialized collaborators with deep domain knowledge. Claude routes tasks to them automatically, or you can invoke them explicitly.

| Agent | What they own | When to use explicitly |
|-------|--------------|----------------------|
| `survey-developer` | Question methodology, schema compliance, MECE coverage, rubric design | When you want focused question work |
| `data-analyst` | Scoring calculations, Tableau specs, Excel/Python scripting | When building or debugging scoring models or dashboard specs |
| `knowledge-manager` | Backlog updates, CLAUDE.md maintenance, end-of-session capture | After decisions are made; at the end of a work session |

**Invoke by mentioning:** *"Use the survey-developer agent to..."* or just describe the task — Claude picks the right agent.

---

## Common Task Patterns

### Review the current question set
```
/survey-review
```
Claude reads `working/survey/WIP_NFL_Survey_v0.xlsx` and assesses all 51 questions against methodology, structural, and scoring criteria.

### Review a specific layer
```
/survey-review — focus on the DI layer questions
```

### Fix a known backlog issue
```
Fix DI_05 — the "not measured" non-response issue from the backlog
```
Claude reads `working/survey/NFL_Survey_Question_Review.md`, understands the specific problem, and proposes a before/after fix.

### Draft a new question
```
/question-draft DI — cloud data storage tier maturity
```
Claude checks existing questions for MECE overlap, then produces a complete 9-field schema question ready to add to the Excel.

### Compare V0 and V1 questions for a layer
```
Compare the AI layer questions from Claude V0 vs Survey Questions V1 in the combined sheet.
Which are stronger and why?
```

### Write a scoring formula
```
Write the Tableau calculated field for layer-level normalized score using the v1.2 methodology
```
Routes to data-analyst agent.

### End-of-session capture
```
We decided to use V0 TI questions and discard V1's TI section. Update the backlog and flag if CLAUDE.md needs changes.
```
Routes to knowledge-manager agent.

### Improve a skill
```
The /survey-review skill should check whether each question addresses the concessionaire scenario. Update it.
```
Claude reads CONTRIBUTING.md, proposes the diff, then applies after your approval.

---

## Session Start Pattern

At the start of a substantive work session, orient Claude:

```
Check the backlog and tell me: (1) what the 3 critical issues are, (2) what's been decided since the last session, and (3) what the open decisions are.
```

For returning sessions after time away:
```
git log --oneline -10
```
Then: *"Summarize what changed in these commits and tell me the current state."*

---

## Session End Pattern

Before closing:
```
We made the following decisions today: [list them].
Update NFL_Survey_Question_Review.md, close any resolved backlog items, and tell me if CLAUDE.md needs updating.
```

Then commit:
```bash
git add working/
git commit -m "survey: [what changed today]"
git push origin main
```

---

## What Claude Should NOT Do

These are hard rules. If Claude does any of these, stop it and correct the behavior.

| Don't | Why |
|-------|-----|
| Reference any Excel file other than `WIP_NFL_Survey_v0.xlsx` | It is the only working file in the repo — all others are retired |
| Use `ID_` layer prefix | Old framework — v2 uses `TI_` |
| Reference 5 technology areas or "Digital Services" as a layer | Old model — v2 has 4 layers: TI/DI/TS/AI |
| Put kiosks, displays, cameras in `TI_` | Physical endpoints belong in `DI_` |
| Present prototype scoring weights as finalized | Weights are not confirmed — always label as "Prototype" |
| Commit changes without being asked | Claude proposes; humans commit |
| Modify `.claude/` files without showing a diff first | Always propose before applying tooling changes |
| Reference `nfl_master-csv.txt` as the active question set | Legacy — superseded by `working/survey/WIP_NFL_Survey_v0.xlsx` |

---

## Troubleshooting

**Claude uses old framework (ID_ prefix, 5 areas, Digital Services)**
→ Run `/clear` and reopen from repo root. If it persists, CLAUDE.md may have an issue — check it.

**Claude doesn't know about a recent decision**
→ Claude doesn't retain memory between sessions. Capture decisions in the backlog. At session start, ask Claude to read the backlog.

**Skill doesn't trigger automatically**
→ Invoke manually: `/survey-review` or `/question-draft [args]`

**Claude modified a file unexpectedly**
→ `git diff` to see changes. `git restore [filename]` to revert.

**Claude gives inconsistent answers about question counts or IDs**
→ Ask it to read `working/survey/WIP_NFL_Survey_v0.xlsx` directly: *"Read the NFL Claude V0 sheet and tell me the current TI layer question IDs."*

---

## Tips for Better Sessions

**Be specific about the layer you're working on.** Claude performs better with scope.
- Instead of: *"Review the questions"*
- Use: *"Review the TI layer for normalization issues"*

**Tell Claude what decisions were made.** It can't read your team meetings.
- *"We decided [X]. Update the backlog to reflect this."*

**Chain tasks in one prompt.**
- *"Draft a new AI question on GenAI deployment maturity, then run it through /survey-review before showing me"*

**Reference specific files when you want precision.**
- *"Read working/survey/NFL_Survey_Question_Review.md and tell me the status of the DI_05 issue"*

**Ask Claude to explain its reasoning on quality calls.**
- *"You flagged AI_04 as a major issue — why exactly, and what would a good fix look like?"*
