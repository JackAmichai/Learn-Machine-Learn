const fs = require('fs');

let content = fs.readFileSync('src/contexts/ProgressContext.jsx', 'utf8');
content = content.replace(
`    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        setState(prev => {
            const today = todayStr();
            if (prev.lastActiveDate === today) return prev;
            const delta = daysBetween(prev.lastActiveDate, today);
            const nextStreak = delta === 1 ? prev.streakDays + 1 : 1;
            return { ...prev, lastActiveDate: today, streakDays: nextStreak };
        });
    }, []);`,
`    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        setTimeout(() => {
            setState(prev => {
                const today = todayStr();
                if (prev.lastActiveDate === today) return prev;
                const delta = daysBetween(prev.lastActiveDate, today);
                const nextStreak = delta === 1 ? prev.streakDays + 1 : 1;
                return { ...prev, lastActiveDate: today, streakDays: nextStreak };
            });
        }, 0);
    }, []);`
);
fs.writeFileSync('src/contexts/ProgressContext.jsx', content);

let content2 = fs.readFileSync('src/components/math/PCAVisualizer.jsx', 'utf8');
content2 = content2.replace(
`  useEffect(() => {
    if (values.lambda1 !== undefined) setComponent1(values.lambda1);
    if (values.lambda2 !== undefined) setComponent2(values.lambda2);
    if (values.lambda3 !== undefined) setComponent3(values.lambda3);
  }, [values.lambda1, values.lambda2, values.lambda3]);`,
`  useEffect(() => {
    setTimeout(() => {
      if (values.lambda1 !== undefined) setComponent1(values.lambda1);
      if (values.lambda2 !== undefined) setComponent2(values.lambda2);
      if (values.lambda3 !== undefined) setComponent3(values.lambda3);
    }, 0);
  }, [values.lambda1, values.lambda2, values.lambda3]);`
);
fs.writeFileSync('src/components/math/PCAVisualizer.jsx', content2);
