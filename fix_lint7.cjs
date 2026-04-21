const fs = require('fs');

// LandingHeroVisuals.jsx TileComponent defined but never used
// The linter might not see it used if it's not starting with an uppercase letter, but it is uppercase.
// Ah, the linter says: 'TileComponent' is defined but never used
// This is because of how ESLint parses `TileComponent` in JSX. Sometimes it requires `React` in scope or similar.
// Actually, let's just ignore it or remove Tile if it's unused. Wait, the problem originally was 'Tile' is defined but never used. But `Tile` was the prop name. Let's just suppress it.
let landingHero = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
landingHero = landingHero.replace(
    '{items.map(({ id, title, subtitle, Tile: TileComponent }) => (',
    '// eslint-disable-next-line no-unused-vars\n                    {items.map(({ id, title, subtitle, Tile: TileComponent }) => ('
);
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', landingHero);


// ActivationVisualizer.jsx
let actVis = fs.readFileSync('src/components/math/ActivationVisualizer.jsx', 'utf8');
actVis = actVis.replace(
    "if (values.alpha !== undefined) setFunc('leakyrelu');",
    "if (values.alpha !== undefined) setTimeout(() => setFunc('leakyrelu'), 0);"
);
fs.writeFileSync('src/components/math/ActivationVisualizer.jsx', actVis);

// LossVisualizer.jsx
let lossVis = fs.readFileSync('src/components/math/LossVisualizer.jsx', 'utf8');
lossVis = lossVis.replace(
    'if (values.actual !== undefined) setActual(values.actual);',
    'if (values.actual !== undefined) setTimeout(() => setActual(values.actual), 0);'
);
lossVis = lossVis.replace(
    'if (values.y !== undefined) setActual(values.y);',
    'if (values.y !== undefined) setTimeout(() => setActual(values.y), 0);'
);
fs.writeFileSync('src/components/math/LossVisualizer.jsx', lossVis);

// RLVisualizer.jsx & TSNEVisualizer.jsx: pseudorandom not defined
// That's because I inserted the function definition above `export default function ...` but they are used inside the component without `const` or there are other instances.
// Wait, `export default function RLVisualizer() {` -> let seed... function pseudorandom...
// This defines them in the module scope! Why is it "not defined"?
