const fs = require('fs');

const file = 'src/components/math/LinearAlgebraVisualizer.jsx';
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/const Cell = \(\{\s*value,\s*highlight,\s*color\s*=\s*'#00f2ff'\s*\}\) => \([\s\S]*?\);\n/g, '');
  content = `const Cell = ({ value, highlight, color = '#00f2ff' }) => (
    <div className="mm-cell" style={{
        background: highlight ? \`\${color}22\` : 'rgba(255,255,255,0.04)',
        borderColor: highlight ? color : 'rgba(255,255,255,0.08)',
        color: highlight ? color : 'var(--text-secondary)',
        fontWeight: highlight ? 700 : 400,
    }}>
        {typeof value === 'number' ? value.toFixed(2) : value}
    </div>
);\n\n` + content;
  fs.writeFileSync(file, content);
}
