# sethmakes

A toolbox of shared packages — tools for making things — published under the `@sethmakes` npm scope. Framework-neutral, web-platform-first, brand-consistent across every app.

## sethmakes-ui

The first tool: a small design language with one fixed aesthetic: **terminal bones, calm surface.** Monospace type everywhere, zero corner radius, flat tonal surfaces with zero borders — hierarchy comes from background shifts, not lines — and one muted moss-green accent for primary actions, links, and focus. It ships as CSS-first primitives (native HTML styled by classes, zero JS) plus a thin layer of Lit custom elements for the few widgets that actually need behavior. SSR-first, framework-agnostic, brand-consistent across every app that uses it.

## Packages

The design-system trio (`tokens`, `css`, `components`) versions in lockstep. `tokens` and `css` publish publicly to npm under `@sethmakes/*`; `components` is reserved and still private (marked `"private": true`) until it has a component to ship. `@sethmakes/icons` is **not** in that lockstep group — it versions independently (see its [README](packages/icons/README.md#versioning)).

| Package | Contents | JS? | Published? |
|---|---|---|---|
| [`@sethmakes/tokens`](packages/tokens) | CSS custom properties — light/dark themes | No | Yes |
| [`@sethmakes/css`](packages/css) | Class-based styles for native HTML (depends on tokens) | No | Yes |
| [`@sethmakes/components`](packages/components) | Lit custom elements (depends on tokens; styles its own shadow DOM) | Yes | No — private, reserved until it ships |
| [`@sethmakes/icons`](packages/icons) | Brand aliases + custom Iconify set (`mk` prefix) | No (build/CLI only) | Yes — versions independently |

`apps/docs` is the Astro site — public docs, dev playground, and SSR test fixture in one. Unpublished.

## Consuming

Import order matters — `css` defines no tokens:

```css
@import "@sethmakes/tokens/index.css";
@import "@sethmakes/tokens/fonts.css";
@import "@sethmakes/css/index.css";
```

- **With Tailwind v4 (Vite):** import sethmakes first and skip preflight (it lands after `mk.base` and overwrites heading/link styles); bring a small p/heading margin reset of your own. Full recipe on the docs site's install section.
- **Fonts:** `fonts.css` uses relative `url(./fonts/…)`. Vite rebases these; Tailwind's standalone CLI does not — copy the `fonts/` dir to public assets at build time if fonts 404.

### Tailwind standalone CLI + DaisyUI → sethmakes

If your app compiles CSS with `@tailwindcss/cli` (no Vite/PostCSS) and currently
themes via DaisyUI — the **eat** migration shape — there are four extra beats. The
full step-by-step with the DaisyUI token remap table lives on the docs install
section; the shape:

1. **Import order, sethmakes first.** Tokens → fonts → css, *then* Tailwind's
   `theme` + `utilities` as layers **after** `mk.components`, so `p-3` / `text-sm`
   win without specificity fights:

   ```css
   @import "@sethmakes/tokens/index.css";
   @import "@sethmakes/tokens/fonts.css";
   @import "@sethmakes/css/index.css";

   @import "tailwindcss/theme" layer(theme);
   @import "tailwindcss/utilities" layer(utilities);

   @source "./app/**/*.{ts,tsx}";   /* keep your @source globs */

   @layer base { h1,h2,h3,h4,p,ul,ol { margin: 0; } } /* the only preflight bit you re-add */
   ```

2. **Skip Tailwind preflight.** Importing only `theme` + `utilities` (not the full
   `tailwindcss` bundle) drops preflight — which would otherwise overwrite
   `mk.base` headings/links. Re-add just the margin reset above.

3. **Drop DaisyUI.** Remove `@plugin "daisyui"` and the `data-theme="nord"` pin.
   sethmakes drives color via `color-scheme` + `light-dark()` (system preference) —
   you **gain dark mode for free**, or pin `[data-theme="light"]` to stay single-mode.
   Remap daisy tokens: `base-100`→`bg`, `base-200`→`surface-1`,
   `base-300`→`surface-2/3`, `base-content`→`text` (`/50`→`text-muted`,
   `/40`→`text-faint`), `primary`→`accent`, `primary-content`→`accent-contrast`,
   `warning`/`error`→`warning`/`danger`. There is **no `info` color** — use a tonal
   surface or `.mk-alert--info`.

4. **Copy the fonts.** The standalone CLI does not rebase `fonts.css`'s relative
   `url(./fonts/…)`, so add a build step copying
   `node_modules/@sethmakes/tokens/fonts/` into your served assets, or fonts 404.

**Playwright note:** the restyle changes **classes, not roles/labels/routes**.
Class-coupled selectors (`.card` → `.mk-card`, `li.card` → `li.mk-card`) must be
updated; everything semantic — `getByRole`, `getByPlaceholder`, `getByText`,
`form[action=…]`, button labels, native `confirm()` dialogs — survives untouched.

## Dev

```sh
pnpm install        # install workspace deps (pnpm 10, frozen in CI)
pnpm docs:dev       # run the docs/playground locally
pnpm docs:build     # static build (also the CI smoke check)
pnpm changeset      # record a changeset for a behavior-changing PR
```

## Release flow

Changesets, automated by GitHub Actions:

1. Every behavior-changing PR adds a changeset (`pnpm changeset`).
2. On merge to `main`, the release workflow opens or updates a **Version Packages** PR aggregating pending changesets.
3. Merging that PR runs `changeset publish`, releasing the public packages (`tokens` and `css`) to npm. `components` is private and is skipped until it ships. Publishing uses **npm Trusted Publishing (OIDC)** — no token secret; the workflow is registered as a trusted publisher on npmjs.com and provenance attestations are attached automatically.

Pre-1.0: stay at `0.x` (minor = breaking) until a third real project adopts the library. Consumers pin exact versions; the changelog is the migration doc.

## Decisions

The why behind all of this lives in [`docs/`](docs):

- [`VISION.md`](docs/VISION.md) — what this is for
- [`DESIGN-LANGUAGE.md`](docs/DESIGN-LANGUAGE.md) — the aesthetic and its tokens
- [`ARCHITECTURE.md`](docs/ARCHITECTURE.md) — CSS-first/Lit hybrid, packages, releases
- [`CONTRAST.md`](docs/CONTRAST.md) — color/contrast reasoning
