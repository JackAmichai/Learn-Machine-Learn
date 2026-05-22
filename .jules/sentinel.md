## 2024-05-18 - Client-Side DoS via Unrestricted File Upload
**Vulnerability:** The application was reading user-uploaded JSON model files entirely into memory using `FileReader` without enforcing any file size limits.
**Learning:** Even purely client-side operations can lead to Denial-of-Service (DoS) if large files crash the browser tab or exhaust memory resources.
**Prevention:** Always enforce strict file size limits (e.g., 5MB) before attempting to read file contents into memory, especially when handling user-provided data.