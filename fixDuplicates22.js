import fs from 'fs';

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

// OK, wait... 293:2 error Parsing error: Unexpected token {
// The `interactiveFormulas` block has a trailing comma!
// So it looks like `interactiveFormulas: [ ... ],`
// The second one was:
// 293:  interactiveFormulas: [
// ...
// 311:  ]
// Wait, no. Let's look at the original file's SVM block VERY CAREFULLY!
