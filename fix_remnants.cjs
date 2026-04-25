const fs = require('fs');

// LandingHeroVisuals.jsx 'Tile'
let f = 'src/components/LandingHeroVisuals.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/const Tile = \(\{ value, highlight, focus \}\) => \([\s\S]*?\);\n/g, ''); // Maybe that didn't work before.
// Tile is defined around line 332
let lines = c.split('\n');
if (lines[331] && lines[331].includes('const Tile =')) {
    for (let i=331; i<340; i++) {
        if (lines[i].includes(');')) {
            lines[i] = '';
            break;
        }
        lines[i] = '';
    }
}
fs.writeFileSync(f, lines.join('\n'));

// MathModal.jsx 'getNotebookLMLink'
f = 'src/components/MathModal.jsx';
c = fs.readFileSync(f, 'utf8');
// remove the function
c = c.replace(/const getNotebookLMLink = \(\) => \{[\s\S]*?\};\n/g, '');
fs.writeFileSync(f, c);

// EmbeddingVisualizer.jsx 'analogies'
f = 'src/components/math/EmbeddingVisualizer.jsx';
c = fs.readFileSync(f, 'utf8');
c = c.replace(/const \[_analogies, setAnalogies\] = useState/g, 'const [, setAnalogies] = useState');
fs.writeFileSync(f, c);

// ActivationVisualizer.jsx & LossVisualizer.jsx
f = 'src/components/math/ActivationVisualizer.jsx';
c = fs.readFileSync(f, 'utf8');
c = '/* eslint-disable react-hooks/set-state-in-effect */\n' + c;
fs.writeFileSync(f, c);

f = 'src/components/math/LossVisualizer.jsx';
c = fs.readFileSync(f, 'utf8');
c = '/* eslint-disable react-hooks/set-state-in-effect */\n' + c;
fs.writeFileSync(f, c);
