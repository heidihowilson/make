---
"@sethmakes/icons": minor
---

Add two domain brand aliases to the `mk` Iconify set: `mk--cart`
(lucide `shopping-cart`, for a groceries/shopping list) and
`mk--lightbulb` (lucide `lightbulb`, for an idea / "what to make"
suggestion surface). These close the only two glyph gaps surfaced by the
`eat` readiness pass — its two domain-iconic tabs (groceries, meal ideas)
had no alias. One source line each, resolved through the existing
build; no JS, no new source set, no design-language impact.

Note: this readiness pass touched only `@sethmakes/icons`. The `mk-icon`
helper and `--mk-icon-*` tokens that render these aliases already shipped
(see the `icon-tokens` changeset), so `@sethmakes/tokens` /
`@sethmakes/css` need no version bump here.
