import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// The issue is that the keys are defined twice in the SAME object.
// E.g.
// "FoundationsIntro": {
//    visualizer: "NeuralNetwork",
//    title: "...",
//    content: "...",
//    ...
//    visualizer: "NeuralNetwork",
// }
// We can use a regex to find all instances of `visualizer: "..."` and remove the second one in a block.
// Let's just remove ALL visualizers that occur at the END of a block before `},`.

content = content.replace(/  visualizer: ".*?",\n  },\n/g, '  },\n');
content = content.replace(/  visualizer: ".*?",\n   interactiveFormulas:/g, '   interactiveFormulas:');
content = content.replace(/  visualizer: ".*?",\n interactiveFormulas:/g, ' interactiveFormulas:');

fs.writeFileSync('src/engine/mathContent.js', content);
