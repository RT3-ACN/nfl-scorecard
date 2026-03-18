# NFL Stadium Technology Scorecard — Full Reference Document
## 100 Questions (25 × 4 Layers) with Top 10 Selections, MECE Maps & Correlation Analysis

---

# PART 1: SURVEY ARCHITECTURE OVERVIEW

## Four Technology Layers

| Layer | Prefix | Scope | Excludes |
|-------|--------|-------|----------|
| 1. Infrastructure & End User Devices | ID_ | Physical hardware you can touch, mount, cable, power | Software, cloud, AI |
| 2. Technology Services | TS_ | Licensed/subscribed software platforms executing business functions | Hardware, custom AI, cloud infra |
| 3. Digital Infrastructure | DI_ | Back-end compute, storage, data platforms, integration, security | Hardware, end-user software, AI/ML |
| 4. AI & Innovation | AI_ | Intelligence-driven capabilities, ML models, emerging tech | Standard software, hardware, rule-based automation |

## Answer Format
- All questions: 5-option single-select (A through E)
- A=1 (lowest) through E=5 (highest) — no reverse coding
- Designed for ordinal scoring in Tableau

## Outcome Dimensions
- 💲 Revenue — per-cap spending, transaction volume, sponsorship yield
- 😀 Fan Experience — satisfaction, friction, wait time, navigation
- ⚙️ Operational Efficiency — throughput, uptime, staffing, response time
- 🔮 Modernization Readiness — scalability, future-proofing, integration

---

# PART 2: LAYER-LEVEL INSIGHT OBJECTIVES

## Layer 1: Technology Infrastructure & End User Devices
The ten questions produce a physical readiness profile for each venue — a picture of whether the foundational hardware exists, at sufficient density and capability, to support the digital services and intelligent experiences built on top of it. Answers progress from minimal or absent deployment (A) through partial coverage (B–C) to comprehensive, modern, and future-ready hardware footprints (D–E). What we are looking to glean at the layer level is a composite infrastructure maturity score that reveals the ceiling each venue faces: a club cannot achieve high mobile ordering adoption if its Wi-Fi AP density cannot support concurrent connections, cannot reduce entry friction if its screening hardware is a generation behind, and cannot grow sponsorship yield if its signage inventory is still static. By aggregating these ten answers, the dashboard will surface which venues have infrastructure that enables revenue growth versus which venues have infrastructure that constrains it — and critically, where the specific bottleneck sits (connectivity, commerce hardware, entry, displays, or exterior coverage) so that capital investment can be directed to the constraint with the highest downstream impact.

## Layer 2: Technology Services
The ten questions assess the software and platform ecosystem each venue operates to execute its core game-day functions — selling tickets, processing transactions, engaging fans, managing operations, activating sponsors, and understanding its audience. Answers progress from absent or fragmented platforms (A) through partially deployed or single-department adoption (B–C) to fully integrated, venue-wide platforms generating unified data and enabling cross-functional workflows (D–E). What we are looking to glean at the layer level is a services integration and utilization profile that reveals how effectively each venue converts its physical infrastructure investment into operational execution and fan-facing value. A venue can have best-in-class Layer 1 hardware but still underperform on revenue and satisfaction if its POS platforms are fragmented across four vendors, its mobile ordering covers only a fraction of concession locations, or its CRM cannot connect a ticket purchaser to their in-venue spending. The layer-level score will expose the gap between what the hardware enables and what the software actually delivers — identifying venues where platform consolidation, mobile commerce expansion, or CRM integration would unlock the most immediate improvement in per-cap revenue and operational visibility.

## Layer 3: Digital Infrastructure
The ten questions evaluate the invisible backbone that determines whether data flows, scales, stays secure, and produces actionable intelligence across all other layers. Answers progress from siloed, manual, and undocumented environments (A) through partially centralized or selectively integrated systems (B–C) to fully unified, real-time, governed data ecosystems with enterprise-grade security and support models (D–E). What we are looking to glean at the layer level is a data maturity and operational resilience profile — the degree to which each venue can collect data from its technology investments, unify that data around a single fan identity, analyze it across systems, protect it from breach and loss, and act on it in real time during a live event. This layer is the diagnostic core of the scorecard because it determines whether the insights from every other layer can actually be connected: a venue scoring well on Layer 1 hardware and Layer 2 software but poorly on Layer 3 integration and analytics cannot produce the cross-system correlations (ticket holder → entry time → concession spend → app engagement) that transform isolated technology deployments into a unified revenue-optimizing platform. The layer-level score will identify venues that are data-rich but insight-poor — where the technology is generating information that no one can access, correlate, or act upon — and distinguish them from venues where data infrastructure enables genuine decision-making advantage.

## Layer 4: AI & Innovation
The ten questions measure a venue's adoption of intelligence-driven capabilities that automate decisions, generate predictive insights, personalize fan experiences, and create entirely new revenue streams that did not exist five years ago. Answers progress from no AI adoption (A) through evaluation or single-pilot deployments (B–C) to broadly deployed, integrated, and measurably impactful AI capabilities (D–E). What we are looking to glean at the layer level is an innovation velocity and intelligence maturity profile — not just whether a venue has deployed AI, but whether it has the organizational structures (innovation pipeline, governance, partnerships) to continuously adopt and scale emerging capabilities as they mature. This layer will show the widest spread across clubs, with most venues expected to cluster at A–B on the majority of questions. That distribution is itself a valuable insight: it establishes the current frontier, identifies the early movers whose outcomes can be benchmarked, and quantifies how far behind the median club sits relative to what leading venues (Intuit Dome, SoFi Stadium, Lumen Field) are already operationalizing. The layer-level score will separate venues that are passively waiting for technology to mature from those that are actively shaping what the next generation of stadium experience looks like — and will provide the NFL with a clear view of where targeted investment, shared learnings, or league-level initiatives could accelerate adoption across the portfolio.

