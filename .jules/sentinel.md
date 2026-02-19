## 2024-05-22 - Client-Side DoS via Large File Upload
**Vulnerability:** The application allowed users to upload arbitrarily large JSON files for model import. The `FileReader.readAsText()` method loads the entire file content into memory, which can cause the browser tab to crash (Denial of Service) when processing massive files.
**Learning:** Client-side file processing is not immune to resource exhaustion. Even without a backend, large inputs can degrade the user experience or crash the application.
**Prevention:** Always validate `file.size` against a reasonable limit (e.g., 5MB for configuration files) before reading the file content. Use `setStatus` or similar mechanisms to provide immediate feedback to the user.
