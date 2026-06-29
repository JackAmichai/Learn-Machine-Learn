import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// By analyzing the exact duplicate keys reported:
// Duplicate key 'interactiveFormulas' is at Line 293
// Duplicate key 'visualizer' is at Lines 35, 172, 206, 292, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760

// Let's replace ONLY those exact duplicates.
// Notice that for visualizer, we can't just delete the line because of trailing comma rules. Oh wait, if it's the LAST key in an object, deleting it leaves `  },` which is valid!
// But if it's NOT the last key, it might leave a dangling comma.
// Actually, in JS object literals, trailing commas are completely fine. The issue is if we leave a comma when we SHOULDN'T have one.
// Let's just comment out `visualizer: "..."` using `//` INSTEAD of deleting it. Wait, I tried that and got syntax errors in some runs.
// Oh! It's because some visualizers were on line 34 instead of 35 because of 0-indexing!
// Yes, if line 35 is duplicate, in 0-indexed it's `lines[34]`.

const duplicateVisualizers = [35, 172, 206, 292, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760];

for (const lineNum of duplicateVisualizers) {
    const idx = lineNum - 1; // 0-indexed
    // Ensure we are targeting the actual `visualizer:` line!
    if (lines[idx].includes('visualizer:')) {
        // Just remove the 'visualizer:' key part so it becomes just a string which might be invalid, OR we can comment it.
        // Wait, if we use `//` it comments out the rest of the line.
        lines[idx] = `// ${lines[idx]}`;
    }
}

// For interactiveFormulas at Line 293 (0-indexed 292):
// This is an array definition. If we comment the first line, the rest of the array elements will cause a syntax error!
// We need to comment the ENTIRE array block.
// How many lines is it? Let's trace it.
let depth = 0;
let inArray = false;
for (let i = 292; i < lines.length; i++) {
    if (i === 292) inArray = true;

    if (inArray) {
        if (lines[i].includes('[')) depth += (lines[i].match(/\[/g) || []).length;
        if (lines[i].includes(']')) depth -= (lines[i].match(/\]/g) || []).length;

        lines[i] = `// ${lines[i]}`;

        if (depth === 0) {
            inArray = false;
            break;
        }
    }
}

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
