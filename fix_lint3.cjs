const fs = require('fs');

let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

let lines = content.split('\n');

// We accidentally commented out the beginning of the interactiveFormulas list.
// The lint error was: Duplicate key 'interactiveFormulas'
// Let's see the previous structure.
