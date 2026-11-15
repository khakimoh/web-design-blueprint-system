# assets/images/

Images used by the interface (illustrations, placeholders, brand imagery).

- Prefer SVG for illustrations and logos; AVIF/WebP with fallbacks for photos.
- Always provide intrinsic dimensions (`width`/`height` or `NgOptimizedImage` with `ngSrc`) to avoid layout shift.
- Meaningful images need `alt` text; decorative ones `alt=""`.
- File names in kebab-case describing content, not placement (`empty-inbox.svg`, not `image2.svg`).
