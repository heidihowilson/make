# @sethmakes/components

Lit + TypeScript custom elements (`<mk-*>`) for the **sethmakes** design language —
the thin layer reserved for widgets whose **behavior demands JS**. Everything that's
just styled native HTML lives in [`@sethmakes/css`](../css) instead.

## Status: intentionally empty

This package ships **no components yet** and is marked `"private": true`. A component
is added only when a real consuming project needs behavior that CSS can't deliver — we
don't speculate. When the first one ships, this package leaves private, joins the
public npm releases, and emits a custom-elements manifest.

So: if you're wiring up a consumer today (Remix v3, Astro, anything), you need
`@sethmakes/tokens` + `@sethmakes/css` and nothing from here. A styled combobox,
a date picker, or a toast controller would land here **if** a project hits the wall —
e.g. eat's native `<datalist>` typeahead is fine today; a cross-browser styled
combobox is the kind of thing that would justify a first element.

## When something does ship

- **Framework-neutral.** Lit custom elements, no React/Svelte/Remix imports. They
  drop into any framework that renders HTML.
- **SSR is a feature.** Elements must render via Declarative Shadow DOM
  (`@lit-labs/ssr`) and degrade sanely with zero JS.
- **Semantic tokens only.** Shadow DOM styles read `--mk-*` semantic tokens from
  [`@sethmakes/tokens`](../tokens) (a dependency) — never primitives, never raw values.

## Versioning

Lockstep with [`@sethmakes/tokens`](../tokens) and [`@sethmakes/css`](../css).
Pre-1.0: `0.x`, minor = breaking.
