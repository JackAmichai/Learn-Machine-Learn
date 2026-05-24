## 2024-06-12 - Reusable Modal Semantics and Screen Reader Accessibility
**Learning:** Custom modals like `CodeExport` frequently miss proper `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` attributes. Also, textual icons like "×" are read literally by screen readers.
**Action:** Always wrap text characters used as icons in `<span aria-hidden="true">` and provide an `aria-label` on the parent `<button>`. For modals, ensure the container has `role="dialog"`, `aria-modal="true"`, and an ID linked to its title.
