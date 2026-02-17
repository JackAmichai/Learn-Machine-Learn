
from playwright.sync_api import sync_playwright

def verify_controls():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:5173...")
            page.goto("http://localhost:5173")
            page.wait_for_load_state("networkidle")

            # Check for the "Add Layer" button
            add_layer_btn = page.get_by_role("button", name="Add a hidden layer")

            # Scroll to make it visible
            add_layer_btn.scroll_into_view_if_needed()

            print(f"Checking Add Layer button text: '{add_layer_btn.inner_text()}'")
            if "+ Add Layer" not in add_layer_btn.inner_text():
                print("FAILURE: 'Add Layer' button text mismatch.")
            else:
                print("SUCCESS: 'Add Layer' button text correct.")

            # Check for the Tooltip in Architecture header
            architecture_header = page.locator("h3", has_text="Architecture")
            tooltip_icon = architecture_header.locator("span.tooltip-word", has_text="ℹ️")
            if tooltip_icon.count() > 0:
                print("SUCCESS: Tooltip icon found in Architecture header.")
            else:
                print("FAILURE: Tooltip icon NOT found in Architecture header.")

            # Take screenshot of the architecture section
            controls_panel = page.locator(".controls-panel")
            # Scroll controls panel to show architecture
            architecture_header.scroll_into_view_if_needed()

            controls_panel.screenshot(path="verification_screenshot_scrolled.png")
            print("Screenshot saved to verification_screenshot_scrolled.png")

        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_controls()
