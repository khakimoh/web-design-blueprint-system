#!/usr/bin/env node
// Compiles the SCSS foundation and enforces the SCSS standards that a
// compiler cannot: no @import, no !important, raw colors only in the
// designated token files. Fails on any Sass warning raised by this repository
// (Bootstrap's own deprecation warnings are dependency noise and are quieted).
//
// Usage: node scripts/build-styles.mjs
// Output: dist/styles/*.css (git-ignored)

import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const root = fileURLToPath(new URL('..', import.meta.url));
const stylesDir = join(root, 'src/styles');
const outDir = join(root, 'dist/styles');
const appDir = join(root, 'src/app');

const failures = [];

// 1. Static rules -------------------------------------------------------------
const RAW_COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab)\((?!\s*(?:var\(|#\{))/;
const RAW_COLOR_ALLOWED = ['config/_project.scss', 'tokens/_palette.scss', 'abstracts/_color.scss'];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const scssFiles = [...walk(stylesDir), ...walk(appDir)].filter((f) => f.endsWith('.scss'));
for (const file of scssFiles) {
  const rel = relative(stylesDir, file);
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      const code = line.replace(/\/\/.*$/, '');
      const where = `${relative(root, file)}:${i + 1}`;
      if (/^\s*@import\b/.test(code)) failures.push(`${where} uses @import (use @use/@forward)`);
      if (/!important/.test(code)) failures.push(`${where} uses !important`);
      if (RAW_COLOR.test(code) && !RAW_COLOR_ALLOWED.includes(rel)) {
        failures.push(`${where} contains a raw color value (use tokens)`);
      }
    });
}

// 2. Compile entries ------------------------------------------------------------
const entries = [
  { file: 'main.scss', out: 'main.css' },
  { file: 'main-standalone.scss', out: 'main-standalone.css' },
];

// Fixture: the public Sass API must be usable from a component stylesheet
// and must not emit CSS by itself.
const apiFixture = '@use "abstracts" as ds;';
const componentFixture = `
@use "abstracts" as ds;
.fixture {
  padding: ds.space(4);
  border-radius: ds.radius("control");
  color: ds.color-token("text-secondary");
  box-shadow: ds.shadow("card");
  z-index: ds.z("dropdown");
  @include ds.type-role("label");
  @include ds.media-up("md") { padding: ds.space(6); }
  &:focus-visible { @include ds.focus-ring; }
}`;

const logger = {
  warn(message, { deprecation, span }) {
    const url = span?.url?.href ?? '';
    if (url.includes('/node_modules/')) return; // dependency noise
    const where = span ? `${relative(root, fileURLToPath(span.url))}:${span.start.line + 1}` : '(unknown)';
    failures.push(`${deprecation ? 'Deprecation' : 'Warning'} at ${where}: ${message}`);
  },
};

const options = {
  loadPaths: [stylesDir, join(root, 'node_modules')],
  quietDeps: true,
  logger,
  style: 'expanded',
};

mkdirSync(outDir, { recursive: true });

for (const { file, out } of entries) {
  try {
    const result = sass.compile(join(stylesDir, file), options);
    writeFileSync(join(outDir, out), result.css);
    console.log(`✓ ${file} -> dist/styles/${out} (${(result.css.length / 1024).toFixed(1)} KiB)`);
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
  }
}

try {
  const api = sass.compileString(apiFixture, options);
  if (api.css.trim() !== '') failures.push('abstracts/ emits CSS; it must stay output-free');
  else console.log('✓ abstracts/ emits no CSS');
  sass.compileString(componentFixture, options);
  console.log('✓ component stylesheet fixture compiles against the public API');
} catch (error) {
  failures.push(`API fixture: ${error.message}`);
}

// Component stylesheets of the Angular golden examples compile in isolation,
// exactly as the Angular CLI compiles them (one compilation unit each).
const componentStyles = walk(appDir).filter((f) => f.endsWith('.scss'));
for (const file of componentStyles) {
  try {
    sass.compile(file, options);
  } catch (error) {
    failures.push(`${relative(root, file)}: ${error.message}`);
  }
}
console.log(`✓ ${componentStyles.length} component stylesheet(s) under src/app compiled`);

if (failures.length) {
  console.error(`\n✗ ${failures.length} problem(s):`);
  failures.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}
console.log('\nStyles OK');
