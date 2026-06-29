import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// I am just going to delete the exact text snippets using Regex carefully!
content = content.replace(/\n  visualizer: "NeuralNetwork",\n  \},\n  "MathIntro":/g, '\n  },\n  "MathIntro":');
// Wait, no. I'll just use a tiny python script! Just kidding.
// Since the visualizer is always defined multiple times inside the same object block,
// Let's parse it properly with acorn? No.

// I will run `eslint --fix src/engine/mathContent.js` if it's fixable? I just saw it say `0 errors ... potentially fixable`.

// The ONLY bulletproof way is reading lines and matching exact content.
const lines = content.split('\n');

const toRemove = [34, 171, 205, 291, 292, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

for (let i = 0; i < lines.length; i++) {
    if (toRemove.includes(i)) {
        if (lines[i].includes('visualizer: ') || lines[i].includes('interactiveFormulas:')) {
            lines[i] = '';
        }
    }
}

// And the second interactive formulas array in SVM starts at line 292 (0-indexed). Wait! Line 292 IS in the `toRemove` array!
// And it ends around 310.
for (let i = 293; i <= 310; i++) {
    lines[i] = '';
}

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
