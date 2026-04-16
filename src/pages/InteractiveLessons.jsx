import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Footer } from '../components/Footer';

// ============ ALL 15 VISUALIZERS ============

// 1. History Timeline - complete ML history
function TimelineVisualizer() {
  const [year, setYear] = useState(1950);
  const events = [
    {year:1957,label:"Perceptron",color:"#60a5fa"},
    {year:1964,label:"SGD",color:"#34d399"},
    {year:1974,label:"Backprop",color:"#fb923c"},
    {year:1986,label:"BP Revival",color:"#a78bfa"},
    {year:1989,label:"LeNet",color:"#f472b6"},
    {year:1997,label:"LSTM",color:"#22d3ee"},
    {year:2012,label:"AlexNet",color:"#f87171"},
    {year:2014,label:"GANs",color:"#fbbf24"},
    {year:2015,label:"ResNet",color:"#4ade80"},
    {year:2017,label:"Transformer",color:"#c084fc"},
    {year:2020,label:"GPT-3",color:"#38bdf8"},
    {year:2022,label:"StableDiff",color:"#fb7185"},
    {year:2024,label:"LLM + RLHF",color:"#818cf8"}
  ];
  const active = events.find(e => year >= e.year) || events[0];
  return (
    <div className="viz-container">
      <div className="timeline-track">
        <div className="timeline-line"/>
        {events.map((e,i) => <div key={i} className="timeline-dot" style={{left:`${(e.year-1950)*3}%`,background:year>=e.year?e.color:'#333'}}/>)}
      </div>
      <input type="range" min="1950" max="2025" value={year} onChange={e=>setYear(+e.target.value)} className="viz-slider"/>
      <div className="timeline-result">
        <span className="year-badge">{year}</span>
        <div className="event-card" style={{borderColor:active.color}}>
          <h4>{active.label}</h4>
        </div>
      </div>
    </div>
  );
}

// 2. Neural Network - 3 layer forward pass
function NeuralVisualizer() {
  const [in1, setIn1] = useState(1);
  const [in2, setIn2] = useState(0);
  const [w1] = useState(0.8);
  const [w2] = useState(-0.5);
  const [bias, setBias] = useState(0.1);
  
  const hidden = in1*w1 + in2*w2 + bias;
  const output = Math.max(0, hidden); // ReLU
  
  return (
    <div className="viz-container">
      <div className="nn-flow">
        <div className="nn-col">
          <span className="col-label">Input</span>
          <div className="neuron-stack">
            <div className="neuron"><input type="range" min="0" max="1" value={in1} onChange={e=>setIn1(+e.target.value)}/><span>x₁={in1}</span></div>
            <div className="neuron"><input type="range" min="0" max="1" value={in2} onChange={e=>setIn2(+e.target.value)}/><span>x₂={in2}</span></div>
          </div>
        </div>
        <div className="nn-connect">w₁={w1}<br/>w₂={w2}</div>
        <div className="nn-col">
          <span className="col-label">Hidden</span>
          <div className="neuron"><input type="range" min="-1" max="1" step="0.1" value={bias} onChange={e=>setBias(+e.target.value)}/><span>z={hidden.toFixed(2)}</span></div>
        </div>
        <div className="nn-connect">1.0</div>
        <div className="nn-col">
          <span className="col-label">Output</span>
          <div className="neuron"><span>ReLU(z)={output.toFixed(2)}</span></div>
        </div>
      </div>
      <div className="formula-box">output = max(0, {in1}×{w1} + {in2}×{w2} + {bias}) = {output.toFixed(2)}</div>
    </div>
  );
}

