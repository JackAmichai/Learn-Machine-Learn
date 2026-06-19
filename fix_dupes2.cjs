const fs = require('fs');

let fileLines = fs.readFileSync('src/engine/mathContent.js', 'utf8').split('\n');

let seenKeys = new Set();
let inObj = false;
let braceDepth = 0;

const linesToDelete = [];

for (let i = 0; i < fileLines.length; i++) {
  let line = fileLines[i];

  if (line.match(/^\s*"[a-zA-Z0-9_]+" *: *{/)) {
     if (braceDepth === 1) { // Top level topic object
         inObj = true;
         seenKeys.clear();
     }
  }

  if (line.includes('{')) braceDepth += (line.match(/{/g) || []).length;
  if (line.includes('}')) braceDepth -= (line.match(/}/g) || []).length;

  if (braceDepth === 1 && line.match(/^\s*},?\s*$/)) {
     inObj = false;
  }

  if (inObj && braceDepth === 2) {
     let kvMatch = line.match(/^\s*([a-zA-Z0-9_]+)\s*:/);
     if (kvMatch) {
        let key = kvMatch[1];
        if (key === 'visualizer' || key === 'interactiveFormulas') {
           if (seenKeys.has(key)) {
               linesToDelete.push(i);
           } else {
               seenKeys.add(key);
           }
        }
     }
  }
}

linesToDelete.sort((a, b) => b - a);

for (let lineNum of linesToDelete) {
  let text = fileLines[lineNum];
  // If we are deleting interactiveFormulas, it's an array and we need to delete its entire content up to ],
  if (text.includes('interactiveFormulas')) {
     let j = lineNum;
     let bracketCount = 0;
     do {
        if (fileLines[j].includes('[')) bracketCount += (fileLines[j].match(/\[/g) || []).length;
        if (fileLines[j].includes(']')) bracketCount -= (fileLines[j].match(/\]/g) || []).length;
        j++;
     } while (bracketCount > 0 && j < fileLines.length);
     fileLines.splice(lineNum, j - lineNum);
  } else {
     fileLines.splice(lineNum, 1);
  }
}

fs.writeFileSync('src/engine/mathContent.js', fileLines.join('\n'), 'utf8');
