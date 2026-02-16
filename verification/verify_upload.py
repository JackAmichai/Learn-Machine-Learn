from playwright.sync_api import sync_playwright, expect
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800}) # Set a larger viewport

        # Navigate to the app
        print("Navigating to app...")
        page.goto("http://localhost:5173")

        # Wait for the file input to be present (it's hidden but present)
        file_input = page.get_by_test_id("file-upload")
        expect(file_input).to_be_attached()

        # Upload the large file
        print("Uploading large file...")
        large_file_path = os.path.abspath("verification/large.json")
        file_input.set_input_files(large_file_path)

        # Expect the error message
        print("Waiting for error message...")
        error_message = page.get_by_text("File too large (max 5MB).")
        expect(error_message).to_be_visible()

        # Scroll into view explicitly
        error_message.scroll_into_view_if_needed()

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run()
