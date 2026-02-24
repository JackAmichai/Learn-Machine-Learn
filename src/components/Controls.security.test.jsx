import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock child components
vi.mock('./Tooltip', () => ({ Tooltip: () => <span>Tooltip</span> }));
vi.mock('./CodeExport', () => ({ CodeExport: () => <div>CodeExport</div> }));

describe('Controls Security', () => {
    let originalFileReader;
    let mockReadAsText;
    let mockFileReaderInstance;
    let MockFileReaderClass;

    beforeEach(() => {
        originalFileReader = window.FileReader;
        mockReadAsText = vi.fn();
        mockFileReaderInstance = null;

        MockFileReaderClass = class {
            constructor() {
                mockFileReaderInstance = this;
                this.readAsText = mockReadAsText;
                this.onload = null;
            }
        };

        window.FileReader = MockFileReaderClass;
    });

    afterEach(() => {
        window.FileReader = originalFileReader;
        vi.restoreAllMocks();
    });

    const defaultProps = {
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
        hyperparams: {
            learningRate: 0.01,
            activation: 'relu',
            optimizer: 'adam',
            batchSize: 32,
            gradientClip: 0
        },
        updateHyperparams: vi.fn(),
        trainingMode: 'continuous',
        setTrainingMode: vi.fn(),
        slowDelay: 500,
        setSlowDelay: vi.fn(),
        stepState: { status: 'idle' },
        runForwardPass: vi.fn(),
        runBackwardPass: vi.fn(),
        saveModelToLocal: vi.fn(),
        loadModelFromLocal: vi.fn(),
        exportModelJSON: vi.fn(),
        importModelJSON: vi.fn(),
        layerFeatures: {},
        updateLayerFeatures: vi.fn()
    };

    it('rejects files larger than 5MB', async () => {
        render(<Controls {...defaultProps} />);

        const largeFile = new File([''], 'large.json', { type: 'application/json' });
        Object.defineProperty(largeFile, 'size', { value: 5 * 1024 * 1024 + 1 });

        const fileInput = document.querySelector('input[type="file"]');
        fireEvent.change(fileInput, { target: { files: [largeFile] } });

        // Expect error message
        await waitFor(() => {
            expect(screen.getByText(/File too large/i)).toBeInTheDocument();
        });

        // Verify importModelJSON was NOT called
        expect(defaultProps.importModelJSON).not.toHaveBeenCalled();

        // Verify FileReader was NOT instantiated
        expect(mockFileReaderInstance).toBeNull();
    });

    it('accepts valid files within size limit', async () => {
        render(<Controls {...defaultProps} />);

        const validFile = new File(['{}'], 'model.json', { type: 'application/json' });

        const fileInput = document.querySelector('input[type="file"]');
        fireEvent.change(fileInput, { target: { files: [validFile] } });

        // Verify FileReader was instantiated
        expect(mockFileReaderInstance).not.toBeNull();
        expect(mockReadAsText).toHaveBeenCalledWith(validFile);

        // Simulate onload
        expect(mockFileReaderInstance.onload).toBeTypeOf('function');

        // Mock result property on the instance for the read operation
        mockFileReaderInstance.result = '{"valid": true}';

        // Trigger onload
        mockFileReaderInstance.onload();

        // Now check if importModelJSON was called
        expect(defaultProps.importModelJSON).toHaveBeenCalled();
    });
});
