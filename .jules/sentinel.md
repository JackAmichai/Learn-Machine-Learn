## 2026-02-25 - [Frontend] Prevent Denial of Service via Large File Uploads
**Vulnerability:** The application allowed users to upload JSON files of any size for model import. Parsing a massive JSON file (e.g., >100MB) on the client side blocks the main thread, causing the browser tab to freeze or crash (DoS).
**Learning:** Even client-side-only apps are vulnerable to resource exhaustion. Always validate input size before processing, especially for operations that involve heavy parsing or memory allocation.
**Prevention:**
1.  Implement a strict file size limit (e.g., 5MB) using `file.size` before reading the file.
2.  Provide clear feedback to the user if the limit is exceeded.
3.  Reset the input value to allow the user to try again with a valid file.

## 2026-02-25 - [CI/CD] GitHub Actions Linux Rollup Dependency
**Vulnerability:** The CI pipeline failed on Linux because `npm ci` did not install the optional dependency `@rollup/rollup-linux-x64-gnu`. This is a known issue where `npm ci` respects `package-lock.json` strictly, and if the lockfile was generated on a non-Linux machine without including optional dependencies for other platforms, they might be missing.
**Learning:** Cross-platform builds require careful management of optional dependencies. `npm ci` is stricter than `npm install`.
**Prevention:**
1.  Explicitly add platform-specific optional dependencies (like `@rollup/rollup-linux-x64-gnu`) to `devDependencies` if the CI environment requires them and they aren't automatically handled.
2.  Or, run `npm install --package-lock-only` to update the lockfile to include all optional dependencies across platforms.

## 2026-02-25 - [Testing] String Matching in Security Tests
**Vulnerability:** Security tests failed in CI because `console.warn` assertions used `expect.stringContaining("Invalid outputActivation")` (camelCase), while the application code logged "Invalid output activation" (with space).
**Learning:** Error messages in code often use natural language (spaces), while variable names use camelCase. Mismatches here can cause false negatives or false positives in security regression testing.
**Prevention:**
1.  Copy-paste exact error strings from the source code into tests.
2.  Use looser matching (e.g., regex `/Invalid output activation/i`) if minor formatting changes are expected.
