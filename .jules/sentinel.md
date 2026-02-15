## 2025-02-12 - [DoS Prevention]
**Vulnerability:** Client-side file upload (JSON model import) lacked file size limits, allowing potential Denial of Service (DoS) via memory exhaustion if a user uploaded a massive file.
**Learning:** `FileReader.readAsText` loads the entire file into memory as a string. Without a size check, this can crash the browser tab.
**Prevention:** Always check `file.size` before reading the file, especially when using `FileReader`. Added a 5MB limit.
