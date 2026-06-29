import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// My previous script DID delete the duplicate visualizer keys successfully!
// The ONLY linting error left from mathContent.js is `293:2 error Duplicate key 'interactiveFormulas'`
// Let's look closely. I commented out lines 292 to 310.
// Let's remove the second interactiveFormulas manually.

for (let i = 290; i < 312; i++) {
   if (lines[i] && lines[i].includes('interactiveFormulas:')) {
       // Just delete that single line? No, that causes syntax errors.
   }
}

// Just find the block and remove it with string replace, but let's do it safely.
let joined = lines.join('\n');
joined = joined.replace(/\/\/ /g, ''); // undo the previous comments just in case

// We know the duplicates are on certain lines. Let's just fix the one remaining error:
// It's `interactiveFormulas: [` in the SVM block.

const blockToRemove = `  interactiveFormulas: [
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

// Also, the previous script deleted the FIRST instance of the visualizers?
// No, I deleted `visualizer: "NeuralNetwork",` etc.
// But some of them were legitimately needed if they were the ONLY visualizer key!
// Let's restore the original file and do it right.
