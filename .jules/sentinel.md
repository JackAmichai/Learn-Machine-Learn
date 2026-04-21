## 2024-05-20 - Limit File Size on Model Import to Prevent Client-Side DoS

**Vulnerability:**
The `handleImportFile` function in `src/components/Controls.jsx` lacked a file size limit check before loading user-uploaded JSON files into memory via `FileReader`. Reading massive files directly into browser memory could easily crash the application, leading to a client-side Denial-of-Service (DoS) attack.

**Learning:**
Any client-side file import functionality that loads entire file contents into memory without streaming or chunking represents a DoS risk if constraints are missing. It is crucial to set boundaries even for trusted data paths.

**Prevention:**
Always enforce a strict `MAX_FILE_SIZE` limit on file inputs before proceeding to read the file contents using APIs like `FileReader`. Validate `file.size` and gracefully reject large files early.
