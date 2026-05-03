## 2026-05-03 - Accessible Scrollable Code Regions and Icon Buttons
**Learning:** Scrollable regions with overflow: auto need tabIndex={0}, role='region', and an aria-label to be focusable and properly announced by screen readers. Icon-only buttons using text characters (like '×') should wrap the character in <span aria-hidden="true"> and provide an aria-label on the button.
**Action:** Add tabIndex={0}, a semantic role, and aria-label to any scrollable element (like .code-block pre). Use aria-hidden on text-character icons inside buttons with aria-labels.
