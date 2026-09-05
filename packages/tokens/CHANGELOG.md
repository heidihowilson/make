# @sethmakes/tokens

## 0.4.0

### Minor Changes

- 49bf339: **The phone foundation.** The device edges are tokens now — `--mk-safe-top`,
  `--mk-safe-right`, `--mk-safe-bottom`, `--mk-safe-left` (zero on every screen
  but a phone) and `--mk-thumb-zone` — and the app bar and the telegram read
  them instead of typing `env()` again. `.mk-appbar--bottom` really is
  safe-area padded now; the cheatsheet said so, the CSS did not.

  New: `.mk-btn--xl` (the 56px hero key, in new `--mk-size-mono-lg` caps),
  `.mk-btn--hold` + `.mk-btn__hint` (press and hold: a typewriter hint line and
  a three-frame stepped fill on `:active` / `[data-holding]`, clocked by the new
  `--mk-dur-hold` — the one gesture the motion doctrine lets move while it
  happens), `.mk-btn__mark` (+ `--lit`), `.mk-stamp` (+ `--danger`, the
  rubber-stamp verdict, positioned by its parent), `.mk-toast--top`,
  `.mk-empty--strip`, `.mk-kicker--wire`.

  The hold fill reads as a fill, on every plate: the STOP-red key fills with
  ink rather than falling through to the paper default (a paper label on a
  paper fill, 1.17:1, for the whole hold), and the fill's leading edge is a
  printed 2px rule in `currentColor` rather than a tonal step — the boundary is
  the information, and paper on paper measured 1.27:1. `.mk-btn--hold` also
  switches off text selection, the callout menu and the tap flash, so the OS
  long press stops cancelling the gesture. `.mk-btn__mark--lit` is scoped to
  `.mk-btn--primary`: ochre clears the bar on the ink plate (4.52:1) and on no
  paper plate (2.08–2.64:1).

  `.mk-stage` carries `--mk-safe-left` / `--mk-safe-right`, so the sheet stops
  printing under a rounded corner in landscape, and the telegram now ADDS its
  28px to the inset instead of `max()`-ing against it — the inset is the
  origin, the 28px is the gap.

  Breaking: `.mk-btn--ghost` no longer sets `min-height: 0`. A ghost key keeps
  the 44px target every other key guarantees, so ghost keys are taller and their
  hairline sits lower. The toast is centred with `translate` instead of
  `transform`, so an entrance class composes with it — consumers that overrode
  the toast's `transform` must move to `translate`.

### Patch Changes

- 0ad6db1: **Structural batch: the medallion, the bottom sheet, the ticket and the pager.**
  New `.mk-medallion` — ink ring, paper mat, hairline rim, typewriter
  `__initials`; five rungs (30/38/60/78/92) or your own `--mk-medallion-size`
  (yours alone — nothing in the library writes it, so it wins over the ladder and
  composes with the bands);
  `--now` (an ink band of twelve flat paper lamps), `--soon` / `--later` status
  bands that step the cameo down a rung, and the rationed `--chase`. New
  `.mk-dialog--sheet` + `.mk-dialog__body` — the phone's bottom sheet, the second
  sanctioned fixed element, bounded in the CSS at the 740px reflow breakpoint so
  a desktop consumer keeps the centred playbill; the look and the placement only,
  the gesture engine stays in the consumer. New `.mk-alert__actions` — the in-flow confirm, because
  a modal never spawns a modal. New `.mk-choice--ticket` with `__title` / `__note`,
  and `.mk-pager` with `__prev` / `__next` / `__label` / `__dots` / `__dot`.
  New tokens: `--mk-color-state-soon` / `--mk-color-state-later` (state inks —
  bands only, never type), `--mk-callboard-green`, `--mk-size-medallion-*`, the
  medallion band geometry, and `--mk-safe-bottom`. The overlay policy VISION
  promised is now written: `docs/INTERACTION.md`. DESIGN-LANGUAGE carries a
  bounded amendment relaxing "one accent per view" to "one accent plus a closed
  two-value state-ink set".

## 0.3.0

### Minor Changes

- d52da12: **Limelight is retired — three faces, not four.** With Rye and Special Elite
  on the page, a third display face read as noise. Department headings, panel
  titles, dialog titles, empty-state titles and fallback initials now set in
  Special Elite at display sizes. Breaking: `--mk-font-marquee` and the
  Tailwind `font-marquee` utility are removed (use `--mk-font-typewriter` /
  `font-typewriter`), and the Limelight woff2 no longer ships.

### Patch Changes

- bb75494: Sepia WCAG pass (closes the open contrast item): muted TEXT now uses a new
  darker `--mk-faded-ink` (#685d45, ≥4.5:1 on sheet and inset) while raw faded
  `#8f8066` stays for line-work (ghost rules, dashed slots); link ink deepens
  `#8a5a1f` → `#7a4e15` to clear 4.5:1; links in running text (`p`, `li`,
  `figcaption`, `blockquote`) carry a printed underline so they never rely on
  colour alone.

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

## 0.1.6

### Patch Changes

- 0662482: Overlay trio: .mk-toast (fixed bottom-center transient, one at a time, status variants), .mk-tabs (segmented row, selection via aria-selected/aria-current/--active), .mk-dialog (native dialog styling + --mk-color-scrim backdrop token). All three promoted from hand-rolled consumer/docs implementations; CSS-only, apps bring the one-line JS.

## 0.1.5

### Patch Changes

- 835f398: Consumer #2 feedback batch: state-driven checked styling on all choice controls (:checked / [aria-checked="true"] / --checked modifier — progressive-enhancement apps render checked state server-side); mk-fonts bin in tokens (blessed font-copy step for static pipelines); .mk-shell/.mk-shell\_\_main (the appbar's document contract, shipped as code); theme-switcher recipe; complete class inventory in the css README + a docs cheatsheet page.

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
