## 2025-05-15 - Missing File Size Limit on Uploads
**Vulnerability:** FileReader reads entire files into memory without any size checks
**Learning:** This can lead to client-side Denial-of-Service (DoS) if large files are uploaded
**Prevention:** Enforce strict file size limits (e.g., 5MB) before reading user-uploaded files
