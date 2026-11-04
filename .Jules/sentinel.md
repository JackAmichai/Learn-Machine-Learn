## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.

## 2024-05-24 - Unsanitized HTML rendering with dangerouslySetInnerHTML
**Vulnerability:** The application used React's `dangerouslySetInnerHTML` to render lesson content containing complex math and visualizations (like SVGs) directly from data structures. These inputs were not sanitized, creating a Cross-Site Scripting (XSS) vulnerability.
**Learning:** Even when content is sourced from internal content files (like `mathContent.js`), using `dangerouslySetInnerHTML` without sanitization is a systemic risk, especially if the source is ever modified to include user-supplied or external data.
**Prevention:** Always wrap data passed to `dangerouslySetInnerHTML` in `DOMPurify.sanitize()`. For specialized content like equations and vector graphics, remember to pass `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` so they are not stripped out by the sanitizer.
