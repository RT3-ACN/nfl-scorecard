---
tags: [project, work, client/nfl, reference]
date: 2025-02
---

# NFL Technology & Fan Experience Scorecard  
## Survey & Scoring Methodology (v1.2 – Team Share)

This document is the **authoritative scoring and methodology guide** for the NFL Technology & Fan Experience Scorecard.
It should be shared alongside the **Master Question Bank** and used as the reference for:
- survey design
- scoring interpretation
- dashboard development
- executive readouts

---

## 1. Purpose of the Scorecard

The scorecard is designed to:
- Benchmark NFL teams across **technology, fan experience, and operations**
- Identify **capability gaps** that impact fan satisfaction, safety, and revenue
- Normalize highly variable stadium environments into **comparable scores**
- Translate survey responses into **actionable recommendations**

The scorecard evaluates capabilities across the **end-to-end fan journey**:
Research & Buy → Transportation → Entry → Food & Beverage → During Game → Restrooms → Merchandise → After Game

---

## 2. Survey Artifacts (Single Source of Truth)

### 2.1 Master Question Bank (Operational Artifact)

**NFL_Scorecard_Master_Combined_v1.1.xlsx / .csv**

This file contains **all approved survey questions** and is the single source of truth for:
- Question wording and IDs
- Capability dimension (E / C / P / G / O)
- Scoring templates and rubrics
- Game phase applicability (Pre / In / Post)
- Technology area mapping (Technology Infrastructure / Digital Services / AI & Innovation / optional: Technology Services or Digital Infrastructure)

This file is intended for:
- Survey tools (Qualtrics, Alchemer, Microsoft Forms)
- Scoring workbooks and automation
- Dashboard ingestion

> Any future updates to questions should be made **only** in the master question bank  
> and versioned accordingly.

### 2.2 This Markdown File (Methodology Specification)

This Markdown file defines:
- Scoring rules and normalization
- Governance and evidence expectations
- Roll-up logic used in dashboards

This document should change **infrequently**.
The master question bank may evolve over time.

### 2.3 Technology Areas and Definitions (Survey Sections)

To keep the survey focused (and avoid tangents), questions are grouped into **Technology Areas**.
Definitions should be shared *up front* with teams.

**Full definitions:** See **[[NFL_Technology_Areas_Definitions]]** for what each area covers, what to include when evaluating teams, and evaluation lenses. Summary:

| Area | Scope |
|------|--------|
| **Technology Infrastructure** | Physical + network + compute that underpin fan/venue experiences (Wi‑Fi, LAN, DAS, cloud/edge, video ingest, monitoring). |
| **Technology Services** | Ops, governance, support: ITSM, vendor/SLA management, security ops, marketing tech ops, training. |
| **Digital Infrastructure** | Data, identity, APIs, platforms: pipelines, event streaming, IAM, CDP, observability, CMS/CDN. |
| **Digital Services** | Fan- and staff-facing digital products: mobile app, ticketing/entry, ordering, wayfinding, signage, kiosks, AR, commerce. |
| **AI & Innovation** | AI/ML and emerging tech: computer vision, predictive analytics, personalization, chatbots/agents, experimentation, Gen AI. |

> In the v1.1 master question bank, “Digital Infrastructure” may appear as a sub-area under Technology Infrastructure depending on survey version. For evaluation, use the five-area structure in [[NFL_Technology_Areas_Definitions]].

---

## 3. Capability Scoring Framework

Each capability is evaluated using five dimensions:

| Code | Dimension | Description |
|------|----------|-------------|
| E | Existence | Capability is live and integrated |
| C | Coverage | Scale of deployment |
| P | Performance | Latency, accuracy, reliability |
| G | Governance | Privacy, security, ownership |
| O | Outcomes | Measured fan or business impact |

---

## 4. Base Scoring Rules (0–10)

All questions follow the same global scoring discipline:

