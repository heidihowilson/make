# sethmakes-art

The deterministic generative-art pipeline for the Vaudeville brand (*Gholson's
Follies*). Every brand asset — strips, site headers, avatars, stickers, hero
scenes — is generated through ComfyUI from **version-controlled recipes**, so a
render can be reproduced, re-rolled deliberately, or re-generated at a new size
without re-inventing the prompt.

Not published to npm. This is a tool directory, not a package: prompt blocks,
recipe files, and reference material.

## The doctrine (read `docs/GENERATIVE-ART.md` first)

- **The cast is the unit of value.** The registry at
  `https://cast.sethgholson.com/cast.json` carries each character's turnaround
  sheet (`sheet_url`, for reference conditioning) and verbatim prompt `tokens`.
  Renderers read the registry at render time — character descriptions are never
  copied into recipes.
- **The style block is shared and never varied per render.** Vary **staging**
  and **camera** only. `prompts/style-block.txt` is prepended verbatim to every
  panel prompt; `prompts/exclusion-block.txt` is appended verbatim (exclusions
  are stated positively — FLUX-family models ignore negative prompts).
- **Identity is two halves:** the sheet as reference conditioning AND the tokens
  in the prompt. Dropping either one measurably breaks a character.
- Per-character traps live in the registry's `notes` — obey them (no "robot"
  for Wilson, the cap reads FEW, the monocle is part of Cadbury, Seth has no
  hoodie).
- The day job is never named or identifiable in art, sample renders, or mock
  content.

## Recipes

A recipe is one YAML file in `recipes/`, named `<asset>.yaml`. It pins
everything that makes a render deterministic:

```yaml
# recipes/example.yaml — the shape, not a real recipe
asset: bill-portrait            # what this produces
output: 832x1024                # 8:9 → bill-page portrait crop
model: <checkpoint or API model, pinned by exact name/version>
seed: 91                        # fixed seed = reproducible; re-roll deliberately
steps: 30
cfg: 4.5
reference:
  characters: [wilson]          # sheet_url read from the registry at render time
  weight: 0.75
prompt:
  style: prompts/style-block.txt        # verbatim, never edited per recipe
  tokens: from-registry                 # each listed character's tokens, verbatim
  staging: >
    Wilson at a garden tap, filling a watering can labelled "CONFIG";
    warm afternoon footlights, curtain behind.
  camera: flat medium-wide, held        # one camera per strip — Schulz's fixed view
  exclusions: prompts/exclusion-block.txt  # verbatim, appended last
notes: >
  Re-rolls: prop lettering garbles ~1 in 3; keep the seed history below.
history:
  - { seed: 91, verdict: shipped }
```

Assembly order is always: **style block → character tokens → staging + camera →
exclusion block.** Diegetic lettering (words painted on props) goes in staging
with the exact string in quotes; balloons, captions and mastheads are
non-diegetic and are composited after generation, never prompted.

Run recipes against ComfyUI (local or Comfy Cloud); when a run ships, record
the seed and verdict in `history` so the recipe stays the provenance log.

## Layout

```
prompts/    style-block.txt · exclusion-block.txt   (locked; edits are design decisions → update docs/GENERATIVE-ART.md)
recipes/    one YAML per asset, seeds + history recorded
reference/  cast.sample.json (offline registry mock) · hero.png (the company at the footlights)
```
