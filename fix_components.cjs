const fs = require('fs');

// 1. Fix src/components/math/TensorVisualizer.jsx
let tv = fs.readFileSync('src/components/math/TensorVisualizer.jsx', 'utf8');
tv = tv.replace(/const p000 = [^;]+;/g, '');
fs.writeFileSync('src/components/math/TensorVisualizer.jsx', tv);

// 2. Fix src/components/math/EmbeddingVisualizer.jsx
let ev = fs.readFileSync('src/components/math/EmbeddingVisualizer.jsx', 'utf8');
ev = ev.replace(/, setVectors/, '');
ev = ev.replace(/const analogies = [^;]+;/g, '');
fs.writeFileSync('src/components/math/EmbeddingVisualizer.jsx', ev);

// 3. Fix src/components/MathModal.jsx
let mm = fs.readFileSync('src/components/MathModal.jsx', 'utf8');
mm = mm.replace(/, getNotebookLMLink/, '');
fs.writeFileSync('src/components/MathModal.jsx', mm);

// 4. Fix src/components/LandingHeroVisuals.jsx
let lhv = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
lhv = lhv.replace(/const Tile = [^}]+\}\);/g, ''); // we need a better regex for Tile
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', lhv);
