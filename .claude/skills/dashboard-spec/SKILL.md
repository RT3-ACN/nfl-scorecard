---
name: dashboard-spec
description: Generates Tableau dashboard specifications for the NFL Stadium Technology Scorecard (Deliverable D). Use when designing, documenting, or reviewing dashboard views, KPIs, calculated fields, or data structures.
allowed-tools: Read, Glob
---

Generate a Tableau dashboard specification for the NFL Stadium Technology Scorecard.
Reference `reference/NFL_Scorecard_Methodology_v1.2.md` for scoring formulas and `reference/nfl_voice_of_the_fan_research.md` for outcome correlation data.

$ARGUMENTS

## Data Source Requirements

**Active question set:** `working/survey/WIP_NFL_Survey_v0.xlsx` → "NFL Claude V0" — 51 questions across 4 layers (TI=15, DI=16, TS=10, AI=10)

**4-layer framework (v2):**
| Layer | Prefix | Questions |
|-------|--------|-----------|
| Technology Infrastructure | `TI_` | 15 (connectivity only) |
| Digital Infrastructure | `DI_` | 16 (cloud + data + physical endpoints) |
| Technology Services | `TS_` | 10 |
| AI & Innovation | `AI_` | 10 |

**Input data shape:** Scored survey responses — rows = clubs × questions (51), columns = metadata + raw score + adjusted score + confidence factor

**Required calculated fields (Tableau) — PROTOTYPE, not finalized:**

```
// Adjusted Score (apply confidence if available)
AdjustedScore = IF [ConfidenceFactor] != NULL
  THEN [RawScore] × [ConfidenceFactor]
  ELSE [RawScore]
END

// Layer Score (E/C/P/G weighted; O excluded) — weights prototype
LayerScore =
  (0.25 × AVG(IF [Dimension]="E" THEN [AdjustedScore] END)) +
  (0.25 × AVG(IF [Dimension]="C" THEN [AdjustedScore] END)) +
  (0.30 × AVG(IF [Dimension]="P" THEN [AdjustedScore] END)) +
  (0.20 × AVG(IF [Dimension]="G" THEN [AdjustedScore] END))

// Normalized to 0–100
NormalizedLayerScore = [LayerScore] / 10 × 100

// Game Phase Score — prototype
PhaseScore = SUM([AdjustedScore] × [PhaseWeight] × [PhaseApplicability])
             / SUM([MaxPossible]) × 10

// Benchmark gap (vs. pilot average)
BenchmarkGap = [NormalizedLayerScore] − WINDOW_AVG([NormalizedLayerScore])

// Maturity Tier (for color coding)
MaturityTier =
  IF [NormalizedLayerScore] < 40 THEN "Emerging"
  ELSEIF [NormalizedLayerScore] < 60 THEN "Developing"
  ELSEIF [NormalizedLayerScore] < 80 THEN "Advanced"
  ELSE "Leading"
END
```

## Required Dashboard Views

**View 1: Executive Summary (1-page printable)**
- Overall Maturity Index: gauge chart 0–100 per club
- 4-layer radar/spider chart: Technology Infrastructure | Digital Infrastructure | Technology Services | AI & Innovation
- Top 3 strengths + top 3 gaps (auto-ranked by score delta from mean)
- Benchmark indicator badge: above/below pilot average
- Data confidence indicator (% of responses with Confidence ≥ 0.9)

**View 2: Club Comparison**
- Grouped bar chart: all 4 layers × all pilot clubs (side-by-side)
- Color encoding: Red=Emerging (<40), Amber=Developing (40–60), Light Green=Advanced (60–80), Dark Green=Leading (>80)
- Filters: Layer (TI/DI/TS/AI), Dimension (E/C/P/G/O), Game Phase (Pre/In/Post)
- Toggle: raw score vs. confidence-adjusted score

**View 3: Dimension Drill-Down**
- Heat map: Clubs (rows) × Dimensions E/C/P/G/O (columns) within selected layer
- Cell value = NormalizedLayerScore for that dimension
- Click-through: expands to individual question scores
- Hover tooltip: question text, evidence type, scoring template, club's rubric anchor text

**View 4: Gap Analysis / Prioritization Matrix**
- Scatter plot: x-axis = Business Impact (from VOF correlation, normalized 1–5), y-axis = Maturity Gap (benchmark delta)
- Quadrant labels:
  - Q1 (high impact, high gap) = **Quick Wins — Prioritize**
  - Q2 (high impact, low gap) = **Leverage — Protect**
  - Q3 (low impact, high gap) = **Invest Later**
  - Q4 (low impact, low gap) = **Deprioritize**
- Dot size = number of questions in sub-area; dot color = Technology Area
- Filter: by club or all-clubs view

**View 5: Fan Journey Heatmap**
- Journey stages (columns): Research & Buy | Transportation | Entry | F&B | In-Game | Restrooms | Merchandise | Post-Game
- Technology layers (rows): 4 layers (TI, DI, TS, AI)
- Cell = average score of questions tagged to that stage × area intersection
- Highlights where fan experience gaps concentrate along the journey

**View 6: Progress Tracker** *(placeholder until Wave 2)*
- Line chart shell: Maturity Index over survey waves (Wave 1 data point populated; Waves 2–3 empty)
- Include annotation: "Wave 2 survey target: [DATE TBD]"

## Design Standards
- **Color palette:** Navy #013369, Red #D50A0A, White #FFFFFF (NFL brand)
- **Maturity tier colors:** Red #D50A0A (<40), Amber #FFA500 (40–60), Light Green #90EE90 (60–80), Dark Green #006400 (>80)
- **Typography:** Clean sans-serif; titles 18pt, labels 12pt
- **Format:** Executive-ready 1-page print layout (View 1) + interactive drill-down (Views 2–6)
- Flag any sub-area with fewer than 3 responses as "Insufficient Data — exclude from benchmarking"

## Output Format
Produce a specification document with one section per view:
- **View name and purpose**
- **Data fields required** (from input dataset)
- **Calculated fields** (Tableau formula or pseudocode)
- **Filter options**
- **Wireframe description** (text-based layout sketch)
- **Open questions / decisions needed**
