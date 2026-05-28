## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-05-28 - Custom Modal Dialog Semantics
**Learning:** Custom React modals (like `CodeExport`) frequently omit the necessary `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` attributes, making them opaque to screen readers which fail to trap virtual focus or announce the modal's purpose.
**Action:** When implementing or auditing any floating overlay or modal component, always verify the presence of these three core ARIA dialog attributes and ensure the close button is explicitly labeled while hiding visual decorative characters like '×'.
