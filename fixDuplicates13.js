import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

const duplicates = [34, 171, 205, 291, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

for (let i = 0; i < lines.length; i++) {
    if (duplicates.includes(i)) {
        lines[i] = '  // ' + lines[i].trim();
    }
}

// 292 through 310
for (let i = 292; i <= 310; i++) {
    lines[i] = '  // ' + lines[i];
}

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
