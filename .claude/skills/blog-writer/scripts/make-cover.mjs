#!/usr/bin/env node
/**
 * Render a blog cover PNG (1800x1200) in the style of the existing covers.
 *
 *   node make-cover.mjs --slug <short> --kicker "TOPIC / 07" --footer "one line" \
 *        [--headline "Short serif line."] [--subline "italic second line"] \
 *        [--steps "WRITE THE SPEC|TESTS FIRST|HUMAN REVIEW|SHIP"] [--dropped "ONE GIANT PROMPT|..."]
 *   node make-cover.mjs --slug <short> --svg path/to/inner.svg
 *
 * `--svg` takes a file holding SVG markup *inside* the 1800x1200 canvas (no <svg> wrapper)
 * that may use the classes in templates/cover.html (mono, serif, box, ln, acc, ...).
 * Without `--svg`, a diagram is composed from --headline/--subline/--steps/--dropped and is
 * scaled down when it would run past the 21:9 safe area (y 214..986).
 *
 * Renders with headless Google Chrome (exact web fonts), falling back to rsvg-convert.
 * Output: public/images/cover-<short>.png, relative to the repo root (cwd).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const LEFT = 120;        // left margin of every cover
const BODY_TOP = 360;    // first body line sits below the kicker (y=290)
const BODY_BOTTOM = 920; // keep clear of the footer (y=972)
const ROW = 140;         // vertical rhythm between pill rows
const MAX_X = 1680 - LEFT;

const args = parseArgs(process.argv.slice(2));

if (!args.slug) fail("--slug is required");
if (!args.svg && !args.kicker) fail("--kicker is required unless --svg is given");

const template = readFileSync(join(here, "..", "templates", "cover.html"), "utf8");
const inner = args.svg ? readFileSync(resolve(args.svg), "utf8") : compose(args);
const marker = "<!--INNER-->";
const at = template.lastIndexOf(marker);
if (at === -1) fail("templates/cover.html has no INNER placeholder");
const html = template.slice(0, at) + inner + template.slice(at + marker.length);

const outDir = resolve("public", "images");
if (!existsSync(outDir)) fail(`run from the repo root: ${outDir} does not exist`);
const out = join(outDir, `cover-${args.slug}.png`);

const work = mkdtempSync(join(tmpdir(), "cover-"));
const htmlPath = join(work, "cover.html");
writeFileSync(htmlPath, html);

const chrome = findChrome();
if (chrome) {
  execFileSync(chrome, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--window-size=1800,1200", "--virtual-time-budget=8000",
    `--screenshot=${out}`, `file://${htmlPath}`,
  ], { stdio: ["ignore", "ignore", "ignore"] });
} else {
  const svgPath = join(work, "cover.svg");
  writeFileSync(svgPath, standaloneSvg(template, inner));
  execFileSync("rsvg-convert", ["-w", "1800", "-h", "1200", svgPath, "-o", out], { stdio: "inherit" });
  console.warn("warning: Chrome not found, rendered with rsvg-convert (fonts will differ)");
}

const png = readFileSync(out);
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== 1800 || height !== 1200) fail(`rendered ${width}x${height}, expected 1800x1200`);
console.log(`wrote ${out} (${width}x${height})`);

/* ---------- helpers ---------- */

function parseArgs(list) {
  const out = {};
  for (let i = 0; i < list.length; i += 2) {
    const key = list[i];
    if (!key.startsWith("--")) fail(`unexpected argument ${key}`);
    out[key.slice(2)] = list[i + 1];
  }
  return out;
}

function fail(message) {
  console.error(`make-cover: ${message}`);
  process.exit(1);
}

function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ];
  return candidates.find((p) => p && existsSync(p));
}

function esc(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Pill width for 18px JetBrains Mono with .14em tracking, plus padding. */
function pillWidth(label) {
  return Math.round(label.length * 13.3 + 2 * 40);
}

/** Pills left to right from x=0 (relative), wrapping at the right margin. Returns markup + height. */
function pillRow(labels, top, { struck = false } = {}) {
  const parts = [];
  let x = 0;
  let row = 0;
  labels.forEach((label, i) => {
    const w = pillWidth(label);
    if (x + w > MAX_X && x > 0) { x = 0; row++; }
    const cy = top + 50 + row * ROW;
    parts.push(`<rect x="${x}" y="${cy - 50}" width="${w}" height="100" rx="50" class="box${struck ? " dim" : ""}"/>`);
    parts.push(`<text x="${x + 40}" y="${cy + 7}" class="mono sm${struck ? "" : " ink"}">${esc(label)}</text>`);
    if (struck) parts.push(`<path d="M${x + 26} ${cy} H${x + w - 26}" class="ln acc" stroke-width="3"/>`);
    const last = i === labels.length - 1;
    if (!struck && !last && x + w + 70 + pillWidth(labels[i + 1]) <= MAX_X) {
      const nx = x + w;
      parts.push(`<path d="M${nx} ${cy} H${nx + 56}" class="ln"/>`);
      parts.push(`<path d="M${nx + 48} ${cy - 8} L${nx + 60} ${cy} L${nx + 48} ${cy + 8}" class="ln"/>`);
    }
    x += w + 70;
  });
  return { markup: parts.join("\n    "), height: (row + 1) * ROW - (ROW - 100) };
}

/** Compose kicker + body + footer. Body coordinates are relative and scaled to fit. */
function compose(a) {
  const body = [];
  let y = 0;
  if (a.headline) { y += 44; body.push(`<text x="0" y="${y}" class="serif">${esc(a.headline)}</text>`); y += 16; }
  if (a.subline) { y += 44; body.push(`<text x="0" y="${y}" class="serif i">${esc(a.subline)}</text>`); y += 16; }
  if (body.length) y += 50;
  if (a.steps) {
    const row = pillRow(split(a.steps), y);
    body.push(row.markup);
    y += row.height + 60;
  }
  if (a.dropped) {
    y += 20;
    body.push(`<text x="0" y="${y}" class="mono sm">DROPPED</text>`);
    y += 30;
    const row = pillRow(split(a.dropped), y, { struck: true });
    body.push(row.markup);
    y += row.height;
  }
  const available = BODY_BOTTOM - BODY_TOP;
  const scale = y > available ? available / y : 1;
  if (scale < 1) console.warn(`warning: body scaled to ${scale.toFixed(2)} to fit; shorter labels or fewer rows would look better`);
  // A short body (a single row of pills) sits in the middle of the area instead of hugging the kicker.
  const top = BODY_TOP + Math.max(0, (available - y * scale) / 2 - 40);

  return [
    `<text x="${LEFT}" y="290" class="mono">${esc(a.kicker)}</text>`,
    `<g transform="translate(${LEFT} ${top.toFixed(0)}) scale(${scale.toFixed(4)})">`,
    `    ${body.join("\n    ")}`,
    `</g>`,
    a.footer ? `<text x="${LEFT}" y="972" class="mono sm">${esc(a.footer)}</text>` : "",
  ].filter(Boolean).join("\n  ");
}

function split(list) {
  return list.split("|").map((s) => s.trim()).filter(Boolean);
}

/** Inline the template's <style> into a standalone SVG for the rsvg fallback. */
function standaloneSvg(tpl, innerMarkup) {
  const style = tpl.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
  return `<svg viewBox="0 0 1800 1200" width="1800" height="1200" xmlns="http://www.w3.org/2000/svg">
<style>${style.replace(/^\s*body\{.*$/m, "").replace(/^\s*svg\{.*$/m, "")}</style>
<rect width="1800" height="1200" fill="#1a1b1e"/>
${innerMarkup}
</svg>`;
}
