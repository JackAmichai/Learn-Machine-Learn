import { useState } from 'react';
import { Tooltip } from './Tooltip';
import { ALLOWED_ACTIVATIONS, ALLOWED_OPTIMIZERS } from '../engine/NeuralNetwork';

export function CodeExport({ structure, hyperparams }) {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState('python'); // 'python' or 'js'
    const [copyStatus, setCopyStatus] = useState('idle');

    const safeActivation = ALLOWED_ACTIVATIONS.includes(hyperparams.activation) ? hyperparams.activation : 'relu';
    const safeOptimizer = ALLOWED_OPTIMIZERS.includes(hyperparams.optimizer) ? hyperparams.optimizer : 'adam';

    const generatePython = () => {
        let code = `import tensorflow as tf\nfrom tensorflow.keras import layers, models\n\n`;
        code += `model = models.Sequential()\n\n`;

        // Input layer implicit or explicit
        const inputShape = structure[0];

        // Hidden Layers
        for (let i = 1; i < structure.length - 1; i++) {
            code += `model.add(layers.Dense(${structure[i]}, activation='${safeActivation}'${i === 1 ? `, input_shape=(${inputShape},)` : ''}))\n`;
        }

        // Output Layer
        const outputShape = structure[structure.length - 1];
        let outAct = 'sigmoid';
        if (outputShape > 1) outAct = 'softmax';
        code += `model.add(layers.Dense(${outputShape}, activation='${outAct}'))\n\n`;

        // Compile
        let loss = 'mean_squared_error';
        if (outputShape > 1) loss = 'categorical_crossentropy';

        code += `model.compile(optimizer='${safeOptimizer}',\n              loss='${loss}',\n              metrics=['accuracy'])`;

        return code;
    };

    const generateJS = () => {
        let code = `const model = tf.sequential();\n\n`;

        const inputShape = structure[0];

        for (let i = 1; i < structure.length - 1; i++) {
            code += `model.add(tf.layers.dense({\n  units: ${structure[i]},\n  activation: '${safeActivation}'${i === 1 ? `,\n  inputShape: [${inputShape}]` : ''}\n}));\n`;
        }

        const outputShape = structure[structure.length - 1];
        let outAct = 'sigmoid';
        if (outputShape > 1) outAct = 'softmax';

        code += `model.add(tf.layers.dense({\n  units: ${outputShape},\n  activation: '${outAct}'\n}));\n\n`;

        let loss = 'meanSquaredError';
        if (outputShape > 1) loss = 'categoricalCrossentropy';

        code += `model.compile({\n  optimizer: '${safeOptimizer}',\n  loss: '${loss}',\n  metrics: ['accuracy']\n});`;

        return code;
    };

    const handleCopy = async () => {
        const text = lang === 'python' ? generatePython() : generateJS();
        try {
            await navigator.clipboard.writeText(text);
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
            setCopyStatus('error');
            setTimeout(() => setCopyStatus('idle'), 2000);
        }
    };

    const styles = `
        .code-export-trigger {
            position: relative;
            margin-top: 20px;
            width: 100%;
        }
        .btn-code {
            width: 100%;
            padding: 10px;
            background: var(--bg-secondary);
            border: 1px solid var(--glass-border);
            color: var(--accent-primary);
            border-radius: 8px;
            cursor: pointer;
            font-family: monospace;
            transition: background 0.2s;
        }
        .btn-code:hover {
            background: var(--glass-border);
        }
        .trigger-help {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
        }
        .code-modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(5px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .code-modal {
            background: var(--bg-panel);
            border: 1px solid var(--glass-border);
            padding: 24px;
            border-radius: 12px;
            width: 500px;
            max-width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            display: flex;
            flex-direction: column;
            max-height: 90vh;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal-header h3 {
            margin: 0;
            color: var(--text-primary);
        }
        .close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 24px;
            cursor: pointer;
        }
        .lang-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 0;
        }
        .lang-tabs button {
            padding: 8px 16px;
            background: var(--bg-secondary);
            color: var(--text-secondary);
            border-radius: 8px 8px 0 0;
            border: 1px solid var(--glass-border);
            border-bottom: none;
            cursor: pointer;
        }
        .lang-tabs button.active {
            background: var(--accent-primary);
            color: black;
            font-weight: bold;
        }
        .code-block-container {
            position: relative;
        }
        .code-block {
            background: #1e1e1e;
            padding: 20px;
            border-radius: 0 8px 8px 8px;
            overflow-x: auto;
            border: 1px solid var(--glass-border);
        }
        .code-block pre {
            margin: 0;
            font-family: 'Fira Code', monospace;
            font-size: 13px;
            color: #d4d4d4;
            white-space: pre-wrap;
        }
        .btn-copy {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #d4d4d4;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 11px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 4px;
            min-height: 24px;
            min-width: auto;
        }
        .btn-copy:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }
        .btn-copy.copied {
            background: var(--accent-success);
            color: black;
            border-color: transparent;
            font-weight: bold;
        }
        .tip {
            margin-top: 15px;
            font-size: 12px;
            color: var(--text-secondary);
            font-style: italic;
            text-align: center;
        }
    `;

    return (
        <>
            <div className="code-export-trigger">
                <button className="btn-code" onClick={() => setIsOpen(true)}>
                    &lt;/&gt; Show Code
                </button>
                <div className="trigger-help">
                    <Tooltip word="Export" overrideText="View the code to build this model" />
                </div>
            </div>

            {isOpen && (
                <div className="code-modal-overlay">
                    <div className="code-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                        <div className="modal-header">
                            <h3 id="modal-title">Export Model Code</h3>
                            <button className="close" onClick={() => setIsOpen(false)} aria-label="Close modal">×</button>
                        </div>

                        <div className="lang-tabs" role="tablist">
                            <button
                                className={lang === 'python' ? 'active' : ''}
                                onClick={() => setLang('python')}
                                role="tab"
                                aria-selected={lang === 'python'}
                            >Python (Keras)</button>
                            <button
                                className={lang === 'js' ? 'active' : ''}
                                onClick={() => setLang('js')}
                                role="tab"
                                aria-selected={lang === 'js'}
                            >JavaScript (TF.js)</button>
                        </div>

                        <div className="code-block-container">
                            <div className="code-block" role="tabpanel">
                                <pre>
                                    {lang === 'python' ? generatePython() : generateJS()}
                                </pre>
                            </div>
                            <button
                                className={`btn-copy ${copyStatus === 'copied' ? 'copied' : ''}`}
                                onClick={handleCopy}
                                aria-label="Copy code to clipboard"
                            >
                                {copyStatus === 'copied' ? '✅ Copied!' : '📋 Copy'}
                            </button>
                        </div>

                        <p className="tip">Copy this code to run your model in a real environment!</p>
                    </div>
                </div>
            )}
            <style>{styles}</style>
        </>
    );
}
