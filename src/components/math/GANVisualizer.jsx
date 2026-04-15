import React, { useState } from 'react';

export default function GANVisualizer() {
  const [phase, setPhase] = useState('training');
  const [epoch, setEpoch] = useState(50);
  
  const progress = epoch / 100;
  const generatorQuality = Math.min(1, progress * 1.2);
  const discriminatorAccuracy = 0.5 + Math.sin(epoch * 0.1) * 0.3 * (1 - progress);
  
  return (
    <div className="gan-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 120" width="100%" height="140">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            GAN Training: Generator vs Discriminator
          </text>
          
          {/* Generator */}
          <rect x="20" y="35" width="60" height="35" rx="6" fill="var(--accent-secondary)" stroke="var(--glass-border)" />
          <text x="50" y="52" fill="var(--bg-primary)" fontSize="9" textAnchor="middle" fontWeight="bold">Generator</text>
          <text x="50" y="64" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">G(z)</text>
          
          {/* Discriminator */}
          <rect x="120" y="35" width="60" height="35" rx="6" fill="var(--accent-primary)" stroke="var(--glass-border)" />
          <text x="150" y="52" fill="var(--bg-primary)" fontSize="9" textAnchor="middle" fontWeight="bold">Discriminator</text>
          <text x="150" y="64" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">D(x)</text>
          
          {/* Fake data arrow */}
          <line x1="80" y1="52" x2="115" y2="45" stroke="var(--accent-secondary)" strokeWidth="2" markerEnd="url(#arrowGAN)" />
          <text x="98" y="42" fill="var(--accent-secondary)" fontSize="7" textAnchor="middle">fake</text>
          
          {/* Real data arrow */}
          <line x1="50" y1="70" x2="150" y2="90" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrowGAN)" />
          <text x="90" y="88" fill="var(--accent-primary)" fontSize="7" textAnchor="middle">real</text>
          
          {/* Feedback arrow */}
          <line x1="150" y1="75" x2="80" y2="85" stroke="var(--text-secondary)" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arrowGAN)" />
          <text x="115" y="95" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">loss</text>
          
          <defs>
            <marker id="arrowGAN" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5" fill="var(--accent-secondary)" />
            </marker>
          </defs>
          
          {/* Progress bar */}
          <rect x="30" y="105" width="140" height="8" rx="4" fill="var(--bg-secondary)" />
          <rect x="30" y="105" width={140 * progress} height="8" rx="4" fill="var(--accent-primary)" style={{ transition: 'width 0.3s' }} />
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Epoch: {epoch}</label>
          <input type="range" min="0" max="100" step="1" value={epoch} onChange={(e) => setEpoch(Number(e.target.value))} />
        </div>
      </div>
      
      <div className="stats">
        <span style={{ color: 'var(--accent-secondary)' }}>G Quality: {(generatorQuality * 100).toFixed(0)}%</span>
        <span style={{ color: 'var(--accent-primary)' }}>D Accuracy: {(discriminatorAccuracy * 100).toFixed(0)}%</span>
      </div>
      
      <p className="caption">
        <strong>GAN</strong> has Generator (creates fake samples) and Discriminator (distinguishes real from fake). They compete: G tries to fool D, D tries to catch G.
      </p>
      
      <style>{`
        .gan-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 16px;
          margin: 16px 0;
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
          gap: 8px;
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
          min-width: 60px;
        }
        .slider-group input[type="range"] {
          flex: 1;
          accent-color: var(--accent-primary);
        }
        .stats {
          display: flex;
          justify-content: space-around;
          font-size: 11px;
          margin-bottom: 12px;
        }
        .caption {
          font-size: 12px;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
