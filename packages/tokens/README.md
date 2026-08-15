# @sethmakes/tokens

CSS custom properties for the **sethmakes** design language — **Vaudeville**, the
printed-page vocabulary of *Gholson's Follies*: sepia duotone on aged newsprint,
three typefaces with one job each, printed rules, letterpress shadows, and motion
shot on twos. **Zero JS.** Every `@sethmakes/css` class and
`@sethmakes/components` element reads these and only these; this package is the
single source of colour and scale.

House style, in one line: *1933 rubber-hose cartooning posed with rotoscoped
weight, printed in sepia duotone on newsprint.* The metaphor is print, not
screen — every surface is a sheet of aged newsprint lying on a dark stage floor.

## Install

```sh
pnpm add @sethmakes/tokens
```

```css
/* app entry CSS — import before @sethmakes/css */
@import "@sethmakes/tokens/index.css";
@import "@sethmakes/tokens/fonts.css"; /* optional — see Fonts */
```

`index.css` defines the tokens on `:root`. `fonts.css` is split out so a consumer
can take the tokens and stay on the serif/mono system fallbacks (skip the font
download) by simply not importing it.

## What's in `index.css`

Two tiers. **Primitives** (the sepia palette, the literal print scales) feed
**semantic tokens** — and only semantic tokens are public API. Components
reference semantic names; never primitives, never raw values.

| Group | Semantic tokens |
|---|---|
| Faces | `--mk-font-display` (Rye) · `--mk-font-typewriter` (Special Elite — headings AND utility) · `--mk-font-body` (Sorts Mill Goudy) |
| Surfaces | `--mk-color-stage`, `--mk-color-sheet`, `--mk-color-inset`, `--mk-color-plate`, `--mk-color-ink-surface` |
| Text | `--mk-color-heading`, `--mk-color-text`, `--mk-color-text-secondary`, `--mk-color-text-muted`, `--mk-color-text-on-ink` |
| Lines | `--mk-color-rule`, `--mk-color-rule-hair`, `--mk-color-rule-ghost` — plus composite rules `--mk-rule-double/-double-thin/-thick/-hair/-dash/-accent` |
| Accent | `--mk-color-accent` (ochre — **rationed: one spot per view**), `--mk-color-link`, `--mk-color-link-hover` |
| Status | `--mk-color-danger`, `--mk-color-warning`, `--mk-color-success` |
| Focus | `--mk-color-focus` (the ochre outline) |
| Shadows | `--mk-shadow-sheet`, `--mk-shadow-block`, `--mk-shadow-block-accent`, `--mk-shadow-press` — the complete set; there is no elevation scale |
| Type scale | `--mk-size-title/-name/-dept/-player/-body/-quote/-mono…`, `--mk-leading-*`, `--mk-track-*` (tracking is the loudness dial) |
| Space | `--mk-space-hair … --mk-space-5xl` — the literal print rhythm, not a 4/8 grid |
| Radius | `--mk-radius-control`/`-surface` (`0` by design) and `--mk-radius-medallion` (`50%` — the circle is geometry, not softness) |
| Elevation | `--mk-layer-chrome/-overlay/-toast` |
| Motion | `--mk-frame` (83ms — one drawing at 12fps), `--mk-dur-beat/-enter/-reveal`, `--mk-steps-3/5/8`, `--mk-dur-key` + `--mk-ease-key` |

> Everything ships at weight 400. Loudness comes from face, size and tracking,
> never boldness. There is no `info` colour, no blue, and no icon set — Unicode
> glyphs (`←` `→` `·`), CSS-drawn controls and framed art do that work.

## Modes

**One.** The sheet-on-stage is the mode; a printed page has no dark variant.
The old `light-dark()` machinery is gone — do not reintroduce `[data-theme]`
switches in consumers.

## Fonts

`fonts.css` self-hosts the three faces (latin subset, weight 400, plus the
Sorts Mill Goudy italic). It references the woff2 files with **relative** URLs
(`url("./fonts/…")`).

- **Vite / Astro / most bundlers** rebase those URLs automatically. Nothing to do.
- **Tailwind's standalone CLI does NOT rebase them.** The emitted CSS keeps
  `./fonts/…`, which 404s relative to your output stylesheet. Copy the font dir
  into your served assets at build time:

  ```jsonc
  // package.json — mk-fonts ships with this package (bin)
  "scripts": {
    "fonts": "mk-fonts public/fonts",
    "build:css": "npm run fonts && tailwindcss -i styles/app.css -o public/app.css"
  }
  ```

  …and make the URLs resolve to `/fonts/…` from your stylesheet's location
  (serving the CSS from web root makes `./fonts/` → `/fonts/` line up). If your
  CSS is nested, vendor a tiny `@font-face` override pointing at the copied path.

Skip `fonts.css` to live on the fallbacks baked into the face tokens
(Georgia-serif for prose, Courier-mono for the typewriter voice) — legible, but
the brand arrives with the webfonts.

## Tailwind v4 bridge

`tailwind.css` maps the semantic tokens into Tailwind's `@theme`, so utilities
are token-driven: `bg-sheet`, `bg-stage`, `text-heading`, `border-rule`,
`font-typewriter`. Import it after the token sheet:

```css
@import "@sethmakes/tokens/index.css";
@import "@sethmakes/tokens/tailwind.css";
```

Shipped because the first two consumers each hand-rolled the same mapping —
one source of truth beats three copies.

## Versioning

Versions in **lockstep** with `@sethmakes/css`, `@sethmakes/components`, and
`@sethmakes/icons` (a Changesets fixed group). A token rename or value change is a
family bump. Pre-1.0: `0.x`, minor = breaking.
