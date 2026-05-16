
## 2024-05-16 - Code block copy button and modal accessibility
**Learning:** For custom modals, explicitly providing `role="dialog"`, `aria-modal="true"`, and linking a visible title via `aria-labelledby` ensures screen readers announce the dialog context correctly rather than treating it as a generic div. Adding an absolute positioned action button inside a scrolling text area (like a `<pre>` block) requires adding `padding-right` to the container to ensure text does not overflow underneath the button and become unreadable.
**Action:** Always implement ARIA dialog patterns on custom modal components and verify absolute positioned floating UI elements have corresponding padding in their parent containers to prevent obscuring content.
