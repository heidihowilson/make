# make — shared packages monorepo (@sethmakes)

Monorepo of shared packages forming the **sethmakes** toolkit; each tool gets a `sethmakes-<tool>` product name. The first is **sethmakes-ui**, a framework-neutral UI library (the tokens/css/components trio) implementing one custom design language: **Vaudeville** (Gholson's Follies — 1933 sepia newsprint on a dark stage; four faces with one job each; printed rules; ochre rationed to one spot per view; **single mode**, no dark variant; motion "shot on twos"). Adopted 2026-08-13, replacing the terminal/moss language wholesale. Docs site: toolbox landing at `/`, tools get sections (`/ui/*` via the Ui.astro layout). Read `docs/VISION.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN-LANGUAGE.md` — plus `docs/GENERATIVE-ART.md` and `docs/MOTION.md` for art/motion work — before structural work; they are the source of truth for decisions and open questions.

## Structure

- `packages/tokens` → `@sethmakes/tokens` — CSS custom properties (single-mode sepia) plus the four self-hosted faces (Rye, Limelight, Special Elite, Sorts Mill Goudy). No JS. (Includes the Tailwind v4 `@theme` bridge — `@sethmakes/tokens/tailwind.css` — shipped after both early consumers hand-rolled it.)
- `packages/css` → `@sethmakes/css` — class-based styles for native HTML. No JS.
- `packages/components` → `@sethmakes/components` — Lit + TypeScript custom elements. Starts empty; components are added only when a real consuming project needs them.
- `apps/docs` — Astro docs site: public docs + dev playground + SSR test fixture. Deploys to GitHub Pages.
- `tools/art` — **sethmakes-art**, the deterministic generative-art pipeline: locked prompt blocks, per-character rules (read from the cast registry at `cast.sethgholson.com/cast.json`), version-controlled ComfyUI recipes. Not published to npm.
- `docs/` — vision/architecture/design-language decision docs. Update these when decisions change.

## Hard rules

- **Framework-neutral always.** No React/Svelte/Remix imports in any package. Web platform first.
- **Hybrid model:** styled native HTML for basics (`mk-*` classes); Lit custom elements (`<mk-*>`) only where behavior demands JS. Don't convert a styled native element into a custom element without updating ARCHITECTURE.md.
- **Components reference semantic tokens only** — never primitives, never raw values.
- **SSR is a feature:** custom elements must work with Declarative Shadow DOM (`@lit-labs/ssr`); CSS-layer markup must render correctly with zero JS.
- All CSS lives in cascade layers (`@layer mk.reset, mk.base, mk.components, mk.utilities`).
- Prefix everything `mk`: `--mk-*` tokens, `.mk-*` classes, `<mk-*>` elements.
- **Rationale comments ship in the published CSS.** Explain the *why* (the ochre ration, what each rule weight means, "circle is geometry, not softness"), not the what. Never strip them for size — consumer #1 restyled an entire app without opening the docs site because the package was the documentation. Protect that.
- **The Vaudeville doctrine is enforceable:** no dark mode / `[data-theme]`; no radius except the medallion and radio; no icon fonts or line-icon sets on language surfaces; loudness via face/size/tracking, never weight (everything is 400); motion stepped and event-only; UI copy in the playbill voice, typographic punctuation, never emoji; art always framed, never full-bleed. Generating brand art means following `docs/GENERATIVE-ART.md` verbatim.

## Workflow & releases

- pnpm workspaces. No additional build orchestration (Turbo etc.) without demonstrated need.
- **Lockstep versioning for the design-system family (tokens/css/components)** via a Changesets fixed group. Icons versioned in lockstep 2026-06-05 → 2026-08-14, then went independent again: Vaudeville has no icon set, so `@sethmakes/icons` is a consumer-app tool, not part of the language. Future unrelated packages version independently. Any behavior-changing PR must include a changeset.
- CI: `pnpm docs:build` (build smoke) + **Playwright visual regression** (`tests/visual.spec.ts` — every docs page, single mode, phone+desktop; baselines committed, regenerate with `npx playwright test --update-snapshots` on linux). A token/CSS change that shifts pixels must update baselines deliberately. Still planned: @web/test-runner (behavior), `@lit-labs/ssr` smoke suite (when components exist).
- Packages publish publicly to npm via GitHub Actions on release-PR merge.
- Pre-1.0: `0.x` semver, minor = breaking. Don't propose 1.0 until three real projects consume the library.
- TypeScript throughout `packages/components`; emit a custom-elements manifest (planned — `components` is currently empty, so neither exists yet).
