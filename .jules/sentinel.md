## 2026-02-06 - Client-Side DoS Prevention
**Vulnerability:** Unrestricted file uploads in client-side FileReader could lead to browser crashes (DoS) if users upload massive files.
**Learning:** Even client-only apps need input validation for availability. `FileReader` reads entire files into memory.
**Prevention:** Always check `file.size` before calling `readAsText` or `readAsDataURL`.
