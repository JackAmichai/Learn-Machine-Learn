import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';

/**
 * 404 page — playful but useful. Shows the user the URL they tried, then
 * surfaces the most likely places they wanted to go. Avoids dead-ending.
 */
export function NotFound() {
    const location = useLocation();

    useEffect(() => {
        document.title = '404 — Learn Machine Learn';
    }, []);

    const suggestions = [
        { to: '/',           label: 'Home',                desc: 'Start with the questionnaire' },
        { to: '/playground', label: 'Playground',          desc: 'Train and visualize a network' },
        { to: '/lab',        label: 'Lab',                 desc: 'Train on your own CSV' },
        { to: '/lessons',    label: 'Interactive Lessons', desc: '15+ guided modules' },
        { to: '/resources',  label: 'Resource Library',    desc: '80+ papers, books, and courses' },
        { to: '/notes',      label: 'Notes',               desc: 'Long-form on ML ideas' },
    ];

    return (
        <div className="nf-page">
            <header className="nf-header">
                <Link to="/" className="nf-back">← Home</Link>
                <ThemeToggle />
            </header>

            <main className="nf-main">
                <div className="nf-hero">
                    <div className="nf-glitch" aria-hidden="true">
                        <span>4</span><span>0</span><span>4</span>
                    </div>
                    <h1>This route doesn&apos;t exist… yet.</h1>
                    <p className="nf-url">
                        <code>{location.pathname}</code>
                    </p>
                    <p className="nf-msg">
                        Maybe a typo, maybe a stale link. The model thinks one of these is what you wanted:
                    </p>
                </div>

                <div className="nf-suggestions">
                    {suggestions.map(s => (
                        <Link key={s.to} to={s.to} className="nf-suggestion">
                            <strong>{s.label}</strong>
                            <span>{s.desc}</span>
                            <em>{s.to}</em>
                        </Link>
                    ))}
                </div>

                <p className="nf-footer-note">
                    Think this is a bug? <a href="mailto:jackamichai@gmail.com?subject=404%20on%20Learn%20Machine%20Learn">Email me</a> — include the URL above.
                </p>
            </main>

            <style>{`
                .nf-page {
                    min-height: 100vh;
                    color: var(--text-primary);
                    background:
                        radial-gradient(900px 500px at 50% -10%, rgba(255,0,85,0.10), transparent 60%),
                        radial-gradient(900px 500px at 50% 110%, rgba(112,0,255,0.10), transparent 60%),
                        var(--bg-primary);
                    font-family: var(--font-main, 'Inter', system-ui, sans-serif);
                    display: flex;
                    flex-direction: column;
                }
                .nf-header {
                    max-width: 900px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 20px 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .nf-back {
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: 14px;
                }
                .nf-back:hover { color: var(--accent-primary); }
                .nf-main {
                    max-width: 900px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 40px 24px 60px;
                    flex: 1;
                }
                .nf-hero { text-align: center; margin-bottom: 40px; }
                .nf-glitch {
                    font-family: 'Outfit', var(--font-main);
                    font-size: clamp(96px, 18vw, 180px);
                    font-weight: 800;
                    line-height: 0.9;
                    background: linear-gradient(135deg, #ff0055, #7000ff, #00f2ff);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    letter-spacing: -8px;
                    user-select: none;
                }
                .nf-glitch span { display: inline-block; animation: nfFloat 3s ease-in-out infinite; }
                .nf-glitch span:nth-child(2) { animation-delay: 0.2s; }
                .nf-glitch span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes nfFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                .nf-hero h1 {
                    font-family: 'Outfit', var(--font-main);
                    font-size: clamp(24px, 4vw, 36px);
                    margin: 16px 0 12px;
                    letter-spacing: -0.5px;
                }
                .nf-url {
                    font-size: 14px;
                    color: var(--text-secondary);
                    margin: 0 0 14px;
                }
                .nf-url code {
                    background: rgba(255,0,85,0.08);
                    border: 1px solid rgba(255,0,85,0.2);
                    color: #ff6b8a;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-family: ui-monospace, monospace;
                    font-size: 13px;
                    word-break: break-all;
                }
                .nf-msg {
                    font-size: 15px;
                    color: var(--text-secondary);
                    max-width: 560px;
                    margin: 0 auto;
                }
                .nf-suggestions {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 14px;
                    margin-bottom: 30px;
                }
                .nf-suggestion {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 16px 18px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 12px;
                    text-decoration: none;
                    color: inherit;
                    transition: border-color 0.2s, transform 0.2s;
                }
                .nf-suggestion:hover {
                    border-color: var(--accent-primary);
                    transform: translateY(-2px);
                }
                .nf-suggestion strong {
                    font-family: 'Outfit', var(--font-main);
                    font-size: 16px;
                    color: var(--text-primary);
                }
                .nf-suggestion span {
                    font-size: 13px;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }
                .nf-suggestion em {
                    font-style: normal;
                    font-family: ui-monospace, monospace;
                    font-size: 11px;
                    color: var(--accent-primary);
                    margin-top: 4px;
                }
                .nf-footer-note {
                    text-align: center;
                    font-size: 13px;
                    color: var(--text-secondary);
                }
                .nf-footer-note a { color: var(--accent-primary); text-decoration: none; }
                .nf-footer-note a:hover { text-decoration: underline; }
            `}</style>
        </div>
    );
}

export default NotFound;
