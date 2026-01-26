export const MATH_TOPICS = {
    "Loss": {
        title: "Loss Functions: Measuring Error",
        content: `
            <p>The <strong>Loss Function</strong> converts model mistakes into a single number we can minimize. Lower loss means better predictions.</p>

            <h4>Mean Squared Error (MSE)</h4>
            <p>Classic regression loss. Squaring the difference punishes large mistakes strongly.</p>
            <div class="equation">
                MSE = (1 / n) * sum (y - y_hat)^2
            </div>

            <h4>Binary Cross-Entropy</h4>
            <p>Common for two-class classification (like vision mode). Uses logarithms to punish confident wrong answers.</p>
            <div class="equation">
                Loss = - [ y * log(p) + (1 - y) * log(1 - p) ]
            </div>

            <h4>Weighted Cross-Entropy</h4>
            <p>Useful when classes are imbalanced (e.g., rare faults in hardware). You can up-weight important classes.</p>
            <div class="equation">
                Loss = - [ w_pos * y * log(p) + w_neg * (1 - y) * log(1 - p) ]
            </div>
        `,
        interactiveFormulas: [
            {
                name: "Mean Squared Error",
                parts: [
                    { symbol: "(", key: null },
                    { symbol: "y", key: "y_true", name: "True Value", description: "Ground-truth target from the dataset" },
                    { symbol: " - ", key: null },
                    { symbol: "ŷ", key: "y_pred", name: "Predicted Value", description: "Model output after forward pass" },
                    { symbol: ")^2", key: "squared", name: "Square", description: "Amplifies large errors and removes negative signs" }
                ],
                variables: [
                    { key: "y_true", symbol: "y", name: "True Value", min: 0, max: 1, step: 0.01, default: 1, decimals: 2 },
                    { key: "y_pred", symbol: "ŷ", name: "Prediction", min: 0, max: 1, step: 0.01, default: 0.35, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const y = get("y_true", 1);
                    const yhat = get("y_pred", 0.35);
                    return Math.pow(y - yhat, 2);
                },
                insights: [
                    "Loss is zero when prediction matches truth.",
                    "Errors twice as large become four times more costly.",
                    "Sensitive to outliers, so great for smooth regression tasks."
                ]
            },
            {
                name: "Binary Cross-Entropy",
                parts: [
                    { symbol: "- [", key: null },
                    { symbol: "y", key: "y_true", name: "True Label", description: "1 for positive class, 0 for negative class" },
                    { symbol: " * log(", key: null },
                    { symbol: "ŷ", key: "y_pred", name: "Predicted Prob", description: "Model confidence for class = 1" },
                    { symbol: ") + (1 - y) * log(1 - ŷ)]", key: "complement", name: "Second Term", description: "Handles the opposite class" }
                ],
                variables: [
                    { key: "y_true", symbol: "y", name: "True Label", min: 0, max: 1, step: 1, default: 1, decimals: 0 },
                    { key: "y_pred", symbol: "ŷ", name: "Predicted Prob", min: 0.01, max: 0.99, step: 0.01, default: 0.8, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const y = get("y_true", 1);
                    const yhat = Math.max(0.001, Math.min(0.999, get("y_pred", 0.8)));
                    return -(y * Math.log(yhat) + (1 - y) * Math.log(1 - yhat));
                },
                insights: [
                    "Confident wrong answers explode the loss (log of a tiny number).",
                    "Used heavily in digital communications (bit error modeling).",
                    "Probabilities stay inside (0,1) to avoid math issues."
                ]
            },
            {
                name: "Weighted Cross-Entropy",
                parts: [
                    { symbol: "- [", key: null },
                    { symbol: "w_pos", key: "w_pos", name: "Positive Weight", description: "Reward/penalize positive class more" },
                    { symbol: " * y * log(ŷ)", key: "pos_term", name: "Positive Term", description: "Loss if true label is 1" },
                    { symbol: " + ", key: null },
                    { symbol: "w_neg", key: "w_neg", name: "Negative Weight", description: "Reward/penalize negative class" },
                    { symbol: " * (1 - y) * log(1 - ŷ)]", key: "neg_term", name: "Negative Term", description: "Loss if true label is 0" }
                ],
                variables: [
                    { key: "y_true", symbol: "y", name: "True Label", min: 0, max: 1, step: 1, default: 0, decimals: 0 },
                    { key: "y_pred", symbol: "ŷ", name: "Predicted Prob", min: 0.01, max: 0.99, step: 0.01, default: 0.2, decimals: 2 },
                    { key: "w_pos", symbol: "w_pos", name: "Positive Weight", min: 0.1, max: 5, step: 0.1, default: 2, decimals: 2 },
                    { key: "w_neg", symbol: "w_neg", name: "Negative Weight", min: 0.1, max: 5, step: 0.1, default: 1, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const y = get("y_true", 0);
                    const p = Math.max(0.001, Math.min(0.999, get("y_pred", 0.2)));
                    const wp = get("w_pos", 2);
                    const wn = get("w_neg", 1);
                    return -(wp * y * Math.log(p) + wn * (1 - y) * Math.log(1 - p));
                },
                insights: [
                    "Heavily used in anomaly detection (faults vs normal signals).",
                    "Set w_pos high when missing positive cases is very expensive.",
                    "Balanced choices keep both classes equally important."
                ]
            }
        ]
    },
    "Epoch": {
        title: "Epoch, Batch, and Iterations",
        content: `
            <p>An <strong>Epoch</strong> is one full sweep through the training data. Inside each epoch, we chop data into batches so gradients fit in memory.</p>
            <div class="equation">
                Updates = Epochs * (Data Size / Batch Size)
            </div>
            <p>Think of it like re-reading your notes. Each epoch reinforces the pattern but too many can lead to memorization (overfitting).</p>
        `,
        interactiveFormulas: [
            {
                name: "Training Update Counter",
                parts: [
                    { symbol: "Updates", key: "updates", name: "Gradient Updates", description: "How many times weights change" },
                    { symbol: " = ", key: null },
                    { symbol: "Epochs", key: "epochs", name: "Epoch Count", description: "Number of full passes" },
                    { symbol: " * ", key: null },
                    { symbol: "(N / B)", key: "ratio", name: "Mini-batches", description: "How many batches per epoch" }
                ],
                variables: [
                    { key: "epochs", symbol: "E", name: "Epochs", min: 1, max: 200, step: 1, default: 20, decimals: 0 },
                    { key: "data_size", symbol: "N", name: "Data Size", min: 100, max: 50000, step: 100, default: 2000, decimals: 0 },
                    { key: "batch_size", symbol: "B", name: "Batch Size", min: 4, max: 512, step: 4, default: 64, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const epochs = get("epochs", 20);
                    const dataSize = get("data_size", 2000);
                    const batch = Math.max(1, get("batch_size", 64));
                    return Math.floor(epochs * (dataSize / batch));
                },
                insights: [
                    "More epochs or smaller batches = more updates.",
                    "Embedded firmware training often uses tiny batches due to RAM limits.",
                    "Track this number to estimate training time on GPU vs CPU."
                ]
            },
            {
                name: "Epoch Time Estimator",
                parts: [
                    { symbol: "Time", key: "time", name: "Epoch Duration", description: "How long one epoch takes" },
                    { symbol: " = ", key: null },
                    { symbol: "(N / B)", key: "batches", name: "Batches per Epoch", description: "Mini-batches we must process" },
                    { symbol: " * ", key: null },
                    { symbol: "t_batch", key: "batch_time", name: "Batch Time", description: "Seconds per batch" }
                ],
                variables: [
                    { key: "data_size", symbol: "N", name: "Data Size", min: 100, max: 20000, step: 100, default: 5000, decimals: 0 },
                    { key: "batch_size", symbol: "B", name: "Batch Size", min: 16, max: 512, step: 16, default: 128, decimals: 0 },
                    { key: "batch_time", symbol: "t_batch", name: "Batch Seconds", min: 0.001, max: 1, step: 0.001, default: 0.02, decimals: 3 }
                ],
                calculate: (vals, get) => {
                    const N = get("data_size", 5000);
                    const B = Math.max(1, get("batch_size", 128));
                    const t = get("batch_time", 0.02);
                    return (N / B) * t;
                },
                insights: [
                    "Helps size training jobs (e.g., on embedded GPUs).",
                    "Batch time drops on parallel hardware but rises if model is huge.",
                    "Total training time = Epoch Time * number of epochs."
                ]
            }
        ]
    },
    "Learning Rate": {
        title: "Learning Rate and Schedules",
        content: `
            <p>The <strong>Learning Rate</strong> controls the size of weight updates. Too high and the system oscillates, too low and training crawls.</p>
            <p>Engineers often apply schedules so the network takes big steps early and fine-steps later.</p>
            <div class="equation">
                w_new = w_old - lr * gradient
            </div>
        `,
        interactiveFormulas: [
            {
                name: "Instant Weight Update",
                parts: [
                    { symbol: "w_new", key: "w_new", name: "New Weight", description: "Weight after this update" },
                    { symbol: " = ", key: null },
                    { symbol: "w_old", key: "w_old", name: "Current Weight", description: "Weight before update" },
                    { symbol: " - ", key: null },
                    { symbol: "lr", key: "lr", name: "Learning Rate", description: "Step size" },
                    { symbol: " * ", key: null },
                    { symbol: "grad", key: "grad", name: "Gradient", description: "Slope telling which way to move" }
                ],
                variables: [
                    { key: "w_old", symbol: "w", name: "Current Weight", min: -3, max: 3, step: 0.1, default: 1.2, decimals: 2 },
                    { key: "lr", symbol: "lr", name: "Learning Rate", min: 0.0001, max: 1, step: 0.0001, default: 0.05, decimals: 4 },
                    { key: "grad", symbol: "grad", name: "Gradient", min: -5, max: 5, step: 0.1, default: -1.4, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const w = get("w_old", 1.2);
                    const lr = get("lr", 0.05);
                    const g = get("grad", -1.4);
                    return w - lr * g;
                },
                insights: [
                    "Sign of gradient decides direction of movement.",
                    "Doubling lr doubles update magnitude.",
                    "In control systems, lr acts like a proportional gain." 
                ]
            },
            {
                name: "Exponential Decay Schedule",
                parts: [
                    { symbol: "lr_k", key: "lr_k", name: "Current LR", description: "Learning rate at step k" },
                    { symbol: " = ", key: null },
                    { symbol: "lr_0", key: "lr0", name: "Initial LR", description: "Learning rate at start of training" },
                    { symbol: " * ", key: null },
                    { symbol: "decay^k", key: "decay", name: "Decay Factor", description: "Fraction applied per step" }
                ],
                variables: [
                    { key: "lr0", symbol: "lr_0", name: "Initial LR", min: 0.0001, max: 1, step: 0.0001, default: 0.1, decimals: 4 },
                    { key: "decay", symbol: "decay", name: "Decay", min: 0.5, max: 0.999, step: 0.001, default: 0.95, decimals: 3 },
                    { key: "step", symbol: "k", name: "Step", min: 0, max: 200, step: 1, default: 20, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const lr0 = get("lr0", 0.1);
                    const decay = get("decay", 0.95);
                    const step = get("step", 20);
                    return lr0 * Math.pow(decay, step);
                },
                insights: [
                    "Popular in deep learning: fast learning early, stable later.",
                    "Analogous to annealing temperature in metallurgy.",
                    "Helps networks converge without oscillation." 
                ]
            }
        ]
    },
    "Activation": {
        title: "Activation Functions = Signal Shapers",
        content: `
            <p>Activations transform summed inputs before passing them onward. They introduce non-linearity so the network can learn complex patterns and logic gates.</p>

            <h4>Sigmoid</h4>
            <p>Maps any input to 0-1. Mimics a smooth switch. Used for probabilities and in logistic regression.</p>

            <h4>ReLU</h4>
            <p>Outputs max(0, x). Fast, simple, and works well in practice. Similar to diode behavior familiar in circuits.</p>

            <h4>Tanh</h4>
            <p>Outputs -1 to 1. Great for zero-centered data. Common in recurrent networks modeling signals.</p>
        `,
        interactiveFormulas: [
            {
                name: "Sigmoid",
                parts: [
                    { symbol: "σ(x)", key: "sig", name: "Sigmoid Output", description: "Probability-like value between 0 and 1" },
                    { symbol: " = ", key: null },
                    { symbol: "1 / (1 + exp(-x))", key: "formula", name: "Formula", description: "Smooth S-curve" }
                ],
                variables: [
                    { key: "x", symbol: "x", name: "Input", min: -12, max: 12, step: 0.1, default: -2, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const x = get("x", -2);
                    return 1 / (1 + Math.exp(-x));
                },
                insights: [
                    "Near x=0 the curve is steep and gradients are strong.",
                    "Large |x| saturates (gradients vanish).", 
                    "Used in logistic regression and gate activations."
                ]
            },
            {
                name: "ReLU",
                parts: [
                    { symbol: "ReLU(x)", key: "relu", name: "Output", description: "Zero for negative inputs, linear for positive" },
                    { symbol: " = ", key: null },
                    { symbol: "max(0, x)", key: "max", name: "Filter", description: "Keeps positive signal, clips negatives" }
                ],
                variables: [
                    { key: "x", symbol: "x", name: "Input", min: -5, max: 5, step: 0.1, default: 1.5, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const x = get("x", 1.5);
                    return Math.max(0, x);
                },
                insights: [
                    "Acts like an ideal diode (EE analogy).",
                    "Prevents vanishing gradients for positive inputs.",
                    "Negative inputs disable the neuron (sparse activations)."
                ]
            },
            {
                name: "Tanh",
                parts: [
                    { symbol: "tanh(x)", key: "tanh", name: "Output", description: "Scaled between -1 and 1" },
                    { symbol: " = ", key: null },
                    { symbol: "(exp(x) - exp(-x)) / (exp(x) + exp(-x))", key: "formula", name: "Formula", description: "Hyperbolic tangent" }
                ],
                variables: [
                    { key: "x", symbol: "x", name: "Input", min: -5, max: 5, step: 0.1, default: 0.5, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const x = get("x", 0.5);
                    const ex = Math.exp(x);
                    const enx = Math.exp(-x);
                    return (ex - enx) / (ex + enx);
                },
                insights: [
                    "Zero-centered output simplifies optimization.",
                    "Good for modeling analog signals (EE).",
                    "Still suffers from saturation at extremes." 
                ]
            }
        ]
    },
    "Hidden Layer": {
        title: "Hidden Layers = Feature Extractors",
        content: `
            <p>A hidden layer applies weights and biases to inputs, then an activation. Stacking layers lets the network learn hierarchical features (edges -> shapes -> concepts).</p>
            <div class="equation">
                z = W * x + b,   a = activation(z)
            </div>
        `,
        interactiveFormulas: [
            {
                name: "Neuron (2 inputs)",
                parts: [
                    { symbol: "z", key: "z", name: "Pre-Activation", description: "Weighted sum before activation" },
                    { symbol: " = ", key: null },
                    { symbol: "w1*x1", key: "term1", name: "Contribution 1", description: "Input 1 scaled by weight 1" },
                    { symbol: " + ", key: null },
                    { symbol: "w2*x2", key: "term2", name: "Contribution 2", description: "Input 2 scaled by weight 2" },
                    { symbol: " + b", key: "bias", name: "Bias", description: "Baseline signal" }
                ],
                variables: [
                    { key: "x1", symbol: "x1", name: "Input 1", min: -2, max: 2, step: 0.1, default: 0.8, decimals: 2 },
                    { key: "x2", symbol: "x2", name: "Input 2", min: -2, max: 2, step: 0.1, default: -0.4, decimals: 2 },
                    { key: "w1", symbol: "w1", name: "Weight 1", min: -2, max: 2, step: 0.1, default: 1.1, decimals: 2 },
                    { key: "w2", symbol: "w2", name: "Weight 2", min: -2, max: 2, step: 0.1, default: 0.7, decimals: 2 },
                    { key: "b", symbol: "b", name: "Bias", min: -2, max: 2, step: 0.1, default: 0.2, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const x1 = get("x1", 0.8);
                    const x2 = get("x2", -0.4);
                    const w1 = get("w1", 1.1);
                    const w2 = get("w2", 0.7);
                    const b = get("b", 0.2);
                    return w1 * x1 + w2 * x2 + b;
                },
                insights: [
                    "Positive weights amplify inputs, negative weights invert them.",
                    "Bias shifts the activation threshold (like DC offset).",
                    "Hidden layers learn features automatically from data." 
                ]
            },
            {
                name: "Neuron (3 inputs)",
                parts: [
                    { symbol: "z", key: "z3", name: "Pre-Activation", description: "Sum of three weighted inputs" },
                    { symbol: " = ", key: null },
                    { symbol: "w1*x1 + w2*x2 + w3*x3 + b", key: "sum", name: "Weighted Sum", description: "Classic affine transform" }
                ],
                variables: [
                    { key: "x1", symbol: "x1", name: "Input 1", min: -2, max: 2, step: 0.1, default: 0.2, decimals: 2 },
                    { key: "x2", symbol: "x2", name: "Input 2", min: -2, max: 2, step: 0.1, default: 1.2, decimals: 2 },
                    { key: "x3", symbol: "x3", name: "Input 3", min: -2, max: 2, step: 0.1, default: -0.6, decimals: 2 },
                    { key: "w1", symbol: "w1", name: "Weight 1", min: -2, max: 2, step: 0.1, default: 0.5, decimals: 2 },
                    { key: "w2", symbol: "w2", name: "Weight 2", min: -2, max: 2, step: 0.1, default: -1.4, decimals: 2 },
                    { key: "w3", symbol: "w3", name: "Weight 3", min: -2, max: 2, step: 0.1, default: 0.9, decimals: 2 },
                    { key: "b", symbol: "b", name: "Bias", min: -2, max: 2, step: 0.1, default: 0.05, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const x1 = get("x1", 0.2);
                    const x2 = get("x2", 1.2);
                    const x3 = get("x3", -0.6);
                    const w1 = get("w1", 0.5);
                    const w2 = get("w2", -1.4);
                    const w3 = get("w3", 0.9);
                    const b = get("b", 0.05);
                    return w1 * x1 + w2 * x2 + w3 * x3 + b;
                },
                insights: [
                    "Adds expressive power for multi-sensor fusion.",
                    "Common in robotics: combine accelerometer, gyro, magnetometer.",
                    "Hidden layers learn to weight each channel appropriately." 
                ]
            }
        ]
    },
    "Optimizer": {
        title: "Optimizers: Strategies for Weight Updates",
        content: `
            <p>Optimizers decide how gradients adjust weights. Different strategies balance speed, stability, and memory.</p>

            <h4>SGD</h4>
            <p>Stochastic Gradient Descent applies raw gradients with optional momentum.</p>

            <h4>Adam</h4>
            <p>Adaptive Moment Estimation keeps running averages of gradients (m) and squared gradients (v). Very popular in deep learning.</p>
        `,
        interactiveFormulas: [
            {
                name: "SGD with Momentum",
                parts: [
                    { symbol: "v", key: "velocity", name: "Velocity", description: "Momentum term" },
                    { symbol: " = ", key: null },
                    { symbol: "beta * v_prev + grad", key: "update", name: "Update", description: "Blend past movement with current gradient" }
                ],
                variables: [
                    { key: "beta", symbol: "beta", name: "Momentum", min: 0, max: 0.99, step: 0.01, default: 0.9, decimals: 2 },
                    { key: "v_prev", symbol: "v_prev", name: "Prev Velocity", min: -3, max: 3, step: 0.1, default: 0.4, decimals: 2 },
                    { key: "grad", symbol: "grad", name: "Gradient", min: -3, max: 3, step: 0.1, default: -0.8, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const beta = get("beta", 0.9);
                    const vPrev = get("v_prev", 0.4);
                    const grad = get("grad", -0.8);
                    return beta * vPrev + grad;
                },
                insights: [
                    "High beta smooths updates like a low-pass filter.",
                    "Helps jump small valleys in the loss landscape.",
                    "Analogous to momentum in physical systems." 
                ]
            },
            {
                name: "Adam Step",
                parts: [
                    { symbol: "m_hat", key: "mhat", name: "Gradient Mean", description: "Bias-corrected first moment" },
                    { symbol: " / ", key: null },
                    { symbol: "sqrt(v_hat) + eps", key: "vhat", name: "Gradient Variance", description: "Bias-corrected second moment" }
                ],
                variables: [
                    { key: "m", symbol: "m", name: "First Moment", min: -2, max: 2, step: 0.1, default: 0.6, decimals: 2 },
                    { key: "v", symbol: "v", name: "Second Moment", min: 0.0001, max: 4, step: 0.0001, default: 0.5, decimals: 4 },
                    { key: "eps", symbol: "eps", name: "Epsilon", min: 0.000001, max: 0.01, step: 0.000001, default: 0.000001, decimals: 6 },
                    { key: "lr", symbol: "lr", name: "Learning Rate", min: 0.0001, max: 0.1, step: 0.0001, default: 0.001, decimals: 4 }
                ],
                calculate: (vals, get) => {
                    const m = get("m", 0.6);
                    const v = get("v", 0.5);
                    const eps = get("eps", 0.000001);
                    const lr = get("lr", 0.001);
                    return lr * (m / (Math.sqrt(v) + eps));
                },
                insights: [
                    "Adam adapts step size per weight automatically.",
                    "Great when gradients vary wildly across layers.",
                    "Popular default for deep learning frameworks." 
                ]
            }
        ]
    },
    "Nodes": {
        title: "Neurons: Tiny Signal Processors",
        content: `
            <p>Each neuron gathers weighted inputs, adds a bias, and applies an activation. It is analogous to a weighted operational amplifier with a non-linear output stage.</p>
            <div class="equation">
                output = activation( sum(weight_i * input_i) + bias )
            </div>
        `,
        interactiveFormulas: [
            {
                name: "Neuron with ReLU",
                parts: [
                    { symbol: "a", key: "activation", name: "Activation", description: "Neuron output after ReLU" },
                    { symbol: " = ", key: null },
                    { symbol: "ReLU( w1*x1 + w2*x2 + b )", key: "formula", name: "Forward Pass", description: "Weighted sum plus bias" }
                ],
                variables: [
                    { key: "w1", symbol: "w1", name: "Weight 1", min: -3, max: 3, step: 0.1, default: 1.4, decimals: 2 },
                    { key: "w2", symbol: "w2", name: "Weight 2", min: -3, max: 3, step: 0.1, default: -1.1, decimals: 2 },
                    { key: "x1", symbol: "x1", name: "Input 1", min: 0, max: 1, step: 0.05, default: 0.6, decimals: 2 },
                    { key: "x2", symbol: "x2", name: "Input 2", min: 0, max: 1, step: 0.05, default: 0.3, decimals: 2 },
                    { key: "b", symbol: "b", name: "Bias", min: -1, max: 1, step: 0.05, default: 0.05, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const w1 = get("w1", 1.4);
                    const w2 = get("w2", -1.1);
                    const x1 = get("x1", 0.6);
                    const x2 = get("x2", 0.3);
                    const b = get("b", 0.05);
                    const z = w1 * x1 + w2 * x2 + b;
                    return Math.max(0, z);
                },
                insights: [
                    "Positive outputs mean the neuron fired (feature detected).",
                    "Negative weighted sum gets clipped to zero by ReLU.",
                    "In EE terms, this is a weighted summing amplifier with diode." 
                ]
            },
            {
                name: "Neuron Energy",
                parts: [
                    { symbol: "energy", key: "energy", name: "Signal Energy", description: "Sum of squared activation over time" }
                ],
                variables: [
                    { key: "a1", symbol: "a1", name: "Activation t1", min: -1, max: 1, step: 0.1, default: 0.2, decimals: 2 },
                    { key: "a2", symbol: "a2", name: "Activation t2", min: -1, max: 1, step: 0.1, default: 0.4, decimals: 2 },
                    { key: "a3", symbol: "a3", name: "Activation t3", min: -1, max: 1, step: 0.1, default: -0.3, decimals: 2 }],
                calculate: (vals, get) => {
                    const a1 = get("a1", 0.2);
                    const a2 = get("a2", 0.4);
                    const a3 = get("a3", -0.3);
                    return a1 * a1 + a2 * a2 + a3 * a3;
                },
                insights: [
                    "Useful when comparing power consumption of activations.",
                    "Connects neural nets with signal energy concepts in EE.",
                    "Higher energy neurons can dominate downstream layers." 
                ]
            }
        ]
    },
    "Layer": {
        title: "Layers = Parameter Budgets",
        content: `
            <p>Each layer has weights (connections) and biases. The parameter count tells you the memory cost and overfitting risk.</p>
            <div class="equation">
                params = inputs * outputs + outputs
            </div>
        `,
        interactiveFormulas: [
            {
                name: "Dense Layer Parameters",
                parts: [
                    { symbol: "params", key: "params", name: "Parameters", description: "Total trainable numbers" },
                    { symbol: " = ", key: null },
                    { symbol: "inputs * outputs", key: "weights", name: "Weights", description: "Each input connects to all outputs" },
                    { symbol: " + outputs", key: "biases", name: "Biases", description: "One bias per neuron" }
                ],
                variables: [
                    { key: "inputs", symbol: "inputs", name: "Inputs", min: 1, max: 2048, step: 1, default: 100, decimals: 0 },
                    { key: "outputs", symbol: "outputs", name: "Outputs", min: 1, max: 512, step: 1, default: 32, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const inputs = get("inputs", 100);
                    const outputs = get("outputs", 32);
                    return inputs * outputs + outputs;
                },
                insights: [
                    "Helps gauge memory footprint on embedded devices.",
                    "Doubling outputs doubles weights (plus extra biases).",
                    "Keep params in check to avoid overfitting small datasets." 
                ]
            }
        ]
    },
    "Gradient": {
        title: "Gradients: Directions for Learning",
        content: `
            <p>A <strong>Gradient</strong> is a vector of partial derivatives telling us which way the loss increases. The negative gradient points downhill.</p>
            <p>In calculus terms, it is like measuring slope along each axis. In engineering, think of it as sensitivity analysis.</p>
        `,
        interactiveFormulas: [
            {
                name: "Gradient Magnitude",
                parts: [
                    { symbol: "|grad|", key: "mag", name: "Magnitude", description: "Overall steepness" },
                    { symbol: " = ", key: null },
                    { symbol: "sqrt( (dL/dx)^2 + (dL/dy)^2 )", key: "formula", name: "Euclidean Norm", description: "Combines axis slopes" }
                ],
                variables: [
                    { key: "dx", symbol: "dL/dx", name: "Partial wrt x", min: -5, max: 5, step: 0.1, default: 2.1, decimals: 2 },
                    { key: "dy", symbol: "dL/dy", name: "Partial wrt y", min: -5, max: 5, step: 0.1, default: -1.4, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const dx = get("dx", 2.1);
                    const dy = get("dy", -1.4);
                    return Math.sqrt(dx * dx + dy * dy);
                },
                insights: [
                    "Large magnitude means steep slope (fast learning).",
                    "Near-zero gradient indicates a plateau or optimum.",
                    "Direction = atan2(dy, dx) shows where to move weights." 
                ]
            }
        ]
    },
    "Backpropagation": {
        title: "Backpropagation: Chain Rule in Action",
        content: `
            <p>Backpropagation applies the chain rule to send error information backward through the network. Each layer receives an error signal (delta) scaled by the derivative of its activation.</p>
            <div class="equation">
                delta_l = (W_{l+1}^T * delta_{l+1}) * activation'(z_l)
            </div>
            <p>This lets every weight know how it should change to decrease the loss.</p>
        `,
        interactiveFormulas: [
            {
                name: "Layer Delta",
                parts: [
                    { symbol: "delta_l", key: "delta", name: "Layer Error", description: "Error signal for this layer" },
                    { symbol: " = ", key: null },
                    { symbol: "upstream", key: "up", name: "Upstream Error", description: "Error coming from next layer" },
                    { symbol: " * ", key: null },
                    { symbol: "activation'", key: "act", name: "Activation Derivative", description: "Slope of activation" }
                ],
                variables: [
                    { key: "up", symbol: "upstream", name: "Upstream Error", min: -3, max: 3, step: 0.1, default: 0.8, decimals: 2 },
                    { key: "deriv", symbol: "activation'", name: "Derivative", min: 0, max: 1, step: 0.05, default: 0.25, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const up = get("up", 0.8);
                    const d = get("deriv", 0.25);
                    return up * d;
                },
                insights: [
                    "ReLU derivative is 1 when neuron is active, 0 otherwise.",
                    "Sigmoid derivative shrinks when neuron saturates.",
                    "If derivative is zero, learning stalls (dead neuron)." 
                ]
            }
        ]
    },
    "Softmax": {
        title: "Softmax: Probabilities from Logits",
        content: `
            <p>The <strong>Softmax</strong> function converts raw scores (logits) into probabilities that sum to 1. Perfect for multi-class classification.</p>
            <div class="equation">
                softmax(z_i) = exp(z_i) / sum_j exp(z_j)
            </div>
            <p>Subtracting the max logit improves numerical stability (avoid overflow).</p>
        `,
        interactiveFormulas: [
            {
                name: "Softmax Probabilities",
                parts: [
                    { symbol: "softmax(z)", key: "soft", name: "Probabilities", description: "Distribution over classes" }
                ],
                variables: [
                    { key: "z1", symbol: "z1", name: "Logit 1", min: -5, max: 5, step: 0.1, default: 1.0, decimals: 2 },
                    { key: "z2", symbol: "z2", name: "Logit 2", min: -5, max: 5, step: 0.1, default: -0.5, decimals: 2 },
                    { key: "z3", symbol: "z3", name: "Logit 3", min: -5, max: 5, step: 0.1, default: 0.2, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const z1 = get("z1", 1.0);
                    const z2 = get("z2", -0.5);
                    const z3 = get("z3", 0.2);
                    const max = Math.max(z1, z2, z3);
                    const exp1 = Math.exp(z1 - max);
                    const exp2 = Math.exp(z2 - max);
                    const exp3 = Math.exp(z3 - max);
                    const sum = exp1 + exp2 + exp3;
                    const probs = [exp1 / sum, exp2 / sum, exp3 / sum];
                    return probs.map(p => p.toFixed(3)).join(', ');
                },
                insights: [
                    "Subtracting max logit prevents overflow (numerical trick).",
                    "Temperature scaling can make distribution sharper or softer.",
                    "Softmax shows confidence: dominant class has highest probability." 
                ]
            }
        ]
    },
    "Regularization": {
        title: "Regularization: Guard Against Overfitting",
        content: `
            <p>Regularization adds a penalty to large weights so the model generalizes better.</p>

            <h4>L1 (Lasso)</h4>
            <p>Encourages sparse weights (many zeros). Useful for feature selection.</p>

            <h4>L2 (Ridge)</h4>
            <p>Penalizes large weights smoothly. Keeps signals small, similar to resistor networks limiting current.</p>
        `,
        interactiveFormulas: [
            {
                name: "L1 Penalty",
                parts: [
                    { symbol: "lambda", key: "lambda", name: "Strength", description: "How much regularization to apply" },
                    { symbol: " * sum |w|", key: "sum", name: "Absolute Sum", description: "Magnitude of weights" }
                ],
                variables: [
                    { key: "lambda", symbol: "lambda", name: "Lambda", min: 0, max: 1, step: 0.01, default: 0.1, decimals: 2 },
                    { key: "w1", symbol: "w1", name: "w1", min: -2, max: 2, step: 0.1, default: 0.8, decimals: 2 },
                    { key: "w2", symbol: "w2", name: "w2", min: -2, max: 2, step: 0.1, default: -0.6, decimals: 2 },
                    { key: "w3", symbol: "w3", name: "w3", min: -2, max: 2, step: 0.1, default: 0.3, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const lambda = get("lambda", 0.1);
                    const w1 = Math.abs(get("w1", 0.8));
                    const w2 = Math.abs(get("w2", -0.6));
                    const w3 = Math.abs(get("w3", 0.3));
                    return lambda * (w1 + w2 + w3);
                },
                insights: [
                    "Pushes small weights to zero (feature selection).",
                    "Sparse models run faster on hardware (good for edge devices).",
                    "Too much L1 causes underfitting." 
                ]
            },
            {
                name: "L2 Penalty",
                parts: [
                    { symbol: "lambda", key: "lambda2", name: "Strength", description: "Regularization coefficient" },
                    { symbol: " * sum w^2", key: "sum2", name: "Squared Sum", description: "Energy of weights" }
                ],
                variables: [
                    { key: "lambda", symbol: "lambda", name: "Lambda", min: 0, max: 1, step: 0.01, default: 0.01, decimals: 2 },
                    { key: "w1", symbol: "w1", name: "w1", min: -2, max: 2, step: 0.1, default: 0.5, decimals: 2 },
                    { key: "w2", symbol: "w2", name: "w2", min: -2, max: 2, step: 0.1, default: -1.0, decimals: 2 },
                    { key: "w3", symbol: "w3", name: "w3", min: -2, max: 2, step: 0.1, default: 0.1, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const lambda = get("lambda", 0.01);
                    const w1 = get("w1", 0.5);
                    const w2 = get("w2", -1.0);
                    const w3 = get("w3", 0.1);
                    return lambda * (w1 * w1 + w2 * w2 + w3 * w3);
                },
                insights: [
                    "Keeps weights small to avoid exploding outputs.",
                    "Equivalent to adding resistors limiting current in analog circuits.",
                    "Standard in ridge regression and weight decay." 
                ]
            }
        ]
    },
    "Convolution": {
        title: "Convolution: Sliding Dot Products",
        content: `
            <p>Convolution layers slide a small filter (kernel) across the input. Each position multiplies overlapping values and sums them.</p>
            <p>In vision mode, think of kernels detecting edges or corners. In EE, it is similar to FIR filters.</p>
        `,
        interactiveFormulas: [
            {
                name: "3x3 Filter Dot Product",
                parts: [
                    { symbol: "sum kernel(i,j) * patch(i,j)", key: "sum", name: "Dot Product", description: "Weighted sum of overlapping region" }
                ],
                variables: [
                    { key: "k1", symbol: "k1", name: "Kernel 1", min: -2, max: 2, step: 0.1, default: -1, decimals: 1 },
                    { key: "k2", symbol: "k2", name: "Kernel 2", min: -2, max: 2, step: 0.1, default: 0, decimals: 1 },
                    { key: "k3", symbol: "k3", name: "Kernel 3", min: -2, max: 2, step: 0.1, default: 1, decimals: 1 },
                    { key: "p1", symbol: "p1", name: "Pixel 1", min: 0, max: 1, step: 0.05, default: 0.2, decimals: 2 },
                    { key: "p2", symbol: "p2", name: "Pixel 2", min: 0, max: 1, step: 0.05, default: 0.6, decimals: 2 },
                    { key: "p3", symbol: "p3", name: "Pixel 3", min: 0, max: 1, step: 0.05, default: 0.8, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const k1 = get("k1", -1);
                    const k2 = get("k2", 0);
                    const k3 = get("k3", 1);
                    const p1 = get("p1", 0.2);
                    const p2 = get("p2", 0.6);
                    const p3 = get("p3", 0.8);
                    return k1 * p1 + k2 * p2 + k3 * p3;
                },
                insights: [
                    "Edge detector kernels look like [-1, 0, 1].",
                    "Same concept as sliding window multiply-and-accumulate (MAC).",
                    "Hardware accelerators implement this efficiently." 
                ]
            }
        ]
    },
    "Signal Processing": {
        title: "Signals and Frequency",
        content: `
            <p>Neural networks can process signals too. Concepts like signal energy and frequency response connect EE fundamentals with machine learning.</p>
            <div class="equation">
                Energy = sum x(t)^2,   SNR = 10 * log10(signal / noise)
            </div>
        `,
        interactiveFormulas: [
            {
                name: "Signal-to-Noise Ratio",
                parts: [
                    { symbol: "SNR", key: "snr", name: "Signal to Noise", description: "Ratio in decibels" },
                    { symbol: " = 10 * log10(signal / noise)", key: "formula", name: "Formula", description: "Power ratio in dB" }
                ],
                variables: [
                    { key: "signal", symbol: "signal", name: "Signal Power", min: 0.01, max: 10, step: 0.01, default: 1, decimals: 2 },
                    { key: "noise", symbol: "noise", name: "Noise Power", min: 0.001, max: 5, step: 0.001, default: 0.1, decimals: 3 }
                ],
                calculate: (vals, get) => {
                    const signal = get("signal", 1);
                    const noise = Math.max(0.0001, get("noise", 0.1));
                    return 10 * Math.log10(signal / noise);
                },
                insights: [
                    "Higher SNR means clearer signal (less noise).",
                    "In ML, data augmentation often improves effective SNR.",
                    "Helps compare sensor quality for embedded systems." 
                ]
            }
        ]
    },
    "Vectors & Matrices": {
        title: "Vectors & Matrices: Lego Bricks of Vision Models",
        content: `
            <p><strong>Vectors</strong> line up numbers in a single column. In vision mode the 10×10 canvas becomes a 100×1 vector before entering the dense layers.</p>
            <p><strong>Matrices</strong> arrange those vectors into 2D grids so filters can slide over rows and columns. Understanding their norms and determinants explains why scaling or rotating images affects activations.</p>
        `,
        interactiveFormulas: [
            {
                name: "Vector Magnitude (3D)",
                parts: [
                    { symbol: "|v|", key: "mag", name: "Magnitude", description: "Length of the vector" },
                    { symbol: " = ", key: null },
                    { symbol: "sqrt(x^2 + y^2 + z^2)", key: "formula", name: "Euclidean Norm", description: "Distance from origin" }
                ],
                variables: [
                    { key: "vx", symbol: "x", name: "x", min: -5, max: 5, step: 0.1, default: 1.2, decimals: 1 },
                    { key: "vy", symbol: "y", name: "y", min: -5, max: 5, step: 0.1, default: -0.4, decimals: 1 },
                    { key: "vz", symbol: "z", name: "z", min: -5, max: 5, step: 0.1, default: 2.3, decimals: 1 }
                ],
                calculate: (vals, get) => {
                    const x = get("vx", 1.2);
                    const y = get("vy", -0.4);
                    const z = get("vz", 2.3);
                    return Math.sqrt(x * x + y * y + z * z);
                },
                insights: [
                    "Magnitude shows how strong a pixel gradient or feature vector is.",
                    "Normalizing vectors (dividing by |v|) stabilizes training.",
                    "Longer vectors mean brighter strokes on the vision canvas." 
                ]
            },
            {
                name: "2x2 Determinant",
                parts: [
                    { symbol: "det(A)", key: "det", name: "Determinant", description: "Area scale factor" },
                    { symbol: " = ", key: null },
                    { symbol: "a11*a22 - a12*a21", key: "formula", name: "Formula", description: "Signed area" }
                ],
                variables: [
                    { key: "a11", symbol: "a11", name: "a11", min: -3, max: 3, step: 0.1, default: 1, decimals: 1 },
                    { key: "a12", symbol: "a12", name: "a12", min: -3, max: 3, step: 0.1, default: 0.5, decimals: 1 },
                    { key: "a21", symbol: "a21", name: "a21", min: -3, max: 3, step: 0.1, default: -0.3, decimals: 1 },
                    { key: "a22", symbol: "a22", name: "a22", min: -3, max: 3, step: 0.1, default: 2, decimals: 1 }
                ],
                calculate: (vals, get) => {
                    const a11 = get("a11", 1);
                    const a12 = get("a12", 0.5);
                    const a21 = get("a21", -0.3);
                    const a22 = get("a22", 2);
                    return a11 * a22 - a12 * a21;
                },
                insights: [
                    "det(A)=0 means the matrix squashes space—information is lost.",
                    "Positive determinant preserves orientation; negative flips it.",
                    "Useful for reasoning about data augmentation transforms." 
                ]
            }
        ]
    },
    "Dot Product": {
        title: "Dot Product: Similarity Meter",
        content: `
            <p>The dot product measures how aligned two vectors are. In the vision model it compares your drawn strokes with learned weight vectors.</p>
            <p>Geometry version: a · b = |a||b|cosθ. Component version: sum of element-wise products. Both explain why brighter pixels boost certain neurons.</p>
        `,
        interactiveFormulas: [
            {
                name: "Component Form",
                parts: [
                    { symbol: "a · b", key: "dot", name: "Dot Product", description: "Similarity score" },
                    { symbol: " = ", key: null },
                    { symbol: "ax*bx + ay*by + az*bz", key: "formula", name: "Sum of products", description: "Multiply, then add" }
                ],
                variables: [
                    { key: "ax", symbol: "ax", name: "a_x", min: -3, max: 3, step: 0.1, default: 0.8, decimals: 1 },
                    { key: "ay", symbol: "ay", name: "a_y", min: -3, max: 3, step: 0.1, default: 0.4, decimals: 1 },
                    { key: "az", symbol: "az", name: "a_z", min: -3, max: 3, step: 0.1, default: 0, decimals: 1 },
                    { key: "bx", symbol: "bx", name: "b_x", min: -3, max: 3, step: 0.1, default: 1.1, decimals: 1 },
                    { key: "by", symbol: "by", name: "b_y", min: -3, max: 3, step: 0.1, default: -0.6, decimals: 1 },
                    { key: "bz", symbol: "bz", name: "b_z", min: -3, max: 3, step: 0.1, default: 0.2, decimals: 1 }
                ],
                calculate: (vals, get) => {
                    const ax = get("ax", 0.8);
                    const ay = get("ay", 0.4);
                    const az = get("az", 0);
                    const bx = get("bx", 1.1);
                    const by = get("by", -0.6);
                    const bz = get("bz", 0.2);
                    return ax * bx + ay * by + az * bz;
                },
                insights: [
                    "Positive values mean vectors look in the same direction.",
                    "Zero indicates orthogonal features (independent information).",
                    "Used everywhere: attention layers, cosine similarity, projections." 
                ]
            },
            {
                name: "Angle Form",
                parts: [
                    { symbol: "a · b", key: "dot", name: "Dot Product", description: "Projection of a onto b" },
                    { symbol: " = |a||b|cos(θ)", key: "angle", name: "Angle", description: "Controls sign and magnitude" }
                ],
                variables: [
                    { key: "magA", symbol: "|a|", name: "|a|", min: 0, max: 5, step: 0.1, default: 2, decimals: 1 },
                    { key: "magB", symbol: "|b|", name: "|b|", min: 0, max: 5, step: 0.1, default: 1.5, decimals: 1 },
                    { key: "theta", symbol: "θ", name: "Angle (deg)", min: 0, max: 180, step: 1, default: 35, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const a = get("magA", 2);
                    const b = get("magB", 1.5);
                    const theta = get("theta", 35) * Math.PI / 180;
                    return a * b * Math.cos(theta);
                },
                insights: [
                    "θ=0° ⇒ cosθ=1 ⇒ maximum reinforcement between vectors.",
                    "θ=90° ⇒ dot product = 0 ⇒ no influence.",
                    "θ>90° ⇒ negative dot ⇒ inhibitory effect (important for filters)." 
                ]
            }
        ]
    },
    "Matrix Multiplication": {
        title: "Matrix Multiplication: Layer Engine",
        content: `
            <p>Dense layers are nothing but matrix multiplications. A weight matrix multiplies the input vector to produce activations for the next layer.</p>
            <p>Vision models flatten 2D patches into vectors, multiply by weights, then reshape again. Tracking dimensions keeps tensor shapes valid.</p>
        `,
        interactiveFormulas: [
            {
                name: "2x2 × 2x2",
                parts: [
                    { symbol: "C = A·B", key: "product", name: "Product", description: "Resulting matrix" }
                ],
                variables: [
                    { key: "a11", symbol: "a11", name: "A11", min: -3, max: 3, step: 0.1, default: 1, decimals: 1 },
                    { key: "a12", symbol: "a12", name: "A12", min: -3, max: 3, step: 0.1, default: 0.5, decimals: 1 },
                    { key: "a21", symbol: "a21", name: "A21", min: -3, max: 3, step: 0.1, default: -0.8, decimals: 1 },
                    { key: "a22", symbol: "a22", name: "A22", min: -3, max: 3, step: 0.1, default: 2.2, decimals: 1 },
                    { key: "b11", symbol: "b11", name: "B11", min: -3, max: 3, step: 0.1, default: 0.7, decimals: 1 },
                    { key: "b12", symbol: "b12", name: "B12", min: -3, max: 3, step: 0.1, default: -1, decimals: 1 },
                    { key: "b21", symbol: "b21", name: "B21", min: -3, max: 3, step: 0.1, default: 0.3, decimals: 1 },
                    { key: "b22", symbol: "b22", name: "B22", min: -3, max: 3, step: 0.1, default: 1.4, decimals: 1 }
                ],
                calculate: (vals, get) => {
                    const a11 = get("a11", 1); const a12 = get("a12", 0.5);
                    const a21 = get("a21", -0.8); const a22 = get("a22", 2.2);
                    const b11 = get("b11", 0.7); const b12 = get("b12", -1);
                    const b21 = get("b21", 0.3); const b22 = get("b22", 1.4);
                    const c11 = a11 * b11 + a12 * b21;
                    const c12 = a11 * b12 + a12 * b22;
                    const c21 = a21 * b11 + a22 * b21;
                    const c22 = a21 * b12 + a22 * b22;
                    return `[[${c11.toFixed(2)}, ${c12.toFixed(2)}], [${c21.toFixed(2)}, ${c22.toFixed(2)}]]`;
                },
                insights: [
                    "Row of A interacts with column of B—match inner dimensions.",
                    "Each output element is a dot product (MAC operation).",
                    "Visualize dense layer weights as filters applied to full vectors." 
                ]
            },
            {
                name: "MAC Counter",
                parts: [
                    { symbol: "MACs", key: "macs", name: "Multiply-Accumulates", description: "Work required" },
                    { symbol: " = rows * cols * shared", key: "formula", name: "Cost", description: "Operation count" }
                ],
                variables: [
                    { key: "rows", symbol: "rows", name: "Rows", min: 1, max: 512, step: 1, default: 64, decimals: 0 },
                    { key: "cols", symbol: "cols", name: "Cols", min: 1, max: 512, step: 1, default: 32, decimals: 0 },
                    { key: "shared", symbol: "shared", name: "Shared Dim", min: 1, max: 1024, step: 1, default: 100, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const rows = get("rows", 64);
                    const cols = get("cols", 32);
                    const shared = get("shared", 100);
                    return rows * cols * shared;
                },
                insights: [
                    "MACs correlate with latency and power on embedded hardware.",
                    "Reducing shared dimension (inputs) cuts cost dramatically.",
                    "Depthwise separable convolutions lower MACs by splitting dims." 
                ]
            }
        ]
    },
    "Tensors": {
        title: "Tensors: Multi-Dimensional Arrays",
        content: `
            <p>Tensors generalize scalars (rank 0), vectors (rank 1), and matrices (rank 2). Vision models juggle rank-3 (H×W×C) and rank-4 (Batch×Channel×H×W) tensors constantly.</p>
            <p>Keeping track of tensor volume prevents shape mismatches when reshaping, flattening, or feeding data between convolutional and dense layers.</p>
        `,
        interactiveFormulas: [
            {
                name: "Tensor Volume",
                parts: [
                    { symbol: "elements", key: "elements", name: "Element Count", description: "Total scalars" },
                    { symbol: " = d1 * d2 * d3", key: "product", name: "Dimensions", description: "Multiply each axis" }
                ],
                variables: [
                    { key: "d1", symbol: "d1", name: "Dim 1", min: 1, max: 64, step: 1, default: 10, decimals: 0 },
                    { key: "d2", symbol: "d2", name: "Dim 2", min: 1, max: 64, step: 1, default: 10, decimals: 0 },
                    { key: "d3", symbol: "d3", name: "Dim 3", min: 1, max: 32, step: 1, default: 1, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const d1 = get("d1", 10);
                    const d2 = get("d2", 10);
                    const d3 = get("d3", 1);
                    return d1 * d2 * d3;
                },
                insights: [
                    "A 10×10×1 tensor matches the vision canvas grid.",
                    "Batching multiplies the count further (Batch×H×W×C).",
                    "Reshape only works when new dims keep the same volume." 
                ]
            },
            {
                name: "Tensor Memory Budget",
                parts: [
                    { symbol: "bytes", key: "bytes", name: "Memory", description: "RAM requirement" },
                    { symbol: " = height * width * channels * bytes/value", key: "formula", name: "Footprint", description: "Size on device" }
                ],
                variables: [
                    { key: "height", symbol: "H", name: "Height", min: 1, max: 224, step: 1, default: 10, decimals: 0 },
                    { key: "width", symbol: "W", name: "Width", min: 1, max: 224, step: 1, default: 10, decimals: 0 },
                    { key: "channels", symbol: "C", name: "Channels", min: 1, max: 64, step: 1, default: 1, decimals: 0 },
                    { key: "bytesPer", symbol: "bytes", name: "Bytes/Value", min: 1, max: 8, step: 1, default: 4, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const h = get("height", 10);
                    const w = get("width", 10);
                    const c = get("channels", 1);
                    const bytesPer = get("bytesPer", 4);
                    return h * w * c * bytesPer;
                },
                insights: [
                    "Great for planning deployments on microcontrollers.",
                    "Lower precision (2 bytes) halves the memory instantly.",
                    "Extra channels (RGB) triple the footprint—keep an eye on it." 
                ]
            }
        ]
    },
    "Classification Metrics": {
        title: "Classification Metrics: Measuring Success",
        content: `
            <p><strong>Accuracy</strong> is just the start. To truly understand a classifier's performance, especially on imbalanced data, we need <strong>Precision</strong>, <strong>Recall</strong>, and the <strong>F1 Score</strong>.</p>
            <div class="equation">
                Accuracy = (TP + TN) / Total
            </div>
            <div class="equation">
                Precision = TP / (TP + FP)
            </div>
            <div class="equation">
                Recall = TP / (TP + FN)
            </div>
        `,
        interactiveFormulas: [
            {
                name: "Accuracy Calculator",
                parts: [
                    { symbol: "Acc", key: "acc", name: "Accuracy", description: "Overall correct predictions" },
                    { symbol: " = ", key: null },
                    { symbol: "(TP + TN) / Total", key: "formula", name: "Formula", description: "Ratio of correct guesses" }
                ],
                variables: [
                    { key: "TP", symbol: "TP", name: "True Positives", min: 0, max: 100, step: 1, default: 45, decimals: 0 },
                    { key: "TN", symbol: "TN", name: "True Negatives", min: 0, max: 100, step: 1, default: 40, decimals: 0 },
                    { key: "FP", symbol: "FP", name: "False Positives", min: 0, max: 100, step: 1, default: 10, decimals: 0 },
                    { key: "FN", symbol: "FN", name: "False Negatives", min: 0, max: 100, step: 1, default: 5, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const TP = get("TP", 45);
                    const TN = get("TN", 40);
                    const FP = get("FP", 10);
                    const FN = get("FN", 5);
                    const total = TP + TN + FP + FN;
                    return total > 0 ? (TP + TN) / total : 0;
                },
                insights: [
                    "High accuracy can be misleading if classes are imbalanced.",
                    "Example: 99% accuracy is easy if 99% of samples are negative.",
                    "Always look at confusion matrix for the full picture."
                ]
            },
            {
                name: "F1 Score",
                parts: [
                    { symbol: "F1", key: "f1", name: "F1 Score", description: "Harmonic mean of Precision and Recall" },
                    { symbol: " = ", key: null },
                    { symbol: "2 * (P * R) / (P + R)", key: "formula", name: "Formula", description: "Balances false positives and false negatives" }
                ],
                variables: [
                    { key: "TP", symbol: "TP", name: "True Positives", min: 0, max: 100, step: 1, default: 30, decimals: 0 },
                    { key: "FP", symbol: "FP", name: "False Positives", min: 0, max: 100, step: 1, default: 10, decimals: 0 },
                    { key: "FN", symbol: "FN", name: "False Negatives", min: 0, max: 100, step: 1, default: 20, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const TP = get("TP", 30);
                    const FP = get("FP", 10);
                    const FN = get("FN", 20);

                    const precision = TP + FP > 0 ? TP / (TP + FP) : 0;
                    const recall = TP + FN > 0 ? TP / (TP + FN) : 0;

                    if (precision + recall === 0) return 0;
                    return 2 * (precision * recall) / (precision + recall);
                },
                insights: [
                    "F1 is lower than accuracy if P or R is low.",
                    "Perfect F1 (1.0) requires perfect Precision AND Recall.",
                    "Crucial metric for medical diagnosis or fraud detection."
                ]
            }
        ]
    }
};
