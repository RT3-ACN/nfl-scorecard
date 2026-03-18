---
name: scorecard-report
description: Generates a club maturity assessment report from scored survey data. Use when preparing executive readouts or deliverable reports for NFL pilot clubs after survey completion.
allowed-tools: Read, Glob, Grep
---

Generate a maturity assessment report for NFL club: $ARGUMENTS

Reference files (read before generating):
- `reference/NFL_Scorecard_Methodology_v1.2.md` — scoring formulas, maturity tier thresholds
- `reference/nfl_voice_of_the_fan_research.md` — VOF benchmarks, tech-to-revenue correlations
- `reference/NFL_Technology_Areas_Definitions.md` — area scope definitions

## Report Structure

### 1. Executive Summary (target: 1 page)
- Club name, assessment date, survey wave
- **Overall Technology Maturity Index** (0–100, confidence-adjusted)
- **Tier:** Emerging (<40) | Developing (40–60) | Advanced (60–80) | Leading (>80)
- Top 3 strengths (highest NormalizedAreaScore)
- Top 3 priority gaps (lowest score × highest VOF business impact weight)
- One-sentence strategic narrative: "_[Club] has a strong foundation in [area] but faces a critical gap in [area] that is directly limiting [fan outcome/revenue outcome]._"
- Benchmark position: above/below pilot cohort average (by area)

### 2. Layer Scorecards (one section per layer)
For each of the 4 layers — Technology Infrastructure (TI_), Digital Infrastructure (DI_), Technology Services (TS_), AI & Innovation (AI_):

**Scorecard block:**
| Metric | Score |
|--------|-------|
| Area Score (0–100) | — |
| Existence (E) | — |
| Coverage (C) | — |
| Performance (P) | — |
| Governance (G) | — |
| Outcomes (O) | — |
| Pilot Benchmark | — |
| Gap | — |

- Top 3 highest-scoring questions with rubric anchor text
- Top 3 lowest-scoring questions with rubric anchor text
- 2–3 specific, actionable recommendations with business impact rationale
- Ground each recommendation in a VOF-correlated benchmark (e.g., "Deploying mobile ordering typically delivers 22% higher order values and drives alcohol attachment — the highest-margin SKU")

### 3. Quick Wins Roadmap
List 5–8 high-impact, lower-effort improvements:

| Capability | Current State | Target State | Business Impact | Timeline |
|-----------|--------------|-------------|-----------------|----------|
| [from scoring data] | [rubric anchor for current score] | [T1/T2 one-level-up anchor] | [VOF-backed $ or % metric] | 0–6 months |

Anchor impact to VOF outcome categories:
- **Fan Experience** — satisfaction scores, NPS, VOF ranking
- **Revenue** — per-cap spend, ticket yield, F&B attachment
- **Operational Efficiency** — labor cost, throughput, dwell time
- **Modernization Readiness** — platform extensibility, data quality, vendor independence

### 4. Strategic Initiatives
2–3 longer-horizon investments warranting dedicated planning:

For each:
- **Business case:** Why this matters at the NFL level (not just for this club)
- **Dependencies:** What must be in place first (e.g., CDP required before personalization)
- **Timeline tier:** Near-term (0–6mo) | Mid-term (6–18mo) | Strategic (18mo+)
- **Estimated impact range** (cite comparable NFL or sports venue data where available)

### 5. Methodology Note (for club stakeholders)
- Brief, plain-English explanation of scoring approach (1 paragraph)
- Note that the scorecard is designed for directional benchmarking, not compliance scoring
- Mention league-wide benchmarking program scope (32 clubs)
- Cite confidence tagging and what it means for data quality

## Tone & Style
- Executive-ready: clear, direct, action-oriented
- Avoid hedging language — every finding should point to a specific action
- Use specific $ / % benchmarks from `reference/nfl_voice_of_the_fan_research.md` wherever possible
- Treat the club's CIO as the primary reader; assume they will share with the NFL SVP & CIO (Gary Brantley)
