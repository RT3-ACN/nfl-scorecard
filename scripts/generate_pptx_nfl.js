#!/usr/bin/env node
/**
 * generate_pptx_nfl.js — NFL Stadium Scorecard PPTX Generator
 *
 * Generates co-branded Accenture × NFL slide decks matching the design
 * language observed in NFL Walkaround_v2.pptx and Scorecard_walkaround_proposal.pptx.
 *
 * Usage:
 *   node generate_pptx_nfl.js --input outputs/walkaround.md --type walkaround
 *   node generate_pptx_nfl.js --demo  (generates a sample deck showing all slide types)
 *
 * Colors verified from theme1.xml (NFL Walkaround_v2.pptx, 2026-03-25)
 * + real deck fill/text color analysis.
 */

const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// ─── NFL × Accenture Brand ────────────────────────────────────────────────────
const NFL = {
  // NFL official colors (from deck theme + real usage)
  navy:       "013369",  // NFL Official Navy — primary headers, section fills
  blue:       "0070C0",  // NFL Blue — roadmap tracks, accent elements
  lightBlue:  "A9CCEE",  // NFL Light Blue — tertiary fills, table bg
  paleBlue:   "ACCBF9",  // Pale blue — alternating row fills, card bg
  darkNavy:   "0F172A",  // Near-black — dark slide backgrounds, timeline
  deepNavy:   "072C62",  // Deep navy — header bars on dark slides
  themePrimary: "242852",// Theme dk1 — deepest brand navy

  // Accenture co-brand
  purple:     "A100FF",  // Accenture signature purple — chevron, accent
  accentBlue: "003399",  // Accenture navy (appears in some slides)

  // Status / RAG
  red:        "D50707",  // Low / At Risk
  amber:      "FFC000",  // Medium / Watch
  green:      "00B050",  // High / On Track
  greenAlt:   "00AD4E",  // On Track variant

  // Neutrals
  black:      "000000",
  white:      "FFFFFF",
  lightGray:  "F8FAFC",  // Near-white slide bg variant
  midGray:    "94A3B8",  // Caption / metadata text
  divider:    "E2E8F0",  // Thin divider lines

  // Typography — End Zone is NFL proprietary, Graphik is Accenture standard
  font:          "Graphik",
  fontDisplay:   "End Zone",   // NFL proprietary — cover/hero text only
  fontFallback:  "Arial",
};

// Slide dimensions (standard widescreen)
const W = 13.33;
const H = 7.50;

// ─── Shared Components ────────────────────────────────────────────────────────

/** Accenture ">" chevron — top-right corner (co-brand marker) */
function addChevron(slide) {
  slide.addText(">", {
    x: W - 0.7, y: 0.1, w: 0.5, h: 0.4,
    fontSize: 18, bold: true, color: NFL.purple,
    fontFace: NFL.font, align: "right",
  });
}

/** Footer: copyright + slide number */
function addFooter(slide, pageNum) {
  slide.addText("Copyright © 2025 Accenture. All rights reserved.", {
    x: 0.3, y: H - 0.28, w: 8, h: 0.22,
    fontSize: 7, color: NFL.midGray, fontFace: NFL.font,
  });
  if (pageNum) {
    slide.addText(String(pageNum), {
      x: W - 0.5, y: H - 0.28, w: 0.35, h: 0.22,
      fontSize: 7, color: NFL.midGray, fontFace: NFL.font, align: "right",
    });
  }
}

/** NFL shield logo placeholder (top-left, cover slides) */
function addNFLLogo(slide) {
  // Placeholder — replace with actual NFL shield image in production
  slide.addShape(PptxGenJS.ShapeType ? PptxGenJS.ShapeType.rect : "rect", {
    x: 0.25, y: 0.2, w: 0.65, h: 0.75,
    fill: { color: NFL.navy },
    line: { color: NFL.white, width: 1.5 },
  });
  slide.addText("NFL", {
    x: 0.25, y: 0.2, w: 0.65, h: 0.75,
    fontSize: 11, bold: true, color: NFL.white,
    fontFace: NFL.fontDisplay, align: "center", valign: "middle",
  });
}

/** Standard dark header bar (navy, full width, top of content slides) */
function addHeaderBar(slide, label, color) {
  const fillColor = color || NFL.navy;
  slide.addShape("rect", {
    x: 0, y: 0, w: W, h: 0.55,
    fill: { color: fillColor },
    line: { type: "none" },
  });
  if (label) {
    slide.addText(label.toUpperCase(), {
      x: 0.35, y: 0, w: W - 0.7, h: 0.55,
      fontSize: 9, bold: true, color: NFL.white,
      fontFace: NFL.font, align: "left", valign: "middle",
      charSpacing: 2,
    });
  }
}

/** Section label chip (dark navy, used in corner labels like "PROJECT OVERVIEW") */
function addSectionChip(slide, label, x, y) {
  slide.addShape("rect", {
    x, y, w: 2.2, h: 0.28,
    fill: { color: NFL.navy },
    line: { type: "none" },
  });
  slide.addText(label.toUpperCase(), {
    x, y, w: 2.2, h: 0.28,
    fontSize: 7, bold: true, color: NFL.white,
    fontFace: NFL.font, align: "center", valign: "middle",
    charSpacing: 1.5,
  });
}

