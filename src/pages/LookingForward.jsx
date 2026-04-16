import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { ThemeToggle } from '../components/ThemeToggle';
import { AccessibilityPanel } from '../components/AccessibilityPanel';

// ============ VISUALIZERS FOR FUTURE TOPICS ============

function MultimodalVisualizer() {
  const [input, setInput] = useState('image');
  const modes = {
    image: { emoji: '🖼️', text: 'Vision Encoder', output: 'Image Embedding' },
    text: { emoji: '💬', text: 'Text Encoder', output: 'Text Embedding' },
    audio: { emoji: '🎵', text: 'Audio Encoder', output: 'Audio Embedding' }
  };
  return (
    <div className="viz-container">
      <div className="multi-modal-flow">
        {Object.entries(modes).map(([k, v]) => (
          <div key={k} className={`mode-box ${input === k ? 'active' : ''}`} onClick={() => setInput(k)}>
            <span className="mode-emoji">{v.emoji}</span>
            <span className="mode-name">{v.text}</span>
          </div>
        ))}
      </div>
      <div className="modal-center">
        <span>✦</span>
        <span>Cross-Modal Attention</span>
      </div>
      <div className="modal-output">
        {modes[input].output} ← Unified Understanding
      </div>
    </div>
  );
}

function AgentVisualizer() {
  const [step, setStep] = useState(0);
  const phases = [
    { icon: '🔍', name: 'Observe', desc: 'Perceive environment' },
    { icon: '🧠', name: 'Reason', desc: 'Plan next action' },
    { icon: '🎯', name: 'Act', desc: 'Execute tool' },
    { icon: '📝', name: 'Reflect', desc: 'Learn from result' }
  ];
  return (
    <div className="viz-container">
      <div className="agent-loop">
        {phases.map((p, i) => (
          <div key={i} className={`agent-phase ${step >= i ? 'active' : ''}`} onClick={() => setStep(i)}>
            <span className="agent-icon">{p.icon}</span>
            <span className="agent-name">{p.name}</span>
            <span className="agent-desc">{p.desc}</span>
          </div>
        ))}
      </div>
      <div className="agent-arrows">
        {phases.map((_, i) => i < 3 && <span key={i}>→</span>)}
      </div>
    </div>
  );
}

function QuantumVisualizer() {
  const [qubits, setQubits] = useState(2);
  const states = ['|0⟩', '|1⟩', '|+⟩', '|-⟩'];
  return (
    <div className="viz-container">
      <div className="quantum-circuit">
        {[...Array(qubits)].map((_, i) => (
          <div key={i} className="qubit-line">
            <span className="qubit-label">q{i}</span>
            <div className="gate">H</div>
            <div className="gate">X</div>
            <div className="measurement">📊</div>
          </div>
        ))}
      </div>
      <div className="quantum-control">
        <span>Qubits: {qubits}</span>
        <input type="range" min="1" max="5" value={qubits} onChange={e => setQubits(+e.target.value)} />
      </div>
      <div className="quantum-states">
        {states.slice(0, qubits).map((s, i) => (
          <span key={i} className="state-badge">{s}</span>
        ))}
      </div>
    </div>
  );
}

function EdgeVisualizer() {
  const [processing, setProcessing] = useState('edge');
  return (
    <div className="viz-container">
      <div className="edge-cloud">
        <div className={`device ${processing === 'edge' ? 'active' : ''}`} onClick={() => setProcessing('edge')}>
          <span>📱</span>
          <span>Edge Device</span>
          <small>Fast, Private</small>
        </div>
        <div className="cloud-connection">
          <span>{processing === 'edge' ? '⚡ Local only' : '🌐 Cloud sync'}</span>
        </div>
        <div className={`device ${processing === 'cloud' ? 'active' : ''}`} onClick={() => setProcessing('cloud')}>
          <span>☁️</span>
          <span>Cloud</span>
          <small>Powerful</small>
        </div>
      </div>
    </div>
  );
}

function AutoMLVisualizer() {
  const [phase, setPhase] = useState(0);
  const phases = ['Data →', 'Feature Eng →', 'Model Select →', 'Tune →', 'Deploy'];
  return (
    <div className="viz-container">
      <div className="automl-pipeline">
        {phases.map((p, i) => (
          <div key={i} className={`pipeline-step ${phase >= i ? 'active' : ''}`} onClick={() => setPhase(i)}>
            <span>{p}</span>
          </div>
        ))}
      </div>
      <div className="automl-result">
        Best Model: {phase >= 3 ? '🎉 Accuracy: 97.3%' : 'Searching...'}
      </div>
    </div>
  );
}

