---
"@sethmakes/tokens": patch
"@sethmakes/css": patch
---

Overlay trio: .mk-toast (fixed bottom-center transient, one at a time, status variants), .mk-tabs (segmented row, selection via aria-selected/aria-current/--active), .mk-dialog (native dialog styling + --mk-color-scrim backdrop token). All three promoted from hand-rolled consumer/docs implementations; CSS-only, apps bring the one-line JS.
