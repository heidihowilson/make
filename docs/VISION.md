# Vision

`make` is a monorepo of shared packages under the `@sethmakes` npm scope — tools Seth uses when making things.

## Why this exists

Seth's projects span **heterogeneous frameworks**: Remix v3, Remix v2 (React), Svelte, and whatever comes next. The first concrete deliverable is a **UI component library implementing a single custom design language**, consumed consistently across all of them. Framework-neutrality is the founding reason for the project — not a nice-to-have.

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

## Status

The decision tree from the envisioning interview (2026-06-04) is **fully resolved, including the aesthetic** — see [ARCHITECTURE.md](./ARCHITECTURE.md) and [DESIGN-LANGUAGE.md](./DESIGN-LANGUAGE.md). The aesthetic took two rounds: a questionnaire-derived gestalt was rendered and rejected on sight; the final language ("terminal bones, calm surface" — JetBrains Mono, zero radius, achromatic grays, moss hero accent) was chosen from complete rendered directions on the docs site. Remaining work is execution: self-host the font, contrast audit, then the tv-tracker migration set.
