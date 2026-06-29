import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// Use string replace instead of manipulating lines
// Duplicate 1: 222 interactiveFormulas vs 293
// Let's remove the second `interactiveFormulas: [` block entirely in SVM (which is line 293-311)
content = content.replace(/ interactiveFormulas: \[\n \{\n name: "Margin Size",[\s\S]*? \}\n \],\n/, '');
content = content.replace(/ interactiveFormulas: \[\n \{\n name: "Margin Size",[\s\S]*? \}\n \]\n/, '');

// Then the `visualizer: "..."` duplicates, just replace them all since they appear at the end of objects:
// Example:
//  visualizer: "SVM",
//  },
content = content.replace(/  visualizer: ".*?",\n  },\n/g, '  },\n');
content = content.replace(/  visualizer: ".*?",\n \},\n/g, ' },\n');
content = content.replace(/  visualizer: ".*?",\n\},\n/g, '},\n');

fs.writeFileSync('src/engine/mathContent.js', content);