---

# PART 3: TOP 10 SELECTION RATIONALE BY LAYER

## Layer 1 Top 10 (ID_01–ID_10)
| Rank | ID | Topic | Why Selected |
|------|----|-------|-------------|
| 1 | ID_01 | Wi-Fi AP density | Every mobile transaction depends on it; highest correlation to mobile commerce adoption |
| 2 | ID_02 | Security screening hardware | Highest documented ROI; 10× throughput = more pre-game spending time |
| 3 | ID_03 | Self-service/checkout-free hardware | Strongest revenue lift data (85–170% per location) |
| 4 | ID_04 | Digital vs. static signage ratio | Direct proxy for sponsorship revenue potential |
| 5 | ID_05 | Gate throughput capacity | Direct operational metric; combines with ID_02 for entry composite |
| 6 | ID_06 | POS payment credential types | Ceiling for cashless penetration (16–25% per-cap lift) |
| 7 | ID_07 | Power resilience | Insurance policy — failure here takes down everything simultaneously |
| 8 | ID_08 | Cellular DAS coverage | Enables mobile betting, social, and Wi-Fi fallback |
| 9 | ID_09 | Exterior fan zone hardware | Largest untapped commerce territory |
| 10 | ID_10 | Indoor positioning hardware | Foundation for wayfinding, proximity offers, sponsor measurement |

## Layer 2 Top 10 (TS_01–TS_10)
| Rank | ID | Topic | Why Selected |
|------|----|-------|-------------|
| 1 | TS_01 | POS platform consolidation | Data hygiene prerequisite for all commerce analytics |
| 2 | TS_02 | Mobile ordering platform | 22% higher order size; highest commerce software ROI |
| 3 | TS_03 | Mobile app feature breadth | Central nervous system connecting all fan-facing tech |
| 4 | TS_04 | Dynamic ticket pricing | 5–20% single-game revenue lift |
| 5 | TS_05 | Signage CMS capability | Unlocks revenue value of Layer 1 display hardware |
| 6 | TS_06 | CRM maturity | Foundation for fan intelligence and sponsor packaging |
| 7 | TS_07 | Event operations platform | Unified ops visibility for cross-department coordination |
| 8 | TS_08 | Workforce management | Largest variable cost; 10–20% savings from optimization |
| 9 | TS_09 | Ticketing integration | Enables accurate attendance analytics and fan identity |
| 10 | TS_10 | Loyalty/rewards platform | Undertapped revenue lever; drives repeat engagement |

## Layer 3 Top 10 (DI_01–DI_10)
| Rank | ID | Topic | Why Selected |
|------|----|-------|-------------|
| 1 | DI_01 | System integration architecture | Connective tissue of entire stack; enables all cross-system analytics |
| 2 | DI_02 | Unified fan identity | Prerequisite for per-fan revenue measurement |
| 3 | DI_03 | Cross-system data correlation | Ultimate analytical capability the scorecard measures |
| 4 | DI_04 | BI/analytics platform | Transforms raw data into actionable insight |
| 5 | DI_05 | Data storage architecture | Determines whether cross-system analysis is possible |
| 6 | DI_06 | Real-time data availability | Enables in-game operational decisions |
| 7 | DI_07 | Cybersecurity posture | Protects fan data and operational continuity |
| 8 | DI_08 | Compute scalability | Prevents peak game-day failures |
| 9 | DI_09 | Game-day tech support model | Determines issue detection and resolution speed |
| 10 | DI_10 | Backup & disaster recovery | Baseline operational hygiene |

## Layer 4 Top 10 (AI_01–AI_10)
| Rank | ID | Topic | Why Selected |
|------|----|-------|-------------|
| 1 | AI_01 | Crowd density/flow analytics | Highest-impact AI ops application |
| 2 | AI_02 | Queue/wait time estimation | #1 fan complaint; AI makes it manageable |
| 3 | AI_03 | Predictive concession demand | 30–70% waste reduction; margin protection |
| 4 | AI_04 | Sponsor impression analytics | Largest untapped revenue opportunity |
| 5 | AI_05 | Personalized offers/upsell | Higher conversion than blanket promotions |
| 6 | AI_06 | AI chatbot/virtual assistant | Scales guest services without proportional staffing |
| 7 | AI_07 | Fan behavior modeling | Direct revenue impact on renewals and upsell |
| 8 | AI_08 | Programmatic in-venue ads | Multiplies sponsorship inventory value |
| 9 | AI_09 | Digital twin | Indicator of overall tech sophistication |
| 10 | AI_10 | Innovation pipeline | Predicts future scorecard trajectory |

---

# PART 4: ALL 100 QUESTIONS BY LAYER

## Layer 1: Technology Infrastructure & End User Devices (25 Questions)

### Sub-Category A: Network Connectivity Hardware (3 questions)
**ID_01** | What is the ratio of deployed Wi-Fi access points to your venue's maximum seating capacity?
A: <1 AP per 150 seats | B: 1:100–150 | C: 1:50–99 | D: 1:25–49 | E: 1:24 or fewer ★TOP 10

