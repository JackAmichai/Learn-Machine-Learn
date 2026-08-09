
## 2024-08-09 - Accessible Icon-Only Modal Controls
**Learning:** Found that custom modal implementations often use plain text characters like `×` inside buttons for closing, which screen readers announce literally (e.g., "times" or "multiply") instead of their function.
**Action:** Always add descriptive `aria-label`s to icon-only controls, particularly close buttons in custom modal components, to ensure their purpose is clear to assistive technologies.
