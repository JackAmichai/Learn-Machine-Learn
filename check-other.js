import fs from 'fs';
import path from 'path';

function findMissingAria(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findMissingAria(fullPath);
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
                    // Look for icon-only buttons (no text content)
                    const textContent = buttonContent.replace(/<[^>]+>/g, '').trim();
                    if (!buttonContent.includes('aria-label') && (textContent === '' || textContent.includes('×') || textContent.includes('+') || textContent.includes('-'))) {
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

findMissingAria('./src');