**ID_02** | What percentage of your venue's total fan-accessible square footage is covered by venue-managed cellular enhancement hardware (DAS, small cells)?
A: <50% | B: 50–74% | C: 75–89% | D: 90–99% | E: 100% including parking and plazas ★TOP 10

**ID_03** | What is the prevailing generation of your venue's horizontal cabling and fiber backbone?
A: Cat 5e/OM1-OM2 | B: Cat 5e-6/OM3 | C: Cat 6A/OM4 | D: Cat 6A + single-mode in key runs | E: Cat 6A+ throughout with single-mode backbone and spare capacity

### Sub-Category B: Display & Signage Hardware (3 questions)
**ID_04** | Excluding the primary video board, approximately how many digital signage displays are deployed per 10,000 seats?
A: <10 | B: 10–24 | C: 25–49 | D: 50–74 | E: 75+

**ID_05** | What is the resolution capability and age of your primary video board and LED ribbon/fascia displays?
A: SD/early HD, no ribbon, 10+ yrs | B: HD, basic ribbon, 7–10 yrs | C: Full HD, partial ribbon, 4–6 yrs | D: 4K HDR, majority ribbon, 2–3 yrs | E: 4K HDR fine pitch, comprehensive LED, <2 yrs

**ID_06** | What percentage of your venue's total wayfinding and advertising signage is digital versus static?
A: <25% | B: 25–49% | C: 50–74% | D: 75–99% | E: 100% digital ★TOP 10

### Sub-Category C: Commerce & Transaction Hardware (3 questions)
**ID_07** | What payment credential types can your POS terminal hardware accept?
A: Chip/swipe only | B: + NFC tap | C: + mobile wallet | D: + QR/app payment | E: + biometric-ready ★TOP 10

**ID_08** | How many self-service kiosks, AI checkout stations, or checkout-free store locations are deployed?
A: None | B: 1–5 | C: 6–15 | D: 16–30 or 1–5 checkout-free stores | E: 30+ or 6+ checkout-free stores ★TOP 10

**ID_09** | Do your POS terminals have backup connectivity if the primary network fails?
A: No backup | B: Offline queuing only, some terminals | C: Offline queuing at all; cellular failover at select locations | D: All terminals offline + cellular failover at majority | E: All terminals offline + cellular failover; zero-downtime is design standard

### Sub-Category D: Entry & Access Control Hardware (3 questions)
**ID_10** | What type of security screening hardware is deployed at primary fan entry points?
A: Traditional metal detectors | B: Mix traditional + enhanced at select gates | C: Enhanced at majority of gates | D: AI screening all primary gates | E: AI screening all entry points venue-wide ★TOP 10

**ID_11** | What credential types can your gate reader hardware accept without manual intervention?
A: Printed barcode only | B: + mobile barcode/QR | C: + NFC/digital wallet | D: + RFID wearable | E: + biometric-ready hardware

**ID_12** | What is the approximate per-lane throughput capacity of your gate entry hardware?
A: Not measured | B: <20 fans/min/lane | C: 20–34 | D: 35–49 | E: 50+ ★TOP 10

### Sub-Category E: Sensing & Capture Hardware (3 questions)
**ID_13** | What is the approximate density and resolution tier of IP cameras across fan-accessible areas?
A: <1 per 5,000 sq ft, SD/early HD | B: 1 per 3,000–5,000, mix HD | C: 1 per 1,500–2,999, full HD | D: 1 per 750–1,499, HD+select 4K | E: 1 per 750 or denser, 4K in high-traffic

**ID_14** | Do you have BLE beacons, UWB anchors, or equivalent indoor positioning hardware deployed?
A: None | B: Limited zones | C: Majority of concourse/gates | D: Venue-wide BLE | E: Venue-wide BLE+UWB, sub-meter accuracy ★TOP 10

**ID_15** | Are IoT sensors deployed to monitor operational conditions (restrooms, waste, HVAC, equipment)?
A: None | B: Limited (MDF temp only) | C: 1–2 use cases, select areas | D: 3+ use cases, venue-wide in ≥1 | E: Comprehensive across restrooms, waste, HVAC, equipment, crowd

### Sub-Category F: Staff & Operational Devices (2 questions)
**ID_16** | What percentage of front-line game-day staff have venue-issued mobile devices?
A: <10% | B: 10–24% | C: 25–49% | D: 50–74% | E: 75%+

**ID_17** | What is the primary real-time communication hardware for ops, security, and guest services staff?
A: Personal phones only | B: Analog radios | C: Digital radios, multi-channel | D: Digital radios + push-to-talk cellular | E: Unified comms (radio + PoC + messaging) on managed devices

### Sub-Category G: Audio & Broadcast Hardware (2 questions)
**ID_18** | Does your PA/distributed audio system provide full venue coverage with independent zone control?
A: Bowl only, single zone | B: Bowl + main concourse, limited zones | C: All indoor, 3–5 zones | D: All areas incl. clubs/premium, 6+ zones | E: Networked digital audio (Dante/AES67), all areas incl. exterior, granular zones + emergency integration

**ID_19** | Does your venue have fixed broadcast infrastructure sufficient for current and next-gen production?
A: Minimal; crews install most cabling | B: Fixed fiber to standard positions, HD | C: Fiber to all positions incl. flex, 4K | D: High-count fiber, 4K-native, IP-ready (ST 2110) | E: Future-ready: high-count SM fiber, fully IP, volumetric/drone staging, redundant

