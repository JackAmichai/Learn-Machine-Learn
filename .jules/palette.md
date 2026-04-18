## 2024-03-01 - Portals and Component Scope Styling
**Learning:** In React apps where component-scoped `<style>` tags are placed inside conditionally rendered modals/portals, opening and closing those modals can cause the trigger buttons outside the modal to lose their styles when the `<style>` block unmounts.
**Action:** Ensure `<style>` tags associated with always-visible elements (like trigger buttons) are rendered unconditionally in the main DOM tree, outside of `isOpen` logical checks.

## 2024-03-01 - Scrollable Region Accessibility
**Learning:** Adding absolute-positioned interactive elements (like a "Copy" button) overlaying a scrollable `<pre>` or code block can obscure the text underneath. Furthermore, scrollable regions are inaccessible to keyboard users without explicit attributes.
**Action:** When implementing overlays on scrollable content, ensure adequate `padding-right` on the scroll container to prevent text truncation. Always add `tabIndex={0}`, `role="region"`, and a descriptive `aria-label` to scrollable containers (`overflow: auto`) to allow keyboard focus and screen reader context.
