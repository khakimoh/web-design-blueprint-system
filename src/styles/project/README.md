# styles/project/

**Project-owned** CSS, loaded last by both entry files. In the blueprint it is intentionally
empty apart from [_index.scss](_index.scss).

Typical contents in a project: `_fonts.scss` (`@font-face` for self-hosted fonts) and global
styles for project-specific patterns, each `@use`d from `_index.scss`.

Rules: `@use "../abstracts" as ds` and tokens only; project prefix for classes (not `ds-`);
never override Bootstrap or `ds-` classes here — record a deviation instead. Upgrading the
blueprint never touches this folder or `config/_project.scss`.
