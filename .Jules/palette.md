## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Missing Accessible Names on Modal Close Buttons
**Learning:** Custom modal components in this codebase (like `CodeExport`) frequently omit `aria-label`s on their generic "×" close buttons, rendering them inaccessible to screen readers.
**Action:** Always verify icon-only standard buttons within newly created or modified modals explicitly provide an `aria-label` (e.g., `aria-label="Close modal"`).
