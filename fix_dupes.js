import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
let lines = content.split('\n');

// Specific line numbers of duplicate keys that caused CI failure
//  [FAILURE] File: src/engine/mathContent.js, Line: 293 -> interactiveFormulas
//  [FAILURE] File: src/engine/mathContent.js, Line: 292 -> visualizer
//  [FAILURE] File: src/engine/mathContent.js, Line: 206 -> visualizer
//  [FAILURE] File: src/engine/mathContent.js, Line: 172 -> visualizer
//  [FAILURE] File: src/engine/mathContent.js, Line: 35  -> visualizer

const linesToRemove = [35, 172, 206, 292];
linesToRemove.forEach(lineNum => {
    lines[lineNum - 1] = '// ' + lines[lineNum - 1];
});

// For interactiveFormulas at 293, it spans from 293 to 310 or so. Let's find the closing bracket
let interactiveFormulasStart = 293;
let i = interactiveFormulasStart - 1;
let openBrackets = 0;
let started = false;

// Delete lines until it closes
while (i < lines.length) {
    if (lines[i].includes('[')) {
        started = true;
        openBrackets += (lines[i].match(/\[/g) || []).length;
    }
    if (lines[i].includes(']')) {
        openBrackets -= (lines[i].match(/\]/g) || []).length;
    }
    lines[i] = '// ' + lines[i];
    if (started && openBrackets === 0) {
        // if next line is ` },`, we probably shouldn't comment it out, wait
        // The block is:
        // interactiveFormulas: [ ... ]
        break;
    }
    i++;
}

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
