## 2024-05-22 - Standardization of Notifications
**Learning:** Inconsistent feedback mechanisms (local status divs vs global toasts) create cognitive load. Users miss feedback when it appears in unexpected locations (bottom of sidebar vs top right).
**Action:** Always prefer the global `useToast` hook for transient system notifications over local state. This ensures visibility and consistency across the application.

## 2024-05-22 - CI/CD Reliability
**Learning:** `npm ci` can be fragile with platform-specific optional dependencies (like `@rollup/rollup-linux-x64-gnu`) when `package-lock.json` is generated on a different OS.
**Action:** Use `pnpm` in CI/CD pipelines as it generally handles these resolutions better and aligns with the repository's preferred package manager.
