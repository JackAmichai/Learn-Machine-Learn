const content = require('fs').readFileSync('src/engine/mathContent.js', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('visualizer:')) {
    console.log(`Line ${i + 1}: ${lines[i].trim()}`);
  }
}
