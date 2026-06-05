# make — shared packages monorepo (@sethmakes)

Monorepo of shared packages forming the **sethmakes** toolkit; each tool gets a `sethmakes-<tool>` product name. The first is **sethmakes-ui**, a framework-neutral UI library (the tokens/css/components trio) implementing one custom design language. Docs site: toolbox landing at `/`, tools get sections (`/ui/*` via the Ui.astro layout). Read `docs/VISION.md`, `docs/ARCHITECTURE.md`, and `docs/DESIGN-LANGUAGE.md` before structural work — they are the source of truth for decisions and open questions.

## Structure

- `packages/tokens` → `@sethmakes/tokens` — CSS custom properties (light/dark) plus self-hosted fonts. No JS. (Includes the Tailwind v4 `@theme` bridge — `@sethmakes/tokens/tailwind.css` — shipped after both early consumers hand-rolled it.)
- `packages/css` → `@sethmakes/css` — class-based styles for native HTML. No JS.
- `packages/components` → `@sethmakes/components` — Lit + TypeScript custom elements. Starts empty; components are added only when a real consuming project needs them.
- `apps/docs` — Astro docs site: public docs + dev playground + SSR test fixture. Deploys to GitHub Pages.
- `docs/` — vision/architecture/design-language decision docs. Update these when decisions change.

## Hard rules

- **Framework-neutral always.** No React/Svelte/Remix imports in any package. Web platform first.
- **Hybrid model:** styled native HTML for basics (`mk-*` classes); Lit custom elements (`<mk-*>`) only where behavior demands JS. Don't convert a styled native element into a custom element without updating ARCHITECTURE.md.
- **Components reference semantic tokens only** — never primitives, never raw values.
- **SSR is a feature:** custom elements must work with Declarative Shadow DOM (`@lit-labs/ssr`); CSS-layer markup must render correctly with zero JS.
- All CSS lives in cascade layers (`@layer mk.reset, mk.base, mk.components, mk.utilities`).
- Prefix everything `mk`: `--mk-*` tokens, `.mk-*` classes, `<mk-*>` elements.
- **Rationale comments ship in the published CSS.** Explain the *why* (zero-border consequences, contrast decisions, "circle is geometry, not softness"), not the what. Never strip them for size — consumer #1 restyled an entire app without opening the docs site because the package was the documentation. Protect that.

## Workflow & releases

- pnpm workspaces. No additional build orchestration (Turbo etc.) without demonstrated need.
- **Lockstep versioning for the design-system family (tokens/css/components/icons)** via a Changesets fixed group — the icon vocabulary is part of the design language (decided 2026-06-05, reversing the initial independent-icons stance); future unrelated packages version independently. Any behavior-changing PR must include a changeset.
- CI today runs only `pnpm docs:build` (a build smoke check) — see `.github/workflows/ci.yml`. **Planned** test stack (not yet wired up): @web/test-runner (behavior), Playwright (visual regression), `@lit-labs/ssr` smoke suite (SSR output).
- Packages publish publicly to npm via GitHub Actions on release-PR merge.
- Pre-1.0: `0.x` semver, minor = breaking. Don't propose 1.0 until three real projects consume the library.
- TypeScript throughout `packages/components`; emit a custom-elements manifest (planned — `components` is currently empty, so neither exists yet).
