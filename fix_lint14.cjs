const fs = require('fs');

let progCtx = fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8');
// The issue "Parsing error: Unexpected token ;" is at line 117.
