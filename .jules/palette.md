# Palette's Journal

## 2024-03-24 - First Entry
**Learning:** Documenting critical UX and accessibility learnings.
**Action:** Always document significant UX discoveries and a11y patterns.

## 2025-03-18 - Tooltip ARIA attributes
**Learning:** Custom tooltips that use `role="button"` for interaction but function like toggles or expandables need `aria-expanded` to communicate their state to screen readers, and `aria-label` to give the button an accessible name if the text content alone is not sufficient (like providing the dictionary definition or just the word).
**Action:** Always ensure custom interactive elements like tooltips have proper ARIA attributes for state and labelling.