// ─── Slide Type 1: Cover ──────────────────────────────────────────────────────
/**
 * NFL cover slide — dark navy gradient background, NFL + Accenture co-branding.
 * In production: replace background shape with stadium photo image.
 *
 * @param {Object} pptx
 * @param {string} title      e.g. "NFL Scorecard Overview"
 * @param {string} subtitle   e.g. "Phase 2 — Stadium Technology Assessment"
 * @param {string} date       e.g. "March 2026"
 */
function addNFLCover(pptx, title, subtitle, date) {
  const slide = pptx.addSlide();

  // Background — dark navy (production: swap for stadium photo)
  slide.addShape("rect", {
    x: 0, y: 0, w: W, h: H,
    fill: { color: NFL.darkNavy },
    line: { type: "none" },
  });

  // Gradient overlay strip (bottom two-thirds — lighter navy tint)
  slide.addShape("rect", {
    x: 0, y: H * 0.4, w: W, h: H * 0.6,
    fill: { type: "gradient", stops: [
      { position: 0, color: NFL.navy, transparency: 60 },
      { position: 100, color: NFL.darkNavy, transparency: 0 },
    ]},
    line: { type: "none" },
  });

  // NFL logo — top left
  addNFLLogo(slide);

  // Accenture chevron — top right
  addChevron(slide);

  // Title (End Zone / display font for NFL feel)
  slide.addText("NFL", {
    x: 0.4, y: H - 2.5, w: W - 0.8, h: 0.6,
    fontSize: 28, bold: true, color: NFL.white,
    fontFace: NFL.fontDisplay,
  });
  slide.addText(title, {
    x: 0.4, y: H - 1.9, w: W - 0.8, h: 0.9,
    fontSize: 36, bold: true, color: NFL.white,
    fontFace: NFL.font,
  });

  // Subtitle + date
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.4, y: H - 1.05, w: W * 0.7, h: 0.35,
      fontSize: 14, color: NFL.lightBlue,
      fontFace: NFL.font,
    });
  }
  if (date) {
    slide.addText(date, {
      x: 0.4, y: H - 0.7, w: W * 0.6, h: 0.28,
      fontSize: 12, color: NFL.midGray,
      fontFace: NFL.font,
    });
  }

  // Footer
  slide.addText("Copyright © 2025 Accenture. All rights reserved.", {
    x: W - 3.5, y: H - 0.2, w: 3.3, h: 0.18,
    fontSize: 6, color: NFL.midGray, fontFace: NFL.font, align: "right",
  });
}

// ─── Slide Type 2: Section Divider ───────────────────────────────────────────
/**
 * Dark navy section divider — matches "Blank - Light" layout used for transitions.
 *
 * @param {Object} pptx
 * @param {string} sectionTitle  e.g. "Phase 2 Methodology Overview"
 * @param {string} sectionLabel  e.g. "02"
 */
function addNFLSectionDivider(pptx, sectionTitle, sectionLabel) {
  const slide = pptx.addSlide();

  // Dark background
  slide.addShape("rect", {
    x: 0, y: 0, w: W, h: H,
    fill: { color: NFL.darkNavy },
    line: { type: "none" },
  });

  // Left color bar (NFL navy accent)
  slide.addShape("rect", {
    x: 0, y: 0, w: 0.08, h: H,
    fill: { color: NFL.navy },
    line: { type: "none" },
  });

  // Section number
  if (sectionLabel) {
    slide.addText(sectionLabel, {
      x: 0.4, y: 1.8, w: 2, h: 1.2,
      fontSize: 72, bold: true, color: NFL.navy,
      fontFace: NFL.fontDisplay, transparency: 40,
    });
  }

  // Section title
  slide.addText(sectionTitle, {
    x: 0.4, y: H / 2 - 0.6, w: W - 0.8, h: 1.2,
    fontSize: 36, bold: true, color: NFL.white,
    fontFace: NFL.font,
  });

  addChevron(slide);
  addFooter(slide);
}

// ─── Slide Type 3: Two-Column Overview ───────────────────────────────────────
/**
 * Two-column layout — scope/description left, opportunity areas right.
 * Matches S03 "Project Scope & Opportunity Areas" pattern.
 *
 * @param {Object} pptx
 * @param {string} title
 * @param {string} subtitle
 * @param {Object} left   { label, heading, bullets: [] }
 * @param {Object} right  { label, heading, bullets: [] }
 * @param {number} [pageNum]
 */
