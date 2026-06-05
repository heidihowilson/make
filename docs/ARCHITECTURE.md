# Architecture

## The hybrid model (core decision)

The library is **CSS-first for basics, custom elements for widgets**:

- **Native HTML, styled by classes** for everything the platform already provides: buttons, inputs, selects, checkboxes, typography, surfaces. `<button class="mk-btn mk-btn--primary">`. These SSR perfectly in every framework, ship zero JS, and participate in native forms — load-bearing for Remix.
- **Lit custom elements** only where behavior demands JS: date picker, combobox, dialog, toast, tabs, etc. `<mk-datepicker>`.

Rationale: a design language is ~80% CSS. This makes the 80% bulletproof across all frameworks (including no-JS), and shrinks the SSR problem to a small set of components. Escape hatch: classes can later be wrapped in custom elements if a component grows behavior; the reverse migration is expensive. Low-regret.

## SSR

SSR matters — consumers are SSR-first frameworks (Remix v2/v3, SvelteKit).

- The CSS layer needs nothing: server-rendered native HTML is styled on first paint.
- Custom elements use **Declarative Shadow DOM** via `@lit-labs/ssr` where feasible.
- The demo/test harness must exercise **both SSR and client-only** rendering paths.

## Tech choices

| Concern | Choice | Why |
|---|---|---|
| Component authoring | **Lit + TypeScript** | Only web-component stack where SSR is a maintained first-class concern; tiny runtime; lit-analyzer type-checks templates |
| Editor support | **custom-elements manifest** | Autocomplete in any consuming framework |
| Styling | **Hand-written modern CSS** with cascade layers (`@layer mk.reset, mk.base, mk.components, mk.utilities`) | Zero toolchain coupling; trivially overridable without specificity wars |
| Tokens | **CSS custom properties**, two tiers: primitives → semantic | Industry standard; portable everywhere |
| Tailwind bridge | `@sethmakes/tokens/tailwind.css` — Tailwind v4 `@theme` mapping (shipped 2026-06-05 after tv-tracker and eat both hand-rolled it) | Tailwind consumers get `bg-surface-1`, `text-accent`, `font-body` etc. driven by our tokens; one source of truth |

**Token rule:** components only ever reference **semantic** tokens (`--mk-color-bg`, not a raw hex or primitive). This is what makes dark mode a token swap instead of a rewrite.

## Package boundaries

Three packages, published publicly to npm under `@sethmakes/*`:

| Package | Contents | JS? |
|---|---|---|
| `@sethmakes/tokens` | CSS custom properties, light/dark themes, Tailwind `@theme` bridge | No |
| `@sethmakes/css` | Class-based styles for native HTML (depends on tokens) | No |
| `@sethmakes/components` | Lit custom elements (depends on tokens; styles its own shadow DOM) | Yes |

A consumer wanting only the look pulls tokens + css and ships zero JS.

**Prefix:** scope long, prefix short — `mk` everywhere: `--mk-*` tokens, `mk-*` classes, `<mk-*>` elements.

## Demo, docs & testing

- **`apps/docs`** — an Astro site that is simultaneously the public docs site, the dev playground, and the SSR test fixture. Every component is rendered both pre-rendered (server path) and client-upgraded. Deployed to **GitHub Pages** via Actions (static hosting is fine — Astro exercises the server-render path at build time).
- **@web/test-runner** for behavior tests (real browsers, built for web components).
- **Playwright** for visual regression.
- **SSR smoke suite** in CI: render each custom element via `@lit-labs/ssr`, assert on the emitted HTML.

## Adoption mechanics

- **npm is the documented default**: install `@sethmakes/tokens` + `@sethmakes/css`, import in the app's CSS entry. CDN (`unpkg`/`jsdelivr`) supported as the zero-build fallback.
- **One `index.css` per package.** Per-component files exist as internal structure, not a public promise. No granularity optimization in v1.
- **Consumers pin exact versions** (it's `0.x`; minors break) and upgrade deliberately. The Changesets changelog is the migration doc. No codemods, no LTS.

## Versioning & releases

- **Lockstep versioning for the design-system family** (tokens/css/components/icons) via a Changesets fixed group — "the design system is at 0.4.0." Icons joined the group 2026-06-05: the brand icon vocabulary is part of the design language, and Seth prefers one number for the whole system over avoiding occasional empty bumps. Future unrelated packages (e.g. a utils package) version **independently**; lockstep is per package family, not repo-wide.
- **Changesets**: every behavior-changing PR adds a changeset; release PR aggregates; merge → GitHub Actions publishes to npm.
- **Public packages** — free CDN via unpkg/jsdelivr, zero auth friction in consumers.
- **Pre-1.0 policy:** stay at `0.x` (minor = breaking) until the **third** real project adopts the library. No premature 1.0.

## Monorepo tooling

- **pnpm workspaces.** No Turborepo until there's actual pain — three small packages don't need it.
- GitHub Actions for CI + publish + docs deploy.
- Layout: `packages/*` (published), `apps/docs` (the Astro site, unpublished).
- **No speculative packages.** Other shared packages (utils, config presets, etc.) are anticipated but get created only when something is actually being copy-pasted between projects today.
