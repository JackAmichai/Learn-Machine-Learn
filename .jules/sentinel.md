## 2026-02-04 - Client-Side DoS via File Upload
**Vulnerability:** The application allowed uploading JSON files of unlimited size, which were then read into memory and parsed.
**Learning:** Even client-side apps are vulnerable to Denial of Service (DoS) if they process large user inputs synchronously on the main thread. A large file could freeze the browser tab or crash it due to memory exhaustion.
**Prevention:** Implement strict size limits (e.g., 5MB) on client-side file inputs before reading the file content.
