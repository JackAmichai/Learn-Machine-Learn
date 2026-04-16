import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PersonalizationContext } from '../contexts/PersonalizationContext';

/**
 * Floating persistent navigation button, pinned to the bottom-left.
 * Lets the user jump home or restart their learning path
 * (clears profile → re-opens onboarding questionnaire).
 *
 * Hidden on the landing page (where these actions don't apply).
 */
export function HomeNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { resetProfile } = useContext(PersonalizationContext);
    const [open, setOpen] = useState(false);
    const [confirming, setConfirming] = useState(false);

    // Hide on landing page — it already has everything
    if (location.pathname === '/') return null;

    const goHome = () => {
        setOpen(false);
        navigate('/dashboard');
    };

    const goTo = (path) => {
        setOpen(false);
        setConfirming(false);
        navigate(path);
    };

    const restartPath = () => {
        resetProfile();
        setOpen(false);
        setConfirming(false);
        navigate('/');
    };

    const QUICK_LINKS = [
        { path: '/dashboard',       label: 'Home',                desc: 'Back to your dashboard',
          icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-6h-4v6a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2z"/> },
        { path: '/playground',      label: 'Playground',          desc: 'Train and tweak models live',
          icon: <><circle cx="12" cy="12" r="9"/><path d="M9 9l6 3-6 3z"/></> },
        { path: '/lessons',         label: 'Interactive Lessons', desc: 'Step-by-step guided modules',
          icon: <><path d="M2 3h7a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-7a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h8z"/></> },
        { path: '/quizzes',         label: 'Quizzes',             desc: 'Test what you learned',
          icon: <><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/><circle cx="12" cy="12" r="10"/></> },
        { path: '/resources',       label: 'Resource Library',    desc: 'Papers, books, courses, tools',
          icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></> },
        { path: '/looking-forward', label: 'Looking Forward',     desc: 'Where ML is heading next',
          icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></> },
    ];

    return (
        <>
            {open && (
                <div
                    className="homenav-backdrop"
                    onClick={() => { setOpen(false); setConfirming(false); }}
                    aria-hidden="true"
                />
            )}
            <div className={`homenav-wrap ${open ? 'open' : ''}`}>
                {open && (
                    <div className="homenav-menu" role="menu">
                        <div className="homenav-section-label">Jump to</div>
                        {QUICK_LINKS.map(link => {
                            const isCurrent = location.pathname === link.path;
                            return (
                                <button
                                    key={link.path}
                                    className={`homenav-item ${isCurrent ? 'is-current' : ''}`}
                                    role="menuitem"
                                    onClick={() => goTo(link.path)}
                                    disabled={isCurrent}
                                    aria-current={isCurrent ? 'page' : undefined}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {link.icon}
                                    </svg>
                                    <div className="homenav-item-text">
                                        <strong>{link.label}</strong>
                                        <span>{link.desc}</span>
                                    </div>
                                    {isCurrent && <span className="homenav-current-pill">Current</span>}
                                </button>
                            );
                        })}
                        <div className="homenav-divider" />
                        <div className="homenav-section-label">Tools</div>
                        <button
                            className="homenav-item"
                            role="menuitem"
                            onClick={() => {
                                setOpen(false);
                                setConfirming(false);
                                window.dispatchEvent(new Event('lml:open-accessibility'));
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="4" r="2" />
                                <path d="M5 9h14" />
                                <path d="M12 9v6" />
                                <path d="M9 21l3-6 3 6" />
                            </svg>
                            <div className="homenav-item-text">
                                <strong>Accessibility</strong>
                                <span>Brightness, font size, color vision</span>
                            </div>
                        </button>
                        <div className="homenav-divider" />
                        {!confirming ? (
                            <button className="homenav-item" role="menuitem" onClick={() => setConfirming(true)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>
                                <div className="homenav-item-text">
                                    <strong>Restart path</strong>
                                    <span>Pick a new learning journey</span>
                                </div>
                            </button>
                        ) : (
                            <div className="homenav-confirm">
                                <p>This clears your profile and progress. Continue?</p>
                                <div className="homenav-confirm-actions">
                                    <button className="homenav-cancel" onClick={() => setConfirming(false)}>Cancel</button>
                                    <button className="homenav-danger" onClick={restartPath}>Yes, restart</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <button
                    className="homenav-fab"
                    aria-label={open ? 'Close navigation menu' : 'Open home & restart menu'}
                    aria-expanded={open}
                    onClick={() => { setOpen(o => !o); setConfirming(false); }}
                >
                    {open ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-6h-4v6a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2z"/></svg>
                    )}
                </button>
            </div>

            <style>{`
                .homenav-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.25);
                    backdrop-filter: blur(2px);
                    z-index: 1500;
                    animation: hnFade 0.15s ease-out;
                }
                @keyframes hnFade { from { opacity: 0; } to { opacity: 1; } }

                .homenav-wrap {
                    position: fixed;
                    left: 20px;
                    bottom: 20px;
                    z-index: 1600;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 12px;
                }
                .homenav-fab {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    border: none;
                    cursor: pointer;
                    color: #000;
                    background: linear-gradient(135deg, #00f2ff, #7000ff);
                    box-shadow: 0 8px 24px rgba(0, 242, 255, 0.35),
                                0 4px 12px rgba(112, 0, 255, 0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                                box-shadow 0.25s ease;
                }
                .homenav-fab:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 12px 32px rgba(0, 242, 255, 0.5),
                                0 6px 16px rgba(112, 0, 255, 0.35);
                }
                .homenav-wrap.open .homenav-fab {
                    background: linear-gradient(135deg, #ff0055, #7000ff);
                    color: #fff;
                }
                .homenav-menu {
                    background: rgba(15, 15, 26, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 10px 8px;
                    min-width: 280px;
                    max-height: calc(100vh - 100px);
                    overflow-y: auto;
                    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5);
                    animation: hnSlide 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .homenav-section-label {
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 1.6px;
                    color: var(--text-secondary);
                    padding: 4px 14px 8px;
                    font-weight: 600;
                }
                .homenav-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.07);
                    margin: 6px 8px;
                }
                .homenav-item.is-current {
                    background: rgba(0, 242, 255, 0.06);
                    cursor: default;
                }
                .homenav-item.is-current strong { color: var(--accent-primary); }
                .homenav-current-pill {
                    margin-left: auto;
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--accent-primary);
                    background: rgba(0, 242, 255, 0.12);
                    padding: 3px 7px;
                    border-radius: 999px;
                    font-weight: 700;
                }
                @keyframes hnSlide {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .homenav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                    background: transparent;
                    border: none;
                    padding: 12px 14px;
                    border-radius: 10px;
                    cursor: pointer;
                    color: var(--text-primary);
                    text-align: left;
                    transition: background 0.2s;
                    font-family: inherit;
                }
                .homenav-item:hover {
                    background: rgba(255, 255, 255, 0.06);
                }
                .homenav-item svg { color: var(--accent-primary); flex-shrink: 0; }
                .homenav-item-text { display: flex; flex-direction: column; gap: 2px; }
                .homenav-item-text strong {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-primary);
                }
                .homenav-item-text span {
                    font-size: 12px;
                    color: var(--text-secondary);
                }
                .homenav-confirm {
                    padding: 14px;
                    border-top: 1px solid rgba(255,255,255,0.08);
                    margin-top: 4px;
                }
                .homenav-confirm p {
                    margin: 0 0 10px;
                    font-size: 13px;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }
                .homenav-confirm-actions {
                    display: flex;
                    gap: 8px;
                    justify-content: flex-end;
                }
                .homenav-cancel,
                .homenav-danger {
                    border: none;
                    padding: 8px 14px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: inherit;
                }
                .homenav-cancel {
                    background: rgba(255,255,255,0.06);
                    color: var(--text-primary);
                }
                .homenav-cancel:hover { background: rgba(255,255,255,0.1); }
                .homenav-danger {
                    background: linear-gradient(135deg, #ff0055, #c00040);
                    color: #fff;
                }
                .homenav-danger:hover { transform: translateY(-1px); }
            `}</style>
        </>
    );
}