function FederatedVisualizer() {
  const [round, setRound] = useState(1);
  const clients = ['📱 Phone 1', '💻 Laptop', '📱 Phone 2', '📱 Phone 3'];
  return (
    <div className="viz-container">
      <div className="federated-clients">
        {clients.map((c, i) => (
          <div key={i} className="client" style={{ opacity: round >= 1 ? 1 : 0.3 }}>
            <span>{c}</span>
            <div className="client-model" style={{ height: `${20 + i * 10}%` }} />
          </div>
        ))}
      </div>
      <div className="federated-center">
        <span>🔒 Privacy</span>
        <span>Data stays local</span>
      </div>
      <div className="federated-control">
        <span>Round: {round}</span>
        <input type="range" min="1" max="5" value={round} onChange={e => setRound(+e.target.value)} />
      </div>
    </div>
  );
}

function AIEthicsVisualizer() {
  const [bias, setBias] = useState(50);
  return (
    <div className="viz-container">
      <div className="ethics-scale">
        <div className="scale-pan" style={{ transform: `rotate(${-30 + bias * 0.6}deg)` }}>
          <span className="scale-label">Bias</span>
        </div>
      </div>
      <div className="ethics-control">
        <span>Model Fairness Score: {100 - Math.abs(bias - 50)}%</span>
        <input type="range" min="0" max="100" value={bias} onChange={e => setBias(+e.target.value)} />
      </div>
      <div className="ethics-checklist">
        <span>✓ Training data diversity</span>
        <span>✓ Bias testing</span>
        <span>✓ Regular audits</span>
      </div>
    </div>
  );
}

// ============ LESSONS DATA ============

