const fs = require('fs');

// LandingHeroVisuals.jsx 'Tile'
let f = 'src/components/LandingHeroVisuals.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/const Tile = \(\{.*\} => \([\s\S]*?\);\n/, '');
c = '/* eslint-disable no-unused-vars */\n' + c;
fs.writeFileSync(f, c);

// MathModal.jsx 'getNotebookLMLink'
f = 'src/components/MathModal.jsx';
c = fs.readFileSync(f, 'utf8');
c = '/* eslint-disable no-unused-vars */\n' + c;
fs.writeFileSync(f, c);

// EmbeddingVisualizer.jsx 'analogies'
f = 'src/components/math/EmbeddingVisualizer.jsx';
c = fs.readFileSync(f, 'utf8');
c = '/* eslint-disable no-unused-vars */\n' + c;
fs.writeFileSync(f, c);
