# @sethmakes/icons

Brand aliases, sizing conventions, and a custom Iconify set (prefix `mk`) for the
sethmakes design language. **Icon selection happens at _your_ build, not ours** —
this package stays thin and rarely republishes.

## Philosophy: selection at your build

A side project must never wait on a toolkit release to use an icon. So we don't curate
a subset. Instead we lean on the **Iconify** ecosystem: you reference any icon from the
pinned source sets and your bundler emits CSS for **only the icons you actually use**.
The full sets are available; nothing is shipped speculatively.

- **Lucide is primary. Phosphor (`ph`) fills gaps.** Versions are pinned here so the
  glyph behind `mk--watch` is reproducible.
- This package adds three things on top: **brand aliases** (`mk--watch` → the glyph we
  mean by "watch", re-skinnable centrally), **sizing conventions** (the `--mk-icon-*`
  tokens + `.mk-icon` helper, shipped by `@sethmakes/tokens` / `@sethmakes/css`), and a
  **CLI fallback** for apps that can't run the Tailwind plugin.

The only thing a human curates is [`src/aliases.json`](./src/aliases.json). The build
resolves those to icon bodies and freezes them into `dist/mk.json`, a real Iconify set.

## Install

```sh
pnpm add @sethmakes/icons @iconify-json/lucide @iconify-json/ph
# keep the source sets as devDependencies if you prefer (-D) — they are
# build-time-only inputs to the Tailwind plugin / CLI.
```

The source sets (`@iconify-json/lucide`, `@iconify-json/ph`) are pinned by this
package, but you must install them **directly** too. The Tailwind v4 plugin
resolves icon sets from your project root, and transitive deps of
`@sethmakes/icons` are not hoisted there under either pnpm or npm — so the plugin
can't find them unless they're your own dependency. (The CLI fallback is
different: it reads the sets from this package's own `node_modules` via
`createRequire`, so it works without the direct install.)

## Recipe 1 — Tailwind v4 (primary)

Tailwind v4 is CSS-first. Register the plugin in your CSS entry. The plugin
discovers `@iconify-json/<prefix>` sets by name from your project root — which is
why Lucide and Phosphor must be **your own** dependencies (see Install), not just
transitive deps of this package. Our custom `mk` set is **not** an
`@iconify-json/mk` package, so you register it explicitly with `from-json`,
pointing at this package's `dist/mk.json`:

```css
/* sethmakes first (the .mk-icon helper below comes from these) */
@import "@sethmakes/tokens/index.css";
@import "@sethmakes/css/index.css";

@import "tailwindcss";

@plugin "@iconify/tailwind4" {
  prefix: icon;
  scale: 1;
  icon-sets: from-json(mk, "node_modules/@sethmakes/icons/dist/mk.json");
}
```

Then use icons as utility classes. The plugin emits mask-CSS for **only** the names that
appear in your markup:

```html
<span class="mk-icon icon-[mk--watch]"></span>
<span class="mk-icon icon-[lucide--check]"></span>
<span class="mk-icon icon-[ph--television]"></span>
```

Notes:

- `prefix: icon` makes the class `icon-[<set>--<name>]`. `mk--*` are our brand aliases;
  `lucide--*` / `ph--*` reach the raw source sets directly when no alias exists.
- The `from-json` path is resolved relative to where Tailwind runs (your project root).
  If your setup resolves packages differently, use an absolute path or a path your
  bundler can find — the file is exported as `@sethmakes/icons/mk.json` too.
- Icons render via CSS `mask` with `background-color: currentColor`, so **`color:`
  styles the glyph** and it inherits text color for free.

## Recipe 2 — CLI fallback (no Tailwind)

Svelte, Remix v2, or no-build apps can't use the Tailwind plugin. The `sethmakes-icons`
CLI does the same job manually: name some icons, get a stylesheet of mask classes.

```sh
# to stdout
npx sethmakes-icons lucide--check mk--watch ph--television

# to a file you import
npx sethmakes-icons mk--watch mk--play mk--pause --out app/styles/icons.css
```

This emits one class per icon (mask-based, `em`-sized, `currentColor`-aware):

| Icon arg          | Class emitted            |
| ----------------- | ------------------------ |
| `lucide--check`   | `.mk-icon-lucide-check`  |
| `mk--watch`       | `.mk-icon-watch`         |
| `ph--television`  | `.mk-icon-ph-television` |

`mk--*` aliases drop the redundant prefix in the class name. Change the prefix with
`--selector-prefix`. Run `sethmakes-icons --help` for all options. The CLI reads `mk--*`
from this package's `dist/mk.json` and any other set from its installed
`@iconify-json/<set>` package.

## Sizing — use the `--mk-icon-*` tokens

`@sethmakes/tokens` ships icon-size tokens tuned to sit beside mono text, and
`@sethmakes/css` ships a `.mk-icon` helper that boxes and baseline-aligns a mask icon:

