## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-06-09 - CodeExport Tooltip Refactor
**Learning:** In React components with conditional rendering (like `CodeExport`), adding CSS classes to a `<style>` block inside the conditionally rendered output means those styles will not apply to the initial, unmounted state.
**Action:** When adding styles for elements visible before conditional rendering (like trigger buttons), ensure the `<style>` block is placed outside the conditional logic or within a parent component that is always rendered.
