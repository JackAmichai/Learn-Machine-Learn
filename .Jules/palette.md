## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-13 - Modal Dialog Semantics
**Learning:** Custom modals (like `CodeExport.jsx`) lacking `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` fail to trap screen reader focus conceptually or announce their purpose, severely hindering navigation for visually impaired users. Additionally, icon-only close buttons (like `×`) are unannounced without an `aria-label`.
**Action:** When auditing or building custom modals, always ensure the container has `role="dialog"`, `aria-modal="true"`, and an `aria-labelledby` linked to its title ID, and that all icon-only buttons have descriptive `aria-label` attributes.
