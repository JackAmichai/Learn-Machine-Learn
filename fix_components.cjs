const fs = require('fs');

const file = 'src/components/Controls.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/const handleImportFile = \(event\) => \{[\s\S]*?reader\.readAsText\(file\);\n    \};/, `const handleImportFile = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setStatus('error', 'File is larger than 5MB — try a smaller file.');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            try {
                importModelJSON(reader.result);
                setStatus('success', \`Imported \${file.name}.\`);
            } catch (err) {
                setStatus('error', err.message);
            } finally {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        };
        reader.readAsText(file);
    };`);
fs.writeFileSync(file, content);
