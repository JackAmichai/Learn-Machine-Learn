import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// VERY GENTLE REMOVAL
// We only remove exactly `visualizer: "..."` IF AND ONLY IF it is line 35, 172 etc, AND we replace it with `  // visualizer: "..."` to preserve line counts and structure perfectly!
// And for `interactiveFormulas: [` we comment out the entire block line by line.

const toRemove = [34, 171, 205, 291, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

for (let i = 0; i < lines.length; i++) {
    if (toRemove.includes(i)) {
        if (lines[i].includes('visualizer:')) {
            lines[i] = lines[i].replace('visualizer:', '// visualizer:');
        }
    }
}

// And interactiveFormulas at 293 (index 292)
for (let i = 292; i <= 310; i++) {
    lines[i] = '// ' + lines[i];
}

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
