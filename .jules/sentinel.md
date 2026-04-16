## 2024-04-16 - Prevent Client-Side DoS via FileReader
**Vulnerability:** Client-Side Denial-of-Service (DoS) and browser crashes from uncontrolled file sizes.
**Learning:** Reading user-uploaded files completely into memory at once using `FileReader.readAsText()` without file size limits allows malicious or massive files to freeze the browser tab and consume excessive RAM.
**Prevention:** Always check and enforce strict file size limits (e.g., 5MB) using `file.size` before reading any client-side file data into memory via `FileReader`.
