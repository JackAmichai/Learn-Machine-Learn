const fs = require('fs');

// LandingHeroVisuals.jsx TileComponent defined but never used
let landingHero = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
landingHero = landingHero.replace(
    '{items.map(({ id, title, subtitle, Tile: TileComponent }) => (',
    '{items.map(({ id, title, subtitle, Tile: TileComponent }) => ('
);
// It is used here:
// <div className="hv-tile"><TileComponent /></div>
// Let's check how it's written in the file.
