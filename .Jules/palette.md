## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-05-26 - Icon-only buttons with text characters
**Learning:** Using literal text characters like '×' for icon-only buttons causes screen readers to read the literal character name ("multiplication sign") rather than the intended action.
**Action:** Always wrap text character icons in `<span aria-hidden="true">` and add an `aria-label` to the parent `<button>` to ensure proper semantics for screen readers.
