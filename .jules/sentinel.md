## 2024-03-30 - Client-Side Denial of Service via Unbounded File Uploads
**Vulnerability:** The application reads uploaded JSON model files fully into memory using `FileReader.readAsText(file)` without enforcing a maximum file size limit.
**Learning:** In purely client-side React applications, allowing unbounded file sizes can lead to out-of-memory errors and crash the user's browser tab (a client-side DoS attack).
**Prevention:** Always enforce strict file size limits (e.g., 5MB for JSON models) on the client side before instantiating `FileReader` or processing user uploads.
