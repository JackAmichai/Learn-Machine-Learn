import fs from 'fs';
import path from 'path';

function findButtons(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findButtons(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            let inButton = false;
            let buttonContent = '';
            let startLine = 0;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.includes('<button')) {
                    inButton = true;
                    buttonContent = line;
                    startLine = i + 1;
                } else if (inButton) {
                    buttonContent += ' ' + line.trim();
                }

                if (inButton && buttonContent.includes('</button>')) {
                    if (buttonContent.includes('×') && !buttonContent.includes('aria-label')) {
                        console.log(`${fullPath}:${startLine}`);
                        console.log(buttonContent);
                        console.log('---');
                    }
                    inButton = false;
                    buttonContent = '';
                }
            }
        }
    }
}

findButtons('./src');
