# shared/components/card/

**No component here — on purpose.** Use Bootstrap's `.card` markup directly; its look comes
from component tokens (`card` in `src/styles/tokens/_components.scss`).

Create a card *component* only when a composition repeats in two or more features (e.g. a
media card with consistent image ratio, title, meta and actions). Then: generic inputs
(`title`, `meta`), content projection for actions, no domain words, tokens only.

Rules for clickable cards: one primary link (stretched-link pattern), no nested interactive
elements. See [components.md](../../../../../docs/design-system/components.md#3-specifications).
