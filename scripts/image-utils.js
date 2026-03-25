#!/usr/bin/env node
/**
 * image-utils.js — Background image fetching and generation for NFL PPTX slides
 *
 * Supports two modes:
 *   FETCH   — pulls a real photo from Unsplash (or Pexels fallback)
 *   GENERATE — generates an AI image via DALL-E 3 (or Replicate/Flux fallback)
 *
 * All functions return a base64 data URI string suitable for PptxGenJS addImage({ data }).
 *
 * Required env vars (set whichever you have):
 *   UNSPLASH_ACCESS_KEY   — free at https://unsplash.com/developers
 *   PEXELS_API_KEY        — free at https://www.pexels.com/api/
 *   OPENAI_API_KEY        — paid, https://platform.openai.com/api-keys
 *   REPLICATE_API_TOKEN   — paid, https://replicate.com/account/api-tokens
 *
 * Usage from CLI (standalone):
 *   node image-utils.js fetch "nfl stadium aerial"
 *   node image-utils.js generate "aerial view of modern NFL stadium at night, dramatic lighting"
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function downloadToBase64(url, headers = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText} — ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const mimeType = contentType.split(";")[0].trim();
  return `data:${mimeType};base64,${buf.toString("base64")}`;
}

function cacheDir() {
  const dir = path.join(os.tmpdir(), "nfl-pptx-images");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function cacheKey(label) {
  return path.join(cacheDir(), `${label.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.b64`);
}

function readCache(label) {
  const p = cacheKey(label);
  if (fs.existsSync(p)) {
    const age = Date.now() - fs.statSync(p).mtimeMs;
    if (age < 24 * 60 * 60 * 1000) return fs.readFileSync(p, "utf8"); // 24h cache
  }
  return null;
}

function writeCache(label, data) {
  fs.writeFileSync(cacheKey(label), data, "utf8");
}

// ─── Unsplash ──────────────────────────────────────────────────────────────────

/**
 * Fetch a photo from Unsplash matching `query`.
 * Returns base64 data URI.
 * Requires: UNSPLASH_ACCESS_KEY env var.
 */
async function fetchUnsplash(query) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    throw new Error(
      "UNSPLASH_ACCESS_KEY not set.\n" +
      "  → Free account at https://unsplash.com/developers\n" +
      "  → Then: export UNSPLASH_ACCESS_KEY=your_key"
    );
  }

  const cached = readCache(`unsplash_${query}`);
  if (cached) { console.log(`  [image] Cache hit: unsplash/${query}`); return cached; }

  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`;
  console.log(`  [image] Fetching from Unsplash: "${query}"...`);

  const meta = await fetch(url, {
    headers: { Authorization: `Client-ID ${key}` },
  });
  if (!meta.ok) {
    const body = await meta.text();
    throw new Error(`Unsplash API error ${meta.status}: ${body}`);
  }
  const json = await meta.json();
  const imageUrl = json.urls?.regular || json.urls?.full;
  if (!imageUrl) throw new Error("No image URL in Unsplash response");

  console.log(`  [image] Credit: "${json.description || json.alt_description}" by ${json.user?.name}`);
  const data = await downloadToBase64(imageUrl);
  writeCache(`unsplash_${query}`, data);
  return data;
}

// ─── Pexels ───────────────────────────────────────────────────────────────────

/**
 * Fetch a photo from Pexels matching `query`.
 * Returns base64 data URI.
 * Requires: PEXELS_API_KEY env var.
 */
async function fetchPexels(query) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    throw new Error(
      "PEXELS_API_KEY not set.\n" +
      "  → Free account at https://www.pexels.com/api/\n" +
      "  → Then: export PEXELS_API_KEY=your_key"
    );
  }

  const cached = readCache(`pexels_${query}`);
  if (cached) { console.log(`  [image] Cache hit: pexels/${query}`); return cached; }

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=5&page=1`;
  console.log(`  [image] Fetching from Pexels: "${query}"...`);

  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) throw new Error(`Pexels API error ${res.status}`);
  const json = await res.json();

  const photos = json.photos || [];
  if (!photos.length) throw new Error(`No Pexels results for "${query}"`);

  // Pick the largest landscape photo
  const photo = photos[0];
  const imageUrl = photo.src?.large2x || photo.src?.large || photo.src?.original;
  console.log(`  [image] Credit: "${photo.alt}" by ${photo.photographer}`);

  const data = await downloadToBase64(imageUrl);
  writeCache(`pexels_${query}`, data);
  return data;
}

// ─── DALL-E 3 ─────────────────────────────────────────────────────────────────

/**
 * Generate an image with OpenAI DALL-E 3.
 * Returns base64 data URI.
 * Requires: OPENAI_API_KEY env var.
 * Cost: ~$0.04/image (standard), ~$0.08/image (HD).
 */
async function generateDALLE(prompt, quality = "standard") {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error(
      "OPENAI_API_KEY not set.\n" +
      "  → Get key at https://platform.openai.com/api-keys\n" +
      "  → Then: export OPENAI_API_KEY=sk-..."
    );
  }

  // Include a style hint for professional/realistic output
  const fullPrompt = `${prompt}. Photorealistic, professional photography style, widescreen 16:9 aspect ratio.`;

  const cached = readCache(`dalle_${prompt}`);
  if (cached) { console.log(`  [image] Cache hit: dalle/${prompt.substring(0, 40)}`); return cached; }

  console.log(`  [image] Generating with DALL-E 3: "${prompt.substring(0, 60)}..."...`);
  console.log(`  [image] Quality: ${quality} (~$${quality === "hd" ? "0.08" : "0.04"})`);

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: fullPrompt,
      n: 1,
      size: "1792x1024",  // Widest landscape option
      quality,
      response_format: "b64_json",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`DALL-E 3 error ${res.status}: ${body}`);
  }

  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error("No image data in DALL-E 3 response");

  const data = `data:image/png;base64,${b64}`;
  writeCache(`dalle_${prompt}`, data);
  return data;
}

