## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2026-02-13 - Keyboard Accessibility for Visual Formulas
**Learning:** Interactive visual elements (like formula parts) can be made accessible quickly by adding `tabIndex={0}`, `role="button"`, and mapping `onFocus` to the same handler as `onMouseEnter`.
**Action:** Use `React.useId` to generate unique IDs for aria-describedby tooltips within loops, ensuring screen readers can announce the context without complex DOM traversals.
