---
"@sethmakes/tokens": patch
"@sethmakes/css": patch
---

Sepia WCAG pass (closes the open contrast item): muted TEXT now uses a new
darker `--mk-faded-ink` (#685d45, ≥4.5:1 on sheet and inset) while raw faded
`#8f8066` stays for line-work (ghost rules, dashed slots); link ink deepens
`#8a5a1f` → `#7a4e15` to clear 4.5:1; links in running text (`p`, `li`,
`figcaption`, `blockquote`) carry a printed underline so they never rely on
colour alone.
