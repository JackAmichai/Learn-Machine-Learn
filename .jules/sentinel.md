## 2024-05-18 - XSS via dangerouslySetInnerHTML
**Vulnerability:** Used dangerouslySetInnerHTML directly with unsanitized content strings from math topics and lessons data.
**Learning:** In React, dynamically injecting HTML using dangerouslySetInnerHTML exposes the app to Cross-Site Scripting (XSS) attacks if the data is not strictly controlled or is ever modified by an untrusted source.
**Prevention:** Always sanitize any dynamic HTML payloads using a library like DOMPurify before rendering them with dangerouslySetInnerHTML.
