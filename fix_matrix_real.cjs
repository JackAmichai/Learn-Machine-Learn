const fs = require('fs');

let f = 'src/components/math/MatrixMultiplicationVisualizer.jsx';
let c = fs.readFileSync(f, 'utf8');

c = c.replace(/const Cell = \(\{ value, highlight, color = '#00f2ff' \}\) => \([\s\S]*?\);\n/g, '');

let comp = `
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

if (!c.includes('const Cell = ')) {
    c = c.replace('import React, { useState } from \'react\';', 'import React, { useState } from \'react\';\n' + comp);
}

fs.writeFileSync(f, c);
