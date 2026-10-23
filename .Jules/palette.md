## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-02-12 - Missing ARIA Labels on Icon-only Close Buttons
**Learning:** Icon-only buttons representing a close action (often using the "×" character) in custom modal components (like `CodeExport.jsx`, `MathModal.jsx`, etc.) frequently lack `aria-label` attributes, which creates confusion for screen reader users.
**Action:** When creating or modifying custom modals or popups, explicitly check for and add `aria-label="Close modal"` (or similar descriptive text) to any icon-only buttons.
