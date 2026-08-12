const fs = require('fs');
const content = fs.readFileSync('src/components/OutputPlot.jsx', 'utf8');
const isAsync = content.includes('await predsTensor.data()');
console.log('Is async?', isAsync);
