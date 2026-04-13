## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-05-24 - DoS Prevention in FileReader Uploads
**Vulnerability:** Client-Side Denial of Service (DoS) via unbounded file size reads in memory using `FileReader`.
**Learning:** React components allowing file uploads (`<input type="file">`) directly into memory via `FileReader.readAsText()` can crash the browser tab if massive files (e.g. gigabytes) are uploaded, since the entire file content is loaded as a single string.
**Prevention:** Always enforce a strict `file.size` check (e.g., 5MB limit `5 * 1024 * 1024`) immediately after selecting the file and before initializing the `FileReader`.
