## 2026-04-18 - [ARIA attributes for character icons]
**Learning:** Text symbols like `×`, `+`, `-` used inside buttons are often read out weirdly by screen readers (e.g. "times" for `×`, or "dash" for `-`) confusing users.
**Action:** When adding an `aria-label` to these types of buttons, it is not enough to just add the label, the actual textual content (the symbol) should also be hidden from screen readers using `aria-hidden="true"` inside a wrapping `span` element, so screen readers do not try to parse it.