### Sub-Category H: Supporting Infrastructure (3 questions)
**ID_20** | What level of power protection is in place for technology infrastructure?
A: No dedicated UPS/generator | B: UPS on MDF only | C: UPS on MDF + critical IDFs; generator on core | D: UPS all closets + POS; generator all tech for game day | E: Dual feeds, UPS all, generator w/ ATS, tested annually ★TOP 10

**ID_21** | Are MDF/IDFs purpose-built with dedicated cooling, rack space, and controlled access?
A: Repurposed closets, no cooling | B: MDF purpose-built; IDFs repurposed | C: MDF + some IDFs purpose-built | D: All purpose-built w/ cooling + badge access | E: All purpose-built w/ cooling, humidity, fire suppression, badge w/ audit, spare capacity

**ID_22** | When was your most recent cabling assessment, and is there documented spare pathway capacity?
A: Never assessed | B: 5+ yrs ago, limited spare | C: 3–5 yrs, some spare | D: <2 yrs, spare documented in most pathways | E: <12 months w/ lifecycle plan + confirmed spare across all pathways

### Sub-Category I: Exterior & Parking Hardware (3 questions)
**ID_23** | What technology hardware is deployed in your parking lots and structures?
A: None; manual management | B: Digital payment at entry/exit only | C: ALPR + digital payment + basic occupancy | D: ALPR + zone-level sensors + dynamic guidance | E: Full smart parking: ALPR, sensing, guidance, EV charging, ops data feed

**ID_24** | Is fan-facing technology hardware deployed in exterior areas (tailgate, plazas, fan zones)?
A: None beyond gates | B: DAS/small cells in some areas | C: Wi-Fi/DAS in primary zones; limited signage/POS | D: Wi-Fi, DAS, signage, POS in primary zones | E: Comprehensive all zones (Wi-Fi, 5G, signage, POS, streaming) ★TOP 10

**ID_25** | When hosting non-NFL events, how much installed hardware is activated and usable by third parties?
A: Hardware configured NFL-only | B: Core (connectivity, PA) used; most fan-facing not activated | C: Connectivity, PA, POS activated; signage/entry partial | D: Majority available w/ event-specific config | E: All hardware event-agnostic by design; documented third-party onboarding

---

## Layer 2: Technology Services (25 Questions)

### Sub-Category A: Ticketing & Access Management (3)
**TS_01** | Is your primary ticketing platform integrated with secondary market resale in a single system of record?
A: Completely separate | B: Separate, manual reconciliation | C: Feed/API with delays | D: Integrated, near-real-time | E: Fully unified, real-time ★TOP 10 (Rank 9)

**TS_02** | Does your ticketing operation use a dynamic pricing engine for single-game tickets?
A: Fixed pricing | B: Manual adjustments | C: Engine for select tiers | D: Engine across all single-game | E: All inventory incl. premium + secondary integration ★TOP 10 (Rank 4)

**TS_03** | What percentage of tickets/credentials are distributed and managed digitally?
A: <50% | B: 50–74% | C: 75–89% | D: 90–99% | E: 100% digital-first

### Sub-Category B: Point of Sale & Commerce (3)
**TS_04** | How many distinct POS software platforms operate across your venue on game day?
A: 4+ | B: 3 | C: 2 | D: 1 with minor exceptions | E: 1 unified, 100% ★TOP 10 (Rank 1)

**TS_05** | Is a mobile ordering platform available, and what percentage of concession locations does it cover?
A: Not available | B: <25% | C: 25–50% | D: >50% incl. premium | E: Venue-wide + in-seat delivery ★TOP 10 (Rank 2)

**TS_06** | Does your venue use software to track real-time concession inventory and forecast demand?
A: Manual counts only | B: Basic end-of-day tracking | C: Real-time tracking, no forecasting | D: Real-time + historical demand forecasting | E: Real-time + predictive by location/game/daypart w/ auto reorder

### Sub-Category C: Fan Engagement & Mobile App (3)
**TS_07** | How many features does your venue app support (tickets, wayfinding, ordering, stats, push, loyalty, parking, AR)?
A: 1–2 | B: 3–4 | C: 5–6 | D: 7 | E: All 8+ ★TOP 10 (Rank 3)

**TS_08** | Does your venue operate a digital loyalty/rewards program?
A: None | B: Basic (email offers/STH perks, no points) | C: Points from purchases | D: Points from purchases + engagement | E: Gamified ecosystem w/ tiers, challenges, experience unlocks ★TOP 10 (Rank 10)

**TS_09** | Does your venue use a real-time notification platform for in-venue fan communication?
A: None | B: Broadcast push only | C: Segmented by ticket type/section | D: Context-aware (location, game state) | E: Fully personalized w/ conversion tracking

### Sub-Category D: Venue & Event Operations (3)
**TS_10** | Does your venue use a centralized event operations platform across departments?
A: No platform; separate tools | B: Shared comms channel only | C: Platform used by 1–2 depts | D: Most depts w/ shared views | E: All depts, real-time, alerts, dispatch, post-event analytics ★TOP 10 (Rank 7)

**TS_11** | Does your venue use workforce management software for game-day staffing?
A: Manual | B: Basic scheduling, no forecasting | C: Scheduling w/ historical templates | D: WFM w/ demand forecasting | E: Integrated WFM w/ predictive models, real-time tracking, labor analytics ★TOP 10 (Rank 8)

