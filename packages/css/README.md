# @sethmakes/css

Class-based styles for native HTML, implementing the **sethmakes** design language.
Style a `<button class="mk-btn mk-btn--primary">`, not a custom element. **Zero JS.**
Every rule lives in a cascade layer and reads semantic tokens from
[`@sethmakes/tokens`](../tokens) — which you **must import first** (this package
defines no tokens).

## Install

```css
/* order matters — css defines no tokens */
@import "@sethmakes/tokens/index.css";
@import "@sethmakes/tokens/fonts.css"; /* optional */
@import "@sethmakes/css/index.css";
```

## Cascade layers

Everything ships inside `@layer mk.reset, mk.base, mk.components, mk.utilities`.
The layer order is declared up front so **your own un-layered styles always win**
without specificity fights — layered rules lose to unlayered ones by definition.
That is also why coexisting with Tailwind is a matter of import order, not `!important`
(see the root README and the docs install section for the full recipe).

`mk.reset` zeroes `body` margin and sets `box-sizing` only. `mk.base` styles bare
`h1–h4`, `a`, and document defaults. If you drop a CSS reset (Tailwind preflight,
normalize) **after** `mk.base`, it overwrites those heading/link styles — so import
sethmakes after any reset, or skip the reset and bring a tiny margin reset of your own.

## What ships

Compose these on native elements. Variants are `--` suffixed; structure parts are
`__` suffixed (BEM-ish).

This is the complete inventory — if a class isn't here, it doesn't exist.
Checked state on choices answers to `:checked`, `[aria-checked="true"]`, or the
`--checked` modifier (progressive-enhancement consumers render state server-side).

| Area | Classes |
|---|---|
| Buttons | `.mk-btn` + `--primary` / `--ghost` / `--danger` / `--warning` / `--active` / `--sm` / `--xs` / `--lg` / `--block` / `--icon` |
| Badges | `.mk-badge` + `--accent` / `--success` / `--warning` / `--danger` / `--sm` / `--dot` |
| Forms | `.mk-field` (`> label`, `__help`, `__error`, `--error`), `.mk-input`, `.mk-select`, `.mk-textarea`, `.mk-fieldset`, `.mk-choice`, `.mk-checkbox`, `.mk-radio`, `.mk-switch` (all three choices: `--checked` / `[aria-checked]`) |
| Surfaces | `.mk-card` (`--sunken` / `--flush`), `.mk-table` (`.mk-table-wrap`, `__num`), `.mk-divider` (`--label`), `.mk-disclosure` (`__body`) |
| Chrome | `.mk-appbar` (`--bottom`), `.mk-shell` (`__main`) — the shell is the appbar's document contract |
| Feedback | `.mk-alert` (`__title`, `--info` / `--success` / `--warning` / `--danger`), `.mk-spinner` (`--sm` / `--md`), `.mk-progress` (`--sm`, `:indeterminate`), `.mk-empty` (`__title` / `__message` / `__action`) |
| Media | `.mk-thumb` (`--square` / `--video`, `__fallback`), `.mk-skeleton` (`--text`), `.mk-figure` |
| Prose | `.mk-prose` (article content: lists, code, blockquote, kbd) |
| Utilities | `.mk-icon` (`--sm` / `--lg`), `.mk-link-reset` |
| Feedback | `.mk-alert` (`__title`, `--info` / `--success` / `--warning` / `--danger`), `.mk-spinner` (`--sm` / `--md`), `.mk-progress` (`--sm`, `:indeterminate`) |
| Media | `.mk-thumb` (`--square` / `--video`, `__fallback`), `.mk-figure`, `.mk-skeleton` (`--text`) |
| Empty state | `.mk-empty` (`__title` / `__message` / `__action`) |
| Utilities | `.mk-link-reset` (strip link styling — for wrapping link elements), `.mk-icon` (`--sm` / `--lg`) |

The full live catalog with rendered examples is the docs site (`/ui/components/*`).

## Recipes

### Theme switcher (System / Light / Dark)

