#!/usr/bin/env node
// Validates project configuration files against
// schemas/project-config.schema.json, then applies cross-field rules that
// JSON Schema cannot express.
//
// Usage: node scripts/validate-config.mjs [file ...]
//        (defaults to templates/project.config.yaml)

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import { parse } from 'yaml';

const root = fileURLToPath(new URL('..', import.meta.url));
const schema = JSON.parse(readFileSync(resolve(root, 'schemas/project-config.schema.json'), 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addFormat('date', /^\d{4}-\d{2}-\d{2}$/);
const validate = ajv.compile(schema);

function crossFieldErrors(config) {
  const errors = [];
  const { project = {}, design = {} } = config;
  const locales = project.locales ?? [];

  if (project.default_locale && !locales.includes(project.default_locale)) {
    errors.push(`project.default_locale "${project.default_locale}" is not listed in project.locales`);
  }

  const themes = design.themes ?? {};
  const available = [...(themes.enabled ?? []), ...(themes.custom ?? []).map((t) => t.name)];
  if (themes.default && !available.includes(themes.default)) {
    errors.push(`design.themes.default "${themes.default}" is neither enabled nor a custom theme`);
  }
  for (const custom of themes.custom ?? []) {
    if (!(themes.enabled ?? []).includes(custom.extends)) {
      errors.push(`custom theme "${custom.name}" extends "${custom.extends}", which is not enabled`);
    }
  }

  for (const locale of Object.keys(design.typography?.fonts_by_locale ?? {})) {
    if (!locales.includes(locale)) {
      errors.push(`design.typography.fonts_by_locale.${locale} has no matching entry in project.locales`);
    }
  }

  const ids = (config.customizations?.deviations ?? []).map((d) => d.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) errors.push(`duplicate deviation ids: ${[...new Set(dupes)].join(', ')}`);

  return errors;
}

const files = process.argv.slice(2);
if (files.length === 0) files.push(resolve(root, 'templates/project.config.yaml'));

let failed = false;
for (const file of files) {
  let config;
  try {
    config = parse(readFileSync(file, 'utf8'));
  } catch (error) {
    console.error(`✗ ${file}: cannot read/parse YAML — ${error.message}`);
    failed = true;
    continue;
  }

  const schemaErrors = validate(config)
    ? []
    : validate.errors.map((e) => `${e.instancePath || '(root)'} ${e.message}${e.params?.allowedValues ? ` (${e.params.allowedValues.join(', ')})` : ''}${e.params?.additionalProperty ? ` "${e.params.additionalProperty}"` : ''}`);
  const errors = [...schemaErrors, ...(schemaErrors.length ? [] : crossFieldErrors(config))];

  if (errors.length) {
    failed = true;
    console.error(`✗ ${file}`);
    errors.forEach((e) => console.error(`  - ${e}`));
  } else {
    console.log(`✓ ${file}`);
  }
}

process.exit(failed ? 1 : 0);
