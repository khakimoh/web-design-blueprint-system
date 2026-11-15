#!/usr/bin/env node
// Documentation integrity checks:
//  1. every directory has a README.md with real content;
//  2. relative Markdown links resolve to existing files;
//  3. reusable material contains no product/domain-specific vocabulary
//     carried over from the reference audit.
//
// Usage: node scripts/check-docs.mjs

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const IGNORED_DIRS = new Set(['.git', 'node_modules', '.venv', 'dist', '.angular', '.idea', '.vscode', '.claude']);
// The audit is preserved verbatim as a historical reference and is excluded
// from content rules (it documents a specific product by design).
const PRESERVED = ['engineering-audit'];
const MIN_CONTENT_LINES = 3;
const DOMAIN_TERMS = [/\bcurriculum vitae\b/i, /\bkhaki\b/i, /\bscholar\b/i, /\bpublications?\b/i, /\bresumes?\b/i];

const problems = [];
const isPreserved = (rel) => PRESERVED.some((p) => rel === p || rel.startsWith(`${p}/`));

function walkDirs(dir) {
  const dirs = [dir];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory() && !IGNORED_DIRS.has(name)) dirs.push(...walkDirs(path));
  }
  return dirs;
}

const dirs = walkDirs(root);
const markdownFiles = [];

for (const dir of dirs) {
  const rel = relative(root, dir) || '.';
  for (const name of readdirSync(dir)) {
    if (name.endsWith('.md') && statSync(join(dir, name)).isFile()) markdownFiles.push(join(dir, name));
  }
  if (isPreserved(rel)) continue;

  const readme = join(dir, 'README.md');
  if (!existsSync(readme)) {
    problems.push(`${rel}/ has no README.md`);
    continue;
  }
  const contentLines = readFileSync(readme, 'utf8')
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('#'));
  if (contentLines.length < MIN_CONTENT_LINES) {
    problems.push(`${rel}/README.md has fewer than ${MIN_CONTENT_LINES} lines of content`);
  }
}

const LINK = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
for (const file of markdownFiles) {
  const rel = relative(root, file);
  if (isPreserved(rel)) continue;
  const text = readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '');
  for (const [, target] of text.matchAll(LINK)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const path = decodeURIComponent(target.split('#')[0]);
    if (!path) continue;
    if (!existsSync(resolve(dirname(file), path))) problems.push(`${rel}: broken link -> ${target}`);
  }
}

const TEXT_EXT = /\.(md|scss|ts|html|json|yaml|yml|mjs)$/;
function walkFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return IGNORED_DIRS.has(name) ? [] : walkFiles(path);
    return TEXT_EXT.test(name) ? [path] : [];
  });
}
for (const file of walkFiles(root)) {
  const rel = relative(root, file);
  if (isPreserved(rel) || rel === 'scripts/check-docs.mjs' || rel === 'package-lock.json') continue;
  const text = readFileSync(file, 'utf8');
  for (const term of DOMAIN_TERMS) {
    if (term.test(text)) problems.push(`${rel}: contains domain-specific term ${term}`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} documentation problem(s):`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
console.log(`✓ ${dirs.length} directories, ${markdownFiles.length} Markdown files checked`);