function addNFLTwoColumn(pptx, title, subtitle, left, right, pageNum) {
  const slide = pptx.addSlide();

  // Header bar
  addHeaderBar(slide, null, NFL.navy);

  // Title / subtitle row
  slide.addText(title, {
    x: 0.35, y: 0.62, w: W - 0.7, h: 0.38,
    fontSize: 18, bold: true, color: NFL.navy,
    fontFace: NFL.font,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.35, y: 1.0, w: W - 0.7, h: 0.28,
      fontSize: 12, color: NFL.midGray, fontFace: NFL.font,
    });
  }

  // Thin divider
  slide.addShape("line", {
    x: 0.35, y: 1.32, w: W - 0.7, h: 0,
    line: { color: NFL.divider, width: 0.75 },
  });

  const colY = 1.45;
  const colH = H - colY - 0.4;
  const leftW = (W / 2) - 0.5;
  const rightX = W / 2 + 0.1;
  const rightW = (W / 2) - 0.45;

  // LEFT column
  if (left.label) addSectionChip(slide, left.label, 0.35, colY);
  slide.addText(left.heading || "", {
    x: 0.35, y: colY + 0.35, w: leftW, h: 0.35,
    fontSize: 13, bold: true, color: NFL.navy, fontFace: NFL.font,
  });

  const leftBullets = (left.bullets || []).map(b => ({
    text: b,
    options: { bullet: { type: "bullet", indent: 10 }, fontSize: 11, color: NFL.black, fontFace: NFL.font, paraSpaceAfter: 4 },
  }));
  if (leftBullets.length) {
    slide.addText(leftBullets, {
      x: 0.35, y: colY + 0.75, w: leftW, h: colH - 0.8,
      valign: "top",
    });
  }

  // Vertical divider
  slide.addShape("line", {
    x: W / 2 - 0.05, y: colY, w: 0, h: colH,
    line: { color: NFL.divider, width: 0.75 },
  });

  // RIGHT column
  if (right.label) addSectionChip(slide, right.label, rightX, colY);
  slide.addText(right.heading || "", {
    x: rightX, y: colY + 0.35, w: rightW, h: 0.35,
    fontSize: 13, bold: true, color: NFL.navy, fontFace: NFL.font,
  });

  const rightBullets = (right.bullets || []).map(b => ({
    text: b,
    options: { bullet: { type: "bullet", indent: 10 }, fontSize: 11, color: NFL.black, fontFace: NFL.font, paraSpaceAfter: 4 },
  }));
  if (rightBullets.length) {
    slide.addText(rightBullets, {
      x: rightX, y: colY + 0.75, w: rightW, h: colH - 0.8,
      valign: "top",
    });
  }

  addChevron(slide);
  addFooter(slide, pageNum);
}

// ─── Slide Type 4: Status Update ─────────────────────────────────────────────
/**
 * Project health / status slide — matches S04 pattern.
 * Shows health indicator, near-term objectives, and next steps.
 *
 * @param {Object} pptx
 * @param {string} title
 * @param {"green"|"amber"|"red"} health
 * @param {string[]} objectives   Bullet list
 * @param {string[]} nextSteps    Bullet list (owner | action | date)
 * @param {number} [pageNum]
 */
function addNFLStatus(pptx, title, health, objectives, nextSteps, pageNum) {
  const slide = pptx.addSlide();
  addHeaderBar(slide, "Project Health", NFL.deepNavy);

  const healthColor = health === "green" ? NFL.green : health === "amber" ? NFL.amber : NFL.red;
  const healthLabel = health === "green" ? "On Track" : health === "amber" ? "Watch" : "At Risk";

  // Health indicator chip
  slide.addShape("rect", {
    x: 0.35, y: 0.65, w: 1.5, h: 0.32,
    fill: { color: healthColor },
    line: { type: "none" },
  });
  slide.addText(healthLabel.toUpperCase(), {
    x: 0.35, y: 0.65, w: 1.5, h: 0.32,
    fontSize: 9, bold: true, color: NFL.white,
    fontFace: NFL.font, align: "center", valign: "middle",
    charSpacing: 1,
  });

  slide.addText(title, {
    x: 2.0, y: 0.65, w: W - 2.3, h: 0.32,
    fontSize: 18, bold: true, color: NFL.navy,
    fontFace: NFL.font,
  });

  // Objectives section
  addSectionChip(slide, "Near-Term Objectives", 0.35, 1.2);
  const objBullets = (objectives || []).map(o => ({
    text: o,
    options: { bullet: true, fontSize: 11, color: NFL.black, fontFace: NFL.font, paraSpaceAfter: 5 },
  }));
  slide.addText(objBullets.length ? objBullets : [{ text: "TBD", options: { fontSize: 11, color: NFL.midGray } }], {
    x: 0.35, y: 1.55, w: (W / 2) - 0.5, h: H - 2.3,
    valign: "top",
  });

  // Next steps section
  addSectionChip(slide, "Next Steps & Notes", W / 2 + 0.1, 1.2);
  const stepBullets = (nextSteps || []).map(s => ({
    text: s,
    options: { bullet: true, fontSize: 11, color: NFL.black, fontFace: NFL.font, paraSpaceAfter: 5 },
  }));
  slide.addText(stepBullets.length ? stepBullets : [{ text: "TBD", options: { fontSize: 11, color: NFL.midGray } }], {
    x: W / 2 + 0.1, y: 1.55, w: (W / 2) - 0.45, h: H - 2.3,
    valign: "top",
  });

  // Vertical divider
  slide.addShape("line", {
    x: W / 2 - 0.05, y: 1.2, w: 0, h: H - 1.6,
    line: { color: NFL.divider, width: 0.75 },
  });

  addChevron(slide);
  addFooter(slide, pageNum);
}

