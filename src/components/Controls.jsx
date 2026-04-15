import { useRef, useState } from 'react';
import { DataType } from '../engine/data';
import { Tooltip } from './Tooltip';
import { CodeExport } from './CodeExport';

const SIMPLE_DATASETS = [
    { type: DataType.SPIRAL, label: 'Spiral Arms', hint: 'Interleaving swirls demand complex decision boundaries.' },
    { type: DataType.CIRCLE, label: 'Dual Rings', hint: 'Inner vs outer rings for radial separation.' },
    { type: DataType.XOR, label: 'XOR Quadrants', hint: 'Opposing corners teach nonlinear splits.' },
    { type: DataType.LINEAR, label: 'Linear Split', hint: 'Baseline diagonal divider with jitter.' }
];

const DEFAULT_LAYER_CONTROLS = { batchNorm: false, dropout: false, dropoutRate: 0.2 };

const CATEGORIES = [
    { id: 'basics', label: 'Basics', icon: '📚', description: 'Core concepts' },
    { id: 'vision', label: 'Computer Vision', icon: '👁️', description: 'CNNs & Images' },
    { id: 'nlp', label: 'NLP & Text', icon: '💬', description: 'Transformers & Language' },
    { id: 'generative', label: 'Generative', icon: '🎨', description: 'GANs, VAE, Diffusion' },
    { id: 'rl', label: 'Reinforcement', icon: '🎮', description: 'RL & Games' },
    { id: 'training', label: 'Training', icon: '⚙️', description: 'Optimizers & Tricks' }
];

