# Sentinel's Journal

## 2024-05-22 - [Sentinel Initialized]
**Vulnerability:** Missing security journal
**Learning:** Security context was not persisted
**Prevention:** Created .jules/sentinel.md

## 2024-05-22 - [File Upload DoS Protection]
**Vulnerability:** Unbounded file read in Controls.jsx allowed large files to crash the browser (DoS).
**Learning:** Frontend `FileReader` operations should always check `file.size` before reading into memory.
**Prevention:** Added explicit 5MB size check before `reader.readAsText()`.
