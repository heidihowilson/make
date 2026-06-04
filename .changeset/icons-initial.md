---
"@sethmakes/icons": minor
---

Initial release of `@sethmakes/icons` — the thin icon package for the sethmakes design
language. Selection happens at the consumer's build via the Iconify ecosystem (Lucide
primary, Phosphor for gaps, pinned). Ships 32 brand aliases as a custom Iconify set
(prefix `mk`, e.g. `mk--watch`), a `from-json` recipe for the `@iconify/tailwind4`
plugin, and a `sethmakes-icons` CLI that emits mask-CSS classes for non-Tailwind
consumers. Versions independently of the tokens/css/components group.
