const fs = require('fs');
let content = fs.readFileSync('src/engine/mathContent.js', 'utf8');

// The issue was duplicates visualizer keys in some objects.
const lines = content.split('\n');

const newLines = [];
let braceCount = 0;
let currentKey = null;
let currentObjHasVisualizer = false;

// Simple parser to remove duplicate keys at the top level of each object within MATH_TOPICS
// This is fragile but works if the format is consistent.
// A better way is to use regex or a parser, but since there are only 20 dupes, let's just use sed to delete the specific lines.
