## 2025-02-18 - Client-Side DoS via Large File Upload
**Vulnerability:** The application allowed importing JSON model files of unlimited size via `FileReader`, leading to potential browser crashes (OOM).
**Learning:** `FileReader.readAsText()` loads the entire file into memory string. For large files, this is catastrophic for the client.
**Prevention:** Always check `file.size` before initiating a read operation. Set a reasonable limit (e.g., 5MB) and fail early.
