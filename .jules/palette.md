## 2025-02-23 - Code Export Modal Accessibility
**Learning:** React modals (like the Code Export model) were previously missing standard accessibility features like Escape key closing, click-outside dismissal, and proper ARIA labels.
**Action:** Always add `role="dialog"`, `aria-modal="true"`, and Escape key / click-outside event listeners to any modal overlays created in the codebase to match UX accessibility standards.
