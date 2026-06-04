# make — shared packages monorepo (@sethmakes)

Monorepo of shared packages; the first is a framework-neutral UI library implementing one custom design language. Read `docs/VISION.md`, `docs/ARCHITECTURE.md`, and `docs/DESIGN-LANGUAGE.md` before structural work — they are the source of truth for decisions and open questions.

## Structure

- `packages/tokens` → `@sethmakes/tokens` — CSS custom properties (light/dark), Tailwind v4 `@theme` bridge. No JS.
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

## Workflow & releases

- pnpm workspaces. No additional build orchestration (Turbo etc.) without demonstrated need.
- **Lockstep versioning for the tokens/css/components trio** via a Changesets fixed group; future unrelated packages version independently. Any behavior-changing PR must include a changeset.
- Tests: @web/test-runner (behavior), Playwright (visual regression), `@lit-labs/ssr` smoke suite (SSR output) in CI.
- Packages publish publicly to npm via GitHub Actions on release-PR merge.
- Pre-1.0: `0.x` semver, minor = breaking. Don't propose 1.0 until three real projects consume the library.
- TypeScript throughout `packages/components`; emit a custom-elements manifest.
