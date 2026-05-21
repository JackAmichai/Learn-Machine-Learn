## 2024-05-18 - XSS in Math Content Rendering
**Vulnerability:** The application was vulnerable to Cross-Site Scripting (XSS) due to the use of `dangerouslySetInnerHTML` with unsanitized dynamic content in components like `MathModal` and `LookingForward`.
**Learning:** The application heavily relies on dynamic content to render math formulas, SVGs, and text. Developers correctly used `dangerouslySetInnerHTML` for the layout, but forgot to sanitize the injected data, exposing the app to XSS via crafted markdown or lesson content.
**Prevention:** Always sanitize dynamic content before injecting it using `dangerouslySetInnerHTML`. Since the app requires rendering specific tags like `svg` and MathML, use `DOMPurify.sanitize(data, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` to strip malicious scripts while preserving valid formatting and formulas.
## 2024-05-18 - CI Failure due to missing package-lock.json with npm
**Vulnerability:** N/A (CI fix)
**Learning:** The project relies on `pnpm` and a `pnpm-lock.yaml` file, but the GitHub Actions CI workflow was configured to use `npm ci`, which fails when `package-lock.json` is missing.
**Prevention:** Always ensure the CI workflow matches the project's intended package manager. When a repo uses `pnpm`, update the `.github/workflows/ci.yml` file to use `corepack enable pnpm` and `pnpm install` / `pnpm run` commands instead of `npm`.
## 2024-05-18 - ESLint purity/static-component and duplicate key violations in CI
**Vulnerability:** N/A (CI Linter Fixes)
**Learning:** The project's strict ESLint rules (react-hooks/purity, react-hooks/static-components, react-hooks/set-state-in-effect) block CI builds if components use `Math.random()` during render, define components within the render body of other components, update state synchronously inside effects, or contain duplicate keys in configuration objects.
**Prevention:**
1. Use deterministic pseudo-random logic (e.g., `Math.sin(seed++)`) instead of `Math.random()` inside render bodies.
2. Define sub-components outside of the parent component's render body.
3. Use `setTimeout(..., 0)` or functional state updates (`setX(prev => ...)`) to avoid synchronous state updates in `useEffect`.
4. Ensure configuration objects like `mathContent.js` do not contain duplicate keys.
