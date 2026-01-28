import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NetworkGraph } from './NetworkGraph';

describe('NetworkGraph', () => {
    it('renders without crashing with mock model', () => {
        const mockModel = {
            getConnectionWeights: () => new Float32Array([0.1, 0.2, 0.3, 0.4])
        };
        const structure = [2, 2];
        const { container } = render(
            <NetworkGraph
                model={mockModel}
                structure={structure}
                modelVersion={1}
                deadNeurons={{}}
            />
        );
        expect(container.querySelector('svg')).toBeInTheDocument();
        // Check if some lines are rendered
        expect(container.querySelectorAll('line').length).toBeGreaterThan(0);
    });

    it('handles missing model gracefully', () => {
        const { container } = render(
            <NetworkGraph
                model={null}
                structure={[2, 2]}
                modelVersion={1}
                deadNeurons={{}}
            />
        );
        expect(container.querySelector('svg')).toBeInTheDocument();
        // Even without model, it renders the structure (lines with 0 weight)
        expect(container.querySelectorAll('line').length).toBeGreaterThan(0);
        expect(container.querySelectorAll('circle').length).toBeGreaterThan(0);
    });
});
