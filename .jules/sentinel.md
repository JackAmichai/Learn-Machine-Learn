## 2026-02-03 - Client-Side DoS via File Upload
**Vulnerability:** The application reads uploaded JSON files into memory using `FileReader` without checking the file size.
**Learning:** Even without a backend, large file uploads can crash the user's browser (DoS) by exhausting memory.
**Prevention:** Enforce a strict file size limit (e.g., 5MB) on the client side before reading the file content.
