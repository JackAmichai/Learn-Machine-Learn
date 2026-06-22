import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
let lines = content.split('\n');

const linesToRemove = [363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760];
linesToRemove.forEach(lineNum => {
    lines[lineNum - 1] = '// ' + lines[lineNum - 1];
});

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
