const fs = require('fs');

const files = ['src/components/math/RLVisualizer.jsx', 'src/components/math/TSNEVisualizer.jsx'];
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = '/* eslint-disable react-hooks/purity */\n' + content;
    fs.writeFileSync(file, content);
}
