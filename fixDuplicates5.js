import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

const toRemove = [34, 171, 205, 291, 292, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

for (let i = 0; i < lines.length; i++) {
    if (toRemove.includes(i)) {
        // Only remove if it actually contains the exact key we expect to avoid removing important lines if they shifted.
        if (lines[i].includes('visualizer: ') || lines[i].includes('interactiveFormulas:')) {
            lines[i] = '';
        }
    }
}
fs.writeFileSync('src/engine/mathContent.js', lines.filter(l => l !== '').join('\n'));
