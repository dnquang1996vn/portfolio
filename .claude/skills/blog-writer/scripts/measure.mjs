#!/usr/bin/env node
// Measures an EN post body against the limits in SKILL.md.
// Usage: node measure.mjs src/content/posts/<slug>/en.md [--lede "The lede text."]
import fs from "node:fs";

const [file, ...rest] = process.argv.slice(2);
if (!file) { console.error("usage: measure.mjs <en.md> [--lede \"...\"]"); process.exit(1); }
const ledeAt = rest.indexOf("--lede");
const lede = ledeAt >= 0 ? rest[ledeAt + 1] ?? "" : "";
const md = fs.readFileSync(file, "utf8");

const codeBlocks = [...md.matchAll(/^```[^\n]*\n([\s\S]*?)^```/gm)].map((m) => m[1].replace(/\n$/, "").split("\n").length);
const tables = (md.match(/^\|\s*-{3}/gm) ?? []).length;
const prose = md
  .replace(/^```[\s\S]*?^```/gm, "")
  .split("\n")
  .filter((l) => !/^#{1,6}\s/.test(l) && !/^\|/.test(l));

// Paragraphs and list items are the units that carry sentences.
const units = prose.join("\n").split(/\n\s*\n|\n(?=\s*(?:[-*]|\d+\.)\s)/)
  .map((u) => u.replace(/^\s*(?:[-*]|\d+\.|>)\s*/gm, "").replace(/[`*_]/g, "").trim())
  .filter(Boolean);
const words = (t) => t.split(/\s+/).filter(Boolean).length;
const sentences = (t) => t.split(/(?<=[.?!])\s+/).filter(Boolean);

const all = [lede, ...units].filter(Boolean);
const total = all.reduce((n, u) => n + words(u), 0);
const sents = all.flatMap(sentences);
const long = sents.filter((s) => words(s) > 20);
const tooLong = sents.filter((s) => words(s) > 30);
const firstH2 = md.search(/^##\s/m);
const secondH2 = md.slice(firstH2 + 1).search(/^##\s/m);
const opening = words(lede) + words(md.slice(firstH2, secondH2 < 0 ? undefined : firstH2 + 1 + secondH2).replace(/^##.*$/m, ""));
const paras = units.filter((u) => !/^\s*(?:[-*]|\d+\.)/.test(u));

const row = (name, value, ok) => console.log(`${ok ? "ok  " : "FIX "} ${name}: ${value}`);
row("words (lede + body)", total, total >= 1500 && total <= 2000);
row("read time", `${Math.max(3, Math.round(total / 200))} min`, true);
row("code blocks", `${codeBlocks.length} (lines: ${codeBlocks.join(", ") || "-"})`, codeBlocks.length >= 1 && codeBlocks.length <= 2 && codeBlocks.every((n) => n <= 12));
row("tables", tables, tables <= 1);
row("sentences over 20 words", `${long.length} of ${sents.length}`, long.length * 5 <= sents.length);
row("sentences over 30 words", tooLong.length, tooLong.length === 0);
row("opening (lede + first section)", `${opening} words`, opening <= 150);
row("lede sentences", sentences(lede).length, !lede || (sentences(lede).length >= 2 && sentences(lede).length <= 3));
const off = paras.filter((p) => sentences(p).length > 4);
row("paragraphs over 4 sentences", off.length, off.length === 0);
for (const s of tooLong) console.log(`     > ${s}`);
