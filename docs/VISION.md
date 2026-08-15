# Vision

**sethmakes** is the toolkit: a monorepo (repo name `make`) of shared packages under the `@sethmakes` npm scope — tools Seth uses when making things. Each tool gets a `sethmakes-<tool>` product name; the first is **sethmakes-ui**, the UI library (the `tokens`/`css`/`components` package trio — package names stay terse, the scope brands the toolkit).

## Why this exists

Seth's projects span **heterogeneous frameworks**: Remix v3, Remix v2 (React), Svelte, and whatever comes next. The first concrete tool is **sethmakes-ui** — a UI component library implementing a single custom design language, consumed consistently across all of them. Framework-neutrality is the founding reason for the project — not a nice-to-have.

## Core values (in priority order)

1. **Brand consistency** — one fixed aesthetic (single mode), applied identically everywhere. Not a multi-brand theming engine.
2. **Maximal reusability** — works in any framework, including SSR frameworks and no-JS contexts. Future-proof against framework churn.
3. **Leaf-node scope** — styled forms, buttons, date pickers, etc. Interactive but never data-bound; no coupling to server APIs or app state.
4. **Boring, durable tech** — web platform primitives over framework cleverness; don't add tooling before pain.

## What v1 is NOT

- Not a multi-brand/white-label theming system
- Not layout/page-level components
- Not data-fetching or app-state-aware components
- Not framework-specific wrapper packages (revisit if real friction appears)

## v1 scope and first adopter

**First adopter: tv-tracker** (Remix v3, server-rendered, zero hydration, Tailwind v4 + DaisyUI today). Adoption = replacing DaisyUI with `@sethmakes/tokens` + `@sethmakes/css`; Tailwind stays for layout utilities. Functionally, this library is *our own DaisyUI* — component classes over tokens, Tailwind-v4-compatible, in our own design language.

- **v1 = tokens + css.** They carry the entire tv-tracker migration: buttons, badges, inputs/select/textarea/checkbox, field scaffolding, cards, progress, alert, spinner, divider, styled `<details>` disclosure, links, typography, media-thumb-with-fallback, empty states.
- **`@sethmakes/components` starts empty** and earns Lit components only when a real project needs one (date picker, combobox and tooltip are deferred — no current consumer uses them; dialog, toast and tabs turned out to need no JS and shipped CSS-first in `@sethmakes/css`).
- App-semantic mappings stay in apps: the library ships badge *variants*; tv-tracker maps watch-status→variant. The library never knows what "watching" means.
- The grid/list layouts remain the app's problem — the library styles the card, not the grid.

## Roadmap — agreed future work (2026-06-04)

1. **Icons: `@sethmakes/icons` — strategy settled (2026-06-04).** **Completeness over curation**: icon *selection happens at the consumer's build, not at publish time* — a side project must never wait on a toolkit release to use an icon. Mechanism: the **Iconify** ecosystem. Sets: **Lucide primary, Phosphor for gaps** (pinned `@iconify-json/*` versions). Tailwind v4 consumers use the `@iconify/tailwind4` plugin — `icon-[lucide--check]` emits mask-CSS for only the icons actually used (full set available, zero shipped speculatively). The package itself is thin and rarely republished: pinned set decisions, naming/sizing conventions (`--mk-icon-*` tokens, mono-text alignment), **brand aliases** (`mk--watch` → the glyph we mean by "watch", re-skinnable centrally), bespoke custom glyphs (the only true publish trigger), and a codegen fallback for non-Tailwind consumers. Accepted trade: brand consistency becomes convention rather than enforcement — right call for a one-person toolkit; rejected alternatives: curated ~20-icon subset (publish-per-icon friction), full-set mask CSS (~800KB, absurd), icon fonts (no), per-framework packages (violates founding principle).
2. **Interaction hierarchy — settled (2026-06-04): there is NO `sethmakes-layout` package.** Stack/cluster-style spacing primitives are rejected — Tailwind already owns that job in every consuming app, and competing primitives would be shelf-ware. The "modals-on-modals" problem is *policy*, not primitives, and decomposes into the packages that already exist:
   - **Elevation/z-index scale** → named layer tokens in `@sethmakes/tokens` (`--mk-layer-chrome/-overlay/-toast`…) so nothing ever types `z-index: 9999`.
   - **App chrome recipes** → `@sethmakes/css` components (`.mk-appbar` sticky translucent header — issue #11, mobile bottom nav, safe-area handling).
   - **Overlay policy** → a written strategy doc (`docs/INTERACTION.md` when work starts): one modal at a time via native `<dialog>` + `::backdrop`; a modal never spawns a modal (it morphs or queues); fixed toast placement; what may stack on what.
   - **Behavioral overlay management** (focus trapping, scroll locking, toast queue) → `@sethmakes/components` (`<mk-dialog>`, `<mk-toaster>`) the day a real app needs it — the empty components package's designated reason to exist.

## Roadmap addendum (2026-08-13)

3. **The brand is now *Gholson's Follies*** and the design language is **Vaudeville** — see [DESIGN-LANGUAGE.md](./DESIGN-LANGUAGE.md). The brand direction is heavy on **deterministic image generation**: the cast registry (`cast.sethgholson.com/cast.json`) is the unit of value, and comics, site art, avatars and stickers are renderers that consume it through a ComfyUI pipeline. The toolkit carries this as **sethmakes-art** (`tools/art`): the locked prompt blocks, per-character rules, and version-controlled generation recipes.

## Status

The decision tree from the envisioning interview (2026-06-04) is **fully resolved** — see [ARCHITECTURE.md](./ARCHITECTURE.md) and [DESIGN-LANGUAGE.md](./DESIGN-LANGUAGE.md). The aesthetic has taken three rounds: a questionnaire-derived gestalt was rendered and rejected on sight (2026-06-04); the "terminal bones, calm surface" language won from rendered directions and shipped as 0.1.x; and on 2026-08-13 Seth replaced it wholesale with **Vaudeville** (Gholson's Follies — sepia newsprint, three faces, printed rules, motion shot on twos), ported into the same `mk` token/class vocabulary. The sepia contrast pass landed 2026-08-15. Remaining work: consumer migrations to the new look, and building out the art pipeline recipes.
