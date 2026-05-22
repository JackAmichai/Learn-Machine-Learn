const fs = require('fs');

let secPath = 'src/engine/NeuralNetwork.security.test.js';
let content = fs.readFileSync(secPath, 'utf8');

// Use regex to replace to be sure
content = content.replace(/expect\(console\.warn\)\.toHaveBeenCalledWith\(expect\.stringContaining\("Invalid outputActivation"\)\);/g,
'expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid output activation"));');

fs.writeFileSync(secPath, content, 'utf8');
