const fs = require('fs');

let progCtx = fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8');

// I replaced the wrong string previously or didn't replace it fully.
// Notice `});` instead of `}), 0);`. I need to fix it.
progCtx = progCtx.replace(
    /return \{ \.\.\.prev, lastActiveDate: today, streakDays: nextStreak \};\n        \}\);/g,
    'return { ...prev, lastActiveDate: today, streakDays: nextStreak };\n        }), 0);'
);

fs.writeFileSync('src/contexts/ProgressContext.jsx', progCtx);

let tensorVis = fs.readFileSync('src/components/math/TensorVisualizer.jsx', 'utf8');
// Fix p000 is assigned a value but never used
tensorVis = tensorVis.replace(
    'const [p000, setP000] = useState(t[0][0][0]);',
    'const [, setP000] = useState(t[0][0][0]);'
);
fs.writeFileSync('src/components/math/TensorVisualizer.jsx', tensorVis);

let landingHero = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
// Tile is defined but never used error
landingHero = landingHero.replace(
    '// eslint-disable-next-line no-unused-vars\n                    {items.map(({ id, title, subtitle, Tile }) => (',
    '{items.map(({ id, title, subtitle, Tile }) => ('
);
landingHero = landingHero.replace(
    '{items.map(({ id, title, subtitle, Tile }) => (',
    '{items.map(({ id, title, subtitle, Tile: _Tile }) => ('
);
landingHero = landingHero.replace(
    '<div className="hv-tile"><Tile /></div>',
    '<div className="hv-tile"><_Tile /></div>'
);
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', landingHero);