- **0** = Missing, unknown, not deployed, or cannot be rationalized
- **5** = Partial capability
- **1–10** = Anchored score using defined templates

### Standard non-response options (recommended)

To reduce blanks and clarify gaps, each question should allow explicit non-response reasons:
- **Data not available / unknown** → score as **0** (data quality gap)
- **We don't use this tech today** → score as **0** (capability gap)

> Recommended: treat both as a 0 for scoring, but keep the **reason label** in the dataset to drive follow-ups and data-quality remediation.

This ensures consistency across teams and technology layers.

---

## 5. Standard Scoring Templates

### T1 – Capability Maturity Ladder
- 1 = None / ad hoc
- 3 = Pilot or limited deployment
- 5 = Available to meaningful segment
- 7 = Scaled, integrated, measured
- 10 = Optimized, automated, validated impact

### T2 – Coverage Percentage
- 1 < 10%
- 3 = 10–25%
- 5 = 26–50%
- 7 = 51–80%
- 10 > 80%

### T3 – Performance (Lower is Better)
Used for latency, wait times, resolution time.

### T4 – Performance (Higher is Better)
Used for adoption, throughput, concurrency.

### T5 – Governance Maturity
- 1 = No formal controls
- 3 = Policies exist, weak enforcement
- 5 = Defined ownership and controls
- 7 = Audits, training, escalation
- 10 = Continuous monitoring and validation

### Outcomes (O)
- 1 = Not measured
- 5 = Measured inconsistently
- 7 = Measured with baseline
- 10 = Measured and used to drive decisions

---

## 6. Data Confidence (Recommended)

Teams may optionally tag responses with a **confidence factor**:

| Confidence | Description |
|------------|-------------|
| 1.0 | System-reported metric |
| 0.9 | Metric provided |
| 0.7 | SME estimate |
| 0.5 | Best guess |

**Adjusted Score = Raw Score × Confidence**

Confidence should be visualized alongside scores.

---

## 7. Game Phase Weighting

Capabilities are evaluated across NFL game phases:

| Phase | Weight |
|------|--------|
| Pre-Game | 5 |
| In-Game | 7 |
| Post-Game | 4 |

Each question includes applicability multipliers:
- A_Pre
- A_In
- A_Post

### Phase Impact Formula
```
PhasePoints = Score × PhaseWeight × Applicability
```

### Normalized Phase Score (0–10)
```
NormalizedScore = (TotalPoints / MaxPossiblePoints) × 10
```

---

## 8. Module-Level Scoring

Module scores normalize capability strength across dimensions:

```
ModuleScore =
0.25 × Existence +
0.25 × Coverage +
0.30 × Performance +
0.20 × Governance
```

Outcome questions inform prioritization and recommendations.

---

## 9. How Scores Are Used

Scores roll up into:
- Technology layer benchmarks
- Fan journey heatmaps
- Gap analysis and investment prioritization

The scorecard is designed for **directional benchmarking**, not compliance scoring.

---

## 10. Versioning

- **This document:** v1.2
- **Master Question Bank:** v1.1 (33 questions); **v1.2** (102 questions, ~20 per dimension E/P/G/C/O, spread across 5 Technology Areas)

Future updates should increment versions explicitly.

---

## Related files (this folder)

- **Master Question Bank (operational):** [[NFL_Scorecard_Master_Combined_v1.2.xlsx]] — 102 questions, balanced E/P/G/C/O and 5 areas. v1.1 retained for reference.
- **Prototype scoring:** [[NFL_Fan Experience_Prototype_Scoring_10_2025.xlsx]]
- **Proposal:** [[Scorecard_walkaround_proposal.pptx]]

## See also

- [[NFL_Technology_Areas_Definitions]] — full Technology Areas definitions for team evaluation
- [[NFL/INDEX]] — NFL project index (artifact list, tips for ongoing work)
- [[Map of Content]] — vault navigation
