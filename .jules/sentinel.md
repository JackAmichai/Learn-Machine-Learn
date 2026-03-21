## 2024-10-24 - Unbounded Client-Side JSON Parsing
**Vulnerability:** The application accepted user-uploaded JSON files without a size constraint, passing them directly to `importModelJSON` and `JSON.parse`.
**Learning:** Even on the client side, parsing massive JSON files blocking the main thread can lead to a Denial of Service (DoS), crashing the user's browser tab and ruining the experience. The codebase needs explicit safeguards for imported state.
**Prevention:** Enforce a strict file size limit (e.g., 5MB) using the `File.size` API before allowing `FileReader` to process user-uploaded configuration files.
