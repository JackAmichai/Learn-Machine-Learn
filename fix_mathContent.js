import fs from 'fs';

let code = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = code.split('\n');

// 35, 360, 390, 449, 557, 1272, 2075, 2209, 2888, 2936, 2989, 3060, 3185, 3321, 4459, 4531, 4677, 4754
const duplicates = [35, 360, 390, 449, 557, 1272, 2075, 2209, 2888, 2936, 2989, 3060, 3185, 3321, 4459, 4531, 4677, 4754];
const toRemove = new Set();
for (let lineNum of duplicates) {
    if (lines[lineNum - 1] && lines[lineNum - 1].includes('visualizer:')) {
        toRemove.add(lineNum - 1);
    }
}

// 290 is interactiveFormulas inside SVM duplicate.
// It is at 290 and the previous one was likely higher. Let's inspect that manually or just remove the line 290 but wait, that leaves an unclosed array.

let newLines = lines.filter((_, idx) => !toRemove.has(idx));
fs.writeFileSync('src/engine/mathContent.js', newLines.join('\n'));
