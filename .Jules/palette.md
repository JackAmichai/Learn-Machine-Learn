## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-03-03 - Tooltip valid HTML structure
**Learning:** Tooltip component in CodeExport.jsx was wrapped in a button which creates an invalid HTML structure and prevents correct focus management for screen readers.
**Action:** Use wrapper components like div with flexbox to group tooltip elements instead of nesting interactive components inside other interactive components.
