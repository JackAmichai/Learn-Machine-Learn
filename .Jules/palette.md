## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2026-06-05 - CodeExport Modal Accessibility
**Learning:** The CodeExport modal was missing basic ARIA dialog roles (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) and its close button lacked an `aria-label`, rendering it inaccessible to screen readers. This is a common pattern for custom modals.
**Action:** When creating or reviewing custom modals, always ensure they are properly Semantically labeled as dialogs and that icon-only buttons (like '×') have descriptive `aria-label` attributes.
