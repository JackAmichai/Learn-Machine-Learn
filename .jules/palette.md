## 2024-04-28 - Link Labels to Inputs explicitly

**Learning:** When labeling form controls (inputs, selects) where the `<label>` element wraps a `<Tooltip>` component rather than the input itself (e.g., in `Controls.jsx`), explicitly link the `<label>` to the control using matching `htmlFor` and `id` attributes to maintain screen reader accessibility. Forms without proper labels or error associations will fail a11y checks.

**Action:** Whenever using a `<label>` element containing nested components like `<Tooltip>`, ensure it has a `htmlFor` attribute that exactly matches the `id` of its corresponding form control (like `<input>`, `<select>`, etc.).
