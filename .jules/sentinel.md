# Sentinel's Journal

## 2024-05-23 - Initial Setup
**Vulnerability:** Missing security documentation.
**Learning:** Security context was not preserved.
**Prevention:** Created this journal.

## 2024-05-23 - Insecure File Upload Handling
**Vulnerability:** The application accepted JSON model files of any size, allowing for potential Denial of Service (DoS) via large file uploads.
**Learning:** Client-side file processing still needs boundaries. Even if processing is local, a large file can freeze the browser or crash the tab, degrading user experience and potentially being used for griefing.
**Prevention:** Added a strict file size limit (5MB) in `src/components/Controls.jsx` before processing the file.
