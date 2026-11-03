## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2025-02-23 - DOMPurify usage for dynamic HTML rendering
**Vulnerability:** The application used `dangerouslySetInnerHTML` to render dynamic content without sanitization, exposing it to Cross-Site Scripting (XSS) attacks.
**Learning:** `dangerouslySetInnerHTML` must always be paired with a sanitization library like DOMPurify when rendering content that isn't strictly controlled, especially in dynamic applications. To avoid breaking legitimate visual formatting, MathML, and SVG components, the correct profiles must be explicitly allowed.
**Prevention:** Always use `DOMPurify.sanitize(content, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` when rendering dynamic HTML via `dangerouslySetInnerHTML`.
