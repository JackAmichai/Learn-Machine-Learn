const fs = require('fs');

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
let lines = content.split('\n');

const duplicates = [35, 172, 206, 292, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760];

const toRemove = new Set();
for (let lineNum of duplicates) {
    if (lines[lineNum - 1] && lines[lineNum - 1].includes('visualizer:')) {
        toRemove.add(lineNum - 1);
    }
}

// For interactiveFormulas at 293
if (lines[292] && lines[292].includes('interactiveFormulas:')) {
    // We shouldn't just delete it. We must find the whole array and delete it.
}

let newLines = lines.filter((_, idx) => !toRemove.has(idx));
fs.writeFileSync('src/engine/mathContent.js', newLines.join('\n'));
