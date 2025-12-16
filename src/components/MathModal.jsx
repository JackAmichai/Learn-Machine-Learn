import { MATH_TOPICS } from '../engine/mathContent';

export function MathModal({ topic, onClose }) {
    const data = MATH_TOPICS[topic];

    if (!data) return null;

    return (
        <div className="math-modal-overlay" onClick={onClose}>
            <div className="math-modal-content" onClick={e => e.stopPropagation()}>
                <div className="math-header">
                    <h2>{data.title}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="math-body" dangerouslySetInnerHTML={{ __html: data.content }} />

                <div className="math-footer">
                    <button onClick={onClose}>Got it!</button>
                </div>
            </div>

            <style>{`
            .math-modal-overlay {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                z-index: 2000; /* Higher than tour */
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.2s ease-out;
            }
            .math-modal-content {
                background: var(--bg-panel);
                border: 1px solid var(--accent-secondary);
                box-shadow: 0 0 30px rgba(112, 0, 255, 0.3);
                width: 600px;
                max-width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                border-radius: 16px;
                padding: 24px;
                color: var(--text-primary);
            }
            .math-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 1px solid var(--glass-border);
                padding-bottom: 10px;
            }
            .math-header h2 {
                margin: 0;
                color: var(--accent-primary);
                font-family: var(--font-main);
            }
            .close-btn {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 28px;
                cursor: pointer;
            }
            .math-body {
                line-height: 1.6;
                font-size: 15px;
            }
            .math-body h4 {
                color: var(--accent-secondary);
                margin-top: 20px;
                margin-bottom: 10px;
            }
            /* Equation Styling */
            .equation {
                background: rgba(0,0,0,0.3);
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                font-family: 'Times New Roman', serif;
                font-style: italic;
                font-size: 18px;
                margin: 15px 0;
                color: #fff;
                border-left: 3px solid var(--accent-primary);
            }
            .math-footer {
                margin-top: 30px;
                text-align: right;
            }
            .math-footer button {
                background: var(--accent-primary);
                color: black;
                font-weight: bold;
                padding: 10px 24px;
                border-radius: 8px;
                transition: transform 0.1s;
            }
            .math-footer button:hover {
                transform: scale(1.05);
            }
        `}</style>
        </div>
    );
}
