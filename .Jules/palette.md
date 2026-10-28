## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2023-10-28 - Missing aria-labels on custom modal close buttons
**Learning:** In this codebase, interactive standard buttons (such as '×' for close) used within custom modal components (e.g. CodeExport) often lack `aria-label`s.
**Action:** When modifying or creating modals, explicitly ensure that icon-only buttons include an accessible name (e.g., `aria-label="Close modal"`) to ensure keyboard and screen reader accessibility.
