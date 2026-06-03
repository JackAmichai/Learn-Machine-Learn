const fs = require('fs');

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
let lines = content.split('\n');

// Delete visualizer keys
let visualizerLines = [35, 172, 206, 292, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760];

// Delete interactiveFormulas starting at line 293 until the closing bracket on line 310.
// Wait, is it line 293 to 310 inclusive? Yes.
// If we delete line 293 (index 292) to line 310 (index 309), that is 18 lines.

// Let's create an array of indices to delete
let indicesToDelete = new Set();
for (let vLine of visualizerLines) {
    indicesToDelete.add(vLine - 1);
}

for (let i = 293; i <= 310; i++) {
    indicesToDelete.add(i - 1);
}

// Convert to array and sort descending
let sortedIndices = Array.from(indicesToDelete).sort((a, b) => b - a);

for (let idx of sortedIndices) {
    console.log(`Removing line ${idx + 1}: ${lines[idx]}`);
    lines.splice(idx, 1);
}

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
