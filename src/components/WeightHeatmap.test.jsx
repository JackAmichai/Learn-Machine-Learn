import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { WeightHeatmap } from './WeightHeatmap';

describe('WeightHeatmap', () => {
    let mockModel;

    beforeAll(() => {
        // Mock canvas getContext
        HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
            fillStyle: '',
            fillRect: vi.fn(),
        }));
    });

    beforeEach(() => {
        mockModel = {
            getConnectionWeightsAsync: vi.fn(),
            getConnectionWeights: vi.fn(),
            model: {
                layers: []
            }
        };
    });

    it('renders container but no heatmaps when input dim is not 100', () => {
         // Heatmap expects 100 inputs (10x10)
        const { container } = render(
            <WeightHeatmap model={mockModel} modelVersion={1} structure={[10, 10]} />
        );
        expect(screen.getByText(/what the brain sees/i)).toBeInTheDocument();
        expect(container.querySelectorAll('canvas').length).toBe(0);
    });

    it('uses getConnectionWeightsAsync if available', async () => {
        const weights = new Float32Array(100 * 10).fill(0.1);
        mockModel.getConnectionWeightsAsync.mockResolvedValue(weights);

        const { container } = render(
            <WeightHeatmap model={mockModel} modelVersion={1} structure={[100, 10]} />
        );

        await waitFor(() => {
             expect(mockModel.getConnectionWeightsAsync).toHaveBeenCalledWith(0);
        });

        // Should verify it rendered something
        expect(screen.getByText(/what the brain sees/i)).toBeInTheDocument();
        // slice(0, 8) means max 8 items
        // structure [100, 10] -> 10 units. so 8 should be rendered.
        await waitFor(() => {
             expect(container.querySelectorAll('canvas').length).toBeGreaterThan(0);
        });
    });

    it('falls back to getConnectionWeights if async not available', async () => {
        const weights = new Float32Array(100 * 10).fill(0.1);
        mockModel.getConnectionWeightsAsync = undefined; // Remove async method
        mockModel.getConnectionWeights.mockReturnValue(weights);

        const { container } = render(
            <WeightHeatmap model={mockModel} modelVersion={1} structure={[100, 10]} />
        );

        await waitFor(() => {
             expect(mockModel.getConnectionWeights).toHaveBeenCalledWith(0);
        });

        expect(screen.getByText(/what the brain sees/i)).toBeInTheDocument();
        expect(container.querySelectorAll('canvas').length).toBeGreaterThan(0);
    });

    it('handles error in async fetch gracefully', async () => {
        mockModel.getConnectionWeightsAsync.mockRejectedValue(new Error('Async error'));

        const { container } = render(
            <WeightHeatmap model={mockModel} modelVersion={1} structure={[100, 10]} />
        );

        await waitFor(() => {
             expect(mockModel.getConnectionWeightsAsync).toHaveBeenCalled();
        });

        expect(screen.getByText(/what the brain sees/i)).toBeInTheDocument();
        expect(container.querySelectorAll('canvas').length).toBe(0);
    });
});
