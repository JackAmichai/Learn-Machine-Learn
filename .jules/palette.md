## 2024-03-27 - ARIA toggle button accessibility
**Learning:** For icon-only toggle buttons, dynamically changing the `aria-label` is less semantic than providing a static `aria-label` describing the feature and a dynamic `aria-pressed` attribute to communicate the current state to screen readers.
**Action:** Always use `aria-pressed` for toggle buttons and ensure `aria-label` is static if there's no visible text.
