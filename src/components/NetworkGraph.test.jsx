import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { NetworkGraph } from './NetworkGraph.jsx';

describe('NetworkGraph', () => {
    it('should render without crashing', () => {
        const structure = [2, 3, 1];
        const mockModel = {
            getConnectionWeights: vi.fn().mockImplementation((layerIdx) => {
                // Return dummy weights
                // Layer 0: 2 inputs -> 3 outputs = 6 weights
                // Layer 1: 3 inputs -> 1 output = 3 weights
                const layerSize = structure[layerIdx];
                const nextLayerSize = structure[layerIdx + 1];
                const count = layerSize * nextLayerSize;
                return new Float32Array(count).fill(0.1);
            }),
            model: {}
        };

        const { container } = render(
            <NetworkGraph
                model={mockModel}
                structure={structure}
                modelVersion={1}
                deadNeurons={{}}
            />
        );

        expect(container.querySelector('svg')).toBeInTheDocument();
        expect(mockModel.getConnectionWeights).toHaveBeenCalledTimes(2); // Called for layer 0 and 1
    });

    it('should not re-compute weights if props are stable', () => {
        const structure = [2, 3, 1];
        const mockModel = {
            getConnectionWeights: vi.fn().mockImplementation((layerIdx) => {
                const layerSize = structure[layerIdx];
                const nextLayerSize = structure[layerIdx + 1];
                const count = layerSize * nextLayerSize;
                return new Float32Array(count).fill(0.1);
            }),
            model: {}
        };

        const { rerender } = render(
            <NetworkGraph
                model={mockModel}
                structure={structure}
                modelVersion={1}
                deadNeurons={{}}
            />
        );

        expect(mockModel.getConnectionWeights).toHaveBeenCalledTimes(2);

        // Rerender with same props
        rerender(
            <NetworkGraph
                model={mockModel}
                structure={structure}
                modelVersion={1}
                deadNeurons={{}}
            />
        );

        // Should NOT have called getConnectionWeights again
        expect(mockModel.getConnectionWeights).toHaveBeenCalledTimes(2);

        // Rerender with new modelVersion
        rerender(
            <NetworkGraph
                model={mockModel}
                structure={structure}
                modelVersion={2}
                deadNeurons={{}}
            />
        );

        // Should have called again
        expect(mockModel.getConnectionWeights).toHaveBeenCalledTimes(4);
    });
});
