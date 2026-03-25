# Building a Brand Skill Builder with Claude Code

**A repeatable system that ingests brand assets, generates a machine-readable "brand skill," and produces on-brand content across formats does not yet exist as an open-source tool — making this a genuine market gap.** The ideal architecture combines Claude Code's agentic capabilities with MCP servers for brand asset management, a W3C Design Tokens–aligned JSON schema for the brand skill itself, and a template-based output pipeline that cleanly separates Claude-generated content from designer-controlled presentation. This report lays out the complete architecture, toolchain, schema design, co-branding logic, and recommended implementation roadmap.

## The ingestion pipeline turns heterogeneous files into structured brand data

The core insight for parsing brand assets is that PowerPoint, Word, and Excel files are all ZIP archives containing XML following the Office Open XML standard. They share an identical theme system — `theme1.xml` contains a `<a:clrScheme>` element with RGB values for all theme color slots (Accent 1–6, Dark 1–2, Light 1–2) and a `<a:fontScheme>` with heading and body font definitions. **A single universal theme parser handles all three formats**, making extraction surprisingly uniform.

For **PowerPoint**, `python-pptx` (v1.0.0, MIT license) provides full access to slide masters, layouts, placeholders, font properties, and shape-level color data. Theme color *definitions* (the actual hex values behind ACCENT_1 etc.) require unzipping the PPTX and parsing `ppt/theme/theme1.xml` directly with `lxml` — a well-documented workaround. For **Word documents**, `python-docx` (v1.2.0) extracts all 276+ built-in styles, font properties, heading hierarchies, and paragraph formatting. For **Excel**, `openpyxl` reads cell-level fonts, fill colors, borders, conditional formatting, and named styles.

**PDF parsing** demands two complementary tools. PyMuPDF (fitz) excels at fast, character-level extraction — font name, size, color as hex, and embedded images — processing pages significantly faster than alternatives. pdfplumber adds superior table detection and layout analysis with exact coordinates for every character, line, and rectangle. For scanned/image-based PDFs, PyMuPDF renders pages to images that can then be analyzed by Claude's vision capabilities.

**Image analysis** for brand elements uses `colorthief` (Modified Median Cut Quantization algorithm) to extract dominant colors and palettes from logos and graphics, while `python-colormath` handles advanced color science including Delta E calculations for Pantone approximation. Claude Vision adds a semantic layer — analyzing imagery style, identifying approximate font families, describing layout patterns, and extracting logo usage rules that no programmatic parser can detect. The recommended call pattern sends base64-encoded images with structured extraction prompts requesting JSON output covering colors (hex), typography, layout, logo rules, imagery style, and overall brand impression.

The complete color standardization pipeline converts extracted values through `colorsys` (RGB↔HSV↔HLS), `webcolors` (hex↔named colors), and `python-colormath` (sRGB↔Lab↔OKLCH) to produce a normalized representation in all standard formats: hex, RGB, HSL, CMYK approximation, and nearest CSS name.

## The brand skill schema follows W3C Design Tokens with voice extensions

The W3C Design Tokens Community Group released its **first stable specification in October 2025**, establishing JSON with `$value`, `$type`, and `$description` conventions as the industry standard. The brand skill schema should align with this format while extending it for non-visual brand properties like tone of voice.

The schema uses a three-tier token architecture inspired by Spotify's Encore design system: **primitive tokens** (raw values like `green-500`), **semantic tokens** (contextual mappings like `brand-primary` that reference primitives), and **component-specific tokens** (applied values like `button-background`). This layering enables safe value changes — updating a primitive cascades through all semantic references.

**Color values should use OKLCH** (Oklab cylindrical) as the primary representation. OKLCH is perceptually uniform, meaning equal numeric changes produce equal visual changes — critical for algorithmic co-branding blends. CSS `color-mix(in oklch, ...)` provides native browser support, and libraries like `culori` and `colorjs.io` handle server-side OKLCH interpolation. Hex fallbacks accompany each value for backward compatibility.

The voice and tone section uses **numeric trait vectors** — formality (0–1), warmth (0–1), humor (0–1), technical depth (0–1) — alongside weighted personality traits (e.g., `{"professional": 0.5, "bold": 0.3, "approachable": 0.2}`). This quantitative representation enables algorithmic blending during co-branding while also providing Claude with precise style parameters. The schema includes preferred/avoided vocabulary lists, writing rules, and jargon level settings.

For Claude's context window efficiency, the schema supports three density modes: **compact** (~2,000–3,000 tokens) for essential primitives, **standard** (~5,000–8,000 tokens) for full semantic tokens, and **comprehensive** (~10,000–15,000 tokens) with co-branding rules. Optimization strategies include pre-resolving alias chains, stripping `$description` fields for production context, and using abbreviated OKLCH notation. Style Dictionary v4 serves as the transformation engine — custom transforms can convert the brand skill JSON into a Claude-optimized context prompt, CSS variables, iOS constants, or any other platform format.

