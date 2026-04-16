import { useState, useEffect } from 'react';

/**
 * AccessibilityPanel — floating top-right button that opens a settings dropdown.
 *
 * Anchored top-right so it sits in the visual "header strip" away from the
 * floating chatbot (bottom-right), HomeNav (bottom-left), and Buy Me a Coffee
 * (landing page only). Listens for the global `lml:open-accessibility` event
 * so other UI (e.g. HomeNav menu entry) can open it too.
 */
export function AccessibilityPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        brightness: 100,
        fontSize: 'normal',
        highContrast: false,
        reduceMotion: false,
        colorBlindMode: 'none'
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--user-brightness', settings.brightness + '%');
        document.documentElement.style.setProperty('--user-font-size', settings.fontSize);

        if (settings.highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }

        if (settings.reduceMotion) {
            document.documentElement.classList.add('reduce-motion');
        } else {
            document.documentElement.classList.remove('reduce-motion');
        }

        const cbClasses = ['colorblind-protanopia', 'colorblind-deuteranopia', 'colorblind-tritanopia'];
        document.documentElement.classList.remove(...cbClasses);
        if (settings.colorBlindMode !== 'none') {
            document.documentElement.classList.add(`colorblind-${settings.colorBlindMode}`);
        }
    }, [settings]);

    // Listen for global open event (HomeNav menu, command palette, etc.)
    useEffect(() => {
        const handler = () => setIsOpen(true);
        window.addEventListener('lml:open-accessibility', handler);
        return () => window.removeEventListener('lml:open-accessibility', handler);
    }, []);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="accessibility-wrapper">
            <button
                className={`accessibility-btn ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Accessibility Settings"
                aria-expanded={isOpen}
                title="Accessibility Settings"
            >
                {/* Universal accessibility "person" icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="4" r="2" />
                    <path d="M5 9h14" />
                    <path d="M12 9v6" />
                    <path d="M9 21l3-6 3 6" />
                </svg>
            </button>

            {isOpen && (
                <div className="accessibility-dropdown" role="dialog" aria-label="Accessibility settings">
                    <div className="a11y-header">
                        <div className="a11y-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="4" r="2" /><path d="M5 9h14" /><path d="M12 9v6" /><path d="M9 21l3-6 3 6" /></svg>
                            <span>Accessibility</span>
                        </div>
                        <button className="a11y-close" onClick={() => setIsOpen(false)} aria-label="Close accessibility panel">×</button>
                    </div>

                    <div className="a11y-section">
                        <label>Brightness</label>
                        <div className="slider-row">
                            <span aria-hidden="true">🌙</span>
                            <input type="range" min="50" max="150" value={settings.brightness}
                                onChange={(e) => updateSetting('brightness', parseInt(e.target.value))}
                                aria-label="Brightness percentage" />
                            <span aria-hidden="true">☀️</span>
                        </div>
                        <span className="value-label">{settings.brightness}%</span>
                    </div>

                    <div className="a11y-section">
                        <label>Font Size</label>
                        <div className="font-size-btns">
                            {['small', 'normal', 'large', 'xlarge'].map(size => (
                                <button key={size} className={settings.fontSize === size ? 'active' : ''}
                                    onClick={() => updateSetting('fontSize', size)}>
                                    {size === 'small' ? 'A-' : size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="a11y-section">
                        <label className="toggle-label">
                            <input type="checkbox" checked={settings.highContrast}
                                onChange={(e) => updateSetting('highContrast', e.target.checked)} />
                            <span>High Contrast Mode</span>
                        </label>
                    </div>

                    <div className="a11y-section">
                        <label className="toggle-label">
                            <input type="checkbox" checked={settings.reduceMotion}
                                onChange={(e) => updateSetting('reduceMotion', e.target.checked)} />
                            <span>Reduce Motion</span>
                        </label>
                    </div>

                    <div className="a11y-section">
                        <label>Color Vision</label>
                        <select value={settings.colorBlindMode} onChange={(e) => updateSetting('colorBlindMode', e.target.value)}>
                            <option value="none">Normal Vision</option>
                            <option value="protanopia">Protanopia (Red-blind)</option>
                            <option value="deuteranopia">Deuteranopia (Green-blind)</option>
                            <option value="tritanopia">Tritanopia (Blue-blind)</option>
                        </select>
                    </div>

                    <button className="reset-btn" onClick={() => setSettings({
                        brightness: 100,
                        fontSize: 'normal',
                        highContrast: false,
                        reduceMotion: false,
                        colorBlindMode: 'none'
                    })}>
                        Reset to Defaults
                    </button>
                </div>
            )}

            {/* Styles always rendered so the button is always visible */}
            <style>{`
                .accessibility-wrapper {
                    position: fixed;
                    top: 18px;
                    right: 18px;
                    z-index: 1700;
                }
                .accessibility-btn {
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.18);
                    background: linear-gradient(135deg, #00f2ff, #00c8d4);
                    color: #001b1f;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s;
                    box-shadow: 0 6px 20px rgba(0, 242, 255, 0.32), 0 0 0 4px rgba(0, 242, 255, 0.05);
                    padding: 0;
                }
                .accessibility-btn:hover {
                    transform: scale(1.08) rotate(-6deg);
                    box-shadow: 0 8px 24px rgba(0, 242, 255, 0.55), 0 0 0 6px rgba(0, 242, 255, 0.08);
                }
                .accessibility-btn:focus-visible {
                    outline: 2px solid #fff;
                    outline-offset: 3px;
                }
                .accessibility-btn.active {
                    background: #fff;
                    color: #000;
                    border-color: #fff;
                }
                .accessibility-dropdown {
                    position: absolute;
                    top: 56px;
                    right: 0;
                    width: 280px;
                    background: rgba(15, 15, 26, 0.98);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 16px;
                    z-index: 1000;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
                    animation: a11ySlide 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes a11ySlide {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .a11y-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .a11y-title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--accent-primary);
                    font-weight: 700;
                    font-size: 14px;
                    font-family: 'Outfit', sans-serif;
                }
                .a11y-close {
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    font-size: 22px;
                    cursor: pointer;
                    padding: 4px;
                    line-height: 1;
                }
                .a11y-section {
                    margin-bottom: 16px;
                }
                .a11y-section label {
                    display: block;
                    font-size: 11px;
                    color: var(--text-secondary);
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    font-weight: 700;
                }
                .slider-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .slider-row input {
                    flex: 1;
                    accent-color: var(--accent-primary);
                }
                .value-label {
                    display: block;
                    text-align: center;
                    font-size: 11px;
                    color: var(--accent-primary);
                    margin-top: 6px;
                    font-weight: 600;
                }
                .font-size-btns {
                    display: flex;
                    gap: 6px;
                }
                .font-size-btns button {
                    flex: 1;
                    padding: 8px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .font-size-btns button.active {
                    background: var(--accent-primary);
                    color: #000;
                    border-color: var(--accent-primary);
                }
                .toggle-label {
                    display: flex !important;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    text-transform: none !important;
                    font-size: 14px !important;
                    color: var(--text-primary) !important;
                    font-weight: 500 !important;
                }
                .toggle-label input {
                    width: 18px;
                    height: 18px;
                    accent-color: var(--accent-primary);
                }
                .a11y-section select {
                    width: 100%;
                    padding: 10px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    color: var(--text-primary);
                    font-size: 13px;
                    font-family: inherit;
                }
                .reset-btn {
                    width: 100%;
                    padding: 12px;
                    background: transparent;
                    border: 1px solid rgba(255, 85, 85, 0.3);
                    border-radius: 8px;
                    color: #ff5555;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 700;
                    margin-top: 10px;
                    transition: all 0.2s;
                }
                .reset-btn:hover {
                    background: rgba(255, 85, 85, 0.1);
                    border-color: #ff5555;
                }

                :root {
                    --user-brightness: 100%;
                    --user-font-size: normal;
                }
                :root {
                    filter: brightness(var(--user-brightness));
                }

                html.high-contrast {
                    --bg-primary: #000000 !important;
                    --bg-secondary: #1a1a1a !important;
                    --bg-panel: #111111 !important;
                    --text-primary: #ffffff !important;
                    --text-secondary: #cccccc !important;
                    --glass-border: #444444 !important;
                    --accent-primary: #00f2ff !important;
                }

                html.reduce-motion * {
                    animation: none !important;
                    transition: none !important;
                }

                html.colorblind-protanopia {
                    --accent-primary: #00b4d8;
                    --accent-secondary: #0077b6;
                }
                html.colorblind-deuteranopia {
                    --accent-primary: #0072b2;
                    --accent-secondary: #023e8a;
                }
                html.colorblind-tritanopia {
                    --accent-primary: #9d4edd;
                    --accent-secondary: #7b2cbf;
                }

                @media (max-width: 768px) {
                    .accessibility-wrapper {
                        top: 12px;
                        right: 12px;
                    }
                    .accessibility-btn {
                        width: 42px;
                        height: 42px;
                    }
                    .accessibility-dropdown {
                        width: calc(100vw - 32px);
                        max-width: 320px;
                    }
                }
            `}</style>
        </div>
    );
}
