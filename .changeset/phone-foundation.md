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

Breaking: `.mk-btn--ghost` no longer sets `min-height: 0`. A ghost key keeps
the 44px target every other key guarantees, so ghost keys are taller and their
hairline sits lower. The toast is centred with `translate` instead of
`transform`, so an entrance class composes with it — consumers that overrode
the toast's `transform` must move to `translate`.
