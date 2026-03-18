---
name: question-draft
description: Drafts new NFL scorecard survey questions in the correct 9-field schema. Use when developing new questions for any of the 4 layers. Automatically checks for MECE compliance, applies quality rules, and outputs ready-to-review question rows.
allowed-tools: Read, Grep, Glob
---

Draft a new survey question for the NFL Stadium Technology Scorecard.

$ARGUMENTS

Read `working/survey/WIP_NFL_Survey_v0.xlsx` → "NFL Claude V0" sheet and the relevant section of `reference/nfl_full-reference.md` before drafting to check for MECE compliance and ID conflicts. (`archive/nfl_master-csv.txt` (legacy) is legacy — use the Excel file.)

**Active framework (v2):** 4 layers — `TI_` (connectivity only: Wi-Fi, DAS, 5G, cabling), `DI_` (cloud + data + physical endpoints: displays, kiosks, cameras, POS hardware), `TS_` (SaaS/ops platforms), `AI_` (intelligent capabilities). Physical endpoint devices belong in DI_, not TI_.

## Output Format

Produce one complete question row in this exact schema. Use pipe-delimited format for easy review:

---
**Survey Category:** [Layer name]
**Question ID:** [Prefix_##]
**Domain Covered:** [Sub-area]
**Question:** [The question text]
**Guide Explanation:** [Why this matters, what it measures, relevant benchmarks — 2–4 sentences]
**Answer Format:** 5-option single select
**Survey Answer Options Style:** Drop down
**Survey Answer Options Definitions:**
- A: [Lowest maturity / least deployment / worst performance]
- B: [...]
- C: [...]
- D: [...]
- E: [Highest maturity / broadest deployment / best performance]
**Answer Guide:** [How to calculate or determine the answer; what to do if data is unknown; scoring notes; edge cases]

---

## Quality Rules (apply to every draft)

**Structure**
- One construct per question — if you find yourself using "and" in the question text, it's likely double-barreled; split it
- Answer options must form a clean ordinal progression with no overlap and no ambiguous middle
- E should be achievable by leading venues today (not purely aspirational)
- A should represent a meaningful real-world state, not just "none"

**Counts and ratios**
- Never use absolute counts (kiosks, APs, cameras) — normalize to per-10,000 seats, per-concession-location, or per-gate
- When using percentage-based options, anchor each band to a real-world reference where possible

**Non-response handling**
- Never use "We have not measured X" or "Data not available" as a scale option (A–E)
- These belong in the Answer Guide with instruction to score as 0 and retain the reason label

**Concessionaire scenario**
- For any question touching POS, concession ordering, F&B inventory, or mobile ordering: add to the Guide Explanation — "Include technology operated by your concession operators (e.g., Aramark, Levy, Delaware North) unless otherwise specified."

**Language**
- Direct, factual, present tense
- Respondent is a club CIO or VP of Technology — jargon at that level is fine (Wi-Fi, DAS, CDP, ITSM, IAM)
- Avoid: "How would you rate...", "Do you feel...", anything that implies judgment rather than fact

**Guide Explanation must include**
- What the question is measuring and why it matters for fan experience, revenue, or operations
- At least one benchmark or business outcome reference where available (from `reference/nfl_voice_of_the_fan_research.md`)

**Answer Guide must include**
- How a respondent should calculate or determine their answer (e.g., "Count all deployed access points in fan-accessible areas including bowl, concourse, clubs, and suites")
- What to do if the data is unknown
- Any common edge cases or clarifications

## After Drafting

Run this self-check before presenting:
- [ ] Single construct?
- [ ] Clean A→E progression?
- [ ] No absolute counts?
- [ ] "Not measured" handled in Answer Guide, not scale?
- [ ] Concessionaire scenario addressed (if applicable)?
- [ ] No MECE overlap with existing questions?
- [ ] Guide Explanation has a benchmark or business outcome?
- [ ] Answer Guide has calculation instructions?

If any box is unchecked, revise before presenting.
