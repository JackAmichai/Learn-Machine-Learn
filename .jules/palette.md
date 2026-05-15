## 2024-05-15 - Accessible Modal Structure

**Learning:** When building custom modals in React, it is crucial to apply the `role="dialog"` and `aria-modal="true"` attributes to the modal container, and to link the modal's title to the dialog using `aria-labelledby` referencing the title's `id`. For icon-only close buttons (like "×"), the visual character should be hidden from screen readers using `aria-hidden="true"`, while the button itself must have a descriptive `aria-label` (e.g., "Close modal").
**Action:** Ensure all future custom modal implementations follow this structural pattern for full screen reader accessibility.
