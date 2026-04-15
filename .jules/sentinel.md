## 2024-04-15 - Prevent Client-Side DoS via FileReader
**Vulnerability:** The application allowed uploading arbitrary files without size limits and loaded them directly into memory using `FileReader`. Large file uploads could exhaust client memory leading to browser crash (Client-side DoS).
**Learning:** Even though the client browser executes the code locally and the server is not at risk, the user experience and availability of the app on that device can be easily disrupted by a large local file. Client-side resource exhaustion is a viable attack surface in purely front-end apps.
**Prevention:** Always implement file size limits (e.g. `const MAX_FILE_SIZE = 5 * 1024 * 1024`) before initiating resource-heavy operations like reading entirely into memory with `FileReader`.
