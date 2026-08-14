# Generative art — prompt style guidelines

The cast is the unit of value. Comics, videos, site headers, avatars and stickers are all
*renderers* that consume the registry at `https://cast.sethgholson.com/cast.json`. This file is
the prompt-side style guide for those renderers, transcribed from
`style/vaudeville-1933.md` in `sethgho/the-cast@master` and kept in sync with it.

**Rule above all: the style block is shared and never varied per render. Vary staging and camera,
not style.** Varying it per panel is the fastest way to make a strip look like four unrelated
drawings.

## 1. STYLE_BLOCK — prepend verbatim to every panel prompt

```
A single panel from a 1933 newspaper comic strip, drawn in Fleischer-era rubber hose
cartoon style but posed with rotoscoped naturalism: believable weight, balance and
follow-through, as if traced from live vaudeville stage footage. Big simple rounded
cartoon forms with confident smooth ink outlines of even weight, large areas left open
with minimal interior rendering, shaded only with soft halftone dots. Printed in warm
sepia duotone on aged newsprint — muted grey-brown paper tone, soft foxing and age
spots, slightly uneven ink density. Theatrical stage lighting with simple deep cast
shadows. High contrast, period charm.
```

Two notes carried forward from the source, so nobody reintroduces them:

- The block once asked for "dense cross-hatching" and "vintage engraving sensibility". Those two
  phrases pulled Wilson and Cadbury into engraving-realism while Seth stayed cartoonish.
  **"shaded only with soft halftone dots" is the positive-phrasing replacement** — it excludes
  crosshatch without a negation.
- "Rotoscoped" here is a *posing* instruction, not a rendering one: rubber-hose designs posed with
  real weight, balance, follow-through, drag and contact shadows — not the floaty symmetrical
  poses generic "1930s cartoon" prompting produces.

## 2. EXCLUSION_BLOCK — append verbatim to every panel prompt

FLUX-family models ignore negative prompts entirely and Nano Banana treats them loosely, so
exclusions must be stated positively, inside the prompt:

```
The panel art fills the entire frame edge to edge with no border, no frame, no margin.
The image contains no speech balloons, no word balloons, no caption boxes, no narration
boxes, no title lettering, no signature and no watermark. Any writing that appears is
only lettering physically painted or printed on an object within the scene itself.
```

### Diegetic vs non-diegetic text

Do **not** blanket-ban text.

- **Diegetic** — words that exist as objects in the world: a mug lettered `CODE FUEL`, the cap
  lettered `FEW`, a scroll labelled `PR 3.5`, a CI board reading `GREEN`. These are props, and
  often the joke. Describe them explicitly in staging, with the exact string in quotes. Expect to
  re-roll a panel whose prop lettering comes out garbled — that's the cost of keeping the joke in
  the art.
- **Non-diegetic** — the comic's own furniture: balloons, caption boxes, panel borders, the
  masthead. These are **composited afterwards**. If the model draws one, the composited version
  lands on top of it and the panel is wasted.

## 3. Character tokens — both halves, always

Identity is two halves and dropping either one measurably breaks it:

1. **The sheet** (`sheet_url` from the registry) carries silhouette and costume — pass it as
   reference conditioning.
2. **The tokens** (`tokens`, verbatim) stop the model inventing a different design when reference
   conditioning runs weak — inject them into the prompt.

Never copy character descriptions into a style file; read them from the registry at render time.
`<vaud-tokens id="ake" style-block>` prints and copies exactly the string a prompt needs.

Per-character traps recorded in the registry's `notes` — obey them:

- **Seth** — no hoodie (retired design). The v-neck is spruce green so dark it reads nearly
  charcoal; the green only matters in colour renders.
- **Wilson** — never use the word "robot"; it primes a humanoid armature. He has no head, neck,
  torso or waist: *the fence panel is the body*. Eyes are simple cartoon ovals floating in the flat
  shadow under the hat brim — never realistic, never robotic.
- **Cadbury** — the brass clockwork monocle is part of him, not eyewear he holds. Always his right
  eye, always chained to the waistcoat pocket. Pencil moustache, not a full one. A faint warm brass
  tint on monocle and adding machine is accepted; do not spread it.
- **Ake** — the walrus moustache and buck teeth are the first things a text-only prompt loses, so
  always render him with reference conditioning. The cap reads `FEW` (never `SYSOP`). The sheets
  show no waterline; if a panel needs sloshing water, say so in staging.

## 4. Palette

Sepia duotone throughout. **Ake is the only warm accent — a muted ochre orange.** Everything else
stays in the grey-brown range. That single spot of colour is the strip's visual signature; do not
spread it to the other characters, and do not spread it around the UI either (see
[DESIGN-LANGUAGE.md](./DESIGN-LANGUAGE.md)).

## 5. What varies, and what a prompt looks like assembled

Vary exactly two things: **staging** (who is where, doing what, with which props, including exact
diegetic lettering) and **camera** (one camera per strip — hold it across all four panels;
Schulz's fixed view is house policy).

```
[STYLE_BLOCK]

[TOKENS for each character present, verbatim from cast.json]

Staging: Wilson stands at a garden tap, filling a watering can labelled "CONFIG";
Ake's wheeled fishbowl is parked beside him, the goldfish watching with alarm.
Camera: flat medium-wide, footlights below, curtain behind — held for all four panels.

[EXCLUSION_BLOCK]
```

## 6. House devices worth rendering

- **The water is the config.** Ake is a goldfish; an agent's config is the water it swims in. The
  junior move is tapping the glass; the senior move is changing the water.
- **Wilson is where it's figured out; Ake is where it ships.** The lab and production, drawn as two
  characters.
- **The disk is at ninety-one percent.** Nobody is taking this seriously.

## 7. Non-negotiables when generating for the brand line

The day job (Ethos), its vendors, clients and internal systems are never named or identifiable in
art or copy — generalise the incident and keep the shape. Zeitgeist-scale industry brands are fair
game. This applies to sample renders and mock content too.
