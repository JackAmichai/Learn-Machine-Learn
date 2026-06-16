## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Flex Container Approach for Sibling Tooltips
**Learning:** Extracting `Tooltip` components from within buttons and placing them adjacently can disrupt the visual full-width layout of panels like the playground side panel. Using a flex container (`display: flex; gap: 8px; width: 100%`) with the main button set to `flex: 1` successfully maintains the original design while fixing the invalid HTML accessibility violation.
**Action:** When un-nesting tooltips from full-width interactive controls, wrap both the control and tooltip in a 100% width flex container and set `flex: 1` on the control to ensure the UI design is perfectly preserved.
