from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    # Start with a larger viewport
    context = browser.new_context(
        viewport={'width': 1280, 'height': 800},
        permissions=['clipboard-read', 'clipboard-write']
    )
    page = context.new_page()

    print("Navigating to app...")
    page.goto("http://localhost:5173")

    page.wait_for_selector("text=Learn MACHINE Learn")

    # Locate the button
    show_code_btn = page.locator("button.btn-code", has_text="Show Code")

    # Scroll sidebar to bottom using JS because scroll_into_view_if_needed might not scroll the container
    page.eval_on_selector(".controls-panel", "el => el.scrollTop = el.scrollHeight")

    time.sleep(1) # wait for scroll

    print("Clicking 'Show Code'...")
    # Force click if needed or just click
    show_code_btn.click()

    # Wait for modal
    page.wait_for_selector(".code-modal")
    print("Modal opened. Waiting for animation/render...")
    time.sleep(2)

    # Take screenshot of the full page
    page.screenshot(path="verification_modal_retry.png", full_page=True)
    print("Screenshot saved to verification_modal_retry.png")

    # Verify the Copy button exists
    copy_btn = page.locator("button.btn-copy", has_text="Copy")
    if copy_btn.is_visible():
        print("Copy button is visible.")
    else:
        print("ERROR: Copy button is NOT visible.")

    # Click copy button
    print("Clicking Copy button...")
    copy_btn.click()

    try:
        page.wait_for_selector("text=Code copied to clipboard!", timeout=5000)
        print("Success toast appeared.")
        page.screenshot(path="verification_toast_retry.png")
    except Exception as e:
        print(f"Error waiting for toast: {e}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
