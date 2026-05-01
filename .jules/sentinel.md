## 2024-05-18 - Client-Side DoS via Unbounded FileReader

**Vulnerability:** The application used `FileReader` to read user-uploaded files directly into memory without checking their sizes first. This exposed the application to client-side Denial-of-Service (DoS) attacks, as processing extremely large files can exhaust memory and crash the browser.

**Learning:** When using web APIs like `FileReader`, standard file input elements do not inherently enforce file size limits unless explicitly implemented via JavaScript logic.

**Prevention:** Always enforce a strict file size limit (e.g., `< 5MB`) on `file.size` before attempting to read the file entirely into memory.
