## 2025-02-18 - Client-Side Denial of Service via File Upload
**Vulnerability:** Unrestricted file size when using `FileReader` in `Controls.jsx` allowed users to select massive files, causing the browser tab to crash (DoS) due to memory exhaustion when reading the file into a string.
**Learning:** Even without a backend, processing files entirely in-browser requires size limits. `FileReader.readAsText()` loads the entire content into RAM.
**Prevention:** Always validate `file.size` against a reasonable limit (e.g., 5MB) immediately after file selection and *before* initiating any read operations.
