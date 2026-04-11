## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.

## 2025-04-11 - Client-Side DoS via FileReader
**Vulnerability:** The `handleImportFile` function in `Controls.jsx` lacked a file size limit before passing user-uploaded files to `FileReader.readAsText`. This allowed loading massive files into memory, leading to browser crashes and Denial of Service (DoS) for the client.
**Learning:** Even purely client-side features that don't interact with a backend need input validation. Browsers have limited memory, and `FileReader` loads the entire file contents into a single string. Allowing unbounded file reads creates an easy vector for users (or attackers providing files to users) to crash the application tab.
**Prevention:** Always enforce a strict `MAX_FILE_SIZE` check (e.g., 5MB) on `File` objects before calling `FileReader` methods, and gracefully reject oversized files with clear user feedback.
