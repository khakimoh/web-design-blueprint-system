# schemas/

Machine-readable contracts used to validate project-specific configuration.

| File | Validates | Run |
| --- | --- | --- |
| [project-config.schema.json](project-config.schema.json) | `project.config.yaml` files (JSON Schema draft 2020-12) | `npm run validate:config -- <file>` |

## How validation works

1. [`scripts/validate-config.mjs`](../scripts/validate-config.mjs) parses the YAML and
   validates it against the schema with Ajv (strict mode, all errors reported).
2. It then applies cross-field rules JSON Schema cannot express: the default
   locale must be listed, the default theme must exist, custom themes must
   extend an enabled theme, per-locale fonts need a matching locale, and
   deviation ids must be unique.

Editors that support the `yaml-language-server` comment at the top of the
template get completion and inline validation from the same schema.

## Changing the schema

- Additive, optional fields → minor blueprint release.
- Renamed/removed fields or new required fields → bump `schema_version`
  (`const` in the schema), release a new major version and describe the
  migration in [CHANGELOG.md](../CHANGELOG.md).
- Always update [templates/project.config.yaml](../templates/project.config.yaml) and
  [docs/configuration/README.md](../docs/configuration/README.md) in the same change.
