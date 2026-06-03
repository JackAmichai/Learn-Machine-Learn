const fs = require('fs');
let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// The error was on line 290 and 289
// Wait, when I removed 289 and 290 before, they were:
// 289:   visualizer: "SVM",
// 290:  interactiveFormulas: [
// The next line was " {", which means removing `interactiveFormulas: [` breaks the object structure.
// That means the duplicate interactiveFormulas IS NOT JUST the key, it's the ENTIRE array or we need to remove the array contents!
// Let's actually look at it!
