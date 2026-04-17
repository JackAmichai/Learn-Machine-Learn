## 2024-05-20 - Missing File Upload Limit (Denial of Service)
**Vulnerability:** The application allowed file uploads (`handleImportFile`) without any size restrictions. An attacker could exploit this to upload a massive JSON file, resulting in memory exhaustion and a browser crash (Client-Side Denial of Service).
**Learning:** Even if processing is entirely client-side, unrestricted data ingestion can severely impact application stability and user experience.
**Prevention:** Always implement hard limits on data ingestion points, such as file sizes (e.g., `< 5MB`) and payload complexity, to ensure robust application behavior.