const FUTURE_LESSONS = [
  {
    id: 'multimodal',
    title: 'Multimodal AI',
    subtitle: 'AI That Sees, Hears, and Speaks',
    icon: '🧠',
    content: `
      <p><strong>Multimodal AI</strong> processes multiple types of data - images, text, audio, video - together, just like humans do.</p>
      <h4>Key Concepts</h4>
      <ul>
        <li><strong>CLIP</strong>: Learns to match images with text descriptions</li>
        <li><strong>GPT-4V</strong>: Vision + Language in one model</li>
        <li><strong>Flamingo</strong>: Open-ended visual question answering</li>
      </ul>
      <h4>Why It Matters</h4>
      <p>Real-world AI must understand the world holistically - not just text or just images. Multimodal models can describe photos, answer questions about videos, and generate images from descriptions.</p>
    `,
    solved: `
      <ul>
        <li><strong>Single-modal limitations</strong>: Traditional models could only process one data type (text OR images), missing cross-modal relationships</li>
        <li><strong>Data inefficiency</strong>: Each modality required separate training, labels, and expertise</li>
        <li><strong>Human-AI gap</strong>: Humans naturally integrate sight, sound, and text - multimodal AI bridges this gap</li>
      </ul>
    `,
    shortcomings: `
      <ul>
        <li><strong>Computational cost</strong>: Processing multiple modalities requires significantly more GPU memory and training time</li>
        <li><strong>Data alignment challenges</strong>: Matching images to text, audio to video requires careful dataset curation</li>
        <li><strong>Modalities skew</strong>: Models tend to perform better on text (most abundant) than other modalities</li>
        <li><strong>Evaluation complexity</strong>: No unified metrics for measuring multimodal understanding</li>
      </ul>
    `,
    visualizer: MultimodalVisualizer,
    nextLessons: ['agent', 'edge']
  },
  {
    id: 'agent',
    title: 'Agentic AI',
    subtitle: 'AI That Takes Actions',
    icon: '🤖',
    content: `
      <p><strong>Agentic AI</strong> doesn't just respond - it plans, uses tools, and acts autonomously to achieve goals.</p>
      <h4>Key Concepts</h4>
      <ul>
        <li><strong>ReAct</strong>: Combines reasoning with acting</li>
        <li><strong>Tool Use</strong>: Can call APIs, search the web, run code</li>
        <li><strong>Memory</strong>: Maintains context across sessions</li>
      </ul>
      <h4>Why It Matters</h4>
      <p>Future AI will book flights, manage calendars, write code, and more - acting as a true digital assistant that can execute complex multi-step tasks.</p>
    `,
    solved: `
      <ul>
        <li><strong>Passive AI limitations</strong>: Traditional LLMs only respond to prompts, unable to take initiative or complete multi-step tasks</li>
        <li><strong>Static knowledge</strong>: Agents can use tools to get real-time information instead of relying on training data cutoff</li>
        <li><strong>Automation gaps</strong>: Previously required rigid scripts or APIs; agents can now adapt to novel situations</li>
      </ul>
    `,
    shortcomings: `
      <ul>
        <li><strong>Hallucination risks</strong>: Agents making autonomous decisions can compound errors across multiple steps</li>
        <li><strong>Tool security</strong>: Giving AI ability to call APIs or execute code introduces security vulnerabilities</li>
        <li><strong>Cost accumulation</strong>: Each tool call costs money; agents can accumulate significant costs unnoticed</li>
        <li><strong>Debugging difficulty</strong>: Tracing why an agent took a wrong action through multiple steps is challenging</li>
      </ul>
    `,
    visualizer: AgentVisualizer,
    nextLessons: ['automl', 'federated']
  },
  {
    id: 'quantum',
    title: 'Quantum Machine Learning',
    subtitle: 'Computing Beyond Classical',
    icon: '⚛️',
    content: `
      <p><strong>Quantum ML</strong> uses quantum computers to process information in ways impossible for classical computers.</p>
      <h4>Key Concepts</h4>
      <ul>
        <li><strong>Qubits</strong>: 0 and 1 simultaneously (superposition)</li>
        <li><strong>Entanglement</strong>: Particles connected across distance</li>
        <li><strong>Quantum Advantage</strong>: Problems too hard for classical</li>
      </ul>
      <h4>Why It Matters</h4>
      <p>Quantum computers could revolutionize drug discovery, optimization, and cryptography - solving problems that would take classical computers millions of years.</p>
    `,
    solved: `
      <ul>
        <li><strong>Classically hard problems</strong>: Quantum computers can solve certain problems (factorization, simulation) exponentially faster</li>
        <li><strong>Exponential state space</strong>: n qubits can represent 2^n states, enabling massive parallelism</li>
        <li><strong>Quantum algorithms</strong>: Grover's, Shor's algorithms offer quadratic/speedups for search and factoring</li>
      </ul>
    `,
    shortcomings: `
      <ul>
        <li><strong>Noise & decoherence</strong>: Qubits are extremely fragile; slightest interference causes errors</li>
        <li><strong>Limited qubits</strong>: Current quantum computers have ~100-1000 qubits - far below what's needed for practical advantage</li>
        <li><strong>Noisy Intermediate Scale (NISQ)</strong>: Today's quantum devices can't run most quantum algorithms reliably</li>
        <li><strong>Classical preprocessing</strong>: Getting data into/out of quantum states often negates advantages</li>
      </ul>
    `,
    visualizer: QuantumVisualizer,
    nextLessons: []
  },
  {
    id: 'edge',
    title: 'Edge AI',
    subtitle: 'Intelligence on Your Device',
    icon: '📱',
    content: `
      <p><strong>Edge AI</strong> runs machine learning models directly on devices - no internet required.</p>
      <h4>Key Concepts</h4>
      <ul>
        <li><strong>Quantization</strong>: Smaller models (32-bit → 4-bit)</li>
        <li><strong>Neural Processing Unit</strong>: Specialized AI chips</li>
        <li><strong>Federated Learning</strong>: Train across devices privately</li>
      </ul>
      <h4>Why It Matters</h4>
      <p>Privacy (data stays local), speed (no network delay), and offline capability. Your phone's voice assistant works even without internet.</p>
    `,
    solved: `
      <ul>
        <li><strong>Latency issues</strong>: Cloud-based AI adds network round-trip time; edge is instant</li>
        <li><strong>Privacy concerns</strong>: Sending audio/images to cloud raised serious privacy issues</li>
        <li><strong>Connectivity requirements</strong>: Cloud AI fails without internet; edge works anywhere</li>
        <li><strong>Bandwidth costs</strong>: Streaming video/audio to cloud is expensive; edge reduces costs</li>
      </ul>
    `,
    shortcomings: `
      <ul>
        <li><strong>Limited compute</strong>: Mobile devices have far less power than cloud GPUs</li>
        <li><strong>Model size constraints</strong>: Large models like GPT-4 cannot run on phones</li>
        <li><strong>Battery drain</strong>: Running AI on-device drains battery faster than cloud inference</li>
        <li><strong>Update complexity</strong>: Pushing model updates to billions of devices is challenging</li>
      </ul>
    `,
    visualizer: EdgeVisualizer,
    nextLessons: ['federated', 'ethics']
  },
  {
    id: 'automl',
    title: 'AutoML',
    subtitle: 'AI That Builds AI',
    icon: '🔧',
    content: `
      <p><strong>AutoML</strong> automates the process of designing and tuning machine learning models.</p>
      <h4>Key Concepts</h4>
      <ul>
        <li><strong>Neural Architecture Search</strong>: Auto-design neural networks</li>
        <li><strong>Hyperparameter Optimization</strong>: Auto-tune learning rate, etc.</li>
        <li><strong>Meta-Learning</strong>: Learn how to learn</li>
      </ul>
      <h4>Why It Matters</h4>
      <p>AutoML makes ML accessible to non-experts and helps experts iterate faster. Google AutoML already creates production-ready models from just your data.</p>
    `,
    solved: `
      <ul>
        <li><strong>Expert dependency</strong>: Building ML models required PhD-level expertise in architecture design</li>
        <li><strong>Hyperparameter tuning</strong>: Manual tuning of learning rate, batch size, etc. was time-consuming</li>
        <li><strong>Reproducibility</strong>: AutoML provides systematic, reproducible model selection</li>
        <li><strong> Democratization</strong>: Non-experts can now build production-quality models</li>
      </ul>
    `,
    shortcomings: `
      <ul>
        <li><strong>Computational cost</strong>: Architecture search can cost millions in GPU compute</li>
        <li><strong>May miss novel architectures</strong>: Search spaces are constrained by human-defined options</li>
        <li><strong>No guarantees</strong>: AutoML finds good solutions but may not find optimal ones</li>
        <li><strong>Black box</strong>: Understanding why AutoML chose a specific architecture is difficult</li>
      </ul>
    `,
    visualizer: AutoMLVisualizer,
    nextLessons: []
  },
  {
    id: 'federated',
    title: 'Federated Learning',
    subtitle: 'Train Together, Stay Private',
    icon: '🔐',
    content: `
      <p><strong>Federated Learning</strong> trains models across distributed devices without sharing raw data.</p>
      <h4>Key Concepts</h4>
      <ul>
        <li><strong>Local Training</strong>: Each device trains locally</li>
        <li><strong>Model Aggregation</strong>: Combine updates without data</li>
        <li><strong>Differential Privacy</strong>: Add noise to protect privacy</li>
      </ul>
      <h4>Why It Matters</h4>
      <p>GDPR, healthcare, and banking require data to stay private. Federated learning lets companies improve AI without compromising user privacy.</p>
    `,
    solved: `
      <ul>
        <li><strong>Data privacy regulations</strong>: GDPR, HIPAA prohibit moving raw data across borders or organizations</li>
        <li><strong>Data silos</strong>: Companies couldn't combine datasets due to privacy; federated learning enables collaboration</li>
        <li><strong>Centralized data risks</strong>: Single point of failure for data breaches; federated has no central data store</li>
      </ul>
    `,
    shortcomings: `
      <ul>
        <li><strong>Communication overhead</strong>: Sending model updates between devices/cloud is expensive</li>
        <li><strong>Heterogeneous data</strong>: Non-IID data (different users have different usage patterns) degrades performance</li>
        <li><strong>Byzantine failures</strong>: Malicious or buggy devices can corrupt the global model</li>
        <li><strong>Privacy leakage</strong>: Model updates can still leak information about training data</li>
      </ul>
    `,
    visualizer: FederatedVisualizer,
    nextLessons: ['ethics']
  },
  {
    id: 'ethics',
    title: 'AI Ethics & Safety',
    subtitle: 'Building Responsible AI',
    icon: '⚖️',
    content: `
      <p><strong>AI Ethics</strong> ensures AI systems are fair, transparent, and safe.</p>
      <h4>Key Concepts</h4>
      <ul>
        <li><strong>Bias Detection</strong>: Find and fix training data biases</li>
        <li><strong>Interpretability</strong>: Understand why AI makes decisions</li>
        <li><strong>Alignment</strong>: Ensure AI goals match human values</li>
      </ul>
      <h4>Why It Matters</h4>
      <p>AI affects hiring, lending, healthcare, and more. Unchecked bias can perpetuate discrimination. Safety research prevents catastrophic outcomes as AI grows more powerful.</p>
    `,
    solved: `
      <ul>
        <li><strong>Systemic bias</strong>: Historical data reflected societal biases (gender, race); ethics provides tools to detect and mitigate</li>
        <li><strong>Black box problems</strong>: Deep learning was a "black box"; interpretability tools now explain decisions</li>
        <li><strong>Unintended consequences</strong>: Without ethics frameworks, AI could optimize for wrong objectives (Paperclip maximizer)</li>
        <li><strong>Regulatory gaps</strong>: Ethics frameworks inform regulation before laws are written</li>
      </ul>
    `,
    shortcomings: `
      <ul>
        <li><strong>Subjectivity</strong>: "Fairness" has many definitions; no single mathematical solution satisfies all</li>
        <li><strong>Trade-offs</strong>: Fairness often conflicts with accuracy; must choose which to prioritize</li>
        <li><strong>Evasion attacks</strong>: Bias mitigation can be circumvented by adversarial inputs</li>
        <li><strong>Slow adoption</strong>: Many companies deploy ethics tools superficially without real change</li>
      </ul>
    `,
    visualizer: AIEthicsVisualizer,
    nextLessons: []
  }
];

