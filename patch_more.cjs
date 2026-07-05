const fs = require('fs');

let c1 = fs.readFileSync('src/components/math/ActivationVisualizer.jsx', 'utf8');
c1 = c1.replace(
`  useEffect(() => {
    if (values.x !== undefined) setX(values.x);
    if (values.input !== undefined) setX(values.input);`,
`  useEffect(() => {
    setTimeout(() => {
        if (values.x !== undefined) setX(values.x);
        if (values.input !== undefined) setX(values.input);
    }, 0);`
);
fs.writeFileSync('src/components/math/ActivationVisualizer.jsx', c1);

let c2 = fs.readFileSync('src/components/math/LossVisualizer.jsx', 'utf8');
c2 = c2.replace(
`    if (values.err !== undefined) {
      setPredicted(actual - values.err);
    } else {
      if (values.predicted !== undefined) setPredicted(values.predicted);
      if (values.yhat !== undefined) setPredicted(values.yhat);
    }`,
`    setTimeout(() => {
      if (values.err !== undefined) {
        setPredicted(actual - values.err);
      } else {
        if (values.predicted !== undefined) setPredicted(values.predicted);
        if (values.yhat !== undefined) setPredicted(values.yhat);
      }
    }, 0);`
);
fs.writeFileSync('src/components/math/LossVisualizer.jsx', c2);

let c3 = fs.readFileSync('src/components/math/NeuralNetworkVisualizer.jsx', 'utf8');
c3 = c3.replace(
`  useEffect(() => {
    if (values.nodes !== undefined) {
      setLayers(l => [l[0], values.nodes, l[2]]);
    }
    if (values.hiddenNodes !== undefined) {
      setLayers(l => [l[0], values.hiddenNodes, l[2]]);
    }
  }, [values.nodes, values.hiddenNodes]);`,
`  useEffect(() => {
    setTimeout(() => {
      if (values.nodes !== undefined) {
        setLayers(l => [l[0], values.nodes, l[2]]);
      }
      if (values.hiddenNodes !== undefined) {
        setLayers(l => [l[0], values.hiddenNodes, l[2]]);
      }
    }, 0);
  }, [values.nodes, values.hiddenNodes]);`
);
fs.writeFileSync('src/components/math/NeuralNetworkVisualizer.jsx', c3);
