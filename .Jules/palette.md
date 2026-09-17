## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-02-12 - Fixed invalid HTML nesting for tooltips
**Learning:** Tooltip components placed inside interactive elements (like `button`) cause invalid HTML nesting (button inside button), causing screen reader and accessibility issues.
**Action:** Extract the Tooltip component from its parent element and use CSS flexbox layout on a wrapper container to visually present them together without nesting interactive roles.
