const fs = require('fs');

const filePath = 'src/engine/mathContent.js';
let content = fs.readFileSync(filePath, 'utf8');

// The lines we want to delete are the duplicate `visualizer: "..."` lines which come AFTER the `shortcomings` or `content` in the object.
// We'll just read the file line by line and track if we're inside an object and have seen `visualizer:` already.
// Since the structure is quite regular, maybe we can just do a regex replace or just use eslint --fix if it supports it (it doesn't usually for no-dupe-keys).

let lines = content.split('\n');
let inTopic = false;
let seenKeys = new Set();
let newLines = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // If line matches the start of a topic (e.g. `"SomeTopic": {`)
  if (line.match(/^\s*"[^"]+"\s*:\s*\{/)) {
    inTopic = true;
    seenKeys.clear();
    newLines.push(line);
    continue;
  }

  if (line.match(/^\s*\},?\s*$/)) {
    inTopic = false;
  }

  // check if it's a key-value pair
  let kvMatch = line.match(/^\s*"?([a-zA-Z0-9_]+)"?\s*:/);
  if (inTopic && kvMatch) {
    let key = kvMatch[1];

    // Ignore nested object keys by just a simple heuristic, we only care about top level topic keys.
    // Actually, just looking at the errors, we can just delete the specific lines listed by eslint!
  }
  newLines.push(line);
}
