## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.

## 2025-02-28 - [XSS Mitigation in React components]
**Vulnerability:** Use of `dangerouslySetInnerHTML` to render HTML string without sanitization. If the rendered content becomes dynamic or is ever supplied from a less trusted source, it creates an XSS vulnerability.
**Learning:** Even static content could pose risks if modified, or if the source file is ever populated by user input or database queries. `dangerouslySetInnerHTML` should never be used without an HTML sanitizer.
**Prevention:** Always use a sanitization library like `dompurify` (e.g. `DOMPurify.sanitize(data.content)`) when rendering raw HTML in React.
