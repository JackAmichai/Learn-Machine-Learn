## 2024-05-22 - Standardization of Notifications
**Learning:** Inconsistent feedback mechanisms (local status divs vs global toasts) create cognitive load. Users miss feedback when it appears in unexpected locations (bottom of sidebar vs top right).
**Action:** Always prefer the global `useToast` hook for transient system notifications over local state. This ensures visibility and consistency across the application.

## 2024-05-22 - Small Touch Targets
**Learning:** `VisionCanvas` preset buttons use 10px font size and small padding, making them difficult to interact with.
**Action:** Future enhancements should audit and increase minimum touch target sizes to at least 44x44px where possible, or at least increase font size and padding.
