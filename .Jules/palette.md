## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2024-05-24 - Nested Tooltip Accessibility
**Learning:** Tooltip components (which are interactive) placed directly inside `<label>` elements create invalid HTML and break focus/screen reader behavior for associated inputs.
**Action:** Replace the `<label>` wrapping the `Tooltip` with a generic container like `<div>` and use `aria-label` directly on the `<input>` or `<select>` to ensure proper accessibility association.
