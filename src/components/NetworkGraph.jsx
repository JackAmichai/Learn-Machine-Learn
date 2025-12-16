export function NetworkGraph({ model, structure, modelVersion }) {
    // Extract weights for visualization (recomputed when modelVersion increments)
    const weights = (() => {
        const version = modelVersion;
        if (version === null || version === undefined) {
            return [];
        }
        if (!model || !model.model) return [];
        try {
            return model.model.layers.map(layer => {
                const [kernel] = layer.getWeights();
                return kernel ? kernel.dataSync() : null;
            });
        } catch {
            return [];
        }
    })();

    // Calculate generic coords
    const svgWidth = 600;
    const svgHeight = 400;

    const layerSpacing = svgWidth / (structure.length + 1);

    const getCoords = (layerIdx, nodeIdx, layerSize) => {
        const x = (layerIdx + 1) * layerSpacing;
        // Center nodes vertically
        const totalH = Math.min(layerSize * 40, svgHeight - 40);
        const spacingH = totalH / (layerSize + 1); // space between nodes

        const startY = (svgHeight - totalH) / 2;
        const y = startY + (nodeIdx + 1) * spacingH;
        return { x, y };
    };

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ overflow: 'visible' }}>
            {/* Connections */}
            {structure.map((layerSize, lIdx) => {
                if (lIdx === structure.length - 1) return null; // No connections from output forward

                const nextLayerSize = structure[lIdx + 1];
                const currentWeights = weights[lIdx]; // Flattened array: [from1to1, from1to2, ..., from2to1...]

                // Weights logic: shape is [input, output]
                // dataSync returns generic array.
                // TF Dense kernel structure: [input_dim, output_dim]
                // Access w[i * output_dim + j] connects input i to output j

                const connections = [];
                for (let i = 0; i < layerSize; i++) {
                    for (let j = 0; j < nextLayerSize; j++) {
                        const start = getCoords(lIdx, i, layerSize);
                        const end = getCoords(lIdx + 1, j, nextLayerSize);

                        let wVal = 0;
                        if (currentWeights) {
                            wVal = currentWeights[i * nextLayerSize + j];
                        }

                        // Style based on weight
                        const alpha = Math.min(Math.abs(wVal), 1);
                        const color = wVal > 0 ? '#00f2ff' : '#ff0055';
                        const strokeWidth = Math.max(0.5, Math.abs(wVal) * 2);

                        connections.push(
                            <line
                                key={`${lIdx}-${i}-${j}`}
                                x1={start.x} y1={start.y}
                                x2={end.x} y2={end.y}
                                stroke={color}
                                strokeWidth={strokeWidth}
                                strokeOpacity={alpha * 0.6 + 0.1}
                            />
                        );
                    }
                }
                return <g key={lIdx}>{connections}</g>;
            })}

            {/* Nodes */}
            {structure.map((layerSize, lIdx) => {
                return Array.from({ length: layerSize }).map((_, nIdx) => {
                    const { x, y } = getCoords(lIdx, nIdx, layerSize);
                    const isInput = lIdx === 0;
                    const isOutput = lIdx === structure.length - 1;

                    let fill = '#13131f';
                    let stroke = '#555';

                    if (isInput) { stroke = '#fff'; }
                    else if (isOutput) { stroke = '#fff'; }

                    return (
                        <circle
                            key={`node-${lIdx}-${nIdx}`}
                            cx={x} cy={y}
                            r={isInput || isOutput ? 10 : 8}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth="2"
                        />
                    );
                });
            })}
        </svg>
    );
}
