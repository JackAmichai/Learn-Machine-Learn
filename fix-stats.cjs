const fs = require('fs');
let path = 'src/components/StatsPanel.jsx';
let content = fs.readFileSync(path, 'utf8');

// Need to add tf import back
let search = `import { useEffect, useState } from 'react';
import { Tooltip } from './Tooltip';`;
let replace = `import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Tooltip } from './Tooltip';`;

content = content.replace(search, replace);
fs.writeFileSync(path, content, 'utf8');
