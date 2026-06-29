import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// This time, I will literally just delete the EXACT strings provided from the file by matching their line indices exactly.
const toDelete = [34, 171, 205, 291, 292, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

toDelete.sort((a,b) => b-a).forEach(index => {
    // we delete from bottom up so indices don't shift!
    // But wait, there is a second duplicate! line 292 is the first line of the `interactiveFormulas: [` block!
    if (index === 292) {
        // we need to delete lines 292 through 310
        lines.splice(292, 19);
    } else {
        lines.splice(index, 1);
    }
});

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
