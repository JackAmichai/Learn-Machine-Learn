import { DataType } from '../engine/data';
import { Tooltip } from './Tooltip';
import { CodeExport } from './CodeExport';

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
        updateHyperparams
    } = props;

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
                >
                    {isPlaying ? 'Pause' : 'Train'}
                </button>
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

            {mode === 'simple' && (
                <div className="section">
                    <h3>Data</h3>
                    <div className="data-native-select">
                        {Object.values(DataType).map(type => (
                            <button
                                key={type}
                                className={datasetParams.type === type ? 'active' : ''}
                                onClick={() => setDatasetParams(p => ({ ...p, type }))}
                            >
                                {type.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="section">
                <div className="p-header">
                    <h3>Architecture</h3>
                    <button className="btn-sm" onClick={addLayer}>+ <Tooltip word="Layer" /></button>
                </div>

                <div className="layers-list">
                    {structure.map((nodes, idx) => {
                        const isInput = idx === 0;
                        const isOutput = idx === structure.length - 1;
                        const isHidden = !isInput && !isOutput;

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
                                    <span className="node-count">{nodes} <Tooltip word="Nodes" overrideText="Neurons" /></span>
                                    {isHidden && (
                                        <button onClick={() => updateNodeCount(idx, 1)}>+</button>
                                    )}
                                </div>

                                {isHidden && (
                                    <button className="btn-del" onClick={() => removeLayer(idx)}>×</button>
                                )}
                            </div>
                        );
                    })}
                </div>
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
            .data-native-select {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            .data-native-select button {
                padding: 8px;
                background: var(--bg-secondary);
                color: var(--text-secondary);
                border-radius: 8px;
                font-size: 12px;
            }
            .data-native-select button.active {
                background: var(--accent-primary);
                color: black;
                font-weight: bold;
                box-shadow: 0 0 10px var(--accent-primary);
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
        `}</style>
        </div >
    );
}
