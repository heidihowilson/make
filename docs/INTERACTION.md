# Interaction — the overlay policy

The metaphor is print, not screen. A printed page carries no chrome that hovers above it.
Every overlay in this language is therefore an **exception**, and this file is where an
exception must be argued before the CSS ships. The standing rule, quotably:
**nothing is fixed or sticky; the page scrolls like paper.**

[VISION.md](./VISION.md) promised this document when the overlay work started. The work
started with the phone consumer (Ready Up, 2026-09-05), so here it is.

## The standing rule

Nothing in `@sethmakes/css` pins itself to the viewport. Three shipped consequences show what
the rule costs and what it buys:

- **`.mk-appbar` is `position: static`** (`packages/css/src/appbar.css`). The masthead scrolls
  away with the paper. The old sticky translucent bar was retired with the terminal language.
- **`.mk-appbar--bottom` is a colophon, not a tab bar.** A paper's colophon lives at the end of
  the paper. `.mk-shell` gives the document a full-height column so the rail sits at the foot
  of a short page — the rail itself never pins.
- **`.mk-sheet` carries the one deep shadow** (`--mk-shadow-sheet`), once per page. Panels
  inside it take the hard letterpress offset. Nothing gets a second drop, because a second
  drop is a second floating plane.

**Enforcement:** a `position: fixed` or `position: sticky` declaration in `@sethmakes/css` is
a review failure unless this file names the element. Two elements are named below.

## The two sanctioned fixed elements

| Element | What earns the exception | What it may not do |
|---|---|---|
| `.mk-toast` — the telegram | It is an **event arriving**, not chrome. A telegram is a slip handed over the page, not part of the page. The consumer's timer bounds it in time, and there is only ever one | Persist, stack, carry an action, or narrate state |
| `.mk-dialog--sheet` — the phone's bottom sheet | A phone has no visible paper behind a centred dialog. The bottom edge gives the overlay a **place** instead of a float. The argument is written in full below, and the CSS bounds it at `740px` | Appear as page furniture, stay open across a navigation, carry a second sheet, or take the bottom edge above 740px — unless the app is a bill, which `--bill` states |

### The telegram toast

A toast is an event, not chrome, so it is not a violation of the standing rule — it is outside
the rule's subject. The page below it is unchanged and un-dimmed. A new message replaces the
old one; telegrams never stack. The toast carries no action, because a slip handed to you is
not a place to make a decision. The consumer owns the timer and the paired
`role="status"` live region: announce in text, decorate in pixels.

### The bottom sheet — the argument

Do not assert this exception. Argue it, in this order.

1. **A dialog is a small sheet lifted off the stage.** On a desktop page there is paper behind
   it. The reader sees the printed page dimmed by the scrim, so a centred playbill reads
   correctly: a second sheet laid on the first.
2. **On a phone that paper is gone.** The column is 358px wide and the dialog is nearly the
   whole viewport. Nothing of the page remains visible around it. A centred dialog on a phone
   is a rectangle floating on a dark field — the exact soft-UI pose the language rejects.
3. **The bottom edge is the only edge a thumb can reach**, and it is the edge the reader pulls
   the sheet back down to. Anchoring there gives the overlay a *place* rather than a *float*.
   The sheet is a second sheet slid in from under the first, not one hovering over it.
4. **The letterpress precedent.** A sheet slid part way out of a folder still shows the sheet
   beneath it. The 2px ink rule along the top of the sheet, and the exposed scrim above it,
   draw exactly that overlap.
5. **The exception is bounded, and the bound is in the CSS.** The sheet is still a native
   `<dialog>`, still opened with `showModal()`, still one at a time, and it still cannot spawn
   another. Only the placement changed — and the placement lives inside `@media (max-width:
   740px)`, the language's own reflow breakpoint. Above 740px the modifier does nothing.

The sheet is granted its exception on the phone's terms. A desktop consumer keeps the centred
playbill; `.mk-dialog--sheet` is the phone form of the same element, not a second component.
The consumer leaves the class on the element at every width and the breakpoint decides, so an
argument made on the phone's terms cannot ship a full-width bar welded to a desktop viewport.

### Sheet below, modal above — the default, and the one thing that suspends it

**This is the paradigm, and the library enforces it.** One class on one element. Below 740px it
is a sheet from the footlights; above 740px it is the centred playbill. A consumer does not
choose, does not configure it, and does not write a breakpoint. Every overlay across every
`sethmakes` consumer therefore behaves the same way, which is the point of having a language.

The rule tests the viewport. The *argument* is about the **ground** — a sheet is right when no
paper is visible around the overlay — and for most apps the viewport is a fair proxy for the
ground, because a wide window means a wide page.

It is not a fair proxy for one shape of app: the **bill**. An app whose own column stays
phone-width at every window size (a 430px centred measure, say) has no paper behind its
overlay at 1920px either. The viewport test fires wrong for exactly the app the exception was
written for. A container query cannot rescue it: a modal `<dialog>` lives in the top layer, so
its containing block is the viewport and it never sees the app's column.

