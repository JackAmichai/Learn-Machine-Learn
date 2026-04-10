## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-05-24 - Client-Side DoS via FileReader memory exhaustion
**Vulnerability:** Loading large, untrusted user-uploaded files entirely into memory using `FileReader` without limits.
**Learning:** Browsers can crash from memory exhaustion (OOM) if users upload massive files (e.g., multi-gigabyte JSON/text files), leading to a client-side Denial of Service.
**Prevention:** Always enforce strict file size limits (e.g., 5MB) on the `File` object before passing it to `FileReader.readAsText()` or similar APIs.
