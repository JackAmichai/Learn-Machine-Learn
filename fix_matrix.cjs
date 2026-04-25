const fs = require('fs');

let f = 'src/components/math/AttentionVisualizer.jsx';
let c = fs.readFileSync(f, 'utf8');
if (c.includes('/* eslint-disable react-hooks/static-components */')) {
    c = c.replace('/* eslint-disable react-hooks/static-components */\n', '');
    fs.writeFileSync(f, c);
}
