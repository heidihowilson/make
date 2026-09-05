# Design Language

The design language is **Vaudeville** — the printed-page vocabulary of *Gholson's Follies*
(one human and his troupe of AI agents, printed as an internet comic strip). One fixed
aesthetic, **single mode**; brand consistency across all consuming apps is the top driver.
This is not a multi-brand theming engine.

House style, in one line: **1933 rubber-hose cartooning posed with rotoscoped weight, as if
traced from live vaudeville footage, printed in sepia duotone on newsprint.**

## The aesthetic in one paragraph

**The metaphor is print, not screen.** Every surface is a sheet of aged newsprint lying on a
dark stage floor. Sepia duotone ink on paper; printed rules — not floating shadows — do all
the dividing; corners are square everywhere (the medallion and the radio are the only round
things, because a circle is geometry, not softness). Three typefaces with one job each: Rye for
mastheads, Special Elite for department headings and the typewriter utility voice, Sorts
Mill Goudy for prose. (Limelight served as a fourth marquee face until 2026-08-15 —
alongside Rye and Special Elite it read as noise, and was retired.) **Ochre is the only warm accent and it is rationed — one
spot per view.** Motion is "shot on twos": stepped at 12 frames a second, an event (an
overlay entering, a telegram arriving), never a state. If a treatment could not be done by a
1933 letterpress shop plus one warm ink, it does not belong.

## How it was decided

