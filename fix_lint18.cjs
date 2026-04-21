const fs = require('fs');

let landingHero = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');

// The JSX comment format is incorrect: `// eslint-disable-next-line no-unused-vars` inside JSX should be `{/* eslint-disable-next-line no-unused-vars */}`
// But `_Tile` is definitely used inside `<_Tile />`.
// Let's change the name to start with an uppercase letter, `TileComponent`, and remove the disable comment. Wait, I tried `TileComponent` earlier and it failed with "TileComponent is defined but never used".
// This happens when eslint-plugin-react is not configured to catch JSX usages, or `react/jsx-uses-vars` is missing.
// If it fails no matter what, we can just use `React.createElement(Tile)` instead of JSX.

landingHero = landingHero.replace(
    '// eslint-disable-next-line no-unused-vars\n                    {items.map(({ id, title, subtitle, Tile: _Tile }) => (',
    '{items.map(({ id, title, subtitle, Tile }) => ('
);

landingHero = landingHero.replace(
    '<div className="hv-tile"><_Tile /></div>',
    '<div className="hv-tile">{Tile && <Tile />}</div>'
);
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', landingHero);
