import React, { useState } from 'react';

export default function VAEVisualizer() {
  const [latent, setLatent] = useState(2);
  const [step, setStep] = useState(50);
  
  const latentDim = latent;
  const progress = step / 100;
  
  return (
    <div className="vae-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 110" width="100%" height="130">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            Variational Autoencoder (VAE)
          </text>
          
          {/* Encoder */}
          <rect x="10" y="35" width="50" height="30" rx="5" fill="var(--accent-primary)" stroke="var(--glass-border)" />
          <text x="35" y="52" fill="var(--bg-primary)" fontSize="8" textAnchor="middle">Encoder</text>
          <text x="35" y="62" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">x → μ, σ</text>
          
          {/* Latent Space */}
          <rect x="70" y="30" width="60" height="40" rx="8" fill="var(--bg-secondary)" stroke="var(--accent-secondary)" strokeWidth="2" strokeDasharray="4" />
          <text x="100" y="45" fill="var(--accent-secondary)" fontSize="8" textAnchor="middle" fontWeight="bold">Latent Space</text>
          <text x="100" y="58" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">z ~ N(μ, σ)</text>
          <text x="100" y="68" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">dim: {latentDim}</text>
          
          {/* Decoder */}
          <rect x="140" y="35" width="50" height="30" rx="5" fill="var(--accent-secondary)" stroke="var(--glass-border)" />
          <text x="165" y="52" fill="var(--bg-primary)" fontSize="8" textAnchor="middle">Decoder</text>
          <text x="165" y="62" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">z → x̂</text>
          
          {/* Arrows */}
          <line x1="60" y1="50" x2="68" y2="50" stroke="var(--accent-secondary)" strokeWidth="2" markerEnd="url(#arrowVAE)" />
          <line x1="130" y1="50" x2="138" y2="50" stroke="var(--accent-secondary)" strokeWidth="2" markerEnd="url(#arrowVAE)" />
          
          <defs>
            <marker id="arrowVAE" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5" fill="var(--accent-secondary)" />
            </marker>
          </defs>
          
          {/* Reconstruction quality */}
          <rect x="20" y="80" width="160" height="6" rx="3" fill="var(--bg-secondary)" />
          <rect x="20" y="80" width={160 * progress} height="6" rx="3" fill="var(--accent-primary)" style={{ transition: 'width 0.3s' }} />
          <text x="100" y="95" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">Reconstruction Quality</text>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Latent Dim: {latentDim}</label>
          <input type="range" min="1" max="10" step="1" value={latent} onChange={(e) => setLatent(Number(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>Training: {step}%</label>
          <input type="range" min="0" max="100" step="1" value={step} onChange={(e) => setStep(Number(e.target.value))} />
        </div>
      </div>
      
      <p className="caption">
        <strong>VAE</strong> encoder maps to μ and σ, samples z from latent space, decoder reconstructs. Enables generation by sampling new z values.
      </p>
      
      <style>{`
        .vae-visualizer {
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
        .caption {
          font-size: 12px;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
