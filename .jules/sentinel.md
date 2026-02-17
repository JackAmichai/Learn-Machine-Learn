## 2025-05-27 - [Client-Side DoS via Large File Upload]
**Vulnerability:** The application blindly read uploaded JSON model files into memory using `FileReader.readAsText()` without checking the file size. This allows a user to upload a massive file (e.g., gigabytes), causing the browser tab to crash due to memory exhaustion (Denial of Service).
**Learning:** Client-side file processing is not immune to DoS attacks. Even though it affects the user's own browser (Self-DoS), it degrades the application's robustness and can be annoying or confusing.
**Prevention:** Always validate `file.size` against a reasonable limit (e.g., 5MB for JSON models) before calling `FileReader` methods.
