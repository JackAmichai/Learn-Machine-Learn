## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-21 - Toggle State Accessibility
**Learning:** Visually active buttons (using `.active` classes) fail to communicate state to screen readers, making mode switches inaccessible.
**Action:** Use `aria-pressed={isActive}` on all button-based toggles to explicitly announce state changes.
