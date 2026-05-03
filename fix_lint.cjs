const fs = require('fs');

const file = 'src/engine/mathContent.js';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const duplicates = [35, 172, 206, 292, 293, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760];

duplicates.forEach(lineNum => {
    const idx = lineNum - 1;
    if (!lines[idx].startsWith('//')) {
        lines[idx] = '// ' + lines[idx];
    }
});

fs.writeFileSync(file, lines.join('\n'));
