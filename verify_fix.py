import os
import time
from playwright.sync_api import sync_playwright

def verify_file_upload_limit():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app (retry a few times if server is starting)
        for i in range(5):
            try:
                page.goto("http://localhost:5173")
                break
            except:
                time.sleep(1)

        # Create a large dummy file (6MB)
        large_file_path = "large_model.json"
        with open(large_file_path, "wb") as f:
            f.write(b"0" * (6 * 1024 * 1024))

        # Find the file input and upload the large file
        # The input is hidden, but Playwright can handle it
        # We need to scroll the controls into view or just interact with the input
        # Since input is hidden (display: none), we can't click it, but set_input_files should work
        file_input = page.locator('input[data-testid="file-upload"]')

        # Ensure the controls panel is loaded
        page.wait_for_selector('.controls-panel')

        print("Uploading large file...")
        file_input.set_input_files(large_file_path)

        # Wait for the error message
        # The status message appears in a div with role="status" and class "persist-status error"
        error_message = page.locator('.persist-status.error')
        try:
            error_message.wait_for(state="visible", timeout=5000)
            print("Error message appeared!")
            text = error_message.inner_text()
            print(f"Message text: {text}")

            if "File size exceeds 5MB limit" in text:
                print("SUCCESS: Correct error message found.")
            else:
                print("FAILURE: Incorrect error message.")

            # Scroll to the error message so it is visible in screenshot
            error_message.scroll_into_view_if_needed()

        except Exception as e:
            print(f"Error message did not appear: {e}")

        # Take a screenshot of the controls panel
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/file_upload_error_visible.png"

        # Locate controls panel to take screenshot of just that area if possible, or full page
        controls = page.locator('.controls-panel')
        controls.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        # Cleanup
        os.remove(large_file_path)
        browser.close()

if __name__ == "__main__":
    verify_file_upload_limit()
