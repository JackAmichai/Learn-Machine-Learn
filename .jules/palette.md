## 2024-05-18 - Component-Scoped Styles in Portals/Modals
**Learning:** When using component-scoped `<style>` tags alongside conditionally rendered elements (like modals/portals), if the trigger element (e.g., a button) relies on the same `<style>` block, it will lose its styling when the modal is closed because the `<style>` block is unmounted.
**Action:** Extract the `<style>` block to be rendered unconditionally in the main DOM, rather than hiding it inside the conditional modal block.
