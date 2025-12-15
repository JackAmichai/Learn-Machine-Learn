import { DataType } from '../engine/data';

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
        setDatasetParams
    } = props;

    return (
        <div className="controls-panel">
            <div className="section">
                <h3>Training</h3>
                <div className="stats">
                    <div>Epoch: <span>{epoch}</span></div>
                    <div>Loss: <span>{loss.toFixed(4)}</span></div>
                </div>
                <button
                    className={`btn-primary ${isPlaying ? 'stop' : ''}`}
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? 'Pause' : 'Train'}
                </button>
            </div>

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

            <div className="section">
                <div className="p-header">
                    <h3>Architecture</h3>
                    <button className="btn-sm" onClick={addLayer}>+ Layer</button>
                </div>

                <div className="layers-list">
                    {structure.map((nodes, idx) => {
                        const isInput = idx === 0;
                        const isOutput = idx === structure.length - 1;
                        const isHidden = !isInput && !isOutput;

                        return (
                            <div key={idx} className="layer-item">
                                <span className="layer-label">
                                    {isInput ? 'Input' : isOutput ? 'Output' : `Hidden ${idx}`}
                                </span>

                                <div className="node-control">
                                    {isHidden && (
                                        <button onClick={() => updateNodeCount(idx, -1)}>-</button>
                                    )}
                                    <span className="node-count">{nodes} Nodes</span>
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
        `}</style>
        </div>
    );
}
