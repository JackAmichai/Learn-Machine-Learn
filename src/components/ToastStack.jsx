import { useToast } from '../hooks/useToast';

const typeAccentMap = {
    success: 'var(--accent-success)',
    info: 'var(--accent-primary)',
    warning: '#f5a524',
    danger: 'var(--accent-danger)'
};

export function ToastStack() {
    const { toasts, dismissToast } = useToast();

    if (!toasts.length) {
        return null;
    }

    return (
        <div className="toast-stack" role="region" aria-live="polite" aria-atomic="true">
            {toasts.map(toast => (
                <div key={toast.id} className={`toast ${toast.type}`}>
                    <div className="toast-body">
                        <strong>{toast.title}</strong>
                        {toast.message && <p>{toast.message}</p>}
                    </div>
                    <button className="toast-dismiss" onClick={() => dismissToast(toast.id)} aria-label="Dismiss notification">×</button>
                </div>
            ))}
            <style>{`
                .toast-stack {
                    position: fixed;
                    top: 24px;
                    right: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    z-index: 999;
                    pointer-events: none;
                }
                .toast {
                    background: var(--bg-panel);
                    border: var(--glass-border);
                    border-left: 4px solid var(--accent-primary);
                    color: var(--text-primary);
                    padding: 12px 16px;
                    border-radius: var(--radius-md);
                    width: 280px;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.35);
                    pointer-events: auto;
                    animation: toast-enter 0.25s ease;
                }
                .toast strong {
                    font-size: 13px;
                    letter-spacing: 0.4px;
                }
                .toast p {
                    margin: 4px 0 0 0;
                    font-size: 12px;
                    color: var(--text-secondary);
                }
                .toast-dismiss {
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    font-size: 16px;
                    padding: 0;
                    min-width: auto;
                    min-height: auto;
                    cursor: pointer;
                }
                .toast.success { border-left-color: ${typeAccentMap.success}; }
                .toast.info { border-left-color: ${typeAccentMap.info}; }
                .toast.warning { border-left-color: ${typeAccentMap.warning}; }
                .toast.danger { border-left-color: ${typeAccentMap.danger}; }
                @keyframes toast-enter {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
