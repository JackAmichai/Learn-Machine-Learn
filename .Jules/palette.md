## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-02-12 - Missing ARIA Labels on Icon-only Modals
**Learning:** Icon-only utility buttons (e.g., '×' close buttons on modals like `CodeExport.jsx`) are frequently added without accompanying text or `aria-label`s, causing screen readers to just announce "button" with no context.
**Action:** When auditing or implementing new modals, always verify that structural/utility icon buttons explicitly define an `aria-label` describing their action (e.g., "Close export code modal").