The pieces already exist: the tokens follow the OS via `color-scheme` +
`light-dark()`, `[data-theme="light|dark"]` on `<html>` overrides, and
`.mk-btn--active` is the segmented-choice state (that is its documented job —
don't fake it with primary-vs-ghost). The app brings ~6 lines of JS:

```html
<div role="group" aria-label="Theme">
  <button class="mk-btn mk-btn--ghost mk-btn--active" data-mode="auto" aria-pressed="true">system</button>
  <button class="mk-btn mk-btn--ghost" data-mode="light">light</button>
  <button class="mk-btn mk-btn--ghost" data-mode="dark">dark</button>
</div>
<script>
  for (const b of document.querySelectorAll('[data-mode]'))
    b.addEventListener('click', () => {
      const m = b.dataset.mode;
      m === 'auto' ? delete document.documentElement.dataset.theme
                   : (document.documentElement.dataset.theme = m);
      localStorage.setItem('mode', m); // restore on load, before first paint
      // move .mk-btn--active + aria-pressed to b
    });
</script>
```

### Mobile bottom tab bar

The bars are sticky, not fixed — `.mk-shell` on the document wrapper (with
`.mk-shell__main` on the growing main) is the contract that makes a bottom bar
pin on short pages. Both real consumers discovered this the hard way before the
shell shipped.

```html
<body class="mk-shell">
  <header class="mk-appbar">…</header>
  <main class="mk-shell__main">…</main>
  <nav class="mk-appbar mk-appbar--bottom">…</nav>
</body>
```

The library ships the chrome (`.mk-appbar--bottom`: fixed-to-bottom translucent
surface, safe-area padded — the one sanctioned translucency). The **per-tab layout**
(icon over a tiny label, a fixed tab height) is app layout — Tailwind or your own CSS
owns it. Mark the active tab with `.mk-btn--active` or an accent text color; render
conditional tabs in your app:

```html
<nav class="mk-appbar mk-appbar--bottom" aria-label="Primary">
  <a href="/" class="mk-link-reset flex flex-col items-center gap-1 min-h-[56px] justify-center text-[color:var(--mk-color-accent)]">
    <span class="mk-icon icon-[mk--home]"></span>
    <span class="text-[11px]">Home</span>
  </a>
  <a href="/week" class="mk-link-reset flex flex-col items-center gap-1 min-h-[56px] justify-center">
    <span class="mk-icon icon-[mk--calendar]"></span>
    <span class="text-[11px]">Week</span>
  </a>
  <!-- conditional tab: render server-side only when allowed -->
</nav>
```

`.mk-link-reset` strips the moss link color/underline so the tab styles its own state.
The active accent color uses the token directly (`var(--mk-color-accent)`) so it tracks
light/dark.

### Loading / async states

Server-rendered apps need none of these. When you add client interactivity, the
loading vocabulary is already here — no build step:

- **`.mk-spinner`** (`--sm` / `--md`) — a stepping conic block; spins under a
  reduced-motion guard, falls back to a static half-fill.
- **`.mk-progress`** (`--sm`) — accent fill on a tonal track. Drop the `value`
  attribute for an indeterminate sliding bar.
- **`.mk-skeleton`** / **`.mk-skeleton--text`** — placeholder blocks for content
  not yet loaded; `--text` sizes to a line of body text.

### Native inputs that need no theming

`type="number"`, `type="search"`, `type="date"`, and `<input list>` +
`<datalist>` autocomplete all work as plain `.mk-input` today. The native spinner
and the datalist dropdown are **browser chrome — un-styleable cross-browser by spec**,
so there is no `.mk-stepper` or `.mk-combobox` and you don't need one. A richer styled
combobox would be a future `@sethmakes/components` element, not a CSS class.

```html
<input class="mk-input" type="number" min="0" max="7" />
<input class="mk-input" list="ideas" />
<datalist id="ideas"><option value="…"></datalist>
```

## SSR

Zero JS means every class renders correctly server-side with no hydration. Nothing
here waits on the client.

## Versioning

Lockstep with [`@sethmakes/tokens`](../tokens) and `@sethmakes/components`. Pre-1.0:
`0.x`, minor = breaking. Any class rename ships a changeset and a changelog entry —
the changelog is the migration doc.
