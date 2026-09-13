## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-05-18 - Fix XSS Vulnerability in dynamically loaded lesson content
**Vulnerability:** XSS vulnerability through unsanitized input passed to `dangerouslySetInnerHTML` for lesson content, solved sections, and shortcomings in `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** Dynamic content injection using React's `dangerouslySetInnerHTML` without proper sanitization allows execution of malicious scripts if the source data is compromised.
**Prevention:** Always sanitize any dynamic HTML content with a library like `dompurify` (`DOMPurify.sanitize()`) before passing it to `dangerouslySetInnerHTML`.
