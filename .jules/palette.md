## 2024-06-25 - Link Form Controls to Labels for Accessibility
**Learning:** When labeling form controls (inputs, selects) where the `<label>` element wraps a `<Tooltip>` component rather than the input itself, screen readers may fail to associate the label with the input.
**Action:** Explicitly link the `<label>` to the control using matching `htmlFor` and `id` attributes to maintain screen reader accessibility.
