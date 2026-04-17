import React from 'react';

/**
 * App-wide error boundary.
 *
 * Goals:
 *   - Never strand the user on a blank screen.
 *   - Make the error visible in dev (full stack), tasteful in prod.
 *   - Always offer a "back to safety" action — reload, go home, file feedback.
 *
 * State carries an `errorId` so a user can quote a specific error to me.
 */
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null, errorId: null };
    }

    static getDerivedStateFromError() {
        const id = `err_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
        return { hasError: true, errorId: id };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error('Uncaught error:', error, errorInfo);
    }

    handleReload = () => {
        try { window.location.reload(); } catch { /* noop */ }
    };

    handleGoHome = () => {
        try { window.location.assign('/'); } catch { /* noop */ }
    };

    handleReport = () => {
        const subj = encodeURIComponent('Learn Machine Learn — error report');
        const body = encodeURIComponent(
            `Error ID: ${this.state.errorId}\n` +
            `URL: ${typeof window !== 'undefined' ? window.location.href : 'unknown'}\n\n` +
            `Message:\n${this.state.error?.message || 'unknown'}\n\n` +
            `Stack:\n${this.state.error?.stack || 'n/a'}\n`
        );
        try { window.location.href = `mailto:jackamichai@gmail.com?subject=${subj}&body=${body}`; } catch { /* noop */ }
    };

    render() {
        if (!this.state.hasError) return this.props.children;

        const isDev = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV);

        return (
            <div className="lml-eb">
                <div className="lml-eb-inner">
                    <div className="lml-eb-icon" aria-hidden="true">⚠️</div>
                    <h1>Something went sideways.</h1>
                    <p className="lml-eb-lede">
                        A part of the app threw an error and we caught it before it took the
                        whole page down. The rest of the site still works.
                    </p>

                    <div className="lml-eb-id">
                        Error ID: <code>{this.state.errorId}</code>
                    </div>

                    <div className="lml-eb-actions">
                        <button className="lml-eb-btn primary" onClick={this.handleReload}>
                            🔄 Reload page
                        </button>
                        <button className="lml-eb-btn" onClick={this.handleGoHome}>
                            🏠 Go home
                        </button>
                        <button className="lml-eb-btn" onClick={this.handleReport}>
                            ✉️ Report it to me
                        </button>
                    </div>

                    {isDev && (
                        <details className="lml-eb-details">
                            <summary>Stack trace (dev only)</summary>
                            <pre>
                                {this.state.error && this.state.error.toString()}
                                {'\n\n'}
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    )}
                </div>

                <style>{`
                    .lml-eb {
                        position: fixed;
                        inset: 0;
                        background:
                            radial-gradient(900px 500px at 50% -10%, rgba(255,0,85,0.10), transparent 60%),
                            radial-gradient(900px 500px at 50% 110%, rgba(112,0,255,0.10), transparent 60%),
                            #0a0a0f;
                        color: #e8e8f0;
                        font-family: 'Inter', system-ui, sans-serif;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                        overflow-y: auto;
                        z-index: 99999;
                    }
                    .lml-eb-inner {
                        max-width: 560px;
                        width: 100%;
                        background: rgba(255,255,255,0.02);
                        border: 1px solid rgba(255,255,255,0.08);
                        border-radius: 16px;
                        padding: 36px 32px;
                        text-align: center;
                    }
                    .lml-eb-icon { font-size: 56px; margin-bottom: 16px; }
                    .lml-eb h1 {
                        font-family: 'Outfit', sans-serif;
                        font-size: 28px;
                        margin: 0 0 12px;
                    }
                    .lml-eb-lede { color: #b8b8d0; line-height: 1.6; margin: 0 0 20px; }
                    .lml-eb-id {
                        font-size: 12px;
                        color: #8a8aa0;
                        margin-bottom: 28px;
                    }
                    .lml-eb-id code {
                        font-family: ui-monospace, monospace;
                        background: rgba(255,255,255,0.04);
                        padding: 3px 8px;
                        border-radius: 5px;
                        color: #00f2ff;
                    }
                    .lml-eb-actions {
                        display: flex;
                        gap: 10px;
                        justify-content: center;
                        flex-wrap: wrap;
                        margin-bottom: 24px;
                    }
                    .lml-eb-btn {
                        background: transparent;
                        border: 1px solid rgba(255,255,255,0.15);
                        color: #e8e8f0;
                        padding: 10px 18px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-family: inherit;
                        font-size: 13px;
                        font-weight: 500;
                        transition: all 0.2s;
                    }
                    .lml-eb-btn:hover { border-color: #00f2ff; color: #00f2ff; }
                    .lml-eb-btn.primary {
                        background: linear-gradient(135deg, #00f2ff, #7000ff);
                        color: #fff;
                        border: none;
                        font-weight: 700;
                    }
                    .lml-eb-btn.primary:hover { transform: translateY(-1px); }
                    .lml-eb-details {
                        text-align: left;
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid rgba(255,255,255,0.06);
                    }
                    .lml-eb-details summary {
                        cursor: pointer;
                        font-size: 12px;
                        color: #8a8aa0;
                        margin-bottom: 10px;
                    }
                    .lml-eb-details pre {
                        background: rgba(0,0,0,0.4);
                        border: 1px solid rgba(255,255,255,0.06);
                        border-radius: 8px;
                        padding: 14px;
                        font-family: ui-monospace, monospace;
                        font-size: 11px;
                        line-height: 1.5;
                        color: #c084fc;
                        overflow: auto;
                        max-height: 240px;
                        white-space: pre-wrap;
                        word-break: break-word;
                    }
                `}</style>
            </div>
        );
    }
}

export default ErrorBoundary;
