import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataType } from '../engine/data';
import { Tooltip } from './Tooltip';
import { CodeExport } from './CodeExport';

const SIMPLE_DATASETS = [
    { type: DataType.SPIRAL, label: 'Spiral Arms', hint: 'Interleaving swirls demand complex decision boundaries.' },
    { type: DataType.CIRCLE, label: 'Dual Rings', hint: 'Inner vs outer rings for radial separation.' },
    { type: DataType.XOR, label: 'XOR Quadrants', hint: 'Opposing corners teach nonlinear splits.' },
    { type: DataType.LINEAR, label: 'Linear Split', hint: 'Baseline diagonal divider with jitter.' }
];

const DEFAULT_LAYER_CONTROLS = { batchNorm: false, dropout: false, dropoutRate: 0.2 };

const CATEGORIES = [
    { id: 'basics', label: 'Basics', icon: '📚', description: 'Core concepts' },
    { id: 'vision', label: 'Computer Vision', icon: '👁️', description: 'CNNs & Images' },
    { id: 'nlp', label: 'NLP & Text', icon: '💬', description: 'Transformers & Language' },
    { id: 'generative', label: 'Generative', icon: '🎨', description: 'GANs, VAE, Diffusion' },
    { id: 'rl', label: 'Reinforcement', icon: '🎮', description: 'RL & Games' },
    { id: 'training', label: 'Training', icon: '⚙️', description: 'Optimizers & Tricks' }
];

