---
tags: [project, work, client/nfl]
date: 2025-02
---

# NFL Scorecard — Questions Review

Review of the survey question set (Master Question Bank **v1.2**) and alignment with [[NFL_Technology_Areas_Definitions]] and the deck.

**Source:** [[NFL_Scorecard_Master_Combined_v1.2.xlsx]] — **102 questions** (Survey_Pruned sheet)

---

## Current coverage (v1.2)

### Dimension balance

| Dimension | Count | Target | Note |
|------------|-------|--------|------|
| **E** (Existence) | 19 | ~20 | Slightly under |
| **P** (Performance) | 22 | ~20 | Slightly over |
| **G** (Governance) | 20 | ~20 | On target |
| **C** (Coverage) | 22 | ~20 | Slightly over |
| **O** (Outcomes) | 19 | ~20 | Slightly under |

**Total:** 102 questions. Balance is acceptable for survey build and scoring.

### By Technology Area

| Technology Area | # Qs | Sub-areas | Sample IDs |
|-----------------|------|-----------|------------|
| **Technology Infrastructure** | 20 | Connectivity (7), DAS/cellular (1), Data integration & observability (5), Edge/CV (4), Peak readiness (3) | CONN-01–07, DAS-01, DATA-01–05, EDGE-01/03/06/07, PEAK-01–03 |
| **Technology Services** | 19 | Broadcast & 5G (4), Game-day command (2), Marketing tech ops (2), Privacy/consent/legal (3), Security operations (3), Staff enablement (2), Vendor governance (3) | BCAST-01–04, OPS-01–02, MKOPS-01–02, PRIV-01–03, SECOPS-01–03, STAFF-01–02, VEND-01–03 |
| **Digital Infrastructure** | 17 | Data & platform (17) | DINF-01, DINF-05–20 (CDP, cloud, IAM, APIs, coverage, performance, governance, outcomes) |
| **Digital Services** | 27 | AR seat preview (3), Concession (3), Digital signage (2), Fan adoption (1), Identity & biometrics (3), Marketing & engagement (5), Merchandise & commerce (3), Ticketing (4), Wayfinding (3) | AR-01–03, FNB-01–03, SIGN-01–02, FAN-01, ID-01–03, MKTG-01–05, MERCH-01–03, TICK-01–04, PATH-01–03 |
| **AI & Innovation** | 19 | Chatbots & agents (3), Crowd intelligence (3), Egress safety (3), Experimentation (2), Personalization (5), Sustainability (3) | CHAT-01–03, CRWD-01–03, EGR-01–03, EXPT-01–02, PERS-01–05, SUST-01–03 |

---

## Alignment with definitions and deck

### Technology Infrastructure

- **Connectivity:** Covered (CONN-01–07, DAS-01) — Wi‑Fi existence, coverage %, performance, governance, outcomes; DAS/cellular coverage. Aligns with deck “Connectivity & Infrastructure.”
- **Data integration & observability:** Retained (DATA-01–04) plus outcome DATA-05. Event bus, APIs, monitoring, incident response.
- **Edge/CV, Peak readiness:** Covered. No material gaps.

### Technology Services

- **Broadcast & 5G:** Covered (BCAST-01–04) — broadcast ops, connectivity SLA %, incident resolution, uptime/outcomes. Aligns with deck “Broadcast, 5G services.”
- **Marketing tech ops, Security operations, Privacy, Vendor, Staff, Game-day:** All have dedicated sub-areas and questions.

### Digital Infrastructure

- **Stand-alone area:** Now present with 17 questions (CDP, data/platform, coverage, performance, governance, outcomes). Aligns with definitions (broadband/cloud, data, identity, APIs).

### Digital Services

- **Ticketing:** Covered (TICK-01–04) — digital purchase/delivery (E), digital adoption % (C), conversion outcome (O), delivery time (P).
- **Merchandise & commerce:** Covered (MERCH-01–03) — digital discovery/checkout (E), catalog coverage (C), revenue/conversion outcome (O).
- **Marketing & engagement:** Covered (MKTG-01–05) — personalization (E), loyalty enrollment % (C), communications personalization % (C), consent (G), engagement/conversion outcome (O).
- **Digital signage:** Covered (SIGN-01–02) — existence (E), coverage % (C).
- **AR, Concession, Fan adoption, Identity, Wayfinding:** Unchanged from v1.1; still covered.

### AI & Innovation

- **Personalization:** Covered (PERS-01–05) — engines (E), touchpoint % (C), measurement % (C), latency (P), lift outcome (O).
- **Chatbots & agents:** Covered (CHAT-01–03) — response time (P), resolution rate (P), governance (G).
- **Sustainability:** Covered (SUST-01–03) — data review cadence (P), tracking/reporting (G), targets/outcomes (O).
- **Experimentation:** Covered (EXPT-01–02) — A/B coverage % (C), innovation outcomes (O).
- **Crowd, Egress:** Unchanged from v1.1.

---

## Optional refinements (future)

- **Fan-facing broadcast/media:** Definitions mention “broadcast and media-related fan digital experiences.” No explicit question on second-screen or in-stadium media *from the fan’s perspective*. Could add 1–2 Qs in Digital Services if desired.
- **Exact 20 per dimension:** If you want exactly 20 E and 20 O, add 1 E and 1 O and drop 2 P and 2 C (e.g. in a v1.3). Not required for pilot.
- **Question wording:** During team pilot, tighten any questions that are ambiguous or hard to answer; keep QuestionIDs and dimensions stable.

---

## Next steps

1. **Survey build** — Load v1.2 into survey tool (e.g. Qualtrics, Alchemer); map response options to scoring (T1–T5, Outcomes). Use [[NFL_Scorecard_Methodology_v1.2]] for phase weights and rubrics.
2. **Team pilot** — Run with 1–3 teams; validate clarity, response time, and evidence requests. Refine wording if needed.
3. **Dashboard** — Map question IDs and dimensions to scoring logic and visualizations (e.g. by area, by dimension, by game phase).
4. **Versioning** — Any change to questions stays in the Master Question Bank; document version in [[NFL_Scorecard_Methodology_v1.2#10. Versioning]].

---

## See also

- [[NFL_Scorecard_Methodology_v1.2]] — scoring framework, phase weights, rubrics
- [[NFL_Technology_Areas_Definitions]] — what each area covers (share with teams)
- [[NFL/INDEX]] — project index and artifacts