export function Controls(props) {
    const {
        isPlaying,
        setIsPlaying,
        epoch,
        loss,
        structure,
        addLayer,
        removeLayer,
        updateNodeCount,
        datasetParams,
        setDatasetParams,
        mode,
        setMode,
        hyperparams,
        updateHyperparams,
        trainingMode,
        setTrainingMode,
        slowDelay,
        setSlowDelay,
        stepState,
        runForwardPass,
        runBackwardPass,
        saveModelToLocal,
        loadModelFromLocal,
        exportModelJSON,
        importModelJSON,
        layerFeatures,
        updateLayerFeatures
    } = props;

    const fileInputRef = useRef(null);
    const [persistStatus, setPersistStatus] = useState(null);
    const [activeCategory, setActiveCategory] = useState('basics');

    const setStatus = (type, text) => {
        setPersistStatus({ type, text, ts: Date.now() });
        setTimeout(() => setPersistStatus(null), 5000);
    };

    const handleSaveLocal = () => {
        try {
            const snapshot = saveModelToLocal();
            const stamp = snapshot?.timestamp ? new Date(snapshot.timestamp).toLocaleTimeString() : '';
            setStatus('success', `Saved to browser storage ${stamp ? `@ ${stamp}` : ''}`.trim());
        } catch (err) {
            setStatus('error', err.message);
        }
    };

    const handleLoadLocal = () => {
        try {
            const snapshot = loadModelFromLocal();
            if (!snapshot) {
                setStatus('info', 'No saved model found in this browser yet.');
                return;
            }
            setStatus('success', 'Model restored from browser storage.');
        } catch (err) {
            setStatus('error', err.message);
        }
    };

    const handleExportJSON = () => {
        try {
            const json = exportModelJSON();
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `learn-ml-model-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            setStatus('success', 'Model exported as JSON.');
        } catch (err) {
            setStatus('error', err.message);
        }
    };

    const handleImportFile = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                importModelJSON(reader.result);
                setStatus('success', `Imported ${file.name}.`);
            } catch (err) {
                setStatus('error', err.message);
            } finally {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        };
        reader.readAsText(file);
    };

    const handleNoiseChange = (value) => {
        setDatasetParams(prev => ({ ...prev, noise: value }));
    };

    const formatLoss = (value) => (typeof value === 'number' ? value.toFixed(4) : '--');

    const renderCategoryContent = () => {
        switch (activeCategory) {
            case 'basics':
                return (
                    <>
                        <div className="section">
                            <h3>Task Mode</h3>
                            <div className="mode-select">
                                <button className={mode === 'simple' ? 'active' : ''} onClick={() => setMode('simple')}>Simple 2D</button>
                                <button className={mode === 'vision' ? 'active' : ''} onClick={() => setMode('vision')}>Vision (Beta)</button>
                            </div>
                        </div>

                        <div className="section">
                            <h3>Training</h3>
                            <div className="stats">
                                <div><Tooltip word="Epoch" />: <span>{epoch}</span></div>
                                <div><Tooltip word="Loss" />: <span>{loss.toFixed(4)}</span></div>
                            </div>
                            <button className={`btn-primary ${isPlaying ? 'stop' : ''}`} onClick={() => setIsPlaying(!isPlaying)}>
                                {isPlaying ? 'Pause' : 'Train'}
                            </button>
                            <div className="train-mode-toggle" role="group">
                                {[{ key: 'continuous', label: 'Continuous' }, { key: 'slow', label: 'Slow-Mo' }, { key: 'step', label: 'Step' }].map(option => (
                                    <button key={option.key} className={trainingMode === option.key ? 'active' : ''} onClick={() => setTrainingMode(option.key)}>
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                            {trainingMode === 'slow' && (
                                <div className="slow-slider">
                                    <label>Frame Delay</label>
                                    <input type="range" min="150" max="2000" step="50" value={slowDelay} onChange={(e) => setSlowDelay(parseInt(e.target.value, 10))} />
                                    <span>{slowDelay}ms</span>
                                </div>
                            )}
                            {trainingMode === 'step' && (
                                <div className="step-panel">
                                    <div className="step-buttons">
                                        <button onClick={runForwardPass} disabled={stepState.busy || stepState.phase !== 'forward'}>Forward Pass</button>
                                        <button onClick={runBackwardPass} disabled={stepState.busy || stepState.phase !== 'backward'}>Backward Pass</button>
                                    </div>
                                    <div className="step-summary">
                                        <div>Forward Loss: {formatLoss(stepState.lastForwardLoss)}</div>
                                        <div>Backward Loss: {formatLoss(stepState.lastBackwardLoss)}</div>
                                    </div>
                                    <p className="step-status">{stepState.status}</p>
                                </div>
                            )}
                        </div>

                        <div className="section">
                            <h3>Architecture</h3>
                            <div className="p-header">
                                <span>Layers</span>
                                <button className="btn-sm" onClick={addLayer}>+ Layer</button>
                            </div>
                            <div className="layers-list">
                                {structure.map((nodes, idx) => {
                                    const isInput = idx === 0;
                                    const isOutput = idx === structure.length - 1;
                                    const isHidden = !isInput && !isOutput;
                                    const featureConfig = layerFeatures?.[idx] || DEFAULT_LAYER_CONTROLS;
                                    return (
                                        <div key={idx} className="layer-item">
                                            <span className="layer-label">{isInput ? 'Input' : isOutput ? 'Output' : `Hidden ${idx}`}</span>
                                            <div className="node-control">
                                                {isHidden && <button onClick={() => updateNodeCount(idx, -1)} aria-label={`Decrease neurons in layer ${idx}`}>-</button>}
                                                <span className="node-count">{nodes}</span>
                                                {isHidden && <button onClick={() => updateNodeCount(idx, 1)} aria-label={`Increase neurons in layer ${idx}`}>+</button>}
                                            </div>
                                            {isHidden && <button className="btn-del" onClick={() => removeLayer(idx)} aria-label={`Remove layer ${idx}`}>×</button>}
                                            {isHidden && (
                                                <div className="layer-advanced">
                                                    <div className="pill-group">
                                                        <button className={`pill-toggle ${featureConfig.batchNorm ? 'active' : ''}`} onClick={() => updateLayerFeatures(idx, { batchNorm: !featureConfig.batchNorm })}>BatchNorm</button>
                                                        <button className={`pill-toggle ${featureConfig.dropout ? 'active' : ''}`} onClick={() => updateLayerFeatures(idx, { dropout: !featureConfig.dropout })}>Dropout</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {mode === 'simple' && (
                            <div className="section">
                                <h3>Data</h3>
                                <div className="data-grid">
                                    {SIMPLE_DATASETS.map(option => (
                                        <button key={option.type} className={`data-card ${datasetParams.type === option.type ? 'active' : ''}`} onClick={() => setDatasetParams(prev => ({ ...prev, type: option.type }))}>
                                            <span className="data-label">{option.label}</span>
                                            <span className="data-hint">{option.hint}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="noise-control">
                                    <label>Noise</label>
                                    <input type="range" min="0" max="0.6" step="0.01" value={datasetParams.noise} onChange={(e) => handleNoiseChange(parseFloat(e.target.value))} />
                                    <span className="noise-value">{datasetParams.noise.toFixed(2)}</span>
                                </div>
                            </div>
                        )}
                    </>
                );
            
            case 'vision':
                return (
                    <div className="category-content">
                        <div className="coming-soon">
                            <span className="icon">👁️</span>
                            <h4>Computer Vision</h4>
                            <p>CNN architectures, convolutional layers, pooling, and image processing</p>
                            <div className="feature-list">
                                <div className="feature-item"><span>Conv2D Layers</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>Max Pooling</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>Image Augmentation</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>ResNet Blocks</span><span className="status">Coming Soon</span></div>
                            </div>
                        </div>
                        <div className="section">
                            <h3>Current Vision Mode</h3>
                            <p className="tip">Use Vision mode above to draw custom images!</p>
                            <button className={`mode-btn ${mode === 'vision' ? 'active' : ''}`} onClick={() => setMode('vision')}>
                                🎨 Enter Vision Playground
                            </button>
                        </div>
                    </div>
                );

            case 'nlp':
                return (
                    <div className="category-content">
                        <div className="coming-soon">
                            <span className="icon">💬</span>
                            <h4>NLP & Text</h4>
                            <p>Transformers, attention mechanisms, tokenization, and language models</p>
                            <div className="feature-list">
                                <div className="feature-item"><span>Self-Attention</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>Positional Encoding</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>Tokenization</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>Text Classification</span><span className="status">Coming Soon</span></div>
                            </div>
                        </div>
                    </div>
                );

            case 'generative':
                return (
                    <div className="category-content">
                        <div className="coming-soon">
                            <span className="icon">🎨</span>
                            <h4>Generative Models</h4>
                            <p>Create new images, text, and data using AI</p>
                            <div className="feature-list">
                                <div className="feature-item"><span>GAN Training</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>VAE Latent Space</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>Diffusion Models</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>Image Generation</span><span className="status">Coming Soon</span></div>
                            </div>
                        </div>
                        <div className="info-box">
                            <h5>💡 Quick Tip</h5>
                            <p>Generative models learn the <strong>distribution</strong> of training data, allowing them to sample NEW examples that never existed in the original dataset!</p>
                        </div>
                    </div>
                );

            case 'rl':
                return (
                    <div className="category-content">
                        <div className="coming-soon">
                            <span className="icon">🎮</span>
                            <h4>Reinforcement Learning</h4>
                            <p>Train agents to play games and make decisions</p>
                            <div className="feature-list">
                                <div className="feature-item"><span>Q-Learning</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>Deep Q-Networks</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>Policy Gradient</span><span className="status">Coming Soon</span></div>
                                <div className="feature-item"><span>PPO</span><span className="status">Coming Soon</span></div>
                            </div>
                        </div>
                        <div className="info-box">
                            <h5>🎯 RL Concept</h5>
                            <p>An <strong>agent</strong> takes actions in an <strong>environment</strong>, receives <strong>rewards</strong>, and learns a <strong>policy</strong> to maximize cumulative reward!</p>
                        </div>
                    </div>
                );

            case 'training':
                return (
                    <>
                        <div className="section">
                            <h3>Hyperparameters</h3>
                            <div className="hp-grid">
                                <label><Tooltip word="Learning Rate" /></label>
                                <div className="lr-control">
                                    <input type="range" min="0.001" max="0.3" step="0.001" value={hyperparams.learningRate} onChange={(e) => updateHyperparams({ learningRate: parseFloat(e.target.value) })} />
                                    <span>{hyperparams.learningRate}</span>
                                </div>

                                <label><Tooltip word="Activation" /></label>
                                <select value={hyperparams.activation} onChange={(e) => updateHyperparams({ activation: e.target.value })}>
                                    <option value="relu">ReLU</option>
                                    <option value="sigmoid">Sigmoid</option>
                                    <option value="tanh">Tanh</option>
                                    <option value="linear">Linear</option>
                                </select>

                                <label><Tooltip word="Optimizer" /></label>
                                <select value={hyperparams.optimizer} onChange={(e) => updateHyperparams({ optimizer: e.target.value })}>
                                    <option value="adam">Adam</option>
                                    <option value="sgd">SGD</option>
                                </select>

                                <label><Tooltip word="Batch Size" /></label>
                                <div className="lr-control">
                                    <input type="range" min="1" max="128" step="1" value={hyperparams.batchSize || 32} onChange={(e) => updateHyperparams({ batchSize: parseInt(e.target.value, 10) })} />
                                    <span>{hyperparams.batchSize || 32}</span>
                                </div>
                            </div>
                        </div>

                        <div className="section">
                            <h3>Gradient Control</h3>
                            <div className="clip-control">
                                <label>Gradient Clip</label>
                                <input type="range" min="0" max="5" step="0.1" value={hyperparams.gradientClip} onChange={(e) => updateHyperparams({ gradientClip: parseFloat(e.target.value) })} />
                                <span>{hyperparams.gradientClip > 0 ? `${hyperparams.gradientClip.toFixed(1)}×` : 'Off'}</span>
                            </div>
                        </div>

                        <div className="section">
                            <h3>Save & Load</h3>
                            <div className="persist-grid">
                                <button onClick={handleSaveLocal}>Save to Browser</button>
                                <button onClick={handleLoadLocal}>Load from Browser</button>
                                <button onClick={handleExportJSON}>Export JSON</button>
                                <button onClick={() => fileInputRef.current?.click()}>Import JSON</button>
                            </div>
                            <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} style={{ display: 'none' }} />
                            {persistStatus && <div className={`persist-status ${persistStatus.type}`}>{persistStatus.text}</div>}
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="controls-panel">
            <div className="category-tabs">
                {CATEGORIES.map(cat => (
                    <button key={cat.id} className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => setActiveCategory(cat.id)} title={cat.description}>
                        <span className="tab-icon">{cat.icon}</span>
                        <span className="tab-label">{cat.label}</span>
                    </button>
                ))}
            </div>

            <div className="category-view">
                {renderCategoryContent()}
            </div>

            <CodeExport structure={structure} hyperparams={hyperparams} />

            <style>{`
            .controls-panel {
                padding: 15px;
                background: var(--bg-panel);
                border-right: var(--glass-border);
                display: flex;
                flex-direction: column;
                gap: 16px;
                width: 280px;
                height: 100%;
                overflow-y: auto;
            }
            
            .category-tabs {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
            }
            
            .category-tab {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2px;
                padding: 8px 6px;
                background: var(--bg-secondary);
                border: 1px solid transparent;
                border-radius: 8px;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.2s;
                min-width: 70px;
            }
            
            .category-tab:hover {
                border-color: var(--glass-border);
                transform: translateY(-2px);
            }
            
            .category-tab.active {
                background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
                color: var(--bg-primary);
                border-color: transparent;
            }
            
            .tab-icon {
                font-size: 16px;
            }
            
            .tab-label {
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .category-view {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            
            .section h3 {
                margin: 0 0 10px 0;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: var(--text-secondary);
            }
            
            .stats {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                font-family: monospace;
            }
            
            .stats span {
                color: var(--accent-primary);
            }
            
            .btn-primary {
                width: 100%;
                padding: 10px;
                background: var(--accent-secondary);
                color: white;
                border-radius: var(--radius-md);
                font-weight: bold;
                border: none;
                cursor: pointer;
            }
            
            .btn-primary.stop {
                background: var(--accent-danger);
            }
            
            .mode-select {
                display: flex;
                gap: 5px;
            }
            
            .mode-select button {
                flex: 1;
                padding: 8px;
                background: var(--bg-secondary);
                font-size: 11px;
                border: 1px solid var(--glass-border);
                border-radius: 6px;
                color: var(--text-secondary);
                cursor: pointer;
            }
            
            .mode-select button.active {
                background: var(--accent-primary);
                color: #000;
                font-weight: bold;
            }
            
            .train-mode-toggle {
                display: flex;
                gap: 6px;
                margin-top: 10px;
            }
            
            .train-mode-toggle button {
                flex: 1;
                background: var(--bg-secondary);
                color: var(--text-secondary);
                border-radius: 999px;
                font-size: 10px;
                border: 1px solid var(--glass-border);
                padding: 6px 4px;
                cursor: pointer;
            }
            
            .train-mode-toggle button.active {
                background: var(--accent-primary);
                color: #000;
                font-weight: 600;
            }
            
            .slow-slider, .clip-control {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 8px;
                align-items: center;
                font-size: 11px;
                color: var(--text-secondary);
                margin-top: 10px;
            }
            
            .slow-slider span, .clip-control span {
                font-family: monospace;
                color: var(--accent-primary);
            }
            
            .step-panel {
                margin-top: 10px;
                padding: 10px;
                border: 1px dashed var(--glass-border);
                border-radius: var(--radius-md);
                background: rgba(0,0,0,0.15);
            }
            
            .step-buttons {
                display: flex;
                gap: 6px;
                margin-bottom: 8px;
            }
            
            .step-buttons button {
                flex: 1;
                border: 1px solid var(--glass-border);
                border-radius: 6px;
                background: var(--bg-secondary);
                color: var(--text-secondary);
                font-size: 10px;
                padding: 6px;
                cursor: pointer;
            }
            
            .step-summary {
                display: flex;
                justify-content: space-between;
                font-size: 10px;
                color: var(--text-secondary);
                margin-bottom: 4px;
            }
            
            .step-status {
                margin: 0;
                font-size: 9px;
                color: var(--text-secondary);
            }
            
            .p-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
                font-size: 12px;
                color: var(--text-secondary);
            }
            
            .btn-sm {
                font-size: 10px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 4px 8px;
                border-radius: 4px;
                border: none;
                cursor: pointer;
            }
            
            .layer-item {
                background: rgba(0,0,0,0.2);
                padding: 8px;
                border-radius: 6px;
                margin-bottom: 6px;
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
            }
            
            .layer-label {
                font-size: 10px;
                color: var(--text-secondary);
                min-width: 50px;
            }
            
            .node-control {
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .node-control button {
                width: 18px;
                height: 18px;
                background: var(--bg-secondary);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 3px;
                font-size: 12px;
                border: none;
                cursor: pointer;
            }
            
            .node-count {
                font-family: monospace;
                font-size: 11px;
                min-width: 20px;
                text-align: center;
            }
            
            .btn-del {
                color: var(--accent-danger);
                font-size: 14px;
                background: none;
                border: none;
                cursor: pointer;
            }
            
            .layer-advanced {
                width: 100%;
                margin-top: 4px;
            }
            
            .pill-group {
                display: flex;
                gap: 4px;
            }
            
            .pill-toggle {
                flex: 1;
                border-radius: 999px;
                border: 1px solid var(--glass-border);
                background: rgba(255,255,255,0.04);
                color: var(--text-secondary);
                font-size: 9px;
                padding: 4px 6px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .pill-toggle.active {
                background: var(--accent-primary);
                color: #000;
                border-color: transparent;
                font-weight: bold;
            }
            
            .data-grid {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            
            .data-card {
                background: rgba(0,0,0,0.25);
                border: 1px solid transparent;
                border-radius: 8px;
                padding: 8px 10px;
                text-align: left;
                display: flex;
                flex-direction: column;
                gap: 2px;
                color: var(--text-secondary);
                cursor: pointer;
                transition: border-color 0.2s;
            }
            
            .data-card.active {
                border-color: var(--accent-primary);
                color: var(--text-primary);
            }
            
            .data-label {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .data-hint {
                font-size: 9px;
            }
            
            .noise-control {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 6px;
                align-items: center;
                font-size: 11px;
                color: var(--text-secondary);
                margin-top: 10px;
            }
            
            .noise-value {
                font-family: monospace;
                color: var(--accent-primary);
            }
            
            .hp-grid {
                display: grid;
                grid-template-columns: 80px 1fr;
                gap: 6px;
                align-items: center;
                font-size: 11px;
                color: var(--text-secondary);
            }
            
            .lr-control {
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .lr-control span {
                width: 30px;
                text-align: right;
                font-family: monospace;
                font-size: 10px;
            }
            
            .persist-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 6px;
            }
            
            .persist-grid button {
                padding: 8px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                border-radius: 6px;
                font-size: 10px;
                border: 1px solid var(--glass-border);
                cursor: pointer;
            }
            
            .persist-status {
                margin-top: 8px;
                font-size: 10px;
                padding: 6px 8px;
                border-radius: 6px;
                border-left: 3px solid var(--glass-border);
                color: var(--text-secondary);
                background: rgba(0,0,0,0.2);
            }
            
            .persist-status.success {
                border-color: var(--accent-primary);
                color: var(--accent-primary);
            }
            
            .coming-soon {
                text-align: center;
                padding: 20px;
                background: rgba(0,0,0,0.2);
                border-radius: var(--radius-md);
                border: 1px dashed var(--glass-border);
            }
            
            .coming-soon .icon {
                font-size: 32px;
                display: block;
                margin-bottom: 10px;
            }
            
            .coming-soon h4 {
                margin: 0 0 8px 0;
                color: var(--text-primary);
            }
            
            .coming-soon p {
                margin: 0 0 16px 0;
                font-size: 12px;
                color: var(--text-secondary);
            }
            
            .feature-list {
                display: flex;
                flex-direction: column;
                gap: 6px;
                text-align: left;
            }
            
            .feature-item {
                display: flex;
                justify-content: space-between;
                padding: 6px 10px;
                background: var(--bg-secondary);
                border-radius: 6px;
                font-size: 11px;
            }
            
            .feature-item .status {
                color: var(--accent-primary);
                font-size: 9px;
                text-transform: uppercase;
            }
            
            .info-box {
                background: linear-gradient(135deg, rgba(0, 242, 255, 0.1), rgba(255, 0, 242, 0.1));
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-md);
                padding: 12px;
                text-align: center;
            }
            
            .info-box h5 {
                margin: 0 0 6px 0;
                color: var(--accent-primary);
                font-size: 12px;
            }
            
            .info-box p {
                margin: 0;
                font-size: 11px;
                color: var(--text-secondary);
                line-height: 1.4;
            }
            
            .tip {
                font-size: 10px;
                color: var(--text-secondary);
                margin: 0 0 10px 0;
            }
            
            .mode-btn {
                width: 100%;
                padding: 12px;
                background: var(--bg-secondary);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-md);
                color: var(--text-secondary);
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .mode-btn.active, .mode-btn:hover {
                background: var(--accent-primary);
                color: #000;
                border-color: var(--accent-primary);
            }
            `}</style>
        </div>
    );
}
