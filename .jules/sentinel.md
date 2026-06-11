## 2024-06-11 - XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** Unsanitized dynamic HTML content passed directly to dangerouslySetInnerHTML in React components.
**Learning:** Passing unsanitized dynamic content like math formulas or strings directly to dangerouslySetInnerHTML creates a Cross-Site Scripting (XSS) vulnerability. An attacker can inject arbitrary HTML or JavaScript, which the browser will execute in the context of the user's session.
**Prevention:** Always sanitize dynamic or external HTML content using a library like DOMPurify (e.g., DOMPurify.sanitize(data.content)) before passing it to dangerouslySetInnerHTML. For math content, use the { USE_PROFILES: { html: true, mathMl: true, svg: true } } option to preserve essential tags.