// ─── Slide Type 5: Weekly Timeline ───────────────────────────────────────────
/**
 * Weekly workplan — dark background with W1/W2/W3/W4 columns.
 * Matches S05 pattern.
 *
 * @param {Object} pptx
 * @param {string} title
 * @param {string} subtitle
 * @param {Object[]} weeks  [{ label: "W1", activities: ["..."] }]
 * @param {number} [pageNum]
 */
function addNFLTimeline(pptx, title, subtitle, weeks, pageNum) {
  const slide = pptx.addSlide();

  // Dark background
  slide.addShape("rect", {
    x: 0, y: 0, w: W, h: H,
    fill: { color: NFL.darkNavy },
    line: { type: "none" },
  });

  // Title
  slide.addText(title, {
    x: 0.35, y: 0.15, w: W - 0.7, h: 0.45,
    fontSize: 20, bold: true, color: NFL.white,
    fontFace: NFL.font,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.35, y: 0.6, w: W - 0.7, h: 0.28,
      fontSize: 11, color: NFL.midGray, fontFace: NFL.font,
    });
  }

  const numWeeks = weeks.length || 4;
  const colW = (W - 0.7) / numWeeks;
  const colY = 1.0;
  const colH = H - colY - 0.35;

  weeks.forEach((week, idx) => {
    const x = 0.35 + idx * colW;

    // Week header bar
    slide.addShape("rect", {
      x, y: colY, w: colW - 0.06, h: 0.38,
      fill: { color: NFL.navy },
      line: { type: "none" },
    });
    slide.addText(week.label || `W${idx + 1}`, {
      x, y: colY, w: colW - 0.06, h: 0.38,
      fontSize: 11, bold: true, color: NFL.white,
      fontFace: NFL.font, align: "center", valign: "middle",
    });

    // Week body
    slide.addShape("rect", {
      x, y: colY + 0.38, w: colW - 0.06, h: colH - 0.38,
      fill: { color: NFL.deepNavy },
      line: { color: NFL.navy, width: 0.5 },
    });

    const actBullets = (week.activities || []).map(a => ({
      text: a,
      options: { bullet: true, fontSize: 10, color: NFL.lightBlue, fontFace: NFL.font, paraSpaceAfter: 6 },
    }));
    if (actBullets.length) {
      slide.addText(actBullets, {
        x: x + 0.1, y: colY + 0.48, w: colW - 0.26, h: colH - 0.58,
        valign: "top",
      });
    }
  });

  addChevron(slide);
  addFooter(slide, pageNum);
}

// ─── Slide Type 6: Roadmap Lanes ─────────────────────────────────────────────
/**
 * A/B/C/D roadmap lanes — matches S06/S17 pattern.
 * Each lane is a horizontal row with label + activities.
 *
 * @param {Object} pptx
 * @param {string} title
 * @param {string} subtitle
 * @param {Object[]} lanes  [{ label: "A", color: "navy|blue|lightBlue|pale", items: ["..."] }]
 * @param {number} [pageNum]
 */
function addNFLRoadmap(pptx, title, subtitle, lanes, pageNum) {
  const slide = pptx.addSlide();
  addHeaderBar(slide, null, NFL.navy);

  slide.addText(title, {
    x: 0.35, y: 0.62, w: W - 0.7, h: 0.38,
    fontSize: 18, bold: true, color: NFL.navy, fontFace: NFL.font,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.35, y: 1.0, w: W - 0.7, h: 0.25,
      fontSize: 11, color: NFL.midGray, fontFace: NFL.font,
    });
  }

  const laneColors = { navy: NFL.navy, blue: NFL.blue, lightBlue: NFL.lightBlue, pale: NFL.paleBlue };
  const defaultColors = [NFL.navy, NFL.navy, NFL.blue, NFL.lightBlue];

  const laneY = 1.35;
  const laneH = (H - laneY - 0.35) / (lanes.length || 1);

  lanes.forEach((lane, idx) => {
    const y = laneY + idx * laneH;
    const fillColor = laneColors[lane.color] || defaultColors[idx] || NFL.navy;
    const textColor = (lane.color === "lightBlue" || lane.color === "pale") ? NFL.navy : NFL.white;

    // Lane label
    slide.addShape("rect", {
      x: 0.35, y, w: 0.55, h: laneH - 0.06,
      fill: { color: fillColor },
      line: { type: "none" },
    });
    slide.addText(lane.label || String.fromCharCode(65 + idx), {
      x: 0.35, y, w: 0.55, h: laneH - 0.06,
      fontSize: 16, bold: true, color: textColor,
      fontFace: NFL.font, align: "center", valign: "middle",
    });

    // Lane content area
    slide.addShape("rect", {
      x: 0.92, y, w: W - 1.27, h: laneH - 0.06,
      fill: { color: fillColor, transparency: 85 },
      line: { color: fillColor, width: 0.5 },
    });

    const itemBullets = (lane.items || []).map(item => ({
      text: item,
      options: { bullet: true, fontSize: 10.5, color: NFL.black, fontFace: NFL.font },
    }));
    if (itemBullets.length) {
      slide.addText(itemBullets, {
        x: 1.05, y: y + 0.05, w: W - 1.45, h: laneH - 0.16,
        valign: "middle",
      });
    }
  });

  addChevron(slide);
  addFooter(slide, pageNum);
}

