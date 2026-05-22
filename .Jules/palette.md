## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Modal Stacking Contexts
**Learning:** Components using `backdrop-filter` (like `Controls.jsx`) create a new containing block, which traps `position: fixed` elements (like modals) inside the component instead of the viewport.
**Action:** Always use `createPortal` for modals to render them at the `document.body` level, ensuring they cover the entire screen and escape parent stacking contexts.
