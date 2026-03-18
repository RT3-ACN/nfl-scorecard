# Agents Reference

Agents are specialized Claude collaborators with deep domain knowledge. Claude routes tasks to them automatically based on context, or you can invoke them explicitly.

---

## `survey-developer`

**Domain:** Survey methodology, question design, schema compliance, MECE coverage.

**What they know:**
- Psychometric instrument design — single-construct questions, ordinal anchoring, progressive rubric construction
- Technology maturity assessment dimensions: Existence, Coverage, Performance, Governance, Outcomes
- Stadium/venue technology domain — Wi-Fi, DAS, POS, mobile ordering, CDPs, digital signage, AI analytics
- Every quality rule in the framework (normalization, non-response, concessionaire scenario)
- MECE taxonomy — what belongs in each layer and sub-area

**When to use:**
- Drafting a new question from scratch
- Reviewing a question for methodology problems
- Deciding which layer a question belongs in
- Fixing a known backlog issue (DI_03, DI_05, TS_01)
- Comparing V0 and V1 questions and recommending which to keep
- Designing the answer option ladder for a new question

**When NOT to use:**
- Scoring calculations or weighting → use `data-analyst`
- Updating the backlog file or CLAUDE.md → use `knowledge-manager`
- Writing openpyxl scripts → use `data-analyst`

**How to invoke:**

Explicitly:
```
Ask the survey-developer agent to review the TI layer questions for normalization issues.
```

Implicitly (Claude routes automatically):
```
Is this question double-barreled? TI_07 asks about both node count and coverage quality.
```

**Core files it reads:**
- `working/survey/WIP_NFL_Survey_v0.xlsx` → "NFL Claude V0" (current questions)
- `working/survey/WIP_NFL_Survey_v0.xlsx` → "Combined Survey Questions" (V0 + V1 comparison)
- `reference/nfl_full-reference.md` (MECE sub-category map)
- `working/survey/NFL_Survey_Question_Review.md` (known issues backlog)

**What it will NOT do:**
- Modify Excel files directly (proposes changes, you apply them)
- Present scoring weights as finalized (they're prototype)
- Create questions without checking MECE overlap first

---

## `data-analyst`

**Domain:** Scoring calculations, Tableau dashboard design, Excel/Python scripting, statistical analysis.

**What they know:**
- Tableau: calculated fields, LOD expressions, dashboard actions, parameter controls, print layout
- Excel and openpyxl: workbook structure, formula design, column schema validation
- Survey data analysis: cross-tabulation, maturity distributions, gap analysis
- Sports venue analytics: VOF framework, fan experience KPIs, revenue benchmarking
- Scoring templates T1–T5 and O (agreed), dimension weights E/C/P/G (prototype)

**When to use:**
- Building or reviewing Tableau calculated fields
- Writing openpyxl scripts to modify or generate Excel workbooks
- Calculating maturity scores from raw survey responses
- Building the gap analysis or prioritization matrix
- Analyzing score distributions across pilot clubs
- Debugging formula errors in scoring workbooks

**When NOT to use:**
- Question methodology questions → use `survey-developer`
- Backlog updates → use `knowledge-manager`

**How to invoke:**

Explicitly:
```
Ask the data-analyst agent to write the Tableau calculated field for normalized layer score.
```

Implicitly:
```
Write an openpyxl script to add the new TS questions to the working survey Excel.
```

**Core files it reads:**
- `reference/NFL_Scorecard_Methodology_v1.2.md` (scoring framework)
- `reference/nfl_voice_of_the_fan_research.md` (outcome correlations + benchmarks)
- `working/survey/WIP_NFL_Survey_v0.xlsx` → "NFL Claude V0" (question structure for data model)

**Important constraint:** All scoring calculations are labeled **"Prototype — subject to change"** until methodology is confirmed. The data-analyst agent knows this and will always flag it.

**NFL brand colors** (for any visualization work):
- Navy: `#013369`
- Red: `#D50A0A`
- White: `#FFFFFF`

---

## `knowledge-manager`

**Domain:** Documentation, backlog management, CLAUDE.md maintenance, end-of-session capture.

**What they do:**
- Update `working/survey/NFL_Survey_Question_Review.md` — close resolved issues, add new ones, track decisions
- Update `CLAUDE.md` when framework decisions are confirmed
- Update `reference/NFL_Technology_Areas_Definitions.md` when layer boundaries change
- Update the knowledge brain entity at `~/knowledge/entities/project/nfl-scorecard.md`
- Flag when files need to be reorganized or archived

**When to use:**
- At the end of a work session — capture what was decided
- After a team decision is made (framework, question selection, scoring approach)
- When a critical issue in the backlog is resolved
- When CLAUDE.md feels out of date
- When a new file is created and needs to be indexed

**When NOT to use:**
- Question content work → use `survey-developer`
- Scoring or Tableau work → use `data-analyst`

**How to invoke:**

End of session:
```
We decided to keep V0's TI questions and discard V1's TI section. Capture this decision, update the backlog, and tell me if CLAUDE.md needs changing.
```

Resolve a backlog issue:
```
DI_05 has been fixed — the "not measured" option is now handled as a non-response. Close it in the backlog.
```

General capture:
```
Update the knowledge-manager with today's decisions: [list them]
```

**Core files it reads and writes:**
- `working/survey/NFL_Survey_Question_Review.md`
- `CLAUDE.md`
- `reference/NFL_Technology_Areas_Definitions.md`
- `~/knowledge/entities/project/nfl-scorecard.md`

**What it will NOT do:**
- Modify Excel workbooks
- Draft or review survey questions
- Make framework decisions — it records decisions, doesn't make them

---

## Choosing the Right Agent

| Task | Agent |
|------|-------|
| Is this question double-barreled? | survey-developer |
| Which layer does this technology belong in? | survey-developer |
| Fix the DI_03 normalization issue | survey-developer |
| Compare V0 vs V1 questions for the AI layer | survey-developer |
| Write the Tableau LOD expression for benchmark gap | data-analyst |
| Script adding new questions to the Excel via openpyxl | data-analyst |
| Debug a formula error in the scoring workbook | data-analyst |
| Build the gap analysis scatter plot spec | data-analyst |
| We made a decision — update the backlog | knowledge-manager |
| CLAUDE.md feels out of date | knowledge-manager |
| End of session — capture what we did | knowledge-manager |
| Add a new file to the repo and index it | knowledge-manager |

---

## Multi-Agent Patterns

Some tasks naturally chain across agents:

**Draft → Review:**
```
/question-draft AI — GenAI deployment in operations, then have the survey-developer agent review it before showing me
```

**Fix → Capture:**
```
Fix the TS_01 concessionaire issue, then update the backlog to mark it resolved
```

**Build → Spec:**
```
The scoring weights are confirmed as E=25%, C=25%, P=30%, G=20%. Update the data-analyst agent context and rebuild the Tableau layer score formula.
```
