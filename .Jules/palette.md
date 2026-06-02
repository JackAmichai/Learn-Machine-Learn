## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2026-06-02 - Missing ARIA Labels on Icon-only Close Buttons
**Learning:** The application uses several icon-only close buttons (e.g., using the '×' character) in modals and dismissible components (like `CodeExport.jsx`) that lack `aria-label` attributes, making them inaccessible to screen readers.
**Action:** When implementing or modifying close buttons, always ensure an `aria-label` (e.g., `aria-label="Close modal"`) is provided, and consider wrapping the text icon in `<span aria-hidden="true">`.
