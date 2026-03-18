# Skills Reference — Slash Commands

Skills are the primary repeatable-task interface for Claude on this project. Invoke them by typing the command in a Claude Code session.

---

## `/survey-review`

**What it does:** Reviews NFL scorecard survey questions for methodology quality — bias, clarity, MECE compliance, scoring template fit, structural traps, and evidence feasibility.

**When to use:**
- Before deploying any questions to pilot clubs
- After adding a new batch of questions
- When a question feels off but you can't pinpoint why
- During peer review of a colleague's draft questions

**How to invoke:**

Review the full active question set:
```
/survey-review
```

Review a specific layer:
```
/survey-review — focus on the TI layer
/survey-review — review all DI layer questions
```

Review a specific question:
```
/survey-review — check question DI_05
```

Review for a specific issue:
```
/survey-review — look specifically for concessionaire scenario gaps
```

**What Claude reads:** `working/survey/WIP_NFL_Survey_v0.xlsx` → "NFL Claude V0", `working/survey/NFL_Survey_Question_Review.md` (to avoid re-reporting known issues)

**Output format:**
- Per-issue: Question ID | Issue type | Severity (Critical / Major / Minor) | Suggested fix
- Summary table: questions reviewed, issue counts by severity, quality score /10, recommendation

**Issue severity:**
- **Critical** — blocks valid scoring (non-comparable data, scoring logic broken)
- **Major** — degrades data quality (ambiguous options, missing concessionaire handling)
- **Minor** — polish (wording improvement, guide text clarification)

**Example output excerpt:**
```
DI_03 | Counts & Normalization | Critical
Issue: Uses absolute kiosk count (1–5, 6–15, etc.) — not comparable across venue sizes.
Fix: Normalize to kiosks per 10,000 seats. Or split into: (a) self-service kiosk density, (b) checkout-free stores (Y/N + count normalized).
```

---

## `/question-draft`

**What it does:** Drafts a new survey question in the complete 9-field schema. Checks for MECE overlap with existing questions before drafting. Applies all quality rules automatically.

**When to use:**
- When adding coverage in a sub-area not yet addressed
- When a V1 question needs to be rewritten to meet quality standards
- When the team identifies a gap in the current question bank

**How to invoke:**

Draft for a specific layer and topic:
```
/question-draft TI — Wi-Fi uptime and reliability SLA
/question-draft DI — cloud infrastructure deployment maturity
/question-draft TS — workforce management platform adoption
/question-draft AI — computer vision use cases in fan-accessible areas
```

Draft to fill a specific gap:
```
/question-draft — we need a question on DAS coverage quality, not just existence
```

Replace a specific question:
```
/question-draft — rewrite DI_05 to fix the non-response handling issue
```

**What Claude reads:** `working/survey/WIP_NFL_Survey_v0.xlsx` "NFL Claude V0" (for MECE check), `reference/nfl_full-reference.md` (for sub-category map), `reference/nfl_voice_of_the_fan_research.md` (for benchmarks)

**Output format:** Complete 9-field schema question, followed by self-check checklist.

**After the draft:** Review the output, then decide whether to add it to the Excel. Claude won't modify `working/survey/WIP_NFL_Survey_v0.xlsx` automatically — you add it manually or ask Claude to script the addition via openpyxl.

**Quality gates Claude applies automatically:**
- Single construct check (no double-barreled questions)
- Count normalization (no absolute counts)
- Non-response in Answer Guide, not on scale
- Concessionaire scenario check (if applicable)
- MECE overlap check against existing questions
- At least one business benchmark in Guide Explanation

---

## `/dashboard-spec`

**What it does:** Generates a Tableau dashboard specification for the NFL Stadium Technology Scorecard (Deliverable D) — including data source requirements, calculated fields, wireframe description, and filter options.

**When to use:**
- Designing a new dashboard view
- Documenting an existing design for stakeholder alignment
- Building the Tableau calculated field formulas
- Reviewing dashboard scope with the team

**How to invoke:**

Generate a specific view spec:
```
/dashboard-spec executive summary view
/dashboard-spec club comparison view
/dashboard-spec gap analysis prioritization matrix
/dashboard-spec fan journey heatmap
```

Generate the full dashboard spec:
```
/dashboard-spec — full Deliverable D specification
```

Review and critique an existing spec:
```
/dashboard-spec — review the current executive summary view for completeness
```

**What Claude reads:** `reference/NFL_Scorecard_Methodology_v1.2.md`, `reference/nfl_voice_of_the_fan_research.md`

**Output format:** Per view — purpose, data fields required, Tableau calculated field formulas (labeled as prototype), filter options, text wireframe description, open questions/decisions.

**Important:** All scoring formulas in dashboard specs are labeled **"Prototype — scoring methodology subject to change"** until Jon Wakefield confirms weights.

**The 6 planned dashboard views:**
1. Executive Summary (1-page printable, gauge + radar)
2. Club Comparison (grouped bar, all 4 layers × all pilot clubs)
3. Dimension Drill-Down (heat map, E/C/P/G/O within selected layer)
4. Gap Analysis / Prioritization Matrix (scatter plot, business impact vs. maturity gap)
5. Fan Journey Heatmap (journey stages × technology layers)
6. Progress Tracker (trend line shell for Wave 1 → Wave 2 → Wave 3)

---

## `/scorecard-report`

**What it does:** Generates a club maturity assessment report from scored survey data — executive summary, per-layer scorecards, quick wins roadmap, strategic initiatives, and methodology note.

**When to use:**
- After a pilot club completes the survey and scores are calculated
- Building the report template ahead of pilot data
- Preparing sample output to show client stakeholders what the deliverable looks like

**How to invoke:**

Generate a report for a specific club:
```
/scorecard-report Dallas Cowboys
/scorecard-report Philadelphia Eagles
```

Generate a template report (placeholder data):
```
/scorecard-report — generate a template with placeholder data to show format
```

**What Claude reads:** `reference/NFL_Scorecard_Methodology_v1.2.md`, `reference/nfl_voice_of_the_fan_research.md`, `reference/NFL_Technology_Areas_Definitions.md`

**Output format:** Structured report with:
1. Executive Summary — Overall Maturity Index, tier, top 3 strengths, top 3 gaps, benchmark position
2. Layer Scorecards — per layer: E/C/P/G/O scores, top/bottom questions, recommendations grounded in VOF benchmarks
3. Quick Wins Roadmap — 5–8 high-impact improvements with timeline and business impact
4. Strategic Initiatives — 2–3 longer-horizon investments
5. Methodology Note — plain-English scoring explanation for club stakeholders

**Audience:** Club CIO (primary reader), shared with Gary Brantley (NFL SVP & CIO). Tone is executive-ready, action-oriented, grounded in specific $ and % benchmarks.
