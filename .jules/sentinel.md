## 2024-05-18 - Missing file size limit in FileReader

**Vulnerability:** The application used `FileReader.readAsText()` on user-uploaded JSON files without first checking the file size.
**Learning:** This could lead to client-side Denial-of-Service (DoS) and memory exhaustion if a user uploads a massively large file, which would then be read entirely into browser memory.
**Prevention:** Always enforce a strict `file.size` limit (e.g. 5MB) on user uploaded files before reading them using `FileReader`.
