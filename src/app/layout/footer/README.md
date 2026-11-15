# layout/footer/

The footer region is rendered by the shell (`<footer class="ds-shell__footer">`). Extract a
`Footer` component here when it has real content: secondary links, legal text, version
information, language switcher.

Rules: never place essential actions only in the footer; use a `<nav aria-label="Footer">`
for link groups; text uses `text-secondary` and remains ≥ 4.5:1.
