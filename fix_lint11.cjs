const fs = require('fs');

let progCtx = fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8');

// Replace exact match to avoid breaking syntax
const oldStr = `        if (initialized.current) return;
        initialized.current = true;
        setState(prev => {
            const today = todayStr();
            if (prev.lastActiveDate === today) return prev;
            const delta = daysBetween(prev.lastActiveDate, today);
            return {
                ...prev,
                lastActiveDate: today,
                streak: delta === 1 ? prev.streak + 1 : (delta > 1 ? 1 : prev.streak)
            };
        });`;

const newStr = `        if (initialized.current) return;
        initialized.current = true;
        setTimeout(() => setState(prev => {
            const today = todayStr();
            if (prev.lastActiveDate === today) return prev;
            const delta = daysBetween(prev.lastActiveDate, today);
            return {
                ...prev,
                lastActiveDate: today,
                streak: delta === 1 ? prev.streak + 1 : (delta > 1 ? 1 : prev.streak)
            };
        }), 0);`;

progCtx = progCtx.replace(oldStr, newStr);

fs.writeFileSync('src/contexts/ProgressContext.jsx', progCtx);

let rlVis = fs.readFileSync('src/components/math/RLVisualizer.jsx', 'utf8');
if (rlVis.includes('pseudorandom()') && !rlVis.includes('function pseudorandom()')) {
    rlVis = `let seed = 1;
function pseudorandom() {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
` + rlVis;
    fs.writeFileSync('src/components/math/RLVisualizer.jsx', rlVis);
}

let tsneVis = fs.readFileSync('src/components/math/TSNEVisualizer.jsx', 'utf8');
if (tsneVis.includes('pseudorandom()') && !tsneVis.includes('function pseudorandom()')) {
    tsneVis = `let seed = 1;
function pseudorandom() {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
` + tsneVis;
    fs.writeFileSync('src/components/math/TSNEVisualizer.jsx', tsneVis);
}
