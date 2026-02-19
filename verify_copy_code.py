from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(
        permissions=['clipboard-read', 'clipboard-write']
    )
    page = context.new_page()

    print("Navigating to app...")
    page.goto("http://localhost:5173")

    # Wait for the app to load
    page.wait_for_selector("text=Learn MACHINE Learn")

    print("App loaded. Finding 'Show Code' button...")

    # The controls panel might be scrollable, so we might need to scroll to bottom.
    # The 'Show Code' button is at the bottom of the controls.

    # Locate the button
    show_code_btn = page.locator("button.btn-code", has_text="Show Code")

    # Scroll into view
    show_code_btn.scroll_into_view_if_needed()

    # Click it
    print("Clicking 'Show Code'...")
    show_code_btn.click()

    # Wait for modal
    page.wait_for_selector(".code-modal")
    print("Modal opened.")

    # Take screenshot of the modal with the copy button
    page.screenshot(path="verification_modal.png")
    print("Screenshot saved to verification_modal.png")

    # Verify the Copy button exists
    copy_btn = page.locator("button.btn-copy", has_text="Copy")
    if copy_btn.is_visible():
        print("Copy button is visible.")
    else:
        print("ERROR: Copy button is NOT visible.")

    # Click copy button
    print("Clicking Copy button...")
    copy_btn.click()

    # Wait for toast
    # The toast implementation uses pushToast. I need to know the toast selector.
    # ToastStack.jsx renders toasts. Let's assume there is a toast container.
    # I'll wait for text "Code copied to clipboard!"
    try:
        page.wait_for_selector("text=Code copied to clipboard!", timeout=5000)
        print("Success toast appeared.")
        page.screenshot(path="verification_toast.png")
        print("Screenshot saved to verification_toast.png")
    except Exception as e:
        print(f"Error waiting for toast: {e}")
        page.screenshot(path="verification_error.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
