## 2024-05-24 - Missing File Size Limit Causes Client-Side DoS
**Vulnerability:** Client-side Denial-of-Service via unbounded file uploads.
**Learning:** Reading massive files entirely into memory using FileReader can crash the browser. Always validate sizes before processing.
**Prevention:** Enforce strict file size limits (e.g., 5MB) before instantiating FileReader.