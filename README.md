# sethmakes

A toolbox of shared packages — tools for making things — published under the `@sethmakes` npm scope. Framework-neutral, web-platform-first, brand-consistent across every app.

**Docs, live catalog & install recipes: [design.sethgholson.com](https://design.sethgholson.com/)** ([sethmakes-ui](https://design.sethgholson.com/ui) · [tokens](https://design.sethgholson.com/ui/tokens) · [cheatsheet](https://design.sethgholson.com/ui/cheatsheet) · [icons](https://design.sethgholson.com/icons)).

## sethmakes-ui

The first tool: a small design language with one fixed aesthetic — **Vaudeville**, the printed-page vocabulary of *Gholson's Follies*. Sepia duotone ink on aged newsprint on a dark stage; three typefaces with one job each (Rye mastheads, Special Elite for departments and the typewriter utility voice, Sorts Mill Goudy prose); printed rules do the dividing; corners square everywhere; ochre as the one rationed accent; motion "shot on twos" — stepped at 12fps, event-only. Single mode: a printed page has no dark variant. It ships as CSS-first primitives (native HTML styled by classes, zero JS) plus a thin layer of Lit custom elements for the few widgets that actually need behavior. SSR-first, framework-agnostic, brand-consistent across every app that uses it.

The brand's art is generated deterministically: the cast registry (`cast.sethgholson.com/cast.json`) is the unit of value, and [`tools/art`](tools/art) carries the locked prompt blocks and version-controlled ComfyUI recipes that render it — see [`docs/GENERATIVE-ART.md`](docs/GENERATIVE-ART.md).

## Packages

The design-system packages (`tokens`, `css`, `components`) version in **lockstep**; `icons` versions independently — Vaudeville has no icon set, so the icon tool serves consuming apps rather than the language and doesn't ride the system version. `tokens`, `css`, and `icons` publish publicly to npm under `@sethmakes/*`; `components` is reserved and still private (marked `"private": true`) until it has a component to ship.

| Package | Contents | JS? | Published? |
|---|---|---|---|
| [`@sethmakes/tokens`](packages/tokens) | CSS custom properties (single-mode sepia) + the three self-hosted faces | No | Yes |
| [`@sethmakes/css`](packages/css) | Class-based styles for native HTML (depends on tokens) | No | Yes |
| [`@sethmakes/components`](packages/components) | Lit custom elements (depends on tokens; styles its own shadow DOM) | Yes | No — private, reserved until it ships |
| [`@sethmakes/icons`](packages/icons) | Brand aliases + custom Iconify set (`mk` prefix) | No (build/CLI only) | Yes |

`apps/docs` is the Astro site — public docs, dev playground, and SSR test fixture in one. Unpublished.

## Consuming

Import order matters — `css` defines no tokens:

```css
@import "@sethmakes/tokens/index.css";
@import "@sethmakes/tokens/fonts.css";
@import "@sethmakes/css/index.css";
```

Everything past that one block lives on the docs site, which is the canonical copy:

- **Tailwind v4 (Vite or standalone CLI):** [design.sethgholson.com/ui#tailwind](https://design.sethgholson.com/ui#tailwind) — import sethmakes first, skip preflight, re-add only the margin reset.
- **Migrating off DaisyUI** (token remap table, the "eat" shape): [design.sethgholson.com/ui#migrate-daisy](https://design.sethgholson.com/ui#migrate-daisy).
- **Playwright selectors after a restyle:** [design.sethgholson.com/ui#migrate-e2e](https://design.sethgholson.com/ui#migrate-e2e).
- **Fonts 404 under the standalone CLI:** run the `mk-fonts` bin shipped with tokens (`mk-fonts public/fonts`) — details at [design.sethgholson.com/ui#standalone-cli](https://design.sethgholson.com/ui#standalone-cli).

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
3. Merging that PR runs `changeset publish`, releasing every public package with pending changesets (`tokens`, `css`, and `icons` on its own version line) to npm. `components` is private and is skipped until it ships. Publishing uses **npm Trusted Publishing (OIDC)** — no token secret; the workflow is registered as a trusted publisher on npmjs.com and provenance attestations are attached automatically.

Pre-1.0: stay at `0.x` (minor = breaking) until a third real project adopts the library. Consumers pin exact versions; the changelog is the migration doc.

## Decisions

The why behind all of this lives in [`docs/`](docs):

- [`VISION.md`](docs/VISION.md) — what this is for
- [`DESIGN-LANGUAGE.md`](docs/DESIGN-LANGUAGE.md) — the Vaudeville aesthetic and its tokens
- [`GENERATIVE-ART.md`](docs/GENERATIVE-ART.md) — the prompt-side art doctrine (style block, exclusions, character tokens)
- [`MOTION.md`](docs/MOTION.md) — shot on twos: the animation language
- [`ARCHITECTURE.md`](docs/ARCHITECTURE.md) — CSS-first/Lit hybrid, packages, releases
- [`CONTRAST.md`](docs/CONTRAST.md) — color/contrast reasoning (retired grayscale audit, kept as method template; sepia-pass outcomes live in DESIGN-LANGUAGE.md)