// ─── Slide Type 7: Framework / Icon Grid ─────────────────────────────────────
/**
 * Technology framework overview with icon-style cards.
 * Matches S07 "Enabling The Digital Fan & Operations Experience" pattern.
 *
 * @param {Object} pptx
 * @param {string} hero    Full-width headline/vision statement
 * @param {string} title   Slide title (below hero)
 * @param {Object[]} areas [{ icon: "icon text", name: "...", description: "..." }]
 * @param {number} [pageNum]
 */
function addNFLFramework(pptx, hero, title, areas, pageNum) {
  const slide = pptx.addSlide();
  addHeaderBar(slide, null, NFL.navy);

  // Hero statement (italic, styled)
  if (hero) {
    slide.addText(hero, {
      x: 0.35, y: 0.62, w: W - 0.7, h: 0.45,
      fontSize: 13, italic: true, color: NFL.navy,
      fontFace: NFL.font,
    });
  }

  slide.addText(title, {
    x: 0.35, y: 1.1, w: W - 0.7, h: 0.35,
    fontSize: 16, bold: true, color: NFL.navy,
    fontFace: NFL.font,
  });

  // Divider
  slide.addShape("line", {
    x: 0.35, y: 1.48, w: W - 0.7, h: 0,
    line: { color: NFL.divider, width: 0.75 },
  });

  const numCols = Math.min(areas.length, 4);
  const cardW = (W - 0.7) / numCols;
  const cardY = 1.6;
  const cardH = H - cardY - 0.4;

  areas.forEach((area, idx) => {
    const x = 0.35 + idx * cardW;

    // Icon circle (placeholder)
    slide.addShape("rect", {
      x: x + 0.1, y: cardY, w: 0.45, h: 0.45,
      fill: { color: NFL.navy },
      line: { type: "none" },
    });
    slide.addText(area.icon || "○", {
      x: x + 0.1, y: cardY, w: 0.45, h: 0.45,
      fontSize: 14, color: NFL.white,
      fontFace: NFL.font, align: "center", valign: "middle",
    });

    // Area name
    slide.addText(area.name || "", {
      x: x + 0.1, y: cardY + 0.52, w: cardW - 0.2, h: 0.4,
      fontSize: 11, bold: true, color: NFL.navy,
      fontFace: NFL.font,
    });

    // Description
    slide.addText(area.description || "", {
      x: x + 0.1, y: cardY + 0.94, w: cardW - 0.2, h: cardH - 0.96,
      fontSize: 10, color: NFL.black,
      fontFace: NFL.font, valign: "top",
    });

    // Thin right border (except last)
    if (idx < numCols - 1) {
      slide.addShape("line", {
        x: x + cardW - 0.03, y: cardY, w: 0, h: cardH,
        line: { color: NFL.divider, width: 0.75 },
      });
    }
  });

  addChevron(slide);
  addFooter(slide, pageNum);
}

// ─── Slide Type 8: Data Table ─────────────────────────────────────────────────
/**
 * Survey / scoring table slide — matches S13/S23 pattern.
 *
 * @param {Object} pptx
 * @param {string} title
 * @param {string} subtitle
 * @param {string[]} headers
 * @param {string[][]} rows
 * @param {number} [pageNum]
 */
function addNFLTable(pptx, title, subtitle, headers, rows, pageNum) {
  const slide = pptx.addSlide();
  addHeaderBar(slide, null, NFL.navy);

  slide.addText(title, {
    x: 0.35, y: 0.62, w: W - 0.7, h: 0.36,
    fontSize: 16, bold: true, color: NFL.navy, fontFace: NFL.font,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.35, y: 0.98, w: W - 0.7, h: 0.26,
      fontSize: 11, color: NFL.midGray, fontFace: NFL.font,
    });
  }

  const tableY = subtitle ? 1.32 : 1.1;
  const tableH = H - tableY - 0.35;
  const rowH = Math.min(0.38, tableH / (rows.length + 1));
  const colW = (W - 0.7) / headers.length;

  // Header row
  headers.forEach((h, i) => {
    slide.addShape("rect", {
      x: 0.35 + i * colW, y: tableY, w: colW, h: rowH,
      fill: { color: NFL.navy },
      line: { color: NFL.white, width: 0.5 },
    });
    slide.addText(h, {
      x: 0.35 + i * colW + 0.05, y: tableY, w: colW - 0.1, h: rowH,
      fontSize: 9, bold: true, color: NFL.white,
      fontFace: NFL.font, valign: "middle",
    });
  });

  // Data rows
  rows.forEach((row, rowIdx) => {
    const y = tableY + (rowIdx + 1) * rowH;
    const bg = rowIdx % 2 === 0 ? NFL.paleBlue : NFL.white;
    row.forEach((cell, colIdx) => {
      slide.addShape("rect", {
        x: 0.35 + colIdx * colW, y, w: colW, h: rowH,
        fill: { color: bg },
        line: { color: NFL.divider, width: 0.5 },
      });
      slide.addText(cell || "", {
        x: 0.35 + colIdx * colW + 0.05, y, w: colW - 0.1, h: rowH,
        fontSize: 9, color: NFL.black,
        fontFace: NFL.font, valign: "middle",
      });
    });
  });

  addChevron(slide);
  addFooter(slide, pageNum);
}

