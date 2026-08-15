# Motion — the house animation language

The brand is a 1933 cartoon posed with rotoscoped weight, so motion follows the medium:
**twelve drawings a second, held on twos; real weight with one overshoot and a hard landing;
then a held frame.** In practice, every animation is stepped (`steps()`, ~83ms a frame), never
smoothly eased. A tween that glides reads as 2015 software; a tween that *snaps through poses*
reads as hand-drawn.

The silent-film theatre supplies the transition vocabulary: the **iris**, the **rising
curtain**, the **flickering marquee**, the **typewriter**, the **rubber stamp**. Reach for
those before inventing new movement.

## The three rules

1. **Stepped, never eased.** Use the `--mk-steps-3/5/8` tokens. The only smooth easing in the
   system is the 90ms button key-press (`--mk-ease-key`), which is mechanical, not animated.
2. **Weight, then hold.** Entrances anticipate or overshoot once (`.mk-settle-in`,
   `.mk-drop-in`), land hard, and hold the final frame. Nothing eases out to a crawl; nothing
   breathes.
3. **Motion is an event, not a state.** Animate: overlay entrances, telegram (toast) arrivals,
   alarm moments, and one art reveal per page. Never animate: scroll, hover, layout reflow,
   list reordering. Hover and state colour changes are **instant** — ink either is or isn't;
   a 160ms colour fade is exactly the modern smoothness the language exists to avoid. The page
   is paper; paper does not move.

## Where the components already apply this

The dialog drops in on 5 stepped frames with one bounce and its scrim cuts in on 3; the
toast rises on 3; the switch lever snaps in 2; progress fills on 3 and its indeterminate
hatch marches on stepped jumps; the spinner types its dots on 4. The button key-press is
the one smooth easing (90ms, mechanical). Everything else — every hover, focus and
checked-state colour — changes instantly.

## Pre-baked animations (`@sethmakes/css` src/motion.css)

| Class | What | Use for |
|---|---|---|
| `.mk-iris-in` | Silent-film iris (stepped clip circle) | Hero art, dialog art, page-level reveals |
| `.mk-curtain-in` | The curtain rises (stepped bottom-up wipe) | Hero frames, section reveals — once per page |
| `.mk-settle-in` | Rises 14px, overshoots 4px, lands | Panels, toasts, cards arriving |
| `.mk-drop-in` | Drops from above, bounces 3px, lands | Dialogs, dropdown panels |
| `.mk-stamp-in` | Scales 1.25→.97→1 like a rubber stamp | Badges, "SOLD OUT", alarm stubs |
| `.mk-typeline` | Left-to-right stepped reveal, 22 steps | One-line typewriter text (kickers, datelines) |
| `.mk-flicker` | Marquee bulb flicker, 3.2s loop | One announcement per page, maximum |
| `.mk-bill-order` | Staggers children by 2 frames each | A parent whose children carry an entrance class |

Timing tokens: `--mk-frame` (83ms), `--mk-dur-beat` (250ms), `--mk-dur-enter` (420ms),
`--mk-dur-reveal` (660ms), easings `--mk-steps-3/5/8`. Every entrance holds its last frame
(`both`); `.mk-flicker` is the one loop and holds nothing. All of them switch off under
`prefers-reduced-motion`.

## Designing NEW animations

Checklist — a new animation belongs in the system only if all six pass:

1. **Could a 1933 theatre or print shop produce it?** Curtains, irises, wipes, stamps, flip
   cards, ticker tape: yes. Blur, parallax, springs, morphs, glows: no.
2. **Is it stepped?** Author at 12fps: pick 3–8 poses, use `steps(n)`. If it needs 60fps to
   look right, it's the wrong idea.
3. **Does it carry weight?** One anticipation or one overshoot, then a hard landing. Symmetric
   ease-in-out is the floaty pose the style block exists to prevent.
4. **Does it end?** Runs once, holds the last frame. Loops are reserved for the marquee
   flicker, the typing dots, and the indeterminate progress hatch.
5. **Is it short?** 250–660ms. Longer belongs in the moving pictures, not the UI.
6. **Does it respect the ration?** One art reveal and one flicker per page, maximum. Two
   animated entrances in one viewport compete like two ochres.

Character/art animation (the strips, the cartoon feed) is a different medium with its own
pipeline — see [GENERATIVE-ART.md](./GENERATIVE-ART.md); these rules govern UI motion only.

## The boiling line — recorded, not yet shipped

The source system carries a "boiling line" technique (from `heidihowilson/tincan`,
`src/landing.ts`): three seeded `feTurbulence` + `feDisplacementMap` SVG filters (seeds
2/9/15, scale 3/4/2, baseFrequency .02) snapped through on `steps(1)` at .55s, so display
ink redraws itself like a pencil test shot on twos. It needs a JS injector for the filter
bank, so it belongs in `@sethmakes/components` — the empty package's designated kind of
work — the day a real consumer wants it. Its rules, recorded now so they ship with it:
display ink and framed art only (never body text, never below ~30px type); ONE boiling
element per page, sharing the idle-loop ration with the marquee flicker; disabled under
`prefers-reduced-motion`; light-DOM elements only (`url(#filter)` does not reliably cross
shadow boundaries). Deliberately not taken from tincan: perpetual character idle loops —
constant motion reads as web whimsy; the boil passes because it is texture, not movement.
