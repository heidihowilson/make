# Design Language

The design language is just **"sethmakes"** — no separate name. One fixed aesthetic with light and dark modes; brand consistency across all consuming apps is the top driver. This is not a multi-brand theming engine.

## The aesthetic in one paragraph

**Terminal bones, calm surface.** Monospace type everywhere, zero corner radius, and flat tonal surfaces — pure achromatic grays with **zero borders**; hierarchy comes from background shifts, not lines. One muted **moss green** hero accent fills primary actions and marks links and focus; functional status colors exist only to mean things. Density sits in the comfortable middle. Motion is quietly alive — polished, never noticed. Minimalist grayscale with a machine voice, not a costume.

## How it was decided

A first axis-by-axis questionnaire pass produced a rounded/warm/playful gestalt that was **rejected on sight** (too playful, 2010s-Bootstrap). Lesson recorded: **aesthetics are judged as gestalts, not axes** — decide from complete rendered directions (a live explorer page, since retired — resurrect the pattern from git history at `apps/docs/src/pages/directions.astro` if a future re-theming needs it), not abstract questions. The Terminal direction won; the accent was tuned from rendered shade/role candidates to **Moss + Hero**.

## Decisions

| Axis | Decision |
|---|---|
| Density | Comfortable middle — generous around content, efficient inside components |
| Shape | **Terminal-sharp: 0px radius everywhere.** Radius tokens remain as slots; the value is the aesthetic |
| Elevation | Background-shifts only, **zero borders**; shadows reserved for true overlays |
| Neutrals | Pure achromatic grays (chroma 0) |
| Accent | **Moss** — muted green, oklch hue 150 at low chroma (~0.08), in the **hero role**: fills primary buttons, marks links/badges/focus/progress |
| Typography | **Monospace everywhere: JetBrains Mono**, falling back through the system mono stack (`--mk-font-body`) |
| Modes | **Truly dual**: every semantic color token is a light/dark pair, written as one `light-dark()` declaration |
| Motion | Quietly alive: 150–320ms eased transitions; tokenized durations + easings |

## Consequences & constraints (accepted)

- **Filled form controls.** Zero borders means inputs/selects get tonal filled backgrounds. Committed style, not an option.
- **Accent vs success separation.** Moss (hue 150, chroma ~0.08) and status-success (hue 155, chroma ~0.15) share the green family; they stay distinguishable by chroma — success is roughly twice as saturated. Verify the pair in both modes whenever either changes.
- **Monospace costs width.** Mono runs ~10–15% wider than a UI sans at the same size; copy and labels must stay terse. This is a feature (terseness is the voice), but watch truncation in narrow layouts.
- **Webfont delivery.** JetBrains Mono must eventually be self-hosted by the docs site and documented for consumers (with the system-mono fallback as the no-font path). Currently loaded from Google Fonts in the docs app only.
- **Contrast care.** Tonal-step hierarchy without borders needs deliberate WCAG checking — especially adjacent surfaces in dark mode, and moss-on-gray text colors.
- **Flatness risk.** If a screen looks dead, the fix is hierarchy via tonal steps and type weight — never adding borders or radius.
- **Visual regression runs in both modes.**

## Token structure

- Two tiers: **primitives** (gray ramp, moss ramp, status hues, type/spacing/radius scales, durations/easings) → **semantic** (`--mk-color-bg`, `--mk-color-surface-1/2/3`, `--mk-color-field`, `--mk-color-accent`, `--mk-color-text`, `--mk-radius-control`, `--mk-motion-quick`…).
- Components reference **semantic tokens only**.
- Light/dark via `color-scheme` + `light-dark()`; `[data-theme]` overrides, system preference by default. Never per-component mode overrides.
- Surface hierarchy is numbered tonal steps (`surface-1..3`) since borders don't exist.

## Explicitly rejected

- **Round 1 gestalt (2026-06-04):** boldly rounded (pills), rounded sans, warm coral hero accent — too playful, 2010s-Bootstrap.
- The old tv-tracker aesthetic (DaisyUI "abyss": dark-only, teal/cyan, system fonts).
- Borders as structure; shadows as primary elevation; tinted neutrals; expressive motion-as-brand.
- Louder greens (phosphor/matrix/acid) and non-green accents (amber, cyan) — rendered and declined in favor of moss.
- **Outline buttons** (issue #13, consumer #1 request): an outline is a border, and zero-borders is the language's spine. The tonal default button IS the official secondary action.

## Sanctioned exceptions

- **Chrome translucency**: `.mk-appbar`'s translucent surface + backdrop blur is the one allowed translucency — app chrome floats over scrolling content; everything else is opaque tonal.
- **Elevation is tokenized**: `--mk-layer-chrome/-overlay/-toast`. Nothing types a raw z-index; what may stack on what is policy, not improvisation.

## Remaining open

- Type/spacing scale values are provisional-but-working; revisit only if real screens fight them.

## Resolved since (2026-06-04 buildout)

- **JetBrains Mono self-hosted** in `@sethmakes/tokens` (`fonts.css` + woff2, latin subset, 400/600/700; 600 = SemiBold deliberately, matching `--mk-weight-medium`). Consumers import `@sethmakes/tokens/fonts.css` or live on the system-mono fallback.
- **WCAG contrast audited** in both modes — see [CONTRAST.md](./CONTRAST.md) and `scripts/contrast-audit.mjs`. Status hues were darkened on the light side to clear 4.5:1; an inset affordance ring (box-shadow, not border) was added to unchecked checkboxes/radios for 1.4.11 non-text contrast.
