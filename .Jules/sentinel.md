## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2025-02-14 - XSS Vulnerability via dangerouslySetInnerHTML
**Vulnerability:** Found multiple instances of `dangerouslySetInnerHTML` rendering unsanitized mathematical and lesson content in `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** In React applications, rendering dynamic HTML directly without sanitization can lead to Cross-Site Scripting (XSS) attacks. Using DOMPurify prevents this while still allowing required specific profiles.
**Prevention:** Always sanitize dynamically rendered HTML using a library like DOMPurify before passing it to `dangerouslySetInnerHTML`. Specifically, when rendering complex content, use profiles like `USE_PROFILES: { html: true, mathMl: true, svg: true }` to avoid breaking legitimate formatting while preventing scripts.
