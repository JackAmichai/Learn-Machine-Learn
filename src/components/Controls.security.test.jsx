import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock components
vi.mock('./Tooltip', () => ({
    Tooltip: ({ word }) => <span>{word}</span>
}));

vi.mock('./CodeExport', () => ({
    CodeExport: () => <div>CodeExport</div>
}));

// Mock props
const mockProps = {
    isPlaying: false,
    setIsPlaying: vi.fn(),
    epoch: 0,
    loss: 0,
    structure: [2, 4, 1],
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    updateNodeCount: vi.fn(),
    datasetParams: { type: 'spiral', noise: 0.1 },
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

describe('Controls Security', () => {
    let originalFileReader;

    beforeEach(() => {
        originalFileReader = window.FileReader;
        window.URL.createObjectURL = vi.fn();
        window.URL.revokeObjectURL = vi.fn();
    });

    afterEach(() => {
        window.FileReader = originalFileReader;
        vi.restoreAllMocks();
    });

    it('blocks files larger than 5MB', async () => {
        const readAsTextMock = vi.fn();
        class MockFileReader {
            constructor() {
                this.readAsText = readAsTextMock;
                this.onload = null;
                this.result = null;
            }
        }
        vi.stubGlobal('FileReader', MockFileReader);

        const { container } = render(<Controls {...mockProps} />);

        // Target the hidden input
        // Using querySelector to ensure we find it even before data-testid is added
        const input = container.querySelector('input[type="file"]');
        expect(input).toBeInTheDocument();

        // Create a file larger than 5MB
        const file = new File([''], 'large_model.json', { type: 'application/json' });
        Object.defineProperty(file, 'size', { value: 6 * 1024 * 1024 }); // 6MB

        fireEvent.change(input, { target: { files: [file] } });

        // Verify error message appears
        await waitFor(() => {
            expect(screen.getByText(/File too large \(max 5MB\)/i)).toBeInTheDocument();
        });

        // Verify file was NOT read
        expect(readAsTextMock).not.toHaveBeenCalled();
    });
});
