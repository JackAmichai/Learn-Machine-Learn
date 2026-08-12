const fs = require('fs');
let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

content = content.replace(/visualizer:\s*<EnsembleVisualizer\s*\/>\s*,\s*interactiveFormulas/g, 'interactiveFormulas');
fs.writeFileSync('src/engine/mathContent.js', content);
