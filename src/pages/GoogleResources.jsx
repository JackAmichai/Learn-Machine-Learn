import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Footer } from '../components/Footer';

// ============ VISUALIZER COMPONENTS ============

// Timeline Visualizer - Shows ML evolution over time
function TimelineVisualizer() {
  const [year, setYear] = useState(1950);
  
  const events = [
    { year: 1957, label: "Perceptron", color: "#60a5fa", desc: "First artificial neuron" },
    { year: 1964, label: "SGD+Momentum", color: "#34d399", desc: "Optimized learning" },
    { year: 1974, label: "Backprop", color: "#fb923c", desc: "First proven in thesis" },
    { year: 1986, label: "BP Revived", color: "#a78bfa", desc: "Rumelhart et al." },
    { year: 1989, label: "LeNet", color: "#f472b6", desc: "CNN for digits" },
    { year: 1997, label: "LSTM", color: "#22d3ee", desc: "Long-term memory" },
    { year: 2012, label: "AlexNet", color: "#f87171", desc: "ImageNet breakthrough" },
    { year: 2014, label: "GANs", color: "#fbbf24", desc: "Generator vs Discriminator" },
    { year: 2015, label: "ResNet", color: "#4ade80", desc: "Skip connections" },
    { year: 2017, label: "Transformer", color: "#c084fc", desc: "Attention architecture" },
    { year: 2020, label: "GPT-3", color: "#38bdf8", desc: "175B emergent" },
    { year: 2022, label: "Stable Diffusion", color: "#fb7185", desc: "Open image generation" }
  ];

  const activeEvent = events.find(e => Math.abs(e.year - year) < 4) || events[0];

  return (
    <div className="timeline-viz">
      <div className="timeline-track">
        <div className="timeline-line" />
        {events.map((e, i) => (
          <div key={i} className="timeline-dot" style={{ left: `${(e.year - 1950) * 4.5}%`, background: year >= e.year ? e.color : '#333' }} />
        ))}
      </div>
      <input type="range" min="1950" max="2025" value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="timeline-slider" />
      <div className="timeline-current">
        <span className="year-display">{year}</span>
        {activeEvent && (
          <div className="event-display" style={{ borderColor: activeEvent.color }}>
            <span className="event-label">{activeEvent.label}</span>
            <span className="event-desc">{activeEvent.desc}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Neural Network Visualizer - Shows layers and forward pass
function NeuralVisualizer() {
  const [inputs, setInputs] = useState([1, 0]);
  const [weights, setWeights] = useState([0.8, -0.5]);
  const [bias, setBias] = useState(0.1);
  const [active, setActive] = useState('input');

  const hidden = inputs[0] * weights[0] + inputs[1] * weights[1] + bias;
  const output = hidden > 0 ? hidden : 0;

  return (
    <div className="nn-viz">
      <div className="nn-layers">
        <div className="nn-layer input-layer">
          <span className="layer-label">Input</span>
          {inputs.map((v, i) => (
            <div key={i} className={`neuron ${active === 'input' ? 'active' : ''}`} style={{ opacity: 0.3 + v * 0.7 }}>
              <span>x{i+1}</span>
              <input type="range" min="0" max="1" step="0.1" value={v} onChange={(e) => setInputs(inputs.map((x, j) => j === i ? parseFloat(e.target.value) : x))} />
            </div>
          ))}
        </div>
        <div className="nn-connections">
          {weights.map((w, i) => (
            <div key={i} className={`connection ${w > 0 ? 'positive' : 'negative'}`}>
              <span>{w.toFixed(1)}</span>
            </div>
          ))}
        </div>
        <div className="nn-layer hidden-layer">
          <span className="layer-label">Hidden</span>
          <div className={`neuron ${active === 'hidden' ? 'active' : ''}`} style={{ opacity: 0.3 + Math.abs(hidden) * 0.3 }}>
            <span>z={hidden.toFixed(2)}</span>
            <input type="range" min="-1" max="1" step="0.1" value={bias} onChange={(e) => setBias(parseFloat(e.target.value))} />
          </div>
        </div>
        <div className="nn-connections">
          <div className="connection">
            <span>1.0</span>
          </div>
        </div>
        <div className="nn-layer output-layer">
          <span className="layer-label">Output</span>
          <div className="neuron" style={{ opacity: 0.3 + output * 0.7 }}>
            <span>{output.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="nn-formula">
        <span>output = ReLU(w₁x₁ + w₂x₂ + b) = ReLU({inputs[0]}×{weights[0]} + {inputs[1]}×{weights[1]} + {bias}) = {output.toFixed(2)}</span>
      </div>
    </div>
  );
}

// Attention Visualizer - Shows self-attention mechanism
function AttentionVisualizer() {
  const [scores, setScores] = useState([3.0, 1.5, 0.8, 2.2]);
  const [selected, setSelected] = useState(0);

  const softmax = scores.map(s => Math.exp(s) / scores.reduce((a, b) => a + Math.exp(b), 0));
  const attention = softmax[selected];

  return (
    <div className="attention-viz">
      <div className="tokens">
        {['The', 'cat', 'sat', 'on'].map((token, i) => (
          <div key={i} className={`token ${selected === i ? 'selected' : ''}`} onClick={() => setSelected(i)}>
            <span className="token-text">{token}</span>
            <span className="token-score">{scores[i].toFixed(1)}</span>
          </div>
        ))}
      </div>
      
      <div className="attention-matrix">
        <span className="matrix-title">Attention Weights (softmax on scores)</span>
        <div className="weights-row">
          {softmax.map((w, i) => (
            <div key={i} className="weight-bar" style={{ height: `${w * 100}%`, background: `rgba(96, 165, 255, ${w})` }}>
              <span>{w.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="context-label">
          Context for "cat": {attention.toFixed(1)} comes from weighting all tokens by attention scores
        </div>
      </div>
    </div>
  );
}

// Transformer Visualizer - Shows encoder-decoder architecture
function TransformerVisualizer() {
  const [active, setActive] = useState('encoder');
  
  return (
    <div className="transformer-viz">
      <div className="transformer-blocks">
        <div className={`block encoder ${active === 'encoder' ? 'active' : ''}`} onClick={() => setActive('encoder')}>
          <span className="block-label">Encoder</span>
          <div className="block-stack">
            <div className="sub-block">Multi-Head Attention</div>
            <div className="sub-block">Add & Norm</div>
            <div className="sub-block">FFN</div>
            <div className="sub-block">Add & Norm</div>
          </div>
          <span className="block-desc">Processes input sequence</span>
        </div>
        
        <div className="block decoder" onClick={() => setActive('decoder')}>
          <span className="block-label">Decoder</span>
          <div className="block-stack">
            <div className="sub-block">Masked Self-Attention</div>
            <div className="sub-block">Add & Norm</div>
            <div className="sub-block">Cross Attention</div>
            <div className="sub-block">Add & Norm</div>
            <div className="sub-block">FFN</div>
            <div className="sub-block">Add & Norm</div>
          </div>
          <span className="block-desc">Generates output</span>
        </div>
      </div>
      <div className="transformer-flow">
        <span>← Input Embedding</span>
        <span>Output →</span>
      </div>
    </div>
  );
}

// Convolution Visualizer - Shows sliding filter
function ConvVisualizer() {
  const [kernel, setKernel] = useState([1, 0, -1]);
  const stride = 1;
  
  const input = [
    [1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 0, 1, 1, 1],
    [0, 0, 1, 1, 1]
  ];

  const convolve = (row, col) => {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        sum += input[row + i][col + j] * kernel[i * 3 + j];
      }
    }
    return sum;
  };

  return (
    <div className="conv-viz">
      <div className="conv-section">
        <span className="conv-label">Input 5×5</span>
        <div className="input-grid">
          {input.map((row, ri) => (
            <div key={ri} className="input-row">
              {row.map((v, ci) => (
                <div key={ci} className="input-cell" style={{ opacity: v > 0 ? 1 : 0.2 }}>{v}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="conv-kernel">
        <span className="conv-label">Filter 3×3 (Edge Detector)</span>
        <div className="kernel-grid">
          <div className="kernel-row">
            {kernel.slice(0, 3).map((v, i) => (
              <div key={i} className="kernel-cell" style={{ background: v > 0 ? '#60a5fa' : '#f87171' }}>{v}</div>
            ))}
          </div>
        </div>
        <input type="range" min="-1" max="1" step="1" value={kernel[0]} onChange={(e) => setKernel([parseInt(e.target.value), 0, -parseInt(e.target.value)])} />
        <span>Drag to change filter</span>
      </div>
      
      <div className="conv-section">
        <span className="conv-label">Output 3×3</span>
        <div className="input-grid">
          {[[0,1,2],[0,1,2]].map((_, ri) => (
            <div key={ri} className="input-row">
              {[[0,1,2],[0,1,2]].map((_, ci) => {
                const val = convolve(ri, ci);
                return (
                  <div key={ci} className="input-cell" style={{ 
                    opacity: Math.abs(val) > 0 ? 1 : 0.2,
                    background: val > 0 ? `rgba(96, 165, 250, ${Math.min(1, Math.abs(val)/2)})` : `rgba(248, 113, 113, ${Math.min(1, Math.abs(val)/2)})`
                  }}>{val}</div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// GAN Visualizer - Shows generator vs discriminator
function GANVisualizer() {
  const [genQuality, setGenQuality] = useState(0.3);
  const [discConf, setDiscConf] = useState(0.4);
  
  const genLoss = -Math.log(1 - discConf);
  const discLoss = -Math.log(1 - genQuality) - Math.log(discConf);

  return (
    <div className="gan-viz">
      <div className="gan-players">
        <div className="gan-player generator">
          <span className="player-label">Generator</span>
          <div className="player-output" style={{ opacity: 0.3 + genQuality * 0.7 }}>
            <div className="generated-image" />
          </div>
          <input type="range" min="0" max="1" step="0.1" value={genQuality} onChange={(e) => setGenQuality(parseFloat(e.target.value))} />
          <span className="loss">Loss: {genLoss.toFixed(2)}</span>
          <span className="loss-label">wants D(fake) → 1</span>
        </div>
        
        <div className="vs-badge">VS</div>
        
        <div className="gan-player discriminator">
          <span className="player-label">Discriminator</span>
          <div className="player-decision">
            <span className="decision-label">{discConf > 0.5 ? "REAL" : "FAKE"}</span>
            <div className="decision-bar">
              <div className="decision-fill" style={{ width: `${discConf * 100}%`, background: discConf > 0.5 ? '#34d399' : '#f87171' }} />
            </div>
          </div>
          <input type="range" min="0" max="1" step="0.1" value={discConf} onChange={(e) => setDiscConf(parseFloat(e.target.value))} />
          <span className="loss">Loss: {discLoss.toFixed(2)}</span>
          <span className="loss-label">wants D(real) → 1, D(fake) → 0</span>
        </div>
      </div>
      
      <div className="game-theory">
        <span>Zero-sum game: Generator improves → Discriminator must adapt</span>
      </div>
    </div>
  );
}

// Diffusion Visualizer - Shows forward/reverse process
function DiffusionVisualizer() {
  const [step, setStep] = useState(50);
  const maxSteps = 100;
  
  const noiseLevel = step / maxSteps;
  const clarity = 1 - noiseLevel;

  return (
    <div className="diffusion-viz">
      <div className="diffusion-process">
        <div className="diffusion-arrow">
          <span>Forward (Add Noise)</span>
          <div className="arrow-line" />
          <span>Reverse (Denoise)</span>
        </div>
        
        <div className="diffusion-steps">
          {[0, 25, 50, 75, 100].map((s, i) => (
            <div key={i} className={`step-preview ${step === s ? 'active' : ''}`} onClick={() => setStep(s)}>
              <div className="preview-image" style={{ filter: `blur(${s/20}px)`, opacity: 1 - s/150 }} />
              <span className="step-num">t={s}</span>
            </div>
          ))}
        </div>
        
        <input type="range" min="0" max="100" value={step} onChange={(e) => setStep(parseInt(e.target.value))} className="step-slider" />
        
        <div className="current-state">
          <div className="state-image" style={{ filter: `blur(${step/5}px)`, opacity: clarity }} />
          <div className="state-info">
            <span>Step: {step}/{maxSteps}</span>
            <span>Noise: {(noiseLevel * 100).toFixed(0)}%</span>
            <span>Clarity: {(clarity * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
      
      <div className="diffusion-explanation">
        <span>Forward: Gradually add noise until pure Gaussian</span>
        <span>Reverse: Neural network learns to denoise (generation!)</span>
      </div>
    </div>
  );
}

// RNN Visualizer - Shows sequence processing
function RNNVisualizer() {
  const [seq, setSeq] = useState([1, 0, 1, 0, 1]);
  const [current, setCurrent] = useState(0);
  
  return (
    <div className="rnn-viz">
      <div className="rnn-sequence">
        {seq.map((s, i) => (
          <div key={i} className={`seq-token ${current === i ? 'active' : ''}`} onClick={() => setCurrent(i)}>
            <span>{['I', 'love', 'ML', 'is', 'cool'][i]}</span>
            <span className="token-state">{s}</span>
          </div>
        ))}
      </div>
      
      <div className="rnn-unfold">
        {[0,1,2,3,4].map((t, i) => (
          <div key={i} className={`time-step ${current >= i ? 'processed' : ''}`}>
            <div className="step-input">
              <span>x{t}</span>
              <span>{seq[t]}</span>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-hidden">
              <span>h{t}</span>
              <span>={seq[t] * 0.8}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="rnn-problem">
        <span>Problem: Information at step 0 fades over 5 steps (vanishing gradient)</span>
        <span>Solution: LSTMs use gates to preserve long-term memory</span>
      </div>
    </div>
  );
}

// Gradient Visualizer - Shows backpropagation
function GradientVisualizer() {
  const [err, setErr] = useState(0.5);
  const [layers, setLayers] = useState([0.8, 0.6, 0.4, 0.2]);
  
  return (
    <div className="gradient-viz">
      <div className="forward-pass">
        <span>Forward: Input → Output (loss = {err})</span>
        <div className="forward-arrows">
          {layers.map((l, i) => (
            <div key={i} className="forward-layer">{l.toFixed(1)}</div>
          ))}
        </div>
      </div>
      
      <div className="backward-pass">
        <span>Backward: Gradient flows back (∂L/∂w)</span>
        <div className="backward-arrows">
          {[0,1,2,3].map((l, i) => (
            <div key={i} className="backward-layer" style={{ opacity: 0.3 + (3-i)/10 }}>
              <span>{(err * l * Math.pow(0.5, i)).toFixed(3)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="gradient-formula">
        <span>∂L/∂w = ∂L/∂y × dy/dw (chain rule!)</span>
      </div>
      
      <input type="range" min="0.1" max="1" step="0.1" value={err} onChange={(e) => setErr(parseFloat(e.target.value))} />
    </div>
  );
}

// ============ MAIN COMPONENT ============

export function GoogleResources() {
  const [activeLesson, setActiveLesson] = useState(0);

  const lessons = [
    { id: 'timeline', title: 'History Timeline', viz: <TimelineVisualizer /> },
    { id: 'neural', title: 'How Neural Networks Learn', viz: <NeuralVisualizer /> },
    { id: 'backprop', title: 'Backpropagation', viz: <GradientVisualizer /> },
    { id: 'rnn', title: 'Sequence Models', viz: <RNNVisualizer /> },
    { id: 'cnn', title: 'ConvNets', viz: <ConvVisualizer /> },
    { id: 'attention', title: 'Self-Attention', viz: <AttentionVisualizer /> },
    { id: 'transformer', title: 'Transformer Architecture', viz: <TransformerVisualizer /> },
    { id: 'gan', title: 'GANs', viz: <GANVisualizer /> },
    { id: 'diffusion', title: 'Diffusion Models', viz: <DiffusionVisualizer /> }
  ];

  const resources = {
    foundational: [
      { title: "ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course", type: "course" },
      { title: "CS229 Stanford", url: "https://cs229.stanford.edu/", type: "course" },
      { title: "3Blue1Brown", url: "https://youtube.com/playlist?list=PLZHQObOWTQDMs2vMmR2T__GonN5iXJzfe", type: "video" }
    ],
    papers: Array(15).fill(null).map((_, i) => ({
      title: `Paper ${i+1}`,
      year: 1950 + i * 5,
      author: "Author et al.",
      desc: "Paper description"
    }))
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <header className="main-header">
          <div>
            <h1>ML <span>RESOURCES</span></h1>
            <p>Interactive lessons with visualizers — see how each concept works</p>
          </div>
          <div className="header-actions">
            <Link to="/dashboard" className="btn-nav">Back to Dashboard</Link>
          </div>
        </header>

        <div className="lesson-tabs">
          {lessons.map((lesson, i) => (
            <button key={i} className={`lesson-tab ${activeLesson === i ? 'active' : ''}`} onClick={() => setActiveLesson(i)}>
              {lesson.title}
            </button>
          ))}
        </div>

        <div className="visualizer-panel">
          {lessons[activeLesson].viz}
        </div>

        <section className="resource-section">
          <h2>📚 Foundational Learning</h2>
          <div className="cards-row">
            {resources.foundational.map((res, i) => (
              <a key={i} href={res.url} target="_blank" className="resource-card">
                <span className={`tag ${res.type}`}>{res.type}</span>
                <h3>{res.title}</h3>
              </a>
            ))}
          </div>
        </section>

        <Footer />
      </main>

      <style>{`
        .app-container { display: flex; min-height: 100vh; background: radial-gradient(circle at top right, #1a1a2e, var(--bg-primary)); overflow-y: auto; }
        .main-content { flex: 1; padding: 40px; display: flex; flex-direction: column; gap: 30px; max-width: 1200px; margin: 0 auto; }
        .main-header { display: flex; justify-content: space-between; align-items: center; }
        h1 { font-size: 28px; margin: 0; }
        h1 span { color: var(--accent-primary); }
        .btn-nav { text-decoration: none; color: var(--text-secondary); padding: 8px 16px; border: 1px solid var(--glass-border); border-radius: 20px; font-size: 14px; }
        .btn-nav:hover { border-color: var(--accent-primary); }

        .lesson-tabs { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .lesson-tab { padding: 10px 16px; background: var(--bg-panel); border: 1px solid var(--glass-border); border-radius: 8px; color: var(--text-secondary); cursor: pointer; font-size: 13px; transition: all 0.2s; }
        .lesson-tab:hover { border-color: var(--accent-primary); }
        .lesson-tab.active { background: var(--accent-primary); color: #fff; border-color: var(--accent-primary); }

        .visualizer-panel { background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 16px; padding: 24px; }

        /* Timeline Visualizer */
        .timeline-viz { padding: 20px; }
        .timeline-track { position: relative; height: 4px; background: #333; border-radius: 2px; margin: 40px 0; }
        .timeline-line { position: absolute; height: 4px; background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary)); width: 100%; border-radius: 2px; }
        .timeline-dot { position: absolute; width: 12px; height: 12px; border-radius: 50%; top: -4px; transform: translateX(-50%); transition: all 0.3s; cursor: pointer; }
        .timeline-slider { width: 100%; margin: 20px 0; }
        .timeline-current { display: flex; align-items: center; gap: 20px; justify-content: center; }
        .year-display { font-size: 32px; font-weight: bold; color: var(--accent-primary); }
        .event-display { padding: 12px 20px; border-radius: 8px; border-left: 4px solid; background: var(--bg-panel); }
        .event-label { display: block; font-size: 18px; font-weight: bold; }
        .event-desc { font-size: 13px; color: var(--text-secondary); }

        /* Neural Network Visualizer */
        .nn-viz { padding: 20px; }
        .nn-layers { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .nn-layer { display: flex; flex-direction: column; gap: 8px; }
        .layer-label { font-size: 10px; color: var(--text-secondary); text-align: center; }
        .neuron { width: 40px; height: 40px; border-radius: 50%; background: var(--bg-panel); border: 2px solid var(--accent-primary); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 10px; cursor: pointer; }
        .neuron.active { box-shadow: 0 0 15px var(--accent-primary); }
        .nn-connections { display: flex; flex-direction: column; gap: 4px; }
        .connection { width: 30px; font-size: 10px; color: var(--text-secondary); }
        .connection.positive { color: #34d399; }
        .connection.negative { color: #f87171; }
        .nn-formula { text-align: center; margin-top: 16px; font-size: 12px; color: var(--text-secondary); }

        /* Attention Visualizer */
        .attention-viz { padding: 20px; }
        .tokens { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; }
        .token { padding: 8px 12px; background: var(--bg-panel); border: 1px solid var(--glass-border); border-radius: 6px; cursor: pointer; text-align: center; }
        .token.selected { border-color: var(--accent-primary); background: rgba(96,165,250,0.2); }
        .token-text { display: block; font-size: 14px; }
        .token-score { display: block; font-size: 10px; color: var(--text-secondary); }
        .attention-matrix { text-align: center; }
        .matrix-title { font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; display: block; }
        .weights-row { display: flex; gap: 4px; justify-content: center; height: 60px; align-items: flex-end; }
        .weight-bar { width: 30px; border-radius: 4px 4px 0 0; display: flex; align-items: flex-end; justify-content: center; font-size: 10px; color: #fff; }
        .context-label { margin-top: 16px; font-size: 12px; color: var(--text-secondary); }

        /* Transformer Visualizer */
        .transformer-viz { padding: 20px; }
        .transformer-blocks { display: flex; gap: 20px; justify-content: center; }
        .block { padding: 16px; background: var(--bg-panel); border: 1px solid var(--glass-border); border-radius: 8px; cursor: pointer; }
        .block.active { border-color: var(--accent-primary); }
        .block-label { display: block; font-size: 12px; font-weight: bold; margin-bottom: 8px; }
        .block-stack { display: flex; gap: 4px; flex-direction: column; }
        .sub-block { padding: 4px 12px; background: rgba(96,165,250,0.2); border-radius: 4px; font-size: 10px; }
        .block-desc { display: block; font-size: 10px; color: var(--text-secondary); margin-top: 8px; }
        .transformer-flow { display: flex; justify-content: space-between; font-size: 10px; color: var(--text-secondary); margin-top: 12px; }

        /* Conv Visualizer */
        .conv-viz { display: flex; gap: 20px; justify-content: center; padding: 20px; }
        .conv-section { text-align: center; }
        .conv-label { display: block; font-size: 11px; color: var(--text-secondary); margin-bottom: 8px; }
        .input-grid, .kernel-grid { display: flex; flex-direction: column; gap: 2px; }
        .input-row { display: flex; gap: 2px; }
        .input-cell { width: 16px; height: 16px; background: var(--accent-primary); border-radius: 2px; }
        .kernel-cell { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 10px; border-radius: 4px; }
        .conv-kernel { text-align: center; }
        .conv-kernel input { width: 100px; margin: 8px 0; }

        /* GAN Visualizer */
        .gan-viz { padding: 20px; }
        .gan-players { display: flex; gap: 20px; justify-content: center; align-items: center; }
        .gan-player { width: 140px; text-align: center; }
        .player-label { display: block; font-size: 12px; font-weight: bold; margin-bottom: 8px; }
        .player-output { width: 80px; height: 80px; margin: 0 auto 8px; background: var(--bg-panel); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .generated-image { width: 40px; height: 40px; background: var(--accent-primary); border-radius: 50%; }
        .player-decision { margin-bottom: 8px; }
        .decision-label { display: block; font-size: 14px; font-weight: bold; }
        .decision-bar { width: 80px; height: 8px; background: #333; border-radius: 4px; margin: 4px auto; }
        .decision-fill { height: 100%; border-radius: 4px; }
        .gan-player input { width: 100%; margin: 8px 0; }
        .loss { display: block; font-size: 11px; }
        .loss-label { display: block; font-size: 9px; color: var(--text-secondary); }
        .vs-badge { font-size: 20px; font-weight: bold; color: var(--accent-primary); }
        .game-theory { text-align: center; margin-top: 16px; font-size: 11px; color: var(--text-secondary); }

        /* Diffusion Visualizer */
        .diffusion-viz { padding: 20px; }
        .diffusion-process { text-align: center; }
        .diffusion-arrow { font-size: 11px; color: var(--text-secondary); margin-bottom: 16px; }
        .arrow-line { height: 2px; background: linear-gradient(90deg, #333, var(--accent-primary), #333); margin: 8px 0; }
        .diffusion-steps { display: flex; gap: 8px; justify-content: center; margin-bottom: 16px; }
        .step-preview { width: 50px; cursor: pointer; }
        .step-preview.active .preview-image { border-color: var(--accent-primary); }
        .preview-image { width: 40px; height: 40px; margin: 0 auto 4px; background: var(--accent-primary); border-radius: 4px; border: 2px solid transparent; }
        .step-num { font-size: 9px; color: var(--text-secondary); }
        .step-slider { width: 200px; margin: 16px auto; display: block; }
        .current-state { display: flex; gap: 16px; justify-content: center; align-items: center; }
        .state-image { width: 60px; height: 60px; background: var(--accent-primary); border-radius: 8px; }
        .state-info { font-size: 11px; }
        .state-info span { display: block; }
        .diffusion-explanation { margin-top: 16px; font-size: 10px; color: var(--text-secondary); }
        .diffusion-explanation span { display: block; }

        /* RNN Visualizer */
        .rnn-viz { padding: 20px; }
        .rnn-sequence { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; }
        .seq-token { padding: 8px; background: var(--bg-panel); border: 1px solid var(--glass-border); border-radius: 4px; cursor: pointer; text-align: center; }
        .seq-token.active { border-color: var(--accent-primary); background: rgba(96,165,250,0.2); }
        .seq-token span { display: block; font-size: 12px; }
        .token-state { font-size: 10px; color: var(--text-secondary); }
        .rnn-unfold { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
        .time-step { display: flex; gap: 4px; align-items: center; font-size: 10px; }
        .time-step.processed .step-input, .time-step.processed .step-hidden { opacity: 1; }
        .step-input, .step-hidden { opacity: 0.3; }
        .rnn-problem { text-align: center; font-size: 11px; color: var(--text-secondary); }
        .rnn-problem span { display: block; }

        /* Gradient Visualizer */
        .gradient-viz { padding: 20px; }
        .forward-pass, .backward-pass { text-align: center; margin-bottom: 20px; }
        .forward-pass span, .backward-pass span { display: block; font-size: 11px; color: var(--text-secondary); margin-bottom: 8px; }
        .forward-arrows, .backward-arrows { display: flex; gap: 8px; justify-content: center; }
        .forward-layer, .backward-layer { width: 40px; height: 40px; background: var(--bg-panel); border: 1px solid var(--glass-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; }
        .gradient-formula { text-align: center; font-size: 12px; color: var(--accent-secondary); }
        .gradient-viz input { width: 200px; display: block; margin: 16px auto; }

        .cards-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
        .resource-card { background: var(--bg-panel); border: 1px solid var(--glass-border); border-radius: 8px; padding: 16px; text-decoration: none; color: inherit; }
        .resource-card h3 { font-size: 14px; margin: 8px 0 0 0; }
        .tag { font-size: 10px; padding: 2px 6px; background: #2563eb20; color: #60a5fa; border-radius: 4px; }
      `}</style>
    </div>
  );
}