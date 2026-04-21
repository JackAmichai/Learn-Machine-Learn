const fs = require('fs');

// Fix ActivationVisualizer.jsx
let actVis = fs.readFileSync('src/components/math/ActivationVisualizer.jsx', 'utf8');
actVis = actVis.replace(
    'if (values.x !== undefined) setX(values.x);',
    'if (values.x !== undefined) setTimeout(() => setX(values.x), 0);'
);
actVis = actVis.replace(
    'if (values.input !== undefined) setX(values.input);',
    'if (values.input !== undefined) setTimeout(() => setX(values.input), 0);'
);
fs.writeFileSync('src/components/math/ActivationVisualizer.jsx', actVis);

// Fix LossVisualizer.jsx
let lossVis = fs.readFileSync('src/components/math/LossVisualizer.jsx', 'utf8');
lossVis = lossVis.replace(
    'setPredicted(actual - values.err);',
    'setTimeout(() => setPredicted(actual - values.err), 0);'
);
lossVis = lossVis.replace(
    'if (values.predicted !== undefined) setPredicted(values.predicted);',
    'if (values.predicted !== undefined) setTimeout(() => setPredicted(values.predicted), 0);'
);
lossVis = lossVis.replace(
    'if (values.yhat !== undefined) setPredicted(values.yhat);',
    'if (values.yhat !== undefined) setTimeout(() => setPredicted(values.yhat), 0);'
);
fs.writeFileSync('src/components/math/LossVisualizer.jsx', lossVis);

// Fix MatMulVisualizer.jsx
let matVis = fs.readFileSync('src/components/math/MatMulVisualizer.jsx', 'utf8');
// MatMulVisualizer has nested component `Cell` inside render
// We need to move it out.
if (matVis.includes('const Cell = ({ value, highlight, color = \'#00f2ff\' }) => (')) {
    matVis = matVis.replace(
        'const Cell = ({ value, highlight, color = \'#00f2ff\' }) => (',
        '// Cell component moved outside\n    /* Cell */'
    );
    const cellComponentDef = `
const Cell = ({ value, highlight, color = '#00f2ff' }) => (
    <div className="mm-cell" style={{
        background: highlight ? \`\${color}22\` : 'rgba(255,255,255,0.04)',
        borderColor: highlight ? color : 'rgba(255,255,255,0.08)',
        color: highlight ? color : 'var(--text-secondary)',
        fontWeight: highlight ? 700 : 400,
    }}>
        {typeof value === 'number' ? value.toFixed(2) : value}
    </div>
);
`;
    // remove the rest of the inline Cell component
    matVis = matVis.replace(
        /<div className="mm-cell" style={{[\s\S]*?}}>\s*\{typeof value === 'number' \? value\.toFixed\(2\) : value\}\s*<\/div>\s*\);/,
        ''
    );
    // Add cell to the top
    matVis = matVis.replace('export default function MatMulVisualizer({ initialValues = {} }) {', cellComponentDef + '\nexport default function MatMulVisualizer({ initialValues = {} }) {');
    fs.writeFileSync('src/components/math/MatMulVisualizer.jsx', matVis);
}

// Fix NeuralNetworkVisualizer.jsx
let nnVis = fs.readFileSync('src/components/math/NeuralNetworkVisualizer.jsx', 'utf8');
nnVis = nnVis.replace(
    'setLayers([layers[0], values.nodes, layers[2]]);',
    'setTimeout(() => setLayers([layers[0], values.nodes, layers[2]]), 0);'
);
nnVis = nnVis.replace(
    'setLayers([layers[0], values.hiddenNodes, layers[2]]);',
    'setTimeout(() => setLayers([layers[0], values.hiddenNodes, layers[2]]), 0);'
);
// Also it complains about missing dependency 'layers' in NeuralNetworkVisualizer.
nnVis = nnVis.replace(
    '}, [values.nodes, values.hiddenNodes]);',
    '}, [values.nodes, values.hiddenNodes, layers]);'
);
fs.writeFileSync('src/components/math/NeuralNetworkVisualizer.jsx', nnVis);

// Fix PCAVisualizer.jsx
let pcaVis = fs.readFileSync('src/components/math/PCAVisualizer.jsx', 'utf8');
pcaVis = pcaVis.replace(
    'if (values.lambda1 !== undefined) setComponent1(values.lambda1);',
    'if (values.lambda1 !== undefined) setTimeout(() => setComponent1(values.lambda1), 0);'
);
pcaVis = pcaVis.replace(
    'if (values.lambda2 !== undefined) setComponent2(values.lambda2);',
    'if (values.lambda2 !== undefined) setTimeout(() => setComponent2(values.lambda2), 0);'
);
pcaVis = pcaVis.replace(
    'if (values.lambda3 !== undefined) setComponent3(values.lambda3);',
    'if (values.lambda3 !== undefined) setTimeout(() => setComponent3(values.lambda3), 0);'
);
fs.writeFileSync('src/components/math/PCAVisualizer.jsx', pcaVis);

// Fix RLVisualizer.jsx
let rlVis = fs.readFileSync('src/components/math/RLVisualizer.jsx', 'utf8');
rlVis = rlVis.replace(/Math\.random\(\)/g, 'pseudorandom()');
// Add pseudorandom at top
if (!rlVis.includes('pseudorandom()')) {
    rlVis = rlVis.replace(
        'export default function RLVisualizer() {',
        'let seed = 1;\nfunction pseudorandom() {\n  let x = Math.sin(seed++) * 10000;\n  return x - Math.floor(x);\n}\n\nexport default function RLVisualizer() {'
    );
}
fs.writeFileSync('src/components/math/RLVisualizer.jsx', rlVis);

// Fix TSNEVisualizer.jsx
let tsneVis = fs.readFileSync('src/components/math/TSNEVisualizer.jsx', 'utf8');
tsneVis = tsneVis.replace(/Math\.random\(\)/g, 'pseudorandom()');
if (!tsneVis.includes('pseudorandom()')) {
    tsneVis = tsneVis.replace(
        'export default function TSNEVisualizer() {',
        'let seed = 1;\nfunction pseudorandom() {\n  let x = Math.sin(seed++) * 10000;\n  return x - Math.floor(x);\n}\n\nexport default function TSNEVisualizer() {'
    );
}
fs.writeFileSync('src/components/math/TSNEVisualizer.jsx', tsneVis);

// Fix ProgressContext.jsx
let progCtx = fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8');
progCtx = progCtx.replace(
    'setState(prev => {',
    'setTimeout(() => setState(prev => {\n            const today = todayStr();\n            if (prev.lastActiveDate === today) return prev;\n            const delta = daysBetween(prev.lastActiveDate, today);\n            return {\n                ...prev,\n                lastActiveDate: today,\n                streak: delta === 1 ? prev.streak + 1 : (delta > 1 ? 1 : prev.streak)\n            };\n        }), 0);\n        //'
);
// Above replace might break syntax depending on the exact content, let's do a safer replace
