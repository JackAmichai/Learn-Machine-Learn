## 2024-05-24 - Accessible Icon-Only Toggles
**Learning:** For icon-only toggle buttons (like ThemeToggle), using a static `aria-label` describing the feature (e.g., 'Dark Theme') and a dynamic `aria-pressed` attribute is better than dynamically changing the `aria-label` to communicate state to screen readers.
**Action:** Always use `aria-pressed` for two-state toggles rather than changing their accessible name.
