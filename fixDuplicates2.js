import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// Specific lines to remove based on annotations (subtracting 1 for 0-index)
// We ONLY remove the `visualizer: "..."` and `interactiveFormulas: [` if they are explicitly causing dupes inside a block.
// Let's use string replacement to remove ALL occurrences of `visualizer:` except the first one in a block.
// The easiest way is just what we did in `fixContent4.js` but we must be careful with interactiveFormulas array.

// 1. Remove the trailing `visualizer: "..."` before `},` for all entries.
for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('visualizer: ') && i > 30) {
        // Is it the second one in the object?
        // Let's look up to 50 lines before it to see if `visualizer: ` was already defined.
        let foundDuplicate = false;
        for (let j = i - 1; j > Math.max(0, i - 100); j--) {
            if (lines[j].trim().startsWith('visualizer: ')) {
                foundDuplicate = true;
                break;
            }
            if (lines[j].trim().startsWith('"') && lines[j].includes('": {')) { // start of block
                break;
            }
        }
        if (foundDuplicate) {
            lines[i] = ''; // remove duplicate visualizer
        }
    }

    if (lines[i].trim() === 'interactiveFormulas: [' && i > 30) {
        let foundDuplicate = false;
        let blockStartIndex = -1;
        for (let j = i - 1; j > Math.max(0, i - 100); j--) {
            if (lines[j].trim() === 'interactiveFormulas: [') {
                foundDuplicate = true;
                break;
            }
            if (lines[j].trim().startsWith('"') && lines[j].includes('": {')) {
                blockStartIndex = j;
                break;
            }
        }

        if (foundDuplicate) {
            // we have a duplicate interactiveFormulas array in this block!
            // We need to remove this entire array up to `]`
            // we are at line `i`. Let's clear lines until `]`
            let depth = 0;
            let start = i;
            while (start < lines.length) {
                let l = lines[start];
                if (l.includes('[')) depth += (l.match(/\[/g) || []).length;
                if (l.includes(']')) depth -= (l.match(/\]/g) || []).length;
                lines[start] = '';
                if (depth === 0) break;
                start++;
            }
        }
    }
}

fs.writeFileSync('src/engine/mathContent.js', lines.filter(l => l !== '').join('\n'));
