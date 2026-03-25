# Contributing to the NFL Scorecard Plugin

This document is for all team members. It covers two things:
1. **How we work together** — git workflow, file ownership, communication
2. **How to develop Claude tooling** — quality standards for skills, agents, and CLAUDE.md

Claude reads this file too. When someone asks Claude to help improve a skill or agent, Claude should follow these standards.

---

## Getting Started (New Teammate — One-Time Setup)

**Requirements:** Git, Python 3, Claude Code

```bash
# 1. Clone the repo
git clone https://github.com/RT3-ACN/nfl-scorecard.git
cd nfl-scorecard

# 2. Install the pre-push hook (blocks accidental pushes to main)
git config core.hooksPath .githooks

# 3. Open Claude Code — all skills, agents, and rules load automatically
claude
```

That's it. You now have the same Claude setup as everyone else — all skills (`/survey-review`, `/scoring-design`, etc.), agents, and project context are committed to the repo and load automatically on launch.

---

## Daily Workflow (Everyone, Every Session)

**Before you do anything:**
```bash
git pull origin main
```
Always pull first. Gets you the latest skills, rules, and working files before you start.

**Before editing any `.xlsx` file:**
> Send a quick message to the team (Teams/Slack): **"Taking [filename]"**

Git cannot merge binary files. If two people edit the same Excel at the same time, one version gets overwritten. The message takes 5 seconds and prevents it entirely.

**End of session:**
```bash
git add .
git commit -m "survey: [what you did]"
git push origin main   # or your branch — see below
```

---

## The Two Types of Work in This Repo

| Type | Where | Git workflow | Review needed? |
|------|--------|--------------|----------------|
| **Survey content** — questions, scoring, deliverables | `working/` | Commit to `main` directly | No — just coordinate |
| **Claude tooling** — agents, skills, CLAUDE.md, rules | `.claude/` | Branch → PR → review | Yes — one reviewer |

---

## Git Workflow

### For working files (`working/`)

Pull before you start. Commit after meaningful progress. Push when done for the day.

```bash
git pull origin main
# ... do your work ...
git add working/survey/WIP_NFL_Survey_v0.xlsx working/survey/NFL_Survey_Question_Review.md
git commit -m "survey: added 3 AI layer questions on GenAI deployment maturity"
git push origin main
```

**Commit message format for working files:**
```
[area]: [what changed] — [brief context if needed]

Examples:
  survey: fixed DI_05 non-response handling per backlog item #2
  scoring: updated v1.2 scoring weights prototype — pending Jon confirmation
  working: reconciled V0/V1 combined sheet formatting
```

**On Excel conflicts:** Git marks binary files as conflicted but can't merge them. If two people edited the same Excel file:
1. One person opens both versions and manually reconciles changes
2. Commit the reconciled file with message: `reconciled [filename] — merged [Name1] + [Name2] changes`
3. Tell the team in Slack/Teams what you reconciled

### For Claude tooling (`.claude/`)

Always branch. Always get one review. CLAUDE.md is the most sensitive file — a bad change there affects every session for every team member.

```bash
git checkout -b dev/[yourname]-[what-youre-changing]
# e.g. dev/robert-survey-review-v2

# make your changes

git push origin dev/robert-survey-review-v2
# open PR on GitHub, tag one teammate for review
```

**What needs a PR:**
- Any `.claude/agents/*.md` change
- Any `.claude/skills/*/SKILL.md` change
- Any `CLAUDE.md` change
- New skills or agents

**What does NOT need a PR:**
- Fixing a typo in a skill description
- Updating a file path reference (e.g., when a working file moves)
- Adding a question to `working/survey/`

---

## Standards for Skills

A skill is the primary interface for repeatable tasks. Every team member will invoke these — quality matters.

### The description field is the most important line

Claude uses the description to decide when to auto-invoke a skill. Write it as:
- **What it does** — one sentence, specific
- **When to use it** — explicit trigger condition
- **PROACTIVELY use** — add this phrase only if it should fire without being asked

