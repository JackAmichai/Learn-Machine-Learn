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

    const restartPath = () => {
        resetProfile();
        setOpen(false);
        setConfirming(false);
        navigate('/');
    };

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
                        <button className="homenav-item" role="menuitem" onClick={goHome}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-6h-4v6a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2z"/></svg>
                            <div className="homenav-item-text">
                                <strong>Home</strong>
                                <span>Back to your dashboard</span>
                            </div>
                        </button>
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
                    padding: 8px;
                    min-width: 260px;
                    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5);
                    animation: hnSlide 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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
