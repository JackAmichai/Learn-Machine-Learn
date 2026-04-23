## 2023-10-27 - Client-side DoS via FileReader
**Vulnerability:** The application allowed uploading arbitrary files of any size through `FileReader.readAsText()`. Large file uploads could crash the browser tab by reading the entire file into memory before processing.
**Learning:** In purely client-side React applications, `FileReader` reads the entire file into memory at once. If not size-limited beforehand, large files will cause memory exhaustion and crash the tab (Denial of Service).
**Prevention:** Always enforce strict file size limits (e.g., 5MB) using `if (file.size > LIMIT) { ... }` before passing the file object to `FileReader` functions.
