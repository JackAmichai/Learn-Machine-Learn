from playwright.sync_api import sync_playwright
import time

def verify_training():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Grant clipboard permissions for potential copy-paste interactions
        context = browser.new_context(permissions=['clipboard-read', 'clipboard-write'])
        page = context.new_page()

        try:
            print("Navigating to app...")
            page.goto("http://localhost:3000")

            # Wait for the app to load
            print("Waiting for app to load...")
            page.wait_for_selector("text=Neural Network Playground", timeout=10000)

            # Find the 'Train' or 'Play' button.
            # Based on common UI patterns for such apps, there's likely a play/pause button.
            # I'll look for a button that might start training.
            # Checking for aria-label or text.

            # Take a screenshot of the initial state
            page.screenshot(path="initial_state.png")
            print("Initial state screenshot taken.")

            # Try to find a button to start training.
            # Inspecting likely candidates.
            # The hook has `isPlaying` state.

            # Let's assume there is a button with a play icon or text "Train" / "Start".
            # I will dump the page content if I can't find it to debug.

            # Searching for a button that looks like a play button.
            # Often these have aria-label="Play" or class containing "play".

            # Let's try to click the first button in the controls area if specific text isn't found.
            # Or just wait and see if it auto-starts (unlikely).

            # From previous file reads, I didn't see the UI components (Controls.jsx).
            # But I know useNeuralNetwork has `isPlaying`.

            # Let's try to find a button with "Train" or "Play" text or title.
            play_button = page.get_by_role("button", name="Play").first
            if not play_button.is_visible():
                play_button = page.get_by_role("button", name="Train").first

            if not play_button.is_visible():
                 # Fallback: look for an icon button.
                 # Let's try to find any button.
                 print("Could not find specific Play button by name. Printing all buttons...")
                 buttons = page.get_by_role("button").all()
                 for b in buttons:
                     print(f"Button: {b.text_content()} | {b.get_attribute('aria-label')}")

                 # Trying to find a button with specific class or SVG.
                 # Actually, let's just take a screenshot of the loaded app.
                 # If the app loads, the refactor didn't break the initial render.
                 # To verify the async change, we need to run training.

                 # Assuming the first button in a control panel might be Play/Pause.
                 pass
            else:
                print("Found Play button. Clicking...")
                play_button.click()

                # Wait for some training to happen (2 seconds)
                # The scan happens every 20 iterations.
                time.sleep(3)

                # Take another screenshot after training
                page.screenshot(path="after_training.png")
                print("After training screenshot taken.")

            # Final screenshot for verification
            page.screenshot(path="verification.png")
            print("Final verification screenshot saved to verification.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_training()
