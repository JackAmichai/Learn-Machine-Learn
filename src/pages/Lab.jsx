import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import { parseCSV, buildDataset, DEMO_CSV } from '../lib/csv';
import { saveExperiment, listExperiments, deleteExperiment } from '../lib/experiments';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';

/**
 * /lab — the "real" playground.
 *
 * Drop in a CSV, pick a target, pick features, tune hidden layers and learning
 * rate, then train a small dense network in-browser with TF.js. Every run is
 * logged to localStorage so you can compare hyperparameter choices side by side.
 *
 * Scope is deliberate:
 *   - dense feedforward only (no CNN / RNN — those live in /lessons)
 *   - binary/multi-class classification + 1D regression
 *   - browser-side training, capped at 200 epochs, 20k rows
 *
 * This is the page that turns the site from "ML explainer" to "ML tool."
 */

const MAX_EPOCHS = 200;
const DEFAULT_ARCH = [16, 8];

export function LabPage() {
    const [rawText, setRawText] = useState('');
    const [fileName, setFileName] = useState('');
    const [parsed, setParsed] = useState(null); // {headers, rows, profile, truncated}
    const [parseError, setParseError] = useState('');

    const [targetCol, setTargetCol] = useState('');
    const [featureCols, setFeatureCols] = useState([]);
    const [arch, setArch] = useState([...DEFAULT_ARCH]);
    const [learningRate, setLearningRate] = useState(0.01);
    const [epochs, setEpochs] = useState(50);
    const [batchSize, setBatchSize] = useState(32);
    const [runName, setRunName] = useState('');

    const [training, setTraining] = useState(false);
    const [progress, setProgress] = useState({ epoch: 0, loss: null, accuracy: null, valLoss: null, valAcc: null });
    const [lossCurve, setLossCurve] = useState([]);
    const [valCurve, setValCurve] = useState([]);
    const [finalMetrics, setFinalMetrics] = useState(null);
    const [trainError, setTrainError] = useState('');

    const [experiments, setExperiments] = useState([]);
    const [selectedRuns, setSelectedRuns] = useState([]);

    const abortRef = useRef({ stop: false });

    useEffect(() => {
        document.title = 'Lab — Train on your own data · Learn Machine Learn';
        setExperiments(listExperiments());
    }, []);

    // ───────────────────────── File handling ─────────────────────────
    const doParse = (text, name) => {
        try {
            const result = parseCSV(text);
            if (!result.headers.length) {
                setParseError('CSV looks empty or malformed.');
                setParsed(null);
                return;
            }
            setParseError('');
            setParsed(result);
            setFileName(name || 'pasted.csv');
            // Auto-guess target: last categorical column, else last numeric
            const cats = result.headers.filter(h => result.profile[h].kind === 'categorical');
            const guess = cats.length ? cats[cats.length - 1] : result.headers[result.headers.length - 1];
            setTargetCol(guess);
            setFeatureCols(result.headers.filter(h => h !== guess));
            setLossCurve([]);
            setValCurve([]);
            setFinalMetrics(null);
            setTrainError('');
        } catch (err) {
            setParseError(err.message || 'Could not parse CSV.');
            setParsed(null);
        }
    };

    const onFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 8 * 1024 * 1024) {
            setParseError('File is larger than 8MB — try a smaller CSV.');
            return;
        }
        const text = await file.text();
        setRawText(text);
        doParse(text, file.name);
    };

    const loadDemo = () => {
        setRawText(DEMO_CSV);
        doParse(DEMO_CSV, 'iris_demo.csv');
    };

    const toggleFeature = (h) => {
        setFeatureCols(prev => prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h]);
    };

    // ───────────────────────── Training ─────────────────────────
    const canTrain = parsed && targetCol && featureCols.length > 0 && !training;

    const runTraining = async () => {
        if (!canTrain) return;
        setTraining(true);
        setTrainError('');
        setLossCurve([]);
        setValCurve([]);
        setFinalMetrics(null);
        abortRef.current.stop = false;

        let model = null;
        let Xtr, ytr, Xte, yte;
        let meta;

        try {
            const ds = buildDataset({
                headers: parsed.headers,
                rows: parsed.rows,
                profile: parsed.profile,
                featureCols,
                targetCol,
            });
            meta = ds.meta;

            Xtr = tf.tensor2d(ds.X_train);
            ytr = tf.tensor2d(ds.y_train);
            Xte = tf.tensor2d(ds.X_test);
            yte = tf.tensor2d(ds.y_test);

            // Build model
            model = tf.sequential();
            const hidden = arch.filter(n => Number.isFinite(n) && n >= 1 && n <= 256);
            const safeArch = hidden.length ? hidden : [8];
            safeArch.forEach((units, i) => {
                model.add(tf.layers.dense({
                    units: Math.floor(units),
                    activation: 'relu',
                    inputShape: i === 0 ? [meta.featureDim] : undefined,
                }));
            });
            const outAct = meta.task === 'classification'
                ? (meta.outputDim > 1 ? 'softmax' : 'sigmoid')
                : 'linear';
            model.add(tf.layers.dense({ units: meta.outputDim, activation: outAct }));
            model.compile({
                optimizer: tf.train.adam(learningRate),
                loss: meta.task === 'classification'
                    ? (meta.outputDim > 1 ? 'categoricalCrossentropy' : 'binaryCrossentropy')
                    : 'meanSquaredError',
                metrics: meta.task === 'classification' ? ['accuracy'] : [],
            });

            const t0 = performance.now();
            const epochsClamped = Math.min(MAX_EPOCHS, Math.max(1, Math.floor(epochs)));
            const curve = [];
            const curveVal = [];

            await model.fit(Xtr, ytr, {
                epochs: epochsClamped,
                batchSize: Math.max(1, Math.floor(batchSize)),
                validationData: [Xte, yte],
                shuffle: true,
                callbacks: {
                    onEpochEnd: (ep, logs) => {
                        const l = logs?.loss ?? null;
                        const a = logs?.acc ?? logs?.accuracy ?? null;
                        const vl = logs?.val_loss ?? null;
                        const va = logs?.val_acc ?? logs?.val_accuracy ?? null;
                        curve.push(l);
                        curveVal.push(vl);
                        setProgress({
                            epoch: ep + 1, loss: l, accuracy: a,
                            valLoss: vl, valAcc: va,
                        });
                        setLossCurve([...curve]);
                        setValCurve([...curveVal]);
                        if (abortRef.current.stop) model.stopTraining = true;
                    },
                },
            });

            const trainTimeMs = Math.round(performance.now() - t0);

            // Final evaluate for clean numbers
            const evalTrain = model.evaluate(Xtr, ytr, { verbose: 0 });
            const evalTest = model.evaluate(Xte, yte, { verbose: 0 });
            const trArr = Array.isArray(evalTrain) ? evalTrain : [evalTrain];
            const teArr = Array.isArray(evalTest) ? evalTest : [evalTest];
            const trainLoss = (await trArr[0].data())[0];
            const testLoss = (await teArr[0].data())[0];
            let trainAcc = null, testAcc = null;
            if (trArr[1]) trainAcc = (await trArr[1].data())[0];
            if (teArr[1]) testAcc = (await teArr[1].data())[0];
            trArr.forEach(t => t.dispose());
            teArr.forEach(t => t.dispose());

            const finalMetricsObj = {
                trainLoss, testLoss, trainAcc, testAcc,
                task: meta.task, outputDim: meta.outputDim,
                classes: meta.classes,
                nTrain: meta.nTrain, nTest: meta.nTest,
                trainTimeMs,
            };
            setFinalMetrics(finalMetricsObj);

            // Persist experiment
            const record = saveExperiment({
                name: runName.trim() || `${fileName.replace(/\.csv$/i, '')} · ${arch.join('-')} · lr ${learningRate}`,
                dataset: fileName,
                task: meta.task,
                nFeatures: meta.featureDim,
                nTrain: meta.nTrain,
                nTest: meta.nTest,
                architecture: [meta.featureDim, ...safeArch, meta.outputDim],
                hyperparams: { learningRate, epochs: epochsClamped, batchSize, activation: 'relu' },
                finalLoss: trainLoss,
                finalTestLoss: testLoss,
                finalAccuracy: trainAcc,
                finalTestAccuracy: testAcc,
                trainTimeMs,
                lossCurve: curve,
            });
            setExperiments(prev => [record, ...prev]);
        } catch (err) {
            console.error(err);
            setTrainError(err.message || 'Training failed — check your column choices.');
        } finally {
            // Cleanup
            try { if (model) model.dispose(); } catch { /* noop */ }
            [Xtr, ytr, Xte, yte].forEach(t => { try { t?.dispose(); } catch { /* noop */ } });
            setTraining(false);
            setProgress(p => ({ ...p }));
        }
    };

    const stopTraining = () => { abortRef.current.stop = true; };

    const onDeleteExp = (id) => {
        deleteExperiment(id);
        setExperiments(listExperiments());
        setSelectedRuns(prev => prev.filter(x => x !== id));
    };

    const toggleSelectRun = (id) => {
        setSelectedRuns(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) :
            prev.length >= 4 ? prev : [...prev, id]
        );
    };

    // ───────────────────────── Render helpers ─────────────────────────
    const compareRuns = useMemo(
        () => experiments.filter(e => selectedRuns.includes(e.id)),
        [experiments, selectedRuns]
    );

    return (
        <div className="lab-page">
            <header className="lab-header">
                <div>
                    <h1>The <span>Lab</span></h1>
                    <p>Train a real neural network on your own CSV — in your browser, for free, no data ever leaves this tab.</p>
                </div>
                <div className="lab-header-actions">
                    <Link to="/playground" className="lab-nav">Playground</Link>
                    <Link to="/lessons" className="lab-nav">Lessons</Link>
                    <Link to="/about" className="lab-nav">About</Link>
                    <ThemeToggle />
                </div>
            </header>

            <main className="lab-main">
                {/* STEP 1 — data */}
                <section className="lab-card">
                    <header className="lab-card-head">
                        <span className="lab-step">01</span>
                        <div>
                            <h2>Load a dataset</h2>
                            <p>Upload a CSV, paste one in, or use the Iris demo. Runs entirely in the browser.</p>
                        </div>
                    </header>

                    <div className="lab-data-row">
                        <label className="lab-file-btn">
                            <input type="file" accept=".csv,text/csv" onChange={onFile} hidden />
                            <span>📄 Upload CSV</span>
                        </label>
                        <button className="lab-demo-btn" onClick={loadDemo}>Use Iris demo</button>
                        <span className="lab-file-name">{fileName || 'No file chosen'}</span>
                    </div>

                    <details className="lab-paste">
                        <summary>or paste CSV text</summary>
                        <textarea
                            placeholder="header1,header2,…&#10;value1,value2,…"
                            value={rawText}
                            onChange={e => setRawText(e.target.value)}
                            rows={6}
                        />
                        <button
                            className="lab-demo-btn"
                            onClick={() => doParse(rawText, 'pasted.csv')}
                            disabled={!rawText.trim()}
                        >
                            Parse
                        </button>
                    </details>

                    {parseError && <div className="lab-error">{parseError}</div>}
                    {parsed && (
                        <div className="lab-parse-summary">
                            <strong>{parsed.rows.length}</strong> rows · <strong>{parsed.headers.length}</strong> columns
                            {parsed.truncated && <span className="lab-warn"> · truncated to 20k rows</span>}
                        </div>
                    )}
                </section>

                {parsed && (
                    <>
                        {/* STEP 2 — columns */}
                        <section className="lab-card">
                            <header className="lab-card-head">
                                <span className="lab-step">02</span>
                                <div>
                                    <h2>Pick target &amp; features</h2>
                                    <p>
                                        Target is what the network tries to predict.
                                        Numeric target → regression. Text / category target → classification.
                                    </p>
                                </div>
                            </header>

                            <div className="lab-columns-table">
                                <div className="lab-col-head">
                                    <span>Column</span>
                                    <span>Type</span>
                                    <span>Summary</span>
                                    <span>Target</span>
                                    <span>Feature</span>
                                </div>
                                {parsed.headers.map(h => {
                                    const p = parsed.profile[h];
                                    const isTarget = targetCol === h;
                                    const isFeature = featureCols.includes(h);
                                    const summary = p.kind === 'numeric'
                                        ? `min ${p.min.toFixed(2)} · max ${p.max.toFixed(2)} · μ ${p.mean.toFixed(2)}`
                                        : `${p.classes.length} classes${p.classes.length <= 4 ? ` (${p.classes.join(', ')})` : ''}`;
                                    return (
                                        <div className="lab-col-row" key={h}>
                                            <span className="lab-col-name">{h}</span>
                                            <span className={`lab-type-chip lab-type-${p.kind}`}>{p.kind}</span>
                                            <span className="lab-col-summary">{summary}{p.missing > 0 && <em> · {p.missing} missing</em>}</span>
                                            <label className="lab-radio">
                                                <input
                                                    type="radio"
                                                    name="target"
                                                    checked={isTarget}
                                                    onChange={() => { setTargetCol(h); setFeatureCols(prev => prev.filter(x => x !== h)); }}
                                                />
                                            </label>
                                            <label className="lab-check">
                                                <input
                                                    type="checkbox"
                                                    checked={isFeature}
                                                    disabled={isTarget}
                                                    onChange={() => toggleFeature(h)}
                                                />
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>

                            {targetCol && parsed.profile[targetCol] && (
                                <div className="lab-task-callout">
                                    Detected task:{' '}
                                    <strong>
                                        {parsed.profile[targetCol].kind === 'categorical'
                                            ? (parsed.profile[targetCol].classes.length === 2 ? 'Binary classification' : `${parsed.profile[targetCol].classes.length}-class classification`)
                                            : 'Regression'}
                                    </strong>
                                </div>
                            )}
                        </section>

                        {/* STEP 3 — model */}
                        <section className="lab-card">
                            <header className="lab-card-head">
                                <span className="lab-step">03</span>
                                <div>
                                    <h2>Configure the network</h2>
                                    <p>Small dense network. Start with the defaults — then experiment.</p>
                                </div>
                            </header>

                            <div className="lab-controls-grid">
                                <div className="lab-control">
                                    <label>Hidden layers <span className="lab-hint">(comma-separated sizes)</span></label>
                                    <input
                                        type="text"
                                        value={arch.join(', ')}
                                        onChange={e => {
                                            const parts = e.target.value.split(',').map(s => Number(s.trim())).filter(n => Number.isFinite(n));
                                            setArch(parts);
                                        }}
                                        placeholder="16, 8"
                                    />
                                </div>
                                <div className="lab-control">
                                    <label>Learning rate <span className="lab-hint">{learningRate}</span></label>
                                    <input
                                        type="range" min="0.0001" max="0.1" step="0.0001"
                                        value={learningRate}
                                        onChange={e => setLearningRate(Number(e.target.value))}
                                    />
                                </div>
                                <div className="lab-control">
                                    <label>Epochs <span className="lab-hint">{epochs}</span></label>
                                    <input
                                        type="range" min="5" max={MAX_EPOCHS} step="1"
                                        value={epochs}
                                        onChange={e => setEpochs(Number(e.target.value))}
                                    />
                                </div>
                                <div className="lab-control">
                                    <label>Batch size <span className="lab-hint">{batchSize}</span></label>
                                    <input
                                        type="range" min="1" max="128" step="1"
                                        value={batchSize}
                                        onChange={e => setBatchSize(Number(e.target.value))}
                                    />
                                </div>
                                <div className="lab-control lab-control-wide">
                                    <label>Run label <span className="lab-hint">(optional, helps when comparing)</span></label>
                                    <input
                                        type="text"
                                        value={runName}
                                        onChange={e => setRunName(e.target.value)}
                                        placeholder="e.g. deeper + lower lr"
                                    />
                                </div>
                            </div>

                            <div className="lab-train-actions">
                                {!training ? (
                                    <button
                                        className="lab-train-btn"
                                        onClick={runTraining}
                                        disabled={!canTrain}
                                    >
                                        🚀 Train model
                                    </button>
                                ) : (
                                    <button className="lab-stop-btn" onClick={stopTraining}>
                                        ⏸ Stop training
                                    </button>
                                )}
                                {training && (
                                    <div className="lab-progress-line">
                                        epoch <strong>{progress.epoch}</strong> / {Math.min(MAX_EPOCHS, epochs)}
                                        {progress.loss != null && <> · loss <strong>{progress.loss.toFixed(4)}</strong></>}
                                        {progress.valLoss != null && <> · val_loss <strong>{progress.valLoss.toFixed(4)}</strong></>}
                                        {progress.accuracy != null && <> · acc <strong>{(progress.accuracy * 100).toFixed(1)}%</strong></>}
                                    </div>
                                )}
                            </div>

                            {trainError && <div className="lab-error">{trainError}</div>}
                        </section>
                    </>
                )}

                {/* STEP 4 — results */}
                {(lossCurve.length > 0 || finalMetrics) && (
                    <section className="lab-card">
                        <header className="lab-card-head">
                            <span className="lab-step">04</span>
                            <div>
                                <h2>Results</h2>
                                <p>Loss curve + final metrics. Each run is saved below so you can compare.</p>
                            </div>
                        </header>
                        <LossChart
                            curves={[
                                { name: 'train', color: '#00f2ff', values: lossCurve },
                                { name: 'val',   color: '#fb923c', values: valCurve },
                            ]}
                        />
                        {finalMetrics && (
                            <div className="lab-final-grid">
                                <div><span>Train loss</span><strong>{finalMetrics.trainLoss?.toFixed(4)}</strong></div>
                                <div><span>Test loss</span><strong>{finalMetrics.testLoss?.toFixed(4)}</strong></div>
                                {finalMetrics.trainAcc != null && <div><span>Train acc</span><strong>{(finalMetrics.trainAcc * 100).toFixed(1)}%</strong></div>}
                                {finalMetrics.testAcc  != null && <div><span>Test acc</span><strong>{(finalMetrics.testAcc  * 100).toFixed(1)}%</strong></div>}
                                <div><span>Train time</span><strong>{(finalMetrics.trainTimeMs / 1000).toFixed(1)}s</strong></div>
                                <div><span>Task</span><strong>{finalMetrics.task}</strong></div>
                            </div>
                        )}
                    </section>
                )}

                {/* STEP 5 — experiments */}
                <section className="lab-card">
                    <header className="lab-card-head">
                        <span className="lab-step">05</span>
                        <div>
                            <h2>Experiments</h2>
                            <p>Every run is saved locally. Tick up to 4 rows to overlay their loss curves.</p>
                        </div>
                    </header>

                    {experiments.length === 0 ? (
                        <div className="lab-empty">
                            No runs yet. Train a model above — it'll land here automatically.
                        </div>
                    ) : (
                        <>
                            <div className="lab-runs">
                                {experiments.map(e => {
                                    const isSel = selectedRuns.includes(e.id);
                                    return (
                                        <label key={e.id} className={`lab-run ${isSel ? 'sel' : ''}`}>
                                            <input
                                                type="checkbox"
                                                checked={isSel}
                                                onChange={() => toggleSelectRun(e.id)}
                                            />
                                            <div className="lab-run-body">
                                                <div className="lab-run-title">
                                                    <strong>{e.name}</strong>
                                                    <button
                                                        className="lab-run-del"
                                                        onClick={(ev) => { ev.preventDefault(); onDeleteExp(e.id); }}
                                                        aria-label={`Delete run ${e.name}`}
                                                    >×</button>
                                                </div>
                                                <div className="lab-run-meta">
                                                    <span>{e.task}</span>
                                                    <span>arch [{e.architecture.join('·')}]</span>
                                                    <span>lr {e.hyperparams.learningRate}</span>
                                                    <span>{e.hyperparams.epochs} ep</span>
                                                    <span>bs {e.hyperparams.batchSize}</span>
                                                </div>
                                                <div className="lab-run-metrics">
                                                    {e.finalTestLoss != null && <span>test_loss <strong>{e.finalTestLoss.toFixed(4)}</strong></span>}
                                                    {e.finalTestAccuracy != null && <span>test_acc <strong>{(e.finalTestAccuracy * 100).toFixed(1)}%</strong></span>}
                                                    {e.trainTimeMs != null && <span>{(e.trainTimeMs / 1000).toFixed(1)}s</span>}
                                                </div>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                            {compareRuns.length >= 2 && (
                                <div className="lab-compare">
                                    <h3>Overlayed loss curves</h3>
                                    <LossChart
                                        curves={compareRuns.map((e, i) => ({
                                            name: e.name,
                                            color: ['#00f2ff', '#fb923c', '#34d399', '#c084fc'][i % 4],
                                            values: e.lossCurve,
                                        }))}
                                        showLegend
                                    />
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>

            <Footer />

            <style>{`
                .lab-page {
                    min-height: 100vh;
                    color: var(--text-primary);
                    background:
                        radial-gradient(1200px 500px at 5% -10%, rgba(0,242,255,0.10), transparent 60%),
                        radial-gradient(900px 400px at 110% 20%, rgba(112,0,255,0.10), transparent 60%),
                        var(--bg-primary);
                    font-family: var(--font-main, 'Inter', system-ui, sans-serif);
                }
                .lab-header {
                    max-width: 1150px;
                    margin: 0 auto;
                    padding: 24px 24px 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .lab-header h1 {
                    font-family: 'Outfit', var(--font-main);
                    font-size: 28px;
                    margin: 0;
                    letter-spacing: -0.5px;
                }
                .lab-header h1 span {
                    background: linear-gradient(135deg, #00f2ff, #7000ff);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
                .lab-header p {
                    margin: 4px 0 0;
                    font-size: 13px;
                    color: var(--text-secondary);
                }
                .lab-header-actions {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .lab-nav {
                    text-decoration: none;
                    padding: 6px 12px;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 999px;
                    color: var(--text-secondary);
                    font-size: 12px;
                    transition: color 0.2s, border-color 0.2s;
                }
                .lab-nav:hover {
                    color: var(--accent-primary);
                    border-color: var(--accent-primary);
                }
                .lab-main {
                    max-width: 1150px;
                    margin: 0 auto;
                    padding: 16px 24px 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .lab-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                    padding: 24px;
                    backdrop-filter: blur(10px);
                }
                .lab-card-head {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    margin-bottom: 18px;
                }
                .lab-step {
                    font-family: 'Outfit', var(--font-main);
                    font-size: 14px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    background: linear-gradient(135deg, #00f2ff, #7000ff);
                    color: #fff;
                    padding: 6px 10px;
                    border-radius: 8px;
                    flex-shrink: 0;
                }
                .lab-card-head h2 {
                    font-family: 'Outfit', var(--font-main);
                    font-size: 20px;
                    margin: 0 0 4px;
                }
                .lab-card-head p {
                    font-size: 13px;
                    color: var(--text-secondary);
                    margin: 0;
                    line-height: 1.55;
                }

                .lab-data-row {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .lab-file-btn {
                    display: inline-block;
                    background: linear-gradient(135deg, #00f2ff, #7000ff);
                    color: #fff;
                    padding: 10px 18px;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 13px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .lab-file-btn:hover { transform: translateY(-1px); }
                .lab-demo-btn {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.15);
                    color: var(--text-primary);
                    padding: 9px 16px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 13px;
                    font-family: inherit;
                }
                .lab-demo-btn:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
                .lab-demo-btn:disabled { opacity: 0.4; cursor: not-allowed; }
                .lab-file-name {
                    font-size: 13px;
                    color: var(--text-secondary);
                    font-family: ui-monospace, monospace;
                }
                .lab-paste {
                    margin-top: 14px;
                }
                .lab-paste summary {
                    cursor: pointer;
                    font-size: 12px;
                    color: var(--text-secondary);
                    user-select: none;
                    padding: 6px 0;
                }
                .lab-paste textarea {
                    width: 100%;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px;
                    padding: 10px;
                    color: var(--text-primary);
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    margin: 8px 0;
                    resize: vertical;
                }
                .lab-error {
                    margin-top: 12px;
                    padding: 10px 14px;
                    background: rgba(255,0,85,0.08);
                    border: 1px solid rgba(255,0,85,0.25);
                    border-radius: 8px;
                    color: #ff6b8a;
                    font-size: 13px;
                }
                .lab-parse-summary {
                    margin-top: 12px;
                    font-size: 13px;
                    color: var(--text-secondary);
                }
                .lab-warn { color: #fb923c; }

                .lab-columns-table {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    max-height: 360px;
                    overflow-y: auto;
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 10px;
                    padding: 6px;
                    background: rgba(0,0,0,0.25);
                }
                .lab-col-head, .lab-col-row {
                    display: grid;
                    grid-template-columns: 1.5fr 0.6fr 2fr 0.5fr 0.5fr;
                    gap: 10px;
                    padding: 8px 10px;
                    align-items: center;
                    font-size: 13px;
                }
                .lab-col-head {
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--text-secondary);
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .lab-col-row:hover { background: rgba(255,255,255,0.03); border-radius: 6px; }
                .lab-col-name { font-weight: 600; }
                .lab-type-chip {
                    font-size: 10px;
                    padding: 2px 8px;
                    border-radius: 999px;
                    text-transform: uppercase;
                    letter-spacing: 0.6px;
                    font-weight: 600;
                    width: fit-content;
                }
                .lab-type-numeric { background: rgba(0,242,255,0.12); color: var(--accent-primary); }
                .lab-type-categorical { background: rgba(112,0,255,0.12); color: #c084fc; }
                .lab-col-summary { font-size: 12px; color: var(--text-secondary); font-family: ui-monospace, monospace; }
                .lab-col-summary em { color: #fb923c; font-style: normal; }
                .lab-task-callout {
                    margin-top: 14px;
                    padding: 10px 14px;
                    background: rgba(0,242,255,0.06);
                    border: 1px solid rgba(0,242,255,0.2);
                    border-radius: 8px;
                    font-size: 13px;
                    color: var(--text-secondary);
                }
                .lab-task-callout strong { color: var(--accent-primary); }

                .lab-controls-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }
                @media (max-width: 700px) {
                    .lab-controls-grid { grid-template-columns: 1fr; }
                }
                .lab-control-wide { grid-column: 1 / -1; }
                .lab-control label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--text-secondary);
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                }
                .lab-hint {
                    text-transform: none;
                    color: var(--accent-primary);
                    font-family: ui-monospace, monospace;
                    font-weight: 500;
                    letter-spacing: 0;
                }
                .lab-control input[type="text"] {
                    width: 100%;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    padding: 10px 12px;
                    color: var(--text-primary);
                    font-family: ui-monospace, monospace;
                    font-size: 13px;
                }
                .lab-control input[type="range"] {
                    width: 100%;
                    accent-color: var(--accent-primary);
                }

                .lab-train-actions {
                    margin-top: 18px;
                    display: flex;
                    gap: 16px;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .lab-train-btn {
                    background: linear-gradient(135deg, #00f2ff, #7000ff);
                    color: #fff;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: inherit;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .lab-train-btn:not(:disabled):hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0,242,255,0.35);
                }
                .lab-train-btn:disabled { opacity: 0.4; cursor: not-allowed; }
                .lab-stop-btn {
                    background: rgba(255,0,85,0.1);
                    color: #ff6b8a;
                    border: 1px solid rgba(255,0,85,0.3);
                    padding: 12px 24px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-family: inherit;
                    font-weight: 600;
                }
                .lab-progress-line {
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: var(--text-secondary);
                }
                .lab-progress-line strong { color: var(--accent-primary); }

                .lab-final-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                    gap: 12px;
                    margin-top: 18px;
                    padding: 16px;
                    background: rgba(0,0,0,0.25);
                    border-radius: 10px;
                }
                .lab-final-grid > div {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .lab-final-grid span {
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--text-secondary);
                }
                .lab-final-grid strong {
                    font-family: 'Outfit', var(--font-main);
                    font-size: 22px;
                    background: linear-gradient(135deg, #00f2ff, #c084fc);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }

                .lab-empty {
                    padding: 32px;
                    text-align: center;
                    color: var(--text-secondary);
                    font-size: 14px;
                    background: rgba(0,0,0,0.25);
                    border-radius: 10px;
                    border: 1px dashed rgba(255,255,255,0.08);
                }
                .lab-runs {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .lab-run {
                    display: grid;
                    grid-template-columns: 24px 1fr;
                    gap: 12px;
                    padding: 14px;
                    background: rgba(0,0,0,0.25);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 10px;
                    cursor: pointer;
                    transition: border-color 0.2s, background 0.2s;
                }
                .lab-run:hover { border-color: rgba(0,242,255,0.3); }
                .lab-run.sel { border-color: var(--accent-primary); background: rgba(0,242,255,0.04); }
                .lab-run input[type="checkbox"] { accent-color: var(--accent-primary); margin-top: 2px; }
                .lab-run-title {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    margin-bottom: 4px;
                }
                .lab-run-del {
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 18px;
                    line-height: 1;
                    padding: 0 6px;
                }
                .lab-run-del:hover { color: #ff6b8a; }
                .lab-run-meta, .lab-run-metrics {
                    display: flex;
                    gap: 12px;
                    font-size: 11px;
                    color: var(--text-secondary);
                    font-family: ui-monospace, monospace;
                    flex-wrap: wrap;
                }
                .lab-run-metrics { margin-top: 4px; }
                .lab-run-metrics strong { color: var(--accent-primary); }

                .lab-compare {
                    margin-top: 20px;
                    padding: 18px;
                    background: rgba(0,0,0,0.3);
                    border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.06);
                }
                .lab-compare h3 {
                    font-family: 'Outfit', var(--font-main);
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    margin: 0 0 12px;
                    color: var(--accent-primary);
                }
            `}</style>
        </div>
    );
}

// ─────────────────────────────── loss chart ───────────────────────────────

/**
 * Small SVG loss chart — renders 1..4 curves overlayed, with autoscaled Y.
 * Deliberately minimal; no external chart dep so bundle stays lean.
 */
function LossChart({ curves, showLegend = false }) {
    const W = 700, H = 220;
    const padL = 42, padR = 14, padT = 14, padB = 28;

    const valid = curves.filter(c => Array.isArray(c.values) && c.values.length > 0);
    if (valid.length === 0) {
        return <div className="losschart-empty">Curve appears once training starts…</div>;
    }

    const maxLen = Math.max(...valid.map(c => c.values.length));
    const allVals = valid.flatMap(c => c.values.filter(v => Number.isFinite(v)));
    const yMin = Math.min(...allVals);
    const yMax = Math.max(...allVals);
    const ySpan = yMax - yMin || 1;

    const xOf = (i) => padL + (i / Math.max(1, maxLen - 1)) * (W - padL - padR);
    const yOf = (v) => padT + (1 - (v - yMin) / ySpan) * (H - padT - padB);

    // Y gridlines
    const yTicks = 4;
    const tickVals = Array.from({ length: yTicks + 1 }, (_, i) => yMin + (i / yTicks) * ySpan);

    return (
        <div className="losschart-wrap">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} role="img" aria-label="Loss curve">
                {/* gridlines */}
                {tickVals.map((tv, i) => (
                    <g key={i}>
                        <line x1={padL} y1={yOf(tv)} x2={W - padR} y2={yOf(tv)} stroke="rgba(255,255,255,0.06)" />
                        <text x={padL - 6} y={yOf(tv) + 3} fontSize="10" fill="rgba(255,255,255,0.45)" textAnchor="end" fontFamily="ui-monospace,monospace">
                            {tv.toFixed(tv >= 10 ? 0 : 2)}
                        </text>
                    </g>
                ))}
                {/* x axis label */}
                <text x={W / 2} y={H - 6} fontSize="10" fill="rgba(255,255,255,0.45)" textAnchor="middle" fontFamily="ui-monospace,monospace">
                    epoch →
                </text>
                {/* curves */}
                {valid.map((c, ci) => {
                    const pts = c.values
                        .map((v, i) => Number.isFinite(v) ? `${xOf(i)},${yOf(v)}` : null)
                        .filter(Boolean)
                        .join(' ');
                    return (
                        <g key={ci}>
                            <polyline
                                points={pts}
                                fill="none"
                                stroke={c.color}
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity="0.92"
                            />
                        </g>
                    );
                })}
            </svg>
            {(showLegend || valid.length > 1) && (
                <div className="losschart-legend">
                    {valid.map((c, i) => (
                        <span key={i}>
                            <i style={{ background: c.color }} />
                            {c.name}
                        </span>
                    ))}
                </div>
            )}
            <style>{`
                .losschart-wrap {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 10px;
                    padding: 10px;
                }
                .losschart-empty {
                    padding: 40px;
                    text-align: center;
                    color: var(--text-secondary);
                    background: rgba(0,0,0,0.25);
                    border: 1px dashed rgba(255,255,255,0.08);
                    border-radius: 10px;
                    font-size: 13px;
                }
                .losschart-legend {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    padding: 4px 10px 8px;
                    font-size: 11px;
                    color: var(--text-secondary);
                    font-family: ui-monospace, monospace;
                }
                .losschart-legend span {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }
                .losschart-legend i {
                    width: 12px;
                    height: 3px;
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
}

export default LabPage;
