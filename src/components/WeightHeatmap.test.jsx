import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { WeightHeatmap } from './WeightHeatmap.jsx';

describe('WeightHeatmap', () => {
    it('renders without crashing with minimal props', () => {
        const { container } = render(
            <WeightHeatmap
                model={null}
                structure={[]}
                modelVersion={0}
            />
        );
        expect(container.querySelector('.heatmap-container')).toBeInTheDocument();
    });

    it('does not render heatmaps for non-vision structures (input != 100)', () => {
        const structure = [10, 5, 2]; // Not 100 input
        const { container } = render(
            <WeightHeatmap
                model={{}}
                structure={structure}
                modelVersion={1}
            />
        );

        // Should render container but no heatmaps
        expect(container.querySelector('.heatmap-container')).toBeInTheDocument();
        expect(container.querySelectorAll('canvas').length).toBe(0);
    });

    it('fetches weights asynchronously and renders heatmaps for vision structure', async () => {
        const structure = [100, 16, 2];
        const mockWeights = new Float32Array(100 * 16).fill(0.5);

        const mockModel = {
            getConnectionWeightsAsync: vi.fn().mockResolvedValue(mockWeights),
            getConnectionWeights: vi.fn()
        };

        const { container } = render(
            <WeightHeatmap
                model={mockModel}
                structure={structure}
                modelVersion={1}
            />
        );

        // Initially no canvases
        expect(container.querySelectorAll('canvas').length).toBe(0);

        // Wait for async effect
        await waitFor(() => {
            expect(mockModel.getConnectionWeightsAsync).toHaveBeenCalledWith(0);
        });

        // Should render canvases (slice(0, 8) limits to 8)
        await waitFor(() => {
            expect(container.querySelectorAll('canvas').length).toBe(8);
        });
    });

    it('falls back to synchronous fetch if async is missing', async () => {
        const structure = [100, 16, 2];
        const mockWeights = new Float32Array(100 * 16).fill(0.5);

        const mockModel = {
            // No async method
            getConnectionWeights: vi.fn().mockReturnValue(mockWeights)
        };

        const { container } = render(
            <WeightHeatmap
                model={mockModel}
                structure={structure}
                modelVersion={1}
            />
        );

        await waitFor(() => {
            expect(container.querySelectorAll('canvas').length).toBe(8);
        });

        expect(mockModel.getConnectionWeights).toHaveBeenCalledWith(0);
    });

    it('handles null weights gracefully', async () => {
        const structure = [100, 16, 2];

        const mockModel = {
            getConnectionWeightsAsync: vi.fn().mockResolvedValue(null)
        };

        const { container } = render(
            <WeightHeatmap
                model={mockModel}
                structure={structure}
                modelVersion={1}
            />
        );

        await waitFor(() => {
            expect(mockModel.getConnectionWeightsAsync).toHaveBeenCalled();
        });

        expect(container.querySelectorAll('canvas').length).toBe(0);
    });

    it('re-fetches when modelVersion changes', async () => {
        const structure = [100, 16, 2];
        const mockWeights = new Float32Array(100 * 16).fill(0.5);

        const mockModel = {
            getConnectionWeightsAsync: vi.fn().mockResolvedValue(mockWeights)
        };

        const { rerender } = render(
            <WeightHeatmap
                model={mockModel}
                structure={structure}
                modelVersion={1}
            />
        );

        await waitFor(() => {
            expect(mockModel.getConnectionWeightsAsync).toHaveBeenCalledTimes(1);
        });

        // Rerender with new version
        rerender(
            <WeightHeatmap
                model={mockModel}
                structure={structure}
                modelVersion={2}
            />
        );

        await waitFor(() => {
            expect(mockModel.getConnectionWeightsAsync).toHaveBeenCalledTimes(2);
        });
    });
});
