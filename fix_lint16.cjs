const fs = require('fs');

let landingHero = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
// To satisfy eslint no-unused-vars, but we ARE using it: <_Tile />
// Eslint plugin react/jsx-uses-vars usually handles this, but maybe it's not configured right.
// Let's just disable it directly on the line.
landingHero = landingHero.replace(
    '{items.map(({ id, title, subtitle, Tile: _Tile }) => (',
    '// eslint-disable-next-line no-unused-vars\n                    {items.map(({ id, title, subtitle, Tile: _Tile }) => ('
);
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', landingHero);

let tensorVis = fs.readFileSync('src/components/math/TensorVisualizer.jsx', 'utf8');
tensorVis = tensorVis.replace(
    'const [p000, setP000] = useState(t[0][0][0]);',
    'const [, setP000] = useState(t[0][0][0]);'
);
fs.writeFileSync('src/components/math/TensorVisualizer.jsx', tensorVis);
