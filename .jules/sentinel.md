# Sentinel's Journal

## 2024-05-22 - [Sentinel Initialized]
**Vulnerability:** Missing security journal
**Learning:** Security context was not persisted
**Prevention:** Created .jules/sentinel.md

## 2024-05-22 - [DoS Prevention]
**Vulnerability:** Unchecked file size in `Controls.jsx` import allowed reading unlimited file sizes into memory.
**Learning:** Client-side `FileReader` needs explicit limits to prevent browser crashes/DoS.
**Prevention:** Added 5MB strict limit before reading files.
