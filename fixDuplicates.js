import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// Specific lines to remove based on annotations (subtracting 1 for 0-index)
const linesToRemove = [34, 171, 205, 291, 292, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

linesToRemove.sort((a,b) => b - a).forEach(lineIndex => {
    lines.splice(lineIndex, 1);
});

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
