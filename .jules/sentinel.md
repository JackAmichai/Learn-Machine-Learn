## 2025-02-18 - Client-Side File Size Validation
**Vulnerability:** Missing file size validation on client-side file uploads, leading to potential DoS (browser crash) with large files.
**Learning:** `FileReader` reads files into memory. In a React/SPA context, reading large files without checks can freeze the UI.
**Prevention:** Always check `file.size` before instantiating `FileReader` or calling `readAsText`.
