const fs = require('fs');

const lines = fs.readFileSync('src/engine/mathContent.js', 'utf-8').split('\n');

const errors = [
  35, 172, 206, 292, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760
];

const interactiveFormulasLine = 293;

for (const lineNum of errors) {
    // 1-based index to 0-based index
    lines[lineNum - 1] = '// ' + lines[lineNum - 1];
}

// For interactiveFormulas at 293, we need to comment out the block
let inBlock = false;
let brackets = 0;
for (let i = 292; i < lines.length; i++) {
    if (lines[i].includes('interactiveFormulas: [')) {
        inBlock = true;
    }

    if (inBlock) {
        if (lines[i].includes('[')) brackets += (lines[i].match(/\[/g) || []).length;
        if (lines[i].includes(']')) brackets -= (lines[i].match(/\]/g) || []).length;

        lines[i] = '// ' + lines[i];

        if (brackets === 0) {
            inBlock = false;
            break;
        }
    }
}

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'), 'utf-8');
