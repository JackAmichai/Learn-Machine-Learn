import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// The issue with the regex in fixDuplicates3 is that it was greedy or matched improperly.
// Let's do this line by line and just remove the specific lines causing issues from the annotations.
const lines = content.split('\n');

const toRemove = [34, 171, 205, 291, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

for (let i = 0; i < lines.length; i++) {
    if (toRemove.includes(i)) {
        lines[i] = ''; // remove duplicate visualizer
    }
}

// Now handle the SVM block's duplicate interactiveFormulas:
// 222: interactiveFormulas: [ ... up to 243
// 293: interactiveFormulas: [ ... up to 311

for (let i = 292; i <= 310; i++) {
    lines[i] = '';
}

fs.writeFileSync('src/engine/mathContent.js', lines.filter(l => l !== '').join('\n'));
