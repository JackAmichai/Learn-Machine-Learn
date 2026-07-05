import fs from 'fs';

let code = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// There's a duplicate interactiveFormulas at line 289
// we can find it by finding the first interactiveFormulas in SVM and deleting the array.

let lines = code.split('\n');
let startIdx = 288; // 289 is 0-indexed 288
let endIdx = startIdx;

if (lines[startIdx].includes('interactiveFormulas:')) {
    let brackets = 0;
    for (let i = startIdx; i < lines.length; i++) {
        brackets += (lines[i].match(/\[/g) || []).length;
        brackets -= (lines[i].match(/\]/g) || []).length;
        if (brackets === 0) {
            endIdx = i;
            break;
        }
    }

    // if endIdx has a comma at the end we keep it or remove it.
    // Let's remove from startIdx to endIdx.
    const toRemove = new Set();
    for (let i = startIdx; i <= endIdx; i++) {
        toRemove.add(i);
    }

    // Also remove any trailing comma on the next line if it exists?
    // Actually the array ends with ' ],' or just ' ]' and the next property might need the comma.

    let newLines = lines.filter((_, idx) => !toRemove.has(idx));
    fs.writeFileSync('src/engine/mathContent.js', newLines.join('\n'));
}
