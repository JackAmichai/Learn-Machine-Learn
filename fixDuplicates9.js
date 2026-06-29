import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// I am tired of trying to guess the syntax error, I will just remove the specific duplicate keys based on lines.
// And use `eval` or `JSON.parse`? No, it's a JS object with functions.
// I will just ignore the visualizer duplicates since they aren't actually breaking the app locally?
// The instructions said to fix the CI failure.
// The duplicate keys are technically valid in JS (the last one wins), but ESLint fails with `no-dupe-keys`.

const lines = content.split('\n');

// 1. Remove duplicate visualizers.
const toRemoveVisualizer = [35, 172, 206, 292, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760];

for (let i = 0; i < lines.length; i++) {
    if (toRemoveVisualizer.includes(i + 1)) {
        lines[i] = ''; // remove visualizer
    }
}

// 2. Remove duplicate interactiveFormulas at line 293 (index 292)
for (let i = 292; i <= 310; i++) {
    lines[i] = '';
}

fs.writeFileSync('src/engine/mathContent.js', lines.filter(l => l !== '').join('\n'));
