# sethmakes

A toolbox of shared packages — tools for making things — published under the `@sethmakes` npm scope. Framework-neutral, web-platform-first, brand-consistent across every app.

## sethmakes-ui

The first tool: a small design language with one fixed aesthetic: **terminal bones, calm surface.** Monospace type everywhere, zero corner radius, flat tonal surfaces with zero borders — hierarchy comes from background shifts, not lines — and one muted moss-green accent for primary actions, links, and focus. It ships as CSS-first primitives (native HTML styled by classes, zero JS) plus a thin layer of Lit custom elements for the few widgets that actually need behavior. SSR-first, framework-agnostic, brand-consistent across every app that uses it.

## Packages

The design-system trio versions in lockstep. `tokens` and `css` publish publicly to npm under `@sethmakes/*`; `components` is reserved and still private (marked `"private": true`) until it has a component to ship.

| Package | Contents | JS? | Published? |
|---|---|---|---|
| [`@sethmakes/tokens`](packages/tokens) | CSS custom properties — light/dark themes | No | Yes |
| [`@sethmakes/css`](packages/css) | Class-based styles for native HTML (depends on tokens) | No | Yes |
| [`@sethmakes/components`](packages/components) | Lit custom elements (depends on tokens; styles its own shadow DOM) | Yes | No — private, reserved until it ships |

`apps/docs` is the Astro site — public docs, dev playground, and SSR test fixture in one. Unpublished.

## Consuming

Import order matters — `css` defines no tokens:

```css
@import "@sethmakes/tokens/index.css";
@import "@sethmakes/tokens/fonts.css";
@import "@sethmakes/css/index.css";
```

- **With Tailwind v4:** import sethmakes first and skip preflight (it lands after `mk.base` and overwrites heading/link styles); bring a small p/heading margin reset of your own. Full recipe on the docs site's install section.
- **Fonts:** `fonts.css` uses relative `url(./fonts/…)`. Vite rebases these; Tailwind's standalone CLI does not — copy the `fonts/` dir to public assets at build time if fonts 404.

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