**TS_12** | How are fan-reported issues, safety incidents, and maintenance requests tracked during events?
A: Verbal/radio only | B: Logged in spreadsheet post-event | C: Real-time digital reporting, no auto-routing | D: Real-time w/ auto-routing and priority | E: Integrated platform w/ SLA tracking, live status, post-event trends

### Sub-Category E: Security & Safety Software (2)
**TS_13** | What is the capability level of your VMS platform?
A: Basic local recording | B: Centralized VMS, live view + playback | C: Advanced search, bookmarking | D: Integrated w/ access control + alarms | E: Enterprise VMS w/ multi-camera tracking, situational awareness dashboards

**TS_14** | Does your venue have multi-channel emergency mass notification capability?
A: PA + verbal only | B: PA + select signage | C: PA + signage + one digital channel | D: Unified: PA + signage + push + SMS | E: Unified + zone-targeted + scenario templates + drill capability

### Sub-Category F: Sponsorship & Advertising (2)
**TS_15** | What is the capability of your signage CMS?
A: Manual per-display (USB) | B: Centralized, scheduled playlists | C: Zone-based targeting | D: Zone + time + rule-triggered | E: Dynamic w/ game-state, POS, programmatic, impression reporting ★TOP 10 (Rank 5)

**TS_16** | Can you provide sponsors with verified, data-backed impression reports?
A: Estimated attendance only | B: Display play counts | C: + camera foot traffic at select zones | D: Comprehensive impressions, dwell, traffic | E: Real-time dashboard w/ demographics + engagement ★TOP 10 (related to AI_04)

### Sub-Category G: CRM & Fan Data (2)
**TS_17** | How is your CRM used relative to game-day and venue operations?
A: None or sales tracking only | B: Tickets + contacts, no integration | C: Tickets + some POS; segmented email | D: Tickets + POS + app; multi-channel + fan scoring | E: Unified hub: tickets, POS, app, loyalty, Wi-Fi → lifecycle campaigns ★TOP 10 (Rank 6)

**TS_18** | Does your organization use a CDP to unify fan identity across data sources?
A: No CDP | B: Manual data consolidation | C: CDP unifying 2–3 sources | D: CDP unifying 4+ sources w/ auto identity resolution | E: CDP all sources, real-time, sponsor-facing data products

### Sub-Category H: Broadcast & Content (2)
**TS_19** | Does your venue use IPTV or content distribution for clubs, suites, and concourses?
A: Broadcast feed or static only | B: Basic IPTV, no overlay | C: IPTV w/ venue channels to clubs/suites | D: Multi-channel, zone-specific, sponsor integration | E: Advanced: personalized, interactive, betting/fantasy integration

**TS_20** | Can fans access exclusive in-venue content on their mobile devices?
A: None | B: Basic (map, menus) | C: Live stats + basic replays | D: Multi-angle replays, real-time stats, interactive | E: Comprehensive second-screen: multi-angle, tracking, AR, fantasy/betting, personalized

### Sub-Category I: Facility & Maintenance (3)
**TS_21** | Does your venue use a CMMS or digital work order system?
A: Verbal/paper | B: Basic digital break-fix | C: CMMS w/ preventive + asset records | D: CMMS w/ lifecycle tracking + reporting | E: Enterprise CMMS + IoT sensor feeds + auto work orders

**TS_22** | Does your venue use a building automation system?
A: No centralized BAS | B: BAS for HVAC only | C: HVAC + lighting w/ scheduling | D: HVAC + lighting + additional w/ event profiles | E: Integrated BAS all systems, real-time optimization, occupancy-based

**TS_23** | Does your venue track and optimize sustainability metrics via software?
A: None | B: Basic utility tracking | C: Real-time energy monitoring | D: Energy + water + waste w/ goal tracking | E: Comprehensive w/ optimization, renewables, carbon accounting, sponsor reporting

### Sub-Category J: Parking & Transportation (2)
**TS_24** | Does your venue offer digital parking reservation with dynamic pricing?
A: Cash/pay-on-arrival only | B: Digital pre-purchase, fixed price, third-party | C: Digital reservation, tiered pricing, integrated | D: Dynamic pricing + real-time availability | E: Fully integrated: dynamic pricing, reservation, lot optimization, arrival analytics

**TS_25** | Does your venue use software to coordinate rideshare, shuttle, and transportation?
A: No coordination | B: Designated pickup zone, no digital | C: One rideshare platform integration | D: Multi-modal: rideshare + shuttle + transit in app | E: Integrated platform: rideshare, shuttle, transit, parking egress, fan-facing ETAs

---

## Layer 3: Digital Infrastructure (25 Questions)

### Sub-Category A: Cloud & Compute (3)
**DI_01** | Where are the majority of venue technology workloads hosted?
A: Entirely on-premise | B: Primarily on-prem, select cloud | C: Hybrid ~50/50 | D: Primarily cloud, on-prem for latency | E: Cloud-first w/ orchestrated edge

**DI_02** | Can your compute environment scale for peak game-day loads?
A: Fixed capacity | B: Some cloud scales, on-prem doesn't | C: Cloud auto-scales, on-prem provisioned for expected peak | D: Both scale w/ documented headroom | E: Full elastic w/ load testing, thresholds, alerting ★TOP 10 (Rank 8)

**DI_03** | Does your venue have on-premise edge compute for low-latency workloads?
A: None | B: Basic local servers for POS failover | C: Dedicated edge for 1–2 workloads | D: Multiple edge nodes, managed orchestration | E: Purpose-built w/ GPU, cloud failover, AI inference ready

