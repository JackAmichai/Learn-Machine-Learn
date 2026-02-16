## 2025-02-16 - Client-Side DoS via File Upload
**Vulnerability:** Unrestricted file upload size in `Controls.jsx` allowed browser crash via large JSON files.
**Learning:** Client-side file processing (FileReader) happens on the main thread; large files block UI and can crash the tab.
**Prevention:** Always check `file.size` before initializing `FileReader`. Added 5MB limit to `Controls.jsx`.
