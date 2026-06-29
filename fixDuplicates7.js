import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// The issue was I removed `visualizer: "..."` without removing the comma, and it messed up the JSON syntax or something.
// Let's use `replace` carefully, with the commas included.

const duplicateLines = [35, 172, 206, 292, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760];

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (duplicateLines.includes(i + 1)) {
        if (lines[i].includes('visualizer:')) {
            lines[i] = '';
        }
    }
}

// And interactiveFormulas at 293 (line index 292)
let inInteractive = false;
let depth = 0;
for (let i = 292; i < lines.length; i++) {
    if (i === 292 && lines[i].includes('interactiveFormulas: [')) {
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
                // wait, the depth should drop to 0 AT the `],` line.
            }
            break;
        }
    }
}

fs.writeFileSync('src/engine/mathContent.js', lines.filter(l => l !== '').join('\n'));
