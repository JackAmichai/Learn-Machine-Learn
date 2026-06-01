## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Custom Modal Accessibility
**Learning:** Custom modals (like `CodeExport.jsx`) lack proper accessibility semantics (missing `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`). Also, text-character icons (like '×' for closing) are often used without `aria-label`s or `aria-hidden` spans, breaking the experience for screen readers.
**Action:** When auditing or implementing custom modals, ensure the modal container has `role="dialog"`, `aria-modal="true"`, and an `aria-labelledby` linked to its title's ID. Ensure text-character icons are wrapped in `<span aria-hidden="true">` with an `aria-label` on the interactive parent.
