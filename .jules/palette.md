## 2024-05-18 - Style Tag Context in Conditionally Rendered Components
**Learning:** Component-scoped `<style>` tags rendered inside conditionally shown elements (like modals) will cause elements outside that condition (like the button that opens the modal) to lose their styling when the condition is false.
**Action:** Always render `<style>` blocks unconditionally, either outside the conditional return statement or by wrapping the entire component logic so the style is always applied to the DOM.
