## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Label Nesting Patterns
**Learning:** When labeling form controls where the `<label>` element wraps a custom `<Tooltip>` component rather than text directly, implicit labeling fails. Screen readers require explicit `htmlFor` and `id` linking to associate the label with the input.
**Action:** Always use explicit `htmlFor` and `id` pairs when a label contains interactive or custom components like tooltips to maintain screen reader accessibility.
