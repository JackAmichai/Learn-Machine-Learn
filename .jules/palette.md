## 2024-10-27 - Icon-only buttons lacking ARIA labels
**Learning:** Icon-only buttons (like `×` for close) used within custom modal components in this repository frequently omit `aria-label`s, rendering them inaccessible to screen readers.
**Action:** Always explicitly ensure that icon-only buttons include an accessible name (e.g., `aria-label="Close modal"`) when modifying or creating modals.
