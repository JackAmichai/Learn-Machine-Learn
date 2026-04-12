## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-02-12 - Theme Toggle Accessibility
**Learning:** Icon-only toggle buttons (like `ThemeToggle`) using dynamic `aria-label`s ('☀️'/'🌙' or 'Toggle Theme') can be confusing. Screen readers announce the label change but not the state.
**Action:** Use a static `aria-label` describing the feature (e.g., 'Dark Theme') and a dynamic `aria-pressed` attribute to properly communicate the active/inactive state to screen readers.
