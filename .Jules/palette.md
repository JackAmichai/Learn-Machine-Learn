## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Missing ARIA Labels on Icon Buttons
**Learning:** Icon-only buttons (like `×` for close actions) are often implemented without `aria-label`s in complex modals, leading to poor screen reader experiences where the button's purpose is not announced.
**Action:** Always verify that buttons containing only symbols or icons have an explicit `aria-label` attribute describing their action (e.g., `aria-label="Close modal"`).