// ─── Slide Type 9: Next Steps ─────────────────────────────────────────────────
/**
 * Next steps / action items — matches S14 pattern.
 *
 * @param {Object} pptx
 * @param {string} title
 * @param {Object[]} steps  [{ action, owner, date, status: "complete|progress|todo" }]
 * @param {string} [note]   Optional footnote
 * @param {number} [pageNum]
 */
function addNFLNextSteps(pptx, title, steps, note, pageNum) {
  const slide = pptx.addSlide();
  addHeaderBar(slide, null, NFL.deepNavy);

  slide.addText(title, {
    x: 0.35, y: 0.62, w: W - 0.7, h: 0.38,
    fontSize: 18, bold: true, color: NFL.navy, fontFace: NFL.font,
  });

  const stepY = 1.15;
  const stepH = Math.min(0.55, (H - stepY - 0.4) / (steps.length || 1));
  const statusColors = { complete: NFL.green, progress: NFL.amber, todo: NFL.midGray };

  steps.forEach((step, idx) => {
    const y = stepY + idx * stepH;
    const statusColor = statusColors[step.status] || NFL.midGray;

    // Status dot
    slide.addShape("ellipse", {
      x: 0.35, y: y + stepH * 0.25, w: 0.18, h: 0.18,
      fill: { color: statusColor },
      line: { type: "none" },
    });

    // Connecting line
    if (idx < steps.length - 1) {
      slide.addShape("line", {
        x: 0.435, y: y + stepH * 0.5, w: 0, h: stepH * 0.5,
        line: { color: NFL.divider, width: 1 },
      });
    }

    // Action
    slide.addText(step.action || "", {
      x: 0.65, y, w: W * 0.55, h: stepH,
      fontSize: 11, bold: !!step.bold, color: NFL.black,
      fontFace: NFL.font, valign: "middle",
    });

    // Owner
    if (step.owner) {
      slide.addText(step.owner, {
        x: W * 0.62, y, w: W * 0.2, h: stepH,
        fontSize: 10, color: NFL.midGray,
        fontFace: NFL.font, valign: "middle",
      });
    }

    // Date
    if (step.date) {
      slide.addText(step.date, {
        x: W - 1.55, y, w: 1.2, h: stepH,
        fontSize: 10, color: NFL.navy, bold: true,
        fontFace: NFL.font, valign: "middle", align: "right",
      });
    }
  });

  if (note) {
    slide.addText(note, {
      x: 0.35, y: H - 0.55, w: W - 0.7, h: 0.28,
      fontSize: 9, italic: true, color: NFL.midGray, fontFace: NFL.font,
    });
  }

  addChevron(slide);
  addFooter(slide, pageNum);
}

// ─── Slide Type 10: Content + Bullets ────────────────────────────────────────
/**
 * Standard content slide — header bar, title, subtitle, bullet list.
 *
 * @param {Object} pptx
 * @param {string} title
 * @param {string} subtitle
 * @param {string[]} bullets
 * @param {string} [headerLabel]   Optional label on dark header
 * @param {number} [pageNum]
 */
function addNFLContent(pptx, title, subtitle, bullets, headerLabel, pageNum) {
  const slide = pptx.addSlide();
  addHeaderBar(slide, headerLabel || null, NFL.navy);

  slide.addText(title, {
    x: 0.35, y: 0.62, w: W - 0.7, h: 0.38,
    fontSize: 18, bold: true, color: NFL.navy, fontFace: NFL.font,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.35, y: 1.0, w: W - 0.7, h: 0.28,
      fontSize: 11, italic: true, color: NFL.midGray, fontFace: NFL.font,
    });
  }

  slide.addShape("line", {
    x: 0.35, y: subtitle ? 1.32 : 1.05, w: W - 0.7, h: 0,
    line: { color: NFL.divider, width: 0.75 },
  });

  const contentY = subtitle ? 1.42 : 1.15;
  const bulletList = (bullets || []).map(b => ({
    text: b,
    options: { bullet: true, fontSize: 12, color: NFL.black, fontFace: NFL.font, paraSpaceAfter: 6 },
  }));

  if (bulletList.length) {
    slide.addText(bulletList, {
      x: 0.35, y: contentY, w: W - 0.7, h: H - contentY - 0.4,
      valign: "top",
    });
  }

  addChevron(slide);
  addFooter(slide, pageNum);
}

