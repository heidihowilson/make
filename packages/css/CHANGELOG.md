# @sethmakes/css

## 0.2.0

### Minor Changes

- e51b6c9: **The design language is now Vaudeville** (Gholson's Follies) — the terminal/moss
  language is retired wholesale. Breaking (pre-1.0 minor).

  **Tokens:**

  - Single mode. The `light-dark()` machinery, `color-scheme` dual setup and
    `[data-theme]` overrides are gone; the sheet-on-stage is the mode.
  - New palette: sepia duotone (ink `#2a241b` on papers `#e6d9ba`/`#ede2c4`/`#d8c9a4`,
    stage `#26211a`) with ochre `#c47a2e` as the one rationed accent. Removed:
    `--mk-gray-*`, `--mk-moss-*`, status ramps, every `-subtle` pair,
    `--mk-color-bg/surface-1..3/field/text-faint/accent-hover/accent-contrast/…`.
    Added: `--mk-color-stage/sheet/inset/plate/ink-surface`,
    `--mk-color-heading/text/text-secondary/text-muted/text-on-ink`,
    `--mk-color-rule/-hair/-ghost`, `--mk-color-link/-hover`, composite
    `--mk-rule-*` and `--mk-shadow-*` tokens.
  - Four faces replace JetBrains Mono: Rye (display), Limelight (marquee),
    Special Elite (typewriter), Sorts Mill Goudy (body + italic) — self-hosted
    woff2, all weight 400. `--mk-weight-*` removed; loudness is face/size/tracking.
  - Type/space scales are the source page's literal print rhythm
    (`--mk-size-*`, `--mk-track-*`, `--mk-space-hair…5xl`); the old
    `--mk-text-*`/`--mk-space-1..8` scales are gone.
  - Motion tokens are stepped: `--mk-frame`, `--mk-dur-beat/enter/reveal`,
    `--mk-steps-3/5/8`, `--mk-ease-key`; `--mk-motion-*`/`--mk-ease-out/spring`
    removed.
  - Tailwind bridge remapped: `bg-sheet`, `bg-stage`, `text-heading`,
    `border-rule`, `font-typewriter`, etc.

  **CSS (same class names, new language):**

  - Buttons are struck typewriter keys (plate + 2px ink rule + letterpress
    offset; press translates into the shadow). `--warning` is the ochre plate;
    `--active` is a held-down key.
  - Cards are panels (2px ink rule on inset paper; `--sunken` = quiet hairline).
    Dividers are printed rules with fixed meanings (+ new `--double`,
    `--double-thin`, `--thick`, `--dash`, `--accent` variants).
  - Tables are the ledger; tabs are departments on a rule; alerts are notices
    from the management; toasts are telegram slips; the spinner is typewriter
    typing dots; skeletons are dashed "not printed yet" slots (no shimmer);
    media thumbs are framed art (rule + mat + offset).
  - `.mk-appbar` is no longer sticky or translucent — nothing in the language
    is fixed except the toast.
  - New: `.mk-stage`/`.mk-sheet` page pattern, `.mk-kicker`, and the stepped
    motion utilities (`.mk-iris-in`, `.mk-curtain-in`, `.mk-settle-in`,
    `.mk-drop-in`, `.mk-stamp-in`, `.mk-typeline`, `.mk-flicker`,
    `.mk-bill-order`).

  Migration: the changelog above is the token map; class markup survives, custom
  CSS referencing removed tokens must remap. There is no dark mode to configure.

### Patch Changes

- Updated dependencies [e51b6c9]
  - @sethmakes/tokens@0.2.0

## 0.1.6

### Patch Changes

- 0662482: Overlay trio: .mk-toast (fixed bottom-center transient, one at a time, status variants), .mk-tabs (segmented row, selection via aria-selected/aria-current/--active), .mk-dialog (native dialog styling + --mk-color-scrim backdrop token). All three promoted from hand-rolled consumer/docs implementations; CSS-only, apps bring the one-line JS.
- Updated dependencies [0662482]
  - @sethmakes/tokens@0.1.6

## 0.1.5

### Patch Changes

- 835f398: Consumer #2 feedback batch: state-driven checked styling on all choice controls (:checked / [aria-checked="true"] / --checked modifier — progressive-enhancement apps render checked state server-side); mk-fonts bin in tokens (blessed font-copy step for static pipelines); .mk-shell/.mk-shell\_\_main (the appbar's document contract, shipped as code); theme-switcher recipe; complete class inventory in the css README + a docs cheatsheet page.
- Updated dependencies [835f398]
  - @sethmakes/tokens@0.1.5

## 0.1.4

### Patch Changes

- 3c81439: Second-consumer feedback (eat migration): ship the Tailwind v4 @theme bridge (@sethmakes/tokens/tailwind.css — both consumers had hand-rolled it), add .mk-btn--warning (caution-filled, mirrors danger), document the short-page bottom-appbar layout requirement.
- Updated dependencies [3c81439]
  - @sethmakes/tokens@0.1.4

## 0.1.3

### Patch Changes

- 36cf4be: Icons joins the design-system lockstep group — the brand icon vocabulary is part of the design language, so all packages now share one system version. This release exists to align the numbers.
- Updated dependencies [36cf4be]
  - @sethmakes/tokens@0.1.3

## 0.1.2

### Patch Changes

- 2d0c979: Add icon size tokens (`--mk-icon-sm/md/lg`, sized to sit beside mono text)
  and a `.mk-icon` helper (with `--sm`/`--lg` modifiers) that sizes and
  baseline-aligns mask-style Iconify icons next to mono text.
- Updated dependencies [2d0c979]
  - @sethmakes/tokens@0.1.2

## 0.1.1

### Patch Changes

- 9c77e0c: Consumer #1 feedback batch: elevation layer tokens (--mk-layer-chrome/-overlay/-toast), .mk-appbar sticky translucent chrome (+ --bottom), .mk-btn--active and --xs, .mk-badge--sm, .mk-link-reset utility (mk.utilities layer now populated), mk-thumb\_\_fallback initial scales to its container via container queries.
- Updated dependencies [9c77e0c]
  - @sethmakes/tokens@0.1.1

## 0.1.0

### Minor Changes

- ccda5a8: Initial release of sethmakes-ui: design tokens (terminal bones, calm surface — dual light/dark via light-dark(), self-hosted JetBrains Mono, WCAG-audited) and the CSS component set (typography/prose, buttons, badges, forms, cards, tables, dividers, disclosure, alerts, spinners, progress, empty states, media thumbs).

### Patch Changes

- Updated dependencies [ccda5a8]
  - @sethmakes/tokens@0.1.0
