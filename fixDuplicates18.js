import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// THE PROBLEM: I WAS MODIFYING INDICES IN A LOOP THAT WAS ALTERING THE ARRAY OUT FROM UNDER ME!
// Ah wait! I didn't alter the length when doing `lines[i] = ...`.
// But wait, when doing splice I DID shift them. But `toDelete` was sorted descending!

const toRemove = [34, 171, 205, 291, 292, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

toRemove.sort((a,b) => b-a).forEach(index => {
    // We only want to remove the specific keys.
    // For 292 (interactiveFormulas in SVM):
    if (index === 292) {
        lines.splice(292, 19);
    } else {
        lines.splice(index, 1);
    }
});

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
