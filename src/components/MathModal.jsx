import { useState } from 'react';
import { MATH_TOPICS } from '../engine/mathContent';

export function MathModal({ topic, onClose }) {
    const data = MATH_TOPICS[topic];
    const [activeFormula, setActiveFormula] = useState(null);
    const [sliderValues, setSliderValues] = useState({});

    if (!data) return null;

    const handleFormulaPartHover = (partKey) => {
        setActiveFormula(partKey);
    };

    const handleSliderChange = (key, value) => {
        setSliderValues(prev => ({ ...prev, [key]: parseFloat(value) }));
    };

    // Get interactive formulas if available
    const interactiveFormulas = data.interactiveFormulas || [];

    return (
        <div className="math-modal-overlay" onClick={onClose}>
            <div className="math-modal-content" onClick={e => e.stopPropagation()}>
                <div className="math-header">
                    <h2>{data.title}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="math-body" dangerouslySetInnerHTML={{ __html: data.content }} />

                {/* Interactive Formula Explorer */}
                {interactiveFormulas.length > 0 && (
                    <div className="formula-explorer">
                        <h3>🧪 Interactive Formula Explorer</h3>
                        <p className="explorer-desc">Adjust the values below to see how each part affects the output:</p>
                        
                        {interactiveFormulas.map((formula, idx) => (
                            <FormulaPlayground 
                                key={idx} 
                                formula={formula}
                                sliderValues={sliderValues}
                                onSliderChange={handleSliderChange}
                                activeFormula={activeFormula}
                                onPartHover={handleFormulaPartHover}
                            />
                        ))}
                    </div>
                )}

                <div className="math-footer">
                    <button onClick={onClose}>Got it!</button>
                </div>
            </div>

            <style>{`
            .math-modal-overlay {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.2s ease-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .math-modal-content {
                background: var(--bg-panel);
                border: 1px solid var(--accent-secondary);
                box-shadow: 0 0 30px rgba(112, 0, 255, 0.3);
                width: 700px;
                max-width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                border-radius: 16px;
                padding: 24px;
                color: var(--text-primary);
            }
            .math-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 1px solid var(--glass-border);
                padding-bottom: 10px;
            }
            .math-header h2 {
                margin: 0;
                color: var(--accent-primary);
                font-family: var(--font-main);
            }
            .close-btn {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 28px;
                cursor: pointer;
            }
            .math-body {
                line-height: 1.6;
                font-size: 15px;
            }
            .math-body h4 {
                color: var(--accent-secondary);
                margin-top: 20px;
                margin-bottom: 10px;
            }
            .equation {
                background: rgba(0,0,0,0.3);
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                font-family: 'Times New Roman', serif;
                font-style: italic;
                font-size: 18px;
                margin: 15px 0;
                color: #fff;
                border-left: 3px solid var(--accent-primary);
            }
            
            /* Formula Explorer */
            .formula-explorer {
                margin-top: 30px;
                padding: 20px;
                background: rgba(0, 242, 255, 0.05);
                border: 1px solid var(--accent-primary);
                border-radius: 12px;
            }
            .formula-explorer h3 {
                margin: 0 0 10px 0;
                color: var(--accent-primary);
                font-size: 16px;
            }
            .explorer-desc {
                font-size: 13px;
                color: var(--text-secondary);
                margin-bottom: 20px;
            }
            
            .math-footer {
                margin-top: 30px;
                text-align: right;
            }
            .math-footer button {
                background: var(--accent-primary);
                color: black;
                font-weight: bold;
                padding: 10px 24px;
                border-radius: 8px;
                transition: transform 0.1s;
            }
            .math-footer button:hover {
                transform: scale(1.05);
            }
        `}</style>
        </div>
    );
}

