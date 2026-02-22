## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-17 - Semantic Label Misuse
**Learning:** Using `<label>` to wrap non-interactive content (like tooltips) or for visual grouping without associating it with a form control creates accessibility violations and invalid HTML structure.
**Action:** Use `<span>` or `<div>` with appropriate classes for visual labels that don't map 1:1 to an input, and rely on `aria-label` on the input itself if the visual label is purely decorative or complex.
