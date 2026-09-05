---
"@sethmakes/tokens": minor
"@sethmakes/css": minor
---

**The phone foundation.** The device edges are tokens now — `--mk-safe-top`,
`--mk-safe-right`, `--mk-safe-bottom`, `--mk-safe-left` (zero on every screen
but a phone) and `--mk-thumb-zone` — and the app bar and the telegram read
them instead of typing `env()` again. `.mk-appbar--bottom` really is
safe-area padded now; the cheatsheet said so, the CSS did not.

New: `.mk-btn--xl` (the 56px hero key, in new `--mk-size-mono-lg` caps),
`.mk-btn--hold` + `.mk-btn__hint` (press and hold: a typewriter hint line and
a three-frame stepped fill on `:active` / `[data-holding]`, clocked by the new
`--mk-dur-hold` — the one gesture the motion doctrine lets move while it
happens), `.mk-btn__mark` (+ `--lit`), `.mk-stamp` (+ `--danger`, the
rubber-stamp verdict, positioned by its parent), `.mk-toast--top`,
`.mk-empty--strip`, `.mk-kicker--wire`.

The hold fill reads as a fill, on every plate: the STOP-red key fills with
ink rather than falling through to the paper default (a paper label on a
paper fill, 1.17:1, for the whole hold), and the fill's leading edge is a
printed 2px rule in `currentColor` rather than a tonal step — the boundary is
the information, and paper on paper measured 1.27:1. `.mk-btn--hold` also
switches off text selection, the callout menu and the tap flash, so the OS
long press stops cancelling the gesture. `.mk-btn__mark--lit` is scoped to
`.mk-btn--primary`: ochre clears the bar on the ink plate (4.52:1) and on no
paper plate (2.08–2.64:1).

`.mk-stage` carries `--mk-safe-left` / `--mk-safe-right`, so the sheet stops
printing under a rounded corner in landscape, and the telegram now ADDS its
28px to the inset instead of `max()`-ing against it — the inset is the
origin, the 28px is the gap.

Breaking: `.mk-btn--ghost` no longer sets `min-height: 0`. A ghost key keeps
the 44px target every other key guarantees, so ghost keys are taller and their
hairline sits lower. The toast is centred with `translate` instead of
`transform`, so an entrance class composes with it — consumers that overrode
the toast's `transform` must move to `translate`.
