const fs = require('fs');

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// I am just going to write exactly these lines into an array and splice them
let linesToRemove = [34, 171, 205, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

linesToRemove.sort((a, b) => b - a);

let lines = content.split('\n');
for (let line of linesToRemove) {
    console.log(`Removing line ${line + 1}: ${lines[line]}`);
    lines.splice(line, 1);
}

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
