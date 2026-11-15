# assets/icons/

SVG icons for the project's single icon set (chosen in the architecture proposal).

- Use `fill`/`stroke: currentColor` so icons inherit text color and theme.
- Sizes from `icon-size()` tokens (16/20/24 px typical).
- Decorative icons get `aria-hidden="true"`; icon-only buttons need an accessible name.
- Mark directional icons (arrows, chevrons) so they can be mirrored in RTL.
