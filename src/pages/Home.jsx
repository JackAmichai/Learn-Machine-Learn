import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useNeuralNetwork } from '../hooks/useNeuralNetwork';
import { Controls } from '../components/Controls';
import { NetworkGraph } from '../components/NetworkGraph';
import { OutputPlot } from '../components/OutputPlot';
import { VisionCanvas } from '../components/VisionCanvas';
import { WeightHeatmap } from '../components/WeightHeatmap';
import { StatsPanel } from '../components/StatsPanel';
import { TourGuide } from '../components/TourGuide';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { useToast } from '../hooks/useToast';
import { BuyMeCoffee } from '../components/BuyMeCoffee';

/**
 * Global keyboard shortcuts:
 * - Space: Toggle training
 * - Escape: Pause training / close tour
 * - T: Toggle theme
 * - F: Toggle fullscreen
 * - ?: Show keyboard shortcuts help
 */
const KEYBOARD_SHORTCUTS = {
  ' ': 'Toggle training (Space)',
  'Escape': 'Pause training / close dialogs',
  't': 'Toggle dark/light theme',
  'f': 'Toggle fullscreen',
  '?': 'Show this help',
};

export function Home() {
  const nn = useNeuralNetwork();
  const [showTour, setShowTour] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const mainContentRef = useRef(null);
  const prevPlayingRef = useRef(nn.isPlaying);
  const prevMilestoneRef = useRef(0);
  const { pushToast } = useToast();
  const { toggleTheme } = useTheme();

  useEffect(() => {
    if (prevPlayingRef.current === nn.isPlaying) return;
    prevPlayingRef.current = nn.isPlaying;
    if (nn.isPlaying) {
      pushToast({ type: 'success', title: 'Training started', message: 'Weights are updating in real time.' });
    } else {
      pushToast({ type: 'info', title: 'Training paused', message: 'Adjust parameters or resume when ready.' });
    }
  }, [nn.isPlaying, pushToast]);

  useEffect(() => {
    if (!nn.epoch) return;
    if (nn.epoch % 50 === 0 && nn.epoch !== prevMilestoneRef.current) {
      prevMilestoneRef.current = nn.epoch;
      pushToast({ type: 'success', title: `Epoch ${nn.epoch}`, message: 'Keep monitoring the loss curve for convergence.' });
    }
  }, [nn.epoch, pushToast]);

  useEffect(() => {
    if (typeof document === 'undefined') return () => { };
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === 'undefined' || !containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input/textarea
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (nn.trainingMode !== 'step') {
            nn.setIsPlaying(prev => !prev);
          }
          break;
        case 'Escape':
          if (showTour) setShowTour(false);
          else if (showShortcuts) setShowShortcuts(false);
          else if (nn.isPlaying) nn.setIsPlaying(false);
          break;
        case 't':
        case 'T':
          if (!e.ctrlKey && !e.metaKey) {
            toggleTheme();
          }
          break;
        case 'f':
        case 'F':
          if (!e.ctrlKey && !e.metaKey) {
            toggleFullscreen();
          }
          break;
        case '?':
          setShowShortcuts(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nn, showTour, showShortcuts, toggleTheme, toggleFullscreen]);

  // Skip to main content handler
  const handleSkipToMain = () => {
    mainContentRef.current?.focus();
  };

  return (
    <div className="app-container" ref={containerRef}>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link" onClick={handleSkipToMain}>
        Skip to main content
      </a>

      {/* ARIA live region for status updates */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="status-announcer">
        {nn.isPlaying ? `Training - Epoch ${nn.epoch}` : 'Training paused'}
      </div>

      {showTour && <TourGuide mode={nn.mode} onSkip={() => setShowTour(false)} />}

      {/* Keyboard shortcuts modal */}
      {showShortcuts && (
        <div className="shortcuts-modal" role="dialog" aria-labelledby="shortcuts-title" aria-modal="true">
          <div className="shortcuts-content">
            <h2 id="shortcuts-title">Keyboard Shortcuts</h2>
            <ul className="shortcuts-list">
              {Object.entries(KEYBOARD_SHORTCUTS).map(([key, desc]) => (
                <li key={key}>
                  <kbd>{key === ' ' ? 'Space' : key}</kbd>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowShortcuts(false)} className="btn-close-shortcuts">
              Close (Esc)
            </button>
          </div>
        </div>
      )}

      <Controls {...nn} />

      <main className="main-content" id="main-content" ref={mainContentRef} tabIndex={-1}>
        <header className="main-header">
          <div>
            <h1>Learn <span>MACHINE</span> Learn</h1>
            <p>Interactive Neural Network Playground</p>
          </div>
          <div className="header-actions">
            <Link to="/quizzes" className="btn-nav">
              Quizzes
            </Link>
            <button className="btn-shortcuts" onClick={() => setShowShortcuts(true)} aria-label="Show keyboard shortcuts">
              ⌨️
            </button>
            <button className="btn-tour" onClick={() => setShowTour(true)}>Start Tour</button>
            <button className="btn-fullscreen" onClick={toggleFullscreen} aria-pressed={isFullscreen} aria-label="Toggle fullscreen mode">
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
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
                        deadNeurons={nn.deadNeurons}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <WeightHeatmap
                        model={nn.model}
                        modelVersion={nn.modelVersion}
                        structure={nn.structure}
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
                    deadNeurons={nn.deadNeurons}
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

              <div className="card viz-stats">
                <StatsPanel
                  model={nn.model}
                  data={nn.data}
                  modelVersion={nn.modelVersion}
                  epoch={nn.epoch}
                  loss={nn.loss}
                />
              </div>
            </>
          )}
        </div>
      </main>

      <BuyMeCoffee />

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
        .btn-nav {
            text-decoration: none;
            color: var(--text-secondary);
            padding: 6px 12px;
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            transition: all 0.2s;
            font-size: 12px;
        }
        .btn-nav:hover {
            border-color: var(--accent-primary);
            color: var(--accent-primary);
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
        .btn-fullscreen {
          background: var(--bg-secondary);
          border: 1px solid transparent;
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-fullscreen:hover, .btn-fullscreen[aria-pressed='true'] {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
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
            grid-template-rows: 1fr auto;
            gap: 20px;
            flex: 1;
            min-height: 0; /* allows child scrolling if needed */
        }

        .viz-stats {
            grid-column: 1 / -1;
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
