sed -i 's/const p001 = iso(x, y, z + 1);//g' src/components/math/TensorVisualizer.jsx
sed -i '/const p100 = iso(x + 1, y, z);/i \        const p001 = iso(x, y, z + 1);' src/components/math/TensorVisualizer.jsx
