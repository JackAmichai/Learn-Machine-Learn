import React, { useState } from 'react';

export default function ObjectDetectionVisualizer() {
  const [iouThreshold, setIouThreshold] = useState(0.5);
  const [box1Area, setBox1Area] = useState(50);
  const [box2Area, setBox2Area] = useState(60);
  const [intersection, setIntersection] = useState(35);

  const union = box1Area + box2Area - intersection;
  const iou = union > 0 ? (intersection / union) : 0;
  const isMatch = iou >= iouThreshold;

  return (
    <div className="object-detection-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 280 180" width="100%" height="200">
          <text x="140" y="15" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            IoU: Intersection over Union
          </text>
          
          <rect x="30" y="30" width="100" height="100" fill="none" stroke="#ff6b6b" strokeWidth="2" rx="4" />
          <rect x="60" y="50" width="100" height="100" fill="none" stroke="#4ecdc4" strokeWidth="2" rx="4" />
          
          <rect x="70" y="70" width="50" height="40" fill="rgba(100,200,255,0.4)" stroke="#00f2ff" strokeWidth="1" rx="2" />
          
          <text x="80" y="145" fill="#ff6b6b" fontSize="9">Ground Truth</text>
          <text x="170" y="145" fill="#4ecdc4" fontSize="9">Prediction</text>
          <text x="140" y="165" fill="var(--accent-primary)" fontSize="9" textAnchor="middle">Overlap Region</text>

          <rect x="190" y="40" width="80" height="80" fill="rgba(0,0,0,0.3)" rx="4" />
          <text x="230" y="60" fill="var(--text-primary)" fontSize="10" textAnchor="middle">IoU</text>
          <text x="230" y="85" fill={isMatch ? '#00ff9d' : '#ff6b6b'} fontSize="18" textAnchor="middle" fontWeight="bold">
            {(iou * 100).toFixed(1)}%
          </text>
          <text x="230" y="105" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">
            {isMatch ? '✓ Match' : '✗ No Match'}
          </text>
          <text x="230" y="115" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">
            Threshold: {iouThreshold.toFixed(2)}
          </text>
        </svg>
      </div>

      <div className="controls">
        <div className="slider-group">
          <label>IoU Threshold: {iouThreshold.toFixed(2)}</label>
          <input 
            type="range" 
            min="0.1" 
            max="0.95" 
            step="0.05" 
            value={iouThreshold} 
            onChange={(e) => setIouThreshold(parseFloat(e.target.value))}
          />
        </div>
        <div className="slider-group">
          <label>Ground Truth Area: {box1Area}</label>
          <input 
            type="range" 
            min="10" 
            max="200" 
            step="5" 
            value={box1Area} 
            onChange={(e) => setBox1Area(parseInt(e.target.value))}
          />
        </div>
        <div className="slider-group">
          <label>Prediction Area: {box2Area}</label>
          <input 
            type="range" 
            min="10" 
            max="200" 
            step="5" 
            value={box2Area} 
            onChange={(e) => setBox2Area(parseInt(e.target.value))}
          />
        </div>
        <div className="slider-group">
          <label>Intersection: {intersection}</label>
          <input 
            type="range" 
            min="0" 
            max={Math.min(box1Area, box2Area)} 
            step="1" 
            value={intersection} 
            onChange={(e) => setIntersection(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="metrics">
        <div className="metric">
          <span>IoU</span>
          <strong>{(iou * 100).toFixed(1)}%</strong>
        </div>
        <div className="metric">
          <span>Union</span>
          <strong>{union}</strong>
        </div>
        <div className="metric">
          <span>Match</span>
          <strong style={{ color: isMatch ? '#00ff9d' : '#ff6b6b' }}>
            {isMatch ? 'Yes' : 'No'}
          </strong>
        </div>
      </div>

      <div className="info-box">
        <h4>IoU Thresholds</h4>
        <ul>
          <li><strong>mAP@0.5:</strong> Standard COCO benchmark</li>
          <li><strong>mAP@0.5:0.95:</strong> Average across IoU thresholds</li>
          <li><strong>Higher IoU:</strong> More precise detection required</li>
        </ul>
      </div>

      <style>{`
        .object-detection-visualizer {
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
          min-width: 140px;
        }
        .slider-group input[type="range"] {
          flex: 1;
          accent-color: var(--accent-primary);
        }
        .metrics {
          display: flex;
          justify-content: space-around;
          margin-bottom: 12px;
        }
        .metric {
          text-align: center;
          padding: 8px 16px;
          background: rgba(0,0,0,0.3);
          border-radius: 8px;
        }
        .metric span {
          display: block;
          font-size: 10px;
          color: var(--text-secondary);
        }
        .metric strong {
          font-size: 16px;
          color: var(--accent-primary);
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
