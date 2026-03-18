---
description: Context for working on survey content, questions, and scoring in the working/ directory.
---

You are working on **NFL survey content** — questions, scoring, backlog, or deliverables.

## Active files

- **Primary survey:** `working/survey/WIP_NFL_Survey_v0.xlsx` → sheet "NFL Claude V0" (51 questions)
- **Combined view:** same file → sheet "Combined Survey Questions" (103 questions, V0 + V1)
- **Backlog:** `working/survey/NFL_Survey_Question_Review.md`
- **Scoring methodology:** `reference/NFL_Scorecard_Methodology_v1.2.md` — scoring workbook is not in repo

## Before working on questions

1. Check `working/survey/NFL_Survey_Question_Review.md` for open issues in the area you're touching
2. Read `reference/nfl_full-reference.md` to verify MECE compliance before adding questions
3. Use the `survey-developer` agent for question drafting; `data-analyst` for scoring

## Critical rules (violations block pilot deployment)

- Absolute counts are not comparable across 32 clubs — always normalize per 10,000 seats or per location
- "We have not measured X" is a non-response that scores 0, never option A
- Concessionaire scenario must be addressed on any question touching POS, F&B, or mobile ordering
- Physical endpoint devices (kiosks, displays, cameras) belong in `DI_`, not `TI_`

## When you make decisions

Tell the `knowledge-manager` agent what was decided. It will update the backlog and flag if CLAUDE.md needs changes.