// ============ FINAL QUIZ QUESTIONS ============

const FINAL_QUIZ_QUESTIONS = [
  {
    question: "Which model learns to match images with text descriptions?",
    options: ["CLIP", "BERT", "GPT-2", "ResNet"],
    correctAnswer: "CLIP",
    explanation: "CLIP (Contrastive Language-Image Pre-training) learns to match images with their text descriptions."
  },
  {
    question: "What makes agentic AI different from regular AI?",
    options: ["Uses more data", "Takes autonomous actions", "Faster training", "Smaller models"],
    correctAnswer: "Takes autonomous actions",
    explanation: "Agentic AI plans, uses tools, and acts autonomously rather than just responding to prompts."
  },
  {
    question: "What is a 'qubit' in quantum computing?",
    options: ["A quantum bit that can be 0 and 1 simultaneously", "A type of neural network", "A classical computer", "A storage unit"],
    correctAnswer: "A quantum bit that can be 0 and 1 simultaneously",
    explanation: "Qubits use superposition to represent both 0 and 1 at the same time, enabling quantum parallelism."
  },
  {
    question: "Why is Edge AI important for privacy?",
    options: ["It's faster", "Data stays on the device", "It's cheaper", "It's more accurate"],
    correctAnswer: "Data stays on the device",
    explanation: "Edge AI processes data locally without sending it to the cloud, keeping sensitive information private."
  },
  {
    question: "What does AutoML automate?",
    options: ["Data collection", "Model design and tuning", "User interface design", "Hardware manufacturing"],
    correctAnswer: "Model design and tuning",
    explanation: "AutoML automates the process of selecting algorithms, tuning hyperparameters, and designing architectures."
  },
  {
    question: "In Federated Learning, where does training happen?",
    options: ["Only in the cloud", "On each device locally", "On a single server", "In the browser"],
    correctAnswer: "On each device locally",
    explanation: "Federated Learning trains models on each device locally, then shares only the model updates (not data)."
  },
  {
    question: "What is the main goal of AI alignment?",
    options: ["Make AI faster", "Ensure AI goals match human values", "Reduce model size", "Increase accuracy"],
    correctAnswer: "Ensure AI goals match human values",
    explanation: "AI alignment research aims to ensure that AI systems pursue goals that align with what humans actually want."
  },
  {
    question: "What is 'quantization' in Edge AI?",
    options: ["Making images smaller", "Reducing model precision (e.g., 32-bit to 4-bit)", "Compressing text", "Detecting edges in images"],
    correctAnswer: "Reducing model precision (e.g., 32-bit to 4-bit)",
    explanation: "Quantization reduces the precision of weights and activations, making models smaller and faster for edge devices."
  },
  {
    question: "Which approach combines reasoning with acting?",
    options: ["CLIP", "ReAct", "ResNet", "BERT"],
    correctAnswer: "ReAct",
    explanation: "ReAct (Reason + Act) combines reasoning traces with actions, allowing AI to think about and interact with environments."
  },
  {
    question: "What is differential privacy in ML?",
    options: ["Private model weights", "Adding noise to protect individual data points", "Encrypted inference", "Secure model sharing"],
    correctAnswer: "Adding noise to protect individual data points",
    explanation: "Differential privacy adds calibrated noise to data or gradients, making it mathematically impossible to identify individuals."
  },
  {
    question: "What is 'neural architecture search'?",
    options: ["Searching for neurons", "Automatically designing neural networks", "Finding network errors", "Neural network marketing"],
    correctAnswer: "Automatically designing neural networks",
    explanation: "NAS uses search algorithms to automatically discover optimal neural network architectures for given tasks."
  },
  {
    question: "What problem does Quantum ML aim to solve?",
    options: ["All of the below", "Drug discovery", "Optimization", "Cryptography"],
    correctAnswer: "All of the below",
    explanation: "Quantum ML can potentially solve problems in drug discovery, optimization, and cryptography that are intractable for classical computers."
  }
];

