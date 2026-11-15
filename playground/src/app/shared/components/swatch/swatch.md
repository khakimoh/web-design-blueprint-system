# playground/src/app/shared/components/swatch/

`Swatch` shows one color token: a filled area using `var(<property>)`, the token name and its
resolved hex value for the active theme.

Inputs: `name`, `property`, `value` (all required) and `compact` for palette grids. Styles use
Blueprint tokens through `@use "abstracts" as ds`.
