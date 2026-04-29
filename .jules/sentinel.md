## 2025-02-14 - Prevent Client-Side DoS via FileReader
**Vulnerability:** The `handleImportFile` function in `src/components/Controls.jsx` read uploaded files entirely into memory using `FileReader.readAsText()` without enforcing any file size limit.
**Learning:** If a user uploaded an extremely large file, it could easily cause the browser tab to exhaust its available memory, resulting in a crash or severe Denial-of-Service (DoS). This is a common client-side vulnerability when handling arbitrary file uploads.
**Prevention:** Always implement a strict file size check (e.g., `file.size > 5 * 1024 * 1024`) before initiating a file read operation on the client side.
