## 2025-02-14 - Prevent Client-Side DoS via FileReader

**Vulnerability:** Client-Side Denial of Service (DoS) due to unbounded `FileReader` allocation. User uploaded files were read directly into memory without any size constraints (`reader.readAsText(file)`).

**Learning:** When users upload files that are processed client-side, the browser allocates memory dynamically. Extremely large files can crash the user's browser tab or device before validation logic can even process the contents, acting as an effective localized DoS attack. This is particularly problematic in applications allowing users to import "project state" or "models".

**Prevention:** Always enforce strict file size limits (`file.size > MAX_SIZE`) before invoking `FileReader.readAsText` or similar methods. A reasonable cap (e.g., 5MB for JSON configs) effectively neutralizes this vector.