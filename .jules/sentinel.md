## 2024-05-23 - [DoS via Large File Upload]
**Vulnerability:** Client-side file uploads via `FileReader` lacked size validation, allowing users to select massive files (e.g., gigabytes) that would be read entirely into memory, crashing the browser tab.
**Learning:** Even client-side file reading can be a DoS vector. Always validate `file.size` before calling `readAsText` or `readAsDataURL`.
**Prevention:** Check `file.size` against a reasonable limit (e.g., 5MB for JSON models) immediately after file selection.