## Claude Code's skills, hooks, and MCP servers form the orchestration layer

Claude Code provides three complementary extensibility mechanisms for brand workflows. **Skills** (`.claude/skills/brand-audit/SKILL.md`) are YAML-frontmattered markdown files that define reusable workflows — triggered via `/brand-audit` slash commands or auto-invoked when Claude detects a matching task. A Brand Skill Builder project would define skills for `/brand-ingest` (parse uploaded assets), `/brand-generate` (produce content from a brand skill), `/brand-validate` (check output compliance), and `/cobrand-merge` (blend two brand skills).

**Hooks** execute deterministic shell commands at 19 lifecycle events. The most relevant for brand work: `PreToolUse` to auto-validate brand compliance before file writes, `PostToolUse` to auto-format generated outputs, and `TaskCompleted` to run post-generation quality checks. Hooks are configured in `.claude/settings.json` and provide 100% reliable automation with no AI variability.

**Output Styles** (`.claude/output-styles/brand-voice.md`) completely replace Claude Code's default system prompt with brand-specific voice and tone instructions. Combined with **CLAUDE.md** (the project's always-loaded constitution encoding brand fundamentals), these ensure every Claude Code interaction within the project respects brand guidelines.

The **MCP server architecture** should expose three capability types. **Resources** serve static brand data — `brand://guidelines/voice`, `brand://colors/primary`, `brand://templates/presentation` — making brand knowledge available to Claude without consuming context window tokens until needed. **Tools** handle dynamic operations: `search_brand_assets(query, type)`, `validate_brand_compliance(content)`, `merge_brand_skills(brand_a, brand_b, weight)`. **Prompts** provide standardized workflows for common tasks: brand audit template, content generation template, asset request template. The FastMCP Python SDK makes implementation straightforward with decorator-based tool/resource/prompt definitions, and `.mcp.json` in the project root enables team-wide sharing of MCP server configurations.

For complex brand tasks, Claude Code's **Agent Teams** pattern deploys parallel specialist agents — a Brand Analyst (audits and reviews), Content Writer (drafts and edits), and Visual Analyzer (processes images) — coordinated by an Orchestrator agent. Each runs in an isolated context window with its own persona and tools.

## Output generation separates Claude's content from designer-controlled templates

The architectural principle that prevents brand drift is **strict separation of content and presentation**. Claude generates structured JSON conforming to a Pydantic-validated schema — titles, bullet points, section text, chart data — with zero formatting information. Brand templates, created by designers in native tools, control all visual presentation. A rendering engine merges the two.

For **PowerPoint**, the workflow loads a pre-designed `brand_template.pptx` (containing slide masters with logos, footers, color schemes, and font families) using `python-pptx`, then iterates through Claude's JSON to create slides using appropriate layouts and fill placeholders. `pptx-template` adds Jinja2-like DSL syntax for complex data mapping. On the Node.js side, PptxGenJS supports programmatic Slide Master definitions with brand elements baked in, and `pptx-automizer` can merge content into existing PowerPoint-designed templates.

For **Word documents**, `docxtpl` combines python-docx with Jinja2 templating — designers insert `{{ variable }}` tags directly in a richly formatted Word document, and Python renders Claude's content into it while preserving all brand formatting. This supports RichText (programmatic font styles), dynamic tables with branded alternating row colors, header/footer logos, and subdocument embedding.

For **PDFs**, WeasyPrint with Jinja2 HTML templates delivers the best balance of brand fidelity and development speed. CSS `@page` rules control page size, margins, headers, and footers; CSS custom properties (`--brand-primary`, `--brand-font`) inject brand tokens; and Jinja2 templates inherit from a base brand layout. ReportLab offers maximum control for complex financial documents but demands significantly more development effort.

For **images and social graphics**, the dominant pattern renders HTML/CSS templates through Puppeteer's headless browser, screenshotting to PNG at exact social media dimensions (1200×630px for Open Graph, etc.). Brand fonts, colors, and layouts are controlled entirely by CSS. For **emails**, MJML compiles responsive templates from a 22-line component syntax to ~296 lines of cross-client HTML, with `<mj-attributes>` encoding brand defaults.

A **Pydantic validation layer** sits between Claude and rendering: it enforces that layouts come from an approved set, bullet text stays under word-count limits, and no formatting metadata leaks through. Post-render checks verify output properties — correct fonts loaded, colors within the brand palette, text fitting within template bounds.

## Co-branding merges two brand skills through weighted interpolation

