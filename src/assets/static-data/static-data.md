# assets/static-data/

Static JSON loaded at runtime (option lists, small reference data, runtime `config.json`).

- Treat it like an API: load through a typed service and normalize at the boundary.
- Fetch once and share (single-flight cache); never import large JSON into the bundle.
- No secrets — files here are public.
