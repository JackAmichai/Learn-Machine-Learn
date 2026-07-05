const fs = require('fs');

let c1 = fs.readFileSync('src/components/math/ActivationVisualizer.jsx', 'utf8');
c1 = c1.replace(
`    // Auto-switch function based on common keywords
    if (values.alpha !== undefined) setFunc('leakyrelu');
  }, [values.x, values.input, values.alpha]);`,
`    // Auto-switch function based on common keywords
    setTimeout(() => {
        if (values.alpha !== undefined) setFunc('leakyrelu');
    }, 0);
  }, [values.x, values.input, values.alpha]);`
);
fs.writeFileSync('src/components/math/ActivationVisualizer.jsx', c1);

let c2 = fs.readFileSync('src/components/math/LossVisualizer.jsx', 'utf8');
c2 = c2.replace(
`    if (values.actual !== undefined) setActual(values.actual);
    if (values.y !== undefined) setActual(values.y);
  }, [values, actual]);`,
`    setTimeout(() => {
        if (values.actual !== undefined) setActual(values.actual);
        if (values.y !== undefined) setActual(values.y);
    }, 0);
  }, [values, actual]);`
);
fs.writeFileSync('src/components/math/LossVisualizer.jsx', c2);

fs.unlinkSync('fix_lint2.js');
fs.unlinkSync('patch_duplicates.js');

let c3 = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
c3 = c3.replace(
`                    {items.map(({ id, title, subtitle, Tile }) => (`,
`                    {items.map(({ id, title, subtitle }) => (`
);
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', c3);
