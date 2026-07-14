#!/usr/bin/env node
/**
 * Deploy guard: refuse to ship code to Fly that isn't committed AND pushed.
 *
 * Why this exists: on 2026-07-09 production was deployed from a dirty working
 * tree — 50 files of live-site source existed in no commit until they were
 * captured after the fact (850f7d4). Prod must always be reproducible from
 * origin/main.
 *
 * Usage:
 *   node scripts/guard-clean.js               # exit 1 if dirty or unpushed
 *   node scripts/guard-clean.js --allow-dirty # print a loud warning, exit 0
 */

const { execFileSync } = require("node:child_process");

const allowDirty = process.argv.includes("--allow-dirty");

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function fail(lines) {
  console.error("");
  console.error("✖ DEPLOY BLOCKED — prod must be reproducible from origin/main");
  console.error("");
  for (const line of lines) console.error(`  ${line}`);
  console.error("");
  console.error("  Fix: commit your changes and push to origin/main, then re-run:");
  console.error("    npm run deploy");
  console.error("");
  console.error("  Real emergency only: `npm run deploy:dirty` skips this guard.");
  console.error("  Whatever it ships will NOT exist in git history. You have been warned.");
  console.error("");
  process.exit(1);
}

// 1. Working tree must be clean (no modified, staged, or untracked files).
const porcelain = git("status", "--porcelain");
const dirtyFiles = porcelain ? porcelain.split("\n") : [];

// 2. HEAD must be pushed to origin/main. Fetch first so the check is against
//    the real remote, not a stale local ref; tolerate being offline.
let fetchFailed = false;
try {
  execFileSync("git", ["fetch", "origin", "main", "--quiet"], { stdio: "ignore" });
} catch {
  fetchFailed = true;
}

let unpushed = [];
try {
  const out = git("rev-list", "--oneline", "origin/main..HEAD");
  unpushed = out ? out.split("\n") : [];
} catch {
  fail(["Could not compare HEAD against origin/main (is the remote configured?)."]);
}

const problems = [];
if (dirtyFiles.length > 0) {
  problems.push(`Working tree is dirty (${dirtyFiles.length} file${dirtyFiles.length === 1 ? "" : "s"}):`);
  for (const f of dirtyFiles) problems.push(`    ${f}`);
}
if (unpushed.length > 0) {
  if (problems.length > 0) problems.push("");
  problems.push(`HEAD has ${unpushed.length} commit${unpushed.length === 1 ? "" : "s"} not on origin/main:`);
  for (const c of unpushed) problems.push(`    ${c}`);
}

if (problems.length > 0) {
  if (allowDirty) {
    console.error("");
    console.error("⚠⚠⚠  DIRTY DEPLOY OVERRIDE (`npm run deploy:dirty`)  ⚠⚠⚠");
    console.error("");
    for (const line of problems) console.error(`  ${line}`);
    console.error("");
    console.error("  Shipping code that is NOT reproducible from origin/main.");
    console.error("  Commit and push as soon as the fire is out.");
    console.error("");
  } else {
    fail(problems);
  }
} else {
  if (fetchFailed) {
    console.warn("guard-clean: could not fetch origin (offline?) — checked against last-known origin/main.");
  }
  console.log("guard-clean: working tree clean, HEAD pushed to origin/main — OK to deploy.");
}
