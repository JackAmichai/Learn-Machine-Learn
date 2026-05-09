## 2024-05-09 - Absolute Positioned Elements over Scrollable Content
**Learning:** When adding absolute-positioned interactive elements (like a "Copy" button) over scrollable text or code blocks, the underlying content can flow beneath the element and become obscured. Semi-transparent backgrounds exacerbate readability issues.
**Action:** Always apply sufficient `padding-right` to the inner scrollable container (e.g., the `<pre>` tag) to create a safe zone for absolute-positioned elements, and use a solid background color for the interactive element to prevent text bleed-through.
