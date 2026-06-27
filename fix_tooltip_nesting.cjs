const fs = require('fs');
const content = fs.readFileSync('src/components/Controls.jsx', 'utf8');
const newContent = content.replace(/<label><Tooltip word="Learning Rate" \/><\/label>/g, '<div className="hp-label-container"><label htmlFor="learning-rate">Learning Rate</label><Tooltip word="Learning Rate" /></div>')
    .replace(/<input type="range" min="0.001" max="0.3" step="0.001" value={hyperparams.learningRate}/g, '<input id="learning-rate" type="range" min="0.001" max="0.3" step="0.001" value={hyperparams.learningRate}')
    .replace(/<label><Tooltip word="Activation" \/><\/label>/g, '<div className="hp-label-container"><label htmlFor="activation-select">Activation</label><Tooltip word="Activation" /></div>')
    .replace(/<select value={hyperparams.activation}/g, '<select id="activation-select" value={hyperparams.activation}')
    .replace(/<label><Tooltip word="Optimizer" \/><\/label>/g, '<div className="hp-label-container"><label htmlFor="optimizer-select">Optimizer</label><Tooltip word="Optimizer" /></div>')
    .replace(/<select value={hyperparams.optimizer}/g, '<select id="optimizer-select" value={hyperparams.optimizer}')
    .replace(/<label><Tooltip word="Batch Size" \/><\/label>/g, '<div className="hp-label-container"><label htmlFor="batch-size">Batch Size</label><Tooltip word="Batch Size" /></div>')
    .replace(/<input type="range" min="1" max="128" step="1" value={hyperparams.batchSize/g, '<input id="batch-size" type="range" min="1" max="128" step="1" value={hyperparams.batchSize');
fs.writeFileSync('src/components/Controls.jsx', newContent);
