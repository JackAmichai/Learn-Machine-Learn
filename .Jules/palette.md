## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Nested Tooltips and Icon Triggers
**Learning:** Nesting interactive tooltips inside buttons creates invalid HTML and accessibility issues. Using a dedicated icon (like ℹ️) as a trigger next to the label is a cleaner pattern.
**Action:** Use the new `children` prop in `Tooltip` to render custom triggers (icons) and place them adjacent to headings or labels instead of inside buttons.
