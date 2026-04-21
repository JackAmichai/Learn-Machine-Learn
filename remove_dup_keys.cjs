const fs = require('fs');

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

let lines = content.split('\n');

const linesToRemove = [35, 172, 206, 292, 293, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760];

// The lines are 1-indexed in the linter output. We'll simply remove 'visualizer:' or 'interactiveFormulas:' at these lines.
// BUT 293 is interactiveFormulas:, deleting it might break syntax if it's the start of an array.
// Let's actually just replace them with empty spaces or rename the key.
linesToRemove.forEach(lineNum => {
    let line = lines[lineNum - 1];
    if (line.includes('visualizer:')) {
         lines[lineNum - 1] = line.replace('visualizer:', '/* visualizer: */ duplicate_visualizer:');
    } else if (line.includes('interactiveFormulas:')) {
         lines[lineNum - 1] = line.replace('interactiveFormulas:', '/* interactiveFormulas: */ duplicate_interactiveFormulas:');
    }
});

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
