import { useState, useContext } from 'react';
import { MATH_TOPICS } from '../engine/mathContent';
import { VisualizerRegistry } from './math/VisualizerRegistry';
import { PersonalizationContext } from '../contexts/PersonalizationContext';
import { getTopicPresentation } from '../engine/personalizationEngine';
import { getWikiUrl } from '../data/wikipediaLinks';
import { getNotebookLMLink } from '../data/notebookLMLinks';

export function MathModal({ topic, onClose, onComplete }) {
 const data = MATH_TOPICS[topic];
 const [activeFormula, setActiveFormula] = useState(null);
 const [sliderValues, setSliderValues] = useState({});
 const { profile } = useContext(PersonalizationContext);
 const completedTopics = profile?.completedTopics || [];
 const isCompleted = completedTopics.includes(topic);
 const wikiUrl = getWikiUrl(topic);
 const notebookUrl = getNotebookLMLink(topic);

 const handleGotIt = () => {
 if (onComplete) onComplete(topic);
 onClose();
 };

 if (!data) return null;

 // Get persona-based presentation config
 const presentation = profile
 ? getTopicPresentation(profile, topic)
 : { showMath: true, showVisual: true, complexity: 'standard', showInteractiveFormulas: true, highlightInsights: true };

 // Get the visualizer if one exists for this topic
 const Visualizer = data.visualizer ? VisualizerRegistry[data.visualizer] : null;

 const handleFormulaPartHover = (partKey) => {
 setActiveFormula(partKey);
 };

 const handleSliderChange = (key, value) => {
 setSliderValues(prev => ({ ...prev, [key]: parseFloat(value) }));
 };

 const handleKeyDown = (e) => {
 if (e.key === 'Escape') {
 onClose();
 }
 };

 // Get interactive formulas if available
 const interactiveFormulas = data.interactiveFormulas || [];

 return (
 <div 
 className="math-modal-overlay" 
 onClick={onClose}
 onKeyDown={handleKeyDown}
 role="dialog"
 aria-modal="true"
 aria-labelledby="math-modal-title"
 >
 <div className="math-modal-content" onClick={e => e.stopPropagation()}>
 <div className="math-header">
 <div className="math-header-title">
 <h2 id="math-modal-title">{data.title}</h2>
 {isCompleted && (
 <span className="completed-pill" aria-label="Completed">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
 Completed
 </span>
 )}
 </div>
 <button
 className="close-btn"
 onClick={onClose}
 aria-label="Close modal"
 >×</button>
 </div>

 {/* Persona complexity badge */}
 {profile && (
 <div className={`complexity-badge complexity-${presentation.complexity}`}>
 {presentation.complexity === 'simple' && ' Simplified View'}
 {presentation.complexity === 'standard' && ' Standard View'}
 {presentation.complexity === 'advanced' && ' Advanced View'}
 </div>
 )}

 <div className={`math-body ${!presentation.showMath ? 'visual-only' : ''}`} dangerouslySetInnerHTML={{ __html: data.content }} />

  {/* Custom Visualizer Section */}
  {Visualizer && (
  <div className="custom-visualizer">
  <Visualizer values={sliderValues} />
  </div>
  )}

  {/* Solved Section - What this concept addresses */}
  {data.solved && (
  <div className="lesson-section solved-section">
    <h4>✅ What This Solved</h4>
    <div dangerouslySetInnerHTML={{ __html: data.solved }} />
  </div>
  )}

  {/* Shortcomings Section */}
  {data.shortcomings && (
  <div className="lesson-section shortcomings-section">
    <h4>⚠️ Current Shortcomings</h4>
    <div dangerouslySetInnerHTML={{ __html: data.shortcomings }} />
  </div>
  )}

 {/* Interactive Formula Explorer — shown based on persona */}
 {presentation.showInteractiveFormulas && interactiveFormulas.length > 0 && (
 <div className="formula-explorer">
 <h3> Interactive Formula Explorer</h3>
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

 {/* Visual-only mode: show insights without formulas */}
 {!presentation.showInteractiveFormulas && interactiveFormulas.length > 0 && (
 <div className="visual-insights-panel">
 <h3> Key Takeaways</h3>
 <p className="insights-desc">Here are the most important things to understand:</p>
 {interactiveFormulas.map((formula, idx) => (
 <div key={idx} className="visual-insight-card">
 <h4>{formula.name}</h4>
 {formula.insights && (
 <ul>
 {formula.insights.map((insight, i) => (
 <li key={i}>{insight}</li>
 ))}
 </ul>
 )}
 </div>
 ))}
 <p className="formula-note">
 Want to explore the interactive math? Update your preference to <strong>Math</strong> or <strong>Hybrid</strong> in your profile.
 </p>
 </div>
 )}

 <div className="math-footer">
 {wikiUrl && (
 <a
 className="wiki-btn"
 href={wikiUrl}
 target="_blank"
 rel="noopener noreferrer"
 aria-label={`Learn more about ${data.title} on Wikipedia`}
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
 <polyline points="15 3 21 3 21 9"></polyline>
 <line x1="10" y1="14" x2="21" y2="3"></line>
 </svg>
 Wikipedia
 </a>
 )}
 {notebookUrl && (
 <a
 className="notebook-btn"
 href={notebookUrl}
 target="_blank"
 rel="noopener noreferrer"
 aria-label={`See summary of ${data.title} in NotebookLM`}
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
 <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
 </svg>
 Summary
 </a>
 )}
 <button
 className={`got-it-btn ${isCompleted ? 'is-completed' : ''}`}
 onClick={handleGotIt}
 aria-label={isCompleted ? 'Already completed — close' : 'Mark as completed'}
 >
 {isCompleted ? (
 <>
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
 Done
 </>
 ) : (
 <>Got it!</>
 )}
 </button>
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
 max-width: 95%;
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
 gap: 16px;
 margin-bottom: 20px;
 border-bottom: 1px solid var(--glass-border);
 padding-bottom: 12px;
 }
 .math-header-title {
 display: flex;
 align-items: center;
 gap: 12px;
 flex-wrap: wrap;
 }
 .math-header h2 {
 margin: 0;
 color: var(--accent-primary);
 font-family: var(--font-main);
 }
 .completed-pill {
 display: inline-flex;
 align-items: center;
 gap: 6px;
 padding: 4px 10px;
 border-radius: 999px;
 font-size: 12px;
 font-weight: 700;
 letter-spacing: 0.3px;
 background: rgba(0, 255, 157, 0.12);
 color: #00ff9d;
 border: 1px solid rgba(0, 255, 157, 0.35);
 }
 .close-btn {
 background: none;
 border: none;
 color: var(--text-secondary);
 font-size: 28px;
 cursor: pointer;
 line-height: 1;
 padding: 4px 8px;
 border-radius: 8px;
 transition: all 0.2s;
 }
 .close-btn:hover {
 background: rgba(255,255,255,0.06);
 color: var(--text-primary);
 }

 /* Complexity badge */
 .complexity-badge {
 display: inline-block;
 padding: 4px 12px;
 border-radius: 999px;
 font-size: 12px;
 font-weight: 600;
 margin-bottom: 16px;
 }
 .complexity-simple {
 background: rgba(255, 200, 50, 0.15);
 color: #ffc832;
 border: 1px solid rgba(255, 200, 50, 0.3);
 }
 .complexity-standard {
 background: rgba(0, 242, 255, 0.1);
 color: var(--accent-primary);
 border: 1px solid rgba(0, 242, 255, 0.2);
 }
 .complexity-advanced {
 background: rgba(112, 0, 255, 0.15);
 color: var(--accent-secondary);
 border: 1px solid rgba(112, 0, 255, 0.3);
 }

 .math-body {
 line-height: 1.6;
 font-size: 15px;
 }
 /* Visual-only mode: hide equation blocks */
 .math-body.visual-only .equation {
 display: none;
 }
 .math-body h4 {
 color: var(--accent-secondary);
 margin-top: 20px;
 margin-bottom: 10px;
 }
 .custom-visualizer {
 margin: 20px 0;
 padding: 15px;
 background: rgba(0, 0, 0, 0.3);
 border: 1px solid var(--glass-border);
 border-radius: 12px;
 }
 .math-viz-placeholder {
 text-align: center;
 color: var(--text-secondary);
 }
 .math-viz-placeholder h4 {
 color: var(--accent-primary);
 margin-top: 0;
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

 /* Visual-only insights panel */
 .visual-insights-panel {
 margin-top: 20px;
 padding: 20px;
 background: rgba(255, 200, 50, 0.05);
 border: 1px solid rgba(255, 200, 50, 0.2);
 border-radius: 12px;
 }
 .visual-insights-panel h3 {
 margin: 0 0 10px 0;
 color: #ffc832;
 font-size: 16px;
 }
 .insights-desc {
 font-size: 13px;
 color: var(--text-secondary);
 margin-bottom: 16px;
 }
 .visual-insight-card {
 background: rgba(0, 0, 0, 0.2);
 border-radius: 8px;
 padding: 12px 16px;
 margin-bottom: 12px;
 }
 .visual-insight-card h4 {
 margin: 0 0 8px 0;
 color: var(--accent-primary);
 font-size: 14px;
 }
 .visual-insight-card ul {
 margin: 0;
 padding-left: 18px;
 font-size: 13px;
 color: var(--text-secondary);
 }
 .visual-insight-card li {
 margin-bottom: 4px;
 line-height: 1.4;
 }
 .formula-note {
 margin-top: 16px;
 font-size: 12px;
 color: var(--text-secondary);
 font-style: italic;
 text-align: center;
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
  
  /* Solved & Shortcomings Sections */
  .lesson-section {
  margin-top: 20px;
  padding: 16px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.6;
  }
  .lesson-section h4 {
  margin: 0 0 12px 0;
  font-size: 15px;
  }
  .lesson-section ul {
  margin: 0;
  padding-left: 20px;
  }
  .lesson-section li {
  margin-bottom: 6px;
  color: var(--text-secondary);
  }
  .solved-section {
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.25);
  }
  .solved-section h4 {
  color: #34d399;
  }
  .solved-section li {
  color: #a7f3d0;
  }
  .shortcomings-section {
  background: rgba(251, 146, 60, 0.08);
  border: 1px solid rgba(251, 146, 60, 0.25);
  }
  .shortcomings-section h4 {
  color: #fb923c;
  }
  .shortcomings-section li {
  color: #fed7aa;
  }
  
  .math-footer {
 margin-top: 30px;
 display: flex;
 align-items: center;
 justify-content: space-between;
 gap: 12px;
 flex-wrap: wrap;
 padding-top: 20px;
 border-top: 1px solid var(--glass-border);
 }
 .wiki-btn, .notebook-btn {
 display: inline-flex;
 align-items: center;
 gap: 8px;
 padding: 10px 18px;
 border-radius: 10px;
 background: rgba(255, 255, 255, 0.04);
 border: 1px solid rgba(255, 255, 255, 0.12);
 color: var(--text-primary);
 font-size: 14px;
 font-weight: 500;
 text-decoration: none;
 transition: all 0.2s;
 }
 .wiki-btn:hover, .notebook-btn:hover {
 border-color: var(--accent-primary);
 color: var(--accent-primary);
 background: rgba(0, 242, 255, 0.06);
 transform: translateY(-1px);
 }
 .notebook-btn {
 border-color: rgba(112, 0, 255, 0.2);
 }
 .notebook-btn:hover {
 border-color: var(--accent-secondary);
 color: var(--accent-secondary);
 background: rgba(112, 0, 255, 0.06);
 }
 .got-it-btn {
 display: inline-flex;
 align-items: center;
 gap: 8px;
 background: linear-gradient(135deg, var(--accent-primary), #00c8d4);
 color: black;
 font-weight: 700;
 padding: 12px 26px;
 border: none;
 border-radius: 10px;
 cursor: pointer;
 font-size: 14px;
 font-family: inherit;
 box-shadow: 0 4px 18px rgba(0, 242, 255, 0.25);
 transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
 }
 .got-it-btn:hover {
 transform: translateY(-2px) scale(1.02);
 box-shadow: 0 8px 24px rgba(0, 242, 255, 0.38);
 }
 .got-it-btn.is-completed {
 background: linear-gradient(135deg, #00ff9d, #00b873);
 box-shadow: 0 4px 18px rgba(0, 255, 157, 0.3);
 color: #001a0f;
 }
 .got-it-btn.is-completed:hover {
 box-shadow: 0 8px 24px rgba(0, 255, 157, 0.45);
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
 } catch {
 return 'N/A';
 }
 };

 const result = calculateResult();
 
 const parts = formula.parts || formula.components || formula.points || [];
 const variables = formula.variables || [];

 return (
 <div className="formula-playground">
 <div className="formula-display">
 <span className="formula-name">{formula.name}:</span>
 <div className="formula-parts">
 {parts.map((part, idx) => (
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
 {variables.map((variable, idx) => (
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
 <h4> Key Insights:</h4>
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
