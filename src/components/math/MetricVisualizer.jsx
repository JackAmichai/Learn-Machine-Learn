import React, { useState } from 'react';

export default function MetricVisualizer() {
  const [tp, setTP] = useState(70);
  const [tn, setTN] = useState(20);
  const [fp, setFP] = useState(5);
  const [fn, setFN] = useState(5);

  const total = tp + tn + fp + fn;
  const accuracy = total > 0 ? (tp + tn) / total : 0;
  const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
  const f1 = precision + recall > 0 ? 2 * (precision * recall) / (precision + recall) : 0;

  return (
    <div className="metric-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 280 200" width="100%" height="220">
          <text x="140" y="15" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            Classification Metrics Dashboard
          </text>
          
          <rect x="20" y="30" width="240" height="90" fill="rgba(0,0,0,0.3)" rx="4" />
          
          <rect x="40" y="45" width="40" height="60" fill="#00ff9d" rx="2" title="TP" />
          <rect x="85" y={45 + (1 - tn / 40) * 30} width="40" height={(tn / 40) * 30} fill="#4ecdc4" rx="2" title="TN" />
          <rect x="130" y={45 + (1 - fp / 40) * 30} width="40" height={(fp / 40) * 30} fill="#ff6b6b" rx="2" title="FP" />
          <rect x="175" y={45 + (1 - fn / 40) * 30} width="40" height={(fn / 40) * 30} fill="#ffd93d" rx="2" title="FN" />
          
          <text x="60" y="120" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">TP</text>
          <text x="105" y="120" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">TN</text>
          <text x="150" y="120" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">FP</text>
          <text x="195" y="120" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">FN</text>
          
          <rect x="230" y="45" width="20" height="60" fill="rgba(255,255,255,0.1)" rx="2" />
          <text x="240" y="120" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">Total</text>
          <text x="240" y="135" fill="var(--accent-primary)" fontSize="11" textAnchor="middle">{total}</text>

          <rect x="20" y="130" width="240" height="65" fill="rgba(0,242,255,0.1)" rx="4" />
          
          <g transform="translate(30, 145)">
            <text x="0" y="0" fill="var(--text-secondary)" fontSize="9">Accuracy</text>
            <text x="100" y="0" fill={accuracy > 0.9 ? '#00ff9d' : accuracy > 0.7 ? '#ffd93d' : '#ff6b6b'} fontSize="14" fontWeight="bold">{(accuracy * 100).toFixed(1)}%</text>
          </g>
          <g transform="translate(30, 165)">
            <text x="0" y="0" fill="var(--text-secondary)" fontSize="9">Precision</text>
            <text x="100" y="0" fill={precision > 0.9 ? '#00ff9d' : precision > 0.7 ? '#ffd93d' : '#ff6b6b'} fontSize="14" fontWeight="bold">{(precision * 100).toFixed(1)}%</text>
          </g>
          <g transform="translate(150, 145)">
            <text x="0" y="0" fill="var(--text-secondary)" fontSize="9">Recall</text>
            <text x="80" y="0" fill={recall > 0.9 ? '#00ff9d' : recall > 0.7 ? '#ffd93d' : '#ff6b6b'} fontSize="14" fontWeight="bold">{(recall * 100).toFixed(1)}%</text>
          </g>
          <g transform="translate(150, 165)">
            <text x="0" y="0" fill="var(--text-secondary)" fontSize="9">F1 Score</text>
            <text x="80" y="0" fill={f1 > 0.9 ? '#00ff9d' : f1 > 0.7 ? '#ffd93d' : '#ff6b6b'} fontSize="14" fontWeight="bold">{(f1 * 100).toFixed(1)}%</text>
          </g>
        </svg>
      </div>

      <div className="confusion-matrix">
        <h4>Confusion Matrix</h4>
        <div className="cm-grid">
          <div className="cm-cell true-pos" onClick={() => setTP(Math.min(100, tp + 5))}>TP: {tp}</div>
          <div className="cm-cell false-neg" onClick={() => setFN(Math.max(0, fn - 5))}>FN: {fn}</div>
          <div className="cm-cell false-pos" onClick={() => setFP(Math.max(0, fp - 5))}>FP: {fp}</div>
          <div className="cm-cell true-neg" onClick={() => setTN(Math.min(100, tn + 5))}>TN: {tn}</div>
        </div>
        <p className="hint">Click to adjust values</p>
      </div>

      <div className="controls">
        <div className="slider-group">
          <label>True Positives: {tp}</label>
          <input type="range" min="0" max="100" value={tp} onChange={(e) => setTP(parseInt(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>True Negatives: {tn}</label>
          <input type="range" min="0" max="100" value={tn} onChange={(e) => setTN(parseInt(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>False Positives: {fp}</label>
          <input type="range" min="0" max="100" value={fp} onChange={(e) => setFP(parseInt(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>False Negatives: {fn}</label>
          <input type="range" min="0" max="100" value={fn} onChange={(e) => setFN(parseInt(e.target.value))} />
        </div>
      </div>

      <div className="formulas">
        <div className="formula">
          <span>Accuracy = (TP + TN) / Total = {(accuracy * 100).toFixed(1)}%</span>
        </div>
        <div className="formula">
          <span>Precision = TP / (TP + FP) = {(precision * 100).toFixed(1)}%</span>
        </div>
        <div className="formula">
          <span>Recall = TP / (TP + FN) = {(recall * 100).toFixed(1)}%</span>
        </div>
        <div className="formula">
          <span>F1 = 2 × P × R / (P + R) = {(f1 * 100).toFixed(1)}%</span>
        </div>
      </div>

      <style>{`
        .metric-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 16px;
        }
        .viz-container {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 12px;
        }
        .confusion-matrix {
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 12px;
        }
        .confusion-matrix h4 {
          margin: 0 0 8px 0;
          font-size: 11px;
          color: var(--accent-primary);
        }
        .cm-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
        }
        .cm-cell {
          padding: 8px;
          text-align: center;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
          transition: transform 0.1s;
        }
        .cm-cell:hover {
          transform: scale(1.05);
        }
        .true-pos { background: rgba(0,255,157,0.3); color: #00ff9d; }
        .true-neg { background: rgba(78,205,196,0.3); color: #4ecdc4; }
        .false-pos { background: rgba(255,107,107,0.3); color: #ff6b6b; }
        .false-neg { background: rgba(255,217,61,0.3); color: #ffd93d; }
        .hint {
          margin: 6px 0 0 0;
          font-size: 9px;
          color: var(--text-secondary);
          text-align: center;
        }
        .controls {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }
        .slider-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .slider-group label {
          font-size: 10px;
          color: var(--text-secondary);
          min-width: 100px;
        }
        .slider-group input[type="range"] {
          flex: 1;
          accent-color: var(--accent-primary);
        }
        .formulas {
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 10px;
        }
        .formula {
          padding: 4px 0;
          font-size: 10px;
          color: var(--text-secondary);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .formula:last-child {
          border-bottom: none;
        }
        .formula span {
          color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
}
