## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-05-18 - Missing XSS protection with dangerouslySetInnerHTML
**Vulnerability:** Unsanitized inputs were being passed to `dangerouslySetInnerHTML` in MathModal and LookingForward components.
**Learning:** `dangerouslySetInnerHTML` renders raw HTML, which exposes the app to Cross-Site Scripting (XSS) if data contains malicious scripts.
**Prevention:** Always sanitize any untrusted or rich text data with a library like DOMPurify before injecting it via `dangerouslySetInnerHTML`. Specifically for apps with math or SVG graphics, preserve them using DOMPurify profiles like `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }`.
