## 2023-10-27 - Missing Input Labels in Unlabeled Forms
**Learning:** Found that quick inline feedback forms often omit explicit `<label>` elements entirely, relying only on `placeholder` attributes which screen readers do not always announce clearly.
**Action:** Always check form elements that use placeholder text instead of visual labels and ensure an explicit `aria-label` is provided for screen reader support.
