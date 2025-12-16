import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

/**
 * Computes classification metrics from model predictions
 * @param {Object} model - The neural network model wrapper
 * @param {Object} data - Dataset with xs, ys tensors and labels array
 * @param {number} modelVersion - Version trigger for recompute
 * @returns {Object} Metrics object with confusion matrix, accuracy, precision, recall, F1
 */
function computeMetrics(model, data, modelVersion) {
    if (!model?.model || !data?.xs || !data?.labels) {
        return null;
    }

    try {
        const predictions = tf.tidy(() => {
            const preds = model.predict(data.xs);
            // For binary classification with single output node
            const predData = preds.dataSync();
            return Array.from(predData).map(p => (p >= 0.5 ? 1 : 0));
        });

        const actual = data.labels;
        const n = Math.min(predictions.length, actual.length);

        // Confusion matrix: [[TN, FP], [FN, TP]]
        let tp = 0, tn = 0, fp = 0, fn = 0;

        for (let i = 0; i < n; i++) {
            const pred = predictions[i];
            const truth = actual[i];
            if (pred === 1 && truth === 1) tp++;
            else if (pred === 0 && truth === 0) tn++;
            else if (pred === 1 && truth === 0) fp++;
            else fn++;
        }

        const total = tp + tn + fp + fn;
        const accuracy = total > 0 ? (tp + tn) / total : 0;

        // Per-class accuracy
        const class0Total = tn + fp;
        const class1Total = tp + fn;
        const class0Accuracy = class0Total > 0 ? tn / class0Total : 0;
        const class1Accuracy = class1Total > 0 ? tp / class1Total : 0;

        // Precision, Recall, F1 for class 1 (positive class)
        const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
        const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;
        const f1 = (precision + recall) > 0 ? 2 * (precision * recall) / (precision + recall) : 0;

        return {
            confusionMatrix: { tp, tn, fp, fn },
            accuracy,
            class0Accuracy,
            class1Accuracy,
            precision,
            recall,
            f1,
            total,
            modelVersion
        };
    } catch (error) {
        console.error('Error computing metrics:', error);
        return null;
    }
}