// ============ MAIN COMPONENT ============

export function LookingForward() {
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFinalQuiz, setShowFinalQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [currentQuizQ, setCurrentQuizQ] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showBalloons, setShowBalloons] = useState(false);

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const allLessonsComplete = completedLessons.length >= FUTURE_LESSONS.length;

  const startFinalQuiz = () => {
    const shuffled = [...FINAL_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 8);
    setQuizQuestions(shuffled);
    setCurrentQuizQ(0);
    setQuizScore(0);
    setShowFeedback(false);
    setQuizComplete(false);
    setShowBalloons(false);
    setShowFinalQuiz(true);
  };

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    setShowFeedback(true);
    if (answer === quizQuestions[currentQuizQ].correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuizQ < quizQuestions.length - 1) {
      setCurrentQuizQ(prev => prev + 1);
      setShowFeedback(false);
      setUserAnswer('');
    } else {
      setQuizComplete(true);
      if ((quizScore + (userAnswer === quizQuestions[currentQuizQ].correctAnswer ? 1 : 0)) / quizQuestions.length >= 0.8) {
        setShowBalloons(true);
      }
    }
  };

  const markComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  return (
    <div className="forward-page">
      {showBalloons && (
        <div className="balloons-container">
          {[...Array(50)].map((_, i) => (
            <Balloon key={i} />
          ))}
        </div>
      )}

      <header className="main-header">
        <div>
          <h1>Looking <span>Forward</span></h1>
          <p>Where ML is heading next</p>
        </div>
        <div className="header-actions">
          <Link to="/playground" className="btn-nav">Playground</Link>
          <Link to="/quizzes" className="btn-nav">Quizzes</Link>
          <Link to="/lessons" className="btn-nav">Lessons</Link>
          <Link to="/resources" className="btn-nav">Library</Link>
          <ThemeToggle />
          <AccessibilityPanel />
        </div>
      </header>

      <main className="main-content">
        {!showFinalQuiz ? (
          <>
            <div className="chapter-intro">
              <h2>Chapter: The Future of Machine Learning</h2>
              <p>Explore emerging technologies and where the field is headed. Each lesson includes an interactive visualizer.</p>
              <div className="progress-tracker">
                <span>Lessons Complete: {completedLessons.length} / {FUTURE_LESSONS.length}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(completedLessons.length / FUTURE_LESSONS.length) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="lessons-grid">
              {FUTURE_LESSONS.map(lesson => {
                const isComplete = completedLessons.includes(lesson.id);
                const Visualizer = lesson.visualizer;
                return (
                  <div key={lesson.id} className={`lesson-card ${isComplete ? 'complete' : ''}`}>
                    <div className="lesson-header">
                      <span className="lesson-icon">{lesson.icon}</span>
                      <h3>{lesson.title}</h3>
                      {isComplete && <span className="check">✓</span>}
                    </div>
                    <p className="lesson-subtitle">{lesson.subtitle}</p>
                    
                    <div className="lesson-visual">
                      <Visualizer />
                    </div>
                    
                    <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }} />
                    
                    {lesson.solved && (
                      <div className="lesson-section solved-section">
                        <h4>✅ What This Solved</h4>
                        <div dangerouslySetInnerHTML={{ __html: lesson.solved }} />
                      </div>
                    )}
                    
                    {lesson.shortcomings && (
                      <div className="lesson-section shortcomings-section">
                        <h4>⚠️ Current Shortcomings</h4>
                        <div dangerouslySetInnerHTML={{ __html: lesson.shortcomings }} />
                      </div>
                    )}
                    
                    <button className="mark-complete-btn" onClick={() => markComplete(lesson.id)}>
                      {isComplete ? 'Completed ✓' : 'Mark as Complete'}
                    </button>
                  </div>
                );
              })}
            </div>

            {allLessonsComplete && (
              <div className="final-quiz-prompt">
                <div className="quiz-card">
                  <h3>🎓 Final Assessment</h3>
                  <p>You've completed all lessons! Test your knowledge with a final quiz covering all topics.</p>
                  <ul>
                    <li>8 random questions from all lessons</li>
                    <li>80% (6/8) to pass</li>
                    <li>New questions each attempt!</li>
                  </ul>
                  <button className="start-quiz-btn" onClick={startFinalQuiz}>
                    Start Final Quiz 🚀
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="quiz-container">
            {!quizComplete ? (
              <>
                <div className="quiz-progress">
                  <span>Question {currentQuizQ + 1} of {quizQuestions.length}</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${((currentQuizQ + 1) / quizQuestions.length) * 100}%` }} />
                  </div>
                </div>
                
                <div className="quiz-card">
                  <h3>{quizQuestions[currentQuizQ].question}</h3>
                  <div className="quiz-options">
                    {quizQuestions[currentQuizQ].options.map(opt => (
                      <button key={opt} className={`quiz-option ${showFeedback && opt === quizQuestions[currentQuizQ].correctAnswer ? 'correct' : ''} ${showFeedback && userAnswer === opt && opt !== quizQuestions[currentQuizQ].correctAnswer ? 'incorrect' : ''}`} 
                        onClick={() => !showFeedback && handleAnswer(opt)} disabled={showFeedback}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  
                  {showFeedback && (
                    <div className="quiz-feedback">
                      <p>{quizQuestions[currentQuizQ].explanation}</p>
                    </div>
                  )}
                  
                  {showFeedback && (
                    <button className="next-btn" onClick={handleNext}>
                      {currentQuizQ < quizQuestions.length - 1 ? 'Next →' : 'See Results'}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="quiz-results">
                <div className="result-card">
                  <h2>{quizScore / quizQuestions.length >= 0.8 ? '🎉 Congratulations!' : 'Keep Learning!'}</h2>
                  <div className="score-display">
                    <span className="score-value">{quizScore}</span>
                    <span className="score-total">/ {quizQuestions.length}</span>
                  </div>
                  <p>{quizScore / quizQuestions.length >= 0.8 
                    ? 'You passed! You understand where ML is heading!' 
                    : 'You need 80% to pass. Review the lessons and try again!'}</p>
                  <button className="retry-btn" onClick={startFinalQuiz}>Try Again</button>
                  <button className="back-btn" onClick={() => setShowFinalQuiz(false)}>Back to Lessons</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      <style>{`
        .forward-page {
          min-height: 100vh;
          background: radial-gradient(circle at top left, #1a1a2e, var(--bg-primary));
        }
        .main-header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
        }
        .main-header h1 {
          font-size: 24px;
          margin: 0;
        }
        .main-header h1 span {
          color: var(--accent-primary);
        }
        .main-header p {
          margin: 4px 0 0;
          font-size: 14px;
          color: var(--text-secondary);
        }
        .header-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .btn-nav {
          padding: 8px 16px;
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 14px;
        }
        .main-content {
          padding: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .chapter-intro {
          text-align: center;
          margin-bottom: 40px;
        }
        .chapter-intro h2 {
          font-size: 28px;
          margin: 0 0 10px;
        }
        .chapter-intro p {
          color: var(--text-secondary);
          font-size: 16px;
        }
        .progress-tracker {
          margin-top: 20px;
        }
        .progress-tracker span {
          display: block;
          margin-bottom: 8px;
          color: var(--text-secondary);
        }
        .progress-bar {
          height: 8px;
          background: var(--bg-secondary);
          border-radius: 4px;
          overflow: hidden;
          max-width: 400px;
          margin: 0 auto;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          transition: width 0.5s ease;
        }
        .lessons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }
        .lesson-card {
          background: var(--bg-panel);
          border: var(--glass-border);
          border-radius: 16px;
          padding: 24px;
        }
        .lesson-card.complete {
          border-color: var(--accent-success);
        }
        .lesson-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .lesson-icon {
          font-size: 32px;
        }
        .lesson-header h3 {
          margin: 0;
          flex: 1;
        }
        .check {
          color: var(--accent-success);
          font-size: 24px;
        }
        .lesson-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
          margin: 0 0 16px;
        }
        .lesson-visual {
          margin: 16px 0;
          border-radius: 8px;
          overflow: hidden;
        }
        .lesson-content {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
        }
        .lesson-content h4 {
          color: var(--text-primary);
          margin: 16px 0 8px;
        }
        .lesson-content ul {
          padding-left: 20px;
        }
        .lesson-section {
          margin-top: 16px;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.5;
        }
        .lesson-section h4 {
          margin: 0 0 8px;
          font-size: 14px;
        }
        .lesson-section ul {
          padding-left: 20px;
          margin: 0;
        }
        .solved-section {
          background: rgba(52, 211, 153, 0.1);
          border: 1px solid rgba(52, 211, 153, 0.3);
        }
        .solved-section h4 {
          color: var(--accent-success);
        }
        .shortcomings-section {
          background: rgba(251, 146, 60, 0.1);
          border: 1px solid rgba(251, 146, 60, 0.3);
        }
        .shortcomings-section h4 {
          color: #fb923c;
        }
        .mark-complete-btn {
          width: 100%;
          padding: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: var(--text-secondary);
          cursor: pointer;
          margin-top: 16px;
          transition: all 0.2s;
        }
        .lesson-card.complete .mark-complete-btn {
          background: var(--accent-success);
          color: white;
          border-color: var(--accent-success);
        }
        .final-quiz-prompt {
          margin-top: 40px;
        }
        .final-quiz-prompt .quiz-card {
          background: linear-gradient(135deg, rgba(0, 242, 255, 0.1), rgba(255, 0, 242, 0.1));
          border: 2px solid var(--accent-primary);
          border-radius: 16px;
          padding: 40px;
          text-align: center;
        }
        .final-quiz-prompt h3 {
          font-size: 24px;
          margin: 0 0 16px;
        }
        .final-quiz-prompt ul {
          text-align: left;
          max-width: 300px;
          margin: 16px auto;
          color: var(--text-secondary);
        }
        .start-quiz-btn {
          background: var(--accent-primary);
          color: #000;
          font-weight: bold;
          padding: 14px 32px;
          border-radius: 8px;
          border: none;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .start-quiz-btn:hover {
          transform: scale(1.05);
        }
        
        /* Quiz Styles */
        .quiz-container {
          max-width: 700px;
          margin: 0 auto;
        }
        .quiz-progress {
          margin-bottom: 24px;
        }
        .quiz-progress span {
          display: block;
          text-align: center;
          margin-bottom: 8px;
          color: var(--text-secondary);
        }
        .quiz-card {
          background: var(--bg-panel);
          border: var(--glass-border);
          border-radius: 16px;
          padding: 30px;
        }
        .quiz-card h3 {
          font-size: 20px;
          margin: 0 0 24px;
        }
        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .quiz-option {
          padding: 14px;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: var(--text-secondary);
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }
        .quiz-option:hover:not(:disabled) {
          border-color: var(--accent-primary);
          color: var(--text-primary);
        }
        .quiz-option.correct {
          background: rgba(0, 255, 157, 0.2);
          border-color: var(--accent-success);
          color: var(--accent-success);
        }
        .quiz-option.incorrect {
          background: rgba(255, 0, 85, 0.2);
          border-color: var(--accent-danger);
          color: var(--accent-danger);
        }
        .quiz-feedback {
          margin-top: 16px;
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
          font-size: 14px;
        }
        .next-btn {
          width: 100%;
          padding: 14px;
          background: var(--accent-primary);
          color: #000;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          margin-top: 16px;
          cursor: pointer;
        }
        .quiz-results {
          text-align: center;
        }
        .result-card {
          background: var(--bg-panel);
          border: var(--glass-border);
          border-radius: 16px;
          padding: 40px;
        }
        .score-display {
          font-size: 64px;
          font-weight: bold;
          color: var(--accent-primary);
          margin: 20px 0;
        }
        .score-total {
          font-size: 32px;
          color: var(--text-secondary);
        }
        .retry-btn, .back-btn {
          padding: 12px 24px;
          border-radius: 8px;
          margin: 8px;
          cursor: pointer;
          font-size: 14px;
        }
        .retry-btn {
          background: var(--accent-primary);
          color: #000;
          border: none;
        }
        .back-btn {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          border: 1px solid var(--glass-border);
        }
        
        /* Visualizers */
        .viz-container {
          background: rgba(0,0,0,0.3);
          border-radius: 8px;
          padding: 16px;
        }
        .multi-modal-flow { display: flex; gap: 10px; justify-content: center; margin-bottom: 10px; }
        .mode-box { padding: 12px; background: var(--bg-secondary); border-radius: 8px; text-align: center; cursor: pointer; border: 2px solid transparent; }
        .mode-box.active { border-color: var(--accent-primary); }
        .mode-emoji { font-size: 24px; display: block; }
        .mode-name { font-size: 10px; }
        .modal-center { text-align: center; margin: 10px 0; }
        .modal-output { text-align: center; font-size: 12px; color: var(--accent-primary); }
        
        .agent-loop { display: flex; justify-content: center; gap: 10px; }
        .agent-phase { padding: 10px; background: var(--bg-secondary); border-radius: 8px; text-align: center; cursor: pointer; border: 2px solid transparent; }
        .agent-phase.active { border-color: var(--accent-primary); }
        .agent-icon { font-size: 20px; display: block; }
        .agent-name { font-size: 10px; display: block; }
        .agent-desc { font-size: 8px; color: var(--text-secondary); }
        .agent-arrows { text-align: center; color: var(--text-secondary); font-size: 14px; margin-top: 10px; }
        
        .quantum-circuit { margin-bottom: 10px; }
        .qubit-line { display: flex; align-items: center; gap: 8px; margin: 4px 0; }
        .qubit-label { font-size: 10px; width: 20px; }
        .gate { background: var(--accent-primary); color: #000; padding: 2px 6px; border-radius: 4px; font-size: 10px; }
        .measurement { font-size: 14px; }
        .quantum-control { text-align: center; }
        .quantum-control input { width: 100px; }
        .quantum-states { display: flex; justify-content: center; gap: 8px; margin-top: 8px; }
        .state-badge { background: var(--bg-secondary); padding: 4px 8px; border-radius: 4px; font-size: 10px; }
        
        .edge-cloud { display: flex; align-items: center; justify-content: center; gap: 20px; }
        .device { text-align: center; padding: 16px; background: var(--bg-secondary); border-radius: 8px; cursor: pointer; border: 2px solid transparent; }
        .device.active { border-color: var(--accent-primary); }
        .device small { font-size: 10px; color: var(--text-secondary); display: block; }
        
        .automl-pipeline { display: flex; justify-content: center; gap: 4px; margin-bottom: 12px; }
        .pipeline-step { padding: 8px 12px; background: var(--bg-secondary); border-radius: 4px; cursor: pointer; border: 2px solid transparent; font-size: 10px; }
        .pipeline-step.active { border-color: var(--accent-primary); background: rgba(0,242,255,0.2); }
        .automl-result { text-align: center; font-size: 14px; color: var(--accent-primary); }
        
        .federated-clients { display: flex; justify-content: center; gap: 10px; margin-bottom: 10px; }
        .client { text-align: center; font-size: 10px; }
        .client-model { width: 30px; background: var(--accent-primary); border-radius: 4px 4px 0 0; }
        .federated-center { text-align: center; font-size: 10px; color: var(--text-secondary); }
        .federated-control { text-align: center; }
        
        .ethics-scale { height: 80px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 10px; }
        .scale-pan { width: 100px; height: 20px; background: linear-gradient(90deg, #f87171, #34d399, #60a5ba); border-radius: 10px; transform-origin: center bottom; }
        .ethics-control { text-align: center; }
        .ethics-control input { width: 100px; }
        .ethics-checklist { display: flex; justify-content: center; gap: 16px; font-size: 10px; margin-top: 10px; }
        
        /* Balloons */
        .balloons-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }
        .balloon {
          position: absolute;
          bottom: -100px;
          font-size: 40px;
          animation: rise 8s ease-in forwards;
        }
        @keyframes rise {
          to {
            transform: translateY(-120vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
