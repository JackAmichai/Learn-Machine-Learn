const fs = require('fs');
let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// The file has objects with properties like:
// title: "...",
// visualizer: "...",
// ...
// visualizer: "...", // duplicate

// We will parse line by line. For each main key in MATH_TOPICS, we will keep track of seen keys in that object.
// When we see a duplicate key, we comment it out or delete it.

const lines = content.split('\n');
let newLines = [];
let seenKeys = new Set();
let inTopic = false;
let braceDepth = 0;

// simple state machine for top-level keys
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.match(/^export const MATH_TOPICS/)) {
     newLines.push(line);
     continue;
  }

  // Count braces to know when we are in a top-level topic object
  const openBraces = (line.match(/\{/g) || []).length;
  const closeBraces = (line.match(/\}/g) || []).length;

  // A topic starts like `  "NeuralNetwork": {`
  if (braceDepth === 1 && line.match(/^\s*"[^"]+":\s*\{/)) {
     seenKeys.clear();
  }

  let shouldKeep = true;

  // If we are at the first level of a topic (braceDepth === 2 after the open brace)
  // we check for keys. A key usually looks like `  visualizer: "..."` or ` interactiveFormulas: [`
  if (braceDepth === 2 || (braceDepth === 1 && openBraces > 0)) {
     const keyMatch = line.match(/^\s*([a-zA-Z0-9_]+)\s*:/);
     if (keyMatch) {
        const key = keyMatch[1];
        if (seenKeys.has(key)) {
           shouldKeep = false; // duplicate key!
           console.log(`Removed duplicate key '${key}' at line ${i + 1}`);

           // If it's an array or object starting, we need to skip until it closes.
           // This is tricky for multi-line arrays like interactiveFormulas.
           // For simplicity, since interactiveFormulas is large, let's just use a regex replace for the specific known duplicates.
        } else {
           seenKeys.add(key);
        }
     }
  }

  braceDepth += openBraces;
  braceDepth -= closeBraces;

  if (shouldKeep) {
     newLines.push(line);
  }
}

// Since interactiveFormulas is multi-line, the line-by-line duplicate remover would leave hanging brackets.
// Let's do a smarter approach using Babel or just regex for the known lines.
