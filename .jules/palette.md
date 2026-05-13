## 2024-05-13 - Modal Dialog Semantics
**Learning:** Custom modals (like `CodeExport`) often lack proper WAI-ARIA structural roles out of the box, making them invisible or confusing to screen readers.
**Action:** When creating or auditing a custom modal, ensure the container has `role="dialog"`, `aria-modal="true"`, and is linked to its title via `aria-labelledby`. Also ensure any close buttons with icon-only characters (like '×') use `aria-label` and `aria-hidden="true"` on the character itself.
