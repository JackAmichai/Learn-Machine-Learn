const fs = require('fs');

let tensorVis = fs.readFileSync('src/components/math/TensorVisualizer.jsx', 'utf8');
// Fix p000 is assigned a value but never used
tensorVis = tensorVis.replace(
    'const p000 = iso(x, y, z);',
    '// const p000 = iso(x, y, z);'
);
fs.writeFileSync('src/components/math/TensorVisualizer.jsx', tensorVis);
