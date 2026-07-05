const fs = require('fs');
let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// There are duplicates. Remove them properly by checking line by line.
let lines = content.split('\n');
let newLines = [];
let keysInObj = new Set();
let inObj = false;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // reset tracking if we are at a new topic
    if (line.match(/^ "[A-Za-z0-9]+": {$/)) {
        inObj = true;
        keysInObj = new Set();
        newLines.push(line);
        continue;
    }

    if (inObj && line.match(/^  [a-zA-Z0-9]+:/)) {
       let keyMatch = line.match(/^  ([a-zA-Z0-9]+):/);
       if (keyMatch) {
           let key = keyMatch[1];
           if (keysInObj.has(key)) {
               continue; // skip duplicate
           }
           keysInObj.add(key);
       }
    }

    if (inObj && line.match(/^  },?$/)) {
        inObj = false;
    }

    newLines.push(line);
}

fs.writeFileSync('src/engine/mathContent.js', newLines.join('\n'));
