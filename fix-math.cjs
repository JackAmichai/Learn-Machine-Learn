const fs = require('fs');
let code = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// There are multiple visualizer: declarations that are duplicate. We will regex out the second one.
// Actually, this is too hard to parse via regex safely. We can parse it line by line.

let lines = code.split('\n');
let insideObj = false;
let currentObj = '';
let visualizerCount = 0;
let interactiveFormulasCount = 0;
let linesToKeep = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.match(/^\s*"[A-Za-z0-9]+": \{/)) {
     visualizerCount = 0;
     interactiveFormulasCount = 0;
  }

  if (line.match(/^\s*visualizer:\s*"/)) {
     visualizerCount++;
     if (visualizerCount > 1) continue; // Skip duplicate
  }

  if (line.match(/^\s*interactiveFormulas:\s*\[/)) {
     interactiveFormulasCount++;
     if (interactiveFormulasCount > 1) {
       // We need to skip this entire block until the closing '],'
       let bracketCount = 1;
       let j = i + 1;
       while (j < lines.length && bracketCount > 0) {
         if (lines[j].includes('[')) bracketCount++;
         if (lines[j].includes(']')) bracketCount--;
         j++;
       }
       // If there is a trailing comma on the closing bracket, wait. It's usually ` ],` or ` ]`
       i = j - 1;
       if (lines[i].trim() === '],' || lines[i].trim() === ']') {
          // skipped successfully
       }
       continue;
     }
  }

  linesToKeep.push(line);
}

fs.writeFileSync('src/engine/mathContent.js', linesToKeep.join('\n'));
