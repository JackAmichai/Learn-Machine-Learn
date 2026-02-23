import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Tooltip } from './Tooltip';
import { ALLOWED_ACTIVATIONS, ALLOWED_OPTIMIZERS } from '../engine/NeuralNetwork';

export function CodeExport({ structure, hyperparams }) {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState('python'); // 'python' or 'js'

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

    return (
        <>
            <div className="show-code-wrapper">
                <button className="btn-code" onClick={() => setIsOpen(true)}>
                    &lt;/&gt; Show Code
                </button>
                <Tooltip word="Export" overrideText="View the code to build this model" />
            </div>

            {isOpen && createPortal(
                <div className="code-modal-overlay">
                    <div className="code-modal">
                        <div className="modal-header">
                            <h3>Export Model Code</h3>
                            <button className="close" onClick={() => setIsOpen(false)} aria-label="Close">×</button>
                        </div>

                        <div className="lang-tabs">
                            <button className={lang === 'python' ? 'active' : ''} onClick={() => setLang('python')}>Python (Keras)</button>
                            <button className={lang === 'js' ? 'active' : ''} onClick={() => setLang('js')}>JavaScript (TF.js)</button>
                        </div>

                        <div className="code-block">
                            <pre>
                                {lang === 'python' ? generatePython() : generateJS()}
                            </pre>
                        </div>

                        <p className="tip">Copy this code to run your model in a real environment!</p>
                    </div>
                </div>,
                document.body
            )}

            <style>{`
            .show-code-wrapper {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-top: 20px;
                width: 100%;
                justify-content: center;
            }
            .btn-code {
                flex: 1;
                padding: 10px;
                background: var(--bg-secondary);
                border: 1px solid var(--glass-border);
                color: var(--accent-primary);
                border-radius: 8px;
                cursor: pointer;
                font-family: monospace;
            }
            .btn-code:hover {
                background: var(--glass-border);
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
            .tip {
                margin-top: 15px;
                font-size: 12px;
                color: var(--text-secondary);
                font-style: italic;
                text-align: center;
            }
        `}</style>
        </>
    );
}
