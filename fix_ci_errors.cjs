const fs = require('fs');
const mathContentPath = 'src/engine/mathContent.js';
let content = fs.readFileSync(mathContentPath, 'utf8');

// The string replace removed the visualizer key entirely instead of just the duplicate! Let's re-add it in the correct place for the components that need it.

const toRestore = [
    [/"NeuralNetwork": {/g, '"NeuralNetwork": {\n    visualizer: "NeuralNetwork",'],
    [/"CNN": {/g, '"CNN": {\n    visualizer: "CNN",'],
    [/"Transformer": {/g, '"Transformer": {\n    visualizer: "Transformer",'],
    [/"DecisionTree": {/g, '"DecisionTree": {\n    visualizer: "Tree",'],
    [/"RandomForest": {/g, '"RandomForest": {\n    visualizer: "RandomForest",'],
    [/"KNN": {/g, '"KNN": {\n    visualizer: "KNN",'],
    [/"PCA": {/g, '"PCA": {\n    visualizer: "PCA",'],
    [/"LossFunctions": {/g, '"LossFunctions": {\n    visualizer: "Loss",'],
    [/"ActivationFunctions": {/g, '"ActivationFunctions": {\n    visualizer: "Activation",'],
    [/"Optimizers": {/g, '"Optimizers": {\n    visualizer: "Optimizer",'],
    [/"GradientDescent": {/g, '"GradientDescent": {\n    visualizer: "GradientDescent",'],
    [/"GAN": {/g, '"GAN": {\n    visualizer: "GAN",'],
    [/"Pooling": {/g, '"Pooling": {\n    visualizer: "Pooling",'],
    [/"MDP": {/g, '"MDP": {\n    visualizer: "MDP",'],
    [/"GridWorld": {/g, '"GridWorld": {\n    visualizer: "GridWorld",'],
    [/"DeepQN": {/g, '"DeepQN": {\n    visualizer: "DeepQN",'],
    [/"PPO": {/g, '"PPO": {\n    visualizer: "PPO",'],
    [/"LoRA": {/g, '"LoRA": {\n    visualizer: "LoRA",'],
    [/"LinearRegression": {/g, '"LinearRegression": {\n    visualizer: "LinearRegression",'],
    [/"LogisticRegression": {/g, '"LogisticRegression": {\n    visualizer: "LogisticRegression",'],
    [/"RNN": {/g, '"RNN": {\n    visualizer: "RNN",'],
    [/"LSTM": {/g, '"LSTM": {\n    visualizer: "LSTM",']
];

for (let [search, replace] of toRestore) {
    // If it already has it on the next line, don't add it.
    // We'll just be simple. It's safer to just reset and apply the exact fix.
}
