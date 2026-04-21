const fs = require('fs');

let progCtx = fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8');

// The original block was:
//         setState(prev => {
//             const today = todayStr();
//             if (prev.lastActiveDate === today) return prev;
//             const delta = daysBetween(prev.lastActiveDate, today);
//             return {
//                 ...prev,
//                 lastActiveDate: today,
//                 streak: delta === 1 ? prev.streak + 1 : (delta > 1 ? 1 : prev.streak)
//             };
//         });

progCtx = progCtx.replace(
    'setState(prev => {',
    'setTimeout(() => setState(prev => {'
);
progCtx = progCtx.replace(
    '            };\n        });\n    }, []);',
    '            };\n        }), 0);\n    }, []);'
);

fs.writeFileSync('src/contexts/ProgressContext.jsx', progCtx);
