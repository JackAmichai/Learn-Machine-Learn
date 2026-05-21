const fs = require('fs');
const content = fs.readFileSync('src/components/OutputPlot.jsx', 'utf8');
console.log(content.includes('dataSync'));
