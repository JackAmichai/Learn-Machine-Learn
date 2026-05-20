## 2024-05-19 - Accessible Close Buttons
**Learning:** Icon-only close buttons (like `×` characters) in custom modals (`.code-modal`) often lack `aria-label`s. Screen readers read `×` as "times" or "multiply" rather than "close".
**Action:** When creating or modifying close buttons that use a raw character (like `×`), ensure the `<button>` element has `aria-label="Close modal"` and the character itself is wrapped in `<span aria-hidden="true">` to prevent redundant or confusing screen reader announcements.
