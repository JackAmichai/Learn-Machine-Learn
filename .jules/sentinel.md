## 2026-04-22 - Prevent client-side DoS from large files
**Vulnerability:** Client-side Denial-of-Service (DoS) and browser crashes from reading massive files using `FileReader` into memory at once without any size limit checks.
**Learning:** React components allowing file uploads via `FileReader` can freeze the main thread or crash the browser if a user maliciously or accidentally uploads an extremely large file.
**Prevention:** Always enforce a file size limit (e.g., 5MB) on the `File` object *before* initiating `FileReader.readAsText()` or similar methods to read it entirely into memory.
