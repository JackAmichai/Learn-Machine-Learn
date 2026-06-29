import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// Delete exact duplicate visualizers (which we know are trailing just before `},`)
const dupLines = [34, 171, 205, 291, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];
for(let i=0; i<lines.length; i++) {
    if(dupLines.includes(i)) {
        lines[i] = '';
    }
}

// Delete duplicate interactiveFormulas block in SVM
// The second block starts at 292 (0-indexed) and ends at 310 (0-indexed)
// wait, if I deleted line 291 above, lines index hasn't shifted because I just set them to ''.
for(let i=292; i<=310; i++) {
    lines[i] = '';
}

fs.writeFileSync('src/engine/mathContent.js', lines.filter(l => l !== '').join('\n'));
