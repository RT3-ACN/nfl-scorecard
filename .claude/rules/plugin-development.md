---
description: Standards for modifying Claude agents, skills, and CLAUDE.md in this repo. Load when working in .claude/ directory.
---

You are working on the **Claude tooling layer** of the NFL Scorecard project — agents, skills, or CLAUDE.md.

## Before making any change

1. Read the current file in full before editing
2. Check CONTRIBUTING.md for the quality standard that applies
3. Understand why the current version was written the way it is before changing it

## Rules for this layer

- **Don't break working sessions** — a bad agent or skill change immediately affects all three team members. Test your mental model of a realistic prompt before proposing changes.
- **Description fields are critical** — changing a skill description changes when Claude invokes it. Think carefully before rewording.
- **File path accuracy** — any reference to `nfl_master-csv.txt` is stale. Correct path is `working/survey/WIP_NFL_Survey_v0.xlsx`. Reference docs live in `reference/`.
- **Framework version** — always use v2: prefixes `TI_`, `DI_`, `TS_`, `AI_`. Physical endpoints → `DI_`. `TI_` = connectivity only. Never use `ID_` or the old 5-area model.
- **Propose, don't auto-apply** — when improving a skill or agent, show the before/after diff and explain what changes and why before editing.

## When done

Summarize what changed, what it affects, and whether `plugin.json` needs updating.
