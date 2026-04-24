## 2024-05-23 - Accessibility of Scrollable Regions
**Learning:** Elements with `overflow: auto` or `overflow-x: auto` (like code blocks) can be focusable, but require appropriate keyboard accessibility. They must include `tabIndex={0}`, an appropriate `role` (like `region`), and an `aria-label` to give context to screen readers, allowing users to scroll them via the keyboard.
**Action:** When adding or updating scrollable regions such as `<div className="code-block">`, ensure they have `tabIndex={0}`, `role="region"`, and an appropriate `aria-label`.
