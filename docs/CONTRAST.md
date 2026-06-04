# WCAG Contrast Audit

Concrete WCAG 2.1 contrast audit of the `@sethmakes/tokens` semantic color
pairs, both light and dark modes. Closes the "concrete WCAG contrast audit of
the moss/gray pairs" open item in `DESIGN-LANGUAGE.md`.

## Method

`scripts/contrast-audit.mjs` hardcodes the semantic color pairs from
`packages/tokens/index.css`, resolves both the light and dark side of each
`light-dark()` declaration through the primitive ramps, converts
`oklch -> linear sRGB -> sRGB`, and computes WCAG 2.1 relative-luminance
contrast ratios. No external dependency — the oklch math and the WCAG formula
are implemented in the script. Run it with:

```
node scripts/contrast-audit.mjs        # table + pass/fail, exits 1 on any fail
node scripts/contrast-audit.mjs --hex  # also dump resolved hex per token
```

Requirement applied: **4.5:1** (WCAG AA normal text) for every text-bearing
pair. `text-faint` is decorative/placeholder, so it is reported as a note, not
a pass/fail. `field` vs `surface-1` is a non-WCAG distinguishability check
(can a filled input be told apart from the surface behind it) and is reported
as a note.

## Results (after fixes — all required pairs PASS)

### Light mode

| fg | bg | ratio | req | result |
|---|---|---|---|---|
| text | bg | 16.24:1 | 4.5 | PASS |
| text | surface-1 | 17.72:1 | 4.5 | PASS |
| text | surface-2 | 15.08:1 | 4.5 | PASS |
| text | surface-3 | 13.56:1 | 4.5 | PASS |
| text-muted | bg | 5.74:1 | 4.5 | PASS |
| text-muted | surface-1 | 6.26:1 | 4.5 | PASS |
| text-muted | surface-2 | 5.33:1 | 4.5 | PASS |
| text-muted | surface-3 | 4.79:1 | 4.5 | PASS |
| text-faint | bg | 2.19:1 | — | note (decorative) |
| accent-contrast | accent | 6.03:1 | 4.5 | PASS |
| accent | bg | 5.77:1 | 4.5 | PASS |
| accent | surface-1 | 6.29:1 | 4.5 | PASS |
| on-accent-subtle | accent-subtle | 8.24:1 | 4.5 | PASS |
| success | success-subtle | 4.65:1 | 4.5 | PASS |
| success | bg | 4.98:1 | 4.5 | PASS |
| warning | warning-subtle | 4.72:1 | 4.5 | PASS |
| warning | bg | 5.07:1 | 4.5 | PASS |
| danger | danger-subtle | 4.90:1 | 4.5 | PASS |
| danger | bg | 5.51:1 | 4.5 | PASS |

### Dark mode

| fg | bg | ratio | req | result |
|---|---|---|---|---|
| text | bg | 17.80:1 | 4.5 | PASS |
| text | surface-1 | 16.24:1 | 4.5 | PASS |
| text | surface-2 | 14.67:1 | 4.5 | PASS |
| text | surface-3 | 12.50:1 | 4.5 | PASS |
| text-muted | bg | 8.12:1 | 4.5 | PASS |
| text-muted | surface-1 | 7.41:1 | 4.5 | PASS |
| text-muted | surface-2 | 6.69:1 | 4.5 | PASS |
| text-muted | surface-3 | 5.70:1 | 4.5 | PASS |
| text-faint | bg | 3.10:1 | — | note (decorative) |
| accent-contrast | accent | 9.49:1 | 4.5 | PASS |
| accent | bg | 9.08:1 | 4.5 | PASS |
| accent | surface-1 | 8.29:1 | 4.5 | PASS |
| on-accent-subtle | accent-subtle | 9.96:1 | 4.5 | PASS |
| success | success-subtle | 5.67:1 | 4.5 | PASS |
| success | bg | 8.30:1 | 4.5 | PASS |
| warning | warning-subtle | 7.24:1 | 4.5 | PASS |
| warning | bg | 11.03:1 | 4.5 | PASS |
| danger | danger-subtle | 4.56:1 | 4.5 | PASS |
| danger | bg | 5.68:1 | 4.5 | PASS |

### Non-WCAG notes

- **field vs surface-1** (filled-input legibility, the zero-border
  consequence): light ΔL=0.055 oklch-L, ratio 1.17:1; dark ΔL=0.040, ratio
  1.11:1. These are intentionally subtle tonal steps, not text contrast. The
  separation is small but present in both modes; a filled `field` against a
  `surface-1` panel is distinguishable. If real screens make inputs read as
  invisible, the lever is a one-step tonal bump on `--mk-color-field`, not a
  border. Flagged for visual-regression review, not a WCAG failure.
- **text-faint** is below 4.5:1 in both modes by design (2.19:1 light,
  3.10:1 dark). It is for decorative/placeholder text only and must never
  carry meaningful body copy.
- **accent vs success chroma separation** (the `DESIGN-LANGUAGE.md`
  constraint): light C 0.080 (moss) vs 0.150 (success) — success ~1.9x, holds.
  Dark C 0.100 (moss-400) vs 0.140 (green-400) — success ~1.4x. The dark-mode
  ratio is below the "roughly double" target but unchanged by this audit (no
  dark accent/success token failed a contrast pair, and I was scoped to fix
  only failing pairs while preserving moss character). They remain
  distinguishable by hue (150 vs 155) and chroma; left as-is and flagged here.

## What changed and why

All failures were in **light mode** status colors (plus one dark-mode danger
pair). In light mode the status `*-500` foreground tokens were too light to
reach 4.5:1 against either the light page `bg` (`gray-100`) or their own
`*-100` subtle backgrounds. Fixes adjusted **lightness only** (chroma and hue
untouched, so the status hues keep their character and the accent-vs-success
chroma separation is preserved):

| Primitive | Before | After | Reason |
|---|---|---|---|
| `--mk-green-500` | `oklch(64% 0.15 155)` | `oklch(50% 0.15 155)` | success was 2.69:1 / 2.88:1 → now 4.65:1 / 4.98:1 |
| `--mk-amber-500` | `oklch(78% 0.15 85)` | `oklch(52% 0.15 85)` | warning was 1.73:1 / 1.85:1 (amber is the worst offender on light) → now 4.72:1 / 5.07:1 |
| `--mk-red-500` | `oklch(58% 0.22 25)` | `oklch(52% 0.22 25)` | danger was 3.91:1 / 4.39:1 → now 4.90:1 / 5.51:1 |
| `--mk-red-900` | `oklch(30% 0.09 25)` | `oklch(27% 0.09 25)` | **dark** mode: `danger`(red-400) on `danger-subtle`(red-900) was 4.14:1. Deepened the subtle bg one step → 4.56:1. Chose to move the background rather than lighten the danger foreground so the dark danger text color stays put. |

No grays were touched (achromatic ramp preserved, chroma 0). No moss tokens
were touched (moss character preserved). No chroma values were changed.