### Sub-Category B: Data Storage & Management (3)
**DI_04** | How is fan and transactional data stored and organized?
A: In each app's native DB | B: Periodic exports to shared location | C: Warehouse/lake from 2–3 systems | D: Warehouse/lake from most systems, structured, scheduled | E: Modern platform, all systems, near-real-time, governed, self-service ★TOP 10 (Rank 5)

**DI_05** | How many seasons of historical data do you retain in queryable format?
A: <1 season | B: 1 | C: 2–3 | D: 4–5 | E: 6+ w/ consistent schemas

**DI_06** | Do you have a documented backup and DR plan for critical technology data?
A: No plan | B: Ad hoc backups, no DR | C: Scheduled backups + DR plan, not tested <12 months | D: Scheduled + tested <12 months w/ RPO/RTO | E: Automated, geo-redundant, tested annually, RPO <1hr, RTO <4hr ★TOP 10 (Rank 10)

### Sub-Category C: Data Integration & APIs (3)
**DI_07** | How are venue technology systems connected to share data?
A: Manual transfer | B: Few point-to-point | C: Multiple point-to-point, no middleware | D: iPaaS/middleware for most systems | E: Enterprise integration platform, standardized APIs, event-driven ★TOP 10 (Rank 1)

**DI_08** | Do major venue systems expose APIs for programmatic data access?
A: Most don't; manual exports | B: 1–2 have APIs | C: Most have APIs, inconsistent | D: Most have documented APIs, actively used | E: All have documented, versioned APIs w/ registry

**DI_09** | Can your stack deliver real-time data to dashboards during a live event?
A: No real-time; post-event only | B: 1–2 streams near-real-time | C: Several streams, not consolidated | D: Most streams in unified real-time dashboard | E: All streams unified w/ alerting, triggers, historical comparison ★TOP 10 (Rank 6)

### Sub-Category D: Network & Data Security (3)
**DI_10** | What is the maturity of your venue-specific cybersecurity program?
A: No venue-specific program | B: Basic protections, no assessment | C: Assessment done; firewalls, endpoints, segmentation | D: SIEM/MDR, vuln scanning, IR plan tested <12mo | E: 24/7 monitoring, pen testing, IR rehearsed, vendor reviews, PCI-DSS ★TOP 10 (Rank 7)

**DI_11** | Is your network segmented (fan, ops, broadcast, IoT on isolated segments)?
A: Flat network | B: Fan vs. back-of-house only | C: Fan, ops, broadcast separate; IoT not segmented | D: All four separated w/ access controls | E: Micro-segmentation, zero-trust, monitored, audited

**DI_12** | Do you have documented data privacy practices for fan PII?
A: None | B: Basic policy, not enforced | C: Documented, published, reviewed annually | D: Comprehensive: data inventory, consent, retention, training | E: Mature: automated enforcement, audits, breach notification, regulatory alignment

### Sub-Category E: Content Delivery & Media (2)
**DI_13** | Is there dedicated CDN/caching infrastructure for in-venue media delivery?
A: All media over shared internet | B: Local caching for signage only | C: Local media servers for signage + IPTV | D: CDN edge for signage, IPTV, and fan mobile | E: Comprehensive: local CDN, media servers, optimized routing, independent from ops traffic

**DI_14** | Does your venue use a centralized digital asset management platform?
A: Shared drives/email | B: Basic cloud storage, some folders | C: DAM for some categories | D: DAM most categories w/ metadata + versioning | E: Enterprise DAM integrated w/ CMS, social, broadcast, rights management

### Sub-Category F: Analytics & Reporting (3)
**DI_15** | Do you have a BI/analytics platform producing recurring reports?
A: Spreadsheets only | B: BI for one dept | C: BI across 2–3 depts | D: Broad BI: ticketing, concessions, ops, engagement | E: Enterprise BI, real-time + post-event, self-service, integrated w/ warehouse ★TOP 10 (Rank 4)

**DI_16** | Can you correlate data across systems (ticket buyer → POS spend → app usage → entry time)?
A: No cross-system correlation | B: Manual matching, labor-intensive | C: Automated between 2 systems | D: Automated across 3–4 w/ shared identifier | E: Unified fan data model across all systems ★TOP 10 (Rank 3)

**DI_17** | Can non-technical business users access venue data through self-service tools?
A: IT required for every request | B: Pre-built reports shared, no self-service | C: Self-service for 1–2 use cases | D: Self-service dashboards, multiple depts | E: Governed self-service w/ role-based access, documentation, training

### Sub-Category G: Identity & Access Management (2)
**DI_18** | Does your infrastructure support a unified fan identity across systems?
A: Different IDs in each system | B: Partial linkage between 2 systems | C: 3–4 systems linked via email/account | D: Automated resolution, most systems, centralized profile | E: Fully automated identity graph, authenticated + non-authenticated ★TOP 10 (Rank 2)

**DI_19** | How is third-party vendor access to venue systems managed?
A: Ad hoc, shared credentials | B: Individual creds, not reviewed | C: Individual creds, documented, annual review | D: Centralized w/ RBAC, MFA, quarterly review | E: IAM platform, MFA, RBAC, session logging, auto-deprovision, audit trail

### Sub-Category H: Monitoring & Performance (3)
**DI_20** | What percentage of critical infrastructure is covered by proactive monitoring?
A: None; reactive only | B: Core network only | C: Network + select apps | D: Most infra + apps; some edge gaps | E: Comprehensive across all, w/ alerting + escalation + dashboards

