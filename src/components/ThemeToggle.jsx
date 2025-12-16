import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? '☀️' : '🌙'}
            <style>{`
        .theme-toggle {
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
            transition: all 0.3s ease;
        }
        .theme-toggle:hover {
            transform: scale(1.1);
            background: var(--bg-panel);
            box-shadow: 0 0 10px var(--accent-primary);
        }
      `}</style>
        </button>
    );
}
