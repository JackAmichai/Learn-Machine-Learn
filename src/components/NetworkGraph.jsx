import { memo, useState, useEffect } from 'react';

export const NetworkGraph = memo(function NetworkGraph({ model, structure, modelVersion, deadNeurons }) {
    // Extract weights for visualization (recomputed when modelVersion increments)
    const [connectionWeights, setConnectionWeights] = useState([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchWeights() {
            if (modelVersion === null || modelVersion === undefined || !model || !Array.isArray(structure)) {
                if (isMounted) setConnectionWeights([]);
                return;
            }

            try {
                const layersToFetch = structure.length - 1;
                // Optimization: Use async data extraction to avoid blocking UI thread
                if (typeof model.getConnectionWeightsAsync === 'function') {
                    const promises = [];
                    for (let i = 0; i < layersToFetch; i++) {
                        promises.push(model.getConnectionWeightsAsync(i));
                    }
                    const results = await Promise.all(promises);
                    if (isMounted) setConnectionWeights(results);
                }
                // Fallback for sync
                else if (typeof model.getConnectionWeights === 'function') {
                    const results = structure.slice(0, -1).map((_, idx) => model.getConnectionWeights(idx));
                    if (isMounted) setConnectionWeights(results);
                }
                // Legacy fallback
                else if (model.model && model.model.layers) {
                    const results = model.model.layers.map(layer => {
                        const weights = layer.getWeights();
                        if (!weights.length) return null;
                        const kernel = weights[0];
                        return kernel ? kernel.dataSync() : null;
                    });
                    if (isMounted) setConnectionWeights(results);
                } else {
                    if (isMounted) setConnectionWeights([]);
                }
            } catch (error) {
                console.error('Error fetching weights:', error);
                if (isMounted) setConnectionWeights([]);
            }
        }

        fetchWeights();

        return () => {
            isMounted = false;
        };
    }, [model, structure, modelVersion]);
            }
        }
<<<<<<< HEAD

        fetchWeights();

        return () => {
            isMounted = false;
        };
=======
>>>>>>> origin/bolt-perf-memoize-weights-17856722670067585164
    }, [model, structure, modelVersion]);

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
                const currentWeights = connectionWeights[lIdx]; // Flattened array: [from1to1, from1to2, ..., from2to1...]

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
                const layerDeadIndices = deadNeurons && deadNeurons[lIdx] ? deadNeurons[lIdx] : [];
                return Array.from({ length: layerSize }).map((_, nIdx) => {
                    const { x, y } = getCoords(lIdx, nIdx, layerSize);
                    const isInput = lIdx === 0;
                    const isOutput = lIdx === structure.length - 1;
                    const isDead = layerDeadIndices.includes(nIdx);

                    let fill = '#13131f';
                    let stroke = '#555';

                    if (isDead) {
                        fill = '#4a0000'; // Dark red fill
                        stroke = '#ff4444'; // Bright red stroke
                    } else if (isInput) {
                        stroke = '#fff';
                    } else if (isOutput) {
                        stroke = '#fff';
                    }

                    return (
                        <g key={`node-${lIdx}-${nIdx}`}>
                            <circle
                                cx={x} cy={y}
                                r={isInput || isOutput ? 10 : 8}
                                fill={fill}
                                stroke={stroke}
                                strokeWidth={isDead ? 3 : 2}
                            />
                            {isDead && (
                                <text x={x} y={y} dy=".3em" textAnchor="middle" fill="#ff4444" fontSize="10" pointerEvents="none">
                                    ×
                                </text>
                            )}
                        </g>
                    );
                });
            })}
        </svg>
    );
});
