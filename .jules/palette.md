## 2024-04-05 - Form Control Labels with Nested Tooltips

**Learning:** When `<label>` elements wrap interactive components like `<Tooltip>` rather than the form control itself, the implicit label association is broken for screen readers. Simply adding an `aria-label` to the input is often insufficient for robust accessibility compared to an explicitly linked `<label>`.

**Action:** Always explicitly link disconnected or complex `<label>` elements to their corresponding `<input>` or `<select>` controls using matching `htmlFor` and `id` attributes.
