## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-02-12 - CodeExport Accessibility
**Learning:** The `CodeExport` close button lacked an `aria-label`, leaving screen readers without context for the action it performs.
**Action:** Always ensure close buttons (`×`) have clear `aria-label`s like `"Close modal"` or `"Close export code modal"`.
