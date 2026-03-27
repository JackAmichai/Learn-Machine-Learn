## 2024-05-18 - Client-Side DoS via Unrestricted FileReader
**Vulnerability:** The `handleImportFile` function read JSON model files entirely into memory using `FileReader` without any size limits. This allowed an attacker or user to upload a massive file (e.g., several GBs), which would exhaust browser memory, lock the main thread, and crash the client.
**Learning:** Client-side applications are vulnerable to DoS attacks just like servers. Reading files synchronously or entirely into memory without bounds checking can be catastrophic for the user's browser.
**Prevention:** Always validate `file.size` before reading its contents. Establish reasonable upper bounds for file uploads, even if the processing is entirely client-side.
