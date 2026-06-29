import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// I am just going to replace the exact strings for interactiveFormulas in SVM.
// The first interactive formulas block is 222-243 in original file
const badBlock = ` interactiveFormulas: [
 {
 name: "SVM Margin Width",
 components: [
 { symbol: "Margin", key: "margin", name: "Width", description: "Distance between hyperplanes" },
 { symbol: " = 2 / ||w||", key: "formula", name: "Formula", description: "Inverse of weight norm" }
 ],
 variables: [
 { key: "wnorm", symbol: "||w||", name: "Weight Norm", min: 0.5, max: 10, step: 0.1, default: 2.0, decimals: 1 }
 ],
 calculate: (vals, get) => 2 / get("wnorm", 2),
 insights: [
 "Smaller weights w mean a wider margin.",
 "Support vectors are the points right on the margin.",
 "We want the widest margin that still separates the data."
 ]
 }
 ],`;

content = content.replace(badBlock, '');
fs.writeFileSync('src/engine/mathContent.js', content);
