import fs from 'fs';
let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// I will write a simple parser to fix the duplicate keys properly!
// A duplicate key error is just `{ a: 1, a: 2 }`.
// ESLint parsing error is `Parsing error: Unexpected token <` which means I messed up string templates.
// It's much easier to just regex out the precise `visualizer: "..."` and `interactiveFormulas: [...]` if they are defined twice in the SAME object block.

content = content.replace(/  visualizer: ".*?",\n  },\n/g, '  },\n');
content = content.replace(/  visualizer: ".*?",\n \},\n/g, ' },\n');
content = content.replace(/  visualizer: ".*?",\n\},\n/g, '},\n');

// specifically for the interactiveFormulas block in SVM:
const badBlock = ` interactiveFormulas: [
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
 ]`;

content = content.replace(badBlock, '');
// Now fix the dangling comma that might exist before the bad block.
content = content.replace(/,\n\n \},\n "DecisionTree"/, '\n },\n "DecisionTree"');

fs.writeFileSync('src/engine/mathContent.js', content);