// -----------------------------------------------------------------------------
// Topic library — compact learning cards shown in each category pane.
// Each topic renders an expandable card with intuition, math (where useful),
// a tiny code snippet, and a deep-link to the full interactive lesson.
// -----------------------------------------------------------------------------
const TOPIC_LIBRARY = {
    vision: {
        icon: '👁️',
        heading: 'Computer Vision',
        blurb: 'How neural networks see: filters, stacks, and receptive fields.',
        topics: [
            {
                id: 'conv2d',
                title: 'Convolutional Layers',
                summary: 'A small filter slides over the image, sharing weights across every location.',
                intuition: 'Instead of connecting every pixel to every neuron (too many weights!), a Conv2D layer uses a tiny K×K filter that slides across the image. The same weights detect the same pattern anywhere — so an "edge detector" works in the top-left and the bottom-right.',
                formula: 'y[i,j] = Σ_{m,n} x[i+m, j+n] · w[m,n]  +  b',
                code: 'tf.layers.conv2d({\n  filters: 32,\n  kernelSize: 3,   // 3×3 filter\n  strides: 1,\n  padding: "same",\n  activation: "relu"\n})',
                takeaway: 'Parameter sharing + local connectivity = efficient pattern detection.',
            },
            {
                id: 'pooling',
                title: 'Pooling & Stride',
                summary: 'Shrink the feature map while keeping the strongest signals.',
                intuition: 'Max-pooling replaces each 2×2 block with its maximum value — halving the spatial size and giving a tiny bit of translation invariance. Stride>1 in conv achieves the same downsampling in one step. Deeper layers see more of the image (larger receptive field).',
                formula: 'out[i,j] = max(x[2i:2i+2, 2j:2j+2])',
                code: 'tf.layers.maxPooling2d({ poolSize: 2, strides: 2 })\n// 28×28 → 14×14',
                takeaway: 'Pooling discards spatial detail to keep the strongest features.',
            },
            {
                id: 'augment',
                title: 'Image Augmentation',
                summary: 'Randomly flip, rotate, crop, or recolor — turns 1 image into infinite variations.',
                intuition: 'A CNN trained only on upright cats will fail on upside-down cats. Augmentation synthesizes new training examples on-the-fly: horizontal flips, small rotations, color jitter, random crops. It’s free regularization.',
                code: 'const aug = tf.image.flipLeftRight(img);\n// or: tf.image.rotateWithOffset, random crop, etc.',
                takeaway: 'Always augment. It often beats a bigger model.',
            },
            {
                id: 'resnet',
                title: 'ResNet & Skip Connections',
                summary: 'Let gradients flow through shortcuts so very deep networks can actually learn.',
                intuition: 'Stacking 50+ conv layers used to hurt accuracy — gradients vanished. ResNet adds a shortcut: y = F(x) + x. The layer now only has to learn the residual (the difference), and gradients flow directly back through the skip. This unlocked 100+ layer networks.',
                formula: 'y = F(x, W) + x',
                code: '// Residual block\nconst out = conv2(relu(conv1(x)));\nconst residual = out.add(x);    // skip',
                takeaway: 'Skip connections = trainable depth.',
            },
            {
                id: 'receptive',
                title: 'Receptive Field',
                summary: 'How much of the original image a deep neuron actually "sees".',
                intuition: 'A neuron in layer 1 sees 3×3 pixels. In layer 2, it sees 5×5 (a 3×3 window of 3×3 patches, minus overlap). Stack enough conv+pool and a single output neuron sees the whole image — how it recognizes "cat" not just "fur".',
                takeaway: 'Depth grows the receptive field; pooling grows it faster.',
            },
        ],
    },
    nlp: {
        icon: '💬',
        heading: 'NLP & Text',
        blurb: 'Turn language into vectors, then mix them with attention.',
        topics: [
            {
                id: 'tokenize',
                title: 'Tokenization',
                summary: 'Break text into IDs the model can actually consume.',
                intuition: 'Models see integers, not words. A tokenizer splits "unhappiness" into sub-word units like ["un", "happi", "ness"] and maps each to an ID. Byte-Pair Encoding (BPE) is the standard: it learns a vocabulary by merging the most common character pairs.',
                code: '// "Hello world!" → [15496, 995, 0]\n// ~50k tokens cover most of English + code.',
                takeaway: 'Subword tokenization handles any word, even typos and new ones.',
            },
            {
                id: 'embeddings',
                title: 'Embeddings',
                summary: 'Each token ID becomes a learned dense vector.',
                intuition: 'Token 15496 ("Hello") maps to a 768-dimensional vector. Vectors for related words end up close in space — so "king − man + woman ≈ queen" is a real thing. The embedding matrix is just a lookup table trained end-to-end with the rest of the model.',
                formula: 'E ∈ ℝ^{V × d}    x_i = E[token_id_i]',
                code: 'tf.layers.embedding({\n  inputDim: 50000,   // vocab\n  outputDim: 768      // embedding size\n})',
                takeaway: 'Geometry of the embedding space = semantic meaning.',
            },
            {
                id: 'attention',
                title: 'Self-Attention',
                summary: 'Every token looks at every other token and mixes in what matters.',
                intuition: 'For each position we compute three vectors: Query, Key, Value. The Query asks "who is relevant to me?", dots with every Key to get scores, softmaxes them, then averages the Values. This is how "it" knows which noun it refers to — the Query for "it" scores high against the Key for that noun.',
                formula: 'Attn(Q,K,V) = softmax(QKᵀ / √d) · V',
                code: '// Simplified:\nconst scores = Q.matMul(K.transpose()).div(Math.sqrt(d));\nconst weights = tf.softmax(scores, -1);\nconst out = weights.matMul(V);',
                takeaway: 'Attention replaces recurrence — every token talks to every other in parallel.',
            },
            {
                id: 'positional',
                title: 'Positional Encoding',
                summary: 'Attention is order-blind, so we inject position directly into the vectors.',
                intuition: 'Self-attention treats a sentence as a bag of tokens — "dog bites man" and "man bites dog" would look identical! Position encodings add a unique pattern per index (sin/cos waves in the original Transformer, learned vectors in GPT). The model can then tell position 3 from position 7.',
                formula: 'PE(pos, 2i)   = sin(pos / 10000^{2i/d})\nPE(pos, 2i+1) = cos(pos / 10000^{2i/d})',
                takeaway: 'Without positional info, transformers can\'t distinguish word order.',
            },
            {
                id: 'transformer',
                title: 'Transformer Block',
                summary: 'The repeating unit: attention + MLP, with residuals and layer-norm.',
                intuition: 'GPT-4, Llama, Claude — all stack the same block ~N times: (1) self-attention mixes tokens, (2) a per-token MLP transforms them, (3) residual connections and LayerNorm keep training stable. That\'s it. The magic is in scale.',
                code: 'x = x + Attn(LN(x));\nx = x + MLP(LN(x));',
                takeaway: 'One block, repeated deeply, learns language.',
            },
        ],
    },
    generative: {
        icon: '🎨',
        heading: 'Generative Models',
        blurb: 'Models that learn the data distribution — so they can sample new examples.',
        topics: [
            {
                id: 'vae',
                title: 'Variational Autoencoders (VAE)',
                summary: 'Encode images to a smooth latent distribution, then decode samples from it.',
                intuition: 'A plain autoencoder compresses x → z → x. A VAE compresses to a *distribution* (μ, σ) over z, forces it toward a unit Gaussian (KL loss), then decodes. Sampling random z from N(0,1) gives you a plausible new image — the latent space is smooth and interpolatable.',
                formula: 'L = E[log p(x|z)] − KL( q(z|x) ‖ N(0,I) )',
                code: '// Encoder outputs mean + log-variance\nconst [mu, logVar] = encoder(x);\nconst z = mu.add(tf.randomNormal(mu.shape).mul(logVar.div(2).exp()));\nconst xHat = decoder(z);',
                takeaway: 'Smooth latent space = controllable generation and interpolation.',
            },
            {
                id: 'gan',
                title: 'Generative Adversarial Networks (GAN)',
                summary: 'Two nets compete: a generator tries to fool a discriminator.',
                intuition: 'Generator G takes noise z and outputs a fake image. Discriminator D tries to tell real from fake. They train in lockstep — as D gets better, G must get better to fool it. At equilibrium, G\'s samples are indistinguishable from real data.',
                formula: 'min_G max_D  E[log D(x)] + E[log(1 − D(G(z)))]',
                code: '// Alternating updates\ntrainDiscriminator(realX, G(z));\ntrainGenerator(G, D);  // via D\'s gradient',
                takeaway: 'Sharp samples, but notoriously unstable to train.',
            },
            {
                id: 'diffusion',
                title: 'Diffusion Models',
                summary: 'Learn to denoise. Repeatedly. Until pure noise becomes an image.',
                intuition: 'Forward process: add Gaussian noise to an image across T timesteps until it\'s pure static. Reverse process: train a U-Net to predict the noise at each step, then subtract it. Start from random noise, denoise T times → a fresh sample. Stable Diffusion and DALL·E work this way.',
                formula: 'Loss = E_{t, x₀, ε} [ ‖ε − ε_θ(x_t, t)‖² ]',
                takeaway: 'Slow at inference (many steps), but state-of-the-art image quality.',
            },
            {
                id: 'autoregressive',
                title: 'Autoregressive (LLMs)',
                summary: 'Predict the next token, one at a time. That\'s the whole objective.',
                intuition: 'GPT-style models factor P(x) = ∏ P(x_t | x_<t). Train to predict the next token given all previous ones. At generation time, sample a token, append it, repeat. This simple objective, at scale, produces coherent text, code, math, dialogue.',
                code: '// Sampling loop\nlet tokens = [bos];\nfor (let i=0; i<200; i++) {\n  const logits = model(tokens);\n  tokens.push(sample(logits[tokens.length-1]));\n}',
                takeaway: 'Next-token prediction at scale is shockingly general.',
            },
            {
                id: 'clip',
                title: 'CLIP & Multi-modal',
                summary: 'Align images and text in one shared embedding space.',
                intuition: 'Train an image encoder and a text encoder so that matched (image, caption) pairs have similar vectors and mismatched pairs are far apart (contrastive loss). The result: you can search images with natural language, and it powers text-to-image models like Stable Diffusion.',
                formula: 'L = −log( exp(sim(i,t)/τ) / Σ_k exp(sim(i,t_k)/τ) )',
                takeaway: 'Cross-modal retrieval from contrastive training.',
            },
        ],
    },
    rl: {
        icon: '🎮',
        heading: 'Reinforcement Learning',
        blurb: 'An agent takes actions, gets rewards, and learns a policy to maximize return.',
        topics: [
            {
                id: 'mdp',
                title: 'Markov Decision Process (MDP)',
                summary: 'The formal game: states, actions, rewards, transitions.',
                intuition: 'An MDP is (S, A, P, R, γ). At each timestep the agent is in state s, picks action a, lands in new state s\' with probability P(s\'|s,a), receives reward R(s,a). γ ∈ [0,1) discounts future rewards so the sum converges. The goal: pick actions to maximize the discounted return.',
                formula: 'G_t = R_{t+1} + γ R_{t+2} + γ² R_{t+3} + ...',
                takeaway: 'All RL problems reduce to solving an MDP.',
            },
            {
                id: 'qlearning',
                title: 'Q-Learning',
                summary: 'Learn a table of Q(s,a) = expected return from doing a in s.',
                intuition: 'Q(s,a) answers "how good is this action from this state?". Update it toward the best future value: the Bellman update. Pick the argmax Q to act greedily. With enough exploration (ε-greedy), Q converges to optimal — works great on tiny state spaces.',
                formula: 'Q(s,a) ← Q(s,a) + α [ r + γ · max_a\' Q(s\',a\') − Q(s,a) ]',
                code: 'Q[s][a] += lr * (r + gamma * Math.max(...Q[sNext]) - Q[s][a]);',
                takeaway: 'Model-free, off-policy, and provably convergent — but tabular only.',
            },
            {
                id: 'dqn',
                title: 'Deep Q-Networks (DQN)',
                summary: 'Replace the Q-table with a neural network. Now you can play Atari.',
                intuition: 'When states are raw pixels, no table fits. DQN uses a CNN to estimate Q(s, ·) for all actions. Two key tricks: (1) replay buffer — store past transitions and train on random mini-batches to break correlation, (2) target network — a frozen copy of Q used as the update target, to stabilize training.',
                takeaway: 'DQN on Atari (DeepMind, 2013) kicked off the deep-RL era.',
            },
            {
                id: 'policygrad',
                title: 'Policy Gradient',
                summary: 'Instead of learning Q, directly learn the policy π(a|s).',
                intuition: 'Parameterize a policy π_θ(a|s) as a neural net. If an action led to high return, increase its probability; if low, decrease. This works naturally for continuous actions (robotics) where argmax Q is impractical. REINFORCE is the simplest version.',
                formula: '∇J(θ) = E[ ∇_θ log π_θ(a|s) · G ]',
                takeaway: 'Works with continuous actions; high variance without baselines.',
            },
            {
                id: 'ppo',
                title: 'Proximal Policy Optimization (PPO)',
                summary: 'The workhorse of modern RL — stable, sample-efficient, easy to tune.',
                intuition: 'Policy gradients can collapse if an update steps too far. PPO clips the policy-change ratio so each update stays within a trust region. Combined with an advantage estimate (GAE), it trains robots, game agents, and — notably — RLHF for LLMs.',
                formula: 'L = E[ min( r_t(θ) · Â,  clip(r_t(θ), 1−ε, 1+ε) · Â ) ]',
                takeaway: 'PPO is the default choice for deep RL in 2024.',
            },
        ],
    },
};

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
        setDatasetParams,
        mode,
        setMode,
        hyperparams,
        updateHyperparams,
        trainingMode,
        setTrainingMode,
        slowDelay,
        setSlowDelay,
        stepState,
        runForwardPass,
        runBackwardPass,
        saveModelToLocal,
        loadModelFromLocal,
        exportModelJSON,
        importModelJSON,
        layerFeatures,
        updateLayerFeatures
    } = props;

    const fileInputRef = useRef(null);
    const [persistStatus, setPersistStatus] = useState(null);
    const [activeCategory, setActiveCategory] = useState('basics');
    const [expandedTopic, setExpandedTopic] = useState(null); // "${cat}:${id}" or null

    const renderLearningCategory = (categoryId) => {
        const cat = TOPIC_LIBRARY[categoryId];
        if (!cat) return null;
        return (
            <div className="category-content">
                <div className="learn-intro">
                    <span className="learn-intro-icon">{cat.icon}</span>
                    <h4>{cat.heading}</h4>
                    <p>{cat.blurb}</p>
                </div>
                <div className="topic-list">
                    {cat.topics.map(topic => {
                        const key = `${categoryId}:${topic.id}`;
                        const isOpen = expandedTopic === key;
                        return (
                            <div key={topic.id} className={`topic-card ${isOpen ? 'open' : ''}`}>
                                <button
                                    type="button"
                                    className="topic-head"
                                    onClick={() => setExpandedTopic(isOpen ? null : key)}
                                    aria-expanded={isOpen}
                                >
                                    <div className="topic-head-text">
                                        <span className="topic-title">{topic.title}</span>
                                        <span className="topic-summary">{topic.summary}</span>
                                    </div>
                                    <span className="topic-chevron" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                                </button>
                                {isOpen && (
                                    <div className="topic-body">
                                        <p className="topic-intuition">{topic.intuition}</p>
                                        {topic.formula && (
                                            <pre className="topic-formula"><code>{topic.formula}</code></pre>
                                        )}
                                        {topic.code && (
                                            <pre className="topic-code"><code>{topic.code}</code></pre>
                                        )}
                                        {topic.takeaway && (
                                            <div className="topic-takeaway">
                                                <strong>Key idea:</strong> {topic.takeaway}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <Link to="/lessons" className="learn-more-link">
                    Open full interactive lessons →
                </Link>
            </div>
        );
    };

    const setStatus = (type, text) => {
        setPersistStatus({ type, text, ts: Date.now() });
        setTimeout(() => setPersistStatus(null), 5000);
    };

    const handleSaveLocal = () => {
        try {
            const snapshot = saveModelToLocal();
            const stamp = snapshot?.timestamp ? new Date(snapshot.timestamp).toLocaleTimeString() : '';
            setStatus('success', `Saved to browser storage ${stamp ? `@ ${stamp}` : ''}`.trim());
        } catch (err) {
            setStatus('error', err.message);
        }
    };

    const handleLoadLocal = () => {
        try {
            const snapshot = loadModelFromLocal();
            if (!snapshot) {
                setStatus('info', 'No saved model found in this browser yet.');
                return;
            }
            setStatus('success', 'Model restored from browser storage.');
        } catch (err) {
            setStatus('error', err.message);
        }
    };

    const handleExportJSON = () => {
        try {
            const json = exportModelJSON();
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `learn-ml-model-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            setStatus('success', 'Model exported as JSON.');
        } catch (err) {
            setStatus('error', err.message);
        }
    };

    const handleImportFile = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Security: Enforce a strict 5MB file size limit to prevent client-side DoS
        // caused by reading extremely large files into memory.
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            setStatus('error', `File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Limit is 5MB.`);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            try {
                importModelJSON(reader.result);
                setStatus('success', `Imported ${file.name}.`);
            } catch (err) {
                setStatus('error', err.message);
            } finally {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        };
        reader.readAsText(file);
    };

    const handleNoiseChange = (value) => {
        setDatasetParams(prev => ({ ...prev, noise: value }));
    };

    const formatLoss = (value) => (typeof value === 'number' ? value.toFixed(4) : '--');

    const renderCategoryContent = () => {
        switch (activeCategory) {
            case 'basics':
                return (
                    <>
                        <div className="section">
                            <h3>Task Mode</h3>
                            <div className="mode-select">
                                <button className={mode === 'simple' ? 'active' : ''} onClick={() => setMode('simple')}>Simple 2D</button>
                                <button className={mode === 'vision' ? 'active' : ''} onClick={() => setMode('vision')}>Vision (Beta)</button>
                            </div>
                        </div>

                        <div className="section">
                            <h3>Training</h3>
                            <div className="stats">
                                <div><Tooltip word="Epoch" />: <span>{epoch}</span></div>
                                <div><Tooltip word="Loss" />: <span>{loss.toFixed(4)}</span></div>
                            </div>
                            <button className={`btn-primary ${isPlaying ? 'stop' : ''}`} onClick={() => setIsPlaying(!isPlaying)}>
                                {isPlaying ? 'Pause' : 'Train'}
                            </button>
                            <div className="train-mode-toggle" role="group">
                                {[{ key: 'continuous', label: 'Continuous' }, { key: 'slow', label: 'Slow-Mo' }, { key: 'step', label: 'Step' }].map(option => (
                                    <button key={option.key} className={trainingMode === option.key ? 'active' : ''} onClick={() => setTrainingMode(option.key)}>
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                            {trainingMode === 'slow' && (
                                <div className="slow-slider">
                                    <label>Frame Delay</label>
                                    <input type="range" min="150" max="2000" step="50" value={slowDelay} onChange={(e) => setSlowDelay(parseInt(e.target.value, 10))} />
                                    <span>{slowDelay}ms</span>
                                </div>
                            )}
                            {trainingMode === 'step' && (
                                <div className="step-panel">
                                    <div className="step-buttons">
                                        <button onClick={runForwardPass} disabled={stepState.busy || stepState.phase !== 'forward'}>Forward Pass</button>
                                        <button onClick={runBackwardPass} disabled={stepState.busy || stepState.phase !== 'backward'}>Backward Pass</button>
                                    </div>
                                    <div className="step-summary">
                                        <div>Forward Loss: {formatLoss(stepState.lastForwardLoss)}</div>
                                        <div>Backward Loss: {formatLoss(stepState.lastBackwardLoss)}</div>
                                    </div>
                                    <p className="step-status">{stepState.status}</p>
                                </div>
                            )}
                        </div>

                        <div className="section">
                            <h3>Architecture</h3>
                            <div className="p-header">
                                <span>Layers</span>
                                <button className="btn-sm" onClick={addLayer}>+ Layer</button>
                            </div>
                            <div className="layers-list">
                                {structure.map((nodes, idx) => {
                                    const isInput = idx === 0;
                                    const isOutput = idx === structure.length - 1;
                                    const isHidden = !isInput && !isOutput;
                                    const featureConfig = layerFeatures?.[idx] || DEFAULT_LAYER_CONTROLS;
                                    return (
                                        <div key={idx} className="layer-item">
                                            <span className="layer-label">{isInput ? 'Input' : isOutput ? 'Output' : `Hidden ${idx}`}</span>
                                            <div className="node-control">
                                                {isHidden && <button onClick={() => updateNodeCount(idx, -1)} aria-label={`Decrease neurons in layer ${idx}`}>-</button>}
                                                <span className="node-count">{nodes}</span>
                                                {isHidden && <button onClick={() => updateNodeCount(idx, 1)} aria-label={`Increase neurons in layer ${idx}`}>+</button>}
                                            </div>
                                            {isHidden && <button className="btn-del" onClick={() => removeLayer(idx)} aria-label={`Remove layer ${idx}`}>×</button>}
                                            {isHidden && (
                                                <div className="layer-advanced">
                                                    <div className="pill-group">
                                                        <button className={`pill-toggle ${featureConfig.batchNorm ? 'active' : ''}`} onClick={() => updateLayerFeatures(idx, { batchNorm: !featureConfig.batchNorm })}>BatchNorm</button>
                                                        <button className={`pill-toggle ${featureConfig.dropout ? 'active' : ''}`} onClick={() => updateLayerFeatures(idx, { dropout: !featureConfig.dropout })}>Dropout</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {mode === 'simple' && (
                            <div className="section">
                                <h3>Data</h3>
                                <div className="data-grid">
                                    {SIMPLE_DATASETS.map(option => (
                                        <button key={option.type} className={`data-card ${datasetParams.type === option.type ? 'active' : ''}`} onClick={() => setDatasetParams(prev => ({ ...prev, type: option.type }))}>
                                            <span className="data-label">{option.label}</span>
                                            <span className="data-hint">{option.hint}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="noise-control">
                                    <label>Noise</label>
                                    <input type="range" min="0" max="0.6" step="0.01" value={datasetParams.noise} onChange={(e) => handleNoiseChange(parseFloat(e.target.value))} />
                                    <span className="noise-value">{datasetParams.noise.toFixed(2)}</span>
                                </div>
                            </div>
                        )}
                    </>
                );
            
            case 'vision':
                return (
                    <>
                        {renderLearningCategory('vision')}
                        <div className="section">
                            <h3>Try It: Vision Mode</h3>
                            <p className="tip">Use Vision mode to draw your own shapes and train a tiny classifier live.</p>
                            <button className={`mode-btn ${mode === 'vision' ? 'active' : ''}`} onClick={() => setMode('vision')}>
                                🎨 Enter Vision Playground
                            </button>
                        </div>
                    </>
                );

            case 'nlp':
                return renderLearningCategory('nlp');

            case 'generative':
                return renderLearningCategory('generative');

            case 'rl':
                return renderLearningCategory('rl');

            case 'training':
                return (
                    <>
                        <div className="section">
                            <h3>Hyperparameters</h3>
                            <div className="hp-grid">
                                <label><Tooltip word="Learning Rate" /></label>
                                <div className="lr-control">
                                    <input type="range" min="0.001" max="0.3" step="0.001" value={hyperparams.learningRate} onChange={(e) => updateHyperparams({ learningRate: parseFloat(e.target.value) })} />
                                    <span>{hyperparams.learningRate}</span>
                                </div>

                                <label><Tooltip word="Activation" /></label>
                                <select value={hyperparams.activation} onChange={(e) => updateHyperparams({ activation: e.target.value })}>
                                    <option value="relu">ReLU</option>
                                    <option value="sigmoid">Sigmoid</option>
                                    <option value="tanh">Tanh</option>
                                    <option value="linear">Linear</option>
                                </select>

                                <label><Tooltip word="Optimizer" /></label>
                                <select value={hyperparams.optimizer} onChange={(e) => updateHyperparams({ optimizer: e.target.value })}>
                                    <option value="adam">Adam</option>
                                    <option value="sgd">SGD</option>
                                </select>

                                <label><Tooltip word="Batch Size" /></label>
                                <div className="lr-control">
                                    <input type="range" min="1" max="128" step="1" value={hyperparams.batchSize || 32} onChange={(e) => updateHyperparams({ batchSize: parseInt(e.target.value, 10) })} />
                                    <span>{hyperparams.batchSize || 32}</span>
                                </div>
                            </div>
                        </div>

                        <div className="section">
                            <h3>Gradient Control</h3>
                            <div className="clip-control">
                                <label>Gradient Clip</label>
                                <input type="range" min="0" max="5" step="0.1" value={hyperparams.gradientClip} onChange={(e) => updateHyperparams({ gradientClip: parseFloat(e.target.value) })} />
                                <span>{hyperparams.gradientClip > 0 ? `${hyperparams.gradientClip.toFixed(1)}×` : 'Off'}</span>
                            </div>
                        </div>

                        <div className="section">
                            <h3>Save & Load</h3>
                            <div className="persist-grid">
                                <button onClick={handleSaveLocal}>Save to Browser</button>
                                <button onClick={handleLoadLocal}>Load from Browser</button>
                                <button onClick={handleExportJSON}>Export JSON</button>
                                <button onClick={() => fileInputRef.current?.click()}>Import JSON</button>
                            </div>
                            <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} style={{ display: 'none' }} />
                            {persistStatus && <div className={`persist-status ${persistStatus.type}`}>{persistStatus.text}</div>}
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="controls-panel">
            <div className="category-tabs">
                {CATEGORIES.map(cat => (
                    <button key={cat.id} className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => setActiveCategory(cat.id)} title={cat.description}>
                        <span className="tab-icon">{cat.icon}</span>
                        <span className="tab-label">{cat.label}</span>
                    </button>
                ))}
            </div>

            <div className="category-view">
                {renderCategoryContent()}
            </div>

            <CodeExport structure={structure} hyperparams={hyperparams} />

            <style>{`
            .controls-panel {
                padding: 15px;
                background: var(--bg-panel);
                border-right: var(--glass-border);
                display: flex;
                flex-direction: column;
                gap: 16px;
                width: 280px;
                height: 100%;
                overflow-y: auto;
            }
            
            .category-tabs {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
            }
            
            .category-tab {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2px;
                padding: 8px 6px;
                background: var(--bg-secondary);
                border: 1px solid transparent;
                border-radius: 8px;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.2s;
                min-width: 70px;
            }
            
            .category-tab:hover {
                border-color: var(--glass-border);
                transform: translateY(-2px);
            }
            
            .category-tab.active {
                background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
                color: var(--bg-primary);
                border-color: transparent;
            }
            
            .tab-icon {
                font-size: 16px;
            }
            
            .tab-label {
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .category-view {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            
            .section h3 {
                margin: 0 0 10px 0;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: var(--text-secondary);
            }
            
            .stats {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                font-family: monospace;
            }
            
            .stats span {
                color: var(--accent-primary);
            }
            
            .btn-primary {
                width: 100%;
                padding: 10px;
                background: var(--accent-secondary);
                color: white;
                border-radius: var(--radius-md);
                font-weight: bold;
                border: none;
                cursor: pointer;
            }
            
            .btn-primary.stop {
                background: var(--accent-danger);
            }
            
            .mode-select {
                display: flex;
                gap: 5px;
            }
            
            .mode-select button {
                flex: 1;
                padding: 8px;
                background: var(--bg-secondary);
                font-size: 11px;
                border: 1px solid var(--glass-border);
                border-radius: 6px;
                color: var(--text-secondary);
                cursor: pointer;
            }
            
            .mode-select button.active {
                background: var(--accent-primary);
                color: #000;
                font-weight: bold;
            }
            
            .train-mode-toggle {
                display: flex;
                gap: 6px;
                margin-top: 10px;
            }
            
            .train-mode-toggle button {
                flex: 1;
                background: var(--bg-secondary);
                color: var(--text-secondary);
                border-radius: 999px;
                font-size: 10px;
                border: 1px solid var(--glass-border);
                padding: 6px 4px;
                cursor: pointer;
            }
            
            .train-mode-toggle button.active {
                background: var(--accent-primary);
                color: #000;
                font-weight: 600;
            }
            
            .slow-slider, .clip-control {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 8px;
                align-items: center;
                font-size: 11px;
                color: var(--text-secondary);
                margin-top: 10px;
            }
            
            .slow-slider span, .clip-control span {
                font-family: monospace;
                color: var(--accent-primary);
            }
            
            .step-panel {
                margin-top: 10px;
                padding: 10px;
                border: 1px dashed var(--glass-border);
                border-radius: var(--radius-md);
                background: rgba(0,0,0,0.15);
            }
            
            .step-buttons {
                display: flex;
                gap: 6px;
                margin-bottom: 8px;
            }
            
            .step-buttons button {
                flex: 1;
                border: 1px solid var(--glass-border);
                border-radius: 6px;
                background: var(--bg-secondary);
                color: var(--text-secondary);
                font-size: 10px;
                padding: 6px;
                cursor: pointer;
            }
            
            .step-summary {
                display: flex;
                justify-content: space-between;
                font-size: 10px;
                color: var(--text-secondary);
                margin-bottom: 4px;
            }
            
            .step-status {
                margin: 0;
                font-size: 9px;
                color: var(--text-secondary);
            }
            
            .p-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
                font-size: 12px;
                color: var(--text-secondary);
            }
            
            .btn-sm {
                font-size: 10px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 4px 8px;
                border-radius: 4px;
                border: none;
                cursor: pointer;
            }
            
            .layer-item {
                background: rgba(0,0,0,0.2);
                padding: 8px;
                border-radius: 6px;
                margin-bottom: 6px;
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
            }
            
            .layer-label {
                font-size: 10px;
                color: var(--text-secondary);
                min-width: 50px;
            }
            
            .node-control {
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .node-control button {
                width: 18px;
                height: 18px;
                background: var(--bg-secondary);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 3px;
                font-size: 12px;
                border: none;
                cursor: pointer;
            }
            
            .node-count {
                font-family: monospace;
                font-size: 11px;
                min-width: 20px;
                text-align: center;
            }
            
            .btn-del {
                color: var(--accent-danger);
                font-size: 14px;
                background: none;
                border: none;
                cursor: pointer;
            }
            
            .layer-advanced {
                width: 100%;
                margin-top: 4px;
            }
            
            .pill-group {
                display: flex;
                gap: 4px;
            }
            
            .pill-toggle {
                flex: 1;
                border-radius: 999px;
                border: 1px solid var(--glass-border);
                background: rgba(255,255,255,0.04);
                color: var(--text-secondary);
                font-size: 9px;
                padding: 4px 6px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .pill-toggle.active {
                background: var(--accent-primary);
                color: #000;
                border-color: transparent;
                font-weight: bold;
            }
            
            .data-grid {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            
            .data-card {
                background: rgba(0,0,0,0.25);
                border: 1px solid transparent;
                border-radius: 8px;
                padding: 8px 10px;
                text-align: left;
                display: flex;
                flex-direction: column;
                gap: 2px;
                color: var(--text-secondary);
                cursor: pointer;
                transition: border-color 0.2s;
            }
            
            .data-card.active {
                border-color: var(--accent-primary);
                color: var(--text-primary);
            }
            
            .data-label {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .data-hint {
                font-size: 9px;
            }
            
            .noise-control {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 6px;
                align-items: center;
                font-size: 11px;
                color: var(--text-secondary);
                margin-top: 10px;
            }
            
            .noise-value {
                font-family: monospace;
                color: var(--accent-primary);
            }
            
            .hp-grid {
                display: grid;
                grid-template-columns: 80px 1fr;
                gap: 6px;
                align-items: center;
                font-size: 11px;
                color: var(--text-secondary);
            }
            
            .lr-control {
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .lr-control span {
                width: 30px;
                text-align: right;
                font-family: monospace;
                font-size: 10px;
            }
            
            .persist-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 6px;
            }
            
            .persist-grid button {
                padding: 8px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                border-radius: 6px;
                font-size: 10px;
                border: 1px solid var(--glass-border);
                cursor: pointer;
            }
            
            .persist-status {
                margin-top: 8px;
                font-size: 10px;
                padding: 6px 8px;
                border-radius: 6px;
                border-left: 3px solid var(--glass-border);
                color: var(--text-secondary);
                background: rgba(0,0,0,0.2);
            }
            
            .persist-status.success {
                border-color: var(--accent-primary);
                color: var(--accent-primary);
            }
            
            .coming-soon {
                text-align: center;
                padding: 20px;
                background: rgba(0,0,0,0.2);
                border-radius: var(--radius-md);
                border: 1px dashed var(--glass-border);
            }
            
            .coming-soon .icon {
                font-size: 32px;
                display: block;
                margin-bottom: 10px;
            }
            
            .coming-soon h4 {
                margin: 0 0 8px 0;
                color: var(--text-primary);
            }
            
            .coming-soon p {
                margin: 0 0 16px 0;
                font-size: 12px;
                color: var(--text-secondary);
            }
            
            .feature-list {
                display: flex;
                flex-direction: column;
                gap: 6px;
                text-align: left;
            }
            
            .feature-item {
                display: flex;
                justify-content: space-between;
                padding: 6px 10px;
                background: var(--bg-secondary);
                border-radius: 6px;
                font-size: 11px;
            }
            
            .feature-item .status {
                color: var(--accent-primary);
                font-size: 9px;
                text-transform: uppercase;
            }
            
            .info-box {
                background: linear-gradient(135deg, rgba(0, 242, 255, 0.1), rgba(255, 0, 242, 0.1));
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-md);
                padding: 12px;
                text-align: center;
            }
            
            .info-box h5 {
                margin: 0 0 6px 0;
                color: var(--accent-primary);
                font-size: 12px;
            }
            
            .info-box p {
                margin: 0;
                font-size: 11px;
                color: var(--text-secondary);
                line-height: 1.4;
            }
            
            .tip {
                font-size: 10px;
                color: var(--text-secondary);
                margin: 0 0 10px 0;
            }
            
            .mode-btn {
                width: 100%;
                padding: 12px;
                background: var(--bg-secondary);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-md);
                color: var(--text-secondary);
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .mode-btn.active, .mode-btn:hover {
                background: var(--accent-primary);
                color: #000;
                border-color: var(--accent-primary);
            }

            /* ----- Learning cards (vision / nlp / generative / rl) ----- */
            .learn-intro {
                text-align: center;
                padding: 14px 12px;
                background: linear-gradient(135deg, rgba(0,242,255,0.08), rgba(112,0,255,0.08));
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-md);
            }
            .learn-intro-icon {
                font-size: 28px;
                display: block;
                margin-bottom: 6px;
            }
            .learn-intro h4 {
                margin: 0 0 4px 0;
                font-size: 14px;
                color: var(--text-primary);
            }
            .learn-intro p {
                margin: 0;
                font-size: 11px;
                color: var(--text-secondary);
                line-height: 1.5;
            }

            .topic-list {
                display: flex;
                flex-direction: column;
                gap: 6px;
                margin-top: 4px;
            }
            .topic-card {
                background: rgba(0,0,0,0.22);
                border: 1px solid var(--glass-border);
                border-radius: 10px;
                overflow: hidden;
                transition: border-color 0.2s;
            }
            .topic-card.open {
                border-color: var(--accent-primary);
            }
            .topic-head {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                padding: 10px 12px;
                background: transparent;
                border: none;
                color: var(--text-primary);
                cursor: pointer;
                text-align: left;
                font-family: inherit;
            }
            .topic-head:hover {
                background: rgba(255,255,255,0.03);
            }
            .topic-head-text {
                display: flex;
                flex-direction: column;
                gap: 2px;
                flex: 1;
                min-width: 0;
            }
            .topic-title {
                font-size: 12px;
                font-weight: 600;
                color: var(--text-primary);
            }
            .topic-summary {
                font-size: 10px;
                color: var(--text-secondary);
                line-height: 1.4;
            }
            .topic-chevron {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(255,255,255,0.06);
                color: var(--accent-primary);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 700;
                flex-shrink: 0;
            }
            .topic-body {
                padding: 4px 12px 12px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                border-top: 1px dashed rgba(255,255,255,0.08);
                margin-top: 2px;
            }
            .topic-intuition {
                margin: 8px 0 0;
                font-size: 11px;
                line-height: 1.55;
                color: var(--text-secondary);
            }
            .topic-formula, .topic-code {
                margin: 0;
                padding: 8px 10px;
                background: rgba(0,0,0,0.35);
                border: 1px solid rgba(0,242,255,0.15);
                border-radius: 6px;
                font-family: ui-monospace, 'SF Mono', Menlo, monospace;
                font-size: 10px;
                line-height: 1.5;
                color: var(--accent-primary);
                overflow-x: auto;
                white-space: pre;
            }
            .topic-code {
                color: var(--text-primary);
                border-color: rgba(255,255,255,0.08);
            }
            .topic-takeaway {
                font-size: 10px;
                line-height: 1.5;
                color: var(--text-secondary);
                padding: 6px 10px;
                background: rgba(0,242,255,0.06);
                border-left: 2px solid var(--accent-primary);
                border-radius: 4px;
            }
            .topic-takeaway strong {
                color: var(--accent-primary);
            }
            .learn-more-link {
                display: block;
                text-align: center;
                padding: 8px;
                margin-top: 4px;
                font-size: 11px;
                color: var(--accent-primary);
                text-decoration: none;
                border: 1px dashed var(--glass-border);
                border-radius: 6px;
                transition: background 0.2s, border-color 0.2s;
            }
            .learn-more-link:hover {
                background: rgba(0,242,255,0.08);
                border-color: var(--accent-primary);
            }
            `}</style>
        </div>
    );
}
