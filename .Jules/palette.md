## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-18 - Modal and Tab ARIA Patterns in CodeExport
**Learning:** The `CodeExport` component lacked proper ARIA attributes for its modal dialog and language selection tabs. Without `role="dialog"`, `aria-modal="true"`, and a well-defined tablist (`role="tablist"`, `role="tab"`, `aria-selected`), screen reader users receive insufficient context about the modal state and tab navigation structure.
**Action:** Applied standard W3C ARIA dialog and tab patterns. When creating new modals or tabbed interfaces, always ensure `role`, `aria-expanded` (for triggers), `aria-modal` (for dialogs), and state indicators (`aria-selected`) are explicitly managed and dynamically bound.
