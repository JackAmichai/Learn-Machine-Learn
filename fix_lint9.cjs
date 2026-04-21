const fs = require('fs');

let progCtx = fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8');
progCtx = progCtx.replace(
    /setState\(prev => \{([\s\S]*?)lastActiveDate: today,([\s\S]*?)streak: delta === 1 \? prev.streak \+ 1 : \(delta > 1 \? 1 : prev.streak\)([\s\S]*?)\};\n        \}\);/g,
    'setTimeout(() => setState(prev => {$1lastActiveDate: today,$2streak: delta === 1 ? prev.streak + 1 : (delta > 1 ? 1 : prev.streak)$3}; }), 0);'
);
fs.writeFileSync('src/contexts/ProgressContext.jsx', progCtx);
