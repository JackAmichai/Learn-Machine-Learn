import fs from 'fs';
import path from 'path';

function findButtons(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findButtons(filePath, fileList);
    } else if (filePath.endsWith('.jsx')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('<button') && !lines[i].includes('aria-label') && (lines[i].includes('>') || lines[i+1]?.includes('>'))) {
           console.log(`\n${filePath}:${i + 1}`);
           console.log(lines.slice(Math.max(0, i-2), Math.min(lines.length, i+3)).join('\n'));
        }
      }
    }
  }
}
findButtons('./src/components');
