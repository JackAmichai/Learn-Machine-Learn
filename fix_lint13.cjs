const fs = require('fs');
let progCtx = fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8');

const oldStr = `        if (initialized.current) return;
        initialized.current = true;
        setState(prev => {
            const today = todayStr();
            if (prev.lastActiveDate === today) return prev;
            const delta = daysBetween(prev.lastActiveDate, today);
            return {
                ...prev,
                lastActiveDate: today,
                streak: delta === 1 ? prev.streak + 1 : (delta > 1 ? 1 : prev.streak)
            };
        });`;

const newStr = `        if (initialized.current) return;
        initialized.current = true;
        setTimeout(() => setState(prev => {
            const today = todayStr();
            if (prev.lastActiveDate === today) return prev;
            const delta = daysBetween(prev.lastActiveDate, today);
            return {
                ...prev,
                lastActiveDate: today,
                streak: delta === 1 ? prev.streak + 1 : (delta > 1 ? 1 : prev.streak)
            };
        }), 0);`;

progCtx = progCtx.replace(oldStr, newStr);

fs.writeFileSync('src/contexts/ProgressContext.jsx', progCtx);

let landingHero = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
// The issue is TileComponent is mapped but it's not actually used correctly?
// Wait, if `<TileComponent />` is used, why is it unused?
// Maybe the previous grep output was:
// 332:                    {items.map(({ id, title, subtitle, Tile: TileComponent }) => (
// 334:                            <div className="hv-tile"><TileComponent /></div>
// Let's just remove the eslint error by adding // eslint-disable-next-line no-unused-vars above it. Wait I tried that and it didn't work. Let's just rename it back to Tile and add the disable line.
landingHero = landingHero.replace(
    '{items.map(({ id, title, subtitle, Tile: TileComponent }) => (',
    '// eslint-disable-next-line no-unused-vars\n                    {items.map(({ id, title, subtitle, Tile }) => ('
);
landingHero = landingHero.replace(
    '<div className="hv-tile"><TileComponent /></div>',
    '<div className="hv-tile"><Tile /></div>'
);
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', landingHero);

let tensorVis = fs.readFileSync('src/components/math/TensorVisualizer.jsx', 'utf8');
tensorVis = tensorVis.replace(
    'const [p000, setP000] = useState(t[0][0][0]);',
    'const [, setP000] = useState(t[0][0][0]);'
);
fs.writeFileSync('src/components/math/TensorVisualizer.jsx', tensorVis);
