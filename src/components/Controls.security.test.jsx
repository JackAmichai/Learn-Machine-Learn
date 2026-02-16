import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock child components to isolate Controls logic
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));

vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Security', () => {
  const mockImportModelJSON = vi.fn();

  const defaultProps = {
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
    stepState: {},
    runForwardPass: vi.fn(),
    runBackwardPass: vi.fn(),
    saveModelToLocal: vi.fn(),
    loadModelFromLocal: vi.fn(),
    exportModelJSON: vi.fn(),
    importModelJSON: mockImportModelJSON,
    layerFeatures: {},
    updateLayerFeatures: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects files larger than 5MB', async () => {
    render(<Controls {...defaultProps} />);

    const fileInput = screen.getByTestId('file-upload'); // We'll need to add this data-testid

    // Create a mock large file (5MB + 1 byte)
    const largeFile = new File(['x'.repeat(5 * 1024 * 1024 + 1)], 'large_model.json', { type: 'application/json' });

    // Spy on FileReader
    const readAsTextSpy = vi.spyOn(FileReader.prototype, 'readAsText');

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Expect error message
    await waitFor(() => {
        expect(screen.getByText(/File too large/i)).toBeInTheDocument();
    });

    // Ensure FileReader was NOT called (or at least importModelJSON was not called with the result)
    // Actually, if we block it before reading, readAsTextSpy should not be called.
    expect(readAsTextSpy).not.toHaveBeenCalled();
    expect(mockImportModelJSON).not.toHaveBeenCalled();
  });
});
