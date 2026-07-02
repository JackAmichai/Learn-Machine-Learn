## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-02-13 - Invalid Nesting with Tooltips
**Learning:** Tooltips should not be nested inside `<button>` elements as this creates invalid HTML (interactive content inside interactive content), breaking accessibility and keyboard navigation.
**Action:** When adding tooltips to buttons, wrap both the button and the tooltip in a container `div` instead of nesting the tooltip inside the button.