**DI_21** | What technology support resources are engaged during game day?
A: No dedicated support | B: 1–2 IT staff, no protocol | C: Dedicated team w/ monitoring + escalation | D: Command center, dashboards, SLAs | E: Command center + vendor reps, runbooks, SLAs, post-event review ★TOP 10 (Rank 9)

**DI_22** | Do you conduct pre-season capacity planning and load testing?
A: None | B: Informal prior-season review | C: Pre-season review w/ adjustments, no load test | D: Pre-season planning + load testing for key systems | E: Comprehensive planning, load testing, simulation, scaling plan for high-demand events

### Cross-Cutting (3)
**DI_23** | Do you maintain documented, current technology architecture?
A: None | B: Some docs, outdated | C: Core network + major systems; partial integrations | D: Comprehensive, reviewed annually | E: Living docs in centralized platform, version-controlled, accessible to stakeholders

**DI_24** | Is there formal change management for venue technology modifications?
A: No process | B: Informal email awareness | C: Documented process, approval for major changes | D: Process w/ approval, game-day change freeze, post-change validation | E: Mature: CAB review, risk-based tiers, mandatory freeze, rollback plans, PIR

**DI_25** | Do you maintain a documented technology debt and modernization backlog?
A: No backlog; reactive | B: Informal awareness | C: Documented gaps, no impact assessment | D: Prioritized w/ business impact + cost estimates, annual review | E: Maintained roadmap w/ priority scoring, funding alignment, regular IT + business review

---

## Layer 4: AI & Innovation (25 Questions)

### Sub-Category A: Computer Vision & Video Analytics (3)
**AI_01** | Does your venue use AI computer vision for real-time crowd density and flow?
A: None | B: Pilot 1–2 zones | C: Active in high-traffic zones, real-time to ops | D: Most areas, ops dashboards + staffing recs | E: Venue-wide, integrated w/ signage, app, post-event models ★TOP 10

**AI_02** | Does your venue use AI to measure queue lengths and share wait times with fans?
A: None | B: Pilot 1–2, internal only | C: Multiple locations, ops-visible | D: Broadly active, fan-facing via app/signage | E: Venue-wide, predictive, automated redistribution ★TOP 10

**AI_03** | Does your venue use biometric recognition for any fan-facing use case?
A: None | B: Evaluated/planned | C: Active for 1 use case | D: 2+ fan-facing use cases w/ consent protocols | E: Multiple touchpoints (entry, payment, VIP, age) w/ comprehensive privacy compliance

### Sub-Category B: Predictive Analytics (3)
**AI_04** | Does your venue use AI/ML to predict concession demand by location/product/daypart?
A: No prediction | B: Historical averages only | C: ML venue-wide, not location-specific | D: ML by location w/ game/weather/opponent | E: By location, product, daypart + auto reorder ★TOP 10

**AI_05** | Does your venue use predictive analytics for equipment maintenance?
A: None | B: IoT sensors, manual analysis | C: Basic anomaly detection on select equipment | D: ML failure prediction, major equipment | E: Comprehensive w/ auto work orders + CMMS integration

**AI_06** | Does your organization use AI/ML for fan behavior prediction (renewal, churn, upgrade)?
A: None | B: Rule-based segmentation | C: ML for 1 use case | D: ML multiple use cases informing campaigns | E: Fan intelligence platform, multiple models, integrated w/ CRM automation ★TOP 10

### Sub-Category C: Generative AI (3)
**AI_07** | Does your organization use GenAI for fan-facing content (emails, push, social)?
A: None | B: Ad hoc (ChatGPT by staff) | C: Integrated in 1 channel | D: Multiple channels w/ segment personalization | E: Embedded in marketing automation, individually personalized, multi-channel, w/ optimization loops

**AI_08** | Does your venue offer an AI chatbot or virtual assistant for fans?
A: None | B: Scripted FAQ bot | C: NLU-powered, 1 channel | D: Multi-channel, questions + wayfinding + basic transactions | E: Advanced AI assistant integrated w/ venue systems, personalized recs, ordering, issue resolution ★TOP 10

**AI_09** | Does your team use GenAI internally for operational workflows?
A: None | B: Ad hoc individual use | C: Formally available w/ guidelines | D: Integrated in 1–2 workflows | E: Embedded in multiple workflows w/ governance + measurable productivity gains

### Sub-Category D: Dynamic Pricing & Revenue Optimization (2)
**AI_10** | Does your venue use AI for dynamic concession/merchandise pricing?
A: Fixed | B: Evaluating | C: Limited (happy hour) not AI-driven | D: AI-driven select categories | E: AI-driven most categories, real-time, measured impact

**AI_11** | Does your venue use AI for personalized offers, upgrades, or upsell?
A: None (same for all) | B: Segment-based | C: Purchase history-based | D: Multi-signal AI personalization | E: Real-time AI engine w/ A/B testing + optimization ★TOP 10

### Sub-Category E: Immersive & Interactive (3)
**AI_12** | Does your venue offer AI-powered AR experiences?
A: None | B: Prototyped | C: 1 live experience | D: 2–3 live, in app, multiple areas | E: Multiple AR integrated into fan journey w/ usage analytics + sponsor integration

**AI_13** | Does your venue use AI to deliver personalized in-venue content to individual fans?
A: None (same for all) | B: Zone-level differentiation | C: App personalization via profile preferences | D: AI-driven across app + select displays | E: Comprehensive: each fan's app + nearby displays deliver contextual content

