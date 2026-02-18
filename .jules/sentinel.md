## 2024-05-22 - Neural Network Security Tests
**Vulnerability:** N/A (Test fragility)
**Learning:** `src/engine/NeuralNetwork.security.test.js` validates console warning messages using `expect.stringContaining`. Changes to warning messages in the implementation must be exactly mirrored in these tests, or they will fail.
**Prevention:** When modifying security-critical code that logs warnings, always grep for corresponding security tests to ensure expectations match.

## 2024-05-22 - Client-Side DoS via File Upload
**Vulnerability:** Missing file size check on `FileReader` operations.
**Learning:** `FileReader.readAsText()` reads the entire file into memory. Without a size check, large files can crash the browser tab (DoS).
**Prevention:** Always check `file.size` against a reasonable limit (e.g., 5MB) before instantiating `FileReader` or calling read methods.
