# @sethmakes/tokens

## 0.1.4

### Patch Changes

- 3c81439: Second-consumer feedback (eat migration): ship the Tailwind v4 @theme bridge (@sethmakes/tokens/tailwind.css — both consumers had hand-rolled it), add .mk-btn--warning (caution-filled, mirrors danger), document the short-page bottom-appbar layout requirement.

## 0.1.3

### Patch Changes

- 36cf4be: Icons joins the design-system lockstep group — the brand icon vocabulary is part of the design language, so all packages now share one system version. This release exists to align the numbers.

## 0.1.2

### Patch Changes

- 2d0c979: Add icon size tokens (`--mk-icon-sm/md/lg`, sized to sit beside mono text)
  and a `.mk-icon` helper (with `--sm`/`--lg` modifiers) that sizes and
  baseline-aligns mask-style Iconify icons next to mono text.

## 0.1.1

### Patch Changes

- 9c77e0c: Consumer #1 feedback batch: elevation layer tokens (--mk-layer-chrome/-overlay/-toast), .mk-appbar sticky translucent chrome (+ --bottom), .mk-btn--active and --xs, .mk-badge--sm, .mk-link-reset utility (mk.utilities layer now populated), mk-thumb\_\_fallback initial scales to its container via container queries.

## 0.1.0

### Minor Changes

- ccda5a8: Initial release of sethmakes-ui: design tokens (terminal bones, calm surface — dual light/dark via light-dark(), self-hosted JetBrains Mono, WCAG-audited) and the CSS component set (typography/prose, buttons, badges, forms, cards, tables, dividers, disclosure, alerts, spinners, progress, empty states, media thumbs).
