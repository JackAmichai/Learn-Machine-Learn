import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// Delete exact duplicate visualizers (0-indexed now matches ESLint output - 1)
const dupLines = [170, 289, 360, 390, 449, 503, 558, 864, 1027, 1275, 2078, 2212, 2891, 2939, 2992, 3063, 3188, 3324, 4462, 4534, 4680, 4757];
for(let i=0; i<lines.length; i++) {
    if(dupLines.includes(i)) {
        lines[i] = '';
    }
}

// Delete interactiveFormulas
let inInteractive = false;
let depth = 0;
for (let i = 290; i < lines.length; i++) {
    if (i === 290 && lines[i].includes('interactiveFormulas: [')) {
        inInteractive = true;
    }
    if (inInteractive) {
        if (lines[i].includes('[')) depth += (lines[i].match(/\[/g) || []).length;
        if (lines[i].includes(']')) depth -= (lines[i].match(/\]/g) || []).length;
        lines[i] = '';
        if (depth === 0) {
            inInteractive = false;
            // Also remove any trailing comma if it's there
            if (lines[i+1] && lines[i+1].trim() === '],') {
                lines[i+1] = '';
            }
            break;
        }
    }
}

fs.writeFileSync('src/engine/mathContent.js', lines.filter(l => l !== '').join('\n'));
