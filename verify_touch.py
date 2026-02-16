from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    # Emulate a device with touch support (iPhone 11)
    context = browser.new_context(
        viewport={'width': 414, 'height': 896},
        has_touch=True,
        is_mobile=True,
        user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1'
    )
    page = context.new_page()

    # Navigate to app
    page.goto("http://localhost:5173")

    # Wait for the app to load
    page.wait_for_selector(".controls-panel")

    # Click "Vision (Beta)" button
    # Since we are in mobile view, we might need to verify if the layout is different.
    # But based on CSS, it seems responsive.
    page.get_by_role("button", name="Vision (Beta)").click()

    # Wait for canvas to be visible
    canvas = page.get_by_role("img", name="10 by 10 pixel drawing canvas")
    canvas.wait_for()

    # Get canvas bounding box
    box = canvas.bounding_box()
    if not box:
        print("Canvas not found or not visible")
        return

    print(f"Canvas found at: {box}")

    # Simulate touch tap to draw a dot
    # We tap at (20, 20) relative to canvas
    tap_x = box["x"] + 40
    tap_y = box["y"] + 40
    page.touchscreen.tap(tap_x, tap_y)

    # Wait for visual update
    page.wait_for_timeout(500)

    # Take screenshot
    page.screenshot(path="verification_vision.png")
    print("Screenshot saved to verification_vision.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