**AI_14** | Does your venue use AI-powered gamification during events?
A: None | B: Basic static contests | C: In-app challenges, static rules | D: AI-adapted content/difficulty | E: Comprehensive gamified platform w/ AI personalization, leaderboards, rewards, sponsor integration

### Sub-Category F: Automated Operations (2)
**AI_15** | Does your venue use AI to automate operational tasks (staffing recs, restocking alerts, energy)?
A: None | B: 1 automated use case | C: 2–3 | D: 4+ spanning multiple depts | E: Comprehensive across staffing, inventory, energy, maintenance, guest services

**AI_16** | Does your venue deploy robots or autonomous systems (delivery, cleaning, transport)?
A: None | B: Evaluating | C: 1 system piloted | D: 1–2 systems operational during events | E: Multiple systems across different use cases, integrated w/ ops

### Sub-Category G: Intelligent Sponsorship (2)
**AI_17** | Does your venue use AI/programmatic technology for dynamic sponsor content on signage?
A: Manually scheduled | B: Rule-based (halftime = sponsor A) | C: Programmatic on select displays | D: Programmatic most displays w/ audience data + performance metrics | E: AI-driven all touchpoints (signage, app, IPTV) w/ optimization + sponsor dashboards ★TOP 10

**AI_18** | Does your venue use AI to measure and attribute sponsor activation impact?
A: None | B: Foot traffic counting, select zones | C: Impressions + dwell at select activations | D: Comprehensive across most activations w/ demographics | E: Full attribution: impressions → purchase behavior, sponsor dashboards ★TOP 10

### Sub-Category H: Digital Twin & Simulation (2)
**AI_19** | Does your venue have a digital twin?
A: None | B: BIM model from construction, not used | C: In development or partial | D: Operational for building systems + maintenance | E: Comprehensive: building + crowd + real-time IoT + scenario planning ★TOP 10

**AI_20** | Does your venue use AI crowd simulation for flow optimization?
A: None | B: Manual observation-based planning | C: One-time study (design phase) | D: Periodic simulation w/ current data | E: Ongoing AI simulation, integrated w/ digital twin + ops, dynamic during events

### Sub-Category I: Emerging & Experimental (5)
**AI_21** | Does your venue use blockchain/NFT for ticketing or credentials?
A: None | B: Evaluating | C: Pilot (1 event) | D: Active for 1 use case across season | E: Multiple applications (ticketing, collectibles, token-gated)

**AI_22** | Does your venue offer tokenized or digital collectible experiences?
A: None | B: Evaluating | C: 1 initiative launched | D: Multiple offerings across season | E: Integrated ecosystem w/ collectibles, token-gated experiences, marketplace

**AI_23** | Does your organization have a formal innovation pipeline for evaluating and scaling new tech?
A: Ad hoc/vendor-driven | B: Informal awareness | C: Designated owner w/ periodic eval | D: Formal pipeline w/ criteria, pilot framework, success metrics | E: Mature program w/ budget, pipeline, pilot-to-scale, partner relationships, leadership reporting ★TOP 10

**AI_24** | Does your venue actively partner with vendors/startups/academia for co-innovation?
A: Standard vendor relationships only | B: Occasional vendor demos | C: 1–2 active partnerships | D: 3+ across different domains | E: Strategic ecosystem w/ dedicated programs, shared IP

**AI_25** | Does your organization have an AI governance and responsible use framework?
A: None | B: Informal awareness | C: Basic guidelines (approved/prohibited) | D: Documented framework w/ ethics review | E: Mature program: policies, review board, transparency, bias auditing, vendor assessment

---

# PART 5: CROSS-LAYER CORRELATION HYPOTHESES

These are the analytical stories the Tableau dashboard should be designed to test:

1. **Layer 1 (ID_01 Wi-Fi density) + Layer 2 (TS_02 Mobile ordering) → Per-cap F&B spend**: High AP density should enable higher mobile ordering adoption, which correlates to 22% higher average order sizes.

2. **Layer 1 (ID_02 Security screening + ID_05 Gate throughput) → Pre-game revenue**: Faster entry should correlate with higher pre-game concession revenue as fans arrive with more time to spend.

3. **Layer 1 (ID_04 Digital signage ratio) + Layer 2 (TS_05 Signage CMS) + Layer 4 (AI_08 Programmatic ads) → Sponsorship revenue per game**: The full hardware→software→intelligence stack should produce measurably higher sponsorship yields.

4. **Layer 2 (TS_01 POS consolidation) + Layer 3 (DI_01 Integration architecture) → Data reliability**: Unified POS + integrated systems should produce more reliable per-cap spending data.

5. **Layer 3 (DI_02 Unified fan identity) + Layer 3 (DI_03 Cross-system correlation) → Per-fan revenue measurement**: Venues with unified identity and cross-system correlation can measure true per-fan game-day value.

6. **Layer 4 (AI_01 Crowd analytics + AI_02 Queue measurement) → Fan satisfaction with wait times**: Venues with AI-powered crowd and queue intelligence should show higher fan satisfaction scores.

7. **Layer 1–4 composite score → Overall venue technology maturity index**: The aggregate score across all four layers produces a single modernization readiness score that can be benchmarked league-wide.

8. **Layer imbalance detection**: Venues scoring high on Layer 1–2 but low on Layer 3–4 have invested in technology but aren't extracting intelligence. Venues scoring high on Layer 3–4 but low on Layer 1–2 have ambition outpacing their foundation.
