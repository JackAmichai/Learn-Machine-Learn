const fs = require('fs');

let progCtx = fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8');
// Reset first
fs.writeFileSync('src/contexts/ProgressContext.jsx', fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8'));

// Ah I did git restore but it didn't reset my manual changes if they were not committed.
