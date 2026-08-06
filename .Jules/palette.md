## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2024-03-24 - Code Export Close Button Accessibility
**Learning:** Modal close buttons rely heavily on the visual 'x' character but this provides no context to screen readers, creating an accessibility trap.
**Action:** Always verify icon-only buttons, even standard textual icons like '×', have an explicit `aria-label` providing context.
