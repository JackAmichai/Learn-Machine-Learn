import React, { useState } from 'react';

export default function DiffusionVisualizer() {
  const [step, setStep] = useState(5);
  
  const totalSteps = 10;
  const noiseLevel = step / totalSteps;
  const denoiseLevel = 1 - noiseLevel;
  
  return (
    <div className="diffusion-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 100" width="100%" height="120">
          <text x="100" y="10" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            Diffusion Process (Forward + Reverse)
          </text>
          
          {/* Forward (adding noise) */}
          <text x="40" y="25" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">Forward q</text>
          {[...Array(5)].map((_, i) => (
            <circle key={`f-${i}`} cx={15 + i * 12} cy="35" r={4 - noiseLevel * 2} 
                    fill={noiseLevel > 0.5 ? 'var(--text-secondary)' : 'var(--accent-primary)'} 
                    opacity={0.3 + denoiseLevel * 0.7} />
          ))}
          
          {/* Arrow */}
          <line x1="70" y1="40" x2="90" y2="40" stroke="var(--glass-border)" strokeWidth="2" markerEnd="url(#arrowDiff)" />
          
          {/* Latent space */}
          <rect x="90" y="25" width="20" height="30" rx="4" fill="var(--bg-secondary)" stroke="var(--glass-border)" strokeDasharray="3" />
          <text x="100" y="45" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">x_T</text>
          
          {/* Reverse (denoising) */}
          <line x1="115" y1="40" x2="135" y2="40" stroke="var(--glass-border)" strokeWidth="2" markerEnd="url(#arrowDiff)" />
          <text x="160" y="25" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">Reverse p</text>
          
          {[...Array(5)].map((_, i) => (
            <circle key={`r-${i}`} cx={140 + i * 12} cy="35" r={2 + denoiseLevel * 2} 
                    fill="var(--accent-primary)" 
                    opacity={noiseLevel * 0.3 + 0.7} />
          ))}
          
          {/* Timestep indicator */}
          <rect x="50" y="70" width="100" height="8" rx="4" fill="var(--bg-secondary)" />
          <circle cx={50 + step * 10} cy="74" r="6" fill="var(--accent-primary)" />
          <text x="100" y="90" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">
            Step {step}/{totalSteps}
          </text>
          
          <defs>
            <marker id="arrowDiff" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5" fill="var(--glass-border)" />
            </marker>
          </defs>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Diffusion Step: {step}</label>
          <input type="range" min="0" max="10" step="1" value={step} onChange={(e) => setStep(Number(e.target.value))} />
        </div>
      </div>
      
      <div className="stats">
        <span>Noise: {(noiseLevel * 100).toFixed(0)}%</span>
        <span>Signal: {(denoiseLevel * 100).toFixed(0)}%</span>
      </div>
      
      <p className="caption">
        <strong>Diffusion</strong> adds noise progressively (forward), then learns to reverse (denoise). Stable Diffusion generates images from random noise.
      </p>
      
      <style>{`
        .diffusion-visualizer {
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
          min-width: 100px;
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
          color: var(--text-secondary);
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
