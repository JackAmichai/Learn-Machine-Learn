## 2024-04-03 - [Unbounded File Upload DoS]
**Vulnerability:** Client-side Denial-of-Service (DoS) and potential browser crash due to unconstrained `FileReader` loading directly into browser memory.
**Learning:** `FileReader.readAsText()` processes the entire file into a single string in memory. If an attacker/user uploads a multi-gigabyte file, the browser tab will freeze or crash, leading to a localized DoS.
**Prevention:** Always enforce a strict file size limit (e.g., `file.size > 5 * 1024 * 1024` for 5MB) before instantiating or invoking `FileReader`.
