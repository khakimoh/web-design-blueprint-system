# shared/directives/

Attribute directives that add reusable behaviour to existing elements (autofocus on first
render, click-outside, auto-resize textarea, intersection observer hooks).

Rules: `host: {}` metadata instead of `@HostListener`/`@HostBinding`; signal inputs;
selector `[app<Name>]`; no domain knowledge. Generate with
`ng generate directive shared/directives/<name>`.
