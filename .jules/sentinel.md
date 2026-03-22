## 2024-05-20 - Unconstrained File Upload DoS
**Vulnerability:** The application allowed file uploads (`application/json`) without checking the file size.
**Learning:** Even client-side applications can be subject to DoS if they attempt to load or parse excessively large files into memory. The FileReader API reads the entire file into memory before parsing, which can crash the browser tab.
**Prevention:** Always implement file size limits before invoking `FileReader.readAsText()` or similar APIs to protect client-side memory.
