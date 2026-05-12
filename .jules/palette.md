## 2024-05-12 - Missing ARIA Labels in Dynamic Modals

**Learning:** When developing custom modals (e.g., CodeExport), developers often forget to assign `role="dialog"` and `aria-modal="true"` to the container. They also often use a bare "×" character for the close button without proper screen reader support. Wait for dynamic modal visibility before Playwright tests proceed.
**Action:** Always ensure modal containers have dialog semantics. Icon-only buttons using text characters must have an `aria-label` on the parent `<button>` and the text character must be wrapped in `<span aria-hidden="true">` to prevent screen readers from reading literal character names.
