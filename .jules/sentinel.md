## 2025-04-25 - Prevent client-side DoS from FileReader
**Vulnerability:** A file upload input connected to `FileReader` lacked a file size limit. Users could upload excessively large files (e.g., hundreds of MBs) that would be read entirely into memory at once, crashing the browser or causing severe UI lockups.
**Learning:** React components that directly bind `FileReader.readAsText()` to user-selected files are inherently vulnerable to client-side DoS if file size bounds aren't checked before the read operation begins.
**Prevention:** Always check `file.size` against a sensible limit (e.g., `5 * 1024 * 1024` for 5MB) inside the `onChange` handler before creating a `FileReader` instance or calling any read methods. Return early and inform the user if the limit is exceeded.
