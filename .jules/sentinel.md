# Sentinel's Journal

## 2024-05-22 - [Sentinel Initialized]
**Vulnerability:** Missing security journal
**Learning:** Security context was not persisted
**Prevention:** Created .jules/sentinel.md

## 2024-05-22 - [File Size Limit Enforcement]
**Vulnerability:** Missing file size limit on model JSON import (DoS risk)
**Learning:** FileReader reads the entire file into memory without checks, allowing large files to crash the browser tab.
**Prevention:** Added explicit `file.size` check against 5MB limit before calling `FileReader.readAsText`.
