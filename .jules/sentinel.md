## 2024-05-15 - Unbounded FileReader (DoS Risk)
**Vulnerability:** The application used `FileReader` to read user-uploaded JSON configuration files entirely into memory without any size constraints.
**Learning:** This is a classic client-side Denial of Service (DoS) vulnerability. A user or an attacker could upload an exceptionally large file (e.g., hundreds of MBs or GBs). Reading this synchronously into memory would cause the browser tab to freeze, crash, or run out of memory. Even though this is entirely client-side, it is still a significant security/availability flaw that degrades the application.
**Prevention:** Always enforce a reasonable file size limit (e.g., `if (file.size > 5 * 1024 * 1024)`) on client-side uploads before instantiating `FileReader` or processing the buffer.
