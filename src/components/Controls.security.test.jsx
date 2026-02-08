import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock dependencies
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));

vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Security', () => {
  const mockProps = {
    isPlaying: false,
    setIsPlaying: vi.fn(),
    epoch: 0,
    loss: 0.5,
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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('prevents upload of files larger than 5MB', async () => {
    // Mock FileReader
    const readAsTextMock = vi.fn();
    const originalFileReader = window.FileReader;

    window.FileReader = class MockFileReader {
        constructor() {
            this.readAsText = readAsTextMock;
            this.onload = null;
        }
    };

    render(<Controls {...mockProps} />);
    const fileInput = screen.getByTestId('file-upload');

    // Create a mock file with size > 5MB
    const largeFile = new File([''], 'large.json', { type: 'application/json' });
    Object.defineProperty(largeFile, 'size', { value: 5 * 1024 * 1024 + 1 });

    // Trigger upload
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Wait for potential async state updates
    await waitFor(() => {
        // We expect the error message to appear
        const status = screen.getByRole('status');
        expect(status).toHaveTextContent(/File too large/i);
    });

    // Verify import was NOT called
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();

    // Verify file was NOT read
    expect(readAsTextMock).not.toHaveBeenCalled();

    // Cleanup
    window.FileReader = originalFileReader;
  });
});