export function StatsPanel({ model, data, modelVersion, epoch, loss }) {
    const [metrics, setMetrics] = useState(null);
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        // Debounce metric computation to avoid blocking UI
        const timer = setTimeout(() => {
            if (!model || !data) {
                setMetrics(null);
                return;
            }
            const computed = computeMetrics(model, data, modelVersion);
            setMetrics(computed);
        }, 100);

        return () => clearTimeout(timer);
    }, [model, data, modelVersion]);

    const formatPct = (value) => `${(value * 100).toFixed(1)}%`;

    const cm = metrics?.confusionMatrix;

    return (
        <div className="stats-panel">
            <button
                className="stats-header"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <h3>Advanced Metrics</h3>
                <span className="toggle-icon">{expanded ? '▼' : '▶'}</span>
            </button>

            {expanded && (
                <div className="stats-content">
                    <div className="basic-stats">
                        <div className="stat-item">
                            <span className="stat-label">Epoch</span>
                            <span className="stat-value">{epoch}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Loss</span>
                            <span className="stat-value">{loss.toFixed(4)}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Accuracy</span>
                            <span className="stat-value highlight">
                                {metrics ? formatPct(metrics.accuracy) : '--'}
                            </span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">F1 Score</span>
                            <span className="stat-value highlight">
                                {metrics ? formatPct(metrics.f1) : '--'}
                            </span>
                        </div>
                    </div>

                    {cm && (
                        <>
                            <div className="section-label">Confusion Matrix</div>
                            <div className="confusion-matrix" role="table" aria-label="Confusion Matrix">
                                <div className="cm-header">
                                    <div className="cm-corner"></div>
                                    <div className="cm-col-label">Pred 0</div>
                                    <div className="cm-col-label">Pred 1</div>
                                </div>
                                <div className="cm-row">
                                    <div className="cm-row-label">Actual 0</div>
                                    <div className="cm-cell tn" title="True Negative">{cm.tn}</div>
                                    <div className="cm-cell fp" title="False Positive">{cm.fp}</div>
                                </div>
                                <div className="cm-row">
                                    <div className="cm-row-label">Actual 1</div>
                                    <div className="cm-cell fn" title="False Negative">{cm.fn}</div>
                                    <div className="cm-cell tp" title="True Positive">{cm.tp}</div>
                                </div>
                            </div>

                            <div className="section-label">Per-Class Accuracy</div>
                            <div className="class-accuracy">
                                <div className="class-bar">
                                    <span className="class-label">Class 0</span>
                                    <div className="bar-track">
                                        <div
                                            className="bar-fill class0"
                                            style={{ width: formatPct(metrics.class0Accuracy) }}
                                        ></div>
                                    </div>
                                    <span className="bar-value">{formatPct(metrics.class0Accuracy)}</span>
                                </div>
                                <div className="class-bar">
                                    <span className="class-label">Class 1</span>
                                    <div className="bar-track">
                                        <div
                                            className="bar-fill class1"
                                            style={{ width: formatPct(metrics.class1Accuracy) }}
                                        ></div>
                                    </div>
                                    <span className="bar-value">{formatPct(metrics.class1Accuracy)}</span>
                                </div>
                            </div>

                            <div className="section-label">Precision / Recall</div>
                            <div className="pr-stats">
                                <div className="pr-item">
                                    <span>Precision</span>
                                    <span>{formatPct(metrics.precision)}</span>
                                </div>
                                <div className="pr-item">
                                    <span>Recall</span>
                                    <span>{formatPct(metrics.recall)}</span>
                                </div>
                            </div>
                        </>
                    )}

                    {!metrics && (
                        <p className="no-data">Train the model to see metrics.</p>
                    )}
                </div>
            )}

            <style>{`
                .stats-panel {
                    background: var(--bg-panel);
                    border: var(--glass-border);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                }
                .stats-header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 16px;
                    background: rgba(0,0,0,0.2);
                    border: none;
                    cursor: pointer;
                    min-height: auto;
                }
                .stats-header h3 {
                    margin: 0;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: var(--text-secondary);
                }
                .toggle-icon {
                    font-size: 10px;
                    color: var(--text-secondary);
                }
                .stats-content {
                    padding: 16px;
                }
                .basic-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: 16px;
                }
                .stat-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .stat-label {
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .stat-value {
                    font-size: 18px;
                    font-family: monospace;
                    color: var(--text-primary);
                }
                .stat-value.highlight {
                    color: var(--accent-primary);
                }
                .section-label {
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 16px 0 8px 0;
                }
                .confusion-matrix {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    font-size: 12px;
                }
                .cm-header, .cm-row {
                    display: grid;
                    grid-template-columns: 60px 1fr 1fr;
                    gap: 2px;
                }
                .cm-corner {
                    background: transparent;
                }
                .cm-col-label, .cm-row-label {
                    padding: 6px;
                    text-align: center;
                    color: var(--text-secondary);
                    font-size: 10px;
                }
                .cm-row-label {
                    text-align: right;
                    padding-right: 8px;
                }
                .cm-cell {
                    padding: 10px;
                    text-align: center;
                    border-radius: 4px;
                    font-family: monospace;
                    font-weight: bold;
                }
                .cm-cell.tn { background: rgba(0, 255, 157, 0.2); color: var(--accent-success); }
                .cm-cell.tp { background: rgba(0, 255, 157, 0.2); color: var(--accent-success); }
                .cm-cell.fp { background: rgba(255, 0, 85, 0.2); color: var(--accent-danger); }
                .cm-cell.fn { background: rgba(255, 0, 85, 0.2); color: var(--accent-danger); }
                .class-accuracy {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .class-bar {
                    display: grid;
                    grid-template-columns: 55px 1fr 50px;
                    align-items: center;
                    gap: 8px;
                    font-size: 11px;
                }
                .class-label {
                    color: var(--text-secondary);
                }
                .bar-track {
                    height: 8px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 4px;
                    overflow: hidden;
                }
                .bar-fill {
                    height: 100%;
                    border-radius: 4px;
                    transition: width 0.3s ease;
                }
                .bar-fill.class0 { background: var(--accent-primary); }
                .bar-fill.class1 { background: var(--accent-secondary); }
                .bar-value {
                    text-align: right;
                    font-family: monospace;
                    color: var(--text-primary);
                }
                .pr-stats {
                    display: flex;
                    gap: 16px;
                }
                .pr-item {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 12px;
                    background: rgba(0,0,0,0.2);
                    border-radius: 6px;
                    font-size: 12px;
                }
                .pr-item span:first-child {
                    color: var(--text-secondary);
                }
                .pr-item span:last-child {
                    font-family: monospace;
                    color: var(--accent-primary);
                }
                .no-data {
                    text-align: center;
                    color: var(--text-secondary);
                    font-size: 12px;
                    padding: 20px;
                    margin: 0;
                }
            `}</style>
        </div>
    );
}
