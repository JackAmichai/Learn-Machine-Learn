import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// The issue was I removed `visualizer: "..."` without removing the comma, and it messed up the JSON syntax or something.
// Or when we use `replace(/ visualizer: ".*?",\n \},\n/g, '  },\n')` it breaks when visualizer is followed by a completely different block or something.

// Let's explicitly just delete those exact lines by parsing line by line, but ONLY if they are `visualizer: "..."` or `interactiveFormulas: [`
// Wait, the duplicate keys are ONLY `visualizer` and `interactiveFormulas`.
// Let's just remove the first instance of `visualizer: ` in each object if it appears multiple times.
// No, the annotations are VERY specific about which lines have duplicates.

const lines = content.split('\n');
const duplicateVisualizers = [34, 171, 205, 291, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

for (let i = 0; i < lines.length; i++) {
    if (duplicateVisualizers.includes(i)) {
        if (lines[i].includes('visualizer:')) {
            lines[i] = ''; // remove
        }
    }
}

// For interactiveFormulas in SVM at line 292
// It's the `interactiveFormulas: [` block.
// Let's remove the second `interactiveFormulas:` block in SVM.
// In the original file, line 292 is `interactiveFormulas: [`.
// Let's remove lines 292 through 310.
let depth = 0;
let inDuplicateArray = false;
for (let i = 292; i < lines.length; i++) {
    if (i === 292 && lines[i].includes('interactiveFormulas: [')) {
        inDuplicateArray = true;
    }
    if (inDuplicateArray) {
        if (lines[i].includes('[')) depth += (lines[i].match(/\[/g) || []).length;
        if (lines[i].includes(']')) depth -= (lines[i].match(/\]/g) || []).length;
        lines[i] = '';
        if (depth === 0) {
            inDuplicateArray = false;
            break;
        }
    }
}

fs.writeFileSync('src/engine/mathContent.js', lines.filter(l => l !== '').join('\n'));
