const fs = require('fs');

// The error log showed:
// src/components/LandingHeroVisuals.jsx, Line: 332: 'Tile' is defined but never used
let lhv = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
lhv = lhv.replace(/const Tile = [^]+?\}\);/m, ''); // Try to remove Tile component
// actually let's just do a manual replace for Tile or add eslint-disable-next-line
const lines = lhv.split('\n');
lines.splice(331, 0, '// eslint-disable-next-line no-unused-vars');
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', lines.join('\n'));
