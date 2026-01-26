# Sentinel's Journal

## 2025-02-14 - Code Injection via Unsanitized State Import
**Vulnerability:** A Code Injection vulnerability was found in the Model Import feature (`importModelJSON`). The application blindly trusted `hyperparams` from the imported JSON file. A malicious user could craft a JSON file with malicious strings in `optimizer` or `activation` fields. Since these fields were directly interpolated into string templates in `CodeExport.jsx`, they could inject arbitrary code (e.g., Python or JS code injection) that would be executed if the user exported and ran the model code.

**Learning:** Frontend applications that import state (like JSON configs) must treat that state as untrusted input, even if it's "just configuration". Malicious configuration can lead to Code Injection or XSS if used in code generation or rendered to DOM.

**Prevention:** Implement strict input validation and sanitization at the boundary where data enters the application (e.g., import functions). Use allow-lists for enum-like values (like `optimizer` types) and clamp numerical values to safe ranges.
