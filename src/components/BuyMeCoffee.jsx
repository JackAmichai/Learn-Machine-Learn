import React from 'react';

/**
 * BuyMeCoffee — pinned to the bottom-LEFT corner.
 *
 * Layout coexistence:
 *   - Only mounted on the LandingPage (where HomeNav is hidden).
 *   - Stays at z-index 1400 so the chatbot FAB (z-1650) never gets occluded.
 *   - On narrow screens we shrink the chip and tuck it slightly higher so
 *     it can't visually collide with the chatbot fab on the right edge.
 */
export const BuyMeCoffee = () => {
    return (
        <>
            <a
                href="https://buymeacoffee.com/jackami"
                target="_blank"
                rel="noreferrer"
                className="bmc-button"
                aria-label="Support the project on Buy Me a Coffee"
            >
                <svg
                    width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                <span className="bmc-text">Buy me a coffee</span>
            </a>
            <style>{`
                .bmc-button {
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background-color: #FFDD00;
                    color: #1a1a1a;
                    padding: 11px 18px;
                    border-radius: 50px;
                    text-decoration: none;
                    font-family: 'Outfit', 'Inter', system-ui, sans-serif;
                    font-weight: 700;
                    font-size: 13px;
                    box-shadow: 0 6px 20px rgba(255, 221, 0, 0.35), 0 4px 12px rgba(0,0,0,0.3);
                    transition: transform 0.22s ease, box-shadow 0.22s ease;
                    /* Stays BELOW the chatbot fab (1650) so the bot is never blocked */
                    z-index: 1400;
                    white-space: nowrap;
                }

                .bmc-button:hover {
                    transform: translateY(-2px) scale(1.03);
                    box-shadow: 0 10px 28px rgba(255, 221, 0, 0.5), 0 6px 18px rgba(0,0,0,0.4);
                }

                .bmc-button:focus-visible {
                    outline: 2px solid #fff;
                    outline-offset: 3px;
                }

                @media (max-width: 600px) {
                    .bmc-button {
                        bottom: 14px;
                        left: 14px;
                        padding: 9px;
                        font-size: 12px;
                    }
                    .bmc-text { display: none; }
                }
            `}</style>
        </>
    );
};
