import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// Fix 1: Duplicate 'visualizer' at 292
// Search:
//  `,
//  visualizer: "SVM",
// interactiveFormulas: [
content = content.replace('  visualizer: "SVM",\n interactiveFormulas: [', ' interactiveFormulas: [');

// Fix 2: Duplicate 'interactiveFormulas' at 293 vs 222
// SVM has two interactiveFormulas arrays. Let's merge or remove the first one since they are overlapping.
// It looks like one is "SVM Margin Width" and another is "Margin Size". The first is from lines 222-243.
// Let's remove the first one (lines 222-243)
const lines = content.split('\n');
let newLines = [];
let skip = false;
let foundVisualizerAt206 = false;

for (let i = 0; i < lines.length; i++) {
    // line 35: visualizer: "NeuralNetwork",
    // wait, looking at annotations:
    // [FAILURE] File: src/engine/mathContent.js, Line: 35 Duplicate key 'visualizer'
    // [FAILURE] File: src/engine/mathContent.js, Line: 172 Duplicate key 'visualizer'
    // [FAILURE] File: src/engine/mathContent.js, Line: 206 Duplicate key 'visualizer'

    // Actually, looking closely, `visualizer: "..."` is defined inside the object itself, but ALSO inside the `MATH_TOPICS` property.
    // e.g.
    //  "FoundationsIntro": {
    //    visualizer: "NeuralNetwork",
    // title: "Foundations: The Building Blocks",
    // ...
    //   visualizer: "NeuralNetwork",
    //  },

    if (lines[i].trim() === 'visualizer: "NeuralNetwork",' && i > 30 && i < 40) {
        continue;
    }
    if (lines[i].trim() === 'visualizer: "Transformer",' && i > 165 && i < 180) {
        continue;
    }
    if (lines[i].trim() === 'visualizer: "Transformer",' && i > 200 && i < 210) {
        continue;
    }
    if (lines[i].trim() === 'interactiveFormulas: [' && i > 215 && i < 230) {
        skip = true;
    }
    if (skip) {
        if (lines[i].trim() === '],') {
            // Check if next line is questions or visualizer
            // we'll just skip until we see visualizer
        }
        if (lines[i].trim() === 'visualizer: "SVM",') {
             skip = false;
             continue; // also remove the duplicate visualizer
        }
    }

    if (!skip) {
        newLines.push(lines[i]);
    }
}

// Let's use a simpler regex approach to remove all duplicate keys.
