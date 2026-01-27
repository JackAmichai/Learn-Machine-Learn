## 2024-05-22 - Code Injection via Hyperparameters
**Vulnerability:** Code Injection in `CodeExport.jsx` allow arbitrary strings in `activation` and `optimizer` to be interpolated into generated Python/JS code.
**Learning:** Even internal-looking parameters like hyperparameters can be vector for attacks if they are included in generated code or commands.
**Prevention:** Always whitelist allowed values for configuration parameters that are used in code generation. Defense in depth: sanitize on input (import) and output (export).
