const fs = require('fs');

// 1. MathModal Security Fix (our actual task)
let contentMM = fs.readFileSync('src/components/MathModal.jsx', 'utf8');
contentMM = contentMM.replace("import { useState, useContext } from 'react';", "import { useState, useContext } from 'react';\nimport DOMPurify from 'dompurify';");
contentMM = contentMM.replace("dangerouslySetInnerHTML={{ __html: data.content }}", "dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content, { USE_PROFILES: { html: true, mathMl: true, svg: true } }) }}");
contentMM = contentMM.replace("dangerouslySetInnerHTML={{ __html: data.solved }}", "dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.solved, { USE_PROFILES: { html: true, mathMl: true, svg: true } }) }}");
contentMM = contentMM.replace("dangerouslySetInnerHTML={{ __html: data.shortcomings }}", "dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.shortcomings, { USE_PROFILES: { html: true, mathMl: true, svg: true } }) }}");
contentMM = contentMM.replace("import { getNotebookLMLink } from '../data/notebookLMLinks';\n", ''); // CI fix unused var
fs.writeFileSync('src/components/MathModal.jsx', contentMM);


// Sentinel Journal
if (!fs.existsSync('.jules')) fs.mkdirSync('.jules');
fs.writeFileSync('.jules/sentinel.md', `## 2024-05-18 - Fix XSS Vulnerability in MathModal
**Vulnerability:** Unsanitized user inputs in \`dangerouslySetInnerHTML\`.
**Learning:** \`dangerouslySetInnerHTML\` directly renders HTML from strings which can expose the application to cross-site scripting (XSS) attacks. Using DOMPurify to sanitize inputs ensures malicious scripts aren't executed.
**Prevention:** Always sanitize inputs meant for \`dangerouslySetInnerHTML\` using \`DOMPurify.sanitize(input)\`. Ensure you configure appropriate DOMPurify profiles like \`USE_PROFILES: { html: true, mathMl: true, svg: true }\` if required for styling/structure.
`);

// Fix LandingHeroVisuals.jsx
let contentLHV = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
contentLHV = contentLHV.replace(/\{items\.map\(\(\{ id, title, subtitle, Tile \}\) => \(\s*<article key=\{id\} className="hv-card">\s*<div className="hv-tile"><Tile \/><\/div>\s*<div className="hv-meta">\s*<h3>\{title\}<\/h3>\s*<p>\{subtitle\}<\/p>\s*<\/div>\s*<\/article>\s*\)\)\}/, `{items.map(({ id, title, subtitle, Tile }) => {
                        const TileComponent = Tile;
                        return (
                        <article key={id} className="hv-card">
                            <div className="hv-tile"><TileComponent /></div>
                            <div className="hv-meta">
                                <h3>{title}</h3>
                                <p>{subtitle}</p>
                            </div>
                        </article>
                    )})}`);
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', contentLHV);

// Fix TensorVisualizer.jsx unused var
let contentTV = fs.readFileSync('src/components/math/TensorVisualizer.jsx', 'utf8');
contentTV = contentTV.replace('        const p000 = iso(x, y, z);\n', '');
fs.writeFileSync('src/components/math/TensorVisualizer.jsx', contentTV);

// Fix EmbeddingVisualizer.jsx unused var
let contentEV = fs.readFileSync('src/components/math/EmbeddingVisualizer.jsx', 'utf8');
contentEV = contentEV.replace('const [vectors, setVectors] = useState', 'const [vectors] = useState');
contentEV = contentEV.replace(/  const analogies = \[\n    \{ a: 'King', b: 'Queen', c: 'Man', expected: 'Woman' \},\n  \];\n/, '');
fs.writeFileSync('src/components/math/EmbeddingVisualizer.jsx', contentEV);

// Fix MatMulVisualizer.jsx nested component
let contentMMV = fs.readFileSync('src/components/math/MatMulVisualizer.jsx', 'utf8');
const cellDef = `    const Cell = ({ value, highlight, color = '#00f2ff' }) => (
        <div className="mm-cell" style={{
            background: highlight ? \`\${color}22\` : 'rgba(255,255,255,0.04)',
            borderColor: highlight ? color : 'rgba(255,255,255,0.08)',
            color: highlight ? color : 'var(--text-secondary)',
            fontWeight: highlight ? 700 : 400,
        }}>
            {typeof value === 'number' ? value.toFixed(2) : value}
        </div>
    );
`;
contentMMV = contentMMV.replace(cellDef, '');
contentMMV = contentMMV.replace('export default function MatMulVisualizer({ values = {} }) {\n', cellDef + '\nexport default function MatMulVisualizer({ values = {} }) {\n');
fs.writeFileSync('src/components/math/MatMulVisualizer.jsx', contentMMV);
