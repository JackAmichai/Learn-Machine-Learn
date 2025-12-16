export const MATH_TOPICS = {
    "Loss": {
        title: "Loss Functions: Measuring Error",
        content: `
            <p>The <strong>Loss Function</strong> tells the network how "wrong" its predictions are. It calculates a single number (score) that we want to minimize.</p>

            <h4>1. Mean Squared Error (MSE)</h4>
            <p>Used for Regression (predicting values like price). It penalizes large errors more heavily.</p>
            <div class="equation">
                MSE = (1/n) × Σ(y - ŷ)²
            </div>
            <ul>
                <li><strong>y</strong>: True value</li>
                <li><strong>ŷ</strong> (y-hat): Predicted value</li>
            </ul>

            <h4>2. Cross Entropy (Categorical)</h4>
            <p>Used for Classification (predicting classes like A or B). It measures the difference between two probability distributions.</p>
            <div class="equation">
                Loss = - Σ y × log(ŷ)
            </div>
            <p>If the true class is 1, and the model predicts 0.1, the log(0.1) is negative and large, resulting in a high loss.</p>
        `,
        interactiveFormulas: [
            {
                name: "Mean Squared Error",
                parts: [
                    { symbol: "(", key: null },
                    { symbol: "y", key: "y_true", name: "True Value", description: "The actual/correct value from your training data" },
                    { symbol: " - ", key: null },
                    { symbol: "ŷ", key: "y_pred", name: "Predicted Value", description: "What the neural network guessed" },
                    { symbol: ")²", key: "squared", name: "Squared", description: "Squaring amplifies large errors and makes all values positive" }
                ],
                variables: [
                    { key: "y_true", symbol: "y", name: "True Value", min: 0, max: 1, step: 0.01, default: 1, decimals: 2 },
                    { key: "y_pred", symbol: "ŷ", name: "Predicted", min: 0, max: 1, step: 0.01, default: 0.3, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const y = get("y_true", 1);
                    const yhat = get("y_pred", 0.3);
                    return Math.pow(y - yhat, 2);
                },
                insights: [
                    "When prediction equals true value, loss = 0 (perfect!)",
                    "Squaring means a difference of 0.5 gives loss of 0.25, but 1.0 gives loss of 1.0 (4x worse)",
                    "This makes the network prioritize fixing big mistakes first"
                ]
            },
            {
                name: "Binary Cross-Entropy",
                parts: [
                    { symbol: "-[", key: null },
                    { symbol: "y", key: "y_true", name: "True Label", description: "1 for positive class, 0 for negative class" },
                    { symbol: "×log(", key: null },
                    { symbol: "ŷ", key: "y_pred", name: "Predicted Prob", description: "Model's confidence (0-1) that this is the positive class" },
                    { symbol: ") + (1-y)×log(1-ŷ)]", key: "complement", name: "Complement Term", description: "Handles the case when true label is 0" }
                ],
                variables: [
                    { key: "y_true", symbol: "y", name: "True Label", min: 0, max: 1, step: 1, default: 1, decimals: 0 },
                    { key: "y_pred", symbol: "ŷ", name: "Predicted", min: 0.01, max: 0.99, step: 0.01, default: 0.8, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const y = get("y_true", 1);
                    const yhat = Math.max(0.001, Math.min(0.999, get("y_pred", 0.8)));
                    return -(y * Math.log(yhat) + (1 - y) * Math.log(1 - yhat));
                },
                insights: [
                    "When y=1 and model predicts 0.99, loss ≈ 0.01 (confident and correct)",
                    "When y=1 and model predicts 0.01, loss ≈ 4.6 (confident but WRONG!)",
                    "The log() function heavily punishes confident wrong predictions"
                ]
            }
        ]
    },
    "Epoch": {
        title: "Epoch & Iterations",
        content: `
            <p>An <strong>Epoch</strong> is one complete pass through the entire training dataset.</p>
            <p>The network doesn't learn everything in one go. It sees the data, updates its weights slightly, and repeats.</p>
            <div class="equation">
                Total Updates = Epochs × (Data Size / Batch Size)
            </div>
            <p><strong>Batch Size</strong> controls how many samples the network sees before each weight update.</p>
        `,
        interactiveFormulas: [
            {
                name: "Training Progress",
                parts: [
                    { symbol: "Updates", key: "updates", name: "Weight Updates", description: "Number of times we adjust the network weights" },
                    { symbol: " = ", key: null },
                    { symbol: "Epochs", key: "epochs", name: "Epochs", description: "Complete passes through all training data" },
                    { symbol: " × (", key: null },
                    { symbol: "N", key: "data_size", name: "Dataset Size", description: "Total number of training samples" },
                    { symbol: " / ", key: null },
                    { symbol: "B", key: "batch_size", name: "Batch Size", description: "Samples processed before each update" },
                    { symbol: ")", key: null }
                ],
                variables: [
                    { key: "epochs", symbol: "E", name: "Epochs", min: 1, max: 100, step: 1, default: 10, decimals: 0 },
                    { key: "data_size", symbol: "N", name: "Data Size", min: 100, max: 10000, step: 100, default: 1000, decimals: 0 },
                    { key: "batch_size", symbol: "B", name: "Batch Size", min: 1, max: 128, step: 1, default: 32, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const epochs = get("epochs", 10);
                    const dataSize = get("data_size", 1000);
                    const batchSize = get("batch_size", 32);
                    return Math.floor(epochs * (dataSize / batchSize));
                },
                insights: [
                    "More epochs = more learning opportunities (but risk overfitting)",
                    "Smaller batch size = more updates but noisier gradients",
                    "Larger batch size = fewer updates but more stable gradients"
                ]
            }
        ]
    },
    "Learning Rate": {
        title: "Gradient Descent & Learning Rate",
        content: `
            <p>To minimize the Loss, we adjust the Weights (<strong>w</strong>). We calculate the <strong>Gradient</strong> (slope) of the loss with respect to each weight.</p>
            <p>The <strong>Learning Rate</strong> (η) controls how big a step we take.</p>
            <div class="equation">
                w_new = w_old - η × (∂Loss/∂w)
            </div>
            <ul>
                <li><strong>High LR</strong>: Fast but might overshoot the minimum.</li>
                <li><strong>Low LR</strong>: Precise but slow convergence.</li>
            </ul>
        `,
        interactiveFormulas: [
            {
                name: "Weight Update Rule",
                parts: [
                    { symbol: "w_new", key: "w_new", name: "New Weight", description: "The updated weight value after learning" },
                    { symbol: " = ", key: null },
                    { symbol: "w_old", key: "w_old", name: "Current Weight", description: "The weight before this update" },
                    { symbol: " - ", key: null },
                    { symbol: "η", key: "lr", name: "Learning Rate", description: "Step size - how much to change the weight" },
                    { symbol: " × ", key: null },
                    { symbol: "∇", key: "gradient", name: "Gradient", description: "Direction and steepness of the loss surface" }
                ],
                variables: [
                    { key: "w_old", symbol: "w", name: "Current Weight", min: -2, max: 2, step: 0.1, default: 1.5, decimals: 2 },
                    { key: "lr", symbol: "η", name: "Learning Rate", min: 0.001, max: 1, step: 0.001, default: 0.1, decimals: 3 },
                    { key: "gradient", symbol: "∇", name: "Gradient", min: -5, max: 5, step: 0.1, default: 2.0, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const wOld = get("w_old", 1.5);
                    const lr = get("lr", 0.1);
                    const grad = get("gradient", 2.0);
                    return wOld - lr * grad;
                },
                insights: [
                    "Positive gradient → weight decreases (moving downhill)",
                    "Negative gradient → weight increases",
                    "Learning rate scales ALL updates - too high causes instability",
                    "Typical values: 0.001 to 0.1 depending on problem"
                ]
            }
        ]
    },
    "Activation": {
        title: "Activation Functions",
        content: `
            <p>Without activation functions, a neural network is just a linear regression model. Activations introduce <strong>non-linearity</strong>, allowing the net to learn complex patterns.</p>

            <h4>Sigmoid</h4>
            <p>Squashes output between 0 and 1. Good for probability.</p>
            <div class="equation">
                σ(x) = 1 / (1 + e^(-x))
            </div>

            <h4>ReLU (Rectified Linear Unit)</h4>
            <p>The most popular modern activation. Fast and solves the "vanishing gradient" problem.</p>
            <div class="equation">
                f(x) = max(0, x)
            </div>
            
            <h4>Tanh</h4>
            <p>Squashes output between -1 and 1. Zero-centered which helps learning.</p>
            <div class="equation">
                tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))
            </div>
        `,
        interactiveFormulas: [
            {
                name: "Sigmoid Activation",
                parts: [
                    { symbol: "σ(x)", key: "output", name: "Output", description: "Value between 0 and 1, like a probability" },
                    { symbol: " = ", key: null },
                    { symbol: "1 / (1 + e", key: "exp", name: "Exponential", description: "Creates the smooth S-curve shape" },
                    { symbol: "^(-x)", key: "neg_x", name: "Negative Input", description: "Negative of input - flips the curve" },
                    { symbol: ")", key: null }
                ],
                variables: [
                    { key: "x", symbol: "x", name: "Input Value", min: -10, max: 10, step: 0.1, default: 0, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const x = get("x", 0);
                    return 1 / (1 + Math.exp(-x));
                },
                insights: [
                    "At x=0, output = 0.5 (middle of the range)",
                    "Large positive x → output approaches 1",
                    "Large negative x → output approaches 0",
                    "Problem: Very large/small inputs have near-zero gradients (vanishing gradient)"
                ]
            },
            {
                name: "ReLU Activation",
                parts: [
                    { symbol: "f(x)", key: "output", name: "Output", description: "Either 0 or the input itself" },
                    { symbol: " = ", key: null },
                    { symbol: "max(", key: "max", name: "Maximum", description: "Takes the larger of two values" },
                    { symbol: "0, x", key: "inputs", name: "Inputs", description: "Zero and the input value" },
                    { symbol: ")", key: null }
                ],
                variables: [
                    { key: "x", symbol: "x", name: "Input Value", min: -5, max: 5, step: 0.1, default: 1, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const x = get("x", 1);
                    return Math.max(0, x);
                },
                insights: [
                    "Positive inputs pass through unchanged",
                    "Negative inputs become 0 (the neuron 'dies' temporarily)",
                    "Super fast to compute: just a comparison!",
                    "Gradient is always 1 for positive inputs - no vanishing gradient"
                ]
            }
        ]
    },
    "Hidden Layer": {
        title: "Forward Propagation",
        content: `
            <p>The information flows through the network via <strong>Matrix Multiplication</strong>.</p>
            <p>For a layer with weights <strong>W</strong> and biases <strong>b</strong>:</p>
            <div class="equation">
                Z = W × X + b
            </div>
            <div class="equation">
                A = Activation(Z)
            </div>
            <p>This <strong>A</strong> (Output of layer) becomes the <strong>X</strong> (Input) for the next layer.</p>
            
            <h4>What Hidden Layers Learn</h4>
            <p>Each hidden layer learns increasingly abstract features:</p>
            <ul>
                <li><strong>Layer 1</strong>: Simple patterns (edges, basic shapes)</li>
                <li><strong>Layer 2</strong>: Combinations of patterns (corners, textures)</li>
                <li><strong>Layer 3+</strong>: High-level concepts (objects, categories)</li>
            </ul>
        `,
        interactiveFormulas: [
            {
                name: "Single Neuron Computation",
                parts: [
                    { symbol: "z", key: "z", name: "Weighted Sum", description: "The raw output before activation" },
                    { symbol: " = ", key: null },
                    { symbol: "w₁x₁", key: "term1", name: "First Term", description: "Weight 1 times Input 1" },
                    { symbol: " + ", key: null },
                    { symbol: "w₂x₂", key: "term2", name: "Second Term", description: "Weight 2 times Input 2" },
                    { symbol: " + ", key: null },
                    { symbol: "b", key: "bias", name: "Bias", description: "Shifts the activation threshold" }
                ],
                variables: [
                    { key: "x1", symbol: "x₁", name: "Input 1", min: -2, max: 2, step: 0.1, default: 1, decimals: 2 },
                    { key: "x2", symbol: "x₂", name: "Input 2", min: -2, max: 2, step: 0.1, default: 0.5, decimals: 2 },
                    { key: "w1", symbol: "w₁", name: "Weight 1", min: -2, max: 2, step: 0.1, default: 0.8, decimals: 2 },
                    { key: "w2", symbol: "w₂", name: "Weight 2", min: -2, max: 2, step: 0.1, default: -0.5, decimals: 2 },
                    { key: "b", symbol: "b", name: "Bias", min: -2, max: 2, step: 0.1, default: 0.1, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const x1 = get("x1", 1);
                    const x2 = get("x2", 0.5);
                    const w1 = get("w1", 0.8);
                    const w2 = get("w2", -0.5);
                    const b = get("b", 0.1);
                    return w1 * x1 + w2 * x2 + b;
                },
                insights: [
                    "Each weight controls how much that input matters",
                    "Positive weight = input and output move together",
                    "Negative weight = input and output move opposite",
                    "Bias allows the neuron to activate even when inputs are 0"
                ]
            }
        ]
    },
    "Optimizer": {
        title: "Optimizers: How Networks Learn",
        content: `
            <p>An <strong>Optimizer</strong> decides how to update weights based on gradients. Different optimizers have different strategies.</p>

            <h4>SGD (Stochastic Gradient Descent)</h4>
            <p>The classic approach: update = -learning_rate × gradient</p>
            <div class="equation">
                w = w - η × ∇Loss
            </div>

            <h4>Adam (Adaptive Moment Estimation)</h4>
            <p>The most popular modern optimizer. It adapts the learning rate for each weight based on historical gradients.</p>
            <ul>
                <li>Tracks the <strong>mean</strong> of recent gradients (momentum)</li>
                <li>Tracks the <strong>variance</strong> of recent gradients (adaptive learning)</li>
                <li>Works well out-of-the-box for most problems</li>
            </ul>
        `,
        interactiveFormulas: [
            {
                name: "SGD with Momentum",
                parts: [
                    { symbol: "v", key: "velocity", name: "Velocity", description: "Accumulated gradient with momentum" },
                    { symbol: " = ", key: null },
                    { symbol: "β", key: "beta", name: "Momentum", description: "How much of previous velocity to keep (0.9 typical)" },
                    { symbol: "v_prev", key: "v_prev", name: "Previous Velocity", description: "Velocity from last step" },
                    { symbol: " + ", key: null },
                    { symbol: "∇", key: "grad", name: "Current Gradient", description: "Gradient at this step" }
                ],
                variables: [
                    { key: "v_prev", symbol: "v_prev", name: "Previous Velocity", min: -2, max: 2, step: 0.1, default: 0.5, decimals: 2 },
                    { key: "beta", symbol: "β", name: "Momentum", min: 0, max: 0.99, step: 0.01, default: 0.9, decimals: 2 },
                    { key: "grad", symbol: "∇", name: "Gradient", min: -2, max: 2, step: 0.1, default: 0.3, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const vPrev = get("v_prev", 0.5);
                    const beta = get("beta", 0.9);
                    const grad = get("grad", 0.3);
                    return beta * vPrev + grad;
                },
                insights: [
                    "Momentum helps escape local minima by building up 'speed'",
                    "High β (0.9) = lots of memory, smooth updates",
                    "Low β (0.5) = more responsive to current gradient",
                    "Like a ball rolling downhill - keeps going even if slope flattens"
                ]
            }
        ]
    },
    "Nodes": {
        title: "Neurons: The Building Blocks",
        content: `
            <p>A <strong>Neuron</strong> (or Node) is the fundamental unit of a neural network. It performs a simple computation:</p>
            <div class="equation">
                output = activation(Σ(weights × inputs) + bias)
            </div>
            
            <h4>What Does a Neuron Do?</h4>
            <ol>
                <li><strong>Receive</strong>: Takes inputs from previous layer (or raw data)</li>
                <li><strong>Weight</strong>: Multiplies each input by a learned weight</li>
                <li><strong>Sum</strong>: Adds all weighted inputs together</li>
                <li><strong>Bias</strong>: Adds a constant (shifts the threshold)</li>
                <li><strong>Activate</strong>: Applies non-linear function</li>
                <li><strong>Output</strong>: Sends result to next layer</li>
            </ol>
        `,
        interactiveFormulas: [
            {
                name: "Neuron Output (with ReLU)",
                parts: [
                    { symbol: "a", key: "output", name: "Activation", description: "Final neuron output after activation" },
                    { symbol: " = ", key: null },
                    { symbol: "ReLU(", key: "relu", name: "ReLU", description: "Rectified Linear Unit activation" },
                    { symbol: "Σwx", key: "weighted_sum", name: "Weighted Sum", description: "Sum of all weight × input products" },
                    { symbol: " + b)", key: "bias", name: "Bias", description: "Learnable threshold shift" }
                ],
                variables: [
                    { key: "w1", symbol: "w₁", name: "Weight 1", min: -2, max: 2, step: 0.1, default: 1.2, decimals: 2 },
                    { key: "x1", symbol: "x₁", name: "Input 1", min: 0, max: 1, step: 0.05, default: 0.7, decimals: 2 },
                    { key: "w2", symbol: "w₂", name: "Weight 2", min: -2, max: 2, step: 0.1, default: -0.8, decimals: 2 },
                    { key: "x2", symbol: "x₂", name: "Input 2", min: 0, max: 1, step: 0.05, default: 0.3, decimals: 2 },
                    { key: "b", symbol: "b", name: "Bias", min: -1, max: 1, step: 0.1, default: -0.2, decimals: 2 }
                ],
                calculate: (vals, get) => {
                    const w1 = get("w1", 1.2);
                    const x1 = get("x1", 0.7);
                    const w2 = get("w2", -0.8);
                    const x2 = get("x2", 0.3);
                    const b = get("b", -0.2);
                    const z = w1 * x1 + w2 * x2 + b;
                    return Math.max(0, z);
                },
                insights: [
                    "More neurons = more patterns the layer can detect",
                    "Weights are the 'knowledge' the network learns",
                    "Negative bias means neuron needs stronger input to activate",
                    "ReLU outputs 0 when weighted sum + bias is negative"
                ]
            }
        ]
    },
    "Layer": {
        title: "Layers: Organizing Neurons",
        content: `
            <p>A <strong>Layer</strong> is a collection of neurons that operate in parallel on the same input.</p>
            
            <h4>Types of Layers</h4>
            <ul>
                <li><strong>Input Layer</strong>: Just holds your data (no computation)</li>
                <li><strong>Hidden Layers</strong>: Where the learning magic happens</li>
                <li><strong>Output Layer</strong>: Produces final predictions</li>
            </ul>
            
            <h4>Dense (Fully Connected) Layers</h4>
            <p>Every neuron connects to every neuron in the previous layer.</p>
            <div class="equation">
                Parameters = (inputs × outputs) + outputs
            </div>
            <p>The "+ outputs" is for the biases (one per output neuron).</p>
        `,
        interactiveFormulas: [
            {
                name: "Layer Parameters Count",
                parts: [
                    { symbol: "P", key: "params", name: "Parameters", description: "Total learnable values in this layer" },
                    { symbol: " = ", key: null },
                    { symbol: "(I × O)", key: "weights", name: "Weights", description: "One weight per input-output connection" },
                    { symbol: " + ", key: null },
                    { symbol: "O", key: "biases", name: "Biases", description: "One bias per output neuron" }
                ],
                variables: [
                    { key: "inputs", symbol: "I", name: "Input Neurons", min: 1, max: 1000, step: 1, default: 100, decimals: 0 },
                    { key: "outputs", symbol: "O", name: "Output Neurons", min: 1, max: 100, step: 1, default: 16, decimals: 0 }
                ],
                calculate: (vals, get) => {
                    const inputs = get("inputs", 100);
                    const outputs = get("outputs", 16);
                    return (inputs * outputs) + outputs;
                },
                insights: [
                    "More neurons = more parameters = more memory & computation",
                    "A 100→16 layer has 1,616 learnable parameters",
                    "Deep narrow networks often work better than shallow wide ones",
                    "Too many parameters can lead to overfitting"
                ]
            }
        ]
    }
};
