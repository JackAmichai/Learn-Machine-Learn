const fs = require('fs');

// Fix MathContent duplicate keys
let mathContent = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// There are duplicate 'visualizer' and 'interactiveFormulas' keys in mathContent.js
// E.g.
// visualizer: { type: 'ActivationVisualizer', initialValues: { function: 'sigmoid' } },
// visualizer: { type: 'ActivationVisualizer', initialValues: { function: 'relu' } },
// in the same object.
// We need to look at mathContent.js to understand the structure.