- Round 1 (2026-06-04): a questionnaire-derived gestalt was rejected on sight; lesson —
  **aesthetics are judged as gestalts, not axes**. The Terminal direction ("terminal bones,
  calm surface") won from complete rendered directions and shipped as 0.1.x.
- Round 2 (2026-08-13): Seth pivoted the brand to *Gholson's Follies* — the proof-of-concept
  at `cast.sethgholson.com` and a complete design system built in Claude Design ("Vaudeville")
  from that site's literal CSS. The terminal language was **replaced wholesale**; the
  Vaudeville values were ported into the `mk` token/class vocabulary. The new direction is
  paired with a deterministic generative-art pipeline (ComfyUI) — the cast registry renders
  the site, the strips, and the assets alike. See [GENERATIVE-ART.md](./GENERATIVE-ART.md).

## Decisions

| Axis | Decision |
|---|---|
| Metaphor | Print: a newsprint sheet on a dark stage. Nothing glows, floats, or blurs |
| Density | The source page's literal rhythm (2/6/10/14/16/18/20/26/32/36/48) — not a 4/8 grid; do not snap values |
| Shape | Square everywhere; `--mk-radius-medallion` (50%) only for the portrait medallion and the radio |
| Structure | **Printed rules with fixed meanings**: 4px double = major break · 3px double = footer · 2px solid = department underline and every box · 1px tan = minor · 1px dashed = nothing printed here yet |
| Elevation | Exactly two shadows: the deep sheet drop (once per page) and the hard 4px letterpress offset (no blur). No elevation scale |
| Neutrals | Sepia duotone: ink `#2a241b` on papers `#e6d9ba`/`#ede2c4`/`#d8c9a4`, tan/brown/faded secondary, stage `#26211a` |
| Accent | **Ochre `#c47a2e`** (Ake's colour — the only colour in the world), **rationed to one spot per view**. Links `#7a4e15` (deepened from the source's `#8a5a1f` in the sepia pass), going ochre on hover |
| Status | Period-vocabulary: success = printed solid ink, warning = the ochre ration, danger = deep letterpress red `#7a2f1d`. No blue, no `info` hue |
| Typography | Three faces, one job each, all weight 400 — loudness is face, size and **tracking** (.1em dateline → .4em proscenium), never boldness |
| Modes | **Single.** The sheet-on-stage is the mode; a printed page has no dark variant. The `light-dark()` machinery is retired |
| Motion | **Shot on twos**: `steps()` at ~83ms/frame; entrances overshoot once and land hard, holding the last frame. Motion is an event, never a state; nothing animates on scroll or hover. The one smooth easing is the 90ms struck-key press |
| Iconography | **No icon set.** Unicode glyphs (`←` `→` `·`), CSS-drawn controls, and framed art from the pipeline. `@sethmakes/icons` remains for consumer apps' functional UIs, not for the language's own surfaces — and never for vendor marks (see *Consequences & constraints*) |
| Voice | Playbill, not product: THE BOX OFFICE, a BILL, a DEPARTMENT, SOLD OUT, "No. 2 — coming soon". Never "Loading…", never emoji, always typographic punctuation |

## Consequences & constraints (accepted)

- **Webfont weight.** Three families (~139KB woff2 latin, self-hosted in `@sethmakes/tokens`).
  The fallbacks (Georgia serif / Courier mono) are legible but the brand arrives with the
  fonts. No other weights exist — never synthesize bold.
- **Caps are written, not transformed** for Rye and typewriter headings; `text-transform: uppercase` is for
  the typewriter utility voice only.
- **The ochre ration is a review criterion.** Two accents in one view cancel each other out.
  A `--warning` button, an error message, a focus ring and a lever's ON state are all
  claimants; screens get one.
- **Rules replace borders-as-taste.** Pick the rule for the meaning of the break, not the look.
- **Contrast care (sepia pass done 2026-08-15).** Faded `#8f8066` is decorative-tier only
  (ghost rules, dashed slots): at 2.75:1 on the sheet it must never carry text. Muted TEXT
  uses the darker `--mk-faded-ink` `#685d45` — 4.63:1 on the sheet, 5.02:1 on the inset.
  Keep muted text off the `plate` fill, where it drops to 3.95:1. Link ink deepened to
  `#7a4e15` (5.12:1 on the sheet). **Ochre carries lines, never small text** — 2.43:1 on
  paper fails everywhere. Links in running text carry a printed underline (WCAG 1.4.1).
  The measured table lives in [CONTRAST.md](./CONTRAST.md).
- **Vendor marks stay outside the language (settled 2026-09-05).** Ready Up
  (`sethgho/readyup`, issue #64) asked which rule wins when "Continue with Google" meets
  the no-icon-set rule. **The typographic key wins.** A sign-in button is an `.mk-btn` with
  the vendor's name spelled out in the typewriter voice — CONTINUE WITH GOOGLE — and no
  glyph. The two rulebooks cannot both be obeyed. Google requires its four-colour G,
  unmodified, on white; Vaudeville has no white, no second colour and one rationed ochre.
  A G in ink breaks Google's rules; a G in colour breaks ours. The language therefore takes
  the deviation on its own side, where it costs one glyph instead of the palette.
  `@sethmakes/icons` gets no vendor brand aliases — its `mk--*` entries name meanings, and a
  trademark is not a meaning. **At the boundary:** a consumer whose legal review demands the
  real mark ships the vendor's own button, unmodified, in a consumer-owned class outside the
  `mk` namespace. Do not half-dress that button in Vaudeville. Do not route it through
  `@sethmakes/icons`. A foreign object that reads as foreign is honest; a spoiled one only
  looks like a mistake.
- **Print rhythm is literal.** Values were copied from the source CSS; do not round them to a
  grid during refactors.
- **Visual regression runs in one mode** (single-mode language), still at two viewports.

## Token structure

- Two tiers: **primitives** (the sepia palette, literal type/space scales, rules, shadows,
  frame timings) → **semantic** (`--mk-color-sheet`, `--mk-color-heading`, `--mk-rule-thick`,
  `--mk-font-typewriter`, `--mk-dur-beat`…).
- Components reference **semantic tokens only**.
- Composite tokens are first-class: grab a whole rule (`--mk-rule-double`) or shadow
  (`--mk-shadow-block`), not a width and a colour.

## Responsive doctrine

**Reflow the hierarchy, don't shrink it.** Desktop is the reference; smaller screens get the
same content re-set for a narrower sheet. Two breakpoints, always the same two: `1000px`
*relax* (grids loosen, sheet padding drops to its mid value) and `740px` *reflow*
(single-column; sheet padding to phone value; prose drops one step, never below 17px;
utility tracking may tighten). No intermediate breakpoints — fluid grids and `clamp()`
display type do the work between them. Nothing is fixed or sticky; the page scrolls like
paper (the telegram toast is the one sanctioned fixed element — it is an event, not chrome).

## Explicitly rejected

- **The Terminal language (0.1.x, retired 2026-08-13):** JetBrains Mono everywhere, achromatic
  grays, zero borders, moss hero accent, dual light/dark. Replaced wholesale by Vaudeville;
  resurrect from git history if ever needed.
- **Round 1 gestalt (2026-06-04):** boldly rounded, warm coral — too playful.
- Dark mode / theme switching — a printed page has no dark variant.
  - **The evening paper ramp — refused 2026-09-05.** Ready Up (`sethgho/readyup`,
    issue #65) asked for a `--mk-paper-evening` ramp. It swaps the sheet for the same
    sepia duotone at roughly twenty percent less luminance, under the operating
    system's dark hint, and leaves every rule unchanged. The answer is no. A second
    sheet is a second mode, and one fixed aesthetic is the first value of this
    toolkit. The ramp also costs more than it claims. Drop the sheet to about
    `#d0c4a8` and two text inks fall below AA: `--mk-faded-ink` goes 4.63:1 → 3.75:1,
    and `--mk-link-ink` goes 5.12:1 → 4.15:1. "Every rule unchanged" is therefore not
    available. An evening ramp re-cuts every ink and doubles the contrast audit. A
    bright phone at 9 PM is the operating system's job. Ready Up made the same call
    for its own screens. See [CONTRAST.md](./CONTRAST.md) for the measured pairs.
- Soft UI: radius, blurred shadows, elevation scales, translucency (the old appbar blur is
  retired), gradients, scrims-as-protection, skeleton shimmer, smooth easing as default.
- Modern line-icon libraries — and vendor brand marks — on language surfaces (issue #64).
- Emoji, anywhere.

## Remaining open

- Whether the docs site should embed the cast registry rail (it consumes
  `cast.sethgholson.com/cast.json`) or stay registry-free.

## Source of truth

The Vaudeville system was authored in Claude Design from `sethgho/the-cast` (site CSS +
`style/vaudeville-1933.md` + the writing bible) and `cast.sethgholson.com`. Its values live
here as `@sethmakes/tokens`; its prompt-side art doctrine lives in
[GENERATIVE-ART.md](./GENERATIVE-ART.md); its motion doctrine in [MOTION.md](./MOTION.md).
