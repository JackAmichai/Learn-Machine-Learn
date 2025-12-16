export const MATH_TOPICS = {
    "Loss": {
        title: "Loss Functions: Measuring Error",
        content: `
            <p>The <strong>Loss Function</strong> tells the network how "wrong" its predictions are. It calculates a single number (score) that we want to minimize.</p>

            <h4>1. Mean Squared Error (MSE)</h4>
            <p>Used for Regression (predicting values like price). It penalizes large errors more heavily.</p>
            <div class="equation">
                $$ MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2 $$
            </div>
            <ul>
                <li><strong>y</strong>: True value</li>
                <li><strong>ŷ</strong> (y-hat): Predicted value</li>
            </ul>

            <h4>2. Cross Entropy (Categorical)</h4>
            <p>Used for Classification (predicting classes like A or B). It measures the difference between two probability distributions.</p>
            <div class="equation">
                $$ Loss = - \\sum y \\cdot \\log(\\hat{y}) $$
            </div>
            <p>If the true class is 1, and the model predicts 0.1, the log(0.1) is negative and large, resulting in a high loss.</p>
        `
    },
    "Epoch": {
        title: "Epoch & Iterations",
        content: `
            <p>An <strong>Epoch</strong> is one complete pass through the entire training dataset.</p>
            <p>The network doesn't learn everything in one go. It sees the data, updates its weights slightly, and repeats.</p>
            <div class="equation">
                $$ \\text{Total Updates} = \\text{Epochs} \\times \\frac{\\text{Data Size}}{\\text{Batch Size}} $$
            </div>
        `
    },
    "Learning Rate": {
        title: "Gradient Descent & Learning Rate",
        content: `
            <p>To minimize the Loss, we adjust the Weights (<strong>w</strong>). We calculate the <strong>Gradient</strong> (slope) of the loss with respect to each weight.</p>
            <p>The <strong>Learning Rate</strong> ($$\\eta$$) controls how big a step we take.</p>
            <div class="equation">
                $$ w_{new} = w_{old} - \\eta \\cdot \\frac{\\partial Loss}{\\partial w} $$
            </div>
            <ul>
                <li><strong>High LR</strong>: Fast but might overshoot the minimum.</li>
                <li><strong>Low LR</strong>: Precise but slow convergence.</li>
            </ul>
        `
    },
    "Activation": {
        title: "Activation Functions",
        content: `
            <p>Without activation functions, a neural network is just a linear regression model. Activations introduce <strong>non-linearity</strong>, allowing the net to learn complex patterns.</p>

            <h4>Sigmoid</h4>
            <p>Squashes output between 0 and 1. Good for probability.</p>
            <div class="equation">
                $$ \\sigma(x) = \\frac{1}{1 + e^{-x}} $$
            </div>

            <h4>ReLU (Rectified Linear Unit)</h4>
            <p>The most popular modern activation. Fast and solves the "vanishing gradient" problem.</p>
            <div class="equation">
                $$ f(x) = \\max(0, x) $$
            </div>
        `
    },
    "Hidden Layer": {
        title: "Forward Propagation",
        content: `
            <p>The information flows through the network via <strong>Matrix Multiplication</strong>.</p>
            <p>For a layer with weights <strong>W</strong> and biases <strong>b</strong>:</p>
            <div class="equation">
                $$ Z = W \\cdot X + b $$
                $$ A = \\text{Activation}(Z) $$
            </div>
            <p>This <strong>A</strong> (Output of layer) becomes the <strong>X</strong> (Input) for the next layer.</p>
        `
    }
};
