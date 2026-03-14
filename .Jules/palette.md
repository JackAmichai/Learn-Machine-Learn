## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2024-03-14 - ARIA Tab Patterns for Modal Navigations
**Learning:** Custom tab interfaces, such as the language selection in `CodeExport.jsx`, often use `<button>` elements that visually look like tabs but are announced incorrectly by screen readers if they lack standard ARIA tab properties.
**Action:** Always apply `role="tablist"` to the tab container, `role="tab"` to each tab button, and explicitly manage `aria-selected="true"` or `aria-selected="false"` based on active state to ensure valid and accessible tab navigation patterns.
