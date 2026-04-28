## 2024-04-28 - Prevent Client-Side DoS via FileReader
**Vulnerability:** Unbounded file size acceptance in FileReader `readAsText()`.
**Learning:** In purely client-side applications, reading user-uploaded files directly into memory without checking the size can cause the browser tab to crash, leading to a Denial-of-Service (DoS).
**Prevention:** Always check `file.size` against a reasonable limit (e.g., 5MB) before instantiating and calling methods on `FileReader`.
