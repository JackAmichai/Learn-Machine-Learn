const fs = require('fs');

let secPath = 'src/engine/NeuralNetwork.security.test.js';
let content = fs.readFileSync(secPath, 'utf8');

// We have 1 failure left to fix in NeuralNetwork.security.test.js
let search = `        it('should default to "sigmoid" when invalid outputActivation is provided', () => {
            const safeNN = new NeuralNetwork({ outputActivation: 'malicious-script-injection' });
            expect(safeNN.config.outputActivation).toBe('sigmoid');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid outputActivation"));
            safeNN.dispose();
        });`;
let replace = `        it('should default to "sigmoid" when invalid outputActivation is provided', () => {
            const safeNN = new NeuralNetwork({ outputActivation: 'malicious-script-injection' });
            expect(safeNN.config.outputActivation).toBe('sigmoid');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid output activation"));
            safeNN.dispose();
        });`;

content = content.replace(search, replace);
fs.writeFileSync(secPath, content, 'utf8');