Co-branding operates on a **fork-plus-override pattern**: the base brand skill lives in Git's `main` branch, and a co-brand variant exists as `cobrand/acme-x-partner` containing only an `overrides.tokens.json` and a `cobrand-config.json` specifying merge rules and weights. Three hierarchy modes govern the blend: **Primary-Secondary** (60/40 weight), **Equal Partnership** (50/50), and **Endorsement** (80/20).

**Color blending uses OKLCH-space weighted interpolation.** Lightness and chroma interpolate linearly; hue interpolates along the shorter arc of the 360° wheel. The merge strategy varies by token role: brand-primary colors are preserved from the primary brand, accent colors are blended at the configured weight, surfaces and text colors stay with the primary brand for accessibility, and status colors (success/warning/error) remain unmodified as semantic constants. An alternative "complementary injection" strategy keeps both palettes fully separate — Brand A for surfaces, Brand B for accent highlights — avoiding any blended colors.

**Font merging** follows contrast-over-concordance principles from typography research. The primary brand controls heading fonts and display sizes; the secondary brand contributes body text or is limited to accent typography. If both brands use the same classification (both sans-serif), the algorithm selects a contrasting alternative. x-height compatibility is validated, with scaling adjustments applied when the difference exceeds a threshold.

**Tone of voice merging** leverages the numeric trait vectors. Each dimension (formality, warmth, humor, technical depth) blends at the configured weight. Personality traits from both brands form a union, re-ranked by blended weights, with the top 3–4 traits selected for the merged profile. Writing rules merge additively — the primary brand's rules take precedence, and non-conflicting secondary rules are appended. For example, Brand A (professional: 0.5, bold: 0.3) merged at 60/40 with Brand B (innovative: 0.4, approachable: 0.3) yields a merged personality of "professional, bold, innovative."

## The recommended tech stack and implementation roadmap

No existing open-source tool combines brand asset ingestion, AI-powered analysis, structured brand skill generation, and multi-format output — this represents a genuine gap. The closest adjacent tools are **Style Dictionary** (token transformation pipeline), **Tokens Studio** (Figma↔code sync with Git branching), and **Brandfetch API** (programmatic access to any company's brand assets via domain lookup, free tier up to 500K requests/month). These should be integrated rather than rebuilt.

**Phase 1 (1–2 weeks): Streamlit prototype.** Pure Python frontend with `st.file_uploader` for brand assets, Claude API for analysis, `python-pptx`/`python-docx`/`colorthief` for parsing, and local filesystem + SQLite for storage. Deploy to Streamlit Community Cloud for immediate team sharing. This validates the core loop: upload assets → extract brand skill → generate branded output.

**Phase 2 (4–8 weeks): Production dashboard.** Next.js 15+ with shadcn/ui and Tailwind CSS v4 for the frontend (use Vercel v0 to accelerate scaffolding). FastAPI backend for Claude integration and file processing. Supabase for database, auth, and file storage. MCP servers for brand asset management. Style Dictionary pipeline for token export. SSE streaming for real-time Claude responses. Document preview via `@cyntler/react-doc-viewer` or server-side LibreOffice conversion to PDF.

The core libraries stack:

- **Ingestion**: python-pptx + python-docx + openpyxl + lxml (Office files), PyMuPDF + pdfplumber (PDFs), colorthief + Pillow (images), Claude Vision (semantic analysis)
- **Schema**: JSON with DTCG conventions, Style Dictionary v4 for transformation, OKLCH color space
- **Orchestration**: Claude Code Skills + Hooks + CLAUDE.md + Output Styles, FastMCP for MCP servers
- **Generation**: python-pptx (PowerPoint), docxtpl (Word), WeasyPrint + Jinja2 (PDF), Puppeteer (images), MJML (email)
- **Co-branding**: culori/colorjs.io for OKLCH interpolation, Git-based fork/override workflow
- **Frontend**: Streamlit (prototype) → Next.js + shadcn/ui (production)

## Conclusion

The Brand Skill Builder's power comes from three architectural decisions that distinguish it from existing brand tools. First, **using Claude Vision alongside programmatic parsers** for ingestion means the system captures not just raw hex values and font names but semantic brand rules — imagery mood, logo spacing conventions, tone personality — that no parser alone can extract. Second, **the strict content/presentation separation** through Pydantic-validated JSON intermediaries means Claude never makes formatting decisions, eliminating the primary source of brand drift in AI-generated content. Third, **quantifying voice and tone as numeric vectors** transforms co-branding from a subjective design exercise into an algorithmic operation with reproducible results. The W3C Design Tokens standard reaching stability in October 2025 provides the perfect schema foundation — an industry-endorsed, tool-compatible format that Style Dictionary, Tokens Studio, and Figma all support, future-proofing the brand skill against ecosystem changes.