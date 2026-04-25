## 2024-10-27 - Code Block Accessibility & Copy
**Learning:** Scrollable code blocks without `tabIndex` are inaccessible to keyboard users. When adding absolute-positioned elements (like a "Copy" button) to text containers, they can overlap text if padding isn't properly adjusted.
**Action:** Always add `tabIndex={0}`, `role="region"`, and an `aria-label` to scrollable content like `<pre>` or `<div overflow-auto>`. Use `padding-right` on text containers matching the width of absolute-positioned floating buttons, and ensure the button background is solid to prevent visual clash.
