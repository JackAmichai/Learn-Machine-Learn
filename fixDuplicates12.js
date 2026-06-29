import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// OK, I'll just use a tiny script that deletes ONE specific line: Line 293 (interactiveFormulas duplicate).
// Wait, no. I'll just parse the AST?
// ESLint has an autofix for this: `eslint --fix src/engine/mathContent.js`
// BUT `no-dupe-keys` is NOT autofixable by default.

// Let's manually replace EXACT lines. We know EXACTLY what line numbers have issues from the compiler output!
const duplicates = [34, 171, 205, 291, 292, 362, 392, 451, 505, 560, 866, 1029, 1277, 2080, 2214, 2893, 2941, 2994, 3065, 3190, 3326, 4464, 4536, 4682, 4759];
for (let i = 0; i < lines.length; i++) {
    if (duplicates.includes(i)) {
        lines[i] = `// ${lines[i]}`;
    }
}

// And the block for interactiveFormulas in SVM starting at 292
// Wait, if I just comment out `interactiveFormulas: [` at line 292, the rest of the array is still there and causes a syntax error!
// The second `interactiveFormulas` array goes from 293 to 311 (1-indexed).
// So index 292 to 310.
for (let i = 292; i <= 310; i++) {
    if (!lines[i].startsWith('// ')) {
        lines[i] = `// ${lines[i]}`;
    }
}

fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
