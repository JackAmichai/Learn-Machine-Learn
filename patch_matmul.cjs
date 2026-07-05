const fs = require('fs');

let content = fs.readFileSync('src/components/math/MatMulVisualizer.jsx', 'utf8');
content = content.replace(
`    const Cell = ({ value, highlight, color = '#00f2ff' }) => (
        <div className="mm-cell" style={{
            background: highlight ? \`\${color}22\` : 'rgba(255,255,255,0.04)',
            borderColor: highlight ? color : 'rgba(255,255,255,0.08)',
            color: highlight ? color : 'var(--text-secondary)',
            fontWeight: highlight ? 700 : 400,
        }}>
            {typeof value === 'number' ? value.toFixed(2) : value}
        </div>
    );`,
""
);

const cellCode = `
const Cell = ({ value, highlight, color = '#00f2ff' }) => (
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

content = content.replace('export function MatMulVisualizer({ formula }) {', cellCode + '\nexport function MatMulVisualizer({ formula }) {');

fs.writeFileSync('src/components/math/MatMulVisualizer.jsx', content);
