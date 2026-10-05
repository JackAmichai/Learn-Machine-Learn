## 2023-10-05 - XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** Unsanitized user content rendering through `dangerouslySetInnerHTML` in `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** Component properties passed down through React's `dangerouslySetInnerHTML` present XSS risks even if they are sourced internally. The properties were not verified against unsafe structures or inputs. `DOMPurify` requires `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` so the rendering works correctly in these files.
**Prevention:** Explicitly use an XSS library like `DOMPurify` anytime `dangerouslySetInnerHTML` is used.