So the escape is **named, declared once, and narrow**:

```html
<dialog class="mk-dialog mk-dialog--sheet mk-dialog--bill">
```

```css
.app { --mk-dialog-bill-width: 430px; }
```

`--bill` keeps the bottom edge, the handle and the rise at every width, bounded to the bill's
measure and centred over it. The side rules come back, because a bill has paper either side.

**A consumer may take this only if its own column stays phone-width on a wide screen.** That
is the whole condition, and it is checkable: if the app has a desktop layout, it does not
qualify. A broadsheet app that adds `--bill` gets a bar welded to the bottom of a wide window,
which is the unplaced float step 3 forbids — the modifier does not make that legal, it just
stops defending against it.

Everything else keeps the default. Do not add a second escape; if a third consumer needs one,
the paradigm is wrong and this section should be rewritten rather than extended.

## A modal never spawns a modal

[VISION.md](./VISION.md) states the rule: **a modal never spawns a modal; it morphs or queues.**
The rule is useless without the alternatives, so here they are. There are three.

1. **It morphs.** The sheet already on stage replaces its own body. The same `<dialog>` element
   stays open and the consumer swaps the contents. The entrance does not replay — a sheet
   already on stage does not enter again.
2. **It queues.** The first overlay closes, then the second opens. They never overlap.
3. **It becomes an in-flow confirm.** This is the preferred answer for a destructive step
   raised from inside a sheet. A "last call" is a **sentence in the sheet**, not a new stage.
   The keys sit under the sentence that raised them.

## The in-flow confirm — the sanctioned shape

```html
<div class="mk-alert mk-alert--danger mk-settle-in" role="group" aria-labelledby="lastcall">
  <span class="mk-alert__title" id="lastcall">Last call</span>
  <span>Strike the squad? Two hundred four performances of flannel come down with it.</span>
  <div class="mk-alert__actions">
    <button class="mk-btn mk-btn--sm" type="button">Keep it</button>
    <button class="mk-btn mk-btn--sm mk-btn--danger" type="button">Strike it</button>
  </div>
</div>
```

Six rules govern the pattern.

1. Use `.mk-alert .mk-alert--danger` with `.mk-alert__actions`. The confirm is a **danger**
   notice only. A success alert prints on solid ink, and a key dropped into it reads as a hole
   punched in the ink block.
2. Reveal the alert with `.mk-settle-in`. A panel arrives; it does not drop. `.mk-drop-in` is
   the telegram's entrance.
3. Put `role="group"` and `aria-labelledby` on the alert, pointing at the `.mk-alert__title`.
   Do not use `role="alert"`. A live region announces its contents before the reader can reach
   the keys inside it.
4. Move the focus to the safe key when the confirm appears. The safe key comes first in the DOM.
5. Give the destructive key `.mk-btn--danger`. The safe key stays a plain `.mk-btn`. Never make
   the destructive key the primary plate.
6. Write the copy in the playbill voice. "LAST CALL" is the title, "Strike the squad?" is the
   sentence, "KEEP IT" and "STRIKE IT" are the keys. Never "Are you sure?".

## The stacking order

`--mk-layer-chrome` (100) < `--mk-layer-overlay` (200) < `--mk-layer-toast` (300), from
`@sethmakes/tokens`. Two facts about them:

- A native `<dialog>` opened with `showModal()` sits in the browser's top layer. It needs no
  `z-index` at all, and the library gives it none.
- The layer tokens exist for the **consumer's** own chrome. Nothing in `@sethmakes/css` types
  a raw `z-index`, and neither should a consumer.

## What the platform gives you, and what stays in the consumer

| Owner | Responsibility |
|---|---|
| The platform | The focus trap, `Esc`, inertness of the page behind, the top layer, and the `::backdrop` — all from `showModal()` |
| The library | The look and the placement. Nothing else |
| The consumer | The toast timer, the `showModal()` call, **the gesture engine for the sheet**, and the iOS body-scroll lock |

Say this plainly: CSS cannot stop iOS Safari from scrolling the document behind a modal.
`overscroll-behavior: contain` on `.mk-dialog__body` stops the scroll chaining out of the
sheet, and it stops nothing else. The body lock is the consumer's one line of JS.

## Designing a new overlay

A new overlay belongs in the system only if all six answers are good.

1. **Could the page carry this in flow instead?** If yes, it is not an overlay.
2. **Does it have a place, or does it float?** A place is an edge. A float is a taste.
3. **Is it one at a time?**
4. **Does it come from an action the reader took?**
5. **Can the reader close it with `Esc` and with a key a thumb can reach?**
6. **Does it need a written exception in this file?** If yes, write the exception here before
   you write the CSS.

The motion side of the language has its own doctrine in [MOTION.md](./MOTION.md); the visual
decisions live in [DESIGN-LANGUAGE.md](./DESIGN-LANGUAGE.md).
