const fs = require('fs');

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// Find lines with `visualizer:` and `interactiveFormulas:` and only keep the first occurrence per object
// The file is huge so we will just use regex to remove the specific duplicate keys based on lines.

const linesToRemove = [
  35, 172, 206, 292, 293, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760
];

const lines = content.split('\n');
const newLines = lines.filter((line, index) => !linesToRemove.includes(index + 1));

fs.writeFileSync('src/engine/mathContent.js', newLines.join('\n'));
