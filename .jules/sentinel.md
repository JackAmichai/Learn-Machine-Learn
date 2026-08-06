## 2024-08-06 - Sanitize API Error Messages
**Vulnerability:** API error messages were being leaked to the UI in `src/components/Chatbot.jsx`.
**Learning:** Raw responses from 3rd party APIs (like HuggingFace) can sometimes expose internal server details, stack traces, or sensitive errors. Passing `res.text()` directly to the UI's error state is an information disclosure risk.
**Prevention:** Always catch and log raw API responses internally (e.g. `console.error`), and present a generic, sanitized error message to the user.
