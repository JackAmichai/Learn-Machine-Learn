## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Missing aria-label on close buttons
**Learning:** CodeExport component contains an icon-only button (the "×" close button) that lacks an `aria-label`, making it completely invisible to screen readers, which will just read "times" or "button".
**Action:** Always add descriptive `aria-label`s to icon-only buttons like close buttons.
