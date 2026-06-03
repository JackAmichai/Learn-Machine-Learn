const fs = require('fs');
let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

let linesToRemove = [288, 289];

linesToRemove.sort((a, b) => b - a);
let lines = content.split('\n');
for (let line of linesToRemove) {
    console.log(`Removing line ${line + 1}: ${lines[line]}`);
    lines.splice(line, 1);
}

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
