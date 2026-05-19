## 2024-05-24 - Code Block Copy Button Padding
**Learning:** When overlaying absolute-positioned UI elements (like a "Copy" button) inside a scrollable container (like a `<pre>` tag), the text content can wrap beneath the absolute element, making the code unreadable or frustrating to interact with.
**Action:** Always apply sufficient `padding-right` to the scrollable content container (e.g., `padding-right: 80px`) to reserve space for absolute-positioned floating elements in the top right.
