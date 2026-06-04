# Vision

**sethmakes** is the toolkit: a monorepo (repo name `make`) of shared packages under the `@sethmakes` npm scope — tools Seth uses when making things. Each tool gets a `sethmakes-<tool>` product name; the first is **sethmakes-ui**, the UI library (the `tokens`/`css`/`components` package trio — package names stay terse, the scope brands the toolkit).

## Why this exists

Seth's projects span **heterogeneous frameworks**: Remix v3, Remix v2 (React), Svelte, and whatever comes next. The first concrete tool is **sethmakes-ui** — a UI component library implementing a single custom design language, consumed consistently across all of them. Framework-neutrality is the founding reason for the project — not a nice-to-have.

## Core values (in priority order)

1. **Brand consistency** — one fixed aesthetic (with light/dark modes), applied identically everywhere. Not a multi-brand theming engine.
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
- **`@sethmakes/components` starts empty** and earns Lit components only when a real project needs one (date picker, combobox, dialog, toast, tooltip are all deferred — no current consumer uses them).
- App-semantic mappings stay in apps: the library ships badge *variants*; tv-tracker maps watch-status→variant. The library never knows what "watching" means.
- The grid/list layouts remain the app's problem — the library styles the card, not the grid.

## Roadmap — agreed future work (2026-06-04)

1. **Icons: `@sethmakes/icons` — strategy settled (2026-06-04).** **Completeness over curation**: icon *selection happens at the consumer's build, not at publish time* — a side project must never wait on a toolkit release to use an icon. Mechanism: the **Iconify** ecosystem. Sets: **Lucide primary, Phosphor for gaps** (pinned `@iconify-json/*` versions). Tailwind v4 consumers use the `@iconify/tailwind4` plugin — `icon-[lucide--check]` emits mask-CSS for only the icons actually used (full set available, zero shipped speculatively). The package itself is thin and rarely republished: pinned set decisions, naming/sizing conventions (`--mk-icon-*` tokens, mono-text alignment), **brand aliases** (`mk--watch` → the glyph we mean by "watch", re-skinnable centrally), bespoke custom glyphs (the only true publish trigger), and a codegen fallback for non-Tailwind consumers. Accepted trade: brand consistency becomes convention rather than enforcement — right call for a one-person toolkit; rejected alternatives: curated ~20-icon subset (publish-per-icon friction), full-set mask CSS (~800KB, absurd), icon fonts (no), per-framework packages (violates founding principle).
2. **Layout primitives + interaction hierarchy.** A shared answer for cross-app UI/UX consistency: layout primitives (stack/cluster/container-style spacing patterns) and a *coherent interaction strategy* — z-index/elevation scale, one modal/overlay policy that prevents modals-on-modals, toast placement, focus management. Note the tension with "layout is the app's problem" (v1 scope): the line moves from *no layout* to *primitives yes, page composition no*. Re-scope deliberately when this starts.

## Status

The decision tree from the envisioning interview (2026-06-04) is **fully resolved, including the aesthetic** — see [ARCHITECTURE.md](./ARCHITECTURE.md) and [DESIGN-LANGUAGE.md](./DESIGN-LANGUAGE.md). The aesthetic took two rounds: a questionnaire-derived gestalt was rendered and rejected on sight; the final language ("terminal bones, calm surface" — JetBrains Mono, zero radius, achromatic grays, moss hero accent) was chosen from complete rendered directions on the docs site. Remaining work is execution: self-host the font, contrast audit, then the tv-tracker migration set.
