## 2024-05-15 - Prevent Client-Side DoS via FileReader
**Vulnerability:** Client-Side DoS (Denial of Service) via `FileReader`.
**Learning:** Reading extremely large files directly into memory using `FileReader` (e.g. `readAsText`) without a size limit can cause the browser to crash or hang due to memory exhaustion. This is especially risky for JSON parsing operations downstream.
**Prevention:** Always enforce a strict file size limit (e.g., 5MB) on the `file.size` property before initializing `FileReader`. Clear the file input if the limit is exceeded.
