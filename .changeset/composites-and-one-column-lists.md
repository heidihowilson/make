---
"@sethmakes/css": minor
---

Form composites and the ledger's two one-column relatives, all from Ready Up's
frames: `.mk-lever` (the switch's rail with the block free to travel — a styled
`input[type=range]`, WebKit and Firefox pseudo-elements both; its 20px rail is
a stated exception to the 44px target, alongside `.mk-btn--xs`); `.mk-dropslot`
(the dashed slot you submit materials to — the dashed rule already means
"nothing is printed here yet", and the real file input lies over the whole tile
so the picker opens with no JS); `.mk-input-group` / `__key` (keys struck flush
on a field's or a select's right rule, two of them, each keeping the 44px
target; the shared edge turns ochre with the field's focus and error rule);
`.mk-crop` / `__window` / `__hint` (the square crop bench — a framed
`.mk-thumb`, a MOVE · PINCH hint and a lever; the pinch/pan engine stays in
the app, and the window clips at the mat's inner edge so a zoom cannot paint
over the frame); `.mk-feed` (the dateline feed — carry `role="list"`) and
`.mk-steps` (the numbered walk-through, a
real `<ol>` whose counter prints "No. 1 ·").

Also stated, without shipping a class: a dashed `.mk-empty` tile is how you
stand in for browser-owned UI — the share sheet, the file picker, the install
prompt.

Minor, not patch: pre-1.0 the family bumps minor for new surface area.
