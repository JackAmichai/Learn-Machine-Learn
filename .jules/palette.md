## 2024-05-18 - Explicit Form Label Association

**Learning:** When using components like tooltips inside `<label>` elements, screen readers often fail to implicitly associate the label text with the form input. Relying solely on `aria-label` inside the input is acceptable but explicitly linking `<label htmlFor="...">` to the `<input id="...">` is a more robust accessibility pattern that also allows mouse users to click the label to focus the input.
**Action:** Always verify that `<label>` elements have a matching `htmlFor` attribute linking them to the `id` of their target form controls, especially when the label text is wrapped in a custom component like a Tooltip.
