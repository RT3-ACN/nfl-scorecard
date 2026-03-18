---
name: scoring-design
description: Builds the NFL scorecard scoring methodology from the question set. Use when designing or refining how survey responses will be scored, weighted, and rolled up into maturity scores. Covers scoring template assignment, dimension classification, weighting options, tier thresholds, and methodology documentation.
allowed-tools: Read, Glob, Grep
---

Design the NFL Stadium Technology Scorecard scoring methodology.

Read before starting:
- `working/survey/WIP_NFL_Survey_v0.xlsx` → "NFL Claude V0" — the 51 active questions that must be scored
- `reference/nfl_voice_of_the_fan_research.md` — VOF outcome data; informs what dimensions and layers deserve higher weight
- `reference/nfl_stadium_tech_revenue_research.md` — revenue benchmarks; informs business impact weighting
- `reference/NFL_Scorecard_Methodology_v1.2.md` — pitch-era prototype; treat as a directional reference only, not a spec

$ARGUMENTS

---

## Phase 1 — Score Each Question

For every question in "NFL Claude V0", assign:

**Scoring Template** — which template fits the question's answer progression:
| Template | When to use |
|----------|-------------|
| T1 | Maturity ladder: staged capability adoption (None → Piloting → Deployed → Optimized) |
| T2 | Coverage/reach: what % of the venue, fans, or locations are covered |
| T3 | Lower-is-better metric: latency, wait time, error rate, downtime |
| T4 | Higher-is-better metric: adoption rate, throughput, uptime % |
| T5 | Governance/controls: security posture, data governance, compliance maturity |
| O  | Outcomes: whether performance is measured and drives decisions |

**Dimension** — what aspect of maturity the question measures:
- **E (Existence)** — does the capability exist at all?
- **C (Coverage)** — how widely is it deployed across the venue?
- **P (Performance)** — how well does it perform?
- **G (Governance)** — how well is it managed, secured, and governed?
- **O (Outcomes)** — is performance measured and acted on?

Output a table:
| Question ID | Question (brief) | Template | Dimension | Rationale |
|-------------|-----------------|----------|-----------|-----------|

---

## Phase 2 — Propose Weighting Approach

Present 2–3 distinct weighting options for:

**A. Dimension weights (E/C/P/G — O typically excluded from roll-up or treated separately)**
For each option, explain:
- What philosophy it reflects (e.g., "deployment-first" vs. "performance-first" vs. "balanced")
- Which clubs it will favor and why
- How it aligns with what NFL/Gary Brantley is likely to value

**B. Layer weights (TI/DI/TS/AI → Overall Maturity Index)**
Consider:
- Equal weighting (simplest, most defensible)
- VOF-correlated weighting (higher weight to layers with stronger fan satisfaction correlation)
- Strategic emphasis (higher weight to AI/TS to signal where the league wants clubs to invest)

**C. Roll-up approach**
Options:
- Simple average within each dimension → weighted sum to layer score → weighted sum to overall
- Normalized 0–100 scale per layer with equal contribution to overall
- Confidence-adjusted (flag low-confidence responses and reduce their weight)

For each option, produce a sample score calculation using 2–3 hypothetical clubs to show how different approaches produce different rankings.

---

## Phase 3 — Maturity Tier Thresholds

Propose maturity tier cutoffs for the Overall Maturity Index (0–100):

| Tier | Score Range | What it means |
|------|-------------|---------------|
| Emerging | TBD | Early-stage adoption, significant gaps |
| Developing | TBD | Foundational capabilities in place, uneven deployment |
| Advanced | TBD | Broad deployment, performance-managed |
| Leading | TBD | Optimized, outcomes-driven, benchmark-setting |

Calibrate thresholds against:
- What a realistic top-performing NFL venue looks like today (should be "Advanced" or "Leading")
- What a mid-tier venue looks like (should be "Developing")
- The score distribution across 51 questions — thresholds should spread clubs meaningfully, not cluster them

---

## Phase 4 — Output Methodology Document

Produce a draft `working/survey/NFL_Scoring_Methodology_Draft.md` containing:

1. **Scoring approach summary** (1 paragraph, plain English — for club stakeholders)
2. **Question scoring table** (Phase 1 output)
3. **Recommended weighting approach** with rationale
4. **Roll-up formula** (pseudocode + Tableau formula)
5. **Maturity tier thresholds** with calibration rationale
6. **Open decisions** — what still needs team/Jon Wakefield sign-off before finalizing

Label the document: **DRAFT — pending team review and Jon Wakefield confirmation**

---

## Design Principles

- **Defensibility over precision** — the methodology must be explainable to a club CIO in 2 minutes. Avoid over-engineered formulas.
- **VOF alignment** — weight toward dimensions and layers that correlate with fan satisfaction outcomes. Use `reference/nfl_voice_of_the_fan_research.md` to justify choices.
- **Spread matters** — a good methodology produces meaningful differentiation across 32 clubs, not clustering.
- **Governance and Outcomes deserve weight** — clubs that measure and act on performance should score higher than clubs that deployed technology but never governed it.
- **No hardcoding** — all weights must be stored as named parameters, not embedded in formulas. They will change.
