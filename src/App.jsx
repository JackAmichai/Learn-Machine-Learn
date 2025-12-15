import { useNeuralNetwork } from './hooks/useNeuralNetwork';
import { Controls } from './components/Controls';
import { NetworkGraph } from './components/NetworkGraph';
import { OutputPlot } from './components/OutputPlot';

function App() {
  const nn = useNeuralNetwork();

  return (
    <div className="app-container">
      <Controls {...nn} />

      <main className="main-content">
        <header>
          <h1>Neural <span>Visualizer</span></h1>
          <p>Interactive Dense Network Playground</p>
        </header>

        <div className="viz-grid">
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
        </div>
      </main>

      <style>{`
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

export default App;
