# @sethmakes/css

Class-based styles for native HTML, implementing the **sethmakes** design language
— **Vaudeville**, the printed-page vocabulary of *Gholson's Follies*. Style a
`<button class="mk-btn mk-btn--primary">`, not a custom element. **Zero JS.**
Every rule lives in a cascade layer and reads semantic tokens from
[`@sethmakes/tokens`](../tokens) — which you **must import first** (this package
defines no tokens).

The metaphor is print, not screen: every page is a sheet of aged newsprint on a
dark stage floor. Buttons are struck typewriter keys, cards are ink-ruled panels,
tables are the ledger, empty states are dashed slots ("nothing is printed here
yet"), toasts are telegrams delivered at the footlights, and motion is shot on
twos — stepped at 12fps, never smoothly eased.

## Install

```css
/* order matters — css defines no tokens */
@import "@sethmakes/tokens/index.css";
@import "@sethmakes/tokens/fonts.css"; /* the three faces — skip only for fallback type */
@import "@sethmakes/css/index.css";
```

## Cascade layers

Everything ships inside `@layer mk.reset, mk.base, mk.components, mk.utilities`.
The layer order is declared up front so **your own un-layered styles always win**
without specificity fights — layered rules lose to unlayered ones by definition.
That is also why coexisting with Tailwind is a matter of import order, not `!important`.

`mk.reset` zeroes `body` margin and sets `box-sizing` only. `mk.base` styles bare
`h1–h4`, `a`, and document defaults (Rye masthead h1, typewriter department h2–h4,
Goudy prose, link ink that goes ochre on hover). If you drop a CSS reset (Tailwind
preflight, normalize) **after** `mk.base`, it overwrites those heading/link styles —
so import sethmakes after any reset, or skip the reset.

## What ships

Compose these on native elements. Variants are `--` suffixed; structure parts are
`__` suffixed (BEM-ish).

This is the complete inventory — if a class isn't here, it doesn't exist.
Checked state on choices answers to `:checked`, `[aria-checked="true"]`, or the
`--checked` modifier (progressive-enhancement consumers render state server-side).

| Area | Classes |
|---|---|
| Page | `.mk-stage` + `.mk-sheet` (the sheet on the stage floor — once per page), `.mk-kicker` (the typewriter announcement voice) |
| Buttons | `.mk-btn` (struck key) + `--primary` (solid ink) / `--ghost` (nav link) / `--danger` / `--warning` (the ochre plate — spends the view's accent ration) / `--active` (held down) / `--sm` / `--xs` / `--lg` / `--block` / `--icon` |
| Badges | `.mk-badge` (ticket stub) + `--accent` / `--success` (solid ink) / `--warning` / `--danger` / `--sm` / `--dot` |
| Forms | `.mk-field` (`> label`, `__help`, `__error`, `--error`), `.mk-input`, `.mk-select`, `.mk-textarea`, `.mk-fieldset`, `.mk-choice`, `.mk-checkbox` (stamped X), `.mk-radio` (the one round control), `.mk-switch` (stage lever) |
| Surfaces | `.mk-card` (a PANEL: 2px ink rule; `--sunken` = quiet hairline / `--flush`), `.mk-table` (the ledger; `.mk-table-wrap`, `__num`), `.mk-divider` (printed rules: `--double` / `--double-thin` / `--thick` / `--dash` / `--accent` / `--label`), `.mk-disclosure` (programme notes; `__body`) |
| Chrome | `.mk-appbar` (ruled nav rail — **not sticky**; `--bottom`), `.mk-shell` (`__main`) |
| Overlays | `.mk-dialog` (native `<dialog>` playbill: `__title`, `__actions`, scrim via `::backdrop`), `.mk-toast` (telegram slip: `--success` / `--warning` / `--danger`; fixed bottom-center, one at a time), `.mk-tabs` (departments on a rule; `__tab`; selected via `aria-selected` / `aria-current` / `--active`) |
| Feedback | `.mk-alert` (notice from the management: `__title`, `--info` / `--success` / `--warning` / `--danger`), `.mk-spinner` (typing dots — there are no spinners), `.mk-progress` (ledger bar; `--sm`, `:indeterminate` hatch-march), `.mk-empty` (the dashed tile: `__title` / `__message` / `__action`) |
| Media | `.mk-thumb` (framed art: ink rule + mat + letterpress offset; `--square` / `--video`, `__fallback`), `.mk-skeleton` (dashed slot, no shimmer; `--text`), `.mk-figure` |
| Prose | `.mk-prose` (Goudy long-form at 70ch: lists, typewriter code, ruled pull-quote, kbd) |
| Motion | `.mk-iris-in`, `.mk-curtain-in`, `.mk-settle-in`, `.mk-drop-in`, `.mk-stamp-in`, `.mk-typeline`, `.mk-flicker` (the one idle loop, once per page), `.mk-bill-order` (stagger parent) |
| Utilities | `.mk-icon` (`--sm` / `--lg`), `.mk-link-reset` |

The full live catalog with rendered examples is the docs site (`/ui/components/*`).

## House rules that shape usage

- **One mode.** There is no dark mode; the sheet-on-stage is the mode. No theme
  switcher, no `[data-theme]`.
- **The ochre ration.** One accent spot per view: a `--warning` button, an
  error message, a focus ring, OR a lever's ON state — never several.
- **Rules mean things.** 4px double = major break, 3px double = footer, 2px =
  department/box, 1px tan = minor, 1px dashed = not printed yet. Pick the rule
  for the meaning, not the look.
- **Copy is playbill.** "SOLD OUT" for disabled, "No. 2 — coming soon" for
  empty, "a note for the management" for alerts. ALL CAPS lives in typewriter
  utility text; Rye and heading caps are written in the markup, never
  `text-transform`.
- **Motion is an event.** Entrances only; nothing on scroll or hover; the only
  loops are the typing dots, the progress hatch, and one marquee flicker.

## Recipes

### The page

```html
<body>
  <div class="mk-stage">
    <div class="mk-sheet">
      <h1>Gholson&rsquo;s Follies</h1>
      <hr class="mk-divider mk-divider--double" />
      …
    </div>
  </div>
</body>
```

### Loading / async states

Server-rendered apps need none of these. When you add client interactivity, the
waiting vocabulary is already here — no build step:

- **`.mk-spinner`** — typewriter typing dots (". . ." struck one at a time).
  Never a wheel.
- **`.mk-progress`** (`--sm`) — ink fill in a ruled trough; drop the `value`
  attribute for the marching-hatch indeterminate state.
- **`.mk-skeleton`** / **`--text`** — dashed "not printed yet" slots. No shimmer.

### Native inputs that need no theming

`type="number"`, `type="search"`, `type="date"`, and `<input list>` +
`<datalist>` autocomplete all work as plain `.mk-input` today. The native spinner
and the datalist dropdown are **browser chrome — un-styleable cross-browser by
spec** — so there is no `.mk-stepper` or `.mk-combobox`. A richer styled combobox
would be a future `@sethmakes/components` element, not a CSS class.

## SSR

Zero JS means every class renders correctly server-side with no hydration. Nothing
here waits on the client.

## Versioning

Lockstep with [`@sethmakes/tokens`](../tokens) and `@sethmakes/components`. Pre-1.0:
`0.x`, minor = breaking. Any class rename ships a changeset and a changelog entry —
the changelog is the migration doc.