// ─── Demo Deck ────────────────────────────────────────────────────────────────
function generateDemo() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.defineLayout({ name: "WIDESCREEN", width: W, height: H });
  pptx.layout = "WIDESCREEN";

  let pg = 1;

  addNFLCover(pptx, "Scorecard Overview", "Phase 2 — Stadium Technology Assessment", "March 2026");

  addNFLSectionDivider(pptx, "Project Scope & Opportunity Areas", "01");

  addNFLTwoColumn(pptx,
    "Stadium Technology Scorecard | Phase 2",
    "Project Scope & Opportunity Areas",
    {
      label: "Project Overview",
      heading: "Scope",
      bullets: [
        "Accenture will assist the NFL in designing, building, and launching a Stadium Technology Scorecard",
        "Phase 2 expands from 4 pilot clubs to league-wide deployment",
        "Covers 4 technology layers: TI, DI, TS, AI & Innovation",
      ],
    },
    {
      label: "Opportunity Areas Through Benchmarking",
      heading: "Investment Priorities",
      bullets: [
        "Network & Connectivity — Wi-Fi 6/6E, DAS, 5G coverage",
        "Cloud & Edge Platform — remote management, scaled delivery",
        "AI & Innovation Services — CV, predictive analytics, GenAI",
        "Digital Fan Experience — ticketing, mobile ordering, app",
      ],
    },
    ++pg
  );

  addNFLStatus(pptx,
    "Project Health",
    "green",
    [
      "Finalize SOW for NFL review",
      "Complete Phase 2 survey methodology design",
      "Kick off with 4 pilot clubs — Q1 2026",
    ],
    [
      "Jon Wakefield to confirm scoring weights — March 28",
      "Gary Brantley review of SOW — April 3",
      "Survey portal go-live — April 15",
    ],
    ++pg
  );

  addNFLSectionDivider(pptx, "Phase 2 Methodology Overview", "02");

  addNFLTimeline(pptx,
    "Phase 2 Roadmap — 6-Week Sprint",
    "This indicative timeline provides a high-level view over a 6-week period.",
    [
      { label: "W1–2", activities: ["Finalize SOW", "Kick-off meeting", "Confirm survey methodology"] },
      { label: "W3–4", activities: ["Build surveys in Google Forms", "Develop scoring algorithm", "Club outreach"] },
      { label: "W5–6", activities: ["Survey go-live (4 clubs)", "Data ingestion", "Dashboard integration"] },
      { label: "W7+",  activities: ["Validate results", "Club readouts", "League rollout plan"] },
    ],
    ++pg
  );

  addNFLRoadmap(pptx,
    "Phase 2 Roadmap",
    "Parallel workstreams with sequential dependencies",
    [
      { label: "A", color: "navy",      items: ["Survey methodology — finalize question set, scoring template assignment, VOF integration"] },
      { label: "B", color: "navy",      items: ["Technology build — Google Forms, scoring engine, dashboard back-end integration"] },
      { label: "C", color: "blue",      items: ["Club engagement — outreach, onboarding, survey administration for 4 pilot clubs"] },
      { label: "D", color: "lightBlue", items: ["Outputs — scored dashboards, club reports, league benchmarks, Phase 3 roadmap"] },
    ],
    ++pg
  );

  addNFLFramework(pptx,
    "Exploring experience and technology to create a frictionless physical + digital fan journey",
    "Enabling The Digital Fan & Operations Experience",
    [
      { icon: "📡", name: "Network & Connectivity",    description: "Wired/wireless communications connecting platforms, devices, and fans across the stadium" },
      { icon: "☁️", name: "Cloud & Edge Platform",     description: "Remote and scaled management of devices and experiences — compute at the edge" },
      { icon: "📱", name: "Technology Services",       description: "SaaS + ops platforms: ticketing, mobile ordering, CRM, dynamic signage" },
      { icon: "🤖", name: "AI & Innovation",           description: "Agentic AI and next-gen innovation — CV, predictive analytics, personalization" },
    ],
    ++pg
  );

  addNFLTable(pptx,
    "Illustrative Survey Questions",
    "Sample from the 51-question scorecard — Technology Infrastructure layer",
    ["Question ID", "Survey Question", "Answer Format", "Scoring Template"],
    [
      ["TI_01", "What Wi-Fi standard is deployed throughout the venue?", "Single-select A–E", "T1"],
      ["TI_02", "What % of the seating bowl has Wi-Fi coverage >= -65 dBm?", "Single-select A–E", "T2"],
      ["TI_03", "What is the peak concurrent connected device count per 10,000 seats?", "Single-select A–E", "T4"],
      ["DI_01", "What cloud platform manages stadium edge devices?", "Single-select A–E", "T1"],
      ["TS_01", "What % of F&B transactions are processed on club-managed POS?", "Single-select A–E", "T2"],
      ["AI_01", "Are computer vision systems deployed for crowd analytics?", "Single-select A–E", "T1"],
    ],
    ++pg
  );

  addNFLNextSteps(pptx,
    "Next Steps",
    [
      { action: "Finalize SOW for NFL review",               owner: "Jon Wakefield",  date: "Mar 28",  status: "progress" },
      { action: "Confirm scoring methodology (Phase 2)",     owner: "RT3",            date: "Apr 1",   status: "progress" },
      { action: "Build survey in Google Forms (4 clubs)",    owner: "RT3",            date: "Apr 8",   status: "todo" },
      { action: "Dashboard back-end integration",            owner: "Data Analyst",   date: "Apr 15",  status: "todo" },
      { action: "Club kick-off — Pilot 4 clubs",             owner: "Jon Wakefield",  date: "Apr 18",  status: "todo" },
    ],
    "Dates are indicative pending SOW finalization.",
    ++pg
  );

  addNFLContent(pptx,
    "Phase 2: From Manual to Automated, Defensible Benchmarking",
    "Standardized inputs eliminate manual normalization, reduce bias, and enable automated scoring",
    [
      "Phase 1 used manual rationalization — introduced scoring bias and limited scalability across 32 clubs",
      "Phase 2 moves to structured survey inputs: drop-down responses, normalized per 10K seats, VOF integration",
      "Scoring engine calculates maturity scores automatically against 51 questions across 4 technology layers",
      "Dashboard provides live benchmarking across clubs — identifying investment gaps and best-in-class practices",
      "Voice of Fan data provides business value correlation to technology investments",
    ],
    "KEY ACTIVITIES",
    ++pg
  );

  return pptx;
}

