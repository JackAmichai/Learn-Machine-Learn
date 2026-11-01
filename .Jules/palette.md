## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2024-05-24 - Interactive Modals Missing ARIA Labels
**Learning:** Found an accessibility issue pattern specific to this app's custom modal components (`CodeExport.jsx`, `MathModal.jsx`, etc.): the standard close buttons are implemented as icon-only (`×`) standard `<button>` tags but lack `aria-label` attributes.
**Action:** When working on custom modals or similar interactive components, actively verify that any icon-only actions (like close, expand, or delete) include explicit screen reader text (e.g., `aria-label="Close modal"`).
