import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

const lines = content.split('\n');
const toRemove = new Set([34, 289, 444]);

let newLines = lines.filter((_, idx) => !toRemove.has(idx));
fs.writeFileSync('src/engine/mathContent.js', newLines.join('\n'));
