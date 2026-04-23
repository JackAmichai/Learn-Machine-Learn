## 2024-05-18 - Client-Side DoS via File Uploads
**Vulnerability:** The `handleImportFile` function in `Controls.jsx` read user-uploaded JSON files without checking their size.
**Learning:** Loading exceptionally large files into the browser's memory using `FileReader` can cause memory exhaustion and crash the application (Denial of Service).
**Prevention:** Always enforce strict file size limits (e.g., 5MB) on client-side uploads before initializing `FileReader` or attempting to parse the contents.