---
name: survey-review
description: Reviews NFL scorecard survey questions for methodology quality — bias, clarity, MECE compliance, rubric completeness, scoring template fit, and dimension balance. Use when developing, editing, or validating questions for the Stadium Technology Scorecard.
allowed-tools: Read, Grep, Glob
---

Review the specified survey questions (or the full active set in `working/survey/WIP_NFL_Survey_v0.xlsx` → "NFL Claude V0" if none specified) against these criteria. Also check `working/survey/NFL_Survey_Question_Review.md` for known issues before reviewing — don't re-report already-documented problems unless proposing a specific fix.

**Active framework (v2):** 4 layers — Technology Infrastructure (`TI_`, connectivity only), Digital Infrastructure (`DI_`, cloud + data + physical endpoints), Technology Services (`TS_`), AI & Innovation (`AI_`). Physical endpoint devices (displays, kiosks, cameras) belong in DI_, not TI_.

$ARGUMENTS

## Quality Checks

**1. Clarity & Language**
- No double-barreled questions (asking two things simultaneously)
- Jargon acceptable at CIO/VP-of-Technology level: Wi-Fi, DAS, CDP, ITSM, IAM, DTC — flag anything below that threshold
- Club-perspective imperative voice: "Our stadium..." / "We measure..." / "We deploy..."
- No leading language, loaded terms, or social desirability triggers

**2. Scoring Template Integrity**
- Template matches question intent:
  - T1 = capability maturity ladder (existence/deployment stages)
  - T2 = coverage/reach percentage
  - T3 = lower-is-better metric (latency, wait time, resolution time)
  - T4 = higher-is-better metric (adoption rate, throughput, uptime)
  - T5 = governance maturity (controls, audits, monitoring)
  - O = outcome measurement (is it measured? used to drive decisions?)
- All 5 answer options anchored with concrete, observable criteria — no vague middle options
- A=1 through E=5 ordinal ordering holds (no reversal, no gaps)
- Both non-response options present: "Data not available/unknown" and "We don't use this technology today"

**3. MECE Compliance**
- Cross-reference against `reference/nfl_full-reference.md` to check for duplicate scope
- Question belongs unambiguously in one layer (TI_, DI_, TS_, AI_) and one sub-area
- v2 rule: physical endpoint devices (displays, kiosks, cameras, POS hardware) → DI_, not TI_; TI_ = connectivity only
- Sub-area label is specific — flag "General" as unacceptable
- No question measurable as a direct derivative of another (e.g., avoid asking both total AP count and AP-per-seat if one implies the other)

**4a. Structural Traps (check every question)**
- Absolute counts not normalized by venue size → flag; suggest per-10K-seats or per-location normalization
- "We have not measured" used as option A (scores 1) instead of non-response (scores 0) → always flag as Critical
- Concessionaire scenario unaddressed in questions touching POS, F&B, concessions, or mobile ordering → flag as Major

**4. Evidence Feasibility**
- Evidence type is realistic for a club CIO/VP-Tech to retrieve within 2 weeks
- Examples: "Wi-Fi design doc, monitoring dashboard screenshot" — not just "internal documentation"
- Flag any question whose evidence requires data that clubs typically don't collect

**5. Dimension Balance**
- Check E/C/P/G/O distribution within the Technology Area under review
- Active question counts: TI=15, DI=16, TS=10, AI=10 (51 total in Claude V0); 103 in Combined sheet
- Flag if any single dimension dominates a layer (>50%) or is completely absent

## Output Format

For each issue:
- **Question ID** | **Question text (first 10 words)**
- **Issue type:** Clarity | Scoring | MECE | Evidence | Balance
- **Severity:** Critical (blocks valid scoring) | Major (degrades data quality) | Minor (polish)
- **Suggested fix** (specific, not generic)

End with a summary table:
| Metric | Value |
|--------|-------|
| Questions reviewed | N |
| Critical issues | N |
| Major issues | N |
| Minor issues | N |
| Overall quality score | X/10 |
| Recommendation | Ready to deploy / Needs revision / Significant rework |