// ─── Markdown Parser ──────────────────────────────────────────────────────────
function parseMarkdown(md) {
  const lines = md.split("\n");
  const slides = [];
  let current = null;

  for (const line of lines) {
    const h1 = line.match(/^# (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    const bullet = line.match(/^[-*] (.+)/);

    if (h1) {
      if (current) slides.push(current);
      current = { type: "cover", title: h1[1], bullets: [] };
    } else if (h2) {
      if (current) slides.push(current);
      // Detect type from prefix
      if (h2[1].startsWith("[DIVIDER]")) {
        current = { type: "divider", title: h2[1].replace("[DIVIDER]", "").trim(), bullets: [] };
      } else if (h2[1].startsWith("[STATUS]")) {
        current = { type: "status", title: h2[1].replace("[STATUS]", "").trim(), bullets: [], objectives: [], nextSteps: [] };
      } else if (h2[1].startsWith("[TIMELINE]")) {
        current = { type: "timeline", title: h2[1].replace("[TIMELINE]", "").trim(), bullets: [], weeks: [] };
      } else if (h2[1].startsWith("[TABLE]")) {
        current = { type: "table", title: h2[1].replace("[TABLE]", "").trim(), bullets: [], headers: [], rows: [] };
      } else if (h2[1].startsWith("[NEXTSTEPS]")) {
        current = { type: "nextsteps", title: h2[1].replace("[NEXTSTEPS]", "").trim(), bullets: [], steps: [] };
      } else {
        current = { type: "content", title: h2[1], bullets: [], subtitle: "" };
      }
    } else if (h3 && current) {
      current.subtitle = h3[1];
    } else if (bullet && current) {
      current.bullets.push(bullet[1]);
    } else if (line.trim() && current && current.type === "cover" && !current.subtitle) {
      if (!current.date) current.date = line.trim();
    }
  }

  if (current) slides.push(current);
  return slides;
}

function buildFromMarkdown(md) {
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "WIDESCREEN", width: W, height: H });
  pptx.layout = "WIDESCREEN";

  const slides = parseMarkdown(md);
  let pg = 0;

  for (const s of slides) {
    ++pg;
    if (s.type === "cover") {
      addNFLCover(pptx, s.title, s.subtitle, s.date);
    } else if (s.type === "divider") {
      addNFLSectionDivider(pptx, s.title);
    } else if (s.type === "status") {
      addNFLStatus(pptx, s.title, "green", s.bullets.slice(0, 4), s.bullets.slice(4), pg);
    } else if (s.type === "timeline") {
      const weeks = s.bullets.map((b, i) => ({ label: `W${i+1}`, activities: [b] }));
      addNFLTimeline(pptx, s.title, s.subtitle, weeks, pg);
    } else if (s.type === "table") {
      addNFLTable(pptx, s.title, s.subtitle, s.headers, s.rows, pg);
    } else if (s.type === "nextsteps") {
      const steps = s.bullets.map(b => {
        const parts = b.split("|").map(p => p.trim());
        return { action: parts[0], owner: parts[1], date: parts[2], status: "todo" };
      });
      addNFLNextSteps(pptx, s.title, steps, null, pg);
    } else {
      addNFLContent(pptx, s.title, s.subtitle, s.bullets, null, pg);
    }
  }

  return pptx;
}

// ─── CLI ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const demo = args.includes("--demo");
  const inputIdx = args.indexOf("--input");
  const outputIdx = args.indexOf("--output");

  let pptx;
  let outputPath;

  if (demo) {
    pptx = generateDemo();
    outputPath = path.join(
      __dirname,
      "../deliverables",
      `NFL_Template_Demo_${new Date().toISOString().split("T")[0]}.pptx`
    );
  } else if (inputIdx !== -1 && args[inputIdx + 1]) {
    const inputFile = args[inputIdx + 1];
    const md = fs.readFileSync(inputFile, "utf8");
    pptx = buildFromMarkdown(md);
    if (outputIdx !== -1 && args[outputIdx + 1]) {
      outputPath = args[outputIdx + 1];
    } else {
      outputPath = inputFile.replace(/\.md$/, ".pptx");
    }
  } else {
    console.log("Usage:");
    console.log("  node generate_pptx_nfl.js --demo");
    console.log("  node generate_pptx_nfl.js --input <file.md> [--output <file.pptx>]");
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await pptx.writeFile({ fileName: outputPath });
  console.log(`✓ Saved: ${outputPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });
