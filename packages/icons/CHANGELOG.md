# @sethmakes/icons

## 0.1.0

### Minor Changes

- d266adb: Add two domain brand aliases to the `mk` Iconify set: `mk--cart`
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

- 2d0c979: Initial release of `@sethmakes/icons` — the thin icon package for the sethmakes design
  language. Selection happens at the consumer's build via the Iconify ecosystem (Lucide
  primary, Phosphor for gaps, pinned). Ships 32 brand aliases as a custom Iconify set
  (prefix `mk`, e.g. `mk--watch`), a `from-json` recipe for the `@iconify/tailwind4`
  plugin, and a `sethmakes-icons` CLI that emits mask-CSS classes for non-Tailwind
  consumers. Versions independently of the tokens/css/components group.
