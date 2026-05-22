## 2024-03-28 - Client-Side DoS via FileReader

**Vulnerability:** The application allowed users to upload arbitrarily large JSON files (`Controls.jsx`) which were read entirely into memory using `FileReader.readAsText()` without any size checks.

**Learning:** This is a classic client-side Denial-of-Service (DoS) vulnerability. Reading a massive file (e.g., 1GB) into browser memory synchronously can easily freeze or crash the user's browser, ruining the experience and potentially leading to data loss if they had unsaved work.

**Prevention:** Always enforce a strict, sensible file size limit (e.g., 5MB) *before* invoking `FileReader`. Additionally, when using `FileReader`, consider using asynchronous methods or streaming for large files to avoid blocking the main thread, though strict size limits are the easiest and most effective first line of defense.
