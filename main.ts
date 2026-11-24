// Roast Your Own Agent — one original line roasting my own AI agent.
//
// Writes exactly one line (1-200 characters) to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Deterministic: the same line on every run, no input, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RAW_LINE =
  "My agent read the rulebook twice, spawned three subagents to double-check it, then asked me for permission to start.";

// Strip any accidental surrounding whitespace and collapse any internal
// whitespace runs, so the judged text is clean and the 1-200 gate is
// measured on the exact text that lands in entry.txt.
const LINE = RAW_LINE.trim().replace(/\s+/g, " ");

if (LINE.length === 0) {
  throw new Error("line must not be empty");
}
if (LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

// An empty or whitespace-only MAKEFUN_OUTPUT_DIR counts as unset,
// so a stray empty env var cannot make mkdir/write fail on "".
const outDir = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim() || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf-8");
console.log(LINE);
