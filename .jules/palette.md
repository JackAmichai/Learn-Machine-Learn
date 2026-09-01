## 2024-09-01 - Active states on custom buttons
**Learning:** This app heavily uses `.active` classes on custom button groups (like `.pill-group`, `.train-mode-toggle`) without pairing them with `aria-pressed` or `aria-current` to expose this state to screen readers.
**Action:** When inspecting or adding custom button groups that function as toggles in this codebase, ensure they are wrapped in a `role="group"` container with an `aria-label`, and the buttons themselves have the `aria-pressed={state}` attribute.
