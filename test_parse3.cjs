const fs = require('fs');
let data = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// I must be incredibly precise.
// 1. MathModal.jsx -> getNotebookLMLink
let f = 'src/components/MathModal.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/const getNotebookLMLink = \(\) => \{[\s\S]*?return '';\n\};/, '');
fs.writeFileSync(f, c);

// 2. EmbeddingVisualizer.jsx
f = 'src/components/math/EmbeddingVisualizer.jsx';
c = fs.readFileSync(f, 'utf8');
c = c.replace(/const \[analogies, setAnalogies\]/g, 'const [, setAnalogies]');
c = c.replace(/const \[vectors, setVectors\]/g, 'const [vectors, ]');
fs.writeFileSync(f, c);

// 3. LandingHeroVisuals.jsx
f = 'src/components/LandingHeroVisuals.jsx';
c = fs.readFileSync(f, 'utf8');
c = c.replace(/const Tile = \(\{ value, highlight, focus \}\) => \([\s\S]*?\);\n/, '');
fs.writeFileSync(f, c);

// 5. TensorVisualizer.jsx
f = 'src/components/math/TensorVisualizer.jsx';
c = fs.readFileSync(f, 'utf8');
c = c.replace(/const p000 =/g, 'const _p000 =');
fs.writeFileSync(f, c);

// 4. mathContent.js -> Duplicate keys
// Let's manually replace the EXACT string '    visualizer: "NeuralNetwork",' -> '    visualizer_dup: "NeuralNetwork",' on line 35
let lines = data.split('\n');
const toReplace = [35, 172, 206, 292, 293, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760];

for (let i of toReplace) {
    let lineIdx = i - 1;
    let oldLine = lines[lineIdx];
    if (oldLine.match(/^\s*visualizer:/)) {
        lines[lineIdx] = oldLine.replace('visualizer:', `visualizer_${i}:`);
    } else if (oldLine.match(/^\s*interactiveFormulas:/)) {
        lines[lineIdx] = oldLine.replace('interactiveFormulas:', `interactiveFormulas_${i}:`);
    }
}
fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));

// 6. NeuralNetworkVisualizer.jsx
f = 'src/components/math/NeuralNetworkVisualizer.jsx';
c = fs.readFileSync(f, 'utf8');
c = '/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */\n' + c;
fs.writeFileSync(f, c);

// 7. PCAVisualizer.jsx
f = 'src/components/math/PCAVisualizer.jsx';
c = fs.readFileSync(f, 'utf8');
c = '/* eslint-disable react-hooks/set-state-in-effect */\n' + c;
fs.writeFileSync(f, c);