```yaml
# Good — specific trigger, clear output
description: Reviews NFL scorecard survey questions for methodology quality — bias, clarity,
  MECE compliance, rubric completeness. Use when developing, editing, or validating questions.

# Bad — too vague, will misfire
description: Helps with survey questions
```

### Quality checklist before merging a skill change

- [ ] Description triggers on the right prompts (test mentally: "would Claude invoke this for X?")
- [ ] `$ARGUMENTS` is used where the user needs to pass input
- [ ] References correct files — `working/survey/WIP_NFL_Survey_v0.xlsx`, not `nfl_master-csv.txt`
- [ ] Uses v2 framework prefixes (`TI_`, `DI_`, `TS_`, `AI_`) — not `ID_` or old names
- [ ] Output format section produces something Claude can immediately act on
- [ ] `allowed-tools` is as restrictive as possible (read-only skills don't need Write/Edit)

### Skill file structure

```markdown
---
name: skill-name
description: One sentence what + trigger condition. Use when [specific scenario].
allowed-tools: Read, Grep, Glob    ← list only what's needed
---

[What Claude should do when this skill runs]

$ARGUMENTS

## [Section heading]
...

## Output Format
[Exactly what Claude should produce]
```

---

## Standards for Agents

An agent is a specialized collaborator with deep domain expertise. Keep agents focused — one domain per agent.

### Quality checklist before merging an agent change

- [ ] Scope is narrow — agent does one thing well, not everything
- [ ] **Core References** section lists accurate, current file paths
- [ ] **Working Process** is step-by-step and deterministic (Claude can follow it without guessing)
- [ ] **Known Issues** section captures the gotchas that will trip up a less-experienced contributor
- [ ] `model: sonnet` is appropriate — use `haiku` for lightweight tasks, `opus` only if genuinely needed
- [ ] Framework version is correct (v2: TI_/DI_/TS_/AI_, physical endpoints → DI_)

---

## Standards for CLAUDE.md

`CLAUDE.md` is loaded at the start of every Claude session. It's the highest-leverage file in the repo.

**Rules:**
- Keep it under 200 lines — compliance drops above that
- Every line must pass the test: *"Would removing this cause Claude to make a mistake?"*
- If a decision is made or a file moves, update CLAUDE.md in the same PR
- Imperative voice: "Read reference docs before drafting" not "Reference docs should be read"
- Bold critical rules with `**`

**What belongs in CLAUDE.md:**
- Framework structure (layers, prefixes, v2 rules)
- Active file locations
- Critical quality rules
- Known issues that affect Claude's work
- Open decisions Claude needs to know about

**What does NOT belong in CLAUDE.md:**
- Full question schema details (that's in agent files)
- Scoring formula details (that's in `reference/NFL_Scorecard_Methodology_v1.2.md`)
- Anything covered in reference docs — CLAUDE.md points to them, doesn't duplicate them

---

## Adding a New Skill or Agent

1. Branch: `dev/[yourname]-new-[name]`
2. Create the file following the templates above
3. Test: write 3 realistic prompts a team member might use. Would Claude invoke the skill correctly? Would the output be useful?
4. Add the skill/agent to `plugin.json`
5. PR with: what the new tool does, what gap it fills, example prompt that triggers it
6. Get one review, merge

---

## What NOT to Commit

- Personal API keys, tokens, or credentials (use environment variables)
- Generated PDF reports (produce on demand, don't commit outputs)
- `~$*.xlsx` temp files (OneDrive lock files — already in .gitignore)
- `CLAUDE.local.md` — personal local overrides stay local

---

## Keeping the Repo Healthy

At the end of each significant work session, ask the `knowledge-manager` agent to:
1. Update `working/survey/NFL_Survey_Question_Review.md` with any decisions made
2. Flag if `CLAUDE.md` needs updating
3. Capture any open decisions that emerged

This keeps the repo useful for the next session — whoever picks it up next.
