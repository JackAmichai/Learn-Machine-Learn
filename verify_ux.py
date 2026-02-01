from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:5173")

            # Click Show Code
            # It might be hidden initially or need time to load
            page.wait_for_selector(".btn-code", timeout=10000)

            # Use specific locator for the button
            page.locator(".btn-code").click()

            # Wait for modal
            modal = page.locator(".code-modal")
            expect(modal).to_be_visible()

            # Check for Copy button
            copy_btn = page.get_by_role("button", name="Copy code to clipboard")
            expect(copy_btn).to_be_visible()
            # expect(copy_btn).to_have_text("📋 Copy") # Text might match partially or exact

            # Take screenshot before click
            page.screenshot(path="verification_before.png")

            # Click Copy
            copy_btn.click()

            # Check for success state
            # expect(copy_btn).to_have_text("✅ Copied!")

            # Take screenshot after click
            page.screenshot(path="verification_after.png")

            print("Verification script finished successfully")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
