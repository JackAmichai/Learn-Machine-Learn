## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Accessible Icon-Only Buttons
**Learning:** Icon-only buttons (like the close '×' in modals) must have explicit `aria-label`s and the literal text character should be hidden from screen readers (e.g., `<span aria-hidden="true">×</span>`) to prevent confusing announcements like "times" or "multiply".
**Action:** Audit all custom modals and dismissible components (like `CodeExport`, `MathModal`, `AccessibilityPanel`) to ensure close buttons are properly labelled and literal characters are hidden.
