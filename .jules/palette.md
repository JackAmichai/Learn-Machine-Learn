
## 2024-05-18 - [Add Copy Button to CodeExport]
**Learning:** Adding a temporary "Copied!" state provides helpful visual feedback for copy-to-clipboard interactions. Using `useRef` to store the timeout ensures that rapid consecutive clicks correctly clear any previous timeout and show the state. Absolute positioning elements on a scrollable element requires separating the content to be scrolled into its own wrapper.
**Action:** When implementing copy-to-clipboard interactions, ensure rapid interaction safety and proper positioning. Also ensure there's keyboard accessibility on interactive components such as language tabs.
