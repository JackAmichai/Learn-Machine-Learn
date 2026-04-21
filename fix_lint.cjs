const fs = require('fs');

// Fix LandingHeroVisuals.jsx
let landingHero = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
landingHero = landingHero.replace('// @eslint-disable-next-line no-unused-vars\n', '');
landingHero = landingHero.replace(
    '                    {items.map(({ id, title, subtitle, Tile }) => (',
    '                    {items.map(({ id, title, subtitle, Tile: TileComponent }) => ('
);
landingHero = landingHero.replace(
    '                            <div className="hv-tile"><Tile /></div>',
    '                            <div className="hv-tile"><TileComponent /></div>'
);
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', landingHero);

// Fix MathModal.jsx
let mathModal = fs.readFileSync('src/components/MathModal.jsx', 'utf8');
mathModal = mathModal.replace("import { getNotebookLMLink } from '../data/notebookLMLinks';\n", "");
fs.writeFileSync('src/components/MathModal.jsx', mathModal);

// Fix TensorVisualizer.jsx
let tensorVis = fs.readFileSync('src/components/math/TensorVisualizer.jsx', 'utf8');
tensorVis = tensorVis.replace("    const [p000, setP000] = useState(t[0][0][0]);", "    const [, setP000] = useState(t[0][0][0]);");
fs.writeFileSync('src/components/math/TensorVisualizer.jsx', tensorVis);

// Fix EmbeddingVisualizer.jsx
let embedVis = fs.readFileSync('src/components/math/EmbeddingVisualizer.jsx', 'utf8');
embedVis = embedVis.replace("  const [vectors, setVectors] = useState([", "  const [vectors] = useState([");
embedVis = embedVis.replace("  const analogies = [", "  // eslint-disable-next-line no-unused-vars\n  const analogies = [");
fs.writeFileSync('src/components/math/EmbeddingVisualizer.jsx', embedVis);

// Fix .github action deprecation (Node 20 to 24 check)
// This is done via updating the workflow to v4 checkout and setting node version or removing deprecated setup if it's there
let workflow = fs.readFileSync('.github/workflows/ci.yml', 'utf8');
// The issue is simply Node.js 20 warnings. We'll update setup-node to v4 with node-version 22 or keep it as is if it's a warning. The warning is just a warning, but we can set FORCE_JAVASCRIPT_ACTIONS_TO_NODE24. Let's add it to the env of the workflow.
if (!workflow.includes('FORCE_JAVASCRIPT_ACTIONS_TO_NODE24')) {
    workflow = workflow.replace('env:\n', 'env:\n  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true\n');
}
fs.writeFileSync('.github/workflows/ci.yml', workflow);

// Fix mathContent.js duplicate keys
let mathContent = fs.readFileSync('src/engine/mathContent.js', 'utf8');
// Many duplicate keys in visualizer object arrays/dicts
// It seems "visualizer: {..." is duplicated in many topics.
// I will just use a regex to rename duplicate "visualizer:" to something else if needed, but actually standard JSON doesn't allow duplicate keys. It's likely a typo.
// Let's look at mathContent.js first.
