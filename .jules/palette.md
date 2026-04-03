## 2024-05-18 - WCAG 2.5.3 (Label in Name) Nuance
**Learning:** When an `aria-label` is provided, it completely overrides the visible text for screen readers and voice control. Per WCAG 2.5.3 (Label in Name), the accessible name must contain the exact visible text as a contiguous string.
**Action:** When adding `aria-label` to buttons that already have visible text, ensure the exact visible string is included in the `aria-label` (e.g., `<button aria-label="Forward Pass (Run one step)">Forward Pass</button>`) or use `aria-describedby` for supplementary context instead.