// ─── Replicate (Flux) ─────────────────────────────────────────────────────────

/**
 * Generate an image with Replicate (Flux 1.1 Pro).
 * Returns base64 data URI.
 * Requires: REPLICATE_API_TOKEN env var.
 * Cost: ~$0.04/image.
 */
async function generateReplicate(prompt) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    throw new Error(
      "REPLICATE_API_TOKEN not set.\n" +
      "  → Get token at https://replicate.com/account/api-tokens\n" +
      "  → Then: export REPLICATE_API_TOKEN=r8_..."
    );
  }

  const cached = readCache(`replicate_${prompt}`);
  if (cached) { console.log(`  [image] Cache hit: replicate/${prompt.substring(0, 40)}`); return cached; }

  console.log(`  [image] Generating with Flux 1.1 Pro (Replicate): "${prompt.substring(0, 60)}..."...`);

  // Flux 1.1 Pro — best quality/speed balance
  const startRes = await fetch("https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Prefer: "wait",  // Wait up to 60s for result
    },
    body: JSON.stringify({
      input: {
        prompt: `${prompt}. Photorealistic, professional photography, widescreen 16:9.`,
        aspect_ratio: "16:9",
        output_format: "jpg",
        output_quality: 90,
      },
    }),
  });

  if (!startRes.ok) {
    const body = await startRes.text();
    throw new Error(`Replicate API error ${startRes.status}: ${body}`);
  }

  const prediction = await startRes.json();

  // Poll if not immediately ready
  let output = prediction.output;
  let getUrl = prediction.urls?.get;

  if (!output && getUrl) {
    console.log("  [image] Waiting for Replicate result...");
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const pollRes = await fetch(getUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const poll = await pollRes.json();
      if (poll.status === "succeeded") { output = poll.output; break; }
      if (poll.status === "failed") throw new Error(`Replicate failed: ${poll.error}`);
    }
  }

  const imageUrl = Array.isArray(output) ? output[0] : output;
  if (!imageUrl) throw new Error("No output URL from Replicate");

  const data = await downloadToBase64(imageUrl);
  writeCache(`replicate_${prompt}`, data);
  return data;
}

// ─── Main Router ──────────────────────────────────────────────────────────────

/**
 * Fetch a real photo — tries Unsplash, falls back to Pexels.
 * @param {string} query  e.g. "NFL stadium aerial view"
 */
async function fetchPhoto(query) {
  if (process.env.UNSPLASH_ACCESS_KEY) return fetchUnsplash(query);
  if (process.env.PEXELS_API_KEY) return fetchPexels(query);
  throw new Error(
    "No photo API key found. Set one of:\n" +
    "  UNSPLASH_ACCESS_KEY  (https://unsplash.com/developers — free)\n" +
    "  PEXELS_API_KEY       (https://www.pexels.com/api/ — free)"
  );
}

/**
 * Generate an AI image — tries DALL-E 3, falls back to Replicate/Flux.
 * @param {string} prompt  e.g. "aerial view of NFL stadium at night with dramatic lighting"
 * @param {string} quality "standard" | "hd" (DALL-E 3 only)
 */
async function generatePhoto(prompt, quality = "standard") {
  if (process.env.OPENAI_API_KEY) return generateDALLE(prompt, quality);
  if (process.env.REPLICATE_API_TOKEN) return generateReplicate(prompt);
  throw new Error(
    "No AI image API key found. Set one of:\n" +
    "  OPENAI_API_KEY       (https://platform.openai.com/api-keys — DALL-E 3, ~$0.04/img)\n" +
    "  REPLICATE_API_TOKEN  (https://replicate.com/account/api-tokens — Flux, ~$0.04/img)"
  );
}

/**
 * Auto-mode: tries fetch first, then generate as fallback.
 * @param {Object} opts  { query, prompt, quality }
 */
async function getBackgroundImage({ query, prompt, quality }) {
  if (query) {
    try { return await fetchPhoto(query); }
    catch (e) {
      if (prompt) {
        console.warn(`  [image] Fetch failed (${e.message.split("\n")[0]}), trying generate...`);
      } else {
        throw e;
      }
    }
  }
  if (prompt) return await generatePhoto(prompt, quality);
  throw new Error("Provide a query (fetch) or prompt (generate) or both.");
}

// ─── CLI mode ────────────────────────────────────────────────────────────────
if (require.main === module) {
  const [,, mode, input] = process.argv;
  if (!mode || !input) {
    console.log("Usage:");
    console.log('  node image-utils.js fetch "nfl stadium aerial"');
    console.log('  node image-utils.js generate "aerial view of NFL stadium at night"');
    process.exit(1);
  }

  const run = mode === "fetch"
    ? fetchPhoto(input)
    : mode === "generate"
    ? generatePhoto(input)
    : Promise.reject(new Error(`Unknown mode: ${mode}. Use 'fetch' or 'generate'.`));

  run.then(data => {
    const out = path.join(cacheDir(), "preview.jpg");
    const b64 = data.replace(/^data:[^;]+;base64,/, "");
    fs.writeFileSync(out, Buffer.from(b64, "base64"));
    console.log(`  ✓ Image saved: ${out}  (${Math.round(b64.length * 0.75 / 1024)}KB)`);
  }).catch(e => {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  });
}

module.exports = { fetchPhoto, generatePhoto, getBackgroundImage };
