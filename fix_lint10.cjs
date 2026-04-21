const fs = require('fs');

// LandingHeroVisuals.jsx TileComponent defined but never used
let landingHero = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
landingHero = landingHero.replace(
    '// eslint-disable-next-line no-unused-vars\n                    {items.map(({ id, title, subtitle, Tile: TileComponent }) => (',
    '{items.map(({ id, title, subtitle, Tile: TileComponent }) => ('
);
// It was actually missing in the JSX rendering:
// <div className="hv-tile"><Tile /></div> should be <TileComponent />
// Let's replace:
landingHero = landingHero.replace(
    '<div className="hv-tile"><Tile /></div>',
    '<div className="hv-tile"><TileComponent /></div>'
);
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', landingHero);


// RLVisualizer.jsx & TSNEVisualizer.jsx: pseudorandom not defined
let rlVis = fs.readFileSync('src/components/math/RLVisualizer.jsx', 'utf8');
// The component is default exported with 'export default function RLVisualizer() {'
if (!rlVis.includes('function pseudorandom()')) {
    rlVis = rlVis.replace(
        'export default function RLVisualizer() {',
        'let seed = 1;\nfunction pseudorandom() {\n  let x = Math.sin(seed++) * 10000;\n  return x - Math.floor(x);\n}\n\nexport default function RLVisualizer() {'
    );
    fs.writeFileSync('src/components/math/RLVisualizer.jsx', rlVis);
}

let tsneVis = fs.readFileSync('src/components/math/TSNEVisualizer.jsx', 'utf8');
if (!tsneVis.includes('function pseudorandom()')) {
    tsneVis = tsneVis.replace(
        'export default function TSNEVisualizer() {',
        'let seed = 1;\nfunction pseudorandom() {\n  let x = Math.sin(seed++) * 10000;\n  return x - Math.floor(x);\n}\n\nexport default function TSNEVisualizer() {'
    );
    fs.writeFileSync('src/components/math/TSNEVisualizer.jsx', tsneVis);
}

// TensorVisualizer.jsx p000 is assigned a value but never used
// My previous code didn't replace it because the spacing might be different. Let's do a regex.
let tensorVis = fs.readFileSync('src/components/math/TensorVisualizer.jsx', 'utf8');
tensorVis = tensorVis.replace(
    /const \[p000, setP000\] = useState\(t\[0\]\[0\]\[0\]\);/g,
    'const [, setP000] = useState(t[0][0][0]);'
);
fs.writeFileSync('src/components/math/TensorVisualizer.jsx', tensorVis);
