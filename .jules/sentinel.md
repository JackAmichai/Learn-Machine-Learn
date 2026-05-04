## 2024-05-24 - Client-side DoS via FileReader
**Vulnerability:** Unrestricted file uploads read directly into memory via FileReader can cause client-side browser crashes (Denial of Service).
**Learning:** User-uploaded files must be validated for size limits before processing in the client.
**Prevention:** Always enforce strict file size limits (e.g., 5MB) before calling reader.readAsText() or similar methods.
