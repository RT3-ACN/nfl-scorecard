# Framework Reference — v2

The NFL Scorecard uses a 4-layer technology framework. This document is the authoritative reference.

**Version:** v2 (locked 2026-03-18)
**Prior version:** v1 used 5 areas including "Digital Services" as a separate category — that model is retired.

---

## The 4 Layers

### Layer 1 — Technology Infrastructure (`TI_`)

**Scope:** Connectivity infrastructure only.

Covers how the venue delivers network access and wireless coverage to fans, staff, and systems. This is the "pipe" layer — it does not include the devices that connect to the pipe.

**Included:**
- Wi-Fi (access points, density, generation — Wi-Fi 5, 6, 6E)
- Distributed Antenna System (DAS) and small cells (carrier-managed and venue-managed)
- 5G deployment (indoor/outdoor coverage)
- Fiber backbone and structured cabling
- Network uplink capacity and redundancy
- Network management platforms and monitoring
- Private 5G / CBRS networks

**NOT included:**
- Physical devices that connect to the network (displays, kiosks, cameras, POS terminals) → those are `DI_`
- Software platforms that run over the network → those are `TS_`

**Current question count:** TI_01 – TI_15 (15 questions)

---

### Layer 2 — Digital Infrastructure (`DI_`)

**Scope:** Cloud platforms, data infrastructure, AND physical endpoint hardware.

This is the broadest layer. It covers the back-end data and cloud stack, plus all the physical technology devices deployed at the venue.

**Included — back-end:**
- Cloud infrastructure (AWS, Azure, GCP deployment and maturity)
- Data storage, data lakes, and warehousing
- Integration architecture (APIs, event streaming, middleware)
- BI and analytics platforms (Tableau, Power BI, custom)
- Identity and access management (IAM, SSO)
- Cybersecurity posture and incident response
- System uptime monitoring and observability

**Included — physical endpoints (key v2 decision):**
- Digital signage and display systems (LED boards, kiosks, wayfinding)
- Self-service ordering kiosks
- AI-powered checkout and checkout-free stores
- POS hardware (terminals, handheld devices)
- Security cameras and computer vision hardware
- Entry/screening technology (walk-through scanners, facial recognition hardware)

**v2 rationale:** Physical endpoint devices were moved from TI_ to DI_ because they are technology capability investments, not connectivity infrastructure. A club with many self-service kiosks has made a Digital Infrastructure investment, not a connectivity investment.

**Current question count:** DI_01 – DI_16 (16 questions)

---

### Layer 3 — Technology Services (`TS_`)

**Scope:** Software platforms and operational technology services.

Covers the SaaS applications and managed services the club uses to run stadium operations and fan engagement.

**Included:**
- Ticketing platform (primary ticketing, secondary market integration)
- Mobile food and beverage ordering platforms
- Official fan app (features, adoption, capabilities)
- Customer Relationship Management (CRM) and Customer Data Platform (CDP)
- Signage Content Management System (CMS)
- Workforce management and scheduling software
- Loyalty and rewards platforms
- Parking and transportation technology
- Venue operations management platforms

**NOT included:**
- The network the software runs on → `TI_`
- The hardware devices the software runs on → `DI_`
- AI-powered features within platforms → `AI_`

**Current question count:** TS_01 – TS_10 (10 questions)

---

### Layer 4 — AI & Innovation (`AI_`)

**Scope:** Intelligent capabilities, machine learning applications, and emerging technology deployment.

Covers where and how the club is applying AI/ML — not the software platform, but the intelligent capability deployed.

**Included:**
- Computer vision applications (crowd flow, security, fan experience)
- Predictive analytics (attendance forecasting, staffing, concessions)
- Personalization engines (dynamic pricing, targeted offers, content)
- Generative AI applications (content, operations, fan engagement)
- Sponsor attribution and measurement intelligence
- Voice and conversational AI
- Robotic process automation (RPA) in operations

**Calibration note:** Most NFL clubs will score A–B on AI questions. This is expected and valuable — it reveals the league-wide maturity baseline, not a scoring failure.

**Current question count:** AI_01 – AI_10 (10 questions)

---

## Answer Format (All Questions)

Every question uses the same response format:

| Format | Rule |
|--------|------|
| Single-select | One answer only — no multi-select on maturity scales |
| A → E | A = lowest maturity/deployment, E = highest — no reverse coding |
| Minimum 5 options | Every question has options A through E |
| No open text | Drop-down or select-all-that-apply only |

**Non-response options (both score 0):**
- `"Data not available / unknown"` — club has the technology but can't confirm the data
- `"We don't use this technology today"` — technology not deployed

