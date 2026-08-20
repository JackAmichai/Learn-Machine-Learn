## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-13 - CodeExport Modal Accessibility
**Learning:** Standard modal implementations (like `CodeExport.jsx`) in this application frequently omit critical dialog and tab semantics (e.g., `role="dialog"`, `role="tablist"`), relying instead on visual-only CSS active states, which creates significant barriers for screen reader users when interacting with generated code snippets.
**Action:** When implementing or refactoring modals or tabbed interfaces, ensure the container has `role="dialog"` with `aria-labelledby`, the tab container has `role="tablist"`, and individual tabs have `role="tab"` with `aria-selected` tracking the active state.
