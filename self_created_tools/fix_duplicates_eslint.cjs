const fs = require('fs');
const data = fs.readFileSync('src/engine/mathContent.js', 'utf8');

const eslintOutput = `
    35:3  error  Duplicate key 'visualizer'  no-dupe-keys
   172:3  error  Duplicate key 'visualizer'  no-dupe-keys
   206:3  error  Duplicate key 'visualizer'  no-dupe-keys
   344:3  error  Duplicate key 'visualizer'  no-dupe-keys
   374:2  error  Duplicate key 'visualizer'  no-dupe-keys
   433:4  error  Duplicate key 'visualizer'  no-dupe-keys
   487:4  error  Duplicate key 'visualizer'  no-dupe-keys
   542:4  error  Duplicate key 'visualizer'  no-dupe-keys
   848:4  error  Duplicate key 'visualizer'  no-dupe-keys
  1011:5  error  Duplicate key 'visualizer'  no-dupe-keys
  1259:4  error  Duplicate key 'visualizer'  no-dupe-keys
  2062:3  error  Duplicate key 'visualizer'  no-dupe-keys
  2196:3  error  Duplicate key 'visualizer'  no-dupe-keys
  2875:3  error  Duplicate key 'visualizer'  no-dupe-keys
  2923:3  error  Duplicate key 'visualizer'  no-dupe-keys
  2976:3  error  Duplicate key 'visualizer'  no-dupe-keys
  3047:3  error  Duplicate key 'visualizer'  no-dupe-keys
  3172:3  error  Duplicate key 'visualizer'  no-dupe-keys
  3308:3  error  Duplicate key 'visualizer'  no-dupe-keys
  4446:3  error  Duplicate key 'visualizer'  no-dupe-keys
  4518:3  error  Duplicate key 'visualizer'  no-dupe-keys
  4664:3  error  Duplicate key 'visualizer'  no-dupe-keys
  4741:3  error  Duplicate key 'visualizer'  no-dupe-keys
`;

const linesToDelete = [];
for (const match of eslintOutput.matchAll(/^\s*(\d+):\d+\s+error/gm)) {
    linesToDelete.push(parseInt(match[1], 10));
}
linesToDelete.sort((a, b) => b - a);
let lines = data.split('\n');

for (const lineNum of linesToDelete) {
    lines.splice(lineNum - 1, 1);
}


fs.writeFileSync('src/engine/mathContent.js', lines.join('\n'));
console.log('Done');