function FormulaPlayground({ formula, sliderValues, onSliderChange, activeFormula, onPartHover }) {
    // Initialize slider values with defaults
    const getSliderValue = (key, defaultVal) => {
        return sliderValues[key] !== undefined ? sliderValues[key] : defaultVal;
    };

    // Calculate the result based on the formula type
    const calculateResult = () => {
        try {
            return formula.calculate(sliderValues, getSliderValue);
        } catch (e) {
            return 'N/A';
        }
    };

    const result = calculateResult();

    return (
        <div className="formula-playground">
            <div className="formula-display">
                <span className="formula-name">{formula.name}:</span>
                <div className="formula-parts">
                    {formula.parts.map((part, idx) => (
                        <span 
                            key={idx}
                            className={`formula-part ${activeFormula === part.key ? 'active' : ''}`}
                            onMouseEnter={() => onPartHover(part.key)}
                            onMouseLeave={() => onPartHover(null)}
                        >
                            {part.symbol}
                            {part.key && activeFormula === part.key && (
                                <div className="part-tooltip">
                                    <strong>{part.name}</strong>
                                    <p>{part.description}</p>
                                </div>
                            )}
                        </span>
                    ))}
                    <span className="formula-result">= {typeof result === 'number' ? result.toFixed(4) : result}</span>
                </div>
            </div>

            <div className="formula-controls">
                {formula.variables.map((variable, idx) => (
                    <div key={idx} className="control-row">
                        <label 
                            className={activeFormula === variable.key ? 'highlight' : ''}
                            onMouseEnter={() => onPartHover(variable.key)}
                            onMouseLeave={() => onPartHover(null)}
                        >
                            <span className="var-symbol">{variable.symbol}</span>
                            <span className="var-name">{variable.name}</span>
                        </label>
                        <input
                            type="range"
                            min={variable.min}
                            max={variable.max}
                            step={variable.step}
                            value={getSliderValue(variable.key, variable.default)}
                            onChange={(e) => onSliderChange(variable.key, e.target.value)}
                        />
                        <span className="var-value">{getSliderValue(variable.key, variable.default).toFixed(variable.decimals || 2)}</span>
                    </div>
                ))}
            </div>

            {formula.insights && (
                <div className="formula-insights">
                    <h4>💡 Key Insights:</h4>
                    <ul>
                        {formula.insights.map((insight, idx) => (
                            <li key={idx}>{insight}</li>
                        ))}
                    </ul>
                </div>
            )}

            <style>{`
                .formula-playground {
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                .formula-display {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .formula-name {
                    font-weight: bold;
                    color: var(--accent-secondary);
                    margin-right: 10px;
                }
                .formula-parts {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 20px;
                    font-family: 'Times New Roman', serif;
                }
                .formula-part {
                    position: relative;
                    padding: 5px 8px;
                    border-radius: 4px;
                    cursor: help;
                    transition: all 0.2s;
                }
                .formula-part:hover, .formula-part.active {
                    background: rgba(0, 242, 255, 0.2);
                    color: var(--accent-primary);
                }
                .part-tooltip {
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--bg-panel);
                    border: 1px solid var(--accent-primary);
                    padding: 10px;
                    border-radius: 8px;
                    width: 180px;
                    font-size: 12px;
                    z-index: 10;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
                    font-family: system-ui;
                    font-style: normal;
                }
                .part-tooltip strong {
                    color: var(--accent-primary);
                    display: block;
                    margin-bottom: 5px;
                }
                .part-tooltip p {
                    margin: 0;
                    color: var(--text-secondary);
                    line-height: 1.4;
                }
                .formula-result {
                    color: var(--accent-primary);
                    font-weight: bold;
                    margin-left: 10px;
                    padding: 5px 12px;
                    background: rgba(0, 242, 255, 0.1);
                    border-radius: 6px;
                }
                .formula-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .control-row {
                    display: grid;
                    grid-template-columns: 140px 1fr 60px;
                    align-items: center;
                    gap: 12px;
                }
                .control-row label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    padding: 4px 8px;
                    border-radius: 4px;
                    transition: background 0.2s;
                }
                .control-row label.highlight {
                    background: rgba(0, 242, 255, 0.2);
                }
                .var-symbol {
                    font-family: 'Times New Roman', serif;
                    font-style: italic;
                    font-size: 16px;
                    color: var(--accent-primary);
                    min-width: 20px;
                }
                .var-name {
                    font-size: 12px;
                    color: var(--text-secondary);
                }
                .control-row input[type="range"] {
                    width: 100%;
                    accent-color: var(--accent-primary);
                }
                .var-value {
                    font-family: monospace;
                    font-size: 13px;
                    color: var(--accent-primary);
                    text-align: right;
                }
                .formula-insights {
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px solid var(--glass-border);
                }
                .formula-insights h4 {
                    margin: 0 0 10px 0;
                    font-size: 13px;
                    color: var(--accent-secondary);
                }
                .formula-insights ul {
                    margin: 0;
                    padding-left: 20px;
                    font-size: 12px;
                    color: var(--text-secondary);
                }
                .formula-insights li {
                    margin-bottom: 5px;
                    line-height: 1.4;
                }
            `}</style>
        </div>
    );
}
