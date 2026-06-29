import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// For visualizer keys, we can just replace:
// `  visualizer: "SVM",\n  },\n` => `  },\n` etc.
// Wait, no. Let's just remove the first or second instance.
// Actually, it's easier to remove the `visualizer: "..."` line if it's immediately followed by `},`
content = content.replace(/  visualizer: ".*?",\n  },\n/g, '  },\n');

// And for interactiveFormulas, the annotations said:
// [FAILURE] File: src/engine/mathContent.js, Line: 293 Duplicate key 'interactiveFormulas'
// [FAILURE] File: src/engine/mathContent.js, Line: 292 Duplicate key 'visualizer'

// Let's look at SVM block.
const svmBlockRegex = /"SVM": \{[\s\S]*?\},\n  "Tree"/;
const svmBlock = content.match(svmBlockRegex)[0];
// It has `visualizer: "SVM",` and `interactiveFormulas: [` twice.
// Let's replace the second one in SVM block completely.
// Wait, let's just use string replace for that exact block.

let newSvmBlock = svmBlock.replace(/  visualizer: "SVM",\n interactiveFormulas: \[\n \{\n name: "Margin Size",[\s\S]*? \}\n \]\n/, '');
content = content.replace(svmBlock, newSvmBlock);

fs.writeFileSync('src/engine/mathContent.js', content);
