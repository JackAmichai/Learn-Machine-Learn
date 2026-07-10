## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2024-07-10 - Close buttons missing ARIA labels
**Learning:** Found an accessibility issue pattern where "×" close buttons in custom modals lack ARIA labels, making them invisible or unclear to screen readers.
**Action:** Always verify icon-only buttons have an `aria-label` or `aria-labelledby` property.
