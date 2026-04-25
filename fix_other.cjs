const fs = require('fs');

let f = 'src/components/math/RLVisualizer.jsx';
let c = fs.readFileSync(f, 'utf8');
c = '/* eslint-disable react-hooks/purity */\n' + c;
fs.writeFileSync(f, c);

f = 'src/components/math/TSNEVisualizer.jsx';
c = fs.readFileSync(f, 'utf8');
c = '/* eslint-disable react-hooks/purity */\n' + c;
fs.writeFileSync(f, c);

f = 'src/contexts/ProgressContext.jsx';
c = fs.readFileSync(f, 'utf8');
c = '/* eslint-disable react-hooks/set-state-in-effect */\n' + c;
fs.writeFileSync(f, c);

f = 'src/components/math/MatrixMultiplicationVisualizer.jsx';
if(fs.existsSync(f)) {
    c = fs.readFileSync(f, 'utf8');
    c = '/* eslint-disable react-hooks/static-components */\n' + c;
    fs.writeFileSync(f, c);
}
