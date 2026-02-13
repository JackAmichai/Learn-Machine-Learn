import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock dependencies
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));

vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Component Security', () => {
    const mockProps = {
        isPlaying: false,
        setIsPlaying: vi.fn(),
        epoch: 0,
        loss: 0,
        structure: [2, 4, 1],
        addLayer: vi.fn(),
        removeLayer: vi.fn(),
        updateNodeCount: vi.fn(),
        datasetParams: { type: 'spiral', noise: 0 },
        setDatasetParams: vi.fn(),
        mode: 'simple',
        setMode: vi.fn(),
        hyperparams: { activation: 'relu', optimizer: 'adam', batchSize: 32, learningRate: 0.01, gradientClip: 0 },
        updateHyperparams: vi.fn(),
        trainingMode: 'continuous',
        setTrainingMode: vi.fn(),
        slowDelay: 100,
        setSlowDelay: vi.fn(),
        stepState: { status: 'idle' },
        runForwardPass: vi.fn(),
        runBackwardPass: vi.fn(),
        saveModelToLocal: vi.fn(),
        loadModelFromLocal: vi.fn(),
        exportModelJSON: vi.fn(),
        importModelJSON: vi.fn(),
        layerFeatures: { 1: { batchNorm: false, dropout: false, dropoutRate: 0.2 } },
        updateLayerFeatures: vi.fn()
    };

    let originalFileReader;

    beforeEach(() => {
        originalFileReader = window.FileReader;
        window.FileReader = vi.fn().mockImplementation(() => ({
            readAsText: vi.fn(),
            onload: null,
            result: ''
        }));
    });

    afterEach(() => {
        window.FileReader = originalFileReader;
        vi.clearAllMocks();
    });

    it('blocks file upload larger than 5MB', async () => {
        render(<Controls {...mockProps} />);

        const fileInput = screen.getByTestId('file-upload');
        const largeFile = new File(['x'.repeat(1024)], 'large.json', { type: 'application/json' });

        // Mock size property to be > 5MB
        Object.defineProperty(largeFile, 'size', { value: 5 * 1024 * 1024 + 1 });

        fireEvent.change(fileInput, { target: { files: [largeFile] } });

        // Expect error message
        await waitFor(() => {
            expect(screen.getByText('File too large (max 5MB)')).toBeInTheDocument();
        });

        // Ensure importModelJSON was NOT called
        expect(mockProps.importModelJSON).not.toHaveBeenCalled();
    });

    it('allows valid file upload', async () => {
        // Mock FileReader to actually work
        const mockReadAsText = vi.fn();
        const mockFileReaderInstance = {
            readAsText: mockReadAsText,
            onload: null,
            result: '{"valid": "json"}'
        };

        // Use a function declaration so it can be called with 'new'
        window.FileReader = vi.fn().mockImplementation(function() {
            return mockFileReaderInstance;
        });

        render(<Controls {...mockProps} />);

        const fileInput = screen.getByTestId('file-upload');
        const validFile = new File(['{}'], 'valid.json', { type: 'application/json' });

        fireEvent.change(fileInput, { target: { files: [validFile] } });

        // Trigger the onload manually since our mock is dumb
        // In the component: reader.readAsText(file) is called.
        // We need to wait for that call, then trigger onload.

        expect(mockReadAsText).toHaveBeenCalledWith(validFile);

        // Simulate successful read
        mockFileReaderInstance.onload();

        await waitFor(() => {
            expect(screen.getByText(/Imported valid.json/)).toBeInTheDocument();
        });

        expect(mockProps.importModelJSON).toHaveBeenCalledWith('{"valid": "json"}');
    });
});
