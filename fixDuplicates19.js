import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

const toDelete = [34, 171, 205, 291, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

toDelete.sort((a,b) => b-a).forEach(index => {
    lines.splice(index, 1);
});

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
