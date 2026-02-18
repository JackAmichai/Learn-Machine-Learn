import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { WeightHeatmap } from './WeightHeatmap';

// Mock canvas context
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    fillRect: vi.fn(),
    fillStyle: '',
}));

describe('WeightHeatmap', () => {
    it('renders without crashing', () => {
        const structure = [100, 10, 2];
        const mockModel = {
            getConnectionWeights: vi.fn(() => new Float32Array(1000).fill(0.1))
        };

        render(<WeightHeatmap model={mockModel} structure={structure} modelVersion={1} />);
    });

    it('uses synchronous getConnectionWeights if available', async () => {
        const structure = [100, 10, 2];
        const mockModel = {
            getConnectionWeights: vi.fn(() => new Float32Array(1000).fill(0.1))
        };

        render(<WeightHeatmap model={mockModel} structure={structure} modelVersion={1} />);

        await waitFor(() => {
            expect(mockModel.getConnectionWeights).toHaveBeenCalledWith(0);
        });
    });

    it('should prefer async getConnectionWeightsAsync if available', async () => {
        const structure = [100, 10, 2];
        const mockModel = {
            getConnectionWeights: vi.fn(() => new Float32Array(1000).fill(0.1)),
            getConnectionWeightsAsync: vi.fn(() => Promise.resolve(new Float32Array(1000).fill(0.2)))
        };

        render(<WeightHeatmap model={mockModel} structure={structure} modelVersion={1} />);

        await waitFor(() => {
            expect(mockModel.getConnectionWeightsAsync).toHaveBeenCalledWith(0);
        });

        expect(mockModel.getConnectionWeights).not.toHaveBeenCalled();
    });
});
