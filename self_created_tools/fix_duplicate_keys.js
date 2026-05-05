const fs = require('fs');

const data = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// Use a stack to track object properties
// However, since mathContent.js exports a Javascript object containing strings,
// a simple approach is to use a regular expression but be careful about scope.

let lines = data.split('\n');
let outLines = [];
let inObject = false;
let currentKeys = new Set();
let objLevel = 0;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Simplistic tracking of outer topic objects vs inner structures.
    // Topics usually start with `"TopicName": {` or `TopicName: {` with no or few spaces
    if (/^\s*"?[a-zA-Z0-9_]+"?\s*:\s*\{/.test(line) && objLevel === 1) {
        currentKeys = new Set();
        objLevel++;
    } else if (line.includes('{')) {
        objLevel += (line.match(/\{/g) || []).length;
    }

    if (line.includes('}')) {
        objLevel -= (line.match(/\}/g) || []).length;
    }

    // Only process keys if we are within a topic object (level 2 usually, inside MATH_TOPICS)
    let keyMatch = line.match(/^\s*([a-zA-Z0-9_]+)\s*:/);
    if (keyMatch && objLevel > 0) { // Be a bit more liberal, let's just track block level
        let key = keyMatch[1];
        // But we want to avoid keys nested deeper than the main topic properties.
        // Usually visualizer: "..." is at the topic level.
        if (key === 'visualizer' || key === 'interactiveFormulas') {
            // we will need to track keys correctly per object.
        }
    }
}
