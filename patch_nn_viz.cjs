const fs = require('fs');
let content = fs.readFileSync('src/components/math/NeuralNetworkVisualizer.jsx', 'utf8');

content = content.replace(
`  useEffect(() => {
    if (values.nodes !== undefined) {
      setLayers([layers[0], values.nodes, layers[2]]);
    }
    if (values.hiddenNodes !== undefined) {
      setLayers([layers[0], values.hiddenNodes, layers[2]]);
    }
  }, [values.nodes, values.hiddenNodes]);`,
`  useEffect(() => {
    if (values.nodes !== undefined) {
      setLayers(l => [l[0], values.nodes, l[2]]);
    }
    if (values.hiddenNodes !== undefined) {
      setLayers(l => [l[0], values.hiddenNodes, l[2]]);
    }
  }, [values.nodes, values.hiddenNodes]);`
);
fs.writeFileSync('src/components/math/NeuralNetworkVisualizer.jsx', content);
