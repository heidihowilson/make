# @sethmakes/tokens

CSS custom properties for the **sethmakes** design language — the gray/moss ramp,
the type/space/radius scales, motion durations/easings, and the self-hosted font.
**Zero JS.** Every `@sethmakes/css` class and `@sethmakes/components` element reads
these and only these; this package is the single source of color and scale.

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
can take the tokens and stay on the system-mono fallback (skip the font download)
by simply not importing it.

## What's in `index.css`

Two tiers. **Primitives** (the gray ramp, the moss ramp, status hues, raw
scale values) feed **semantic tokens** — and only semantic tokens are public API.
Components reference semantic names; never primitives, never raw values.

| Group | Semantic tokens |
|---|---|
| Surfaces | `--mk-color-bg`, `--mk-color-surface-1`, `--mk-color-surface-2`, `--mk-color-surface-3`, `--mk-color-field` |
| Text | `--mk-color-text`, `--mk-color-text-muted`, `--mk-color-text-faint` |
| Accent (moss) | `--mk-color-accent`, `--mk-color-accent-hover`, `--mk-color-accent-contrast`, `--mk-color-accent-subtle`, `--mk-color-on-accent-subtle` |
| Status | `--mk-color-success`, `--mk-color-warning`, `--mk-color-danger` (each with a `-subtle` companion) |
| Focus | `--mk-color-focus` |
| Type scale | `--mk-text-xs … --mk-text-3xl`, `--mk-weight-regular/-medium/-bold`, `--mk-font-body` |
| Space | `--mk-space-1 … --mk-space-8` |
| Radius | `--mk-radius-control`, `--mk-radius-pill` (value is `0` by design — slots, not softness) |
| Icon size | `--mk-icon-sm/-md/-lg` |
| Motion | `--mk-motion-quick/-standard/-slow`, `--mk-ease-out` (and friends) |
| Elevation | `--mk-layer-chrome/-overlay/-toast` |

> There is **no `info` color token** — moss is the only non-status hue. An
> "informational" surface uses a tonal surface or the accent, not a blue.

## Light/dark

One aesthetic, two modes. Every semantic color is a single `light-dark()` pair, so
there are no per-component mode overrides. The mode is driven by `color-scheme`:
system preference by default, with `[data-theme="light"]` / `[data-theme="dark"]`
as explicit overrides on any ancestor.

```css
/* opt a whole app out of dark mode */
html { color-scheme: light; }      /* or: <html data-theme="light"> */
```

## Fonts

`fonts.css` self-hosts **JetBrains Mono** (latin subset, weights 400/600/700 —
600 is SemiBold, deliberately mapped to `--mk-weight-medium`). It references the
woff2 files with **relative** URLs (`url("./fonts/…")`).

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

Skip `fonts.css` entirely to live on the system-mono fallback baked into
`--mk-font-body` (`ui-monospace, "SF Mono", Menlo, Consolas, monospace`).

## Tailwind v4 bridge

`tailwind.css` maps the semantic tokens into Tailwind's `@theme`, so utilities
are token-driven: `bg-surface-1`, `text-accent`, `text-muted`,
`bg-warning-subtle`, `font-body`. Import it after the token sheet:

```css
@import "@sethmakes/tokens/index.css";
@import "@sethmakes/tokens/tailwind.css";
```

Shipped because the first two consumers each hand-rolled the same mapping —
one source of truth beats three copies.

## Versioning

Versions in **lockstep** with `@sethmakes/css`, `@sethmakes/components`, and
`@sethmakes/icons` (a Changesets fixed group). A token rename or value change is a
family bump. Pre-1.0:
`0.x`, minor = breaking.
