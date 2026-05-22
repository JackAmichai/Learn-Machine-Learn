1. **Understand the Goal**: As Palette, my goal is to implement ONE micro-UX improvement that makes the interface more intuitive, accessible, or pleasant to use. The change must be < 50 lines.

2. **Identify Opportunity**:
    - `src/components/CodeExport.jsx` has a modal that generates code (Python/JS).
    - Currently, users have to manually highlight and copy the code.
    - Adding a "Copy Code" button would be a great micro-UX improvement.
    - It's a clear, visible enhancement.
    - It uses `navigator.clipboard.writeText`.
    - It provides temporary visual feedback ("Copied!").

3. **Plan**:
    - Modify `CodeExport.jsx`.
    - Add a state `isCopied`.
    - Add a `handleCopy` function.
    - Add a "Copy" button inside or near the `.code-block` with an icon or simple text.
    - Update CSS slightly to accommodate the button (absolute positioning inside `.code-block`).

4. **Verify**:
    - Run `npm run lint`.
    - Run `npm run test:run` (vitest). Ensure tests pass. I might need to mock clipboard in tests or ignore the new state for existing tests.
    - Since tests in `CodeExport.test.jsx` use `fireEvent.click`, I should verify they don't break.
