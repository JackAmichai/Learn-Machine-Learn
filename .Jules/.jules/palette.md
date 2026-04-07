## 2024-03-24 - Accessible Toggle Buttons
**Learning:** For icon-only toggle buttons, using a dynamic aria-label to convey state is less effective for screen readers than using a static aria-label (e.g. 'Dark Theme') combined with a dynamic aria-pressed attribute.
**Action:** Always use aria-pressed for toggle buttons instead of changing their name.
