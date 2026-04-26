const fs = require('fs');
let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
let lines = content.split('\n');

const duplicateVisualizerLines = [
  35, 172, 206, 292, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760
];
const duplicateInteractiveFormulasLines = [293];

duplicateVisualizerLines.forEach(line => {
    lines[line - 1] = lines[line - 1].replace(/visualizer: /g, '// visualizer: ');
});

duplicateInteractiveFormulasLines.forEach(line => {
    lines[line - 1] = lines[line - 1].replace(/interactiveFormulas: /g, '// interactiveFormulas: ');
});

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
