import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Controls } from './Controls';
import { DataType } from '../engine/data';

// Mock Tooltip and CodeExport to avoid rendering deep children
vi.mock('./Tooltip', () => ({
    Tooltip: ({ word }) => <span>{word}</span>
}));
vi.mock('./CodeExport', () => ({
    CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Security Tests', () => {
    let mockProps;

    beforeEach(() => {
        mockProps = {
            isPlaying: false,
            setIsPlaying: vi.fn(),
            epoch: 0,
            loss: 0.5,
            structure: [2, 4, 1],
            addLayer: vi.fn(),
            removeLayer: vi.fn(),
            updateNodeCount: vi.fn(),
            datasetParams: { type: DataType.SPIRAL, noise: 0.1 },
            setDatasetParams: vi.fn(),
            mode: 'simple',
            setMode: vi.fn(),
            hyperparams: { learningRate: 0.01, activation: 'relu', optimizer: 'adam', gradientClip: 0, batchSize: 32 },
            updateHyperparams: vi.fn(),
            trainingMode: 'continuous',
            setTrainingMode: vi.fn(),
            slowDelay: 500,
            setSlowDelay: vi.fn(),
            stepState: { status: 'Ready' },
            runForwardPass: vi.fn(),
            runBackwardPass: vi.fn(),
            saveModelToLocal: vi.fn(),
            loadModelFromLocal: vi.fn(),
            exportModelJSON: vi.fn(),
            importModelJSON: vi.fn(),
            layerFeatures: {},
            updateLayerFeatures: vi.fn()
        };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should reject files larger than 5MB', async () => {
        render(<Controls {...mockProps} />);

        // Mock FileReader to ensure it's not called
        const readAsTextSpy = vi.spyOn(FileReader.prototype, 'readAsText').mockImplementation(() => {});

        const fileInput = screen.getByTestId('file-upload');

        // Mock a large file (6MB)
        const largeFile = new File(['(dummy content)'], 'large_model.json', { type: 'application/json' });
        Object.defineProperty(largeFile, 'size', { value: 6 * 1024 * 1024 });

        fireEvent.change(fileInput, { target: { files: [largeFile] } });

        // Wait for error message
        await waitFor(() => {
            const errorMessage = screen.getByText(/File exceeds/i);
            expect(errorMessage).toBeInTheDocument();
        });

        // Ensure FileReader was NOT called
        expect(readAsTextSpy).not.toHaveBeenCalled();
    });

    it('should accept files smaller than 5MB', async () => {
        render(<Controls {...mockProps} />);

        // Mock FileReader
        const readAsTextSpy = vi.spyOn(FileReader.prototype, 'readAsText').mockImplementation(() => {});

        const fileInput = screen.getByTestId('file-upload');

        // Mock a small file
        const smallFile = new File(['{}'], 'small_model.json', { type: 'application/json' });

        fireEvent.change(fileInput, { target: { files: [smallFile] } });

        // Ensure FileReader WAS called
        expect(readAsTextSpy).toHaveBeenCalledWith(smallFile);
    });
});
