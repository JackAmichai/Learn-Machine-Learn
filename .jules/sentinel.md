# Sentinel's Security Journal 🛡️

## 2026-02-12 - Unrestricted File Upload (DoS Risk)
**Vulnerability:** The application allowed uploading arbitrarily large files via the `Controls` component, which were then read into memory using `FileReader.readAsText` without any size validation. This could crash the browser tab (Denial of Service).
**Learning:** Client-side file processing is not inherently safe from resource exhaustion. Even without a backend, large files can crash the user's browser if read synchronously or into memory all at once.
**Prevention:** Always validate `file.size` against a reasonable limit (e.g., 5MB) before invoking `FileReader` methods.
