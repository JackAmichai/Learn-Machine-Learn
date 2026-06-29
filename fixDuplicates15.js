import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// Use simple string replacement with exact matching.
const lines = content.split('\n');

const visualizerLines = [34, 171, 205, 291, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

for (let i = 0; i < lines.length; i++) {
    if (visualizerLines.includes(i)) {
        lines[i] = ''; // Remove the duplicate visualizer
    }
}

// Remove the ENTIRE first interactiveFormulas block for SVM (lines 222-243)
// Wait, last time I tried deleting the second block (293-311) and it had a syntax error.
// What if I delete lines 292 through 310?
// Actually let's look at the original content around 292
// 291:   `,
// 292:   visualizer: "SVM",
// 293:  interactiveFormulas: [
// 294:  {

// Let's delete the exact block of text instead of guessing line numbers.
const badSvmBlock = `  visualizer: "SVM",
 interactiveFormulas: [
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

let joined = lines.join('\n');
joined = joined.replace(badSvmBlock, '');

fs.writeFileSync('src/engine/mathContent.js', joined);
