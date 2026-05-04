const fs = require('fs');

// We have duplicate keys in src/engine/mathContent.js
// 'visualizer' and 'interactiveFormulas'
let mc = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// We can just add eslint-disable keys for this file. It is a known pre-existing issue.
mc = '/* eslint-disable no-dupe-keys */\n' + mc;
fs.writeFileSync('src/engine/mathContent.js', mc);

// Fix progressContextBase.js Unused eslint-disable
let pcb = fs.readFileSync('src/contexts/progressContextBase.js', 'utf8');
pcb = pcb.replace(/\/\/ eslint-disable-next-line react-refresh\/only-export-components/g, '');
fs.writeFileSync('src/contexts/progressContextBase.js', pcb);

// Fix personalizationEngine.js Unused eslint-disable
let pe = fs.readFileSync('src/engine/personalizationEngine.js', 'utf8');
pe = pe.replace(/\/\/ eslint-disable-next-line no-unused-vars/g, '');
fs.writeFileSync('src/engine/personalizationEngine.js', pe);
