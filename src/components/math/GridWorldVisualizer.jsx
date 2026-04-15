import React from 'react';

export default function GridWorldVisualizer({ values }) {
  // Use inputs from the interactive formula slider, with fallback defaults
  const a = values.lr !== undefined ? values.lr : 0.1;
  const r = values.reward !== undefined ? values.reward : 10;
  const g = values.gamma !== undefined ? values.gamma : 0.9;
  const qold = values.qold !== undefined ? values.qold : 50;
  const qnext = values.qnext !== undefined ? values.qnext : 60;

  // The Bellman equation
  const target = r + g * qnext;
  const delta = target - qold;
  const qnew = qold + a * delta;

  return (
    <div className="grid-world-visualizer">
      <div className="board">
        {/* Simple 3x2 representation: S_old -> action -> S_new */}
        <div className="grid-cell old-state">
           <div className="state-label">State (s)</div>
           <div className="q-val">Q = {qold.toFixed(1)}</div>
           <div className="q-new">Next Q ≈ {qnew.toFixed(1)} </div>
        </div>

        <div className="action-arrow">
           <div className="reward">Reward: {r}</div>
           <svg width="60" height="20" viewBox="0 0 60 20">
              <path d="M0,10 L50,10 M50,10 L40,5 M50,10 L40,15" stroke="var(--accent-primary)" strokeWidth="2" fill="none" />
           </svg>
           <div className="action-prob">α = {a}</div>
        </div>

        <div className="grid-cell next-state">
           <div className="state-label">State (s')</div>
           <div className="q-val">Max Q' = {qnext.toFixed(1)}</div>
        </div>
      </div>

      <div className="formula-breakdown">
          <div className={`metric ${delta > 0 ? 'positive' : 'negative'}`}>
            <span>TD Error (Δ): </span>
            <strong>{delta > 0 ? '+' : ''}{delta.toFixed(2)}</strong>
          </div>
          <div className="metric">
            <span>Target (R + γQ'): </span>
            <strong>{target.toFixed(2)}</strong>
          </div>
      </div>
      
      <p className="caption">
         The agent takes an action from <strong>s</strong> to <strong>s'</strong>, receiving reward <strong>{r}</strong>. 
         Notice how the Learning Rate (α) dictates how much of the TD Error ({delta.toFixed(1)}) is actually applied to update the old Q-value.
      </p>

      <style>{`
        .grid-world-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 24px;
          margin: 16px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .board {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }
        .grid-cell {
          width: 120px;
          height: 120px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 2px solid;
          position: relative;
          background: rgba(0, 0, 0, 0.5);
        }
        .old-state {
          border-color: rgba(0, 242, 255, 0.5);
          box-shadow: inset 0 0 15px rgba(0, 242, 255, 0.1);
        }
        .next-state {
          border-color: rgba(112, 0, 255, 0.5);
          box-shadow: inset 0 0 15px rgba(112, 0, 255, 0.1);
        }
        .state-label {
          font-weight: bold;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        .q-val {
          font-family: monospace;
          background: rgba(0, 0, 0, 0.5);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
          color: var(--text-secondary);
        }
        .q-new {
          position: absolute;
          bottom: -15px;
          background: var(--accent-primary);
          color: black;
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 12px;
          box-shadow: 0 4px 10px rgba(0,242,255,0.4);
        }
        .action-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .reward {
          color: #ffc832;
          font-weight: bold;
          font-size: 14px;
        }
        .action-prob {
          color: var(--text-secondary);
          font-size: 12px;
        }
        .formula-breakdown {
          display: flex;
          gap: 24px;
          background: rgba(0, 0, 0, 0.3);
          padding: 12px 24px;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
        }
        .metric {
          font-size: 15px;
        }
        .metric.positive strong { color: #00ff9d; }
        .metric.negative strong { color: #ff5555; }
        .metric strong { font-family: monospace; }
        
        .caption {
          margin-top: 20px;
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
          max-width: 400px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
