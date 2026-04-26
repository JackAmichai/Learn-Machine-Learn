## 2024-05-24 - Unbounded FileReader Client-Side DoS
**Vulnerability:** The application was reading user-uploaded files entirely into memory using `FileReader` without enforcing any file size limits in `src/components/Controls.jsx`.
**Learning:** This is a client-side Denial-of-Service (DoS) vulnerability. Reading massively large files via `FileReader` without limits can cause the browser tab to consume excessive memory, freeze, or crash, degrading the user experience and availability of the application.
**Prevention:** Always enforce strict, explicit file size limits (e.g., 5MB) on the `file.size` property *before* initializing and invoking `FileReader` methods like `readAsText` or `readAsDataURL`.
