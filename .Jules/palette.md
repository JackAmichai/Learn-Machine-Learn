## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2024-07-18 - Missing ARIA Labels on Range Inputs
**Learning:** Found that custom range input implementations within the interactive math visualizers lack associated `aria-label`s, rendering them largely inaccessible to screen reader users who use keyboard navigation to step through inputs.
**Action:** Always ensure that custom range inputs, even when visually grouped with nearby descriptive text or labels, have explicit `aria-label`s (or `aria-labelledby`) specifying their exact purpose.
