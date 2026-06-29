import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

const regexes = [
    [/visualizer: "NeuralNetwork",\n  \},\n  "MathIntro"/, '},\n  "MathIntro"'],
    [/visualizer: "LinearRegression",\n  \},\n  "DeepLearningIntro"/, '},\n  "DeepLearningIntro"'],
    [/visualizer: "Transformer",\n  \},\n  "SVM"/, '},\n  "SVM"'],
    [/visualizer: "Tree",\n  \},\n  "RandomForest"/, '},\n  "RandomForest"'],
    [/visualizer: "RandomForest",\n  \},\n  "GradientBoosting"/, '},\n  "GradientBoosting"'],
    [/visualizer: "LogisticRegression",\n  \},\n  "BayesTheorem"/, '},\n  "BayesTheorem"'],
    [/visualizer: "RNN",\n  \},\n  "LSTM"/, '},\n  "LSTM"'],
    [/visualizer: "LSTM",\n  \},\n  "KLDivergence"/, '},\n  "KLDivergence"'],
    [/visualizer: "Activation",\n \},\n "Normalization"/, '},\n "Normalization"'],
    [/visualizer: "Optimization",\n \},\n "Embeddings"/, '},\n "Embeddings"'],
    [/visualizer: "Attention",\n \},\n "CNN"/, '},\n "CNN"'],
    [/visualizer: "CNN",\n \},\n "RNN_Detailed"/, '},\n "RNN_Detailed"'],
    [/visualizer: "Loss",\n \},\n "GAN"/, '},\n "GAN"'],
    [/visualizer: "GAN",\n \},\n "WGAN"/, '},\n "WGAN"'],
    [/visualizer: "Transformer",\n \},\n "MoE"/, '},\n "MoE"'],
    [/visualizer: "Transformer",\n \},\n "RecentAdvances"/, '},\n "RecentAdvances"'],
    [/visualizer: "LinearRegression",\n\},\n"LogisticRegression"/, '},\n"LogisticRegression"'],
    [/visualizer: "LogisticRegression",\n\},\n"BayesTheorem"/, '},\n"BayesTheorem"'],
    [/visualizer: "RNN",\n\},\n"LSTM"/, '},\n"LSTM"'],
    [/visualizer: "LSTM",\n\},\n"KLDivergence"/, '},\n"KLDivergence"'],
    [/visualizer: "Transformer",\n  \},\n  "ModernAIIntro"/, '},\n  "ModernAIIntro"'],
];

regexes.forEach(([re, replace]) => {
    content = content.replace(re, replace);
});

// For SVM interactive formulas, remove the second instance
const svmBlockRegex = /"SVM": \{\n visualizer: "SVM",[\s\S]*?\},/g;
let match = svmBlockRegex.exec(content);
if (match) {
    let svmBlock = match[0];
    const secondInteractiveFormulasRegex = / interactiveFormulas: \[\n \{\n name: "Margin Size",[\s\S]*? \}\n \]\n/;
    svmBlock = svmBlock.replace(secondInteractiveFormulasRegex, '');
    content = content.replace(match[0], svmBlock);
}

fs.writeFileSync('src/engine/mathContent.js', content);
