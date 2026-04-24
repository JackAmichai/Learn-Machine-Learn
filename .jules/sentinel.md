## 2024-04-24 - File Upload Client-side DoS Prevention
**Vulnerability:** Unbounded file reads using `FileReader` on the client side.
**Learning:** Reading very large user-uploaded files entirely into memory using `FileReader.readAsText()` without enforcing size limits beforehand can lead to excessive memory consumption, freezing the UI thread, or crashing the browser, resulting in a client-side Denial-of-Service (DoS).
**Prevention:** Always check `file.size` against a strict limit (e.g., 5MB) before instantiating or executing `FileReader` read operations. Display clear error messages and reset the input field if the limit is exceeded.
