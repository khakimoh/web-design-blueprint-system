# assets/fonts/

Self-hosted web fonts, when the project does not use the system stack.

- Prefer variable fonts in WOFF2, subset to the scripts the project uses (e.g. Latin + Arabic for Persian).
- Declare `@font-face` with `font-display: swap` in `src/styles/project/_fonts.scss`; preload only the primary weight.
- Alternatively install `@fontsource-variable/<family>` packages and import their CSS once.
- Register the families in `src/styles/config/_project.scss` (`$font-family-base`, `$font-families-by-lang`).
- Check the font license permits self-hosting and web embedding.