Non-response options must appear in the Answer Guide, not as option A on the scale. A club that selects "Data not available" should score 0, not 1.

---

## Scoring Templates

Six template types are used across the question bank. Each question is assigned one template in its Answer Guide.

| Template | Name | Anchors | Use for |
|----------|------|---------|---------|
| T1 | Maturity Ladder | A=None/awareness, E=Optimized/continuously improved | Capability existence and deployment stages |
| T2 | Coverage % | A=<10%, B=10–25%, C=26–50%, D=51–80%, E=>80% | Reach across the venue or user base |
| T3 | Lower is Better | A=worst performance, E=best performance (inverted metric) | Latency, wait times, error rates |
| T4 | Higher is Better | A=lowest adoption/throughput, E=highest | Fan adoption rates, throughput, uptime % |
| T5 | Governance | A=No controls, E=Continuous improvement program | Cybersecurity, data governance, compliance |
| O | Outcomes | A=Not measured, E=Actively drives decisions and investment | Whether performance is measured and acted on |

**Scoring is PROTOTYPE.** The T1–T5 and O templates are agreed. The dimension weights (E/C/P/G), layer roll-up formulas, and game-phase weighting are prototype only and not confirmed. Do not present scores or weights as settled methodology.

---

## Question Schema

Every question requires exactly 9 fields. Partial questions are not acceptable.

| Field | Description |
|-------|-------------|
| `Survey Category` | Layer name (e.g., "Technology Infrastructure") |
| `Question ID` | Prefix + zero-padded number (e.g., `TI_01`, `DI_15`) |
| `Domain Covered` | Sub-area within the layer (e.g., "Wi-Fi Density and Coverage") |
| `Question` | The question text — single construct, present tense, factual |
| `Guide Explanation` | Why this matters, what it measures, business benchmarks (2–4 sentences) |
| `Answer Format` | Always: `5-option single select` |
| `Survey Answer Options Style` | Always: `Drop down` |
| `Survey Answer Options Definitions` | `A: [text] \| B: [text] \| C: [text] \| D: [text] \| E: [text]` |
| `Answer Guide` | Scoring notes, how to calculate, edge cases, non-response handling |

---

## Quality Rules

These rules apply to every question in the bank. Violations must be fixed before pilot deployment.

### Structure
- **One construct per question.** If "and" appears in the question text, it is likely double-barreled. Split it.
- **Clean A → E progression.** No ambiguous middle options. No reversal.
- **E should be achievable.** Leading NFL venues should be able to score E today — it's not purely aspirational.

### Counts and Normalization
- **Absolute counts are not comparable** across 32 clubs with venues ranging from 30,000 to 90,000 capacity.
- Any question using raw counts (APs, kiosks, cameras, nodes) **must normalize** to per-10,000 seats, per-concession-location, or per-gate.
- This is a Critical issue — failure produces non-comparable data across the portfolio.

### Non-Response Handling
- **"We have not measured X"** is a non-response. It scores 0. It must never be placed as option A (which scores 1).
- **"Data not available / unknown"** and **"We don't use this technology today"** both score 0.
- These belong in the Answer Guide with instruction to score as 0 and retain the reason label for follow-up.

### Concessionaire Scenario
- Many clubs do not control their concession vendor technology. Aramark, Levy, Delaware North, Centerplate, and others run their own POS software, ordering platforms, and F&B inventory systems independently.
- **Any question touching POS, concession ordering, F&B mobile ordering, or operator-managed systems** must include guidance: *"Include technology operated by your concession operators (e.g., Aramark, Levy, Delaware North) unless otherwise specified."*
- Failing to address this will create defensiveness in respondents and non-comparable data.

### Voice of Fan (VOF)
- VOF data is reference material only. It informs our understanding of tech-to-fan-experience correlations.
- **Never write survey questions to clubs about VOF data.** The NFL collects VOF separately.

---

## Business Benchmarks (Use in Guide Explanations)

These benchmarks ground questions in commercial outcomes. Include at least one per question.

| Technology | Benchmark |
|------------|-----------|
| Cashless transactions | 16–25% higher per-cap spending vs. cash venues |
| Mobile ordering | 22% higher average order value; 80% of mobile orders include alcohol (highest margin) |
| Self-service checkout | 85–170% sales increase across NFL stadiums |
| Dynamic ticket pricing | 5–20% single-game revenue lift |
| Mercedes-Benz Stadium | 50% F&B price cut → #1 VOF ranking → 16% per-cap increase |
| Tampa Bay Buccaneers | #1 customer service for 12 consecutive seasons (VOF benchmark) |

Full VOF correlation data: `reference/nfl_voice_of_the_fan_research.md`
