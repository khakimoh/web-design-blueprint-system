# Developing the Blueprint

How to maintain, extend and release this repository.

## Tooling

```bash
npm install          # sass, bootstrap, ajv, yaml — dev only
npm run validate     # build:styles + validate:config + check:docs
```

See [scripts/scripts.md](../../scripts/scripts.md) for what each check enforces. Formatting
follows [.editorconfig](../../.editorconfig) (UTF-8, LF, 2 spaces, final newline).

## Versioning policy (Semantic Versioning)

The blueprint is versioned as a whole with git tags `vMAJOR.MINOR.PATCH`; `package.json`
`version` and [CHANGELOG.md](../../CHANGELOG.md) match the tag.

| Change | Version | Examples |
| --- | --- | --- |
| **Patch** | `x.y.Z` | Wording fixes, broken links, bug fixes in SCSS that do not change generated values intentionally, script fixes |
| **Minor** | `x.Y.0` | New tokens, new optional config fields, new golden examples, new workflows, new technology profiles, new utilities |
| **Major** | `X.0.0` | Renamed/removed tokens or CSS classes, changed scale values, new required schema fields or `schema_version` bump, a different default technology (e.g. Bootstrap 6), changed directory conventions |

Breaking changes are listed in the CHANGELOG under **Breaking** with a migration section
(what to rename, which values changed, how to re-validate).

## Backward compatibility

- Deprecate before removing: keep the old token/class/field for one minor release, mark it `@deprecated` in a comment and in the CHANGELOG, then remove it in the next major.
- Projects pin a version, so a new release never changes an existing project until it chooses to upgrade.
- When upgrading a project: read the CHANGELOG between versions, re-copy `src/styles/` except `config/_project.scss` and `project/`, re-validate `project.config.yaml`, rebuild, review deviations.

## Adding to the blueprint

- **New engineering standard:** confirm it is technology-independent (else it belongs in a profile); write it in `docs/principles/`; add a review checklist item; ADR if it changes existing practice.
- **New token / scale value:** see [design-tokens.md §6](../design-system/design-tokens.md#6-extending-the-token-system-blueprint-maintainers).
- **New technology profile:** see [technologies/technologies.md](../technologies/technologies.md#adding-a-new-profile-eg-react-or-vue).
- **New golden example:** minimal, generic (no domain terms), complete enough to show the convention; placed in the directory it exemplifies; listed in the profile index file; component styles compile via `npm run build:styles`.
- **New directory:** add an index file named after the folder (`<folder>/<folder>.md`) that states its responsibility (enforced).

## Promoting a project pattern

Project feedback is the main source of improvements.

1. In the project, the pattern is recorded as a deviation or noted as a promotion candidate.
2. Open an issue/PR here describing the problem it solves, evidence from ≥ 2 projects (or a strong generic case), and the proposed generic form.
3. Remove all project vocabulary; express values through tokens.
4. Add docs, example, CHANGELOG entry; choose the version bump per the table above.
5. Projects adopt it on their next blueprint upgrade and delete the deviation.

## Commit conventions

Conventional Commits: `feat(design-system): add info palette`, `fix(scss): …`,
`docs(workflows): …`, `chore(tooling): …`. Breaking changes use `!` and a `BREAKING CHANGE:` footer.
