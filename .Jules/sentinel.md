## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-11-01 - Prevent XSS in HTML rendering
**Vulnerability:** The application was vulnerable to Cross-Site Scripting (XSS) due to the use of `dangerouslySetInnerHTML` without proper sanitization when rendering content from `lesson.content`, `lesson.solved`, and `lesson.shortcomings`.
**Learning:** Even internal or semi-trusted data (like the engine content) must be sanitized before rendering into the DOM, as an attacker might manipulate data structures to inject malicious HTML or scripts.
**Prevention:** Always use a well-maintained sanitization library such as `DOMPurify` to clean input before passing it to React's `dangerouslySetInnerHTML`. For this app, explicit `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` options must be applied so we don't break existing math visualizations.