// 3. CNN - Convolution with edge detector
function ConvVisualizer() {
  const [kernel, setKernel] = useState([1,0,-1]);
  const input = [[1,1,1,0,0],[1,1,1,0,0],[1,1,1,0,0],[1,0,1,1,1],[0,0,1,1,1]];
  
  const conv = (r,c) => {
    let sum = 0;
    for(let i=0;i<3;i++) for(let j=0;j<3;j++) sum += input[r+i][c+j]*kernel[i*3+j];
    return sum;
  };
  
  return (
    <div className="viz-container">
      <div className="conv-grid-container">
        <div className="conv-box">
          <span>Input 5×5</span>
          <div className="pixel-grid">{input.map((r,ri)=><div key={ri} className="pixel-row">{r.map((v,ci)=><div key={ci} className="pixel" style={{opacity:v}}/>)}</div>)}</div>
        </div>
        <div className="conv-box">
          <span>Filter 3×3</span>
          <div className="filter-grid">{kernel.map((v,i)=><div key={i} className="filter-cell" style={{background:v>0?'#60a5ba':'#f87171'}}>{v}</div>)}</div>
          <input type="range" min="-1" max="1" step="1" value={kernel[0]} onChange={e=>setKernel([+e.target.value,0,-e.target.value])}/>
        </div>
        <div className="conv-box">
          <span>Output 3×3</span>
          <div className="pixel-grid">
            {[[0,1,2],[0,1,2]].map((_,ri)=><div key={ri} className="pixel-row">{[[0,1,2],[0,1,2]].map((_,ci)=>{
              const v = conv(ri,ci);
              return <div key={ci} className="pixel" style={{opacity:Math.abs(v)>0?1:0.2,background:Math.abs(v)>0?'var(--accent-primary)':'#333'}}/>;
            })}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. RNN - Sequence processing
function RNNVisualizer() {
  const [seq] = useState([1,0,1,0]);
  const [step, setStep] = useState(0);
  const tokens = ['The','cat','sat','on'];
  
  /* hidden unused */
  
  return (
    <div className="viz-container">
      <div className="rnn-tokens">{tokens.map((t,i)=><div key={i} className={`token ${step===i?'active':''}`} onClick={()=>setStep(i)}>{t}</div>)}</div>
      <div className="rnn-unroll">
        {tokens.map((t,i) => (
          <div key={i} className={`time-step ${step>=i?'active':''}`}>
            <span>x={seq[i]}</span>
            <span>→h={i===0?seq[i]*0.8:(seq[i]*0.8+0.5).toFixed(1)}</span>
          </div>
        ))}
      </div>
      <div className="rnn-info">Hidden state accumulates: h₀→h₁→h₂→h₃</div>
    </div>
  );
}

// 5. LSTM - Long short-term memory
function LSTMVisualizer() {
  const [input] = useState(1);
  const [prevState, setPrevState] = useState(0.8);
  const [forgetGate, setForgetGate] = useState(0.9);
  const [inputGate, setInputGate] = useState(0.3);
  
  const newState = prevState * forgetGate + input * inputGate;
  
  return (
    <div className="viz-container">
      <div className="lstm-cell">
        <div className="gate">
          <span>Forget Gate</span>
          <input type="range" min="0" max="1" step="0.1" value={forgetGate} onChange={e=>setForgetGate(+e.target.value)}/>
          <span>σ={forgetGate.toFixed(1)}</span>
        </div>
        <div className="gate">
          <span>Input Gate</span>
          <input type="range" min="0" max="1" step="0.1" value={inputGate} onChange={e=>setInputGate(+e.target.value)}/>
          <span>σ={inputGate.toFixed(1)}</span>
        </div>
        <div className="gate">
          <span>Previous State</span>
          <input type="range" min="0" max="1" step="0.1" value={prevState} onChange={e=>setPrevState(+e.target.value)}/>
          <span>Cₜ₋₁={prevState.toFixed(1)}</span>
        </div>
      </div>
      <div className="lstm-formula">
        Cₜ = {forgetGate.toFixed(1)} × {prevState.toFixed(1)} + {inputGate.toFixed(1)} × {input} = {newState.toFixed(2)}
      </div>
    </div>
  );
}

// 6. Attention - Query-Key-Value
function AttentionVisualizer() {
  const [query, setQuery] = useState(3.0);
  const [keys, setKeys] = useState([3.0, 1.5, 0.8]);
  const words = ['The','cat','sat'];
  
  const scores = keys.map(k => Math.exp(query - k));
  const sum = scores.reduce((a,b)=>a+b,0);
  const attn = scores.map(s => s/sum);
  
  return (
    <div className="viz-container">
      <div className="qk-row">
        <div className="qk-box">
          <span>Query</span>
          <input type="range" min="0" max="5" value={query} onChange={e=>setQuery(+e.target.value)}/>
          <span>score: {query}</span>
        </div>
      </div>
      <div className="qk-row">
        <div className="qk-box">
          <span>Keys</span>
          {keys.map((k,i)=><input key={i} type="range" min="0" max="5" value={keys[i]} onChange={e=>{const n=[...keys];n[i]=+e.target.value;setKeys(n);}}/>)}
          {words.map((w,i)=><span key={i}>{w}:{keys[i]}</span>)}
        </div>
      </div>
      <div className="attention-weights">
        {attn.map((a,i)=><div key={i} className="weight-bar" style={{height:`${a*100}%`}}>{a.toFixed(2)}</div>)}
      </div>
    </div>
  );
}

// 7. Transformer - Multi-head attention
function TransformerVisualizer() {
  const [view, setView] = useState('encoder');
  
  return (
    <div className="viz-container">
      <div className="transformer-diagram">
        <div className={`tf-block ${view==='encoder'?'active':''}`} onClick={()=>setView('encoder')}>
          <h4>Encoder</h4>
          <div className="tf-layer">Multi-Head Attention</div>
          <div className="tf-layer">Add & Norm</div>
          <div className="tf-layer">FFN</div>
          <div className="tf-layer">Add & Norm</div>
        </div>
        <div className={`tf-block ${view==='decoder'?'active':''}`} onClick={()=>setView('decoder')}>
          <h4>Decoder</h4>
          <div className="tf-layer">Masked Self-Attention</div>
          <div className="tf-layer">Add & Norm</div>
          <div className="tf-layer">Cross Attention</div>
          <div className="tf-layer">Add & Norm</div>
          <div className="tf-layer">FFN</div>
          <div className="tf-layer">Add & Norm</div>
        </div>
      </div>
      <div className="tf-explain">{view==='encoder'?'Processes input sequence (bidirectional)':'Generates output (autoregressive)'}</div>
    </div>
  );
}

// 8. GAN - Generator vs Discriminator
function GANVisualizer() {
  const [genQual, setGenQual] = useState(0.4);
  const [discDec, setDiscDec] = useState(0.3);
  
  return (
    <div className="viz-container">
      <div className="gan-battle">
        <div className="gan-player">
          <h4>Generator</h4>
          <div className="gen-image" style={{opacity:0.3+genQual*0.7}}/>
          <input type="range" min="0" max="1" value={genQual} onChange={e=>setGenQual(+e.target.value)}/>
          <span>Quality: {genQual.toFixed(1)}</span>
        </div>
        <div className="vs">VS</div>
        <div className="gan-player">
          <h4>Discriminator</h4>
          <div className="disc-meter"><div className="disc-fill" style={{width:`${discDec*100}%`}}/></div>
          <input type="range" min="0" max="1" value={discDec} onChange={e=>setDiscDec(+e.target.value)}/>
          <span>Real: {discDec>0.5?'✅':'❌'}</span>
        </div>
      </div>
      <div className="gan-loss">
        Game: Generator↔Discriminator compete until generator fools discriminator
      </div>
    </div>
  );
}

// 9. VAE - Variational Autoencoder
function VAEVisualizer() {
  const [zMean, setZMean] = useState(0);
  const [zStd, setZStd] = useState(1);
  
  /* sample unused */
  
  return (
    <div className="viz-container">
      <div className="vae-flow">
        <div className="vae-col">Encoder<p>x → μ,σ</p></div>
        <div className="vae-arrow">↓</div>
        <div className="vae-latent">
          <span>Latent Space</span>
          <input type="range" min="-2" max="2" value={zMean} onChange={e=>setZMean(+e.target.value)}/>
          <span>μ={zMean}</span>
          <input type="range" min="0.1" max="2" value={zStd} onChange={e=>setZStd(+e.target.value)}/>
          <span>σ={zStd}</span>
        </div>
        <div className="vae-arrow">↓</div>
        <div className="vae-col">Decoder<p>ẋ reconstruction</p></div>
      </div>
      <div className="vae-loss">
        ELBO = Reconstruction + KL(q(z|x) || N(0,1))
      </div>
    </div>
  );
}

// 10. Diffusion - Forward/reverse process
function DiffusionVisualizer() {
  const [step, setStep] = useState(50);
  const max = 100;
  
  return (
    <div className="viz-container">
      <div className="diffusion-pipeline">
        <div className="diff-arrow">Clean ⇄ Noise</div>
        <div className="diff-timeline">
          {[0,25,50,75,100].map(s => (
            <div key={s} className={`diff-step ${step===s?'active':''}`} onClick={()=>setStep(s)}>
              <div className="diff-dot" style={{opacity:1-s/110,filter:`blur(${s/15}px)`}}/>
              <span>t={s}</span>
            </div>
          ))}
        </div>
        <input type="range" min="0" max="100" value={step} onChange={e=>setStep(+e.target.value)} className="viz-slider"/>
        <div className="diff-stats">
          <span>Step: {step}</span>
          <span>Noise: {(step/max).toFixed(1)}</span>
          <span>Info: {((1-step/max)*100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

// 11. Gradient Descent - Optimization
function GradientVisualizer() {
  const [lr, setLr] = useState(0.1);
  const [grad, setGrad] = useState(-2);
  const [w] = useState(2);
  
  const newW = w - lr * grad;
  
  return (
    <div className="viz-container">
      <div className="gd-landscape">
        <div className="gd-curve"><span>Loss</span><div className="curve-visual"/></div>
        <div className="gd-ball" style={{left:`${(w+3)/6*100}%`}}><span>w={w.toFixed(1)}</span></div>
        <div className="gd-arrow" style={{left:`${(w+3)/6*100}%`,bottom:`${Math.min(Math.abs(grad)*20,50)}px`}}>↓</div>
      </div>
      <div className="gd-controls">
        <div className="gd-param"><span>Learning Rate</span><input type="range" min="0.01" max="0.5" step="0.01" value={lr} onChange={e=>setLr(+e.target.value)}/></div>
        <div className="gd-param"><span>Gradient</span><input type="range" min="-5" max="5" value={grad} onChange={e=>setGrad(+e.target.value)}/></div>
      </div>
      <div className="gd-result">
        w_new = {w} - {lr} × ({grad}) = {newW.toFixed(2)}
      </div>
    </div>
  );
}

// 12. Q-Learning - RL
function QLearningVisualizer() {
  const [state, setState] = useState(1);
  const [action] = useState(0);
  const [reward] = useState(1);
  const [nextQ] = useState(0.8);
  
  const gamma = 0.9;
  const td = reward + gamma * nextQ - 0.5;
  
  return (
    <div className="viz-container">
      <div className="rl-grid">
        <div className={`rl-cell ${state===0?'current':''}`} onClick={()=>setState(0)}>A</div>
        <div className={`rl-cell ${state===1?'current':''}`} onClick={()=>setState(1)}>B</div>
        <div className={`rl-cell ${state===2?'goal':''}`}>Goal</div>
      </div>
      <div className="rl-update">
        <span>Action: [{action}]</span>
        <span>R={reward}</span>
        <span>max Q'={nextQ}</span>
        <span>TD: {td.toFixed(2)}</span>
      </div>
      <div className="rl-formula">Q(s,a) += α[R + γmaxQ(s',a') - Q(s,a)]</div>
    </div>
  );
}

// 13. SVM - Support Vector Machine
function SVMVisualizer() {
  const [c, setC] = useState(0);
  
  return (
    <div className="viz-container">
      <div className="svm-plot">
        <div className="svm-point class1" style={{left:'20%',top:'30%'}}/>
        <div className="svm-point class1" style={{left:'25%',top:'40%'}}/>
        <div className="svm-point class1" style={{left:'30%',top:'35%'}}/>
        <div className="svm-point class2" style={{left:'70%',top:'60%'}}/>
        <div className="svm-point class2" style={{left:'75%',top:'70%'}}/>
        <div className="svm-point class2" style={{left:'80%',top:'65%'}}/>
        <div className="svm-margin" style={{left:`${45+c}%`,transform:'rotate(-30deg)'}}>
          <span>margin</span>
        </div>
      </div>
      <div className="svm-expl">
        <input type="range" min="-10" max="10" value={c} onChange={e=>setC(+e.target.value)}/>
        <span>Adjust decision boundary by changing C (regularization)</span>
      </div>
    </div>
  );
}

// 14. Decision Tree
function DecisionTreeVisualizer() {
  const [split, setSplit] = useState(0.5);
  const p1 = split;
  const p2 = 1-split;
  const gini = 1 - (p1*p1 + p2*p2);
  
  return (
    <div className="viz-container">
      <div className="tree-viz">
        <div className="tree-node root">
          <span>root: x &lt; {split.toFixed(1)}</span>
          <span>Gini={gini.toFixed(2)}</span>
        </div>
        <div className="tree-branch">
          <div className="tree-node left"><span>Class A</span><span>p={p1.toFixed(1)}</span></div>
          <div className="tree-node right"><span>Class B</span><span>p={p2.toFixed(1)}</span></div>
        </div>
      </div>
      <div className="tree-slider">
        <input type="range" min="0.1" max="0.9" step="0.1" value={split} onChange={e=>setSplit(+e.target.value)}/>
        <span>Adjust split point to minimize Gini impurity</span>
      </div>
    </div>
  );
}

// 15. Transfer Learning
function TransferVisualizer() {
  const [phase, setPhase] = useState(0);
  const phases = ['Pre-train', 'Fine-tune', 'Deploy'];
  
  return (
    <div className="viz-container">
      <div className="transfer-flow">
        {phases.map((p,i) => (
          <div key={i} className={`transfer-phase ${phase>=i?'active':''}`} onClick={()=>setPhase(i)}>
            <span>{p}</span>
            {i===0 && <span>Big model<br/>Massive data</span>}
            {i===1 && <span>Adapt to<br/>your task</span>}
            {i===2 && <span>Deploy<br/>fast</span>}
          </div>
        ))}
      </div>
      <div className="transfer-desc">
        {phase===0 && "Pre-train on massive unlabeled data (e.g., 1T tokens)"}
        {phase===1 && "Fine-tune on your small labeled dataset"}
        {phase===2 && "Use adapted model for inference"}
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============

export function InteractiveLessons() {
  const [selected, setSelected] = useState(0);

  const lessonList = [
    {name:'1. History', viz:<TimelineVisualizer/>},
    {name:'2. Neural Networks', viz:<NeuralVisualizer/>},
    {name:'3. CNN/Convolution', viz:<ConvVisualizer/>},
    {name:'4. RNN/Sequences', viz:<RNNVisualizer/>},
    {name:'5. LSTM', viz:<LSTMVisualizer/>},
    {name:'6. Attention', viz:<AttentionVisualizer/>},
    {name:'7. Transformer', viz:<TransformerVisualizer/>},
    {name:'8. GANs', viz:<GANVisualizer/>},
    {name:'9. VAE', viz:<VAEVisualizer/>},
    {name:'10. Diffusion', viz:<DiffusionVisualizer/>},
    {name:'11. Gradient Descent', viz:<GradientVisualizer/>},
    {name:'12. Q-Learning', viz:<QLearningVisualizer/>},
    {name:'13. SVM', viz:<SVMVisualizer/>},
    {name:'14. Decision Tree', viz:<DecisionTreeVisualizer/>},
    {name:'15. Transfer Learning', viz:<TransferVisualizer/>}
  ];

  return (
    <div className="app-container">
      <main className="main-content">
        <header className="main-header">
          <div><h1>ML <span>Interactive Lessons</span></h1><p>15 visualizers — one for each major concept</p></div>
          <div className="header-actions">
            <Link to="/dashboard" className="btn-nav">Dashboard</Link>
            <Link to="/resources" className="btn-nav">Library</Link>
            <Link to="/looking-forward" className="btn-nav">Future</Link>
          </div>
        </header>

        <div className="lesson-tabs">
          {lessonList.map((l,i) => <button key={i} className={`lesson-tab ${selected===i?'active':''}`} onClick={()=>setSelected(i)}>{l.name}</button>)}
        </div>

        <div className="visualizer-panel">
          {lessonList[selected].viz}
        </div>

        <Footer/>
      </main>

      <style>{`
        .app-container {min-height:100vh;background:radial-gradient(circle at top right,#1a1a2e,#0c0c14);padding:20px}
        .main-content {max-width:1000px;margin:0 auto}
        .main-header {display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px}
        .header-actions {display:flex;gap:8px;flex-wrap:wrap}
        h1 {font-size:24px;margin:0}
        h1 span {color:#60a5fa}
        .btn-nav {color:#888;text-decoration:none;padding:8px 16px;border:1px solid #333;border-radius:20px}
        .lesson-tabs {display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;justify-content:center}
        .lesson-tab {padding:8px 12px;background:#1a1a2e;border:1px solid #333;border-radius:8px;color:#888;cursor:pointer;font-size:12px}
        .lesson-tab.active {background:#60a5fa;color:#fff;border-color:#60a5fa}
        .visualizer-panel {background:#0f0f1a;border:1px solid #333;border-radius:12px;padding:20px;min-height:250px}
        
        .viz-container {padding:10px}
        .viz-slider {width:100%;margin:15px 0}
        
        /* Timeline */
        .timeline-track {position:relative;height:4px;background:#222;border-radius:2px;margin:30px 0}
        .timeline-line {height:100%;background:linear-gradient(90deg,#60a5fa,#a78bfa);border-radius:2px}
        .timeline-dot {position:absolute;width:10px;height:10px;border-radius:50%;top:-3px;transform:translateX(-50%)}
        .timeline-result {display:flex;align-items:center;gap:15px;justify-content:center}
        .year-badge {font-size:28px;font-weight:bold;color:#60a5fa}
        .event-card {padding:10px 20px;border-left:3px solid #60a5fa;background:#1a1a2e}
        
        /* Neural */
        .nn-flow {display:flex;align-items:center;justify-content:center;gap:15px}
        .nn-col {text-align:center}
        .col-label {font-size:10px;color:#666;display:block;margin-bottom:5px}
        .neuron-stack {display:flex;flex-direction:column;gap:5px}
        .neuron {width:50px;height:50px;border-radius:50%;border:2px solid #60a5fa;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:9px}
        .neuron input {width:40px}
        .nn-connect {font-size:10px;color:#666;width:40px}
        
        /* Conv */
        .conv-grid-container {display:flex;gap:20px;justify-content:center;align-items:center}
        .conv-box {text-align:center}
        .conv-box span {display:block;font-size:10px;color:#666;margin-bottom:5px}
        .pixel-grid {display:flex;flex-direction:column;gap:2px}
        .pixel-row {display:flex;gap:2px}
        .pixel {width:12px;height:12px;background:#60a5fa;border-radius:2px}
        .filter-grid {display:flex;gap:2px}
        .filter-cell {width:30px;height:30px;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px}
        
        /* RNN */
        .rnn-tokens {display:flex;gap:8px;justify-content:center}
        .token {padding:8px 12px;background:#1a1a2e;border:1px solid #333;border-radius:6px;cursor:pointer}
        .token.active {border-color:#60a5fa;background:#60a5fa30}
        .rnn-unroll {display:flex;gap:10px;justify-content:center;margin-top:15px}
        .time-step {display:flex;flex-direction:column;align-items:center;font-size:11px}
        .time-step span {color:#666}
        .rnn-info {text-align:center;font-size:11px;color:#666;margin-top:15px}
        
        /* LSTM */
        .lstm-cell {display:flex;gap:15px;justify-content:center}
        .gate {text-align:center}
        .gate span {display:block;font-size:10px;margin-bottom:5px}
        .gate input {width:80px}
        .lstm-formula {text-align:center;font-size:12px;color:#60a5fa;margin-top:15px}
        
        /* Attention */
        .qk-row {display:flex;justify-content:center;gap:20px;margin-bottom:10px}
        .qk-box {text-align:center}
        .qk-box span {display:block;font-size:10px;margin:2px}
        .qk-box input {width:60px}
        .attention-weights {display:flex;gap:4px;justify-content:center;height:50px;align-items:flex-end}
        .weight-bar {width:30px;background:#60a5fa;border-radius:4px 4px 0 0;display:flex;align-items:flex-end;justify-content:center;color:#fff;font-size:9px}
        
        /* Transformer */
        .transformer-diagram {display:flex;gap:20px;justify-content:center}
        .tf-block {padding:15px;background:#1a1a2e;border:1px solid #333;border-radius:8px;cursor:pointer}
        .tf-block.active {border-color:#60a5fa}
        .tf-block h4 {margin:0 0 10px 0;font-size:12px}
        .tf-layer {font-size:9px;padding:4px 8px;background:#60a5fa20;margin:2px;border-radius:4px}
        .tf-explain {text-align:center;font-size:11px;color:#666;margin-top:15px}
        
        /* GAN */
        .gan-battle {display:flex;gap:30px;justify-content:center;align-items:center}
        .gan-player {text-align:center}
        .gan-player h4 {margin:0 0 10px 0;font-size:12px}
        .gen-image {width:60px;height:60px;background:#60a5fa;border-radius:8px;margin:0 auto 10px}
        .disc-meter {width:60px;height:10px;background:#333;border-radius:5px;margin:0 auto 10px}
        .disc-fill {height:100%;background:#60a5fa;border-radius:5px}
        .gan-player input {width:80px}
        .vs {font-size:20px;font-weight:bold;color:#60a5fa}
        .gan-loss {text-align:center;font-size:11px;color:#666;margin-top:15px}
        
        /* VAE */
        .vae-flow {display:flex;align-items:center;justify-content:center;gap:15px}
        .vae-col {text-align:center;font-size:10px}
        .vae-arrow {font-size:20px;color:#666}
        .vae-latent {text-align:center;background:#1a1a2e;padding:15px;border-radius:8px}
        .vae-latent input {width:60px;margin:5px}
        .vae-latent span {display:block;font-size:10px}
        .vae-loss {text-align:center;font-size:11px;color:#60a5ba;margin-top:15px}
        
        /* Diffusion */
        .diffusion-pipeline {text-align:center}
        .diff-arrow {font-size:11px;color:#666;margin-bottom:10px}
        .diff-timeline {display:flex;gap:10px;justify-content:center;margin-bottom:15px}
        .diff-step {cursor:pointer;text-align:center}
        .diff-dot {width:30px;height:30px;background:#60a5fa;border-radius:50%;margin:0 auto 5px}
        .diff-step span {font-size:9px;color:#666}
        .diff-stats {display:flex;gap:20px;justify-content:center;font-size:11px;margin-top:15px}
        
        /* Gradient */
        .gd-landscape {position:relative;height:120px;background:#1a1a2e;border-radius:8px;margin-bottom:15px}
        .gd-curve {position:absolute;top:10px;left:50%;transform:translateX(-50%);font-size:10px;color:#666}
        .curve-visual {width:150px;height:60px;background:linear-gradient(180deg,transparent,#60a5fa);border-radius:50% 50% 0 0}
        .gd-ball {position:absolute;bottom:20px;width:20px;height:20px;background:#60a5fa;border-radius:50%;transform:translateX(-50%)}
        .gd-arrow {position:absolute;width:2px;background:#f87171}
        .gd-controls {display:flex;gap:20px;justify-content:center}
        .gd-param {text-align:center}
        .gd-param span {display:block;font-size:10px}
        .gd-param input {width:80px}
        .gd-result {text-align:center;font-size:12px;color:#60a5ba}
        
        /* Q-Learning */
        .rl-grid {display:flex;justify-content:center;gap:10px;margin-bottom:15px}
        .rl-cell {width:40px;height:40px;background:#333;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px}
        .rl-cell.current {border:2px solid #60a5fa}
        .rl-cell.goal {background:#34d399}
        .rl-update {display:flex;gap:20px;justify-content:center;font-size:11px;margin-bottom:10px}
        .rl-formula {text-align:center;font-size:11px;color:#666}
        
        /* SVM */
        .svm-plot {position:relative;height:150px;background:#1a1a2e;border-radius:8px;margin-bottom:15px}
        .svm-point {position:absolute;width:10px;height:10px;border-radius:50%}
        .svm-point.class1 {background:#60a5ba}
        .svm-point.class2 {background:#f87171}
        .svm-margin {position:absolute;top:10%;height:80%;width:3px;background:#60a5fa;transform-origin:bottom}
        .svm-expl {text-align:center}
        .svm-expl input {width:150px}
        .svm-expl span {display:block;font-size:10px;color:#666;margin-top:5px}
        
        /* Decision Tree */
        .tree-viz {text-align:center}
        .tree-node {background:#1a1a2e;border:1px solid #333;border-radius:8px;padding:10px;font-size:11px}
        .tree-node.root {display:inline-block;margin-bottom:10px}
        .tree-branch {display:flex;gap:30px;justify-content:center}
        .tree-slider {text-align:center;margin-top:15px}
        .tree-slider input {width:150px}
        .tree-slider span {display:block;font-size:10px;color:#666}
        
        /* Transfer */
        .transfer-flow {display:flex;justify-content:center;gap:15px}
        .transfer-phase {text-align:center;padding:15px;background:#1a1a2e;border:1px solid #333;border-radius:8px;cursor:pointer}
        .transfer-phase.active {border-color:#60a5fa}
        .transfer-phase span {display:block;font-size:11px}
        .transfer-desc {text-align:center;font-size:11px;color:#666;margin-top:15px}
      `}</style>
    </div>
  );
}