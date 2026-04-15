import React, { useState, useEffect, useMemo } from 'react';

export default function SVMVisualizer({ values }) {
  // Use wnorm from the interactive formula slider, default to 2
  const wnorm = values.wnorm || 2;
  const marginWidth = (2 / wnorm) * 20; // scale up for visualization

  const [kernelTrick, setKernelTrick] = useState(false);
  const [points, setPoints] = useState([]);

  // Initialize a non-linear dataset (a circle of points surrounded by a ring)
  useEffect(() => {
    const pts = [];
    // Class 1: inner cluster
    for (let i = 0; i < 20; i++) {
      const radius = Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      pts.push({
        id: `c1_${i}`,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        cls: 1
      });
    }
    // Class -1: outer ring
    for (let i = 0; i < 25; i++) {
      const radius = 40 + Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      pts.push({
        id: `c2_${i}`,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        cls: -1
      });
    }
    setPoints(pts);
  }, []);

  // Map 2D -> 3D via Radial Basis Function (RBF) / Polynomial to separate the concentric circles
  const mappedPoints = useMemo(() => {
    return points.map(p => {
      // distance squared from center
      const r2 = (p.x * p.x + p.y * p.y) / 1000;
      if (kernelTrick) {
        // Map to 3D pseudo-projection: Z axis becomes the radius feature
        // Isolate the classes
        return {
          ...p,
          renderX: p.x,
          renderY: p.y - (r2 * 40) + 40, // offset Y pseudo-3d
          radius: 3 + r2 * 2
        };
      }
      return { ...p, renderX: p.x, renderY: p.y, radius: 4 };
    });
  }, [points, kernelTrick]);

  return (
    <div className="svm-visualizer">
      <div className="controls">
        <button 
          onClick={() => setKernelTrick(!kernelTrick)}
          className={`kernel-btn ${kernelTrick ? 'active' : ''}`}
        >
          {kernelTrick ? '🧠 Kernel Active (Linearly Separable)' : '👁️ Transform with RBF Kernel'}
        </button>
      </div>
      
      <div className="svg-container">
        <svg viewBox="-80 -80 160 160" width="100%" height="250">
          {/* Decision Boundary Layer */}
          {kernelTrick && (
            <g className="hyperplane" style={{ transition: 'all 0.5s ease' }}>
               <line x1="-80" y1="5" x2="80" y2="5" stroke="var(--accent-primary)" strokeWidth="1" strokeDasharray="4" />
               <polygon points="-80,5 80,5 80,80 -80,80" fill="rgba(0, 242, 255, 0.05)" />
               <polygon points="-80,5 80,5 80,-80 -80,-80" fill="rgba(255, 100, 100, 0.05)" />
            </g>
          )}

          {!kernelTrick && (
            <g className="hyperplane-fail">
               <line x1="-60" y1="-60" x2="60" y2="60" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
               <text x="0" y="70" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">
                 Cannot separate linearly in 2D
               </text>
            </g>
          )}

          {/* Render Points */}
          {mappedPoints.map(p => (
            <circle
              key={p.id}
              cx={p.renderX}
              cy={p.renderY}
              r={p.radius}
              fill={p.cls === 1 ? 'var(--accent-primary)' : '#ff5555'}
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="1"
              style={{ transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <title>Class: {p.cls === 1 ? '+1' : '-1'}</title>
            </circle>
          ))}
          
          {/* Margin Lines (Only in 3D projection mode for visual proof) */}
          {kernelTrick && (
             <>
               <line x1="-80" y1={5 - marginWidth} x2="80" y2={5 - marginWidth} stroke="var(--accent-primary)" strokeWidth="0.5" opacity="0.6" />
               <line x1="-80" y1={5 + marginWidth} x2="80" y2={5 + marginWidth} stroke="var(--accent-primary)" strokeWidth="0.5" opacity="0.6" />
             </>
          )}
        </svg>
      </div>

      <div className="viz-caption" style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '10px', textAlign: 'center' }}>
          {kernelTrick 
              ? <span>Mapped to higher dimension based on radius. Now a simple flat plane cleanly separates them. <br/> (Margin width scaled by Formula Slider).</span> 
              : <span>In this original 2D space, no single straight line can split the blue and red clusters.</span>}
      </div>

      <style>{`
        .svm-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 16px;
          margin: 16px 0;
        }
        .controls {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
        }
        .kernel-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--glass-border);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        .kernel-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .kernel-btn.active {
          background: rgba(0, 242, 255, 0.2);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }
        .svg-container {
          background: rgba(0, 0, 0, 0.6);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}
