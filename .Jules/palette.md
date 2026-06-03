## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2026-06-03 - Modal Close Button Accessibility
**Learning:** The '×' character used for modal close buttons is often announced confusingly by screen readers (e.g., 'times' or 'multiply') without surrounding context. Wrapping the text character in `<span aria-hidden="true">`, while adding an `aria-label` to the parent button, provides the correct semantic meaning without redundant announcements.
**Action:** Apply the `aria-hidden` span wrapping pattern to all icon-only textual close buttons, ensuring they have an `aria-label`.
