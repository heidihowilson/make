---
"@sethmakes/tokens": minor
"@sethmakes/css": minor
---

**The design language is now Vaudeville** (Gholson's Follies) — the terminal/moss
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
