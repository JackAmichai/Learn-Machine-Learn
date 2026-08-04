## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2024-08-04 - Adding ARIA labels to close buttons in Modals
**Learning:** Icon-only close buttons (like the `×` character) in modals such as `CodeExport.jsx` lack screen reader context, being announced merely as "times".
**Action:** Always ensure that icon-only buttons include an `aria-label` attribute (e.g., `aria-label="Close modal"`) to provide necessary context to assistive technologies.
