## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2024-06-27 - Extracted Nested Tooltips from Labels
**Learning:** In the `Controls` component, `<Tooltip>` elements (which contain interactive elements/buttons like "See Math") were nested inside `<label>` elements. This creates invalid HTML since you cannot nest interactive controls inside a label, and it causes screen readers to misinterpret the label structure. Additionally, form inputs lacked `id` attributes that pair with the `htmlFor` attribute on labels.
**Action:** Always wrap the `<label>` and its associated `<Tooltip>` in a flex container (`<div>`) rather than nesting the tooltip inside the label. Ensure labels have `htmlFor` and inputs/selects have corresponding `id` attributes.
