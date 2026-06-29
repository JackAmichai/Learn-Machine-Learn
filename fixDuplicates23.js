import fs from 'fs';
let c = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// I will delete the FIRST visualizer duplicate in `MATH_TOPICS`.
// No, the compiler complained about BOTH duplicate keys.

// Let's explicitly remove the FIRST block `interactiveFormulas` in SVM (lines 222-243 in original).
// Using simple line replacement, but let's check exact strings first!
const lines = c.split('\n');

const dupesToRemove = [34, 171, 205, 291, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

for (let i = 0; i < lines.length; i++) {
    if (dupesToRemove.includes(i)) {
        lines[i] = '';
    }
}

// For interactiveFormulas, the FIRST block is lines 222 to 243.
for (let i = 221; i <= 242; i++) {
    lines[i] = '';
}

fs.writeFileSync('src/engine/mathContent.js', lines.filter(l => l !== '').join('\n'));
