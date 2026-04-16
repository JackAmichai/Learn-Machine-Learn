import React, { useState } from 'react';

export default function CLIPVisualizer() {
  const [mode, setMode] = useState('contrastive');
  const [temperature, setTemperature] = useState(0.1);
  const [imgSim, setImgSim] = useState([0.8, 0.3, 0.2]);
  const [txtSim, setTxtSim] = useState([0.7, 0.4, 0.1]);

  const texts = ['A cat', 'A dog', 'A bird'];
  const images = ['Cat Image', 'Dog Image', 'Bird Image'];

  const calculateSimilarities = () => {
    return imgSim.map((img, i) => {
      const sims = txtSim.map((txt, j) => {
        const baseSim = i === j ? img * txt : img * txt * 0.3;
        return Math.exp(baseSim / temperature);
      });
      const sum = sims.reduce((a, b) => a + b, 0);
      return sims.map(s => s / sum);
    });
  };

  const similarities = calculateSimilarities();

  return (
    <div className="clip-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 280 220" width="100%" height="240">
          <text x="140" y="15" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            CLIP: Contrastive Language-Image Pretraining
          </text>
          
          <text x="40" y="40" fill="var(--text-secondary)" fontSize="9">Image Encoder</text>
          <rect x="20" y="45" width="60" height="80" fill="rgba(255,107,107,0.2)" stroke="#ff6b6b" rx="4" />
          <text x="50" y="90" fill="#ff6b6b" fontSize="10" textAnchor="middle">Image</text>
          <text x="50" y="105" fill="#ff6b6b" fontSize="8" textAnchor="middle">Embedding</text>

          <text x="240" y="40" fill="var(--text-secondary)" fontSize="9">Text Encoder</text>
          <rect x="200" y="45" width="60" height="80" fill="rgba(78,205,196,0.2)" stroke="#4ecdc4" rx="4" />
          <text x="230" y="90" fill="#4ecdc4" fontSize="10" textAnchor="middle">Text</text>
          <text x="230" y="105" fill="#4ecdc4" fontSize="8" textAnchor="middle">Embedding</text>

          <text x="140" y="140" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">Similarity Matrix</text>
          <rect x="40" y="145" width="200" height="60" fill="rgba(0,0,0,0.3)" rx="4" />
          
          {similarities.map((row, i) => (
            row.map((sim, j) => (
              <g key={`${i}-${j}`}>
                <rect 
                  x={50 + j * 65} 
                  y={150 + i * 18} 
                  width="55" 
                  height="14" 
                  fill={sim > 0.5 ? `rgba(0,255,157,${sim})` : `rgba(255,107,107,${1-sim})`}
                  rx="2"
                />
                <text 
                  x={77 + j * 65} 
                  y={161 + i * 18} 
                  fill={sim > 0.5 ? '#001a0f' : '#fff'}
                  fontSize="9" 
                  textAnchor="middle"
                >
                  {(sim * 100).toFixed(0)}%
                </text>
              </g>
            ))
          ))}

          <text x="140" y="215" fill="var(--accent-primary)" fontSize="9" textAnchor="middle">
            Temperature: {temperature} | Match: Cat↔Cat
          </text>
        </svg>
      </div>

      <div className="selector">
        <button 
          className={mode === 'contrastive' ? 'active' : ''}
          onClick={() => setMode('contrastive')}
        >
          Contrastive
        </button>
        <button 
          className={mode === 'zeroShot' ? 'active' : ''}
          onClick={() => setMode('zeroShot')}
        >
          Zero-Shot
        </button>
      </div>

      <div className="controls">
        <div className="slider-group">
          <label>Temperature: {temperature.toFixed(2)}</label>
          <input 
            type="range" 
            min="0.01" 
            max="1" 
            step="0.01" 
            value={temperature} 
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="embeddings">
        <div className="emb-section">
          <h4>Image Embeddings</h4>
          {images.map((img, i) => (
            <div key={i} className="emb-row">
              <span>{img}</span>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={imgSim[i]} 
                onChange={(e) => {
                  const n = [...imgSim];
                  n[i] = parseFloat(e.target.value);
                  setImgSim(n);
                }}
              />
              <span className="val">{imgSim[i].toFixed(1)}</span>
            </div>
          ))}
        </div>
        <div className="emb-section">
          <h4>Text Embeddings</h4>
          {texts.map((txt, i) => (
            <div key={i} className="emb-row">
              <span>{txt}</span>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={txtSim[i]} 
                onChange={(e) => {
                  const n = [...txtSim];
                  n[i] = parseFloat(e.target.value);
                  setTxtSim(n);
                }}
              />
              <span className="val">{txtSim[i].toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="info-box">
        <h4>How CLIP Works</h4>
        <ul>
          <li><strong>Contrastive Learning:</strong> Pull matching pairs together, push non-matches apart</li>
          <li><strong>Zero-Shot:</strong> Describe classes in text, classify without training</li>
          <li><strong>400M pairs:</strong> Trained on massive image-text dataset</li>
        </ul>
      </div>

      <style>{`
        .clip-visualizer {
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
        .selector {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .selector button {
          flex: 1;
          padding: 8px;
          border: 1px solid var(--glass-border);
          background: transparent;
          color: var(--text-secondary);
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
        }
        .selector button.active {
          background: var(--accent-primary);
          color: #000;
          border-color: var(--accent-primary);
        }
        .controls {
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
        .embeddings {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }
        .emb-section {
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 10px;
        }
        .emb-section h4 {
          margin: 0 0 8px 0;
          font-size: 10px;
          color: var(--accent-primary);
        }
        .emb-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .emb-row span {
          font-size: 10px;
          color: var(--text-secondary);
          min-width: 60px;
        }
        .emb-row .val {
          min-width: 30px;
          text-align: right;
          color: var(--accent-primary);
        }
        .emb-row input[type="range"] {
          flex: 1;
          accent-color: var(--accent-secondary);
        }
        .info-box {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 10px;
        }
        .info-box h4 {
          margin: 0 0 6px 0;
          font-size: 11px;
          color: var(--accent-primary);
        }
        .info-box ul {
          margin: 0;
          padding-left: 14px;
          font-size: 10px;
          color: var(--text-secondary);
        }
        .info-box li {
          margin-bottom: 3px;
        }
      `}</style>
    </div>
  );
}