| Token            | Value     | Helper          |
| ---------------- | --------- | --------------- |
| `--mk-icon-sm`   | `1rem`    | `.mk-icon--sm`  |
| `--mk-icon-md`   | `1.25rem` | `.mk-icon` (default) |
| `--mk-icon-lg`   | `1.5rem`  | `.mk-icon--lg`  |

Compose the helper with the icon class — the helper supplies the box and the optical
baseline nudge; the icon class supplies the glyph:

```html
<span class="mk-icon icon-[mk--watch]"></span>
<span class="mk-icon mk-icon--lg icon-[mk--filter]"></span>
```

For CLI-generated classes, either compose the same way
(`<span class="mk-icon mk-icon-watch">`) or, if you skip the helper, the CLI classes are
`1em` by default so they scale with `font-size`. The `.mk-icon` helper sets an explicit
`width`/`height` from the tokens, which intentionally overrides that `1em`.

> Animated icons (e.g. `mk--loading`) must spin under a reduced-motion guard. Wrap any
> `@keyframes spin` usage in `@media (prefers-reduced-motion: no-preference)`.

## Brand aliases

The `mk` set. Edit [`src/aliases.json`](./src/aliases.json) and rebuild to re-skin a
meaning everywhere at once. Sources are Lucide-first; Phosphor only where Lucide lacks
the glyph.

| Alias            | Source            | Why this glyph |
| ---------------- | ----------------- | -------------- |
| `mk--watch`      | `lucide--eye`     | an eye = "have you watched this" — the core TV-tracker verb |
| `mk--play`       | `lucide--play`    | universal solid triangle for start playback |
| `mk--pause`      | `lucide--pause`   | twin bars, the inverse of play |
| `mk--check`      | `lucide--check`   | bare checkmark = done/confirmed; composes inside buttons |
| `mk--close`      | `lucide--x`       | plain X = dismiss/close |
| `mk--add`        | `lucide--plus`    | plus = create/add one |
| `mk--remove`     | `lucide--minus`   | minus = remove-without-destroying (not trash) |
| `mk--trash`      | `lucide--trash-2` | lidded bin = permanent delete |
| `mk--edit`       | `lucide--pencil`  | pencil = inline edit/rename |
| `mk--search`     | `lucide--search`  | magnifier = find |
| `mk--settings`   | `lucide--settings`| gear = configuration (never per-item edit) |
| `mk--menu`       | `lucide--menu`    | hamburger = nav/overflow menu |
| `mk--chevron-up`    | `lucide--chevron-up`    | low-weight collapse/disclosure |
| `mk--chevron-down`  | `lucide--chevron-down`  | expand / select affordance |
| `mk--chevron-left`  | `lucide--chevron-left`  | previous-within-context |
| `mk--chevron-right` | `lucide--chevron-right` | drill-in / more on list rows |
| `mk--arrow-left`    | `lucide--arrow-left`    | actual back navigation (heavier than chevron) |
| `mk--arrow-right`   | `lucide--arrow-right`   | forward navigation / continue |
| `mk--external`   | `lucide--external-link` | "opens a new tab / leaves the app" |
| `mk--calendar`   | `lucide--calendar`| air dates, release schedules |
| `mk--clock`      | `lucide--clock`   | runtime / time-left / recency |
| `mk--star`       | `lucide--star`    | rating / favourite (outline so fill = score) |
| `mk--heart`      | `lucide--heart`   | "love it" / wishlist, distinct from star |
| `mk--info`       | `lucide--info`    | neutral details/help |
| `mk--warning`    | `lucide--triangle-alert`| triangle = caution; shape signals severity sans colour |
| `mk--error`      | `lucide--circle-x`| failed/blocked, in the status family |
| `mk--success`    | `lucide--circle-check`  | succeeded, distinct from the bare `check` verb |
| `mk--user`       | `lucide--user`    | account / profile / who |
| `mk--home`       | `lucide--house`   | back to dashboard anchor |
| `mk--refresh`    | `lucide--refresh-cw`    | reload/sync (clockwise = "again") |
| `mk--filter`     | `lucide--funnel`  | narrow this list |
| `mk--loading`    | `lucide--loader-circle` | spin target (under a reduced-motion guard) |

## Build

`dist/mk.json` is generated, not hand-authored. Regenerate after editing aliases:

```sh
pnpm --filter @sethmakes/icons build
```

The build resolves each alias against the pinned source sets, freezes the bodies into a
prefix-`mk` Iconify set, validates it against the Iconify schema, and writes
`dist/mk.json`. It also runs on `prepublishOnly`.

## Versioning

This package versions in **lockstep** with the design-system family
(tokens/css/components/icons, a Changesets fixed group) — the brand icon
vocabulary is part of the design language, so it shares the system version.
Pre-1.0: `0.x`, minor = breaking.
