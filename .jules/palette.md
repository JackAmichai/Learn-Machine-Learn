## 2023-07-12 - Aria-pressed on toggles
**Learning:** React elements toggling visual state with `.active` classes often lack `aria-pressed` or `aria-checked` attributes, making them inaccessible to screen readers.
**Action:** Always verify if a visual toggle needs an ARIA state mapping when styling buttons based on boolean props.
