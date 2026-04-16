import React, { useState } from 'react';

export default function SkipConnectionVisualizer() {
  const [depth, setDepth] = useState(3);
  const [useSkip, setUseSkip] = useState(true);

  const calculateGradientFlow = () => {
    const baseGrad = 1.0;
    const avgWeight = 0.9;
    
    if (useSkip) {
      return baseGrad;
    } else {
      return baseGrad * Math.pow(avgWeight, depth);
    }
  };

  const gradientFlow = calculateGradientFlow();

  return (
    <div className="skip-connection-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 280 180" width="100%" height="200">
          <text x="140" y="15" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            Skip Connections: Gradient Flow
          </text>
          
          {[...Array(depth)].map((_, i) => {
            const y = 45 + i * 35;
            return (
              <g key={i}>
                <rect x="60" y={y} width="50" height="25" fill="#ff6b6b" rx="4" />
                <text x="85" y={y + 16} fill="#000" fontSize="9" textAnchor="middle">Layer {i + 1}</text>
                
                {useSkip && (
                  <path 
                    d={`M 110 ${y + 12} Q 140 ${y + 12} 170 ${y + 12}`}
                    fill="none" 
                    stroke="#00ff9d" 
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                  />
                )}
                
                <rect x="170" y={y} width="50" height="25" fill="#4ecdc4" rx="4" />
                <text x="195" y={y + 16} fill="#000" fontSize="9" textAnchor="middle">F(x)</text>
              </g>
            );
          })}

          {useSkip && (
            <g>
              <line x1="60" y1="45" x2="60" y2={45 + (depth - 1) * 35} stroke="#00ff9d" strokeWidth="2" strokeDasharray="4,2" />
              <line x1="220" y1="45" x2="220" y2={45 + (depth - 1) * 35} stroke="#00ff9d" strokeWidth="2" strokeDasharray="4,2" />
              <line x1="60" y1={45 + (depth - 1) * 35} x2="220" y2={45 + (depth - 1) * 35} stroke="#00ff9d" strokeWidth="2" />
              <text x="140" y={45 + depth * 35} fill="#00ff9d" fontSize="8" textAnchor="middle">Skip Connection</text>
            </g>
          )}

          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#00ff9d" />
            </marker>
          </defs>

          <rect x="20" y="145" width="240" height="30" fill="rgba(0,242,255,0.1)" rx="4" />
          <text x="30" y="160" fill="var(--text-secondary)" fontSize="9">Gradient Flow:</text>
          <text x="140" y="160" fill={useSkip ? '#00ff9d' : '#ff6b6b'} fontSize="12" textAnchor="middle" fontWeight="bold">
            {gradientFlow.toExponential(2)}
          </text>
          <text x="240" y="160" fill="var(--text-secondary)" fontSize="8">{useSkip ? '✓ Strong' : '✗ Vanishing'}</text>
        </svg>
      </div>

      <div className="controls">
        <div className="slider-group">
          <label>Network Depth: {depth}</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            step="1" 
            value={depth} 
            onChange={(e) => setDepth(parseInt(e.target.value))}
          />
        </div>
        
        <button 
          className={`toggle-btn ${useSkip ? 'active' : ''}`}
          onClick={() => setUseSkip(!useSkip)}
        >
          {useSkip ? '✓ Skip Connections ON' : '○ Skip Connections OFF'}
        </button>
      </div>

      <div className="info-box">
        <h4>Why Skip Connections Work</h4>
        <ul>
          <li><strong>Gradient Highway:</strong> Gradients flow directly without attenuation</li>
          <li><strong>Identity Mapping:</strong> Network can learn to "do nothing" if needed</li>
          <li><strong>Deeper Networks:</strong> Enables training 100+ layer networks (ResNet)</li>
        </ul>
      </div>

      <div className="insights">
        <p>With {depth} layers and avg weight {useSkip ? '1.0 (via skip):' : '0.9:'} gradient = {gradientFlow.toExponential(3)}</p>
        <p>Without skips, deep networks suffer from <strong>vanishing gradients</strong>.</p>
      </div>

      <style>{`
        .skip-connection-visualizer {
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
        .controls {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 12px;
        }
        .slider-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .slider-group label {
          font-size: 11px;
          color: var(--text-secondary);
          min-width: 120px;
        }
        .slider-group input[type="range"] {
          flex: 1;
          accent-color: var(--accent-primary);
        }
        .toggle-btn {
          padding: 10px 16px;
          border: 1px solid var(--glass-border);
          background: transparent;
          color: var(--text-secondary);
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .toggle-btn.active {
          background: rgba(0, 255, 157, 0.2);
          border-color: #00ff9d;
          color: #00ff9d;
        }
        .info-box {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 12px;
        }
        .info-box h4 {
          margin: 0 0 8px 0;
          font-size: 12px;
          color: var(--accent-primary);
        }
        .info-box ul {
          margin: 0;
          padding-left: 16px;
          font-size: 10px;
          color: var(--text-secondary);
        }
        .info-box li {
          margin-bottom: 4px;
        }
        .info-box strong {
          color: var(--text-primary);
        }
        .insights {
          font-size: 10px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .insights p {
          margin: 4px 0;
        }
      `}</style>
    </div>
  );
}
