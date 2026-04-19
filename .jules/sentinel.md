## 2025-02-14 - Fix Client-Side DoS via Unrestricted File Upload
**Vulnerability:** The application allowed importing model JSON files via a file upload input without checking the size of the uploaded file before reading it entirely into memory with `FileReader.readAsText()`.
**Learning:** Reading a massive user-supplied file directly into memory blocks the UI thread and crashes the browser tab, leading to a client-side Denial of Service (DoS) attack, even without any server-side involvement.
**Prevention:** Always check `file.size` against a sensible maximum limit (e.g., 5MB) before processing or calling `FileReader` methods to read user-uploaded files.
