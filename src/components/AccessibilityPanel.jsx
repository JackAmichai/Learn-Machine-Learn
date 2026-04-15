import { useState, useEffect } from 'react';

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
        
        if (settings.colorBlindMode !== 'none') {
            document.documentElement.classList.add(`colorblind-${settings.colorBlindMode}`);
        } else {
            document.documentElement.classList.remove('colorblind-protanopia', 'colorblind-deuteranopia', 'colorblind-tritanopia');
        }
    }, [settings]);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <>
            <button className="accessibility-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Accessibility Settings" title="Accessibility">
                🔋
            </button>

            {isOpen && (
                <div className="accessibility-dropdown">
                    <div className="a11y-header">
                        <span>⚙️ Accessibility</span>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className="a11y-section">
                        <label>Brightness</label>
                        <div className="slider-row">
                            <span>🌙</span>
                            <input type="range" min="50" max="150" value={settings.brightness} 
                                onChange={(e) => updateSetting('brightness', parseInt(e.target.value))} />
                            <span>☀️</span>
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

                    <style>{`
                        .accessibility-btn {
                            font-size: 20px;
                            padding: 8px;
                            background: var(--bg-secondary);
                            border: var(--glass-border);
                            border-radius: 50%;
                            width: 40px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        }
                        .accessibility-btn:hover {
                            transform: scale(1.1);
                            background: var(--bg-panel);
                        }
                        .accessibility-dropdown {
                            position: absolute;
                            top: 60px;
                            right: 20px;
                            width: 280px;
                            background: var(--bg-panel);
                            border: var(--glass-border);
                            border-radius: var(--radius-lg);
                            padding: 16px;
                            z-index: 1000;
                            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                            animation: slideDown 0.2s ease;
                        }
                        @keyframes slideDown {
                            from { opacity: 0; transform: translateY(-10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .a11y-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 16px;
                            padding-bottom: 10px;
                            border-bottom: 1px solid var(--glass-border);
                        }
                        .a11y-header span {
                            font-weight: bold;
                            color: var(--text-primary);
                        }
                        .close-btn {
                            background: none;
                            border: none;
                            color: var(--text-secondary);
                            font-size: 20px;
                            cursor: pointer;
                        }
                        .a11y-section {
                            margin-bottom: 16px;
                        }
                        .a11y-section label {
                            display: block;
                            font-size: 12px;
                            color: var(--text-secondary);
                            margin-bottom: 8px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                        .slider-row {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        }
                        .slider-row input {
                            flex: 1;
                            accent-color: var(--accent-primary);
                        }
                        .slider-row span {
                            font-size: 14px;
                        }
                        .value-label {
                            display: block;
                            text-align: center;
                            font-size: 11px;
                            color: var(--accent-primary);
                            margin-top: 4px;
                        }
                        .font-size-btns {
                            display: flex;
                            gap: 6px;
                        }
                        .font-size-btns button {
                            flex: 1;
                            padding: 8px;
                            background: var(--bg-secondary);
                            border: 1px solid var(--glass-border);
                            border-radius: 6px;
                            color: var(--text-secondary);
                            cursor: pointer;
                            font-size: 12px;
                        }
                        .font-size-btns button.active {
                            background: var(--accent-primary);
                            color: #000;
                            font-weight: bold;
                        }
                        .toggle-label {
                            display: flex !important;
                            align-items: center;
                            gap: 10px;
                            cursor: pointer;
                            text-transform: none !important;
                            font-size: 14px !important;
                            color: var(--text-primary) !important;
                        }
                        .toggle-label input {
                            width: 18px;
                            height: 18px;
                            accent-color: var(--accent-primary);
                        }
                        .a11y-section select {
                            width: 100%;
                            padding: 8px;
                            background: var(--bg-secondary);
                            border: 1px solid var(--glass-border);
                            border-radius: 6px;
                            color: var(--text-primary);
                            font-size: 13px;
                        }
                        .reset-btn {
                            width: 100%;
                            padding: 10px;
                            background: var(--bg-secondary);
                            border: 1px solid var(--accent-danger);
                            border-radius: 6px;
                            color: var(--accent-danger);
                            cursor: pointer;
                            font-size: 12px;
                            margin-top: 10px;
                        }
                        .reset-btn:hover {
                            background: var(--accent-danger);
                            color: white;
                        }

                        :root {
                            --user-brightness: 100%;
                            --user-font-size: normal;
                        }
                        :root {
                            filter: brightness(var(--user-brightness));
                        }
                        html.font-small { font-size: 14px; }
                        html.font-normal { font-size: 16px; }
                        html.font-large { font-size: 18px; }
                        html.font-xlarge { font-size: 20px; }
                        
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
                    `}</style>
                </div>
            )}
        </>
    );
}
