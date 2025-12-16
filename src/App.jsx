import { useState } from 'react';
import { useNeuralNetwork } from './hooks/useNeuralNetwork';
import { Controls } from './components/Controls';
import { NetworkGraph } from './components/NetworkGraph';
import { OutputPlot } from './components/OutputPlot';
import { VisionCanvas } from './components/VisionCanvas';
import { WeightHeatmap } from './components/WeightHeatmap';
import { TourGuide } from './components/TourGuide';

import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { MathProvider } from './contexts/MathContext';
import { ErrorBoundary } from './components/ErrorBoundary';

function AppContent() {
  const nn = useNeuralNetwork();
  const [showTour, setShowTour] = useState(false);

  return (
    <div className="app-container">
      {showTour && <TourGuide mode={nn.mode} onSkip={() => setShowTour(false)} />}
      <Controls {...nn} />

      <main className="main-content">
        <header className="main-header">
          <div>
            <h1>Learn <span>MACHINE</span> Learn</h1>
            <p>Interactive Neural Network Playground</p>
          </div>
          <div className="header-actions">
            <button className="btn-tour" onClick={() => setShowTour(true)}>Start Tour</button>
            <ThemeToggle />
          </div>
        </header>

        <div className="viz-grid">
          {nn.mode === 'vision' ? (
            // VISION LAYOUT
            <>
              <div className="card viz-input">
                <h2>Vision Input <span className="badge">Draw here</span></h2>
                <div className="viz-inner vision-container">
                  <VisionCanvas
                    onAddSample={nn.addSample}
                    onPredict={(grid) => {
                      const res = nn.predictSample(grid);
                      if (res) alert(`Prediction: Class A: ${(res[0] * 100).toFixed(1)}%, Class B: ${(res[1] * 100).toFixed(1)}%`);
                    }}
                    disabled={nn.isPlaying}
                  />
                  <div className="vision-stats">
                    <p>Training Samples: {nn.customData.length}</p>
                    <p className="tip">Draw shapes (e.g. Cross, Square) and train as A or B.</p>
                  </div>
                </div>
              </div>

              <div className="card viz-net">
                <h2>Network Activity</h2>
                <div className="viz-inner">
                  <div className="vision-layout-row">
                    <div style={{ flex: 1 }}>
                      <NetworkGraph
                        model={nn.model}
                        structure={nn.structure}
                        modelVersion={nn.modelVersion}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <WeightHeatmap
                        model={nn.model}
                        modelVersion={nn.modelVersion}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // SIMPLE 2D LAYOUT
            <>
              <div className="card viz-net">
                <h2>Network Architecture</h2>
                <div className="viz-inner">
                  <NetworkGraph
                    model={nn.model}
                    structure={nn.structure}
                    modelVersion={nn.modelVersion}
                  />
                </div>
              </div>

              <div className="card viz-out">
                <h2>Output Landscape</h2>
                <div className="viz-inner">
                  <OutputPlot
                    model={nn.model}
                    data={nn.data}
                    modelVersion={nn.modelVersion}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <style>{`
        .vision-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            padding: 20px;
        }
        .vision-layout-row {
            display: flex;
            width: 100%;
            gap: 20px;
            height: 100%;
        }
        .badge {
            background: var(--accent-primary);
            color: black;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 4px;
            vertical-align: middle;
            margin-left: 8px;
        }
        .header-actions {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .btn-tour {
            background: var(--bg-secondary);
            border: 1px solid var(--accent-primary);
            color: var(--accent-primary);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-tour:hover {
            background: var(--accent-primary);
            color: black;
        }
        .vision-stats {
            text-align: center;
            color: var(--text-secondary);
            font-size: 12px;
        }
        .tip {
            margin-top: 8px;
            font-style: italic;
            opacity: 0.7;
        }
        .app-container {
            display: flex;
            height: 100vh;
            width: 100vw;
            background: radial-gradient(circle at top right, #1a1a2e, var(--bg-primary));
        }
        .main-content {
            flex: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            overflow: hidden; 
        }
        .main-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        header h1 {
            font-size: 24px;
            margin: 0;
            letter-spacing: -1px;
        }
        header h1 span {
            color: var(--accent-primary);
        }
        header p {
            margin: 4px 0 0;
            color: var(--text-secondary);
            font-size: 14px;
        }
        
        .viz-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            flex: 1;
            min-height: 0; /* allows child scrolling if needed */
        }
        
        .card {
            background: var(--bg-panel);
            border: var(--glass-border);
            border-radius: var(--radius-lg);
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-shadow: var(--glass-shadow);
        }
        
        .card h2 {
            margin: 0 0 16px 0;
            font-size: 16px;
            color: var(--text-secondary);
            font-weight: 500;
        }
        
        .viz-inner {
            flex: 1;
            position: relative;
            background: rgba(0,0,0,0.2);
            border-radius: var(--radius-md);
            overflow: hidden;
        }
        
        /* Responsive */
        @media (max-width: 1000px) {
            .viz-grid {
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 1fr;
            }
        }
      `}</style>
    </div>
  );
}




function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <MathProvider>
          <AppContent />
        </MathProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
