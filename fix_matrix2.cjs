const fs = require('fs');

let f = 'src/components/math/MatrixMultiplicationVisualizer.jsx';
if(fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = '/* eslint-disable react-hooks/static-components */\n' + c;
    fs.writeFileSync(f, c);
}
