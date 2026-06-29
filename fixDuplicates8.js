import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// The issue was I removed `visualizer: "..."` without removing the comma, and it messed up the JSON syntax or something.
// Let's use `replace` carefully, with the commas included.
// Just simple string replaces since the file structure is quite predictable.

// For visualizer:
// Replace the LAST instance of `visualizer:` in each object. We can match `visualizer: "..."\n  }` or something.
content = content.replace(/  visualizer: ".*?",\n  },\n/g, '  },\n');
content = content.replace(/  visualizer: ".*?",\n \},\n/g, ' },\n');
content = content.replace(/  visualizer: ".*?",\n\},\n/g, '},\n');

// For interactiveFormulas (SVM):
// Replace the entire second block which is:
const interactiveFormulasBlock = ` interactiveFormulas: [
 {
 name: "Margin Size",
 components: [
 { symbol: "Margin", key: "margin", name: "Margin Width", description: "Distance between support vectors" },
 { symbol: " = 2 / ||w||", key: "formula", name: "Formula", description: "Inversely proportional to weight norm" }
 ],
 variables: [
 { key: "wnorm", symbol: "||w||", name: "Weight Norm", min: 0.1, max: 10, step: 0.1, default: 2, decimals: 1 }
 ],
 calculate: (vals, get) => 2 / get("wnorm", 2),
 insights: [
 "Smaller weights = larger margins = better generalization.",
 "Support vectors are the points 'supporting' the margin.",
 "Hinge loss penalizes points inside the margin."
 ]
 }
 ]
 },`;
const newBlock = ` },`;
content = content.replace(interactiveFormulasBlock, newBlock);

fs.writeFileSync('src/engine/mathContent.js', content);
