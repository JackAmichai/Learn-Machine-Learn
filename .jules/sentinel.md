## 2026-04-07 - Denial of Service via Large File Uploads
**Vulnerability:** The application allowed file uploads using `FileReader` to read the entire file content into memory at once without checking the file size limit first.
**Learning:** This exposes the application to client-side Denial-of-Service (DoS) vulnerabilities if an attacker uploaded a massive file causing the browser to freeze or crash due to memory exhaustion.
**Prevention:** Always enforce strict file size limits (e.g., 5MB) before reading user-uploaded files entirely into memory, particularly in purely client-side applications.
