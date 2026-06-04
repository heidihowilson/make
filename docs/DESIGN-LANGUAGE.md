# Design Language

The design language is just **"sethmakes"** — no separate name. One fixed aesthetic with light and dark modes; brand consistency across all consuming apps is the top driver. This is not a multi-brand theming engine.

## The aesthetic in one paragraph

Soft, warm, and quietly confident. Pure achromatic grays form tonal surfaces with **zero borders** — hierarchy comes from background shifts, not lines. Shapes are **boldly rounded** (12px+ radii, pill buttons). A single **warm hero accent** (coral/orange family) carries the brand; everything else stays out of the way. One **rounded sans-serif** is used everywhere — the geometry of the type agrees with the geometry of the components. Density sits in the comfortable middle: generous around content, efficient inside components. Motion is quietly alive — polished, never noticed.

## Decisions

| Axis | Decision |
|---|---|
| Density | Comfortable middle — generous around content, efficient inside components |
| Shape | Boldly rounded: 12px+ radii, pill buttons |
| Elevation | Background-shifts only, **zero borders**; shadows reserved for true overlays |
| Neutrals | Pure achromatic grays (no warm or cool tint) |
| Accent | One hero accent (warm: coral/orange family) + functional status colors only |
| Typography | One distinctive **rounded sans**, used for everything (UI, headings, body) |
| Modes | **Truly dual**: every semantic token is decided as a light/dark pair from day one — neither mode is "derived" |
| Motion | Quietly alive: 150–250ms eased transitions on hover/focus/open-close, springier on overlays; tokenized as 2–3 durations + easings |

## Consequences & constraints (accepted)

- **Filled form controls.** Zero borders means inputs/selects get tonal filled backgrounds (they'd vanish in light mode otherwise). This is a committed style, not an option.
- **Accent vs warning separation.** The warm hero accent must stay visibly distinct from the functional warning color in both modes: accent leans **coral/orange**, warning leans **yellow-amber**. Verify the pair in both modes whenever either changes.
- **Contrast care.** Tonal-step hierarchy without borders needs deliberate contrast checking (WCAG) — especially adjacent surfaces in dark mode.
- **Flatness risk.** Pure grays + no borders can read flat; the accent, the bold rounding, and spacing rhythm carry all the structure. If a screen looks dead, the fix is hierarchy via tonal steps and type weight — never adding borders.
- **Visual regression runs in both modes** (dual-mode is a testing requirement, not just a design one).

## Token structure

- Two tiers: **primitives** (gray ramp, accent ramp, type scale, spacing scale, radius scale, durations/easings) → **semantic** (`--mk-color-bg`, `--mk-color-surface-1/2/3`, `--mk-color-accent`, `--mk-color-text`, `--mk-radius-control`, `--mk-motion-quick`…).
- Components reference **semantic tokens only**.
- Light/dark are semantic-token remaps (e.g. `[data-theme="dark"]`), never per-component overrides.
- Surface hierarchy is expressed as numbered tonal steps (`surface-1..3`) since borders don't exist.

## Explicitly rejected

- The current tv-tracker aesthetic (DaisyUI "abyss": dark-only, teal/cyan accent, system fonts) — dies with the DaisyUI migration.
- Borders as structure, shadows as primary elevation, cool/warm-tinted neutrals, multi-hue accent families, system font stacks, expressive motion-as-brand.

## Remaining picks (need visual exploration, not discussion)

These get resolved by building candidates into the docs site and looking at them:

1. **The typeface** — shortlist of rounded sans candidates (open-license, variable-weight preferred), rendered side-by-side at UI sizes.
2. **The exact accent** — coral/orange candidates on real components, both modes, checked against warning-amber.
3. **Scale values** — the concrete gray ramp, spacing scale, radius scale, type scale. Proposed in code, judged on screen.
