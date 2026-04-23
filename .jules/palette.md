## 2024-03-24 - Accessible Code Blocks and Modals
**Learning:** Code blocks that overflow and scroll need to be keyboard accessible. Modals should be appended to the body using `createPortal` to avoid stacking context issues, and custom tab navigation requires specific ARIA roles (`tablist`, `tab`, `tabpanel`).
**Action:** Ensure that scrollable regions (`overflow: auto`) have `tabIndex={0}`, use `createPortal` for modals, and apply standard ARIA roles for custom tabbed interfaces.
