const fs = require('fs');

// Ah, I missed injecting the pseudorandom function into RLVisualizer! My previous code conditionally added it if it wasn't there, but maybe the regex failed.
let rlVis = fs.readFileSync('src/components/math/RLVisualizer.jsx', 'utf8');
if (!rlVis.includes('function pseudorandom()')) {
    rlVis = rlVis.replace(
        'export default function RLVisualizer({ initialValues = {} }) {',
        'let seed = 1;\nfunction pseudorandom() {\n  let x = Math.sin(seed++) * 10000;\n  return x - Math.floor(x);\n}\n\nexport default function RLVisualizer({ initialValues = {} }) {'
    );
    fs.writeFileSync('src/components/math/RLVisualizer.jsx', rlVis);
}

let tsneVis = fs.readFileSync('src/components/math/TSNEVisualizer.jsx', 'utf8');
if (!tsneVis.includes('function pseudorandom()')) {
    tsneVis = tsneVis.replace(
        'export default function TSNEVisualizer({ initialValues = {} }) {',
        'let seed = 1;\nfunction pseudorandom() {\n  let x = Math.sin(seed++) * 10000;\n  return x - Math.floor(x);\n}\n\nexport default function TSNEVisualizer({ initialValues = {} }) {'
    );
    fs.writeFileSync('src/components/math/TSNEVisualizer.jsx', tsneVis);
}

// TensorVisualizer.jsx
let tensorVis = fs.readFileSync('src/components/math/TensorVisualizer.jsx', 'utf8');
// Fix p000 is assigned a value but never used
tensorVis = tensorVis.replace(
    'const [p000, setP000] = useState(t[0][0][0]);',
    'const [, setP000] = useState(t[0][0][0]);'
);
fs.writeFileSync('src/components/math/TensorVisualizer.jsx', tensorVis);

// ProgressContext.jsx unexpected token ;
let progCtx = fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8');
// I broke the syntax when replacing. Let's reset the file and do it cleanly.
