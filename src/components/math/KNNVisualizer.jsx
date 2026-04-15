import React from 'react';

export default function KNNVisualizer({ values }) {
  // Use dx and dy from the interactive formula slider
  const dx = values.dx !== undefined ? values.dx : 3;
  const dy = values.dy !== undefined ? values.dy : 4;
  
  // Calculate euclidean distance
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Scaled for rendering
  const scale = 15;
  const renderDx = dx * scale;
  const renderDy = dy * scale;
  
  // Fixed starting point
  const startX = 20;
  const startY = 120;
  
  // End point based on dx, dy
  const endX = startX + renderDx;
  const endY = startY - renderDy; // inverted Y for SVG coordinates

  return (
    <div className="knn-visualizer">
      <div className="svg-container">
        <svg viewBox="0 0 200 150" width="100%" height="200">
          
          {/* Background Grid */}
          <g className="grid" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1">
            {[...Array(11)].map((_, i) => (
              <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="150" />
            ))}
            {[...Array(8)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 20} x2="200" y2={i * 20} />
            ))}
          </g>

          {/* Background scatter points (neighbors) */}
           <circle cx={startX + 3*scale} cy={startY + 1*scale} r="3" fill="var(--glass-border)" />
           <circle cx={startX - 1*scale} cy={startY - 6*scale} r="3" fill="var(--glass-border)" />
           <circle cx={startX + 5*scale} cy={startY - 2*scale} r="3" fill="var(--glass-border)" />

          {/* dx line (horizontal) */}
          <line 
            x1={startX} y1={startY} 
            x2={endX} y2={startY} 
            stroke="var(--accent-secondary)" strokeWidth="2" strokeDasharray="4" 
            style={{ transition: 'all 0.3s' }}
          />
          
          {/* dy line (vertical) */}
          <line 
            x1={endX} y1={startY} 
            x2={endX} y2={endY} 
            stroke="var(--accent-secondary)" strokeWidth="2" strokeDasharray="4" 
            style={{ transition: 'all 0.3s' }}
          />
          
          {/* Hypotenuse (Distance) */}
          <line 
            x1={startX} y1={startY} 
            x2={endX} y2={endY} 
            stroke="var(--accent-primary)" strokeWidth="3" 
            style={{ transition: 'all 0.3s' }}
          />

          {/* Labels */}
          <text x={startX + renderDx / 2} y={startY + 15} fill="var(--accent-secondary)" fontSize="10" textAnchor="middle" style={{ transition: 'all 0.3s' }}>
            Δx = {dx.toFixed(1)}
          </text>
          
          <text x={endX + 15} y={startY - renderDy / 2} fill="var(--accent-secondary)" fontSize="10" textAnchor="middle" style={{ transition: 'all 0.3s' }}>
            Δy = {dy.toFixed(1)}
          </text>

          {/* Distance Text near middle of hypotenuse */}
          <text 
             x={startX + renderDx / 2 - 10} 
             y={startY - renderDy / 2 - 10} 
             fill="var(--accent-primary)" 
             fontSize="12" 
             fontWeight="bold"
             textAnchor="middle"
             style={{ transition: 'all 0.3s' }}
          >
            d = {dist.toFixed(2)}
          </text>

          {/* Points */}
          <circle cx={startX} cy={startY} r="6" fill="#ff5555" />
          <circle cx={endX} cy={endY} r="6" fill="#ff5555" style={{ transition: 'all 0.3s' }} />
          
        </svg>
      </div>
      <p className="caption">
         Euclidean distance calculates the straight-line hypotenuse (<strong>d</strong>) between two feature vectors using the Pythagorean theorem. Small distances mean neighbors are 'close'!
      </p>

      <style>{`
        .knn-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 16px;
          margin: 16px 0;
        }
        .svg-container {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: inset 0 0 15px rgba(0,0,0,0.3);
        }
        .caption {
          margin-top: 12px;
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
