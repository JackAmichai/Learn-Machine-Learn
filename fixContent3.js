import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

const lines = content.split('\n');

// We need to keep only ONE visualizer key per object.
// E.g.
// "Topic": {
//   visualizer: "A",
//   ...
//   visualizer: "A"
// }
// We can just remove the ones at lines 35, 172, 206, 292, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760
// and `interactiveFormulas` at 293
// Let's use the explicit list from the compiler annotations exactly.
const toRemove = [34, 171, 205, 291, 292, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];

let finalLines = [];
for (let i = 0; i < lines.length; i++) {
    if (toRemove.includes(i)) {
        continue;
    }
    // There are some syntax errors introduced if we just remove the line if it leaves a trailing comma or something? No, it's inside an object. Removing a `key: value,` line is generally safe unless it's the last element without a trailing comma, which we can ignore usually. But `visualizer: "...",` has a comma.

    // Wait, if we remove `interactiveFormulas: [` at line 293, then it leaves a dangling array definition!
    // Line 293 is `interactiveFormulas: [` inside SVM. But there's already an `interactiveFormulas:` at line 222 for SVM.
    // So if we remove line 293, we are leaving the REST of the array intact! That's why it throws a syntax error.
    // The second `interactiveFormulas` array goes from 293 to 311.
    // If we want to remove the duplicate `interactiveFormulas`, we need to remove the whole block.
}
