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

    return (
        <div className="controls-panel">
            {/* Task Mode Selector */}
            <div className="section">
                <h3>Task Mode</h3>
                <div className="mode-select">
                    <button
                        className={mode === 'simple' ? 'active' : ''}
                        onClick={() => setMode('simple')}
                    >Simple 2D</button>
                    <button
                        className={mode === 'vision' ? 'active' : ''}
                        onClick={() => setMode('vision')}
                    >Vision (Beta)</button>
                </div>
            </div>

            <div className="section">
                <h3>Training</h3>
                <div className="stats">
                    <div><Tooltip word="Epoch" />: <span>{epoch}</span></div>
                    <div><Tooltip word="Loss" />: <span>{loss.toFixed(4)}</span></div>
                </div>
                <button
                    className={`btn-primary ${isPlaying ? 'stop' : ''}`}
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause training' : 'Start training'}
                    aria-pressed={isPlaying}
                    disabled={trainingMode === 'step'}
                >
                    {isPlaying ? 'Pause' : 'Train'}
                </button>
                <div className="train-mode-toggle" role="group" aria-label="Training playback mode">
                    {[
                        { key: 'continuous', label: 'Continuous' },
                        { key: 'slow', label: 'Slow-Mo' },
                        { key: 'step', label: 'Step' }
                    ].map(option => (
                        <button
                            key={option.key}
                            className={trainingMode === option.key ? 'active' : ''}
                            onClick={() => setTrainingMode(option.key)}
                            aria-pressed={trainingMode === option.key}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                {trainingMode === 'slow' && (
                    <div className="slow-slider">
                        <label htmlFor="slow-delay">Frame Delay</label>
                        <input
                            id="slow-delay"
                            type="range"
                            min="150"
                            max="2000"
                            step="50"
                            value={slowDelay}
                            onChange={(e) => setSlowDelay(parseInt(e.target.value, 10))}
                        />
                        <span>{slowDelay}ms</span>
                    </div>
                )}
                {trainingMode === 'step' && (
                    <div className="step-panel">
                        <div className="step-buttons">
                            <button
                                onClick={runForwardPass}
                                disabled={stepState.busy || stepState.phase !== 'forward'}
                            >
                                Forward Pass
                            </button>
                            <button
                                onClick={runBackwardPass}
                                disabled={stepState.busy || stepState.phase !== 'backward'}
                            >
                                Backward Pass
                            </button>
                        </div>
                        <div className="step-summary">
                            <div>Forward Loss: {formatLoss(stepState.lastForwardLoss)}</div>
                            <div>Backward Loss: {formatLoss(stepState.lastBackwardLoss)}</div>
                        </div>
                        <p className="step-status">{stepState.status}</p>
                    </div>
                )}
                <div className="clip-control">
                    <label htmlFor="clip-range">Gradient Clip</label>
                    <input
                        id="clip-range"
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={hyperparams.gradientClip}
                        onChange={(e) => updateHyperparams({ gradientClip: parseFloat(e.target.value) })}
                    />
                    <span>{hyperparams.gradientClip > 0 ? `${hyperparams.gradientClip.toFixed(1)}×` : 'Off'}</span>
                </div>
            </div>

            <div className="section">
                <h3>Hyperparameters</h3>
                <div className="hp-grid">
                    <label><Tooltip word="Learning Rate" /></label>
                    <div className="lr-control">
                        <input
                            type="range"
                            min="0.001" max="0.3" step="0.001"
                            value={hyperparams.learningRate}
                            onChange={(e) => updateHyperparams({ learningRate: parseFloat(e.target.value) })}
                        />
                        <span>{hyperparams.learningRate}</span>
                    </div>

                    <label><Tooltip word="Activation" /></label>
                    <select
                        value={hyperparams.activation}
                        onChange={(e) => updateHyperparams({ activation: e.target.value })}
                    >
                        <option value="relu">ReLU</option>
                        <option value="sigmoid">Sigmoid</option>
                        <option value="tanh">Tanh</option>
                        <option value="linear">Linear</option>
                    </select>

                    <label><Tooltip word="Optimizer" /></label>
                    <select
                        value={hyperparams.optimizer}
                        onChange={(e) => updateHyperparams({ optimizer: e.target.value })}
                    >
                        <option value="adam">Adam</option>
                        <option value="sgd">SGD</option>
                    </select>
                </div>
            </div>

            <div className="section">
                <h3>Math Explorer</h3>
                <p className="math-intro">Hover the badges to preview formulas, then jump into the interactive modal for full derivations.</p>
                <div className="math-grid">
                    <div className="math-card">
                        <span className="math-label">Optimization Flow</span>
                        <div className="math-tags">
                            <Tooltip word="Gradient" />
                            <Tooltip word="Backpropagation" />
                            <Tooltip word="Optimizer" />
                        </div>
                    </div>
                    <div className="math-card">
                        <span className="math-label">Output Logic</span>
                        <div className="math-tags">
                            <Tooltip word="Softmax" />
                            <Tooltip word="Activation" />
                            <Tooltip word="Loss" />
                        </div>
                    </div>
                    <div className="math-card">
                        <span className="math-label">Generalization</span>
                        <div className="math-tags">
                            <Tooltip word="Regularization" />
                            <Tooltip word="Signal Processing" />
                            <Tooltip word="Convolution" />
                        </div>
                    </div>
                    <div className="math-card">
                        <span className="math-label">Vision Linear Algebra</span>
                        <div className="math-tags">
                            <Tooltip word="Vectors & Matrices" />
                            <Tooltip word="Dot Product" />
                            <Tooltip word="Matrix Multiplication" />
                            <Tooltip word="Tensors" />
                        </div>
                    </div>
                </div>
            </div>

            {mode === 'simple' && (
                <div className="section">
                    <h3>Data</h3>
                    <p className="data-intro">Swap dataset archetypes to stress-test the classifier, then dial in controllable noise to simulate messy real-world samples.</p>
                    <div className="data-grid">
                        {SIMPLE_DATASETS.map(option => {
                            const isActive = datasetParams.type === option.type;
                            return (
                                <button
                                    key={option.type}
                                    className={`data-card ${isActive ? 'active' : ''}`}
                                    onClick={() => setDatasetParams(prev => ({ ...prev, type: option.type }))}
                                    aria-pressed={isActive}
                                >
                                    <span className="data-label">{option.label}</span>
                                    <span className="data-hint">{option.hint}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="noise-control">
                        <label htmlFor="noise-slider">Noise</label>
                        <input
                            id="noise-slider"
                            type="range"
                            min="0"
                            max="0.6"
                            step="0.01"
                            value={datasetParams.noise}
                            onChange={(e) => handleNoiseChange(parseFloat(e.target.value))}
                        />
                        <span className="noise-value">{datasetParams.noise.toFixed(2)}</span>
                    </div>
                </div>
            )}

            <div className="section">
                <div className="p-header">
                    <h3>Architecture</h3>
                    <button className="btn-sm" onClick={addLayer} aria-label="Add a hidden layer">+ <Tooltip word="Layer" /></button>
                </div>

                <div className="layers-list">
                    {structure.map((nodes, idx) => {
                        const isInput = idx === 0;
                        const isOutput = idx === structure.length - 1;
                        const isHidden = !isInput && !isOutput;
                        const featureConfig = layerFeatures?.[idx] || DEFAULT_LAYER_CONTROLS;

                        return (
                            <div key={idx} className="layer-item">
                                <span className="layer-label">
                                    {isInput ? 'Input' : isOutput ? 'Output' : <Tooltip word="Hidden Layer" overrideText="Hidden" />}
                                    {isHidden && ` ${idx}`}
                                </span>

                                <div className="node-control">
                                    {isHidden && (
                                        <button onClick={() => updateNodeCount(idx, -1)}>-</button>
                                    )}
                                    <span className="node-count">{nodes} <Tooltip word="Neurons" /></span>
                                    {isHidden && (
                                        <button onClick={() => updateNodeCount(idx, 1)}>+</button>
                                    )}
                                </div>

                                {isHidden && (
                                    <button className="btn-del" onClick={() => removeLayer(idx)}>×</button>
                                )}

                                {isHidden && (
                                    <div className="layer-advanced">
                                        <div className="pill-group" role="group" aria-label={`Layer ${idx} advanced settings`}>
                                            <button
                                                className={`pill-toggle ${featureConfig.batchNorm ? 'active' : ''}`}
                                                onClick={() => updateLayerFeatures(idx, { batchNorm: !featureConfig.batchNorm })}
                                                aria-pressed={featureConfig.batchNorm}
                                            >
                                                BatchNorm
                                            </button>
                                            <button
                                                className={`pill-toggle ${featureConfig.dropout ? 'active' : ''}`}
                                                onClick={() => updateLayerFeatures(idx, { dropout: !featureConfig.dropout })}
                                                aria-pressed={featureConfig.dropout}
                                            >
                                                Dropout
                                            </button>
                                        </div>
                                        {featureConfig.dropout && (
                                            <div className="dropout-control">
                                                <label htmlFor={`dropout-${idx}`}>Rate</label>
                                                <input
                                                    id={`dropout-${idx}`}
                                                    type="range"
                                                    min="0.05"
                                                    max="0.8"
                                                    step="0.05"
                                                    value={featureConfig.dropoutRate}
                                                    onChange={(e) => updateLayerFeatures(idx, { dropoutRate: parseFloat(e.target.value) })}
                                                />
                                                <span>{Math.round(featureConfig.dropoutRate * 100)}%</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="section">
                <h3>Model Persistence</h3>
                <p className="persist-tip">Save the current weights, structure, and hyperparameters or share them as a portable JSON file.</p>
                <div className="persist-grid">
                    <button onClick={handleSaveLocal}>Save to Browser</button>
                    <button onClick={handleLoadLocal}>Load from Browser</button>
                    <button onClick={handleExportJSON}>Export JSON</button>
                    <button onClick={() => fileInputRef.current?.click()}>Import JSON</button>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json"
                    onChange={handleImportFile}
                    style={{ display: 'none' }}
                />
                {persistStatus && (
                    <div className={`persist-status ${persistStatus.type}`} role="status">
                        {persistStatus.text}
                    </div>
                )}
            </div>

            {/* Educational Placeholder for other types */}
            <div className="section">
                <h3>Network Type</h3>
                <div className="type-grid">
                    <button className="active">Dense (MLP)</button>
                    <div className="ed-wrapper">
                        <button disabled>CNN</button>
                        <Tooltip word="CNN" />
                    </div>
                    <div className="ed-wrapper">
                        <button disabled>RNN</button>
                        <Tooltip word="RNN" />
                    </div>
                </div>
            </div>

            <CodeExport structure={structure} hyperparams={hyperparams} />

            <style>{`
            .controls-panel {
                padding: 20px;
                background: var(--bg-panel);
                backdrop-filter: blur(10px);
                border-right: var(--glass-border);
                display: flex;
                flex-direction: column;
                gap: 24px;
                width: 300px;
                height: 100%;
                overflow-y: auto;
            }
            .section h3 {
                margin: 0 0 12px 0;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: var(--text-secondary);
            }
            .stats {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
                font-family: monospace;
            }
            .stats span {
                color: var(--accent-primary);
            }
            .btn-primary {
                width: 100%;
                padding: 12px;
                background: var(--accent-secondary);
                color: white;
                border-radius: var(--radius-md);
                font-weight: bold;
                transition: .2s;
            }
            .btn-primary.stop {
                background: var(--accent-danger);
            }
            .train-mode-toggle {
                display: flex;
                gap: 6px;
                margin-top: 12px;
            }
            .train-mode-toggle button {
                flex: 1;
                background: var(--bg-secondary);
                color: var(--text-secondary);
                border-radius: 999px;
                font-size: 11px;
                border: 1px solid var(--glass-border);
            }
            .train-mode-toggle button.active {
                background: var(--accent-primary);
                color: #000;
                font-weight: 600;
            }
            .slow-slider,
            .clip-control {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 8px;
                align-items: center;
                font-size: 12px;
                color: var(--text-secondary);
                margin-top: 12px;
            }
            .slow-slider span,
            .clip-control span {
                font-family: monospace;
                color: var(--accent-primary);
            }
            .step-panel {
                margin-top: 12px;
                padding: 12px;
                border: 1px dashed var(--glass-border);
                border-radius: var(--radius-md);
                background: rgba(0,0,0,0.15);
            }
            .step-buttons {
                display: flex;
                gap: 8px;
                margin-bottom: 10px;
            }
            .step-buttons button {
                flex: 1;
                border: 1px solid var(--glass-border);
                border-radius: 8px;
                background: var(--bg-secondary);
                color: var(--text-secondary);
                font-size: 12px;
                min-height: 36px;
            }
            .step-summary {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: var(--text-secondary);
                margin-bottom: 6px;
            }
            .step-status {
                margin: 0;
                font-size: 11px;
                color: var(--text-secondary);
            }
            .mode-select {
                display: flex;
                gap: 5px;
                margin-bottom: 15px;
            }
            .mode-select button {
                flex: 1;
                padding: 8px;
                background: var(--bg-secondary);
                font-size: 11px;
                border: 1px solid var(--glass-border);
                border-radius: 6px;
                color: var(--text-secondary);
            }
            .mode-select button.active {
                background: var(--accent-primary);
                color: #000;
                font-weight: bold;
            }
            .data-intro {
                font-size: 11px;
                color: var(--text-secondary);
                margin: 0 0 12px 0;
            }
            .data-grid {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 16px;
            }
            .data-card {
                background: rgba(0,0,0,0.25);
                border: 1px solid transparent;
                border-radius: 10px;
                padding: 10px 12px;
                text-align: left;
                display: flex;
                flex-direction: column;
                gap: 4px;
                color: var(--text-secondary);
                transition: border-color 0.2s, transform 0.2s;
            }
            .data-card.active {
                border-color: var(--accent-primary);
                box-shadow: 0 0 12px rgba(255,255,255,0.08);
                color: var(--text-primary);
            }
            .data-card:hover {
                transform: translateY(-2px);
            }
            .data-label {
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .data-hint {
                font-size: 11px;
            }
            .noise-control {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 8px;
                align-items: center;
                font-size: 12px;
                color: var(--text-secondary);
            }
            .noise-control input {
                width: 100%;
            }
            .noise-value {
                font-family: monospace;
                min-width: 40px;
                text-align: right;
                color: var(--accent-primary);
            }
            .p-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            .btn-sm {
                font-size: 12px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 4px 8px;
                border-radius: 4px;
            }
            .layer-item {
                background: rgba(0,0,0,0.2);
                padding: 10px;
                border-radius: 8px;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .layer-label {
                font-size: 12px;
                color: var(--text-secondary);
                width: 50px;
            }
            .node-control {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .node-control button {
                width: 20px;
                height: 20px;
                background: var(--bg-secondary);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                font-size: 14px;
            }
            .node-count {
                font-family: monospace;
                min-width: 20px;
                text-align: center;
            }
            .layer-advanced {
                display: flex;
                flex-direction: column;
                gap: 8px;
                width: 100%;
                margin-top: 10px;
            }
            .pill-group {
                display: flex;
                gap: 6px;
            }
            .pill-toggle {
                flex: 1;
                border-radius: 999px;
                border: 1px solid var(--glass-border);
                background: rgba(255,255,255,0.04);
                color: var(--text-secondary);
                font-size: 11px;
                min-height: auto;
                padding: 6px 10px;
                transition: all 0.2s;
            }
            .pill-toggle.active {
                background: var(--accent-primary);
                color: #000;
                border-color: transparent;
                font-weight: bold;
            }
            .dropout-control {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 8px;
                font-size: 11px;
                align-items: center;
                color: var(--text-secondary);
            }
            .dropout-control input {
                width: 100%;
                min-height: auto;
            }
            .dropout-control span {
                font-family: monospace;
                color: var(--accent-primary);
                min-width: 45px;
                text-align: right;
            }
            .btn-del {
                color: var(--accent-danger);
                font-size: 18px;
                margin-left: 8px;
            }
            .type-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            .type-grid button {
                padding: 8px;
                background: var(--bg-secondary);
                color: var(--text-secondary);
                border-radius: 8px;
                font-size: 12px;
                width: 100%;
                opacity: 0.5;
            }
            .type-grid button.active {
                background: var(--accent-primary);
                color: black;
                font-weight: bold;
                opacity: 1;
            }
            .ed-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
            }
            .ed-wrapper button {
                cursor: not-allowed;
            }
            .hp-grid {
                display: grid;
                grid-template-columns: 100px 1fr;
                gap: 8px;
                align-items: center;
                font-size: 12px;
                color: var(--text-secondary);
            }
            .hp-grid select, .hp-grid input {
                width: 100%;
                box-sizing: border-box;
            }
            .lr-control {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .lr-control span {
                width: 35px;
                text-align: right;
                font-family: monospace;
            }
            .persist-tip {
                font-size: 11px;
                color: var(--text-secondary);
                margin: 0 0 10px 0;
            }
            .persist-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            .persist-grid button {
                padding: 8px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                border-radius: 6px;
                font-size: 12px;
                border: 1px solid var(--glass-border);
            }
            .persist-grid button:hover {
                background: rgba(255,255,255,0.08);
            }
            .persist-status {
                margin-top: 10px;
                font-size: 11px;
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
            .persist-status.error {
                border-color: var(--accent-danger);
                color: var(--accent-danger);
            }
            .persist-status.info {
                border-color: var(--text-secondary);
            }
            .math-intro {
                font-size: 11px;
                color: var(--text-secondary);
                margin: 0 0 10px 0;
            }
            .math-grid {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .math-card {
                background: rgba(0,0,0,0.25);
                padding: 12px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .math-label {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: var(--text-secondary);
            }
            .math-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                font-size: 12px;
            }
        `}</style>
        </div >
    );
}
