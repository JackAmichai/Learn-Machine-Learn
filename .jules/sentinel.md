## 2024-05-18 - Client-Side DoS via Unbounded FileReader
**Vulnerability:** The application read user-uploaded model JSON files directly into memory using `FileReader.readAsText(file)` without verifying the file size. This allows malicious actors to upload massive files (e.g., >1GB), leading to excessive memory consumption, browser freezing, or crashing (client-side DoS).
**Learning:** Even though `FileReader` operates locally on the client and doesn't upload the file to a server, attempting to read extremely large files synchronously or into a single string variable can exhaust the browser's available memory.
**Prevention:** Always enforce a strict, sensible file size limit (e.g., 5MB for JSON models) using `file.size` before reading any user-uploaded files entirely into memory.
